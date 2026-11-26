---
title: "DeepSeek Found a Vuln for $0.81. Here's How A Security's ARENA Benchmark Actually Measured That"
originalUrl: "https://dev.to/euk_ela_a3e7ed01aa3f7314e/deepseek-found-a-vuln-for-081-heres-how-a-securitys-arena-benchmark-actually-measured-that-1hp3"
date: "2026-11-26T03:30:49.000Z"
excerpt: false
---

Title: DeepSeek Found a Vuln for $0.81. Here's How A Security's ARENA Benchmark Actually Measured That

标题：DeepSeek 以 0.81 美元的价格发现了一个漏洞。A Security 的 ARENA 基准测试究竟是如何衡量这一点的

The headline number is real. The methodology is the story. On November 23, Israeli security firm A Security published a benchmark where open-source DeepSeek V4.1 Flash found 93% of confirmed vulnerabilities per round at $0.81 per confirmed vulnerability. GPT-5.6 Sol cost $31.85 per confirmed vulnerability. GPT-6 Sol found 55% per round. Those numbers are eye-catching. But this post is not about who won. It is about how the numbers were produced — because the benchmark's real value is that it published its methodology, and three caveats inside that methodology decide whether the numbers transfer to your production environment.

头条数字是真实的，但方法论才是重点。11 月 23 日，以色列安全公司 A Security 发布了一项基准测试，显示开源模型 DeepSeek V4.1 Flash 在每轮测试中发现了 93% 的已确认漏洞，每个漏洞的成本为 0.81 美元。相比之下，GPT-5.6 Sol 每个已确认漏洞的成本为 31.85 美元，而 GPT-6 Sol 每轮发现了 55% 的漏洞。这些数字非常引人注目，但本文并非为了讨论谁赢了，而是为了探讨这些数字是如何产生的——因为该基准测试的真正价值在于它公开了其方法论，而方法论中的三个注意事项决定了这些数字是否适用于你的生产环境。

1. ARENA: the targets are freshly generated, not recycled. The benchmark runs on A Security's ARENA, an open-source target generator. It works like this: It generates containerized web applications, each with verified, planted vulnerabilities. It adds real defenses: a web application firewall, rate limiting, and hidden endpoints. The targets were generated specifically for this benchmark, so the models could not have seen the answers in training data. Point three matters most. A chronic flaw of security benchmarks is leaked questions — the model is not "finding" the vulnerability, it is recalling it. ARENA's freshly generated targets close that hole. The trade-off is that the number and diversity of targets are limited by the generator itself.

1. ARENA：目标是新生成的，而非循环利用的。该基准测试运行在 A Security 的开源目标生成器 ARENA 上。其工作原理是：生成容器化的 Web 应用程序，每个程序都包含经过验证的植入漏洞。它还添加了真实的防御措施：Web 应用防火墙、速率限制和隐藏端点。这些目标是专门为本次基准测试生成的，因此模型不可能在训练数据中见过答案。第三点最为关键。安全基准测试的一个长期缺陷是题目泄露——模型并非在“发现”漏洞，而是在“回忆”漏洞。ARENA 新生成的目标填补了这一漏洞。其代价是目标的数量和多样性受到生成器本身的限制。

2. Four agents split the work — and the cost only counts part of it. A Security split exploitation across four agents, each owning one stage: reconnaissance, analysis, exploitation, and verification. Seven models — DeepSeek V4.1 Flash, GLM 5.3, Gemini 3.8 Flash, Grok 4.7, GPT-6 Sol, GPT-5.6 Sol, and others — served as the "brains" of this system across three rounds. Here is the first caveat: the cost counts only the four exploitation agents. Discovery, browser operation, report writing, and orchestrator calls are excluded. A Security states this in the original write-up. So $0.81 is not "the price of one complete security scan." It is "the marginal cost of four exploitation agents finding one confirmed vulnerability." Copying it into a production quote will underestimate the real cost — by how much depends on how heavy your orchestration layer is.

2. 四个代理分担工作——且成本仅计算了其中一部分。A Security 将漏洞利用过程分配给四个代理，每个代理负责一个阶段：侦察、分析、利用和验证。七个模型——DeepSeek V4.1 Flash、GLM 5.3、Gemini 3.8 Flash、Grok 4.7、GPT-6 Sol、GPT-5.6 Sol 等——在三轮测试中充当了该系统的“大脑”。这里是第一个注意事项：成本仅计算了四个漏洞利用代理的费用。发现、浏览器操作、报告撰写和编排器调用均被排除在外。A Security 在原始报告中说明了这一点。因此，0.81 美元并非“一次完整安全扫描的价格”，而是“四个漏洞利用代理发现一个已确认漏洞的边际成本”。将其直接套用到生产报价中会低估实际成本，具体低估多少取决于你的编排层有多复杂。

3. The numbers: detection rate and cost. Two details deserve to be pulled out: GLM 5.3's 100% is a different kind of strong. Its single-round 86% trails DeepSeek, but across three rounds it was the only model to find every vulnerability. Its exploration paths differ each round, so coverage comes from "running more rounds." That is a warning for anyone who runs once and ships the result. DeepSeek's 93% was identical every round. Three rounds, same result. In this benchmark, stability is one of the hardest signals — cheap and stable beats cheap and jittery.

3. 数据：检测率与成本。有两个细节值得一提：GLM 5.3 的 100% 覆盖率代表了另一种强大的能力。它单轮 86% 的检测率落后于 DeepSeek，但在三轮测试中，它是唯一发现所有漏洞的模型。它的探索路径每轮都不同，因此覆盖率是通过“运行更多轮次”获得的。这对那些只运行一次就交付结果的人来说是一个警示。DeepSeek 的 93% 在每一轮中都是相同的。三轮测试，结果一致。在此基准测试中，稳定性是最难获得的信号之一——便宜且稳定胜过便宜且不稳定。

4. Three caveats that decide whether the numbers are usable. Caveat one: the pricing basis is not uniform. GLM 5.3 was costed on official token pricing; the other models were costed on actual provider spend. DeepSeek switched provider routes mid-benchmark (the early route had severe fallback problems; the pinned route is what produced stable results). Different providers and different routes move the cost numbers. Caveat two: time is not a model speed ranking. DeepSeek took about 4.5 model-minutes per target, only slightly slower than GPT-6 Sol's 2.9 minutes; GLM 5.3 and Gemini needed 14 to 15 minutes. But A Security is explicit that time reflects the specific inference provider and configuration — it cannot be read as a fixed model speed ranking. Caveat three: the out-of-scope rate. DeepSeek went outside the permitted test scope in 4.5% or more of its runs, versus under 2.5% for the other models. In a real authorized test, going out of scope can mean touching systems you were not supposed to touch. High detection rate, but boundary discipline needs to be graded separately.

4. 决定数据是否可用的三个注意事项。注意事项一：定价基础不统一。GLM 5.3 的成本基于官方 Token 定价，而其他模型基于实际供应商支出。DeepSeek 在基准测试期间切换了供应商路由（早期路由存在严重的故障转移问题；固定路由才产生了稳定的结果）。不同的供应商和路由会改变成本数字。注意事项二：时间并非模型速度排名。DeepSeek 每个目标耗时约 4.5 个模型分钟，仅比 GPT-6 Sol 的 2.9 分钟稍慢；GLM 5.3 和 Gemini 需要 14 到 15 分钟。但 A Security 明确表示，时间反映的是特定的推理供应商和配置，不能被解读为固定的模型速度排名。注意事项三：越界率。DeepSeek 在 4.5% 或更多的运行中超出了允许的测试范围，而其他模型则低于 2.5%。在真实的授权测试中，越界可能意味着触碰了不该触碰的系统。高检测率固然好，但边界纪律需要单独评估。

Four takeaways for security practitioners. Set the benchmark rules before reading the ranking. Ask what the cost includes, what pricing basis was used, and how many rounds were run. Reading only "cost per vulnerability" is how you get burned. Use cheap models first for regression and bulk work. DeepSeek's cost structure fits high-frequency, low-risk scanning — run it through, then bring in the expensive model to double-check. More rounds are cheaper than switching models. GLM 5.3 shows that the same model with different exploration paths can close the coverage gap. Add rounds before adding budget. Put the out-of-scope rate on the acceptance checklist. Grade "stayed inside the authorized scope" alongside detection rate and cost.

给安全从业者的四个建议。在阅读排名之前先设定基准规则。询问成本包含什么、使用了什么定价基础以及运行了多少轮。只看“每个漏洞的成本”很容易让你吃亏。先使用廉价模型进行回归和批量工作。DeepSeek 的成本结构适合高频、低风险的扫描——先运行它，然后引入昂贵的模型进行复核。增加轮次比更换模型更便宜。GLM 5.3 表明，同一个模型通过不同的探索路径可以弥补覆盖率差距。在增加预算之前先增加轮次。将越界率纳入验收清单。将“保持在授权范围内”与检测率和成本一同进行评估。

Discussion. Does your team price vulnerability scanning per vulnerability found, or per scan run? The two accounting methods lead to completely different tooling decisions — which one are you on?

讨论。你的团队是按发现的漏洞数量还是按扫描次数来计算漏洞扫描成本的？这两种核算方法会导致完全不同的工具决策——你倾向于哪一种？