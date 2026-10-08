---
title: "Zero-Shot Visualization: Exploring Text Corpora with User-Prompted Axes"
originalUrl: "https://arxiv.org/abs/2610.06889"
date: "2026-10-07T04:00:00.000Z"
excerpt: false
---

Computer Science > Computation and Language arXiv:2610.06889 (cs) [Submitted on 23 Sep 2026] Title:Zero-Shot Visualization: Exploring Text Corpora with User-Prompted Axes Authors:Arnau Bueno Tricas, Jose A. Rodríguez-Serrano View a PDF of the paper titled Zero-Shot Visualization: Exploring Text Corpora with User-Prompted Axes, by Arnau Bueno Tricas and 1 other authors View PDF HTML (experimental)

计算机科学 > 计算与语言 arXiv:2610.06889 (cs) [提交于 2026 年 9 月 23 日] 标题：零样本可视化：利用用户提示轴探索文本语料库 作者：Arnau Bueno Tricas, Jose A. Rodríguez-Serrano 查看题为《零样本可视化：利用用户提示轴探索文本语料库》的论文 PDF，作者：Arnau Bueno Tricas 及其他 1 位作者 查看 PDF HTML（实验性）

Abstract:We study the application of large language models (LLMs) to the visual exploration of textual corpora. We introduce zero-shot visualization (ZSV), a task in which users specify concepts in natural language and documents are mapped onto the corresponding concept axes for visualization. Building a ZSV system of practical value is non-trivial, as it requires choices at the intersection of feature functions, efficient implementation tradeoffs, and pre/post-processing decisions affecting visualization quality.

摘要：我们研究了大型语言模型（LLMs）在文本语料库视觉探索中的应用。我们引入了零样本可视化（ZSV），这是一项用户通过自然语言指定概念，并将文档映射到相应概念轴上进行可视化的任务。构建一个具有实际价值的 ZSV 系统并非易事，因为它需要在特征函数、高效实现权衡以及影响可视化质量的预处理/后处理决策的交汇处做出选择。

To that end, we establish a benchmark that compares methods spanning embedding similarity, direct semantic judgments, and conditional likelihood estimation in this setting. Across multiple datasets and use cases we evaluate the properties of different scoring methods and design choices in terms of semantic faithfulness, score fidelity, and computational cost. Our results identify that scoring based on next-token probabilities offers the strongest practical trade-off among the evaluated methods.

为此，我们建立了一个基准，比较了在该设置下涵盖嵌入相似度、直接语义判断和条件似然估计的方法。通过多个数据集和用例，我们从语义忠实度、评分保真度和计算成本等方面评估了不同评分方法和设计选择的属性。我们的结果表明，基于下一个标记概率的评分在所评估的方法中提供了最强的实际权衡。

We further apply this approach to unlabeled corpora to examine its behavior in realistic exploratory settings. These experiments highlight additional design considerations, including the use of graded axes together with binary relevance filtering, and reveal a compositional sentiment bias in off-topic documents. Based on these findings, we provide practical guidelines for constructing end-to-end ZSV baselines.

我们进一步将此方法应用于未标记的语料库，以检查其在现实探索环境中的表现。这些实验突出了额外的设计考量，包括使用分级轴与二元相关性过滤相结合，并揭示了非主题文档中存在的组合情感偏差。基于这些发现，我们为构建端到端 ZSV 基准提供了实用指南。