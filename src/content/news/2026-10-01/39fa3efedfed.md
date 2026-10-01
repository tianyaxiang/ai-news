---
title: "You said no MCP"
originalUrl: "https://earendil.com/posts/you-said-no-mcp/"
date: "2026-10-01T00:36:59.710Z"
---

# You said no MCP

“You Said No MCP!” Date:Tue, 29 Sep 2026 From:Earendil Engineering <rfc@earendil.com> To:You Subject:“You Said No MCP!”
“你说过不支持 MCP！” 日期：2026年9月29日，周二 发件人：Earendil Engineering <rfc@earendil.com> 收件人：你 主题：“你说过不支持 MCP！”

If you went to pi.dev in the past, you found a proud declaration that Pi does not support MCP. If you listen to podcasts where we talked about Pi, you will have found more than one dismissive statement about MCP from us. Including a post by Mario about it. And yet, if you upgrade to Pi you will find MCP is now a supported piece of functionality. What happened?
如果你过去访问过 pi.dev，你会看到我们自豪地声明 Pi 不支持 MCP。如果你听过我们讨论 Pi 的播客，你会发现我们不止一次对 MCP 表示过不屑，包括 Mario 写过的一篇相关文章。然而，如果你升级到 Pi，你会发现 MCP 现在已经是一项受支持的功能了。发生了什么？

Things Change
世事变迁

The first thing to remember is that the world is not static. We have been paying attention to MCP over the last year and the MCP of today is not the MCP of yesteryear. That alone would not be much of a reason to put it into the core, however. As you know, Pi has a great ecosystem of extensions, surely MCP could have been an extension? Maybe even an Earendil endorsed extension. And yes you are indeed correct in that MCP could have been an extension, as it was. That MCP is now part of the core is a result of us putting our heads together and rethinking it.
首先要记住的是，世界不是静止的。过去一年我们一直在关注 MCP，今天的 MCP 已非昔日的 MCP。不过，单凭这一点还不足以将其纳入核心功能。如你所知，Pi 拥有强大的扩展生态系统，MCP 本可以作为一个扩展存在，甚至可能是 Earendil 官方认可的扩展。你说得对，MCP 确实可以作为扩展，它也确实曾经是。现在它成为核心功能，是因为我们集思广益并重新思考了它的定位。

What Exactly Changed?
究竟改变了什么？

The reason we brought MCP into the core is not just about how MCP has changed, but also because we found that the changes it would require were generally useful. For example, the changes we have made to MCP also enable the use of Jev more easily within Pi. Ultimately what Pi needs is quite similar to what MCP needs: a sandbox to play with in the form of an interpreter. While a lot of things have improved about MCP, quite a few have not. The biggest issue with MCP continues to be that it’s hard to compose. Even with codemode, which is just a neat little sandbox to allow composing of tool calls, MCP doesn’t fully deliver on this.
我们将 MCP 纳入核心，不仅是因为 MCP 本身的变化，还因为我们发现它所要求的改动具有普遍的实用性。例如，我们对 MCP 所做的调整也使得在 Pi 中更轻松地使用 Jev 成为可能。归根结底，Pi 所需的与 MCP 所需的非常相似：一个以解释器形式存在的沙盒环境。虽然 MCP 在很多方面有所改进，但仍有不少问题。MCP 最大的问题依然是难以组合。即使有了 codemode（一个用于组合工具调用的简洁沙盒），MCP 在这方面仍未完全达标。

But that at this point is less the problem of MCP but the MCP servers out there and different approaches of harnesses to work with them. Many MCP servers are still built for harnesses that just dump tools into the context and are trying to optimize on their side for token efficiency by returning text. The way we like to think about MCP at this point is that it should be much closer to OpenAPI with intelligent tool discovery. That means tools should return structured data and tools should be discoverable by their documentation and description.
但目前这与其说是 MCP 的问题，不如说是现有的 MCP 服务器以及与之配合的各种 harness（工具框架）实现方式的问题。许多 MCP 服务器仍是为那些“将工具直接塞入上下文”的 harness 构建的，它们试图通过返回文本来优化 Token 效率。我们现在倾向于认为，MCP 应该更接近于具备智能工具发现功能的 OpenAPI。这意味着工具应该返回结构化数据，并且可以通过文档和描述被发现。

The reason CLIs are so functional is that the agent and model just wire stuff together with efficient bashisms. But there is no fundamental reason why you can’t do that with MCP either. MCP in Pi is just built on exposing those tools to a JavaScript sandbox like other harnesses like Codex do too.
CLI（命令行界面）之所以功能强大，是因为代理和模型通过高效的 Bash 脚本将各种功能串联起来。没有根本理由说明 MCP 不能做到这一点。Pi 中的 MCP 只是将这些工具暴露给 JavaScript 沙盒，就像 Codex 等其他 harness 所做的那样。

MCP in a Modern LLM
现代大模型中的 MCP

This will raise the question why we didn’t just do Codemode without MCP. Part of the answer to this has to do with how tools are expressed in Pi today. We did a lot of work in recent months to allow Pi to make sense with new models that allow deferred tool loading, mid-conversation system messages and reasoning level changes. However we did not yet upgrade our tool loadout to better scale to these new capabilities. In a Codemode world one needs to decide if the tool is available to the LLM or only the codemode part of the LLM. A normal MCP extension does not have enough metadata available from Pi’s tool loadout to make that experience work well.
这引出了一个问题：为什么我们不直接做 Codemode 而非要引入 MCP？部分原因在于 Pi 目前表达工具的方式。近几个月我们做了大量工作，使 Pi 能够适配支持延迟工具加载、对话中系统消息更新以及推理级别变更的新模型。然而，我们尚未升级工具加载机制以更好地扩展这些新能力。在 Codemode 环境中，需要决定工具是提供给 LLM 使用，还是仅提供给 LLM 的 Codemode 部分使用。普通的 MCP 扩展无法从 Pi 的工具加载配置中获取足够的元数据来优化这一体验。

So we needed to ensure that tools can be configured to just be deferred or be a Codemode specific thing. And while we could have just wired up the metadata to enable better MCP extensions, we also think that MCP with Codemode solves quite a few of the issues that it traditionally had. We believe the best way to positively influence something is to embrace it. And while we think that modern MCP is in a much better spot than MCP ever was, the servers and patterns still leave room for improvement. So we want to be part of that conversation and help shape it to work well in small harnesses instead of standing on the sidelines and just watching.
因此，我们需要确保工具可以被配置为“延迟加载”或“Codemode 专用”。虽然我们可以通过配置元数据来增强 MCP 扩展，但我们认为 MCP 结合 Codemode 可以解决它传统上的许多问题。我们相信，积极影响某件事的最好方式就是拥抱它。虽然我们认为现代 MCP 比以往任何时候都要好，但服务器和模式仍有改进空间。因此，我们希望参与其中，帮助塑造它，使其在小型 harness 中也能良好运行，而不是站在场边旁观。

What Is Codemode?
什么是 Codemode？

Now we talked so much about Codemode, it might be worth explaining what that even is. When a harness executes tools, for the most part it has two sides: it can do it where bash runs, or it can do it where the harness agent loop runs. The trust level on both sides is very different. The harness loop quite often runs in an environment that is trusted, whereas the tools it executes often run within a sandbox that is not really all that trusted.
既然我们谈了这么多 Codemode，有必要解释一下它到底是什么。当 harness 执行工具时，通常有两个侧面：它可以在 Bash 运行的地方执行，也可以在 harness 代理循环运行的地方执行。这两侧的信任级别截然不同。Harness 循环通常运行在受信任的环境中，而它执行的工具往往运行在不太受信任的沙盒中。

Codemode is special in that it runs where the harness runs. It’s best understood as a mechanism to orchestrate and coordinate tool calls. It’s a sandbox that allows an agent to issue those tool calls in a way that gives it more flexibility about in which order it should do it, and it allows it to use JavaScript to combine them together. Because Codemode also runs on the harness side, its state is also maintained as part of the session transcript instead of the file system.
Codemode 的特殊之处在于它运行在 harness 所在的地方。最好将其理解为一种编排和协调工具调用的机制。它是一个沙盒，允许代理以更灵活的方式发出工具调用，决定执行顺序，并允许使用 JavaScript 将它们组合在一起。由于 Codemode 也运行在 harness 端，其状态作为会话记录的一部分进行维护，而不是存储在文件系统中。

Now in theory any language could do, but JavaScript is quite attractive as small versions of JavaScript can be shipped as WASM binaries and allow reasonable levels of protection. In Pi, Codemode is automatically loaded when MCP is configured, or it can be added to the configuration as a default tool. Just ask pi to reconfigure itself to enable codemode!
理论上任何语言都可以做到这一点，但 JavaScript 非常有吸引力，因为小型的 JavaScript 版本可以作为 WASM 二进制文件发布，并提供合理的保护级别。在 Pi 中，当配置 MCP 时，Codemode 会自动加载，或者可以将其作为默认工具添加到配置中。只需让 Pi 重新配置以启用 codemode 即可！

You can then use it for quite interesting things, not just MCP. For instance when you are logged in with a provider that provides “Jev” you can do things like this: Use typesafe/jev via codemode to find the 20 most frustrated commenters on our issue tracker And it will cleverly combine things like the Linear MCP and Jev to do that analysis, right from within Pi, without wasting any context at all.
你可以用它做很多有趣的事情，不仅仅是 MCP。例如，当你登录了一个提供“Jev”的供应商时，你可以这样做：通过 codemode 使用 typesafe/jev 找出我们问题追踪器中最沮丧的 20 位评论者。它会巧妙地结合 Linear MCP 和 Jev 来进行分析，直接在 Pi 内部完成，完全不会浪费任何上下文。

> Use typesafe/jev via codemode to find the most frustrated people on our issue tracker I'll pull the open issues from Linear and let Jev rate the tone of each thread, four at a time. codemode const { issues } = await tools.mcp__linear__list_issues({ team: "Pi", state: "open", limit: 250, }); const jev = await models.getModelOfType( "classifier", "cloudflare-workers-ai", "typesafe/jev", ); const questions = { fr
> 通过 codemode 使用 typesafe/jev 找出我们问题追踪器中最沮丧的人。我将从 Linear 拉取未解决的问题，并让 Jev 对每个线程的语气进行评分，每次处理四个。codemode const { issues } = await tools.mcp__linear__list_issues({ team: "Pi", state: "open", limit: 250, }); const jev = await models.getModelOfType( "classifier", "cloudflare-workers-ai", "typesafe/jev", ); const questions = { fr