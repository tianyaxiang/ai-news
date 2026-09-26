---
title: "Building a Local Search Index for a 200MB X Archive"
originalUrl: "https://dev.to/ahmed_isam_752b775a50fd90/building-a-local-search-index-for-a-200mb-x-archive-3h2c"
date: "2026-09-26T23:50:02.719Z"
---

# Building a Local Search Index for a 200MB X Archive
# 为 200MB 的 X (Twitter) 归档文件构建本地搜索索引

Unpack an X archive and the post text sits in a single file called `tweets.js`. It opens with an assignment, then one very large JSON array. Nothing is encrypted and nothing is indexed either, and the thing you want is usually one detail: a house number, an email address, the name of a hotel from one trip. Reading it without installing anything is a problem already solved elsewhere and it works fine for a one-off question. This is the other direction: turn the archive into a local index you build once and query in milliseconds from then on.

解压 X (原 Twitter) 的归档文件后，推文内容会存放在一个名为 `tweets.js` 的文件中。它以赋值语句开头，后面跟着一个巨大的 JSON 数组。这些数据既未加密也未建立索引，而你通常只想查找某个特定细节：比如门牌号、电子邮件地址或某次旅行住过的酒店名称。如果不安装任何软件来读取它，这在网上已有现成的解决方案，对于偶尔查询一次来说完全够用。但本文探讨的是另一个方向：将归档文件转换为本地索引，只需构建一次，之后即可实现毫秒级查询。

### Why loading it directly runs out of memory
### 为什么直接加载会导致内存溢出

Start with the numbers, since they decide how the script has to be written.

首先看数据，因为它们决定了脚本该如何编写。

| Object | Typical size | Note |
| :--- | :--- | :--- |
| Archive ZIP | 150 to 400 MB | Several js files plus media folders |
| tweets.js | 120 to 300 MB | UTF-8, one enormous line |
| Parsed object array | 3 to 5x the source file | Per-object overhead in V8 dwarfs the text |
| Index file, stopwords dropped | 15 to 40 MB | Depends on post count and token granularity |

| 对象 | 典型大小 | 备注 |
| :--- | :--- | :--- |
| 归档 ZIP | 150 到 400 MB | 包含多个 js 文件及媒体文件夹 |
| tweets.js | 120 到 300 MB | UTF-8 编码，超长单行 |
| 解析后的对象数组 | 源文件的 3 到 5 倍 | V8 引擎中每个对象的开销远超文本本身 |
| 索引文件（已去停用词） | 15 到 40 MB | 取决于推文数量和分词粒度 |

The third row is where things break. Parsing a couple of hundred megabytes of JSON in a single call, then holding the deduplicated strings resident, reliably hits the default heap ceiling and surfaces as a vague heap out of memory error. Raising the limit works, but there is no reason to: an index wants the text, not the object graph.

第三行是问题的关键。一次性解析几百 MB 的 JSON，并将去重后的字符串驻留在内存中，通常会触及默认的堆内存上限，从而导致模糊的“堆内存溢出”错误。虽然调大内存限制可以解决，但完全没必要：索引只需要文本，而不需要完整的对象图。

### Streaming the structure away
### 通过流式处理剥离结构

The shape of the fix is to drop the assignment prefix, split the body at top level array boundaries, process each element and release it before moving on. Memory then scales with the largest individual post instead of with the total number of posts.

解决办法是去掉赋值前缀，在顶级数组边界处拆分主体，处理完每个元素后立即释放，然后再处理下一个。这样内存占用就只与单条推文的大小有关，而不再随推文总数线性增长。

*(Code snippet omitted for brevity)*
*(代码片段略)*

The `findObjectEnd` helper walks the buffer tracking brace depth while respecting string state and escapes, and returns -1 when it reaches the end of the buffer without closing the current object. That is what makes an element-per-line streaming pass possible without loading the array.

`findObjectEnd` 辅助函数会遍历缓冲区，跟踪大括号的嵌套深度，同时处理字符串状态和转义字符。如果到达缓冲区末尾仍未闭合当前对象，则返回 -1。这使得在不加载整个数组的情况下，实现逐行流式处理成为可能。

### Two details that bite
### 两个容易踩的坑

The prefix is not always the same. Older exports open with `window.YTD.tweet.part0 =`, newer ones use `window.YTD.tweets.part0 =`. Grep the first line before assuming, or strip everything up to the first `[` and let the parser deal with the rest.

前缀并不总是固定的。旧版导出文件以 `window.YTD.tweet.part0 =` 开头，而新版则使用 `window.YTD.tweets.part0 =`。在处理前先用 `grep` 检查第一行，或者直接删掉第一个 `[` 之前的所有内容，让解析器处理剩下的部分。

HTML entities survive the parse. Tweet text arrives with escaped ampersands, angle brackets and quotes intact. Run a single decode pass over the extracted text field before writing, otherwise searches for a URL containing a query string will miss.

HTML 实体在解析后依然存在。推文文本中的 `&`、`<`、`>` 和引号仍处于转义状态。在写入前对提取出的文本字段进行一次解码，否则搜索包含查询字符串的 URL 时会失败。

### Querying it
### 如何查询

With an NDJSON index and one record per line, `grep` is a legitimate search engine for a file this size, and it costs nothing to build.

有了 NDJSON 索引且每行一条记录，`grep` 对于这种大小的文件来说就是一个合法的搜索引擎，而且构建成本几乎为零。

`grep -i -n 'hotel name' index.ndjson | head -20`

When you want ranked results rather than exact matches, load the NDJSON into any local full-text engine. DuckDB reads it directly without an import step, and a single `CREATE TABLE` over the file gives you case-insensitive matching and counts:

如果你需要排序结果而非精确匹配，可以将 NDJSON 加载到任何本地全文搜索引擎中。DuckDB 可以直接读取它而无需导入步骤，通过对文件执行一条 `CREATE TABLE` 语句，即可实现不区分大小写的匹配和计数：

`SELECT id, d, t FROM read_ndjson_auto('index.ndjson') WHERE lower(t) LIKE '%hotel name%' ORDER BY d DESC LIMIT 20;`

### Rebuilding versus appending
### 重建与追加

You do not need to rebuild when the archive refreshes. Post identifiers increase monotonically, so take the largest id in the existing index, process only records above it, and append. That also gives you a resumable state: the high water mark is a number you can store and check.

当归档文件更新时，你不需要重新构建。推文 ID 是单调递增的，因此只需获取现有索引中最大的 ID，仅处理大于该 ID 的记录并追加即可。这也提供了一种可恢复的状态：这个“高水位标记”是一个你可以存储并校验的数字。

The property worth remembering is that the archive is a snapshot. Anything you deleted after the export still exists inside it. Which makes the local index useful as a "before picture," and a reasonable way to see which items you already removed and which ones still need attention elsewhere.

值得记住的是，归档文件只是一个快照。你在导出后删除的内容在归档中依然存在。这使得本地索引可以作为一张“旧照”，让你清楚地看到哪些内容已经被删除，哪些内容还需要在其他地方进行处理。