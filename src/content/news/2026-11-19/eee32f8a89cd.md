---
title: "Limite 1B - Violetto: Technical Report"
originalUrl: "https://arxiv.org/abs/2611.21646"
date: "2026-11-18T05:00:00.000Z"
excerpt: false
---

Computer Science > Computation and Language arXiv:2611.21646 (cs) [Submitted on 14 Oct 2026] Title: Limite 1B - Violetto: Technical Report Authors: Mario Prignano, Gabriele Cirillo, Alessio Morosini, Luca Cerovaz, Alessandro Bartolocci, Emanuele Rodolà, Giulio Starace, Francesco Pappone.

计算机科学 > 计算与语言 arXiv:2611.21646 (cs) [提交于 2026 年 10 月 14 日] 标题：Limite 1B - Violetto：技术报告 作者：Mario Prignano, Gabriele Cirillo, Alessio Morosini, Luca Cerovaz, Alessandro Bartolocci, Emanuele Rodolà, Giulio Starace, Francesco Pappone。

Abstract: We present Limite 1B - Violetto, a one-billion-parameter model designed for high-throughput mathematical reasoning. Limite is trained from scratch on 237 billion tokens from a carefully curated, mathematics-centric corpus and supports context lengths of up to 131k tokens.

摘要：我们介绍了 Limite 1B - Violetto，这是一个专为高吞吐量数学推理而设计的十亿参数模型。Limite 在 2370 亿个精心策划的以数学为中心的语料库标记上从零开始训练，并支持长达 131k 个标记的上下文长度。

Its architecture and training recipe were developed together to maximize reasoning capability while keeping training and inference costs low. Post-training combines knowledge distillation, targeted supervised fine-tuning, and RLVR on a curated curriculum.

其架构和训练方案是共同开发的，旨在最大限度地提高推理能力，同时保持较低的训练和推理成本。训练后阶段结合了知识蒸馏、有针对性的监督微调以及基于精选课程的 RLVR。

Limite achieves 94.01% on AIME 2026 and 74.25% on BeyondAIME, placing it among models many times its size on our evaluation suite. The model is deliberately only lightly instruction-tuned: it is intended primarily as a single-turn mathematical solver and as a fast, parallel component of larger systems, rather than as a general-purpose assistant.

Limite 在 AIME 2026 上达到了 94.01%，在 BeyondAIME 上达到了 74.25%，在我们的评估套件中，其表现优于许多规模大得多的模型。该模型特意仅进行了轻量级的指令微调：它主要被定位为单轮数学求解器，以及大型系统中快速、并行的组件，而非通用助手。

We release the model, its base and value checkpoints, and an optimized serving implementation under the Apache 2.0 license.

我们在 Apache 2.0 许可下发布了该模型、其基础和价值检查点，以及一个优化的服务实现。