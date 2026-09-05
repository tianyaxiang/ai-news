---
title: "AI handles incidents, engineers lose touch with their systems"
originalUrl: "https://www.sylvainkalache.com/blog/ai-handles-incidents-engineers-lose-touch-with-their-systems"
date: "2026-09-05T22:59:06.732Z"
---

# AI handles incidents, engineers lose touch with their systems
# AI 处理故障，工程师却与系统渐行渐远

Back when I was an SRE at LinkedIn in 2012, I designed a system that could heal itself and learn from previous incidents. AI capabilities were nowhere near what we have today, and that remained a prototype, but this is now a reality. These tools do it all: inspect alerts, form hypotheses, query telemetry, correlate recent deployments, and even implement the fix themselves. As much as I love to see it, I have a major concern: we are losing touch with our systems. The better these tools become at resolving routine incidents, the less practice human responders will get. And when an ambiguous, high-severity incident comes in that automation cannot solve, responding engineers will be in trouble.

2012 年，当我在 LinkedIn 担任 SRE 时，我曾设计过一个能够自我修复并从过往故障中学习的系统。当时的 AI 能力远不及今天，那个项目最终只停留在原型阶段，但如今这一切已成为现实。现在的工具无所不能：检查警报、形成假设、查询遥测数据、关联近期部署，甚至能自动执行修复。尽管我乐见其成，但我有一个重大担忧：我们正在与自己的系统失去联系。这些工具在解决常规故障方面表现得越好，人类响应者获得的实践机会就越少。一旦出现自动化无法解决的复杂高危故障，负责响应的工程师们将陷入困境。

### Automation leaves humans with the hardest incidents
### 自动化将最棘手的故障留给了人类

These AI-assisted incident response tools, more commonly called “AI SREs” – a term I don’t particularly like – are fantastic in many ways. They feel especially magical when they handle a routine incident at night and you don’t have to wake up for a capacity issue. The problem is that routine incidents are also how responders “safely” develop an intuition for how their systems behave and fail. When AI runs into a hard, never-seen-before incident it cannot solve, engineers will have to take over with less practice than they would have had before.

这些 AI 辅助故障响应工具（通常被称为“AI SRE”——我不太喜欢这个术语）在许多方面都很出色。当它们在深夜处理常规故障，让你不必为了容量问题而起床时，感觉确实非常神奇。但问题在于，常规故障也是响应者“安全地”培养对系统行为和故障模式直觉的方式。当 AI 遇到无法解决的、前所未见的复杂故障时，工程师们将不得不接手，而此时他们所拥有的实践经验却比以往更少。

Human-factors researcher Lisanne Bainbridge described this paradox in her famous 1983 paper, *The Ironies of Automation*. She explained that automation reduces operators’ opportunities to practice routine work while leaving them responsible for new and abnormal situations. She argues that, therefore, operators need to be more skilled and receive even more training than before automation. In the years to come, I predict that the average MTTR for most incidents will go down – thanks to AI-assisted incident response – but that the resolution time will shoot up for complex incidents because incident responders lost touch with their system and are struggling to investigate.

人因研究员 Lisanne Bainbridge 在她 1983 年著名的论文《自动化的讽刺》（*The Ironies of Automation*）中描述了这一悖论。她解释说，自动化减少了操作员练习常规工作的机会，却让他们负责处理新的和异常的情况。因此，她认为操作员需要比自动化之前具备更精湛的技能，并接受更多的培训。我预测，在未来的几年里，得益于 AI 辅助故障响应，大多数故障的平均修复时间（MTTR）将会下降，但复杂故障的解决时间却会飙升，因为响应者已经与系统脱节，在调查时会感到力不从心。

### Aviation trains pilots for rare failures
### 航空业如何培训飞行员应对罕见故障

We can look at the aviation industry for inspiration. Plane automation handles much of the flying, but pilots remain responsible for situations that automation cannot manage: engine failures, unreliable instruments, rejected takeoffs, stalls, and other abnormal conditions. These events are extremely rare. Modern turbine engines, for example, experience fewer than one in-flight shutdown per 100,000 engine flight hours. In other words, that is rare enough that a commercial pilot may complete an entire career without experiencing one outside a simulator.

我们可以从航空业中寻找灵感。飞机的自动化系统处理了大部分飞行工作，但飞行员仍需负责处理自动化无法应对的情况：引擎故障、仪表失灵、中断起飞、失速以及其他异常状况。这些事件极其罕见。例如，现代涡轮引擎每 10 万飞行小时的空中停车次数不到一次。换句话说，这种情况非常罕见，以至于一名商业飞行员可能整个职业生涯都不会在模拟器之外遇到一次。

But when a failure occurs, pilots must react quickly and correctly. For example, on TransAsia Airways Flight 235, the right engine’s propeller autofeathered shortly after takeoff. And while the aircraft was designed to continue flying on its left engine, the crew misidentified the problem. The aircraft stalled and crashed only 117 seconds after the first warning. Airline pilots regularly return to simulators to rehearse rare emergencies. Under US FAA rules, captains must complete recurrent training or a proficiency check every six months, including scenarios such as an engine failure during takeoff. While most software incidents do not threaten lives, that is no reason not to perfect our craft.

但当故障发生时，飞行员必须迅速且正确地做出反应。例如，复兴航空 235 号班机在起飞后不久，右侧引擎螺旋桨自动顺桨。尽管飞机设计上允许仅靠左侧引擎继续飞行，但机组人员误判了问题。飞机在第一次警告发出后仅 117 秒就失速坠毁。航空公司飞行员会定期回到模拟器中演练罕见的紧急情况。根据美国联邦航空管理局（FAA）的规定，机长必须每六个月完成一次复训或能力检查，其中包括起飞时引擎故障等场景。虽然大多数软件故障不会威胁生命，但这并不是我们不精益求精的理由。

### The software industry needs incident simulators
### 软件行业需要故障模拟器

Turns out the technology that created the issue can also help close it. At Rootly, an incident management company where I work, we partnered with Uptime Labs to apply this idea through realistic incident simulations. Engineers take the incident commander’s seat during a simulated e-commerce outage, using observability tools while coordinating with LLM-powered stakeholders in Slack. The result feels real. You have to investigate what’s going wrong while keeping the response organized and dealing with the CEO and customer support. You get to practice the skills that matter during an incident: making sense of incomplete information, communicating clearly, coordinating people, and actually running the response.

事实证明，制造问题的技术也能帮助解决问题。在我工作的故障管理公司 Rootly，我们与 Uptime Labs 合作，通过逼真的故障模拟来应用这一理念。工程师在模拟的电子商务中断期间担任事故指挥官，使用可观测性工具，同时与 Slack 中由大模型（LLM）驱动的利益相关者进行协调。结果非常真实。你必须在调查故障原因的同时，保持响应工作的有序进行，并应对 CEO 和客户支持部门的询问。你能够练习在故障期间至关重要的技能：从不完整的信息中理清头绪、清晰沟通、协调人员以及实际执行响应流程。

### AI can also help preserve these skills
### AI 也可以帮助保持这些技能

But what about using AI as a trainer? Responders can ask an agent to explain the steps it took, the signals it examined, and the evidence behind its diagnosis. But explanation and observation are not substitutes for practice. You might pick up a few things from watching Serena Williams play, but you only learn tennis by getting on the court, and incident response is no different. I spent more than half a decade of my career building a software engineering school around progressive education: learning by doing. It was in-person, but we had no teachers; students worked on projects instead of listening to lectures. When Dropbox told me graduates it hired were still too inexperienced at troubleshooting, I created projects that gave students broken infrastructure and required them to diagnose and repair it. For most hands-on skills, I believe hands-on education beats passive instruction by a lot.

那么，利用 AI 作为培训师呢？响应者可以要求 AI 代理解释它采取的步骤、检查的信号以及诊断背后的证据。但解释和观察并不能替代实践。你看小威廉姆斯打球或许能学到一些东西，但你只有亲自上场才能学会网球，故障响应也是如此。我的职业生涯中有超过五年时间致力于围绕“进步教育”建立一所软件工程学校：在实践中学习。那是线下的教学，但我们没有老师；学生们通过做项目而不是听讲座来学习。当 Dropbox 告诉我他们雇佣的毕业生在故障排查方面经验不足时，我设计了一些项目，给学生提供损坏的基础设施，要求他们进行诊断和修复。对于大多数实践技能，我相信动手教育远胜于被动教学。

### Incident simulation should become part of on-call readiness
### 故障模拟应成为值班准备的一部分

As LLMs do more of our work, engineering teams risk accumulating comprehension debt: a growing gap between how their systems work and how well responders understand them. Engineers should regularly interact with the system they watch over, handle unfamiliar failures, practice working under pressure, and rehearse the coordination and communication required during a SEV0. Tabletop exercises and chaos engineering are nothing new, but practice has become even more important in the LLM era. Researcher Bainbridge recommended giving operators regular hands-on control and using simulation to prevent their skills from decaying. That’s the irony of automation, the more successful it becomes, the less prepared humans may be for the moment it fails.

随着大模型承担了我们越来越多的工作，工程团队面临着积累“理解债务”的风险：即系统运作方式与响应者对其理解程度之间的差距在不断扩大。工程师应该定期与他们所监管的系统进行交互，处理不熟悉的故障，练习在压力下工作，并演练 SEV0 级故障期间所需的协调与沟通。桌面演练和混沌工程并不新鲜，但在大模型时代，实践变得更加重要。研究员 Bainbridge 建议让操作员定期进行实际操作，并利用模拟来防止技能退化。这就是自动化的讽刺之处：它越成功，人类在它失效的那一刻可能就越缺乏准备。