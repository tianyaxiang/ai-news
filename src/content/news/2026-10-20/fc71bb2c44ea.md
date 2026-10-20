---
title: "Rethinking User Encoders: Routing Diffusion States for Scenario-Adaptive User Representation"
originalUrl: "https://arxiv.org/abs/2610.22400"
date: "2026-10-19T04:00:00.000Z"
excerpt: false
---

Computer Science > Artificial Intelligence arXiv:2610.22400 (cs) [Submitted on 14 Oct 2026] Title: Rethinking User Encoders: Routing Diffusion States for Scenario-Adaptive User Representation Authors: Junru Zhang, Jinyong Wen, Bin Dou, Wuliang Huang, Baokun Wang, Yu Cheng, Weiqiang Wang, Cheng Peng.

计算机科学 > 人工智能 arXiv:2610.22400 (cs) [提交于 2026 年 10 月 14 日] 标题：重新思考用户编码器：用于场景自适应用户表示的扩散状态路由 作者：Junru Zhang, Jinyong Wen, Bin Dou, Wuliang Huang, Baokun Wang, Yu Cheng, Weiqiang Wang, Cheng Peng。

Abstract: Existing large language model (LLM)-based user encoders serialize heterogeneous behavioral logs and compress them into static representations through autoregressive (AR) prediction. However, their unidirectional constraint limits bidirectional information flow, hindering cross-modal interactions and the joint preservation of multi-source signals. Consequently, the learned static representations struggle to accommodate the distinct evidence requirements of diverse downstream scenarios.

摘要：现有的基于大语言模型（LLM）的用户编码器通过自回归（AR）预测将异构行为日志序列化并压缩为静态表示。然而，它们的单向约束限制了双向信息流，阻碍了跨模态交互和多源信号的联合保存。因此，所学习到的静态表示难以适应不同下游场景对证据的独特需求。

We address these limitations by unlocking the iterative denoising process of diffusion language models (dLLMs) as a multi-granularity reconstruction space. Based on this insight, we propose FINDERS (FactorIzatioN of Diffusion statEs for Routing across Scenarios), a router-equipped dLLM framework comprising four operations: denoise, factorize, route, and compress. Learnable meta-slots organize complementary denoising states into transferable cross-modal semantics and modality-specific behavioral factors.

我们通过将扩散语言模型（dLLMs）的迭代去噪过程解锁为多粒度重构空间来解决这些局限性。基于这一见解，我们提出了 FINDERS（用于跨场景路由的扩散状态因子分解），这是一个配备路由器的 dLLM 框架，包含四个操作：去噪、因子分解、路由和压缩。可学习的元槽（meta-slots）将互补的去噪状态组织成可迁移的跨模态语义和特定模态的行为因子。

To provide grounded supervision, we construct BehaviorQA, a large-scale corpus containing explicit behavioral rationales. Guided by scenario queries, a lightweight router dynamically emphasizes relevant slot directions via an input-level residual pathway before cross-source fusion and final compression. Extensive experiments and online A/B tests across ten industrial scenarios demonstrate that FINDERS consistently outperforms state-of-the-art methods in both unified and scenario-adaptive settings.

为了提供有根据的监督，我们构建了 BehaviorQA，这是一个包含明确行为逻辑的大规模语料库。在场景查询的引导下，轻量级路由器在跨源融合和最终压缩之前，通过输入级残差路径动态强调相关的槽方向。在十个工业场景中进行的广泛实验和在线 A/B 测试表明，FINDERS 在统一和场景自适应设置中均持续优于最先进的方法。

This work effectively pushes the boundaries of dLLMs beyond language generation, demonstrating their immense potential as powerful user representation learners.

这项工作有效地将 dLLMs 的边界推向了语言生成之外，展示了它们作为强大用户表示学习器的巨大潜力。