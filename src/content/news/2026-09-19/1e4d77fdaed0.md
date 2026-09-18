---
title: "We Pinned Our Model Version to Stay Safe. The Provider Deprecated It Anyway."
originalUrl: "https://towardsdatascience.com/we-pinned-our-model-version-to-stay-safe-the-provider-deprecated-it-anyway/"
date: "2026-09-18T23:33:45.895Z"
---

# We Pinned Our Model Version to Stay Safe. The Provider Deprecated It Anyway.
# 我们锁定了模型版本以求稳妥，但服务商还是将其弃用了。

The email arrived on a Tuesday. A model we had been running in production for the better part of a year, pinned to a specific version on purpose, was being deprecated. We had a window to migrate. After that, the endpoint would start returning errors.
这封邮件是在一个周二送达的。我们已经在生产环境中运行了近一年的模型，为了稳妥起见，我们特意锁定了特定版本，但现在它被弃用了。我们获得了一个迁移窗口期，一旦过期，端点就会开始报错。

We had done everything the careful-engineering playbook tells you to do. We did not float on a latest alias that could change under us overnight. We pinned the exact model version, wrote it into config, and treated it like any other dependency we did not want moving without a review. The pin was supposed to be the safe choice.
我们遵循了严谨工程手册中的所有建议。我们没有使用随时可能在夜间发生变动的“最新（latest）”别名。我们锁定了确切的模型版本，将其写入配置，并像对待任何其他不经审查就不希望变动的依赖项一样对待它。锁定本应是安全的选择。

The deprecation notice made something clear that the pin had been quietly hiding: pinning a model version does not buy you immunity from change. It buys you a delay. The ground still moves. You just get to choose the Tuesday.
弃用通知揭示了一个被锁定操作悄悄掩盖的事实：锁定模型版本并不能让你免受变化的影响。它只是为你争取了时间。地基依然在移动，你只是获得了选择“周二”的权利。

That distinction is the most under-budgeted cost in production AI. Teams model their AI spend as inference: tokens in, tokens out, times price. They optimize the model choice, they optimize the prompt length, they argue about whether the cheaper model is good enough. Almost nobody has a line in the budget for the day the model changes and the whole system has to be proven correct again. I am going to call that line the re-qualification tax, and by the end of this piece I want you to have both a name for it and a way to plan around it.
这种区别是生产级 AI 中最被低估的成本。团队通常将 AI 开支建模为推理成本：输入 Token、输出 Token 乘以单价。他们优化模型选择，优化提示词长度，争论更便宜的模型是否足够好。但几乎没有人会在预算中为“模型变更且整个系统必须重新验证正确性”的那一天预留额度。我将这一项称为“重新认证税（re-qualification tax）”，在本文结束时，我希望你不仅能记住这个术语，还能掌握围绕它进行规划的方法。

### What pinning actually protects you from, and what it does not
### 锁定操作真正保护了你什么，以及它不能保护什么

Pinning a model version is genuinely good practice. It stops silent behavior drift, where a provider updates the weights behind an alias and your outputs shift without a single line of your code changing. If you have ever watched an eval score move for no reason you could find in your own commits, you already know why teams pin.
锁定模型版本确实是一个好习惯。它能阻止静默的行为漂移——即服务商在别名背后更新了权重，而你的代码一行未改，输出结果却发生了变化。如果你曾目睹评估分数在自己的提交记录中找不到任何原因地波动，你就明白团队为什么要进行锁定。

But a pin is a lock on your side of a door the provider also controls. Providers deprecate. In 2026 the cadence has if anything accelerated: new frontier models ship every few months, older ones get sunset, and several providers have retired models on short notice. Most teams are not running one model anyway. The current reality, borne out in engineering surveys through the year, is that production stacks keep several models in flight at once: a frontier model for hard reasoning, a cheaper model for routine calls, sometimes a self-hosted model for data that cannot leave the building. Every one of those is on its own deprecation clock.
但锁定只是在你这一侧锁上了一扇服务商也能控制的门。服务商会弃用模型。到了 2026 年，这种节奏甚至加快了：新的前沿模型每隔几个月就会发布，旧模型被淘汰，几家服务商甚至在短时间内就退役了模型。况且，大多数团队运行的都不止一个模型。工程调查显示，目前的现实是，生产技术栈中同时运行着多个模型：用于复杂推理的前沿模型、用于常规调用的廉价模型，有时还有用于敏感数据的自托管模型。每一个模型都有其各自的弃用倒计时。

So the pin does not remove the change. It converts an unpredictable change into a scheduled one. That is a real improvement, because a scheduled change is something you can staff and budget for. It is only a disaster when you treated the pin as permanence and put nothing in the plan for the day it expires.
因此，锁定并不能消除变化，它只是将不可预测的变化转化为计划内的变化。这确实是一种进步，因为计划内的变化意味着你可以安排人力和预算。只有当你把锁定视为永久，且在模型过期之日毫无准备时，它才会成为一场灾难。

### The thing everyone forgets to price: the model is not the only thing that changes
### 每个人都忘记计算的成本：变化的不仅仅是模型

Here is the part that makes re-qualification expensive rather than trivial. When you move from one model version to the next, the model is not a drop-in part. Almost everything you built on top of the old model was, whether you meant it to be or not, tuned to that model's specific behavior.
这就是让重新认证变得昂贵而非琐碎的原因。当你从一个模型版本迁移到下一个版本时，模型并不是一个可以即插即用的零件。你基于旧模型构建的一切，无论你是否有意为之，实际上都已经针对该模型的特定行为进行了调优。

Your prompts were tuned to it. The phrasing that reliably produced structured output on the old model may produce something subtly different on the new one. Your few-shot examples were calibrated to its quirks. Your guardrails were set against its failure modes. Your output parsers were hardened against the specific shapes it tended to return. Your temperature and your token budgets were chosen because they worked, on that model. Even your latency and cost assumptions were measured against it.
你的提示词是针对它调优的。在旧模型上能可靠生成结构化输出的措辞，在新模型上可能会产生微妙的差异。你的少样本（few-shot）示例是根据它的怪癖校准的。你的护栏（guardrails）是针对它的故障模式设置的。你的输出解析器是针对它倾向于返回的特定格式进行加固的。你的温度参数和 Token 预算是基于它能正常工作而选择的。甚至你的延迟和成本假设也是基于它来衡量的。

Change the model and every one of those assumptions is now unverified. Not necessarily wrong. Unverified. And in a system that a business actually depends on, unverified is the same as broken until you have proven otherwise, because you cannot tell a customer the reconciliation was probably right.
更换模型后，所有这些假设现在都处于“未验证”状态。不一定是错的，只是未验证。在一个业务真正依赖的系统中，未验证等同于损坏，直到你证明它没问题为止，因为你不能告诉客户“对账结果大概是对的”。

This is why "just point it at the new model" is the phrase that precedes most production incidents in this category. The swap itself is one line of config. The work is proving that the one line did not quietly change what your production agent actually does.
这就是为什么“直接指向新模型”这句话往往是此类生产事故的前奏。替换本身只是一行配置代码，但真正的工作在于证明这一行代码没有悄悄改变你的生产智能体（Agent）的实际行为。

### What a re-qualification cycle actually contains
### 重新认证周期实际上包含什么

I want to be precise about the anatomy here, because the anatomy is the actionable part. When the deprecation notice landed, this is the work that stood between us and a safe migration. Treat it as the checklist you run every time a model changes under a system that matters.
我想精确地描述这里的结构，因为结构是可操作的部分。当弃用通知下达时，以下工作就是我们与安全迁移之间的鸿沟。请将其视为每次在重要系统中更换模型时必须执行的检查清单。

*   **Re-run the golden eval set.** If you have been following this lane, you know I am a believer in a real eval harness. This is the moment it earns its cost. You take the fixed set of representative cases, with known-good outputs, that you use to measure the agent, and you run the new model against every one of them. Not a smoke test. The full suite. What you are looking for is not just the headline pass rate but the diff: which specific cases changed, and in which direction. A model can post the same aggregate score and get a completely different set of cases right and wrong. If you only look at the average, you will ship a regression that happens to be numerically invisible.
    **重新运行黄金评估集。** 如果你一直关注这个领域，就会知道我坚信需要一套真正的评估工具。现在就是它体现价值的时刻。你需要拿出一组固定的、具有代表性的案例（包含已知正确的输出），用来衡量智能体，并让新模型运行每一个案例。不是冒烟测试，而是全套测试。你要寻找的不仅仅是总通过率，而是差异：哪些具体案例发生了变化，以及向什么方向变化。一个模型可能在总分相同的情况下，对完全不同的一组案例判断对错。如果你只看平均分，你就会发布一个在数值上不可见但实际存在回归问题的版本。

*   **Behavioral diffing on real traffic.** The eval set is what you thought to test. Production traffic is what actually happens. Before you flip anything, you run the new model in shadow against a slice of real requests and diff its outputs against the current model. This is where you catch the failure modes you never wrote a test for, the long-tail inputs, the malformed documents, the edge cases that only your actual users generate.
    **真实流量的行为差异分析。** 评估集是你“认为”需要测试的内容，而生产流量才是“实际发生”的情况。在切换之前，你需要让新模型在影子模式下运行一部分真实请求，并将其输出与当前模型进行对比。在这里，你可以捕捉到那些你从未编写过测试用例的故障模式、长尾输入、格式错误的文档，以及只有真实用户才会产生的边缘情况。

*   **Prompt and few-shot regression.** Where behavior moved, you find out whether the fix is a prompt change. Often it is. But a prompt change is itself a change that has to be re-tested against the whole eval set, because the phrasing that fixes case 40 can break case 12. This step loops. It is the single most time-consuming part, and it is the part people underestimate the hardest.
    **提示词和少样本回归。** 当行为发生偏移时，你需要找出修复方法是否是修改提示词。通常确实如此。但修改提示词本身也是一种变更，必须针对整个评估集重新测试，因为修复了第 40 个案例的措辞可能会破坏第 12 个案例。这一步是循环往复的。这是最耗时的部分，也是人们最容易低估的部分。

*   **Guardrail and parser re-verification.** Your safety checks, your refusal handling...
    **护栏和解析器重新验证。** 你的安全检查、拒绝处理……