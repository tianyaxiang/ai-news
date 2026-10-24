---
title: "Automating ML for Science: Can Frontier Agents Climb Scientific Hills in the Wild?"
originalUrl: "https://arxiv.org/abs/2610.28763"
date: "2026-10-23T04:00:00.000Z"
excerpt: false
---

Frontier coding agents are increasingly framed as end-to-end automated researchers, and ML for science offers a demanding test of that promise: improving a scientific model often requires domain insight beyond routine ML engineering.

前沿编码智能体正日益被塑造为端到端的自动化研究人员，而“科学机器学习”（ML for Science）为这一愿景提供了严苛的考验：改进科学模型往往需要超越常规机器学习工程的领域洞察力。

We introduce Agent4Sci, a long-horizon testbed for measuring how far today's agents can improve the published best models on scientific ML benchmarks, spanning 20 benchmarks across 11 domains. Rather than ranking agents on a leaderboard, Agent4Sci asks what kinds of progress agents can make on these tasks under in-the-wild conditions, and where they fall short.

我们引入了 Agent4Sci，这是一个长周期测试平台，用于衡量当今的智能体在跨越 11 个领域的 20 个科学机器学习基准测试中，能在多大程度上改进已发表的最佳模型。Agent4Sci 的目的并非在排行榜上对智能体进行排名，而是探究智能体在现实条件下能取得何种进展，以及它们的不足之处。

Empirically, today's frontier agents advance the published best on every benchmark, with Claude Opus reaching 10.4% mean relative improvement and no run flagged for academic misconduct. These gains, however, come almost entirely from a bag of ML-engineering tricks rather than research-level insight.

实证结果表明，当今的前沿智能体在每一项基准测试中都超越了已发表的最佳水平，其中 Claude Opus 达到了 10.4% 的平均相对提升，且没有任何运行被标记为学术不端。然而，这些收益几乎完全来自于一系列机器学习工程技巧，而非研究层面的洞察。

Trajectory analysis surfaces three recurring limitations in this setting: novelty miscalibration, resource under-utilization, and rapid collapse into local engineering sweeps. Lightweight plug-in skills for research ideation, experiment management, and scheduled checklists raise Claude Opus from 10.4% to 20.1% and Codex from 4.4% to 8.1%, while yielding more diverse, domain-relevant interventions.

轨迹分析揭示了该场景下三个反复出现的问题：新颖性校准失误、资源利用不足，以及迅速陷入局部工程搜索。通过引入用于研究构思、实验管理和预定检查清单的轻量级插件技能，Claude Opus 的表现从 10.4% 提升至 20.1%，Codex 从 4.4% 提升至 8.1%，同时产生了更多样化且与领域相关的干预措施。

Agent4Sci gives the community a way to track and push frontier agents from ML engineering toward domain insight on real-world ML-for-science problems. Code and data are available on GitHub and Hugging Face.

Agent4Sci 为社区提供了一种途径，用以追踪并推动前沿智能体从机器学习工程向解决现实世界科学机器学习问题的领域洞察力转型。代码和数据已在 GitHub 和 Hugging Face 上发布。