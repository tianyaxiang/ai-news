---
title: "DietrichGebert / ponytail"
originalUrl: "https://github.com/DietrichGebert/ponytail"
date: "2026-08-27T00:56:22.887Z"
---

# DietrichGebert / ponytail

**Ponytail**
He says nothing. He writes one line. It works.
~54% less code (up to 94%) · ~20% cheaper · ~27% faster · 100% safe

**Ponytail**
他一言不发，只写一行代码，而且能跑。
代码量减少约 54%（最高可达 94%） · 成本降低约 20% · 速度提升约 27% · 100% 安全

Measured on real Claude Code sessions editing a real open-source repo (FastAPI + React), against the same agent with no skill. ~54% is the mean across 12 feature tasks (Haiku 4.5, n=4); it reaches 94% where an agent over-builds (a date picker) and is near zero where the code is already minimal. ponytail keeps every safety guard while a bare "write one-liners" prompt drops one. (The earlier single-shot benchmark reported 80-94% as a flat figure; against a fair agentic baseline that is the per-task ceiling, not the average.) Full writeup · reproduce it. Español · 한국어

该数据基于真实的 Claude Code 会话，在编辑真实的开源仓库（FastAPI + React）时，与未安装该技能的同一智能体进行对比得出。约 54% 是 12 个功能任务的平均值（Haiku 4.5 模型，n=4）；在智能体过度构建（如日期选择器）的情况下，代码缩减率可达 94%，而在代码已足够精简的情况下则接近于零。ponytail 在保持所有安全防护的同时，避免了单纯使用“写一行代码”提示词可能导致的安全性缺失。（早期的单次基准测试报告的 80-94% 是一个固定数值；与公平的智能体基准相比，那是单项任务的上限，而非平均值。）完整报告 · 复现指南。Español · 한국어

You know him. Long ponytail. Oval glasses. Has been at the company longer than the version control. You show him fifty lines; he looks at them, says nothing, and replaces them with one. Ponytail puts him inside your AI agent.

你认识他。留着长马尾，戴着椭圆眼镜。他在公司待的时间比版本控制系统还要久。你给他看五十行代码；他看了一眼，一言不发，然后用一行代码将其替换。Ponytail 就是把你 AI 智能体里的那个“他”。

**Before / after**
You ask for a date picker. Your agent installs flatpickr, writes a wrapper component, adds a stylesheet, and starts a discussion about timezones.
With ponytail:
`<!-- ponytail: browser has one -->`
`<input type="date">`
More survivors in examples/.

**前后对比**
你要求实现一个日期选择器。你的智能体安装了 flatpickr，编写了一个包装组件，添加了样式表，并开始讨论时区问题。
使用 ponytail 后：
`<!-- ponytail: browser has one -->`
`<input type="date">`
更多案例请见 examples/。

**Numbers**
The honest measurement is a real agent doing real work: a headless Claude Code session editing tiangolo's full-stack-fastapi-template (a real FastAPI + React repo), scored on the git diff it leaves behind. Twelve feature tickets, the same agent with and without the skill, n=4, Haiku 4.5.

**数据**
最真实的衡量标准是让智能体进行实际工作：在无头 Claude Code 会话中编辑 tiangolo 的 full-stack-fastapi-template（一个真实的 FastAPI + React 仓库），并根据其留下的 git diff 进行评分。共 12 个功能工单，对比同一智能体在有无该技能下的表现，n=4，Haiku 4.5 模型。

| vs no-skill baseline | LOC | tokens | cost | time | safe |
| :--- | :--- | :--- | :--- | :--- | :--- |
| ponytail | -54% | -22% | -20% | -27% | 100% |
| caveman (terse-prose control) | -20% | +7% | +3% | +2% | 100% |
| "YAGNI + one-liners" prompt | -33% | -14% | -21% | -30% | 95% |

ponytail is the only arm that cuts every metric, and the only one that stays fully safe while doing it. The cut is biggest where there is a real over-build trap (date picker 404 to 23 lines, color picker 287 to 23, because it reaches for a native <input> instead of a component) and near zero on code that is already minimal. Full method, per-task tables, and limitations: benchmarks/results/2026-06-18-agentic.md.

ponytail 是唯一能在所有指标上实现缩减，且同时保持完全安全的方案。当遇到真正的“过度构建陷阱”时，缩减效果最为显著（日期选择器从 404 行减至 23 行，颜色选择器从 287 行减至 23 行，因为它倾向于使用原生的 <input> 而非组件），而在代码已足够精简的情况下，缩减效果则接近于零。完整方法、各任务表格及局限性说明：benchmarks/results/2026-06-18-agentic.md。

**How it works**
Before writing code, the agent stops at the first rung that holds:
1. Does this need to exist? → no: skip it (YAGNI)
2. Already in this codebase? → reuse it, don't rewrite
3. Stdlib does it? → use it
4. Native platform feature? → use it
5. Installed dependency? → use it
6. One line? → one line
7. Only then: the minimum that works

**工作原理**
在编写代码之前，智能体会按照以下阶梯进行判断，一旦满足条件即停止：
1. 这东西有必要存在吗？→ 没有：跳过（YAGNI 原则）
2. 代码库里已经有了吗？→ 复用它，不要重写
3. 标准库能实现吗？→ 使用标准库
4. 原生平台特性支持吗？→ 使用原生特性
5. 已安装依赖支持吗？→ 使用依赖
6. 能写成一行吗？→ 写成一行
7. 只有在以上都不行时：实现功能所需的最小代码量

The ladder runs after it understands the problem, not instead of it: it reads the code the change touches and traces the real flow before picking a rung. Lazy about the solution, never about reading. Lazy, not negligent: trust-boundary validation, data-loss handling, security, and accessibility are never on the chopping block.

该阶梯逻辑是在智能体理解问题之后运行的，而非替代理解过程：它会先读取变更涉及的代码并追踪实际流程，然后再选择阶梯层级。对解决方案保持“懒惰”，但对代码阅读绝不偷懒。是“懒惰”而非“疏忽”：信任边界验证、数据丢失处理、安全性和可访问性绝不会被牺牲。