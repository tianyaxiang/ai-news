---
title: "SpecEvo: Speculative Evolution with Large Language Models for Cost-Efficient Scientific Discovery"
originalUrl: "https://arxiv.org/abs/2610.28706"
date: "2026-10-23T04:00:00.000Z"
excerpt: false
---

Computer Science > Artificial Intelligence arXiv:2610.28706 (cs) [Submitted on 20 Oct 2026] Title: SpecEvo: Speculative Evolution with Large Language Models for Cost-Efficient Scientific Discovery Authors: Ha Minh Hieu, Tongyao Zhu, Do Xuan Long, Min-Yen Kan.

计算机科学 > 人工智能 arXiv:2610.28706 (cs) [提交于 2026 年 10 月 20 日] 标题：SpecEvo：用于高性价比科学发现的大语言模型推测进化，作者：Ha Minh Hieu, Tongyao Zhu, Do Xuan Long, Min-Yen Kan。

Abstract: LLM-driven evolutionary search is a promising paradigm for scientific discovery, but existing methods remain costly and slow, often applying expensive reasoning uniformly while underusing evidence from failed, redundant, and saturated trials.

摘要：由大语言模型（LLM）驱动的进化搜索是科学发现的一种有前景的范式，但现有方法仍然昂贵且缓慢，通常统一应用昂贵的推理，同时未能充分利用来自失败、冗余和饱和试验的证据。

We introduce Speculative Evolution (SpecEvo), a multi-LLM framework that coordinates lightweight and frontier models through continual consolidation of search evidence. Lightweight models power both parallel Speculators, which generate and refine candidate programs, and an Advisor, which distills accumulated successes, failures, and saturated directions into persistent guidance for subsequent exploration.

我们引入了推测进化（SpecEvo），这是一个通过持续整合搜索证据来协调轻量级模型和前沿模型的多大语言模型框架。轻量级模型为并行“推测器”（负责生成和优化候选程序）以及“顾问”（负责将积累的成功、失败和饱和方向提炼为后续探索的持续指导）提供支持。

At sparse checkpoints, a frontier-model Navigator inspects the evolving population and intervenes through synthesis, surgical refinement, or reframing according to search stagnation. This speculate-then-consolidate workflow delegates routine exploration and evidence consolidation to inexpensive models while reserving frontier reasoning for strategic interventions whose benefits extend across many subsequent low-cost evaluations.

在稀疏的检查点，前沿模型“导航员”会检查进化中的种群，并根据搜索停滞情况通过综合、精细化调整或重构进行干预。这种“先推测后整合”的工作流程将常规探索和证据整合委托给低成本模型，同时将前沿推理保留用于战略性干预，其收益可延伸至后续多次低成本评估中。

Across 176 tasks spanning four scientific and algorithmic discovery domains, SpecEvo matches or outperforms frontier-model baselines while reducing API cost by up to 80%, achieves up to 1.5x greater evaluation efficiency than cost-efficient baselines on equation discovery, and improves over the strongest CO-Bench baseline by 3.8%.

在涵盖四个科学和算法发现领域的 176 项任务中，SpecEvo 在匹配或超越前沿模型基准的同时，将 API 成本降低了高达 80%，在方程发现任务上的评估效率比高性价比基准提高了 1.5 倍，并比最强的 CO-Bench 基准提高了 3.8%。

These results support trajectory-conditioned model coordination as an effective approach to cost-efficient scientific discovery.

这些结果支持将轨迹条件模型协调作为一种实现高性价比科学发现的有效方法。