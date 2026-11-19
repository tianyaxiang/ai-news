---
title: "DNS resolvers are the wrong place to fight piracy"
originalUrl: "https://techstackups.com/articles/quad9-leaves-france-dns-blocking/"
date: "2026-11-18T13:18:02.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# DNS resolvers are the wrong place to fight piracy

On Tuesday, November 24, 2026, Quad9 will stop answering DNS queries from France. Quad9 is the Swiss non-profit behind the free 9.9.9.9 resolver, which blocks malware and phishing domains. It is not leaving because of costs or lack of users. It is leaving because a Paris court fined it for refusing to block a list of pirate sports-streaming domains on behalf of beIN Sports. With around 20 similar cases still pending in France, leaving the country is the only option Quad9 can afford.

2026年11月24日星期二，Quad9将停止响应来自法国的DNS查询。Quad9是一家瑞士非营利组织，负责运营免费的9.9.9.9解析器，该解析器旨在拦截恶意软件和钓鱼网站。它离开并非因为成本或用户不足，而是因为巴黎一家法院对其处以罚款，原因在于它拒绝代表beIN Sports屏蔽一系列盗版体育流媒体域名。由于法国目前还有约20起类似案件悬而未决，离开该国是Quad9唯一负担得起的选择。

Cloudflare, which runs the competing 1.1.1.1 resolver, called the departure "a canary in the coal mine", and the post reached the front page of Hacker News. In that thread, Quad9's CTO John Todd asked readers to write "a long-form, well-reasoned statement of why France is taking the wrong path", with plenty of sources, and to send it to policymakers. This is our attempt. Every claim below links to a primary document, a court ruling, or contemporaneous reporting.

运营竞争对手1.1.1.1解析器的Cloudflare称此次撤离是“煤矿里的金丝雀”，相关文章登上了Hacker News的头版。在该讨论帖中，Quad9的首席技术官John Todd呼吁读者撰写一份“详尽且论证充分的声明，阐述为何法国正走在错误的道路上”，并附上充足的来源，发送给政策制定者。这就是我们的尝试。下文中的每一项主张均链接至原始文件、法院裁决或当时的报道。

A DNS resolver turns a name like example.com into an IP address your computer can connect to. Most people use their ISP's resolver without knowing it. A public resolver is one anyone can point their device or network at instead, such as Google's 8.8.8.8, Cloudflare's 1.1.1.1, Cisco's OpenDNS, or Quad9's 9.9.9.9.

DNS解析器将诸如example.com之类的名称转换为计算机可以连接的IP地址。大多数人在不知情的情况下使用其互联网服务提供商（ISP）的解析器。公共解析器则是任何人都可以将其设备或网络指向的替代方案，例如谷歌的8.8.8.8、Cloudflare的1.1.1.1、思科的OpenDNS或Quad9的9.9.9.9。

Quad9 has a few properties that make it unusual:

Quad9具备一些使其与众不同的特性：

Organisations have come to depend on it. Mullvad shut down its own public encrypted DNS service on November 2, 2026 and moved Mullvad Browser users with default settings to Quad9, funding Quad9 instead. (Mullvad Browser users in France will now be migrated to a resolver that disappears three weeks later.) Quad9's announcement lists dozens of French networks it sees traffic from, including the interministerial digital directorate DINUM, France Travail, CEA, Institut Pasteur, RENATER, EDF, SNCF, AP-HM hospitals in Marseille, France Télévisions, Thales, and Airbus's Stormshield. Quad9 can't tell any of them it is leaving. As Cloudflare points out, when a resolver disappears, users don't see an error message. "Their Internet will simply stop working."

各机构已开始依赖它。Mullvad于2026年11月2日关闭了其自有的公共加密DNS服务，并将使用默认设置的Mullvad浏览器用户迁移至Quad9，转而资助Quad9。（法国的Mullvad浏览器用户现在将被迁移到一个三周后就会消失的解析器上。）Quad9的公告列出了其监测到流量的数十个法国网络，包括跨部门数字管理局（DINUM）、法国就业局（France Travail）、法国原子能委员会（CEA）、巴斯德研究所、法国国家教育科研网络（RENATER）、法国电力公司（EDF）、法国国家铁路公司（SNCF）、马赛AP-HM医院、法国电视台、泰雷兹集团以及空客的Stormshield。Quad9无法告知其中任何一家机构它即将离开。正如Cloudflare所指出的，当解析器消失时，用户不会看到错误消息，“他们的互联网将直接停止工作。”

The legal basis for all of this is Article L.333-10 of the French sports code. It was created by Law 2021-1382 of October 25, 2021, the same law that merged HADOPI and the CSA into the new regulator Arcom. L.333-10 lets a sports rightsholder go to the president of the Paris judicial court and obtain "dynamic" blocking orders, meaning orders that cover sites already identified plus new mirror domains notified later through Arcom, against "toute personne susceptible de contribuer à y remédier" (any person able to help stop the infringement).

这一切的法律依据是法国体育法典第L.333-10条。该条款由2021年10月25日的第2021-1382号法律设立，该法律同时将HADOPI和CSA合并为新的监管机构Arcom。L.333-10允许体育权利持有人向巴黎司法法院院长申请“动态”屏蔽令，即涵盖已识别网站以及随后通过Arcom通知的新镜像域名的命令，针对的是“任何能够帮助制止侵权行为的人”。

That last phrase is what puts DNS resolvers in scope. In July 2026, Parliament passed Law 2026-725 on professional sport, which amended L.333-10 and added an automated real-time blocking system run by Arcom. TorrentFreak reported that under the new system "ARCOM's agents no longer approve each block in advance." Quad9 called it "recklessly dangerous."

最后那句话正是将DNS解析器纳入管辖范围的原因。2026年7月，议会通过了关于职业体育的第2026-725号法律，修订了L.333-10并增加了由Arcom运行的自动化实时屏蔽系统。TorrentFreak报道称，根据新系统，“ARCOM的代理人不再预先批准每一项屏蔽”。Quad9称此举“极其危险”。

The timeline shows how the circle of targets has widened:

时间线显示了目标范围是如何扩大的：

The 21 October judgment is short and worth reading. A few details matter:

10月21日的判决书很短，值得一读。其中几个细节至关重要：

€1,000 a day for three weeks is survivable, about €24,000. Twenty more cases like it, each running for a full football season with ever-growing domain lists and Arcom's new automated system feeding them, is not. Quad9 says: "Quad9 cannot survive the accumulation of penalties yet to be assessed in 20 other pending cases."

三周内每天1000欧元的罚款尚可承受，总计约24000欧元。但如果再有20起类似案件，每起案件持续整个足球赛季，且伴随着不断增长的域名列表以及Arcom新自动化系统的推送，情况就不同了。Quad9表示：“Quad9无法承受在其他20起未决案件中可能累积的罚款。”

Quad9 is often asked why it doesn't just block the domains. It has three options, and none of them work.

Quad9经常被问到为什么不直接屏蔽这些域名。它有三个选项，但没有一个行得通。

1. Block globally. This is what Quad9 did for Canal+ in December 2024 and what DNS4EU does today. It means a French court decides what a user in Brazil, Kenya or Germany can resolve, for the commercial benefit of one company. Quad9's announcement asks how France would react if other nations imposed their laws on French users through DNS. The answer is obvious, and the reverse should be too. Nothing limits this to sports either: once global blocking is accepted, every court in every country can add names to everyone's resolver.

1. 全球屏蔽。这是Quad9在2024年12月为Canal+所做的，也是DNS4EU目前正在做的。这意味着法国法院为了某一家公司的商业利益，决定了巴西、肯尼亚或德国的用户可以解析什么。Quad9的公告反问道，如果其他国家通过DNS将其法律强加给法国用户，法国会有何反应？答案显而易见，反之亦然。而且这不仅限于体育领域：一旦全球屏蔽被接受，世界各国的所有法院都可以将域名添加到每个人的解析器中。

2. Geo-block France. Quad9 has already tried this, in Germany. In the Sony Music v. Quad9 case, Quad9 used geoIP blocking for German users while the case continued. Sony's lawyers used a VPN to reach the content "from Germany" anyway, the court agreed this was non-compliance, and Quad9 was fined for contempt. GeoIP is a probabilistic guess about where an IP address is, not a legal fact about where a person is. A resolver that keeps no user records has no reliable way to define a "French user." As Quad9 told TorrentFreak: "There is no legally useful way for us to define a French user." Even the French order is geographically complicated: heise notes it covers the overseas departments and Saint-Pierre-et-Miquelon but excludes New Caledonia, Wallis and Futuna, and French Polynesia.

2. 对法国进行地理屏蔽。Quad9已经在德国尝试过这种做法。在索尼音乐诉Quad9一案中，Quad9在案件审理期间对德国用户使用了地理IP屏蔽。索尼的律师通过VPN依然能够“从德国”访问内容，法院认定这属于违规，Quad9因此被判藐视法庭并处以罚款。地理IP是对IP地址位置的概率性猜测，而非关于个人所在地的法律事实。一个不保留用户记录的解析器没有可靠的方法来定义“法国用户”。正如Quad9告诉TorrentFreak的那样：“我们没有法律上可行的方法来定义法国用户。”即使是法国的命令在地理上也十分复杂：heise指出，该命令涵盖了海外省和圣皮埃尔和密克隆，但排除了新喀里多尼亚、瓦利斯和富图纳以及法属波利尼西亚。

3. Pay and fight. Quad9 won in Germany. The Dresden Higher Regional Court held in December 2023 that DNS resolvers get the same liability privilege as access providers, and the German civil rights group GFF said "the judgement puts the onus on rights holders." But winning took "several years, six figures of cost to Quad9, and massive wasted time," and the opposition, in Quad9's words, "has more lawyers than we have money and time." As Quad9 wrote in 2025, compliance costs that are routine overhead for Google are, "for small, mission-driven nonprofits like Quad9, … an existential threat."

3. 付款并抗争。Quad9在德国胜诉了。德累斯顿高等地区法院在2023年12月裁定，DNS解析器享有与接入服务提供商相同的责任豁免权，德国民权组织GFF表示“该判决将举证责任转嫁给了权利持有人”。但胜诉耗费了“数年时间、六位数的成本，并浪费了大量时间”，而对手正如Quad9所言，“拥有的律师比我们的资金和时间还要多”。正如Quad9在2025年所写的那样，对于谷歌来说是常规开销的合规成本，“对于像Quad9这样规模较小、以使命为导向的非营利组织来说……是生存威胁。”

The argument against resolver blocking isn't only about Quad9's survival. Even on its own terms, it does not do what the rightsholders want.

反对解析器屏蔽的理由不仅仅关乎Quad9的生存。即便从其自身逻辑来看，它也无法实现权利持有人想要的结果。

It doesn't remove anything. The DNS only holds pointers. Quad9's Dresden write-up puts it this way: "The DNS does not contain content - it is a system designed for delivery only of pointers." The pirate server stays online and keeps serving everyone who reaches it some other way. The Internet Society's 2025 guide for legal professionals says the same thing.

它无法移除任何内容。DNS只包含指针。Quad9在德累斯顿案的总结中这样写道：“DNS不包含内容——它是一个仅用于传递指针的系统。”盗版服务器依然在线，并继续通过其他方式为所有访问者提供服务。互联网协会2025年为法律专业人士提供的指南也表达了同样的观点。

It takes seconds to bypass. Q

绕过它只需几秒钟。Q