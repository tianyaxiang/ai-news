---
title: "C2PA's eMudhra Moment"
originalUrl: "https://www.da.vidbuchanan.co.uk/blog/c2pa-four.html"
date: "2026-10-29T20:33:44.000Z"
excerpt: false
---

### C2PA 的 eMudhra 时刻

C2PA's eMudhra Moment By David Buchanan (aka retr0id), 29th October 2026

eMudhra 事件展示了现代 Web PKI 生态系统在面对证书颁发机构（CA）遭入侵时是如何反应的。综合来看，我认为处理过程很顺利——我使用的所有网络浏览器都迅速获取了吊销信息。但这也造成了一团糟，eMudhra 试图淡化其责任，并拒绝详细说明故障究竟是如何发生的。此外，还有大量 TLS 客户端无法很好地处理吊销，或者无法及时更新其信任存储。

The eMudhra incident has shown how the modern Web PKI ecosystem reacts to a CA compromise. All things considered, I think it went smoothly—all the web browsers I use picked up the revocations swiftly. But it has also been a clusterfuck, with eMudhra trying to downplay their responsibilities and refusing to elaborate on how exactly the failure occurred. There's also a long tail of TLS clients that don't have a great way to handle revocations, or are otherwise not getting their trust stores updated in a timely manner.

C2PA 生态系统试图解决与 Web PKI 非常相似的问题，但它相对而言还处于起步阶段。你今天在搜索结果首位找到的媒体验证工具根本不支持吊销。那么，C2PA 生态系统将如何应对类似的入侵呢？让我们一探究竟！

The C2PA ecosystem tries to solve a very similar problem to Web PKI, but it is comparatively in its infancy. The media verification tools you'll find in search result top-spots today don't support revocation at all. So how would the C2PA ecosystem react to a similar compromise? Let's find out!

*(此处省略代码块)*

[Code block omitted]

上述内容演示了一条 S/MIME 加密消息，其签名链接至 Google 的 C2PA 根证书颁发机构，该机构位于官方 C2PA 信任列表中。我为生成此链所利用的漏洞不符合漏洞赏金计划的奖励条件，事实上它们已经是公开的秘密。但本着我们这个小实验的精神，我不会详细说明。

The above demonstrates a S/MIME encrypted message, with a signature that chains to Google's C2PA root CA, which is in the official C2PA trust list. The vulnerabilities I exploited to produce this chain are not eligible for bug bounty rewards, and are in fact already publicly known. But in the spirit of our little experiment I'm not going to elaborate.

呃，事实上 ☝️🤓 敏锐的观察者会注意到，我的演示与 eMudhra 入侵“并不相同”，因为它仅仅是一个私钥为 4 的叶子证书，而不是一个受信任的中间证书。我可以让 Google 的中间证书签署我喜欢的任何叶子密钥（通过一种未公开的方法），而那个“4”密钥只是我证明这一点的方式。在 TLS 的背景下，这在某种程度上是证书颁发的正常工作方式，但它完全破坏了 C2PA 的信任模型。

Erm, Actually ☝️🤓 The astute observer will note that my demo is "not the same" as the eMudhra compromise, because it's merely a leaf cert that has a private key of 4, rather than a trusted intermediate. I can get Google's intermediate to sign any leaf key I like (via an undisclosed method), and that "4" key is just how I'm proving it. In the context of TLS that's kinda how cert issuance works normally, but it completely breaks the C2PA trust model.