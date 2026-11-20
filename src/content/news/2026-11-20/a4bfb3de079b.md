---
title: "Autoregressive View Model"
originalUrl: "https://arxiv.org/abs/2611.23417"
date: "2026-11-19T05:00:00.000Z"
excerpt: false
---

Computer Science > Computer Vision and Pattern Recognition arXiv:2611.23417 (cs) [Submitted on 17 Nov 2026] Title: Autoregressive View Model Authors: Jensen (Jinghao) Zhou, Samuel Rota Bulo, Denis Rozumny, Duncan Zauss, Peter Hedman, Nikhil Keetha, Philip Torr, Christian Rupprecht, Andrea Vedaldi, Peter Kontschieder.

计算机科学 > 计算机视觉与模式识别 arXiv:2611.23417 (cs) [提交于 2026 年 11 月 17 日] 标题：自回归视图模型 作者：Jensen (Jinghao) Zhou, Samuel Rota Bulo, Denis Rozumny, Duncan Zauss, Peter Hedman, Nikhil Keetha, Philip Torr, Christian Rupprecht, Andrea Vedaldi, Peter Kontschieder。

Abstract: We present the Autoregressive View Model (AVM), which generates a scene as a stream of views without constructing an explicit 3D representation. Through a unified in-context interface, AVM conditions on images or videos to generate short clips along a requested camera path. Visual context grounds reconstruction and interpolation, while a learned prior enables extrapolation into unseen regions.

摘要：我们提出了自回归视图模型（AVM），它将场景生成为一系列视图流，而无需构建显式的 3D 表示。通过统一的上下文内接口，AVM 以图像或视频为条件，沿请求的摄像机路径生成短片。视觉上下文为重建和插值提供了基础，而学习到的先验知识则实现了对未见区域的推断。

AVM retrieves relevant views from inputs and generated history to form a bounded active context. We fine-tune a pretrained bidirectional video diffusion transformer with flow matching in an N-in-1-out formulation. We then tune a causal model on its own rollouts to improve photorealism, reduce denoising steps, and limit long-horizon drift. We scale training to approximately 8M scenes and video clips.

AVM 从输入和生成的历史记录中检索相关视图，以形成有界的活动上下文。我们通过 N-in-1-out 的形式，对预训练的双向视频扩散 Transformer 进行了流匹配微调。随后，我们在其自身的展开结果上调整因果模型，以提高照片级真实感、减少去噪步骤并限制长程漂移。我们将训练规模扩展至约 800 万个场景和视频片段。

We evaluate generation capacity and scene persistence across benchmarks for camera control, text control, visual quality, dynamics, sparse and 4D reconstruction, and long-horizon consistency. The results demonstrate that AVM adapts to diverse input and output settings through one in-context interface.

我们在摄像机控制、文本控制、视觉质量、动态、稀疏和 4D 重建以及长程一致性等基准测试中评估了其生成能力和场景持久性。结果表明，AVM 通过单一的上下文内接口即可适应多种输入和输出设置。