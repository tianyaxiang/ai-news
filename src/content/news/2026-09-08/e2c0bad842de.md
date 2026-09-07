---
title: "Quantum-Assisted Memory-Efficient Training for Parameter-Intensive Wi-Fi-Based Human Activity Recognition"
originalUrl: "https://arxiv.org/abs/2609.04271"
date: "2026-09-07T23:40:46.520Z"
---

# Quantum-Assisted Memory-Efficient Training for Parameter-Intensive Wi-Fi-Based Human Activity Recognition
# 面向参数密集型 Wi-Fi 人体行为识别的量子辅助内存高效训练

**Abstract:** Wi-Fi-based human activity recognition (HAR) has become an important part of integrated sensing and communications, paving the way for a range of context-aware services. However, most existing Wi-Fi-based HAR systems rely on deep learning (DL) models that are computationally and memory intensive in both training and inference, which poses significant challenges for real-world deployment.

**摘要：** 基于 Wi-Fi 的人体行为识别（HAR）已成为集成感知与通信的重要组成部分，为各类情境感知服务铺平了道路。然而，大多数现有的 Wi-Fi HAR 系统依赖于深度学习（DL）模型，这些模型在训练和推理阶段都具有高计算和高内存需求，这为实际部署带来了巨大挑战。

Conventional training requires simultaneous updates of millions of parameters, leading to prohibitive memory consumption. In this paper, we propose a novel quantum-assisted memory-efficient training framework (Q-MET) designed to improve efficiency in both training and inference. Q-MET utilizes a hybrid quantum classical neural network to indirectly generate parameters for HAR models, significantly reducing the trainable parameter count compared to direct optimization.

传统的训练过程需要同时更新数百万个参数，导致内存消耗过高。在本文中，我们提出了一种新颖的量子辅助内存高效训练框架（Q-MET），旨在提高训练和推理的效率。Q-MET 利用混合量子经典神经网络间接生成 HAR 模型的参数，与直接优化相比，显著减少了可训练参数的数量。

To further support the deployment on resource-constrained devices, we integrate structured pruning during the training phase. Experimental results demonstrate that Q-MET achieves a 90% to 95% reduction in trainable parameters compared with conventional backpropagation-based DL training while maintaining or even exceeding classical classification accuracy.

为了进一步支持在资源受限设备上的部署，我们在训练阶段集成了结构化剪枝技术。实验结果表明，与传统的基于反向传播的深度学习训练相比，Q-MET 在保持甚至超过经典分类准确率的同时，实现了 90% 到 95% 的可训练参数缩减。

Additionally, Q-MET supports lightweight inference through structured pruning, achieving 75% to 85% model sparsity with less than 2% loss in classification accuracy. To the best of our knowledge, this work represents the first quantum-assisted approach to simultaneously tackle memory inefficiencies in both the training and inference stages of HAR systems.

此外，Q-MET 通过结构化剪枝支持轻量级推理，在分类准确率损失小于 2% 的情况下，实现了 75% 到 85% 的模型稀疏度。据我们所知，这项工作是首个通过量子辅助方法同时解决 HAR 系统在训练和推理阶段内存效率低下问题的研究。