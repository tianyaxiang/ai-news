---
title: "How AI is reshaping SaaS pricing, and why you're probably overpaying"
originalUrl: "https://dev.to/kawsarlog/how-ai-is-reshaping-saas-pricing-and-why-youre-probably-overpaying-1m30"
date: "2026-11-15T01:00:00.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# How AI is reshaping SaaS pricing, and why you're probably overpaying

At renewal, vendors raised prices by 20-37% while their own AI infrastructure costs fell 40-70%. Here's what's really going on, and how to prepare before your next contract arrives.

在续约时，供应商将价格提高了 20% 到 37%，而他们自身的 AI 基础设施成本却下降了 40% 到 70%。以下是真实情况，以及如何在下一份合同到来之前做好准备。

The renewal email lands, and the new figure is higher. Not slightly higher. High enough that someone on your team screenshots it and drops it in the group chat. The vendor's explanation is "AI enhancements included in your updated plan," with no list of what those enhancements are and no usage data showing you've benefited from any of them. All you get is a bigger invoice for a feature set you may never have opened.

续约邮件发来了，新的数字更高了。不是稍微高一点，而是高到团队里有人会截图发到群聊里。供应商的解释是“更新后的计划中包含了 AI 增强功能”，但没有列出这些增强功能具体是什么，也没有任何使用数据表明你从中受益。你得到的只是一张针对你可能从未打开过的功能集的更高额账单。

That's how the AI tax typically shows up. It doesn't appear as a separate line item. It comes bundled into a renewal that costs 20 to 37 percent more than last year, with no opt-out, no tiered alternative, and the unspoken warning that your legacy pricing tier is about to be retired.

这就是“AI 税”通常的表现形式。它不会作为单独的明细项出现，而是捆绑在比去年贵 20% 到 37% 的续约合同中，没有退出选项，没有分层替代方案，并且伴随着一个心照不宣的警告：你现有的旧版定价层级即将被淘汰。

The price is only part of what's frustrating. The timing matters too. Over the same period, the AI infrastructure behind those "enhancements" (the compute, tokens, and model inference) got 40 to 70 percent cheaper for vendors. Processing data through the OpenAI API fell from $0.03 per 1,000 tokens in 2024 to $0.002 in 2026, and H100 GPU hours became noticeably cheaper on the open market. Vendors' costs went down while your bill went up. That gap isn't a coincidence. It's margin expansion.

价格只是令人沮丧的一部分，时机也很重要。在同一时期，这些“增强功能”背后的 AI 基础设施（计算、Token 和模型推理）对供应商而言成本下降了 40% 到 70%。通过 OpenAI API 处理数据的成本从 2024 年的每 1,000 个 Token 0.03 美元下降到 2026 年的 0.002 美元，且 H100 GPU 的小时租用价格在公开市场上也明显降低。供应商的成本下降了，而你的账单却上涨了。这种差距并非巧合，而是利润空间的扩张。

Why per-seat pricing is falling apart. For two decades, enterprise software had one pricing unit: the seat. One user meant one license and one monthly fee. The math was simple, renewals were predictable, finance teams could forecast spend from headcount plans, and vendors grew ARR by growing seat counts. AI agents undermine every assumption behind that logic. Agents don't occupy seats. They consume compute cycles, API calls, tokens, and workflow executions. An agent that resolves 500 support tickets has no named user attached to it, so the seat count stays flat while the value delivered climbs. As one analyst put it, charging per seat for an AI-augmented workflow is like billing per driver on a highway used mostly by autonomous vehicles.

为什么“按席位定价”模式正在瓦解？二十年来，企业软件只有一个定价单位：席位。一个用户意味着一个许可证和一笔月费。计算很简单，续约是可预测的，财务团队可以根据人数计划预测支出，供应商通过增加席位数量来增长年度经常性收入（ARR）。AI 代理破坏了这一逻辑背后的所有假设。代理不占用席位，它们消耗的是计算周期、API 调用、Token 和工作流执行。一个解决了 500 个支持工单的代理没有关联的具名用户，因此席位数量保持不变，而交付的价值却在攀升。正如一位分析师所言，对 AI 增强的工作流按席位收费，就像在主要由自动驾驶汽车行驶的高速公路上按司机人数收费一样。

AI-native software companies grasped this from day one. According to Flexprice's 2026 research, 83 percent of AI-native SaaS companies already offer usage-based pricing. The legacy incumbents (Salesforce, Microsoft, Google, Atlassian) built their businesses on the seat model, and they now face an awkward shift: their AI features demand a very different cost structure, yet their installed base expects predictable subscription billing. Most chose not to redesign their pricing. They raised prices on the existing model and called it an AI upgrade.

AI 原生软件公司从第一天起就意识到了这一点。根据 Flexprice 2026 年的研究，83% 的 AI 原生 SaaS 公司已经提供基于使用量的定价。传统的行业巨头（Salesforce、Microsoft、Google、Atlassian）建立在席位模式之上，现在面临着尴尬的转变：它们的 AI 功能需要完全不同的成本结构，但其现有客户群却期望可预测的订阅计费。大多数公司选择不重新设计定价，而是直接在现有模式上提价，并将其称为 AI 升级。

Four tactics vendors use to raise your bill. Tropic's procurement team coined the term "AI Tax" and tracked it through real renewal data from its customers. The average AI-driven price increase at renewal runs 20 to 37 percent, compared with a typical annual SaaS uplift of 3 to 9 percent before AI. The difference between those two ranges is what's straining IT budgets right now. Four recurring patterns explain most of it: Forced SKU migration, Unbundling and rebundling, Credit obfuscation, and Conditional discounts.

供应商提高账单的四种策略。Tropic 的采购团队创造了“AI 税”一词，并通过其客户的真实续约数据进行了追踪。AI 驱动的平均续约价格涨幅为 20% 到 37%，而 AI 出现前典型的年度 SaaS 涨幅仅为 3% 到 9%。这两个区间之间的差异正是目前导致 IT 预算紧张的原因。四种反复出现的模式解释了大部分情况：强制 SKU 迁移、拆分与重组、积分混淆以及条件折扣。

Each of these works because switching friction is real. Migrating off a CRM or collaboration tool costs more in time and disruption than absorbing a 25 percent price increase, and vendors have built that knowledge into their renewal strategies.

这些策略之所以有效，是因为转换成本是真实存在的。从 CRM 或协作工具迁移出去所耗费的时间和造成的业务中断，远比接受 25% 的价格上涨代价更高，而供应商已将这一认知纳入了他们的续约策略中。

What's taking the place of per-seat pricing? The market isn't settling on higher per-seat prices as a permanent state. It's heading toward three distinct models, and knowing which one you're negotiating for changes what a good deal looks like. Usage-based pricing charges for consumption: tokens processed, API calls, queries run, documents handled. Outcome-based pricing charges per result: a resolved support ticket, a qualified lead, a reviewed contract. Hybrid pricing pairs a fixed base subscription with variable consumption or outcome add-ons.

什么将取代按席位定价？市场并没有将更高的席位价格视为永久状态。它正朝着三种不同的模式发展，了解你正在协商的是哪一种模式，将改变你对“划算交易”的定义。基于使用量的定价按消耗收费：处理的 Token、API 调用、运行的查询、处理的文档。基于结果的定价按成果收费：解决的支持工单、合格的潜在客户、审查的合同。混合定价则将固定的基础订阅与可变的使用量或结果附加组件结合在一起。