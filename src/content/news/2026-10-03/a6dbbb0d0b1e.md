---
title: "Encoded but Disconnected: Decomposing Vision-Language Model Failures under a Patching Null"
originalUrl: "https://arxiv.org/abs/2610.00024"
date: "2026-10-03T00:42:40.340Z"
---

# Encoded but Disconnected: Decomposing Vision-Language Model Failures under a Patching Null
# 编码但断连：在补丁无效（Patching Null）条件下分解视觉-语言模型故障

Across three vision-language model architectures (LLaVA-1.5-7B, Qwen2.5-VL-7B, InternVL3-8B), we report a universal negative finding for mid-layer interpretability.
在三种视觉-语言模型架构（LLaVA-1.5-7B、Qwen2.5-VL-7B、InternVL3-8B）中，我们报告了一个关于中间层可解释性的普遍负面发现。

On POPE -- the benchmark common to all three -- the mid layers encode the ground-truth answer in 68-91% of errors, yet this signal is not causally active for the final prediction: residual-stream patching yields 0% non-trivial flip at the layer level on all three architectures, and on two of three at the per-head level (Qwen: 0/12,600 patched forwards).
在三者共用的基准测试 POPE 上，中间层在 68-91% 的错误案例中编码了真实答案（ground-truth），但该信号对最终预测并不具备因果作用：在所有三种架构的层级上，残差流补丁（residual-stream patching）产生的非平凡翻转率为 0%，在其中两种架构的注意力头层级上也同样为 0%（Qwen 模型：0/12,600 次补丁前向传播）。

The lone exception, InternVL3 layer-20 head-2, is a non-vocab, self-attending head whose effect is localized to that specific head (p < 1e-4).
唯一的例外是 InternVL3 的第 20 层第 2 个注意力头，这是一个非词汇表、自注意力头，其影响仅局限于该特定注意力头（p < 1e-4）。

Despite the null, the errors separate operationally into three failure modes -- Perception Failure, Encoded-but-Disconnected, Prior-Override -- learnable above 60% on all three architectures, and the architecture's prior direction predicts which of two interventions elicits a category-specific response.
尽管存在补丁无效的情况，这些错误在操作上可分为三种故障模式——感知失败（Perception Failure）、编码但断连（Encoded-but-Disconnected）以及先验覆盖（Prior-Override）。这三种模式在所有三种架构上的可学习性均超过 60%，且架构的先验方向可以预测哪种干预措施能引发特定类别的响应。

We report these mitigation effects under oracle labels as evidence the categories are mechanistically real, not as a deployable method.
我们报告这些在预言机标签（oracle labels）下的缓解效果，旨在证明这些分类在机制上是真实的，而非作为一种可部署的方法。