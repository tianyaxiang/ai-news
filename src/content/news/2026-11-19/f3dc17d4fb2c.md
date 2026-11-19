---
title: "This smell startup says its AI nose is as good as a human’s"
originalUrl: "https://www.technologyreview.com/2026/11/18/1148816/smell-startup-osmo-ai-nose-good-as-humans/"
date: "2026-11-18T10:20:30.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

EXECUTIVE SUMMARY In a lab near Newark Airport in New Jersey, a team of around 30 experienced human sniffers are slowly working their way through every odor on Earth. Their careful notes—“nutty,” “peachy,” “marine”—are cross-referenced with a chemical analysis to create a rich set of training data for what AI startup Osmo calls the world’s first foundation model for smell.

执行摘要：在新泽西州纽瓦克机场附近的一间实验室里，约 30 名经验丰富的人类嗅探员正在缓慢地对地球上的每一种气味进行辨别。他们仔细记录下的“坚果味”、“桃子味”、“海洋味”等描述，会与化学分析进行交叉比对，从而为人工智能初创公司 Osmo 所称的“全球首个气味基础模型”创建一套丰富的训练数据。

The company’s goal, says founder Alex Wiltschko, is “to give computers a sense of smell.” “Scent molecules are really the only language most species on this planet can speak,” he says. “Most species can’t communicate with sound or visually, so it truly is Earth’s original language. And it’s incredibly powerful for us, from a memory and an emotional standpoint. You can smell something once and remember it for the rest of your life. You can smell something on the street and be pulled back to high school.”

创始人亚历克斯·威尔奇科（Alex Wiltschko）表示，该公司的目标是“赋予计算机嗅觉”。他说：“气味分子实际上是地球上大多数物种唯一能说的语言。大多数物种无法通过声音或视觉进行交流，因此这确实是地球上最原始的语言。从记忆和情感的角度来看，它对我们来说极其强大。你闻过一次某种气味，就可能终生难忘。你在街上闻到某种气味，可能会瞬间把你带回高中时代。”

In the last few months, Wiltschko claims, Osmo’s model has achieved “human-level olfactory intelligence.” The company’s definition of this is that the model is about as good as the average person at detecting and discriminating between smells, and about as good as a junior perfume designer at creating them. It says its technology is already being used in the fragrance industry to help brands design and manufacture new scents.

威尔奇科声称，在过去几个月里，Osmo 的模型已经达到了“人类水平的嗅觉智能”。该公司对此的定义是，该模型在检测和区分气味方面与普通人相当，在创造气味方面则与初级香水设计师水平相当。该公司表示，其技术已在香水行业得到应用，帮助品牌设计和制造新的香氛。

Last month, the company says, Osmo’s AI model outperformed in-house perfumers at one of the world’s largest consumer goods companies. Wiltschko believes it could be deployed eventually for threat detection at airports, for example, or diagnosing diseases. Wiltschko spun the startup out of his work at Google Brain, the search giant’s former AI research lab, in 2023, and he is running the same playbook as AI startups in other domains: Throw a lot of data at difficult problems, and see what happens.

该公司称，上个月，Osmo 的人工智能模型在一家全球最大的消费品公司中表现优于内部调香师。威尔奇科认为，该技术最终可用于机场威胁检测或疾病诊断等领域。威尔奇科于 2023 年将这家初创公司从谷歌大脑（Google Brain，这家搜索巨头的前人工智能研究实验室）剥离出来，他正在沿用其他领域人工智能初创公司的策略：向难题投入海量数据，看看会发生什么。

The challenge with scent, Wiltschko says, is that there was a dearth of good data. Before Osmo, there were fewer than 200,000 human descriptions of smells in existing databases, by his count. Plus, the chemical sensor devices needed to collect data are expensive, and the fragrance industry is secretive about its work on olfactory science.

威尔奇科表示，气味研究的挑战在于缺乏高质量的数据。据他统计，在 Osmo 出现之前，现有数据库中人类对气味的描述不到 20 万条。此外，收集数据所需的化学传感器设备非常昂贵，而且香水行业对嗅觉科学的研究工作守口如瓶。

OSMO AI A lot of the company’s work has been in creating its own dataset of more than 10 million human labels and 800 million “scent tokens,” which describe the exact molecules and concentrations that go into creating specific odors. Osmo uses spectrometers and other chemical sensors, running around the clock, to break down the molecular makeup of everything from fruit and flowers to pantry staples and organs.

OSMO AI：该公司的大部分工作在于创建自己的数据集，其中包含超过 1000 万个人类标签和 8 亿个“气味标记”，这些标记描述了创造特定气味所需的精确分子和浓度。Osmo 使用光谱仪和其他化学传感器全天候运行，以分解从水果、花卉到食品储藏室主食和器官等各种物质的分子构成。

A team of around 70 trained data labelers in the US and overseas spend their days sniffing things and writing down what they smell like, using a standardized fragrance vocabulary. Mapping out scents in this way is throwing out some unlikely parallels. In the same way that changing the order of words can drastically influence the meaning of a sentence, rearranging scent molecules in different proportions can drastically alter the smells humans perceive.

在美国和海外，约 70 名受过培训的数据标注员每天都在嗅闻各种物品，并使用标准化的香氛词汇记录下他们的感受。以这种方式绘制气味图谱产生了一些意想不到的相似之处。正如改变单词顺序会极大地影响句子的含义一样，以不同比例重新排列气味分子也会极大地改变人类感知到的气味。

“The scent tokens that define the smell of a newborn baby have massive overlap with the scent tokens in a fresh plate of cooked spaghetti,” Wiltschko says. (Specifically Barilla brand spaghetti, he says, which perhaps raises some questions for the people at the pasta factory.) The company also creates its own scents, using a smell-printing robot the size of a school bus that mixes ingredients according to precise formulas to make samples for Osmo’s own research and fragrances for paying customers.

威尔奇科说：“定义新生儿气味的气味标记与一盘新鲜煮熟的意大利面中的气味标记有巨大的重叠。”（他特别指出是百味来（Barilla）品牌的意大利面，这或许会让意大利面工厂的人产生一些疑问。）该公司还利用一台校车大小的“气味打印机器人”来创造自己的香氛，该机器人根据精确的配方混合成分，为 Osmo 自己的研究制作样本，并为付费客户制作香水。

It can design and print scents to order based on a ChatGPT-style prompt. Wiltschko flipped open his laptop to show me how the AI model worked. He opened a text box on screen, and I asked him to generate a fragrance that smelled like a Portuguese custard tart (we were in Lisbon for Web Summit), aimed at 18- to 23-year-old men. The system spent a few minutes cogitating, then generated three options for potential scent profiles that matched the brief (creamy, coconutty, fruity) and the molecules needed to create them.

它能够根据类似 ChatGPT 的提示词按需设计和打印气味。威尔奇科打开笔记本电脑向我展示了该人工智能模型的工作原理。他在屏幕上打开一个文本框，我让他生成一种闻起来像葡式蛋挞的香水（当时我们正在里斯本参加网络峰会），目标受众是 18 到 23 岁的男性。系统思考了几分钟，然后生成了三个符合要求的潜在香氛方案（奶油味、椰子味、果香味），并列出了创造这些气味所需的分子。

If I’d continued with the ordering process, my signature L’Eau de Custard would have been ready about a week later. Osmo’s technology has already been used to create retail fragrances, including for giants like Procter & Gamble. The Gates Foundation, which invested $5 million when Osmo launched, later gave the company a $3.5 million grant to assess molecules that repel disease-carrying insects, and Osmo identified eight substances that were more repellent than DEET.

如果我继续订购流程，我的专属“蛋挞之水”（L’Eau de Custard）大约一周后就能完成。Osmo 的技术已被用于创造零售香水，包括为宝洁（Procter & Gamble）等巨头提供服务。盖茨基金会在 Osmo 成立时投资了 500 万美元，后来又向该公司提供了 350 万美元的赠款，用于评估驱赶携带疾病昆虫的分子，Osmo 最终确定了八种比避蚊胺（DEET）驱蚊效果更好的物质。

Osmo has also worked with StockX, the online clothing marketplace, on using smell to spot counterfeit sneakers by detecting differences in the chemical composition of the materials used in the shoes. But not everyone is convinced by the technology or the company’s big claims. Avery Gilbert, a smell scientist and author of What the Nose Knows, has been sharply critical of Osmo on his Substack, arguing that some of its marketing claims are undocumented, and that its patent filings still rely on human sensory panels and perfumers, rather than AI.

Osmo 还与在线服装市场 StockX 合作，通过检测鞋子材料化学成分的差异，利用气味来识别假冒运动鞋。但并非所有人都对这项技术或该公司的宏大主张感到信服。嗅觉科学家、《鼻子知道什么》（What the Nose Knows）一书的作者艾弗里·吉尔伯特（Avery Gilbert）在自己的 Substack 上对 Osmo 提出了尖锐批评，认为其部分营销主张缺乏记录，且其专利申请仍依赖于人类感官小组和调香师，而非人工智能。

“This heavy reliance on human sensory judgments seems odd for a company premised on super-cool AI,” he wrote in March. A representative for Osmo did not respond in time for publication. Michael Schmuker, a former professor of neural computation at the University of Hertfordshire who has previously consulted for Osmo, says the company’s technology is an achievement. With colleagues, he created an open-source, reverse-engineered version of Osmo’s 2023 model, but it lacks the reams of data the company has collected since.

他在三月份写道：“对于一家以超酷人工智能为前提的公司来说，这种对人类感官判断的严重依赖似乎很奇怪。”Osmo 的一位代表未能在截稿前做出回应。赫特福德大学前神经计算教授、曾为 Osmo 提供咨询的迈克尔·施穆克（Michael Schmuker）表示，该公司的技术是一项成就。他与同事一起创建了一个 Osmo 2023 年模型的开源逆向工程版本，但它缺乏该公司此后收集的大量数据。

But even with all this smell data, Osmo may be missing some of the factors that make human olfaction unique, Schmuker says. “Smell is super complex. Context is very important for smell. The same molecule may evoke a different association depending on context,” he says. “[The smell of] a French cheese like Camembert is partly the same molecule as in used nappies. You don’t confuse the two because of

但施穆克表示，即使拥有所有这些气味数据，Osmo 可能仍遗漏了一些使人类嗅觉变得独特的因素。“气味非常复杂。语境对气味非常重要。同一个分子根据语境的不同可能会唤起不同的联想，”他说。“像卡门贝尔（Camembert）这样的法国奶酪（的气味）与用过的尿布中的部分分子相同。你不会把两者混淆，因为……”