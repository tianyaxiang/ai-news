---
title: "Time-Series Foundation Models That Understand Data Revisions"
originalUrl: "https://arxiv.org/abs/2609.28576"
date: "2026-09-26T00:09:27.917Z"
---

# Time-Series Foundation Models That Understand Data Revisions
# 理解数据修订的时间序列基础模型

**Abstract:** Historical observations are not always fixed: statistical agencies revise previously published values as new evidence arrives. Forecasting from a contemporary download can therefore expose a model to information unavailable at the date it purportedly made a prediction. 

**摘要：** 历史观测数据并非总是一成不变的：随着新证据的出现，统计机构会修订先前发布的数据。因此，基于当前下载的数据进行预测，可能会使模型接触到在预测时点本不可用的信息。

We propose VINTAGE-TS, a revision-aware adaptation of a time-series foundation model that distinguishes observation time from information-availability time. Its targets are the next period's first-published value and the value available a fixed number of days after that publication; neither is declared final truth. 

我们提出了 VINTAGE-TS，这是一种具备修订感知能力的时间序列基础模型适配方案，它能够区分“观测时间”与“信息可用时间”。该模型的目标是预测下一周期的首次发布值，以及在发布后固定天数内可用的数值；两者均不被视为最终的真值。

A joint predictive distribution preserves dependence between these targets and exposes uncertainty about their difference. We specify an ALFRED-based rolling evaluation, a matched Chronos-2 comparison, conventional and revision-aware baselines, and a separate audit of pretraining overlap. 

联合预测分布保留了这些目标之间的相关性，并揭示了它们之间差异的不确定性。我们明确了基于 ALFRED 的滚动评估方法、匹配的 Chronos-2 对比实验、传统及修订感知基准模型，并对预训练数据的重叠情况进行了独立审计。

The accompanying software implements validity-interval reconstruction, delayed-label filtering, a frozen-backbone adapter interface, and reproducible diagnostics. An executed synthetic demonstration and a 25-configuration sensitivity suite verify the workflow, expose variation across seeds and revision regimes, and illustrate how hindsight contamination changes measured performance. 

配套软件实现了有效区间重构、延迟标签过滤、冻结主干适配器接口以及可复现的诊断功能。通过执行合成演示和 25 种配置的敏感性测试套件，我们验证了工作流程，揭示了不同随机种子和修订机制下的差异，并阐明了“事后偏差”（hindsight contamination）如何改变测量出的性能表现。

Thirty one automated tests check temporal and integration contracts. Real ALFRED and Chronos-2 experiments have not been executed; no empirical foundation-model advantage is claimed.

我们通过 31 项自动化测试来检查时间契约和集成契约。目前尚未执行真实的 ALFRED 和 Chronos-2 实验；文中未宣称任何实证性的基础模型优势。