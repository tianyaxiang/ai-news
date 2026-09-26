---
title: "CARE: Condition-Aware Representation Regularization for Diffusion Models"
originalUrl: "https://arxiv.org/abs/2609.28561"
date: "2026-09-26T00:09:12.314Z"
---

# CARE: Condition-Aware Representation Regularization for Diffusion Models
# CARE：扩散模型的条件感知表征正则化

**Abstract:** Recent advances in diffusion models highlight the importance of representation regularization for improving sample quality and training efficiency. However, commonly used regularization methods often overlook the built-in conditions (such as labels or texts) which directly determine the generation target.

**摘要：** 扩散模型领域的最新进展凸显了表征正则化对于提升样本质量和训练效率的重要性。然而，常用的正则化方法往往忽略了直接决定生成目标的内置条件（如标签或文本）。

In this work, we demonstrate how conditioning signals affect the feature distribution and introduce the CARE (Condition-Aware REpresentation regularization). CARE is a lightweight plug-and-play regularization framework that dynamically modulates feature distribution based on condition similarity.

在这项工作中，我们展示了条件信号如何影响特征分布，并引入了 CARE（条件感知表征正则化）。CARE 是一个轻量级的即插即用正则化框架，它能够根据条件相似度动态调节特征分布。

CARE leverages built-in conditioning signals to judiciously guide the representation space, promoting tighter feature clusters for similar conditions without relying on explicit alignment losses or external supervision.

CARE 利用内置的条件信号来明智地引导表征空间，在不依赖显式对齐损失或外部监督的情况下，促进相似条件下的特征聚类更加紧凑。

Empirically, CARE consistently improves both visual fidelity and convergence stability across both class-to-image and text-to-image tasks. On ImageNet, CARE achieves a 19.08% reduction in FID in 400k training steps, leading to a 3.5× speed-up.

实验证明，CARE 在类到图像（class-to-image）和文本到图像（text-to-image）任务中，均能持续提升视觉保真度和收敛稳定性。在 ImageNet 上，CARE 在 40 万次训练步数内实现了 FID 19.08% 的降低，从而带来了 3.5 倍的加速。

When applied to text-to-image generation, CARE lowers FID by 16.61% in 200k iterations and improves semantic alignment between generated samples and text prompts. Moreover, CARE can be seamlessly integrated with existing regularization methods, yielding additional performance gains.

当应用于文本到图像生成时，CARE 在 20 万次迭代中将 FID 降低了 16.61%，并改善了生成样本与文本提示之间的语义对齐。此外，CARE 可以与现有的正则化方法无缝集成，从而获得额外的性能提升。