---
title: "Why Most Multi-Agent Systems Fail Even When Evaluation Passes"
originalUrl: "https://towardsdatascience.com/why-most-multi-agent-systems-fail-even-when-evaluation-passes/"
date: "2026-09-07T23:41:32.811Z"
---

# Why Most Multi-Agent Systems Fail Even When Evaluation Passes
# 为什么大多数多智能体系统即使通过了评估也会失败

I keep running into some version of this failure wherever agents get chained together, in one shape or another. Take a support-ticket triage system, for example, that is three nodes deep. One classifies the incoming ticket, one pulls the customer's account history from an internal API, and another one drafts the resolution or escalation based on both.
无论智能体以何种形式串联在一起，我总会遇到这种故障。以一个三节点深度的支持工单分类系统为例：第一个节点对传入的工单进行分类，第二个节点从内部 API 拉取客户账户历史记录，第三个节点则基于前两者的信息起草解决方案或升级处理。

Then, it ships. It works well in the demo, which honestly, from my experience, doesn't tell you much. It works for the first few days in production too; again, that tells you slightly more but still not enough.
系统上线了。它在演示中运行良好，但老实说，根据我的经验，这说明不了什么。它在生产环境的前几天也能正常工作；这虽然比演示说明了更多，但依然不够。

Along the line, a complaint comes in about a canceled subscription refund. The account-history node calls the billing API, gets back a 200, and passes the payload downstream as if nothing happened.
随后，出现了一起关于取消订阅退款的投诉。账户历史节点调用了计费 API，收到了 200 状态码，并像什么都没发生一样将负载（payload）传递给了下游。

The payload is empty. No malformed data, no timeout, nothing that would even show up as a 500. Just an empty result set, formatted exactly as a valid response would be, because the account ID got messed up two steps upstream and the billing service quietly returned nothing for an account it couldn't match. The drafting node never sees an error. It sees a well-formed JSON object with no records in it, decides that means "no billing history," and writes a perfectly polite email explaining there's nothing to refund. It goes out, wrong refund decision and all. But still nobody catches it, because nothing about the process ever crashed. As far as the system's concerned, it did its job.
负载是空的。没有格式错误，没有超时，没有任何会显示为 500 错误的东西。它只是一个空的结果集，格式与有效响应完全一致，因为账户 ID 在上游两步时就出错了，而计费服务对于无法匹配的账户默默地返回了空值。起草节点从未看到错误。它看到的是一个格式良好的 JSON 对象，里面没有任何记录，于是判定这意味着“没有账单历史”，并写了一封非常礼貌的邮件解释说没有退款项。邮件发出去了，退款决定也是错的。但仍然没有人发现，因为整个过程中没有任何环节崩溃。在系统看来，它完成了自己的工作。

I don't think this exact scenario needs to have happened to you specifically for it to be worth your time. If you've spent any real stretch of time around multi-agent systems in production, you've either already seen a version of this, or you're going to eventually.
我不认为你必须亲身经历过这种具体场景，它才值得你关注。如果你在生产环境中接触过多智能体系统一段时间，你要么已经见过类似的情况，要么迟早会遇到。

None of this is anecdotal, either. Datadog's 2026 State of AI Engineering report puts production failure rates for AI requests at around 5 percent, and only about 60 percent of that comes from the loud, capacity-driven failures you'd actually notice through an error code. The rest is closer to what happened above, a request that completes and still gets it wrong.
这并非轶事。Datadog 的《2026 年 AI 工程现状报告》显示，AI 请求的生产环境故障率约为 5%，其中只有约 60% 来自那种你会通过错误代码注意到的、明显的容量驱动型故障。其余部分更接近上述情况：请求完成了，但结果却是错的。

### Why nothing catches it
### 为什么没有机制能发现它

Run this pipeline through a standard evaluation suite, and it sails through. The final output reads well, is grammatically clean, and is professionally worded. A human skimming it for tone has no reason to flag anything, not unless they happen to go cross-reference the actual account, which kind of defeats the point of automating the check in the first place. If you score it against a rubric for resolution quality, it probably does well too. Clear, polite, and on topic.
将此流水线放入标准的评估套件中运行，它会顺利通过。最终输出读起来很顺畅，语法清晰，措辞专业。人类在浏览其语气时没有理由标记任何问题，除非他们恰好去交叉核对实际账户，但这在某种程度上违背了自动化检查的初衷。如果你根据解决方案质量的评分标准来打分，它可能也会表现良好：清晰、礼貌且切题。

It passes because each of those checks looks at the same layer: the final text. None of them ask what happened between node two and node three. The account-history node didn't fail loudly; it failed by succeeding at returning the wrong thing, and succeeding is exactly what output-level eval is built to reward.
它之所以能通过，是因为所有这些检查都着眼于同一层：最终文本。没有一个检查会询问节点二和节点三之间发生了什么。账户历史节点并没有发生明显的故障；它通过“成功地返回了错误结果”而失败了，而“成功”正是输出级评估旨在奖励的目标。

This is the part I think is worth sitting with longer than feels natural, before jumping to a fix. Grading only the compiled output makes you structurally blind to intermediate states that look correct but aren't. That's not a gap you patch with a better prompt on the last node. It's a blind spot that comes baked into where you decided to look in the first place.
在急于寻找解决方案之前，我认为这一部分值得你花比平时更多的时间去深思。仅对编译后的输出进行评分，会使你在结构上对那些“看起来正确但实则错误”的中间状态视而不见。这不是通过在最后一个节点优化提示词就能修补的漏洞。这是一个在你决定观察位置时就已根植其中的盲点。

### Grading the UI instead of the application underneath it
### 评估 UI 而非底层的应用程序

There's an old comparison here that I keep coming back to. Nobody ships a compiled application and calls it tested because the login screen renders. You test the layer beneath it, the query that backs the login, the token it issues, and even the permission check it triggers along the way. The UI is the last place a bug shows itself, not the first place you'd think to look for one.
这里有一个我经常回想的老比喻。没有人会因为登录界面能渲染出来，就发布一个编译好的应用程序并称其已经过测试。你会测试它底层的逻辑：支持登录的查询、它颁发的令牌，甚至是它触发的权限检查。UI 是 Bug 最后显现的地方，而不是你首先应该寻找 Bug 的地方。

Most production agent eval right now is UI-only testing bolted onto a system that doesn't even have a UI in the traditional sense. The final text response is the only thing getting graded, mostly because it's the only thing that's easy to grade. You can run it through a rubric, compare it line-by-line against a known-good answer, or have someone skim it over coffee.
目前大多数生产环境的智能体评估，本质上都是在没有传统 UI 的系统上强行进行的“UI 级测试”。最终的文本响应是唯一被评估的对象，主要是因为它最容易评估。你可以用评分标准来衡量它，逐行与已知正确答案进行对比，或者让人在喝咖啡时顺便浏览一下。

The tool calls, the JSON handoffs between nodes, the partial reasoning getting passed forward: none of that gets watched unless something crashes hard enough to leave a trace in a log somewhere.
工具调用、节点间的 JSON 传递、向前传递的部分推理过程：除非发生严重崩溃并在日志中留下痕迹，否则这些内容都不会被监控。

And the expensive failure mode was never the loud one. A 500, a server admitting outright that something broke, gets caught and escalated, because the system already expects that shape of failure and has some plan for it. The one that costs you is the 200, the response that says everything's fine, attached to a payload that's structurally fine and semantically garbage.
代价高昂的故障模式从来不是那种“大声喧哗”的。500 错误（服务器直接承认出错了）会被捕获并升级处理，因为系统已经预料到了这种故障形式并有相应的预案。真正让你付出代价的是 200 状态码——它告诉你一切正常，但附带的负载在结构上是正确的，在语义上却是垃圾。

### An architecture for watching the middle
### 监控中间状态的架构

So the fix isn't another rubric bolted onto the end. It's moving some of the evaluation into the pipeline itself, right at the seams where one agent's output becomes another agent's input.
因此，解决方案不是在末端再加一套评分标准，而是将部分评估工作移入流水线本身，就在一个智能体的输出成为另一个智能体的输入的“接缝”处。

I've been calling this an Intermediate State Eval architecture, mostly because it needed a name and that one stuck. The idea is a lightweight grader sitting between agent nodes, not waiting for the whole chain to finish. In the ticket-triage case we talked about earlier, that's a checkpoint between the account-history node and the drafting node, and its only job is asking whether the handoff looks plausible. Does the account ID in the payload actually match the one that was requested? Does this look like a real lookup result, or like the kind of default value a system quietly falls back to when it can't find what it's looking for?
我将其称为“中间状态评估架构”（Intermediate State Eval architecture），主要是因为它需要一个名字，而这个名字被沿用了下来。其核心思想是让一个轻量级的评估器位于智能体节点之间，而不是等待整个链条运行结束。在我们之前讨论的工单分类案例中，这是一个位于账户历史节点和起草节点之间的检查点，它唯一的任务就是询问：这次交接看起来合理吗？负载中的账户 ID 是否确实与请求的 ID 匹配？这看起来像是真实的查询结果，还是系统在找不到目标时默默回退的默认值？

You don't need a large model doing this judgment call, and honestly I'd argue against it. A small local model serving as a watchdog between nodes, the same basic idea behind using a model to judge another model's output, is enough to catch shape-level and plausibility-level problems.
你不需要一个大型模型来做这种判断，老实说，我反而不建议这样做。一个作为节点间“看门狗”的小型本地模型——这与使用一个模型来评判另一个模型输出的基本思路相同——就足以捕捉结构层面和合理性层面的问题。