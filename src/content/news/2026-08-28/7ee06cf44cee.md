---
title: "JetBrains / go-modern-guidelines"
originalUrl: "https://github.com/JetBrains/go-modern-guidelines"
date: "2026-08-28T05:33:04.114Z"
---

# JetBrains / go-modern-guidelines

**Modern Go Guidelines**
**现代 Go 语言指南**

This repository contains guidelines for code agents that help them write modern Go code. For example, an agent with these guidelines uses `max(a, b)` instead of an `if-else` block, `slices.Contains` instead of a manual loop, `cmp.Or(a, b, c)` instead of a chain of `nil` checks. It also knows about recent additions like `new(42)` to get a pointer to a value and `errors.AsType[T](err)` for type-safe error matching—both from Go 1.26.
该仓库包含了一套旨在帮助代码智能体（Code Agents）编写现代 Go 代码的指南。例如，遵循这些指南的智能体会使用 `max(a, b)` 代替 `if-else` 代码块，使用 `slices.Contains` 代替手动循环，使用 `cmp.Or(a, b, c)` 代替一连串的 `nil` 检查。它还了解 Go 1.26 中引入的最新特性，例如用于获取值指针的 `new(42)`，以及用于类型安全错误匹配的 `errors.AsType[T](err)`。

The guidelines cover the most useful features from Go 1.0 through Go 1.27, including everything targeted by the `modernize` analyzer. An agent will:
这些指南涵盖了从 Go 1.0 到 Go 1.27 最实用的特性，包括 `modernize` 分析器所针对的所有内容。智能体将能够：

* Detect the project's Go version from `go.mod`
* 从 `go.mod` 检测项目的 Go 版本
* Use language features and stdlib additions available up to and including that version
* 使用该版本及之前版本中可用的语言特性和标准库新增功能
* Prefer modern idioms over older patterns
* 优先使用现代惯用法而非旧模式

**Motivation**
**动机**

All coding agents tend to generate outdated Go. Two reasons:
所有的编码智能体往往倾向于生成过时的 Go 代码。原因有二：

1. **Training data lag.** Models don't know about features added after their training cutoff. They can't use `errors.AsType[T]` (Go 1.26) if they've never seen it.
1. **训练数据滞后。** 模型无法获知其训练截止日期之后添加的特性。如果模型从未见过 `errors.AsType[T]` (Go 1.26)，它就无法使用该特性。

2. **Frequency bias.** Even for features the model knows, it often picks older patterns. There's more `for i := 0; i < n; i++` in the training data than for `i := range n`, so that's what comes out.
2. **频率偏差。** 即使对于模型已知的特性，它也经常选择旧模式。训练数据中 `for i := 0; i < n; i++` 的出现频率远高于 `i := range n`，因此模型往往会输出前者。

These guidelines fix both problems by giving the agent an explicit reference. This aligns with the Go team's direction. The `modernize` analyzer exists to automatically update existing code to use newer idioms (see this talk from the Go team). These guidelines serve the same goal for new code: agents write modern Go from the start, so there's less to fix later.
这些指南通过为智能体提供明确的参考，解决了上述两个问题。这与 Go 团队的方向保持一致。`modernize` 分析器旨在自动更新现有代码以使用更新的惯用法（参考 Go 团队的演讲）。这些指南为新代码实现了相同的目标：让智能体从一开始就编写现代 Go 代码，从而减少后续的修复工作。

**Requirements**
**要求**

The marketplace integrations run a small CLI that is installed on first use with `go install`. Because of that, the Go toolchain must be installed and available on your PATH. The CLI is installed into a local cache (for example `~/.cache/go-modern-guidelines`) and never modifies your project. It targets Go 1.25 or newer; on an older Go it still works as long as automatic toolchain switching is enabled (`GOTOOLCHAIN=auto`, the default), which lets Go fetch a compatible toolchain on first run.
市场集成插件会运行一个小型 CLI 工具，该工具在首次使用时通过 `go install` 安装。因此，必须安装 Go 工具链并将其添加到 PATH 中。该 CLI 安装在本地缓存中（例如 `~/.cache/go-modern-guidelines`），且绝不会修改你的项目。它针对 Go 1.25 或更高版本；在旧版本 Go 上，只要启用了自动工具链切换（默认配置 `GOTOOLCHAIN=auto`），它依然可以工作，这允许 Go 在首次运行时获取兼容的工具链。

**Instructions**
**使用说明**

The guidelines are available for Junie, Claude Code, Codex, and Cursor, and for other agents via `skills.sh`.
这些指南适用于 Junie、Claude Code、Codex 和 Cursor，其他智能体可通过 `skills.sh` 使用。

*(Note: Due to length, specific installation commands for Junie, Claude Code, Codex, Cursor, and other agents follow the standard plugin/marketplace patterns provided in the repository documentation.)*
*（注：由于篇幅限制，针对 Junie、Claude Code、Codex、Cursor 及其他智能体的具体安装命令，请参考仓库文档中提供的标准插件/市场操作流程。）*

**Local development**
**本地开发**

To try changes to the CLI in your agent, build this checkout into the tool's cache: `make dev-install`. Then set `GO_MODERN_GUIDELINES_DEV=1` in the environment your agent runs in. With it set, any agent using the plugin runs your local build instead of the released version, the same way across Claude Code, Codex, and Cursor.
若要在智能体中测试 CLI 的更改，请将当前检出版本构建到工具缓存中：执行 `make dev-install`。然后在智能体运行的环境中设置 `GO_MODERN_GUIDELINES_DEV=1`。设置后，任何使用该插件的智能体都会运行你的本地构建版本，而非发布版本，这在 Claude Code、Codex 和 Cursor 中均适用。