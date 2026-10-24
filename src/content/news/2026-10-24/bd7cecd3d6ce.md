---
title: "How close can pure FP get to C?"
originalUrl: "https://rtfeldman.com/fp-vs-c"
date: "2026-10-23T11:37:22.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

How close can pure FP get to C? October 22, 2026 In Why Lean is Faster Than Rust, the author shares an impressive result: a DEFLATE compression library written in Lean 4, a functional programming language and proof assistant, outperforming an equivalent Rust package that crates.io says has been downloaded over a billion times.

纯函数式编程（FP）能有多接近 C 语言的性能？2026 年 10 月 22 日，在《为什么 Lean 比 Rust 更快》一文中，作者分享了一个令人印象深刻的结果：一个用 Lean 4（一种函数式编程语言和证明助手）编写的 DEFLATE 压缩库，其性能超过了一个在 crates.io 上下载量超过十亿次的同类 Rust 软件包。

From the article: lean-zip beats every single compression level miniz_oxide provides, i.e. we're capable of providing the same compression at higher throughput. At its fastest setting we're 15% quicker and the output is 8.8% smaller. However, the article also notes that while they managed to surpass Rust's miniz_oxide, they were no match for the end boss of DEFLATE performance: libdeflate, written in C.

文章称：lean-zip 在 miniz_oxide 提供的每一个压缩级别上都表现得更好，也就是说，我们能够在更高的吞吐量下提供相同的压缩效果。在最快设置下，我们的速度提高了 15%，输出体积减小了 8.8%。然而，文章也指出，尽管他们成功超越了 Rust 的 miniz_oxide，但面对 DEFLATE 性能的“终极 Boss”——用 C 语言编写的 libdeflate 时，他们仍无法匹敌。

lean-zip is certainly not the best here: libdeflate unsurprisingly blows it out of the water (unsurprisingly because this is a very carefully tuned implementation using architecture-specific SIMD, that we can't touch in Lean). Enter Roc, a functional programming language (but not a theorem prover) with an explicit focus on runtime performance.

lean-zip 在这里显然不是最强的：libdeflate 毫无悬念地将其击败（这并不令人意外，因为 libdeflate 是一个经过精心调优的实现，使用了 Lean 无法触及的架构特定 SIMD 指令）。于是，Roc 登场了，这是一种明确专注于运行时性能的函数式编程语言（但不是定理证明器）。

Roc's tagline is "Fast, Friendly, Functional," and Fast comes first because both running fast and compiling fast have always been central goals. Roc is not a mature language (it's still weeks away from its first numbered release, 0.1.0), and its nascent package ecosystem has had almost no optimization work done on it.

Roc 的口号是“快速、友好、函数式”，其中“快速”被放在首位，因为运行速度快和编译速度快一直是其核心目标。Roc 还不是一种成熟的语言（距离其第一个版本号 0.1.0 的发布还有几周时间），其尚处于萌芽阶段的包生态系统几乎没有进行过任何优化工作。

Still, between its language design, longstanding optimizations, and brand-new compiler implementation, I figured Roc already had enough of a foundation in place to take on the champ: libdeflate. So I spent a bunch of time grinding through performance optimizations on roc-deflate, a package Niclas Ahden wrote (and uses in paid production work) for DEFLATE compression.

尽管如此，凭借其语言设计、长期的优化以及全新的编译器实现，我认为 Roc 已经具备了挑战冠军 libdeflate 的基础。因此，我花了很多时间对 roc-deflate 进行性能优化，这是一个由 Niclas Ahden 编写（并用于其付费生产工作）的 DEFLATE 压缩包。

I didn't expect to beat libdeflate's performance across the board, but I wanted to see how close it could get on the non-streaming APIs (as roc-deflate hasn't implemented streaming yet), using the classic Silesia corpus for benchmarking and verifying that it produced identical outputs.

我并不指望能全面超越 libdeflate 的性能，但我希望看看在非流式 API 上它能达到多接近（因为 roc-deflate 尚未实现流式处理），并使用经典的 Silesia 语料库进行基准测试，同时验证其输出结果是否完全一致。

Under 10% Slower Here's where the benchmarks stand today, running on the 2021 M1 MacBook Pro where I did all the optimization work, as well as on an AMD Ryzen 9 3900X Ubuntu machine for an x64 comparison. roc-deflate ran these 144 benchmarks slower on average than libdeflate, in the median case 8.9% slower on the Ryzen 3900X, and 2.6% on the M1 MacBook Pro.

慢于 10% 以内：以下是目前的基准测试结果，测试运行在我进行所有优化工作的 2021 款 M1 MacBook Pro 上，以及用于 x64 对比的 AMD Ryzen 9 3900X Ubuntu 机器上。roc-deflate 在这 144 项基准测试中的平均运行速度慢于 libdeflate，中位数情况在 Ryzen 3900X 上慢 8.9%，在 M1 MacBook Pro 上慢 2.6%。