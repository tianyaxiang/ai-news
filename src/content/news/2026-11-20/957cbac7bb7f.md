---
title: "Mutex poisoning is not for everyone"
originalUrl: "https://bertptrs.nl/2026/11/16/mutex-poisoning-is-not-for-everyone.html"
date: "2026-11-19T13:01:49.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

After some recent discussion on the topic of mutex poisoning and notably a blog post that I thought was interesting, thoughtful, exhaustive, yet completely disagreed with, I wanted to comment on the debate myself. To me, poisoning-by-default is one of biggest mistakes that were made in the language, next to some others that are a story for a different time. In short, I believe that Mutex poisoning is the wrong choice for most applications, as it significantly pessimises code performance in the general case in addition to hampering readability while encouraging bad code patterns to deal with its weirdness in order to solve a niche problem that doesn’t even solve the general problem.

在最近围绕互斥锁中毒（mutex poisoning）话题的讨论中，我读到了一篇我认为既有趣、深刻、详尽，但我又完全不同意的博文，因此我也想就此辩论发表一下自己的看法。对我而言，默认开启中毒机制是该语言所犯下的最大错误之一，其他错误则留待日后再谈。简而言之，我认为对于大多数应用程序来说，互斥锁中毒是一个错误的选择，因为它不仅在一般情况下显著降低了代码性能，还阻碍了代码的可读性，并为了解决一个甚至无法解决通用问题的利基问题，而鼓励了处理其怪异行为的不良代码模式。

What is poisoning? In theory, a mutex guards a critical section of the code. That code changes the state of a piece of data free from interference of concurrent threads, then releases the lock. That code might then encounter an error, and release the lock in the middle of doing its important work.

什么是中毒？理论上，互斥锁保护着代码的临界区。该代码在不受并发线程干扰的情况下更改数据状态，然后释放锁。但代码可能会在执行重要工作的过程中遇到错误，从而导致锁在中间被释放。

The following code will work fine most of the time, but if the dice roll doesn’t go our way, the always_even mutex gets unlocked in an invalid state. In Rust, today, poisoning exists to handle this. If a guard is released abnormally (while panicking), it records that this happened in a boolean. Any future calls to lock() will return Err(PoisonError), which will trigger a panic when we unwrap it. The bad state is never observed and all is well.

以下代码在大多数情况下运行良好，但如果运气不好，always_even 互斥锁就会在无效状态下被解锁。在今天的 Rust 中，中毒机制正是为了处理这种情况而存在的。如果守卫（guard）异常释放（在恐慌时），它会通过布尔值记录这一事件。任何后续对 lock() 的调用都将返回 Err(PoisonError)，并在我们调用 unwrap() 时触发恐慌。这样，错误的状态永远不会被观察到，一切也就安然无恙了。

You might have felt that the example I made up was somewhat contrived. That’s because it is. Real cases of this pattern can and do happen, but most of the use cases that involve mutexes are much simpler. Many critical sections are no longer than a variable assignment, or doesn’t have an invalid in-between state. There are cases in lower level programming where a mutex guards a piece of data that is not directly inside it, or is outside the view of the program entirely.

你可能觉得我编造的例子有些牵强。确实如此。这种模式的真实案例确实存在，但大多数涉及互斥锁的使用场景要简单得多。许多临界区不过是一次变量赋值，或者根本不存在无效的中间状态。在底层编程中，确实存在互斥锁保护的数据并不直接位于锁内，或者完全处于程序视野之外的情况。

Rust’s default behaviour should make the common case easy and the rare case possible. Side-note: how mutexes work. This section is only tangentially related to the topic at hand, but I already wrote it and wasn’t ready to kill my darlings. Skip to the next section to continue the discussion on poisoning.

Rust 的默认行为应该让常见情况变得简单，让罕见情况成为可能。旁注：互斥锁的工作原理。本节与当前主题仅有间接联系，但我已经写好了，不忍心删掉。请跳至下一节继续关于中毒的讨论。

In Rust, for most platforms, mutexes are implemented using the futex system call. It allows for operations to remain purely in user-space as long as the mutex in question isn’t contended, which is nice for performance reasons. Under the hood, a mutex is a simple 32-bit integer on most platforms even though it only holds three unique values: If it’s zero, the mutex is free and can be claimed by any thread by a simple atomic compare-exchange. If it’s one, the mutex is held but there are no waiting threads. If it’s two, the mutex is held and some other thread is waiting for it.

在 Rust 中，对于大多数平台，互斥锁是使用 futex 系统调用实现的。只要互斥锁没有发生竞争，操作就可以完全保留在用户空间中，这对性能很有好处。在底层，大多数平台上的互斥锁只是一个简单的 32 位整数，尽管它只包含三个唯一值：如果为零，则互斥锁是空闲的，任何线程都可以通过简单的原子比较交换（compare-exchange）来获取它。如果为一，则互斥锁已被持有，但没有等待线程。如果为二，则互斥锁已被持有，且有其他线程正在等待。

How poisoning harms every single piece of code. As discussed in too much detail above, (un)locking mutexes is cheap as long as they’re not contended, and when contended, they are at least cheap instruction wise. This is where poisoning mutexes get you. In short, being able to poison is a cost that is always paid, but seldom used.

中毒机制如何损害每一段代码。如上文过于详尽的讨论所述，只要没有竞争，互斥锁的加锁和解锁成本都很低；即使在有竞争的情况下，指令层面的成本也相对较低。这就是互斥锁中毒机制带来的代价。简而言之，支持中毒机制是一种总是需要付出代价，却很少被使用的功能。

To start, poisoning is essentially implemented by adding an AtomicBool field to every Mutex. Due to alignment, this grows the size of every mutex by anywhere from zero bytes to an additional pointer. This isn’t terrible but for use cases where you have many mutexes guarding small objects, this can add up. The real issue to me however is in code size.

首先，中毒机制本质上是通过在每个 Mutex 中添加一个 AtomicBool 字段来实现的。由于内存对齐，这会使每个互斥锁的大小增加，从零字节到一个指针大小不等。这虽然不算太糟，但对于那些拥有许多保护小型对象的互斥锁的使用场景来说，这些开销会累积起来。然而，对我而言，真正的问题在于代码体积。