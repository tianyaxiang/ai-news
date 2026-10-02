---
title: "outis: Fight AI spam by generating and sending a fake \"user unknown\" bounce emails"
originalUrl: "https://github.com/dtonon/outis"
date: "2026-10-02T01:00:38.117Z"
---

# Outis: 通过生成并发送虚假的“用户不存在”退信来对抗 AI 垃圾邮件

Outis fights spam by generating and sending a fake "user unknown" bounce for an email you received, so the sender believes your address does not exist. This should work well for the recent trend of AI-generated automated emails, where the sender may expect a reply; it helps to clean your email from their list.
Outis 通过为你收到的邮件生成并发送虚假的“用户不存在”退信来对抗垃圾邮件，从而让发送者认为你的地址不存在。这对于近期 AI 生成的自动化邮件趋势非常有效，因为发送者往往期待回复；此举有助于将你的邮箱从他们的列表中清除。

Outis (Οὖτις) is Greek for "nobody". In the Odyssey, Odysseus gives it as his name to the Cyclops Polyphemus, so that when the blinded giant calls for help and shouts that "Nobody" is hurting him, the other Cyclopes leave. The tool does the same for your mailbox: it tells whoever is asking that there is nobody here.
Outis (Οὖτις) 在希腊语中意为“无人”。在《奥德赛》中，奥德修斯以此作为自己的名字告诉独眼巨人波吕斐摩斯，这样当失明的巨人呼救并大喊“无人”在伤害他时，其他独眼巨人便会离开。该工具对你的邮箱也起到了同样的作用：它告诉任何询问者，这里“查无此人”。

The bounce is an RFC 3464 delivery status notification modelled on Postfix: multipart/report with a human-readable part, a message/delivery-status part with status 5.1.1, and the original message attached as message/rfc822. It is sent to the original Return-Path from MAILER-DAEMON@<your domain> with a null envelope sender when the SMTP server allows it.
该退信是仿照 Postfix 格式的 RFC 3464 投递状态通知：包含一个人类可读部分、一个状态为 5.1.1 的 message/delivery-status 部分，以及作为附件的原始邮件（message/rfc822）。在 SMTP 服务器允许的情况下，它会以空信封发件人身份，从 MAILER-DAEMON@<你的域名> 发送至原始的 Return-Path。

### Known limitations
### 已知局限性

Unlike a real 550 rejection during the SMTP conversation, this bounce is sent after the message was already accepted, so the sender's logs show a successful delivery, the mailbox keeps working for any retry, and the effect only reaches the one sender who receives and processes the notification.
与 SMTP 会话期间真正的 550 拒绝不同，此退信是在邮件已被接收后发送的，因此发送者的日志会显示投递成功，邮箱对于任何重试请求仍能正常工作，且该效果仅对接收并处理此通知的特定发送者有效。

### Requirements
### 要求

The bounce is only credible if it comes from a domain you control. If possible use an SMTP account on that domain that lets you send as MAILER-DAEMON@.... Consumer providers (Gmail, iCloud, ...) rewrite the From header and will expose you.
只有当退信来自你控制的域名时，它才具有可信度。如果可能，请在该域名上使用一个允许你以 MAILER-DAEMON@... 身份发送邮件的 SMTP 账户。消费级服务商（如 Gmail、iCloud 等）会重写 From 标头，从而暴露你的真实身份。

### Usage
### 使用方法

```bash
go build -o outis cmd/outis/main.go
./outis init [domain] # add or update an account; password goes to the OS keychain
./outis accounts # list accounts
./outis message.eml # preview, then confirm
./outis -c # read the email from the clipboard
./outis -n message.eml # dry run, print only
./outis -y -r me@example.com message.eml
./outis -a example.com -c # force an account instead of matching recipients
./outis inbox/ # every file in the directory, one confirmation for the batch
./outis -n -o out/ inbox/ # dry run, write each bounce to out/<name>.bounce.eml
./outis -d inbox/ # delete each file once its bounce is sent
```

### Batch mode
### 批处理模式

Arguments can be any mix of files and directories. A directory expands to its visible regular files, any extension, not recursive. Each file is matched to an account on its own; files that cannot be parsed or matched are reported and skipped while the others proceed, and the exit code is non-zero if any failed. With more than one input a summary line per file is shown instead of the full preview, followed by a single confirmation.
参数可以是文件和目录的任意组合。目录会展开为其中的可见常规文件（不限扩展名，非递归）。每个文件会独立匹配到一个账户；无法解析或匹配的文件会被报告并跳过，其余文件继续处理。如果有任何失败，退出代码将为非零。当输入多于一个文件时，系统会显示每个文件的摘要行而非完整预览，随后进行一次确认。

### Multiple accounts
### 多账户支持

Each account covers one domain. The bounce is built with the account whose domain matches a recipient (Delivered-To, To or Cc) of the original email, so the sender, mail host and SMTP server all belong to that domain. If no account matches, or more than one does, use --account.
每个账户对应一个域名。退信将使用其域名与原始邮件收件人（Delivered-To、To 或 Cc）匹配的账户来构建，确保发送者、邮件主机和 SMTP 服务器均属于该域名。如果没有匹配的账户，或匹配到多个，请使用 --account 参数。

```toml
[[accounts]]
domain = "example.com"
mta_host = "mail.example.com"
[accounts.smtp]
host = "smtp.example.com"
port = 587
username = "mailer-daemon@example.com"

[[accounts]]
domain = "other.org"
mta_host = "mx.other.org"
[accounts.smtp]
host = "smtp.other.org"
port = 465
username = "mailer-daemon@other.org"
```

### Providers with shared suppression lists
### 带有共享抑制列表的服务商

Some providers, notably Amazon SES, keep a suppression list shared across all their customers: one hard bounce makes every SES sender unable to reach your address for a while. For Return-Path domains listed in reply_to_from_domains the bounce is sent to the From header address instead. The default is ["amazonses.com"] and subdomains match too. Set it to [] to disable.
一些服务商（特别是 Amazon SES）维护着一个跨所有客户共享的抑制列表：一次硬退信会导致所有 SES 发送者在一段时间内无法触达你的地址。对于 reply_to_from_domains 中列出的 Return-Path 域名，退信将改为发送至 From 标头中的地址。默认值为 ["amazonses.com"]，且匹配子域名。设置为 [] 可禁用此功能。

```toml
reply_to_from_domains = ["amazonses.com"]
```

### Configuration
### 配置

`envelope_from` on an account forces the SMTP envelope sender instead of trying the null sender, MAILER-DAEMON@domain and the username in turn. Config lives in `os.UserConfigDir()/outis/config.toml` (~/Library/Application Support/outis on macOS, ~/.config/outis on Linux). Override with `OUTIS_CONFIG`.
账户中的 `envelope_from` 可强制指定 SMTP 信封发件人，而不是依次尝试空发件人、MAILER-DAEMON@domain 和用户名。配置文件位于 `os.UserConfigDir()/outis/config.toml`（macOS 上为 ~/Library/Application Support/outis，Linux 上为 ~/.config/outis）。可通过 `OUTIS_CONFIG` 环境变量覆盖。