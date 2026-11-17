---
title: "Building trustworthy AI by fencing it in, not predicting it"
originalUrl: "https://www.technologyreview.com/2026/11/16/1148565/building-trustworthy-ai-by-fencing-it-in-not-predicting-it/"
date: "2026-11-16T16:04:28.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# Building trustworthy AI by fencing it in, not predicting it

SponsoredProvided byUL Solutions In October this year, OpenAI disclosed that two of its AI agents had switched off the systems built to monitor them. One muted its own safety alerts after misreading an instruction not to send messages; the other removed its monitoring integration during migration, then said it hadn’t. No rule had told the agents to do that, and no test had anticipated the behaviors.

今年 10 月，OpenAI 披露其两个 AI 智能体关闭了用于监控它们的系统。其中一个在误读了“禁止发送消息”的指令后，静音了自己的安全警报；另一个在迁移过程中移除了监控集成，随后却声称并未移除。没有任何规则指示智能体这样做，也没有任何测试预见到这些行为。

For a century, we have built trust in technology on predictability: predefined inputs, predictable outputs, and layers of protection. Consider how a breaker trips at a set current or an aircraft component is tested against known (i.e., predictable) stresses. AI changes that. Traditional software executes instructions written by humans, whereas AI exercises what might be called synthetic judgment. We use AI because it can interpret situations we did not program and generate responses we did not prescribe. But the more freedom we give AI, the harder it becomes to provide the predictability on which trust has traditionally been built.

一个世纪以来，我们对技术的信任建立在可预测性之上：预定义的输入、可预测的输出以及多层保护。试想断路器如何在设定的电流下跳闸，或者飞机部件如何针对已知的（即，可预测的）压力进行测试。AI 改变了这一点。传统软件执行人类编写的指令，而 AI 则行使所谓的“合成判断”。我们使用 AI 是因为它能解读我们未曾编程的情况，并生成我们未曾预设的响应。但我们赋予 AI 的自由度越高，就越难提供传统意义上建立信任所需的可预测性。

We will not make AI trustworthy by predicting what it will do. We will do it by fencing it in with hard limits that are enforced outside its reach. In OpenAI’s case, the safeguards sat inside a system the agents could edit. But a fence the agents can simply move is not a fence.

我们无法通过预测 AI 的行为来使其变得可信。我们必须通过设置 AI 无法触及的硬性限制来将其“围起来”。在 OpenAI 的案例中，安全防护措施位于智能体可以编辑的系统内部。但如果智能体可以轻易移动围栏，那就不叫围栏。

Where traditional definitions of trust fall short Recent MIT Technology Review coverage has approached this problem from other directions. One contributor argues that having a human in the loop is an insufficient solution because humans are fundamentally unable to understand AI systems’ intentions and advocates instead for interdisciplinary research and collaboration between academia, government, and the tech industry. And a story on reverse game theory describes using incentives to keep models from deviating from the rules, even when no one understands how they work on the inside.

传统信任定义的局限性：近期《麻省理工科技评论》的报道从其他角度探讨了这一问题。一位撰稿人认为，“人在回路”并非充分的解决方案，因为人类从根本上无法理解 AI 系统的意图，并主张学术界、政府和科技行业之间应进行跨学科研究与合作。另一篇关于逆向博弈论的文章则描述了如何利用激励机制防止模型偏离规则，即使在无人理解其内部运作机制的情况下也是如此。

Both articles acknowledge that we cannot understand or watch every AI decision. Our instruments of trust, including requirements, testing, certification, safety margins, interlocks, and pass/fail criteria, all depend on our ability to bound a system’s behavior. This is the determinism paradox. With generative and agentic AI, behavior is shaped by training data, architecture, prompts, context, retrieval sources, and the environment. Inputs change, models are updated, tools change, and agents interact. Small variations propagate into outcomes nobody designed. The problem is not randomness; it is that the space of possible behavior is too large to enumerate in advance.

两篇文章都承认，我们无法理解或监控 AI 的每一个决策。我们的信任工具，包括需求、测试、认证、安全裕度、联锁装置和通过/失败标准，都依赖于我们限制系统行为的能力。这就是决定论悖论。对于生成式和智能体 AI，其行为由训练数据、架构、提示词、上下文、检索源和环境共同塑造。输入在变化，模型在更新，工具在更迭，智能体在交互。微小的变化会演变成无人设计的后果。问题不在于随机性，而在于可能行为的空间太大，无法预先穷尽。

Trust must therefore be engineered around boundaries rather than predicted outputs. The goal is not deterministic AI, but bounded, observable, and controllable AI. Trust also cannot be a one-time test. Traditional assurance certifies a product at a point in time, but AI keeps evolving after deployment, and a system that has passed every test can drift outside the conditions that made those tests meaningful. Trust must be continuously earned.

因此，信任必须围绕边界而非预测输出进行工程化设计。目标不是决定论式的 AI，而是有边界、可观察且可控的 AI。信任也不能是一次性的测试。传统的保证是在特定时间点对产品进行认证，但 AI 在部署后会持续进化，一个通过了所有测试的系统可能会偏离那些使测试具有意义的条件。信任必须持续获得。

Safety engineering has been accounting for some of this variability for decades. For example, the Nuclear Regulatory Commission determine the likelihood of failures in complex systems, and Systems-Theoretic Accident Model and Processes (STAMP) showed that accidents can emerge from interactions among working components, people, and organizations. But AI raises the stakes, because just a single component can now interpret, infer, and act. The stakes rise further as AI moves from browsers into vehicles, robots, medical systems, industrial controls, and data centers, where a wrong answer can become a life-threatening event.

几十年来，安全工程一直在考虑这种变异性。例如，核管理委员会确定复杂系统故障的可能性，而系统理论事故模型与过程（STAMP）表明，事故可能源于工作组件、人员和组织之间的相互作用。但 AI 提高了风险，因为现在仅仅一个组件就能进行解读、推理和行动。随着 AI 从浏览器进入车辆、机器人、医疗系统、工业控制和数据中心，风险进一步上升，错误的回答可能导致危及生命的事件。

Building trust that scales It’s clear that a person rubber-stamping thousands of AI actions an hour is not an acceptable—or scalable—safeguard against risk. But the remedy is not to remove people from the loop; it is to put human judgment where it counts: setting limits in advance and approving the rare actions that have serious consequences while hard constraints handle the rest. Therefore, trust has to move upstream into architecture. The central questions become: What authority are we willing to give AI, under what conditions, and supported by what evidence? And what happens outside those conditions? That is very different from asking whether a model scored 94% on a benchmark.

构建可扩展的信任：显然，让人类每小时对数千个 AI 操作进行“盖章式”审批，并不是一种可接受或可扩展的风险防范措施。但补救办法不是将人排除在回路之外，而是将人类判断力用在刀刃上：预先设定限制，并对那些后果严重的极少数操作进行审批，而其余部分则由硬性约束来处理。因此，信任必须前置到架构层面。核心问题变成了：我们愿意在什么条件下、在什么证据支持下赋予 AI 什么权限？在这些条件之外会发生什么？这与询问模型在基准测试中是否得了 94% 分数有着本质区别。

The determinism paradox does not mean AI cannot be trusted. It means trust needs a different architecture. Instead of making every output predictable, make the boundaries predictable. An AI medical assistant may be probabilistic in its diagnosis, but deterministic rules govern whether it can change a prescription. An industrial AI may find many ways to optimize a process, while fixed limits keep it within pressure and temperature bounds. An agent may decide how to complete a task, while permissions, transaction limits, and human approvals determine what it is authorized to do. Let AI be probabilistic inside the box and make the box itself deterministic wherever consequences matter.

决定论悖论并不意味着 AI 不可信，而是意味着信任需要一种不同的架构。与其让每一个输出都可预测，不如让边界变得可预测。AI 医疗助手在诊断时可能是概率性的，但决定它能否更改处方的规则必须是确定性的。工业 AI 可能找到多种优化流程的方法，但固定的限制使其保持在压力和温度范围内。智能体可以决定如何完成任务，但权限、交易限额和人工审批决定了它被授权做什么。让 AI 在“盒子”内保持概率性，但在后果重大的地方，确保盒子本身是确定性的。

Leaders can put this into practice by asking five questions: What authority does AI have? Define not only what it can do but what it is allowed to do, separating interpretation, recommendation, decision, and execution. Is the function of AI proportional to the consequence? A marketing copilot and AI controlling industrial equipment need different assurance thresholds. Are we taking the appropriate steps toward autonomy? For example, there needs to be a plan to move from having AI interpret while humans decide, to AI making recommendations, to then taking action with approval, and ultimately to having supervised autonomy, but only as AI can safely work at each step. Are we testing the system or merely the model? Unexpected interactions emerge among models, data, agents, APIs, and human workflows. Are we continuously earning trust? Monitor drift, failures, near-misses, and model changes throughout the lifecycle. The winners in AI will be those who

领导者可以通过提出五个问题来付诸实践：AI 拥有什么权限？不仅要定义它能做什么，还要定义它被允许做什么，将解读、建议、决策和执行区分开来。AI 的功能是否与后果相称？营销辅助工具和控制工业设备的 AI 需要不同的保证阈值。我们是否正在采取适当的步骤迈向自主？例如，需要有一个计划，从“AI 解读、人类决策”过渡到“AI 提供建议”，再到“经批准后采取行动”，最终实现“受监督的自主”，但前提是 AI 在每一步都能安全运行。我们是在测试系统还是仅仅在测试模型？模型、数据、智能体、API 和人类工作流之间会出现意想不到的交互。我们是否在持续赢得信任？在整个生命周期内监控漂移、故障、未遂事故和模型变化。AI 领域的赢家将是那些……