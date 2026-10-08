---
title: "“Software is over”: Bold AI developer takes aim at Adobe with open source clones"
originalUrl: "https://arstechnica.com/ai/2026/10/software-is-over-bold-ai-developer-takes-aim-at-adobe-with-open-source-clones/"
date: "2026-10-07T21:56:42.000Z"
excerpt: false
---

For a while, those hoping to avoid the difficulty and expense of dealing with Adobe’s Creative Suite have been able to use several free and/or open-source alternatives that replicate some or all of those capabilities. Now, one developer is using AI-powered reverse engineering to mimic the look, feel, and functionality of Adobe’s well-known software with what he hopes will soon be perfect fidelity.

长期以来，那些希望避免处理 Adobe Creative Suite 所带来的困难和高昂费用的人们，一直能够使用几种免费或开源的替代方案，这些方案复制了 Adobe 软件的部分或全部功能。现在，一位开发者正利用人工智能驱动的逆向工程技术，试图以他所期望的“完美保真度”来模仿 Adobe 知名软件的外观、操作感和功能。

Artcraft got its start last year as a “controllable AI for artists” that allows for precise post-generation editing of AI-crafted images and videos. Over the weekend, though, the brand debuted its pivot to a suite of seven open source apps recreating the user interface and tools found in Adobe’s Photoshop, Illustrator, Premiere, Lightroom, After Effects, InDesign, and Acrobat Pro.

Artcraft 于去年起步，最初定位为“艺术家的可控人工智能”，允许对人工智能生成的图像和视频进行精确的后期编辑。然而，该品牌在周末宣布转型，推出了一套包含七款开源应用程序的套件，旨在重现 Adobe Photoshop、Illustrator、Premiere、Lightroom、After Effects、InDesign 和 Acrobat Pro 中的用户界面和工具。

In announcing those new apps on Reddit earlier this week, software developer Brandon Thomas said he used Anthropic’s Claude Opus 5.5 to create “clean-room replacements” for Adobe’s closed source software in Rust (with WebAssembly versions available for use in a browser). And while commenters on Hacker News and elsewhere have taken pains to point out the new software’s many current shortcomings, Thomas make the grandiose promise that the current “super early alpha” state will soon lead to something just as functional as anything Adobe has ever put out.

本周早些时候，软件开发者 Brandon Thomas 在 Reddit 上宣布这些新应用时表示，他使用 Anthropic 的 Claude Opus 5.5 模型，以 Rust 语言为 Adobe 的闭源软件创建了“净室替代品”（并提供可在浏览器中使用的 WebAssembly 版本）。尽管 Hacker News 等平台的评论者费尽心思指出了这些新软件目前存在的诸多缺陷，但 Thomas 却夸下海口，承诺目前处于“超早期 Alpha”阶段的产品很快就能达到与 Adobe 任何产品同样的功能水平。

“We’re going to reach 100% [feature] parity within a month,” Thomas stated on Reddit of his plans to quickly squash bugs and add features with the help of community reports. Days later, on Hacker News, he amended that position slightly to say that “99% parity will take a while, but I’m sure it’ll be measured in months and not years.”

“我们将在一个月内实现 100% 的功能对等，”Thomas 在 Reddit 上阐述了他的计划，即在社区报告的帮助下快速修复漏洞并添加功能。几天后，他在 Hacker News 上稍微修正了这一立场，称“实现 99% 的对等需要一些时间，但我确信这将以月而非年来计算。”

Is software over? Thomas, who says he has about a decade of experience working on large-scale Rust projects, wrote on Hacker News that he was inspired to create his own open source Adobe software alternatives after being “bit by the dark pattern ‘cancellation fee’ one too many times.” Development of the totally free options offered here under MIT/Apache licenses will be funded, Thomas wrote, by selling token-based access to the pre-existing Artcraft visual AI model and IDE, which is offered as an imagery-generation option inside the apps alongside third-party models.

软件时代终结了吗？自称拥有约十年大型 Rust 项目开发经验的 Thomas 在 Hacker News 上写道，他之所以萌生创建开源 Adobe 软件替代品的想法，是因为“被那些黑暗模式的‘取消费用’坑得太多次了”。Thomas 写道，这些以 MIT/Apache 许可证提供的完全免费选项，其开发资金将通过出售对现有 Artcraft 视觉 AI 模型和 IDE 的基于代币的访问权限来筹集，该模型作为应用内的图像生成选项与第三方模型一同提供。

This revenue stream will help ensure these apps aren’t “going to be some orphaned small-team project,” Thomas wrote. “We have a team building popular software for filmmakers, so supporting this is fully funded.”

Thomas 写道，这一收入来源将有助于确保这些应用“不会成为被遗弃的小团队项目”。“我们有一个为电影制作人构建流行软件的团队，因此对该项目的支持资金充足。”

Thomas is the latest in a long line of coders using AI tools to speed up the long-standing but labor-intensive practice of reverse engineering (i.e., replicating the functionality of a piece of software without directly copying the code itself). While that practice has generally been found legally acceptable, the ArtCraft apps could still face legal trouble if their “trade dress” too closely mimics Adobe’s familiar appearance and interface.

Thomas 是众多利用人工智能工具加速逆向工程（即在不直接复制源代码的情况下复制软件功能）这一长期且繁重工作的程序员之一。虽然这种做法通常被认为在法律上是可以接受的，但如果 ArtCraft 应用的“商业外观”过于模仿 Adobe 熟悉的外观和界面，它们仍可能面临法律风险。

After coding exclusively with AI tools since February, Thomas said he foresees a near future when everyday developers can re-create open source versions of popular paid software to “take back the internet and own tech forever.” “Now you can just create 1:1 functional equivalents, clean room, that are highly performant and cross-platform. Nothing is stopping you,” Thomas wrote. “We’ll replace Google Search, we’ll build our own smartphones, we’ll build better infra. We’ll remove all the ads and de-enshittify the entire tech world.”

自二月份以来一直完全使用人工智能工具进行编码的 Thomas 表示，他预见到在不久的将来，普通开发者可以重新创建流行付费软件的开源版本，从而“夺回互联网并永远拥有技术”。“现在你可以直接创建高性能、跨平台的 1:1 功能等效产品，且采用净室开发。没有什么能阻止你，”Thomas 写道。“我们将取代谷歌搜索，我们将制造自己的智能手机，我们将构建更好的基础设施。我们将移除所有广告，并让整个科技世界摆脱‘垃圾化’。”

“Software is over,” he gloated in an earlier comment, claiming to have “one-shotted Photoshop. The whole thing.”

“软件时代终结了，”他在早些时候的一条评论中沾沾自喜地说道，声称自己已经“一举击败了 Photoshop。整个软件都被搞定了。”