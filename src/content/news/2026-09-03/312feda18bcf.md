---
title: "The Emergent Symbolic Structure of Artificial Neural Networks"
originalUrl: "https://arxiv.org/abs/2608.29530"
date: "2026-09-02T23:23:12.594Z"
---

# The Emergent Symbolic Structure of Artificial Neural Networks
# 人工神经网络中涌现的符号结构

**Abstract:** Modern systems in artificial intelligence (AI) somehow excel in domains for which they seem poorly suited. Intelligence has traditionally been modeled as operating over structured combinations of symbols, such as logical formulas. However, the strongest modern AI systems are based on neural networks, which instead represent information in continuous vectors. Vectors seem inadequate for capturing the structure of language, logic, and other cognitive domains, yet neural networks achieve impressive performance in these areas. How do they do it?

**摘要：** 现代人工智能（AI）系统在某些看似并不擅长的领域中表现出色。传统上，智能被建模为对符号结构化组合（如逻辑公式）的操作。然而，目前最强大的现代 AI 系统基于神经网络，它们通过连续向量来表示信息。向量似乎不足以捕捉语言、逻辑和其他认知领域的结构，但神经网络在这些领域却取得了令人瞩目的表现。它们是如何做到的？

In this work, we propose a potential answer: Despite appearances, perhaps the internal representations of neural networks implicitly realize symbolic structure. In support of this hypothesis, we show that the vector representations of a variety of neural networks can be closely approximated with symbolic structures: we can replace the network's entire representation-generating process with a closed-form equation instantiating a symbolic structure, and the network's behavior remains largely unchanged.

在这项工作中，我们提出了一个可能的答案：尽管表面上看起来并非如此，但神经网络的内部表示可能隐含地实现了符号结构。为了支持这一假设，我们证明了各种神经网络的向量表示可以被符号结构紧密近似：我们可以用一个体现符号结构的闭式方程来替换网络整个表示生成过程，而网络的行为几乎保持不变。

This finding holds for both small-scale neural networks trained to manipulate lists as well as large language models (LLMs) operating in four domains that are central in symbolic traditions: arithmetic, logic, computer code, and language. Further, our symbolic approximation allows us to modify an LLM's behavior in targeted ways via precise interventions on its internal representations, showing that the LLM's behavior is reliant on the symbolic structures we have identified. This work provides a potential way to reconcile longstanding symbolic conceptions of intelligence with the vector-based nature of现代 AI.

这一发现不仅适用于训练用于处理列表的小型神经网络，也适用于在符号传统中四个核心领域（算术、逻辑、计算机代码和语言）运行的大型语言模型（LLM）。此外，我们的符号近似方法允许我们通过对内部表示进行精确干预，以有针对性的方式修改 LLM 的行为，这表明 LLM 的行为确实依赖于我们所识别出的符号结构。这项工作为调和长期存在的符号智能概念与现代 AI 基于向量的本质提供了一种潜在途径。