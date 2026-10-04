---
title: "thedotmack / claude-mem"
originalUrl: "https://github.com/thedotmack/claude-mem"
date: "2026-10-04T00:01:29.605Z"
---

# thedotmack / claude-mem

Persistent memory compression system built for Claude Code.
这是一个为 Claude Code 构建的持久化内存压缩系统。

Quick Start • How It Works • Search Tools • Documentation • Configuration • Troubleshooting • License
快速开始 • 工作原理 • 搜索工具 • 文档 • 配置 • 故障排除 • 许可证

Claude-Mem seamlessly preserves context across sessions by automatically capturing tool usage observations, generating semantic summaries, and making them available to future sessions. This enables Claude to maintain continuity of knowledge about projects even after sessions end or reconnect.
Claude-Mem 通过自动捕获工具使用情况、生成语义摘要并将其提供给后续会话，从而无缝地跨会话保留上下文。这使得 Claude 即使在会话结束或重新连接后，也能保持对项目知识的连续性。

### Quick Start
### 快速开始

Install claude-mem for Grok Bot: `npx claude-mem install --ide grok-bot`
为 Grok Bot 安装 claude-mem：`npx claude-mem install --ide grok-bot`

Grok Bot has no host hooks, so we watch the chat log files. Default is CMEM Pro, the hosted memory. Local observer is opt-in: `--provider host`. Installing this plugin does not install Cursor.
Grok Bot 没有主机钩子，因此我们监视聊天日志文件。默认使用 CMEM Pro（托管内存）。本地观察者需要手动选择：`--provider host`。安装此插件不会安装 Cursor。

Awareness push pilot (LFG + Orifice): needle observations (decision, bugfix, security_alert, sensitive) are appended as dated - YYYY-MM-DD [awareness] … lines into that bot's memory/log/YYYY-MM.md. Grok Bot already re-reads the log from disk. This does not write profile.md, user-memory, or project memory. Disable with `CLAUDE_MEM_GROK_BOT_AWARENESS_ENABLED=false`.
感知推送试点（LFG + Orifice）：关键观察结果（决策、错误修复、安全警报、敏感信息）将以 `YYYY-MM-DD [awareness] …` 的日期格式行追加到该机器人的 `memory/log/YYYY-MM.md` 文件中。Grok Bot 会自动从磁盘重新读取日志。此操作不会写入 `profile.md`、`user-memory` 或项目内存。可通过 `CLAUDE_MEM_GROK_BOT_AWARENESS_ENABLED=false` 禁用。

Install with a single command: `npx claude-mem install`
使用单条命令安装：`npx claude-mem install`

The installer sets everything up first, then asks you to sign in to claude-mem in your browser (email magic link — no card required). Signing in provisions a memory key for your account and unlocks the claude-mem observer: memory that runs off-plan, free for up to 14 days, so you get up to 100% more usage from your plan. When the free trial ends, memory automatically falls back to your Anthropic plan unless you subscribe.
安装程序会先完成所有设置，然后要求您在浏览器中登录 claude-mem（通过电子邮件魔法链接，无需信用卡）。登录后将为您的账户配置内存密钥并解锁 claude-mem 观察者：这是一种在计划外运行的内存，免费试用期长达 14 天，让您的计划使用量最高增加 100%。免费试用结束后，除非您订阅，否则内存将自动回退到您的 Anthropic 计划。

After sign-in you pick your memory provider — the claude-mem observer, your own OpenRouter or Gemini key, or your Anthropic plan. Prefer to skip the sign-in? Pass an explicit `--provider` flag, set `CLAUDE_MEM_ONLINE_OPTIN=false`, or run in CI/non-interactive shells — the installer completes without any account interaction.
登录后，您可以选择内存提供商——claude-mem 观察者、您自己的 OpenRouter 或 Gemini 密钥，或者您的 Anthropic 计划。不想登录？请显式传递 `--provider` 标志、设置 `CLAUDE_MEM_ONLINE_OPTIN=false`，或在 CI/非交互式 shell 中运行——安装程序将在无需任何账户交互的情况下完成。

Or install for OpenCode: `npx claude-mem install --ide opencode`
或为 OpenCode 安装：`npx claude-mem install --ide opencode`

Or install for Antigravity CLI (setup guide): `npx claude-mem install --ide antigravity`
或为 Antigravity CLI 安装（查看设置指南）：`npx claude-mem install --ide antigravity`

Or install for OMP (Oh My Pi): `npx claude-mem install --ide omp`
或为 OMP (Oh My Pi) 安装：`npx claude-mem install --ide omp`

Or install from the plugin marketplace inside Claude Code:
或从 Claude Code 内部的插件市场安装：
`/plugin marketplace add thedotmack/claude-mem`
`/plugin install claude-mem`

Restart Claude Code. Context from previous sessions will automatically appear in new sessions.
重启 Claude Code。之前会话的上下文将自动出现在新会话中。

Note: Claude-Mem is also published on npm, but `npm install -g claude-mem` installs the SDK/library only — it does not register the plugin hooks or set up the worker service. Always install via `npx claude-mem install` or the `/plugin` commands above.
注意：Claude-Mem 也发布在 npm 上，但 `npm install -g claude-mem` 仅安装 SDK/库，它不会注册插件钩子或设置工作服务。请务必通过 `npx claude-mem install` 或上述 `/plugin` 命令进行安装。

### 🦞 OpenClaw Gateway
### 🦞 OpenClaw 网关

Install claude-mem as a persistent memory plugin on OpenClaw gateways with a single command:
通过单条命令将 claude-mem 作为持久化内存插件安装在 OpenClaw 网关上：
`curl -fsSL https://install.cmem.ai/openclaw.sh | bash`

The installer handles dependencies, plugin setup, AI provider configuration, worker startup, and optional real-time observation feeds to Telegram, Discord, Slack, and more. See the OpenClaw Integration Guide for details.
安装程序会处理依赖项、插件设置、AI 提供商配置、工作服务启动，以及可选的 Telegram、Discord、Slack 等实时观察推送。详情请参阅 OpenClaw 集成指南。

### Key Features:
### 核心功能：

*   🧠 **Persistent Memory** - Context survives across sessions
    🧠 **持久化内存** - 上下文跨会话存续
*   📊 **Progressive Disclosure** - Layered memory retrieval with token cost visibility
    📊 **渐进式披露** - 分层内存检索，并具备 Token 成本可见性
*   🔍 **Skill-Based Search** - Query your project history with mem-search skill
    🔍 **基于技能的搜索** - 使用 mem-search 技能查询您的项目历史
*   🖥️ **Web Viewer UI** - Real-time memory stream at the worker URL printed on startup
    🖥️ **Web 查看器 UI** - 在启动时打印的工作 URL 上查看实时内存流
*   💻 **Claude Desktop Skill** - Search memory from Claude Desktop conversations
    💻 **Claude Desktop 技能** - 从 Claude Desktop 对话中搜索内存
*   🔒 **Privacy Control** - Use `<private>` tags to exclude sensitive content from storage
    🔒 **隐私控制** - 使用 `<private>` 标签将敏感内容排除在存储之外
*   ⚙️ **Context Configuration** - Fine-grained control over what context gets injected
    ⚙️ **上下文配置** - 对注入的上下文进行细粒度控制
*   🤖 **Automatic Operation** - No manual intervention required
    🤖 **自动运行** - 无需人工干预
*   🔗 **Citations** - Reference past observations with IDs through the worker API or view all in the web viewer
    🔗 **引用** - 通过工作 API 使用 ID 引用过去的观察结果，或在 Web 查看器中查看全部内容

### Documentation
### 文档

*   📚 **View Full Documentation** - Browse on official website
    📚 **查看完整文档** - 在官方网站浏览
*   **Getting Started**
    **入门指南**
    *   Installation Guide - Quick start & advanced installation
        安装指南 - 快速开始与高级安装
    *   Usage Guide - How Claude-Mem works automatically
        使用指南 - Claude-Mem 如何自动工作
    *   Search Tools - Query your project history with natural language
        搜索工具 - 使用自然语言查询您的项目历史
    *   Cloud Sync - Back up your memories to cmem.ai — no daemon, the worker syncs on write
        云同步 - 将您的内存备份到 cmem.ai — 无需守护进程，工作服务在写入时同步
*   **Best Practices**
    **最佳实践**
    *   Context Engineering - AI agent context optimization principles
        上下文工程 - AI 代理上下文优化原则
    *   Progressive Disclosure - Philosophy behind Claude-Mem's context priming strategy
        渐进式披露 - Claude-Mem 上下文引导策略背后的哲学
*   **Architecture Overview**
    **架构概览**
    *   Architecture Evolution - The journey from v3 to v5
        架构演进 - 从 v3 到 v5 的历程
    *   Hooks Architecture - How Claude-Mem uses lifecycle hooks
        钩子架构 - Claude-Mem 如何使用生命周期钩子
    *   Hooks Reference - 7 hook scripts explained
        钩子参考 - 7 个钩子脚本详解
    *   Worker Service - HTTP API & Bun management
        工作服务 - HTTP API 与 Bun 管理
    *   Database - SQLite schema & FTS5 search
        数据库 - SQLite 架构与 FTS5 搜索
    *   Search Architecture - Hybrid search with Chroma vector database
        搜索架构 - 基于 Chroma 向量数据库的混合搜索
*   **Configuration & Development**
    **配置与开发**
    *   Configuration - Environment variables & settings
        配置 - 环境变量与设置
    *   Development - Building, testing, contributing
        开发 - 构建、测试、贡献
    *   Release Branches - Stable, core-dev, and community-edge branch flow
        发布分支 - 稳定版、核心开发版和社区前沿版分支流程
*   **Troubleshooting** - Common issues & solutions
    **故障排除** - 常见问题与解决方案

### How It Works
### 工作原理

**Core Components:**
**核心组件：**

*   **5 Lifecycle Hooks** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 hook scripts)
    **5 个生命周期钩子** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd（共 6 个钩子脚本）
*   **Smart Install** - Cached dependency checker (pre-hook script, not a lifecycle hook)
    **智能安装** - 缓存依赖检查器（预钩子脚本，非生命周期钩子）
*   **Worker Service** - Local HTTP API with web viewer UI and search endpoints, managed by Bun
    **工作服务** - 本地 HTTP API，包含 Web 查看器 UI 和搜索端点，由 Bun 管理
*   **SQLite Database** - Stores sessions, observations, summaries
    **SQLite 数据库** - 存储会话、观察结果和摘要
*   **mem-search Skill** - Natural language queries with progressive disclosure
    **mem-search 技能** - 具备渐进式披露功能的自然语言查询
*   **Chroma Vector Database** - Hybrid semantic + keyword search for intelligent context retrieval
    **Chroma 向量数据库** - 用于智能上下文检索的混合语义+关键词搜索

See Architecture Overview for details.
详情请参阅架构概览。

### MCP Search Tools
### MCP 搜索工具

Claude-Mem provides intelligent memory search through 4 MCP tools following a token-efficient 3-layer workflow pattern:
Claude-Mem 通过 4 个 MCP 工具提供智能内存搜索，遵循 Token 高效的 3 层工作流模式：

**The 3-Layer Workflow:**
**3 层工作流：**

*   `search` - Get compact index with IDs (~50-100 tokens/result)
    `search` - 获取带有 ID 的紧凑索引（每个结果约 50-100 个 Token）