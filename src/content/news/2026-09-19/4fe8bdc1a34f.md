---
title: "How to Guide Your Language Flow"
originalUrl: "https://arxiv.org/abs/2609.19356"
date: "2026-09-18T23:32:58.296Z"
---

# How to Guide Your Language Flow
# 如何引导你的语言流 (How to Guide Your Language Flow)

**Abstract:** We introduce a new method to guide flow matching models. Our approach, which we call probe guidance, uses the frozen internal states of an existing diffusion model to construct a guidance signal. This works using a similar principle as autoguidance, but eliminates the need for an additional forward pass at inference time and provides a reliable path to ensure that the weak and strong model share similar dynamics.

**摘要：** 我们介绍了一种引导流匹配模型（flow matching models）的新方法。我们将这种方法称为“探针引导”（probe guidance），它利用现有扩散模型中冻结的内部状态来构建引导信号。该方法的工作原理与自动引导（autoguidance）相似，但消除了在推理阶段进行额外前向传播的需求，并提供了一条可靠的路径，以确保弱模型和强模型共享相似的动力学特征。

We apply and benchmark this method on continuous diffusion language models, where probe guidance sets a new state-of-the-art performance on unconditional generation. When applied to a 1.7B diffusion language model, probe guidance consistently improves on multiple choice question answering benchmarks.

我们将该方法应用于连续扩散语言模型并进行了基准测试，结果显示“探针引导”在无条件生成任务上创下了新的性能记录。当应用于 1.7B 参数的扩散语言模型时，“探针引导”在多项选择问答基准测试中表现出了持续的性能提升。

Using our probes, we study the traditional autoguidance setting where the strong model is a weak checkpoint, and find that the weak model must come from a low-entropy region of training. These findings both provide a practical way to improve diffusion language models and shed light on the actual mechanism behind autoguidance, which is currently poorly understood.

通过使用我们的探针，我们研究了强模型为弱检查点（weak checkpoint）的传统自动引导设置，并发现弱模型必须来自训练的低熵区域。这些发现不仅为改进扩散语言模型提供了一种实用的方法，还揭示了自动引导背后的实际机制——目前人们对这一机制的理解还非常有限。

***

**Paper Details:**
*   **Authors:** Rohit Dilip, Tianrong Chen, Yuyang Wang, David Van Valen, Joshua Susskind, Miguel Angel Bautista
*   **arXiv ID:** 2609.19356
*   **Subject:** Machine Learning (cs.LG); Artificial Intelligence (cs.AI)
*   **Submission Date:** 16 Sep 2026

**论文详情：**
*   **作者：** Rohit Dilip, Tianrong Chen, Yuyang Wang, David Van Valen, Joshua Susskind, Miguel Angel Bautista
*   **arXiv ID：** 2609.19356
*   **学科：** 机器学习 (cs.LG)；人工智能 (cs.AI)
*   **提交日期：** 2026年9月16日