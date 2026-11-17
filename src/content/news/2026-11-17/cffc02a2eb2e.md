---
title: "Tracing Knowledge and Reasoning in LLM"
originalUrl: "https://arxiv.org/abs/2611.17461"
date: "2026-11-16T05:00:00.000Z"
excerpt: false
---

Computer Science > Computation and Language arXiv:2611.17461 (cs) [Submitted on 12 Nov 2026] Title:Tracing Knowledge and Reasoning in LLM Authors:Yang Wang, Xiao Wang, Yiqi Liu, Chenghao Xiao, Eleni Vasilaki, Goran Nenadic, Chenghua Lin.

计算机科学 > 计算与语言 arXiv:2611.17461 (cs) [提交于 2026 年 11 月 12 日] 标题：追踪大语言模型中的知识与推理 作者：Yang Wang, Xiao Wang, Yiqi Liu, Chenghao Xiao, Eleni Vasilaki, Goran Nenadic, Chenghua Lin。

Abstract: Current evaluations of Large Language Models (LLMs) report performance at the dataset or task level, revealing what a model achieves but offering little insight into the internal processing associated with its performance. We propose a task-centric framework for characterising the model-internal processing elicited by a benchmark.

摘要：当前对大语言模型（LLM）的评估主要报告数据集或任务层面的性能，这揭示了模型实现了什么，但对于与性能相关的内部处理过程却知之甚少。我们提出了一个以任务为中心的框架，用于表征基准测试所引发的模型内部处理过程。

It combines attention- and activation-based signals with representation-based measures to characterise benchmarks spanning a continuum from retrieval-dominant to reasoning-dominant and to surface failure modes that task-level scores conceal.

该框架结合了基于注意力和激活的信号以及基于表征的度量，旨在表征从检索主导到推理主导这一连续谱上的基准测试，并揭示任务级分数所掩盖的失败模式。

We evaluate 16 LLMs across 24 diverse benchmarks and conduct targeted internal-state analyses on representative models and tasks, observing systematic differences in processing between knowledge-centric and reasoning-centric tasks.

我们在 24 个不同的基准测试中评估了 16 个大语言模型，并对代表性模型和任务进行了有针对性的内部状态分析，观察到以知识为中心的任务和以推理为中心的任务在处理过程上存在系统性差异。

We shift evaluation from asking what score a model achieves toward characterising the processing patterns associated with that score, potentially supporting more targeted benchmark selection and more informed model choice. We open source our code at this https URL.

我们将评估的重点从询问模型获得了什么分数，转向表征与该分数相关的处理模式，这可能有助于更具针对性的基准测试选择和更明智的模型选择。我们已在指定网址开源了代码。