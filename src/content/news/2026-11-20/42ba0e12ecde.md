---
title: "Budgeted Proper Loss Design for Uncertain Decision Thresholds"
originalUrl: "https://arxiv.org/abs/2611.23247"
date: "2026-11-19T05:00:00.000Z"
excerpt: false
---

Computer Science > Machine Learning arXiv:2611.23247 (cs) [Submitted on 4 Sep 2026] Title: Budgeted Proper Loss Design for Uncertain Decision Thresholds Authors: Ankit Sharma (International Institute of Information Technology Bangalore)

计算机科学 > 机器学习 arXiv:2611.23247 (cs) [提交于 2026 年 9 月 4 日] 标题：针对不确定决策阈值的预算化适当损失设计 作者：Ankit Sharma（班加罗尔国际信息技术学院）

Abstract: A binary probability estimate may be used by several decision makers with different error costs. Proper scoring rules can emphasize selected probability thresholds, but a single average threshold distribution need not give a good worst-case regret guarantee. We study the choice of a proper loss when the threshold distribution belongs to a finite specified family.

摘要：二元概率估计可能会被具有不同错误成本的多个决策者使用。适当的评分规则可以强调选定的概率阈值，但单一的平均阈值分布未必能提供良好的最坏情况遗憾保证。我们研究了当阈值分布属于有限指定族时，适当损失的选择问题。

Among integrable loss weights with a positive pointwise floor and a fixed total mass, we derive the weight that minimizes the sharp, distribution-free multiplier from surrogate regret to threshold-averaged decision regret. The solution clips a rescaled upper envelope of the threshold densities at the prescribed floor; its normalization is found by a one-dimensional root search.

在具有正逐点下限和固定总质量的可积损失权重中，我们推导出了能使从代理遗憾到阈值平均决策遗憾的尖锐、无分布乘数最小化的权重。该解法在规定的下限处截断了阈值密度的重缩放上包络；其归一化通过一维求根搜索得出。

We give proofs of sharpness, optimality, and stability under density misspecification, as well as a limitation for atomic threshold laws. An exact histogram implementation and two synthetic experiments across 20 seeds verify the construction. The optimized multiplier improves over uniform and average-density weights, while fitted-model performance does not improve uniformly. The result is a loss-design guarantee under an explicit budget, rather than a general claim of predictive superiority.

我们给出了在密度误设情况下的尖锐性、最优性和稳定性的证明，以及针对原子阈值定律的局限性说明。精确的直方图实现和跨越 20 个种子的两个合成实验验证了该结构。优化后的乘数优于均匀权重和平均密度权重，但拟合模型的性能并未得到统一提升。该结果是在明确预算下的损失设计保证，而非对预测优越性的一般性声明。