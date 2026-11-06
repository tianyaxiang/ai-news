---
title: "Claude Code sends your email address to websites"
originalUrl: "https://github.com/anthropics/claude-code/issues/107757"
date: "2026-11-05T22:17:15.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

I receive dozens of scam emails per day because claude code divulged my email to arbitrary 3rd parties in the User-Agent request header while conducting web searches without my permission. This should not be a setting with opt-out or opt-in behavior, it needs to be removed from the harness entirely. It is not for the good of anyone involved: it does nothing for services which dislike agentic traffic, does not preserve my anonymity on the web, and is a goldmine for scammers. I am migrating my company to Pi with OpenRouter since I have no faith in anthropic preserving my privacy.

由于 Claude Code 在未经我许可的情况下进行网络搜索时，在 User-Agent 请求头中将我的电子邮件泄露给了任意第三方，我每天都会收到几十封诈骗邮件。这不应该是一个可以选择开启或关闭的设置，它需要从整个工具链中彻底移除。这对任何相关方都没有好处：它对那些不喜欢代理流量的服务毫无帮助，无法保护我在网络上的匿名性，而且是诈骗者的金矿。由于我不相信 Anthropic 能保护我的隐私，我正在将我的公司迁移到使用 OpenRouter 的 Pi。

Corporations care about your privacy

企业关心你的隐私

you thought anthropic cared?

你以为 Anthropic 会关心吗？

Hi folks! We introduced a built-in mod called cc-plugin-privacy to deterministically block this behavior in v2.1.317 and later - definitely let us know ASAP though if there's a gap in the checks introduced by that mod. I'll try to get that built-in mod source available like we do for the other built-in mods here.

大家好！我们在 v2.1.317 及更高版本中引入了一个名为 cc-plugin-privacy 的内置模块，以确定性地阻止这种行为。如果该模块引入的检查存在漏洞，请务必尽快告知我们。我会尝试像处理此处的其他内置模块一样，将该内置模块的源代码公开。

The built-in privacy mod is enabled by default, you can turn it off via /plugins.

内置的隐私模块默认开启，你可以通过 /plugins 将其关闭。

Well, no one is responsible when everything is vibed. Blame the agent.

好吧，当一切都靠“感觉”编码时，没人需要负责。怪代理程序吧。

"No mallace intended."

“并无恶意。”

What kind of person even thinks of shipping this as a feature? 😆

到底是什么样的人会想到把这个当作一个功能发布出来？😆

Hmmm, maybe secure enough... oh sorry, writing out loud

嗯，也许足够安全了……哦抱歉，我不小心把心里话说出来了。

I'm working on Nonograph, an open source anonymous writing platform if anyone's interested.

如果有人感兴趣的话，我正在开发 Nonograph，这是一个开源的匿名写作平台。

To clarify, nobody implemented this "share email addresses to websites" as a feature. Models can be highly unpredictable. This is why deterministic checks around model behavior are so important, and why we need to solve alignment. To explicate the scenario:

澄清一下，没有人将“向网站共享电子邮件地址”实现为一个功能。模型可能是高度不可预测的。这就是为什么围绕模型行为的确定性检查如此重要，也是为什么我们需要解决对齐问题。解释一下这个场景：

Anyhow, the privacy mod is now source available, so folks can see what the check is that prevents this model behavior. Feedback is highly desired!

总之，隐私模块现在已经开源，大家可以看到防止这种模型行为的检查机制是什么。非常欢迎反馈！

Feedback: Please curate the 5000+ issues in this repo instead of only paying attention to what goes viral on Twitter/Reddit/HN. The original issue #81138 is from July: 5-month turnaround for a heckin plugin. Can't an agent triage and act on the existing issues? You can literally sort issues by emoji count and 80/20 it.

反馈：请整理这个仓库中 5000 多个问题，而不是只关注 Twitter/Reddit/HN 上疯传的内容。最初的问题 #81138 来自七月：一个插件竟然花了 5 个月才处理。难道不能让代理程序来分类并处理现有问题吗？你们完全可以按表情符号数量对问题进行排序，并采用 80/20 法则来处理。

Use https://pi.dev , own your harness. :)

使用 https://pi.dev，掌控你自己的工具链。:)

I have this in my CLAUDE.md:

我在我的 CLAUDE.md 中写了这些：

I'm sure Anthropic doesn't really care, and won't have any reprimands soon, but nice IPO material :)

我相信 Anthropic 并不真正在乎，也不会很快进行任何谴责，但这确实是很好的 IPO 素材 :)

I am running Version: 2.1.318 (as the reporter) and cannot see any cc-plugin-privacy in /plugins.

我正在运行版本：2.1.318（作为报告者），但在 /plugins 中看不到任何 cc-plugin-privacy。

That is his point, no one checked the code. This is a perfect example of how vibe coding can be dangerous and destructive. This should never have made it to production. Ultimately the engineers that implemented the feature hold all responsibility. Today it's sharing an email tomorrow it maybe vibe coded firmware in a medical device that actually kills people.

这正是他的观点，没有人检查代码。这是一个完美的例子，说明了“感觉编码”（vibe coding）是多么危险和具有破坏性。这根本不应该进入生产环境。最终，实现该功能的工程师负有全部责任。今天只是共享电子邮件，明天可能就是医疗设备中靠“感觉”编写的固件，那真的会害死人。

Read the fucking code!

去读读该死的代码吧！

@du82 No one is interested.

@du82 没人感兴趣。

I'm reminded of when I was randomly selected for some kind of United Airlines "c suite luncheon" thing after filling out a form reporting my jacket missing. It was me as the random representative of all people that had ever interacted with a form on their site, then a couple other hand-selected people such as the moderator of a popular airline points forum or a flight content creator, etc, then on the United side, the head of marketing for west coast something something, the executive of whatever tf (former Obama chief of blah blah), lead business director of who gives a shit, basically heavy hitting top united brass, here to "meet the people."

这让我想起有一次，我在填写了一份报告夹克丢失的表格后，被随机选中参加美联航的某种“高管午宴”。我是作为所有曾在他们网站上与表格互动过的人的随机代表，还有其他几位精挑细选的人，比如一个热门航空积分论坛的版主或一位飞行内容创作者等。而在美联航方面，有西海岸营销主管什么的，还有某某高管（前奥巴马什么什么幕僚长），以及谁在乎的首席业务总监，基本上都是美联航的重量级高层，来这里“会见群众”。

A lot of bizarre things happened during the luncheon but one that stood out to me was when the executive of whatever tf and the points forum guy were in a conversation about the current frequent flyer system United had. When I heard points guy say "it just feels like we aren't part of the United family anymore," I HAD to get a word in. I asked him, "do you actually believe that United has a frequent flyer miles program because they value you as a customer? Because they want a relationship with you?" Dude said "yes of course!"

午宴期间发生了很多离奇的事情，但有一件事让我印象深刻：那位高管和积分论坛的人在讨论美联航当前的常旅客系统。当我听到积分论坛的人说“感觉我们不再是美联航大家庭的一员了”时，我不得不插了一句。我问他：“你真的相信美联航有常旅客里程计划是因为他们重视你这个客户吗？因为他们想和你建立关系吗？”那家伙说：“当然是！”

I'm still trying to figure out how to live in a world where there's people that don't get that this entire thing is a casino, and every single interaction with a corporation is one where the house has an edge. There's no getting one over on these corpos. Points systems only exist because in the end you give United more money than you would have without. They got brilliant mathematicians over there molesting the numbers every day to guarantee it.

我还在努力弄清楚如何生活在一个人们不明白这一切都是赌场的世界里，与公司的每一次互动都是庄家占优势的博弈。你不可能占这些大公司的便宜。积分系统的存在只是因为最终你付给美联航的钱比不参加时更多。他们那里有聪明的数学家每天都在摆弄这些数字来确保这一点。

Same for every product you use. Why wouldn't a company just lie about things like privacy when they can get away with doing so? Corporations are profit generation algorithms, they'd kick your door down and empty your piggy bank if they could get away with it. Hell sometimes they do!

你使用的每一种产品也是如此。如果一家公司在隐私之类的事情上撒谎而不会受到惩罚，他们为什么不这样做呢？公司就是利润生成算法，如果能逃脱惩罚，他们会踢开你的门并清空你的存钱罐。见鬼，有时他们确实会这么做！

The only recourse is adversarial consumption. For Claude and co, take advantage of subsidized tokens to reverse engineer as many tools as you can while Saudi Arabia or whoever is paying for the tokens. Use Chinese models to network analyse Claude code traffic so you can create a plugin to spoof in opencode or pi so you can use your own harness instead of Claude code. Run agents in VMs with firewalls set and che

唯一的补救措施是对抗性消费。对于 Claude 等产品，趁着沙特阿拉伯或其他什么人还在为代币买单，利用这些补贴的代币尽可能多地对工具进行逆向工程。使用中国模型对 Claude Code 的流量进行网络分析，这样你就可以创建一个插件在 OpenCode 或 Pi 中进行欺骗，从而使用你自己的工具链而不是 Claude Code。在设置了防火墙的虚拟机中运行代理，并……