---
title: "Navalia: Advancing Cowork Agents through Verifiable Task Synthesis and Long-Horizon Post-Training"
originalUrl: "https://arxiv.org/abs/2610.26887"
date: "2026-10-21T04:00:00.000Z"
excerpt: false
---

Computer Science > Artificial Intelligence arXiv:2610.26887 (cs) [Submitted on 13 Oct 2026] Title: Navalia: Advancing Cowork Agents through Verifiable Task Synthesis and Long-Horizon Post-Training Authors: Hengqi Liu, Ziyuan Liu, Yang Qin, Wanting Zhou, Zichuan Wang, Jiachen Liang, Xu Chu, Shaowei Chen, Zhaokai Luo, Mu Chuan.

计算机科学 > 人工智能 arXiv:2610.26887 (cs) [提交于 2026 年 10 月 13 日] 标题：Navalia：通过可验证的任务合成和长程后训练推进协作智能体。作者：Hengqi Liu, Ziyuan Liu, Yang Qin, Wanting Zhou, Zichuan Wang, Jiachen Liang, Xu Chu, Shaowei Chen, Zhaokai Luo, Mu Chuan。

Abstract: Large language model (LLM) agents are evolving from conversational assistants into Cowork Agents capable of autonomous planning, tool use, and complex task execution. Financial analysis requires these agents to integrate cross-document evidence and perform multistep numerical reasoning, but expert task authoring is costly, while direct LLM synthesis struggles to produce challenging tasks with reliable answers.

摘要：大型语言模型（LLM）智能体正在从对话助手演变为能够进行自主规划、工具使用和复杂任务执行的协作智能体（Cowork Agents）。金融分析要求这些智能体整合跨文档证据并执行多步数值推理，但专家编写任务的成本高昂，而直接通过 LLM 合成则难以生成具有可靠答案的挑战性任务。

We introduce Navalia, a framework for Cowork Agents that combines verifiable task synthesis with long-horizon post-training. Using corporate financial reports as its data source, Navalia semantically selects supporting evidence from complete fact sets and constructs executable computation chains to generate analytical tasks with traceable evidence and actual data dependencies between steps.

我们引入了 Navalia，这是一个为协作智能体设计的框架，它将可验证的任务合成与长程后训练相结合。Navalia 以企业财务报告为数据源，从完整的事实集中语义化地选择支持性证据，并构建可执行的计算链，从而生成具有可追溯证据和步骤间实际数据依赖关系的分析任务。

We further use independent LLM review and programmatic checks to verify evidence consistency and answer correctness. The verified tasks are then used for trajectory collection, cold-start supervised fine-tuning (SFT), and reinforcement learning (RL) to improve long-horizon task execution.

我们进一步使用独立的 LLM 审查和程序化检查来验证证据的一致性和答案的正确性。随后，这些经过验证的任务被用于轨迹收集、冷启动监督微调（SFT）和强化学习（RL），以提升长程任务的执行能力。

Navalia, initialized from Qwen3.6-35B-A3B, achieves consistent gains over the base model across all five benchmarks: OfficeQA Pro, FinSearchComp, Finance Agent Benchmark, APEX-Agents-AA, and Workspace-Bench-Lite. These results demonstrate that Navalia improves evidence integration, tool use, and long-horizon task execution capabilities and generalizes to broader Cowork settings, including general office tasks.

Navalia 基于 Qwen3.6-35B-A3B 初始化，在所有五个基准测试（OfficeQA Pro、FinSearchComp、Finance Agent Benchmark、APEX-Agents-AA 和 Workspace-Bench-Lite）中均比基础模型取得了持续的提升。这些结果表明，Navalia 改善了证据整合、工具使用和长程任务执行能力，并可推广到更广泛的协作环境，包括一般办公任务。