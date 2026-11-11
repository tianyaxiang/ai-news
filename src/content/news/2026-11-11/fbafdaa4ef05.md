---
title: "Grok Build coding agent leaks oodles of confidential info, some belonging to SpaceXSI"
originalUrl: "https://arstechnica.com/security/2026/11/grok-build-coding-agent-leaks-oodles-of-confidential-info-some-belonging-to-spacexsi/"
date: "2026-11-10T21:12:59.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

Grok Build, the vibe-coding agent from SpaceXSI, is leaking data—some of it proprietary business information and other sensitive secrets—from thousands of its users, including the very same Elon Musk-owned company that offers the platform, new research shows.

SpaceXSI 推出的“氛围编程”代理 Grok Build 正在泄露数据，其中包括数千名用户的商业机密和其他敏感信息，甚至包括提供该平台的马斯克旗下公司自身的数据，最新研究显示。

The information is revealed through links allowing Grok Build users to share their apps with others. Grok takes steps to randomize the URLs so only people who know the exact URL can access the data stored there. A design decision by developers of the platform, however, completely torpedoes that objective and makes it possible for anyone to enumerate thousands of live Grok Build projects. Except in rare cases, clicking those links opens the app and reveals all data associated with it.

这些信息通过允许 Grok Build 用户与他人共享应用的链接泄露。Grok 采取了随机化 URL 的措施，以便只有知道确切 URL 的人才能访问存储在那里的数据。然而，该平台开发人员的一项设计决策彻底破坏了这一目标，使得任何人都有可能枚举出数千个正在运行的 Grok Build 项目。除极少数情况外，点击这些链接就会打开应用并显示与之相关的所有数据。

Research from security firm Claroc shows that the exposed data includes things like internal business plans, ad proposals, medical exam results, galley checklists from a celebrity cruise line, and employee names and ID numbers. Ironically, some of the sensitive data comes from two-dozen apps built by SpaceXSI (the name of the now-merged SpaceX and xAI) itself.

安全公司 Claroc 的研究表明，泄露的数据包括内部商业计划、广告提案、体检结果、名人游轮公司的厨房检查清单以及员工姓名和身份证号等。讽刺的是，部分敏感数据来自 SpaceXSI（现已合并的 SpaceX 和 xAI 的名称）自己构建的二十几个应用程序。

Claroc found sensitive data belonging to other Grok Build users, some working for Fortune 500 companies and a defense contractor. Some of the affected organizations and data revealed includes: A Peruvian construction company: occupational-health dashboard with 3,784 worker medical exams; Tesla: service-center scorecard naming 22 technicians with productivity and bonus status; A US-Navy ship engineering contractor: roster of 108 people on a Navy logistics support contract.

Claroc 还发现了属于其他 Grok Build 用户的敏感数据，其中一些用户供职于财富 500 强企业和国防承包商。受影响的部分组织及泄露的数据包括：一家秘鲁建筑公司：包含 3,784 名员工体检记录的职业健康仪表板；特斯拉：列出 22 名技术人员及其生产力和奖金状态的服务中心记分卡；一家美国海军船舶工程承包商：海军后勤支持合同中 108 人的名单。

Link sharing for Grok Build is intended to streamline the process of developing and deploying apps. A user can input speech or text and have a working app ready for internal testing within minutes. The links are designed to give developers a way to get the app in front of authorized users quickly. The very left of the URLs contain two or more “dice words,” meaning randomly generated phrases such as “failing chassis traders,” although users can modify them.

Grok Build 的链接共享旨在简化应用的开发和部署流程。用户只需输入语音或文本，几分钟内即可准备好用于内部测试的应用程序。这些链接旨在让开发人员能够快速将应用呈现给授权用户。URL 的最左侧包含两个或多个“骰子词”，即随机生成的短语，例如“failing chassis traders”，尽管用户可以对其进行修改。

There’s a fatal flaw in the way SpaceXSI has implemented the mechanism. Instead of being to the right of the domain—as is the case with Google links—the randomness for Grok Build links is positioned to the left of it. That allows the links to be easily enumerated using passive DNS services. These services monitor central DNS lookup servers. When a server lookup requests the IP address of a previously never-before-seen URL, the transaction is captured in a publicly searchable database.

SpaceXSI 实现该机制的方式存在致命缺陷。与谷歌链接不同（谷歌链接的随机部分位于域名右侧），Grok Build 链接的随机部分位于域名左侧。这使得链接可以很容易地通过被动 DNS 服务进行枚举。这些服务会监控中央 DNS 查询服务器。当服务器查询请求一个从未见过的 URL 的 IP 地址时，该交易就会被记录在一个可公开搜索的数据库中。