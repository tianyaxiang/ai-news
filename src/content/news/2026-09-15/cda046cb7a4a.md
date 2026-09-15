---
title: "USPLIT-VQA: U-Shaped Split Learning for Visual Question Answering with Contribution-Aware Weighted Aggregation"
originalUrl: "https://arxiv.org/abs/2609.12168"
date: "2026-09-15T00:18:30.834Z"
---

# USPLIT-VQA: U-Shaped Split Learning for Visual Question Answering with Contribution-Aware Weighted Aggregation

**USPLIT-VQA：用于视觉问答的 U 型拆分学习与贡献感知加权聚合**

***

**Abstract:** Visual Question Answering (VQA) systems, jointly interpreting images and natural language queries, hold significant promise across many domains, yet the privacy-sensitive nature of user data creates a fundamental barrier. Centralized training requires access to all data, while federated learning requires each client to host the full model. 

**摘要：** 视觉问答（VQA）系统通过联合解读图像和自然语言查询，在多个领域展现出巨大潜力，但用户数据的隐私敏感性构成了根本障碍。集中式训练需要访问所有数据，而联邦学习则要求每个客户端托管完整模型。

We propose USPLIT-VQA, a U-shaped split learning framework for privacy-preserving VQA in which each client retains the initial layers and the classification head while the server hosts the computationally heavy intermediate layers, keeping raw inputs and labels on the client device. 

我们提出了 USPLIT-VQA，这是一种用于隐私保护 VQA 的 U 型拆分学习框架。在该框架中，每个客户端保留初始层和分类头，而服务器托管计算量巨大的中间层，从而将原始输入和标签保留在客户端设备上。

We further introduce Contribution-Aware Weighted Aggregation (CAWA), a gradient-similarity-based client scoring mechanism designed to reduce the influence of malicious updates. 

我们进一步引入了贡献感知加权聚合（CAWA），这是一种基于梯度相似性的客户端评分机制，旨在减少恶意更新的影响。

Experiments on four VQA datasets (VQA-RAD, SLAKE, PathVQA, and VizWiz) with two backbones show accuracy gains over Federated Learning for the Custom model and reduced accuracy for BiomedCLIP under the evaluated fixed split, alongside client memory reductions of up to 5.8X and communication reductions of up to 10.8X. 

在四个 VQA 数据集（VQA-RAD、SLAKE、PathVQA 和 VizWiz）上使用两个主干网络进行的实验表明，在评估的固定拆分下，Custom 模型相比联邦学习实现了精度提升，而 BiomedCLIP 的精度有所下降；同时，客户端内存需求最高降低了 5.8 倍，通信量最高降低了 10.8 倍。

With one malicious client, CAWA reduces the attacker's influence by over 98%, while experiments at higher corruption levels identify its limitations. Reconstruction experiments further show lower inversion quality under the evaluated attacks.

在存在一个恶意客户端的情况下，CAWA 可将攻击者的影响降低 98% 以上，而在更高破坏程度下的实验则揭示了其局限性。重构实验进一步表明，在所评估的攻击下，该方法具有更低的逆向还原质量。