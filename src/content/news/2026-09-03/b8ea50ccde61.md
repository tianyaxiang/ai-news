---
title: "A website redesign above €5M revenue is not a design project. It is a migration with a committee attached."
originalUrl: "https://dev.to/413x/a-website-redesign-above-eu5m-revenue-is-not-a-design-project-it-is-a-migration-with-a-committee-41o9"
date: "2026-09-02T23:33:55.825Z"
---

# A website redesign above €5M revenue is not a design project. It is a migration with a committee attached.
# 营收超过 500 万欧元的网站改版不是设计项目，而是一场附带“委员会”的迁移工程。

Every redesign checklist on the internet is written for a company with one decision-maker. Pick a platform, agree a direction, build it, launch it. That checklist is fine, and it stops being fine somewhere around the point where the site is carrying real revenue.
互联网上所有的改版清单都是为只有一个决策者的公司编写的：选择平台、确定方向、构建、上线。这些清单在小规模项目上没问题，但一旦网站开始产生实际营收，它们就不再适用了。

What changes is not the design work. It is almost the same design work. What changes is that the site has become load-bearing — for organic pipeline, for integrations other teams depend on daily, for pages legal has opinions about — and a redesign of a load-bearing system is a migration, not a blank page. Most of the damage I have seen on projects this size came from treating it as the latter.
改变的不是设计工作，设计工作几乎是一样的。改变的是网站已经成为了“承重墙”——它支撑着自然流量渠道、其他团队日常依赖的集成系统，以及法务部门关注的页面。对一个承重系统进行改版，本质上是一场迁移，而不是在白纸上作画。我在这个规模的项目中看到的大多数损失，都源于将其误当作后者来处理。

The number that explains the whole problem: Forrester's 2024 State of Business Buying research puts the average B2B purchase decision at 13 internal stakeholders, with nearly 89% of those decisions crossing more than one department. A redesign at this revenue band is exactly that kind of decision, whether or not anyone has named it one.
解释这一问题的核心数据是：Forrester 2024 年的《商业采购现状》研究显示，平均每项 B2B 采购决策涉及 13 名内部利益相关者，且近 89% 的决策跨越了多个部门。在这个营收规模下，网站改版正是这样一种决策，无论是否有人明确将其定义为“决策”。

Nobody sends a memo announcing that the project now has a buying committee. It simply turns out, in week six, that the CMS choice needs IT sign-off, the cookie banner needs legal, and a regional office has been quietly assuming their pages are staying exactly as they are. That is the actual difference between a €2M redesign and a €5M+ one. The production work is nearly identical. The wrapper around it is a different project.
没有人会发备忘录宣布项目现在有了“采购委员会”。到了第六周，你才会发现 CMS 的选择需要 IT 部门签字，Cookie 横幅需要法务部门审核，而某个区域办公室一直默默认为他们的页面会保持原样。这就是 200 万欧元改版项目与 500 万欧元以上项目之间的真正区别。生产工作几乎完全相同，但其外围的复杂性却是另一个量级的项目。

Scope creep stops being annoying and starts being expensive: PMI's Pulse of the Profession research has repeatedly found scope creep affecting a large share of projects — 52% in its 2018 survey, up from 43% five years earlier. A redesign with a dozen stakeholders, each wanting one more thing, is the textbook case.
范围蔓延（Scope creep）不再仅仅是令人烦恼，而是变得昂贵：PMI 的《职业脉搏》研究反复发现，范围蔓延影响了很大一部分项目——2018 年的调查显示这一比例为 52%，比五年前上升了 43%。一个拥有十几个利益相关者、每个人都想“再加一点东西”的改版项目，就是教科书般的案例。

The instinct is to fix this with discipline during the project. That does not work, because the additions do not arrive as scope changes. They arrive as reasonable requests from people who were not in the scoping conversation and genuinely did not know it had happened. The fix is earlier and duller: decide before kickoff who is allowed to add scope. Not who is consulted, not who is copied — who can actually add. In practice that is one person, and naming them is a ten-minute conversation that saves a month.
人们的直觉是在项目过程中通过纪律来约束。但这行不通，因为这些新增需求并非以“范围变更”的形式出现，而是以合理请求的形式，来自那些未参与范围界定会议、且确实不知道会议内容的人。解决办法更早也更枯燥：在启动前确定谁有权增加范围。不是谁被咨询，也不是谁被抄送，而是谁真正有权增加。实际上，这个人只能是一个，确定这个人选只需十分钟的谈话，却能节省一个月的时间。

The same shape applies to approvals. A 2025 survey of 500 marketing and creative professionals found 74% say the approval process takes more effort than the creative work under review, and over 60% lose up to a full workday per week chasing approvals. On a five-approver project that does not divide, it compounds. One named approver per phase beats five people on a thread, every time.
审批流程也是如此。2025 年针对 500 名营销和创意专业人士的调查发现，74% 的人表示审批流程比创意工作本身更费力，超过 60% 的人每周要浪费整整一天的时间去催促审批。在一个有五名审批人的项目中，工作量不是被分担，而是被叠加。每个阶段指定一名审批人，永远比五个人在邮件线程里扯皮要高效得多。

Treat it as a migration and the technical list writes itself: Here is the part that is genuinely our problem as engineers rather than a governance abstraction. If the current site earns organic traffic, that traffic is an asset with a specific failure mode, and preserving it is a deliverable with an owner — a redirect map, a pre-launch crawl, metadata that survives the platform change. It is not a task you discover in launch week.
将其视为迁移，技术清单自然就出来了：这是作为工程师我们真正需要解决的问题，而不是治理层面的抽象概念。如果当前网站有自然流量，那么这些流量就是一种具有特定失效模式的资产，保护它是一项必须有负责人交付的任务——包括重定向映射、上线前的爬取、在平台变更中保留元数据等。这不是你在上线周才发现的任务。

I wrote up the mechanics of that separately in "redesigning a site without losing its SEO," because it is the single most common way a technically clean launch turns into a bad quarter. Then inventory what else the site is quietly load-bearing for. A CRM or ERP integration a sales team uses daily. An analytics setup finance forecasts against. Compliance pages nobody wants to accidentally drop. The reliable way to get this list is to audit it, not to ask whoever has been at the company longest to remember.
我曾在《如何在不损失 SEO 的情况下改版网站》一文中专门写过其中的机制，因为这是技术上完美的上线项目变成糟糕季度业绩的最常见原因。接着，盘点网站还默默承担了哪些功能：销售团队日常使用的 CRM 或 ERP 集成、财务部门用于预测的分析设置、没人希望意外丢失的合规页面。获取这份清单的可靠方法是进行审计，而不是去问公司里待得最久的人。

And three decisions are disproportionately expensive to reverse once the build starts: the platform choice, settled with IT in the room rather than discovered mid-build; the regional and language architecture, decided as structure before a single template exists, because retrofitting multilingual onto a single-language build is close to a second project; and accessibility, which is now a dated legal obligation across the EU rather than a nice-to-have.
有三个决策一旦开始构建，逆转成本极高：一是平台选择，必须在 IT 部门参与下确定，而不是在构建中途才发现问题；二是区域和语言架构，必须在第一个模板创建前作为结构确定下来，因为在单语言构建完成后再补加多语言支持，几乎等同于重做一遍项目；三是无障碍访问，这在欧盟现在是一项强制性的法律义务，而不再是“锦上添花”的功能。

Capture the baseline, or lose the argument you have not had yet: This is the cheapest item on the list and the most frequently skipped. A redesign at this size will be judged after launch, by people who were not in the room for the decisions, against numbers nobody wrote down beforehand. So write them down: organic sessions and conversions for the top fifty landing pages, conversion rate per template, average lead or order value, and current Core Web Vitals field data.
记录基准数据，否则你将输掉那场尚未发生的争论：这是清单中最便宜但最常被忽略的一项。这个规模的改版在上线后，会被那些未参与决策的人根据事先没人记录的数据来评判。所以，请记录下来：前 50 个着陆页的自然会话和转化数、每个模板的转化率、平均线索或订单价值，以及当前的 Core Web Vitals 现场数据。

Export it. Do not trust that the analytics property will still be comparable — a replatform frequently changes tracking, and a baseline you cannot reproduce after launch is not a baseline. The reason is not reporting hygiene. Every migration has a re-crawl dip. Without a recorded starting point, three weeks of entirely normal fluctuation reads to a committee as proof the project failed, and the reaction to that — reverting design decisions, second-guessing the redirect map — does far more damage than the dip. With a baseline, the same three weeks is a line on a chart visibly returning to where it started.
导出这些数据。不要相信分析工具的数据在改版后依然具有可比性——更换平台通常会改变追踪方式，如果上线后无法复现基准，那它就不是基准。原因不在于报告规范，而在于每次迁移都会有重新爬取的流量波动。如果没有记录的起点，三周完全正常的波动在委员会眼中就是项目失败的证据，而随之而来的反应——撤销设计决策、质疑重定向映射——造成的损害远比波动本身大得多。有了基准，同样的三周波动在图表上只是一条清晰地回归原点的曲线。

The second workstream nobody estimates: At this size the project acquires a parallel track that has nothing to do with design and is almost never in the original estimate. A vendor security questionnaire from IT. A data processing agreement and a records-of-processing update, particularly where forms, analytics or a CRM integration change. Cookie consent legal actually signs off on rather than a banner installed on launch day. Procurement onboarding, which at some companies is weeks before an invoice can be raised. Accessibility belongs here too, and it is dated: the European Accessibility Act has applied across all 27 member states since 28 June 2025. The most commonly missing piece on sites that otherwise meet the requirements is the published accessibility statement — which is a document, not code, and therefore nobody's ticket. None of this work is hard.
没人预估的第二条工作流：在这个规模下，项目会产生一条与设计无关且几乎从未出现在原始预算中的平行轨道。包括 IT 部门的供应商安全问卷、数据处理协议和处理记录更新（特别是涉及表单、分析或 CRM 集成变更时）、法务部门真正签字认可的 Cookie 同意机制（而不是上线当天随便装个横幅）、采购入驻流程（在某些公司，这可能需要数周才能开具发票）。无障碍访问也属于这一类，而且它有时效性：自 2025 年 6 月 28 日起，《欧洲无障碍法案》已在所有 27 个成员国生效。在其他方面都符合要求的网站上，最常缺失的部分是已发布的“无障碍声明”——这是一份文档，而不是代码，因此没人会把它当作任务处理。这些工作都不难。