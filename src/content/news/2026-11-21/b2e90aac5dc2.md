---
title: "Frostbite: A new CPU architecture discovered, designed and verified by AI"
originalUrl: "https://architectlabs.com/blog/frostbite"
date: "2026-11-20T10:01:41.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

Privacy Policy© 2026 Architect Silicon Inc.

隐私政策© 2026 Architect Silicon Inc.

In our previous post, Redwood, we showed that given an architecture, our AI systems could implement, verify, and deploy an inference accelerator in record time. However, similar to other scientific domains, we believe that AI systems, given the correct freedom and guardrails, can co-design software and hardware together, making optimizations across the stack and opening a design space so large it was previously inaccessible. We set out to answer the question: “Could our AI systems & tools lead to a novel hardware discovery that radically outperforms human-made designs?”

在我们之前的文章《Redwood》中，我们展示了在给定架构的情况下，我们的人工智能系统能够在创纪录的时间内实现、验证并部署推理加速器。然而，与其他科学领域类似，我们相信人工智能系统在获得正确的自由度和护栏的情况下，可以共同设计软件和硬件，在整个堆栈中进行优化，并打开一个以前无法触及的巨大设计空间。我们着手回答这个问题：“我们的人工智能系统和工具能否带来一种在性能上彻底超越人类设计的新型硬件发现？”

Today, we're introducing Frostbite, a general-purpose CPU with a new instruction set built from the ground up. Frostbite exploits the properties of interaction nets, namely that every step is local, every dependency is explicit, and every value has exactly one owner, to reach a step-function gain in CPU performance that has long stagnated. On a set of 25 initially chosen workloads, including 15 held out until the final evaluation, we achieved a 4.59x performance-per-watt multiple when compared to a modern, silicon-proven superscalar (dual-issue, in-order) CPU core.

今天，我们推出 Frostbite，这是一款从零开始构建、具有全新指令集的通用 CPU。Frostbite 利用交互网（interaction nets）的特性，即每一步都是局部的、每个依赖关系都是明确的、每个值都恰好有一个所有者，从而在长期停滞的 CPU 性能上实现了阶跃式增长。在一组最初选择的 25 个工作负载（包括 15 个留待最终评估的工作负载）上，与现代经过硅验证的超标量（双发射、顺序执行）CPU 内核相比，我们实现了 4.59 倍的每瓦性能提升。

Our AI systems autonomously iterated over the compiler, ISA, architecture, microarchitecture, RTL, verification, and final GDS. When we took a closer look at the discovered architectural primitives, we were surprised to find novel hardware implementations and runtime features that would have otherwise been difficult to architect. In spite of stagnation in CPU core improvement, we were able to take a workload concept all the way to a final GDS, and prove a step-function increase in perf/W and perf/area. We believe that as AI systems become more capable, every class of chip we know today, from datacenter-grade CPUs, to AI accelerators, to networking switches and NICs, will go through similar fundamental architectural shifts.

我们的人工智能系统自主迭代了编译器、ISA、架构、微架构、RTL、验证和最终的 GDS。当我们仔细观察所发现的架构原语时，我们惊讶地发现了一些新颖的硬件实现和运行时特性，这些特性在以前是很难架构出来的。尽管 CPU 内核的改进陷入停滞，但我们还是能够将工作负载概念一直推进到最终的 GDS，并证明了在每瓦性能和单位面积性能上的阶跃式增长。我们相信，随着人工智能系统变得越来越强大，我们今天所知的每一类芯片，从数据中心级 CPU 到人工智能加速器，再到网络交换机和网卡，都将经历类似的根本性架构转变。

Mainstream programming languages, when compiled for general-purpose CPUs, hide the dependencies between the parts of a program. Any piece of code may read or write any variable through a shared, mutable state, and so modern CPU hardware assumes the worst case and rediscovers, at runtime, which instructions actually depend on each other. Moreover, single-core CPU performance has largely stalled since the early 2000s, pushing people towards large multicore CPUs such as Intel Xeon, AMD Zen, and NVIDIA Vera. This forces CPUs to maintain the illusion that every core sees the same memory, and keeping that illusion consistent and performant requires deep cache hierarchies and coherence protocols that cost area and power, and scale poorly.

主流编程语言在为通用 CPU 编译时，隐藏了程序各部分之间的依赖关系。任何代码片段都可能通过共享的可变状态读取或写入任何变量，因此现代 CPU 硬件会假设最坏的情况，并在运行时重新发现哪些指令实际上相互依赖。此外，单核 CPU 的性能自 21 世纪初以来基本停滞不前，促使人们转向英特尔至强（Intel Xeon）、AMD Zen 和英伟达 Vera 等大型多核 CPU。这迫使 CPU 维持一种“每个内核都能看到相同内存”的错觉，而保持这种错觉的一致性和高性能需要深层的缓存层次结构和一致性协议，这会消耗面积和功耗，且扩展性较差。

Interaction nets take a different approach. A program is a graph of nodes, and computation happens by rewriting pairs of nodes that are connected through their ports. Every rewrite only touches a small, local part of the graph. Because each node has exactly one principal port, no two of these active pairs ever overlap, so they can be rewritten in any order, or all at once, and the result is always the same. Interaction nets are also linear: every value is used exactly once, so there is no shared mutable state for the hardware to guard. Languages such as Vine compile ordinary-looking programs directly to interaction nets. For an excellent introduction to interaction nets and why they suit hardware, we highly recommend Tendrils' “On Interaction Nets.”

交互网采取了不同的方法。程序是一个节点图，计算通过重写通过端口连接的节点对来发生。每次重写只触及图中很小的一部分。由于每个节点只有一个主端口，这些活动对永远不会重叠，因此它们可以以任何顺序或同时重写，结果始终相同。交互网也是线性的：每个值只被使用一次，因此硬件无需保护共享的可变状态。像 Vine 这样的语言可以直接将看起来普通的程序编译为交互网。关于交互网及其为何适合硬件的精彩介绍，我们强烈推荐 Tendrils 的《关于交互网》（On Interaction Nets）。

Fig. 1 shows the difference on a small search problem, placing five queens on a five-by-five board. The sequential program visits one candidate at a time. The interaction net exposes all of its independent work: on average, about twelve interactions are ready to run at every step. Nothing about the program was rewritten to get this parallelism; the dependencies were simply never thrown away.

图 1 展示了在一个小型搜索问题上的差异，即在 5x5 的棋盘上放置五个皇后。顺序程序一次访问一个候选者。交互网暴露了其所有的独立工作：平均而言，每一步大约有十二个交互准备就绪。程序本身没有经过任何重写来获得这种并行性；依赖关系只是从未被丢弃。

In theory, this should have two large advantages. The first is multithreading for free: rather than varying levels of coarse and fine-grained parallelism, parallelism comes straight from the program. No threads, locks, or race conditions, and none of the out-of-order machinery a conventional core uses to dig it back out. The second is that, since every value has one owner and every step is local, data can live in small local memories next to where it is used. That removes much of the area and power a conventional chip spends on large caching subsystems, and much of the system-level complexity of keeping those caches coherent.

理论上，这应该有两个巨大的优势。第一个是免费的多线程：并行性直接来自程序，而不是不同级别的粗粒度和细粒度并行。没有线程、锁或竞争条件，也没有传统内核用来挖掘并行性的乱序机制。第二个优势是，由于每个值都有一个所有者，且每一步都是局部的，数据可以驻留在其使用位置附近的小型本地内存中。这消除了传统芯片在大型缓存子系统上花费的大量面积和功耗，也减少了保持这些缓存一致性所需的系统级复杂性。

Frostbite was designed with zero architectural priors. We followed the process below, riding multiple agent swarms along the way.

Frostbite 的设计没有任何架构先验。我们遵循了以下流程，并在此过程中利用了多个智能体群。

To begin architectural exploration, we had to establish the set of workloads Frostbite should do exceedingly well in. We decided to look at different ways a program could expose its work: many independent pieces at once, rounds of parallel work, long sequential chains, data-dependent branches, and recursion. Under each category, we created a search set and a held-out eval set to evaluate the final Frostbite on, ensuring the design generalized to programs it was never tuned on. The kernels for FFT, radixsort, and LU follow the implementation in the SPLASH-2 benchmark, although 64 times smaller, because at regular sizes they are not suitable for exploratory work.

为了开始架构探索，我们必须确定 Frostbite 应该在哪些工作负载上表现出色。我们决定研究程序暴露其工作的不同方式：同时处理许多独立部分、多轮并行工作、长顺序链、数据依赖分支和递归。在每个类别下，我们都创建了一个搜索集和一个留待评估的评估集，以评估最终的 Frostbite，确保设计能够推广到从未针对其进行调整的程序。FFT、基数排序和 LU 的内核遵循 SPLASH-2 基准测试中的实现，尽管规模缩小了 64 倍，因为在常规规模下它们不适合探索性工作。

Later, we added five more practical workloads to the held-out set: a Kalman filter, PCA, finite element analysis, an LU solve, and LZ4 decompression.

后来，我们在评估集中增加了五个更实际的工作负载：卡尔曼滤波、主成分分析（PCA）、有限元分析、LU 求解和 LZ4 解压缩。

Agents synthesized research papers and existing benchmarks, and built Python models to trade off high-level architectural ideas against each other, before narrowing to a single architectural concept. The output of this exploration was a 141-page PDF covering the proposed programming model, the runtime, and the high-level blocks of the chip. This was nowhere near the final architecture, but rather a starting point where all the prior findings, high-level requirements, constraints, experiments, and runtime traits were described. Once the first architectural iterat

智能体综合了研究论文和现有基准测试，并构建了 Python 模型来权衡各种高层架构理念，最终锁定了一个单一的架构概念。这次探索的产出是一份 141 页的 PDF 文档，涵盖了拟议的编程模型、运行时以及芯片的高层模块。这远非最终架构，而是一个起点，其中描述了所有先前的发现、高层需求、约束、实验和运行时特征。一旦第一次架构迭代完成……