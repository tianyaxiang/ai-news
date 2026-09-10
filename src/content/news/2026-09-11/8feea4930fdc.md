---
title: "Optimizing LLM Inference Costs in Multi-Agent Systems with Adaptive Model Routing"
originalUrl: "https://towardsdatascience.com/optimizing-llm-inference-costs-in-multi-agent-systems-with-adaptive-model-routing/"
date: "2026-09-10T23:27:10.495Z"
---

# Optimizing LLM Inference Costs in Multi-Agent Systems with Adaptive Model Routing
# 通过自适应模型路由优化多智能体系统中的大模型推理成本

An Adaptive Model Router in front of your LLM pipeline can cut inference costs by up to 90%, without updating any of your agent logic.
在你的大模型（LLM）流水线前端部署一个自适应模型路由器，可以在无需更新任何智能体逻辑的情况下，将推理成本降低高达 90%。

In multi-agent systems, a naive design would be to use the same, most powerful LLM for all agents. For instance, the Planner, Researcher, Action, Analyst, Reporter — all use GPT-5-Pro or similar, regardless of whether they are doing a simple web search or constructing a detailed policy risk analysis of dense contracts.
在多智能体系统中，一种简单的设计是为所有智能体使用同一个最强大的大模型。例如，规划者、研究员、执行者、分析师、报告员——无论它们是在进行简单的网页搜索，还是在构建针对复杂合同的详细政策风险分析，都统一使用 GPT-5-Pro 或类似模型。

In more realistic systems, the Planner creates a step-wise plan, distributing tasks among the downstream agents. This works well if the type of queries your system handles is consistent and predictable, in which case, agents can be statically assigned small, balanced, or large models based on their role. What if the above conditions are not true? If you need a versatile assistant that handles varied queries; such as for different departments of an organisation, in which case the data sources, tools, and input context are best known at runtime. Static assignment breaks down.
在更现实的系统中，规划者会创建一个分步计划，将任务分配给下游智能体。如果你的系统处理的查询类型是一致且可预测的，这种方法效果很好，因为可以根据智能体的角色静态分配小型、中型或大型模型。但如果上述条件不成立呢？如果你需要一个能够处理多样化查询的通用助手（例如服务于组织的不同部门），且数据源、工具和输入上下文只有在运行时才能确定，那么静态分配就会失效。

This article explores an architecture for an Adaptive Agent Model Router. Rather than relying on a massive, monolithic Global Planner upfront, this system pushes planning downstream to each agent. It generates Just-In-Time (JIT) sub-tasks tailored to each active agent's specific capabilities exactly when they are needed. By inserting a lightweight classification layer in front of this execution, the router evaluates these JIT tasks on the fly, dynamically assigning the right-sized LLM to the task while giving you granular visibility over your inference spend.
本文探讨了一种自适应智能体模型路由器的架构。该系统不再依赖于前期庞大且单一的全局规划者，而是将规划任务下放到每个智能体。它在需要时，为每个活跃智能体量身定制“即时（JIT）”子任务。通过在执行前插入一个轻量级的分类层，路由器可以实时评估这些即时任务，动态地为任务分配最合适规模的大模型，同时让你对推理支出拥有细粒度的可见性。

### A Cheap Model to Choose the Right-Sized Model
### 用廉价模型选择合适规模的模型

The core insight is that entire planning does not need to be upfront. For a multi-purpose assistant, where the type of queries is unpredictable, building every possible scenario in a single Global Planner agent, along with tools, guardrails, output formats requires a lengthy, complex prompt. This becomes difficult to maintain and is highly prone to LLM hallucination. Furthermore, a global upfront planner is fundamentally "context blind." It has to guess what a downstream task will require before upstream agents have even gathered the data. It also forces you to use the most expensive, powerful model just to generate the plan.
核心洞察在于：并非所有规划都需要在前期完成。对于一个多用途助手，如果查询类型不可预测，在单个全局规划智能体中构建所有可能的场景（包括工具、护栏、输出格式）需要冗长且复杂的提示词。这不仅难以维护，还极易导致大模型产生幻觉。此外，全局前期规划者本质上是“上下文盲”的——它必须在下游智能体收集数据之前，就猜测下游任务的需求。这也迫使你必须使用最昂贵、最强大的模型来生成计划。

Furthermore, massive upfront planning relegates every downstream agent to a mere executor of tasks, without taking advantage of the reasoning that an agent is capable of. The second core principle is that classification is much simpler than execution. Figuring out whether a task is high-complexity or low-complexity requires far less intelligence than actually performing it. This means you can use a very fast and cheap model for routing such as a Gemini-flash-lite or a gpt-nano for task classification and LLM assignment, while still maintaining the accuracy needed.
此外，大规模的前期规划将每个下游智能体降级为单纯的任务执行者，而无法发挥智能体本身具备的推理能力。第二个核心原则是：分类比执行简单得多。判断一个任务是高复杂度还是低复杂度，所需的智能远低于实际执行该任务。这意味着你可以使用非常快速且廉价的模型（如 Gemini-flash-lite 或 gpt-nano）进行任务分类和模型分配，同时保持所需的准确性。

Therefore, we can distribute the planning phase to each individual agent in the pipeline — the Researcher, Analyst, Critic and Reporter in the case demonstrated here. In this architecture, each active agent in the pipeline dynamically invokes a Planner Agent for its specific stage. When it is the Researcher's turn, it passes its specialised mandate (Data Collection) to the Planner Agent, which considers the available data sources and generates a concrete set of sub-tasks just for that stage. The Analyst or Critic sees the full output of the Researcher to decide the LLMs for their tasks, mitigating the context-blindness. Because this planning call is strictly scoped to a single agent's narrow role, it is an inherently low-complexity activity, requiring only a cheap, fast-tier model.
因此，我们可以将规划阶段分配给流水线中的每个独立智能体——在本例中即研究员、分析师、评论员和报告员。在这种架构下，流水线中的每个活跃智能体都会为其特定阶段动态调用一个规划智能体。当轮到研究员时，它将其专门的任务（数据收集）传递给规划智能体，后者考虑可用数据源并仅为该阶段生成具体的子任务。分析师或评论员可以看到研究员的完整输出，从而决定其任务所需的大模型，这缓解了“上下文盲”的问题。由于此规划调用严格限定在单个智能体的狭窄角色内，它本质上是一项低复杂度活动，仅需廉价的快速层级模型即可。

Then, as the active agent executes those generated sub-tasks, the router intercepts each individual task and runs a structured classification prompt through the lightweight model. That classification returns three scores:
随后，当活跃智能体执行这些生成的子任务时，路由器会拦截每个独立任务，并通过轻量级模型运行结构化的分类提示词。该分类会返回三个分数：

| Dimension | Low (0) | Medium (1) | High (2) |
| :--- | :--- | :--- | :--- |
| **Complexity** | Factual retrieval, formatting | Summarisation, comparison | Multi-step reasoning, synthesis |
| **Reasoning** | Direct lookup | Pattern recognition | Logical inference, gap analysis |
| **Context Size** | < 2k tokens | 2k–6k tokens | > 6k tokens |

| 维度 | 低 (0) | 中 (1) | 高 (2) |
| :--- | :--- | :--- | :--- |
| **复杂度** | 事实检索、格式化 | 摘要、比较 | 多步推理、综合 |
| **推理** | 直接查找 | 模式识别 | 逻辑推断、差距分析 |
| **上下文大小** | < 2k tokens | 2k–6k tokens | > 6k tokens |

These three scores are summed into a single routing score from 0 to 6, which maps cleanly to a model tier:
这三个分数相加得到一个 0 到 6 的路由总分，该分数可以清晰地映射到模型层级：

- Score 0–2 → Fast tier (e.g., gpt-5-mini)
- Score 3–4 → Balanced tier (e.g., gpt-5)
- Score 5–6 → Powerful tier (e.g., gpt-5-pro)

- 分数 0–2 → 快速层级 (例如 gpt-5-mini)
- 分数 3–4 → 平衡层级 (例如 gpt-5)
- 分数 5–6 → 强大层级 (例如 gpt-5-pro)

The context size dimension is particularly important in multi-agent pipelines because context accumulates. A Researcher agent starts with a small prompt. An Analyst inherits the Researcher's output. A Critic inherits both. By the time the Reporter runs, it may be processing 7,000 or 8,000 tokens of accumulated analysis and critique, which alone pushes the routing score toward the Powerful tier, regardless of how simple the individual sub-task looks in isolation.
上下文大小维度在多智能体流水线中尤为重要，因为上下文会不断累积。研究员智能体从一个小提示词开始；分析师继承研究员的输出；评论员则继承两者的内容。当轮到报告员运行时，它可能正在处理 7,000 到 8,000 个 token 的累积分析和评论，仅此一点就会将路由分数推向“强大层级”，无论该子任务单独看起来有多简单。

### Architecture
### 架构

The architecture for the adaptive model router is the following:
自适应模型路由器的架构如下：

There are four moving parts:
它包含四个核心组件：

1. **Multi-Agent Pipeline**: In this article, there are four sequential agents: Researcher gathers information, Analyst interprets it, Critic challenges the reasoning, Reporter synthesises it into a deliverable.
1. **多智能体流水线**：本文包含四个顺序执行的智能体：研究员收集信息，分析师进行解读，评论员质疑推理，报告员将其综合为最终交付成果。

2. **Planner Agent**: Before executing any tasks, the active agent dynamically invokes the Planner Agent. The Planner takes the agent's specific mandate (e.g., Data Collection) and generates a set of sub-tasks. Because planning prompts are inherently low-complexity, this step automatically routes to the cheapest Fast tier model.
2. **规划智能体**：在执行任何任务之前，活跃智能体会动态调用规划智能体。规划者接收智能体的具体任务（如数据收集）并生成一组子任务。由于规划提示词本质上复杂度较低，此步骤会自动路由到最便宜的“快速层级”模型。

3. **Adaptive Router**: Each generated sub-task is intercepted by the router before execution. The router uses a fast classifier model to score the task across three dimensions: complexity, reasoning, and accumulated context size. This ensures the right-sized LLM is assigned for the task for optimal balance of quality and cost.
3. **自适应路由器**：每个生成的子任务在执行前都会被路由器拦截。路由器使用快速分类模型对任务进行三个维度的评分：复杂度、推理和累积上下文大小。这确保了为任务分配最合适规模的大模型，从而在质量和成本之间取得最佳平衡。

4. **Tier Models**: Three models mapped to score ranges. The models themselves are configurable whereby, labels and pricing are set via environment variables, so the router is provider-agnostic.
4. **层级模型**：映射到分数范围的三个模型。模型本身是可配置的，标签和定价通过环境变量设置，因此该路由器与底层模型提供商无关。

The backend is a FastAPI application exposing SSE streams.
后端是一个提供 SSE（服务器发送事件）流的 FastAPI 应用程序。