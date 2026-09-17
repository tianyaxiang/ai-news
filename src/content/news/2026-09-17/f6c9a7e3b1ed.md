---
title: "The Machine That Rejects Its Own Work"
originalUrl: "https://dev.to/iaflux_studio/the-machine-that-rejects-its-own-work-32o9"
date: "2026-09-17T00:08:05.609Z"
---

# The Machine That Rejects Its Own Work
# 一台会拒绝自己作品的机器

We gave a 69-agent system 35 minutes to work on the content of our own website. Sixteen texts reached the checks. The language check rejected 15 of them at the first pass, 94 percent. No human approved a text. That line reads like a story about AI writing content. It is not. It is about where the review sits.
我们给一个由 69 个智能体组成的系统 35 分钟时间，让其处理我们网站的内容。最终有 16 篇文本进入了审核阶段。语言检查在第一轮就拒绝了其中的 15 篇，拒绝率高达 94%。没有任何人工参与审批。这段话听起来像是关于 AI 撰写内容的报道，但事实并非如此。它探讨的是审核环节应该处于什么位置。

The setup: The system is a multi-agent architecture running in production at iaFlux Studio: specialized agents organized by domain, an orchestrator, and gates with the authority to block a delivery before it ships. The full architecture behind it, 181 agent roles, 19 domains, 22 blocking gates, is documented and released under CC BY 4.0 on GitHub: https://github.com/iaflux-studio/sistema-multi-agente
系统架构：该系统是一个在 iaFlux Studio 生产环境中运行的多智能体架构：由按领域组织的专业智能体、一个协调器以及拥有在交付前拦截内容的权限的“关卡”组成。其背后的完整架构（包含 181 个智能体角色、19 个领域、22 个拦截关卡）已记录并以 CC BY 4.0 协议在 GitHub 上发布：https://github.com/iaflux-studio/sistema-multi-agente

For this run, every text went through three independent checks before it could count as finished: an editorial reviewer, a claims verifier, and a compliance check. Each could reject on its own. None could overrule another's rejection.
在本次运行中，每篇文本在被视为完成之前，都必须通过三项独立检查：编辑审核、事实核查和合规性检查。每一项检查都可以独立行使否决权，且任何一项检查都无法推翻另一项的拒绝决定。

What was measured: 69 agents ran inside a 35-minute window. Total agent-work delivered: 229 minutes, compressed into those 35 minutes. At peak, 21 agents were active in the same minute. 66 deliveries were produced along the chain; 494,132 characters were written in total. 0 agents dropped or failed silently. Three were stopped by hand.
测量结果：69 个智能体在 35 分钟内完成了工作。总计交付了 229 分钟的智能体工作量，并压缩在这 35 分钟内完成。高峰期时，同一分钟内有 21 个智能体同时活跃。整个链条产生了 66 次交付，总计撰写了 494,132 个字符。没有智能体掉线或静默失败，有 3 个智能体被人工手动停止。

Of the 16 texts that reached the checks: the editorial check rejected 15 of 16 at the first pass, the claims check rejected 11 of 16, the compliance check gave a hard no to 4 of 16. Only one text passed at the first attempt. No human approved a text: every rejection happened inside the system, before anything reached a person.
在进入审核的 16 篇文本中：编辑审核在第一轮拒绝了 16 篇中的 15 篇，事实核查拒绝了 11 篇，合规性检查拒绝了 4 篇。只有一篇文本一次性通过。没有任何人工审批：所有的拒绝都发生在系统内部，在内容触达人类之前就已经完成。

Why this is the actual result: Most "AI writes content" demos measure output speed. This measures the opposite: how much of that output a system discards on its own, and on what grounds. A 94 percent rejection rate at the first pass is not a failure. It is what the gates are built to do. The alternative is a human catching those 15 texts after publication, which does not scale and leaves no audit trail.
为什么这是真实的结果：大多数“AI 撰写内容”的演示都在衡量输出速度。而我们衡量的是相反的东西：系统自身丢弃了多少输出内容，以及基于什么理由。第一轮 94% 的拒绝率并非失败，这正是这些“关卡”设计的初衷。如果不这样做，就只能由人类在发布后去发现那 15 篇错误文本，这不仅无法扩展，也无法留下审计追踪记录。

What this does not solve: The gates catch what they were written to catch. They do not replace domain judgment on edge cases, they add real latency and maintenance cost, and a gate is only as strict as the criteria someone wrote into it. This is one measured run, not a claim of zero errors. The rejection rate is measured on this one run, not continuously; that gap is declared in the public documentation.
这无法解决的问题：这些关卡只能拦截它们被设定要拦截的内容。它们无法取代人类在极端情况下的领域判断，它们会增加实际的延迟和维护成本，而且关卡的严格程度取决于编写其中的准则。这是一次测量运行，并不代表零错误。拒绝率仅基于本次运行测量，而非持续测量；这一局限性已在公开文档中声明。

Full breakdown of the three checks and the architecture behind them (Italian): https://www.iaflux.it/la-macchina-che-boccia-il-proprio-lavoro/
关于三项检查及其背后架构的完整分析（意大利语）：https://www.iaflux.it/la-macchina-che-boccia-il-proprio-lavoro/

Production systems built on this architecture, each with a named client and measured numbers: https://www.iaflux.it/portfolio/
基于此架构构建的生产系统，每个系统都有指定的客户和测量数据：https://www.iaflux.it/portfolio/

Antonio Santoro, iaFlux Studio
Antonio Santoro, iaFlux Studio