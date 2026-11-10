---
title: "Turkish Multimodal Video Fact-Checking: A New Dataset and a Comparison of Zero-Shot Agentic and Fine-Tuned Systems"
originalUrl: "https://arxiv.org/abs/2611.08651"
date: "2026-11-09T05:00:00.000Z"
excerpt: false
---

Computer Science > Computer Vision and Pattern Recognition arXiv:2611.08651 (cs) [Submitted on 5 Nov 2026] Title: Turkish Multimodal Video Fact-Checking: A New Dataset and a Comparison of Zero-Shot Agentic and Fine-Tuned Systems Authors: Azra Açıl.

计算机科学 > 计算机视觉与模式识别 arXiv:2611.08651 (cs) [提交于 2026 年 11 月 5 日] 标题：土耳其语多模态视频事实核查：一个新数据集及零样本代理系统与微调系统的比较 作者：Azra Açıl。

Abstract: Video-based misinformation spreads rapidly on social media, but almost all existing fact-checking systems focus exclusively on English text. Tools for low-resource languages such as Turkish are severely limited. In this work, we present TeViD (Turkish Video Fact-checking Dataset), to the best of our knowledge the first multimodal video fact-checking dataset for Turkish.

摘要：基于视频的虚假信息在社交媒体上迅速传播，但几乎所有现有的事实核查系统都仅关注英语文本。针对土耳其语等低资源语言的工具极其有限。在这项工作中，我们提出了 TeViD（土耳其语视频事实核查数据集），据我们所知，这是第一个针对土耳其语的多模态视频事实核查数据集。

We compiled the dataset from articles published by this http URL, an IFCN-certified organisation, and enriched it with translated Snopes articles and synthetic examples to reduce class imbalance. Building on TeViD, we develop two verification pipelines that share the same open-source base model.

我们从 IFCN 认证机构发布的文章中汇编了该数据集，并辅以翻译后的 Snopes 文章和合成示例，以减少类别不平衡。基于 TeViD，我们开发了两个共享相同开源基础模型的验证流水线。

First, in 3MFact-TR (Pipeline 1), we adapt the multi-role 3MFact framework to Turkish with the Qwen2.5-7B large language model and the Qwen2-VL-7B vision-language model, and add three modules of our own: a semantic inconsistency checker, a 5W1H question manager, and a bilingual evidence retriever that excludes fact-checking sites to prevent leakage.

首先，在 3MFact-TR（流水线 1）中，我们利用 Qwen2.5-7B 大语言模型和 Qwen2-VL-7B 视觉语言模型，将多角色 3MFact 框架适配到土耳其语，并添加了我们自己的三个模块：语义不一致检查器、5W1H 问题管理器，以及一个排除事实核查网站以防止泄露的双语证据检索器。

Second, as our Fine-Tuned Model (Pipeline 2), we fine-tune a single Qwen2.5-7B with Low-Rank Adaptation (LoRA) to produce closed-book verdicts from the claim and the video's textual description. We report accuracy, macro F1, True class F1, and True class recall for both systems, together with ablation studies.

其次，作为我们的微调模型（流水线 2），我们使用低秩自适应（LoRA）对单个 Qwen2.5-7B 进行微调，以根据声明和视频的文本描述生成封闭式结论。我们报告了两个系统的准确率、宏观 F1 值、真实类 F1 值和真实类召回率，并进行了消融研究。