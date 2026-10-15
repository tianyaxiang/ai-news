---
title: "Sunsetting decomp.dev"
originalUrl: "https://decomp.dev/"
date: "2026-10-15T13:27:41.000Z"
excerpt: false
---

# Sunsetting decomp.dev

Sunsetting decomp.dev decomp.dev was born in 2024 as a way to centralize matching decompilation progress and to help expand a community of talented, like-minded folks. Historically, matching decompilation has been a brutally difficult, time consuming task, on the scale of years for any moderately-sized game with a number of active contributors.

decomp.dev 诞生于 2024 年，旨在集中展示匹配反编译（matching decompilation）的进度，并帮助扩大一个由才华横溢、志同道合的人组成的社区。从历史上看，匹配反编译是一项极其困难且耗时的任务，对于任何中等规模且拥有一定数量活跃贡献者的游戏来说，往往需要数年时间才能完成。

As we developed better tooling and shared knowledge around the intricacies of decompilation, the compilers, and the games themselves, progress began to accelerate. AI's use in decompilation has been experimented with for years, with mixed results. Starting with the release of Opus 4.6 and GPT-5.4 in early 2026, it was clear that the models were being trained on matching decompilation (they appeared to know our specific tools and how to use them without explicit guidance), and could achieve decent results inside of an established, clean codebase with exhaustive documentation.

随着我们开发出更好的工具，并围绕反编译、编译器以及游戏本身的复杂性分享知识，进度开始加快。AI 在反编译中的应用已经试验多年，结果喜忧参半。从 2026 年初 Opus 4.6 和 GPT-5.4 发布开始，很明显这些模型已经接受了匹配反编译的训练（它们似乎无需明确指导就能了解我们的特定工具及其使用方法），并且能够在拥有详尽文档且结构清晰的代码库中取得不错的效果。

However, those results still required a significant amount of human cleanup and fixes for obvious issues or cheating (code that technically compiles to the same machine code, but could not be reasonably passed as what the original developers wrote), and the cost per task was prohibitively expensive relative to the results. Recent models (like GPT-6-Astra) shifted things even further: they are significantly better at following complex directions, cross-referencing resources for symbols or debug information, and writing natural code with enough guidance.

然而，这些结果仍然需要大量的人工清理和修复，以解决明显的问题或“作弊”行为（即代码在技术上编译为相同的机器码，但无法被合理地视为原始开发者所写的内容），而且相对于结果而言，每项任务的成本高得令人望而却步。近期的模型（如 GPT-6-Astra）进一步改变了现状：它们在遵循复杂指令、交叉引用符号或调试信息资源以及在充分指导下编写自然代码方面表现得显著更好。

They are also exceptionally good permuters: they can write small scripts that test many different source code forms and combinations to find a match, even across files and headers to cover aspects like inlined helpers, signature changes, and operation ordering. In addition, their ability to remain coherent and focused across long-horizon tasks allows them to work continuously without going off the rails. Finally, they can achieve these better results faster and cheaper than earlier models could. It is now clear that, with the right guidance, human input, and code reviews, AI can expedite the decompilation process in a significant way.

它们也是极其出色的置换器（permuters）：它们可以编写小型脚本来测试许多不同的源代码形式和组合以寻找匹配项，甚至可以跨文件和头文件来处理内联辅助函数、签名更改和操作顺序等问题。此外，它们在长周期任务中保持连贯性和专注力的能力，使它们能够持续工作而不偏离轨道。最后，它们能比早期模型更快、更廉价地实现这些更好的结果。现在很清楚，在正确的指导、人工输入和代码审查下，AI 可以显著加快反编译过程。

What is also now clear is that the community aspect of decompilation has been broken. Our projects have always been open source to encourage contributions and to benefit the community as a whole. Bad actors have been abusing this in increasingly troublesome ways: Forking existing decompilation projects to "finish" them with AI. Every project works differently: some may not want to use AI for legal or ethical reasons, and others may be okay with AI, or use AI themselves, but do not want drive-by contributions from folks who have put no effort into making sure the contributions are good.

同样显而易见的是，反编译的社区属性已经被破坏了。我们的项目一直以来都是开源的，旨在鼓励贡献并造福整个社区。恶意行为者正以越来越令人困扰的方式滥用这一点：通过分叉（forking）现有的反编译项目，并利用 AI 来“完成”它们。每个项目的运作方式各不相同：有些项目可能出于法律或道德原因不希望使用 AI，而另一些项目可能对 AI 持开放态度，或者自己也在使用 AI，但他们不希望接受那些未投入任何精力确保贡献质量的“路人”贡献。

The bottom line is that these kinds of hostile forks put little to no effort into meaningfully contributing to existing projects, tearing apart our community fabric. Racing to port games, especially utilizing decompilations that they did not contribute to. Yes, now anyone with an AI subscription can manage to create a port or static recompilation that functions at a basic level. Compared to the decompilation process itself, porting is relatively easy, especially with the established tools written by talented humans. While community members put in the effort to decompile a game, opportunists have frequently raced to release a half-baked, barely-functional port from it.

归根结底，这类敌意分叉几乎没有为现有项目做出任何有意义的贡献，反而撕裂了我们的社区结构。他们竞相移植游戏，尤其是利用那些他们并未参与贡献的反编译成果。是的，现在任何拥有 AI 订阅的人都能设法创建一个功能基础的移植版或静态重编译版。与反编译过程本身相比，移植相对容易，特别是在有才华的人类编写的成熟工具辅助下。当社区成员努力反编译游戏时，投机者却经常竞相发布基于此的、半成品且功能勉强的移植版。

Conflating decompilation and ports. For years, decompilation communities attempted to establish that decompilation is primarily for research: we love these games and want to understand how they work, and to uncover the mysteries that the original developers left behind. That's not to say that ports aren't fun too; they're just not the sole reason a decompilation exists. Sloptubers and subreddits like /r/decomps have done immense damage here, freely using "decomp" to mean "PC port".

混淆反编译与移植。多年来，反编译社区一直试图确立反编译主要用于研究的宗旨：我们热爱这些游戏，想要了解它们是如何运作的，并揭开原始开发者留下的谜团。这并不是说移植版没有乐趣；它们只是反编译存在的唯一理由。Sloptubers 和像 /r/decomps 这样的 Subreddit 在这方面造成了巨大的损害，他们随意地将“decomp”（反编译）等同于“PC 移植”。

decomp.dev was originally designed to gamify decompilation: watching the progress go up was a fun way to stay motivated when every fraction of a percent took real human effort. Today, that same idea has warped decompilation into a hollow numbers game, exacerbated by folks who just want to burn tokens to make number go up or "port game to PC", all else be damned. While the increased attention has brought in genuine folks who want to learn and contribute meaningfully, I believe that decomp.dev serving as a public index and leaderboard is now causing more harm than good.

decomp.dev 最初的设计初衷是将反编译游戏化：当每一个百分点的进展都需要人类付出真实努力时，看着进度条上升是一种保持动力的有趣方式。如今，同样的理念已将反编译扭曲成了一场空洞的数字游戏，而那些只想消耗 Token 来让数字上升或“将游戏移植到 PC”，而不顾其他一切的人，更是加剧了这种现象。虽然关注度的增加带来了一些真正想要学习并做出有意义贡献的人，但我认为 decomp.dev 作为公共索引和排行榜，现在带来的弊大于利。

What happens now? decomp.dev will continue to track existing projects and serve individual project pages and historical data, but the main index and adding new projects are disabled. Can I fork and host my own version of decomp.dev? No. decomp.dev's repository has never had an open source license, and I continue to reserve all rights to the (entirely human written) code. Any replica must not use decomp.dev's code in any form.

接下来会怎样？decomp.dev 将继续跟踪现有项目，并提供各个项目的页面和历史数据，但主索引和添加新项目的功能将被禁用。我可以分叉并托管我自己的 decomp.dev 版本吗？不行。decomp.dev 的仓库从未拥有过开源许可证，我保留对这些（完全由人类编写的）代码的所有权利。任何副本都不得以任何形式使用 decomp.dev 的代码。

Why not just forbid AI-assisted projects? I have long held the opinion that AI is not the issue by itself, and we now know it can help tremendously when used correctly. "Slop" comes in many forms, is hard to define, and even harder to moderate. As a sole hobbyist, I don't have the energy (or desire) to define what makes a "good" decompilation and enforce that consistently across the hundreds of projects on the site. As this era of decompilation comes to a close, I want to thank everyone who's been involved and contributed to our projects, communities and tools. The people and passion behind these projects have always been what's made them fun and rewarding. — @encounter

为什么不直接禁止 AI 辅助项目？我长期以来一直认为 AI 本身不是问题所在，而且我们现在知道，如果使用得当，它可以提供巨大的帮助。“垃圾内容”（Slop）有多种形式，难以定义，更难以管理。作为一名个人爱好者，我没有精力（也没有意愿）去定义什么是“好的”反编译，并在网站上的数百个项目中始终如一地执行这一标准。随着这个反编译时代的落幕，我要感谢所有参与并为我们的项目、社区和工具做出贡献的人。这些项目背后的人和热情，一直以来都是让它们变得有趣且有意义的原因。— @encounter