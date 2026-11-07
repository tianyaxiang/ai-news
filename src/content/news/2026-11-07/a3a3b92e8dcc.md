---
title: "T$^2$-Splat: Adaptive Topology Mesh Splatting with Texture Residuals"
originalUrl: "https://arxiv.org/abs/2611.06974"
date: "2026-11-06T05:00:00.000Z"
excerpt: false
---

Computer Science > Computer Vision and Pattern Recognition arXiv:2611.06974 (cs) [Submitted on 4 Nov 2026] Title:T$^2$-Splat: Adaptive Topology Mesh Splatting with Texture Residuals Authors:Zhihao Tang, Youjia Zhang, Mingbo Zhao, Wei Yang.

计算机科学 > 计算机视觉与模式识别 arXiv:2611.06974 (cs) [提交于 2026 年 11 月 4 日] 标题：T$^2$-Splat：具有纹理残差的自适应拓扑网格溅射。作者：Zhihao Tang, Youjia Zhang, Mingbo Zhao, Wei Yang。

Abstract: Triangle-based splatting connects novel view synthesis with conventional graphics pipelines, but often requires excessive tessellation to preserve appearance details. We present T$^2$-Splat, which decouples topology adaptation from appearance refinement.

摘要：基于三角形的溅射技术将新视角合成与传统图形管线连接起来，但通常需要过度的细分曲面才能保留外观细节。我们提出了 T$^2$-Splat，它将拓扑自适应与外观细化解耦。

Safe Restricted Delaunay Triangulation (Safe RDT) initializes mesh connectivity. Dynamic Topology Evolution (DTE) then adapts triangle allocation through edge collapse and vertex split operations. Residual per-face Mip-textures then refine appearance on the fixed mesh using scale-adaptive filtering.

安全受限 Delaunay 三角剖分 (Safe RDT) 用于初始化网格连通性。随后，动态拓扑演化 (DTE) 通过边折叠和顶点分裂操作来调整三角形的分配。最后，每个面的残差 Mip 纹理利用尺度自适应滤波在固定网格上细化外观。

Experiments on Mip-NeRF 360, Tanks & Temples, and DTU demonstrate competitive results with compact meshes. T$^2$-Splat improves PSNR by 0.71dB over MeshSplatting on Mip-NeRF 360. Additional compression experiments demonstrate flexible control of mesh complexity, supporting face budgets as low as 10% of the original face count.

在 Mip-NeRF 360、Tanks & Temples 和 DTU 上的实验表明，该方法在紧凑网格下具有竞争力的结果。在 Mip-NeRF 360 上，T$^2$-Splat 相比 MeshSplatting 将 PSNR 提高了 0.71dB。额外的压缩实验证明了对网格复杂度的灵活控制，支持低至原始面数 10% 的面预算。