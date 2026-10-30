---
title: "Claude Code regularly sends each background agent’s transcript to its model"
originalUrl: "https://gist.github.com/flamerix-ai/c3905705cc4205e5de3011fa2e74efce"
date: "2026-10-29T03:33:42.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

Claude Code regularly sends each background agent’s transcript to its model

Claude Code 会定期将每个后台代理的完整记录发送给其模型

Instantly share code, notes, and snippets.

即时分享代码、笔记和片段。

by Flamerix AI · MIT License

作者：Flamerix AI · MIT 许可证

Tested on Linux, Claude Code 2.1.257–2.1.312; macOS reported working by others (see Tested versions). The binary is not modified (BUN_OPTIONS=--preload). An update can silently undo it, so see Verify.

已在 Linux 上测试，适用于 Claude Code 2.1.257–2.1.312；据他人报告在 macOS 上也可行（参见“测试版本”）。二进制文件未被修改（使用 BUN_OPTIONS=--preload）。更新可能会静默撤销此操作，因此请参阅“验证”。

Every ~30 seconds, Claude Code re-sends each background agent's full transcript to the model just to fill that agent's status line in the agents panel. no-agent-summary.js is a Bun --preload that stops that timer without modifying the Claude Code binary.

每隔约 30 秒，Claude Code 就会将每个后台代理的完整记录重新发送给模型，仅仅是为了填充代理面板中该代理的状态行。no-agent-summary.js 是一个 Bun --preload 脚本，它可以在不修改 Claude Code 二进制文件的情况下停止该计时器。

To make it permanent for every Claude Code process, see Install.

若要使其对每个 Claude Code 进程永久生效，请参阅“安装”。

Every ~30 seconds, for every background agent, Claude Code sends that agent's entire transcript to the agent's own model (usually Opus) and asks it to "describe your most recent action in 3-5 words". The answer only updates the agent's status line in the agents panel; it never reaches the model or your conversation. There is no setting that turns it off, and since 2.1.232 (August 2026) it has been on by default.

每隔约 30 秒，Claude Code 就会为每个后台代理将其完整记录发送给代理自身的模型（通常是 Opus），并要求其“用 3-5 个词描述你最近的操作”。该回答仅更新代理面板中的状态行；它绝不会到达模型或你的对话中。目前没有设置可以将其关闭，且自 2.1.232 版本（2026 年 8 月）起，该功能默认为开启状态。

The anomaly was detected by DRIM in Claude Code's OpenTelemetry export: grouping claude_code.api_request events by query_source showed agent_summary costing more than the main conversation itself.

这一异常是由 DRIM 在 Claude Code 的 OpenTelemetry 导出数据中检测到的：按 query_source 对 claude_code.api_request 事件进行分组显示，agent_summary 的成本甚至超过了主对话本身。

Spend here means Claude Code's own per-request estimate (cost_usd), not an invoice: on a subscription, what you lose is rate-limit headroom. We are not the only ones who measured it: #86879 collects four independent measurements of 18–26 %.

此处的“花费”是指 Claude Code 自身的单次请求估算值 (cost_usd)，而非账单金额：在订阅模式下，你损失的是速率限制的余量。我们并非唯一测量过此数据的人：#86879 收集了四项独立的测量结果，显示其占比为 18–26%。

no-agent-summary.js is a Bun preload (~70 lines of code). It wraps only the global setTimeout, the one the summary timer is armed through; when a callback's source text contains a summarizer anchor (e.g. the [AgentSummary] Timer fired log line), it returns an inert handle instead of arming the timer. Every other timer passes through untouched. In the OpenTelemetry export the suppressed requests are claude_code.api_request events with query_source = agent_summary.

no-agent-summary.js 是一个 Bun 预加载脚本（约 70 行代码）。它仅封装了全局的 setTimeout，即摘要计时器所使用的那个；当回调函数的源代码包含摘要器锚点（例如 [AgentSummary] Timer fired 日志行）时，它会返回一个无效句柄，而不是启动计时器。所有其他计时器均不受影响。在 OpenTelemetry 导出数据中，被抑制的请求是 query_source 为 agent_summary 的 claude_code.api_request 事件。

Why a timer hook rather than something simpler: the module ships as precompiled Bun bytecode, so editing its JS text inside the binary changes nothing, and the API client does not go through a wrapped globalThis.fetch. But Function.prototype.toString still returns a callback's source even when it runs from bytecode, so the timer can be recognised by a string inside it. The inert timer uses exactly 2³¹−1 ms: Node and Bun treat a larger delay as 1 ms, so an "infinite" delay would fire at once.

为什么使用计时器钩子而不是更简单的方法：该模块以预编译的 Bun 字节码形式发布，因此编辑二进制文件内的 JS 文本不会有任何改变，且 API 客户端并未通过封装的 globalThis.fetch。但即使在字节码中运行，Function.prototype.toString 仍然会返回回调函数的源代码，因此可以通过其中的字符串识别出该计时器。无效计时器精确使用 2³¹−1 毫秒：Node 和 Bun 会将更大的延迟视为 1 毫秒，因此“无限”延迟会立即触发。

The hook installs only inside Claude Code: Bun.main must be /$bunfs/root/cli (the compiled entry, the same on every row below) and process.execPath must be a Claude Code install. Any other bun, or a compiled Bun binary with another entry name, loads the file and does nothing.

该钩子仅在 Claude Code 内部安装：Bun.main 必须是 /$bunfs/root/cli（编译后的入口点，下文每一行都相同），且 process.execPath 必须是 Claude Code 的安装路径。任何其他 bun，或具有不同入口名称的已编译 Bun 二进制文件，在加载该文件后都不会执行任何操作。

macOS and Windows are not measured; the hook installs there only if they produce these same shapes, and Verify step 1 tells you. One known pass-through: a foreign binary built with bun build --compile --outfile cli and renamed claude; there, only timers whose callback carries an anchor change.

macOS 和 Windows 未经测量；只有当它们产生相同的结构时，钩子才会安装在那里，验证步骤 1 会告诉你结果。一种已知的穿透情况是：使用 bun build --compile --outfile cli 构建并重命名为 claude 的外部二进制文件；在这种情况下，只有回调函数带有锚点的计时器会发生变化。

Put no-agent-summary.js somewhere stable; note its absolute path.

将 no-agent-summary.js 放在一个稳定的位置；记录其绝对路径。

Set BUN_OPTIONS globally so every Claude Code process gets it. Write --preload=<path>, with =: BUN_OPTIONS reaches every bun on the machine, and with a space (--preload <path>) bun subcommands break (bun install → error: Script not found "install"). Claude Code reads both forms. One of:

全局设置 BUN_OPTIONS，以便每个 Claude Code 进程都能获取它。使用 --preload=<path>，并带上等号：BUN_OPTIONS 会作用于机器上的每一个 bun；如果使用空格（--preload <path>），bun 子命令会崩溃（例如 bun install 会报错：Script not found "install"）。Claude Code 可以读取这两种格式。请使用以下其中一种：

Or a wrapper named claude earlier on PATH (the case keeps it idempotent when one Claude Code process starts another, and also recognises the v2 space form):

或者在 PATH 中设置一个名为 claude 的包装器（这种方式在 Claude Code 进程启动另一个进程时保持幂等性，并且也能识别 v2 的空格格式）：

Restart the daemon and every already-running session, then start Claude Code from an environment that has BUN_OPTIONS:

重启守护进程和所有已运行的会话，然后从包含 BUN_OPTIONS 的环境中启动 Claude Code：

Expect preload active mode=off …. No line: BUN_OPTIONS did not reach the process, or the path is not absolute.

预期输出应包含 preload active mode=off…。如果没有该行：说明 BUN_OPTIONS 未到达该进程，或者路径不是绝对路径。

Timer suppressed: with the same BUN_OPTIONS and CC_AGENT_SUMMARY_LOG=/tmp/nas.log, run a background subagent for a minute or two. The log shows summary timer #1 suppressed (setTimeout, delay=30000) and the agent's panel status stops updating. If you export OpenTelemetry, query_source = agent_summary should stay at zero; this is the only check that catches every failure mode.

计时器已抑制：在相同的 BUN_OPTIONS 和 CC_AGENT_SUMMARY_LOG=/tmp/nas.log 环境下，运行一个后台子代理一两分钟。日志会显示 summary timer #1 suppressed (setTimeout, delay=30000)，且代理面板的状态停止更新。如果你导出 OpenTelemetry，query_source = agent_summary 的值应保持为零；这是唯一能捕获所有故障模式的检查方法。

Matching is by source text: an anchor must sit inside the callback passed to the timer. If an update breaks that, the hook matches nothing and summaries silently come back. Ways it can happen:

匹配是基于源代码文本的：锚点必须位于传递给计时器的回调函数内部。如果更新破坏了这一点，钩子将无法匹配，摘要功能会静默恢复。可能发生的情况包括：

So re-run Verify after every update.

因此，每次更新后请重新运行“验证”。

Linux x64 binary from npm @anthropic-ai/claude-code-linux-x64 (its sha256 equals the native installer's manifest.json checksum). Static: the extracted bundle's summary timer callback carries a hook anchor. Live: claude -p --model haiku with CLAUDE_CODE_AGENT_PROGRESS_SUMMARIES=1, one subagent doing 8 steps of ~20 s, counting [AgentSummary] Forking in --debug-file.

来自 npm @anthropic-ai/claude-code-linux-x64 的 Linux x64 二进制文件（其 sha256 与原生安装程序的 manifest.json 校验和相等）。静态：提取出的包中的摘要计时器回调带有钩子锚点。实时：使用 claude -p --model haiku 并设置 CLAUDE_CODE_AGENT_PROGRESS_SUMMARIES=1，一个子代理执行 8 个约 20 秒的步骤，在 --debug-file 中统计 [AgentSummary] Forking。

The two v3 rows are this script, re-run on 2026-10-29. The rows below them were measured with v2.

两个 v3 行是此脚本，于 2026 年 10 月 29 日重新运行。它们下方的行是使用 v2 测量的。

5 / 5 / 0 = the fork happens on this version, merely loading the hook changes nothing, and off removes it.

5 / 5 / 0 = 分叉发生在此版本上，仅加载钩子不会改变任何东西，关闭它则会移除钩子。

On claude -p: headless runs don't arm the summary timer by default. Our live tests set CLAUDE_CODE_AGENT_PROGRESS_SUMMARIES=1 for that reason. The default-on overhead is in interactive sessions with background agents.

在 claude -p 上：无头运行默认不会启动摘要计时器。我们的实时测试因此设置了 CLAUDE_CODE_AGENT_PROGRESS_SUMMARIES=1。默认开启的开销存在于带有后台代理的交互式会话中。

In our telemetry its weekly share of spend went from 3.5–7 % in July (the fork gate was already open for us) to 7.3 % and then 11.8 % in the week we picked up 2.1.233, and to about 16 % by mid-October.

在我们的遥测数据中，其每周花费占比从 7 月的 3.5–7%（当时分叉门对我们已经开启）上升到 7.3%，在我们采用 2.1.233 版本的那一周上升到 11.8%，到 10 月中旬达到约 16%。

MIT © 2026 Flamerix AI. Provided as is, without warranty of any kind; you use it at your own risk. Flamerix AI is not liable for any damage, data loss or account action arising from its use. Changing a client's runtime behaviour may conflict with the terms of the service you use it with; checking that is on you.

MIT © 2026 Flamerix AI。按“原样”提供，不提供任何形式的保证；使用风险由你自行承担。Flamerix AI 对因使用此工具而导致的任何损害、数据丢失或账户操作不承担责任。更改客户端的运行时行为可能与你所使用的服务条款冲突；请自行核实。

"Claude" and "Claude Code" are trademarks of Anthropic, PBC. This project is independent and is not affiliated with, sponsored or endorsed by Anthropic.

“Claude”和“Claude Code”是 Anthropic, PBC 的商标。本项目是独立的，与 Anthropic 无关联，未受其赞助或认可。

Heads up on the global BUN_OPTIONS install. With a space, --preload /path, every bun subcommand breaks: on bun 1.4.3 bun install, add, test, build and x all fail with Script not fou

关于全局 BUN_OPTIONS 安装的提示。如果使用空格（--preload /path），每个 bun 子命令都会崩溃：在 bun 1.4.3 上，bun install、add、test、build 和 x 都会失败，并报错 Script not fou