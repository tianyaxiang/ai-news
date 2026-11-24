---
title: "MedicalRSI: Medical Recursive Self-Improving Agents via Clinical Model-Harness Co-Evolution"
originalUrl: "https://arxiv.org/abs/2611.26806"
date: "2026-11-23T05:00:00.000Z"
excerpt: false
---

Computer Science > Computation and Language arXiv:2611.26806 (cs) [Submitted on 19 Nov 2026] Title: MedicalRSI: Medical Recursive Self-Improving Agents via Clinical Model-Harness Co-Evolution Authors: Ziqing Wang, Hamid Palangi, Lili Zhao, Kaize Ding.

计算机科学 > 计算与语言 arXiv:2611.26806 (cs) [提交于 2026 年 11 月 19 日] 标题：MedicalRSI：通过临床模型与工具协同演化实现医疗递归自我改进智能体 作者：Ziqing Wang, Hamid Palangi, Lili Zhao, Kaize Ding。

Abstract: Medical agents built on large language models (LLMs) have advanced rapidly, yet most stay fixed once deployed and do not keep using their experience to improve later attempts. As a result, the same kind of error can recur across patients.

摘要：基于大语言模型（LLM）的医疗智能体发展迅速，但大多数智能体在部署后保持固定，无法持续利用经验来改进后续尝试。因此，同类错误可能会在不同患者身上反复出现。

To address this, existing self-improvement methods update an agent's weights or its medical harness from its own experience, but their improving strategy stays fixed and never learns which changes actually help, which caps how much the agent can improve.

为了解决这一问题，现有的自我改进方法会根据智能体自身的经验更新其权重或医疗工具，但其改进策略保持不变，且从未学习哪些更改真正有效，这限制了智能体的改进上限。

Recursive self-improvement (RSI) instead improves both the agent and its improving strategy. However, achieving RSI for medical agents is challenging, because clinical workflows rarely come with a reference harness, and a change that fixes early errors may not fix the problems the agent meets later.

递归自我改进（RSI）则同时改进智能体及其改进策略。然而，为医疗智能体实现 RSI 具有挑战性，因为临床工作流程很少附带参考工具，且修复早期错误的更改可能无法解决智能体后续遇到的问题。

We propose MedicalRSI, an RSI framework built on Clinical Model-Harness Co-Evolution, in which one model plays two roles. The Solver is the medical agent itself, and the Improver is its learnable improving strategy, which writes a medical harness from the agent's failures.

我们提出了 MedicalRSI，这是一个基于临床模型与工具协同演化的 RSI 框架，其中一个模型扮演两个角色。求解器（Solver）是医疗智能体本身，而改进器（Improver）是其可学习的改进策略，它根据智能体的失败案例编写医疗工具。

Each harness is rewarded by its gain over acting without it, and both roles are trained together, so the Improver keeps adapting to the problems the Solver has not yet solved.

每个工具都会根据其相对于不使用该工具时的增益获得奖励，且两个角色共同训练，因此改进器能够不断适应求解器尚未解决的问题。

On multiple benchmarks and LLM backbones, MedicalRSI outperforms existing context-level and weight-level self-improvement methods and transfers well to unseen workflows, new LLMs and new databases, a step toward medical agents that keep improving.

在多个基准测试和 LLM 主干模型上，MedicalRSI 的表现优于现有的上下文级和权重级自我改进方法，并能很好地迁移到未见过的工作流程、新 LLM 和新数据库中，这是迈向持续改进的医疗智能体的一步。