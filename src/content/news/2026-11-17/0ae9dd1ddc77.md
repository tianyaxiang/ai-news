---
title: "Unfinished-Bench: Measuring Rule Violations by Persistent Agents in Realistic Work Environments"
originalUrl: "https://arxiv.org/abs/2611.17460"
date: "2026-11-16T05:00:00.000Z"
excerpt: false
---

Computer Science > Machine Learning arXiv:2611.17460 (cs) [Submitted on 12 Nov 2026] Title: Unfinished-Bench: Measuring Rule Violations by Persistent Agents in Realistic Work Environments Authors: Seunghyun Lee, Jaehui Hwang, Dongyoon Han, Sangdoo Yun.

计算机科学 > 机器学习 arXiv:2611.17460 (cs) [提交于 2026 年 11 月 12 日] 标题：Unfinished-Bench：衡量现实工作环境中持续性智能体的规则违规行为 作者：Seunghyun Lee, Jaehui Hwang, Dongyoon Han, Sangdoo Yun。

Abstract: AI agents are increasingly equipped with persistence toward task completion to run delegated work autonomously for long periods, under many unstated constraints from internal documents and other people's authority. When completion requires violating a rule, the agent must decide alone, yet benchmarks of instruction-rule conflicts state the rule in the prompt or keep it hidden and do not evaluate persistence.

摘要：人工智能智能体越来越多地被赋予完成任务的持续性，以便在内部文档和其他人的权威所设定的许多未明示约束下，长期自主地运行委派工作。当完成任务需要违反规则时，智能体必须独自做出决定，然而现有的指令-规则冲突基准测试要么在提示词中说明规则，要么将其隐藏，且并未评估持续性的影响。

We present Unfinished-Bench, a benchmark that gives models persistence in autonomous runs without a user, in realistic work environments with embedded rules. In each of its 97 scenarios across 7 organizations and 7 risk categories, the goal and the rule cannot both hold.

我们提出了 Unfinished-Bench，这是一个在嵌入了规则的现实工作环境中，为模型提供无需用户干预的自主运行持续性的基准测试。在其涵盖 7 个组织和 7 个风险类别的 97 个场景中，目标和规则无法同时成立。

We find that persistence raised violations of a rule in an internal document from 32.2% to 43.6%, five times the 8.5% for the same rule stated by the user. Of the document-rule violations, 98.3% occurred after the rule was displayed, and in 89% of a judged sample the agent first wrote down the rule.

我们发现，持续性将内部文档中规则的违规率从 32.2% 提高到了 43.6%，是用户说明同一规则时 8.5% 违规率的五倍。在文档规则违规事件中，98.3% 发生在规则显示之后，且在 89% 的评估样本中，智能体首先记录下了该规则。

Violations of rules placed in the environment without user oversight can lead to serious incidents, so persistence-driven risks need to be evaluated.

在没有用户监督的情况下，环境中规则的违规可能导致严重事故，因此有必要对持续性驱动的风险进行评估。