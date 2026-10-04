---
title: "Suppressing the email when Jira Automation adds a comment (and why sendNotifications does nothing)"
originalUrl: "https://dev.to/mihai_leanzero/suppressing-the-email-when-jira-automation-adds-a-comment-and-why-sendnotifications-does-nothing-1pc5"
date: "2026-10-04T00:06:05.230Z"
---

# Suppressing the email when Jira Automation adds a comment (and why sendNotifications does nothing)
# 当 Jira 自动化添加评论时如何抑制邮件通知（以及为什么 sendNotifications 参数无效）

**Key takeaways**
**核心要点**

`sendNotifications` is not a parameter of the automation Comment action, so nothing reads it. Your export proves the key is stored; your inbox proves it is not used. The Jira comment REST endpoint ignores unknown keys silently. I posted `sendNotifications`, `notifyUsers` and `totallyMadeUpKey12345` to it and all three returned 201.
`sendNotifications` 并不是自动化“评论”操作（Comment action）的参数，因此没有任何程序会读取它。你的导出文件证明了该键值已被存储，但你的收件箱证明了它并未被使用。Jira 的评论 REST 接口会静默忽略未知的键。我曾向该接口发送过 `sendNotifications`、`notifyUsers` 以及 `totallyMadeUpKey12345`，结果全部返回了 201 状态码。

`notifyUsers` is real — on Edit issue, on Update comment and on the worklog endpoints. The one place it does not exist is ADD comment, which is exactly the operation automation performs. Sending a typed parameter a bad value tells you whether it is declared on that endpoint. It does NOT tell you whether your account may use it — that is a separate permission gate, and a missing permission is ignored silently.
`notifyUsers` 是真实存在的参数，它适用于“编辑问题”、“更新评论”和“工作日志”接口。唯一不支持该参数的地方就是“添加评论”，而这恰恰是自动化规则所执行的操作。向接口发送一个错误的参数值，只能告诉你该参数是否在该接口中被声明，并不能告诉你你的账户是否有权使用它——这是另一个独立的权限门控，而权限缺失通常会被静默忽略。

I verified the REST mechanics on a live Jira Cloud site. I did not verify that the email itself stopped, because no API reports it — treat suppression as documented, not measured.
我在真实的 Jira Cloud 站点上验证了这些 REST 机制。我无法验证邮件是否真的停止发送，因为没有任何 API 会报告这一点——请将“抑制通知”视为一种文档说明，而非可测量的行为。

***

Somebody on the Atlassian Community had done everything right and it still did not work. They exported a Jira Automation rule, hand-added `"sendNotifications": false` to the `jira.issue.comment` action, re-imported it without an error, exported it again to check — the key was still there — and then watched the rule send "Issue Commented" email to every watcher anyway. They were staring down a backfill of about 85,000 work items.
Atlassian 社区里有人做了所有正确的事情，但依然无效。他们导出了一个 Jira 自动化规则，手动将 `"sendNotifications": false` 添加到 `jira.issue.comment` 操作中，重新导入时没有报错，再次导出检查时发现键值依然存在，但随后他们眼睁睁看着规则依然向所有关注者发送了“问题已评论”的邮件。他们当时正面临约 85,000 个工作项的数据回填任务。

That is a good bug report, and the answer is not the one people usually give. The flag does nothing because it is not a parameter of that action. Nothing in the automation engine looks at it. Their export proved the key was stored; their inbox proved it was not read. Those are two different things, and Jira's APIs are unusually willing to let you confuse them.
这是一个很好的错误报告，但答案并非人们通常给出的那样。该标志位之所以无效，是因为它根本不是该操作的参数。自动化引擎中没有任何部分会读取它。他们的导出文件证明了键值被存储了，但他们的收件箱证明了它从未被读取。这是两码事，而 Jira 的 API 却异常地允许你混淆这两者。

Everything below was checked on 2 August 2026 against a live Jira Cloud site. Ticket statuses and vote counts move; I have dated each one so you can tell when this page has gone stale.
以下所有内容均于 2026 年 8 月 2 日在真实的 Jira Cloud 站点上进行了核实。工单状态和投票数会变动；我为每一项都标注了日期，以便你判断本文何时失效。

***

### Check the rule builder before you touch any of this
### 在尝试任何操作前，请先检查规则构建器

Start here, because if it applies to you the rest of this article is unnecessary. AUTO-602's own description opens: "Currently, we can only suppress Email notifications for the *Edit Issue* action performed by automation or Jira."
从这里开始，因为如果这适用于你的情况，那么本文的其余部分就没必要看了。AUTO-602 的描述开头写道：“目前，我们只能抑制由自动化或 Jira 执行的‘编辑问题’操作所触发的邮件通知。”

That sentence implies the automation Edit work item action has an email-suppression control. Historically it did — a "send notifications" checkbox. I could not confirm its current state. Atlassian's automation actions documentation does not list any notification option for either the Edit or the Comment action, and community reports disagree about whether the checkbox still exists in the current rule builder.
这句话暗示了自动化的“编辑工作项”操作具有邮件抑制控制功能。历史上确实有过——一个“发送通知”的复选框。我无法确认其当前状态。Atlassian 的自动化操作文档中没有列出“编辑”或“评论”操作的任何通知选项，社区报告对于当前规则构建器中是否还存在该复选框也各执一词。

So: open your own rule builder, open an Edit work item action, and look. If the control is there, and you can restructure your rule to set a field rather than post a comment, that is the cleanest answer available and it is entirely in-product. If it is not there, or you genuinely need a comment, carry on.
所以：打开你自己的规则构建器，打开一个“编辑工作项”操作，看一看。如果控制选项在那里，并且你可以重构规则以设置字段而不是发布评论，那是目前最简洁的方案，且完全在产品功能范围内。如果那里没有，或者你确实需要评论，请继续往下看。

***

### Why the flag is ignored
### 为什么该标志位被忽略

The automation Comment on work item action exposes the comment text, smart values inside it, and the comment's visibility. Atlassian describes it as "Adds a comment to a work item. You can use smart values to reference work item fields to personalize the comment. You can also set the comment visibility."
自动化的“在工作项上评论”操作暴露了评论文本、其中的智能值以及评论的可见性。Atlassian 将其描述为：“向工作项添加评论。你可以使用智能值引用工作项字段来个性化评论。你还可以设置评论的可见性。”

There is no notification control documented, and no hidden one that anybody has demonstrated. The round-trip fooled everybody because the exported JSON survives re-import untouched. The most likely explanation is that the importer keeps keys it does not recognise and hands the action only the fields the action knows about — I did not reproduce that inside the automation engine, so treat the mechanism as inference.
文档中没有任何通知控制选项，也没有任何人证明存在隐藏的控制选项。这种“往返”过程欺骗了所有人，因为导出的 JSON 在重新导入时保持不变。最可能的解释是，导入器保留了它无法识别的键，但只将操作已知的字段传递给该操作——我没有在自动化引擎内部复现这一过程，所以请将此机制视为一种推断。

What is not inference is the behaviour of the platform underneath it, which I did test, and which does exactly the same thing. Do not conflate this with the comment visibility setting, which is real and documented on the action. Visibility controls who can see the comment — in Jira Service Management, whether it is internal or customer-facing. It is a different axis and it does nothing to Jira notification-scheme email.
并非推断的是其底层平台的行为，我对此进行了测试，它的表现完全一致。不要将其与“评论可见性”设置混淆，后者是真实存在且在操作文档中记录的。可见性控制谁能看到评论——在 Jira Service Management 中，即它是内部可见还是客户可见。这是另一个维度，它对 Jira 通知方案的邮件没有任何影响。

***

### Where notifyUsers actually exists
### notifyUsers 参数实际上存在于何处

`notifyUsers=false` is a genuine Jira Cloud parameter. It appears on Edit issue, on Update comment, and on the three worklog endpoints. The one operation that does not have it is add comment — which is precisely the operation an automation rule performs when it comments. That gap is what JRACLOUD-97682 ("Add notifyUsers=false option to comments API") exists to close.
`notifyUsers=false` 是一个真实的 Jira Cloud 参数。它出现在“编辑问题”、“更新评论”以及三个“工作日志”接口中。唯一没有该参数的操作是“添加评论”——而这恰恰是自动化规则在评论时执行的操作。这个缺口正是 JRACLOUD-97682（“为评论 API 添加 notifyUsers=false 选项”）旨在解决的问题。

Read 2 August 2026: Gathering Interest, Unresolved, 1 vote, 2 watchers, created 4 March 2026. Its Workaround section gives the route round the gap — add the comment as part of an issue edit.
阅读日期 2026 年 8 月 2 日：正在收集关注，未解决，1 票，2 个关注者，创建于 2026 年 3 月 4 日。其“变通方法”（Workaround）部分提供了绕过该缺口的路径——将评论作为问题编辑的一部分来添加。

So "just call the API instead of using automation" is only a fix if you call that endpoint. Posting to `/issue/{key}/comment` gets you nowhere no matter what you attach to it.
因此，“直接调用 API 而不是使用自动化”只有在你调用上述特定接口时才有效。无论你附加什么参数，向 `/issue/{key}/comment` 发送请求都无法解决问题。

AUTO-602 is the ticket to cite for the asymmetry itself. Read 2 August 2026: Gathering Interest, Unresolved, 1,068 votes, 513 watchers, created 29 April 2020. Six years of votes, still a suggestion. Quote it carefully. Its title is scoped to in-product and in-app notifications, but its description asks for "email notifications as well as the Notifications on the instance". People cite it for one and get corrected on the other; the accurate framing is that the title and the description cover different scopes, and the opening sentence is what settles the Edit-versus-everything-else question.
AUTO-602 是引用这种不对称性时应指向的工单。阅读日期 2026 年 8 月 2 日：正在收集关注，未解决，1,068 票，513 个关注者，创建于 2020 年 4 月 29 日。六年的投票，依然只是一个建议。引用时要小心。它的标题范围仅限于产品内和应用内通知，但其描述要求“邮件通知以及实例上的通知”。人们引用它来要求其中一种，却在另一种上被纠正；准确的表述是，标题和描述涵盖了不同的范围，而开头的那句话正是解决“编辑操作与其他操作”区别的关键。