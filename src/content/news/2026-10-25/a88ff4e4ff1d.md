---
title: "I want my Wednesday back"
originalUrl: "https://blog.luitjes.it/posts/i-want-my-wednesday-back/"
date: "2026-10-24T10:09:28.000Z"
excerpt: false
---

# I want my Wednesday back

I want my Wednesday back 23 Oct 2026 Or, why we’re not seeing mass-exploitation of php2shell yet. I saw wildly varying opinions on whether php2shell is serious, or if they cried wolf. Got curious, started digging into the PoCs. I’m not an exploit dev and maybe there were other factors, so take with a grain of salt. Egg on my face if mass exploitation starts right as I hit publish.

我想要回我的周三，2026年10月23日。或者说，为什么我们还没有看到 php2shell 的大规模利用。我看到了关于 php2shell 是否严重，或者是否有人在危言耸听的各种截然不同的观点。我感到好奇，于是开始研究这些概念验证（PoC）。我不是漏洞利用开发者，也许还有其他因素，所以请对我的观点持保留态度。如果在我发布文章时大规模利用就开始了，那我会感到非常尴尬。

Best PoC of php2shell I’ve found: https://github.com/9bie/php2shell-bypass-aslr-exp (and a fork with all docs translated to english) To exploit, you need to do four consecutive requests to the same php worker process. And you need to know the exact php build (php version, OS version, architecture), or try exploits for every possible build.

我找到的最好的 php2shell 概念验证地址是：https://github.com/9bie/php2shell-bypass-aslr-exp （以及一个将所有文档翻译成英文的分支）。要进行利用，你需要对同一个 php 工作进程连续发送四个请求。并且你需要知道确切的 php 构建版本（php 版本、操作系统版本、架构），或者尝试针对每一种可能的构建版本进行利用。

What this PoC does is take a docker image that uses the default mod_php number of workers, which is 150. Then it opens 149 connections that send half a request to keep the other workers busy, and does the four exploit requests against the 150th worker. Even a moderately popular production website will have multiple web VMs/containers running multiple php workers behind a load balancer and constant bot traffic.

这个概念验证的做法是使用一个采用默认 mod_php 工作进程数（即 150 个）的 docker 镜像。然后它打开 149 个连接，发送半个请求来占用其他工作进程，并对第 150 个工作进程执行四个利用请求。即使是一个中等规模的生产网站，也会在负载均衡器后运行多个 web 虚拟机/容器，并处理多个 php 工作进程以及持续的机器人流量。

That means you would have to try a wide range of number of connections to open. On top of that you likely won’t know the exact build version, so you would have to try exploits for every combination out there. Let’s say you try this for the 50 most popular php/OS combinations, and any number of workers between 10 and 1010. That’s 50k attempts. But against constant background traffic, you would need to try each combination a number of times.

这意味着你必须尝试打开各种数量的连接。除此之外，你很可能不知道确切的构建版本，因此你必须尝试每一种组合的利用方式。假设你针对 50 种最流行的 php/操作系统组合进行尝试，并且工作进程数量在 10 到 1010 之间。那就是 5 万次尝试。但在持续的背景流量下，你需要对每种组合进行多次尝试。

Each of these attempts involves opening a whole lot of connections, so they each take some time. The PoC runs against localhost and takes 3-4 seconds, so let’s optimistically call it 10 seconds on the internet. You can only do one attempt at a time, so that means multiple days of bruteforcing in a way that is essentially a DoS, since a large part of that range will exhaust the maximum number of connections.

这些尝试中的每一次都涉及打开大量的连接，因此每次都需要一些时间。该概念验证在本地运行需要 3-4 秒，所以我们乐观地估计在互联网上需要 10 秒。你一次只能进行一次尝试，这意味着需要多天的暴力破解，这种方式本质上是一种拒绝服务攻击（DoS），因为该范围的很大一部分会耗尽最大连接数。

At this point the person running the site will likely notice, start blocking IP addresses or adding a WAF. Most high-traffic websites already run WAFs/rate-limiting to deal with bot traffic, so you would need to run this attack from a great many IPs, and preferably clean ones that are harder to come by. But running this from many IPs also increases the chances that your timing will be off, reducing the number of plausible attempts even further.

此时，网站运营者很可能会注意到，开始封锁 IP 地址或添加 Web 应用防火墙（WAF）。大多数高流量网站已经运行了 WAF/速率限制来处理机器人流量，因此你需要从大量的 IP 地址发起攻击，最好是更难获得的干净 IP。但从多个 IP 发起攻击也会增加时间偏差的可能性，从而进一步减少可行的尝试次数。

That’s assuming the WAF doesn’t block your attempts entirely, because the easiest ways to exploit these vulnerabilities were known at the time of the announcement. I’m sure people and agents will come up with clever techniques to reduce the required number of attempts eventually. But that has nothing to do with “this will get mass-exploited within 15 minutes.”

这还是假设 WAF 没有完全阻止你的尝试，因为在公告发布时，利用这些漏洞的最简单方法就已经为人所知了。我相信人们和代理机构最终会想出巧妙的技术来减少所需的尝试次数。但这与“这将在 15 分钟内被大规模利用”毫无关系。

Against very low-traffic websites that do not have any bot protection, leak information about their version, running close to stock configuration, you might get lucky. So sure, it’s a critical vulnerability, deserves attention, should be patched ASAP. Maybe even put in the announcement that if you’re running low-traffic sites, be extra sure to patch fast.

对于那些没有任何机器人防护、泄露版本信息且运行接近默认配置的极低流量网站，你可能会走运。所以当然，这是一个严重的漏洞，值得关注，应该尽快修补。也许甚至可以在公告中说明，如果你运行的是低流量网站，请务必尽快修补。

But to the AI security vendors who promoted this as THE GATES OF HELL WILL OPEN YOU HAVE TO PATCH WITHIN 15 MINUTES OR DIE? I want my Wednesday back. Oh and the claims of it being exploited in the wild? At time of writing, they’re referring to exploitation attempts. In fact, HoneyLabs so far hasn’t seen a single exploit attempt that could even run successfully. Update: discussions on lobste.rs and reddit.

但是对于那些将此宣传为“地狱之门即将开启，你必须在 15 分钟内修补，否则就会死”的人工智能安全厂商呢？我想要回我的周三。哦，还有关于它在野外被利用的说法？在撰写本文时，他们指的是利用尝试。事实上，HoneyLabs 到目前为止还没有看到任何一个能够成功运行的利用尝试。更新：关于 lobste.rs 和 reddit 上的讨论。