---
title: "The holy grail of nixpkgs: version ranges"
originalUrl: "https://fzakaria.com/2026/09/01/the-holy-grail-of-nixpkgs-version-ranges"
date: "2026-09-02T23:33:04.483Z"
---

# The holy grail of nixpkgs: version ranges
# Nixpkgs 的圣杯：版本范围

Update: You can try this live at [fzakaria.github.io/grail](https://fzakaria.github.io/grail) and query nixpkgs version ranges in your browser, the same solver, compiled to WebAssembly. Ever since I launched nixmultiverse.com, I knew there were so many possibilities to explore. One of the most exciting is the ability to ask questions about the history of nixpkgs that were previously impossible to answer. I added some basic support for this type of introspection in the mvs tool that I demonstrated in a previous post: figuring out the minimum number of nixpkgs to satisfy a set of package exact version constraints. The real magic happens when you can ask questions about version ranges. 🧙
更新：你可以在 [fzakaria.github.io/grail](https://fzakaria.github.io/grail) 在线尝试，通过浏览器查询 nixpkgs 的版本范围，这是同一个编译为 WebAssembly 的求解器。自从我发布 nixmultiverse.com 以来，我就知道有太多可能性值得探索。其中最令人兴奋的，是能够查询那些以前无法回答的 nixpkgs 历史问题。我在之前文章中演示的 mvs 工具里添加了一些此类内省的基本支持：即计算满足一组精确版本约束所需的最小 nixpkgs 数量。而当你能够查询版本范围时，真正的魔法才刚刚开始。🧙

Nixpkgs is a versionless package manager. Every attribute has one version, and that version is whatever the revision you happen to be on says it is. This is a great design for simplicity, sometimes it comes at a cost though of compatibility. What would it take to add version range support to Nixpkgs? nixpkgs has never had version ranges until now! 😈
Nixpkgs 是一个无版本（versionless）的包管理器。每个属性只有一个版本，而这个版本取决于你当前所处的修订版本（revision）。这种设计在简洁性上非常出色，但有时会以牺牲兼容性为代价。要在 Nixpkgs 中添加版本范围支持需要做些什么呢？直到现在，nixpkgs 从未有过版本范围功能！😈

# one revision where BOTH constraints were simultaneously true
# 一个同时满足这两个约束的修订版本
$ grail solve 'python3@>=3.10 ^openssl@1.1.*'
1 revision 2022-09-12-5f326e2a403e (2022-09-12, r852)
python3 3.10.6
openssl 1.1.1q
glibc: 2.35

grail.lib.${system}.mkDerivation {
  pname = "demo";
  specs = "python3@>=3.10 ^openssl@1.1.*";
  dontUnpack = true;
  installPhase = ''
    { python3 --version; openssl version; } | tee $out '';
}

This example was thought to be inexpressible in nixpkgs. Nixpkgs has effectively one version per attribute, so there is nothing to range over. This is why Nix does not need a dependency solver: a solver picks among versions, and there are simply no versions to select. If we want to reliably build software as the original author intended though, it helps to provide the author with the ability to express a range of versions that are known to work. This is the “holy grail” of nixpkgs: version ranges.
这个例子曾被认为在 nixpkgs 中是无法表达的。Nixpkgs 每个属性实际上只有一个版本，因此没有范围可言。这就是为什么 Nix 不需要依赖求解器的原因：求解器是在多个版本中进行选择，而这里根本没有版本可供选择。然而，如果我们想按照原始作者的意图可靠地构建软件，那么为作者提供表达已知可用版本范围的能力将大有裨益。这就是 nixpkgs 的“圣杯”：版本范围。

Nearly all other packaging ecosystem include support for version ranges (i.e. npm, cargo, pip). Surprisingly, even store-based package managers similar to Nix have version ranges. Spack is the most well-known example of this, and it is a store-based package manager for HPC. Spack has a rich spec language, which I will copy, that allows you to express constraints for its package recipes.
几乎所有其他包管理生态系统都包含对版本范围的支持（例如 npm、cargo、pip）。令人惊讶的是，即使是类似于 Nix 的基于存储（store-based）的包管理器也支持版本范围。Spack 是其中最著名的例子，它是一个用于高性能计算（HPC）的基于存储的包管理器。Spack 拥有一种丰富的规范语言（我将借鉴它），允许你为其包配方表达约束。

Spoiler: For those geeks 🤓 who are already thinking “What about libc compatability!?” and thinking this will end in despair, fear not! Spack has a `libc_compatibility.lp` that helps their solver reason about the compatibility of different glibc versions. Keep reading to find out more.
剧透：对于那些已经在思考“libc 兼容性怎么办！？”并认为这最终会陷入绝望的极客们 🤓，别担心！Spack 有一个 `libc_compatibility.lp` 文件，可以帮助其求解器推断不同 glibc 版本之间的兼容性。继续阅读以了解更多信息。

The inclusion of nixpkgs-multiverse un-deleted every version from Nixpkgs. 309,000+ package-versions across 1,541 revisions of nixos-unstable, nearly every one of them a cache hit. The moment versions became a choice, solving became a real possibility. I get to hand Nix the solver it thought it never needed. 😈
nixpkgs-multiverse 的引入恢复了 Nixpkgs 中所有被删除的版本。在 nixos-unstable 的 1,541 个修订版本中，包含了 309,000 多个包版本，几乎每一个都能命中缓存。当版本成为一种选择时，求解就成为了真正的可能。我终于可以为 Nix 提供它曾经认为不需要的求解器了。😈

### §grail
The multiverse already solves exact pins, and provably well in O(n log n). However it had some caveats to the solution. In order to solve version ranges, the problem becomes a boolean satisfiability problem and therefore NP-hard. Time for a real solver!
Multiverse 已经可以解决精确版本锁定问题，并且在 O(n log n) 时间复杂度内表现良好。然而，该方案存在一些局限性。为了解决版本范围问题，该问题转化为布尔可满足性问题（SAT），因此是 NP-hard 的。是时候引入一个真正的求解器了！

grail is a small query language tied to a solver. The grammar is shamelessly Spack-flavored: `@` takes a range, and `^` chains constraints into a coexistence group, meaning they must resolve at one shared revision.
grail 是一种绑定到求解器的小型查询语言。其语法毫不掩饰地借鉴了 Spack：`@` 用于指定范围，`^` 将约束链接到一个共存组（coexistence group），这意味着它们必须在同一个共享的修订版本中解析。

A quick primer on the query language:
查询语言快速入门：

| sigil | example | meaning |
| :--- | :--- | :--- |
| @ | python3@>=3.10 | attach a version range to an attribute; a bare attr means any version |
| > <= < = | ripgrep@>=14 | compare in builtins.compareVersions order |
| bare version, .x, .* | openssl@1.1.* | component-wise prefix: 3.8 accepts 3.8.9, refuses 3.81 |
| .. | python3@3.10..3.12 | inclusive interval; the upper end is prefix-inclusive, so 3.12.4 stays |
| , | @>=3.9,<3.12 | logical and: every term must hold |
| \|\| | @4.*\|\|5.* | logical or: either side may hold |
| ^ | a@1 ^b@2 | coexistence: chain onto the previous spec, one shared revision serves the whole group |
| whitespace | a@1 b@2 | independent specs; the solver still merges them onto one revision when it can |

| 符号 | 示例 | 含义 |
| :--- | :--- | :--- |
| @ | python3@>=3.10 | 为属性附加版本范围；裸属性表示任意版本 |
| > <= < = | ripgrep@>=14 | 按 builtins.compareVersions 顺序比较 |
| 裸版本, .x, .* | openssl@1.1.* | 按组件前缀匹配：3.8 接受 3.8.9，拒绝 3.81 |
| .. | python3@3.10..3.12 | 闭区间；上限是前缀包含的，所以 3.12.4 被保留 |
| , | @>=3.9,<3.12 | 逻辑与：每一项都必须成立 |
| \|\| | @4.*\|\|5.* | 逻辑或：任一侧成立即可 |
| ^ | a@1 ^b@2 | 共存：链接到前一个规范，一个共享修订版本服务整个组 |
| 空格 | a@1 b@2 | 独立规范；求解器在可能时仍会将它们合并到同一个修订版本 |

The grammar’s BNF can be found at `docs/grammar.md`. There is also support for date ranges and glibc eras via `--one-glibc`.
该语法的 BNF 可以在 `docs/grammar.md` 中找到。此外，通过 `--one-glibc` 还支持日期范围和 glibc 时代（eras）的限制。

# independent constraints: minimized across revisions
# 独立约束：跨修订版本最小化
$ grail solve 'ffmpeg@4.* ripgrep@>=14'

# a coexistence group: one revision serves all of it
# 共存组：一个修订版本服务于所有约束
$ grail solve 'python3@>=3.10 ^nodejs@>=20 ^go@>=1.21 ^ruby@>=3.2'
1 revision 2026-08-31-34ab99075ac4 (2026-08-31, r1540)
python3 3.14.7
nodejs 24.19.0
go 1.26.7
ruby 3.4.9
glibc: 2.42

You can visualize the SAT solver’s plan with `--viz`. Here is `ffmpeg@4.* ripgrep@>=14 ^bat`: the solver merges ripgrep and bat onto the tip and gives ffmpeg 4 its own 2023 world:
你可以使用 `--viz` 可视化 SAT 求解器的计划。以下是 `ffmpeg@4.* ripgrep@>=14 ^bat` 的结果：求解器将 ripgrep 和 bat 合并到了最新版本，并为 ffmpeg 4 提供了它所属的 2023 年环境：
$ grail solve 'ffmpeg@4.* ripgrep@>=14 ^bat' --viz plan.svg

The SAT solver I used also dutifully tells me when a set of constraints is unsatisfiable, and why with a surprising amount of detail:
我使用的 SAT 求解器还能尽职地告诉我一组约束何时不可满足，并以令人惊讶的详细程度说明原因：
$ grail solve 'python3@3.8.* ^postgresql@13.*'
unsatisfiable: python3@3.8.* and postgresql@13.* never overlapped: python3@3.8.* was last alive 2021-07-18 (r621), postgresql@13.* first alive 2021-08-01 (r625)

So for python 3.8 and postgresql 13 no single Nixpkgs revision can satisfy both constraints as known to the nixmultiverse.com index. The earlier opening query, `python3@>=3.10 ^openssl@1.1.*`, was satisified though. Drawing its lifetimes against the full index shows how. The shaded band is the overlap of 88 days.
因此，对于 python 3.8 和 postgresql 13，根据 nixmultiverse.com 索引，没有任何一个 Nixpkgs 修订版本能同时满足这两个约束。然而，之前开篇的查询 `python3@>=3.10 ^openssl@1.1.*` 是可以满足的。将其生命周期与完整索引进行对比即可看出原因。阴影区域即为 88 天的重叠期。

### §A five-minute tour of ASP
### §ASP 五分钟之旅
The SAT solver used is Answer Set Programming (ASP), specifically clingo. Answer Set Programming looks like Prolog but thinks like SAT. You write facts, rules, and constraints; clingo grounds them and searches for stable models: assignments where everything holds. The facts are just rows, emitted from t
所使用的 SAT 求解器是答案集编程（Answer Set Programming, ASP），具体来说是 clingo。答案集编程看起来像 Prolog，但思考方式像 SAT。你编写事实、规则和约束；clingo 将它们实例化（grounding）并搜索稳定模型：即所有条件都成立的赋值。事实只是行数据，从 t...（原文截断）