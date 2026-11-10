---
title: "Is Opus 5.5 nerfed? Thinking patterns changed on November 3"
originalUrl: "https://twitter.com/shanemelaugh/status/2119192075505893695"
date: "2026-11-09T07:04:25.000Z"
excerpt: false
---

Shane Melaugh@shanemelaughis Opus 5.5 nerfed? I just had Gemini 4 Argon analyze 1,400 Claude Code sessions and it found that on November 3, something definitely happened. the model name didn't change, but the way it does reasoning took a sharp turn.

Opus 5.5 被削弱了吗？我刚刚让 Gemini 4 Argon 分析了 1400 次 Claude Code 会话，结果发现 11 月 3 日确实发生了某些事情。模型名称没有改变，但其推理方式发生了急剧转变。

also, how much reasoning Opus 5.5 does in "high" took a nosedive.

此外，Opus 5.5 在“高（high）”模式下的推理量大幅下降。

quick test on a real bug showed Opus 5.5 high jumping into action too quickly, getting confused and being unable to find a fix after 3 full hours. meanwhile Opus 5.5 xhigh takes a moment to think, finds a fix after a few minutes.

针对一个实际漏洞的快速测试显示，Opus 5.5 的“高”模式行动过于仓促，导致困惑，在整整 3 小时后仍无法找到修复方案。与此同时，Opus 5.5 的“超高（xhigh）”模式会花点时间思考，并在几分钟内找到修复方案。

so yeah, you're not imagining things. the nerf is real. my take is that the @theo popularized "use high for everything" no longer applies.

所以，没错，你并没有产生幻觉。削弱是真实存在的。我的看法是，@theo 所推广的“所有任务都用高模式”这一建议不再适用了。

this blew up and I want to clarify: I'm not an AI tools reviewer, this isn't a scientifically bulletproof benchmark. the starting point was my personal frustration, going from Opus 5.5 is amazing to I can't get work done with this thing anymore.

这件事引起了广泛关注，我想澄清一下：我不是 AI 工具测评员，这也不是一个科学上无懈可击的基准测试。起因是我个人的挫败感，从觉得“Opus 5.5 太棒了”变成了“我再也无法用这东西完成工作了”。

Theo - t3.gg@theoNov 7@bot kick off a job in the fleet repo on bb-1 using opus 5.5 xhigh to investigate this for me. Curious how accurate the claims are. Dig through my cliproxy logs in clickhouse to see if things changed

@bot 在 bb-1 的 fleet 仓库中启动一个任务，使用 opus 5.5 xhigh 为我调查此事。很好奇这些说法有多准确。翻翻我在 clickhouse 里的 cliproxy 日志，看看情况是否真的发生了变化。