---
title: "How to get a free .arpa domain"
originalUrl: "https://hawksley.dev/blog/get-free-arpa-domain"
date: "2026-09-08T23:33:51.604Z"
---

# How to get a free .arpa domain
# 如何获取一个免费的 .arpa 域名

This post is also available over on get-arpa-domain.0.4.1.0.9.0.f.1.0.7.4.0.1.0.0.2.ip6.arpa (opens in a new tab)! On the internet, .arpa is the top level domain reserved for critical internet infrastructure. It isn’t open to public registration, so you can’t own mysite.arpa sadly. However, this isn’t the only way to reserve some real-estate on .arpa - there are many different services that you can abuse to get your own DNS records, and hence your own website.

这篇文章也可以在 get-arpa-domain.0.4.1.0.9.0.f.1.0.7.4.0.1.0.0.2.ip6.arpa（在新标签页中打开）上访问！在互联网上，.arpa 是保留给关键互联网基础设施的顶级域名。它不对公众开放注册，所以遗憾的是你无法拥有 mysite.arpa。然而，这并不是在 .arpa 上预留空间的唯一方法——有许多不同的服务可以被“滥用”来获取你自己的 DNS 记录，从而拥有你自己的网站。

I first learned about this through a blog post explaining e164.arpa (opens in a new tab), an old scheme where you could query information about phone numbers using DNS. If you’re German or Czech, you can sign up and control the DNS records that correspond to your phone number!

我最初是通过一篇解释 e164.arpa（在新标签页中打开）的博文了解到这一点的，这是一种旧方案，你可以通过 DNS 查询有关电话号码的信息。如果你是德国人或捷克人，你可以注册并控制与你电话号码对应的 DNS 记录！

For the rest of the world, our phone numbers aren’t open to registration, so that isn’t an option. Instead, we can use a similar scheme under ip6.arpa. This is reserved for “reverse DNS lookups”, where you can turn IPv6 addresses into domain names, instead of the other way around. However, nothing in the specification stops us from using it for other purposes, so let’s do so!

对于世界其他地区的人来说，我们的电话号码不对外开放注册，所以这不是一个可行的选择。相反，我们可以使用 ip6.arpa 下类似的方案。它被保留用于“反向 DNS 查询”，即你可以将 IPv6 地址转换为域名，而不是反过来。然而，规范中没有任何内容阻止我们将它用于其他目的，所以让我们开始吧！

Hurricane Electric offers really simple registration for an IPv6 address and its ip6.arpa records through tunnelbroker.net, so let’s use them. Their site is a bit of a relic, but it is fully functional.

Hurricane Electric 通过 tunnelbroker.net 提供了非常简单的 IPv6 地址及其 ip6.arpa 记录注册服务，所以我们使用它。他们的网站看起来有点过时，但功能完全正常。

Next, sign up for a new account. It will ask for some personal information, but if you’d rather you can provide fake information since it doesn’t verify any of it. Confirm your email address, and then in the left sidebar select “Create Regular Tunnel”.

接下来，注册一个新账户。它会要求提供一些个人信息，但如果你愿意，可以提供虚假信息，因为它不会进行任何验证。确认你的电子邮件地址，然后在左侧边栏选择“Create Regular Tunnel”（创建常规隧道）。

It will ask for an IPv4 endpoint, though for our goal it doesn’t matter which address we choose. The IP needs to respond to ICMP Echoes (a.k.a. pings), but there’s no verification that you control the provided IPv4 address. Just use ping -4 domainname.com on a few websites until you find an IPv4 address that it will accept. It seems most sites that are behind CDNs don’t work, so try older sites first. Here I pinged news.ycombinator.com and received the ip address 209.216.230.207.

它会要求提供一个 IPv4 端点，但对于我们的目标来说，选择哪个地址并不重要。该 IP 需要能够响应 ICMP 回显（即 ping），但它不会验证你是否拥有该 IPv4 地址。只需在几个网站上使用 `ping -4 domainname.com`，直到找到一个它接受的 IPv4 地址。似乎大多数位于 CDN 后面的网站都无法使用，所以先尝试一些老牌网站。我 ping 了 news.ycombinator.com 并得到了 IP 地址 209.216.230.207。

This seemed to pass Hurricane Electric’s form validation, so that’s all that matters. It also asks you to select a Tunnel Server, but similarly this doesn’t matter for our purposes - any will do.

这似乎通过了 Hurricane Electric 的表单验证，这就足够了。它还会要求你选择一个隧道服务器，但同样，这对我们的目的来说并不重要——随便选一个就行。

Once you’ve created a tunnel, take note of the “Routed IPv6 Prefix”. Here mine is 2001:470:1f09:140::/64, but the only part we need is 2001:470:1f09:140 before the trailing colons.

创建隧道后，记下“Routed IPv6 Prefix”（路由 IPv6 前缀）。我的前缀是 2001:470:1f09:140::/64，但我们只需要冒号之前的部分：2001:470:1f09:140。

Note: Although here we aren’t actually using tunnels for their intended purpose, I recommend giving them a closer look. In short, they encapsulate your IPv6 traffic inside IPv4 packets, so your ISP/router doesn’t even need to support IPv6.

注意：虽然我们在这里并没有真正将隧道用于其预定目的，但我建议你仔细研究一下它们。简而言之，它们将你的 IPv6 流量封装在 IPv4 数据包中，因此你的 ISP/路由器甚至不需要支持 IPv6。

Pad each section with zeroes to get four groups of four characters: 2001:0470:1f09:0140. Then place a dot between each character: 2.0.0.1.0.4.7.0.1.f.0.9.0.1.4.0. Finally, reverse the characters and append .ip6.arpa to get your own domain name: 0.4.1.0.9.0.f.1.0.7.4.0.1.0.0.2.ip6.arpa!

将每一部分用零填充，得到四组四个字符：2001:0470:1f09:0140。然后在每个字符之间加一个点：2.0.0.1.0.4.7.0.1.f.0.9.0.1.4.0。最后，反转字符并附加 .ip6.arpa，即可得到你自己的域名：0.4.1.0.9.0.f.1.0.7.4.0.1.0.0.2.ip6.arpa！

Next, we need to set up DNS records for the domain. When I last tried this, Cloudflare didn’t seem to accept the domain, but deSEC handled it perfectly, so that is what we’ll be using. Sign up for a deSEC account and provide the .ip6.arpa address you calculated from earlier. Once added, return to Tunnelbroker and change your rDNS delegations to that of deSEC.

接下来，我们需要为该域名设置 DNS 记录。我上次尝试时，Cloudflare 似乎不接受该域名，但 deSEC 处理得非常完美，所以我们将使用它。注册一个 deSEC 账户，并提供你之前计算出的 .ip6.arpa 地址。添加完成后，回到 Tunnelbroker 并将你的 rDNS 委派更改为 deSEC 的地址。

We have a domain, we have DNS, so the very last step is a web host. Out of the options, Surge is very straightforward and doesn’t enforce HTTPS. This is handy because many (though not all) certificate authorities refuse to serve .arpa domains, hence getting HTTPS working can be quite challenging. It isn’t impossible, though, but it is beyond the scope of this guide.

我们有了域名，有了 DNS，最后一步就是 Web 主机。在众多选项中，Surge 非常简单且不强制要求 HTTPS。这很方便，因为许多（虽然不是全部）证书颁发机构拒绝为 .arpa 域名颁发证书，因此让 HTTPS 工作起来可能相当具有挑战性。不过，这并非不可能，但超出了本指南的范围。

Create a new directory and an index.html file. You can put whatever content you’d like inside the index.html, I decided to put a bare-bones replica of this blog post (opens in a new tab).

创建一个新目录和一个 index.html 文件。你可以在 index.html 中放入任何你想要的内容，我决定放入这篇博文的一个极简副本（在新标签页中打开）。

Install npm or bun if you haven’t already, and run surge.
`bunx surge . subdomain.domain.ip6.arpa` # or alternatively `npx surge . subdomain.domain.ip6.arpa`

如果你还没有安装 npm 或 bun，请先安装，然后运行 surge。
`bunx surge . subdomain.domain.ip6.arpa` # 或者使用 `npx surge . subdomain.domain.ip6.arpa`

Here, “subdomain” is a subdomain of your choice, and “domain” is the ip6.arpa address you calculated earlier. If it asks, make a free account as part of signup. Make note of the address it gives near the end of its output.

这里，“subdomain”是你选择的子域名，“domain”是你之前计算出的 ip6.arpa 地址。如果它要求，注册一个免费账户即可。记下它在输出末尾给出的地址。

Lastly, return to deSEC and create a CNAME record pointing to the surge.sh address. Assuming your local resolver hasn’t cached an earlier NXDOMAIN response, you can visit your domain immediately and see your site! You now have a fully functional website running off a reserved infrastructure TLD.

最后，回到 deSEC 并创建一个指向 surge.sh 地址的 CNAME 记录。假设你的本地解析器没有缓存之前的 NXDOMAIN 响应，你就可以立即访问你的域名并看到你的网站了！现在，你拥有了一个运行在保留基础设施顶级域名上的功能齐全的网站。