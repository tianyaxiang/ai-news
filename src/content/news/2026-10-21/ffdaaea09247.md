---
title: "Cerbere-AG -- The layer that ensures security, observability, and control, which sits between the AI agent and the real world"
originalUrl: "https://dev.to/christopher_dikesa/cerbere-ag-the-layer-that-ensures-security-observability-and-control-which-sits-between-the-33le"
date: "2026-10-20T23:43:32.000Z"
excerpt: false
---

# Cerbere-AG -- The layer that ensures security, observability, and control, which sits between the AI agent and the real world

Cerbere-AG is a three-layer security guardrail for AI agents: Regex, ML, and an LLM Judge. AI agents are unpredictable. They improvise and act with full autonomy. I built Cerbere-AG (named after the three-headed dog, Cerberus) so that autonomy doesn’t come at the cost of control.

Cerbere-AG 是一个针对 AI 智能体的三层安全护栏：正则表达式（Regex）、机器学习（ML）和大模型判别器（LLM Judge）。AI 智能体具有不可预测性，它们会即兴发挥并完全自主地行动。我构建 Cerbere-AG（以三头犬刻耳柏洛斯命名）是为了确保自主性不会以牺牲控制权为代价。

Why three layers? Our benchmarks show it: → Regex alone lets more than 30% of attacks through. → ML pushes recall up to 100% in some of our tests, but raises false positives. → The LLM Judge resolves the ambiguous cases ML can’t classify. It also looks at context.

为什么要设置三层？我们的基准测试显示：→ 仅使用正则表达式会放行超过 30% 的攻击。→ 机器学习在某些测试中将召回率提高到了 100%，但增加了误报率。→ 大模型判别器则解决了机器学习无法分类的模糊案例，它还会考量上下文。

Cerbere-AG follows tool calls, checks whether they’re legitimate, and then allows them, blocks them, or flags them for real-time human approval. Agents keep their autonomy, and humans keep control. Everything is audited too. The collector gathers spans and traces into an audit trail that is independent from the agent and supports compliance.

Cerbere-AG 会追踪工具调用，检查其是否合法，然后决定是允许、拦截还是标记以供人工实时审批。智能体保持了自主性，而人类保持了控制权。所有操作也都经过审计。收集器将跨度（spans）和追踪（traces）汇总成审计追踪，该追踪独立于智能体之外，并支持合规性要求。

And like any tool, it has limits. That’s why observability matters: security isn’t only about blocking attacks, it’s about understanding what happened, what was allowed, what was blocked, and why. Open source and free for now. Try it and give me your honest feedback 👇 https://github.com/chrismsmr-celcom/cerbere-AG https://app.cerbereag.site

和任何工具一样，它也有局限性。这就是可观测性至关重要的原因：安全不仅仅是拦截攻击，更是要理解发生了什么、什么被允许、什么被拦截，以及原因何在。目前开源且免费。欢迎试用并给我真实的反馈 👇 https://github.com/chrismsmr-celcom/cerbere-AG https://app.cerbereag.site

Create template Templates let you quickly answer FAQs or store snippets for re-use. Submit Preview Dismiss Are you sure you want to hide this comment? It will become hidden in your post, but will still be visible via the comment's permalink. Hide child comments as well Confirm For further actions, you may consider blocking this person and/or reporting abuse

创建模板：模板让您可以快速回答常见问题或存储片段以供重复使用。提交 预览 取消。您确定要隐藏此评论吗？它将在您的帖子中被隐藏，但仍可通过评论的永久链接查看。同时隐藏子评论。确认。如需进一步操作，您可以考虑屏蔽此人或举报滥用行为。