---
title: "Writing a DSL for high performance parallel programming in OxCaml"
originalUrl: "https://blog.janestreet.com/writing-a-dsl-for-high-performance-parallel-programming-in-oxcaml/"
date: "2026-11-14T02:57:49.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# Writing a DSL for high performance parallel programming in OxCaml

Writing a DSL for high performance parallel programming in OxCaml Nov 06, 2026 | 21 min read Share on Facebook Share on Twitter Share on LinkedIn By: Nicholas Yang The following is part of a series of posts about 2026 summer intern projects—for more, see “What the interns have wrought, special jumbo 2026 edition” We have a lot of performance-critical SIMD code (single-instruction, multiple-data) running on CPUs across the firm. These are highly parallel programs where you run the same computation across arrays of data, in our case for options pricing or for low-latency risk checks. Because OCaml hasn’t historically exposed SIMD instructions, these programs often involve an inner loop written in fairly esoteric C. Writing these loops requires implementers to think carefully about hardware, and doing performance tuning, such as modifying unroll factors or vector widths, can require major changes to the code. Moreover, these programs are constrained to a specific instruction set. If we were to target a different architecture or a newer processor, we’d have to rewrite the program.

在 OxCaml 中编写用于高性能并行编程的领域特定语言 (DSL)
2026 年 11 月 6 日 | 21 分钟阅读 | 作者：Nicholas Yang。本文是关于 2026 年暑期实习项目系列文章的一部分。公司内部有大量在 CPU 上运行的性能关键型 SIMD（单指令多数据）代码。这些是高度并行的程序，用于在数据数组上运行相同的计算，在我们的案例中，主要用于期权定价或低延迟风险检查。由于 OCaml 历史上并未公开 SIMD 指令，这些程序通常包含用相当晦涩的 C 语言编写的内部循环。编写这些循环需要开发者仔细考虑硬件，而进行性能调优（例如修改展开因子或向量宽度）可能需要对代码进行重大更改。此外，这些程序受限于特定的指令集。如果我们想要针对不同的架构或更新的处理器，就必须重写程序。

For his summer internship, Sai Konkimalla built a compiler for a domain specific language (DSL) that makes SIMD more ergonomic and widely accessible. The compiler takes advantage of OxCaml features that were only very recently added to the language, such as runtime metaprogramming, to enable users to write a kernel just once as a regular-ish OxCaml function, then compile and run it on multiple architectures.

在暑期实习期间，Sai Konkimalla 构建了一个领域特定语言 (DSL) 编译器，使 SIMD 变得更加符合人体工程学且更易于使用。该编译器利用了 OxCaml 最近才添加到语言中的特性（例如运行时元编程），使用户能够将内核编写为普通的 OxCaml 函数，只需编写一次，即可在多种架构上编译并运行。

Single Program, Multiple Data To help solve the problem of SIMD code being rather difficult to write and maintain, our DSL uses the SPMD, or “single program, multiple data” programming model. As opposed to SIMD intrinsics, SPMD is higher level and not tied to a specific instruction set. We might normally think of higher-level languages as slower, but with SPMD, a higher level of abstraction lets the compiler make better decisions about how to optimally use the underlying hardware. This ability can lead to significantly faster code. SPMD was popularized by CUDA (for Nvidia GPUs) and ISPC (for Intel CPUs). In this model, you write a program describing what happens at each index of a loop, then the compiler converts it into a parallel computation.

单程序多数据 (SPMD)
为了帮助解决 SIMD 代码难以编写和维护的问题，我们的 DSL 使用了 SPMD（单程序多数据）编程模型。与 SIMD 内在函数相比，SPMD 级别更高，且不绑定到特定的指令集。我们通常认为高级语言速度较慢，但在 SPMD 中，更高级别的抽象让编译器能够更好地决定如何优化使用底层硬件。这种能力可以带来更快的代码。SPMD 因 CUDA（用于 Nvidia GPU）和 ISPC（用于 Intel CPU）而普及。在这种模型中，你编写一个描述循环中每个索引处发生什么的程序，然后编译器将其转换为并行计算。

For example, in CUDA: __global__ void kernel(const float* x, float* out, int n) { int idx = blockIdx.x * blockDim.x + threadIdx.x; if (idx < n) { out[idx] = 2.0f * x[idx] + idx; } } Notice how there’s no loop here: you only define the loop body, and the compiler decides how to run it. In CUDA, when you launch a kernel on a GPU, you can declare how many blocks of threads to run and the GPU will schedule them accordingly. In ISPC, foreach also abstracts away how the loop is actually executed: export void kernel(uniform float x[], uniform float out[], uniform int n) { foreach (i = 0 ... n) { out[i] = 2.0f * x[i] + i; } } In both cases, the compiler translates the code into low-level SIMD instructions. Not specifying the exact instructions also means SPMD programs can benefit from future hardware improvements. If we get a new, faster CPU with a different instruction set, the SPMD compiler can seamlessly compile existing code to it.

例如，在 CUDA 中：`__global__ void kernel(const float* x, float* out, int n) { int idx = blockIdx.x * blockDim.x + threadIdx.x; if (idx < n) { out[idx] = 2.0f * x[idx] + idx; } }` 注意这里没有循环：你只定义了循环体，编译器决定如何运行它。在 CUDA 中，当你启动 GPU 内核时，可以声明运行多少个线程块，GPU 会相应地调度它们。在 ISPC 中，`foreach` 也抽象了循环的实际执行方式：`export void kernel(uniform float x[], uniform float out[], uniform int n) { foreach (i = 0 ... n) { out[i] = 2.0f * x[i] + i; } }` 在这两种情况下，编译器都会将代码转换为低级 SIMD 指令。不指定确切的指令也意味着 SPMD 程序可以从未来的硬件改进中受益。如果我们获得了一个具有不同指令集的新型更快的 CPU，SPMD 编译器可以无缝地将现有代码编译到该 CPU 上。

A quick overview of the DSL Let’s go over an example of the DSL that Sai implemented. We start by defining the kernel’s signature, including its output type, input types, and the dimension of the output: Spmd.Kernel.create F32 (* output element type *) [ F32; F32 ] (* input slice types *) [ () ] (* one output dimension *) (fun graph [ x; scale] [ Dim i ] -> exclave_ ...) In this example, we’re writing a kernel that takes in two F32 slices and returns one F32 slice. Future work on a ppx syntax extension will make it possible to rewrite the above simply as: let%spmd kernel (x : f32 slice) (scale : f32) (i : dim) : f32 =

DSL 概览
让我们看看 Sai 实现的 DSL 示例。我们首先定义内核的签名，包括其输出类型、输入类型和输出维度：`Spmd.Kernel.create F32 (* 输出元素类型 *) [ F32; F32 ] (* 输入切片类型 *) [ () ] (* 一个输出维度 *) (fun graph [ x; scale] [ Dim i ] -> exclave_ ...)` 在此示例中，我们编写了一个接收两个 F32 切片并返回一个 F32 切片的内核。未来关于 ppx 语法扩展的工作将使上述代码可以简单地重写为：`let%spmd kernel (x : f32 slice) (scale : f32) (i : dim) : f32 =`

Next, we write the actual computation: Spmd.Kernel.create F32 (* output element type *) [ F32; F32 ] (* input slice types *) [ () ] (* one output dimension *) (fun graph [ x; scale ] [ Dim i ] -> exclave_ let open (val Spmd.open_ graph) in let i = index i in F32.((x.!(i) *. broadcast scale.!(I32.lit #0l)) +. of_i32 i)) Note the let open (val Spmd.open_ graph) in. This brings the DSL operations which construct a computational graph into scope. You can think of the graph value as proof that you’re in the graph-construction phase, not the runtime of the generated program. (Bonsai uses a similar trick for creating its incremental graph.) Like CUDA, we don’t write the kernel as a loop. Instead, the developer writes a function that computes a single entry of the output slice, and the SPMD compiler generates code to loop over the output slice and compute the value at each index.

接下来，我们编写实际的计算：`Spmd.Kernel.create F32 (* 输出元素类型 *) [ F32; F32 ] (* 输入切片类型 *) [ () ] (* 一个输出维度 *) (fun graph [ x; scale ] [ Dim i ] -> exclave_ let open (val Spmd.open_ graph) in let i = index i in F32.((x.!(i) *. broadcast scale.!(I32.lit #0l)) +. of_i32 i))` 注意 `let open (val Spmd.open_ graph) in`。这会将构建计算图的 DSL 操作引入作用域。你可以将 `graph` 值视为你处于图构建阶段而非生成程序运行时的证明。（Bonsai 使用类似的技巧来创建其增量图。）像 CUDA 一样，我们不将内核编写为循环。相反，开发者编写一个计算输出切片中单个条目的函数，SPMD 编译器会生成代码来遍历输出切片并在每个索引处计算值。

You may wonder why we loop over the output and not the inputs. Looping over the output is easier to model because each iteration writes to exactly one location, so iterations can be easily vectorized, reordered, or parallelized. If we were to loop over the inputs, different iterations could write to the same output entry. The compiler would then have to reason about whether the writes could be re-ordered. By guaranteeing that each output entry is written exactly once, we can avoid this complexity.

你可能想知道为什么我们遍历输出而不是输入。遍历输出更容易建模，因为每次迭代只写入一个位置，因此迭代可以轻松地进行向量化、重新排序或并行化。如果我们遍历输入，不同的迭代可能会写入同一个输出条目。编译器将不得不推断这些写入是否可以重新排序。通过保证每个输出条目只被写入一次，我们可以避免这种复杂性。

Where runtime metaprogramming comes in One wrinkle with Sai’s project is that we wanted to execute the SPMD compiler at runtime. Runtime compilation (often called just-in-time or JIT compilation) is when the compiler generates code while the program is running. This gives us two main advantages: we don’t have to worry about building for all potential target architectures at compile time, and we can use data obtained at runtime for optimizations. That latter point is especially important for generating high-performance code. When executing at runtime, the compiler has more data that it can use to optimize the code than it would when executing ahead-of-time. For example, our compiler can use runtime data to compile away branch instructions, which can slow down execution by c

运行时元编程的作用
Sai 项目的一个难点在于我们希望在运行时执行 SPMD 编译器。运行时编译（通常称为即时编译或 JIT 编译）是指编译器在程序运行时生成代码。这为我们提供了两个主要优势：我们不必担心在编译时为所有潜在的目标架构进行构建，并且我们可以使用在运行时获得的数据进行优化。后一点对于生成高性能代码尤为重要。在运行时执行时，编译器拥有比提前执行时更多的数据来优化代码。例如，我们的编译器可以使用运行时数据来编译掉分支指令，这些指令可能会减慢执行速度……