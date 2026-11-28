---
title: "General-Purpose Decision Models for AI Configuration Tuning"
originalUrl: "https://arxiv.org/abs/2611.33190"
date: "2026-11-27T05:00:00.000Z"
excerpt: false
---

Computer Science > Artificial Intelligence arXiv:2611.33190 (cs) [Submitted on 15 Nov 2026] Title: General-Purpose Decision Models for AI Configuration Tuning Authors: Jingzhi Gong, Jie M. Zhang.

计算机科学 > 人工智能 arXiv:2611.33190 (cs) [提交于 2026 年 11 月 15 日] 标题：用于人工智能配置调优的通用决策模型 作者：Jingzhi Gong, Jie M. Zhang。

Abstract: AI configuration tuning searches for settings that improve the performance of AI systems under a limited budget. Existing tuners use different sampling and search policies, making the choice of decision strategy central to both tuning quality and cost.

摘要：人工智能配置调优旨在有限的预算下搜索能够提升人工智能系统性能的设置。现有的调优器使用不同的采样和搜索策略，使得决策策略的选择成为决定调优质量和成本的核心因素。

We investigate whether general-purpose decision models can guide tuning, using Jev as a deployed representative that returns structured choices and numeric scores across diverse tasks. To assess where it helps, we compare its use as an optimizer, performance predictor, and region guider against conventional methods and a large language model (LLM) on eight AI tuning tasks.

我们研究了通用决策模型是否能够指导调优，并使用 Jev 作为已部署的代表模型，该模型可在不同任务中返回结构化选择和数值评分。为了评估其辅助作用，我们在八项人工智能调优任务中，将其作为优化器、性能预测器和区域引导器，与传统方法及大语言模型（LLM）进行了对比。

Conventional optimizers attain rank 1 in six of eight comparisons. Similarly, established predictors outperform Jev in seven. Through region guidance, however, it finds configurations with lower perplexity than those selected by the native tuner, offering a quality gain when additional decision time and API fees are acceptable.

在八项对比中，传统优化器在六项中排名第一。同样，成熟的预测器在七项对比中表现优于 Jev。然而，通过区域引导，它能够找到比原生调优器所选配置困惑度更低的配置，在能够接受额外决策时间和 API 费用的情况下，提供了质量上的提升。

These findings yield actionable recommendations on selecting the decision role, retaining conventional predictors, and balancing tuning quality against cost.

这些发现为选择决策角色、保留传统预测器以及平衡调优质量与成本提供了可操作的建议。