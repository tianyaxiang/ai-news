---
title: "The Power BI Developer's Survival Guide to Microsoft Fabric"
originalUrl: "https://towardsdatascience.com/the-power-bi-developers-survival-guide-to-microsoft-fabric/"
date: "2026-09-04T23:15:35.002Z"
---

# The Power BI Developer's Survival Guide to Microsoft Fabric
# Power BI 开发者的 Microsoft Fabric 生存指南

I’ve been talking to a lot of Power BI developers in the last 12 months who are truly anxious about Fabric. Truth to be said, the messaging from Microsoft has been hype-heavy, and the community has been moving fast. And every time you open LinkedIn or Reddit, somebody is announcing a new Fabric feature you’ve never heard of, with a screenshot of a Lakehouse you don’t understand, talking about MLVs and Direct Lake on OneLake and Fabric IQ as if everyone already knows what those things are.

在过去的 12 个月里，我与许多 Power BI 开发者交流过，他们对 Fabric 感到非常焦虑。老实说，微软的宣传充满了炒作，社区的发展速度也极快。每当你打开 LinkedIn 或 Reddit，总有人在宣布你从未听说过的 Fabric 新功能，配上一张你看不懂的 Lakehouse 截图，谈论着 MLV、OneLake 上的 Direct Lake 以及 Fabric IQ，就好像每个人都已经知道这些是什么一样。

I get it. It feels like the ground is shifting under your feet. So, the first thing I’m telling everyone (and all of you who have ever attended my trainings/live sessions already heard this from me): your Power BI skills are intact. Your reports still work. Your DAX matters more than ever. And you do not need to learn Spark this weekend.

我理解这种感觉。这就像脚下的土地正在发生位移。所以，我首先要告诉大家（所有参加过我培训或直播课程的人都已经听过我这么说了）：你们的 Power BI 技能依然有效。你们的报表依然可以正常工作。你们的 DAX 技能比以往任何时候都重要。而且，你这个周末根本不需要去学习 Spark。

What you DO need is a map. One that tells you what actually changed for YOU as a Power BI developer, what you can safely ignore for now, and where to start when you’re ready to take the next step. This article aims to be that map.

你真正需要的是一张地图。一张能告诉你作为 Power BI 开发者，哪些东西真正发生了变化，哪些东西目前可以暂时忽略，以及当你准备好迈出下一步时该从哪里开始的地图。本文旨在成为这样一张地图。

### What didn’t change (start here and breathe)
### 哪些没有改变（从这里开始，深呼吸）

Before we talk about anything new, let me confirm what’s still exactly the same. Because in all the noise about Fabric, this part sometimes gets overlooked.

在讨论任何新事物之前，让我先确认一下哪些东西完全没变。因为在关于 Fabric 的各种喧嚣中，这一点有时会被忽视。

Power BI’s authoring experience is still the same. Whether you build models and reports in Power BI Desktop or in the browser using web modeling (which is now essentially at parity with Desktop), the workflow you know hasn’t changed. You still load data, build a model, write DAX, design a report, and publish. Same skills, same patterns.

Power BI 的创作体验依然如故。无论你是在 Power BI Desktop 中构建模型和报表，还是在浏览器中使用 Web 建模（现在已基本与 Desktop 持平），你所熟悉的流程都没有改变。你依然需要加载数据、构建模型、编写 DAX、设计报表并发布。同样的技能，同样的模式。

DAX is still “the language” for semantic models, and it’s not going anywhere. If anything, it’s MORE important now — Copilot generates DAX, Direct Lake queries run on DAX, and every new AI feature in Fabric depends on well-written measures. The better your DAX, the better everything downstream works.

DAX 依然是语义模型的“核心语言”，而且它不会消失。甚至可以说，它现在变得更加重要了——Copilot 生成 DAX，Direct Lake 查询基于 DAX 运行，Fabric 中的每一项新 AI 功能都依赖于编写良好的度量值。你的 DAX 水平越高，下游的一切工作就越顺畅。

Power Query and the M language still handle data transformation across Desktop, web modeling, and Dataflows. And, although the old Dataflows Gen1 will be officially deprecated, the Gen2 version is here to stay, and it relies on Power Query/M skills. Your existing knowledge of Power Query patterns — merging, appending, conditional columns, parameters — all still applies.

Power Query 和 M 语言依然负责处理 Desktop、Web 建模和数据流（Dataflows）中的数据转换。虽然旧版的 Dataflows Gen1 将被正式弃用，但 Gen2 版本将长期存在，并且它依然依赖于 Power Query/M 技能。你现有的 Power Query 模式知识——合并、追加、条件列、参数——依然完全适用。

Semantic models are still the same thing. Same VertiPaq columnar storage, same relationships, same calculated columns, same measures, same Best Practice Analyzer rules…

语义模型依然是原来的样子。同样的 VertiPaq 列式存储，同样的关系，同样的计算列，同样的度量值，同样的最佳实践分析器（Best Practice Analyzer）规则……

The Power BI service is now part of the Fabric portal, but if you log in tomorrow morning, you’ll find the same workspaces, the same reports, the same scheduled refreshes, the same Apps experience. Even the URL didn’t change.

Power BI 服务现在是 Fabric 门户的一部分，但如果你明天早上登录，你会发现同样的工作区、同样的报表、同样的计划刷新、同样的 App 体验。甚至连 URL 都没有变。

Import mode and DirectQuery still work exactly as they did before. You don’t HAVE to use Direct Lake. If your reports run fine on Import mode with a daily refresh, that’s a perfectly valid architecture in 2026.

导入模式（Import mode）和 DirectQuery 的工作方式与以前完全一样。你并不“必须”使用 Direct Lake。如果你的报表在导入模式下配合每日刷新运行良好，那么在 2026 年，这依然是一个完全有效的架构。

Row-level security, deployment pipelines, gateways, Apps — all still there. Nothing was removed.

行级安全性（RLS）、部署流水线、网关、App——所有这些都还在。没有任何东西被移除。

OK, so your foundation is solid. But some things DID change, and a few of them actually matter to you. Let me walk you through the ones that are worth your time.

好了，你的基础很稳固。但确实有些东西变了，其中一些对你来说确实很重要。让我带你了解一下那些值得你关注的变化。

### What changed and actually matters to you
### 哪些发生了变化且对你真正重要

I’ve identified five things. If you understand these five changes, you understand 90% of what’s different about being a Power BI developer in Fabric.

我总结了五点。如果你理解了这五个变化，你就理解了作为 Fabric 环境下的 Power BI 开发者，90% 的不同之处。

#### 1. Your license changed (and it’s fine)
#### 1. 你的许可证变了（没关系）

In January 2025, Microsoft retired the Power BI Premium P SKUs. If your organization was running on Premium — P1, P2, P3 — your environment has already been moved to Fabric capacity (F SKUs). P1 is roughly equivalent to F64. P2 is roughly F128, and so on.

2025 年 1 月，微软停用了 Power BI Premium P SKU。如果你的组织之前使用的是 Premium（P1、P2、P3），那么你的环境已经被迁移到了 Fabric 容量（F SKU）。P1 大致相当于 F64，P2 大致相当于 F128，以此类推。

The key thing to remember is that nothing broke during that transition. Reports work, semantic models work, paginated reports work, scheduled refreshes work… Your existing investment is preserved.

需要记住的关键点是，在迁移过程中没有任何东西损坏。报表可以运行，语义模型可以运行，分页报表可以运行，计划刷新可以运行……你现有的投资得到了保留。

What you GAINED was access to the full Fabric platform under the same license — Lakehouses, Warehouses, pipelines, Real-Time Intelligence, all of it. You don’t have to use them, but they’re sitting there, included, ready when you want them.

你“获得”的是在同一许可证下访问整个 Fabric 平台的能力——Lakehouse、Warehouse、流水线、实时智能（Real-Time Intelligence）等等。你不一定要使用它们，但它们就在那里，包含在内，随时等你使用。

One thing to keep in mind: below F64, report consumers still need Power BI Pro licenses to view content. At F64 and above, viewer access is included in the capacity license, which is why F64 is the commercial threshold most organizations target if they have more than 300 report consumers.

需要记住的一点是：在 F64 以下，报表查看者仍需要 Power BI Pro 许可证才能查看内容。在 F64 及以上级别，查看者权限已包含在容量许可证中，这就是为什么如果组织拥有超过 300 名报表查看者，F64 是大多数组织瞄准的商业门槛。

#### 2. OneLake exists, and your data lives there now
#### 2. OneLake 出现了，你的数据现在存放在那里

OneLake is the unified storage layer for everything in Fabric. Think of it as “OneDrive for data.” One lake. One location. One copy.

OneLake 是 Fabric 中所有内容的统一存储层。可以把它想象成“数据的 OneDrive”。一个湖，一个位置，一份副本。

When you create a Lakehouse, a Warehouse in Fabric, the data is stored in OneLake as Delta format — the open table format that’s become the industry standard for analytics. Your semantic models, Lakehouse tables, Warehouse tables, they all live in the same place underneath.

当你在 Fabric 中创建 Lakehouse 或 Warehouse 时，数据会以 Delta 格式存储在 OneLake 中——这是已成为分析行业标准的开放表格式。你的语义模型、Lakehouse 表、Warehouse 表，在底层都存放在同一个地方。

Why does this matter to you as a Power BI developer? Because of the next change…

为什么这对作为 Power BI 开发者的你很重要？因为接下来的这个变化……

#### 3. Direct Lake is a new storage mode option
#### 3. Direct Lake 是一种新的存储模式选项

You already know two storage modes: Import (load data into the model, refresh on a schedule) and DirectQuery (query the source live every time). Each has trade-offs you’ve probably learned the hard way: Import is fast but stale, DirectQuery is fresh but slow.

你已经了解两种存储模式：导入（将数据加载到模型中，按计划刷新）和 DirectQuery（每次都实时查询源数据）。每种模式都有你可能已经深有体会的权衡：导入模式速度快但数据有延迟，DirectQuery 数据实时但速度慢。

Direct Lake is a third option. It reads Delta tables directly from OneLake into memory — no scheduled refresh, no live query overhead. Fast queries AND fresh data. Direct Lake is the closest thing to “you can have both” that Power BI has ever offered.

Direct Lake 是第三种选择。它直接将 OneLake 中的 Delta 表读取到内存中——无需计划刷新，也没有实时查询的开销。既有快速的查询，又有实时的数据。Direct Lake 是 Power BI 迄今为止提供的最接近“鱼和熊掌兼得”的方案。

The key thing to bear in mind is that the experience of building reports doesn’t change. You still author DAX the same way, you still design visuals the same way. The mechanics underneath changed (your model is reading directly from Delta in OneLake instead of holding its own copy), but as a developer, the workflow looks the same.

需要记住的关键点是，构建报表的体验并没有改变。你依然以同样的方式编写 DAX，以同样的方式设计视觉对象。底层的机制变了（你的模型直接从 OneLake 的 Delta 读取数据，而不是持有自己的副本），但作为开发者，工作流程看起来是一样的。

When should you care about Direct Lake? If your semantic models are large (millions of rows, multi-GB models) and refresh times are painful, Direct Lake is worth investigating. If your models are small and refresh takes 30 seconds, Import mode is fine.

什么时候你应该关注 Direct Lake？如果你的语义模型很大（数百万行，多 GB 的模型）且刷新时间令人痛苦，那么 Direct Lake 就值得研究。如果你的模型很小，刷新只需 30 秒，那么导入模式就足够了。