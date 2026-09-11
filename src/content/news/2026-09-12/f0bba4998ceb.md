---
title: "AcFlow: Controlling Text-to-Image Diffusion Transformers via Learned Conditional Activation Flow"
originalUrl: "https://arxiv.org/abs/2609.10723"
date: "2026-09-11T23:35:07.013Z"
---

# AcFlow: Controlling Text-to-Image Diffusion Transformers via Learned Conditional Activation Flow
# AcFlow：通过学习条件激活流控制文生图扩散 Transformer

**Abstract:** Text-to-image diffusion transformers (DiTs) are powerful generators, yet direct prompting provides limited control interface for style intensity and can fail to suppress unwanted concepts. To enable these controls, we introduce AcFlow, an inference-time controller that transports intermediate layer image-token activations through a learned concept-conditioned velocity field while keeping the base DiT frozen.

**摘要：** 文生图扩散 Transformer (DiT) 是强大的生成模型，但直接提示词（prompting）在控制风格强度方面提供的接口有限，且往往无法抑制不想要的元素。为了实现这些控制，我们引入了 AcFlow，这是一种推理时控制器。它在保持基础 DiT 模型冻结的情况下，通过一个学习到的、基于概念条件的向量场（velocity field）来传输中间层的图像 Token 激活值。

A textual concept description specifies the desired intervention, while the integration horizon provides a continuous control parameter. The field produces token-varying, activation-dependent updates. With parameters shared across concepts within each task family, the field supports fine-grained descriptions and generalizes to concepts unseen during training without per-concept fitting.

文本概念描述指定了所需的干预方式，而积分视界（integration horizon）则提供了一个连续的控制参数。该向量场产生随 Token 变化且依赖于激活状态的更新。由于参数在每个任务族内的不同概念间共享，该模型支持细粒度的描述，并能在无需针对每个概念进行拟合的情况下，泛化到训练中未见过的概念。

On style control, AcFlow achieves the best style--content trade-off among the evaluated baselines in the high-style-alignment regime. At a fixed operating point, AcFlow attains style--content alignment of 0.5365/0.2860, compared with 0.4397/0.2684 for the baseline with the highest style alignment. Qualitative results demonstrate suppression of diverse concepts, including cases where direct prompting fails. Our analyses support the learned velocity field as an adaptive control mechanism, with update directions varying across tokens and depend on their activation states. Our code is available at this https URL.

在风格控制方面，AcFlow 在高风格对齐区间内实现了评估基线中最佳的风格与内容权衡。在固定的工作点上，AcFlow 的风格/内容对齐度达到了 0.5365/0.2860，而风格对齐度最高的基线模型仅为 0.4397/0.2684。定性结果证明了该模型对多种概念的抑制能力，包括直接提示词失效的情况。我们的分析支持将学习到的向量场作为一种自适应控制机制，其更新方向随 Token 变化并取决于它们的激活状态。代码已在链接中提供。