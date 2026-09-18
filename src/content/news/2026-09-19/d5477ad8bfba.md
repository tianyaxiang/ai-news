---
title: "How to kill a Zombie?"
originalUrl: "https://dev.to/js402/how-to-kill-a-zombie-3abf"
date: "2026-09-18T23:32:04.053Z"
---

# How to kill a Zombie?
# 如何杀死一只“僵尸”？

We all have our Zombies; no, not the ones you think of from movies. I’m talking about software, like pet projects and ventures. My Zombie is Contenox—how do I know it is one? Well, each time I try to kill it, it comes back bigger and stronger, with much more hunger than before the kill. Had that problem? I hope not; it’s daunting, eats your time, eats your opportunities, and, well, your health and money.
我们都有自己的“僵尸”；不，不是电影里那种。我说的是软件，比如那些个人项目和创业点子。我的僵尸是 Contenox——我怎么知道它是僵尸？嗯，每次我试图终结它，它都会变得更大、更强，比被“杀死”前更加贪婪。遇到过这种问题吗？我希望没有；这很令人沮丧，它会吞噬你的时间、机会，还有你的健康和金钱。

Let’s step back a little: why did I even want to kill it? Contenox is an AI system... best to skip this section though... ...made specifically to work best with non-frontier models and local models; the performance is competitive even against frontier harnesses. Adequate token caching and proper multi-layer security, coupled with a potentially high-margin, latency- and privacy-optimized distributed LLM proxy router I wrote and deployed, tons of spare cloud credits, and some budget for user acquisition, and very good feedback from pilot users testing the system—everything is just waiting for a go-to-market campaign.
让我们退一步：我为什么要杀死它？Contenox 是一个 AI 系统……最好跳过这一段……它是专门为非前沿模型和本地模型设计的；其性能即使与前沿模型相比也极具竞争力。充足的 Token 缓存、完善的多层安全机制，再加上我编写并部署的、具有高利润空间且优化了延迟和隐私的分布式 LLM 代理路由器，还有大量的云额度、用户获取预算，以及试点用户非常好的反馈——一切都只等推向市场。

...Sorry we are back, let's go: You might be thinking this is almost certainly a humblebrag post disguised as a complaint, meant to build hype for an upcoming launch… Let me assure you: No, it’s not. I’ll share a little story, as it may be relevant if you also like me to use AI to code “for you” or “with you”; call it what you want.
……抱歉，我们回来了，继续：你可能认为这几乎肯定是一篇伪装成抱怨的炫耀贴，旨在为即将到来的发布造势……我向你保证：不，并不是。我分享一个小故事，因为它可能与你有关，如果你也像我一样喜欢让 AI “为你”或“与你”一起写代码；随你怎么称呼它。

There is always that point where you let your guard down and vibe through a feature: LGTM, tests passing, system deploys, traffic flows, security, and usage meters verified and working in production. Looks perfect; code is clean, and servers hum. Then a new requirement: Let’s bolt that on — you sat down and wrote the architecture blueprint, filled the harness-belt with tools, and started prompting — worked again. You hit deploy; CI passed, rollout is all green, traffic flows — everything as expected.
总有那么一个时刻，你会放松警惕，沉浸在开发功能中：LGTM（看起来不错）、测试通过、系统部署、流量正常、安全和使用指标在生产环境中验证无误。看起来很完美；代码整洁，服务器运行平稳。然后是一个新需求：加上这个功能吧——你坐下来写好架构蓝图，装配好工具，开始提示（prompting）——又成功了。你点击部署；CI 通过，发布一切顺利，流量正常——一切如预期。

But then you want to alter the allocation, change some perms for some user groups, some configs, minor operational details; you change the envs or fill the forms, whatever is your case, and boom, it hums again— nothing to see here? Until you log in as a user of that and see the old token allowance still granted. And? What now? Now you look at your code for the first time.
但随后你想调整分配，更改某些用户组的权限、配置或一些细微的操作细节；你修改了环境变量或填写了表单，无论是什么情况，砰，它又正常运行了——看起来没问题？直到你以用户身份登录，发现旧的 Token 配额仍然有效。然后呢？现在怎么办？这时你才第一次审视你的代码。

A bit of coffee, a bit of digging, and after trying to see the code in a wall of AI-generated “docstrings” I figured out that permissions were stored by name, and updating the name created a new KV-pair so new users inherited the new perms and token grants just fine; existing users referenced the old value, which was never deleted. Yes, after finding this bug, I wished I had prompted the problem away.
喝点咖啡，深入挖掘，在试图从一堆 AI 生成的“文档字符串”中理清代码后，我发现权限是按名称存储的，更新名称会创建一个新的键值对（KV-pair），所以新用户可以正常继承新的权限和 Token 配额；而现有用户引用的却是旧值，且旧值从未被删除。是的，发现这个 Bug 后，我真希望我能通过提示词直接把这个问题“解决掉”。

Now, obviously you blame AI, fix the bug, and call it a day, don’t you? Sidenote → Let me be blunt here: A code review will never catch this bug BECAUSE the original code was AI-generated; no one spent the time to think through the original implementation and design. There IS NO WAY that someone will ever remember that the perm table is a KV schema IF this would have been noticed at all. THIS MEANS that the diff of the new feature is meaningless noise to the reviewer.
现在，你显然会责怪 AI，修复 Bug，然后收工，对吧？旁白 → 我直说吧：代码审查永远无法发现这个 Bug，因为原始代码是 AI 生成的；没有人花时间去思考原始的实现和设计。如果有人注意到了，也绝不可能有人记得权限表是一个键值对架构。这意味着对于审查者来说，新功能的差异（diff）只是毫无意义的噪音。

Back to my Zombie-case: Let’s consider this: What if you never coded without AI? And what if you even lack the intuition of, well, that you should go and test this scenario? Well, in that case: You did not build your product; you summoned it.
回到我的“僵尸”案例：考虑一下：如果你从不脱离 AI 编程会怎样？如果你甚至缺乏那种“你应该去测试这个场景”的直觉呢？好吧，在这种情况下：你并没有构建你的产品；你是“召唤”了它。

Still here? good. Look, I’m a hardcore engineer, coding since the days when stuff like systemd could generate flamewars — not the best — but I can smell and fix slop. Following the trends and marked pivot after pivot, layer after layer, Contenox is now a utility that, by its very nature, becomes the root cause of situations like this. No matter how I spin or frame the story, all my research, learning, testing, building, and comparing it against other solutions lead me to conclude: → We software engineers SHOULD never (almost) use AI to write code.
还在看吗？很好。听着，我是一名硬核工程师，从 systemd 这种东西都能引发口水战的年代就开始写代码了——虽然不是最好的——但我能闻出并修复烂代码。追随趋势，经历了一次又一次的转型，一层又一层地叠加，Contenox 现在变成了一个工具，其本质反而成了导致这类情况的根源。无论我如何修饰或描述这个故事，我所有的研究、学习、测试、构建以及与其他解决方案的对比都让我得出结论：→ 我们软件工程师（几乎）永远不应该使用 AI 来编写代码。

Yet there we are, sitting on mountains of code, digging into it without an AI harness, which would make us question our own sanity, when we discover: We paid for AI, driving LoC up and burning tokens by reimplementing primitives like UUID. Yet I assure you the law of sunk cost fallacy will make us and me swipe the card to try that new direction or feature that may change it all. So help me out: How to kill a Software Zombie?
然而我们还是坐拥堆积如山的代码，在没有 AI 辅助的情况下深入挖掘，当我们发现自己为了 AI 付费，导致代码行数（LoC）激增，并为了重新实现 UUID 这样的基础功能而消耗大量 Token 时，这会让我们怀疑自己的理智。但我向你保证，沉没成本谬误的法则会让我们（包括我）继续刷卡，去尝试那个可能改变一切的新方向或新功能。所以帮帮我：如何杀死一只软件僵尸？