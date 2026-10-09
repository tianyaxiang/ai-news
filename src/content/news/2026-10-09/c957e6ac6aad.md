---
title: "RACER: Reflective Agent Coupling Query Interpretation and Tool-Based Retrieval for Frame Selection in Long Video Understanding"
originalUrl: "https://arxiv.org/abs/2610.08954"
date: "2026-10-08T04:00:00.000Z"
excerpt: false
---

Video large language models (Vid-LLMs) excel at diverse video-language tasks by reasoning over selected frames. However, frame selection for long videos remains challenging, as it requires retrieving relevant frames distributed across segments from a large candidate pool given complex queries.

视频大语言模型（Vid-LLMs）通过对选定帧进行推理，在各种视频语言任务中表现出色。然而，长视频的帧选择仍然具有挑战性，因为它需要在面对复杂查询时，从庞大的候选池中检索分布在不同片段中的相关帧。

This paper investigates dominant approaches to long-video frame selection from a task-decomposition perspective, identifying two key challenges: the Query Comprehension Gap in similarity-based methods and the Interpretation--Selection Gap in judgment-based methods.

本文从任务分解的角度研究了长视频帧选择的主流方法，并确定了两个关键挑战：基于相似度方法中的“查询理解差距”，以及基于判断方法中的“解释-选择差距”。

To address them, we propose RACER, a training-free reflective agentic framework that decomposes long-video frame selection into query interpretation driven by a lightweight Vid-LLM and evidence localization supported by an embedding model serving as a retrieval tool.

为了解决这些问题，我们提出了 RACER，这是一个无需训练的反射式代理框架。它将长视频帧选择分解为两个部分：由轻量级 Vid-LLM 驱动的查询解释，以及由作为检索工具的嵌入模型支持的证据定位。

Specifically, the Vid-LLM is responsible solely for reformulating the complex query into sub-queries that make implicit information requirements explicit, mitigating the Query Comprehension Gap. Meanwhile, the retrieval tool leverages these sub-queries to localize relevant evidence, relieving the Vid-LLM of direct frame selection and thus addressing the Interpretation--Selection Gap.

具体而言，Vid-LLM 仅负责将复杂查询重新表述为子查询，使隐含的信息需求变得明确，从而缓解了“查询理解差距”。同时，检索工具利用这些子查询来定位相关证据，减轻了 Vid-LLM 直接进行帧选择的负担，从而解决了“解释-选择差距”。

Finally, the retrieved frames are fed back to the Vid-LLM for sub-query refinement, forming a reflection loop that iteratively improves query interpretation and frame selection. Experiments across multiple benchmarks show that RACER consistently improves long video understanding.

最后，检索到的帧被反馈给 Vid-LLM 以进行子查询优化，形成了一个反射循环，从而迭代地改进查询解释和帧选择。在多个基准测试上的实验表明，RACER 持续提升了长视频理解能力。