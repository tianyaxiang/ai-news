---
title: "Bayesian Distribution System State Estimation with Flow Matching"
originalUrl: "https://arxiv.org/abs/2610.40728"
date: "2026-11-02T05:00:00.000Z"
excerpt: false
---

Computer Science > Machine Learning arXiv:2610.40728 (cs) [Submitted on 29 Oct 2026] Title: Bayesian Distribution System State Estimation with Flow Matching Authors: Nan Lin, Peter Palensky, Pedro Vergara Barrios.

计算机科学 > 机器学习 arXiv:2610.40728 (cs) [提交于 2026 年 10 月 29 日] 标题：基于流匹配的贝叶斯配电系统状态估计 作者：Nan Lin, Peter Palensky, Pedro Vergara Barrios。

Abstract: Medium-voltage feeders have few real-time measurements, so distribution system state estimation (DSSE) rests on pseudo-measurements of the secondary substations, a prior in Bayesian terms. Weighted least squares keeps the power flow exact but reduces this prior to a mean and variance, while supervised deep learning estimators also learn the power flow and are tied to one measurement set.

摘要：中压馈线的实时测量数据较少，因此配电系统状态估计 (DSSE) 依赖于二次变电站的伪测量值，这在贝叶斯术语中属于先验信息。加权最小二乘法保持了潮流计算的精确性，但将该先验简化为均值和方差；而监督深度学习估计器虽然也学习潮流，但往往绑定于特定的测量集。

We propose PoSE (posterior sampling for state estimation), which keeps the Bayesian structure of DSSE and learns only what the distribution system operator does not know, namely the distribution of substation injections, modelled by a neural network trained with flow matching on historical data.

我们提出了 PoSE（用于状态估计的后验采样），它保留了 DSSE 的贝叶斯结构，且仅学习配电系统运营商未知的部分，即通过在历史数据上使用流匹配训练的神经网络来建模变电站注入分布。

The power flow equations, grid topology and measurements enter only at sampling, through a noise-aware Kalman-type correction. The neural network therefore never approximates the power flow, but every posterior sample is a physically consistent operating point, and one trained prior serves any measurement set, noise level and topology.

潮流方程、电网拓扑和测量数据仅在采样阶段通过一种感知噪声的卡尔曼型校正引入。因此，神经网络从不直接近似潮流，但每一个后验样本都是一个物理上一致的运行点，且一个训练好的先验模型可适用于任何测量集、噪声水平和拓扑结构。

On the IEEE 33-bus feeder, PoSE lowers the probabilistic injection error (CRPS) by 6.7-7.5% against a full-covariance Gaussian prior in all 12 tested settings. It provides reliable uncertainty: the 90% intervals contain the true injection almost exactly as often as exact posterior samples would, whereas those of supervised estimators contain it in only 37-78% of cases.

在 IEEE 33 节点馈线上，PoSE 在所有 12 种测试设置中，相较于全协方差高斯先验，将概率注入误差 (CRPS) 降低了 6.7-7.5%。它提供了可靠的不确定性：其 90% 的置信区间包含真实注入值的频率几乎与精确后验样本完全一致，而监督估计器的置信区间仅在 37-78% 的情况下包含真实值。

On the 240-bus unbalanced three-phase Iowa feeder, it gives the lowest injection, voltage and branch-current errors of all estimators. A fast variant matches this accuracy at 0.2-0.6s per snapshot and, without retraining, beats Gaussian priors and retrained supervised estimators on seven reconfigured topologies.

在 240 节点不平衡三相 Iowa 馈线上，它在所有估计器中实现了最低的注入、电压和支路电流误差。其快速变体在每个快照 0.2-0.6 秒内即可达到同样的精度，且无需重新训练，在七种重构拓扑结构上均优于高斯先验和重新训练后的监督估计器。