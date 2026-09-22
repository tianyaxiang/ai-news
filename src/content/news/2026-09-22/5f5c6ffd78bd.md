---
title: "How we made the first comprehensive map of deaths along the US border’s “virtual wall”"
originalUrl: "https://www.technologyreview.com/2026/09/21/1144161/border-towers-surveillance-methodology/"
date: "2026-09-22T00:15:12.518Z"
---

# How we made the first comprehensive map of deaths along the US border’s “virtual wall”
# 我们是如何绘制出美国边境“虚拟墙”沿线死亡人数首份综合地图的

Our 15-month investigation into death and surveillance along the US-Mexico border began with a simple question: Why did so many people die near government surveillance towers meant to help track and apprehend them? This story is part of *Dying on Camera*, a collaboration between *MIT Technology Review* and *Times of San Diego*. Journalists in both newsrooms spent the past year examining the failures of border surveillance technology and uncovering the stories of the people who die in the borderlands.

我们针对美墨边境死亡事件与监控系统的调查历时 15 个月，始于一个简单的问题：为什么有这么多人死在旨在帮助追踪和抓捕他们的政府监控塔附近？这篇报道是《镜头下的死亡》（Dying on Camera）系列的一部分，该系列由《麻省理工科技评论》与《圣地亚哥时报》合作推出。两家新闻编辑部的记者在过去一年里，深入调查了边境监控技术的失灵，并揭开了那些在边境地区不幸离世者的故事。

To answer that question, we looked through thousands of pages of government documents, visited the border multiple times, and interviewed more than 45 people, including current and former White House advisors, presidential appointees, Border Patrol agents, medical examiners, sheriffs, humanitarian volunteers, and employees of tech companies. The result of our investigation is the first comprehensive map and analysis of deaths near border surveillance towers. Here’s how we built it, what decisions we made along the way, and what the data can and can’t tell us.

为了回答这个问题，我们查阅了数千页的政府文件，多次实地走访边境，并采访了 45 位以上的人士，包括现任和前任白宫顾问、总统任命官员、边境巡逻队特工、法医、治安官、人道主义志愿者以及科技公司员工。我们的调查成果是首份关于边境监控塔附近死亡事件的综合地图与分析。以下是我们构建该地图的过程、我们在过程中所做的决策，以及这些数据能告诉我们什么、不能告诉我们什么。

### Our data
### 我们的数据

The investigation relied on knowing where migrants have died and where and when US Customs and Border Protection towers were installed. We analyzed cases dating back to 2015, allowing us to cover different border policies, presidential administrations, and tower technologies.

这项调查依赖于掌握移民死亡的地点，以及美国海关及边境保卫局（CBP）监控塔安装的时间和地点。我们分析了自 2015 年以来的案例，这使我们能够涵盖不同的边境政策、总统任期以及监控塔技术。

### Migrant deaths
### 移民死亡事件

The US-Mexico border has been called the world’s deadliest land border, and Border Patrol estimates that more than 10,000 people have died during crossings since 2000—a figure that’s widely considered an undercount. But the amount of information available publicly on where and when these people died, and who they were, varies widely. Some remains are never discovered, and for those that are, there’s no national protocol for how the records are handled.

美墨边境被称为世界上最致命的陆地边界。据边境巡逻队估计，自 2000 年以来，已有超过 1 万人在越境过程中死亡——这一数字被普遍认为存在低估。然而，关于这些人死于何时何地、身份为何，公开信息的获取程度差异巨大。有些遗骸从未被发现；而对于那些被发现的遗骸，目前尚无全国性的记录处理协议。

We considered a case for further analysis if we could confirm three basic things: whether the person was believed to have been crossing the border, where the remains were found, and roughly when the person died. We created our dataset by merging existing ones that had been compiled and shared by other organizations, including No More Deaths, Humane Borders, and the Electronic Frontier Foundation, with new records we obtained ourselves from more than a dozen agencies.

如果能确认三个基本要素，我们就会将该案例纳入进一步分析：死者是否被认为是在越境、遗骸发现地点，以及大致的死亡时间。我们通过合并其他组织（包括“不再有死亡”（No More Deaths）、“人道边境”（Humane Borders）和电子前沿基金会（EFF））整理并共享的现有数据集，并结合我们从十几个机构自行获取的新记录，创建了我们的数据集。

### Public records requests in Texas
### 德克萨斯州的公共记录申请

Texas was the biggest missing link in most existing databases of migrant deaths. Unlike Arizona, it has no initiative to share records online, and unlike New Mexico, it leaves individual counties to handle their own death investigations. Some records for those individual counties existed, compiled by a handful of dedicated researchers, but nothing was comprehensive or current.

在大多数现有的移民死亡数据库中，德克萨斯州是缺失最严重的一环。与亚利桑那州不同，德克萨斯州没有在线共享记录的举措；与新墨西哥州不同，它将死亡调查的责任下放给各个县自行处理。虽然一些专注的研究人员整理过部分县的记录，但没有任何一份记录是全面或最新的。

We identified 17 counties in Texas that would be relevant to our investigation: Culberson, Jeff Davis, Presidio, Terrell, Val Verde, Kinney, Maverick, Dimmit, Webb, Zapata, Jim Hogg, Starr, Hidalgo, Cameron, Kenedy, Brooks, and Duval. There are other counties in which migrants have died, but they do not have areas covered by surveillance towers and were therefore excluded.

我们确定了德克萨斯州与调查相关的 17 个县：卡尔伯森（Culberson）、杰夫戴维斯（Jeff Davis）、普雷西迪奥（Presidio）、特雷尔（Terrell）、瓦尔弗德（Val Verde）、金尼（Kinney）、马弗里克（Maverick）、迪米特（Dimmit）、韦伯（Webb）、萨帕塔（Zapata）、吉姆霍格（Jim Hogg）、斯塔尔（Starr）、伊达尔戈（Hidalgo）、卡梅伦（Cameron）、肯尼迪（Kenedy）、布鲁克斯（Brooks）和杜瓦尔（Duval）。虽然还有其他县也发生过移民死亡事件，但由于这些地区没有监控塔覆盖，因此被排除在外。

In most of these counties, locally elected administrative judges called justices of the peace collect the most comprehensive information on local deaths. But records requests submitted to these individual judges can stall for years (indeed, some of our requests to justices of the peace remain unfilled more than a year after we filed them). Reports from justices of the peace sometimes leave out the scene or location details we needed; some justices never even visit the place where a migrant died, instead formally declaring the person deceased over FaceTime with the first responders on scene.

在这些县中，大多数由当地民选的行政法官（即治安法官）收集关于当地死亡事件最全面的信息。然而，向这些法官提交的记录申请可能会被搁置数年（事实上，我们向治安法官提交的一些申请在一年多后仍未得到回复）。治安法官的报告有时会遗漏我们所需的现场或位置细节；有些法官甚至从未去过移民死亡现场，而是通过与现场急救人员进行 FaceTime 通话来正式宣布死者死亡。

*MIT Technology Review* instead filed records requests to the sheriffs of these 17 counties beginning in July 2025. These agencies are often first on the scene when a death is discovered, and their reports can have more detailed information on where remains were found. But relying on sheriffs’ records means our analysis undercounts migrant deaths in Texas, as it doesn’t include any deaths handled by local or state police.

《麻省理工科技评论》转而从 2025 年 7 月开始，向这 17 个县的治安官办公室提交了记录申请。这些机构通常是发现死亡事件后的第一响应者，他们的报告可能包含关于遗骸发现地点的更详细信息。但依赖治安官的记录意味着我们的分析低估了德克萨斯州的移民死亡人数，因为它不包括由地方或州警察处理的死亡案件。

After we filed a request, it took periods of near daily calls to the offices to receive the records, if we received them at all. Some were provided with no charge. Other counties charged between $300 and $1,300 to fill our request. Counties warned that their records were incomplete, with an unknown number lost during a move, damaged, destroyed, or misplaced during transitions between sheriffs.

在提交申请后，我们往往需要几乎每天致电相关办公室才能收到记录（如果能收到的话）。有些记录是免费提供的，而其他县则收取 300 到 1300 美元不等的费用来处理我们的申请。各县警告称，他们的记录并不完整，有数量不明的记录在搬迁过程中丢失、损坏、销毁，或在治安官换届期间被错放。

Those delays were compounded because most agencies do not record whether a person is believed to have been crossing the border when they died. That’s despite provisions in some counties that allow officers to track far more granular details about other situations; Zapata County reports have a checkbox to indicate whether jewels were stolen in a burglary, for example, while Cameron County reports have one for whether a burglar entered through a chimney. Without a way to readily identify migrant deaths, offices had to pull records by hand, making the process slower, more costly, and more prone to error.

这些延误更加严重，因为大多数机构并没有记录死者是否被认为是在越境时死亡。尽管在某些县，相关规定允许警员追踪其他情况中极其细致的细节；例如，萨帕塔县的报告中有一个复选框，用于标明入室盗窃中是否有珠宝被盗，而卡梅伦县的报告则有一个复选框，用于标明窃贼是否通过烟囱进入。由于缺乏识别移民死亡的便捷方式，办公室不得不手工提取记录，这使得整个过程更加缓慢、昂贵且容易出错。

We received usable records from 14 of these counties (records have yet to be received from Dimmit or Duval, and Maverick’s office charged a per-record fee that was cost prohibitive). Agencies generally sent us police reports for each individual case, amounting to over 4,000 pages of records in total. Some were handwritten documents. Except for the reports from Kenedy, Webb, and Hidalgo Counties, we pulled out the relevant information by hand. For those three counties, which sent large volumes of records, we used Anthropic’s Claude, accessed via API, to inspect each case report and pull out coordinates of the spots where remains were found; then we checked batches of those cases by hand to verify the AI’s accuracy.

我们从其中 14 个县收到了可用的记录（迪米特县和杜瓦尔县的记录尚未收到，马弗里克县办公室收取的单份记录费用高得令人望而却步）。各机构通常为每个独立案件向我们发送警察报告，总计超过 4000 页。其中一些是手写文件。除了肯尼迪县、韦伯县和伊达尔戈县的报告外，我们都是手工提取的相关信息。对于这三个发送了大量记录的县，我们通过 API 调用 Anthropic 的 Claude 模型，检查每份案件报告并提取遗骸发现地点的坐标；随后，我们对这些案例进行了抽样人工核对，以验证 AI 的准确性。