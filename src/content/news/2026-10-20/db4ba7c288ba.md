---
title: "Generative adversarial networks with Monte Carlo dropout uncertainty quantification for structural health monitoring: Fibre Bragg grating data augmentation comparison in Hawk T1A aircraft"
originalUrl: "https://arxiv.org/abs/2610.22436"
date: "2026-10-19T04:00:00.000Z"
excerpt: false
---

Computer Science > Machine Learning arXiv:2610.22436 (cs) [Submitted on 15 Oct 2026] Title: Generative adversarial networks with Monte Carlo dropout uncertainty quantification for structural health monitoring: Fibre Bragg grating data augmentation comparison in Hawk T1A aircraft Authors: Alvaro Peiro, Marios Impraimakis.

计算机科学 > 机器学习 arXiv:2610.22436 (cs) [提交于 2026 年 10 月 15 日] 标题：用于结构健康监测的具有蒙特卡洛丢弃不确定性量化的生成对抗网络：Hawk T1A 飞机中的光纤布拉格光栅数据增强比较 作者：Alvaro Peiro, Marios Impraimakis。

Abstract: The signal generation capabilities of a novel data augmentation framework are examined in aerospace structures. First, the framework learns class-conditional temporal and spectral characteristics of the measured structural responses. It uses conditional generative adversarial network training and Monte Carlo dropout uncertainty quantification as a Bayesian approximation. This step enables stochastic signal synthesis and uncertainty quantification.

摘要：本文研究了一种新型数据增强框架在航空航天结构中的信号生成能力。首先，该框架学习了测量结构响应的类条件时间与频谱特征。它利用条件生成对抗网络训练和作为贝叶斯近似的蒙特卡洛丢弃不确定性量化。这一步骤实现了随机信号合成与不确定性量化。

Second, the generated responses are rigorously compared against experimental measurements across time, frequency, uncertainty, variability, and feature domains to assess physical realism, statistical consistency, and distributional fidelity. Finally, the synthetic data are evaluated to determine whether they should be incorporated into a supervised damage classification workflow.

其次，将生成的响应与时间、频率、不确定性、变异性和特征域中的实验测量结果进行严格对比，以评估其物理真实性、统计一致性和分布保真度。最后，对合成数据进行评估，以确定它们是否应被纳入监督损伤分类工作流程中。

The framework is validated on the full-scale benchmark dataset from a BAE Systems Hawk T1A aircraft tested at the University of Sheffield's Structural Dynamics Laboratory for Verification and Validation. The test involves acceleration, fibre Bragg grating strain, and nonlinear dynamic response measurements.

该框架在谢菲尔德大学结构动力学验证与确认实验室测试的 BAE 系统公司 Hawk T1A 飞机的全尺寸基准数据集上进行了验证。测试涉及加速度、光纤布拉格光栅应变和非线性动态响应测量。

The results demonstrate that the model accurately captures dominant structural dynamics, it guides on signal use for classification improvement based on uncertainty characteristics, and it provides meaningful uncertainty estimates linked to signal complexity and excitation characteristics.

结果表明，该模型准确捕捉了主要的结构动力学特征，根据不确定性特征指导了用于分类改进的信号使用，并提供了与信号复杂性和激励特征相关联的有意义的不确定性估计。

Importantly, the framework offers a realistic generative modelling plan as a robust digital twin component for data-driven structural health monitoring, supporting resilient decision-making for condition assessment in safety-critical aerospace systems.

重要的是，该框架提供了一种现实的生成建模方案，作为数据驱动结构健康监测的稳健数字孪生组件，为安全关键型航空航天系统的状态评估提供了弹性决策支持。