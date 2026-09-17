---
title: "I Trained a Fly’s Brain to Generate WIRED Story Ideas"
originalUrl: "https://www.wired.com/story/i-trained-a-fly-on-wired-story-ideas/"
date: "2026-09-16T23:59:49.711Z"
---

# I Trained a Fly’s Brain to Generate WIRED Story Ideas
# 我训练了一颗果蝇大脑来生成《连线》杂志的报道创意

Meet PitchFly, WIRED’s latest editorial recruit. He has 165,112 neurons, and they’re all trained to generate story ideas. A sampling of his early output: “The Hidden Weather Problem Inside Surveillance”; “The Engineers Who Think Elon Musk Needs Less Computer Security”; and my personal favorite, “Everyone Wants Cooking. Nobody Has Solved Donald Trump.”

来认识一下 PitchFly，《连线》杂志最新的编辑部新成员。他拥有 165,112 个神经元，全部经过训练以生成报道创意。以下是他早期产出的一些样本：“监控背后的隐藏天气问题”；“认为埃隆·马斯克不需要那么多计算机安全的工程师们”；以及我个人最喜欢的一条：“每个人都想要烹饪。但没人能解决唐纳德·特朗普。”

PitchFly uses a detailed map of the brain of a male drosophila—the common fruit fly. Developed by researchers from Google and a number of academic institutions, the map, known as a connectome, captures the way that 166,000 neurons and 125 million connecting synapses fire in response to stimuli. In essence, you can use it to simulate how a fly would respond to lots of stuff—it’s a very simple version of artificial intelligence based on charting real biological intelligence.

PitchFly 使用了一张雄性黑腹果蝇（常见的果蝇）大脑的详细图谱。这张被称为“连接组”（connectome）的图谱由谷歌和多家学术机构的研究人员开发，捕捉了 16.6 万个神经元和 1.25 亿个连接突触在受到刺激时如何放电的过程。本质上，你可以用它来模拟果蝇对各种事物的反应——这是一种基于真实生物智能测绘而成的、非常简单的人工智能版本。

Because the researchers open-sourced it, you can easily use AI to import the connectome into a project with a little prompting. For PitchFly, I vibe coded a project in which the tiny digital drosophila brain generates story ideas. (I’m not sure why the fly has a little hat on, but I like its style.) This involved scraping together hundreds of the most popular story headlines from the site from the past year and feeding them into the connectome. I had Codex do the hard work, and it decided that the most efficient approach was to turn the headlines into words and phrases, then transform them into a representation that a neural network could understand. The connectome was fed the best-performing stories and told to generate its own ideas based on that.

由于研究人员将其开源，你只需简单的提示词，就能轻松利用 AI 将这个连接组导入项目中。对于 PitchFly，我通过“氛围编程”（vibe coding）创建了一个项目，让这个微小的数字果蝇大脑生成报道创意。（我不确定为什么这只果蝇戴着一顶小帽子，但我喜欢它的风格。）这涉及抓取过去一年中网站上数百个最热门的报道标题，并将它们输入到连接组中。我让 Codex 完成了繁重的工作，它决定最有效的方法是将标题转化为单词和短语，然后将其转换为神经网络可以理解的表示形式。连接组被输入了表现最好的报道，并被要求在此基础上生成自己的创意。

In other words, this isn’t a fly-based language model—although someone apparently created one of those. The fly brain has no idea what any of the words mean, or if any of it makes sense. It’s just remixing the patterns it has seen in pleasing new ways. A cynic might suggest this is exactly how some journalists generate their own pitches, but I think that’s a bit unfair—and judging by its lunatic ideas, PitchFly won’t be replacing me anytime soon:

换句话说，这不是一个基于果蝇的语言模型——尽管显然有人已经做过一个了。果蝇大脑根本不知道这些词是什么意思，也不知道这些内容是否有意义。它只是在以令人愉悦的新方式重新组合它所见过的模式。愤世嫉俗者可能会说，这正是某些记者生成报道创意的方式，但我认为这有点不公平——而且从它那些疯狂的创意来看，PitchFly 短时间内还无法取代我：

The Tiny Shift in Agentic AI Is Rewriting the Rules of Food and Drink
代理式 AI 的微小转变正在重写食品和饮料行业的规则
What Security News Is Quietly Doing to Donald Trump
安全新闻正在悄悄对唐纳德·特朗普做什么
The Race to Reinvent Privacy Before Artificial Intelligence Breaks
在人工智能崩溃前重塑隐私的竞赛
Is China About to Make Digital Syndication Obsolete?
中国即将让数字联合出版变得过时吗？

In the future, perhaps I could have the program continue to learn by reading new WIRED headlines. For now, though, this seems like a decent proof of concept, not to mention evidence at last that the average WIRED writer is intellectually superior to a fruit fly.

未来，或许我可以让这个程序通过阅读新的《连线》标题来持续学习。不过就目前而言，这似乎是一个不错的概念验证，更不用说它终于证明了《连线》的普通作者在智力上确实优于果蝇。

After the connectome’s release in early September, dozens of other weird and wonderful projects powered by fruit-fly intelligence sprang up.

在 9 月初连接组发布后，数十个由果蝇智能驱动的奇特而美妙的项目如雨后春笋般涌现。

An X user called Lyra Bubbles, for instance, demo’d a project that involved training the virtual fly brain to play the VR game Beat Saber. Alex Wormuth, a software engineer at Coinbase, created StonkFly, which uses the fly’s tiny brain to decide how to trade stocks. (It’s losing money, but it’s doing surprisingly well, all things considered.)

例如，一位名为 Lyra Bubbles 的 X 用户演示了一个项目，通过训练虚拟果蝇大脑来玩 VR 游戏《节奏光剑》（Beat Saber）。Coinbase 的软件工程师 Alex Wormuth 创建了 StonkFly，利用果蝇的小脑袋来决定如何交易股票。（虽然在亏钱，但考虑到各种因素，它的表现出奇地好。）

“The fly brings lighthearted, humorous relief” at a time when everyone is worried about the existential risks of AI, Wormuth told me in a DM. He says he found playing with the fruit fly connectome philosophically fascinating, too. “It sparks questions about ethics of this and whether there is any consciousness [in the replication of fly’s brain],” he says.

“在每个人都担心 AI 存在风险的时候，这只果蝇带来了一种轻松、幽默的慰藉，”Wormuth 在私信中告诉我。他说，他发现玩弄果蝇连接组在哲学上也很有趣。“它引发了关于伦理的问题，以及（在果蝇大脑的复制品中）是否存在任何意识，”他说。

Others trained the connectome to play Doom, Minecraft, and Pong. Some fly brains apparently learned to solve Rubik’s cubes. And someone also put the fly brain in charge of driving virtual cars—it turns out flies are terrible at parallel parking. (Then again, so am I, so I won’t pass judgment.)

其他人则训练连接组去玩《毁灭战士》、《我的世界》和《乒乓》。一些果蝇大脑显然学会了还原魔方。还有人让果蝇大脑负责驾驶虚拟汽车——事实证明，果蝇在侧方停车方面表现极差。（话又说回来，我也一样，所以我不会评判它。）

I haven’t verified that all these projects actually use the connectome—they may just be fun animations. And some of them—like one that simply involves training the fly to take a well-earned break—seem like spoofs. But there are some serious science projects out there, too, including visualizations for exploring the connectome and tools for manipulating neural circuitry.

我还没有核实所有这些项目是否真的使用了连接组——它们可能只是有趣的动画。其中一些——比如仅仅是训练果蝇去休息一下的项目——看起来像是恶搞。但也有一些严肃的科学项目，包括用于探索连接组的可视化工具，以及用于操纵神经回路的工具。

Mapping different animal brains may help neuroscientists decipher the biological foundations of intelligence. It isn’t possible—yet—to map all 86 billion neurons in a human brain, but peering into the brains of smaller creatures can provide useful insights. Neuroscientists can also test theories about how damage affects neuronal wiring—and how such damage might someday be repaired—by messing with the fly’s connectome.

绘制不同动物的大脑图谱可能有助于神经科学家破译智能的生物学基础。目前还无法绘制出人脑中全部 860 亿个神经元的图谱，但深入观察小型生物的大脑可以提供有用的见解。神经科学家还可以通过干扰果蝇的连接组，来测试关于损伤如何影响神经连接的理论，以及未来如何修复此类损伤。

As far as AI is concerned, all this fruit-fly frivolity also shows how easy it is now to train and deploy your own model. The best use for the giant LLMs run by big AI companies may be building specialized AI models for specific tasks (something I’ve written about previously). Sometimes even a tiny brain can do quite well.

就人工智能而言，所有这些关于果蝇的“胡闹”也表明，现在训练和部署自己的模型是多么容易。大型 AI 公司运行的巨型大语言模型（LLM），其最佳用途可能是为特定任务构建专业化的 AI 模型（我之前写过相关内容）。有时，即使是一个微小的大脑也能表现得相当出色。

This is an edition of Will Knight’s AI Lab newsletter. Read previous newsletters here.

这是 Will Knight 的 AI 实验室通讯。点击此处阅读往期通讯。