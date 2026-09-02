---
title: "CoLT-Drive: Counterfactual Long-Tail Benchmarking and Knowledge-Preserving Adaptation for Driving Affordance Prediction"
originalUrl: "https://arxiv.org/abs/2609.00242"
date: "2026-09-02T23:36:00.032Z"
---

# CoLT-Drive: Counterfactual Long-Tail Benchmarking and Knowledge-Preserving Adaptation for Driving Affordance Prediction

**CoLT-Drive：用于驾驶可供性预测的反事实长尾基准测试与知识保留适配**

Long-tail autonomous driving failures are often framed as rare-object recognition errors. We argue that this view is incomplete: the decision-critical question is not only whether a model recognizes an unusual object, but whether it infers how that object changes the ego vehicle's feasible high-level actions.

自动驾驶中的长尾失效问题通常被归结为罕见物体识别错误。我们认为这种观点是不完整的：决策的关键问题不仅在于模型是否识别出了异常物体，还在于它是否能推断出该物体如何改变了自动驾驶车辆（ego vehicle）可行的宏观操作。

We formalize this problem as decision-level driving affordance prediction, where a model maps a front-view image, ego-motion history, and navigation command to a structured longitudinal--lateral meta-action. To evaluate this capability, we introduce CoLT-Drive, a 3,536-sample counterfactual long-tail benchmark that inserts rare objects into otherwise fixed driving scenes and measures whether models predict acceptable action pairs.

我们将此问题形式化为决策层面的驾驶可供性预测，即模型将前视图像、自身运动历史和导航指令映射为结构化的纵向-横向元操作（meta-action）。为了评估这一能力，我们引入了 CoLT-Drive，这是一个包含 3,536 个样本的反事实长尾基准测试。它通过在固定的驾驶场景中插入罕见物体，来衡量模型是否能预测出可接受的操作组合。

To improve deployable small VLMs, we propose KPA, a knowledge-preserving adaptation framework that combines structured perception-to-decision prompting, SLERP-based expert merging, and RegMoE, a regime-aware LoRA mixture-of-experts module. KPA preserves the pretrained model's open-world knowledge while allocating lightweight adaptation capacity to different driving decision regimes.

为了改进可部署的小型视觉语言模型（VLM），我们提出了 KPA，这是一种知识保留适配框架。它结合了结构化的“感知到决策”提示（prompting）、基于 SLERP 的专家合并技术，以及 RegMoE（一种具备场景感知能力的 LoRA 专家混合模块）。KPA 在保留预训练模型开放世界知识的同时，为不同的驾驶决策场景分配了轻量级的适配能力。

Experiments on an in-domain driving split and CoLT-Drive show that KPA achieves 60.8% pair accuracy on CoLT-Drive, outperforming the pretrained Qwen3-VL-2B baseline (50.3%) and LoRA SFT (32.4%) while maintaining competitive in-domain accuracy. Our benchmark and code are available at this https URL and this https URL.

在领域内驾驶数据集和 CoLT-Drive 上的实验表明，KPA 在 CoLT-Drive 上达到了 60.8% 的组合准确率，优于预训练的 Qwen3-VL-2B 基线（50.3%）和 LoRA SFT（32.4%），同时保持了具有竞争力的领域内准确率。我们的基准测试和代码可在相关链接中获取。