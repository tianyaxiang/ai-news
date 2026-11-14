---
title: "Beating the frontier on NetHack"
originalUrl: "https://antithesis.com/blog/2026/nethack/"
date: "2026-11-13T14:34:57.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

### Beating the frontier on NetHack

November 13, 2026 | Paul Ryan, Member of Technical Staff | Mikail Khan, Research intern | Will Wilson, Co-founder and CEO

2026年11月13日 | Paul Ryan，技术人员 | Mikail Khan，研究实习生 | Will Wilson，联合创始人兼首席执行官

**Prologue**
Will Wilson
Co-founder and CEO

**序言**
Will Wilson
联合创始人兼首席执行官

In the beginning, there was NetHack. That’s not quite true for computer game history (though NetHack was very early and very influential), but it’s true for the history of Antithesis. The company started when I got lunch with Dave and said: “let’s make the FDB simulator but for everything” and he was like: “no, let’s make a fuzzer so smart it can beat NetHack,” and then we gradually realized that we were actually talking about the same thing.

起初，有了 NetHack。这在计算机游戏史上并不完全准确（尽管 NetHack 出现得很早且影响深远），但对于 Antithesis 的历史来说却是事实。公司成立时，我和 Dave 一起吃午饭，我说：“让我们做一个适用于一切的 FDB 模拟器吧”，他回答说：“不，让我们做一个能打通 NetHack 的超级智能模糊测试器（fuzzer）”，后来我们逐渐意识到，我们其实在谈论同一件事。

In the years that followed, NetHack continued to inspire and challenge us. The first Antithesis VCS repo (long since deleted) was called “fuzzhack” because it was a fuzzer for NetHack. Before we built our deterministic hypervisor, we tried Hermit-style deterministic Linux userland because it’s the bare minimum you need to beat NetHack. NetHack inspired our thinking about the importance of strategy, about the importance of code coverage and also about its inadequacy, and about why you need intrinsic curiosity rewards to have any hope of applying AI to this problem.

在随后的几年里，NetHack 不断激励并挑战着我们。Antithesis 的第一个 VCS 代码库（早已删除）被称为“fuzzhack”，因为它就是一个针对 NetHack 的模糊测试器。在我们构建确定性虚拟机管理程序之前，我们尝试过 Hermit 风格的确定性 Linux 用户空间，因为这是打通 NetHack 所需的最低限度。NetHack 启发了我们对策略重要性、代码覆盖率重要性及其局限性的思考，也让我们明白了为什么需要内在的好奇心奖励，才能有希望将人工智能应用于这一问题。

NetHack inspired many of our early experiments in visualization. Wanting to interactively explore NetHack performance and coverage maps is why we wrote the first version of the reactive notebook that now powers our UI. Processing reams of NetHack data that wouldn’t fit in memory was why we decided to put a GCP subscription on my credit card so we could crunch the data in BigQuery, which later led us to invent skip trees, and finally Pangolin. All of this is because it was a worthy adversary – perhaps even what my colleague David MacIver likes to call a “dragon problem.”

NetHack 启发了我们许多早期的可视化实验。为了交互式地探索 NetHack 的性能和覆盖率图谱，我们编写了现在驱动我们 UI 的响应式笔记本的第一个版本。为了处理无法放入内存的海量 NetHack 数据，我们决定用我的信用卡订阅 GCP，以便在 BigQuery 中处理数据，这后来促使我们发明了跳跃树（skip trees），并最终发明了 Pangolin。这一切都是因为它是一个值得尊敬的对手——甚至可能是我同事 David MacIver 所说的“龙级难题”。

NetHack is famously difficult for human beings because it combines permadeath, extreme information scarcity (reading the source code of the game to figure out how to beat it is practically a rite of passage for aficionados), and a brutal intolerance for error. But it’s also very difficult for autonomous systems like fuzzers and AI agents due to its sprawling state space and to the need for long-horizon planning to make any real progress.

NetHack 对人类来说极其困难，因为它结合了永久死亡机制、极度的信息匮乏（阅读游戏源代码来找出通关方法几乎是爱好者的必经之路），以及对错误的残酷零容忍。但对于模糊测试器和 AI 智能体等自主系统来说，它同样非常困难，因为其状态空间极其庞大，且需要长期的规划才能取得实质性进展。

People have written bots that have successfully beaten the game, but despite Meta’s investment in the NetHack Learning Environment, AI agents have struggled with it. The wins that both the hardcoded bots and the AIs (most recently GPT-6 Astra) have eked out have been skin-of-their-teeth affairs involving lucky seeds and “beginner-friendly” roles. Nobody has produced a system that can reliably and quickly beat the game over and over again as any character build. “Beginner-friendly” by NetHack standards, at least. Until now.

人们编写过成功通关的机器人，但尽管 Meta 在 NetHack 学习环境上投入了大量资金，AI 智能体在处理它时依然举步维艰。无论是硬编码机器人还是 AI（最近的是 GPT-6 Astra）所取得的胜利，都是在幸运种子和“新手友好”角色的加持下勉强实现的。至今还没有人开发出一套系统，能够可靠且快速地以任何角色配置反复通关。至少在 NetHack 的标准下是“新手友好”的。直到现在。

Antithesis can now find a path to victory within 5 wall-clock minutes on nearly 80% of NetHack seeds. Moreover, the median time to victory within the seeds that finish is under 2 minutes. To explain how we did this, we need to let you in on a secret: Antithesis is not just a system for unopinionated state space exploration, it is also something akin to a probabilistic programming language, a new computing paradigm for partially describing tests or other tasks and letting search and optimization fill in the rest. When you put this tool in the hands of capable AI agents, they can do things like beat NetHack in 30 seconds. But first… back to our story.

Antithesis 现在可以在近 80% 的 NetHack 种子中，在 5 分钟的挂钟时间内找到通关路径。此外，在能够通关的种子中，中位通关时间不到 2 分钟。为了解释我们是如何做到的，我们需要告诉你一个秘密：Antithesis 不仅仅是一个用于无偏见状态空间探索的系统，它还类似于一种概率编程语言，这是一种新的计算范式，用于部分描述测试或其他任务，并让搜索和优化来完成其余部分。当你把这个工具交给强大的 AI 智能体时，它们就能在 30 秒内打通 NetHack。但首先……回到我们的故事。

**Act I: Learning to hold the tool**
**Prior art: bots and black puddings**
Paul Ryan
Member of Technical Staff

**第一幕：学习掌握工具**
**现有技术：机器人与黑布丁**
Paul Ryan
技术人员

“The game is considered one of the hardest games in the world, with winning episodes lasting hundreds of thousands of steps, and a permadeath setting that starts agents at the beginning in a whole new world if they die in the dungeon. – Insights from the NeurIPS 2021 NetHack Challenge, Hambro et al.”

“该游戏被认为是世界上最难的游戏之一，获胜的对局通常持续数十万步，且设有永久死亡机制，如果智能体在地下城中死亡，就必须从头开始进入一个全新的世界。——摘自 NeurIPS 2021 NetHack 挑战赛，Hambro 等人。”

The overall goal of NetHack is straightforward to state, if not to achieve. You begin on the top floor of a dungeon; your objective, the Amulet of Yendor, is at the bottom, in Moloch’s Sanctum. To beat the game, you must descend to Sanctum, take the Amulet from the High Priest of Moloch, and make your way back to the top. Upon exiting the dungeon with the Amulet in your possession, you are transported to the Elemental Planes; from here, you must travel to the Astral Plane, seek out the high altar of your god, and offer the Amulet there, for which your god will grant you immortality and ascension to demigodhood. (Beating the game is called ascending.)

NetHack 的总体目标陈述起来很简单，尽管实现起来并不容易。你从地下城的顶层开始；你的目标是位于底层的摩洛克圣所（Moloch’s Sanctum）中的延多护身符（Amulet of Yendor）。要通关游戏，你必须下到圣所，从摩洛克大祭司手中夺取护身符，并设法回到顶层。带着护身符离开地下城后，你会被传送到元素位面；从这里，你必须前往星界位面，寻找你神灵的高坛，并将护身符献祭在那里，你的神灵将赐予你永生并让你升华为半神。（通关游戏被称为“飞升”。）

When I started working on fuzzing NetHack in 2020, there was minimal prior art. We were a new company, building new tools and learning in real time how best to hold them, and previous bot ascensions were few. Two, to be precise, both targeting an earlier version of the game. SWAGGINZZZ, an RNG-predicting bot, had speed-ascended a Tourist in 2019 using zero-turn RNG manipulations that were quickly patched out. (This remains the fastest ascension on NAO, a popular NetHack server, in both real time and turn count.)

当我 2020 年开始研究 NetHack 的模糊测试时，几乎没有先例可循。我们是一家新公司，正在构建新工具，并实时学习如何最好地使用它们，而之前的机器人飞升案例寥寥无几。准确地说只有两个，且都针对的是游戏的早期版本。SWAGGINZZZ 是一个 RNG 预测机器人，它在 2019 年利用零回合 RNG 操作快速飞升了一个游客角色，这些操作很快就被修复了。（这仍然是 NAO（一个流行的 NetHack 服务器）上实时和回合数最快的飞升记录。）

BotHack, an earlier (2015) hand-rolled expert system made of about 16,000 lines of Clojure, had ascended a Valkyrie (the easiest role in NetHack and standard beginner recommendation, with strong melee and intrinsic cold resistance and stealth), and later a Samurai and a Knight, using a technique known as pudding farming. In NetHack, there’s a monster called a black pudding, which can divide when hit with iron weapons. When BotHack was written, a black pudding could leave a corpse when slain, which could produce a death drop: a random item on the corpse square that the monster didn’t have while alive – any item, from the weak orcish dagger to the coveted amulet of life saving. Consequently, a player who could hit black puddings for minimal damage could divide and kill them indefinitely, producing effectively unbounded black pudding corpses (which could be sacrificed at an altar to gain favor with the player’s god) and effectively unbounded random items. A player willing to grind through thou

BotHack 是一个更早（2015 年）的手工专家系统，由约 16,000 行 Clojure 代码编写而成。它曾飞升过一个女武神（NetHack 中最简单的角色，也是推荐给新手的标准角色，具有强大的近战能力、内在的寒冷抗性和隐身能力），后来又飞升了武士和骑士，使用的是一种被称为“布丁农场”（pudding farming）的技术。在 NetHack 中，有一种怪物叫黑布丁，当被铁制武器击中时会分裂。在 BotHack 编写时，黑布丁被杀后会留下尸体，这可能会产生“死亡掉落”：即尸体所在格子上会出现一个怪物生前没有的随机物品——任何物品，从弱小的兽人匕首到梦寐以求的生命护身符。因此，一个能以最小伤害击中黑布丁的玩家可以无限期地分裂并杀死它们，从而产生实际上无限的黑布丁尸体（可以在祭坛上献祭以获得神灵的青睐）和实际上无限的随机物品。一个愿意通过数千次操作进行磨练的玩家……