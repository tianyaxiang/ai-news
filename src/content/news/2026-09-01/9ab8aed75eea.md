---
title: "Code as Worlds: Agentic Discovery of Executable World Representations for Physical Reasoning"
originalUrl: "https://arxiv.org/abs/2608.27549"
date: "2026-09-01T01:08:01.257Z"
---

# Code as Worlds: Agentic Discovery of Executable World Representations for Physical Reasoning
# 代码即世界：用于物理推理的可执行世界表征的智能体发现

**Abstract:** Physical understanding and reasoning depend on forming compact and generalizable representations of the world. While modern vision-language models can recognize and explain diverse physical events, they often lack explicit representations of the underlying mechanisms—such as object states, physical parameters, and governing dynamics—needed for reliably reasoning how the world evolves and responds to interventions.

**摘要：** 物理理解与推理依赖于形成紧凑且具有泛化能力的世界表征。尽管现代视觉-语言模型能够识别并解释各种物理事件，但它们往往缺乏对底层机制（如物体状态、物理参数和控制动力学）的显式表征，而这些机制对于可靠地推理世界如何演变以及如何响应干预至关重要。

In this work, we introduce Code-as-World, a paradigm that represents physical worlds through executable world representations. By expressing physical composition, dynamic evolution, and visual appearance as executable code, Code-as-World provides a compact, quantitatively grounded, and controllable abstraction of the physical world.

在这项工作中，我们引入了“代码即世界”（Code-as-World）这一范式，通过可执行的世界表征来呈现物理世界。通过将物理构成、动态演变和视觉外观表达为可执行代码，“代码即世界”提供了一种紧凑、具有定量基础且可控的物理世界抽象。

To construct such representations from multimodal observations, such as natural-language descriptions or real-world videos, we develop an agentic discovery loop inspired by abductive reasoning, where an agent proposes, executes, renders, verifies, and iteratively refines executable world hypotheses.

为了从多模态观测（如自然语言描述或真实世界视频）中构建此类表征，我们开发了一种受溯因推理启发的智能体发现循环。在该循环中，智能体负责提出、执行、渲染、验证并迭代优化可执行的世界假设。

As a concrete application, we use verified executable worlds to provide scalable physical supervision for training vision-language models on quantitative physical reasoning. Experiments show that Code-as-World-VL achieves state-of-the-art performance on QuantiPhy and surpasses leading proprietary models, highlighting the potential of executable world representations as a scalable foundation for physical intelligence.

作为具体的应用，我们利用经过验证的可执行世界，为训练视觉-语言模型的定量物理推理能力提供了可扩展的物理监督。实验表明，Code-as-World-VL 在 QuantiPhy 基准测试中达到了最先进的性能，并超越了领先的专有模型，凸显了可执行世界表征作为物理智能可扩展基础的潜力。