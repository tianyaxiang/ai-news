---
title: "Step Back to Move Forward: Reflection-Aware Preference Optimization for Visual Generation"
originalUrl: "https://arxiv.org/abs/2609.04282"
date: "2026-09-07T23:41:01.825Z"
---

# Step Back to Move Forward: Reflection-Aware Preference Optimization for Visual Generation
# 退一步，进两步：面向视觉生成的反射感知偏好优化

**Abstract:** Diffusion models have become the mainstream paradigm for modern visual generation and have substantially advanced multimedia content synthesis, especially in text-to-image and text-to-video tasks. To further align such generative models with human preferences, reinforcement learning (RL) has recently shown strong potential as a post-training strategy. 

**摘要：** 扩散模型已成为现代视觉生成的主流范式，并极大地推动了多媒体内容合成的发展，特别是在文生图（text-to-image）和文生视频（text-to-video）任务中。为了使这些生成模型进一步与人类偏好对齐，强化学习（RL）作为一种训练后策略，近期展现出了巨大的潜力。

Nevertheless, existing policy gradient-based methods often explore inefficiently, making them vulnerable to local optima that may degrade semantic faithfulness and visual realism. To address these challenges, we present Reflection-Aware GRPO (RA-GRPO), a new RL-based preference alignment framework for diffusion generative models. 

然而，现有的基于策略梯度的方法往往探索效率低下，容易陷入局部最优，从而可能降低语义忠实度和视觉真实感。为了应对这些挑战，我们提出了反射感知 GRPO（RA-GRPO），这是一种用于扩散生成模型的新型基于强化学习的偏好对齐框架。

The core idea is to improve "forward" generation by incorporating "backward" reflection during optimization. We first introduce Diffusion Reflection, which rectifies intermediate sampling trajectories by inverting the diffusion process with a weak estimator, guiding latent states toward higher-probability regions of the true data manifold. 

其核心思想是通过在优化过程中引入“向后”反射来改进“向前”生成。我们首先引入了扩散反射（Diffusion Reflection），它通过弱估计器反转扩散过程来修正中间采样轨迹，从而引导潜在状态向真实数据流形的高概率区域移动。

Furthermore, we introduce Counterfactual Path Synthesis to implicitly distill these rectified trajectories into the policy, enabling the model to internalize the benefits of search-based exploration without incurring inference-time overhead. 

此外，我们引入了反事实路径合成（Counterfactual Path Synthesis），将这些修正后的轨迹隐式地蒸馏到策略中，使模型能够在不增加推理时间开销的情况下，内化基于搜索的探索所带来的优势。

Extensive experiments on T2I and T2V models demonstrate that RA-GRPO significantly outperforms existing methods, particularly in mitigating reward hacking and improving generalization. The method remains architecture-agnostic and integrates seamlessly with standard pipelines, suggesting a promising direction for stable preference alignment.

在文生图（T2I）和文生视频（T2V）模型上的大量实验表明，RA-GRPO 显著优于现有方法，特别是在缓解奖励欺诈（reward hacking）和提高泛化能力方面表现突出。该方法与架构无关，并能与标准流程无缝集成，为实现稳定的偏好对齐提供了一个有前景的方向。