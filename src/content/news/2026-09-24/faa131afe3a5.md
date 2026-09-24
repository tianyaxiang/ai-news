---
title: "Learning 3D biophysical cell properties from 2D images and cell-population statistics"
originalUrl: "https://arxiv.org/abs/2609.22410"
date: "2026-09-24T00:02:10.760Z"
---

# Learning 3D biophysical cell properties from 2D images and cell-population statistics
# 从二维图像和细胞群体统计数据中学习三维生物物理细胞特性

**Abstract:** Inferring 3D cellular properties from 2D microscopy is difficult when a reference instrument reports only population statistics rather than labels for individual cells. Here we develop a population-supervised framework that maps single 2D red-cell images to latent biophysical quantities and aggregates them to mean corpuscular volume, red-cell distribution width and mean corpuscular haemoglobin.

**摘要：** 当参考仪器仅报告群体统计数据而非单个细胞的标签时，从二维显微图像中推断三维细胞特性是非常困难的。在此，我们开发了一种群体监督框架，将单个二维红细胞图像映射到潜在的生物物理量，并将它们聚合为平均红细胞体积（MCV）、红细胞分布宽度（RDW）和平均红细胞血红蛋白含量（MCH）。

The model combines shared local inference, a biophysically structured decoder for volume and haemoglobin, learned instance weighting and device-specific calibration. We formalise conditions under which aggregate observations identify restricted instance predictors, show why population agreement does not by itself identify single-cell properties or 3D geometry, and derive the dispersion penalty induced by subset mean matching.

该模型结合了共享局部推理、用于体积和血红蛋白的生物物理结构解码器、学习到的实例加权以及设备特定的校准。我们形式化了聚合观测值识别受限实例预测器的条件，阐明了为什么群体一致性本身并不能识别单细胞特性或三维几何结构，并推导了由子集均值匹配引起的离散惩罚。

The development dataset comprises 390 specimens and 1,105 acquisitions across six devices, with reported Pearson correlations of 0.86--0.98 against a Sysmex analyser. The framework provides a testable route from 2D images and population supervision to 3D cellular biophysics without claiming explicit 3D reconstruction.

开发数据集包含来自六种设备的 390 个样本和 1,105 次采集，与 Sysmex 分析仪相比，报告的皮尔逊相关系数为 0.86--0.98。该框架提供了一条从二维图像和群体监督到三维细胞生物物理学的可测试路径，且无需声称进行显式三维重建。