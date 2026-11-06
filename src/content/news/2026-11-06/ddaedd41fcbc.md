---
title: "OpenAI released a new cybersecurity model. Is that enough?"
originalUrl: "https://techcrunch.com/2026/11/05/openai-released-a-new-cybersecurity-model-is-that-enough/"
date: "2026-11-05T19:06:12.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

Max Justicz, the chief technology officer and co-founder of the startup Charge Robotics, used an OpenAI model to find a severe vulnerability that — if exploited — could allow hackers to take control of servers running Ubuntu, a widely used open source Linux-based operating system. Justicz, who has a hobbyist’s interest in cybersecurity and previously found a vulnerability in the same codebase, told TechCrunch that he found this issue using GPT 5.6 Sol, released in July, through the AI maker’s Daybreak Blue, a program that gives cybersecurity defenders access to powerful frontier models.

初创公司 Charge Robotics 的首席技术官兼联合创始人 Max Justicz 利用 OpenAI 的模型发现了一个严重的漏洞。如果该漏洞被利用，黑客可能借此控制运行 Ubuntu（一种广泛使用的开源 Linux 操作系统）的服务器。Justicz 对网络安全有着业余爱好，此前也曾在同一代码库中发现过漏洞。他告诉 TechCrunch，他是通过 AI 制造商的 Daybreak Blue 项目使用 7 月发布的 GPT 5.6 Sol 发现此问题的，该项目旨在为网络安全防御者提供访问强大前沿模型的权限。

“I literally just aimed ChatGPT at the same body of code and said ‘I found this bug previously that was fixed several years ago, please find bugs as bad or worse,’ and it came back in two hours with this,” Justicz said. “It’s extremely convoluted and hard for a human to find, but it works!” He reported the issue to the Debian Project, which maintains the software in question and issued a patch to fix the vulnerability. There has been no known evidence of exploitation.

“我实际上只是把 ChatGPT 指向同一段代码，并说‘我之前发现过这个几年前修复的漏洞，请找出同样严重或更严重的漏洞’，结果它在两小时内就给出了这个，”Justicz 说。“它极其复杂，人类很难发现，但它确实有效！”他向负责维护该软件的 Debian 项目报告了此问题，该项目随后发布了补丁以修复该漏洞。目前尚无证据表明该漏洞已被利用。

Still, the ease with which he found it suggests that we’ve only seen the tip of the iceberg when it comes to potential exploits that even novice hackers can utilize with the help of AI models. “I can only imagine what one could do with more time and access to less neutered models. We should expect some extremely crazy bugs to be found and exploited over the next few months,” Justicz wrote in a social media thread discussing his finding. “This might be obvious to most folks here, but there is currently huge alpha in taking some code or binary someone has not audited yet and just aiming a powerful AI model at it.”

尽管如此，他发现漏洞的轻松程度表明，在 AI 模型的帮助下，即便是新手黑客也能利用潜在的漏洞，而我们目前看到的可能只是冰山一角。“我无法想象如果拥有更多时间和访问权限更少受限的模型，一个人能做到什么程度。我们应该预料到在接下来的几个月里，会有一些极其疯狂的漏洞被发现并利用，”Justicz 在讨论其发现的社交媒体帖子中写道。“这对这里的大多数人来说可能显而易见，但目前将一些尚未经过审计的代码或二进制文件交给强大的 AI 模型去分析，确实存在巨大的超额收益。”

OpenAI appears to have noticed. Today, the AI giant announced a new model focused on cybersecurity, ChatGPT Cyber, would be made available to the highest tier of users in the cybersecurity program, Daybreak Red, which allows offensive cybersecurity researchers tools for vulnerability hunting and development. Yesterday, OpenAI said that the same model had been used to scan and prepare patches for vulnerabilities in the Linux kernel, finding 948 potential issues. OpenAI also found 81 “novel” vulnerabilities in Firefox, the web browser.

OpenAI 似乎已经注意到了这一点。今天，这家 AI 巨头宣布推出一款专注于网络安全的新模型 ChatGPT Cyber，该模型将提供给网络安全项目 Daybreak Red 的最高级别用户，允许进攻性网络安全研究人员使用漏洞挖掘和开发工具。昨天，OpenAI 表示，同一模型已被用于扫描并准备 Linux 内核漏洞的补丁，发现了 948 个潜在问题。OpenAI 还在 Firefox 网络浏览器中发现了 81 个“新颖”漏洞。

“Our goal is to dramatically expand Daybreak, bringing advanced security research to organizations of every size, independent researchers, and open-source maintainers,” the frontier lab said in a statement. OpenAI has insisted that there is a narrow window of time for the people who safeguard digital infrastructure to take action before AI models become even better at hacking and easier to access. For cyber defenders, however, it can feel like the frontier labs have unleashed a mountain of new work that outstrips their resources.

“我们的目标是大幅扩展 Daybreak，将先进的安全研究带给各种规模的组织、独立研究人员和开源维护者，”该前沿实验室在一份声明中表示。OpenAI 坚持认为，在 AI 模型变得更擅长黑客攻击且更易于获取之前，数字基础设施的守护者们只有很短的时间窗口可以采取行动。然而，对于网络防御者来说，这感觉就像前沿实验室释放了一座超出他们资源承受能力的新工作大山。

Justicz said that he personally spent about $5,000 on subscriptions and tokens to find several exploits. Besides Daybreak’s model access, OpenAI has also announced a $1 billion initiative to support cybersecurity professionals in the program who work on critical infrastructure like the electrical grid or water systems. The Daybreak program has its own critiques. Justicz notes that the frontier lab appears to have recently “nerfed” Daybreak Blue to make it less useful at finding vulnerabilities.

Justicz 表示，他个人花费了约 5,000 美元用于订阅和代币，以发现几个漏洞。除了 Daybreak 的模型访问权限外，OpenAI 还宣布了一项 10 亿美元的计划，旨在支持该项目中从事电力网或供水系统等关键基础设施工作的网络安全专业人员。Daybreak 项目本身也面临批评。Justicz 指出，该前沿实验室似乎最近“削弱”了 Daybreak Blue，使其在发现漏洞方面的效用降低。

On one hand, it may be good to limit access from potential bad actors — Justicz said he just uploaded a photo of his driver’s license to join the program. On the other, cybersecurity professionals say they have one hand tied if they can’t use frontier technology while bad actors can deploy open-weight models with abliterated guardrails. Still, OpenAI says just “thousands” of cybersecurity professionals are participating in the Daybreak program, versus a far larger number of potential hackers.

一方面，限制潜在恶意行为者的访问可能是件好事——Justicz 说他只是上传了一张驾照照片就加入了该项目。另一方面，网络安全专业人士表示，如果他们无法使用前沿技术，而恶意行为者却可以部署去除了护栏的开源权重模型，那么他们的手脚就会被束缚。尽管如此，OpenAI 表示只有“数千名”网络安全专业人士参与了 Daybreak 项目，而潜在的黑客数量则要庞大得多。

It’s unclear if frontier labs are devoting enough of their resources to this issue. Eric Wallace, a researcher on OpenAI’s technical staff, said that “we are now allocating a significant amount of our frontier compute towards discovering and patching vulnerabilities in open source codebases, fully pro bono.” But the Linux bug hunt cost $1.2 million, which is significantly less than the approximate $6 million token spend the company invested in finding a potential solution to a famous problem of fluid dynamics. If there is a narrow window of time to patch the digital infrastructure the world depends on, more urgency may be required.

目前尚不清楚前沿实验室是否在这一问题上投入了足够的资源。OpenAI 技术人员的研究员 Eric Wallace 表示：“我们现在正将大量前沿计算资源用于发现和修复开源代码库中的漏洞，完全是公益性质的。”但 Linux 漏洞搜寻耗资 120 万美元，这远低于该公司为寻找流体力学著名问题的潜在解决方案而投入的约 600 万美元代币费用。如果修复世界所依赖的数字基础设施的时间窗口很短，那么可能需要更强的紧迫感。