---
title: "Scriptable GeoDNS: leaving AWS for Bunny"
originalUrl: "https://vincent.bernat.ch/en/blog/2026-bunny-geodns"
date: "2026-11-07T07:46:35.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

To optimize the performance metrics of this blog, I relied on Amazon CloudFront to serve the assets, and Route 53 for the geo-aware DNS to direct readers to the closest host serving the content. But Route 53 is expensive: US$0.50 per zone per month, US$0.70 per million geolocation queries, and US$0.75 per healthcheck per month, plus US$1 per month for the KMS key needed to sign zones with DNSSEC. When I discovered that Bunny DNS is almost free for up to 500 domains and features scriptable answers, I made the jump! Plus, it’s a European company based in Slovenia.

为了优化本博客的性能指标，我曾依赖 Amazon CloudFront 来提供资源，并使用 Route 53 的地理位置感知 DNS 将读者引导至距离最近的内容主机。但 Route 53 非常昂贵：每个区域每月 0.50 美元，每百万次地理位置查询 0.70 美元，每个健康检查每月 0.75 美元，此外还需要每月 1 美元用于 DNSSEC 区域签名所需的 KMS 密钥。当我发现 Bunny DNS 在 500 个域名以内几乎免费，且支持可编程响应时，我果断进行了迁移！况且，这是一家总部位于斯洛文尼亚的欧洲公司。

Bunny.net started as BunnyCDN in 2015. They added IPv6 support in 2017. Switching was uneventful. I don’t bring a custom domain: I serve the content from the b-cdn.net domain. As I depend on content negotiation to serve AVIF and WebP images, I configure the CDN to cache each image format separately. I disable logging to avoid collecting personal information. While the bunny.net GDPR page promises they anonymize data, it is unclear what CloudFront keeps in its own logs when logging is disabled. The only downside of the bunny.net CDN offering is the lack of HTTP/3. I asked their support: two minutes later, they answered they are working on it but have no ETA to share.

Bunny.net 最初于 2015 年以 BunnyCDN 的身份起步，并于 2017 年增加了对 IPv6 的支持。切换过程非常顺利。我没有使用自定义域名，而是直接通过 b-cdn.net 域名提供内容。由于我依赖内容协商来提供 AVIF 和 WebP 格式的图片，因此我将 CDN 配置为分别缓存每种图片格式。我禁用了日志记录以避免收集个人信息。虽然 bunny.net 的 GDPR 页面承诺他们会对数据进行匿名化处理，但尚不清楚在禁用日志记录时 CloudFront 会保留哪些信息。Bunny.net CDN 服务的唯一缺点是缺乏对 HTTP/3 的支持。我咨询了他们的客服，两分钟后他们回复称正在开发中，但目前没有确切的时间表。

Bunny.net introduced their DNS offering in 2022 and recently reduced its cost to almost zero. They support geographical routing, but a very cool feature is the scriptable DNS: it runs a piece of user-supplied JavaScript on each query to compute the answer. I run seven small NixOS virtual machines to host this blog around the world: Paris, Nuremberg, Ashburn, Singapore, San Jose, São Paulo, and Sydney. Bunny’s scriptable DNS lets me return the IP addresses of the two nearest servers. The browser falls back to the second server if the first one is down.

Bunny.net 于 2022 年推出了 DNS 服务，并于近期将其成本降至几乎为零。他们支持地理路由，但最酷的功能是可编程 DNS：它会在每次查询时运行一段用户提供的 JavaScript 代码来计算响应结果。我在全球运行了七台小型 NixOS 虚拟机来托管本博客，分别位于巴黎、纽伦堡、阿什本、新加坡、圣何塞、圣保罗和悉尼。Bunny 的可编程 DNS 允许我返回距离最近的两台服务器的 IP 地址。如果第一台服务器宕机，浏览器会自动回退到第二台服务器。

The above script relies on the RoutingEngine.getClosestServer() helper, which returns the closest alive server to the user. Thanks to Doggo, we can check it works as expected, at least for A. The most annoying drawback of this method is that a user from Buenos Aires gets both São Paulo (1000 mi, 30 ms RTT) and Ashburn (5200 mi, 140 ms RTT). Most resolvers randomize the order, so the user may pull the web page from Ashburn. We could return only the nearest server—and swap the scripted record with the built-in geographic routing instead. But if the server becomes unavailable, the browser has no alternative until the DNS cache expires. It leaves a short window of unavailability, even with a short TTL.

上述脚本依赖于 RoutingEngine.getClosestServer() 辅助函数，它会返回距离用户最近的存活服务器。多亏了 Doggo 工具，我们可以验证它是否按预期工作（至少对于 A 记录是这样）。这种方法最令人烦恼的缺点是，来自布宜诺斯艾利斯的用户可能会同时获得圣保罗（1000 英里，30 毫秒往返延迟）和阿什本（5200 英里，140 毫秒往返延迟）的地址。大多数解析器会随机排序，因此用户可能会从阿什本加载网页。我们可以只返回最近的服务器，并用内置的地理路由替换脚本记录。但如果该服务器变得不可用，在 DNS 缓存过期之前，浏览器将没有备选方案。即使 TTL 设置得很短，这也会导致短暂的服务不可用窗口。

The HTTPS DNS record, defined in RFC 9460, solves both the availability and the latency issues. Modern browsers query this record to get additional information to reach an HTTP server, including an alternative port and the application layer protocol—HTTP/2 or HTTP/3. Each record has a priority. We can ask browsers to contact the nearest server first and fall back to the second one if the first is unavailable. This looks like the ideal solution! Unfortunately, Chrome ignores any record whose target is not ".", hence the last record at priority 3. Moreover, unlike with a CNAME, Bunny DNS does not return the IP addresses for first.geo and second.geo in the additional section. The resolver needs to send a first request to get the HTTPS record, and a second to resolve first.geo. HTTPS records are still too new for this use case. Back to the drawing board!

RFC 9460 中定义的 HTTPS DNS 记录解决了可用性和延迟问题。现代浏览器会查询此记录以获取连接 HTTP 服务器的额外信息，包括备用端口和应用层协议（HTTP/2 或 HTTP/3）。每条记录都有优先级。我们可以要求浏览器优先联系最近的服务器，如果第一台不可用，则回退到第二台。这看起来是理想的解决方案！遗憾的是，Chrome 会忽略任何目标不是 "." 的记录，因此优先级 3 的最后一条记录是必须的。此外，与 CNAME 不同，Bunny DNS 不会在附加部分返回 first.geo 和 second.geo 的 IP 地址。解析器需要发送第一次请求来获取 HTTPS 记录，并发送第二次请求来解析 first.geo。HTTPS 记录对于这种用例来说还太新了。只能重新设计了！

As a compromise, the script returns the two nearest servers if they are at a similar distance from the user. Otherwise, it returns only the nearest one with a lower TTL of 2 minutes.

作为一种折中方案，如果两台服务器距离用户的距离相近，脚本会返回这两台服务器。否则，它只返回最近的一台，并将 TTL 降低至 2 分钟。