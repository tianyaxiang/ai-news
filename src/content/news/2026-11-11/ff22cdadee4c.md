---
title: "30 years of Internet transfers with curl"
originalUrl: "https://daniel.haxx.se/blog/2026/11/11/30-years-of-internet-transfers-with-curl/"
date: "2026-11-10T23:42:39.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

Thirty years ago, on November 11, 1996 the young Brazilian student Rafael Sagula posted the source code for his tiny HTTP download tool online. That was httpget 0.1: a little over 100 lines of C code. Bare bones source code with almost no error checks and limited functionality.

三十年前，即 1996 年 11 月 11 日，年轻的巴西学生 Rafael Sagula 在网上发布了他那个微型 HTTP 下载工具的源代码。那就是 httpget 0.1：一段一百多行的 C 语言代码。这是极其简陋的源代码，几乎没有错误检查，功能也非常有限。

When I found the source code of that initial httpget release just days after Rafael put it online, I had no idea how HTTP worked. The language to speak over the network to ask for resources. Okay, I already knew we call it protocol but not a lot more. I also had never heard of neither httpget nor Rafael before. I imagine that I found httpget by searching on Altavista since this was before Google, but I can’t recall the details.

在 Rafael 将其发布到网上几天后，我发现了最初的 httpget 版本源代码，当时我根本不知道 HTTP 是如何工作的。那是用于在网络上请求资源的语言。好吧，我当时只知道它被称为协议，除此之外知之甚少。我以前也从未听说过 httpget 或 Rafael。我想我是在 Altavista 上搜索到的 httpget，因为那时还没有谷歌，但我记不清细节了。

Seeing the simplicity of this code it was not difficult to immediately spot the fundamental basics of the protocol. I presume maybe in the same vain how countless others in decades to follow also have thought of it when seeing the details for the first time. Much later I would come to understand that to be an illusion of simplicity, but in those early days I was more amazed and fascinated. I already enjoyed doing network programming and HTTP reasoned with me at once.

看到这段代码的简洁性，不难立即发现该协议的基本原理。我想，在随后的几十年里，无数人在第一次看到这些细节时，可能也会有同样的想法。很久以后我才明白那是一种简洁的错觉，但在那些早期的日子里，我更多的是感到惊讶和着迷。我当时已经很喜欢进行网络编程，而 HTTP 让我一见倾心。

httpget 0.1 was almost completely without error checks and it used plain IPv4 addresses; no hostnames or URLs. I, still a naive and enthusiastic developer with an Open Source mindset (even though that term would not be established until 15-16 months later), addressed some immediate bugs I ran into and added name resolving to the tool. I made diffs and emailed patches over to Rafael; the standard way we exchanged code changes back then.

httpget 0.1 几乎完全没有错误检查，并且使用的是纯 IPv4 地址；没有主机名或 URL。当时我还是一个天真且充满热情的开发者，拥有开源思维（尽管这个术语直到 15-16 个月后才确立），我修复了遇到的一些即时错误，并为该工具添加了域名解析功能。我制作了差异文件并通过电子邮件将补丁发送给 Rafael；这是当时我们交换代码更改的标准方式。

I knew about RCS and CVS for version control, but the use of these tools was spotty. It would actually take until September 1999 until I adopted CVS fully for the curl project. We later switched to using git in 2010.

我知道用于版本控制的 RCS 和 CVS，但这些工具的使用并不普及。直到 1999 年 9 月，我才在 curl 项目中全面采用 CVS。后来我们在 2010 年转向使用 git。

Internet in 1996 The average internet connection speed of a normal household in Sweden, where I lived and I still live, in 1996 was 30 kbps. 30 kilobit per second. This was before v90 came and bumped the modems up to 56 kilobits. Ordinary mortals connected to the internet using modems over their single phone lines. Today, the average Swedish connection speed is 200 megabits/second.

1996 年的互联网：1996 年，我居住（现在依然居住）的瑞典，普通家庭的平均互联网连接速度为 30 kbps。即每秒 30 千比特。那是在 v90 标准出现并将调制解调器速度提升至 56 千比特之前。普通人通过电话线使用调制解调器连接互联网。今天，瑞典的平均连接速度为每秒 200 兆比特。

Thirty years ago there were just 36 million global Internet users and 250,000 websites. Compared to the 6 or 7 billion users and 1 billion websites of today. We used simpler protocols and while encrypted protocols like SSL existed, they were not used a lot and only for a few rare sites.

三十年前，全球只有 3600 万互联网用户和 25 万个网站。与今天 60 到 70 亿用户和 10 亿个网站相比，差距巨大。我们当时使用更简单的协议，虽然像 SSL 这样的加密协议已经存在，但它们并没有被广泛使用，仅用于极少数罕见的网站。

Computers in 1996 In November 1996, my main home computer was still an Amiga 3000 powered by a 25Mhz 68030 CPU but in early 1997 I upgraded to a faster and more modern machine: an Intel Pentium 120Mhz. I ran Windows 95 on this thing, and its prime use was to run an X server so that I could connect to my work computers and pop up X11 terminals at home.

1996 年的计算机：1996 年 11 月，我家里主要使用的计算机仍然是一台搭载 25Mhz 68030 CPU 的 Amiga 3000，但在 1997 年初，我升级到了一台更快、更现代的机器：Intel Pentium 120Mhz。我在上面运行 Windows 95，其主要用途是运行 X 服务器，以便我可以在家里连接到工作计算机并弹出 X11 终端。

I built the first versions of httpget remotely on SunOS, Solaris and Dell Unix – because they happened to be what we had running at work. I installed and tested Linux for the first time at work in 1997. I got our first public web servers up and of course I made sure curl worked fine on it. I did not switch to Linux on my home machine until 2000 when I also updated to an Intel Pentium III 733 Mhz box.

我在 SunOS、Solaris 和 Dell Unix 上远程构建了 httpget 的早期版本，因为这些正好是我们工作中运行的系统。1997 年，我在工作中首次安装并测试了 Linux。我搭建了我们第一批公共 Web 服务器，当然，我也确保了 curl 在上面运行良好。直到 2000 年，当我升级到 Intel Pentium III 733 Mhz 的机器时，我才在家用电脑上切换到 Linux。

What I needed to download In 1996 I was working as a software developer doing embedded systems and Unix development in C, for a small Swedish company called Frontec Railway Systems. While working there, I came to learn about and enjoy IRC, and in my spare time a few friends and I developed an IRC bot we called Dancer. Spare time developing a TCP client written in C.

我需要下载什么：1996 年，我作为一名软件开发人员，在一家名为 Frontec Railway Systems 的瑞典小公司从事嵌入式系统和 C 语言 Unix 开发。在那里工作期间，我了解并喜欢上了 IRC，业余时间里，我和几个朋友开发了一个名为 Dancer 的 IRC 机器人。业余时间都在开发用 C 语言编写的 TCP 客户端。

As the IRC bot slowly grew more capable, I wanted to use its extension capability and provide a currency translation service for the participants in the channel (the IRC term for a chat room). In an international channel like ours, we frequently discussed the price of things and having the bot able to quickly explain how much a hundred German Marks equaled in US Dollars could be a useful service.

随着 IRC 机器人的功能逐渐增强，我想利用它的扩展能力，为频道（IRC 中对聊天室的称呼）的参与者提供货币换算服务。在我们这样的国际频道中，我们经常讨论商品价格，如果机器人能快速解释一百德国马克相当于多少美元，那将是一项有用的服务。

My currency service needed to update currency rates maybe once per day so that it could use decently accurate rates. I found an HTTP page listing a bunch of currency rates and the httpget tool for doing the downloads, and then the bot could offer up-to-date currency rate translations. All was good.

我的货币服务需要每天更新一次汇率，以便使用相当准确的汇率。我找到了一个列出各种汇率的 HTTP 页面，并使用 httpget 工具进行下载，这样机器人就能提供最新的汇率换算。一切都很顺利。

Development I discovered computers and programming as a teenager on a Commodore 64. I got hooked immediately. I first learned Basic and moved on to 6510 assembler pretty quickly. In the late 1980s me and my friends had demo groups where we would write cool demos (and some game attempts) in assembler (under the group name Horizon). I established my habit of spending spare time on programming back then.

开发：我在青少年时期通过 Commodore 64 发现了计算机和编程。我立刻就迷上了。我先是学习了 Basic，很快又转向了 6510 汇编语言。在 20 世纪 80 年代末，我和朋友们组建了演示小组，我们用汇编语言编写酷炫的演示程序（以及一些游戏尝试，小组名为 Horizon）。从那时起，我就养成了利用业余时间进行编程的习惯。

In the early 1990s I moved over to Amiga, started writing a text editor, got my first job at IBM where I truly got into a lot of C and Unix for the first time. Together with some friends we ran a BBS (The Holy Grail), for which we eventually would write our own BBS software; me and my brother Björn. I learned Motorola 68000 assembler on the Amiga. I wrote 8086 assembler on PC. I never attended university. I got my first computer job at IBM when I was twenty. I then thought I would take the uni route later, but I never did. I remain uneducated. In the early 1990s I discovered both the Internet and the world of freely available source code and I was hooked.

20 世纪 90 年代初，我转用 Amiga，开始编写文本编辑器，并在 IBM 获得了第一份工作，在那里我第一次真正深入接触了大量的 C 语言和 Unix。我和朋友们一起运营了一个 BBS（The Holy Grail），最终我和兄弟 Björn 为它编写了自己的 BBS 软件。我在 Amiga 上学习了 Motorola 68000 汇编语言，在 PC 上编写了 8086 汇编语言。我从未上过大学。我在 20 岁时在 IBM 获得了第一份计算机工作。当时我想以后再去上大学，但最终没去。我依然没有受过高等教育。20 世纪 90 年代初，我发现了互联网和自由源代码的世界，从此一发不可收拾。

Maintainer Rafael was not terribly keen on dealing with my patches for httpget. I believe he mostly just put his code out without any particular desire to do anything more with it. Instead I became the httpget maintainer and kept polishing it. My main project was Dancer, the IRC bot. httpget was just a side-project to make sure the currency service kept working fine.

维护者：Rafael 对处理我提交给 httpget 的补丁并不太热心。我相信他只是把代码发布出来，并没有特别想对其做进一步的开发。于是我成为了 httpget 的维护者，并不断对其进行完善。我的主要项目是 IRC 机器人 Dancer。httpget 只是一个副项目，目的是确保货币服务能正常运行。

Gopher and rename At some point I fell over a gopher site that provided many more currency rates than the HTTP page I was scraping at the time so of course I had to add support for that as well to the download too.

Gopher 和重命名：有一次，我偶然发现了一个 Gopher 站点，它提供的汇率比我当时抓取的 HTTP 页面要多得多，所以当然，我也必须在下载工具中添加对它的支持。