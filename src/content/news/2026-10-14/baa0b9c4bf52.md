---
title: "Developing Gemini 4 Argon responsibly and safely"
originalUrl: "https://deepmind.google/blog/developing-gemini-4-argon-responsibly-and-safely/"
date: "2026-10-13T19:43:07.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

Developing Gemini 4 Argon responsibly and safely Oct 13, 2026 | x.com Facebook LinkedIn Mail Copy link Learn more about our approach to safety and security for Gemini 4 Argon. Anca Dragan VP, AI Safety & Behavior Raluca Ada Popa Head of Gemini Security, Google DeepMind Share x.com Facebook LinkedIn Mail Copy link

负责任且安全地开发 Gemini 4 Argon 2026 年 10 月 13 日 | x.com Facebook LinkedIn Mail 复制链接 了解更多关于我们针对 Gemini 4 Argon 的安全保障方法。Anca Dragan，AI 安全与行为副总裁；Raluca Ada Popa，Google DeepMind Gemini 安全负责人。分享 x.com Facebook LinkedIn Mail 复制链接。

Gemini 4 Argon is a step forward in what models can do — especially when it comes to deep work in complex, real-world tasks across domains including coding, finance, legal, cybersecurity, and science. Its cyberdefense capabilities are frontier-level and designed to give defenders an advantage over attackers. To maximize its potential, we first wanted cyber defenders to put it to work via our Fairwind Program, while our own security teams used it to scan critical systems inside and outside of Google.

Gemini 4 Argon 是模型能力的一次飞跃，特别是在编码、金融、法律、网络安全和科学等领域的复杂现实任务中进行深度工作时。其网络防御能力处于前沿水平，旨在让防御者比攻击者更具优势。为了最大限度地发挥其潜力，我们首先通过 Fairwind 项目让网络防御者投入使用，同时我们自己的安全团队也利用它来扫描 Google 内部和外部的关键系统。

This window of limited access showed why these capabilities matter. For instance, Wiz used Argon to uncover a critical bug in hospital software that previous models had missed, helping protect hundreds of thousands of patient records. Meanwhile, Google’s own security teams used Argon to find and patch bugs across internal software or open-source software. This included fixing foundational vulnerabilities affecting systems globally, which are going through our responsible disclosure process.

这段有限的访问窗口期展示了这些能力的重要性。例如，Wiz 使用 Argon 发现了一个医院软件中的关键漏洞，而之前的模型未能发现该漏洞，这有助于保护数十万份患者记录。与此同时，Google 自己的安全团队使用 Argon 在内部软件或开源软件中查找并修补漏洞。这包括修复影响全球系统的基础性漏洞，这些漏洞目前正在通过我们的负责任披露流程进行处理。

Today, we are beginning to roll out Argon broadly, as well as expanding our Fairwind Program to additional trusted cyber defenders. To do this well, we grappled with two big questions: How do we build the right safety guardrails? If Argon can help defenders find complex software bugs or help scientists design experiments, how do we stop bad actors from using it to launch cyberattacks or create biological threats? (Misuse) Can we trust the model to do the job the right way? As models become more resourceful problem-solvers, how do we make sure they don’t cut corners, cross boundaries, or make incorrect high-stakes decisions? (Misalignment and Prompt Injection)

今天，我们开始广泛推出 Argon，并向更多受信任的网络防御者扩展我们的 Fairwind 项目。为了做好这一点，我们努力解决两个重大问题：我们如何建立正确的安全护栏？如果 Argon 可以帮助防御者发现复杂的软件漏洞或帮助科学家设计实验，我们如何阻止不良行为者利用它发动网络攻击或制造生物威胁？（滥用）我们能否信任模型以正确的方式完成工作？随着模型成为更足智多谋的问题解决者，我们如何确保它们不会走捷径、越界或做出错误的重大决策？（失调和提示注入）

Our full Safety and Security Report systematically covers our set of defenses. Below are some highlights from how we approached these two questions for Gemini 4 Argon. Misuse prevention across high-risk domains. The same coding and reasoning improvements that enabled Argon to find and patch vulnerabilities also drove better performance on our cybersecurity tests — solving all 12 of the end-to-end simulated cyberattack scenarios, up from five in our previous generation.

我们完整的安全报告系统地涵盖了我们的防御措施。以下是我们针对 Gemini 4 Argon 处理这两个问题的一些重点。跨高风险领域的滥用预防。使 Argon 能够发现和修补漏洞的编码和推理改进，也推动了我们在网络安全测试中表现的提升——解决了所有 12 个端到端模拟网络攻击场景，而上一代产品仅能解决 5 个。

In biology evaluations, unguarded versions of the model also showed a much stronger ability to help troubleshoot complex lab procedures step by step. Following our Frontier Safety Framework, since we saw elevated capabilities in the cyber and biological domains, we put our next-generation set of frontier safeguards in place across both areas.

在生物学评估中，未受保护的模型版本在协助逐步排查复杂实验室程序方面也表现出更强的能力。遵循我们的前沿安全框架，由于我们看到了在网络和生物领域的增强能力，我们在两个领域都部署了下一代前沿安全保障措施。

First, when it comes to potentially dangerous requests — from writing exploit code to helping with dangerous biological materials, Argon is significantly better at not fulfilling harmful requests than our previous models. On an adversarial set meant to stress test the model, violations reduced nearly twofold — also significantly better than previous Gemini models. Second, we wrap the model in three layers of real-time protection; this is to prevent determined attackers that might try to jailbreak (i.e. trick) the model by disguising a dangerous request as a harmless story or breaking it into dozens of small questions over several weeks.

首先，在处理潜在危险请求时——从编写漏洞利用代码到协助处理危险生物材料，Argon 在拒绝执行有害请求方面明显优于我们之前的模型。在旨在压力测试模型的对抗性数据集上，违规行为减少了近两倍，这也明显优于之前的 Gemini 模型。其次，我们为模型包裹了三层实时保护；这是为了防止坚定的攻击者试图通过将危险请求伪装成无害故事，或在几周内将其拆解为数十个小问题来“越狱”（即欺骗）模型。

Here is how these protections work: Input screening: Smaller models check incoming requests and conversation context for malicious intent or dangerous requests. Internal introspection: Even if a request is cleverly disguised to look harmless, small transformers ("activation probes") read the model’s internal neural signals and are trained to spot when it is activating knowledge about cyberattacks or biological threats. Continuous monitoring: As the model reasons and writes its response across multiple steps, we combine these signals and take action when necessary such as cutting off the agent mid-stream if the responses become problematic.

这些保护措施的工作原理如下：输入筛选：较小的模型会检查传入的请求和对话上下文，以识别恶意意图或危险请求。内部自省：即使请求被巧妙地伪装成无害，小型转换器（“激活探针”）也会读取模型的内部神经信号，并经过训练以识别模型何时正在激活有关网络攻击或生物威胁的知识。持续监控：当模型在多个步骤中进行推理和编写响应时，我们会结合这些信号并在必要时采取行动，例如如果响应出现问题，则在中途切断代理。

Combining real-time protection, faster fixes for new jailbreaks and enhanced monitoring for recurring misuse has made our systems better at preventing real-world harm. For instance, external bio jailbreak red teaming could only unlock less than 1% of bio sub-tasks we test for.

结合实时保护、针对新越狱的更快修复以及对重复滥用的增强监控，使我们的系统在预防现实世界危害方面表现更好。例如，外部生物越狱红队测试只能解锁我们测试的不到 1% 的生物子任务。

Real-time misalignment monitoring. Misalignment can sometimes mean an agent deciding on its own to pursue a goal, different to what was intended by the user. Because Argon is much better than earlier models at understanding the environment it is running in, we test carefully for that kind of behavior. For example, we ran realistic "honeypot" tests to see if the model would increase its ability to take covert actions, such as sabotaging safety monitoring. We didn't find any instances of that behavior.

实时失调监控。失调有时意味着代理自行决定追求与用户意图不同的目标。由于 Argon 在理解其运行环境方面比早期模型好得多，我们仔细测试了这种行为。例如，我们进行了逼真的“蜜罐”测试，以查看模型是否会增加其采取隐蔽行动的能力，例如破坏安全监控。我们没有发现任何此类行为的实例。

But what we do see in practice today is something much more familiar: an agent trying too hard to finish the job it was given. When a resourceful assistant is told to get a task done and runs into a locked door, it can treat that obstacle as just another puzzle to solve. This is why we trained Gemini 4 Argon to respect system boundaries, report negative findings honestly, and pause to ask for human confirmation. On coding benchmarks where models have no incentive to hold back, attempts to take a shortcut or cheat on the task dropped to just 2% on Gemini 4 Argon, our best performance for recent Gemini models.

但我们今天在实践中看到的是一种更熟悉的情况：代理过于努力地完成分配给它的工作。当一个足智多谋的助手被告知要完成一项任务却遇到一扇锁着的门时，它可能会将该障碍视为另一个需要解决的难题。这就是为什么我们训练 Gemini 4 Argon 尊重系统边界、诚实地报告负面发现，并暂停以寻求人类确认。在模型没有动力保留实力的编码基准测试中，Gemini 4 Argon 试图走捷径或在任务中作弊的比例降至仅 2%，这是我们近期 Gemini 模型中的最佳表现。

And while this is a major step forward, when a model runs millions of complex tasks, even a rare misstep will eventually show up. As a second line of defense, we built an automated misalignment monitor that reads both the agent’s actions and its internal "scratchpad" (its step-by-step chain of thought) in real time, blocking severe boundary violations before they happen and flagging serious internal cases for human responders. (We continually harden our training and evaluation environments against potential escapes. Yo

虽然这是一个重大的进步，但当模型运行数百万个复杂任务时，即使是罕见的失误最终也会出现。作为第二道防线，我们构建了一个自动失调监控器，它可以实时读取代理的操作及其内部“草稿板”（其逐步思维链），在严重边界违规发生之前阻止它们，并为人类响应者标记严重的内部案例。（我们不断加强我们的训练和评估环境，以防止潜在的逃逸。）