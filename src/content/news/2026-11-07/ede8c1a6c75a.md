---
title: "Free Chinese AI Models Are Getting Scary Good at Hacking"
originalUrl: "https://www.wired.com/story/free-chinese-ai-models-are-getting-scary-good-at-hacking/"
date: "2026-11-06T18:43:43.000Z"
excerpt: false
---

# Free Chinese AI Models Are Getting Scary Good at Hacking

Open-weight artificial intelligence models are now almost as capable of hacking into computer networks as the best closed ones, according to new research that heralds a much-anticipated turning point in the cybersecurity landscape. Vals, a company that measures AI capabilities, set out to test how well different AI models could carry out complex, multi-step network instructions on mock corporate networks.

根据一项预示着网络安全领域期待已久的转折点的新研究，开源人工智能模型现在入侵计算机网络的能力几乎与最顶尖的闭源模型相当。专门评估人工智能能力的 Vals 公司着手测试了不同的人工智能模型在模拟企业网络上执行复杂、多步骤网络指令的能力。

“The best frontier models, locked up inside the labs and available only through trusted access programs, are now starting to be matched by open models that anybody can download,” says Nikil Ravi, a researcher at Vals. The company’s findings suggest that closed models no longer have a definitive edge in cyber skills, meaning recent efforts by frontier labs to limit access to their models, and thereby slow the proliferation of such capabilities, may potentially be moot.

Vals 的研究员 Nikil Ravi 表示：“那些被锁在实验室里、仅通过受信任访问计划才能使用的最顶尖前沿模型，现在正开始被任何人都能下载的开源模型所赶超。”该公司的研究结果表明，闭源模型在网络技能方面已不再具有决定性优势，这意味着前沿实验室近期为限制模型访问以减缓此类能力扩散所做的努力，可能已经变得毫无意义。

The findings are also noteworthy given that the US frontier labs, particularly Anthropic, premised the limited release of new models—beginning with Claude Mythos Preview in April—on the idea that gated access would only buy time before advanced hacking capabilities were broadly available. Anthropic's frontier red team lead, Logan Graham, told WIRED in April that the company’s Project Glasswing, which gives trusted access to the full capabilities of new models, was focused on getting those tools “in the hands of defenders to give a head start.”

鉴于美国前沿实验室（尤其是 Anthropic）在 4 月份推出 Claude Mythos Preview 时，其限制新模型发布的初衷是认为受控访问只能为高级黑客能力的广泛普及争取时间，因此这些发现也值得关注。Anthropic 的前沿红队负责人 Logan Graham 在 4 月份告诉《连线》杂志，该公司的“玻璃翼计划”（Project Glasswing）旨在为受信任方提供新模型的全部功能，其重点是将这些工具“交到防御者手中，以获得先发优势”。

“We need to prepare now for a world where these capabilities are broadly available in 6, 12, 24 months. Many things would be different about security,” he told WIRED at the time. Seven months later, that transition seems to have arrived on schedule.

“我们需要现在就为一个在 6、12 或 24 个月内这些能力被广泛使用的世界做好准备。安全方面的许多事情将会发生改变，”他当时告诉《连线》杂志。七个月后，这种转变似乎如期而至。

Vals tested AI models in two simulated scenarios, giving them various specific tasks to achieve. The first scenario involved a mock corporate network accessible through a public-facing website. The second involved two different company networks; a model needed to compromise the first in order to gain access to the second.

Vals 在两个模拟场景中测试了人工智能模型，并要求它们完成各种具体任务。第一个场景涉及一个可以通过面向公众的网站访问的模拟企业网络。第二个场景涉及两个不同的公司网络；模型需要先攻破第一个网络，才能获得对第二个网络的访问权限。

The researchers found OpenAI’s most advanced cyber model, Daybreak, which is available only to trusted partners, to be the most capable, completing 81 percent of the tasks it was given in an average of two tests. The Chinese open-weight model DeepSeek was not far behind, completing 73 percent of the objectives on average. The Vals researchers note that on some tasks, the two models scored equally.

研究人员发现，OpenAI 最先进的网络模型 Daybreak（仅向受信任的合作伙伴开放）能力最强，在两次测试中平均完成了 73% 的任务。中国的开源模型 DeepSeek 紧随其后，平均完成了 73% 的目标。Vals 的研究人员指出，在某些任务上，这两个模型的得分不相上下。

The research also showed how much cheaper it is to use an open-weight model for this kind of task. Vals says it costs $17 to $46 in tokens for GPT-6-Sol to carry out an attack compared to $2 to $3 for DeepSeek. Open models are generally cheaper because they can be run on one’s own hardware. Rayan Krishnan, CEO of Vals, says this also provides a strong incentive for those playing defense to use open models rather than proprietary ones.

研究还显示，使用开源模型执行此类任务的成本要低得多。Vals 表示，使用 GPT-6-Sol 发起攻击的代币成本为 17 到 46 美元，而 DeepSeek 仅需 2 到 3 美元。开源模型通常更便宜，因为它们可以在用户自己的硬件上运行。Vals 的首席执行官 Rayan Krishnan 表示，这也为防御方使用开源模型而非专有模型提供了强大的动力。

OpenAI did not immediately respond to a request for comment. Much of the year in cybersecurity has played out as predicted, with AI automating core hacking tasks to help both attackers and defenders find a massive number of new vulnerabilities in code and rapidly probe networks for weaknesses.

OpenAI 没有立即回应置评请求。今年网络安全领域的大部分情况正如预测的那样发展，人工智能实现了核心黑客任务的自动化，帮助攻击者和防御者在代码中发现大量新漏洞，并迅速探测网络的弱点。

While the speed and scale of the findings, and the intensity of fixing uncovered software flaws, have all increased, experts are still debating whether AI has fundamentally altered the conceptual foundation and tenets of cybersecurity defense. In other words, it’s still not clear whether AI tools pose a new kind of threat or amplify the security challenges that have long existed.

虽然发现漏洞的速度和规模以及修复已发现软件缺陷的强度都有所增加，但专家们仍在争论人工智能是否从根本上改变了网络安全防御的概念基础和原则。换句话说，目前尚不清楚人工智能工具是构成了一种新型威胁，还是放大了长期存在的安全挑战。

The fact that open-weight models are now starting to match closed ones is crucial for understanding how criminal hackers can harness AI, and how companies and developers should respond. But in practice, real-world observation of cybercriminal and state-backed hacking activity has repeatedly shown in recent months that attackers are doing what they always do by conserving their resources and generally making do with older and less capable models—both proprietary and open—for most of their activity.

开源模型现在开始赶上闭源模型，这一事实对于理解犯罪黑客如何利用人工智能以及公司和开发人员应如何应对至关重要。但在实践中，近几个月来对网络犯罪和国家支持的黑客活动的现实观察反复表明，攻击者仍在做他们一贯做的事情：节省资源，并在大部分活动中凑合使用较旧且能力较弱的模型（无论是专有模型还是开源模型）。

And even with strict controls, defenders must assume that the best-funded and most highly motivated attackers have already had at least some access to closed models all this time. “I am in general agreement that open-weight models are capable of producing advanced attacks and vulnerabilities today, especially when you consider the abliterated models that disable safety training by modifying weights,” says Alex Zenla, cofounder and chief technology officer of the cloud security firm Edera.

即使有严格的控制，防御者也必须假设资金最充足、动机最强的攻击者一直以来都已经至少获得了一些闭源模型的访问权限。云安全公司 Edera 的联合创始人兼首席技术官 Alex Zenla 表示：“我基本同意开源模型在今天有能力制造高级攻击和漏洞，特别是当你考虑到那些通过修改权重来禁用安全训练的‘抹除’模型时。”

“My caveat to this is that it is likely that the closed labs have trained additional, unreleased models exceeding these capabilities. So I would put this very much like a cat-and-mouse game. The labs see themselves as moving fast to outpace the open-weight models, to be able to secure vulnerabilities before the open-weight models find them. Unfortunately, I do think this may be the beginning of a dangerous security landscape.”

“我要提醒的是，闭源实验室很可能已经训练了超出这些能力的其他未发布模型。所以我认为这更像是一场猫鼠游戏。实验室认为自己正在快速行动以超越开源模型，从而能够在开源模型发现漏洞之前将其修复。遗憾的是，我确实认为这可能是一个危险的安全局势的开端。”