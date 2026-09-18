---
title: "Claude Code now reads AGENTS.md if there is no Claude.md"
originalUrl: "https://code.claude.com/docs/en/changelog"
date: "2026-09-18T23:23:20.738Z"
---

# Claude Code now reads AGENTS.md if there is no Claude.md
# Claude Code 现在支持在没有 Claude.md 时读取 AGENTS.md

This page is generated from the CHANGELOG.md on GitHub. Run `claude --version` to check your installed version. 2.1.277 September 18, 2026.
此页面由 GitHub 上的 CHANGELOG.md 生成。运行 `claude --version` 可查看当前安装的版本。2.1.277，2026 年 9 月 18 日。

Added AGENTS.md support: in a project with no CLAUDE.md, Claude Code reads AGENTS.md instead; change it under “Project instructions” in /config (not yet on Bedrock, Vertex or Foundry).
新增 AGENTS.md 支持：在没有 CLAUDE.md 的项目中，Claude Code 会改为读取 AGENTS.md；可在 /config 的“Project instructions”下进行更改（暂不支持 Bedrock、Vertex 或 Foundry）。

Added CLAUDE_GATEWAY_PROXY_IS_EGRESS_BOUNDARY=1 for Claude apps gateways whose only egress is a forward proxy: every outbound request hands the proxy the hostname instead of resolving it locally.
为仅通过正向代理进行出口流量的 Claude 应用网关添加了 `CLAUDE_GATEWAY_PROXY_IS_EGRESS_BOUNDARY=1`：每个出站请求都会将主机名交给代理，而不是在本地解析。

Added an optional `headers:` map on Claude apps gateway upstreams, to send static headers to a proxy you run in front of a provider.
在 Claude 应用网关上游添加了可选的 `headers:` 映射，用于向你在提供商前端运行的代理发送静态请求头。

Added a line saying a background task’s update is waiting when it finishes while a panel such as /tasks is open.
当后台任务完成且 /tasks 等面板处于打开状态时，增加了一行提示，说明后台任务的更新正在等待中。

Fixed `claude -p` and Agent SDK sessions that could hang with no result after an internal error; they now report the error and exit with code 1.
修复了 `claude -p` 和 Agent SDK 会话在内部错误后可能挂起且无结果的问题；现在它们会报告错误并以代码 1 退出。

Fixed conversations failing every request with “text content blocks must be non-empty” when an earlier assistant turn held an empty text block beside other content, including after `--resume`.
修复了当之前的助手回复中包含空文本块及其他内容时（包括使用 `--resume` 后），对话中每个请求都报错“text content blocks must be non-empty”的问题。

Fixed being unexpectedly logged out when an older Claude Code build (for example an IDE extension’s bundled CLI) runs on the same machine as the current one.
修复了当旧版 Claude Code 构建（例如 IDE 扩展捆绑的 CLI）与当前版本在同一台机器上运行时，用户被意外登出的问题。

Fixed interactive start-up hanging or showing an error for ANTHROPIC_API_KEY users when `~/.claude.json` holds a malformed `customApiKeyResponses` value.
修复了当 `~/.claude.json` 包含格式错误的 `customApiKeyResponses` 值时，使用 ANTHROPIC_API_KEY 的用户在交互式启动时挂起或报错的问题。

Fixed update checks erroring every 30 minutes, and `claude update` hanging when a minimum or maximum version is set, if a proxy returns an invalid version; a malformed `minimumVersion` is now ignored.
修复了每 30 分钟更新检查报错的问题，以及当设置了最小或最大版本且代理返回无效版本时 `claude update` 挂起的问题；现在格式错误的 `minimumVersion` 会被忽略。

Fixed `claude update` on winget- or apk-managed installs reporting “up to date” when the version lookup failed.
修复了在 winget 或 apk 管理的安装中，版本查找失败时 `claude update` 仍报告“up to date”（已是最新）的问题。

Fixed `claude plugin install` sometimes failing and breaking the installed copy when reinstalling a plugin version that a session or another program was using; an unchanged copy is now left alone.
修复了在重新安装会话或其他程序正在使用的插件版本时，`claude plugin install` 有时会失败并损坏已安装副本的问题；现在未更改的副本将保持原样。

Fixed Grep and Glob reporting no matches when the search could not start because the system was out of processes, memory or file handles; they now return an error saying so.
修复了当系统因进程、内存或文件句柄耗尽导致搜索无法启动时，Grep 和 Glob 报告无匹配项的问题；现在它们会返回相应的错误提示。

Fixed the Write tool silently ending the turn as a declined permission when the target path is an existing directory; it now reports a clear error.
修复了当目标路径为现有目录时，Write 工具静默结束回合并显示权限被拒绝的问题；现在它会报告明确的错误。

Fixed the Edit tool treating an escaped backslash followed by uXXXX text as a \uXXXX escape, which could make an edit of a non-ASCII character rewrite an escaped backslash sequence instead.
修复了 Edit 工具将转义反斜杠后跟 uXXXX 文本视为 \uXXXX 转义的问题，这可能导致编辑非 ASCII 字符时反而重写了转义反斜杠序列。

Fixed the Edit tool reporting “Invalid regular expression: regular expression too large” instead of “String not found in file” when a very large edit containing non-ASCII text did not match the file.
修复了当包含非 ASCII 文本的大型编辑未匹配文件时，Edit 工具报告“Invalid regular expression: regular expression too large”而非“String not found in file”的问题。

Fixed a turn ending early with “Path contains null bytes” when a tool call’s file path contained \u0000 written as an escape sequence; escaped control characters now stay as literal text.
修复了当工具调用的文件路径包含以转义序列形式写入的 \u0000 时，回合因“Path contains null bytes”提前结束的问题；现在转义的控制字符将作为字面文本保留。

Fixed background sessions (`claude --bg`) exiting when a plugin’s LSP server exited or closed its stdin.
修复了当插件的 LSP 服务器退出或关闭其 stdin 时，后台会话 (`claude --bg`) 意外退出的问题。

Fixed a crash (“Type error”) when opening /mcp or /plugin manage with a malformed `claudeAiMcpEverConnected` value in `~/.claude.json`.
修复了当 `~/.claude.json` 中存在格式错误的 `claudeAiMcpEverConnected` 值时，打开 /mcp 或 /plugin manage 导致的崩溃（“Type error”）。

Fixed a crash at launch when `~/.claude.json` holds a malformed theme value.
修复了当 `~/.claude.json` 包含格式错误的主题值时启动崩溃的问题。

Fixed a crash (“unrecoverable interface error”) when the prompt held text containing terminal color codes, for example a prompt recalled from history or text loaded from the external editor.
修复了当提示词包含终端颜色代码（例如从历史记录中调用的提示词或从外部编辑器加载的文本）时导致的崩溃（“unrecoverable interface error”）。

Fixed a crash when resuming a session whose saved history holds an assistant message stored as a plain string.
修复了恢复保存历史记录中包含以纯字符串形式存储的助手消息的会话时导致的崩溃。

Fixed sessions on slow or heavily loaded machines sometimes exiting with “Claude Code exited after an unrecoverable interface error” when the first spinner appeared.
修复了在缓慢或高负载机器上，当第一个加载动画出现时，会话有时会因“Claude Code exited after an unrecoverable interface error”而退出的问题。

Fixed a rare case where the screen could stop updating for the rest of the session after an internal rendering error.
修复了在内部渲染错误后，屏幕在会话剩余时间内停止更新的罕见情况。

Fixed a rare case on Windows where a turn could stop with an error such as “Out of memory” right after Claude replied, so that reply’s tool calls never ran.
修复了 Windows 上的一种罕见情况：Claude 回复后立即因“Out of memory”等错误停止，导致回复中的工具调用从未执行。

Fixed sessions continued after /clear (restart, --continue, --resume) missing part of their first message when a SessionStart hook printed output, causing a full prompt-cache miss.
修复了在 /clear（重启、--continue、--resume）后继续的会话中，当 SessionStart 钩子打印输出导致完整提示词缓存失效时，第一条消息部分丢失的问题。

Fixed messages from other agents (such as a subagent’s SendMessage) that arrived mid-turn showing up below the “Ran N shell commands” row instead of where they arrived.
修复了回合中途到达的其他代理消息（如子代理的 SendMessage）显示在“Ran N shell commands”行下方而非实际到达位置的问题。

Fixed the “copied” notice not appearing after drag-selecting text in the fullscreen /resume picker and other panels that cover the prompt area.
修复了在全屏 /resume 选择器和其他覆盖提示区域的面板中拖选文本后，“copied”提示不出现的问题。

Fixed `$TMPDIR` expanding empty in Bash commands that run outside the sandbox while sandboxing is enabled.
修复了在启用沙盒时，在沙盒外运行的 Bash 命令中 `$TMPDIR` 展开为空的问题。

Fixed WebFetch and WebSearch in Cowork cloud sessions not telling Claude why a request was refused, such as a used-up fetch budget or an admin policy.
修复了 Cowork 云会话中的 WebFetch 和 WebSearch 未告知 Claude 请求被拒绝原因（如抓取配额用尽或管理策略限制）的问题。

Fixed the Claude apps gateway’s telemetry relay ignoring a collector hostname or domain listed in `NO_PROXY` when a proxy is set.
修复了设置代理时，Claude 应用网关的遥测中继忽略 `NO_PROXY` 中列出的收集器主机名或域名的问题。

Fixed one malformed `strictKnownMarketplaces` or `blockedMarketplaces` entry silently disabling the whole enterprise marketplace policy.
修复了单个格式错误的 `strictKnownMarketplaces` 或 `blockedMarketplaces` 条目静默禁用整个企业市场策略的问题。

Fixed failed auto-updates leaving large staged downloads behind in `~/.cache/claude/staging`.
修复了自动更新失败后在 `~/.cache/claude/staging` 中留下大量暂存下载文件的问题。

Fixed /plugin not stripping terminal control characters from messages on the Installed tab, such as the error of a failed plugin update.
修复了 /plugin 未从“Installed”选项卡的插件消息中去除终端控制字符的问题（例如插件更新失败的错误信息）。

Fixed /plugin → Installed and /skills crashing when a skill or legacy command is named like a built-in Object property such as `constructor` or `toString`.
修复了当技能或旧版命令命名为 `constructor` 或 `toString` 等内置对象属性时，/plugin → Installed 和 /skills 崩溃的问题。

Fixed /plugin closing with no message when every install in a multi-select failed.
修复了在多选安装全部失败时，/plugin 关闭且无任何提示的问题。

Fixed uninstalled plugins reappearing as “failed to load” rows in /plugin Installed, and Remove not clearing such a row.
修复了已卸载的插件在 /plugin Installed 中重新显示为“failed to load”行，且 Remove 无法清除该行的问题。

Fixed plugins from the official marketplace being recorded without their commit in `installed_plugins.json`, and `installed_plugins.json` keeping the old commit after updating a pinned-commit plugin.
修复了来自官方市场的插件在 `installed_plugins.json` 中记录时缺少提交哈希，以及更新固定提交版本的插件后 `installed_plugins.json` 保留旧提交哈希的问题。

Fixed plugin reload previews keeping every previewed copy of a plugin archive unpacked until exit, and overwriting the cached `--plugin-url` archive a reload falls back to when its download fails.
修复了插件重载预览在退出前保留每个预览版插件归档解压副本，并覆盖下载失败时重载回退所用的缓存 `--plugin-url` 归档的问题。

Fixed Remote Control session bookkeeping failing when `~/.claude.json` holds a malformed placeholder record.
修复了当 `~/.claude.json` 包含格式错误的占位符记录时，远程控制会话记账失败的问题。

Fixed the error after a revoked claude.ai login blaming an expired Anthropic profile.
修复了 claude.ai 登录失效后的错误提示错误地归咎于 Anthropic 个人资料过期的问题。