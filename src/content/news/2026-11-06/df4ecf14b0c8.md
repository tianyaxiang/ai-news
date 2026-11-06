---
title: "mmHand: Toward Pixel-Level-Accuracy Hand Localization Using a Single Commodity mmWave Device"
originalUrl: "https://arxiv.org/abs/2611.05404"
date: "2026-11-05T05:00:00.000Z"
excerpt: false
---

Computer Science > Computer Vision and Pattern Recognition arXiv:2611.05404 (cs) [Submitted on 20 Oct 2026] Title: mmHand: Toward Pixel-Level-Accuracy Hand Localization Using a Single Commodity mmWave Device Authors: Xiaoyu Zhang, Zhengxiong Li, Chenhan Xu, Luchuan Song, Huining Li, Hongfei Xue, Yingxiao Wu, Wenyao Xu.

计算机科学 > 计算机视觉与模式识别 arXiv:2611.05404 (cs) [提交于 2026 年 10 月 20 日] 标题：mmHand：使用单个商用毫米波设备实现像素级精度的手部定位 作者：Xiaoyu Zhang, Zhengxiong Li, Chenhan Xu, Luchuan Song, Huining Li, Hongfei Xue, Yingxiao Wu, Wenyao Xu。

Abstract: The hand localization problem has been a longstanding focus due to its many applications. The task involves modeling the hand as a singular point and determining its position within a defined coordinate system. However, due to data modality limitations, existing hand localization technologies face several challenges. For example, vision-based localization raises privacy concerns, while wearable-based methods compromise user comfort.

摘要：手部定位问题因其广泛的应用而长期受到关注。该任务涉及将手部建模为一个单点，并确定其在定义坐标系中的位置。然而，由于数据模态的局限性，现有的手部定位技术面临诸多挑战。例如，基于视觉的定位引发了隐私担忧，而基于可穿戴设备的方法则牺牲了用户的舒适度。

In this paper, we introduce mmHand, a new device-free, privacy-preserving dynamic hand localization system with pixel-level accuracy, using a single commodity mmWave device. We first propose a mmImage generation tool to fully extract spatial information from raw mmWave data and introduce a novel 2D image-format representation of mmWave data.

在本文中，我们介绍了 mmHand，这是一种全新的、无需设备、保护隐私的动态手部定位系统，它使用单个商用毫米波设备即可实现像素级精度。我们首先提出了一种 mmImage 生成工具，以从原始毫米波数据中充分提取空间信息，并引入了一种新颖的毫米波数据二维图像格式表示方法。

Next, we design a framework that provides a new quality evaluation method and pixel space labeling for the mmWave data. Finally, we present a cross-modality spatial feature-enhanced model with high spatial feature extraction capabilities, which can accurately localize hand positions at the pixel level in the mmWave radar U-V pixel coordinate system.

接下来，我们设计了一个框架，为毫米波数据提供了新的质量评估方法和像素空间标注。最后，我们提出了一种具有高空间特征提取能力的跨模态空间特征增强模型，该模型能够在毫米波雷达 U-V 像素坐标系中实现像素级的手部位置精确锁定。

We evaluate the system with experiments on 12 subjects in three scenarios, and the results across four metrics demonstrate the effectiveness of our hand localization system.

我们通过在三种场景下对 12 名受试者进行的实验评估了该系统，四个指标的结果证明了我们手部定位系统的有效性。