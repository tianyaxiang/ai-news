---
title: "ValueGraph: Value-Signal Guided Graph Pre-training for Contextualized User Representation"
originalUrl: "https://arxiv.org/abs/2609.00057"
date: "2026-09-02T23:30:19.986Z"
---

# ValueGraph: Value-Signal Guided Graph Pre-training for Contextualized User Representation
# ValueGraph：用于情境化用户表示的价值信号引导图预训练

**Abstract:** Value signals are aggregated user-level moral representations that capture users' inferred value-related tendencies from their online discourse. User behavior on social media is shaped not only by what users say or whom they interact with, but also by the value signal through which they express attitudes. Existing user representation methods largely miss this value-relevant dimension.

**摘要：** 价值信号（Value signals）是聚合的用户级道德表征，旨在从用户的在线言论中捕捉其推断出的价值相关倾向。社交媒体上的用户行为不仅受其言论内容或互动对象的影响，还受到其表达态度时所蕴含的价值信号的影响。现有的用户表示方法在很大程度上忽略了这一与价值相关的维度。

We propose ValueGraph, a graph pre-training framework that uses automatically inferred moral-value signals as noisy auxiliary signals for contextualized user representation. From post-reply graphs, ValueGraph learns semantic and structural representations and further aligns users through relative value similarity with contrastive and clustering objectives.

我们提出了 ValueGraph，这是一个图预训练框架，它利用自动推断的道德价值信号作为噪声辅助信号，用于情境化用户表示。ValueGraph 通过帖子回复图学习语义和结构表示，并进一步通过对比和聚类目标，利用相对价值相似性来对齐用户。

Rather than treating inferred values as gold psychological labels, ValueGraph uses them as soft constraints for representation learning. Experiments on stance detection and twitter bot detection show consistent gains over strong text-based, graph-based, and text-only LLM baselines, highlighting value-signal guidance as a useful inductive bias for socially informed user modeling.

ValueGraph 并没有将推断出的价值视为绝对的心理学标签，而是将其作为表示学习的软约束。在立场检测和 Twitter 机器人检测任务上的实验表明，该方法在强文本基准、图基准以及纯文本大语言模型（LLM）基准之上均取得了持续的性能提升，凸显了价值信号引导作为一种社会化用户建模的有效归纳偏置的作用。