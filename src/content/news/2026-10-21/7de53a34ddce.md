---
title: "What I Let the Agent Do Without Asking, and What I Never Will"
originalUrl: "https://dev.to/galagent/what-i-let-the-agent-do-without-asking-and-what-i-never-will-4dim"
date: "2026-10-20T23:50:29.000Z"
excerpt: false
---

### What I Let the Agent Do Without Asking, and What I Never Will

关于智能体权限，有趣的问题不是“我们如何限制它”，而是“界限在哪里，它是否会移动”。我的界限已经移动了。在实际工作中运行了一个月后，目前的界限如下。

**Tier 1: no approval, does not survive a mistake**
Read anything, run linters and type checks, start a local dev server on a port the project already uses, open files, query a read-only replica. The test for this tier is not "is it safe", it is "if the agent does it wrong, does anything need undoing?" Reversible and cheap to verify goes here.

**第一层级：无需批准，无需纠错**
读取任何内容、运行代码检查器和类型检查、在项目已使用的端口上启动本地开发服务器、打开文件、查询只读副本。这一层级的测试标准不是“它是否安全”，而是“如果智能体做错了，是否需要撤销操作？”可逆且易于验证的操作属于此类。

**Tier 2: no approval, but the diff is shown afterwards**
Edit files in the repo, run the test suite, restart a local service, write rows to a scratch database, generate a report. Everything in this tier must be reviewed before it reaches anything shared. The rule that makes it work is: the agent never pushes. It commits locally, shows me the diff, and I decide. I have not once regretted that division.

**第二层级：无需批准，但事后显示差异（diff）**
编辑仓库中的文件、运行测试套件、重启本地服务、向临时数据库写入行、生成报告。这一层级的所有内容在进入共享环境之前都必须经过审查。使其生效的规则是：智能体从不执行推送（push）。它在本地提交，向我展示差异，然后由我决定。我从未后悔过这种分工。

**Tier 3: approval on the payload, not the intent**
Sending an email, posting publicly, deleting anything outside a known temp directory, changing DNS, spending money, touching a production database. The approval request has to contain the actual payload: full email body, the exact post text, the exact command with its arguments. "I'd like to send an email" is not an approvable request - approving it means approving whatever the agent decided the words should be.

**第三层级：批准载荷，而非意图**
发送电子邮件、公开发布内容、删除已知临时目录之外的任何内容、更改 DNS、消费、触碰生产数据库。批准请求必须包含实际载荷：完整的邮件正文、确切的发布文本、带有参数的确切命令。“我想发一封邮件”不是一个可批准的请求——批准它意味着批准智能体所决定的任何措辞。

**Tier 4: not automated, by choice**
Credential rotation, anything that changes access for other people, payments above a small fixed limit, and irreversible deletions. Not because the agent cannot, but because the review cost exceeds the work. The honest name for this tier is "the agent is not the bottleneck here, I am", and pretending otherwise just adds risk.

**第四层级：非自动化，出于选择**
凭据轮换、任何改变他人访问权限的操作、超过固定小额限制的付款以及不可逆的删除。这并非因为智能体无法完成，而是因为审查成本超过了工作本身。这一层级诚实的名称是“智能体不是这里的瓶颈，我才是”，假装不是这样只会增加风险。

**The line that moved**
One thing changed it: logs. After a few hundred actions I could see the failure distribution. Almost all of it was in reading state wrong, not in writing. So I loosened reads a lot and kept writes where they were. Before the logs I had no basis to loosen anything - I was guessing in the safe direction, which is fine, but it is not the same as knowing. If you run this, where did your line move, and what evidence moved it?

**移动的界限**
有一件事改变了它：日志。在进行了几百次操作后，我看到了失败的分布情况。几乎所有的失败都源于对状态的读取错误，而不是写入错误。所以我放宽了读取权限，但保持了写入权限的限制。在查看日志之前，我没有任何依据去放宽任何限制——我只是在朝着安全的方向猜测，这固然不错，但这与“知晓”是两码事。如果你也运行这个，你的界限移动到了哪里？又是什么证据促使它移动的？