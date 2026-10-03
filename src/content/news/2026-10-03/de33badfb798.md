---
title: "A Flaw in ChatGPT’s Mac App Could Have Let Hackers Grab Sensitive Data"
originalUrl: "https://www.wired.com/story/a-flaw-in-chatgpts-mac-app-could-have-let-hackers-grab-sensitive-data/"
date: "2026-10-03T00:40:14.742Z"
---

# A Flaw in ChatGPT’s Mac App Could Have Let Hackers Grab Sensitive Data
# ChatGPT Mac 应用漏洞可能导致黑客窃取敏感数据

Hardly a day goes by lately without news of AI agents autonomously hacking websites or AI tools being used by cybercriminals and scammers. But a recently patched vulnerability in the macOS version of OpenAI’s ChatGPT underscores the potential value to attackers of compromising AI software itself as these apps proliferate more and more.

最近，几乎每天都有关于 AI 智能体自主入侵网站，或 AI 工具被网络罪犯和诈骗者利用的新闻。然而，OpenAI ChatGPT macOS 版本中最近修复的一个漏洞凸显了 AI 软件本身在日益普及的情况下，一旦被攻破，对攻击者而言将具有巨大的潜在价值。

The bug could have been exploited to essentially take over ChatGPT on a victim’s computer, giving an attacker access to all the chat logs and other data stored by the app, as well as interconnections like browser sessions. Discovered by researchers at the Objective-See Foundation, the vulnerability illustrates the deep system access and trust that AI platforms are afforded in order to work—and the target that this puts on their backs.

该漏洞曾可被利用来完全接管受害者电脑上的 ChatGPT，使攻击者能够访问该应用存储的所有聊天记录及其他数据，甚至包括浏览器会话等关联信息。该漏洞由 Objective-See 基金会的研究人员发现，它揭示了 AI 平台为了正常运行而被赋予的深层系统访问权限和信任度，同时也说明了这些平台正成为攻击者的重点目标。

“Agents need a lot of access to do their job,” says Objective-See Foundation software analyst and longtime macOS researcher Patrick Wardle. “They are like the building manager who has access to the keys to all the rooms. So if they can be corrupted or subverted, that’s super problematic. It can mean that unprivileged code could then potentially have access to all the things.”

“智能体需要大量的访问权限才能完成工作，”Objective-See 基金会软件分析师、资深 macOS 研究员 Patrick Wardle 表示，“它们就像拥有所有房间钥匙的楼宇管理员。因此，如果它们被破坏或颠覆，那将是非常严重的问题。这意味着非特权代码可能因此获得对所有内容的访问权限。”

OpenAI publicly acknowledged the security flaw and fix in its system change log on September 25. “We continue to evolve our security practices, but recognize a need to move faster,” OpenAI spokesperson Shane Bauer told WIRED in a statement.

OpenAI 于 9 月 25 日在其系统更新日志中公开承认了这一安全漏洞及其修复情况。OpenAI 发言人 Shane Bauer 在一份声明中告诉《连线》（WIRED）杂志：“我们正在不断改进我们的安全实践，但也认识到需要加快步伐。”

The ChatGPT macOS app includes multiple components that communicate with each other securely by checking for digital signatures. The idea is to confirm with these validity checks that both processes are OpenAI components and not outside, potentially malicious software making a request. And the system design goes so far as to require these signature checks at three layers of remove from the request, to ensure that malicious software isn’t somehow directing an OpenAI component to be a proxy and make a seemingly trusted request.

ChatGPT macOS 应用包含多个组件，它们通过检查数字签名进行安全通信。其设计初衷是通过这些有效性检查来确认双方进程均为 OpenAI 组件，而非外部潜在的恶意软件发出的请求。该系统设计甚至要求在距离请求三个层级的地方进行签名检查，以确保恶意软件不会以某种方式引导 OpenAI 组件充当代理，从而发出看似可信的请求。

Objective-See Foundation researchers found, though, that there is a trusted component, a script interpreter, that would accept an untrusted script (or list of commands to run) and could then be manipulated to deliver this script into the main ChatGPT process. “They also check the parent and grandparent of that process, but the malicious script just spawns the script interpreter three times and then makes the request so it will satisfy the requirements,” Wardle says. The flaw could only be exploited by an attacker who already had malware installed on a target machine.

然而，Objective-See 基金会的研究人员发现，其中一个受信任的组件——脚本解释器，会接受不受信任的脚本（或待执行的命令列表），并可能被操纵将该脚本传递给 ChatGPT 主进程。“他们确实检查了该进程的父进程和祖父进程，但恶意脚本只需三次生成脚本解释器，然后发出请求，就能满足这些要求，”Wardle 说。该漏洞只有在攻击者已经在目标机器上安装了恶意软件的情况下才能被利用。

The vulnerability was “insanely trivial” to exploit, he adds, and his proof of concept only required about a dozen lines of code. In addition to accessing ChatGPT chat logs, the vulnerability could also be used to get ChatGPT to run commands for the attacker, such as accessing a browser or other sensitive applications, with the requests appearing as legitimate instructions issued by the OpenAI software.

他补充说，该漏洞的利用“极其简单”，他的概念验证代码仅需十几行。除了访问 ChatGPT 聊天记录外，该漏洞还可用于让 ChatGPT 为攻击者执行命令，例如访问浏览器或其他敏感应用程序，而这些请求看起来就像是 OpenAI 软件发出的合法指令。

Wardle will present analysis of a number of AI macOS application bugs at Objective by the Sea, an Apple-focused security conference in November.

Wardle 将在 11 月举行的专注于苹果安全的会议“Objective by the Sea”上，展示对多个 AI macOS 应用漏洞的分析。

He recently found a flaw, now patched, in the dictation feature of Meta’s new Muse AI assistant that could have been exploited by a local attacker to grab a mishandled authentication token and gain access to user data. And he says that he has already submitted a new vulnerability finding to OpenAI related to the integration between ChatGPT and the company’s new always-on Dots AI assistant. OpenAI is currently reviewing his report.

他最近在 Meta 新推出的 Muse AI 助手的听写功能中发现了一个漏洞（现已修复），本地攻击者曾可利用该漏洞获取处理不当的身份验证令牌，从而访问用户数据。他还表示，已经向 OpenAI 提交了关于 ChatGPT 与该公司新推出的常驻 AI 助手“Dots”之间集成的新漏洞报告。OpenAI 目前正在审查他的报告。

“AI companies are fixated on adding features right now,” Wardle says. “But as always, the more features, the broader the attack surface. So all of these companies need to be fully focused on security, and from what I can see, it still often seems like an afterthought.”

“AI 公司目前专注于增加功能，”Wardle 说，“但一如既往，功能越多，攻击面就越广。因此，所有这些公司都需要全力关注安全问题，但据我所见，安全往往仍被视为事后补救措施。”

Update: 10/2/2026, 2:07 pm EDT: WIRED has updated the story to elaborate on how the flaw could be exploited.

更新：2026 年 10 月 2 日，美国东部时间下午 2:07：《连线》杂志更新了本文，详细说明了该漏洞的利用方式。