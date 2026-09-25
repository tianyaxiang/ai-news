---
title: "Same evidence, different judgments: Evidence noncommutative in vision/speech-text conflicts"
originalUrl: "https://arxiv.org/abs/2609.26986"
date: "2026-09-25T00:07:46.325Z"
---

# Same evidence, different judgments: Evidence noncommutative in vision/speech-text conflicts
# 相同的证据，不同的判断：视觉/语音-文本冲突中的证据非交换性

**Abstract:** For multimodal large language models, when images or speech conflict with accompanying text, measured text reliance can entangle modality preference with evidence position. Earlier studies of text bias often used a fixed evidence order or moved task instructions with the evidence, leaving the contribution of order unclear. 

**摘要：** 对于多模态大语言模型而言，当图像或语音与随附文本发生冲突时，所测得的文本依赖性可能会将模态偏好与证据位置混淆。早期的文本偏见研究通常使用固定的证据顺序，或将任务指令与证据一同移动，导致证据顺序对结果的影响尚不明确。

In this paper, we use a paired comparison that keeps the instructions and evidence content fixed and swaps only the positions of the two sources to quantify this potential influence. Across vision and speech models, placing an image or recording after conflicting text consistently shifts answers toward its content. 

在本文中，我们采用了一种配对比较方法，在保持指令和证据内容不变的情况下，仅交换两种来源的位置，以量化这种潜在的影响。在视觉和语音模型中，将图像或录音置于冲突文本之后，会一致地使模型的回答向该感知内容偏移。

We also revisit previous studies and analyze why their experimental settings can lead to misleading conclusions. These findings reveal cross-modal evidence noncommutativity: the same evidence can lead to different judgments when its order changes, and placing perceptual evidence later can increase the model's reliance on its content.

我们还重新审视了先前的研究，并分析了为何其实验设置可能导致误导性结论。这些发现揭示了跨模态证据的非交换性：当证据顺序改变时，相同的证据可能导致不同的判断；且将感知证据置于后方会增加模型对其内容的依赖。