---
title: "Replay the Feed, Never a Duplicate: Idempotent Upserts in MySQL"
originalUrl: "https://dev.to/bryan_hamilton/replay-the-feed-never-a-duplicate-idempotent-upserts-in-mysql-3mm"
date: "2026-10-12T00:33:07.000Z"
excerpt: false
---

# Replay the Feed, Never a Duplicate: Idempotent Upserts in MySQL

我运营着 The DJ Calendar，这是一个追踪全球顶级 DJ 巡演日期的网站。网站上的每场演出都来自 Bandsintown 和 Ticketmaster 的数据源，而这些数据源会反复推送：按计划推送、重试后推送，有时甚至会同时运行两次。这给数据库带来了一个说起来容易、做起来却容易出错的任务：无论数据被摄入多少次，或者哪个进程先到达，同一场演出必须始终作为同一行数据存入。

### The obvious approach, and the race inside it
The first version most of us write looks like this:
```php
$exists = $db->prepare('SELECT id FROM events WHERE artist_id = ? AND venue_id = ? AND event_date = ?');
$exists->execute([$artistId, $venueId, $eventDate]);
if (!$exists->fetch()) {
    $db->prepare('INSERT INTO events (artist_id, venue_id, event_date) VALUES (?, ?, ?)')
       ->execute([$artistId, $venueId, $eventDate]);
}
```
It works perfectly in testing, because in testing only one process runs at a time. In production, two ingestion runs overlap. Worker A runs its SELECT and sees nothing. Worker B runs its SELECT a moment later and also sees nothing, because A hasn't inserted yet. Both insert. Every fan following that artist now sees the show twice. The bug lives in the gap between the read and the write. You can't close that gap from application code without locks, and locks bring their own problems.

### 让数据库来决定
修复方案包含两部分。首先，告诉数据库“同一场演出”的定义是什么。数据源不会提供跨来源可信的稳定 ID，但它们会提供艺人、场地和开始时间。这种组合是演出的自然键（natural key），因此将其设为约束：
```sql
CREATE TABLE events (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    artist_id INT UNSIGNED NOT NULL,
    venue_id INT UNSIGNED NOT NULL,
    event_date DATETIME NOT NULL, -- always UTC
    ticket_url VARCHAR(500) DEFAULT NULL,
    is_sold_out TINYINT(1) NOT NULL DEFAULT 0,
    UNIQUE KEY uq_events_natural (artist_id, venue_id, event_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```
现在，重复数据不仅是被阻止，而是变得不可能。由于规则存在于数据库中而非应用程序内存中，它可以在崩溃、重启以及未来任何触及该表的脚本中持续生效。

### Second, write in one atomic statement.
Instead of asking and then acting, do both at once:
```sql
INSERT INTO events (artist_id, venue_id, event_date, ticket_url, is_sold_out)
VALUES (:artist_id, :venue_id, :event_date, :ticket_url, :is_sold_out)
ON DUPLICATE KEY UPDATE
    ticket_url = VALUES(ticket_url),
    is_sold_out = VALUES(is_sold_out);
```
If the show is new, it's inserted. If it already exists, the existing row is updated with the latest ticket link and sold-out status. There's no gap between the check and the write, so there's nothing for a second worker to slip through. Run the same feed once or a hundred times and you get the same table.

### 了解实际发生的情况
MySQL 通过受影响的行数报告 upsert 的结果：插入返回 1，更新返回 2，如果行数据已匹配则返回 0。这使得摄入日志变得真正有用：
```php
$stmt->execute($params);
switch ($stmt->rowCount()) {
    case 1: return 'inserted';
    case 2: return 'updated';
    default: return 'unchanged';
}
```
一个健康的、未发生变化的数据源重跑几乎会报告所有内容为“未改变”。如果某次运行突然报告了数百次插入，说明上游发生了变化，你可以通过日志行而不是从用户那里发现问题。

### The takeaway
When correctness depends on "this should only exist once," don't enforce it with a check in application code. Encode the rule as a constraint and write with a statement that can't race. Your ingestion becomes safe to retry, safe to run in parallel, and safe to replay after a crash. The full schema, with every design decision documented inline, plus a live demo where you can watch two workers race in both modes, is on the project page.