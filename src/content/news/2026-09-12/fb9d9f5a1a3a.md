---
title: "M3-Former: Multimodal Transformer with Mixture-of-Experts for Long-Term Vessel Trajectory Prediction"
originalUrl: "https://arxiv.org/abs/2609.10559"
date: "2026-09-11T23:34:21.409Z"
---

# M3-Former: Multimodal Transformer with Mixture-of-Experts for Long-Term Vessel Trajectory Prediction
# M3-Former：用于船舶长期轨迹预测的混合专家多模态 Transformer

**Abstract:** To address the challenges of behavioral multimodality, limited semantic utilization, and long-term error accumulation in vessel trajectory prediction, this paper proposes M3-Former, a multimodal trajectory prediction framework enhanced by large language models (LLMs). 

**摘要：** 为解决船舶轨迹预测中行为多模态性、语义利用率有限以及长期误差累积等挑战，本文提出了 M3-Former，这是一个由大语言模型（LLM）增强的多模态轨迹预测框架。

The proposed framework incorporates vessel static attributes and navigational intent as semantic priors for long-term trajectory modeling. Specifically, a unified multimodal representation space is constructed, in which static semantic information is encoded by a pre-trained LLM and aligned with dynamic trajectory features through self-attention. 

该框架将船舶静态属性和航行意图作为长期轨迹建模的语义先验。具体而言，研究构建了一个统一的多模态表示空间，其中静态语义信息由预训练的 LLM 进行编码，并通过自注意力机制与动态轨迹特征对齐。

To jointly capture global route planning and local motion variations, a dual-granularity Mixture-of-Experts (MoE) architecture is introduced, where sequence-level experts model global navigation trends and token-level experts refine fine-grained maneuvering behaviors. 

为了同时捕捉全局航线规划和局部运动变化，本文引入了一种双粒度混合专家（MoE）架构，其中序列级专家用于建模全局航行趋势，而 Token 级专家用于细化精细的操纵行为。

In addition, a Steering-Weighted Cross-Entropy loss is designed to alleviate the long-tail distribution of sparse turning samples and improve prediction accuracy in critical maneuvering scenarios. 

此外，本文设计了一种转向加权交叉熵损失函数，以缓解稀疏转向样本的长尾分布问题，并提高关键操纵场景下的预测准确性。

Experiments on a real-world Danish AIS dataset demonstrate that M3-Former consistently outperforms state-of-the-art baselines across prediction horizons from 1 to 4 hours. In the 4-hour prediction task, the proposed method reduces Average Displacement Error (ADE) and Final Displacement Error (FDE) by 4.4% and 5.1%, respectively, compared with the strongest baseline. 

在真实的丹麦 AIS 数据集上的实验表明，M3-Former 在 1 到 4 小时的预测时段内，表现始终优于现有的最先进基准模型。在 4 小时预测任务中，与最强基准模型相比，该方法将平均位移误差（ADE）和最终位移误差（FDE）分别降低了 4.4% 和 5.1%。

Qualitative and ablation analyses further verify that semantic fusion effectively reduces long-term trajectory drift, while the dual-granularity MoE improves robustness in complex waterways and route-branching scenarios. 

定性分析和消融实验进一步验证了语义融合能有效减少长期轨迹漂移，而双粒度 MoE 架构则提高了在复杂航道和航线分叉场景下的鲁棒性。

The proposed framework establishes a semantic-guided hierarchical prediction paradigm, in which high-level navigational intent and local motion dynamics are jointly modeled for robust long-term vessel trajectory forecasting.

该框架建立了一种语义引导的分层预测范式，通过联合建模高层航行意图和局部运动动力学，实现了稳健的船舶长期轨迹预测。