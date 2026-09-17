---
title: "Why i'm still bearish on LLMs after Navier-Stokes"
originalUrl: "https://dank.systems/posts/2026-09-15-ai-bear.html"
date: "2026-09-17T00:02:58.816Z"
---

# Why I'm still bearish on LLMs after Navier-Stokes

**Why I'm still bearish on LLMs after Navier-Stokes**

[感谢 Claude Fable 5.1、Holden Saberhagen、Gabriel Kammer、Andres Erbsen、Alice McKean 和 Tristan Wylde-Larue 对本文提出的意见] 我将以几个论点作为开篇，供读者思考：

The frontier labs are priced according to the narrative that they have produced or will in the very near future produce a fully automated drop-in replacement for most knowledge workers, but current frontier models need laborious oversight and guardrails on even the simplest tasks. One misled by the headline shows of force (Navier-Stokes, FreeBSD RCEs, the HuggingFace incident) and frontier lab rhetoric into believing meaningful autonomy has been achieved need only look at the software firms continuing to employ and hire bottom quartile software engineers who would score far below the models they supervise on the benchmarks du jour. 

前沿实验室的估值基于这样一种叙事：他们已经或即将在不久的将来生产出一种完全自动化的、可直接替代大多数知识工作者的产品。然而，当前的前沿模型即使在最简单的任务上也需要繁琐的监督和护栏。那些被头条新闻中的“秀肌肉”行为（如 Navier-Stokes 证明、FreeBSD 远程代码执行漏洞、HuggingFace 事件）以及前沿实验室的言论所误导，从而相信模型已实现有意义自主权的人，只需看看那些软件公司就明白了——这些公司仍在雇佣和聘用那些在当前基准测试中得分远低于其所监督模型的底层软件工程师。

The models generalize well only on tasks within a small neighborhood of the specific tasks they've been trained on, and even then with severe caveats. The frontier labs have developed a general recipe to teach models almost any specific task enjoying clearly defined levels of task performance; many tasks are covered in the training data; but even small perturbations within a covered class of task result in outright failure or reward hacking.

这些模型仅在它们所训练的特定任务的小范围内表现出良好的泛化能力，即便如此，也存在严重的局限性。前沿实验室已经开发出一种通用方法，可以教会模型几乎任何具有明确性能指标的特定任务；许多任务都被涵盖在训练数据中；但即使在已覆盖的任务类别中进行微小的扰动，也会导致彻底的失败或奖励作弊（reward hacking）。

The present problem of reward hacking can be solved only by rigorous specification by domain experts. The time of domain experts is expensive. Rigorous specification is itself a skill, demanding its own expertise outside of a given problem domain. Even many skilled software engineers are bad at it. For the vast majority of domains, the intersection of domain experts and specification experts is ludicrously small.

目前奖励作弊的问题只能通过领域专家进行严格的规范说明来解决。领域专家的时间非常昂贵。严格的规范说明本身就是一种技能，需要在特定问题领域之外具备专门的专业知识。即使是许多熟练的软件工程师也不擅长此道。对于绝大多数领域而言，领域专家与规范说明专家之间的交集小得离谱。

The labor costs of rigorous specification can greatly exceed that of direct implementation of an informal specification. The hardware engineering world presents a great case study on this, where a typical CPU project anecdotally has about three times as many specification and validation engineers as design engineers and a 5:1 ratio is not unheard of. Even worse, many tasks don't admit a convenient spec-and-forget regime where you write a specification once and continuously implement against it: rigorous formal specifications frequently evolve in conversation with insights derived from discoveries made while implementing according to the informal specification. 

严格规范说明的人力成本可能远超直接实现非正式规范的成本。硬件工程领域就是一个很好的案例研究：一个典型的 CPU 项目中，规范和验证工程师的数量通常是设计工程师的三倍左右，5:1 的比例也并不罕见。更糟糕的是，许多任务并不支持“写完规范就忘”的模式，即写一次规范后就持续对照实现：严格的形式化规范往往是在根据非正式规范进行实现时，通过不断发现新见解而演进的。

For tasks that enjoy high level one-and-done specifications (say an executable ISA specification for a family of CPU architectures) the costs of verification against such high level specifications are insurmountable with current technology, necessitating the use of lower level specifications that are both more expensive to construct and far more fragile to design flux.

对于那些能够实现“一次性”高级规范的任务（例如 CPU 架构系列的指令集架构 ISA 可执行规范），以当前技术验证这些高级规范的成本是无法逾越的，这迫使人们不得不使用更低级的规范，而这些规范不仅构建成本更高，而且在设计变动时也更加脆弱。

Navier-Stokes and statements in pure mathematics like it are the absolute best-case scenario for agentic work against rigorous specification. The theorem statement itself is already a rigorous specification. It has undergone decades of auditing by the mathematical community and its rendering in Lean is a straightforward translation defined in terms of battle-tested mathematical objects from mathlib. The verifier, the Lean theorem prover, has been extensively audited and specifically designed to avoid the types of unsoundness that would make it vulnerable to reward hacks. 

Navier-Stokes 以及类似的纯数学命题，是智能体在严格规范下工作的绝对最佳场景。定理陈述本身就是一种严格的规范。它已经过数学界数十年的审计，其在 Lean 中的呈现是基于 mathlib 中久经考验的数学对象进行的直接翻译。验证器（Lean 定理证明器）经过了广泛的审计，并经过专门设计，以避免那些使其容易受到奖励作弊攻击的不健全性。

Even Lean and theorem provers like it are not invulnerable: soundness bugs have allowed LLMs to launder bogus proofs through the proof kernel before and it is not improbable that more such bugs exist. This is the rosiest setup; the vast majority of human knowledge work does not look like this. I'll comment below on the few areas of knowledge work that do resemble pure mathematics in this respect. 

即使是 Lean 和类似的定理证明器也不是无懈可击的：健全性漏洞曾允许 LLM 通过证明内核“洗白”伪造的证明，而且不排除存在更多此类漏洞的可能性。这是最乐观的情况；绝大多数人类知识工作并非如此。我将在下文评论少数在这一方面类似于纯数学的知识工作领域。

The best alternative to rigorous specification is human review. Human review doesn't scale well to the volumes of output produced by language models. To make matters worse, even expert human review is extremely vulnerable to reward hacking: consider the xz backdoor and the infamous UMN hypocrite commits that landed in Linux. If human review remains a critical part of the agentic production loop, the pace of production is necessarily bottlenecked by factors like the limits of human time and attention; it is a total non-starter for the country full of geniuses in a datacenter frontier lab CEOs would have you believe is perpetually just a few more months out.

替代严格规范的最佳方案是人工审核。人工审核无法很好地扩展以应对语言模型产生的大量输出。更糟糕的是，即使是专家级的人工审核也极易受到奖励作弊的影响：想想 xz 后门事件和臭名昭著的 UMN 伪善提交（hypocrite commits）进入 Linux 内核的案例。如果人工审核仍然是智能体生产循环的关键部分，那么生产速度必然会受到人类时间和注意力限制等因素的瓶颈制约；对于前沿实验室 CEO 们试图让你相信的那个“永远只差几个月”的、充满天才的数据中心愿景来说，这完全是行不通的。

Taken together, it appears that for most domains LLMs will continue to look like a cracked intern: quick and effective in the hands of an adult but not given run of the place. Most firms will not be able to adopt fully autonomous AI, not for problems of skill issue or lagging technology diffusion but rather for structural reasons seemingly endemic to current architectures. 

总而言之，对于大多数领域而言，LLM 看起来仍将像一个“破解版实习生”：在成年人手中快速且有效，但不能被赋予完全的掌控权。大多数公司将无法采用完全自主的 AI，这并非因为技能问题或技术扩散滞后，而是因为当前架构中似乎固有的结构性原因。

The classes of firms that can accept the use of fully autonomous LLMs are few, by my count just three:
1. Those who can accept failure cheaply: firms that would otherwise hire interns, firms involved in rapid prototyping work, etc.
2. Those who need done a small set of narrowly defined tasks with existing clear guardrails: repetitive physical labor in a controlled environment, call center and customer service chat work, etc.
3. Those that can accept or already do by nature the costs of rigorous specification and validation: chip design, drug discovery, and other domains where failure on deployment is an existential concern.

在我看来，能够接受使用完全自主 LLM 的公司类别很少，只有三类：
1. 能够低成本接受失败的公司：原本会雇佣实习生的公司、从事快速原型设计的公司等。
2. 需要完成一组定义狭窄且已有明确护栏的任务的公司：受控环境下的重复性体力劳动、呼叫中心和客户服务聊天工作等。
3. 能够接受或天生就需要承担严格规范和验证成本的公司：芯片设计、药物研发以及其他部署失败会导致生存危机的领域。

The first two classes are price sensitive and arguably don't need the jump in reasoning quality you see going from cheap to frontier models. Most of these firms will be best served by open models running on cheap hardware, perhaps even locally at the site of use. For the first and third classes, the type of fuzzy combinatorial search that has produced headline results in mathematics and securit...

前两类公司对价格敏感，可以说并不需要从廉价模型升级到前沿模型所带来的推理质量提升。对于这些公司中的大多数，运行在廉价硬件上的开源模型（甚至是在使用现场本地运行的模型）才是最佳选择。对于第一类和第三类公司，那种在数学和安全领域产生头条新闻结果的模糊组合搜索……