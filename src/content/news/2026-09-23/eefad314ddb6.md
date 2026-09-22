---
title: "Fearless SIMD v1.0 is here"
originalUrl: "https://linebender.org/blog/fearless-simd-1-0/"
date: "2026-09-22T23:47:13.175Z"
---

# Fearless SIMD v1.0 is here
# Fearless SIMD v1.0 正式发布

Shnatsel, September 22, 2026
Shnatsel，2026年9月22日

fearless_simd takes unsafe out of SIMD. It has come a long way since the original prototype 8 years ago. We are now confident that whatever it is you need, be it just autovectorization and multiversioning, or full-blown portable SIMD abstractions, or safe access to intrinsics and nothing more, Fearless SIMD will serve you well.
fearless_simd 将 `unsafe` 从 SIMD 中移除。自 8 年前最初的原型诞生以来，它已经走过了漫长的道路。我们现在确信，无论您需要什么——无论是自动向量化和多版本支持，还是完整的可移植 SIMD 抽象，亦或是仅仅为了安全地访问内部函数（intrinsics）——Fearless SIMD 都能为您提供良好的服务。

Instead of paraphrasing the changelog, I'd like to take this opportunity to reflect on the goals of Fearless SIMD, how it achieves them, and what sets it apart from other SIMD abstractions.
与其复述更新日志，我更想借此机会反思 Fearless SIMD 的目标、它是如何实现这些目标的，以及它与其他 SIMD 抽象有何不同。

### Performance
### 性能

A common criticism leveled at portable SIMD abstractions is that they aren't performant enough, so we've put a lot of effort into making sure that Fearless SIMD never holds you back. For example, when implementing portable abstractions for operations with different behavior in edge cases on different platforms, such as swizzles or floating-point maximum, we provide both a precise variant that's the same on all platforms, and a fast variant that returns a platform-dependent result for use when you expect the edge cases to never happen.
对可移植 SIMD 抽象的一个常见批评是它们性能不足，因此我们投入了大量精力确保 Fearless SIMD 不会拖您的后腿。例如，在为不同平台上边缘情况行为不同的操作（如 swizzles 或浮点最大值）实现可移植抽象时，我们同时提供了两种变体：一种是在所有平台上表现一致的精确变体，另一种是在您确信边缘情况不会发生时使用的、返回平台相关结果的快速变体。

We also made it easy to express SIMD algorithms in terms of the hardware's native vector size, so that your code always takes full advantage of the hardware, no matter where it runs. Fixed vector sizes are also supported for algorithms that need them.
我们还简化了基于硬件原生向量大小来表达 SIMD 算法的方式，确保您的代码无论在何处运行，都能充分利用硬件性能。对于需要固定向量大小的算法，我们也提供了支持。

We also put a lot of effort into making sure the implementations of our portable SIMD operations are state-of-the-art, and even contributed improvements upstream - both to Rust and LLVM. But if you need an instruction that isn't covered by portable abstractions, or want even more control, you can safely drop down to platform intrinsics with no overhead for the parts of your code that need it, and keep the rest simple and portable. Thanks to safe access to intrinsics, there is no performance ceiling.
我们还投入了大量精力确保可移植 SIMD 操作的实现处于行业领先水平，甚至向上游（Rust 和 LLVM）贡献了改进。但如果您需要可移植抽象未涵盖的指令，或者想要更精细的控制，您可以安全地切换到平台内部函数（intrinsics），且无需为代码中需要的部分增加额外开销，同时保持其余部分的简洁和可移植性。得益于对内部函数的安全访问，性能没有任何上限。

### Safety
### 安全性

If you look up the source code of any other SIMD abstraction, you will find that it is full of unsafe code. Something like `rg unsafe` will turn up several thousand unsafe blocks. But not in Fearless SIMD! The crate is carefully engineered not to require ad-hoc unsafe code.
如果您查看任何其他 SIMD 抽象的源代码，会发现它们充斥着 `unsafe` 代码。使用 `rg unsafe` 搜索通常会发现数千个 `unsafe` 代码块。但在 Fearless SIMD 中并非如此！该 crate 经过精心设计，无需临时的 `unsafe` 代码。

One piece of the puzzle is the `kernel!` macro, which leans on target feature v1.1 in the compiler to invoke most SIMD intrinsics without `unsafe`. I have described the design in detail in an earlier blog post, so check this out if you'd like to learn more. That removes most of the ad-hoc unsafe, but doesn't cover SIMD load/store operations which operate on raw pointers. That's where our safe transmute module, inspired by crates such as `bytemuck` and `zerocopy`, comes into play.
拼图的关键之一是 `kernel!` 宏，它依赖编译器中的 target feature v1.1，从而在不使用 `unsafe` 的情况下调用大多数 SIMD 内部函数。我在之前的博客文章中详细描述了这一设计，如果您想了解更多，请查阅该文章。这消除了大部分临时的 `unsafe`，但并未涵盖操作原始指针的 SIMD 加载/存储操作。这就是我们受 `bytemuck` 和 `zerocopy` 等 crate 启发而设计的安全 transmute 模块发挥作用的地方。

SIMD intrinsics like `_mm_loadu_epi32` may seem special, but actually turn into plain loads and stores behind the scenes. So you can fully replicate their functionality with a single, reusable wrapper. Thanks to the power of Rust's type system, we only need to audit these two small, self-contained building blocks. As long as they are memory-safe, the rest of the codebase is guaranteed to be memory-safe as well. At last, SIMD in Rust can be truly fearless.
像 `_mm_loadu_epi32` 这样的 SIMD 内部函数看起来很特殊，但实际上在底层它们会转化为普通的加载和存储操作。因此，您可以使用一个可重用的包装器完全复制它们的功能。得益于 Rust 类型系统的强大功能，我们只需要审计这两个小型、独立的构建块。只要它们是内存安全的，整个代码库的其余部分也保证是内存安全的。终于，Rust 中的 SIMD 可以真正做到“无畏”（fearless）了。

### Ergonomics
### 人体工程学（易用性）

Function multiversioning is tricky. Previous solutions either require adding `#[inline(always)]` annotations and understanding their implications, or impose a small overhead on every function call. The latter is fine most of the time, but degrades performance on very small functions, and still requires you to surgically add `#[inline(always)]` to get around that. Both are leaky abstractions - you still need to think about what is happening under the hood!
函数多版本化（multiversioning）很棘手。以前的解决方案要么需要添加 `#[inline(always)]` 注解并理解其含义，要么会在每次函数调用时产生少量开销。后者在大多数情况下没问题，但在处理非常小的函数时会降低性能，并且仍然需要您手动添加 `#[inline(always)]` 来规避问题。这两种都是“泄漏的抽象”——您仍然需要考虑底层发生了什么！

Alongside fearless_simd v1.0, we are launching `fearless_simd_macros` v0.1, which provides a non-leaky abstraction: the `#[simd]` macro. With it, you don't have to think about what's happening under the hood at all! Put it on any SIMD function and it Just Works.
随着 fearless_simd v1.0 的发布，我们还推出了 `fearless_simd_macros` v0.1，它提供了一种非泄漏的抽象：`#[simd]` 宏。有了它，您完全不必考虑底层发生了什么！将其放在任何 SIMD 函数上，它就能直接工作。

That said, while this is a big step forward for the ecosystem, there is still some boilerplate involved. We are keen to reduce it further, either with compiler support via the Struct Target Features RFC to get rid of the `#[simd]` annotation entirely, or perhaps through other tricks we will explore in the future. And if you don't like procedural macros, the old way of doing things is still available, if less convenient. Ergonomics is the one area we expect may still evolve. But this does not compromise the stability guarantees of the core fearless_simd crate, and the code written today with or without the `#[simd]` macro will continue working indefinitely.
话虽如此，虽然这对生态系统来说是一大进步，但仍涉及一些样板代码。我们渴望进一步减少这些样板，无论是通过 Struct Target Features RFC 获得编译器支持以完全摆脱 `#[simd]` 注解，还是通过我们未来将探索的其他技巧。如果您不喜欢过程宏，旧的方法仍然可用，尽管不太方便。人体工程学是我们预计仍会发展的领域。但这不会损害核心 fearless_simd crate 的稳定性保证，今天编写的代码（无论是否使用 `#[simd]` 宏）都将无限期地继续工作。

### Stability
### 稳定性

Fearless SIMD is here to stay. We will be providing 3 years of security updates for v1.0 and all later versions. While we cannot see the future, there are viable paths to supporting both near-term Rust features, such as the `f16` type, and longer-term features such as SVE and RISC-V Vector Extension if/when these hardware extensions become relevant, without API-breaking changes.
Fearless SIMD 将长期存在。我们将为 v1.0 及所有后续版本提供 3 年的安全更新。虽然我们无法预知未来，但我们有可行的路径来支持近期的 Rust 特性（如 `f16` 类型），以及长期的特性（如 SVE 和 RISC-V 向量扩展），且无需进行破坏 API 的更改。

### Relation to std::simd
### 与 std::simd 的关系

We would love to see `std::simd` stabilized, but it would not make Fearless SIMD obsolete. The Rust standard library implements only the parts that absolutely have to be in it, and the rest (e.g. multiversioning, hardware-width vectors) is left up to the ecosystem crates. fearless_simd includes an equivalent of `std::simd` that works on stable Rust, but that is just one part of a bigger whole. Once `std::simd` is stabilized, we will port Fearless SIMD to it to delete a lot of custom code and gain support for all sorts of obscure platforms. But the need for ecosystem crates such as fearless_simd will remain.
我们非常希望看到 `std::simd` 稳定化，但这并不会使 Fearless SIMD 过时。Rust 标准库只实现必须包含的部分，其余部分（如多版本化、硬件宽度向量）则留给生态系统 crate。fearless_simd 包含了一个可在稳定版 Rust 上运行的 `std::simd` 等价物，但这只是整体的一小部分。一旦 `std::simd` 稳定，我们将把 Fearless SIMD 移植到它上面，以删除大量自定义代码并获得对各种冷门平台的支持。但对 fearless_simd 这类生态系统 crate 的需求依然存在。

### Adoption
### 采用情况

It doesn't matter how brilliant your crate is if nobody is using it. Fearless SIMD is already used by 30 other crates as a direct dependency, and is indirectly relied on by over a thousand crates! It already underpins a nontrivial fraction of the Rust ecosystem, and we hope that v1.0 will take this even further. If you'd like to use Fearless SIMD in your project, check out the documentation and examples, and feel free to ask questions on Zulip!
如果没人使用，无论您的 crate 有多出色都无济于事。Fearless SIMD 已经被 30 个其他 crate 作为直接依赖使用，并被超过一千个 crate 间接依赖！它已经支撑了 Rust 生态系统中相当大的一部分，我们希望 v1.0 能让这一数字进一步增长。如果您想在项目中使用 Fearless SIMD，请查看文档和示例，并随时在 Zulip 上提问！