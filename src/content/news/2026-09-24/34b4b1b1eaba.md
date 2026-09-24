---
title: "Federating Quantum and Classical Computing: A Privacy-Preserving Hybrid Approach"
originalUrl: "https://arxiv.org/abs/2609.25082"
date: "2026-09-24T00:12:11.616Z"
---

# Federating Quantum and Classical Computing: A Privacy-Preserving Hybrid Approach
# 联邦量子与经典计算：一种保护隐私的混合方法

**Abstract:** Quantum machine learning (QML) is increasingly recognized as one of the most promising near-term applications of quantum computing, viewed as a next-frontier candidate beyond purely classical approaches. Hybrid quantum-classical models operationalize this potential by embedding a parameterized quantum circuit within a model where all other components remain classical—a design already applied to chemistry simulation, financial modeling, and image classification.

**摘要：** 量子机器学习（QML）正日益被公认为量子计算近期最有前景的应用之一，被视为超越纯经典方法的下一个前沿候选者。混合量子-经典模型通过将参数化量子电路嵌入到其他组件均为经典的模型中，实现了这一潜力——这种设计已被应用于化学模拟、金融建模和图像分类。

However, their deployment in privacy-sensitive, multi-party settings is constrained by the need to avoid centralizing raw data and by the requirement that modern quantum circuits remain parameter-efficient to stay trainable at scale. In this paper, we address these constraints by evaluating federated learning (FL) as a means of combining a hybrid quantum-classical active party with a classical passive party, using this http URL's Blind Vertical FL (SBVFL) protocol to avoid centralizing raw data, while drastically reducing communication.

然而，它们在隐私敏感的多方环境中的部署受到限制，原因在于需要避免原始数据中心化，以及现代量子电路必须保持参数高效以实现大规模可训练性的要求。在本文中，我们通过评估联邦学习（FL）来解决这些限制，将其作为结合混合量子-经典主动方与经典被动方的一种手段，并使用 SBVFL（盲垂直联邦学习）协议来避免原始数据中心化，同时大幅减少通信量。

We construct the split multiplicative periodic parity (SMPP) benchmark, following common QML design practice. On this task, our simulations show that SBVFL raises accuracy from 0.7227 to 0.8757 compared to local training, closely approaching non-private centralized accuracy, and that the hybrid quantum-classical model achieves this with substantially fewer trainable parameters than the classical neural networks and random forest alternatives.

我们遵循常见的 QML 设计实践，构建了分裂乘法周期奇偶校验（SMPP）基准测试。在此任务中，我们的模拟结果显示，与本地训练相比，SBVFL 将准确率从 0.7227 提高到了 0.8757，非常接近非隐私保护下的中心化训练准确率；此外，混合量子-经典模型在实现这一目标时，其可训练参数量远少于经典神经网络和随机森林等替代方案。

These results show that FL enables high-performing, privacy-preserving quantum-classical collaboration without centralizing raw data.

这些结果表明，联邦学习能够在不中心化原始数据的情况下，实现高性能、保护隐私的量子-经典协作。

***

**Paper Details:**
*   **Authors:** Carlos Cano, Daniel M. Jimenez-Gutierrez, Diego Sal, Georgios Kellaris, Joaquin del Rio, Oleksii Sliusarenko, Xabi Uribe-Etxebarria
*   **arXiv ID:** 2609.25082
*   **Subjects:** Machine Learning (cs.LG); Artificial Intelligence (cs.AI); Distributed, Parallel, and Cluster Computing (cs.DC)

**论文详情：**
*   **作者：** Carlos Cano, Daniel M. Jimenez-Gutierrez, Diego Sal, Georgios Kellaris, Joaquin del Rio, Oleksii Sliusarenko, Xabi Uribe-Etxebarria
*   **arXiv ID:** 2609.25082
*   **学科分类：** 机器学习 (cs.LG)；人工智能 (cs.AI)；分布式、并行与集群计算 (cs.DC)