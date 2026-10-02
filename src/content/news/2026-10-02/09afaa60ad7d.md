---
title: "Pi Durable"
originalUrl: "https://earendil.com/posts/pi-durable/"
date: "2026-10-02T00:53:46.364Z"
---

# Pi Durable

Today Earendil and the Pi community shipped Pi 1.0. This reflects our belief that after countless hours of hardening, maintenance, and active development, Pi is now a solid foundation on which to build. Pi also continues to evolve. Together with Pi 1.0, we are shipping an experimental new package called Pi Durable. Pi Durable was built specifically for long-running, durable, and malleable agents that can run anywhere. We would like you to join in the fun and help us make it the best durable harness there is.

今天，Earendil 和 Pi 社区正式发布了 Pi 1.0。这反映了我们的信念：经过无数小时的加固、维护和积极开发，Pi 现在已经成为一个坚实的构建基础。Pi 也在持续演进。伴随 Pi 1.0，我们还发布了一个名为 Pi Durable 的实验性新包。Pi Durable 专为那些可以随处运行、长期存续且具备高度可塑性的智能体（Agents）而构建。我们诚邀您加入并帮助我们将其打造为最出色的持久化框架（Harness）。

### Why Pi Durable?
### 为什么选择 Pi Durable？

Pi the coding agent is built to run on your (remote) machine, inside a terminal, driven by one person. If the process dies, you look at what happened and tell it to continue. That is what Pi 1.0 focuses on and excels at, and that is not changing. At Earendil, we want to bring this technology to everyone, in whatever form fits their needs best. For that, we need a harness that runs anywhere, can be reached from different surfaces, supports infinitely long conversations, survives catastrophic internal and external failures, and lets multiple humans steer the same agents. Pi Durable is that harness.

Pi 编程智能体旨在运行在您的（远程）机器上，位于终端内，由单人驱动。如果进程崩溃，您只需查看发生了什么并指示它继续即可。这正是 Pi 1.0 的核心优势，且这一点不会改变。在 Earendil，我们希望以最适合用户需求的形式将这项技术带给每个人。为此，我们需要一个能够随处运行、可从不同界面访问、支持无限长对话、能在灾难性内外故障中存活，并允许多人共同操控同一智能体的框架。Pi Durable 正是为此而生。

It does not replace the Pi coding agent. It is a framework for building any agentic application, coding agents included. It shares not only code with the Pi coding agent, like pi-ai, but also its principles: minimalism and malleability. It also lets us explore designs in this space without disrupting Pi the coding agent. Lessons we learn building agentic applications on Pi Durable will flow back into Pi the coding agent as they prove themselves valuable.

它并不会取代 Pi 编程智能体。它是一个用于构建任何智能体应用的框架，包括编程智能体在内。它不仅与 Pi 编程智能体共享代码（如 pi-ai），还共享其核心原则：极简主义与可塑性。它还让我们能够在不干扰 Pi 编程智能体的前提下，探索该领域的设计。我们在构建 Pi Durable 应用过程中学到的经验，一旦证明其价值，将回馈到 Pi 编程智能体中。

### What is a harness?
### 什么是框架（Harness）？

Everybody has their own definition of a harness. We wrote about this previously, but let us reintroduce the concept of the harness for Pi Durable. A harness is storage plus the machinery needed to run one or more conversations with large language models in parallel. It provides the tools those models call, and the execution environments the tools run in. A conversation is an interaction between you and an agent, recorded as a transcript. The agent is the large language model together with its settings, like the thinking level, and the tools it can call. Tools do their work through an execution environment, which can be your laptop, a remote VM, or an in-memory sandbox. Which tools and which execution environment an agent gets is up to each conversation. Everything the harness runs, from calling the model to executing a tool, is a task.

每个人对“框架”（Harness）都有自己的定义。我们之前曾讨论过这一点，但让我们为 Pi Durable 重新引入这个概念。框架即“存储”加上“运行一个或多个大语言模型并行对话所需的机制”。它提供了模型调用的工具，以及工具运行所需的执行环境。对话是您与智能体之间的交互，记录为文本流。智能体由大语言模型及其设置（如思考深度）以及可调用的工具组成。工具通过执行环境完成工作，执行环境可以是您的笔记本电脑、远程虚拟机或内存沙箱。智能体获得哪些工具和执行环境取决于具体的对话。框架运行的一切——从调用模型到执行工具——都被视为一个任务。

Like everything in Pi, Pi Durable is built so your agent can understand it. The entire source code, without tests, is about 15,000 lines, which comes out to about 150,000 tokens with GPT and about 250,000 with Claude. That's the worst case. To build on Pi Durable, your agent rarely needs all of it; the storage backends alone are 3,000 lines it can usually skip. Now let us give you a little tour of Pi Durable, to illustrate what we built and why we built it.

与 Pi 的一切一样，Pi Durable 的构建初衷是让您的智能体能够理解它。除去测试代码，整个源代码约为 15,000 行，换算成 Token 大约是 GPT 的 150,000 个或 Claude 的 250,000 个。这是最坏的情况。在 Pi Durable 上进行开发时，您的智能体很少需要全部代码；仅存储后端就占了 3,000 行，通常是可以跳过的。现在，让我们带您简单了解一下 Pi Durable，以说明我们构建了什么以及为什么要构建它。

### Long runs anywhere
### 随处运行，长期存续

We want agents to run for a long time and to be able to run anywhere, where anywhere currently means anywhere there is a JavaScript runtime. In Pi Durable, a harness opens over a storage backend. Pi Durable ships memory, SQLite, and JSONL storage, plus a conformance suite and benchmarks for your own backend. The SQLite and JSONL storage code uses no Node APIs, so with a small adapter it runs on Bun or inside a Cloudflare Durable Object. The storage interface is small and easy to implement on top of whatever you have, like a key-value store or Postgres.

我们希望智能体能够长时间运行，并且能够随处运行——目前“随处”意味着任何拥有 JavaScript 运行时的地方。在 Pi Durable 中，框架通过存储后端开启。Pi Durable 提供了内存、SQLite 和 JSONL 存储，以及用于您自定义后端的合规性套件和基准测试。SQLite 和 JSONL 的存储代码不使用任何 Node API，因此只需一个小型适配器，它就可以在 Bun 或 Cloudflare Durable Object 中运行。存储接口非常精简，易于在您现有的任何存储（如键值存储或 Postgres）之上实现。

One process owns a storage at a time, and other clients attach to that process. On SQLite, the harness only keeps the working set in memory: the active transcripts, live tasks, and pending submissions. Everything else stays on disk until it is needed. Active transcripts are naturally bounded by the model's context window, because compaction summarizes older messages before they overflow it. So even a conversation with tens of thousands of messages fits snugly into memory.

同一时间只有一个进程拥有存储权限，其他客户端则连接到该进程。在 SQLite 上，框架仅将工作集保留在内存中：即活动的对话记录、实时任务和待处理的提交。其余所有内容都保留在磁盘上，直到需要时才读取。活动的对话记录自然受到模型上下文窗口的限制，因为压缩机制会在旧消息溢出前对其进行总结。因此，即使是包含数万条消息的对话也能轻松放入内存。

Tools that need files or a shell get them from an execution environment. Pi Durable ships a Node execution environment, which gives tools access to your local files. Like storage, the execution environment interface is small and easy to implement, so you can also expose remote execution environments to your tools. That allows the harness to run on one machine while its tools run on another. Your env function builds the environment for every tool call, from the conversation's working directory, so each conversation can run in a different place.

需要文件或 Shell 的工具从执行环境中获取资源。Pi Durable 提供了一个 Node 执行环境，使工具能够访问您的本地文件。与存储一样，执行环境接口也很小且易于实现，因此您也可以将远程执行环境暴露给工具。这使得框架可以在一台机器上运行，而工具在另一台机器上运行。您的 `env` 函数会根据对话的工作目录为每次工具调用构建环境，因此每个对话都可以在不同的位置运行。

*(Code snippet omitted for brevity)*

### Survives crashes
### 故障恢复

We want an agent to survive its process dying, whether the laptop sleeps, the container is redeployed, or the machine runs out of memory, and to pick up where it left off.

我们希望智能体在进程终止后依然能够存活——无论是笔记本电脑休眠、容器重新部署，还是机器内存耗尽——并能从中断的地方继续执行。