---
title: "The Shape of Events: Edge-Based Inductive Biases via Cross-Domain Distillation"
originalUrl: "https://arxiv.org/abs/2609.30478"
date: "2026-09-29T01:14:06.870Z"
---

# The Shape of Events: Edge-Based Inductive Biases via Cross-Domain Distillation
# 事件的形状：通过跨域蒸馏实现基于边缘的归纳偏置

**Abstract:**
Convolutional neural networks trained on ImageNet are known to exhibit a strong preference for local high-frequency texture, an inductive bias that translates into fragile robustness against distribution shifts in real-world environments.
在 ImageNet 上训练的卷积神经网络（CNN）已知对局部高频纹理表现出强烈的偏好，这种归纳偏置导致模型在面对现实环境中的分布偏移时，鲁棒性较为脆弱。

Event cameras, in contrast, record only changes in scene brightness and are therefore well suited to capturing contour information; however, due to the absence of diagnostic benchmarks in the event domain, the inductive bias that event-camera data instills in vision models has remained underexplored.
相比之下，事件相机仅记录场景亮度的变化，因此非常适合捕捉轮廓信息；然而，由于事件领域缺乏诊断基准，事件相机数据对视觉模型所灌输的归纳偏置仍未得到充分探索。

In this work, we use knowledge distillation from the event domain to the RGB domain so as to exploit the rich evaluation toolkit available in the RGB domain and systematically dissect this inductive bias.
在这项工作中，我们利用从事件域到 RGB 域的知识蒸馏，旨在利用 RGB 域中丰富的评估工具包，系统地剖析这种归纳偏置。

Our experiments show that distillation from the event domain induces, in the RGB domain, color invariance, shape bias, and robustness to high-frequency noise.
我们的实验表明，从事件域进行的蒸馏在 RGB 域中诱导出了颜色不变性、形状偏好以及对高频噪声的鲁棒性。

We identify the underlying mechanism as the model suppressing its dependence on high-frequency texture while acquiring a stronger dependence on edge-based object shape.
我们确定其潜在机制是：模型抑制了对高频纹理的依赖，同时获得了对基于边缘的物体形状更强的依赖。

This hypothesis is supported by changes in how color and spatial information are processed at the early layers, together with a spectral trade-off in which robustness to the absence of high-frequency components coexists with vulnerability to contamination of the relied-upon frequency bands and to disruption of geometric structure.
这一假设得到了早期层处理颜色和空间信息方式变化的支持，同时也得到了频谱权衡的支持——即对高频成分缺失的鲁棒性，与对所依赖频带的污染及几何结构破坏的脆弱性并存。

We further show that this inductive bias differs from existing robustification methods and that it functions as a useful prior for diverse downstream tasks in which shape and contour information contribute alongside other cues.
我们进一步证明，这种归纳偏置不同于现有的鲁棒化方法，并且它作为一种有用的先验，适用于各种形状和轮廓信息与其他线索共同发挥作用的下游任务。

The code is available at this https URL.
代码可在该链接获取。