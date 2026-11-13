---
title: "SCKit: ScreenConnect Panels Abused via Blank RMM+ Access Keys to Deploy Rogue Clients and Cookie Relays to 288 Endpoints"
originalUrl: "https://dev.to/anoymask/sckit-screenconnect-panels-abused-via-blank-rmm-access-keys-to-deploy-rogue-clients-and-cookie-b57"
date: "2026-11-13T01:53:01.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

### 1. Basic Information
Article: SCKit Worm Installs Rogue ScreenConnect Clients and Session Cookie Relays Across Hundreds of Endpoints
Source: Huntress
Published: 2026-11-11
Original: Huntress
Updated: 2026-11-11T23:34:00-05:00
Response Priority (Author's Assessment): Critical
Rationale for Response Priority: A toolkit with SYSTEM privileges was deployed to 288 endpoints across 48 organizations in 90 minutes, providing persistent remote access and the capability to steal technician session cookies. However, successful self-propagation from an endpoint through a technician workstation to another panel has not been observed.
Official Vulnerability Assessments: CVE-2026-127063 — CVSS 4.0: 9.3 (Critical). CVE-2026-84869 — CVSS 3.1: 9.9; ConnectWise's official severity: Important. These assessments are separate from the author's response-priority assessment above.
Related Resources: ConnectWise Trust Center Advisory, ConnectWise Official Disclosure, CVE-2026-127063, ScreenConnect Bulletin (CVE-2026-84869)

1. 基本信息
文章：SCKit 蠕虫在数百个端点上安装流氓 ScreenConnect 客户端和会话 Cookie 中继
来源：Huntress
发布日期：2026-11-11
原始来源：Huntress
更新时间：2026-11-11T23:34:00-05:00
响应优先级（作者评估）：紧急
响应优先级理由：一个具有 SYSTEM 权限的工具包在 90 分钟内被部署到 48 个组织的 288 个端点上，提供了持久的远程访问能力，并能够窃取技术人员的会话 Cookie。然而，尚未观察到从端点通过技术人员工作站向另一个面板成功进行自我传播的情况。
官方漏洞评估：CVE-2026-127063 — CVSS 4.0: 9.3（紧急）。CVE-2026-84869 — CVSS 3.1: 9.9；ConnectWise 官方严重性：重要。这些评估与上述作者的响应优先级评估是分开的。
相关资源：ConnectWise 信任中心公告、ConnectWise 官方披露、CVE-2026-127063、ScreenConnect 公告 (CVE-2026-84869)

### 2. Key Takeaways
Huntress confirmed an incident where rogue clients and SCKit were deployed to 288 endpoints across 48 organizations via multiple ScreenConnect panels, consistent with operations exploiting an issue in RMM+ 1.0.31 and 1.0.32 where unset access keys accepted empty values. Around 17:47 UTC on November 11, 2026, 288 endpoints across 48 organizations managed by Huntress were impacted within 90 minutes, with about one-third affected in the first 10 minutes. RMM+ versions 1.0.31 and 1.0.32 accepted empty values when access keys were not configured, authenticating requests while bypassing ScreenConnect users, roles, and MFA. This condition of accepting empty values is explained based on Huntress's analysis. ConnectWise's official disclosure for CVE-2026-127063 describes it as "environments retaining default values for modifiable static API secrets," and the official disclosure alone does not restrict it strictly to empty values or those specific versions. The official disclosure assigns a CVSS 4.0 score of 9.3 (Critical); this official vulnerability assessment is separate from the author's response-priority assessment in this article. Commands reached endpoints across multiple ScreenConnect instances without corresponding login activity; the logs Huntress reviewed linked those commands to RMM+. Run Command distributed a rogue ScreenConnect client and a 16-file SCKit with SYSTEM privileges, establishing the TrapWatch scheduled task and RelayTrap. ConnectWise proactively disabled five potentially related extensions across approximately 400 partner environments. The presence of an extension does not imply compromise. While code capabilities exist to steal technician session cookies and spread to other panels, host logs reviewed by Huntress showed that all console takeovers failed, and successful self-propagation has not been observed. The official disclosure CVE-2026-84869, related to the path from endpoints to technicians, has a CVSS 3.1 score of 9.9 and an official severity of Important, and was addressed in technician client version 26.6.5 (this is a separate vulnerability from the initial access vector in RMM+).

2. 关键要点
Huntress 确认了一起事件，其中流氓客户端和 SCKit 通过多个 ScreenConnect 面板被部署到 48 个组织的 288 个端点上，这与利用 RMM+ 1.0.31 和 1.0.32 中未设置访问密钥即接受空值的问题的操作一致。2026 年 11 月 11 日协调世界时 17:47 左右，Huntress 管理的 48 个组织的 288 个端点在 90 分钟内受到影响，其中约三分之一在最初 10 分钟内受到影响。RMM+ 1.0.31 和 1.0.32 版本在未配置访问密钥时接受空值，从而在绕过 ScreenConnect 用户、角色和多因素身份验证 (MFA) 的情况下验证请求。这种接受空值的条件是基于 Huntress 的分析进行解释的。ConnectWise 对 CVE-2026-127063 的官方披露将其描述为“保留可修改静态 API 密钥默认值的环境”，且官方披露本身并未将其严格限制为空值或特定版本。官方披露给出的 CVSS 4.0 评分为 9.3（紧急）；此官方漏洞评估与本文作者的响应优先级评估是分开的。命令在没有相应登录活动的情况下到达了多个 ScreenConnect 实例的端点；Huntress 审查的日志将这些命令与 RMM+ 联系起来。Run Command 分发了一个流氓 ScreenConnect 客户端和一个具有 SYSTEM 权限的 16 文件 SCKit，建立了 TrapWatch 计划任务和 RelayTrap。ConnectWise 主动禁用了约 400 个合作伙伴环境中的五个潜在相关扩展。扩展的存在并不意味着已被入侵。虽然代码具备窃取技术人员会话 Cookie 并传播到其他面板的能力，但 Huntress 审查的主机日志显示所有控制台接管尝试均失败，且未观察到成功的自我传播。与从端点到技术人员路径相关的官方披露 CVE-2026-84869 的 CVSS 3.1 评分为 9.9，官方严重性为“重要”，已在技术人员客户端版本 26.6.5 中得到解决（这是与 RMM+ 初始访问向量不同的漏洞）。

### 3. Attack Flow
Deployment from Panel to Endpoint (Observed): Reaches panel functionality via requests consistent with RMM+ routing that accepts unset access keys as empty values. Distributes a rogue ScreenConnect installer and dropper with SYSTEM privileges via Run Command. Decrypts host-specific SCKit and deploys it to C:\ProgramData\RelayTrap. Configures Defender exclusions, a rogue client, and the TrapWatch scheduled task.
Redistribution Functionality from an Endpoint via a Technician Workstation to Another Panel (Success Not Observed; Code Analysis and Failure Logs): Designed to transfer and execute the dropper on the technician's workstation when a technician connects to an infected endpoint. Steals ScreenConnect session cookies from the browser cookie database on the technician's workstation. Reuses the stolen cookies against another panel to attempt redistribution. Host logs show all console takeovers failed, and success for this path has not been observed. According to ConnectWise, ScreenConnect technician client version 26.6.5 and later blocks this spreading attempt.

3. 攻击流程
从面板到端点的部署（已观察到）：通过与 RMM+ 路由一致的请求访问面板功能，该路由将未设置的访问密钥视为空值。通过 Run Command 分发具有 SYSTEM 权限的流氓 ScreenConnect 安装程序和释放器。解密特定于主机的 SCKit 并将其部署到 C:\ProgramData\RelayTrap。配置 Defender 排除项、流氓客户端和 TrapWatch 计划任务。
从端点通过技术人员工作站到另一个面板的再分发功能（未观察到成功；代码分析和失败日志）：旨在当技术人员连接到受感染的端点时，在技术人员的工作站上传输并执行释放器。从技术人员工作站的浏览器 Cookie 数据库中窃取 ScreenConnect 会话 Cookie。针对另一个面板重用被窃取的 Cookie 以尝试再分发。主机日志显示所有控制台接管尝试均失败，且未观察到此路径的成功案例。据 ConnectWise 称，ScreenConnect 技术人员客户端 26.6.5 及更高版本会阻止此传播尝试。

### 4. Attacker Position and Prerequisites
Attacker Position: A remote attacker capable of sending requests to the third-party RMM+ extension of a cloud-hosted ScreenConnect panel.
Success Conditions: Access keys are unset in RMM+ 1.0.31 or 1.0.32. The panel can execute Run Command across numerous endpoints. Endpoints permit payload retrieval and execution with SYSTEM privileges. Redistribution requires a technician client to connect to an infected endpoint, permitting file transfer and execution with available sessions and privileges.
Prevention and Failure Conditions: Disable related extensions and prohibit reinstallation (blocking the initial access vector). Update the ScreenConnect technician client on technician workstations to version 26.6.5 or later (ConnectWise confirmed that attempted endpoint-to-technician propagation is blocked starting from this version; updating the cloud console alone does not update technician clients). Avoid connecting to suspected hosts via ScreenConnect and use out-of-band tools instead (avoiding exposure of technician workstations). Remove and revoke rogue clients, scheduled tasks, sessions, and credentials (post-compromise containment).

4. 攻击者位置与先决条件
攻击者位置：能够向云托管 ScreenConnect 面板的第三方 RMM+ 扩展发送请求的远程攻击者。
成功条件：RMM+ 1.0.31 或 1.0.32 中的访问密钥未设置。面板可以在多个端点上执行 Run Command。端点允许在 SYSTEM 权限下检索和执行有效载荷。再分发需要技术人员客户端连接到受感染的端点，从而允许在可用会话和权限下进行文件传输和执行。
预防与失败条件：禁用相关扩展并禁止重新安装（阻断初始访问向量）。将技术人员工作站上的 ScreenConnect 技术人员客户端更新至 26.6.5 或更高版本（ConnectWise 确认从该版本开始已阻止尝试从端点到技术人员的传播；仅更新云控制台不会更新技术人员客户端）。避免通过 ScreenConnect 连接到可疑主机，改用带外工具（避免暴露技术人员工作站）。删除并撤销流氓客户端、计划任务、会话和凭据（入侵后的遏制措施）。

### 5. Visibility for Victims and Administrators
Victims: There may be no clear indication during normal operations even if a remote support client is added.
Administrators: Visible as RMM+ commands without logins, bulk execution of Run Command, duplicate ScreenConnect services, and TrapWatch and RelayTrap directories.

5. 受害者与管理员的可见性
受害者：即使添加了远程支持客户端，在正常操作期间也可能没有明显的迹象。
管理员：表现为无登录的 RMM+ 命令、Run Command 的批量执行、重复的 ScreenConnect 服务以及 TrapWatch 和 RelayTrap 目录。

### 6. Confirmed Impact and Success Assessment
Initial Execution Confirmed: SYSTEM commands and SCKit deployment from panels were observed across 288 endpoints and 48 organizations. (Scope: Huntress-managed telemetry.)
Follow-on Compromise: [Missing text]

6. 已确认的影响与成功评估
已确认的初始执行：在 48 个组织的 288 个端点上观察到了来自面板的 SYSTEM 命令和 SCKit 部署。（范围：Huntress 管理的遥测数据。）
后续入侵：[缺失文本]