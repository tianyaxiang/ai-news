---
title: "OCLDA-GS: Object-Centric Local Deformation-Aware Gaussian Streaming"
originalUrl: "https://arxiv.org/abs/2611.23416"
date: "2026-11-19T05:00:00.000Z"
excerpt: false
---

Computer Science > Computer Vision and Pattern Recognition arXiv:2611.23416 (cs) [Submitted on 17 Nov 2026] Title: OCLDA-GS: Object-Centric Local Deformation-Aware Gaussian Streaming Authors: Ashim Dahal, Nikesh Subedi, Rabab Abdelfattah, Nick Rahimi.

计算机科学 > 计算机视觉与模式识别 arXiv:2611.23416 (cs) [提交于 2026 年 11 月 17 日] 标题：OCLDA-GS：以对象为中心的局部变形感知高斯流。作者：Ashim Dahal, Nikesh Subedi, Rabab Abdelfattah, Nick Rahimi。

Abstract: Streaming 3D Gaussian Splatting (3DGS) allows for online reconstruction of dynamic scenes from multi-view videos for Free Viewpoint Video (FVV). Current time and storage efficient methods rely on selecting a subset of anchor Gaussians and neighborhood interpolation for fast streamable 3DGS. However, these methods can overlook object-specific motion and introduce inconsistencies near object boundaries.

摘要：流式 3D 高斯泼溅（3DGS）允许从多视角视频中在线重建动态场景，以实现自由视角视频（FVV）。当前的时间和存储高效方法依赖于选择锚点高斯的子集和邻域插值来实现快速流式 3DGS。然而，这些方法可能会忽略特定对象的运动，并在对象边界附近引入不一致性。

We propose OCLDA-GS, an object-centric streaming framework that dynamically reallocates object and motion-aware Gaussian anchors to allocate anchor Gaussian support for objects undergoing large motion while at the same time, restricting the gaussian neighborhood within object groups for more precise object boundaries. Furthermore, it estimates object-wise rigid transformations (e.g. a hand moving) and leverages these estimates to learn per-anchor local deformation correction for small deformations (e.g. wrinkles on a shirt).

我们提出了 OCLDA-GS，这是一个以对象为中心的流式框架，它动态地重新分配对象和运动感知高斯锚点，为经历大运动的对象分配锚点高斯支持，同时将高斯邻域限制在对象组内，以获得更精确的对象边界。此外，它还估计对象级的刚性变换（例如手的移动），并利用这些估计来学习针对小变形（例如衬衫上的褶皱）的每个锚点的局部变形校正。

Then, we conduct experiments on three dynamic multi-view video datasets and demonstrate improvements over the previous baselines alongside improved quality between refinement timesteps. Under matched refinement budgets, our method improves PSNR over Instant Gaussian Stream (IGS) by 0.169 dB on N3DV, 0.202 dB on Meeting Room and +0.199 on Google Immersive, while reducing the mean PSNR drop between refinement timesteps by 9.2% and 13.8% in N3DV and Meeting Room, respectively.

随后，我们在三个动态多视角视频数据集上进行了实验，证明了相较于先前基准的改进，以及在细化时间步之间质量的提升。在匹配的细化预算下，我们的方法在 N3DV 上将 PSNR 比 Instant Gaussian Stream (IGS) 提高了 0.169 dB，在 Meeting Room 上提高了 0.202 dB，在 Google Immersive 上提高了 0.199 dB，同时将 N3DV 和 Meeting Room 中细化时间步之间的平均 PSNR 下降分别减少了 9.2% 和 13.8%。