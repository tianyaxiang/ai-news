---
title: "Pay Only for Disagreement: Certified No-Regression Verdicts for Model Updates with Matching Label-Complexity Bounds"
originalUrl: "https://arxiv.org/abs/2609.17560"
date: "2026-09-17T23:42:12.038Z"
---

# Pay Only for Disagreement: Certified No-Regression Verdicts for Model Updates with Matching Label-Complexity Bounds
# 只为分歧付费：模型更新的认证无回归判定与匹配标签复杂度界限

**Abstract:** Every production model is updated, by retraining, fine-tuning, quantization, or a silent vendor swap, and each update risks being worse than what it replaced. We formalize update promotion as certified paired risk-difference auditing.

**摘要：** 每个生产模型都会经历更新，无论是通过重新训练、微调、量化还是静默的供应商替换，而每一次更新都存在性能劣于前代版本的风险。我们将更新推广形式化为“认证配对风险差异审计”。

Our starting point is a support identity: the risk difference between two models lives on the inputs where they disagree, observable without labels. We build DISCERN, a sequential two-tier protocol. A zero-label tier certifies benign updates whose disagreement rate is below tolerance from unlabeled traffic alone.

我们的出发点是一个支持恒等式：两个模型之间的风险差异存在于它们产生分歧的输入上，且无需标签即可观察到。我们构建了 DISCERN，这是一个顺序化的双层协议。零标签层仅通过无标签流量，即可认证那些分歧率低于容忍度的良性更新。

An audited tier labels only sampled disagreements through an anytime-valid confidence sequence, valid at every stopping time and under any label-routing rule, even an adversarial judge. We prove finite-sample validity and matching label-complexity bounds of order rho^2/eps^2 at the rate level, so exploiting free disagreement provably saves a factor 1/rho over any pairing-blind auditor, and the guarantee composes across an unbounded sequence of promotions from one error budget.

审计层通过一个“随时有效”（anytime-valid）的置信序列，仅对抽样的分歧进行标注。该序列在任何停止时间和任何标签路由规则下（即使面对对抗性判断者）均有效。我们证明了有限样本的有效性以及在速率水平上阶数为 rho^2/eps^2 的匹配标签复杂度界限。因此，利用免费的分歧信息，相比任何盲目配对的审计员，可证明能节省 1/rho 的成本，且该保证可以在单一错误预算下，跨越无限的更新序列进行组合。

Across 14,000+ replayed audit streams over 785 update pairs, including LoRA fine-tunes of language models up to 1.4B parameters, miscoverage is 0.0002 (nominal 5%), power 0.986 with zero false alarms, and 56% of benign updates certify with zero labels. Each audit emits a machine-checkable evidence record for post-market monitoring.

在涵盖 785 个更新对的 14,000 多条重放审计流中（包括高达 14 亿参数语言模型的 LoRA 微调），误覆盖率为 0.0002（标称 5%），功效为 0.986 且零误报，其中 56% 的良性更新实现了零标签认证。每次审计都会生成一份可供机器校验的证据记录，用于上市后的监控。