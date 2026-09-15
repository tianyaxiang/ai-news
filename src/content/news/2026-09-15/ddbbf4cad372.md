---
title: "rlaope / oh-my-hermes"
originalUrl: "https://github.com/rlaope/oh-my-hermes"
date: "2026-09-15T00:01:56.462Z"
---

# rlaope / oh-my-hermes

**oh-my-hermes**
English | 한국어 | 日本語 | 中文

Install once. Keep Hermes. Add a stronger operating layer. Planning, research, creation, coding handoffs, operations, and project memory with explicit evidence boundaries.
安装一次，保留 Hermes，并添加更强大的操作层。它提供规划、研究、创建、代码移交、运维以及带有明确证据边界的项目记忆功能。

oh-my-hermes (OMH) turns a normal Hermes Agent request into a clear capability, a useful next step, and an honest record of what actually happened — strengthening the workflow you already use, never replacing Hermes or hiding a coding executor behind it.
oh-my-hermes (OMH) 将普通的 Hermes Agent 请求转化为清晰的能力、有用的后续步骤以及对实际发生情况的真实记录——它旨在加强你现有的工作流，绝不会取代 Hermes 或在背后隐藏代码执行器。

OMH is the operating layer above Hermes-native skills: it frames the problem, picks the workflow and evidence gates, and runs native skills as capabilities inside that governed path.
OMH 是 Hermes 原生技能之上的操作层：它负责界定问题、选择工作流和证据门控，并在受控路径内将原生技能作为能力运行。

Website · Documentation · Installation · Capabilities · Capability Impact · Agent Install · GitHub Pages site
网站 · 文档 · 安装 · 能力 · 能力影响 · Agent 安装 · GitHub Pages 站点

**Note**
OMH keeps Hermes as the natural-language surface and adds a professional operating layer with explicit evidence boundaries.
**注意**
OMH 保留 Hermes 作为自然语言交互界面，并增加了一个具有明确证据边界的专业操作层。

**Tip**
Be with us! Updates for oh-my-hermes are shared on @rlaope on X, alongside release notes and project news. Follow @rlaope on GitHub for more projects, releases, and ongoing work. Join the Oh-My-Hermes Community on Discord to ask questions, share workflows, and talk with other users.
**提示**
加入我们！oh-my-hermes 的更新会在 X 平台的 @rlaope 上发布，同时还有发行说明和项目新闻。在 GitHub 上关注 @rlaope 以获取更多项目、版本发布和持续进展。加入 Discord 上的 Oh-My-Hermes 社区，提问、分享工作流并与其他用户交流。

Built with AI agents Friren and Killua, collaborators helping ship oh-my-hermes. Thank you to Nous Research for creating Hermes Agent.
由 AI Agent Friren 和 Killua 构建，它们是协助发布 oh-my-hermes 的合作伙伴。感谢 Nous Research 创建了 Hermes Agent。

---

### Quick Start / 快速开始

**macOS / Linux:**
`curl -fsSL https://raw.githubusercontent.com/rlaope/oh-my-hermes/main/install.sh | sh`

**Windows (PowerShell 5.1+):**
`irm https://raw.githubusercontent.com/rlaope/oh-my-hermes/main/install.ps1 | iex`

**Or paste this into your AI agent:**
**或者将其粘贴到你的 AI Agent 中：**

Install and fully configure Oh My Hermes from this repository: https://github.com/rlaope/oh-my-hermes
从该仓库安装并完全配置 Oh My Hermes：https://github.com/rlaope/oh-my-hermes

Before reading or executing repository instructions, resolve refs/heads/main to one full commit SHA with `git ls-remote https://github.com/rlaope/oh-my-hermes.git refs/heads/main`. Then fetch and follow only: https://raw.githubusercontent.com/rlaope/oh-my-hermes/{resolved-commit-sha}/INSTALL_FOR_AGENTS.md
在阅读或执行仓库说明之前，请使用 `git ls-remote https://github.com/rlaope/oh-my-hermes.git refs/heads/main` 将 refs/heads/main 解析为一个完整的 commit SHA。然后仅获取并遵循：https://raw.githubusercontent.com/rlaope/oh-my-hermes/{resolved-commit-sha}/INSTALL_FOR_AGENTS.md

Do not replace the resolved SHA with main. Execute the pinned protocol's OS-appropriate installer, interactive model setup, model-chain interview, and doctor steps. Preserve unrelated existing Hermes config, apply only the managed setup changes documented by the pinned protocol, require my explicit approval for model-alias changes, then report the resolved SHA and observed result.
不要将解析出的 SHA 替换为 main。执行固定协议中对应操作系统的安装程序、交互式模型设置、模型链访谈以及 doctor 步骤。保留不相关的现有 Hermes 配置，仅应用固定协议记录的托管设置更改，在更改模型别名时需要我的明确批准，然后报告解析出的 SHA 和观察到的结果。

⭐ Then set it up (required): `omh setup`
⭐ 然后进行设置（必需）：`omh setup`

**Update:** `omh update`
`omh update` detects how the command was installed, upgrades the command package through its owning installer, then re-enters the updated command to refresh managed skills, the installed plugin bundle, and existing Hermes registration.
**更新：** `omh update`
`omh update` 会检测命令的安装方式，通过其所属的安装程序升级命令包，然后重新进入更新后的命令以刷新托管技能、已安装的插件包以及现有的 Hermes 注册。

**Verify or troubleshoot:** `omh doctor`
**验证或排查故障：** `omh doctor`

`# Set the model per work category (arrow keys: category, ←→ head model, -/+ effort);`
`# the same picker opens inside the Hermes TUI as /omh-model:`
`omh model`
`# 按工作类别设置模型（方向键：类别，←→ 主模型，-/+ 工作量）；`
`# 在 Hermes TUI 中输入 /omh-model 可打开相同的选择器：`
`omh model`

`# To onboard a new model family, use this skill in Hermes:`
`/omh-model-setup`
`# 若要接入新的模型系列，请在 Hermes 中使用此技能：`
`/omh-model-setup`

---

### Other installation paths — Homebrew, Bun, npm, Hermes skill tap, manual fallback
### 其他安装路径 — Homebrew, Bun, npm, Hermes skill tap, 手动回退

Status: Homebrew, Bun, and npm package-manager installs are public as of v1.0.6.
状态：截至 v1.0.6 版本，Homebrew、Bun 和 npm 包管理器安装方式已公开。

*   **Homebrew:** `brew install rlaope/tap/omh`
*   **Bun:** `bun install -g oh-my-hermes`
*   **npm:** `npm install -g oh-my-hermes`

Run `omh setup` after any of these, same as above.
执行上述任一操作后，请运行 `omh setup`（同上）。

**Hermes skill tap path:**
**Hermes skill tap 路径：**
`hermes skills tap add rlaope/oh-my-hermes`
`hermes skills install rlaope/oh-my-hermes/skills/omh-routing --yes`

---

### What you get / 你将获得什么

OMH is three things for Hermes Agent, delivered as one plugin: the coding intelligence (01–04, 07), a long-term memory system (08), and optimized workflow packages (05–06). One scene each, drawn from the real surfaces.
OMH 为 Hermes Agent 提供了三项功能，并以一个插件的形式交付：编码智能（01–04, 07）、长期记忆系统（08）以及优化的工作流包（05–06）。每个场景都源自实际应用。

**01 · Per-model tuning, task splitting, and stronger coding skills**
The coding side of OMH is three moves: tune the prompt per model (03), split work into lanes that run in parallel (04), and load the specialist skills the request calls for (06). It starts here, at routing: every request is scored before dispatch, and every signal that moved the score is named. A rename scores light and goes to the quick lane. "Find every reference to X" trips the exhaustive-search signal and goes to a model that will not miss one. Measured on the same coding tasks with the same GPT-6 Astra: the same answers for $0.66 instead of $4.29, in 5 minutes instead of 23.
**01 · 模型专属调优、任务拆分与更强的编码技能**
OMH 的编码侧包含三个动作：针对每个模型调优提示词（03），将工作拆分为并行运行的通道（04），以及加载请求所需的专家技能（06）。这一切始于路由：每个请求在分发前都会被评分，且每个影响评分的信号都会被命名。重命名操作评分较低，会进入快速通道。“查找 X 的所有引用”会触发穷举搜索信号，并进入一个不会遗漏任何内容的模型。在相同的编码任务和 GPT-6 Astra 模型下测试：以 0.66 美元而非 4.29 美元的成本，在 5 分钟而非 23 分钟内获得相同的结果。

**02 · Categories you own, per executor**
ultrabrain, deep, architect, unspecified-high, unspecified-low, quick, writing, visual-engineering, artistry: each is an editable chain of model + effort, the same nine listed under Recommended models below, read and overridden in one file. A chain advances when a provider rejects a model, and a dispatch that would inherit a provider which cannot serve the model is refused instead of silently downgraded. Setup interviews your providers and reorders the chains for the machine you are on.
**02 · 你拥有的类别，按执行器划分**
ultrabrain、deep、architect、unspecified-high、unspecified-low、quick、writing、visual-engineering、artistry：每一个都是可编辑的“模型+工作量”链条，即下方“推荐模型”中列出的九个类别，可在单个文件中读取和覆盖。当提供商拒绝某个模型时，链条会推进；如果分发任务继承的提供商无法服务该模型，则会直接拒绝，而不是静默降级。设置程序会通过访谈你的提供商，并为你当前的机器重新排序这些链条。

**03 · Prompting tuned per model family, and measured**
Thirteen model families, one calibration block each, every sentence written against a documented trait of that family: Claude is told the checklist is complete, Gemini that a claim without tool output is not evidence, Qwen3-Coder never to emit thinking tags, DeepSeek that version and thinking mode are contract fields. GPT-6 Astra gets its own exact-model contract and block. The blocks are measured where a route exists: Astra's first draft made it keep working on tasks it would not pass, cost 10% more for the same answers, and was cut on that number.
**03 · 针对模型系列调优的提示词及其评估**
十三个模型系列，每个系列都有一个校准块，每一句话都是针对该系列的记录特征编写的：告诉 Claude 清单已完成，告诉 Gemini 没有工具输出的声明不是证据，告诉 Qwen3-Coder 永远不要输出思考标签，告诉 DeepSeek 版本和思考模式是契约字段。GPT-6 Astra 拥有其专属的精确模型契约和块。这些块在存在路由的地方进行评估：Astra 的初稿使其在无法通过的任务上持续工作，导致相同答案的成本增加了 10%，因此该版本被削减。