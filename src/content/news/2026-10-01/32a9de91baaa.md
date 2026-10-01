---
title: "When Successful Memories Mislead Embodied Agents:Memory Adaption For Task-Conditioned Execution"
originalUrl: "https://arxiv.org/abs/2609.35808"
date: "2026-10-01T00:49:53.826Z"
---

# When Successful Memories Mislead Embodied Agents: Memory Adaption For Task-Conditioned Execution
# 当成功的记忆误导具身智能体：面向任务条件执行的记忆适配

**Abstract:** Experience reuse can reduce repeated exploration in embodied agents, but a trajectory that succeeded previously may be unsuitable for the current execution context. Existing memory systems primarily optimize construction and retrieval; semantic relevance and historical success therefore remain insufficient when retrieved experience contains incompatible actions or an inappropriate level of structure.

**摘要：** 经验重用可以减少具身智能体（Embodied Agents）的重复探索，但先前成功的轨迹可能并不适用于当前的执行环境。现有的记忆系统主要优化构建和检索过程；因此，当检索到的经验包含不兼容的动作或结构层级不当时，语义相关性和历史成功经验往往不足以支撑当前任务。

We introduce Memory Adaptation for Task-Conditioned Execution (MATE), a deterministic post-retrieval procedure that converts trajectories into execution-oriented memory. MATE removes obsolete control context, extracts condition-action-effect transitions, applies verified action normalization, selects a task-dependent representation, and serializes the result under a fixed budget without additional LLM inference.

我们引入了“面向任务条件执行的记忆适配”（Memory Adaptation for Task-Conditioned Execution, MATE），这是一种确定性的检索后处理程序，旨在将轨迹转化为面向执行的记忆。MATE 能够移除过时的控制上下文，提取“条件-动作-效果”转换，应用经过验证的动作归一化，选择任务相关的表征，并在固定预算下序列化结果，且无需额外的 LLM 推理。

On 134 ALFWorld tasks, MATE achieves task success rates of 81.3% and 93.3% with Qwen2.5-14B and 72B while using approximately one-tenth of the tokens required by raw trajectories. Controlled comparisons show that verified action normalization is the principal mechanism by which MATE restores the utility of retrieved experience, supporting memory adaptation as a distinct stage between retrieval and embodied execution.

在 134 项 ALFWorld 任务中，MATE 在使用 Qwen2.5-14B 和 72B 模型时，分别达到了 81.3% 和 93.3% 的任务成功率，同时所消耗的 Token 数量仅为原始轨迹所需的大约十分之一。对照实验表明，经过验证的动作归一化是 MATE 恢复检索经验效用的核心机制，这证明了记忆适配是介于检索与具身执行之间的一个独立且必要的阶段。