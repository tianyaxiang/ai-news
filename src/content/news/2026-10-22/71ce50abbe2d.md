---
title: "Dynamic System Inspired Continuous Large Language Model for AI4Science Tasks"
originalUrl: "https://arxiv.org/abs/2610.26959"
date: "2026-10-21T04:00:00.000Z"
excerpt: false
---

Title: Dynamic System Inspired Continuous Large Language Model for AI4Science Tasks

标题：受动力系统启发的 AI4Science 任务连续大语言模型

Computer Science > Machine Learning arXiv:2610.26959 (cs) [Submitted on 18 Oct 2026] Title: Dynamic System Inspired Continuous Large Language Model for AI4Science Tasks Authors: Zhaoxin Fan, Zheng Zhu, Yuqing Ma, Faguo Wu, Jian Yang, Wenjun Wu

计算机科学 > 机器学习 arXiv:2610.26959 (cs) [提交于 2026 年 10 月 18 日] 标题：受动力系统启发的 AI4Science 任务连续大语言模型 作者：Zhaoxin Fan, Zheng Zhu, Yuqing Ma, Faguo Wu, Jian Yang, Wenjun Wu

Abstract: Scientific foundation models increasingly operate on continuous phenomena, yet still use discrete residual computation. We ask whether pretrained residual transformations can support additional latent computation without expanding the backbone.

摘要：科学基础模型越来越多地应用于连续现象，但仍使用离散残差计算。我们探讨了预训练的残差变换是否可以在不扩展主干的情况下支持额外的潜在计算。

To test this possibility, we introduce Continuum-LM, which reuses these transformations as dynamical operators in a continuous-depth language model. Its hidden states evolve through an ordinary differential equation evaluated by higher-order numerical integration, with solver order and step size controlling computation.

为了验证这一可能性，我们引入了 Continuum-LM，它将这些变换作为连续深度语言模型中的动力学算子进行重用。其隐藏状态通过常微分方程演化，并由高阶数值积分进行评估，其中求解器阶数和步长用于控制计算。

Across eight scientific tasks, Continuum-LM trains stably and improves mean exact-match accuracy by 7.77 and 10.96 percentage points over discrete counterparts at the 0.6B and 1.7B scales, respectively. At 0.6B, it also outperforms an Ouro-style recurrent control under matched parameter and residual-function evaluation budgets.

在八项科学任务中，Continuum-LM 训练稳定，在 0.6B 和 1.7B 规模下，其平均精确匹配准确率分别比离散对应模型提高了 7.77 和 10.96 个百分点。在 0.6B 规模下，它在匹配参数和残差函数评估预算的情况下，也优于 Ouro 风格的循环控制模型。

Together, these results support extensible computational depth through parameter reuse, identifying continuous hidden-state evolution as a practical design dimension for scientific language models beyond parameter scaling.

总之，这些结果支持通过参数重用来实现可扩展的计算深度，并将连续隐藏状态演化确定为科学语言模型在参数缩放之外的一种实用设计维度。