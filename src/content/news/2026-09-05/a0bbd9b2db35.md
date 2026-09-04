---
title: "Beyond Small Patches: Black-Box Detection and Purification of Diverse Backdoor Triggers"
originalUrl: "https://arxiv.org/abs/2609.03139"
date: "2026-09-04T23:15:02.234Z"
---

# Beyond Small Patches: Black-Box Detection and Purification of Diverse Backdoor Triggers
# 超越小补丁：针对多样化后门触发器的黑盒检测与净化

**Abstract:** Deep neural networks (DNNs) are increasingly deployed in real-world vision systems, yet their predictions can be covertly manipulated by backdoor attacks, in which malicious triggers cause targeted misclassification while preserving high clean accuracy. Existing defenses often rely on model internals, training data, or clean validation samples, making them difficult to deploy when only black-box access to a trained model is available.

**摘要：** 深度神经网络（DNNs）正日益广泛地应用于现实世界的视觉系统中，但其预测结果可能被后门攻击隐蔽地操纵。在这些攻击中，恶意触发器会导致目标误分类，同时保持较高的正常样本准确率。现有的防御手段通常依赖于模型内部信息、训练数据或干净的验证样本，这使得在仅能对训练好的模型进行黑盒访问的情况下，这些防御手段难以部署。

We propose TRIM (Trigger Removal by Identifying Manipulated Regions), a deployment-oriented black-box defense that detects and selectively removes backdoor triggers at inference time without requiring model internals, training data, or clean samples. The key insight behind TRIM is to identify image regions that are responsible for anomalous model behavior and purify only those regions while preserving benign content.

我们提出了 TRIM（通过识别被操纵区域来移除触发器），这是一种面向部署的黑盒防御方案。它能够在推理阶段检测并选择性地移除后门触发器，且无需模型内部信息、训练数据或干净样本。TRIM 的核心洞察在于识别导致模型异常行为的图像区域，并仅对这些区域进行净化，同时保留良性内容。

TRIM innovates via three key components: (i) region-based segmentation with deep feature representations, (ii) adaptive trigger discovery through inpainting and diffusion-based reconstruction to isolate regions responsible for misclassification---without assumptions about trigger type, shape, or location, and (iii) selective region purification that cleans poisoned regions while retaining benign content.

TRIM 通过三个关键组件进行创新：(i) 基于深度特征表示的区域分割；(ii) 通过图像修复（inpainting）和基于扩散模型的重构进行自适应触发器发现，从而隔离导致误分类的区域——且无需对触发器的类型、形状或位置做出任何假设；(iii) 选择性区域净化，在保留良性内容的同时清理被投毒的区域。

To support practical deployment, TRIM further caches feature embeddings of previously identified triggers, enabling efficient recognition and avoiding redundant detection and purification. Extensive experiments across diverse datasets and backdoor types, including blended, sparse, varying-size, and multiple triggers, show that TRIM consistently outperforms existing black-box defenses, reducing attack success rates (ASR) to as low as 1.16% while preserving clean accuracy of up to 87.87%. These results demonstrate that effective backdoor mitigation is possible at inference time even when the defender has no access to any auxiliary data.

为了支持实际部署，TRIM 还会缓存先前识别出的触发器的特征嵌入，从而实现高效识别，并避免冗余的检测与净化过程。在多种数据集和后门类型（包括混合型、稀疏型、不同尺寸以及多重触发器）上的广泛实验表明，TRIM 的表现始终优于现有的黑盒防御方案，能将攻击成功率（ASR）降低至 1.16%，同时保持高达 87.87% 的正常样本准确率。这些结果证明，即使防御者无法获取任何辅助数据，在推理阶段实现有效的后门缓解也是可行的。