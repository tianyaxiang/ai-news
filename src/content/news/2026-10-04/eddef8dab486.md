---
title: "The Era of Software Quality, or the Era of Ostriches?"
originalUrl: "https://blogs.gnome.org/mcatanzaro/2026/10/02/the-era-of-software-quality-or-the-era-of-ostriches/"
date: "2026-10-04T00:04:28.388Z"
---

# The Era of Software Quality, or the Era of Ostriches?
# 软件质量时代，还是鸵鸟时代？

The Era of Software Quality, or the Era of Ostriches? October 2, 2026 Fedora, GNOME, Security Humans are bad at writing secure code, and GNOME developers are no exception. GNOME is primarily written using unsafe programming languages where simple mistakes in our code lead to devastating consequences for our users, and we make these mistakes all the time.
软件质量时代，还是鸵鸟时代？2026年10月2日，Fedora, GNOME, 安全。人类不擅长编写安全的代码，GNOME 的开发者也不例外。GNOME 主要使用不安全的编程语言编写，代码中的简单错误往往会导致用户遭受毁灭性的后果，而我们一直在犯这些错误。

No matter how much we try, GNOME developers will fail write secure code when using unsafe languages like C, C++, or Vala: it’s just too hard for even experienced developers to do properly. The above paragraph is taken from the abstracts of my GUADEC 2024 and 2025 talks. At the time, I thought failure was inevitable: we humans were so bad at writing software that we had no chance to do it properly, and I certainly would not have trusted an AI to do better than a human.
无论我们如何努力，GNOME 开发者在使用 C、C++ 或 Vala 等不安全语言时，都无法编写出安全的代码：即使是经验丰富的开发者，想要做到这一点也太难了。以上段落摘自我 2024 年和 2025 年 GUADEC 演讲的摘要。当时，我认为失败是不可避免的：人类在编写软件方面太差劲了，根本没有机会做好，而且我肯定不会相信人工智能会比人类做得更好。

But the landscape today is completely different than last year. AI has improved considerably, and offers a magic fairy wand solution to this problem: we can now simply ask a language model to look for vulnerabilities in our software. They are quite good at this. There is zero hope of maintaining quality software in 2026 without AI vulnerability scanning. Any claims to the contrary are unserious and delusional.
但今天的局面与去年截然不同。人工智能已经有了长足的进步，并为这个问题提供了一个“魔法棒”般的解决方案：我们现在只需让语言模型查找软件中的漏洞即可。它们在这方面非常出色。在 2026 年，如果不使用人工智能漏洞扫描，就不可能维护高质量的软件。任何相反的说法都是不严肃且自欺欺人的。

The tremendous quantity of bugs found in our best-maintained projects, like GLib and fwupd, should speak for itself. Failure to scan our projects is an unfair disservice to our users. If we don’t find the vulnerabilities by scanning projects ourselves, attackers certainly will, because the Linux user base has increased to the point that Linux users are finally numerous enough to be worth targeting.
在我们维护得最好的项目（如 GLib 和 fwupd）中发现的大量漏洞足以说明问题。不扫描我们的项目是对用户的不负责任。如果我们不通过扫描项目来发现漏洞，攻击者肯定会发现，因为 Linux 用户群已经增长到足以成为攻击目标的规模。

Meanwhile, AI has made it easier than ever to build working exploits, which was previously unheard of. Already resolved all the detectable vulnerabilities? Then ask the AI to look for non-security bugs as well, to further improve quality. GNOME code is generally much better than it used to be, but there remains considerable room for improvement. For the first time in history, we now have the opportunity to improve software quality to a degree that was never realistic before.
与此同时，人工智能使得构建可用的漏洞利用程序变得前所未有的简单，这在以前是闻所未闻的。已经解决了所有可检测到的漏洞？那就让 AI 也去查找非安全相关的 Bug，以进一步提高质量。GNOME 的代码总体上比过去好得多，但仍有很大的改进空间。历史上第一次，我们有机会将软件质量提升到以前从未实现过的程度。

Have you heard that most AI bug reports are “slop?” Not so in 2026. That was true for most of 2025, but the quality of AI-generated vulnerability reports has drastically improved. That is not to say that we no longer have problems with bad vulnerability reports, but in general, nowadays most of them are pretty good. (Daniel Stenberg reports the same pattern for curl.)
你是否听说过大多数 AI 提交的 Bug 报告都是“垃圾”？在 2026 年情况并非如此。这在 2025 年的大部分时间里确实如此，但 AI 生成的漏洞报告质量已经大幅提高。这并不是说我们不再有糟糕的漏洞报告问题，但总的来说，现在大多数报告都相当不错。（Daniel Stenberg 在 curl 项目中也报告了同样的模式。）

AI-generated vulnerability reports have nevertheless introduced many undesirable impacts on GNOME maintainers. They are usually annoyingly verbose and unnecessarily detailed. They often exaggerate the severity of the problem, or make misleading or irrelevant claims. They are occasionally incorrect. Sometimes they include outright fabricated data, such as fake stack traces (which is not the norm, but sadly also not uncommon).
尽管如此，AI 生成的漏洞报告还是给 GNOME 维护者带来了许多负面影响。它们通常冗长得令人恼火，且细节多余。它们经常夸大问题的严重性，或做出误导性、不相关的陈述。它们偶尔会出错。有时它们甚至包含完全捏造的数据，例如虚假的堆栈跟踪（虽然这不是常态，但遗憾的是也不罕见）。

A good human reviewer will notice and resolve most of the above problems before creating a bug report on your issue tracker, but often problems are reported by inexperienced humans who do not actually know what they are looking at and simply copy/paste everything blindly. Even when the generated issue report is good and avoids all of the above problems (which is rare), good vulnerability reports in sufficiently high quantity can still overwhelm volunteer maintainers.
优秀的评审人员会在将 Bug 报告提交到你的问题追踪器之前发现并解决上述大部分问题，但通常提交问题的是缺乏经验的人，他们并不真正了解自己在看什么，只是盲目地复制粘贴所有内容。即使生成的报告质量很高且避免了上述所有问题（这种情况很少见），数量庞大的高质量漏洞报告仍然会让志愿者维护者不堪重负。

And even if reporters submit a merge request to resolve the problem so maintainers don’t have to (which is also rare), reviewing those merge requests is itself more unwelcome work for overworked maintainers. That all is to say: I understand the pain caused by the current wave of AI-generated issue reports. Nevertheless, they are essential and unavoidable. We have to learn to accept and deal with them, not stick our heads in the sand and ignore them.
即使报告者提交了合并请求（Merge Request）来解决问题，从而减轻维护者的负担（这种情况也很少见），审查这些合并请求本身对超负荷工作的维护者来说也是一项不受欢迎的工作。总而言之：我理解当前这波 AI 生成的问题报告所带来的痛苦。然而，它们是必不可少且不可避免的。我们必须学会接受并处理它们，而不是像鸵鸟一样把头埋进沙子里视而不见。

Some GNOME maintainers have adopted a policy prohibiting AI-generated content in issue reports. Do not do this. Nowadays, the overwhelming majority of vulnerability reports are AI-generated. Projects that choose to ban AI-generated content in issue reports might as well ban all vulnerability reports; the effect will be approximately the same.
一些 GNOME 维护者采取了禁止在问题报告中使用 AI 生成内容的政策。千万不要这样做。如今，绝大多数漏洞报告都是由 AI 生成的。选择禁止在问题报告中使用 AI 内容的项目，不如直接禁止所有漏洞报告；效果几乎是一样的。

I propose the following: GNOME maintainers should rewrite their AI contribution policies to permit AI-generated vulnerability reports, as I previously requested four months ago. Projects that continue to prohibit AI-generated vulnerability reports are no longer suitable dependencies for GNOME, and should be developed someplace other than GNOME GitLab. We don’t have to tolerate bad issue reports, but AI use alone should not be disqualifying.
我建议如下：GNOME 维护者应重写其 AI 贡献政策，允许 AI 生成的漏洞报告，正如我四个月前所要求的那样。继续禁止 AI 生成漏洞报告的项目不再适合作为 GNOME 的依赖项，应该在 GNOME GitLab 之外的地方进行开发。我们不必容忍糟糕的问题报告，但仅仅因为使用了 AI 就不应成为拒绝的理由。

Shouldn’t humans rewrite AI-generated bug reports? When I complain that maintainers should allow AI-generated vulnerability reports, the most common counterargument is that humans should read the AI’s report, understand it, and rewrite the entire thing to remove all AI-generated content. Some bug reporters actually voluntarily do this, but this is rare.
人类不应该重写 AI 生成的 Bug 报告吗？当我抱怨维护者应该允许 AI 生成的漏洞报告时，最常见的反驳是：人类应该阅读 AI 的报告，理解它，并重写整个报告以删除所有 AI 生成的内容。一些 Bug 报告者确实会自愿这样做，但这很少见。

Vulnerability reporting is a public service, not an obligation. If you ask a reporter to do any amount of extra work, they might be willing to do so, but it’s much more likely that they will either stop looking at your project and move on to something else, or continue looking at your project and publish the vulnerability reports someplace other than your issue tracker.
漏洞报告是一种公共服务，而不是一种义务。如果你要求报告者做任何额外的工作，他们或许愿意配合，但更有可能的是，他们要么停止关注你的项目并转向其他项目，要么继续关注你的项目，但将漏洞报告发布在你的问题追踪器之外的地方。

Rewriting issue reports also does not scale. Let’s say you use AI to find 100 security bugs in a GNOME project, a number consistent with the results of actual scans (read on). Would you really spend months rewriting those bug reports before submitting them to upstream? Validating the AI’s claims, upstreaming the issue reports, and submitting merge requests is already a lot of work. Not many people would be willing to additionally rewrite all the issue reports. That’s more work than everything else combined, and is unrealistic. Even with just a small number of bugs, I would hesitate to spend much time rewriting an issue report.
重写问题报告也无法规模化。假设你使用 AI 在一个 GNOME 项目中发现了 100 个安全漏洞，这个数字与实际扫描结果一致（详见下文）。你真的会花几个月时间重写这些 Bug 报告，然后再提交给上游吗？验证 AI 的声明、向上游提交问题报告以及提交合并请求已经是一项繁重的工作了。没有多少人愿意额外重写所有的 Bug 报告。这比其他所有工作加起来还要多，是不现实的。即使只有少量 Bug，我也会犹豫是否要花大量时间去重写一份问题报告。