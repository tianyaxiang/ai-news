---
title: "AI SDK 7.0.160 Started Enforcing dataPartSchemas. Your Loading States Might Now Throw"
originalUrl: "https://dev.to/sushilmagare10/ai-sdk-70160-started-enforcing-datapartschemas-your-loading-states-might-now-throw-31a5"
date: "2026-11-03T02:41:31.000Z"
excerpt: false
---

# AI SDK 7.0.160 Started Enforcing dataPartSchemas. Your Loading States Might Now Throw

If you pass dataPartSchemas to useChat and bump ai to 7.0.160 or later, a chat that worked yesterday can end up in status: 'error' with a TypeValidationError. You didn't change anything. Your schemas just started running.

如果您将 dataPartSchemas 传递给 useChat 并将 ai 升级到 7.0.160 或更高版本，昨天还能正常工作的聊天可能会以 TypeValidationError 结束，状态变为 'error'。您什么都没改，只是您的模式（schemas）现在开始生效了。

What changed: useChat and Chat accept dataPartSchemas, keyed by the bare part name (weather for a data-weather part). The stream processor looked the schema up by the full chunk type (data-weather), so the lookup always missed and streamed data parts were never validated. That's issue #24241, fixed in PR #24298 and shipped in ai 7.0.160: "Invalid data parts now raise a TypeValidationError." So a patch release turned on a check that was configured but never ran.

发生了什么变化：useChat 和 Chat 接受 dataPartSchemas，并以原始部分名称（例如 data-weather 部分的 weather）作为键。流处理器此前通过完整的块类型（data-weather）查找模式，因此查找总是失败，流式传输的数据部分也从未被验证。这就是问题 #24241，已在 PR #24298 中修复并随 ai 7.0.160 发布：“无效的数据部分现在会引发 TypeValidationError。” 因此，一个补丁版本开启了一项此前已配置但从未运行的检查。

What I ran: I didn't want to guess at the edge cases, so I drove the Chat class from @ai-sdk/react with a fake transport that replays fixed UI message chunks. No model, no network. useChat runs on that same class (its chat option even takes an existing Chat instance), so the stream handling is the same code path. I ran the same script against ai 7.0.159 with @ai-sdk/react 4.0.163, ai 7.0.162 with @ai-sdk/react 4.0.166, and ai 6.0.322 with @ai-sdk/react 3.0.325, all with zod 4.6.7 on Node 20.19.2.

我的测试方法：我不想猜测边缘情况，因此我使用了一个伪造的传输层来驱动 @ai-sdk/react 中的 Chat 类，该传输层会重放固定的 UI 消息块。没有模型，没有网络。useChat 运行在同一个类上（其 chat 选项甚至可以接收现有的 Chat 实例），因此流处理使用的是相同的代码路径。我针对 ai 7.0.159（配合 @ai-sdk/react 4.0.163）、ai 7.0.162（配合 @ai-sdk/react 4.0.166）以及 ai 6.0.322（配合 @ai-sdk/react 3.0.325）运行了相同的脚本，所有测试均在 Node 20.19.2 环境下使用 zod 4.6.7。

The one that'll bite: progressive updates. The streaming data docs use a progressive pattern: write { city, status: 'loading' } first, then write to the same id again with the real value. The docs type weather as optional (weather?: string), which fits that pattern. But if your zod schema was written for the finished shape, the loading chunk fails now.

最棘手的问题：渐进式更新。流式数据文档使用了一种渐进模式：先写入 { city, status: 'loading' }，然后再次向相同的 ID 写入真实值。文档将 weather 定义为可选类型（weather?: string），这符合该模式。但如果您的 zod 模式是为最终形态编写的，那么加载块现在就会失败。

The fix: Make the schema describe every state the server actually sends. A discriminated union keeps the final shape strict:
const unionSchemas = { weather: z.discriminatedUnion('status', [ z.object({ status: z.literal('loading'), city: z.string() }), z.object({ status: z.literal('success'), city: z.string(), weather: z.string() }), ]), };

修复方法：确保模式描述了服务器实际发送的每一种状态。使用判别联合（discriminated union）可以保持最终形态的严格性：
const unionSchemas = { weather: z.discriminatedUnion('status', [ z.object({ status: z.literal('loading'), city: z.string() }), z.object({ status: z.literal('success'), city: z.string(), weather: z.string() }), ]), };

Before you upgrade, I'd do three things: Search the client for dataPartSchemas. For each data-* type in there, check every writer.write() on the server against its schema, including loading, progress and transient writes. Make sure the UI shows error from useChat. In my runs a failed part stopped the whole response, so a silent failure here looks like a chat that just stops. Data parts with no schema aren't checked at all, so a schema-less type won't start failing.

在升级之前，我建议做三件事：在客户端搜索 dataPartSchemas。对于其中的每一种 data-* 类型，检查服务器上的每一个 writer.write() 是否符合其模式，包括加载、进度和瞬态写入。确保 UI 能显示来自 useChat 的错误。在我的测试中，一个失败的部分会停止整个响应，因此这里的静默失败看起来就像聊天突然中断了一样。没有模式的数据部分根本不会被检查，所以没有模式的类型不会开始报错。