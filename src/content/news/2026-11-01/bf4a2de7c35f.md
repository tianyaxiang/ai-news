---
title: "What Does an Ontology Catch? Curated, LLM-Generated and Data-Derived Ontologies as Checkers of LLM Agents over Knowledge Graphs"
originalUrl: "https://arxiv.org/abs/2610.37809"
date: "2026-10-31T04:00:00.000Z"
excerpt: false
---

Computer Science > Artificial Intelligence arXiv:2610.37809 (cs) [Submitted on 27 Oct 2026] Title: What Does an Ontology Catch? Curated, LLM-Generated and Data-Derived Ontologies as Checkers of LLM Agents over Knowledge Graphs Authors: Michal Orzechowski, Rund Tawfiq, Tomasz Kosciolek.

计算机科学 > 人工智能 arXiv:2610.37809 (cs) [提交于 2026 年 10 月 27 日] 标题：本体能捕捉到什么？作为知识图谱上大模型智能体检查器的策划本体、大模型生成本体和数据派生本体。作者：Michal Orzechowski, Rund Tawfiq, Tomasz Kosciolek。

Abstract: LLM agents that answer questions over Web knowledge graphs are increasingly wrapped in checks derived from the graph's ontology, on the assumption that a formal schema makes a reliable judge. Yet a checker can be wrong as well: it can miss errors, and it can flag correct answers and push the agent into "fixing" them. Whether a curated ontology is worth its cost as such a judge, and how it compares with an ontology an LLM writes or a schema mined from the data, is unknown.

摘要：在网络知识图谱上回答问题的大模型智能体越来越多地被包裹在源自图谱本体的检查机制中，其假设是形式化模式可以作为可靠的评判标准。然而，检查器也可能出错：它可能漏掉错误，也可能标记出正确的答案并促使智能体去“修正”它们。策划本体作为这种评判标准是否物有所值，以及它与大模型编写的本体或从数据中挖掘出的模式相比如何，目前尚不清楚。

We make the checker itself the object of study. Across curated, LLM-generated and data-derived ontologies, used as prompt context, as a checker, or both, and across open-weight and proprietary agents on public graphs and a private graph of nearly $10^{9}$ triples, we account for what ontology-derived checks catch and what they wrongly flag.

我们将检查器本身作为研究对象。通过在提示词上下文、检查器或两者兼用的场景下，使用策划本体、大模型生成本体和数据派生本体，并跨越公共图谱和包含近 $10^{9}$ 个三元组的私有图谱上的开源权重及专有智能体，我们评估了本体派生检查所能捕捉到的内容以及它们错误标记的内容。

We show how each source trades caught errors against false alarms, how a curated schema used as published can contradict its own data, which errors structural checks miss, and whether combining sources or giving the agent the checker's specific feedback pays off.

我们展示了每种来源如何在捕捉到的错误与误报之间进行权衡，已发布的策划模式如何与其自身数据相矛盾，结构化检查会遗漏哪些错误，以及结合多种来源或向智能体提供检查器的具体反馈是否值得。

On UniProt, the curated ontology flags more correct answers than either an ontology derived from the data or one an LLM derives from a summary of the data with masked identifiers. On real agent answers, its flags are only marginally more precise than random flags.

在 UniProt 上，策划本体标记出的正确答案比从数据中派生的本体，或大模型从带有掩码标识符的数据摘要中派生的本体要多。在真实的智能体回答中，其标记的精确度仅比随机标记略高。