---
title: "Rethinking Streaming Video Diffusion Model: Context, Execution, and Training"
originalUrl: "https://arxiv.org/abs/2609.22283"
date: "2026-09-22T23:50:50.836Z"
---

# Rethinking Streaming Video Diffusion Model: Context, Execution, and Training
# 重新思考流式视频扩散模型：上下文、执行与训练

Understanding the design space of streaming video diffusion is essential to exploring its potential for generation quality and computational efficiency.
理解流式视频扩散的设计空间，对于探索其在生成质量和计算效率方面的潜力至关重要。

We develop a unified analytical framework that relates model and sampler choices, historical conditioning, execution scheduling, and training strategies.
我们开发了一个统一的分析框架，将模型与采样器选择、历史条件设定、执行调度以及训练策略关联起来。

The framework accommodates a broad family of causal context-selection policies and makes their computational dependencies and training-inference alignment explicit.
该框架兼容广泛的因果上下文选择策略，并明确了它们的计算依赖关系以及训练与推理之间的一致性。

Within this design space, we study three representative policies: clean, same-level, and progressive history.
在此设计空间内，我们研究了三种代表性策略：纯净历史（clean）、同级历史（same-level）和渐进历史（progressive history）。

On the full VBench prompt set, same-level and progressive history achieve aggregate scores of 85.24 and 85.60, respectively, compared with 84.45 for the clean-history reference.
在完整的 VBench 提示词集上，同级历史和渐进历史的综合得分分别为 85.24 和 85.60，而作为参考的纯净历史得分为 84.45。

Long-video comparisons further show improved subject consistency and more coherent motion with progressive history.
长视频对比进一步表明，采用渐进历史策略可以提升主体一致性，并获得更连贯的运动效果。

By allowing multiple denoising nodes to be processed together, progressive-history pipelining achieves $1.57$-$2.83\times$ steady-state DiT speedups under our evaluated conditions.
通过允许同时处理多个去噪节点，渐进历史流水线在我们评估的条件下实现了 $1.57$ 到 $2.83$ 倍的稳态 DiT 加速。

We additionally find that LoRA adaptation of the DMD fake-score network improves generation quality using only 2.15% as many trainable fake-score parameters as full-parameter adaptation.
我们还发现，对 DMD 伪分数网络进行 LoRA 微调，仅需全参数微调 2.15% 的可训练参数量，即可提升生成质量。

Together, these findings show that fully denoised history is not a prerequisite for high-quality streaming generation and motivate the joint design of historical conditioning, execution, and training.
综上所述，这些发现表明完全去噪的历史记录并非高质量流式生成的先决条件，并推动了历史条件设定、执行调度与训练策略的联合设计。