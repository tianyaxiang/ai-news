---
title: "Learning how to BMAD"
originalUrl: "https://dev.to/dmitryame/learning-how-to-bmad-307j"
date: "2026-10-01T00:57:32.076Z"
---

# Learning how to BMAD

My evolution in agentic development has been somewhat typical. At the end of 2025, it was all about the new thing at the time — Vibe Coding. Then, at the beginning of 2026, SDD with OpenSpec became a big game changer. It provided a way to scale agent-driven development without letting the codebase turn into a mess. And the next natural step? Multi-agent agentic workflows with BMAD.

我在智能体开发方面的演进过程相当典型。2025 年底，大家都在追逐当时的新潮流——“氛围编程”（Vibe Coding）。随后在 2026 年初，基于 OpenSpec 的规范驱动开发（SDD）成为了重大的游戏规则改变者。它提供了一种在不让代码库变得混乱的前提下，扩展智能体驱动开发的方法。而下一步自然而然的发展是什么呢？那就是基于 BMAD 的多智能体工作流。

At first glance, BMAD seems vast, sophisticated, and complex. So where do I start? The best approach I could come up with was pretty simple: I talked to a friend who has been using BMAD for a couple of months, transcribed our conversation, and asked GenAI to summarize it. Here’s what I got.

乍一看，BMAD 显得庞大、深奥且复杂。那么我该从哪里开始呢？我能想到的最好方法非常简单：我与一位已经使用 BMAD 几个月的朋友进行了交谈，将我们的对话转录下来，并让生成式 AI 对其进行了总结。以下是我得到的内容。

### Orchestrating AI: A Blueprint for Spec-Driven Development with BMAD

### 编排 AI：基于 BMAD 的规范驱动开发蓝图

Software development constraints have shifted. The bottleneck is no longer keystrokes or raw implementation speed; it is cognitive load and context window management. My colleague Vlad recently scaled an entire production architecture using the BMAD AI framework. By shifting his role from writing syntax to orchestrating architecture, he maxed out Claude’s highest subscription tiers and fundamentally changed his output vector. Tasks that typically rot in a backlog are now executed in a single weekend. Here is the operational framework for high-leverage execution using BMAD.

软件开发的约束条件已经发生了变化。瓶颈不再是敲击键盘的速度或原始的实现速度，而是认知负荷和上下文窗口的管理。我的同事 Vlad 最近使用 BMAD AI 框架扩展了整个生产架构。通过将他的角色从编写语法转变为编排架构，他用尽了 Claude 的最高订阅额度，并从根本上改变了他的产出向量。那些通常在待办事项中积压的任务，现在一个周末就能完成。以下是使用 BMAD 进行高杠杆执行的操作框架。

### The Execution Pipeline

### 执行流水线

AI-driven development requires strict adherence to spec-driven workflows. You do not ask the AI to "build a feature." You force it to define the product, register the architecture, and validate its own readiness before a single line of code is written.

AI 驱动的开发需要严格遵守规范驱动的工作流。你不能只是让 AI “构建一个功能”，而是要强制它在编写任何一行代码之前，先定义产品、注册架构并验证其自身的就绪状态。

The Spec-Driven Workflow: Brainstorming → PRD → ADR → Epics → Stories → Readiness Validation (Loop if Not Ready) → Implementation → Code Review

规范驱动工作流：头脑风暴 → 产品需求文档 (PRD) → 架构决策记录 (ADR) → 史诗任务 (Epics) → 用户故事 (Stories) → 就绪状态验证（若未就绪则循环）→ 实现 → 代码审查

*   **Domain Research & PRD:** Establish the baseline. The AI translates brainstorming sessions into strict Product Requirement Documents (PRDs).
*   **Architecture Decision Registry (ADR):** The AI extracts technical dependencies from the PRD, selecting the stack (e.g., databases, infrastructure) and locking in technical parameters.
*   **Epics & Sharding:** The ADR is broken down into Epics. If an Epic is too large, the AI shards it into smaller, digestible components.
*   **Implementation Readiness:** This is the critical gate. The AI runs a readiness check against the requirements. If it scores below the required threshold (due to contradictions or missing logic), the engineer issues a "correct course" command.
*   **Implementation & Review:** The AI generates a comprehensive checklist (often 500+ lines) for a single story, executes the code, and then reviews its own work, prompting the engineer with necessary clarifying questions.

*   **领域研究与 PRD：** 建立基准。AI 将头脑风暴会议转化为严格的产品需求文档 (PRD)。
*   **架构决策记录 (ADR)：** AI 从 PRD 中提取技术依赖项，选择技术栈（如数据库、基础设施）并锁定技术参数。
*   **史诗任务与分片：** 将 ADR 拆解为史诗任务 (Epics)。如果某个史诗任务过大，AI 会将其分片为更小、易于消化的组件。
*   **实现就绪性：** 这是关键的关卡。AI 会根据需求进行就绪性检查。如果得分低于阈值（由于存在矛盾或逻辑缺失），工程师会发出“纠正航向”的指令。
*   **实现与审查：** AI 为单个用户故事生成一份详尽的检查清单（通常超过 500 行），执行代码，然后审查自己的工作，并向工程师提出必要的澄清问题。

### Eliminating Technical Debt at Zero Marginal Cost

### 以零边际成本消除技术债务

Under legacy models, technical debt persists because the ROI of fixing it rarely justifies the engineering hours. AI reverses this calculus. Vlad’s monorepo CI/CD pipeline was choking on batch scripts, pushing test cycles to 90 minutes. Rather than manually rewriting it, he orchestrated an automated intervention:

在传统模式下，技术债务之所以长期存在，是因为修复它的投资回报率往往无法抵消投入的工程时间。AI 扭转了这一计算方式。Vlad 的单体仓库 CI/CD 流水线曾因批处理脚本而陷入瘫痪，导致测试周期长达 90 分钟。他没有手动重写，而是编排了一次自动化干预：

*   **Phase 1: Technical Research.** BMAD analyzed the repository, identified the quadratic scaling bottleneck in the batch scripts, evaluated Python, TypeScript, and Go, and proposed a Go port.
*   **Phase 2: Execution.** After Vlad approved the research, BMAD injected three new stories into the active Epic and executed the Go port over the weekend. A refactor that would have cost a week of human engineering time was resolved asynchronously while the engineer managed top-level logistics.

*   **第一阶段：技术研究。** BMAD 分析了代码库，识别出批处理脚本中二次方扩展的瓶颈，评估了 Python、TypeScript 和 Go，并提议迁移至 Go 语言。
*   **第二阶段：执行。** 在 Vlad 批准研究结果后，BMAD 将三个新故事注入到当前的史诗任务中，并在周末完成了 Go 语言的迁移。这次重构原本需要人类工程师一周的时间，现在却在工程师负责顶层逻辑的同时，以异步方式完成了。

### Operational Heuristics for AI Engineering

### AI 工程的操作启发式原则

If you are scaling an AI agent like BMAD, adopt these technical guardrails:

如果你正在扩展像 BMAD 这样的 AI 智能体，请采用以下技术护栏：

1.  **Enforce Monorepos:** Avoid git submodules and multi-repository architectures. Umbrella projects with submodules introduce heavy friction when tracking commit hashes across dependencies. AI agents perform best when they have unified line-of-sight across the entire codebase—front-end and back-end alike.
2.  **Cap the Context Window:** Larger context windows yield higher hallucination rates. While Claude and local models (like Qwen) boast 500k to 1M token windows, pushing past 400k guarantees degradation. The AI will fabricate interruptions or lose the thread entirely. Cap your working sessions between 100k and 260k tokens. Isolate execution by breaking stories down further rather than bloating the context.
3.  **Automate Traceability:** As your project scales to hundreds of PRDs and ADRs, manual validation becomes impossible. Vlad engineered a custom BMAD skill using an open-source requirement flow tool. The skill mechanically sweeps all files to ensure strict traceability—flagging orphan PRDs, missing dependencies, and architectural contradictions before the implementation phase begins.
4.  **Shift Unknowns Left:** Address structural unknowns and technical spikes in the earliest stories of an Epic. By resolving ambiguities at the start of the cycle, the tail end of the Epic becomes highly mechanical, requiring near-zero human intervention.

1.  **强制使用单体仓库：** 避免使用 git 子模块和多仓库架构。带有子模块的伞形项目在跨依赖项跟踪提交哈希时会引入巨大的摩擦。当 AI 智能体能够统一纵览整个代码库（包括前端和后端）时，其表现最佳。
2.  **限制上下文窗口：** 更大的上下文窗口会导致更高的幻觉率。虽然 Claude 和本地模型（如 Qwen）宣称拥有 50 万到 100 万 token 的窗口，但超过 40 万必然会导致性能下降。AI 会编造中断或完全丢失线索。将工作会话限制在 10 万到 26 万 token 之间。通过进一步拆解故事来隔离执行，而不是膨胀上下文。
3.  **自动化可追溯性：** 当项目扩展到数百个 PRD 和 ADR 时，手动验证已不再可能。Vlad 使用开源需求流工具设计了一个自定义的 BMAD 技能。该技能会自动扫描所有文件以确保严格的可追溯性——在实现阶段开始前，标记出孤立的 PRD、缺失的依赖项和架构矛盾。
4.  **左移未知项：** 在史诗任务的最早阶段解决结构性未知项和技术突发点。通过在周期开始时解决歧义，史诗任务的后期将变得高度机械化，几乎不需要人工干预。

### The Delta

### 变革

We are exiting the era of the 50-person engineering team split across 10 specialized layers. The future belongs to single-engineer monorepos, where the human acts as the Chief Architect and the AI executes the labor. Focus on the architecture; the speed will follow.

我们正在告别由 50 人组成的、分散在 10 个专业层级的工程团队时代。未来属于单人工程师的单体仓库，人类担任首席架构师，而 AI 执行具体劳动。专注于架构，速度自然会随之而来。