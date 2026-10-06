---
title: "Choosing Before Acting: Comparative Value Estimation for Long-Horizon Tool-Use Agents"
originalUrl: "https://arxiv.org/abs/2610.02330"
date: "2026-10-06T02:11:33.726Z"
---

# Choosing Before Acting: Comparative Value Estimation for Long-Horizon Tool-Use Agents
# 先选择，后行动：长程工具使用智能体的比较价值评估

Large language models (LLMs) rely on long-horizon tool invocation sequences for complex tasks, where each invocation can alter the task state and condition subsequent decisions. In long-horizon tool use, final-outcome rewards provide weak credit assignment over long interaction traces. Step-level rewards can offer more targeted feedback, but obtaining reliable step supervision often requires human or LLM judgment, or additional rollouts to estimate the downstream effect of an intermediate decision.

大型语言模型（LLMs）在处理复杂任务时依赖长程工具调用序列，其中每一次调用都可能改变任务状态并影响后续决策。在长程工具使用中，最终结果奖励对于长交互轨迹的信用分配作用微弱。步骤级奖励虽然能提供更具针对性的反馈，但获取可靠的步骤监督通常需要人工或大模型的判断，或者通过额外的推演（rollouts）来评估中间决策的下游影响。

In this paper, we argue that effective tool-use agents should estimate the long-horizon value of a possible next tool invocation before executing it. This objective requires comparative supervision over alternative invocations under the same context, while logged trajectories only contain the invocation that was actually taken. Therefore, we propose Comparative Inference for Tool-use Agents (CITA).

在本文中，我们认为高效的工具使用智能体应当在执行前，先评估下一次可能调用的工具所具备的长程价值。这一目标要求在相同上下文下对备选调用进行比较监督，而记录的轨迹通常只包含实际执行的那一次调用。因此，我们提出了“工具使用智能体比较推理”（Comparative Inference for Tool-use Agents, CITA）。

CITA trains a Comparative Inference Model (CIM) from paired signals that combine observed tool behavior, scalable supervision from a Bayesian tool-graph simulator, and semantic judgments from LLM-based comparison. The resulting CIM learns to estimate how likely a possible next tool invocation is to support final task success under the current context.

CITA 通过配对信号训练比较推理模型（CIM），这些信号结合了观察到的工具行为、来自贝叶斯工具图模拟器的可扩展监督，以及基于大模型比较的语义判断。由此产生的 CIM 能够学习评估在当前上下文下，下一次可能的工具调用对最终任务成功的支持概率。

Across three tool-use benchmarks and multiple backbone LLMs, CITA consistently improves Tool F1 and task success. Additional analysis shows that CIM learns accurate step-level value estimates for comparative tool choices.

在三个工具使用基准测试和多个骨干大模型上的实验表明，CITA 持续提升了工具 F1 分数和任务成功率。进一步分析显示，CIM 能够为比较性的工具选择学习到准确的步骤级价值评估。