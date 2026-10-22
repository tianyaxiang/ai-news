---
title: "High-dimensional layer-state trajectories reveal the internal dynamics of transformer inference"
originalUrl: "https://arxiv.org/abs/2610.26866"
date: "2026-10-21T04:00:00.000Z"
excerpt: false
---

Computer Science > Machine Learning arXiv:2610.26866 (cs) [Submitted on 15 Jul 2026] Title: High-dimensional layer-state trajectories reveal the internal dynamics of transformer inference Authors: Heng Zhao, Yufei Wang, Ruidian Song, Weisheng Chen.

计算机科学 > 机器学习 arXiv:2610.26866 (cs) [提交于 2026 年 7 月 15 日] 标题：高维层状态轨迹揭示了 Transformer 推理的内部动力学 作者：Heng Zhao, Yufei Wang, Ruidian Song, Weisheng Chen。

Abstract: Mechanistic studies of large language models localize function in parameters, attention heads or neurons, but those parts do not specify how one inference unfolds. We treat the ordered layer-state trajectory as the empirical process and test whether layer order defines a measurable computation.

摘要：大型语言模型的机制研究将功能定位在参数、注意力头或神经元中，但这些部分并未说明单次推理是如何展开的。我们将有序的层状态轨迹视为经验过程，并测试层顺序是否定义了一种可测量的计算。

Across representative Qwen, Llama and Gemma checkpoints, realized order produced paths 1.60--2.24 times as aligned with their endpoint chord as endpoint-preserving shuffles. The order effect transferred to a lexical task, but was stronger in three random initializations of the same Qwen architecture, identifying an architecture-compatible scaffold rather than a training-specific law.

在具有代表性的 Qwen、Llama 和 Gemma 检查点中，实际顺序产生的路径与端点弦的对齐程度是保持端点随机排列的 1.60 到 2.24 倍。这种顺序效应转移到了词汇任务中，但在同一 Qwen 架构的三个随机初始化中表现得更强，这确定了一个与架构兼容的支架，而非特定于训练的规律。

Direct hidden states provided stronger mechanism coordinates than vocabulary readbacks, and a task-defined coordinate made candidate competition computable. After additive interventions failed, local transition actuators selectively controlled internal trajectories across checkpoints.

直接隐藏状态比词汇回读提供了更强的机制坐标，而任务定义的坐标使候选竞争变得可计算。在加性干预失败后，局部转换执行器选择性地控制了跨检查点的内部轨迹。

A confidence gate then drove 17 of 87 held-out Qwen closure trajectories across the full-vocabulary top-1 candidate boundary while leaving all 203 non-closure top-1 outputs unchanged. Safety-matched action reassignment performed similarly, locating the gain in selective gating and the bounded actuator family rather than fine-grained dose assignment.

随后，一个置信度门控机制驱动了 87 条留出的 Qwen 闭合轨迹中的 17 条跨越了全词汇表 Top-1 候选边界，同时保持所有 203 个非闭合 Top-1 输出不变。安全匹配的动作重分配表现类似，将增益定位在选择性门控和有界执行器族中，而非细粒度的剂量分配。

Layer order exposes an observable, computable and behaviourally consequential process of transformer inference without establishing a complete theory of LLM dynamics or control of answer correctness.

层顺序揭示了一个可观察、可计算且在行为上具有后果的 Transformer 推理过程，但并未建立起关于 LLM 动力学或答案正确性控制的完整理论。