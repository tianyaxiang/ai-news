---
title: "I have a theory that software drives people insane"
originalUrl: "https://graybeard.ing/software-drives-people-insane/"
date: "2026-09-10T23:15:05.056Z"
---

# I have a theory that software drives people insane
# 我有一个理论：软件正在让人发疯

I have a little pet theory that software drives people insane. Not in the "wash your hands every thirty minutes like Howard Hughes" kind of way, but more so in how the conditions surrounding software seem remarkably effective at making otherwise normal people lose their sense of proportion. I've watched this happen enough times from enough angles that I don't think it's entirely a personality problem.
我有一个小小的个人理论：软件正在让人发疯。这并不是指那种“像霍华德·休斯一样每三十分钟洗一次手”的疯狂，而是指围绕软件的各种环境条件，似乎非常有效地让原本正常的人失去了分寸感。我从不同的角度观察过足够多次这种情况，所以我认为这不仅仅是个人的性格问题。

Software combines speed, money, complexity, abstraction, and almost unlimited freedom to change your mind. On their own, those things are perfectly manageable, but put them together and you start to get some really bizarre side-effects. Most software, when you strip away the branding and architecture diagrams, is remarkably boring. A form here, an API endpoint there, sprinkle in some permissions, calculations, workflows, and a database somewhere. Maybe a queue if you need to scale something (or you're feeling adventurous). But, harsh as it may be: most software is still just a glorified spreadsheet.
软件结合了速度、金钱、复杂性、抽象化以及几乎无限的“改变主意”的自由。单独来看，这些因素都是完全可控的，但将它们放在一起，你就会开始看到一些非常离奇的副作用。剥去品牌包装和架构图，大多数软件其实非常无聊。这里一个表单，那里一个 API 接口，再撒上一些权限、计算、工作流和一个数据库。如果需要扩展（或者你觉得想冒险一下），可能还会加个队列。但残酷的事实是：大多数软件本质上只是一个高级版的电子表格。

And yet somehow the process of producing this stuff can turn perfectly ordinary adults into b-tier Bond villains. The project is never moving fast enough, the plan has to be ever-flexible to sudden change, and every new feature is the one that's going to be the one (but certainly not that one that was supposed to be the one during the previous sprint). There is always some new concern about whether it will work, whether it will scale, whether we're moving fast enough, or whether we should be doing something else entirely.
然而，生产这些东西的过程却能把完全普通的成年人变成二流的邦德反派。项目进度永远不够快，计划必须随时灵活应对突变，每一个新功能都被视为“那个关键功能”（当然，肯定不是上一个冲刺周期里被寄予厚望的那个）。人们总是担心它是否能运行、是否能扩展、进度是否够快，或者我们是否应该完全去做别的事情。

The weird thing about software is that many of these ideas are technically possible. That's part of the problem: there's very little natural friction between an idea and its implementation. If you're building a house and somebody decides halfway through framing that the kitchen should be on the opposite side of the building, everyone immediately understands that decision has a cost. Boards have been cut, plumbing has been run, and people to tear already-fixed things apart. The cost is physical enough that nobody can pretend it doesn't exist.
软件最奇怪的地方在于，其中许多想法在技术上都是可行的。这正是问题的一部分：从想法到实现之间几乎没有任何天然的阻力。如果你在盖房子，有人在框架搭到一半时决定把厨房移到建筑的另一侧，每个人都会立刻明白这个决定是有代价的。木板已经切割，管道已经铺设，人们必须拆除已经固定好的东西。这种代价是物理层面的，没人能假装它不存在。

With software, that cost hides inside people's heads and inside systems that are, typically, already difficult to reason about. Moving the kitchen in software might look like a "simple fix." The work is still costly, but the actual expense accumulates quietly. Somewhere between context switching, regression risk, and architectural erosion we find lost momentum, forgotten assumptions, and endless meetings to "get aligned." No matter the actual complexity, it's easy to pretend the change was free (as in beer) because there isn't any visible dust or scraps.
而在软件领域，这种代价隐藏在人们的脑海中，以及那些通常已经难以理解的系统中。在软件里移动“厨房”看起来可能只是一个“简单的修复”。工作依然昂贵，但实际的成本是在悄无声息中累积的。在上下文切换、回归风险和架构侵蚀之间，我们失去了动力，遗忘了假设，并陷入了无休止的“对齐”会议中。无论实际复杂程度如何，人们很容易假装这种改变是免费的，因为没有任何可见的灰尘或废料。

The problem is made worse by the fact that changing software really can be cheap...sometimes. A useful adjustment might genuinely take an hour, while another equally simple-looking request can ripple through an entire system causing failures. That opaqueness creates a dangerous habit where every "cool idea" that's "super quick" gets added to the roadmap, often with urgency. Someone has an idea in a meeting and there is often very little resistance between the idea and reality.
更糟糕的是，改变软件有时确实很便宜。一个有用的调整可能真的只需要一小时，而另一个看起来同样简单的请求却可能引发整个系统的连锁故障。这种不透明性养成了一种危险的习惯：每一个“超级快”的“酷点子”都会被加入路线图，而且往往带有紧迫感。会议中有人提出了一个想法，而从想法到现实之间往往几乎没有阻力。

Could we make this screen work differently? Could we change the business model, chase another customer segment, introduce another workflow, or build our own event system? The answer is almost always some variation of "sure, we could." Eventually, "could" becomes "should," and "should" becomes "why isn't it done yet?"
我们能让这个界面换种方式工作吗？我们能改变商业模式、追逐另一个客户群体、引入另一个工作流，或者构建我们自己的事件系统吗？答案几乎总是“当然可以”的某种变体。最终，“可以”变成了“应该”，而“应该”又变成了“为什么还没做完？”

This is where software starts doing something strange to people's brains. Everything becomes urgent because everything can move quickly, and every decision starts feeling strategic because the theoretical upside can be enormous. Every technical choice also becomes ideological because there are dozens of plausible ways to solve the same problem. Every slowdown begins to look like a crisis because somewhere, somebody else is (supposedly) moving faster.
这就是软件开始对人们大脑产生奇怪影响的地方。一切都变得紧迫，因为一切都可以快速变动；每一个决定都开始显得具有战略意义，因为理论上的收益可能巨大。每一个技术选择也变得具有意识形态色彩，因为解决同一个问题有几十种看似合理的方法。每一次减速都开始看起来像是一场危机，因为在某个地方，别人（据称）正在跑得更快。

The industry has very few natural mechanisms that tell people when enough is enough. There isn't really an obvious definition of "done" in software. A carpenter eventually puts down the hammer because the cabinet exists, but software can always be improved. The button could be better, the query could be faster, the abstractions could be cleaner, the onboarding could convert more people, and the infrastructure could scale further. The product could expand into an adjacent market, the pricing could change, or the entire company could decide it has discovered a more lucrative direction.
这个行业几乎没有什么天然的机制来告诉人们什么时候该适可而止。在软件领域，并没有一个明显的“完成”定义。木匠最终会放下锤子，因为柜子已经做好了，但软件总是可以改进的。按钮可以更好，查询可以更快，抽象可以更简洁，引导流程可以转化更多用户，基础设施可以进一步扩展。产品可以扩展到相邻市场，定价可以改变，或者整个公司可能决定它发现了一个更有利可图的方向。

The point: if you want there to be, there's always another lever within reach. I think this is one reason software organizations become so neurotic: they are surrounded by levers, and people who are surrounded by levers eventually start pulling them. Sometimes they pull them because something is genuinely wrong. Other times they pull them because they're scared, because the board wants growth, because a competitor shipped something, because the numbers were flat this month, or because nobody knows what else to do.
重点是：如果你想的话，总有另一个杠杆触手可及。我认为这就是软件组织变得如此神经质的原因之一：他们被杠杆包围了，而周围全是杠杆的人最终会开始拉动它们。有时他们拉动是因为确实出了问题。而另一些时候，他们拉动是因为恐惧，因为董事会想要增长，因为竞争对手发布了新功能，因为这个月的业绩平平，或者因为没人知道还能做什么。

A founder changing direction every few days gets mythologized as "responding to the market." A manager constantly pressuring people to move faster is considered execution focused, while an engineer introducing several new infrastructure components may be praised for thinking about scale. A product team rebuilding a working interface because conversion dropped slightly is iterating, and a company abandoning its original identity because another category is suddenly fashionable is pivoting.
一个每隔几天就改变方向的创始人被神话为“响应市场”。一个不断施压要求加快进度的主管被认为是“执行力强”，而一个引入多个新基础设施组件的工程师可能会因“考虑扩展性”而受到赞扬。一个因为转化率略微下降就重构可用界面的产品团队是在“迭代”，而一家因为另一个类别突然流行就放弃原有身份的公司则是在“转型”。

Some of this language exists because the underlying motivation is legitimate. There are times when you should move quickly, times when you should pivot, and times when the architecture really does need to change. What makes software dangerous is how easy it is to confuse the existence of a take-able action with the need to actually take it.
这些术语中有些是合理的，因为其背后的动机是正当的。确实有需要快速行动的时候，有需要转型的时候，也有架构确实需要改变的时候。软件之所以危险，是因为人们太容易把“可以采取行动”与“必须采取行动”混为一谈。