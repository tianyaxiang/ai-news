---
title: "&#8216;Pure insanity&#8217;: Mathematicians will need years to make sense of OpenAI&#8217;s latest drop"
originalUrl: "https://www.theverge.com/ai-artificial-intelligence/1008726/openai-mathematics-solutions-chaos"
date: "2026-10-09T19:09:44.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

“Staggering.” “Overwhelming.” “Unprecedented.” “Surreal.” “Pure insanity.” Those were among the descriptions more than three dozen mathematicians reached for in conversations with The Verge as they tried to make sense of the flood of mathematical results OpenAI abruptly dropped on the field this week. Amid the awe, excitement, and uncertainty over the sheer scale of the deluge was a deep-seated anxiety over what it all means — and what comes next.

“令人震惊。”“不知所措。”“史无前例。”“超现实。”“纯粹的疯狂。”当三十多位数学家试图理解 OpenAI 本周突然向该领域倾泻的数学成果时，他们向《The Verge》表达了上述描述。在对这场海量信息洪流的敬畏、兴奋和不确定之中，隐藏着一种对这一切意味着什么以及未来将发生什么的深层焦虑。

For all their different reactions, researchers agreed that simply understanding what OpenAI had released could take years, let alone figuring out where the mathematicians themselves fit in the field now changing around them. Many feared OpenAI would not wait that long before moving on — or releasing even more.

尽管反应各异，但研究人员一致认为，仅仅是理解 OpenAI 发布的内容可能就需要数年时间，更不用说弄清楚数学家们在如今不断变化的领域中处于什么位置了。许多人担心，OpenAI 在继续前进或发布更多内容之前，不会等待那么久。

In all, OpenAI released nearly 400 AI-generated results. These were spread across more than 700 manuscripts and covered a diverse array of mathematical disciplines, including combinatorics, several branches of geometry, number theory, theoretical computer science, algebra, topology, probability and statistical mechanics, and mathematical physics. The collection is so vast that OpenAI felt the need to publish guidance on how to navigate the sprawling GitHub repository.

总计，OpenAI 发布了近 400 项人工智能生成的成果。这些成果分布在 700 多份手稿中，涵盖了组合数学、几何学的多个分支、数论、理论计算机科学、代数、拓扑学、概率与统计力学以及数学物理等多个数学学科。该合集规模之大，以至于 OpenAI 觉得有必要发布指南，指导人们如何浏览这个庞大的 GitHub 存储库。

The sheer volume of work makes even a preliminary assessment as to exactly what the company has released difficult. In the hours and days following the drop, most mathematicians The Verge spoke with said they were still struggling to digest everything; several said that simply working through the roughly 40-page table of contents and abstracts took them the better part of an hour. “Just going over the entire list of abstracts is overwhelming,” said Álvaro Lozano-Robledo, a professor of mathematics at the University of Connecticut.

巨大的工作量使得即使是对公司发布的内容进行初步评估也变得困难。在发布后的数小时和数天内，大多数接受《The Verge》采访的数学家表示，他们仍在努力消化所有内容；几位数学家说，仅仅是通读大约 40 页的目录和摘要就花掉了他们大半个小时。康涅狄格大学数学教授阿尔瓦罗·洛萨诺-罗布莱多（Álvaro Lozano-Robledo）说：“光是浏览整个摘要列表就让人不知所措。”

Sprinkled among the hundreds of manuscripts are formalizations in Lean, a programming language and proof assistant that allows results to be verified computationally. These formalizations have proven instrumental in assessing some of OpenAI’s previous mathematical claims, giving researchers confidence that a claim is logically correct even if they don’t fully understand the argument behind it.

在数百份手稿中，穿插着使用 Lean 语言进行的各种形式化证明。Lean 是一种编程语言和证明助手，允许通过计算验证结果。事实证明，这些形式化证明对于评估 OpenAI 之前的一些数学主张至关重要，即使研究人员并不完全理解其背后的论证过程，也能让他们确信该主张在逻辑上是正确的。

“If the AIs would disappear now, as though there were aliens that came to Earth and then just left, we would be studying this for the next 10 years, trying to understand everything.”

“如果人工智能现在消失了，就像外星人来到地球然后又离开了一样，我们可能需要在接下来的 10 年里研究这些东西，试图理解这一切。”

But the degree to which each result had been verified varied wildly. On GitHub, OpenAI acknowledged that the results are “at different stages of verification” and that “many, but not all, of the manuscripts have been formalized.” As of writing, fewer than half the manuscripts in the collection appear to have been described formally. OpenAI said only 300 top-line results out of 719 manuscripts had been formalized, around 42 percent, and that it “will update the repository with more formalizations as we obtain them.”

然而，每项结果的验证程度差异巨大。OpenAI 在 GitHub 上承认，这些结果“处于不同的验证阶段”，并且“许多（但并非全部）手稿已经过形式化处理”。截至撰写本文时，合集中似乎只有不到一半的手稿经过了形式化描述。OpenAI 表示，在 719 份手稿中，只有 300 项顶级成果经过了形式化处理，占比约 42%，并称“一旦获得更多形式化证明，我们将更新存储库”。

Several mathematicians complained to The Verge about the lack of formalization, particularly given the sheer number of results, and stressed that even when Lean code accompanies a result, evaluation isn’t instantaneous. Researchers must check that the formalization actually proves what the result claims, another time-consuming process, and several digging through the papers said that even where computer-verifiable proofs had been provided, the quality was inconsistent and the statements they verified did not always appear to map neatly onto the claims in accompanying manuscripts.

几位数学家向《The Verge》抱怨缺乏形式化证明，特别是考虑到成果数量如此之多。他们强调，即使结果附带了 Lean 代码，评估也不是瞬间完成的。研究人员必须核实形式化证明是否确实证明了结果所声称的内容，这是另一个耗时的过程。几位深入研究这些论文的数学家表示，即使提供了计算机可验证的证明，其质量也参差不齐，而且它们所验证的陈述并不总是能与附带手稿中的主张完全对应。

Kevin Buzzard, a mathematics professor at Imperial College London, said he had identified numerous theorems in his area of work — algebraic number theory — of which only around six immediately “stood out.” Few, if any, of those appeared to be formally verified in Lean. “Hence, I either have to read possibly-not-correct slop, or wait for others to do the same, or wait for someone to formalise them before I can say for sure that the results are even correct.” Buzzard’s concerns were echoed by numerous other researchers.

伦敦帝国理工学院数学教授凯文·巴扎德（Kevin Buzzard）表示，他在自己的研究领域——代数数论——中发现了许多定理，其中只有大约六个定理让他立刻“眼前一亮”。这些定理中几乎没有一个是经过 Lean 形式化验证的。“因此，我要么必须阅读可能不正确的垃圾内容，要么等待其他人做同样的事情，或者等待有人将它们形式化，然后我才能确定这些结果是否正确。”巴扎德的担忧得到了许多其他研究人员的共鸣。

Buzzard was far from alone in worrying about AI “slop.” The term is a shorthand for low-quality, frequently erroneous AI-generated material that increasingly crops up online — and in the real world — including academic papers. As in other fields, mathematicians told The Verge they have seen a huge uptick in such material produced with tools like ChatGPT and Claude in recent years. Much of it is confusing, hard to read, and demonstrates little understanding of the subject; it is especially shoddy when it comes to crediting other researchers.

担心人工智能“垃圾内容”（slop）的远不止巴扎德一人。这个词是低质量、经常出错的人工智能生成材料的简称，这类材料正越来越多地出现在网络和现实世界中，包括学术论文。正如在其他领域一样，数学家们告诉《The Verge》，近年来他们看到使用 ChatGPT 和 Claude 等工具制作的此类材料大幅增加。其中大部分内容令人困惑、难以阅读，且几乎没有表现出对主题的理解；特别是在引用其他研究人员时，质量更是粗制滥造。

OpenAI’s previous mathematical write-ups were widely criticized by experts for their sloppy nature, particularly their poor or nonexistent attribution. In conversations with The Verge ahead of the release, several researchers had taken to calling the impending flood of papers the “slopocalypse,” or similar variations on the theme.

OpenAI 之前的数学论文因其草率的性质而受到专家的广泛批评，特别是其引用不当或根本没有引用的问题。在发布前与《The Verge》的交谈中，几位研究人员开始将即将到来的论文浪潮称为“垃圾末日”（slopocalypse）或类似的主题变体。

Whether the feared “slopocalypse” actually materialized is difficult to say, largely due to the bewildering volume of material released. Early indications suggest OpenAI took more care with papers this time around, or at least with some of them. Several mathematicians told The Verge that their first impressions were far better than they had expected, though by their own admission that was hardly a high bar given the company’s previous shoddy publications. “It’s a big mess. It can cause a huge collapse in the academic culture.”

令人担忧的“垃圾末日”是否真的发生了很难说，这在很大程度上是因为发布的内容数量多得令人困惑。早期迹象表明，OpenAI 这次在论文上更加用心，或者至少在其中一些论文上是这样。几位数学家告诉《The Verge》，他们的第一印象远好于预期，尽管他们自己也承认，考虑到该公司之前粗制滥造的出版物，这并不是一个很高的标准。“这是一团糟。它可能会导致学术文化的巨大崩溃。”