---
title: "Here’s why OpenAI is absent from Nvidia’s industry-wide effort to end rogue AI agents"
originalUrl: "https://techcrunch.com/2026/09/29/heres-why-openai-is-absent-from-nvidias-industry-wide-effort-to-end-rogue-ai-agents/"
date: "2026-09-30T00:38:32.209Z"
---

# Here’s why OpenAI is absent from Nvidia’s industry-wide effort to end rogue AI agents
# OpenAI 为何缺席 Nvidia 旨在终结“流氓 AI 智能体”的行业联盟？

When Nvidia announced on Monday a new consortium of more than 100 companies dedicated to solving rogue AI agents, there was one name notably missing: OpenAI. While OpenAI wasn’t the only Big Tech player that didn’t sign on — Amazon, Google, and Apple haven’t joined either — it was the most obvious missing player, especially because Anthropic is a supporter.
周一，Nvidia 宣布成立一个由 100 多家公司组成的联盟，致力于解决“流氓 AI 智能体”（rogue AI agents）问题，但有一个名字缺席了，那就是 OpenAI。虽然 OpenAI 并非唯一没有加入的大型科技公司（亚马逊、谷歌和苹果也未加入），但它的缺席最为引人注目，尤其是考虑到其竞争对手 Anthropic 已经成为了该联盟的支持者。

However, despite OpenAI’s lack of a public pledge to the consortium, which presumably means that each company will use and sell some version of the technology and contribute features back to the project, an OpenAI spokesperson told TechCrunch that the company is supportive of Nvidia’s work.
尽管 OpenAI 没有公开承诺加入该联盟（这意味着各成员公司将使用并销售该技术的某个版本，并向项目回馈功能），但 OpenAI 的一位发言人告诉 TechCrunch，该公司对 Nvidia 的这项工作表示支持。

The new effort, dubbed Nvidia’s Open Agent Safety Platform, is Nvidia’s attempt to spread its homegrown, and largely open source, AI agent-security tech throughout the AI ecosystem as a direct response to the types of ongoing rogue AI agent incidents frontier labs like Anthropic and OpenAI have disclosed. Nvidia CEO Jensen Huang has been calling rogue AIs an ordinary engineering problem that can be solved like any other tech issue. The Open Agent Safety Platform is Huang putting his money where his mouth is.
这项名为“Nvidia 开放智能体安全平台”（Open Agent Safety Platform）的新举措，是 Nvidia 试图将其自主研发且主要开源的 AI 智能体安全技术推广到整个 AI 生态系统，以直接应对 Anthropic 和 OpenAI 等前沿实验室所披露的各类流氓 AI 智能体事件。Nvidia 首席执行官黄仁勋一直将流氓 AI 称为一个普通的工程问题，可以像其他技术问题一样得到解决。而“开放智能体安全平台”正是黄仁勋言出必行的体现。

OpenAI is working with Nvidia on agent security, including on one of the key bits of software that’s part of this platform: OpenShell. OpenShell is open source software that creates a sandbox specifically designed to keep agents from escaping. While it is still curious that OpenAI didn’t simply become a supporter of the initiative like its archrival Anthropic did, the fact that the frontier AI lab is supporting the effort is good news.
OpenAI 正在与 Nvidia 在智能体安全方面进行合作，包括该平台的核心软件之一：OpenShell。OpenShell 是一款开源软件，旨在创建一个专门的沙箱，防止智能体“逃逸”。虽然 OpenAI 没有像其主要竞争对手 Anthropic 那样直接成为该倡议的支持者令人感到好奇，但这家前沿 AI 实验室确实在以某种方式支持这项工作，这仍是一个好消息。

That’s because OpenAI, in particular, could benefit from this tech, at least according to Hugging Face founder and CEO Clem Delangue (who just sold his company to Nvidia for $12.9 billion earlier this month). “From what we know (take with a grain of salt, we need much more transparency!), if @OpenAI had been running this on their own agents that attacked us, they would have caught them before we did!” Delangue posted.
这是因为 OpenAI 特别能从这项技术中受益，至少 Hugging Face 的创始人兼首席执行官 Clem Delangue（本月初刚以 129 亿美元将公司出售给 Nvidia）是这么认为的。Delangue 发文称：“据我们所知（仅供参考，我们需要更多透明度！），如果 @OpenAI 在攻击我们的智能体上运行了这项技术，他们本可以在我们发现之前就将其拦截！”

Delangue said Hugging Face has already contributed a feature to the Open Agent Safety Platform that will detect and shut down AI agents that are using websites they are allowed to visit but are doing so in unauthorized ways. For instance, this feature will act if agents are bypassing their guardrails and coordinating an attack by writing notes to one another in an open source code hosting repository. That’s one of the ways OpenAI said its wayward swarm of agents coordinated its attack on Hugging Face.
Delangue 表示，Hugging Face 已经为“开放智能体安全平台”贡献了一项功能，该功能可以检测并关闭那些虽然访问的是获准网站，但却以未经授权方式进行操作的 AI 智能体。例如，如果智能体绕过护栏，通过在开源代码托管仓库中互相留言来协调攻击，该功能就会介入。OpenAI 此前曾表示，其失控的智能体集群正是通过这种方式协调了对 Hugging Face 的攻击。

But there’s another reason why some of these big names, including OpenAI, might not want to publicly commit to Nvidia’s efforts. To use the full system, there is a hardware component that is not open source software, remains proprietary, and can only be deployed on Nvidia’s hardware. The Open Agent Safety Platform doesn’t just offer a sandbox. It also enforces agent behavior at a hardware layer, where agents can’t detect that they are being watched.
但包括 OpenAI 在内的一些大公司可能不愿公开承诺加入 Nvidia 阵营，还有另一个原因。要使用该系统的全部功能，需要一个非开源的硬件组件，该组件属于专有技术，只能部署在 Nvidia 的硬件上。“开放智能体安全平台”不仅提供沙箱，还在硬件层面强制执行智能体行为，使智能体无法察觉自己正受到监控。

(Some AI models and agents lie and pretend to be following the rules when they know they are being watched.) The hardware monitoring part relies on Nvidia Sentry, a proprietary feature that runs on special Nvidia processors called BlueField-4 data processing units. Sentry continuously monitors agent behavior from these processors and can instantly shut agents down, Nvidia promises.
（一些 AI 模型和智能体在知道自己被监控时，会撒谎并假装遵守规则。）硬件监控部分依赖于 Nvidia Sentry，这是一项运行在名为 BlueField-4 数据处理单元（DPU）的特殊 Nvidia 处理器上的专有功能。Nvidia 承诺，Sentry 可以通过这些处理器持续监控智能体行为，并能瞬间关闭违规智能体。

While a hardware solution is clearly a good idea, it means that the Open Agent Safety Platform isn’t exactly a pure open source play. It allows Nvidia to ensure that this solution always runs best on its own hardware. Indeed, Nvidia has said that, for those already running workloads on its latest hardware, implementing the Open Agent Safety Platform is an easy software update.
虽然硬件解决方案显然是个好主意，但这意味着“开放智能体安全平台”并非纯粹的开源项目。它使 Nvidia 能够确保该解决方案始终在其自家硬件上运行效果最佳。事实上，Nvidia 已经表示，对于那些已经在其最新硬件上运行工作负载的用户来说，部署“开放智能体安全平台”只需进行简单的软件更新。

Still, Nvidia competitors, including Arm and Intel, have signed on as Open Agent Safety Platform supporters because the sandbox, OpenShell, can be modified to work with other chips and hardware. And Nvidia is sharing reference designs for the whole software-and-hardware idea.
尽管如此，包括 Arm 和 Intel 在内的 Nvidia 竞争对手还是加入了“开放智能体安全平台”的支持者行列，因为其中的沙箱组件 OpenShell 可以被修改以适配其他芯片和硬件。此外，Nvidia 也在分享整个软硬件方案的参考设计。

All of which makes OpenAI’s absence even more noticeable. Clearly, OpenAI sees AI safety as an opportunity for independence from its major investor Nvidia, as well as a chance to show its own leadership. That is true even though it was OpenAI’s AI agents that scared the industry with the Hugging Face incident.
所有这些都让 OpenAI 的缺席显得更加引人注目。显然，OpenAI 将 AI 安全视为摆脱其主要投资者 Nvidia 依赖的机会，也是展示自身领导力的契机。尽管正是 OpenAI 的 AI 智能体在 Hugging Face 事件中引发了行业恐慌，但这一立场依然未变。

For instance, the company is developing its own safeguards for its research and products and is disclosing the worst incident it discovers. Meanwhile, OpenAI has its own AI cybersecurity consortium for sharing information, called the Defense Factory. Those that signed on to support that idea include Anthropic, Amazon Web Services, and Google — many of the names that didn’t sign on to Nvidia’s technology-oriented approach.
例如，该公司正在为其研究和产品开发自己的安全防护措施，并披露其发现的最严重事件。与此同时，OpenAI 拥有自己的 AI 网络安全联盟来共享信息，名为“防御工厂”（Defense Factory）。支持该理念的公司包括 Anthropic、亚马逊云科技（AWS）和谷歌——其中许多公司都没有加入 Nvidia 以技术为导向的联盟。

And, truth be told, some level of fear is good for business. OpenAI is busy crafting cybersecurity into an enterprise offering, with everything from its own cyber-oriented model, Daybreak, to a growing network of partners that enterprises can hire to implement AI security.
说实话，一定程度的恐惧对商业是有利的。OpenAI 正忙于将网络安全打造为一项企业级服务，从其自有的网络安全模型 Daybreak，到企业可以雇佣来实施 AI 安全的日益增长的合作伙伴网络，应有尽有。