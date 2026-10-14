---
title: "The reverts will continue until morale improves"
originalUrl: "http://peter.eisentraut.org/blog/2026/10/09/the-reverts-will-continue-until-morale-improves"
date: "2026-10-13T11:37:06.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# The reverts will continue until morale improves

Many readers will be aware that an unusually high number of features have been reverted from the PostgreSQL 19 branch after the beta period began. Having some reverts is not unusual, maybe one per cycle could be expected. But this time around, about 8 to 10 significant features, depending on how you count, have been reverted, and some of them quite late in the beta period.

许多读者可能已经注意到，PostgreSQL 19 分支在进入测试阶段后，被撤回的功能数量异常之多。出现少量撤回并不罕见，通常每个周期可能会有一两个。但这一次，根据统计方式的不同，大约有 8 到 10 项重要功能被撤回，其中一些甚至是在测试期末尾才被撤回的。

I have been on the receiving end of some of that, as the developer or committer of some of those features, and have gotten some questions about it, and so I want to take a moment to reflect on this. I’ll try to extrapolate a little bit to similarly affected work that I was not actively involved in, but these are just my opinions at this point. So what happened? I don’t think we, meaning all the developers affected, have had enough time to fully reflect on all this. But here are some thoughts.

作为其中一些功能的开发者或提交者，我亲身经历了这些情况，也收到了一些相关询问，因此我想花点时间反思一下。我将尝试推论一些我未直接参与但受到类似影响的工作，但这仅代表我个人的观点。那么究竟发生了什么？我认为我们（指所有受影响的开发者）还没有足够的时间来全面反思这一切。但以下是一些想法。

It’s probably a combination of these, and a different combination in the case of each reverted feature. Maybe we just didn’t do a good enough job. Maybe the code was just not good enough. We’ll learn and improve. It’s probably some of that, and I’m mentioning it here to not give the impression that it was only the other factors that I’m going to mention. It could also be a coincidence. Maybe we had been on such a good roll that we attempted to tackle several features that turned out to be too hard, or at least too hard to finish in time.

这可能是多种因素共同作用的结果，且每项被撤回的功能所涉及的因素组合各不相同。也许是我们做得不够好，也许是代码本身质量欠佳。我们会吸取教训并加以改进。这其中肯定有这方面的原因，我在此提及是为了避免让人产生一种错觉，即认为只有我接下来要提到的其他因素才是原因。这也可能纯属巧合。也许我们之前进展太顺利，以至于试图同时处理几项最终证明过于困难，或者至少无法按时完成的功能。

Some of the reverted features had significant architectural defects that would have been hard to fix quickly and during beta. But there was also a long tail of relatively harmless issues involving various edge cases. In past times, many of these would not have surfaced until much later and we would have fixed them bit by bit over the subsequent five years. But with LLM-assisted code review, these kinds of things can get found much faster, and then you’re staring at a list of like forty defect reports.

一些被撤回的功能存在重大的架构缺陷，很难在测试期间快速修复。但同时也存在大量涉及各种边缘情况的相对无害的问题。在过去，其中许多问题直到很久以后才会浮出水面，我们会在随后的五年里一点一点地修复它们。但有了大语言模型（LLM）辅助的代码审查，这类问题能被更快地发现，然后你就会面对一份包含大约四十个缺陷报告的列表。

And even if each of them requires only a three-line fix on average, there is a fixed overhead to dealing with each of these, and then you run out of time. Most if not all of the affected reverted features were written a long time ago when LLM-assisted code review was not as useful as it is now, meaning that the effective quality bar has been raised after the time the feature was written and committed. Unless the capabilities of LLM-assisted code review keep improving at the current rate, this situation should sort itself out for future development cycles.

即使平均每个问题只需要三行代码就能修复，处理每一个问题都有固定的开销，最终导致时间耗尽。大多数（如果不是全部）受影响的被撤回功能都是很久以前编写的，当时 LLM 辅助代码审查还没有现在这么有用，这意味着在这些功能编写并提交之后，实际的质量标准已经提高了。除非 LLM 辅助代码审查的能力继续以目前的速度提升，否则这种情况在未来的开发周期中应该会自行解决。

A corollary of that is that, at least for the most part, as far as I can tell, this situation is not due to “vibe coding”. This code was written well before that was a possibility. Because of the Vulnpocalypse, many senior developers were busy between, say, April (the start of feature freeze for PostgreSQL 19, and also the start of the Vulnpocalypse) and August (the most recent PostgreSQL security release) with working on fixes for security issues.

由此得出的一个推论是，据我所知，这种情况在很大程度上并非源于“凭感觉编程”（vibe coding）。这些代码是在那种可能性出现之前很久编写的。由于“漏洞末日”（Vulnpocalypse）事件，许多资深开发者在四月（PostgreSQL 19 功能冻结的开始，也是“漏洞末日”的开始）到八月（最近一次 PostgreSQL 安全版本发布）期间，一直忙于修复安全问题。

Because of that, the usual additional review and testing that happens during the beta period was reduced, and then picked up again in August. That’s possibly why a lot of new issues were discovered quite late in the beta period and why so many reverts happened so late, which is what made all of this so notable. Again, some issues were more fundamental but there was also a long tail of smaller issues, and I feel with more time, say, two months, these could have been addressed (given adequate focus, but note that the Vulnpocalypse is ongoing).

正因如此，测试期间通常进行的额外审查和测试工作减少了，直到八月份才重新恢复。这可能就是为什么许多新问题在测试期末尾才被发现，以及为什么会有这么多撤回发生在如此晚的阶段，这也是让这一切显得如此引人注目的原因。再次强调，有些问题比较根本，但同时也存在大量较小的问题，我觉得如果有更多时间，比如两个月，这些问题本可以得到解决（前提是给予足够的关注，但请注意“漏洞末日”仍在持续）。

But the community preferred trying to stick to the release schedule rather than delaying to get more fixes in. (And you never know how long a long tail really is.) The complexity of the system has made some kinds of features extremely complex to get right, and there is not enough scaffolding in the code to support that. Consider, as an abstracted example, some SQL-level query language feature. Does it work with domains? How about with domains over a composite type? Where one of the fields is also a domain? And the domain has a not null constraint?

但社区更倾向于坚持发布计划，而不是为了修复更多问题而推迟发布。（而且你永远不知道长尾问题到底有多长。）系统的复杂性使得某些功能极难做到完美，代码中缺乏足够的支撑架构。以一个抽象的例子为例，考虑某种 SQL 级别的查询语言功能。它能与域（domains）兼容吗？与复合类型上的域兼容吗？如果其中一个字段也是域呢？如果该域有非空约束呢？

And one of the columns was dropped and re-added? And this is part of a table partition that has been detached and reattached with a different column order? And this is part of a view that is called from a security-definer function from a trigger? And so on. No one can manually test this or even enumerate these test cases. But LLM-assisted fuzzing can find problems with this really quickly. So this probably needs to be part of feature development in the future.

如果其中一列被删除并重新添加了呢？如果这是表分区的一部分，且该分区在被分离并以不同列顺序重新附加后呢？如果这是从触发器的安全定义函数中调用的视图的一部分呢？等等。没有人能手动测试这些情况，甚至无法列举出所有测试用例。但 LLM 辅助的模糊测试可以非常快地发现这些问题。因此，这可能需要成为未来功能开发的一部分。

But we should also think about making the internal interfaces more robust so that each different combination of contexts doesn’t open up so many new possibilities of interactions. I like to say, in PostgreSQL, “everything works with everything”. This is part of the appeal, that you can construct cases like this and expect them to work. I don’t want to give up on that at all. But it does impose a significant penalty on feature development that everyone needs to be aware of.

但我们也应该考虑使内部接口更加健壮，这样每种不同的上下文组合就不会产生如此多新的交互可能性。我喜欢说，在 PostgreSQL 中，“一切皆可兼容”。这就是它的魅力所在，你可以构建这样的案例并期望它们能正常工作。我一点也不想放弃这一点。但这确实给功能开发带来了巨大的代价，每个人都需要意识到这一点。

As a final point, the PostgreSQL development community has been contemplating for some time the possibility of committing features with some kind of “experimental” status and then maturing them in the main tree. This would also be one possibility to address the previous point. This would have been a helpful tool for at least some of the reverted features, but we haven’t yet figured out a way to do this, and some of the work suffered from misunderstandings related to this. This is a concrete point to work on.

最后一点，PostgreSQL 开发社区已经考虑了一段时间，即以某种“实验性”状态提交功能，然后在主干代码中使其成熟。这也可能是解决上述问题的一种可能性。对于至少部分被撤回的功能来说，这本是一个有用的工具，但我们还没有找到实现的方法，而且部分工作也因与此相关的误解而受阻。这是一个需要具体解决的问题。

So what’s next? First of all, from my personal perspective, thank you to everyone who has reached out in person or online to express support and encouragement. That’s the most important thing. I’m confident that many of the reverted features will come back before too long. PostgreSQL 19 will still be a great release. REPACK CONCURRENTLY, logical replication of sequences (itself a previously reverted feature), and planner hinting with pg_plan_advice, just to pick a few headline items, will make th

那么接下来呢？首先，从我个人的角度，感谢每一位通过当面或在线方式表达支持和鼓励的人。这是最重要的。我有信心，许多被撤回的功能在不久之后就会回归。PostgreSQL 19 仍然会是一个出色的版本。REPACK CONCURRENTLY、序列的逻辑复制（这本身也是一个之前被撤回的功能），以及使用 pg_plan_advice 进行规划器提示，仅举几个重点项目，都将使……