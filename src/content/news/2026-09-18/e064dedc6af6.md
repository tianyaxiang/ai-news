---
title: "Be alert: targeted attacks on prominent Rustaceans"
originalUrl: "https://blog.rust-lang.org/2026/09/17/targeted-attacks/"
date: "2026-09-17T23:40:41.000Z"
---

# Be alert: targeted attacks on prominent Rustaceans
# 警惕：针对知名 Rust 开发者的定向攻击

Sept. 17, 2026 · Adam Harvey on behalf of the crates.io team and security response working group
2026年9月17日 · Adam Harvey 代表 crates.io 团队及安全响应工作组

We believe that there is an ongoing campaign targeting rust-lang members and owners of popular crates that is attempting to compromise devices and accounts in order to use them to publish malware.
我们认为，目前正有一场针对 Rust 语言成员及热门 crate（Rust 软件包）所有者的攻击活动。攻击者试图入侵其设备和账户，进而利用这些权限发布恶意软件。

What we've seen: A video call is set up for something positive — maybe for a job, maybe for a project, maybe for a contract opportunity — and then that's used as a vector to either get the target to install something on their computer (such as a purportedly missing audio codec) or execute another command (for example, via putting a command on the clipboard).
我们观察到的情况：攻击者会以积极的名义发起视频通话——可能是为了招聘、项目合作或合同机会——随后将其作为攻击媒介，诱导目标在电脑上安装软件（例如声称缺失的音频编解码器），或执行其他命令（例如通过剪贴板植入命令）。

These attackers are setting up new but legitimate seeming company profiles, including plausible LinkedIn presences, in order to pass cursory inspection.
这些攻击者会建立看似正规的新公司资料，包括伪造可信的 LinkedIn 页面，以通过初步的审查。

A previous attack of this form targeted many prominent Rust developers in June, and, last month, the arrayref crate was briefly compromised through similar attacks. At this moment we do not know if these are all a part of the same campaign. This attack style is known to be used by the DPRK, and has been seen outside of the Rust community as well.
今年 6 月，此类攻击曾针对多位知名 Rust 开发者；上个月，`arrayref` crate 也曾因类似攻击被短暂入侵。目前我们尚不清楚这些事件是否属于同一场攻击行动。这种攻击手法已知与朝鲜（DPRK）有关，且在 Rust 社区之外也曾出现过。

What you can do: Please take extra care in the near term. Be appropriately suspicious of cold outreaches, and ensure that any calls you have with new people are on platforms you trust — ideally, try to be the one who sets up the call on a platform you already use.
你可以做什么：请在近期保持高度警惕。对陌生人的主动联络保持适当的怀疑，并确保与新人的通话是在你信任的平台上进行的——理想情况下，尽量由你自己在常用的平台上发起通话。

Please also re-check that your accounts look normal: MFA enabled, no unexpected logins on platforms that can track that, and so on. If you have any concerns about your accounts, please reach out to help@crates.io (for crates.io account concerns) and/or security@rust-lang.org (for any other concerns). We're very happy to help.
请同时检查你的账户状态是否正常：确认已启用多因素身份验证（MFA），检查可追踪登录记录的平台是否有异常登录等。如果你对自己的账户有任何疑虑，请联系 help@crates.io（针对 crates.io 账户问题）和/或 security@rust-lang.org（针对其他任何问题）。我们非常乐意提供帮助。