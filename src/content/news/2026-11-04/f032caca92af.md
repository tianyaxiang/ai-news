---
title: "F3 Lightning: How Meta Accelerates Ads ML Features to Production at Scale"
originalUrl: "https://engineering.fb.com/2026/11/03/ml-applications/f3-lightning-how-meta-accelerates-ads-ml-features-to-production/"
date: "2026-11-03T17:00:35.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

### F3 Lightning: How Meta Accelerates Ads ML Features to Production at Scale

By Xiaohe Dong, Jonathan He, Jesus Francisco Anaya Gonzalez, Purbesh Sahoo, Daniel Wang Facebook Feature Framework (F3) is Meta’s framework for authoring, compiling, and serving the machine learning features underlying ads ranking models, where a single request can require more than 20,000 features. We first presented F3 at AI @ Scale 2020. F3 reduced execution computational costs by compiling all features into a single merged graph, but that graph also served as the release unit, so a single failure or invalid definition blocked the entire release pipeline.

Facebook 特征框架 (F3) 是 Meta 用于编写、编译和服务广告排名模型底层机器学习特征的框架，单个请求可能需要超过 20,000 个特征。我们最初在 2020 年的 AI @ Scale 大会上介绍了 F3。F3 通过将所有特征编译成一个合并图来降低执行计算成本，但该图同时也作为发布单元，因此单个故障或无效定义会阻塞整个发布流水线。

This post introduces F3 Lightning, an infrastructure layer built on top of F3 to resolve this challenge by decoupling feature releases from shared execution, so each feature is compiled, validated, deployed, and rolled back independently. The hardest part to solve was preserving F3’s efficiency improvements. Early per-feature release prototypes increased CPU usage because independent features no longer shared computation. We aimed to close this gap through four optimizations: stable computation identifiers, a single shared execution plan, one shared memory buffer across all features, and dense index mapping for direct array access.

本文介绍了 F3 Lightning，这是一个构建在 F3 之上的基础设施层，旨在通过将特征发布与共享执行解耦来解决这一挑战，从而使每个特征都能独立进行编译、验证、部署和回滚。最难解决的部分是如何保持 F3 的效率提升。早期的单特征发布原型增加了 CPU 使用率，因为独立特征不再共享计算。我们旨在通过四项优化来缩小这一差距：稳定的计算标识符、单一的共享执行计划、跨所有特征的共享内存缓冲区，以及用于直接数组访问的密集索引映射。

With F3 Lightning, comparable extraction features now reach production ~3.6x faster than the prior F3, with no increase in infrastructure compute cost. This shorter release cycle also enables more model iterations in the same period.

借助 F3 Lightning，类似的提取特征现在进入生产环境的速度比之前的 F3 快约 3.6 倍，且基础设施计算成本没有增加。这种更短的发布周期也使得在同一时期内能够进行更多的模型迭代。

A Primer on F3’s Shared Execution Architecture Production machine learning systems rarely consume raw data directly. Before a model can make a prediction, its feature-serving system may need to read stored signals, filter events to a time window, count or sum values, normalize them, and combine intermediate results. The simplest design to complete this work treats every feature as an independent function. That is easy to understand, but it becomes wasteful at scale, because features are not computationally independent.

F3 共享执行架构入门：生产环境中的机器学习系统很少直接使用原始数据。在模型进行预测之前，其特征服务系统可能需要读取存储的信号、将事件过滤到时间窗口、对数值进行计数或求和、对其进行归一化，并组合中间结果。完成这项工作的最简单设计是将每个特征视为一个独立函数。这很容易理解，但在大规模应用时会变得浪费，因为特征在计算上并非相互独立。

A seven-day click count and a seven-day impression count may read the same event source and apply the same time-window filter. A click-through rate feature may then reuse both results. Running each feature separately would repeat that filter, and every other shared step, on every request. F3 approached this differently, by representing feature extraction as a directed acyclic graph (DAG). Each node performs one unit of work, such as reading an input, applying a filter, or calculating an aggregation. An edge means one computation depends on the result of another. The graph’s outputs are the feature values a model consumes.

七天点击计数和七天展示计数可能会读取相同的事件源并应用相同的时间窗口过滤器。点击率特征随后可能会重用这两个结果。如果分别运行每个特征，则会在每个请求中重复该过滤器以及所有其他共享步骤。F3 采用了不同的方法，将特征提取表示为有向无环图 (DAG)。每个节点执行一个工作单元，例如读取输入、应用过滤器或计算聚合。边意味着一个计算依赖于另一个计算的结果。图的输出是模型所使用的特征值。

Engineers author each feature independently in a high-level language. The F3 compiler turns each definition into a small graph, then merges the graphs for every feature a service uses into one merged graph (Figure 1). Where features share an operation, such as the seven-day filter above, the compiler collapses the duplicates into a single node. That shared work then runs once per request, not once for every feature that needs it. At runtime, feature extraction is a traversal of this merged graph. Figure 1: F3 consolidates all features into one merged graph.

工程师使用高级语言独立编写每个特征。F3 编译器将每个定义转换为一个小图，然后将服务使用的每个特征的图合并为一个合并图（图 1）。当特征共享一个操作（例如上述七天过滤器）时，编译器会将重复项折叠为单个节点。该共享工作随后在每个请求中运行一次，而不是为每个需要它的特征运行一次。在运行时，特征提取是对该合并图的遍历。图 1：F3 将所有特征整合到一个合并图中。

The Shared Graph Made Every Release All-or-Nothing F3’s merged graph shared computation efficiently, but it came with a major catch: The graph was also the release, and one malformed definition could hold back every other feature in the merged graph. Figure 2 illustrates this challenge. It shows seven independently authored features, A through G, where five definitions are valid, but D and G contain unrelated errors. The “Attempt 1” build fails on D, so none of the seven features ships. After D is corrected, the “Attempt 2” build reaches G and fails again. Only after both definitions are fixed in “Attempt 3” does the complete merged graph make it successfully to production. Figure 2: One failing feature blocks the entire release.

共享图使每次发布都成为“全有或全无”：F3 的合并图有效地共享了计算，但它有一个主要缺陷：该图也是发布单元，一个格式错误的定义可能会阻碍合并图中的所有其他特征。图 2 说明了这一挑战。它显示了七个独立编写的特征 A 到 G，其中五个定义有效，但 D 和 G 包含不相关的错误。“尝试 1”构建在 D 处失败，因此七个特征均未发布。在修正 D 后，“尝试 2”构建到达 G 时再次失败。只有在“尝试 3”中修正了两个定义后，完整的合并图才能成功进入生产环境。图 2：一个失败的特征会阻塞整个发布。

Failures became more frequent as F3 scaled. F3 originally served a few hundred features, and at that size merges succeeded and releases were largely smooth. Today that number is more than 20,000, and different feature types need their own checks depending on how they compute, so new features and modified features are held to different testing bars. A feature that a model already consumes needs model-related tests before it can be released. Those tests are computationally expensive enough that they run only in a later release stage, and, because the merged graph ships as one unit, every other feature in it waits for them too.

随着 F3 的扩展，故障变得更加频繁。F3 最初服务于几百个特征，在该规模下，合并成功且发布基本顺利。如今，这一数字已超过 20,000，且不同类型的特征根据其计算方式需要各自的检查，因此新特征和修改后的特征需要达到不同的测试标准。模型已经使用的特征在发布前需要进行与模型相关的测试。这些测试的计算成本很高，因此它们仅在较晚的发布阶段运行，并且由于合并图作为一个单元发布，其中的所有其他特征也必须等待它们。

F3 Lightning: Making Each Feature Its Own Release and Sharing Computation After F3 launched, we made several rounds of improvements to the merged graph. Each one brought back release speed for a while, but the gains eroded as more features landed, because all features still shipped together in the merged graph. So F3 Lightning was built to make every feature releasable on its own while preserving F3’s efficiency. As illustrated in Figure 3, F3 Lightning introduced two changes to help achieve this: Deployment granularity: Each feature is an independently releasable configuration. It is validated, shipped, and rolled back without affecting any other feature. Efficiency parity: F3’s efficiency came from the merged graph, so giving every feature its own release removes the source of it. Matching that efficiency while keeping per-feature releases required several key optimizations in how F3 Lightning executes. Figure 3: F3 Lightning separates the release boundary from the execution boundary.

F3 Lightning：使每个特征独立发布并共享计算：F3 发布后，我们对合并图进行了几轮改进。每一次改进都暂时恢复了发布速度，但随着更多特征的加入，这些收益逐渐消失，因为所有特征仍然在合并图中一起发布。因此，F3 Lightning 的构建旨在使每个特征都能独立发布，同时保持 F3 的效率。如图 3 所示，F3 Lightning 引入了两个变化来实现这一目标：部署粒度：每个特征都是一个可独立发布的配置。它在验证、发布和回滚时不会影响任何其他特征。效率对等：F3 的效率来自合并图，因此为每个特征提供独立发布会消除其效率来源。在保持单特征发布的同时匹配该效率，需要对 F3 Lightning 的执行方式进行几项关键优化。图 3：F3 Lightning 将发布边界与执行边界分离开来。

Deployment Granularity: How F3 Lightning Isolates Feature Releases Isolation starts in the compiler, where each feature is compiled on its own into a single configuration. That feature configuration carries everything needed to extract that feature — every node it needs, in order, with nothing borrowed from a neighbor. If feature C has a problem, feature A still ships, because the two configurations have no relationship to each other. Figure 4: A bad feature no l

部署粒度：F3 Lightning 如何隔离特征发布：隔离始于编译器，每个特征都在编译器中被单独编译成一个配置。该特征配置携带了提取该特征所需的一切——它所需的每个节点，按顺序排列，且不从邻居那里借用任何东西。如果特征 C 有问题，特征 A 仍然可以发布，因为这两个配置之间没有任何关系。图 4：一个坏特征不会...