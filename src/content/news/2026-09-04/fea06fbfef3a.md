---
title: "My AI Keeps Forgetting What We Already Decided"
originalUrl: "https://dev.to/sergemso/my-ai-keeps-forgetting-what-we-already-decided-4okd"
date: "2026-09-03T23:29:57.942Z"
---

# My AI Keeps Forgetting What We Already Decided
# 我的 AI 总是在遗忘我们已经做出的决定

Every week I re-explain the same architecture choices to my AI coding agent. New session, zero memory — like we never talked. That's not a prompting problem, it's a memory problem, and I fixed it with a git-based knowledge system that lives right next to the code. Here's the actual walkthrough, the schema it writes, and where it falls short — not just the pitch.
每周，我都要向我的 AI 编程助手重新解释同样的架构选择。开启新会话，记忆归零——就像我们从未交流过一样。这不是提示词（prompting）的问题，而是记忆的问题。我通过一个与代码库共存的、基于 Git 的知识系统解决了这个问题。以下是实际的操作指南、它生成的架构模式以及它的局限性——不仅仅是推销。

### The problem in one sentence
### 一句话概括问题

I plan a feature with Claude Code on Tuesday. Wednesday, fresh session: "Where did we leave off?" No idea. I re-explain everything. By Thursday I've explained it a third time to a different agent. Each one asks good questions, gets a good answer, and forgets it the moment the session ends. The plan was never the problem — nothing durable ever got written down, so there was nothing for the next session to read.
周二我和 Claude Code 规划了一个功能。周三开启新会话时问它：“我们上次讲到哪了？”它毫无头绪。我只好重新解释一切。到了周四，我已经向另一个不同的助手第三次解释了同样的内容。它们每个人都会提出好问题，得到好答案，但一旦会话结束就立刻忘得一干二净。问题从来不在于规划本身——而是没有任何持久的东西被记录下来，所以下一次会话根本无从读取。

### What I built: kms
### 我构建了什么：kms

kms is a Claude Code plugin that captures decisions, facts, and guardrails as plain markdown files, version-controlled right alongside your code. Any agent that reads the repo reads the knowledge base first, before it asks you anything.
kms 是一个 Claude Code 插件，它将决策、事实和护栏（guardrails）捕获为纯 Markdown 文件，并与你的代码一起进行版本控制。任何读取该仓库的助手在询问你任何问题之前，都会先读取这个知识库。

**Install:**
**安装：**
`/plugin marketplace add vivantel/kms`
`/plugin install kms`

Four artifact types, each with one job:
四种工件类型，各司其职：

| Type | Answers | Lives in |
| :--- | :--- | :--- |
| **Fact** | What's true right now | `docs/facts/` |
| **Decision** | What you're committing to, and why | `docs/decisions/` |
| **Guardrail** | What must (or must not) happen, derived from a decision | `docs/guardrails/` |
| **Skill** | How to act on all of the above | `docs/skills/` |

| 类型 | 回答 | 存放位置 |
| :--- | :--- | :--- |
| **事实 (Fact)** | 当前的真实情况 | `docs/facts/` |
| **决策 (Decision)** | 你承诺要做什么，以及原因 | `docs/decisions/` |
| **护栏 (Guardrail)** | 必须（或禁止）发生的事，源自决策 | `docs/guardrails/` |
| **技能 (Skill)** | 如何根据上述内容采取行动 | `docs/skills/` |

### Walkthrough: capturing your first decision
### 操作指南：捕获你的第一个决策

One command: `/kms:quickstart`. If `docs/{facts,decisions,guardrails,skills}/` doesn't exist yet, quickstart sets it up first. Then it asks one direct question: "What decision or plan is currently live for you right now?"
只需一个命令：`/kms:quickstart`。如果 `docs/{facts,decisions,guardrails,skills}/` 目录尚不存在，quickstart 会先进行初始化。然后它会直接问你一个问题：“你目前正在执行的决策或计划是什么？”

Say you're picking an auth provider. Quickstart interviews you — what you're choosing, why, what would make this wrong — then writes the result to `docs/decisions/0001-auth-provider-choice.md`.
假设你正在选择身份验证提供商。Quickstart 会采访你——你选择了什么、为什么选择它、什么情况下这个选择会出错——然后将结果写入 `docs/decisions/0001-auth-provider-choice.md`。

Nothing gets summarized or paraphrased away — that's your call, captured once, in your own words. The session closes by naming what to run next, not leaving you to guess: query to pull this decision back up later with a citation, capture after the next session that touches it.
没有任何内容会被总结或改写——这是你的决定，一次性以你自己的话语记录下来。会话结束时，它会指明下一步该运行什么，而不是让你去猜：使用 `query` 可以在以后带引用地调出这个决策，在下一次涉及该决策的会话后使用 `capture` 进行记录。

From that point on, Claude Code reads that file the next time it opens the repo and knows exactly what was decided. Codex reads the same skill set through its own plugin manifest. Kilo Code CLI reads it too, once `kilo.jsonc` points at the published skills manifest.
从那时起，Claude Code 下次打开仓库时就会读取该文件，并准确知道已经做出了什么决定。Codex 通过自己的插件清单读取同样的技能集。Kilo Code CLI 也可以读取它，只要 `kilo.jsonc` 指向已发布的技能清单即可。

### Beyond decisions
### 超越决策

Facts and guardrails link back to why they exist, not just what they say. Say you decide Medium posts close with an install CTA, Dev.to posts close with a GitHub-stars ask. That's a decision. The guardrail that enforces it on every article cites that decision by id. A skill that tells you how to adapt a draft per platform references the guardrail. Change the decision later, and capture/lint catch the guardrail and skill silently drifting out of sync with it — instead of you finding out three articles later.
事实和护栏不仅说明了它们是什么，还关联到了它们存在的原因。假设你决定 Medium 文章结尾要放安装引导（CTA），而 Dev.to 文章结尾要放 GitHub 星标请求。这是一个决策。在每篇文章中强制执行此操作的护栏会通过 ID 引用该决策。告诉如何根据平台调整草稿的技能则会引用该护栏。如果你以后更改了决策，`capture`/`lint` 会捕捉到护栏和技能与决策不同步的情况，而不是等到写了三篇文章后才发现。

### Commands worth knowing:
### 值得了解的命令：

*   **query** — retrieve a past decision with a citation, instead of re-explaining it.
*   **capture** — log what a work session changed, after the fact; flags contradictions it finds along the way.
*   **lint** — validate the whole knowledge base on demand: dangling references, missing fields, stale derived artifacts.
*   **brainstorm** — generate fresh approaches with no anchor to past decisions, for exploring before anything's locked in.
*   **onboard** — a role-tailored, 5-day ramp-up plan for a new teammate, built from the existing knowledge base.
*   **conform** — check whether a pending change respects the guardrails before it lands.

*   **query** — 带引用地检索过去的决策，无需重新解释。
*   **capture** — 事后记录工作会话的变更；并标记过程中发现的矛盾之处。
*   **lint** — 按需验证整个知识库：检查悬空引用、缺失字段、过期的派生工件。
*   **brainstorm** — 生成不受过去决策束缚的新方案，用于在确定任何事情之前的探索。
*   **onboard** — 为新队友制定的、基于现有知识库的 5 天角色化入职计划。
*   **conform** — 在提交变更前，检查待处理的变更是否符合护栏要求。

### What this doesn't solve
### 它不能解决什么

It's not magic memory — you still write the interview answers yourself; quickstart just makes sure they get written down instead of staying in your head. It doesn't replace tests, code review, or actual documentation for end users. And it only helps if the habit sticks — a knowledge base nobody updates after month one is just a `docs/` folder with extra steps.
这不是魔法记忆——你仍然需要自己写出采访答案；quickstart 只是确保它们被记录下来，而不是留在你的脑海里。它不能取代测试、代码审查或最终用户的实际文档。而且只有养成习惯才有效——如果一个月后就没人更新，那这个知识库就只是一个多此一举的 `docs/` 文件夹。

### Why this beats a context file you paste in
### 为什么它比你粘贴的上下文文件更好

I've tried system prompts, paste-in context files, separate note-taking apps I'd open in another window. They all fail the same way: they live outside the repo, so they don't survive a fresh session, and they rely on you remembering to open them, paste them in, and keep them updated. This is different because it's part of the repository — every decision is version-controlled, every fact is verified, and a guardrail is derived from a real commitment instead of vibes.
我尝试过系统提示词、粘贴上下文文件、在另一个窗口打开独立的笔记应用。它们都以同样的方式失败了：它们存在于仓库之外，因此无法在新的会话中存续，并且依赖于你记得去打开、粘贴并保持更新。这个方案不同，因为它本身就是仓库的一部分——每一个决策都经过版本控制，每一个事实都经过验证，护栏源于真实的承诺，而不是凭感觉。

### Try it
### 试一试

If this is useful to you, a star helps other developers find it: ⭐ Star [vivantel/kms](https://github.com/vivantel/kms) on GitHub. Then install the plugin and run `/kms:quickstart` on one real decision that's been living in your head. You'll never explain it twice.
如果这对你有用，点个星标可以帮助其他开发者找到它：⭐ 在 GitHub 上为 [vivantel/kms](https://github.com/vivantel/kms) 点星。然后安装插件，并针对你脑海中一直存在的一个真实决策运行 `/kms:quickstart`。你再也不用解释第二次了。