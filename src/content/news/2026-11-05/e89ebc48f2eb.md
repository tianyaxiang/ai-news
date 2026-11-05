---
title: "We Tried Building an AI Security Researcher That Never Sleeps"
originalUrl: "https://dev.to/ibrahimpima/we-tried-building-an-ai-security-researcher-that-never-sleeps-1lee"
date: "2026-11-05T01:15:22.000Z"
excerpt: false
---

# We Tried Building an AI Security Researcher That Never Sleeps

A few days ago, Binance disclosed a major security incident involving approximately $6.34 billion in impacted digital assets. Let that sink in for a second. $6.34 billion. Binance later explained that the attack involved compromised internal systems and unauthorized wallet transactions. The company also said it would absorb the financial impact rather than pass it on to users. And this isn't just a Binance problem. It's a reminder of how expensive security failures can become, even for companies with dedicated security teams.

几天前，币安披露了一起重大安全事件，涉及约 63.4 亿美元的受影响数字资产。请花点时间消化一下这个数字：63.4 亿美元。币安随后解释称，此次攻击涉及内部系统受损和未经授权的钱包交易。该公司还表示，将自行承担财务损失，而不是转嫁给用户。这不仅仅是币安一家的问题，它提醒我们，即使对于拥有专业安全团队的公司来说，安全故障的代价也可能极其高昂。

Meanwhile, we're in a world where developers are shipping code faster than ever. AI has made building products significantly easier, but security hasn't necessarily caught up with that speed. More code is being shipped, more products are going live, and vulnerabilities can easily slip through the cracks. We started thinking: what if teams had a security researcher working alongside them all the time? Someone who could investigate potential vulnerabilities without having to wait for a manual security review. Well, we decided to try building exactly that. Meet Hackclawd 🦀

与此同时，我们所处的世界中，开发人员发布代码的速度比以往任何时候都快。人工智能使产品构建变得更加容易，但安全性却未必能跟上这种速度。更多的代码被发布，更多的产品上线，漏洞很容易被忽略。我们开始思考：如果团队身边一直有一位安全研究员会怎样？一位无需等待人工安全审查就能调查潜在漏洞的人。于是，我们决定尝试构建这样一个工具。隆重介绍 Hackclawd 🦀。

We tried putting an AI security researcher inside Slack that never sleeps, never takes a day off, and doesn't ask for weekends off. 😂 That's basically Hackclawd. We built an AI-powered bug bounty agent that works directly inside your team's Slack workspace, powered by Switch. The idea was pretty simple. Developers already spend most of their time collaborating in Slack, so why should security testing feel like an entirely separate workflow? With Hackclawd, you simply give it an authorized bug bounty program or codebase, and it gets to work.

我们尝试在 Slack 中植入一位从不睡觉、从不休假、也不要求周末休息的人工智能安全研究员。😂 这基本上就是 Hackclawd。我们构建了一个由 Switch 驱动的 AI 漏洞赏金代理，它直接在团队的 Slack 工作区内运行。这个想法很简单：开发人员大部分时间都在 Slack 上协作，那么为什么安全测试非要感觉像是一个完全独立的工作流程呢？有了 Hackclawd，你只需提供一个授权的漏洞赏金计划或代码库，它就会开始工作。

So, how does it actually work? Once you mention Hackclawd in a Slack channel and provide the program details and scope, it kicks off its security workflow. It investigates potential vulnerabilities across different surfaces, including: Web applications, Solidity and smart contracts, and AI systems. But here's where things get interesting. We didn't want to build another AI tool that scans some code, throws a bunch of suspicious findings at you, and calls it a day. Hackclawd also validates potential findings by running proof-of-concept code inside an isolated Upstash Box sandbox.

那么，它到底是如何工作的呢？一旦你在 Slack 频道中提到 Hackclawd 并提供程序详细信息和范围，它就会启动安全工作流程。它会调查不同层面的潜在漏洞，包括：Web 应用程序、Solidity 和智能合约以及人工智能系统。但有趣的地方在于：我们不想再构建一个只会扫描代码、抛出一堆可疑发现然后就草草了事的 AI 工具。Hackclawd 还会通过在隔离的 Upstash Box 沙箱中运行概念验证（PoC）代码来验证潜在的发现。

The sandbox has restricted network access, so PoC execution happens against local copies rather than live targets. Once it's done, Hackclawd sends a report back to Slack containing the potential vulnerability, supporting evidence, proof-of-concept code, and reproduction steps. Findings remain candidates until a human reviews and confirms them. Basically, it does the heavy lifting while your team stays in the workflow they're already familiar with.

沙箱具有受限的网络访问权限，因此 PoC 执行是在本地副本而非实时目标上进行的。完成后，Hackclawd 会将包含潜在漏洞、支持证据、概念验证代码和复现步骤的报告发送回 Slack。在人工审核并确认之前，这些发现仅作为候选漏洞。简而言之，它承担了繁重的工作，而你的团队则可以保持在他们已经熟悉的工作流程中。

Building it with Switch: One of the interesting parts of this project was bringing everything together. We used Switch to connect Slack to our AI agent and manage conversations across channels and threads. Under the hood, we also integrated: Nebius (for the AI model), Upstash Box (for isolated execution), Slack (the interface), and Switch (the connecting layer). Getting these pieces to work together into one workflow was a fun engineering challenge.

使用 Switch 构建：这个项目最有趣的部分之一是将所有内容整合在一起。我们使用 Switch 将 Slack 连接到我们的 AI 代理，并管理跨频道和线程的对话。在底层，我们还集成了：Nebius（用于 AI 模型）、Upstash Box（用于隔离执行）、Slack（交互界面）以及 Switch（连接层）。将这些部分整合到一个工作流程中是一项有趣的工程挑战。

What's next? Hackclawd is our attempt at making security research more accessible and less painful for development teams. We're not trying to replace security researchers or claim that an AI agent can catch every vulnerability. We just think teams should have a way to automate more of the tedious work involved in finding and validating bugs. Because if AI is helping us write code faster, maybe it should also help us find the security issues in that code. And honestly, having a security researcher in Slack that never asks for a day off sounds pretty cool to us. 😂

接下来是什么？Hackclawd 是我们让安全研究对开发团队而言更易于访问、更少痛苦的一次尝试。我们并不是要取代安全研究员，也不是声称 AI 代理可以捕获每一个漏洞。我们只是认为，团队应该有一种方法来自动化处理发现和验证漏洞过程中涉及的更多繁琐工作。因为如果 AI 正在帮助我们更快地编写代码，那么它或许也应该帮助我们发现代码中的安全问题。老实说，在 Slack 中拥有一位从不要求休假的安全研究员，对我们来说听起来很酷。😂