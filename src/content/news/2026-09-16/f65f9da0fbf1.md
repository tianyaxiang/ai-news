---
title: "I built three tools for Quantinuum's guppy stack. Along the way I found six real bugs."
originalUrl: "https://dev.to/kkoci/i-built-three-tools-for-quantinuums-guppy-stack-along-the-way-i-found-six-real-bugs-2cp4"
date: "2026-09-15T23:42:31.677Z"
---

# Title: I built three tools for Quantinuum's guppy stack. Along the way I found six real bugs.
# 标题：我为 Quantinuum 的 guppy 技术栈构建了三个工具，并在过程中发现了六个真实存在的 Bug。

I built three tools for Quantinuum's guppy/HUGR stack. Along the way I found six real bugs. I've been working with guppylang — Quantinuum's Python-embedded quantum programming language, compiling to HUGR, running on their Selene simulator and trapped-ion hardware. It's a young ecosystem, and I wanted to build things that were actually useful, not just demos. That meant treating correctness as the whole point, not an afterthought — every formula cited to its source, every claim about compiler behavior verified by actually compiling code and inspecting the output, not assumed from docs. That discipline turned out to matter more than expected. Building three fairly ordinary developer tools surfaced six real, confirmed bugs — four in guppylang itself, two in Google's Qualtran (a widely-used quantum resource-estimation library) — none of which I was looking for going in.

我为 Quantinuum 的 guppy/HUGR 技术栈构建了三个工具，并在过程中发现了六个真实存在的 Bug。我一直在使用 guppylang——这是 Quantinuum 的一种嵌入 Python 的量子编程语言，它能编译为 HUGR，并在他们的 Selene 模拟器和离子阱硬件上运行。这是一个尚处于起步阶段的生态系统，我希望构建真正有用的东西，而不仅仅是演示程序。这意味着我必须将“正确性”视为核心目标，而不是事后补救——每一个公式都必须注明来源，每一个关于编译器行为的断言都必须通过实际编译代码并检查输出来验证，而不是仅仅基于文档假设。事实证明，这种严谨性比预期的更为重要。在构建三个相当普通的开发者工具时，我发现了六个已确认的真实 Bug——其中四个存在于 guppylang 本身，两个存在于 Google 的 Qualtran（一个广泛使用的量子资源估算库）中——而这些 Bug 在我开始工作时完全不在我的预料之内。

The three tools:
这三个工具分别是：

qshelf — a tested package registry of quantum algorithm implementations for guppylang/HUGR (QFT, Grover, QAOA, VQE-H2), each verified against an independent mathematical reference (exact linear algebra, scipy.linalg.expm, exact diagonalization), not just "it ran without crashing."
qshelf — 一个经过测试的 guppylang/HUGR 量子算法实现包注册表（包含 QFT、Grover、QAOA、VQE-H2），每个实现都通过独立的数学参考（精确线性代数、scipy.linalg.expm、精确对角化）进行了验证，而不仅仅是“运行不崩溃”。

Estimand — a fault-tolerant resource estimator for guppy/HUGR programs. Given a compiled guppy circuit, it estimates physical qubit count, runtime, and error probability under a surface-code scheme. It's an adapter, not a resource-estimation engine — it extracts a gate-count summary from real guppy control flow (conditionals, nested loops, cross-function calls, even CallIndirect) and feeds it to Qualtran's already-published cost models. Verified end-to-end against unmodified QFT and Grover implementations.
Estimand — 一个用于 guppy/HUGR 程序的容错资源估算器。给定一个已编译的 guppy 电路，它可以在表面码方案下估算物理量子比特数、运行时间和错误概率。它是一个适配器，而非资源估算引擎——它从真实的 guppy 控制流（条件语句、嵌套循环、跨函数调用，甚至 CallIndirect）中提取门计数摘要，并将其输入到 Qualtran 已发布的成本模型中。已通过未经修改的 QFT 和 Grover 实现进行了端到端验证。

qmatchpoint — wires PyMatching (an established, peer-reviewed decoder) to the syndrome bits a guppy QEC circuit produces, since nothing in the guppylang/HUGR/Selene stack currently does decoding.
qmatchpoint — 将 PyMatching（一个成熟且经过同行评审的解码器）连接到 guppy QEC 电路产生的校验子（syndrome bits）上，因为目前 guppylang/HUGR/Selene 技术栈中还没有任何解码功能。

The bugs: Building qshelf against real algorithm math found four guppylang issues: a wrong unitary from iqft compiled standalone vs. combined with qft, a wrong unitary from multi-controlled Z (later fixed upstream), a rejected generic array-length type, and a rejected numpy.ndarray closure (reclassified as a feature request).
关于 Bug：在构建 qshelf 并对照真实算法数学逻辑时，我发现了四个 guppylang 问题：iqft 单独编译与结合 qft 编译时产生的酉矩阵错误、多受控 Z 门产生的酉矩阵错误（后在 upstream 中修复）、被拒绝的泛型数组长度类型，以及被拒绝的 numpy.ndarray 闭包（被重新归类为功能请求）。

The more interesting ones came from Estimand. Its whole job is turning guppy programs into gate counts, then trusting Qualtran's surface-code math to do the rest — so I went and checked that math against the actual cited papers (Beverland et al. 2022, Litinski 2019 x2), rather than trusting the citation. Two real discrepancies turned up: CompactDataBlock's tile-count formula was missing an additive constant from its own cited paper (arxiv.org/abs/1808.02892, Fig. 9) — confirmed by a maintainer, and by the time I got around to fixing it, main had already drifted to a different wrong version of the same formula. PR here, awaiting review.
更有趣的 Bug 来自 Estimand。它的全部工作是将 guppy 程序转换为门计数，然后信任 Qualtran 的表面码数学模型来完成后续计算——所以我没有盲目信任引用，而是对照实际引用的论文（Beverland 等人 2022，Litinski 2019 两篇）检查了这些数学逻辑。结果发现了两个真实的差异：CompactDataBlock 的瓦片计数公式遗漏了其引用论文（arxiv.org/abs/1808.02892，图 9）中的一个加法常数——这一点已得到维护者的确认，而且当我准备修复它时，主分支已经演变成了该公式的另一个错误版本。PR 在此，等待审核。

make_beverland_et_al()'s magic-state factory error model silently used Beverland's threshold constant instead of Litinski's own, inside a component that's otherwise a faithful reimplementation of Litinski's paper. Turned into a longer, still-open discussion about whether the whole preset should more faithfully reproduce Beverland's actual architecture choices (data block, factory grid-search) rather than borrowing Litinski's defaults.
make_beverland_et_al() 的魔态工厂错误模型在内部静默使用了 Beverland 的阈值常数，而不是 Litinski 本人的常数，尽管该组件的其他部分是对 Litinski 论文的忠实重现。这引发了一场更长且仍在进行的讨论：即整个预设是否应该更忠实地复现 Beverland 实际的架构选择（数据块、工厂网格搜索），而不是借用 Litinski 的默认设置。

None of this was the goal going in. It's just what happens when "does this actually match what it claims to implement" is a mandatory question, not an optional one, and I think that's a more useful takeaway than any of the three tools individually — verification discipline finds real things, even (especially) in mature, widely-used libraries. Repos linked above if any of it's useful, and happy to talk through any of the decisions behind them.
这些都不是我最初的目标。当“它是否真的符合其声称的实现”成为一个必答题而非选答题时，就会发生这种情况。我认为这比这三个工具本身更有价值——验证的严谨性能够发现真实存在的问题，即使（尤其是）在成熟且广泛使用的库中也是如此。如果这些工具对你有用，仓库链接在上方，我很乐意讨论背后的任何决策。