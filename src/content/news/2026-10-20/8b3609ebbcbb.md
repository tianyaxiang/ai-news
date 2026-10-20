---
title: "From Natural Language Intent to Executable Control: Hierarchical Feedback-Guided LLM Planning for Multi-component Cyber-Physical Systems"
originalUrl: "https://arxiv.org/abs/2610.22441"
date: "2026-10-19T04:00:00.000Z"
excerpt: false
---

Computer Science > Artificial Intelligence arXiv:2610.22441 (cs) [Submitted on 15 Oct 2026] Title: From Natural Language Intent to Executable Control: Hierarchical Feedback-Guided LLM Planning for Multi-component Cyber-Physical Systems Authors: Jinglin Dai, Jiawan Wang, Ruiqi Hong, Lei Bu.

计算机科学 > 人工智能 arXiv:2610.22441 (cs) [提交于 2026 年 10 月 15 日] 标题：从自然语言意图到可执行控制：面向多组件信息物理系统的分层反馈引导式大语言模型规划 作者：Jinglin Dai, Jiawan Wang, Ruiqi Hong, Lei Bu。

Abstract: Large language models (LLMs) provide a convenient interface for translating natural language commands into task plans for cyber-physical systems (CPSs). However, two gaps hinder their use for real execution: generated plans may misinterpret or omit the user's intent, and even a logically plausible plan may be infeasible under component dynamics, interactions, or safety constraints.

摘要：大语言模型（LLM）为将自然语言指令转换为信息物理系统（CPS）的任务规划提供了一个便捷的接口。然而，两个差距阻碍了它们在实际执行中的应用：生成的计划可能会误解或遗漏用户的意图，即使是逻辑上合理的计划，在组件动态、交互或安全约束下也可能是不可行的。

Existing LLM-based planning approaches often lack informative feedback on why a generated plan fails, providing little guidance for revising the plan accordingly. To address these challenges, we present a hierarchical feedback framework that uses different types of feedback information to guide LLMs in generating executable plans for CPSs.

现有的基于大语言模型的规划方法往往缺乏关于生成计划为何失败的信息反馈，无法为相应地修改计划提供指导。为了应对这些挑战，我们提出了一个分层反馈框架，利用不同类型的反馈信息来引导大语言模型为信息物理系统生成可执行的计划。

We prompt LLMs to generate both a structured task plan and corresponding signal temporal logic (STL) constraints, and design a sound algorithm that identifies definite contradictions between them and provides feedback for revising inconsistencies. At the execution level, when control synthesis fails, we extract different types of diagnostic information, such as violated constraints and conflicting component assignments, and feed them back to guide task replanning.

我们提示大语言模型同时生成结构化的任务计划和相应的信号时序逻辑（STL）约束，并设计了一种可靠的算法来识别两者之间的明确矛盾，并提供反馈以修正不一致之处。在执行层面，当控制综合失败时，我们提取不同类型的诊断信息（如违反的约束和冲突的组件分配），并将它们反馈回去以指导任务的重新规划。

Experiments on seven heterogeneous multi-component CPS scenarios have shown that our framework can generate executable plans and feasible control executions that satisfy the original natural language missions with a success rate of 87.9% with GPT-5.

在七个异构多组件信息物理系统场景上的实验表明，我们的框架能够生成可执行的计划和可行的控制执行方案，以 87.9% 的成功率（使用 GPT-5）满足原始的自然语言任务。