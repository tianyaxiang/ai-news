---
title: "Hackers are stealing Claude tokens from subscribers"
originalUrl: "https://techcrunch.com/2026/09/08/hackers-are-stealing-claude-tokens-from-subscribers/"
date: "2026-09-08T23:28:07.428Z"
---

# Hackers are stealing Claude tokens from subscribers
# 黑客正在窃取 Claude 订阅用户的额度（Token）

On August 4, Grant De Swardt, an independent AI consultant in East Sussex, U.K., noticed something strange going on with his Claude Max 20x account. He hadn’t been working that day, yet his token usage was climbing.
8月4日，英国东萨塞克斯郡的独立人工智能顾问 Grant De Swardt 注意到他的 Claude Max 20x 账户出现了一些异常。那天他并没有工作，但他的额度（Token）使用量却在不断攀升。

The next day, he disabled everything he had attached to Claude and did not work with it. Token consumption again increased. “In the clearest controlled interval, it increased from 45% to 55% while I performed no work, scheduled Cowork tasks were paused or completed, Dispatch/cloud execution was disabled, and there was no corresponding active local Claude Code task,” De Swardt told TechCrunch.
第二天，他禁用了所有连接到 Claude 的服务，并停止了相关工作，但额度消耗量依然在增加。De Swardt 在接受 TechCrunch 采访时表示：“在最明确的受控测试期间，即便我没有进行任何工作，且预定的 Cowork 任务已暂停或完成、Dispatch/云端执行已禁用，也没有对应的本地 Claude Code 任务在运行，额度使用率还是从 45% 涨到了 55%。”

What was eating up his token allowance? He had no idea, so he contacted Anthropic and asked for an itemized list. Anthropic didn’t provide one, but it agreed something was off. It suspended his paid account, invalidated all of his sessions and server-side Claude Code tokens, and issued him a partial refund of £44.49 for the remaining time on his $200-per-month subscription.
究竟是什么在消耗他的额度？他毫无头绪，于是联系了 Anthropic 并要求提供详细的使用清单。Anthropic 虽然没能提供清单，但承认确实存在异常。公司随后暂停了他的付费账户，作废了他所有的会话及服务器端 Claude Code 令牌，并针对他每月 200 美元的订阅费用中剩余的时间，向他退还了 44.49 英镑。

The suspension wreaked havok on his business, he told TechCrunch. His job is to help small and mid-size businesses set up agents — a sort of forward-deployed engineer for hire — for tasks like automatically loading purchase-order data from emails into the accounting software. As a sole proprietor, he relies on agents throughout his whole business, too: daily admin tasks, website design, coding. “Like everything is just running through AI these days,” he said.
他告诉 TechCrunch，这次封号对他的业务造成了严重破坏。他的工作是帮助中小型企业设置智能体（Agent）——类似于外包的“前线工程师”——来处理诸如将电子邮件中的采购订单数据自动录入会计软件等任务。作为个体经营者，他的整个业务也都依赖于这些智能体：日常行政任务、网站设计、编程等。他说：“如今几乎所有事情都在通过 AI 运行。”

After investigating, Anthropic told De Swardt it found the culprit: A compromised Claude session key was used to mint unauthorized Claude Code OAuth tokens. The company told him the account “appeared to have been used by an unauthorized-looking third-party service to handle activity for other people, but they could not determine how it obtained access,” he told TechCrunch. “They say the evidence is consistent either with credentials/session data being taken without my knowledge, or with the account having been connected to an outside service.”
经过调查，Anthropic 告知 De Swardt 他们找到了罪魁祸首：一个被泄露的 Claude 会话密钥被用于生成未经授权的 Claude Code OAuth 令牌。他告诉 TechCrunch，公司称该账户“似乎被一个未经授权的第三方服务用于处理他人的活动，但他们无法确定对方是如何获得访问权限的”。他说：“他们表示，证据表明要么是我的凭据/会话数据在不知情的情况下被窃取，要么是账户曾连接过外部服务。”

In other words, a hacker was able to obtain access to De Swardt’s account and was covertly siphoning off his tokens. Because account support tracks total usage but not itemized usage, even upon request, this kind of theft could have gone on for months undetected.
换句话说，黑客获取了 De Swardt 的账户访问权限，并正在秘密窃取他的额度。由于账户支持系统只追踪总使用量，而不提供详细的使用清单（即使在用户要求时也是如此），这种盗窃行为可能在数月内都不会被发现。

He posted his experience on Reddit and after 80 comments, he discovered he was not alone. One person claimed that their account “was auto-upgraded without my consent, my credit card got charged, and the usage shot from 0% to 100% automatically without me even touching it.” Another saw usage go from 0 to 49% in 12 minutes, when all they had used it for was a couple of prompts and a web search.
他在 Reddit 上发布了自己的经历，在收到 80 条评论后，他发现自己并不孤单。有人声称他们的账户“在未经同意的情况下被自动升级，信用卡被扣款，且在使用量上，我甚至没碰过它，就自动从 0% 飙升到了 100%”。另一个人则表示，他们仅仅用了几次提示词和一次网页搜索，额度就在 12 分钟内从 0 涨到了 49%。

One Claude user said their account burned through its max tokens every day for three days without them using it at all; this person then created a GitHub report about it. Like with the Reddit post, other users shared similar experiences there, too. Two of them posted emails from Anthropic where the company had — to its credit — identified and warned them that their tokens were being stolen.
一位 Claude 用户称，他们的账户在完全没使用的情况下，连续三天每天都耗尽了额度上限；此人随后在 GitHub 上创建了一个相关报告。和 Reddit 帖子一样，其他用户也在那里分享了类似的经历。其中两人贴出了来自 Anthropic 的邮件，邮件显示该公司确实识别并警告了他们，告知其额度正在被窃取。

“We have recently become aware of a bad actor that is using common infostealer malware to steal Claude login sessions from people’s computers, then using those login sessions to access Claude accounts and consume their usage,” the email read. Infostealers are a type of malware that installs itself on a user’s computer and steals saved passwords, session data, and login credentials.
邮件中写道：“我们最近发现有不法分子利用常见的信息窃取恶意软件（infostealer malware）从用户的电脑中窃取 Claude 登录会话，然后利用这些会话访问 Claude 账户并消耗其额度。”信息窃取软件是一种安装在用户电脑上，专门窃取已保存密码、会话数据和登录凭据的恶意程序。

When Anthropic saw suspicious activity, it signed the users out, invalidated existing authorizations, issued some refunds, and warned them that they may have malware. The company also said the malware didn’t come from using Claude itself. Such malware can be picked up from many sources online, from downloading infected software to clicking on infected ads.
当 Anthropic 发现可疑活动时，会强制用户登出、作废现有授权、发放部分退款，并警告用户电脑可能感染了恶意软件。该公司还表示，这些恶意软件并非源自 Claude 本身。此类恶意软件可能通过多种在线渠道感染，例如下载受感染的软件或点击受感染的广告。

Anthropic did not send De Swardt one of those emails. He insists he found no evidence that his computer was compromised and says he still has no way of determining how hackers gained access. De Swardt’s Claude account was reinstated after about two weeks. But the difficulty of getting speedy help for the matter, plus the lack of an itemized usage, soured him on Claude.
Anthropic 并没有给 De Swardt 发送过此类邮件。他坚称自己没有发现电脑被入侵的证据，并表示至今无法确定黑客是如何获得访问权限的。De Swardt 的 Claude 账户在大约两周后被恢复。但处理此事的响应速度缓慢，加上缺乏详细的使用清单，让他对 Claude 感到失望。

He cancelled his subscription in favor of Cursor and its ability to use multiple models, including more affordable open source options. In his experience, these other models work as well as Claude. “It’s not that much different or better,” he said, adding that he can’t see going back “without [Anthropic] actually having resolved the issue in any way.”
他取消了订阅，转而使用 Cursor，因为它支持多种模型，包括更实惠的开源选项。根据他的经验，这些模型的效果与 Claude 不相上下。“并没有太大的区别或优势，”他说，并补充道，除非 Anthropic 能以某种方式真正解决这个问题，否则他不会考虑回归。

He says Anthropic still lacks tools that allow users to see what’s consuming their tokens. “I don’t think there’s any way that these people can protect themselves.” When asked for information on how users can identify misuse, Anthropic declined to comment.
他表示，Anthropic 仍然缺乏让用户查看额度消耗详情的工具。“我认为用户目前根本无法保护自己。”当被问及用户如何识别滥用行为时，Anthropic 拒绝置评。