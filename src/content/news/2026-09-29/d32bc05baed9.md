---
title: "Prompting Claude Opus 5.5"
originalUrl: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5"
date: "2026-09-29T01:05:04.298Z"
---

# Prompting Claude Opus 5.5

This guide covers the prompting patterns specific to Claude Opus 5.5. For the model's capabilities and API changes, see What's new in Claude Opus 5.5. For techniques that apply across all current Claude models, see Prompting best practices.
本指南涵盖了 Claude Opus 5.5 特有的提示词模式。有关该模型的功能和 API 变更，请参阅《Claude Opus 5.5 的新功能》。有关适用于所有当前 Claude 模型的通用技巧，请参阅《提示词最佳实践》。

Claude Opus 5.5 generates output tokens more than 30 percent faster than Claude Opus 5 and tends to finish the same task with fewer tokens. Existing Claude Opus 5 prompts should perform well without changes, and the patterns in Prompting Claude Opus 5 remain a reasonable starting point.
Claude Opus 5.5 生成输出 token 的速度比 Claude Opus 5 快 30% 以上，并且往往能以更少的 token 完成相同的任务。现有的 Claude Opus 5 提示词无需修改即可良好运行，且《Prompting Claude Opus 5》中的模式仍然是一个合理的起点。

Start with the section that matches what you observe:
请从与您观察到的情况相符的部分开始：

*   **Unsure which effort level to run, or turns run longer and cost more than they did on Claude Opus 5:** Calibrate effort
*   **不确定该运行哪个努力程度（effort level），或者运行时间比 Claude Opus 5 更长、成本更高：** 请参阅“校准努力程度”。
*   **Your Claude Opus 5 integration ran with thinking disabled:** Prompts written for thinking disabled
*   **您的 Claude Opus 5 集成是在禁用思考（thinking）的情况下运行的：** 请参阅“为禁用思考编写的提示词”。
*   **An unattended agent stops partway through a long task after reporting progress:** Unattended agentic runs
*   **无人值守的智能体在报告进度后，在长任务中途停止：** 请参阅“无人值守的智能体运行”。
*   **Requests return stop_reason: "refusal":** Safeguard refusals
*   **请求返回 stop_reason: "refusal"（拒绝）：** 请参阅“安全拒绝”。
*   **Long agentic turns look silent, or you want updates at predictable points:** User-facing progress updates
*   **长智能体运行看起来没有响应，或者您希望在可预测的时间点获得更新：** 请参阅“面向用户的进度更新”。
*   **An agent that works across several connected apps misses information the task didn't point to:** Explore context in multi-app workflows
*   **跨多个连接应用程序工作的智能体遗漏了任务未指明的信息：** 请参阅“在多应用工作流中探索上下文”。
*   **You run a team of agents and want it to finish sooner:** Time signals for multiagent harnesses
*   **您运行着一个智能体团队，并希望它能更快完成任务：** 请参阅“多智能体协作的时间信号”。
*   **Replies in a chat application start slowly because the model thinks at length first:** Thinking instructions in chat system prompts
*   **聊天应用程序中的回复开始缓慢，因为模型先进行了长时间的思考：** 请参阅“聊天系统提示词中的思考指令”。
*   **The model follows instructions that arrived inside text a user pasted:** Mark pasted text in user messages
*   **模型执行了用户粘贴文本中的指令：** 请参阅“标记用户消息中的粘贴文本”。
*   **Answers about dense charts, diagrams, or screenshots miss detail:** Tools for complex visual inputs
*   **关于密集图表、示意图或截图的回答遗漏了细节：** 请参阅“复杂视觉输入的工具”。
*   **Frontend output looks generic:** Frontend design defaults
*   **前端输出看起来很普通：** 请参阅“前端设计默认设置”。

### Capabilities relevant to prompting
### 与提示词相关的功能

The capabilities that matter most for prompting are:
对提示词最重要的功能包括：

**Agentic coding and code review:** The model is strongest on multistep work in a real repository, such as carrying a change through a large code base until its tests pass. In Anthropic's testing, at its default medium effort the model matched or beat Claude Opus 5 at high effort on such tasks, in fewer steps and with fewer tokens. It also sustains long-running autonomous work better than Claude Opus 5, such as multi-hour audits and migrations of large code bases run end to end with parallel subagents and little oversight. Early testers also reported stronger code review, with more bugs caught than on Claude Opus 5 and fewer false alarms, and it explains its changes in plain language.
**智能体编码与代码审查：** 该模型在真实代码库的多步骤工作中表现最强，例如在大型代码库中执行变更直到测试通过。在 Anthropic 的测试中，该模型在默认的“中等”努力程度下，在此类任务中匹配或超越了 Claude Opus 5 的“高”努力程度，且步骤更少、token 更少。它在长时间自主工作方面的表现也优于 Claude Opus 5，例如在几乎无需人工监督的情况下，通过并行子智能体端到端地进行数小时的大型代码库审计和迁移。早期测试者还报告称其代码审查能力更强，捕获的 Bug 比 Claude Opus 5 多，误报更少，并且能用通俗易懂的语言解释其变更。

**Knowledge work:** The model is much less likely to state an incorrect figure or cite the wrong source. It's better at financial modeling tasks, such as building a financial model and one-page summary for a transaction or finding and fixing errors in a valuation workbook, and it catches details that are easy to miss in large inputs, such as a date in a long planning thread that falls on the wrong weekday or a chart in a slide deck that doesn't match the underlying figures. The spreadsheets, slides, and documents it produces need less editing before you share them.
**知识工作：** 该模型陈述错误数据或引用错误来源的可能性大大降低。它在财务建模任务中表现更好，例如为交易构建财务模型和单页摘要，或在估值工作簿中查找并修复错误。它能捕捉到大型输入中容易遗漏的细节，例如长规划线程中日期对应的星期错误，或幻灯片中与底层数据不匹配的图表。它生成的电子表格、幻灯片和文档在分享前所需的编辑工作更少。

**Communication:** Its reports on agentic work, both the updates while it works and the summary when it finishes, say plainly what it did, what it found, and what it needs from you. See User-facing progress updates.
**沟通：** 它关于智能体工作的报告（包括工作过程中的更新和完成后的总结）能清晰地说明它做了什么、发现了什么以及需要您提供什么。请参阅“面向用户的进度更新”。

**Charts, diagrams, screenshots, and computer use:** The model reads visual material more accurately than Claude Opus 5 without extra tooling: in Anthropic's testing, even at its lowest effort setting it read values off dense charts more accurately than Claude Opus 5 did at its highest, using a small fraction of the output tokens. It is better, too, where meaning depends on position rather than text: which boxes an arrow connects in a flowchart, what changed between two versions of a diagram, or exactly when a meeting starts and ends in a calendar screenshot. It's also more reliable at computer use, where it operates applications from screenshots over many steps: at its default effort it matched the success rate that Claude Opus 5 reached only at a much higher effort setting. See Tools for complex visual inputs.
**图表、示意图、截图和计算机使用：** 该模型无需额外工具即可比 Claude Opus 5 更准确地读取视觉材料：在 Anthropic 的测试中，即使在最低努力程度设置下，它读取密集图表数值的准确度也超过了 Claude Opus 5 在最高设置下的表现，且仅使用了极少量的输出 token。在含义取决于位置而非文本的情况下，它的表现也更好：例如流程图中箭头连接了哪些方框、两个版本的示意图之间发生了什么变化，或者日历截图中会议开始和结束的具体时间。它在计算机使用方面也更可靠，能够通过截图在多个步骤中操作应用程序：在默认努力程度下，它达到了 Claude Opus 5 只有在更高努力程度设置下才能达到的成功率。请参阅“复杂视觉输入的工具”。

### Calibrate effort
### 校准努力程度

Effort is the main control for how much Claude Opus 5.5 thinks, and because thinking is always on, it's the first setting to adjust when trading off intelligence, latency, and cost. Start at medium, the default on Claude Opus 5.5 (Claude Opus 5 defaults to high), set it explicitly, and test several levels against your own evals rather than carrying over the setting you used on Claude Opus 5.
“努力程度”（Effort）是控制 Claude Opus 5.5 思考深度的主要手段。由于思考功能始终开启，它是权衡智能水平、延迟和成本时首要调整的设置。请从 Claude Opus 5.5 的默认值“中等”（Claude Opus 5 默认为“高”）开始，明确设置它，并针对您自己的评估测试几个级别，而不是直接沿用您在 Claude Opus 5 上使用的设置。

Effort level names don't correspond to the same amount of thinking across models: in Anthropic's testing, Claude Opus 5.5 at medium matches or exceeds Claude Opus 5 at high on coding and knowledge-work evaluations, and on several coding evaluations low comes close to it at much lower cost. See Recommended effort levels for Claude Opus 5.5.
不同模型中，努力程度级别的名称并不对应相同的思考量：在 Anthropic 的测试中，Claude Opus 5.5 在“中等”级别下，在编码和知识工作评估中匹配或超过了 Claude Opus 5 的“高”级别；在多项编码评估中，“低”级别以低得多的成本接近了该水平。请参阅《Claude Opus 5.5 的推荐努力程度》。

At a given level, Claude Opus 5.5 tends to think more per turn than Claude Opus 5, especially at xhigh and max. If you keep the effort value you set for Claude Opus 5, expect longer turns and more output tokens. Three adjustments help:
在同一级别下，Claude Opus 5.5 每轮思考的量往往比 Claude Opus 5 多，尤其是在 xhigh（超高）和 max（最大）级别。如果您保留在 Claude Opus 5 上设置的努力程度值，请预期会有更长的运行轮次和更多的输出 token。以下三个调整会有所帮助：

1.  **Set max_tokens high enough** to leave room for the model's thinking tokens and the reply. Thinking counts toward max_tokens even when thinking content isn't returned to you, so a limit sized for Claude Opus 5 with thinking off can cut replies off. For the long turns that agentic coding can produce, a max_tokens of 128,000, the model's maximum, has worked well in Anthropic's testing.
    **将 max_tokens 设置得足够高**，以便为模型的思考 token 和回复留出空间。即使思考内容未返回给您，思考过程也会计入 max_tokens，因此针对禁用思考的 Claude Opus 5 设置的限制可能会截断回复。对于智能体编码可能产生的长轮次，在 Anthropic 的测试中，使用模型最大值 128,000 的 max_tokens 效果良好。
2.  **Reserve xhigh and max for work where you've measured a quality gain.**
    **仅在您已衡量出质量提升的工作中保留 xhigh 和 max 级别。**
3.  **To get less thinking, lower the effort level first.** Lowering effort reduces thinking, and with it cost and latency, more reliably than prompt instructions do.
    **若要减少思考，请优先降低努力程度。** 相比提示词指令，降低努力程度能更可靠地减少思考量，从而降低成本和延迟。

Changing the top-level effort value between requests invalidates the prompt cache. To run individual turns at a different level, use a per-message effort change (beta) instead, which keeps the cache.
在请求之间更改顶层努力程度值会使提示词缓存失效。若要以不同级别运行单个轮次，请改用“每消息努力程度更改（测试版）”，这样可以保留缓存。

### Prompts written for thinking disabled
### 为禁用思考编写的提示词

Claude Opus 5 accepts thinking: {"type": "disabled"} at high effort or below; Claude Opus...
Claude Opus 5 在“高”努力程度或以下级别接受 `thinking: {"type": "disabled"}`；Claude Opus...