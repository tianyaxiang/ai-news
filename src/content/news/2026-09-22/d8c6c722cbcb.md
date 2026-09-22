---
title: "Bio-MF: Low-Latency and High-Fidelity EEG-to-fNIRS Cross-Modal Generation for Hybrid Motor-Imagery Brain--Computer Interfaces"
originalUrl: "https://arxiv.org/abs/2609.20904"
date: "2026-09-22T00:21:11.098Z"
---

# Bio-MF: Low-Latency and High-Fidelity EEG-to-fNIRS Cross-Modal Generation for Hybrid Motor-Imagery Brain-Computer Interfaces
# Bio-MF：用于混合运动想象脑机接口的低延迟、高保真 EEG 转 fNIRS 跨模态生成

**Abstract:** Hybrid motor-imagery brain-computer interfaces (MI-BCIs) combining EEG and fNIRS can outperform EEG-only systems by exploiting complementary electrophysiological and hemodynamic information. To obtain such hybrid information when paired EEG-fNIRS acquisition is unavailable or inconvenient, recent studies have focused on EEG-to-fNIRS cross-modal generation. However, existing methods still suffer from slow generation and often require pretraining, limiting their use in real-time MI-BCI scenarios. Although one-step generative models offer an attractive route to low-latency synthesis, removing the iterative refinement process can reduce generation fidelity and introduce non-physiological artifacts.

**摘要：** 结合 EEG 和 fNIRS 的混合运动想象脑机接口（MI-BCI）通过利用互补的电生理和血流动力学信息，能够优于仅使用 EEG 的系统。为了在无法获取或不便进行 EEG-fNIRS 同步采集时获得此类混合信息，近期的研究聚焦于 EEG 到 fNIRS 的跨模态生成。然而，现有方法仍存在生成速度慢的问题，且通常需要预训练，限制了其在实时 MI-BCI 场景中的应用。尽管一步生成模型为低延迟合成提供了一条有吸引力的途径，但去除迭代细化过程可能会降低生成保真度并引入非生理性伪影。

To address these problems, this paper proposes Bio-MF, a latent-free one-step MeanFlow framework for EEG-conditioned fNIRS generation. Bio-MF performs direct signal-space x-prediction, converts this signal-space output into MeanFlow velocity supervision, and completes inference with one network evaluation. To preserve task-relevant hemodynamic structure under heterogeneous sensor layouts, Bio-MF integrates Spatial-Temporal Interactive 4D Encoding, cross-modal classifier-free guidance, and noise-level-gated FFT regularization.

为了解决这些问题，本文提出了 Bio-MF，这是一个用于 EEG 条件下 fNIRS 生成的无潜空间（latent-free）一步 MeanFlow 框架。Bio-MF 执行直接的信号空间 x-预测，将此信号空间输出转换为 MeanFlow 速度监督，并通过一次网络评估完成推理。为了在异构传感器布局下保留与任务相关的血流动力学结构，Bio-MF 集成了时空交互式 4D 编码、跨模态无分类器引导以及噪声水平门控的 FFT 正则化。

On Dataset 1, EEG + synthetic fNIRS improves ACC over EEG-only by 3.37 and 4.15 percentage points for HbR and HbO, respectively. On Dataset 2, the corresponding gains remain 2.98 and 2.50 percentage points under the unseen 64-channel EEG montage. On an RTX PRO 6000 GPU, Bio-MF generates one fNIRS trial in 7.0 ms, corresponding to an 857x speedup over the 1000-step SCDM latency. These results show that Bio-MF enables fast EEG-to-fNIRS synthesis while preserving task-relevant generation quality for downstream hybrid MI decoding. Our code is available at this https URL.

在数据集 1 上，EEG + 合成 fNIRS 在 HbR 和 HbO 上的准确率（ACC）分别比仅使用 EEG 提高了 3.37 和 4.15 个百分点。在数据集 2 上，在未见过的 64 通道 EEG 蒙太奇下，相应的增益仍保持在 2.98 和 2.50 个百分点。在 RTX PRO 6000 GPU 上，Bio-MF 生成一个 fNIRS 试验仅需 7.0 毫秒，相比 1000 步的 SCDM 延迟实现了 857 倍的加速。这些结果表明，Bio-MF 能够实现快速的 EEG 到 fNIRS 合成，同时为下游的混合 MI 解码保留了与任务相关的生成质量。我们的代码可在该链接获取。