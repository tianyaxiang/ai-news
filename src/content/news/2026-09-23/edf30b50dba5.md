---
title: "TreeSpark: Calibrated, Load-Adaptive Draft Trees for Semi-Autoregressive Speculative Decoding"
originalUrl: "https://arxiv.org/abs/2609.22098"
date: "2026-09-22T23:44:49.842Z"
---

# TreeSpark: Calibrated, Load-Adaptive Draft Trees for Semi-Autoregressive Speculative Decoding
# TreeSpark：用于半自回归投机解码的校准式负载自适应草稿树

**Abstract:** Speculative decoding accelerates language-model inference by letting a cheap drafter propose tokens that the target model verifies in parallel. Recent block drafters make drafting nearly free: a single backbone pass emits an entire block of draft tokens. Draft trees promise a further gain -- several alternative continuations verified in one target forward -- but existing constructions rank candidates by per-position marginals that ignore which parent a candidate extends, so on semi-autoregressive drafters wider trees mostly add mis-ranked nodes; and a tree of fixed size ignores how much speculation each decoding round, and each serving load, can support.

**摘要：** 投机解码通过让轻量级草稿模型（drafter）生成候选 Token，并由目标模型并行验证，从而加速语言模型推理。近期的块级草稿模型（block drafters）使得草稿生成几乎零成本：仅需一次主干网络前向传播即可输出整个 Token 块。草稿树（Draft trees）有望带来进一步的性能提升——即在一次目标模型前向传播中验证多个候选续写路径。然而，现有的构建方法通常根据位置边缘概率对候选词进行排序，忽略了候选词所依赖的父节点，导致在半自回归草稿模型中，更宽的树结构往往引入了排序错误的节点；此外，固定大小的树结构也无法根据每一轮解码的实际需求及服务负载进行动态调整。

We introduce TreeSpark, which reads a parent-conditioned distribution from the drafter's existing Markov head at negligible cost, calibrates it into an edge-acceptance estimate, and lets path survival govern everything else: best-first expansion, per-round stopping, and a load-adaptive serving policy. Sampling siblings without replacement, with matching residuals in recursive rejection, keeps decoding lossless at any temperature.

我们引入了 TreeSpark，它能以极低的成本从草稿模型现有的马尔可夫头（Markov head）中读取父节点条件分布，将其校准为边接受率估计（edge-acceptance estimate），并利用路径存活率来统筹全局：包括最佳优先扩展、单轮停止机制以及负载自适应服务策略。通过无放回的同级采样，并结合递归拒绝采样中的残差匹配，TreeSpark 确保了在任何温度参数下解码过程的无损性。

Adaptive trees improve on matched fixed budgets at every temperature; against a tuned chain on the same drafter, TreeSpark accepts 15-25% more draft tokens per round and decodes 8-14% faster in single-request wall-clock, and under rising load it gracefully shrinks the tree back to the chain.

自适应树结构在各种温度设置下均优于匹配的固定预算方案；与同一草稿模型上的优化链式结构相比，TreeSpark 每轮接受的草稿 Token 数量增加了 15-25%，在单请求挂钟时间（wall-clock time）下解码速度提升了 8-14%。此外，在负载增加时，它能平滑地将树结构缩减回链式结构。