---
title: "Gemini 4 Carbon: Our next frontier model"
originalUrl: "https://deepmind.google/blog/gemini-4-carbon-our-next-frontier-model/"
date: "2026-10-28T17:00:58.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

Gemini 4 Carbon: our next frontier model Oct 28, 2026 | x.com Facebook LinkedIn Mail Copy link Gemini 4 Carbon is our strongest model with state-of-the-art cybersecurity and long horizon capabilities. Koray Kavukcuoglu SVP, Google DeepMind and Chief AI Architect, Google Share x.com Facebook LinkedIn Mail Copy link Today, we’re announcing the next frontier model: Gemini 4 Carbon, our strongest model with state-of-the-art cybersecurity and long horizon capabilities.

Gemini 4 Carbon：我们的下一个前沿模型 2026年10月28日 | x.com Facebook LinkedIn Mail 复制链接 Gemini 4 Carbon 是我们最强大的模型，具备最先进的网络安全和长周期任务处理能力。Google DeepMind 高级副总裁兼 Google 首席 AI 架构师 Koray Kavukcuoglu 分享。今天，我们宣布推出下一个前沿模型：Gemini 4 Carbon，这是我们最强大的模型，具备最先进的网络安全和长周期任务处理能力。

Carbon ranks #1 on the recently updated v5.0 of Artificial Analysis Intelligence Index at 59. It shows significant gains across coding and agentic tasks as well as across key capabilities critical for cybersecurity defense, landing a firm lead in SEC-bench Pro (88.2%) for finding vulnerabilities, ExploitGym (54.8%) for exploitation, and CWE-bench (71.0%) for patching. On internal benchmarks, Carbon drives a strong uplift in generating secure code, and in live coding environments with our own teams it shows reduced misalignment and fabrication rates.

Carbon 在最近更新的 Artificial Analysis Intelligence Index v5.0 中以 59 分排名第一。它在编码和智能体任务以及网络安全防御的关键能力方面表现出显著提升，在漏洞发现的 SEC-bench Pro (88.2%)、漏洞利用的 ExploitGym (54.8%) 以及补丁修复的 CWE-bench (71.0%) 中均处于领先地位。在内部基准测试中，Carbon 在生成安全代码方面带来了显著提升，并且在我们团队的实时编码环境中，它显示出更低的失准率和虚构率。

Building on Gemini 4 Argon, which was launched two weeks ago, Carbon illustrates the pace at which we’re pushing the frontier forward. Our researchers and models are working hand in hand to advance capabilities faster, while strengthening our safeguards in tandem.

基于两周前发布的 Gemini 4 Argon，Carbon 展示了我们推动前沿技术发展的速度。我们的研究人员和模型正携手合作，在加快能力提升的同时，同步加强我们的安全保障措施。

We're taking a deliberate approach to rollout and are actively engaged in the U.S. government’s voluntary process for pre-release model testing. Starting this week, we will make Carbon available to a subset of cyber defenders and will gradually phase access to additional trusted partners through our Fairwind Program. We’re continuing to gather feedback and iterate on guardrails before making Carbon available to developers, businesses, and consumers via our product surfaces as soon as possible.

我们正采取审慎的发布策略，并积极参与美国政府的预发布模型测试自愿流程。从本周开始，我们将向部分网络防御者开放 Carbon，并通过我们的 Fairwind 计划逐步向更多受信任的合作伙伴开放访问权限。我们将继续收集反馈并迭代安全护栏，以便尽快通过我们的产品界面向开发者、企业和消费者提供 Carbon。

Gemini 4 Carbon will launch at the same introductory price 1 as Argon at $2 per million input tokens and $10 per million output tokens, with cached input tokens priced at 95% off input token price. Improving coding and reasoning for challenging, long-horizon tasks Designed to take on much harder, long-horizon engineering problems, Carbon is built for sustained agentic workflows.

Gemini 4 Carbon 的发布价格与 Argon 的首发价格相同，即每百万输入 token 2 美元，每百万输出 token 10 美元，缓存的输入 token 可享受输入 token 价格 95% 的折扣。改进针对挑战性长周期任务的编码和推理能力：Carbon 旨在应对更艰巨的长周期工程问题，专为持续的智能体工作流而构建。

Internally, our teams have seen Carbon run for days to persist through dead ends to tackle complex, multi-step engineering tasks like root-causing and patching subtle bugs across large codebases and low-level systems. Building on user feedback, we focused on improving model performance across a variety of domains, including coding, agentic, and scientific tasks, as well as full-stack web development and multimodal understanding.

在内部，我们的团队观察到 Carbon 可以运行数天，在遇到死胡同时坚持不懈，以解决复杂的、多步骤的工程任务，例如在大型代码库和底层系统中查找根本原因并修复细微漏洞。基于用户反馈，我们专注于提升模型在多个领域的性能，包括编码、智能体和科学任务，以及全栈 Web 开发和多模态理解。

With improved quality of output and artifacts in web development, Carbon jumps +89 elo points to land at #4 (1768) on WebDev Arena. State-of-the-art cybersecurity performance to help build secure systems Gemini 4 Carbon delivers a significant leap in cybersecurity capabilities. It achieves state-of-the-art performance across the cybersecurity defense lifecycle — vulnerability detection, validation, and remediation.

随着 Web 开发中输出质量和工件的提升，Carbon 在 WebDev Arena 上的 Elo 分数跃升了 89 点，排名第四（1768 分）。最先进的网络安全性能助力构建安全系统：Gemini 4 Carbon 在网络安全能力方面实现了重大飞跃。它在整个网络安全防御生命周期（漏洞检测、验证和修复）中实现了最先进的性能。

Our teams are already seeing strong gains in cyberdefense. On internal benchmarks, Carbon achieves more than 2x uplift in success rate for generating secure code over Argon. As another example, the Chrome team has reported that Carbon performed more than 10X better than another lab's large frontier model when generating high quality patches. Wiz, our leading Cloud security platform, also observes Carbon leading on benchmarks for web penetration testing, a core capability for Wiz's Scan for Good initiative.

我们的团队已经看到了网络防御方面的显著收益。在内部基准测试中，Carbon 在生成安全代码方面的成功率比 Argon 提高了两倍以上。另一个例子是，Chrome 团队报告称，在生成高质量补丁时，Carbon 的表现比另一个实验室的大型前沿模型好 10 倍以上。我们领先的云安全平台 Wiz 也观察到，Carbon 在 Web 渗透测试基准测试中处于领先地位，这是 Wiz 的“Scan for Good”计划的核心能力。

Carbon excels across key external benchmarks (evaluated without guardrails): Finding real vulnerabilities: Core to cybersecurity defense is finding real vulnerabilities. Carbon achieves a state-of-the-art 88.2% on SEC-bench Pro, autonomously uncovering complex flaws buried in real-world software.

Carbon 在关键的外部基准测试中表现出色（在没有护栏的情况下进行评估）：发现真实漏洞：网络安全防御的核心是发现真实漏洞。Carbon 在 SEC-bench Pro 上达到了 88.2% 的最先进水平，能够自主发现隐藏在现实软件中的复杂缺陷。

Validating risk through exploitation: To prioritize which vulnerabilities to remediate first or remediate at all, cyber defenders increasingly rely on models to check which vulnerabilities are exploitable. Carbon sets a new state-of-the-art on the popular exploitation benchmark ExploitGym (54.8%). Patching at the root cause: Ultimately after identifying the vulnerabilities, fixing the root cause is a critical step in the cybersecurity defense lifecycle. Carbon reaches 71.0% on Collinear’s CWE-bench, turning validated findings directly into working code fixes.

通过漏洞利用验证风险：为了确定优先修复哪些漏洞，或者是否需要修复，网络防御者越来越依赖模型来检查哪些漏洞是可利用的。Carbon 在流行的漏洞利用基准测试 ExploitGym 上创下了 54.8% 的新纪录。从根本原因上进行修复：最终在识别出漏洞后，修复根本原因是网络安全防御生命周期中的关键一步。Carbon 在 Collinear 的 CWE-bench 上达到了 71.0%，将验证后的发现直接转化为有效的代码修复。

Advancing frontier model safety & security Gemini 4 Carbon builds on the same multi-layered safety and security stack of Argon — combining model training, real-time misuse defenses, prompt-injection resilience, and chain-of-thought monitoring. In particular, we made significant strides in model alignment with Argon, and reported its propensities to behave in an aligned way in our Safety and Security report. With Carbon, we challenged ourselves to go a step further on alignment, and trained the model to respond to complex or high-pressure tasks in the right way.

推进前沿模型安全：Gemini 4 Carbon 构建在与 Argon 相同的多层安全堆栈之上，结合了模型训练、实时滥用防御、提示注入防御和思维链监控。特别是，我们在 Argon 的模型对齐方面取得了重大进展，并在我们的安全报告中报告了其以对齐方式运行的倾向。对于 Carbon，我们挑战自己，在对齐方面更进一步，并训练模型以正确的方式响应复杂或高压任务。

Reducing shortcuts and loophole exploitation: With Carbon, we further mitigated shortcut attempts in training while ensuring high-quality coding performance. Carbon reduced successful cheating on Terminal-Bench 4.0 to 0.0%, with attempts to cheat dropping to 0.4% — all while improving overall accuracy. In live coding environments with our internal teams, we observed that high-severity misalignment alerts dropped by almost 80%.

减少捷径和漏洞利用：通过 Carbon，我们进一步减轻了训练中的捷径尝试，同时确保了高质量的编码性能。Carbon 将 Terminal-Bench 4.0 上的成功作弊率降低至 0.0%，作弊尝试降至 0.4%，同时提高了整体准确性。在我们内部团队的实时编码环境中，我们观察到高严重性的失准警报下降了近 80%。

Greater transparency and honesty: In our internal testing, Carbon cuts unsupported claims by approximately 2x over Argon. It puts methodological caveats directly into the deliverable or withholds blocked actions with a clear list of what remains required, rather than fabricating or hedging around missing evidence.

更高的透明度和诚实度：在我们的内部测试中，Carbon 将无根据的声明减少了约两倍（相比 Argon）。它将方法论上的注意事项直接放入交付成果中，或者在阻止操作时提供一份明确的剩余需求清单，而不是编造或对缺失的证据含糊其辞。

Improved collaboration with the user in the face of ambiguity: Rather than guessing or forcing a path forward, Carbon retrieves the relevant sources and surfaces discrepancies to the user before acting — as a result, users should observe a much better collaborative experience with Carbon. Following t

在面对模糊性时改善与用户的协作：Carbon 不会猜测或强行推进，而是在采取行动之前检索相关来源并将差异呈现给用户——因此，用户应该会感受到与 Carbon 更好的协作体验。跟随 t