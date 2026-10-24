---
title: "Indian government sites are serving revoked eMudhra certificates"
originalUrl: "https://captnemo.in/blog/2026/10/23/emsign-revoked-gov-in/"
date: "2026-10-24T04:06:06.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

Nemo's Home Indian government sites are serving revoked eMudhra certificates ⚓ 23 Oct 2026 On 17th October, eight eMudhra intermediate CAs chaining to emSign ECC Root CA - G3 were found to have trivially recoverable private keys. They were revoked the next day, and Mozilla and Chrome are now distrusting the G3 root.

Nemo's Home 印度政府网站正在使用已被吊销的 eMudhra 证书 ⚓ 2026 年 10 月 23 日。10 月 17 日，八个链接到 emSign ECC Root CA - G3 的 eMudhra 中间证书颁发机构（CA）被发现拥有可轻易恢复的私钥。它们在次日被吊销，Mozilla 和 Chrome 目前已不再信任该 G3 根证书。

Separately, on 19th October eMudhra revoked 9,356 certificates on its unaffected RSA hierarchy (emSign Root CA - G1) with the reason “Superseded”. That batch matches every unexpired certificate missing a certificate-type policy OID required by emSign’s own CP/CPS (Bug 2082782).

另外，10 月 19 日，eMudhra 以“被取代”（Superseded）为由，吊销了其未受影响的 RSA 层级（emSign Root CA - G1）下的 9,356 个证书。该批次涵盖了所有缺少 emSign 自身 CP/CPS 所要求的证书类型策略 OID 的未过期证书（Bug 2082782）。

On 21st October, MeitY posted this thread: A security incident concerning eMudhra’s Public Key Infrastructure (PKI) was reported in the public domain. […] However, some social media accounts are indulging in fear mongering about the impact of this incident. […] The impact of this incident on Indian websites and applications have been very limited and for a very short interval. — @GoI_MeitY, 21st October 2026, 16:31 CEST

10 月 21 日，印度电子和信息技术部（MeitY）发布了以下推文：公共领域报道了一起关于 eMudhra 公钥基础设施（PKI）的安全事件。[……] 然而，一些社交媒体账号正在散布关于此次事件影响的恐慌。[……] 此次事件对印度网站和应用程序的影响非常有限，且持续时间非常短。—— @GoI_MeitY，2026 年 10 月 21 日，欧洲中部夏令时间 16:31

That last claim is wrong on both counts. The interval wasn’t short: the flawed keys were generated in April 2025, so anyone could have recovered them for 18 months before the report. The impact isn’t limited either: the compromised intermediates barely issued anything, but Mozilla and Chrome are now distrusting the entire G3 root, so eMudhra estimates 30,000 certificates from its unaffected G3 intermediates must be migrated.

最后这一说法在两方面都是错误的。持续时间并不短：这些有缺陷的密钥生成于 2025 年 4 月，因此在报告发布前的 18 个月里，任何人都可以恢复它们。影响也不有限：虽然受损的中间证书几乎没有签发过什么证书，但 Mozilla 和 Chrome 现在已不再信任整个 G3 根证书，因此 eMudhra 估计其未受影响的 G3 中间证书签发的 30,000 个证书必须进行迁移。

From what I could see, most of those seem to belong to US universities using eMudhra through InCommon rather than Indian sites. Meanwhile, the 19th October revocations have left Indian government sites serving revoked certificates days later, including four bodies under MeitY itself: STPI, Bhashini, UIDAI, and the Controller of Certifying Authorities, whose India PKI site is serving a revoked eMudhra certificate.

据我观察，这些证书大多属于通过 InCommon 使用 eMudhra 的美国大学，而非印度网站。与此同时，10 月 19 日的吊销行动导致印度政府网站在几天后仍在提供已吊销的证书，其中包括 MeitY 下属的四个机构：STPI、Bhashini、UIDAI 以及认证机构控制官（Controller of Certifying Authorities），其印度 PKI 网站目前正在使用一个已吊销的 eMudhra 证书。

Notably, Controller of Certifying Authorities regulates eMudhra’s CA business in India. The table below lists every government domain name on an unexpired certificate that eMudhra has revoked: 2976 names. 894 of them are still serving the revoked certificate and 810 have moved to a new one; the rest don’t respond.

值得注意的是，认证机构控制官负责监管 eMudhra 在印度的 CA 业务。下表列出了 eMudhra 已吊销的未过期证书中的所有政府域名：共 2976 个名称。其中 894 个仍在提供已吊销的证书，810 个已更换为新证书；其余的则无响应。

The full list of all 16161 names, government or not, is available as CSV. Most were revoked within minutes of each other on 19th October, and are listed in eMudhra’s CRLs such as DV/G2A-1, OV/G2A-1, EV/G2A-1 and G1. Whether these sites open depends on your browser. Firefox ships CRLite, which covers every revocation, and refuses to load them.

包含所有 16161 个名称（无论是否为政府机构）的完整列表以 CSV 格式提供。大多数证书在 10 月 19 日的几分钟内被相继吊销，并列在 eMudhra 的证书吊销列表（CRL）中，如 DV/G2A-1、OV/G2A-1、EV/G2A-1 和 G1。这些网站能否打开取决于你的浏览器。Firefox 内置了 CRLite，涵盖了所有吊销信息，因此会拒绝加载这些网站。

Chrome’s CRLSet (version 10856, 24th October) has none of these certificates, nor any of the 6,235 entries on the DV/G2A-1 CRL, so Chrome, Edge and Android load them fine. So does Safari on iOS, which only checks OCSP for EV certificates. Two sites on the list have one: www.isea.gov.in and nfscnagpur.nic.in, and emSign’s OCSP responder reports the isea.gov.in certificate as revoked, so Safari on iOS refuses to load it.

Chrome 的 CRLSet（版本 10856，10 月 24 日）中没有这些证书，也没有 DV/G2A-1 CRL 列表中的 6,235 个条目，因此 Chrome、Edge 和 Android 可以正常加载它们。iOS 上的 Safari 浏览器也是如此，它仅对 EV 证书检查 OCSP。列表中的两个网站拥有 EV 证书：www.isea.gov.in 和 nfscnagpur.nic.in，而 emSign 的 OCSP 响应程序报告 isea.gov.in 的证书已被吊销，因此 iOS 上的 Safari 拒绝加载它。

SSL Labs checks the CRL itself and marks all of these as Grade F / revoked. Revocations happen (GoDaddy just revoked 4 lakh certificates), but they are usually accompanied by notifications to subscribers to get them to new valid certificates. I’m not sure if eMudhra is doing any of the sort, now that they don’t care about their TLS business.

SSL Labs 会自行检查 CRL，并将所有这些证书标记为 F 级/已吊销。吊销事件时有发生（GoDaddy 最近刚刚吊销了 40 万个证书），但通常会伴随通知，告知订阅者获取新的有效证书。我不确定 eMudhra 是否在做类似的事情，毕竟他们现在似乎并不关心其 TLS 业务了。

Update: 24th October My first count of 156 sites is now 1377 Indian government domain names on revoked certificates, after scanning every name on eMudhra’s revoked certificates instead of just the IGOD directory, and re-checking sites that block foreign visitors from India. 811 of them are still serving the revoked certificate.

更新：10 月 24 日。在我扫描了 eMudhra 已吊销证书上的每一个名称（而非仅限于 IGOD 目录），并重新检查了那些屏蔽印度境外访问者的网站后，我最初统计的 156 个网站现已增加到 1377 个使用已吊销证书的印度政府域名。其中 811 个仍在提供已吊销的证书。