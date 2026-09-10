---
title: "Capsule Lens: Locating and Tracking Concept Geometry in Model Representations"
originalUrl: "https://arxiv.org/abs/2609.05575"
date: "2026-09-10T23:25:49.824Z"
---

# Capsule Lens: Locating and Tracking Concept Geometry in Model Representations
# Capsule Lens：在模型表示中定位与追踪概念几何结构

**Abstract:** Understanding how concepts are encoded in the internal representations of machine learning models is a central problem in mechanistic interpretability, essential both for the science of deep learning and for the trustworthy deployment of increasingly capable models.
**摘要：** 理解概念如何编码在机器学习模型的内部表示中，是机械可解释性领域的一个核心问题，这对于深度学习科学以及部署日益强大的模型至关重要。

Existing approaches to interpret model representations mainly map representations onto more interpretable spaces and do not directly characterize how concepts occupy representation space; various hypotheses have been proposed, but often lack of rigorous validation and largely focus on static representations.
现有的模型表示解释方法主要将表示映射到更具可解释性的空间，而没有直接刻画概念如何占据表示空间；尽管已经提出了各种假设，但往往缺乏严格的验证，且大多集中在静态表示上。

In this work, we introduce Capsule Lens, a framework that matches the region a concept occupies with a simple, trackable geometric form, a capsule, defined by several interpretable parameters, fitted in closed form to each concept's geometry and validated on held-out samples.
在这项工作中，我们引入了 Capsule Lens，这是一个将概念所占据的区域与一种简单、可追踪的几何形式（即“胶囊”）相匹配的框架。该胶囊由若干可解释的参数定义，通过闭式解拟合到每个概念的几何结构中，并在留出样本（held-out samples）上进行了验证。

We apply Capsule Lens in two major settings: static and dynamic representations. On static representations, we demonstrate how to locate concept geometry across various models, and how the span and norm curves uncover important geometric characteristics.
我们将 Capsule Lens 应用于两个主要场景：静态表示和动态表示。在静态表示方面，我们展示了如何跨不同模型定位概念几何结构，以及跨度（span）和范数（norm）曲线如何揭示重要的几何特征。

On dynamic representations, we present three case studies tracking representation drifts induced by distinct training settings, CLIP pretraining, RL post-training on visual question answering, and RL post-training on mathematical reasoning.
在动态表示方面，我们提出了三个案例研究，追踪由不同训练设置引起的表示漂移，包括 CLIP 预训练、视觉问答（VQA）的强化学习（RL）后训练，以及数学推理的强化学习后训练。

These analyses reveal qualitatively different geometric dynamics, ranging from broad network-wide restructuring in CLIP pretraining to localized and concept-specific changes in RL post-training.
这些分析揭示了性质迥异的几何动态，从 CLIP 预训练中广泛的网络重构，到强化学习后训练中局部且针对特定概念的变化。

Our results include findings aligned with existing literature as well as novel observations. We believe Capsule Lens stands as a promising tool for locating, analyzing, and tracking concept geometry in both static and dynamic representations.
我们的研究结果既包含了与现有文献一致的发现，也包含了一些新的观察结果。我们相信，Capsule Lens 是一个极具前景的工具，可用于定位、分析和追踪静态及动态表示中的概念几何结构。