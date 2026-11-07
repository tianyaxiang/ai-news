---
title: "Segment What It Can Draw: Querying a Text-to-Image Generator with Its Own Images for Skin Lesion Segmentation"
originalUrl: "https://arxiv.org/abs/2611.07061"
date: "2026-11-06T05:00:00.000Z"
excerpt: false
---

Computer Science > Computer Vision and Pattern Recognition arXiv:2611.07061 (cs) [Submitted on 4 Nov 2026] Title: Segment What It Can Draw: Querying a Text-to-Image Generator with Its Own Images for Skin Lesion Segmentation Authors: Hongyu Cao, Guangfu Guo, Jinghan Zhang, Dakshak Keerthi Chandra, Ying Zhang, Kunpeng Liu.

计算机科学 > 计算机视觉与模式识别 arXiv:2611.07061 (cs) [提交于 2026 年 11 月 4 日] 标题：绘制其所能分割之物：利用文本到图像生成器自身的图像进行皮肤病变分割 作者：Hongyu Cao, Guangfu Guo, Jinghan Zhang, Dakshak Keerthi Chandra, Ying Zhang, Kunpeng Liu。

Abstract: Skin lesion segmentation without annotated masks requires the target to be specified through other cues. Existing approaches rely on dermoscopy-specific rules, annotation-derived model priors, or user-selected regions. A general text-to-image diffusion transformer offers a text interface to the target, but its concept-word attention is unreliable on dermoscopy images: in the model's attention-output space, the word-derived skin-to-lesion direction is poorly aligned with the direction separating real skin from real lesions.

摘要：在没有标注掩码的情况下进行皮肤病变分割，需要通过其他线索来指定目标。现有的方法依赖于皮肤镜特定的规则、基于标注的模型先验或用户选择的区域。通用的文本到图像扩散 Transformer 为目标提供了文本接口，但其概念词注意力在皮肤镜图像上不可靠：在模型的注意力输出空间中，词汇导出的“皮肤到病变”方向与区分真实皮肤和真实病变的方向对齐度较差。

We show that the direction derived from generated healthy-skin and lesion images is substantially better aligned. Based on this finding, we propose GENIQ, a training-free method that constructs initial skin and lesion prototypes from generated images and refines them using the most skin-like and lesion-like patches from unlabelled dermoscopy images.

我们证明，从生成的健康皮肤和病变图像中导出的方向对齐效果要好得多。基于这一发现，我们提出了 GENIQ，这是一种无需训练的方法，它通过生成的图像构建初始的皮肤和病变原型，并利用未标注皮肤镜图像中最具皮肤特征和病变特征的补丁对其进行优化。

It scores test patches along the refined direction and applies a gated threshold to suppress contextual spill-over around small lesions. Without inference-time annotations or additional models, GENIQ achieves Dice scores of 0.85-0.88 on three dermoscopy test sets. It outperforms zero-shot and word-based attention methods on all three sets, and a hand-designed dermoscopy pipeline in Dice and IoU on two.

它沿着优化后的方向对测试补丁进行评分，并应用门控阈值来抑制小病变周围的上下文溢出。在无需推理时标注或额外模型的情况下，GENIQ 在三个皮肤镜测试集上实现了 0.85-0.88 的 Dice 分数。它在所有三个测试集上均优于零样本和基于词汇的注意力方法，并在其中两个测试集上的 Dice 和 IoU 指标上优于手工设计的皮肤镜处理流程。