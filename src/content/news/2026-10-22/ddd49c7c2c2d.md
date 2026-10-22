---
title: "Uncertainty Gates the Gradient: Adaptive Updates for Generalized Few-Shot 3D Segmentation"
originalUrl: "https://arxiv.org/abs/2610.26909"
date: "2026-10-21T04:00:00.000Z"
excerpt: false
---

Computer Science > Computer Vision and Pattern Recognition arXiv:2610.26909 (cs) [Submitted on 17 Oct 2026] Title: Uncertainty Gates the Gradient: Adaptive Updates for Generalized Few-Shot 3D Segmentation Authors: Yifei Zhao, Fanyu Zhao, Shengtang Wu, Han Zhang, Ruike Cao, Yinsheng Li.

计算机科学 > 计算机视觉与模式识别 arXiv:2610.26909 (cs) [提交于 2026 年 10 月 17 日] 标题：不确定性门控梯度：广义少样本 3D 分割的自适应更新 作者：Yifei Zhao, Fanyu Zhao, Shengtang Wu, Han Zhang, Ruike Cao, Yinsheng Li。

Abstract: In generalized few-shot 3D point cloud segmentation, support annotations are often compromised by sparsity and occlusion. Blindly adapting to such low quality samples risks learning spurious geometric patterns rather than robust novel concepts.

摘要：在广义少样本 3D 点云分割中，支持集标注往往因稀疏性和遮挡而受损。盲目适应这些低质量样本，可能会导致模型学习到虚假的几何模式，而非稳健的新颖概念。

Although 3D Vision-Language Models have been introduced to supplement supervision, the potential of uncertainty to actively govern adaptation dynamics remains underexplored. Existing signal-level methods like loss reweighting fail to prevent unreliable episodes from steering the optimization trajectory.

尽管引入了 3D 视觉-语言模型来补充监督，但利用不确定性主动控制自适应动态的潜力仍未得到充分探索。现有的信号级方法（如损失重加权）无法阻止不可靠的片段引导优化轨迹。

To address this, we propose Uncertainty-Gated Adaptive (UGA), to the best of our knowledge the first framework that elevates uncertainty to update-level gating for generalized few-shot 3D point cloud segmentation. The core module, Uncertainty-Gated Update (UG-Update), estimates episodic reliability via intra-class dispersion over merged support and pseudo-labeled novel supervision, and selectively gates residual gradient updates.

为了解决这一问题，我们提出了不确定性门控自适应（UGA），据我们所知，这是首个将不确定性提升至更新级门控的广义少样本 3D 点云分割框架。其核心模块“不确定性门控更新”（UG-Update）通过合并支持集和伪标签新颖监督下的类内离散度来评估片段可靠性，并选择性地对残差梯度更新进行门控。

This encourages the model to learn novel semantics from reliable episodes while attenuating updates during unreliable ones. Complementing this, we introduce an Uncertainty-Based Pseudo Label Filter (UB-Filter) to enforce learning from high-confidence dense signals. On ScanNet200 and ScanNet++ (1-/5-shot), UGA sets new state of the art with an average +3.08 HM IoU over the strongest prior baseline.

这鼓励模型从可靠的片段中学习新颖的语义，同时在不可靠的片段中减弱更新。作为补充，我们引入了基于不确定性的伪标签过滤器（UB-Filter），以强制模型从高置信度的密集信号中学习。在 ScanNet200 和 ScanNet++（1-/5-shot）数据集上，UGA 创下了新的技术水平，平均 HM IoU 比最强的现有基准高出 +3.08。