---
title: "Thoughts on the Future of Web Browsers"
originalUrl: "https://sarahjamielewis.com/log/2026/future-of-web-browsers.html"
date: "2026-09-20T23:22:59.926Z"
---

# Thoughts on the Future of Web Browsers
# 关于网页浏览器未来的思考

Back in July, inspired by yet another AI integration into Firefox, I wrote a small thread on Mastodon: If the independent, non-slop web has any future at all, then now must be the time for every Firefox fork to commit to working together to maintain a hard fork isolated from Mozilla.
今年七月，受 Firefox 又一次集成 AI 功能的启发，我在 Mastodon 上写了一段短文：如果独立且非“垃圾内容（slop）”的互联网还有未来，那么现在就是所有 Firefox 分支机构联合起来，维护一个脱离 Mozilla 的硬分叉（hard fork）的最佳时机。

It's a project that is too large to be handled by any small project alone (and maybe even all of them combined), but one that is too important to be left under the guidance of an organization like Mozilla. Without such bold co-operation, I fear we have already lost.
这是一个过于庞大的工程，任何小型项目都无法独立完成（甚至可能所有分支加起来也难以胜任），但它又至关重要，不能任由像 Mozilla 这样的组织来主导。如果没有这种大胆的合作，恐怕我们已经输了。

Mozilla and, by extension, Firefox have laid out the direction they want to go - and have consistently moved in that direction over the last decade. There is no redemption arc there, they are not going to turn the ship around - and every week and month that goes by, Firefox gains more slop and drifts further from the visions that founded it.
Mozilla 以及 Firefox 已经明确了它们的发展方向，并且在过去十年中始终朝着这个方向前进。那里没有救赎之路，它们不会掉头——随着时间的推移，Firefox 每周、每月都在增加更多的“垃圾内容”，并进一步偏离了其创立时的初衷。

Projects like Tor Browser and Waterfox are painstakingly disabling / patching out the worst - but every release becomes more expensive, and things do slip through.
像 Tor Browser 和 Waterfox 这样的项目正在费力地禁用或修补掉最糟糕的部分，但每次发布新版本都变得更加困难，而且总会有漏网之鱼。

In the rest of the thread, I laid out a rough vision for a ridiculously optimistic plan, involving many forks coming together to maintain a base separate from Mozilla, perhaps utilizing the work already being done by Tor Project, or some other fork. That thread, and subsequent conversations, spawned the "base browser" project. An attempt at a place people could gather and discuss ideas / direction.
在后续的讨论中，我提出了一个极其乐观的粗略构想：让多个分支机构联合起来，维护一个独立于 Mozilla 的基础版本，或许可以利用 Tor Project 或其他分支机构已经完成的工作。那段讨论以及随后的对话催生了“base browser”项目，旨在为人们提供一个聚集并讨论想法与方向的平台。

Inspired by some of the momentum, I set out to create a patch that removed all of the AI-integration code from Firefox, which resulted in a ridiculous patch impacting 1605 files changed with 852,297 deletions, totalling 37 megabytes.
受此势头启发，我着手创建了一个补丁，旨在移除 Firefox 中所有的 AI 集成代码。最终产生了一个惊人的补丁：涉及 1605 个文件，删除了 852,297 行代码，总计 37 兆字节。

Over the next few weeks, myself and a small team of volunteers worked on a few more patches, made changes to the giant AI patch, and worked out some scripts to compress the 37Mb down to a reasonable size, just under a megabyte (we did this by using git's existing irreversible-delete flag and some custom python to allow repatching the file). Big thanks to cliffmccarthy and gellge specifically, and to everyone else who contributed to testing/discussing the patches and the project.
在接下来的几周里，我和一小群志愿者又制作了几个补丁，对那个巨大的 AI 补丁进行了修改，并编写了一些脚本，将 37MB 的体积压缩到了不到 1MB 的合理大小（我们利用了 git 现有的不可逆删除标志和一些自定义 Python 脚本来实现文件的重新修补）。特别感谢 cliffmccarthy 和 gellge，以及所有为测试、讨论这些补丁和项目做出贡献的人。

### Current Status
### 当前状态

Today, base browser features a set of patches, based around the current Firefox 153 ESR, that strip user-hostile features completely out of the code base (as opposed to the common soft-fork approach of disabling these).
目前，base browser 包含了一套基于 Firefox 153 ESR 的补丁，将那些对用户不友好的功能从代码库中彻底剥离（这与常见的通过禁用功能来实现的软分叉方法不同）。

I believe that deleting these features entirely is the correct approach for exactly the reasons that make it a pain - these features are large, and increasingly tightly integrated into the core browser. They also account for an increasingly large percentage of the total Firefox code base and quite frankly: I do not believe that these features should be anywhere near the core base of a web browser.
我认为彻底删除这些功能是正确的方法，原因恰恰在于它们带来的痛苦——这些功能体量庞大，且与浏览器核心的集成度越来越紧密。它们在 Firefox 总代码库中所占的比例也越来越大，坦率地说：我不认为这些功能应该出现在网页浏览器的核心基础中。

Now, I am well prepared to lose this battle. I do not believe that there is enough funding, or enough developer effort to maintain something like this long term. Unless we all pool our efforts into making a base like this possible.
现在，我已经做好了输掉这场战斗的准备。我不认为有足够的资金或开发者精力来长期维护这样的项目，除非我们齐心协力，让这样的基础版本成为可能。

This effort has a foundation of shifting sands; Firefox is already moving far beyond simple AI integrations, imagining a future where the entire browser context is a "smart window" built as much for a third-party AI agent as it is for people. I don't want the web to go in that direction and, frankly, I cannot follow.
这项努力建立在流沙之上；Firefox 已经远远超出了简单的 AI 集成，它设想的未来是整个浏览器环境成为一个“智能窗口”，既为第三方 AI 代理而建，也为人类而建。我不希望互联网朝着这个方向发展，坦率地说，我无法追随。

As I have also said, I am not the right person to do something like this, but I at least needed to do something to try and make it happen. If all that comes out of this is a few people learning how to build Firefox from source, I'd consider it a win. If any project ends up using or adopting these patches, I'd be ecstatic.
正如我所说，我并不是做这件事的最佳人选，但我至少需要采取行动去尝试实现它。如果最终的结果只是让几个人学会了如何从源码构建 Firefox，那我就认为这是一次胜利。如果有任何项目最终使用或采纳了这些补丁，我会感到无比兴奋。

### Temporary Actions
### 临时行动

Outside of attempting to patch away the most egregious integrations, I've also been exploring other avenues for reducing my reliance on Firefox:
除了尝试通过补丁移除最过分的集成功能外，我还在探索其他减少对 Firefox 依赖的途径：

*   **Move as much offline as possible:** I've been playing with openzim readers as a way to move some basic web browsing tasks away from the core web browser (openzim files tend to trend towards a minimal subset of HTML/CSS/JS that permits simpler browsers) and there already exists a growing collection of sites that I have moved to reading offline.
    **尽可能多地转向离线：** 我一直在尝试使用 openzim 阅读器，将一些基本的网页浏览任务从核心浏览器中剥离出来（openzim 文件倾向于使用 HTML/CSS/JS 的最小子集，这使得更简单的浏览器也能运行），而且我已经将越来越多的网站转移到离线阅读。

*   **Move to standalone applications where possible:** As someone who spends most of my time on a desktop computer, I much prefer standalone applications to web applications. In the last few months, I've been experimenting more with apps for some of the services I cannot replace with offline readers, e.g., Mastodon. I've not yet found solutions for everything.
    **尽可能转向独立应用程序：** 作为一个大部分时间都在台式机上工作的人，我更喜欢独立应用程序而非 Web 应用。过去几个月里，我一直在尝试为一些无法用离线阅读器替代的服务寻找应用，例如 Mastodon。我还没有找到所有问题的解决方案。

*   **Move to feed readers where possible:** In the same vein as above, feeds provide another way to interact with online systems without needing an entire browser.
    **尽可能转向订阅阅读器（Feed Readers）：** 与上述思路相同，订阅源提供了另一种与在线系统交互的方式，而无需依赖完整的浏览器。

### Doing More than Running Away
### 不仅仅是逃避

But even with all of that, there still exists the problem that these strategies exist to counter the prevailing narrative of "slop-dominance," rather than as an inspirational act in-and-of themselves.
但即便如此，问题依然存在：这些策略只是为了对抗当前“垃圾内容主导”的叙事，而不是本身就具有启发性的行动。

I don't want to spend my efforts, my time, my life, simply fighting to remain in place. The reason I spent my youth with my head buried in programming books and my mind swimming in code was because I wanted to build things that matter, I wanted to understand the world better.
我不想把我的精力、时间和生命仅仅花在原地踏步的抗争上。我之所以在年轻时埋头于编程书籍，让思绪沉浸在代码中，是因为我想构建有意义的东西，我想更好地理解这个世界。

More so, I am convinced that the future cannot arrive by taking the past, grinding it down, and serving it, reheated, as visionless slop.
更重要的是，我坚信未来不可能通过将过去的东西粉碎、重新加热，并作为毫无远见的“垃圾”端上来而实现。

Finding that vision is not without challenge:
寻找那个愿景并非没有挑战：

*   Over the last decade-plus, web standards have become over-saturated to the priority of commercial interests.
    在过去十多年里，Web 标准已经因商业利益的优先考量而过度饱和。
*   To maintain a web browser to any kind of quality assurance and security, you need a well-funded team - or rely on one in your dependency tree.
    要维护一个具备质量保证和安全性的网页浏览器，你需要一个资金充足的团队，或者依赖于你依赖树中的某个团队。
*   Money rarely comes without strings attached and, on every page load, you can feel that tension between the pure philosophical vision and expected returns.
    金钱很少是不带附加条件的，在每次页面加载时，你都能感受到纯粹的哲学愿景与预期回报之间的张力。

But we've been somewhere like this before... There was a time in the early 2000s when Firefox triggered a browser renaissance and there was a lot of excitement about what a "browser" could be... feeds, blogging integration...
但我们曾经经历过类似的情况……在 21 世纪初，Firefox 曾引发了一场浏览器复兴，人们对“浏览器”的可能性感到无比兴奋……订阅源、博客集成……