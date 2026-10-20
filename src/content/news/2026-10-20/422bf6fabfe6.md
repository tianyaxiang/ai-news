---
title: "CF-NODE: Counterfactual Spatial Node Intervention for Test-Time Adaptation Under Domain Shift, Evaluated Across Five Diabetic Retinopathy Datasets"
originalUrl: "https://arxiv.org/abs/2610.22437"
date: "2026-10-19T04:00:00.000Z"
excerpt: false
---

Computer Science > Machine Learning arXiv:2610.22437 (cs) [Submitted on 15 Oct 2026] Title: CF-NODE: Counterfactual Spatial Node Intervention for Test-Time Adaptation Under Domain Shift, Evaluated Across Five Diabetic Retinopathy Datasets Authors: Sabarish G, Deepak Parashar.

计算机科学 > 机器学习 arXiv:2610.22437 (cs) [2026年10月15日提交] 标题：CF-NODE：用于领域偏移下测试时适应的反事实空间节点干预，在五个糖尿病视网膜病变数据集上进行评估 作者：Sabarish G, Deepak Parashar。

Abstract: Automated fundus-based diabetic retinopathy (DR) grading can substantially expand screening capacity, but source-trained models degrade sharply across different cameras, clinics, and patient populations. Existing test-time adaptation methods depend on entropy minimization or target information accumulated from image batches and streams. These mechanisms can reinforce confidently incorrect predictions and break down when clinical images arrive independently.

摘要：基于眼底图像的自动化糖尿病视网膜病变（DR）分级可以显著扩大筛查能力，但源训练模型在不同的相机、诊所和患者群体中性能会急剧下降。现有的测试时适应方法依赖于熵最小化或从图像批次和流中积累的目标信息。这些机制可能会强化自信但错误的预测，并且在临床图像独立到达时会失效。

We introduce CF-NODE, a novel counterfactual test-time adaptation framework for cross-domain DR grading. Instead of trusting prediction confidence or estimating a target distribution, CF-NODE asks how each prediction responds under a controlled intervention on the evidence supporting it. CF-NODE ranks internal spatial nodes using model-derived attention, feature magnitude, and node-set similarity, progressively attenuates the highest-ranked nodes, and uses the stability of the resulting expected-grade response to apply a bounded calibration of the predicted grade distribution.

我们引入了 CF-NODE，这是一个用于跨领域 DR 分级的创新反事实测试时适应框架。CF-NODE 不再信任预测置信度或估计目标分布，而是询问每个预测在对其支持证据进行受控干预时会如何响应。CF-NODE 利用模型导出的注意力、特征幅度和节点集相似度对内部空间节点进行排序，逐步衰减排名最高的节点，并利用由此产生的预期等级响应的稳定性，对预测的等级分布进行有界校准。

The framework is fully frozen and adapts every image independently using only geometric views and a fixed source-derived prior, requiring no target-derived information or model updates. We evaluate CF-NODE on five external DR datasets under repeated-seed evaluation against TENT, EATA, SAR, and T3A. CF-NODE outperforms all four methods with statistically significant improvements over the second-best method, improves AUC on every target domain, and attains the highest average AUC and macro-F1, delivering stronger grade discrimination together with more balanced recognition across DR severity levels.

该框架完全冻结，仅使用几何视图和固定的源导出先验来独立适应每张图像，无需任何目标导出信息或模型更新。我们在五个外部 DR 数据集上，通过重复种子评估，将 CF-NODE 与 TENT、EATA、SAR 和 T3A 进行了对比评估。CF-NODE 的表现优于所有四种方法，且相比第二好的方法具有统计学意义上的显著提升，在每个目标领域都提高了 AUC，并获得了最高的平均 AUC 和宏观 F1 值，在提供更强的等级区分度的同时，在不同 DR 严重程度级别之间实现了更平衡的识别。

These results demonstrate that counterfactual intervention sensitivity provides consistent and deployment-ready domain robustness for single-image clinical inference.

这些结果表明，反事实干预敏感性为单图像临床推理提供了稳健且可部署的领域鲁棒性。