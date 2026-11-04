---
title: "spotify / portal-ai-plugins"
originalUrl: "https://github.com/spotify/portal-ai-plugins"
date: "2026-11-04T01:28:43.409Z"
excerpt: false
---

### Spotify / portal-ai-plugins

Spotify Portal AI Plugins Bring Spotify Portal into Claude Code, Codex, Cursor, and pi. This plugin provides focused workflows for the Portal CLI: set up authentication, search your software catalog, build service briefings, run diagnostics, and invoke Portal actions.

Spotify Portal AI 插件将 Spotify Portal 引入了 Claude Code、Codex、Cursor 和 pi。该插件为 Portal CLI 提供了专注的工作流：设置身份验证、搜索软件目录、构建服务简报、运行诊断以及调用 Portal 操作。

Highlights Set up the Portal CLI for your current coding-agent environment. Run read-only diagnostics to verify plugin, CLI, authentication, and action readiness. Search the software catalog and technical documentation using natural language queries. Generate concise service briefings with available ownership, health, incident, and documentation details. Discover and safely invoke Portal actions with built-in help, dry-run, and confirmation safeguards. Create, run, check, and troubleshoot Fleetshift shifts, open PRs from completed runs, and stop a run on request. The marketplace also ships shunt (Claude Code only for now): a plugin that routes I/O-heavy agent work — bulk file reads and boilerplate generation — to AiKA modes running cheaper worker models, via the Portal CLI actions registry. See plugins/shunt/README.md.

亮点：为当前的编码代理环境设置 Portal CLI。运行只读诊断以验证插件、CLI、身份验证和操作的就绪状态。使用自然语言查询搜索软件目录和技术文档。生成包含可用所有权、健康状况、事件和文档详情的简明服务简报。通过内置的帮助、试运行和确认保护机制，发现并安全地调用 Portal 操作。创建、运行、检查和排查 Fleetshift 任务，从已完成的运行中打开 PR，并按需停止运行。该市场还提供了 shunt（目前仅限 Claude Code）：这是一个通过 Portal CLI 操作注册表，将 I/O 密集型代理工作（如批量文件读取和样板代码生成）路由到运行更廉价工作模型的 AiKA 模式的插件。请参阅 plugins/shunt/README.md。

Installation Claude Code claude plugin marketplace add spotify/portal-ai-plugins claude plugin install portal@portal claude plugin install shunt@portal # optional: token-saving AiKA delegation Start a new session and run: /portal:setup Codex codex plugin marketplace add spotify/portal-ai-plugins codex Open /plugins, install Spotify Portal, start a new task, and ask: Set up Spotify Portal for me. Cursor Register the spotify/portal-ai-plugins repository in your Cursor team marketplace, then install Spotify Portal from Cursor Settings → Plugins. pi pi install git:github.com/spotify/portal-ai-plugins Start a new session and run: /skill:setup

安装：Claude Code：`claude plugin marketplace add spotify/portal-ai-plugins`，`claude plugin install portal@portal`，`claude plugin install shunt@portal`（可选：节省令牌的 AiKA 委托）。开始新会话并运行：`/portal:setup`。Codex：`codex plugin marketplace add spotify/portal-ai-plugins`，打开 `/plugins`，安装 Spotify Portal，开始新任务并询问：`Set up Spotify Portal for me.`。Cursor：在 Cursor 团队市场中注册 `spotify/portal-ai-plugins` 存储库，然后从 Cursor 设置 → 插件中安装 Spotify Portal。pi：`pi install git:github.com/spotify/portal-ai-plugins`。开始新会话并运行：`/skill:setup`。

Workflows Workflow Purpose setup Configure Portal CLI authentication doctor Run read-only readiness diagnostics search Search the software catalog and technical documentation service Produce a concise operational service briefing actions Discover, inspect, preview, and safely invoke Portal actions feedback Submit feedback about the Portal CLI to the Portal team fleetshift-create-shift Draft and create a Fleetshift shift from a goal, with a dry-run preview fleetshift-run-shift Trigger a shift, monitor it with a bounded wait, and stop it on request fleetshift-check-shift Report a shift's progress, targets, and PRs (read-only) fleetshift-troubleshoot-shift Diagnose failed shift jobs from their status and logs (read-only) fleetshift-create-prs Open PRs for completed shift targets after confirmation

工作流：setup（配置 Portal CLI 身份验证）、doctor（运行只读就绪诊断）、search（搜索软件目录和技术文档）、service（生成简明操作服务简报）、actions（发现、检查、预览并安全调用 Portal 操作）、feedback（向 Portal 团队提交关于 Portal CLI 的反馈）、fleetshift-create-shift（根据目标起草并创建 Fleetshift 任务，包含试运行预览）、fleetshift-run-shift（触发任务，在有限等待时间内监控，并按需停止）、fleetshift-check-shift（报告任务进度、目标和 PR，只读）、fleetshift-troubleshoot-shift（根据状态和日志诊断失败的任务作业，只读）、fleetshift-create-prs（确认后为已完成的任务目标打开 PR）。

Portal CLI The workflows invoke the upstream CLI through: npx @spotify/portal-cli <command> Setup verifies the required auth, actions, owner, search, and service commands before proceeding.

Portal CLI：这些工作流通过 `npx @spotify/portal-cli <command>` 调用上游 CLI。Setup 在继续之前会验证所需的 auth、actions、owner、search 和 service 命令。