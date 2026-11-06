---
title: "When Does Sharing Work? Scaling a Shared SigLIP2 Across Image, Video, Audio, and Audio-Visual Representations"
originalUrl: "https://arxiv.org/abs/2611.05406"
date: "2026-11-05T05:00:00.000Z"
excerpt: false
---

Computer Science > Computer Vision and Pattern Recognition arXiv:2611.05406 (cs) [Submitted on 20 Oct 2026] Title: When Does Sharing Work? Scaling a Shared SigLIP2 Across Image, Video, Audio, and Audio-Visual Representations Authors: Xiaofei Sun, Peng Wang, Huayao Liu, Xiaoxiao Xu, Jun Song, Deqing Li, Lin Qu.

计算机科学 > 计算机视觉与模式识别 arXiv:2611.05406 (cs) [提交于 2026 年 10 月 20 日] 标题：共享何时有效？跨图像、视频、音频和视听表示扩展共享 SigLIP2。作者：Xiaofei Sun, Peng Wang, Huayao Liu, Xiaoxiao Xu, Jun Song, Deqing Li, Lin Qu。

Abstract: Contrastive pretraining has advanced image-text understanding, yet image, video, and audio encoders are still trained independently, with cross-modal alignment realized mainly through post-hoc binding to a frozen anchor space. We present Omni-Encoder, a general multimodal encoder that processes image, video, audio, and audio-visual inputs within a single SigLIP-2 Vision Transformer with fully shared parameters.

摘要：对比预训练推动了图像-文本理解的发展，但图像、视频和音频编码器仍是独立训练的，跨模态对齐主要通过事后绑定到冻结的锚空间来实现。我们提出了 Omni-Encoder，这是一种通用的多模态编码器，它在单个具有完全共享参数的 SigLIP-2 视觉 Transformer 中处理图像、视频、音频和视听输入。

Unlike anchor-centric binding or per-modality adapters, all modalities are optimized jointly end-to-end, and the framework is organized from input to training. A modality-native input stage first maps each signal into the shared embedding space, including a 1D-convolutional audio tokenizer that converts mel-spectrograms into tokens aligned with visual patches.

与以锚点为中心的绑定或针对特定模态的适配器不同，所有模态均进行端到端的联合优化，且该框架从输入到训练均经过统一组织。模态原生输入阶段首先将每个信号映射到共享嵌入空间，其中包括一个将梅尔频谱图转换为与视觉补丁对齐的标记的一维卷积音频分词器。

A multimodal rotary position embedding parameterized by absolute timestamps then places visual frames and audio segments in a unified spatiotemporal coordinate system. Finally, alternating-modality training interleaves image, video, audio, and temporally aligned audio-visual batches and accumulates their gradients into one update, which we find central to stable joint optimization.

随后，由绝对时间戳参数化的多模态旋转位置嵌入将视觉帧和音频片段置于统一的时空坐标系中。最后，交替模态训练将图像、视频、音频和时间对齐的视听批次交错处理，并将它们的梯度累积为一次更新，我们发现这对稳定的联合优化至关重要。

Omni-Encoder achieves competitive results on 16 benchmarks across all four modalities with one shared parameter set, and joint training improves each modality over its separately trained counterpart. Code and models will be publicly released.

Omni-Encoder 在所有四种模态的 16 个基准测试中，仅使用一组共享参数就取得了具有竞争力的结果，且联合训练使每种模态的表现均优于其单独训练的对应模型。代码和模型将公开发布。