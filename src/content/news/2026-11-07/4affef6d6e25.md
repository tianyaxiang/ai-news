---
title: "Big Models, Small Gains: Frozen Forecasters as Classifiers on MONSTER"
originalUrl: "https://arxiv.org/abs/2611.06988"
date: "2026-11-06T05:00:00.000Z"
excerpt: false
---

Computer Science > Machine Learning arXiv:2611.06988 (cs) [Submitted on 4 Nov 2026] Title: Big Models, Small Gains: Frozen Forecasters as Classifiers on MONSTER Authors: Rishit Jain, Rishit Kar, Chetashri Bhadane, Nilesh Patil.

计算机科学 > 机器学习 arXiv:2611.06988 (cs) [提交于 2026 年 11 月 4 日] 标题：大模型，小收益：MONSTER 基准测试中作为分类器的冻结预测模型 作者：Rishit Jain, Rishit Kar, Chetashri Bhadane, Nilesh Patil。

Abstract: Forecasting foundation models are increasingly used as frozen feature extractors for time series classification, but it remains unclear whether their pretrained representations offer an advantage over strong classifiers that do not require pretraining. This raises an important question: do these representations provide useful information beyond what the model architecture alone can capture, particularly when labelled data are scarce?

摘要：预测基础模型正越来越多地被用作时间序列分类的冻结特征提取器，但目前尚不清楚它们的预训练表示是否比无需预训练的强分类器更具优势。这提出了一个重要问题：这些表示是否提供了模型架构本身所能捕捉到的信息之外的有用信息，特别是在标记数据稀缺的情况下？

We present a controlled benchmarking of two forecasting models, Reverso and Chronos-Bolt, on six large datasets from the MONSTER benchmark, using 1%, 10%, and 100% of the available training labels. We compare their frozen representations against four established time series classification methods and random-weight versions of the same forecasting models.

我们对来自 MONSTER 基准测试的六个大型数据集进行了受控基准测试，评估了 Reverso 和 Chronos-Bolt 两个预测模型，并使用了 1%、10% 和 100% 的可用训练标签。我们将它们的冻结表示与四种成熟的时间序列分类方法以及相同预测模型的随机权重版本进行了比较。

Our results show that pretraining improves classification accuracy over random-weight counterparts on five of the six datasets, with gains of up to 23 percentage points. However, the frozen representations do not reliably outperform the strongest non-pretrained baseline in any setting: they perform worse in 15 of 17 settings and tie in the remaining two.

结果显示，在六个数据集中的五个上，预训练比随机权重版本提高了分类准确率，最高提升了 23 个百分点。然而，在任何设置下，冻结表示都无法可靠地优于最强的非预训练基线：它们在 17 种设置中的 15 种表现较差，在其余两种中持平。

Further experiments show that restoring amplitude information recovers part of the performance gap, while fine-tuning and forecast-error features do not close it. These findings highlight the importance of strong task specific baselines and random weight controls when evaluating forecasting foundation models for classification.

进一步的实验表明，恢复振幅信息可以弥补部分性能差距，而微调和预测误差特征则无法弥补。这些发现强调了在评估用于分类的预测基础模型时，强大的特定任务基线和随机权重控制的重要性。