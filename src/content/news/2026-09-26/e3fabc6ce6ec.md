---
title: "GeoNLI - A Natural Language Interpreter for Satellite Imagery"
originalUrl: "https://arxiv.org/abs/2609.28741"
date: "2026-09-26T00:09:48.626Z"
---

# GeoNLI - A Natural Language Interpreter for Satellite Imagery
# GeoNLI - 卫星影像的自然语言解释器

**Abstract:** Multi-modal multitasking models have shown strong performance on remote sensing datasets. However, because these models are trained on heterogeneous data and vary across tasks, designing a unified model that performs well in captioning, visual question answering (VQA), and visual grounding remains challenging.

**摘要：** 多模态多任务模型在遥感数据集上表现出了强大的性能。然而，由于这些模型是在异构数据上进行训练的，且在不同任务间存在差异，因此设计一个在图像描述（Captioning）、视觉问答（VQA）和视觉定位（Visual Grounding）方面均表现良好的统一模型仍然具有挑战性。

In this work, we evaluate several models on the VRS Bench and NWPU-VHR-10 datasets. The EarthMind model demonstrates strong results in both captioning and VQA. For grounding, we propose multiple pipelines - RemoteSAM-SAM-v1, RemoteSAM-SAM-v2, and DiffuSAM - and ultimately adopt a majority-voting ensemble across EarthMind, RemoteSAM, SAM3, Falcon, RemoteSAM-SAM3-v1, RemoteSAM-SAM3-v2, and DiffuSAM predictions.

在这项工作中，我们在 VRS Bench 和 NWPU-VHR-10 数据集上评估了多个模型。EarthMind 模型在图像描述和视觉问答方面均展现出优异的结果。针对视觉定位，我们提出了多种流水线——RemoteSAM-SAM-v1、RemoteSAM-SAM-v2 和 DiffuSAM，并最终采用了一种基于 EarthMind、RemoteSAM、SAM3、Falcon、RemoteSAM-SAM3-v1、RemoteSAM-SAM3-v2 和 DiffuSAM 预测结果的多数投票集成方法。

Our unified, modular pipeline integrates advanced SAM variants with multimodal LLMs to jointly perform captioning, VQA, and grounding. It achieves 82% accuracy on captioning and 83.32% on VQA, with 90.94%, 52.04%, and 92.06% for binary, numeric, and semantic question types respectively. For grounding, it attains 64.94% accuracy.

我们统一的模块化流水线将先进的 SAM 变体与多模态大语言模型（LLMs）相结合，共同执行图像描述、视觉问答和视觉定位任务。该模型在图像描述任务上达到了 82% 的准确率，在视觉问答任务上达到了 83.32% 的准确率，其中针对二元、数值和语义类问题的准确率分别为 90.94%、52.04% 和 92.06%。在视觉定位任务上，其准确率为 64.94%。

By combining diverse VLMs with our custom RemoteSAM-SAM3 models through ensemble majority voting, the system delivers more accurate and consistent remote-sensing understanding than task-specific approaches.

通过将多种视觉语言模型（VLMs）与我们定制的 RemoteSAM-SAM3 模型通过多数投票集成相结合，该系统提供了比特定任务方法更准确、更一致的遥感理解能力。