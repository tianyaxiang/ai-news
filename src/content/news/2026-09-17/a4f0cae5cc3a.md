---
title: "Anthropic and OpenAI want to embed safety evaluators. Will they really be independent?"
originalUrl: "https://techcrunch.com/2026/09/16/anthropic-and-openai-want-to-embed-safety-evaluators-will-they-really-be-independent/"
date: "2026-09-16T23:43:41.841Z"
---

# Anthropic and OpenAI want to embed safety evaluators. Will they really be independent?
# Anthropic 和 OpenAI 希望引入嵌入式安全评估员，但他们真的能保持独立吗？

In a lengthy essay published over the weekend, Anthropic CEO Dario Amodei made a proposal that the AI industry would have rejected instantly even a year ago: embed third-party evaluators inside all frontier AI companies, giving them the power to report safety incidents, assess whether AI models are truly aligned, and share their unvarnished findings with the world.

在周末发表的一篇长文中，Anthropic 首席执行官 Dario Amodei 提出了一个即便在去年也会被 AI 行业立即拒绝的建议：在所有前沿 AI 公司内部嵌入第三方评估员，赋予他们报告安全事件、评估 AI 模型是否真正对齐，并向世界分享其未经修饰的调查结果的权力。

Amodei said Anthropic would commit to giving independent evaluators like METR and Redwood Research unprecedented access to the company’s systems. CEO Sam Altman said OpenAI also would commit to the practice, signaling a potentially profound change in how the industry works with outside research groups.

Amodei 表示，Anthropic 将承诺给予 METR 和 Redwood Research 等独立评估机构对其公司系统前所未有的访问权限。首席执行官 Sam Altman 也表示 OpenAI 将致力于这一做法，这标志着该行业与外部研究团体合作的方式可能发生深刻变革。

Third-party evaluators who spoke to TechCrunch broadly welcomed the proposal, but said details need to be ironed out — and ideally backed by legislation — if they’re to know whether they will function as truly independent watchdogs or vendors operating on the AI companies’ terms.

接受 TechCrunch 采访的第三方评估员普遍对该提议表示欢迎，但他们指出，如果想确定自己是作为真正独立的监督者，还是仅仅作为受 AI 公司条款约束的供应商，细节问题仍需敲定，且最好能有立法支持。

That deeper access is becoming more important as models get better at recognizing when they’re being evaluated, raising the risk that they’ll behave well during testing while concealing problematic behavior. Researchers say clues to that behavior can be missed when testing the finished model, but uncovered by investigating how it behaved throughout training.

随着模型在识别“何时正在接受评估”方面表现得越来越好，这种更深层次的访问权限变得愈发重要，因为这增加了模型在测试期间表现良好但却掩盖潜在问题行为的风险。研究人员表示，在测试成品模型时可能会错过这些行为的线索，但通过调查模型在整个训练过程中的表现，则可以发现这些线索。

“AI companies should be able to answer some very basic questions about their training process, such as: Did the AI ever actively try to undermine its own alignment training while it was going through the training?” Alexander Meinke, head of research at Apollo Research, told TechCrunch. “The answer to this should be an unequivocal no, and right now we are completely relying on AI companies to both carefully check this themselves and then truthfully report this to the public. And we’ve seen from recent incidents that, by default, they will do neither. As embedded evaluators, we could actually check.”

“AI 公司应该能够回答关于其训练过程的一些非常基本的问题，例如：AI 在训练过程中是否曾主动试图破坏其自身的对齐训练？”Apollo Research 研究主管 Alexander Meinke 对 TechCrunch 表示。“这个问题的答案应该是明确的‘否’，但目前我们完全依赖 AI 公司自己进行仔细检查，然后如实向公众报告。从最近的事件中我们已经看到，默认情况下，他们两者都不会做。作为嵌入式评估员，我们实际上可以进行核查。”

Historically, AI companies brought in outside reviewers to test finished models shortly before their release. Now, evaluators that TechCrunch spoke to propose giving them access not just to the final model, but to intermediate versions, or “checkpoints,” from its lifetime of training. Adam Gleave, CEO of FAR.AI, said evaluators could compare those checkpoints to determine when concerning behavior emerged, inspect the post-training environment that rewards models for certain behaviors, and check evaluation transcripts and logs to verify a company’s claims about how a model performed.

从历史上看，AI 公司通常在成品模型发布前不久才引入外部审查员进行测试。现在，接受 TechCrunch 采访的评估员建议，不仅要让他们访问最终模型，还要让他们访问模型整个训练生命周期中的中间版本，即“检查点”。FAR.AI 首席执行官 Adam Gleave 表示，评估员可以比较这些检查点，以确定令人担忧的行为是何时出现的，检查奖励模型特定行为的训练后环境，并核对评估记录和日志，以验证公司关于模型表现的声明。

Whether and when Anthropic and OpenAI plan to provide that kind of access is unclear. Neither company has shared which evaluators they’ll work with, when they will be embedded, how many they’ll bring on, exactly what systems and information they will be able to access or what can be disclosed to the public, despite repeated questions from TechCrunch.

Anthropic 和 OpenAI 是否以及何时计划提供这种访问权限尚不清楚。尽管 TechCrunch 反复询问，但两家公司均未透露他们将与哪些评估员合作、何时嵌入、将引入多少人、他们具体能够访问哪些系统和信息，或者哪些内容可以向公众披露。

Looking under the hood like this matters because models that perform well on safety tests aren’t necessarily safe if they’ve learned specifically how to pass that test. John Steidley, head of strategy at Palisade Research, pointed to an example of a “shutdown resistance benchmark” that measures if the AI will resist being shut down in certain circumstances. “It’s extremely relevant if the AI has been trained specifically to perform well on that benchmark,” Steidley said, comparing it to Volkswagen’s Dieselgate scandal, in which cars were programmed to recognize emissions tests and perform differently under testing conditions.

这种深入底层的检查至关重要，因为如果模型专门学习了如何通过安全测试，那么在测试中表现良好的模型并不一定就是安全的。Palisade Research 战略主管 John Steidley 指出了一个“关机阻力基准”的例子，该基准用于衡量 AI 在特定情况下是否会抵制被关闭。“如果 AI 是专门为了在基准测试中表现良好而训练的，那么这一点就极其重要，”Steidley 说道，并将此比作大众汽车的“排放门”丑闻，当时汽车被编程为能够识别排放测试，并在测试条件下表现出不同的性能。

Gleave noted that meaningful access could extend beyond the models themselves, with evaluators being given access to interview employees to check whether a company’s documentation and public descriptions of its safety practices match what happened internally.

Gleave 指出，有意义的访问权限可以延伸到模型本身之外，评估员应获得采访员工的权限，以核实公司的文档和对其安全实践的公开描述是否与内部实际情况相符。

Amodei did outline a fairly comprehensive proposal that might give evaluators the kind of access they think is necessary, including the right to “publish key findings about risk levels, incidents, practices, and the access they received or didn’t receive — without editorial control by Anthropic.” But evaluators say such a system will only work if AI companies are actually willing to surrender control over the process. Previous efforts at independent evaluations suggest that that surrender will be hard won, as third parties have often run up against tensions over access, time, confidentiality, and what they can say publicly. Gleave said FAR.AI has had to turn down contracts with several frontier developers that wanted too much control over the evaluation process, threatening the firm’s independence. By default, he said evaluators are treated like ordinary contractors: bound by restrictive NDAs and agreements that give developers significant control over what can ultimately be published.

Amodei 确实概述了一项相当全面的提议，可能会赋予评估员他们认为必要的访问权限，包括“发布关于风险水平、事件、实践以及他们获得或未获得访问权限的关键调查结果的权利——且不受 Anthropic 的编辑控制”。但评估员表示，只有当 AI 公司真正愿意放弃对该过程的控制时，这样的系统才能奏效。以往的独立评估尝试表明，这种放弃将很难实现，因为第三方经常在访问权限、时间、保密性以及公开言论方面面临冲突。Gleave 表示，FAR.AI 不得不拒绝与几家前沿开发商签订合同，因为这些开发商希望对评估过程进行过多的控制，从而威胁到公司的独立性。他说，默认情况下，评估员被视为普通承包商：受到限制性保密协议（NDA）和协议的约束，这些协议赋予开发商对最终发布内容的重大控制权。

The time limit: There’s also the question of whether reviewers will get enough time and access to do the work they’re being asked to do. When investigating the Hugging Face incident, OpenAI gave METR and Redwood roughly a week on premises to investigate, and both later said they could not draw confident conclusions due, in part, to scope and timing limitations. A similar issue occurred during the pre-release testing for GPT-6 Astra, which OpenAI has touted as its most aligned model yet. According to Apollo Research’s contribution to the model card, the firm was given only three days to test Astra, which made it difficult to draw firm conclusions. “Apollo believes that, given the higher rates of eval awareness and limited evaluation window, low rates of misbehavior here do not provide substantial evidence about the model’s alignment or misalignment,” the firm wrote in its evaluation. That track record leaves evaluators with a basic question: Why should this time be different? “It’s certainly possible that Dario and Sam just had a change of heart, and they’re going to be very open about this,” Gleave said. “But the intellectual property of these companies is so incredibly valuable to them, and I think they’re going to, by def...”

时间限制：还有一个问题是，审查员是否有足够的时间和权限来完成他们被要求做的工作。在调查 Hugging Face 事件时，OpenAI 给 METR 和 Redwood 大约一周的时间在现场进行调查，但两者后来都表示，由于范围和时间限制等原因，他们无法得出确切的结论。在 GPT-6 Astra 的发布前测试中也出现了类似的问题，OpenAI 曾吹捧该模型是其迄今为止最对齐的模型。根据 Apollo Research 对模型卡的贡献，该公司仅有三天时间测试 Astra，这使得得出确切结论变得困难。“Apollo 认为，考虑到更高的评估意识和有限的评估窗口，这里较低的不当行为率并不能为模型的对齐或未对齐提供实质性证据，”该公司在评估中写道。这一记录给评估员留下了一个基本问题：为什么这次会有所不同？“Dario 和 Sam 确实可能只是改变了主意，他们会对此非常开放，”Gleave 说。“但这些公司的知识产权对他们来说极其宝贵，我认为他们会，默认情况下……”