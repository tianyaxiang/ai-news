---
title: "Benchmarking Model Compression Techniques Across Heterogeneous Edge Platforms: A Predictive Maintenance Use Case for Rotating Machinery"
originalUrl: "https://arxiv.org/abs/2610.30228"
date: "2026-10-23T04:00:00.000Z"
excerpt: false
---

Computer Science > Machine Learning arXiv:2610.30228 (cs) [Submitted on 21 Oct 2026] Title: Benchmarking Model Compression Techniques Across Heterogeneous Edge Platforms: A Predictive Maintenance Use Case for Rotating Machinery.

计算机科学 > 机器学习 arXiv:2610.30228 (cs) [提交于 2026 年 10 月 21 日] 标题：跨异构边缘平台的模型压缩技术基准测试：旋转机械预测性维护用例。

Abstract: To enable Industry 5.0, where autonomous systems are widely adopted and integrated with people to promote sustainable development in industries, it is imperative to adapt complex deep learning models to operate efficiently on resource-constrained hardware for edge inference. However, adapting these models remains challenging due to the hardware heterogeneity of edge computing in industrial settings, performance degradation caused by model compression, and the lack of clear guidance on which compression techniques are practical and effective for applications such as predictive maintenance.

摘要：为了实现工业 5.0，即广泛采用自主系统并将其与人类集成以促进工业可持续发展，必须使复杂的深度学习模型能够适应资源受限的硬件，从而在边缘端高效运行。然而，由于工业环境中边缘计算的硬件异构性、模型压缩导致的性能下降，以及缺乏关于哪些压缩技术对于预测性维护等应用既实用又有效的明确指导，调整这些模型仍然具有挑战性。

To address these challenges, this paper presents a comprehensive comparative analysis of four state-of-the-art model compression techniques applied to a high-performance convolutional neural network for predictive maintenance using a real-world dataset of rotating machinery, equipment typically used in industry. The compressed models were evaluated across a heterogeneous set of nine computing platforms, ranging from highly constrained edge computing devices to general purpose and high-performance processors, reflecting the diversity and fragmentation typical of industrial edge environments.

为了应对这些挑战，本文对四种最先进的模型压缩技术进行了全面的比较分析，这些技术被应用于一个用于预测性维护的高性能卷积神经网络，并使用了工业中典型的旋转机械设备的真实数据集。压缩后的模型在九个异构计算平台上进行了评估，范围从高度受限的边缘计算设备到通用和高性能处理器，反映了工业边缘环境典型的多样性和碎片化特征。

By jointly prioritizing classification performance, inference speed, and compression ratio, we found that compression using knowledge distillation emerged as the most effective approach. The model had more than 90% speedup across all devices while maintaining a 91.22% balanced F-score, with a very small drop in predictive performance relative to the uncompressed model, along with a 98.9% size reduction.

通过综合考虑分类性能、推理速度和压缩比，我们发现使用知识蒸馏的压缩方法是最有效的。该模型在所有设备上的速度提升超过 90%，同时保持了 91.22% 的平衡 F 分数，与未压缩模型相比，预测性能下降极小，且模型体积减少了 98.9%。

Through successful deployment across multiple edge platforms and a systematic comparison of compression strategies, we demonstrated a clear path to achieving Industry 5.0 targets, drastically cutting computational costs and, consequently, energy consumption without sacrificing predictive performance.

通过在多个边缘平台上的成功部署以及对压缩策略的系统性比较，我们展示了一条实现工业 5.0 目标的清晰路径，在不牺牲预测性能的前提下，大幅降低了计算成本，从而减少了能源消耗。