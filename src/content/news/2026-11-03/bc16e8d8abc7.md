---
title: "FARO: Function-Space Adaptive Return-to-Risk Optimization via Cross-Block Equal-Risk-Contribution Budget Allocation"
originalUrl: "https://arxiv.org/abs/2610.40858"
date: "2026-11-02T05:00:00.000Z"
excerpt: false
---

Computer Science > Machine Learning arXiv:2610.40858 (cs) [Submitted on 29 Oct 2026] Title: FARO: Function-Space Adaptive Return-to-Risk Optimization via Cross-Block Equal-Risk-Contribution Budget Allocation Authors: Xiaojun Wu, Cehao Yang, Xuhui Jiang, Chengjin Xu, Jia Li, Jian Guo.

计算机科学 > 机器学习 arXiv:2610.40858 (cs) [提交于 2026 年 10 月 29 日] 标题：FARO：通过跨块等风险贡献预算分配实现函数空间自适应收益风险优化 作者：Xiaojun Wu, Cehao Yang, Xuhui Jiang, Chengjin Xu, Jia Li, Jian Guo。

Abstract: Training a large language model is compute-bound, and current recipes divide the work between optimizers by hand: orthogonalized momentum for attention and MLP matrices, Adam-style updates for the rest. This division rests on human priors about which layer type deserves which geometry, and it fixes a single global update budget that every parameter block shares.

摘要：训练大型语言模型受限于计算能力，目前的方案通过人工方式在优化器之间分配工作：注意力机制和 MLP 矩阵使用正交化动量，其余部分使用 Adam 风格的更新。这种划分依赖于人类关于哪种层类型应采用何种几何结构的先验知识，并固定了一个所有参数块共享的单一全局更新预算。

We introduce FARO, a function-space adaptive optimizer that makes the partition of parameters into blocks the unit of decision. FARO gives each block a geometry by its realized counterfactual return, then freezes the routes and reallocates the frozen per-block budget by cross-block equal risk contribution (ERC), the risk-parity principle from portfolio theory.

我们引入了 FARO，这是一种函数空间自适应优化器，它将参数划分为块作为决策单元。FARO 根据每个块实现的计数器事实收益为其赋予几何结构，然后冻结路径，并根据跨块等风险贡献（ERC）重新分配冻结的各块预算，这是投资组合理论中的风险平价原则。

On a GPT-style model trained on FineWeb, the framework gives two results. First, its FARO-Adaptive arm reaches 3.2780 nats at the full schedule, matching NorMuonAndAdam (3.2794), the best hand-designed recipe: it recovers the human prior without hand-setting per-layer geometry.

在 FineWeb 上训练的 GPT 风格模型上，该框架产生了两个结果。首先，其 FARO-Adaptive 分支在完整计划下达到了 3.2780 nats，与最佳人工设计方案 NorMuonAndAdam (3.2794) 持平：它在无需手动设置每层几何结构的情况下恢复了人类先验。

Second, FARO-ERC improves on that arm: it lowers the clean-data loss at every one of 6 seeds, by 0.0136 nats on average, a modest but robust gain. Its sign test, paired test, and confidence interval all agree, and it exceeds the measured run-to-run noise at no added time or memory.

其次，FARO-ERC 在该分支的基础上进行了改进：它在所有 6 个随机种子中均降低了干净数据的损失，平均降低了 0.0136 nats，这是一个适度但稳健的增益。其符号检验、配对检验和置信区间均一致，并且在不增加时间和内存的情况下超过了测得的运行间噪声。

It works by trimming the riskiest blocks rather than expanding the safest, and it holds up under a corrupted stream, still lowering the mean loss and winning the seed majority. The source code is available at this https URL.

它的工作原理是修剪风险最高的块，而不是扩展最安全的块，并且在损坏的数据流下依然有效，仍能降低平均损失并在大多数随机种子中胜出。源代码可在该 https URL 获取。