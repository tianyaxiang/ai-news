---
title: "Telegram Desktop vulnerability allowed any user's file to be stolen"
originalUrl: "https://beaksec.github.io/posts/telegram-desktop-one-click-account-takeover/"
date: "2026-10-10T03:02:47.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

Someone adds you to a Telegram group. A link shows up in the chat. You click it, and your Telegram account is no longer only yours.

有人把你拉进了一个 Telegram 群组。聊天中出现了一个链接。你点击了它，从此你的 Telegram 账号就不再只属于你了。

Telegram Desktop hands clicked links to its own already-running instance over a local socket, as text, and never escapes the character it uses to separate commands. So a crafted link does not arrive as one instruction: it arrives as several.

Telegram Desktop 会通过本地套接字（local socket）以文本形式将点击的链接传递给已经在运行的实例，且从未对用于分隔命令的字符进行转义。因此，一个精心构造的链接不会作为单一指令到达，而是会被拆解为多条指令。

The chain I found has two defects. The first is that injection. The second is what the injected command reaches: an internal URI scheme, interpret:, that reads a file named in an instruction file and sends it to a chat, without checking who asked for it and without a confirmation. Together they turn a clicked link into arbitrary file read. In this post I walk through the chain and then use it to steal the files that are the victim’s login.

我发现的这条攻击链包含两个缺陷。第一个是注入漏洞。第二个是注入命令所能触及的目标：一个名为 `interpret:` 的内部 URI 方案。它会读取指令文件中指定的文件并将其发送到聊天窗口，且不会检查请求者身份，也不会进行确认。两者结合，使得点击链接即可实现任意文件读取。在这篇文章中，我将逐步解析这条攻击链，并利用它窃取受害者的登录文件。

Operating systems let programs register a URI scheme, so they know which application to launch when they meet a link of that kind. Telegram Desktop registers tg. From then on the system knows a tg://... link belongs to Telegram, and launches it with the URL as a command-line argument.

操作系统允许程序注册 URI 方案，以便在遇到此类链接时知道启动哪个应用程序。Telegram Desktop 注册了 `tg`。此后，系统便知道 `tg://...` 链接属于 Telegram，并以该 URL 作为命令行参数启动它。

If Telegram is not running, the process starts, takes the string as a parameter, turns it into a URL object and handles it internally: one process, and nothing to communicate.

如果 Telegram 没有运行，进程会启动，将字符串作为参数，将其转换为 URL 对象并在内部处理：只有一个进程，无需通信。

But what if Telegram is already running? The operating system neither knows nor checks: it launches a new process anyway, identical to the first. Telegram itself has to work out that it is the redundant one, and the way it works that out is by trying to connect to a local socket.

但如果 Telegram 已经在运行呢？操作系统既不知道也不检查：它无论如何都会启动一个与第一个进程相同的新进程。Telegram 必须自行判断它是多余的进程，而判断的方法是尝试连接到一个本地套接字。

The already-running instance is the server: it has been listening on that socket since it started. The new process is the client. If it manages to connect, an instance is already alive, so it hands over the link and exits.

已经在运行的实例是服务器：它自启动以来就一直在监听该套接字。新进程是客户端。如果它成功连接，说明已有实例在运行，于是它将链接移交给对方并退出。

A socket does not carry objects, it carries bytes. The URL object the new process holds in memory cannot cross that channel, so it has to be flattened into a line of text.

套接字不传输对象，只传输字节。新进程内存中的 URL 对象无法跨越该通道，因此必须将其扁平化为一行文本。

That operation has a name: serialization. Its inverse, rebuilding the object from the text, is deserialization. Both are unavoidable whenever structured data has to cross a boundary, and both are the exact point where the boundaries inside the data stop being held by the structure and become characters in the text.

这个操作有一个名称：序列化。其逆过程，即从文本重建对象，称为反序列化。每当结构化数据需要跨越边界时，这两者都是不可避免的，且它们正是数据内部边界不再由结构维持、而转变为文本字符的关键点。

Telegram does it with a format of its own, a simple one. Each instruction is a keyword, then its argument, then a semicolon that closes it. A link to open becomes:

Telegram 使用了一种简单的自有格式。每条指令由关键字、参数以及作为结束符的分号组成。一个打开链接的指令变为：

tg://x?a=1 matches no handler inside Telegram, so on its own that link does nothing. It is only a carrier.

`tg://x?a=1` 在 Telegram 内部匹配不到任何处理程序，因此该链接本身不会执行任何操作。它只是一个载体。

That line is built here, one per URL to open:

该行代码在此处构建，每个要打开的 URL 对应一行：

On the other side the running instance deserializes: it reads the received bytes, cuts them at every semicolon, and treats each piece as an instruction in its own right. For each piece starting with OPEN: it takes what follows and rebuilds it as a URL, exactly as if it had just arrived on the command line.

在另一端，运行中的实例进行反序列化：它读取接收到的字节，在每个分号处进行切割，并将每一部分视为一条独立的指令。对于以 `OPEN:` 开头的每一部分，它会提取后续内容并将其重建为 URL，就像它刚刚从命令行传入一样。

So what happens if one of the transmitted values contains a semicolon of its own, the very character the format uses as a separator? Take the link from before and add something to it:

那么，如果传输的值中包含分号（即该格式用于分隔的字符）会发生什么？以之前的链接为例并添加一些内容：

The new process treats it as a single URL, because to it that semicolon is just a character inside the query. It flattens it and writes it to the socket:

新进程将其视为单个 URL，因为对它而言，那个分号只是查询字符串中的一个字符。它将其扁平化并写入套接字：

The running instance cuts at every semicolon and gets two instructions instead of one:

运行中的实例在每个分号处切割，从而得到了两条指令而非一条：

That is the injection, and it is the first of the two defects.

这就是注入，也是两个缺陷中的第一个。

The example above injected CMD:, but don’t be misled by the name: it accepts only show and quit, so the worst it can do is close the app.

上面的例子注入了 `CMD:`，但不要被这个名字误导：它只接受 `show` 和 `quit`，所以它能做的最坏的事情就是关闭应用程序。

Four commands are accepted in total, and three of them are harmless. The fourth is OPEN:, and there is the detail: it accepts any URL, with no filter on the scheme.

总共接受四条命令，其中三条是无害的。第四条是 `OPEN:`，关键细节在于：它接受任何 URL，且不对方案（scheme）进行过滤。

Digging through the code turns up another URI scheme inside Telegram, called interpret:.

深入研究代码后，在 Telegram 内部发现了另一个名为 `interpret:` 的 URI 方案。

The operating system would not know what to do with a link starting with interpret:, because it is registered nowhere as a protocol handler: it exists only inside Telegram’s own code, which picks the scheme up off the start-URL list like any other.

操作系统不知道如何处理以 `interpret:` 开头的链接，因为它没有在任何地方被注册为协议处理程序：它仅存在于 Telegram 自身的代码中，代码像处理其他方案一样从启动 URL 列表中获取该方案。

Through OPEN:, then, it is reachable:

因此，通过 `OPEN:`，它是可以被访问的：

So what is interpret: for?

那么 `interpret:` 是做什么用的呢？

It was the tool Telegram used to publish its own releases. When a new version shipped, the build archive had to be posted to a channel with the changelog as its caption. Rather than doing that by hand, a script wrote a small text file naming the channel, the file to send and the text to write, then launched Telegram with the path to that file.

它是 Telegram 用于发布版本更新的工具。当新版本发布时，构建存档必须发布到一个频道，并以更新日志作为标题。为了避免手动操作，脚本会编写一个小型文本文件，指定频道、要发送的文件以及要写入的文本，然后通过该文件的路径启动 Telegram。

The instruction file looks like this:

指令文件如下所示：

The value of from: is compared against the id of the currently logged-in account: it keeps an operator from publishing a release from the wrong one. The check only runs if the line is present, so leaving it out skips it. The destination is set only by channel:, and has to be a channel or a supergroup.

`from:` 的值会与当前登录账号的 ID 进行比对：这可以防止操作员从错误的账号发布版本。该检查仅在存在该行时运行，因此省略它即可跳过检查。目标仅由 `channel:` 设置，且必须是频道或超级群组。

A function called InterpretSendPath does the work.

一个名为 `InterpretSendPath` 的函数负责执行此操作。

So where is the bug? interpret: performs a privileged action, reading any file off the disk and sending it to a chat, without asking anyone for confirmation and without checking who asked for it.

那么漏洞在哪里？`interpret:` 执行了一项特权操作，即读取磁盘上的任何文件并将其发送到聊天窗口，且无需任何人的确认，也不检查请求者是谁。

The function performs no authorization check.

该函数未执行任何授权检查。

When that comes from the command line, which is how the release script invokes it, it is not a problem: an attacker would need a foothold on the machine already, and with one they can read the files themselves. But once the same action is reachable through the socket, and therefore through the injection, a dangerous function becomes available from a link the victim clicks.

当它从命令行调用（发布脚本的调用方式）时，这不是问题：攻击者需要已经控制了机器，而一旦控制了机器，他们自己就能读取文件。但一旦该操作可以通过套接字（进而通过注入）访问，一个危险的函数就变得可以通过受害者点击的链接来触发了。

That is a missing authorization, and it is the second of the two defects.

这就是授权缺失，也是两个缺陷中的第二个。

An attacker who could place an instruction file on the victim’s disk, pointing file: at a path worth stealing and channel: at a channel of their own, could exfiltrate any file from that machine with nothing more than a clicked link.

如果攻击者能在受害者的磁盘上放置一个指令文件，将 `file:` 指向一个值得窃取的路径，并将 `channel:` 指向他们自己的频道，那么只需受害者点击一个链接，他们就能从该机器中窃取任何文件。

So how does an attacker place a text file at a predictable path on someone else’s disk? The obvious way is to send it as a chat attachment.

那么，攻击者如何将文本文件放置在他人磁盘上的可预测路径中呢？显而易见的方法是将其作为聊天附件发送。

As it happens, Telegram Desktop in its default configuration downloads f

恰好，Telegram Desktop 在默认配置下会下载 f