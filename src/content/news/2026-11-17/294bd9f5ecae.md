---
title: "Advancing Quantization for R&R Models with Microscaling Formats"
originalUrl: "https://arxiv.org/abs/2611.17501"
date: "2026-11-16T05:00:00.000Z"
excerpt: false
---

Recommendation and Ranking (R&R) models, particularly in digital advertising, require massive inference throughput but exhibit extreme sensitivity to precision loss. Unlike Large Language Models (LLMs) that frequently tolerate quantization-induced accuracy drops of 1% or more, production-grade R&R models enforce a stringent launch bar: model quality must remain within a 0.01% Normalized Entropy (NE) margin relative to the baseline, which commonly uses FP16 or FP32.

推荐与排序（R&R）模型，特别是在数字广告领域，需要极高的推理吞吐量，但对精度损失极其敏感。与经常能容忍 1% 或更高量化精度下降的大语言模型（LLM）不同，生产级 R&R 模型执行严格的发布标准：模型质量必须保持在相对于基准（通常使用 FP16 或 FP32）0.01% 的归一化熵（NE）误差范围内。

This tight constraint has historically hindered the adoption of aggressive quantization in this domain. In this paper, we present an empirical evaluation of both MXFP8 and the 6-bit MXFP6 format for industrial-scale R&R inference on the AMD MI350X architecture. To the best of our knowledge, this is the first paper, across R&R and LLM domains, that reports significant speedups from native MXFP6 GEMMs, which quantize both weights and activations and compute directly on 6-bit elements, without sacrificing model quality.

这一严格的约束在历史上阻碍了该领域对激进量化技术的采用。在本文中，我们针对 AMD MI350X 架构上的工业级 R&R 推理，对 MXFP8 和 6 位 MXFP6 格式进行了实证评估。据我们所知，这是 R&R 和 LLM 领域中首篇报告原生 MXFP6 GEMM 显著加速的论文；该方法在不牺牲模型质量的前提下，对权重和激活值进行量化，并直接在 6 位元素上进行计算。

We demonstrate that we can selectively apply this 6-bit format to maximize overall QPS gain without breaching the strict NE parity threshold. We further show that MXFP8 is a viable alternative to row-wise FP8: the two formats have nearly the same accuracy on our models, so the faster kernel can be chosen for each GEMM shape.

我们证明了可以有选择地应用这种 6 位格式，在不突破严格 NE 等价阈值的情况下最大化整体 QPS 增益。我们进一步表明，MXFP8 是行级 FP8 的可行替代方案：这两种格式在我们的模型上具有几乎相同的精度，因此可以针对每种 GEMM 形状选择更快的内核。

On two production ads ranking models, our implementation shows measured GEMM kernel speedups over FP16 of 1.33--1.55x for MXFP8 and 1.73--1.99x for MXFP6 across all supported linear layers, and up to 2.90x for MXFP6 on individual layers, alongside end-to-end (E2E) inference throughput gains from selective MXFP6 of 1.5--5.3% for Model A and 7.6--14.3% for Model B over their FP8 configurations.

在两个生产级广告排序模型上，我们的实现显示，在所有支持的线性层中，MXFP8 相比 FP16 的 GEMM 内核加速为 1.33--1.55 倍，MXFP6 为 1.73--1.99 倍，在单个层上 MXFP6 的加速最高可达 2.90 倍；同时，通过选择性使用 MXFP6，模型 A 的端到端（E2E）推理吞吐量相比其 FP8 配置提升了 1.5--5.3%，模型 B 提升了 7.6--14.3%。