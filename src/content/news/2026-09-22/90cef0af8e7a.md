---
title: "Attention-Aware Routing: Coupling Routing and Attention in MoEs"
originalUrl: "https://arxiv.org/abs/2609.20974"
date: "2026-09-22T00:16:15.781Z"
---

# Attention-Aware Routing: Coupling Routing and Attention in MoEs
# 注意力感知路由：在混合专家模型（MoEs）中耦合路由与注意力机制

**Abstract:** In Mixture-of-Experts language models, the router typically selects and weights experts based on the token's hidden state, utilizing limited contextual information. We propose Attention-Aware Routing (AAR), which augments the router with temporal and spectral features extracted from a sliding window of attention weights that represent a summary of the model's contextual state, disentangled from the hidden state.

**摘要：** 在混合专家（Mixture-of-Experts, MoE）语言模型中，路由模块通常仅根据 Token 的隐藏状态来选择和加权专家，这导致其利用的上下文信息非常有限。我们提出了“注意力感知路由”（Attention-Aware Routing, AAR），通过从注意力权重的滑动窗口中提取时间与频谱特征来增强路由模块。这些特征代表了模型上下文状态的摘要，且与隐藏状态解耦。

Keeping the base transformer entirely frozen, we train only the routing parameters, isolating routing as the sole variable. AAR improves GSM8K by +3.37 pp over a routing-only SFT baseline on OLMoE. Beyond performance, we show that routing and attention form a coupled circuit: routing changes at layer $l$ propagate through the residual stream to amplify attention sinks at layer $l+1$, reshaping attention without any direct update to the attention mechanism itself.

在保持基础 Transformer 模型完全冻结的前提下，我们仅训练路由参数，从而将路由作为唯一的变量。在 OLMoE 模型上，AAR 在 GSM8K 基准测试中的表现比仅进行路由微调（SFT）的基线提升了 3.37 个百分点。除了性能提升外，我们还证明了路由和注意力机制构成了一个耦合电路：第 $l$ 层的路由变化会通过残差流传播，从而放大第 $l+1$ 层的注意力汇聚点（attention sinks），在不对注意力机制本身进行任何直接更新的情况下，重塑了注意力分布。

Further, AAR reduces long diverging generation, with incorrect answers getting shorter, while correct answers remain unchanged in length. Finally, AAR is strongly depth-sensitive: applying it indiscriminately across layers can degrade factual retrieval, whereas mathematical reasoning gains persist when it is introduced deeper in the network. This sensitivity exposes a retrieval--reasoning tension across depth and makes layer-selective AAR a controlled probe of the routing-relevant information carried by attention at different layers.

此外，AAR 减少了长文本生成的发散现象，错误答案的长度变短，而正确答案的长度保持不变。最后，AAR 对深度高度敏感：在所有层中不加区分地应用它可能会降低事实检索能力，而当它被引入网络更深层时，数学推理能力的提升依然显著。这种敏感性揭示了跨深度下“检索与推理”之间的张力，并使得层级选择性的 AAR 成为探测不同层级注意力所携带的路由相关信息的一种受控手段。