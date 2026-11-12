---
title: "A Startup Wants to Fight AI Bioweapons With AI"
originalUrl: "https://www.wired.com/story/startup-fights-ai-bioweapons-with-ai/"
date: "2026-11-11T17:00:00.000Z"
excerpt: false
---

# A Startup Wants to Fight AI Bioweapons With AI

Frontier AI labs have warned that their technology could help develop dangerous bioweapons. Now, a startup says it has developed a defense. On Wednesday, Radical Numerics announced that it has developed a new edge model called Omnii Defense that is designed to flag natural and AI-engineered pathogens using a laptop and a USB gene sequencer. It can also run without an internet connection, allowing researchers in the field with spotty connections to use it. Though many scientists say AI-made bioweapons are a low-likelihood threat, Radical Numerics hopes its technology will help researchers and public health officials identify emerging biological threats.

前沿人工智能实验室曾警告称，其技术可能有助于开发危险的生物武器。如今，一家初创公司声称已开发出一种防御手段。周三，Radical Numerics 宣布开发出一种名为“Omnii Defense”的新型边缘模型，旨在通过笔记本电脑和 USB 基因测序仪识别天然及人工智能设计的病原体。该模型无需联网即可运行，方便在网络不稳定的实地工作的研究人员使用。尽管许多科学家认为人工智能制造生物武器的可能性较低，但 Radical Numerics 希望其技术能帮助研究人员和公共卫生官员识别新兴的生物威胁。

Eric Nguyen, cofounder and CEO of Radical Numerics, says he sees a coming arms race in biodefense similar to what’s playing out in cybersecurity, where threat actors and security defenders are leveraging AI in an attempt to gain an edge. “We felt that the biosecurity space was far behind on the defense side,” he says. Nguyen and his cofounders were part of the research team behind Evo and Evo-2, open-source DNA foundation models they worked on during their doctoral research at Stanford University. They founded Radical Numerics in 2025.

Radical Numerics 的联合创始人兼首席执行官 Eric Nguyen 表示，他预见到生物防御领域即将出现一场军备竞赛，类似于网络安全领域正在上演的情况，即威胁行为者和安全防御者都在利用人工智能试图获得优势。他说：“我们认为生物安全领域在防御方面远远落后。”Nguyen 和他的联合创始人曾是 Evo 和 Evo-2 的研究团队成员，这是他们在斯坦福大学攻读博士学位期间开发的开源 DNA 基础模型。他们于 2025 年创立了 Radical Numerics。

The San Francisco–based company recently made waves after rolling out Omnii, a new genome language model built on different types of biological information beyond DNA, including RNA, proteins, and epigenetic signals. In October, Radical announced that it used Omnii to create custom bacteriophages, viruses that infect and kill specific bacteria, targeting a drug-resistant strain of E. coli. Its cocktail was used to treat a sick patient, with special permission from the Food and Drug Administration.

这家总部位于旧金山的公司最近推出了 Omnii，引起了轰动。这是一种新型基因组语言模型，建立在 DNA 之外的不同生物信息类型之上，包括 RNA、蛋白质和表观遗传信号。10 月，Radical 宣布利用 Omnii 创建了定制的噬菌体（一种感染并杀死特定细菌的病毒），用于针对一种耐药性大肠杆菌。在获得美国食品药品监督管理局（FDA）的特别许可后，其混合制剂被用于治疗一名患者。

Another AI biotech startup, Tabula Bioscience, was also involved in that research, but Radical didn’t disclose the partnership in its announcement last month. The omission led Harvard geneticist George Church, who was an adviser to both companies, to resign from his role at Radical last week.

另一家人工智能生物技术初创公司 Tabula Bioscience 也参与了该项研究，但 Radical 在上个月的公告中并未披露这一合作关系。这一疏漏导致同时担任两家公司顾问的哈佛大学遗传学家乔治·丘奇（George Church）于上周辞去了在 Radical 的职务。

Omnii Defense, the company’s latest tool, makes multiple predictions about a sequence, including the odds of it being pathogenic or AI-generated and what taxonomic group it most closely resembles. The model assigns a genome a “threat score” between zero and one that combines the likelihood of unnaturalness with functional predictions. The higher the score, the higher the threat.

Omnii Defense 是该公司最新的工具，它能对序列做出多项预测，包括其致病或由人工智能生成的可能性，以及它最接近的分类群。该模型为基因组分配一个 0 到 1 之间的“威胁评分”，结合了非自然性的可能性和功能预测。分数越高，威胁越大。

Earlier biodefense tools, such as the federally funded Finding Engineering-Linked Indicators, or Felix, can compare genetic sequences of interest against libraries of known organisms, essentially searching for cataloged matches. That can be helpful in a scenario where a bad actor has made a few tweaks to an existing pathogen. But they aren’t designed to make predictions in the way that Omnii is.

早期的生物防御工具，例如联邦资助的“工程关联指标查找”（Felix），可以将目标基因序列与已知生物库进行比对，本质上是在搜索已编目的匹配项。这在恶意行为者对现有病原体进行少量修改的情况下很有帮助，但它们的设计初衷并非像 Omnii 那样进行预测。

The benefit of AI models is that they can learn patterns in sequences associated with biological function instead of relying on exact sequence matches. That could allow them to recognize similarities between sequences even when their genetic spelling has changed. Christine Parthemore, Radical Numerics’ head of biodefense, says Omnii is a “step change.”

人工智能模型的优势在于，它们可以学习与生物功能相关的序列模式，而不是依赖精确的序列匹配。即使基因拼写发生了变化，这也能使它们识别序列之间的相似性。Radical Numerics 生物防御负责人克里斯汀·帕特莫尔（Christine Parthemore）表示，Omnii 是一次“阶跃式变革”。

In one experiment, the company removed Bundibugyo virus—which is currently driving an Ebola outbreak in East Africa—from the training data, first at the species level and then its whole genus. “It was as if Omnii was operating in 1976,” Parthemore says, referring to the year Ebola was discovered. With just the species removed, the model still detected that 33 percent of the Bundibugyo sequences pushed to it were something pathogenic. Even with the whole genus removed, it flagged 22 percent of the viral sequences. Non-AI tools gave essentially no indication of potential risk, she says.

在一项实验中，该公司从训练数据中移除了目前正在东非引发埃博拉疫情的本迪布焦病毒（Bundibugyo virus），先是移除了物种层面，随后移除了整个属。帕特莫尔说：“这就像 Omnii 在 1976 年（埃博拉病毒被发现的那一年）运行一样。”仅移除物种时，该模型仍检测出 33% 的本迪布焦病毒序列具有致病性。即使移除了整个属，它仍标记了 22% 的病毒序列。她说，非人工智能工具基本上没有给出任何潜在风险的迹象。

“We absolutely need to be vigilant about what AI is enabling, and if we can use technology to compete with it and hopefully get ahead of any kind of nefarious actors, that seems sensible,” says Bronwyn MacInnis, director of pathogen surveillance in the Infectious Disease and Microbiome program at the Broad Institute of MIT and Harvard. However, MacInnis cautions that detecting a signal is still a big leap from determining whether a pathogen has real consequence or whether a threat was engineered.

麻省理工学院和哈佛大学布罗德研究所传染病与微生物组项目病原体监测主任布朗温·麦金尼斯（Bronwyn MacInnis）表示：“我们绝对需要对人工智能所带来的影响保持警惕，如果我们能利用技术与之竞争，并有望领先于任何邪恶行为者，这似乎是明智的。”然而，麦金尼斯提醒说，检测到信号与确定病原体是否具有实际后果或威胁是否为人为设计之间，仍有巨大的差距。

Access to Omnii Defense is currently limited to vetted external testers. Radical Numerics says it is working with national laboratories, government agencies, and other independent evaluators to assess the model’s performance.

目前，Omnii Defense 的访问权限仅限于经过审查的外部测试人员。Radical Numerics 表示，它正在与国家实验室、政府机构和其他独立评估机构合作，以评估该模型的性能。