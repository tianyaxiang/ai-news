---
title: "Gleam doesn't compile to Erlang source anymore"
originalUrl: "https://gleam.run/news/gleam-doesnt-compile-to-erlang-source-anymore/"
date: "2026-10-06T02:16:24.346Z"
---

# Gleam doesn't compile to Erlang source anymore
# Gleam 不再编译为 Erlang 源码

Gleam is a type-safe and scalable language for the Erlang virtual machine and JavaScript runtimes. Today Gleam v1.19.0 has been published, so let's go over what's new.
Gleam 是一门为 Erlang 虚拟机和 JavaScript 运行时设计的类型安全且可扩展的语言。今天 Gleam v1.19.0 已经发布，让我们来看看有哪些新变化。

### A new compilation target
### 新的编译目标

Over the last few months Giacomo Cavalieri has entirely rewritten Gleam's Erlang code generator that has an entirely different design, and most notably, outputs a different format. Previously Gleam generated Erlang source code, now it generates Erlang abstract forms.
在过去的几个月里，Giacomo Cavalieri 完全重写了 Gleam 的 Erlang 代码生成器。新生成器采用了完全不同的设计，最显著的变化是输出格式不同了：以前 Gleam 生成的是 Erlang 源码，现在它生成的是 Erlang 抽象形式（abstract forms）。

"Erlang abstract forms" is an intermediate representation used by the Erlang compiler. It is a metadata-annotated tree that represents Erlang syntax, and it is normally produced by running Erlang's tokeniser and parser. It has a binary encoding using Erlang's external term format, and with this binary format we can load our generated code directly, skipping the front-half of the Erlang compiler.
“Erlang 抽象形式”是 Erlang 编译器使用的一种中间表示。它是一棵带有元数据注释的树，代表了 Erlang 的语法，通常由 Erlang 的词法分析器和解析器生成。它使用 Erlang 的外部项格式（external term format）进行二进制编码，通过这种二进制格式，我们可以直接加载生成的代码，从而跳过 Erlang 编译器的前端部分。

This new Erlang code generator brings several benefits: The performance of the compiler has been improved, significantly reducing the build times for Gleam projects running on Erlang. The location metadata available to the runtime is now accurate to original Gleam source code, rather than to the Erlang source code the compiler would generate. This means, for example, the line numbers in BEAM crash reports and stacktraces are perfectly accurate, while previously they could be inaccurate, only pointing to the nearest function.
这个新的 Erlang 代码生成器带来了几个好处：编译器的性能得到了提升，显著缩短了在 Erlang 上运行的 Gleam 项目的构建时间。运行时可用的位置元数据现在可以精确对应到原始的 Gleam 源码，而不是编译器生成的 Erlang 源码。这意味着，例如，BEAM 崩溃报告和堆栈跟踪中的行号将变得非常准确，而以前它们可能不够精确，只能指向最近的函数。

This metadata could also enable full support for Gleam in debuggers such as edb, though we have not done any work on this ourselves. The code-quality of the Gleam compiler has been improved. The Erlang code generator was one of the oldest and most stable parts of the Gleam codebase, so while it wasn't causing us any problems it wasn't conforming to the standards and conventions we have today. This new replacement is excellent, and arguably raising the bar for the compiler as whole. We never have to hear someone use the word "transpiler" as a pejorative ever again.
这些元数据还可以使诸如 `edb` 之类的调试器能够全面支持 Gleam，尽管我们自己尚未在这方面做任何工作。Gleam 编译器的代码质量也得到了提升。原有的 Erlang 代码生成器是 Gleam 代码库中最古老、最稳定的部分之一，虽然它没有给我们带来任何问题，但它并不符合我们今天所遵循的标准和规范。这个新的替代方案非常出色，可以说提高了整个编译器的标准。我们再也不用听到有人把“转译器”（transpiler）这个词当作贬义词来使用了。

### Ok, so how fast is it?
### 那么，它有多快呢？

I'm going to show you some numbers in a moment, but please remember that benchmarks are always contrived and never tell the full story. This data could be a good introduction or jumping-off point, but a good understanding requires the person to do further research and experience. The benchmark is based on José Valim's langcompilebench project. Thank you José!
我马上会向大家展示一些数据，但请记住，基准测试总是人为设计的，永远无法反映全貌。这些数据可以作为一个很好的入门或切入点，但要真正理解，还需要进一步的研究和实践。该基准测试基于 José Valim 的 `langcompilebench` 项目。感谢 José！

It is a measure of the time taken to compile 100 modules that each contain 100 functions that return a "hello world" string. This is practical as this shape of test project can be easily replicated across different languages to produce the most like-for-like test projects, but it is limited in what it can tell us as only a small subset of the features of each language get compiled. In real projects code will be greatly more varied, and different features will have different compilation costs in different languages.
它衡量的是编译 100 个模块所需的时间，每个模块包含 100 个返回“hello world”字符串的函数。这种测试项目很实用，因为它很容易在不同语言间复制，从而产生最公平的对比测试，但它的局限性在于它只能反映每种语言的一小部分特性。在实际项目中，代码会复杂得多，不同的特性在不同语言中会有不同的编译开销。

The first stage of the code generator rewrite was released in v1.18.0, the previous release, so let's compare v1.17.0 to the newly released v1.19.0. This chart shows the time taken to compile the benchmark project, lower is better. As you can see, a considerable improvement! This is a full build from scratch, without any caching. Gleam's compilation is incremental, so during typical development it would be much faster as it will not be compiling the entire project.
代码生成器重写的第一阶段是在上一个版本 v1.18.0 中发布的，所以让我们对比一下 v1.17.0 和新发布的 v1.19.0。这张图表显示了编译基准测试项目所花费的时间，数值越低越好。正如你所见，有了相当大的提升！这是从零开始的全量构建，没有任何缓存。Gleam 的编译是增量的，因此在典型的开发过程中，它会快得多，因为它不需要编译整个项目。

The original langcompilebench includes only Erlang, Elixir, and Gleam, but I have extended it an assortment of other popular programming languages, to help folks get a rough feel for how fast Gleam compiles compared to a language they are familiar with. I've also included Gleam when compiling to JavaScript. Here's the results:
最初的 `langcompilebench` 只包含 Erlang、Elixir 和 Gleam，但我将其扩展到了其他各种流行的编程语言，以帮助大家大致了解 Gleam 与他们熟悉的语言相比编译速度如何。我还加入了 Gleam 编译为 JavaScript 的结果。以下是结果：

Remember: This is a contrived benchmark and is this alone is insufficient to draw any hard conclusions about these languages. That said, these results do suggest that Gleam's compilation is nice and fast, and as a Gleam programmer I can say that Gleam development is very enjoyable, with little time spent waiting for the computer.
请记住：这是一个人为设计的基准测试，仅凭这一点不足以对这些语言得出任何确凿的结论。话虽如此，这些结果确实表明 Gleam 的编译非常快，作为一名 Gleam 程序员，我可以肯定地说，Gleam 的开发体验非常愉快，几乎不需要把时间浪费在等待电脑编译上。

### Why not target BEAM bytecode directly?
### 为什么不直接以 BEAM 字节码为目标？

We have moved from from compiling from source code that is fed to the Erlang compiler to an intermediate-representation that is fed into the Erlang compiler, but why not bypass the Erlang compiler altogether? Couldn't we make a BEAM bytecode generator that outperforms the Erlang compiler? Perhaps we could also use Gleam's type information to generate more optimised code too.
我们已经从“将源码喂给 Erlang 编译器”转变为“将中间表示喂给 Erlang 编译器”，但为什么不完全绕过 Erlang 编译器呢？我们难道不能制作一个性能优于 Erlang 编译器的 BEAM 字节码生成器吗？也许我们还可以利用 Gleam 的类型信息来生成更优化的代码。

While it is possible to achieve these benefits, it's unlikely we would be able to. Unlike Erlang source and Erlang abstract forms, BEAM bytecode is not fixed and unchanging. Each new release of the virtual machine can evolve and improve the bytecode, adding new functionality and sometimes removing functionality that has been made redundant. We would need to commit to forever keeping up-to-date with this evolution, working closely with the Erlang maintainers to be ready for up-coming changes, and to have new versions of Gleam ready for new releases of the virtual machine.
虽然有可能实现这些好处，但我们不太可能做到。与 Erlang 源码和 Erlang 抽象形式不同，BEAM 字节码并不是固定不变的。虚拟机的每一个新版本都可能演进和改进字节码，增加新功能，有时还会移除冗余功能。我们需要承诺永远跟上这种演进，与 Erlang 维护者密切合作以应对即将到来的变化，并确保 Gleam 的新版本能适配虚拟机的新发布。

It would also be a significant effort to reproduce all the existing optimisations that have been implemented in the Erlang compiler over the decades, even with the help we might have from Gleam's more capable static analysis. Gleam is a community project supported by sponsorship. We have only a fraction of the finances of languages that are backed by corporations or academic institutions, so we need to think carefully about the most efficient and sustainable ways to use our resources.
重现 Erlang 编译器几十年来已经实现的各种优化也将是一项巨大的工程，即使有 Gleam 更强大的静态分析辅助也是如此。Gleam 是一个由赞助支持的社区项目。与那些有企业或学术机构支持的语言相比，我们的资金只是九牛一毛，因此我们需要仔细考虑如何以最有效和可持续的方式利用我们的资源。

Gleam is a reliable foundation for software development, every decision we make has to work for years and decades to come. Compiling to Erlang abstract forms is the cost-benefit sweet-spot for Gleam today. We're also in great company with this decision. Our much-loved older-sibling language Elixir also compiles to Erlang via abstract forms. If it's good enough for Elixir, then it's good enough for Gleam!
Gleam 是软件开发的可靠基础，我们所做的每一个决定都必须经得起未来几年甚至几十年的考验。对今天的 Gleam 而言，编译为 Erlang 抽象形式是成本与收益的最佳平衡点。做出这个决定也让我们与优秀的同行站在一起。我们深受喜爱的“老大哥”语言 Elixir 也是通过抽象形式编译为 Erlang 的。如果这对 Elixir 来说足够好，那么对 Gleam 来说也足够好！

Alright, enough about that. There's plenty more in Gleam v1.19.0 to go-over. JavaScript decision tree assignment...
好了，关于这个话题就说这么多。Gleam v1.19.0 还有很多内容值得探讨。JavaScript 决策树赋值……