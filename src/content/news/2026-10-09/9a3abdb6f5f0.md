---
title: "Bounded Autonomy and Verifiable Safety for Agentic AI Enabled Automation"
originalUrl: "https://arxiv.org/abs/2610.08815"
date: "2026-10-08T04:00:00.000Z"
excerpt: false
---

Computer Science > Machine Learning arXiv:2610.08815 (cs) [Submitted on 24 Sep 2026] Title: Bounded Autonomy and Verifiable Safety for Agentic AI Enabled Automation Authors: Srini Ramaswamy, Deveeshree Nayak.

计算机科学 > 机器学习 arXiv:2610.08815 (cs) [提交于 2026 年 9 月 24 日] 标题：代理 AI 赋能自动化的有限自主性与可验证安全性 作者：Srini Ramaswamy, Deveeshree Nayak。

Abstract: Agentic AI-enabled automation cannot be safely deployed in high-stakes environments on probabilistic reasoning alone. A recurring risk is epistemic drift: as reasoning deepens, system behavior may move away from subject-matter-expert constraints for safe operation.

摘要：仅凭概率推理，代理 AI 赋能的自动化技术无法在高风险环境中安全部署。一个反复出现的风险是认知漂移：随着推理的深入，系统行为可能会偏离领域专家（SME）设定的安全操作约束。

This paper presents BRaVeS, a bounded reasoning and safety-governance framework termed the Defensible Next-Gen Reasoning System (DNRS). BRaVeS encodes SME-defined constraints as invariant anchors, proposes MoDA-Style (Mixture of Depths Attention) depth-aware access as a candidate mechanism for keeping these anchors visible during inference, and uses a state hierarchy (SMARtAutonomy) to reduce autonomy as epistemic risk increases.

本文提出了 BRaVeS，这是一个被称为“可辩护下一代推理系统”（DNRS）的有限推理与安全治理框架。BRaVeS 将领域专家定义的约束编码为不变锚点，提出了一种 MoDA 式（深度混合注意力）的深度感知访问机制，作为在推理过程中保持这些锚点可见的候选方案，并利用状态层次结构（SMARtAutonomy）在认知风险增加时降低自主性。

To formalize bounded recovery, we introduce the Lyapunov-Bounded Consensus Framework (LBCF), which maps continuous epistemic-risk signals into a finite K-bag abstraction and applies shielded state transitions that enforce Lyapunov-style energy descent or route the system to a human-mediated terminal state.

为了形式化有限恢复，我们引入了李雅普诺夫有界共识框架（LBCF），该框架将连续的认知风险信号映射为有限的 K-bag 抽象，并应用屏蔽状态转换，以强制执行李雅普诺夫式的能量下降，或将系统引导至人工干预的终止状态。

The formal convergence result applies to the finite LBCF abstraction under fixed thresholds and feasible-shield assumptions; it does not prove safety of the full continuous neural activation space. We evaluate the framework through a discrete event Monte Carlo simulation using HAI 22.04 industrial-control-system time-series data with synthetic noise and sensor-degradation regimes.

形式化的收敛结果适用于固定阈值和可行屏蔽假设下的有限 LBCF 抽象；它并未证明完整连续神经激活空间的安全。我们通过使用带有合成噪声和传感器退化机制的 HAI 22.04 工业控制系统时间序列数据，进行了离散事件蒙特卡洛模拟，以评估该框架。

Across the tested parameter-grouping strategies and thresholds, the LBCF process achieved finite-step convergence and no safety-guard violations. These results provide simulation-based evidence that bounded governance behavior can be enforced under the stated abstraction, while motivating future work on deployed transformer implementations, live human-in-the-loop validation, and broader adversarial settings.

在所测试的参数分组策略和阈值下，LBCF 过程实现了有限步收敛，且未出现安全防护违规。这些结果提供了基于模拟的证据，表明在所述抽象下可以强制执行有限治理行为，同时也为未来在已部署的 Transformer 实现、实时人机协同验证以及更广泛的对抗环境中的研究提供了动力。