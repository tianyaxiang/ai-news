---
title: "I Built a Capability-Based Security Layer for AI Agents — Here's Why It Matters"
originalUrl: "https://dev.to/shubhbhangoo/i-built-a-capability-based-security-layer-for-ai-agents-heres-why-it-matters-4kfc"
date: "2026-08-22T21:47:35.289Z"
---

# I Built a Capability-Based Security Layer for AI Agents — Here's Why It Matters
# 我为 AI Agent 构建了一个基于能力的安全性层——为什么这很重要

The Problem Nobody's Talking About
AI agents are everywhere now. They book flights, send emails, process payments, and access your codebase. But here's the question nobody asks: Who authorizes which agent can do what?
没人谈论的问题
AI Agent 现在无处不在。它们可以预订航班、发送电子邮件、处理支付并访问你的代码库。但有一个没人问的问题：谁来授权哪个 Agent 可以做什么？

Most people use API keys. An API key is binary — you have it or you don't. If your finance agent's key leaks, someone can drain your account. If your code-review agent gets compromised, it can push malicious commits. There's no middle ground. I kept hitting this wall while building agent prototypes. So I built something to fix it.
大多数人使用 API 密钥。API 密钥是二元的——要么你有，要么没有。如果你的财务 Agent 密钥泄露，别人就能清空你的账户。如果你的代码审查 Agent 被攻破，它就能推送恶意提交。这中间没有缓冲地带。我在构建 Agent 原型时不断遇到这个瓶颈，所以我构建了一个解决方案。

What I Built
Agent Firewall is a capability-based security layer for AI agents. It gives you fine-grained, cryptographically signed permissions with full lifecycle tracking. Instead of giving an agent a key that unlocks everything, you give it a capability:
我构建了什么
Agent Firewall 是一个面向 AI Agent 的基于能力的安全性层。它为你提供细粒度、经过加密签名的权限，并具备完整的生命周期跟踪。与其给 Agent 一个解锁一切的密钥，不如给它一个“能力”（Capability）：

```python
from agent_firewall import FirewallSDK
sdk = FirewallSDK(
    revocation_store_path="revocations.db",
    lifecycle_store_path="lifecycle.db",
)

capability = sdk.issue(
    private_key=private_key,
    agent="finance-agent",
    capability="payments.send",
    constraints={
        "amount_max": 100,
        "expires_at": "2026-08-30T00:00:00Z"
    },
)
```

That agent can now send payments — but only under 100, and only until August 30th. If you revoke the capability, it's dead immediately. If someone replays an old request, it's rejected.
现在该 Agent 可以发送支付请求——但仅限 100 以内，且有效期至 8 月 30 日。如果你撤销该能力，它会立即失效。如果有人重放旧请求，它会被拒绝。

Why Capabilities Beat API Keys
API Keys vs Capabilities:
API Keys: Binary access, No expiration built-in, Can't be narrowed, No audit trail, Leaked = game over.
Capabilities: Granular permissions, Time-bound by default, Can be attenuated (narrowed without increasing authority), Full lifecycle: ISSUED → USED → REVOKED → EXPIRED, Revocable individually.
为什么“能力”优于 API 密钥
API 密钥与“能力”对比：
API 密钥：二元访问、无内置过期机制、无法缩小权限范围、无审计追踪、泄露即意味着彻底完蛋。
“能力”：细粒度权限、默认有时效限制、可衰减（在不增加权限的情况下缩小范围）、完整生命周期：已签发 → 已使用 → 已撤销 → 已过期、可单独撤销。

The Capability Lifecycle
Every capability in Agent Firewall has an explicit lifecycle: ISSUED ↓ DELEGATED ↓ ATTENUATED ↓ USED ↓ REPLAYED ↓ REVOKED ↓ DENIED ↓ EXPIRED.
“能力”的生命周期
Agent Firewall 中的每个“能力”都有明确的生命周期：已签发 ↓ 已委派 ↓ 已衰减 ↓ 已使用 ↓ 已重放 ↓ 已撤销 ↓ 已拒绝 ↓ 已过期。

This isn't just logging — it's security state. You can query whether a capability was used, replayed, or revoked. You can delegate a capability to another agent with reduced authority (your finance agent delegates payments.send with amount_max=50 to a sub-agent). You can attenuate it yourself. And in v0.8, all of this persists to SQLite. Restart your service, and the revocation registry and lifecycle history survive.
这不仅仅是日志记录，更是安全状态。你可以查询某个“能力”是否被使用、重放或撤销。你可以将“能力”委派给另一个权限更小的 Agent（例如你的财务 Agent 将 amount_max=50 的 payments.send 权限委派给子 Agent）。你可以自行对其进行衰减。在 v0.8 版本中，所有这些数据都会持久化到 SQLite。重启服务后，撤销注册表和生命周期历史记录依然存在。

Real-World Boundaries
Agent Firewall isn't just a library — it's a boundary layer.
HTTP boundary: Maps incoming requests to capability namespaces.
MCP boundary: Authorizes Model Context Protocol tool calls before execution.
Both boundaries verify the capability, bind it to the agent identity, check constraints, and apply replay protection before allowing execution.
现实世界的边界
Agent Firewall 不仅仅是一个库，它是一个边界层。
HTTP 边界：将传入请求映射到“能力”命名空间。
MCP 边界：在执行前授权 Model Context Protocol (MCP) 工具调用。
两个边界都会在允许执行前验证“能力”、将其绑定到 Agent 身份、检查约束条件并应用重放保护。

The Story Behind It
Six months ago, I was building COVID detection models for college assignments. Standard undergrad ML stuff. Then I started playing with AI agents — LangChain, CrewAI, AutoGen — and kept running into the same problem: these agents have way too much power by default. An API key doesn't care which agent is calling, what it's doing, or when it should stop working.
背后的故事
六个月前，我还在为大学作业构建新冠检测模型，那是标准的本科机器学习内容。后来我开始尝试 AI Agent（如 LangChain、CrewAI、AutoGen），并不断遇到同一个问题：这些 Agent 默认拥有的权限实在太大了。API 密钥并不关心是谁在调用、在做什么，或者何时应该停止工作。

So I went deep on capability-based security — a model from operating systems research where permissions are unforgeable tokens that can be delegated and attenuated. I built Agent Firewall to bring that model to the agent era. It now has 1,438 passing tests, including adversarial regression coverage. It has architecture docs and a threat model. And yesterday, I shipped v0.8 with SQLite-backed lifecycle persistence.
因此，我深入研究了基于能力的安全性——这是一种源自操作系统研究的模型，其中的权限是不可伪造的令牌，可以被委派和衰减。我构建 Agent Firewall 是为了将该模型引入 Agent 时代。它现在有 1,438 个通过的测试，包括对抗性回归覆盖。它拥有架构文档和威胁模型。昨天，我发布了 v0.8 版本，支持基于 SQLite 的生命周期持久化。

Where It's Going
v1.0 is the next milestone. I'm freezing the API, shipping full documentation, and making this production-ready. The goal is simple: Every AI agent that calls a tool should have an authorization layer that understands who, what, and when.
未来规划
v1.0 是下一个里程碑。我正在冻结 API，编写完整文档，并使其达到生产就绪状态。目标很简单：每个调用工具的 AI Agent 都应该拥有一个能够理解“谁、什么、何时”的授权层。

Check out the repo: github.com/Shubhbhangoo/agent-firewall/tree/v0.8
If you're building agents that call tools — payments, APIs, databases, anything — I'd love your feedback. Drop an issue, open a PR, or just tell me what your authorization setup looks like today.
查看仓库：github.com/Shubhbhangoo/agent-firewall/tree/v0.8
如果你正在构建调用工具（支付、API、数据库等）的 Agent，我很乐意听取你的反馈。提交 Issue、发起 PR，或者直接告诉我你目前的授权设置是什么样的。

I'm Shubh, a fresh CS grad building security infrastructure for the agent era. Follow along as I ship v1.0 and beyond.
我是 Shubh，一名刚毕业的计算机专业学生，正在为 Agent 时代构建安全基础设施。欢迎关注我，见证 v1.0 及后续版本的发布。