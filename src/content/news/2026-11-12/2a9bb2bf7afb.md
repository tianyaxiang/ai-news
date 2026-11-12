---
title: "openai / codex-security"
originalUrl: "https://github.com/openai/codex-security"
date: "2026-11-12T02:18:10.711Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

Codex Security helps you find, investigate, and fix vulnerabilities in your code. Use its security workflows in Codex, or automate them with the @openai/codex-security CLI and TypeScript SDK. In Codex: choose a security workflow. In a terminal: install the CLI and scan your repository. In automation: use the TypeScript SDK or GitHub Action.

Codex Security 旨在帮助您发现、调查并修复代码中的漏洞。您可以在 Codex 中使用其安全工作流，或通过 @openai/codex-security CLI 和 TypeScript SDK 实现自动化。在 Codex 中：选择一个安全工作流。在终端中：安装 CLI 并扫描您的存储库。在自动化流程中：使用 TypeScript SDK 或 GitHub Action。

Features: Scan repositories, selected paths, or Git changes. Deep scans repeat Standard scans and return their deduplicated findings. Validate candidate findings, generate patches, and verify existing fixes. Draft SECURITY.md policies and save threat models for later review. Browse saved scans and findings, identify duplicates, assess severity against your own rubric, and suggest owners from source and Git history.

功能：扫描存储库、选定路径或 Git 变更。深度扫描会重复标准扫描并返回去重后的结果。验证候选发现、生成补丁并核实现有修复。起草 SECURITY.md 策略并保存威胁模型以供后续审查。浏览已保存的扫描和发现结果，识别重复项，根据您自己的准则评估严重性，并根据源代码和 Git 历史记录建议负责人。

Preview third-party scanner findings, save them locally, or publish supported reports to Codex Security Cloud. Scanner import guides. Track findings in Linear, Jira, or GitHub, publish completed scans, or export SARIF, JSON, and CSV. Integration workflows. Automate scans across repositories or project components, including in CI and containers.

预览第三方扫描器的发现结果，将其保存在本地，或将受支持的报告发布到 Codex Security Cloud。提供扫描器导入指南。在 Linear、Jira 或 GitHub 中跟踪发现结果，发布已完成的扫描，或导出为 SARIF、JSON 和 CSV 格式。集成工作流：在存储库或项目组件之间自动执行扫描，包括在 CI 和容器中。

Use in Codex: Open your repository in a Codex session with the Codex Security plugin enabled, then ask: Run a Codex Security scan on this repository, focusing on authentication and authorization. Return the saved report, source evidence, and coverage limits. A completed scan saves a report and findings. Read the report for source evidence and exclusions, then request a patch or ask Codex to verify an existing fix. See the agent workflow guide for setup, task selection, and recovery.

在 Codex 中使用：在启用了 Codex Security 插件的 Codex 会话中打开您的存储库，然后询问：对该存储库运行 Codex Security 扫描，重点关注身份验证和授权。返回已保存的报告、源代码证据和覆盖范围限制。扫描完成后会保存一份报告和发现结果。阅读报告以获取源代码证据和排除项，然后请求补丁或要求 Codex 验证现有的修复。有关设置、任务选择和恢复的信息，请参阅代理工作流指南。

Quick start: Requires Node.js 22.13.0+ within 22.x, or Node.js 24.x or 26.x, and Python 3.10+. Python 3.10 also requires tomli. Install the CLI globally and sign in: npm install --global @openai/codex-security; cs login. Run your first scan from the repository directory: cs scan . When the scan completes, open the Markdown file at the REPORT path in the terminal. Run cs scans show from the same repository to find its latest completed scan again.

快速入门：需要 Node.js 22.x 版本中的 22.13.0+，或 Node.js 24.x 或 26.x，以及 Python 3.10+。Python 3.10 还需要 tomli。全局安装 CLI 并登录：npm install --global @openai/codex-security；cs login。在存储库目录中运行您的首次扫描：cs scan .。扫描完成后，在终端中打开 REPORT 路径下的 Markdown 文件。在同一存储库中运行 cs scans show 以再次查找其最近完成的扫描。

See scan scope and follow-up work for how to interpret exclusions in the report. cs and codex-security run the same CLI. If the short name conflicts with another command, use codex-security. To skip the global install, or if npm reports an EEXIST conflict, use npx @openai/codex-security in place of cs for both login and scanning. For CI, set OPENAI_API_KEY or CODEX_API_KEY in the scan process's environment. For a headless machine, see device or SSH login.

请参阅扫描范围和后续工作，了解如何解读报告中的排除项。cs 和 codex-security 运行的是同一个 CLI。如果简写名称与其他命令冲突，请使用 codex-security。若要跳过全局安装，或者如果 npm 报告 EEXIST 冲突，请使用 npx @openai/codex-security 代替 cs 进行登录和扫描。对于 CI，请在扫描进程的环境中设置 OPENAI_API_KEY 或 CODEX_API_KEY。对于无头机器，请参阅设备或 SSH 登录方式。

Scan options: Choose a scope and scan mode: # Scan selected paths. cs scan . --path src --path tests # Scan committed changes from a base revision to HEAD. cs scan . --diff origin/main # Run a deep scan of the repository. cs scan . --mode deep. Use cs scan . --max-time 15 for an advisory 15-minute Standard investigation allowance. See investigation time for timing semantics and Deep Scan limits. Use cs --help to browse commands, or cs scan --help for scan options, cost limits, and patching after a scan.

扫描选项：选择范围和扫描模式：# 扫描选定路径。cs scan . --path src --path tests # 扫描从基准版本到 HEAD 的已提交变更。cs scan . --diff origin/main # 运行存储库的深度扫描。cs scan . --mode deep。使用 cs scan . --max-time 15 可获得 15 分钟的标准调查建议时长。有关时间语义和深度扫描限制，请参阅调查时间。使用 cs --help 浏览命令，或使用 cs scan --help 查看扫描选项、成本限制以及扫描后的补丁操作。

For an application spread across repositories, see review one system across repositories. Use bulk scans for independent repository reviews in one resumable campaign. Scans use existing root and component SECURITY.md guidance. To write or revise it, see Generate SECURITY.md. Some cybersecurity requests and protected findings require Trusted Access for Cyber. For accounts with Daybreak access, see Daybreak opt-in for the Codex toggle and Cyber access programs to select a program explicitly.

对于跨多个存储库的应用程序，请参阅“跨存储库审查一个系统”。使用批量扫描可在一次可恢复的活动中对多个独立存储库进行审查。扫描会使用现有的根目录和组件 SECURITY.md 指导文件。如需编写或修订该文件，请参阅“生成 SECURITY.md”。某些网络安全请求和受保护的发现结果需要“网络可信访问”(Trusted Access for Cyber)。对于拥有 Daybreak 访问权限的账户，请参阅 Daybreak 启用说明，以获取 Codex 开关和网络访问程序，从而明确选择一个程序。

TypeScript SDK: Install the package locally in your TypeScript project: npm install @openai/codex-security. Then import it: import { CodexSecurity } from "@openai/codex-security"; const security = new CodexSecurity(); try { const result = await security.run("/path/to/repository"); console.log(result.reportPath); } finally { await security.close(); }. The SDK guide includes deep-scan configuration, validation, severity classification, owner suggestions, and result handling.

TypeScript SDK：在您的 TypeScript 项目中本地安装该包：npm install @openai/codex-security。然后导入它：import { CodexSecurity } from "@openai/codex-security"; const security = new CodexSecurity(); try { const result = await security.run("/path/to/repository"); console.log(result.reportPath); } finally { await security.close(); }。SDK 指南包含深度扫描配置、验证、严重性分类、负责人建议和结果处理。

Linked Git worktrees share scan history and saved findings when they use the same Codex Security state directory. Keep CODEX_SECURITY_STATE_DIR stable to retain that shared history and sign-in scope. See the scan history guide. Read existing Cloud findings: When Codex Security Cloud is available to your account, the Security plugin's $cloud-findings skill can read findings, reports, recorded assignment and verification, and scan status in Codex desktop or the Codex CLI. Cloud is an optional connection; local scans work without it. See Cloud connection setup and CLI reads for authentication requirements and a read-only example.

当链接的 Git 工作树使用相同的 Codex Security 状态目录时，它们会共享扫描历史记录和已保存的发现结果。请保持 CODEX_SECURITY_STATE_DIR 稳定，以保留该共享历史记录和登录范围。请参阅扫描历史记录指南。读取现有的云端发现结果：当您的账户可以使用 Codex Security Cloud 时，Security 插件的 $cloud-findings 技能可以在 Codex 桌面版或 Codex CLI 中读取发现结果、报告、记录的分配与验证以及扫描状态。云端连接是可选的；本地扫描无需此连接即可工作。有关身份验证要求和只读示例，请参阅云端连接设置和 CLI 读取说明。

Generate SECURITY.md: Use policy to draft a new SECURITY.md or update an existing one. Use --path to select a component: cs policy . cs policy . --path services/api --knowledge-base architecture.md. The command saves its draft outside the repository and leaves existing files unchanged. Review the diff and notes, edit the draft, then copy only SECURITY.md to the displayed Policy target. Keep the saved architecture and threat-model documents outside the repository. Scans already use root and component SECURITY.md files. Keep your current policy if it needs no changes.

生成 SECURITY.md：使用 policy 命令起草新的 SECURITY.md 或更新现有文件。使用 --path 选择组件：cs policy . cs policy . --path services/api --knowledge-base architecture.md。该命令将草稿保存在存储库之外，并保持现有文件不变。审查差异和注释，编辑草稿，然后仅将 SECURITY.md 复制到显示的策略目标位置。请将保存的架构和威胁模型文档保留在存储库之外。扫描程序已在使用根目录和组件的 SECURITY.md 文件。如果当前策略无需更改，请保留现状。

When updating it, preserve its vulnerability-reporting instructions. If the command says the policy is already up to date, no copy is needed. Files at .github/SECURITY.md or docs/SECURITY.md often contain reporting instructions. Preserve them when drafting a policy; those locations do not automatically provide repository-wide scan guidance. See the policy guide for policy locations, unanswered questions, saved artifacts, and SDK usage.

更新时，请保留其漏洞报告说明。如果命令提示策略已是最新，则无需复制。位于 .github/SECURITY.md 或 docs/SECURITY.md 的文件通常包含报告说明。在起草策略时请保留它们；这些位置不会自动提供全存储库范围的扫描指导。有关策略位置、未决问题、已保存工件和 SDK 使用的信息，请参阅策略指南。

Save and export threat models: Scans and policy generation save threat models with their results. Export a saved model without starting another analysis: cs export --scan SCAN_ID --artifact threat-model --output threatmodel.md. Omit --scan to use the current repository's latest completed scan. The export guide also covers findings, SARIF output for CI, and the.

保存并导出威胁模型：扫描和策略生成过程会随结果一起保存威胁模型。无需启动另一次分析即可导出已保存的模型：cs export --scan SCAN_ID --artifact threat-model --output threatmodel.md。省略 --scan 参数将使用当前存储库最近完成的扫描。导出指南还涵盖了发现结果、用于 CI 的 SARIF 输出以及其他内容。