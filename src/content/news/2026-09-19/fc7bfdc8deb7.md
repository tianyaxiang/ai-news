---
title: "Bend 2 and the Vibe-Coding Trap"
originalUrl: "https://blog.liampwll.com/posts/bend_vibe_coding/"
date: "2026-09-18T23:23:49.156Z"
---

# Bend 2 and the Vibe-Coding Trap

**Bend 2 and the Vibe-Coding Trap**
**Bend 2 与“氛围编程”陷阱**

September 18, 2026
2026 年 9 月 18 日

Bend just serves as a useful example of my general point regarding vibe-coding as it is recent, high-profile, and has aspects that make it easy to use as an example. I don’t know anything about the author’s history with designing languages or if they actually did consider the tradeoffs below and made what I think is a poor choice. Feel free to replace “the author” below with “a hypothetical author who could have created the same thing”.
Bend 只是我关于“氛围编程”（vibe-coding）这一普遍观点的一个有用案例，因为它既新颖又备受关注，且具备一些易于作为例证的特性。我并不了解作者在语言设计方面的背景，也不确定他们是否真的权衡过下文提到的利弊，从而做出了我所认为的糟糕选择。请随意将下文中的“作者”替换为“可能创造出同样事物的假设性作者”。

I obviously do not like the design decisions made in Bend and I wanted to present those, however that’s been overly conflated with the main point that I’m trying to make below. I don’t want to edit this now and make it seem like any existing comments are being overly harsh so I feel that the best solution is explaining what my mental model of the article looked like while writing it instead. Here is a comment by the author of Bend.
显然，我不喜欢 Bend 所做的设计决策，我本想提出这些问题，但这与我下文试图表达的核心观点混淆了。我不想现在进行编辑，以免让现有的评论显得过于苛刻，所以我认为最好的解决办法是解释我在撰写本文时的思维模型。以下是 Bend 作者的一条评论。

Bend 2 is being pitched as a language for the AI coding era: humans write “laws”, AI writes implementations and proofs, and the compiler checks that the proofs are sound. That all sounds quite impressive and I can see why someone would want a language that does that. There are actually a few major problems with this idea; however, that’s not what this article about. Instead I want to talk about how the Bend itself seems to have fallen in to a common trap with vibe-coding that I don’t see mentioned much.
Bend 2 被宣传为 AI 编程时代的语言：人类编写“法则”（laws），AI 编写实现和证明，编译器负责检查证明的可靠性。这听起来非常令人印象深刻，我也能理解为什么有人想要这样一种语言。这个想法实际上存在几个重大问题；然而，这并非本文的主题。相反，我想谈谈 Bend 本身似乎陷入了一个在“氛围编程”中很常见、但我很少看到有人提及的陷阱。

Let’s start with a baseline of what Bend requires the developer to write for its demo on the home page: https://github.com/bendlang/bend/blob/main/demos/app_win_is_bug_2d/LAWS.bend I won’t reproduce it here because the code isn’t too important. What is important for this article is that it’s quite a bit of code. It’s 58 lines of code just to state that the player can never touch the flag or win the game. There’s also other problems in that the LLM can redefine the Game subprograms to do anything; however, that’s once again not the point of the article.
让我们从 Bend 官网演示所需的代码基准开始：https://github.com/bendlang/bend/blob/main/demos/app_win_is_bug_2d/LAWS.bend。我不会在这里重现它，因为代码本身并不重要。对本文而言重要的是，代码量相当大。仅仅为了声明玩家永远无法触碰旗帜或赢得游戏，就需要 58 行代码。此外还存在其他问题，比如 LLM 可以重新定义游戏子程序来执行任何操作；但这同样不是本文的重点。

Next up lets look at what the LLM writing the code for this program needs to write in order to prove the “laws”: https://github.com/bendlang/bend/blob/main/demos/app_win_is_bug_2d/PROOF.bend That’s a lot. 442 lines of code to prove those simple properties. So what’s the problem I have with this? Why am I calling it a vibe-coding trap?
接下来，让我们看看为该程序编写代码的 LLM 需要写多少内容来证明这些“法则”：https://github.com/bendlang/bend/blob/main/demos/app_win_is_bug_2d/PROOF.bend。这非常多。需要 442 行代码来证明这些简单的属性。那么，我对这一点有什么不满呢？为什么我称之为“氛围编程”陷阱？

The problem is that vibe coding makes it possible to build a substantial solution before learning enough about the problem to recognise that a much better solution exists. A developer can produce an entire language and compiler while missing an approach that an introductory survey of the field would have put directly in front of them. The field in question is formal verification. It’s notable that those two words appear nowhere on Bend’s webpage or in its codebase. The developer has built an entire language around a field seemingly without realising that said field exists.
问题在于，“氛围编程”使得开发者在对问题了解不足、无法意识到存在更好的解决方案之前，就可能构建出一个庞大的方案。开发者可以创造出一门完整的语言和编译器，却忽略了该领域入门级调研就能直接呈现给他们的方案。这个领域就是“形式化验证”（formal verification）。值得注意的是，这两个词在 Bend 的网页或代码库中从未出现过。开发者围绕一个领域构建了整门语言，却似乎根本没有意识到该领域本身的存在。

To clearly demonstrate why this is a problem, let’s recreate the same program that Bend uses as a demo in SPARK, an open source language and compiler for formal verification. To be fair to Bend, I completely vibe-coded this, I just told a LLM to recreate the demo in SPARK with no further guidance:
为了清楚地说明为什么这是一个问题，让我们用 SPARK（一种用于形式化验证的开源语言和编译器）重现 Bend 用作演示的同一个程序。为了对 Bend 公平起见，我完全使用了“氛围编程”的方式，我只是告诉 LLM 在 SPARK 中重现该演示，没有提供任何进一步的指导：

*(Code block omitted for brevity)*

So now we have the same laws defined as Bend, what’s the point I’m trying to make here? Where this differs from Bend is that what we have supplied here is everything required to prove the correctness of the program, without having a LLM waste time and tokens on building up a 442 line proof from first principles. We can run GNATprove and get: Success: all checks proved (12 checks). The author of Bend has completely missed that this is the current standard in the field of formal verification, if they even know that this field exists at all. They have instead come up with this whole system requiring verbose specifications and even m
现在我们定义了与 Bend 相同的法则，我想表达的观点是什么呢？它与 Bend 的区别在于，我们在此提供的是证明程序正确性所需的一切，而无需让 LLM 浪费时间和 Token 从第一性原理出发去构建 442 行的证明。我们可以运行 GNATprove 并得到结果：成功：所有检查均已通过（12 项检查）。Bend 的作者完全忽略了这是形式化验证领域的当前标准，如果他们甚至知道这个领域存在的话。相反，他们想出了一整套需要冗长规范的系统，甚至……