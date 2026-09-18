---
title: "The scourge of x86 emulation"
originalUrl: "https://fex-emu.com/Scourge-of-emulation/"
date: "2026-09-18T23:24:56.523Z"
---

# The scourge of x86 emulation
# x86 模拟的祸根

The scourge of x86 emulation Welcome to the first feature article on our site. We’re going to cover an ongoing problem with x86 emulation that affects every application that we emulate. This comes down to a single over-arching term that has wide-reaching ramifications; Emulating the x86 Total Store Ordering memory model (x86-TSO).
x86 模拟的祸根。欢迎阅读我们网站的第一篇专题文章。我们将探讨一个持续存在的 x86 模拟问题，它影响着我们模拟的每一个应用程序。归根结底，这涉及到一个具有深远影响的统称：模拟 x86 的总存储排序（Total Store Ordering，简称 x86-TSO）内存模型。

The problems with emulating this memory model on the weak ordering memory model that ARM defines is multi-faceted and covers multiple issues. We’re going to go over all the problems that we can encounter and the ways we solve (or in some cases can’t solve) in this article. Get yourself a snack and a warm drink to enjoy, this is going to be a long one.
在 ARM 定义的弱序内存模型上模拟这种内存模型，其问题是多方面的，涵盖了多个层面。在本文中，我们将梳理所有可能遇到的问题，以及我们解决（或在某些情况下无法解决）这些问题的方法。准备好零食和热饮慢慢享用吧，这将是一篇长文。

What exactly is x86-TSO? The humble beginnings of ARMv8.0-a I thought accessing memory was the easy bit? Oh no, what are these atomic instructions? What do you mean split-lock is mandatory? Wait, uncached memory needs to work? Looking towards a brighter future
究竟什么是 x86-TSO？ARMv8.0-a 的卑微起点。我以为访问内存是最简单的部分？糟糕，这些原子指令是什么？你说强制要求 split-lock 是什么意思？等等，非缓存内存也得能用？展望更美好的未来。

### What exactly is x86-TSO?
### 究竟什么是 x86-TSO？

Before diving in to how we work around the x86 memory model problem, we need to first discuss exactly what it is. A memory model is a set of rules for how memory accesses in a system behave in relation to each other. The rules will dictate how loads and stores interact in a single-threaded or a multi-threaded environment.
在深入探讨我们如何解决 x86 内存模型问题之前，我们需要先讨论它究竟是什么。内存模型是一套规则，规定了系统中内存访问之间如何相互作用。这些规则决定了在单线程或多线程环境中，加载（load）和存储（store）操作如何交互。

There’s a handful of popular memory models implemented in various forms of hardware, but the two we care about today is ARM’s relaxed (or weak) consistency model, and the x86 variant of Total-Store-Ordering consistency model. These two models are basically the two extremes of the spectrum; where ARM is the most relaxed, allowing significant hardware optimizations; and x86 is the most strict, enforcing a very strong coherency model that doesn’t allow a lot of room for optimization.
硬件中有几种流行的内存模型，但我们今天关心的两种是 ARM 的松散（或弱）一致性模型，以及 x86 的总存储排序（TSO）一致性模型。这两种模型基本上处于光谱的两端：ARM 是最松散的，允许进行大量的硬件优化；而 x86 是最严格的，强制执行一种非常强的一致性模型，几乎没有优化的空间。

One thing to be careful about when discussing memory models is the difference between consistency and atomicity. While these are related, they are not the same nor guaranteed in all cases. The best way to explain how the differences in memory models work is to start with how x86 handles this.
在讨论内存模型时，有一点需要注意，那就是一致性（consistency）和原子性（atomicity）之间的区别。虽然它们相关，但并不相同，也不是在所有情况下都能得到保证。解释内存模型差异的最佳方式，是从 x86 如何处理这些问题开始。

With TSO being very strict in how it operates, the programmer can assume that when a memory store occurs, that this will be coherently visible to all other processors in the system. This additionally means that when a memory load occurs, all stores before it “logically” will have been completed, or at least visible. This matches programmer expectations, you write to memory, it becomes visible as at the point of writing, as this is intuitive to think about when programming. The stores are effectively ordering the visibility of the loads, thus the name of the model.
由于 TSO 的运行方式非常严格，程序员可以假设当发生内存存储时，它对系统中的所有其他处理器都是一致可见的。此外，这意味着当发生内存加载时，它之前的所有存储在“逻辑上”都已经完成，或者至少是可见的。这符合程序员的预期：你写入内存，它在写入点就变得可见，因为这在编程时是很直观的。存储操作实际上是在对加载操作的可见性进行排序，因此得名该模型。

The weak memory model that ARM has is a bit less intuitive about how it operates. By default the regular memory loads and stores that ARM uses aren’t strictly coherent across processors in your system, allowing the CPU to operate more efficiently most of the time. When a store instruction executes, that piece of memory (the cacheline) isn’t immediately visible to other processors in the system. Saving on precious power and efficiency because it’s expensive in hardware to invalidate other core’s cachelines, or allow them to snoop another processor’s caches.
ARM 所采用的弱内存模型在运行方式上则不那么直观。默认情况下，ARM 使用的常规内存加载和存储在系统各处理器之间并非严格一致，这使得 CPU 在大多数时间能更高效地运行。当执行存储指令时，那块内存（缓存行）并不会立即对系统中的其他处理器可见。这节省了宝贵的功耗和效率，因为在硬件层面使其他核心的缓存行失效，或允许它们窥探（snoop）另一个处理器的缓存，代价是非常昂贵的。

Relatedly if a processor is loading data from memory that another processor has written to, it’s not guaranteed that this load will even see this updated memory. This sounds like it would cause some significant problems in a multi-threaded application right?
同样地，如果一个处理器正在从另一个处理器写入的内存中加载数据，并不能保证这次加载一定能看到更新后的内存。听起来这会在多线程应用程序中导致严重问题，对吧？

Older versions of ARM (ARMv7 and older) used a memory barrier instruction to ensure ordering, which had significant performance implications. To get around this limitation of consistency, ARM also introduced load-acquire, and store-release memory instructions. In C++ parlance this maps to std::atomic’s memory_order_acquire and memory_order_release definitions respectively.
旧版本的 ARM（ARMv7 及更早版本）使用内存屏障（memory barrier）指令来确保排序，这会对性能产生重大影响。为了绕过这种一致性限制，ARM 还引入了加载获取（load-acquire）和存储释放（store-release）内存指令。在 C++ 术语中，这分别对应于 `std::atomic` 的 `memory_order_acquire` 和 `memory_order_release` 定义。

In ARM’s terminology, these instructions also aren’t technically considered to be atomic operations, but programmers conflate the two. FEX has used the terms atomic-load and atomic-store to mean the same thing! The distinction usually doesn’t matter, but when discussing these topics it may be better to be pedantic about it.
在 ARM 的术语中，这些指令在技术上也不被视为原子操作，但程序员经常将两者混为一谈。FEX 一直使用“原子加载”和“原子存储”这两个术语来指代同样的事情！这种区别通常无关紧要，但在讨论这些主题时，严谨一点可能会更好。

The primary use case for these instructions is to force memory ordering between these class of instructions. ARM calls this the “Release Consistency sequentially consistent (RCsc)” model. Without getting too far in to the weeds about how this model operates, the basic gist is that the load-acquire instructions must be observed sequentially without reordering, and the store-release instructions must as well while fulfilling “barrier-ordered-before” semantics. Removing the costly memory barrier instruction required in older ARM architecture versions.
这些指令的主要用途是在此类指令之间强制执行内存排序。ARM 将其称为“释放一致性顺序一致（RCsc）”模型。无需深入探讨该模型的具体运作细节，其基本要点是：加载获取指令必须按顺序观察，不得重新排序；存储释放指令也必须如此，同时满足“屏障前排序（barrier-ordered-before）”语义。这消除了旧版 ARM 架构中所需的昂贵内存屏障指令。

### The humble beginnings of ARMv8.0-a
### ARMv8.0-a 的卑微起点

This is the premise of where we start in ARMv8.0-a when we’re emulating the x86-TSO memory model. We make all x86 memory loads turn in to ARM’s load-acquire instructions, and x86 memory stores turn in to store-release instructions. This gives FEX effectively the same memory semantics as x86, although we are actually being more strict than what is necessary.
这就是我们在 ARMv8.0-a 上模拟 x86-TSO 内存模型时的起点。我们将所有的 x86 内存加载转换为 ARM 的加载获取指令，将 x86 内存存储转换为存储释放指令。这使得 FEX 实际上拥有了与 x86 相同的内存语义，尽管我们实际上比必要的情况更为严格。

This is because we had no middle-ground which exactly matches behaviour. As one might think, it is exceedingly costly to emulate TSO with these instructions and we have microbenchmarks that can show this. As ARM CPUs weren’t designed to have these relatively rare acquire/release instructions suddenly become the vast majority of instructions executed.
这是因为我们没有完全匹配行为的中间方案。正如人们所想，使用这些指令来模拟 TSO 代价极其高昂，我们有微基准测试可以证明这一点。因为 ARM CPU 的设计初衷并非让这些相对罕见的获取/释放指令突然成为执行指令中的绝大多数。

First let’s start with something easy and use a microbenchmark that is fairly nice to the hardware. No tricky edge-cases, just accessing memory in the common case. This gives us some baseline numbers for what the best-case situation should be. Let’s break down this graph as it tells us a few interesting stories. The Load and Store columns of each machine is representing our baseline performance number that our hardware should.
首先，让我们从简单的开始，使用一个对硬件相当友好的微基准测试。没有棘手的边缘情况，只是在常见情况下访问内存。这为我们提供了最佳情况下的基准数据。让我们分析一下这张图表，因为它告诉了我们一些有趣的事情。每台机器的“加载”和“存储”列代表了我们硬件应有的基准性能数据。