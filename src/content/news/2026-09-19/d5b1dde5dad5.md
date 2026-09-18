---
title: "Open-vocabulary 3D object detection with promptable segmentation"
originalUrl: "https://arxiv.org/abs/2609.19358"
date: "2026-09-18T23:33:12.729Z"
---

# Open-vocabulary 3D object detection with promptable segmentation
# 基于可提示分割的开放词汇 3D 物体检测

**Abstract:** Three-dimensional object detection for autonomous driving is dominated by detectors trained on large corpora of human-annotated 3D boxes. Such a detector learns a fixed category list, and everything outside it is invisible. This paper asks whether the task can be solved training-free and open-vocabulary.

**摘要：** 自动驾驶中的三维物体检测目前主要由在大量人工标注 3D 框语料库上训练的检测器所主导。这类检测器只能学习固定的类别列表，列表之外的所有物体对它而言都是不可见的。本文探讨了该任务是否可以在无需训练且实现开放词汇的情况下得到解决。

A promptable segmentation model (SAM3), queried with class names as text prompts, supplies instance masks in the vehicle's six surround-view cameras, and the masks are turned into metric 3D boxes using the geometry of the scene. The core is a controlled three-stage comparison on nuScenes in which 2D detection is held fixed and only the source of 3D geometry changes.

一个可提示的分割模型（SAM3）通过以类别名称作为文本提示进行查询，为车辆的六个环视摄像头提供实例掩码，并利用场景的几何结构将这些掩码转换为度量 3D 框。研究的核心是在 nuScenes 数据集上进行的受控三阶段对比实验，其中 2D 检测保持不变，仅改变 3D 几何结构的来源。

Geometry predicted from images alone reaches 0.183 mean average precision (mAP) under the official protocol; fitting boxes from raw LiDAR points inside the same masks with training-free rules reaches 0.298 mAP / 0.348 nuScenes detection score (NDS) at zero labeling cost; borrowing supervised box geometry at inference time lifts the same detections to 0.413 mAP / 0.555 NDS, which locates the pipeline's largest deficit in measurement precision rather than 2D detection, while class confusion and confidence calibration survive that substitution.

仅从图像预测的几何结构在官方协议下达到了 0.183 的平均精度均值（mAP）；在零标注成本下，通过无需训练的规则，利用相同掩码内的原始激光雷达（LiDAR）点拟合 3D 框，达到了 0.298 mAP / 0.348 nuScenes 检测分数（NDS）；在推理时借用监督学习的框几何结构，可将相同的检测结果提升至 0.413 mAP / 0.555 NDS。这表明该流程最大的缺陷在于测量精度而非 2D 检测，而类别混淆和置信度校准问题在替换后依然存在。

Reversing the direction, a three-state camera-witness rule built from the same masks improves a supervised LiDAR-only detector from 0.596 to 0.630 mAP, roughly half the gain of fully supervised camera fusion, with no training. A coverage analysis shows that SAM3 finds 84% of in-range objects with a correctly named mask; the classes that fail in the official metric are misnamed or geometrically unforgiving, not unseen.

反过来，利用相同的掩码构建的三状态“摄像头见证”规则，在无需训练的情况下，将仅使用激光雷达的监督检测器从 0.596 mAP 提升至 0.630 mAP，这大约是全监督摄像头融合增益的一半。覆盖率分析显示，SAM3 能以正确的名称掩码找到 84% 的范围内物体；在官方指标中失败的类别通常是因为命名错误或几何结构难以处理，而非因为它们是“未见过的”类别。