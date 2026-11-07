---
title: "BlockLock: Reproducible LLM Inference with Fixed Batch Geometry"
originalUrl: "https://arxiv.org/abs/2611.06977"
date: "2026-11-06T05:00:00.000Z"
excerpt: false
---

Computer Science > Artificial Intelligence arXiv:2611.06977 (cs) [Submitted on 4 Nov 2026] Title: BlockLock: Reproducible LLM Inference with Fixed Batch Geometry Authors: Xiuyuan Qi, Pedro Reviriego, Javier Conde, Shanshan Liu.

计算机科学 > 人工智能 arXiv:2611.06977 (cs) [提交于 2026 年 11 月 4 日] 标题：BlockLock：具有固定批处理几何结构的 LLM 可重现推理 作者：Xiuyuan Qi, Pedro Reviriego, Javier Conde, Shanshan Liu。

Abstract: Reproducible LLM inference requires that a request produces the same output regardless of the other requests in the batch. Existing solutions pay for this in different ways: batch-invariant kernels constrain every operator, and isolating prefill with fixed-shape decode (our CoRun-style baseline) gives up shared prefill compute and pads decode.

摘要：可重现的 LLM 推理要求请求无论批处理中包含其他什么请求，都能产生相同的输出。现有的解决方案以不同的方式为此付出代价：批处理不变内核限制了每个算子，而通过固定形状解码隔离预填充（我们 CoRun 风格的基准）则放弃了共享预填充计算并填充了解码过程。

We present BlockLock, which keeps shared batched prefill and pins only the numerical path of the protected request: it fixes the geometry that the request sees, with two modes: BlockLock-Rows uses fixed-width rows and retains batched decode of all requests; BlockLock-Pack uses terminal-anchored packing with an isolated dummy segment, then extracts the protected request's KV state for target-only decode.

我们提出了 BlockLock，它保留了共享的批处理预填充，并仅固定受保护请求的数值路径：它固定了请求所见的几何结构，并具有两种模式：BlockLock-Rows 使用固定宽度的行并保留所有请求的批处理解码；BlockLock-Pack 使用带有隔离虚拟段的终端锚定打包，然后提取受保护请求的 KV 状态以进行目标专用解码。

Under a stated per-deployment contract, both modes preserve the target's output bitwise when its companions change. Across five dense models (Qwen3-8B/14B, Llama-3.1-8B-Instruct, and Gemma-3-4B/12B-IT) and three single-GPU deployments (NVIDIA A6000, A100, and H100), we evaluate our approach on both tinyBenchmarks and BFCL; we also include initial tensor-parallel experiments on two NVIDIA A6000 GPUs.

在既定的每次部署契约下，当伴随请求发生变化时，两种模式都能按位保留目标的输出。在五个密集模型（Qwen3-8B/14B、Llama-3.1-8B-Instruct 和 Gemma-3-4B/12B-IT）和三个单 GPU 部署（NVIDIA A6000、A100 和 H100）中，我们在 tinyBenchmarks 和 BFCL 上评估了我们的方法；我们还包括了在两个 NVIDIA A6000 GPU 上进行的初步张量并行实验。

Both modes preserve target sequences and Top20-logit bits in the reported tests. At equal delivered work, BlockLock-Rows reduces latency by 53.5--55.0\% and improves throughput by 115.2--122.2\% relative to vLLM Batch-Invariant; compared with batch-invariant kernels, it needs no custom kernel implementations and constrains only the protected requests.

在报告的测试中，两种模式都保留了目标序列和 Top20-logit 位。在相同的交付工作量下，与 vLLM Batch-Invariant 相比，BlockLock-Rows 将延迟降低了 53.5--55.0%，并将吞吐量提高了 115.2--122.2%；与批处理不变内核相比，它不需要自定义内核实现，且仅限制受保护的请求。