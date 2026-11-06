---
title: "Recasting Visual Language Models as EEG Foundation Models for Clinical Neurodiagnostics"
originalUrl: "https://arxiv.org/abs/2611.05538"
date: "2026-11-05T05:00:00.000Z"
excerpt: false
---

Computer Science > Machine Learning arXiv:2611.05538 (cs) [Submitted on 3 Nov 2026] Title: Recasting Visual Language Models as EEG Foundation Models for Clinical Neurodiagnostics Authors: Xin Zhou, Elena Sergeeva, Nan Bi, Wenyu Song, Lijun Yin, Hao Deng.

计算机科学 > 机器学习 arXiv:2611.05538 (cs) [提交于 2026 年 11 月 3 日] 标题：将视觉语言模型重塑为临床神经诊断的脑电图基础模型 作者：Xin Zhou, Elena Sergeeva, Nan Bi, Wenyu Song, Lijun Yin, Hao Deng。

Abstract: Historically automated electroencephalography (EEG) systems was done using task-specific supervised models trained on purposely annotated data. A more recent modeling paradigm relies on creating a unified representation, or a 'foundation model', for multiple modality-specific tasks through large-scale domain-specific pretraining on the unannotated EEG signal.

摘要：从历史上看，自动化脑电图 (EEG) 系统是使用在专门标注的数据上训练的任务特定监督模型来完成的。一种较新的建模范式依赖于通过对未标注的 EEG 信号进行大规模领域特定预训练，为多种模态特定任务创建统一的表示，即“基础模型”。

The quality of this unified representation directly depends on the availability of the modality-specific datasets. At the same time, generalist Vision Language Models (VLMs) exhibit broad few-shot learning capacities as well as good fine-tuning adaptability to different visual and language tasks.

这种统一表示的质量直接取决于模态特定数据集的可用性。与此同时，通用视觉语言模型 (VLM) 展示了广泛的小样本学习能力，以及对不同视觉和语言任务良好的微调适应性。

Can VLMs learn how to read and interpret EEG visually, emulating to a degree the way human clinicians inspect the EEG patterns? In this work we make a case that they can: we show that generalist VLMs without large-scale EEG pretraining perform competitively across a collection of clinical neuro-diagnostic tasks, can adapt to different tasks in a few-shot learning setting better than specialist foundation models, and exhibit better performance with model scaling when modality-specific models fail to exhibit.

VLM 能否学会如何以视觉方式阅读和解读脑电图，并在一定程度上模拟人类临床医生检查脑电图模式的方式？在这项工作中，我们证明了它们可以做到：我们展示了无需大规模 EEG 预训练的通用 VLM 在一系列临床神经诊断任务中表现出竞争力，在小样本学习设置中比专业基础模型能更好地适应不同任务，并且在模态特定模型无法表现出性能提升时，通过模型扩展展现出更好的性能。