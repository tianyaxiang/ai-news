---
title: "Apple's Siri AI Can Be Swapped Out for Claude, ChatGPT, Code Shows"
originalUrl: "https://www.macrumors.com/2026/09/14/siri-can-be-swapped-out-for-chatgpt-claude/"
date: "2026-09-14T23:54:58.951Z"
---

# Apple's Siri AI Can Be Swapped Out for Claude, ChatGPT, Code Shows
# 代码显示：苹果 Siri AI 可被替换为 Claude 或 ChatGPT

Code sleuth "pdfu" has uncovered iOS 27 and macOS Golden Gate private frameworks that show Apple has designed its new Siri architecture to work with third-party AI models at what appears to be a surprisingly deep level.
代码侦探“pdfu”在 iOS 27 和 macOS Golden Gate 的私有框架中发现，苹果已将其新的 Siri 架构设计为能以极其深入的方式与第三方 AI 模型协同工作。

One mechanism called Model Delegation allows Claude to appear as a Siri extension in the same way as the existing built-in ChatGPT extension. In pdfu's video, shared on X, the macOS user brings up the "Search or Ask" bar and chooses Claude as the AI model via an "Ask..." contextual menu.
一种名为“模型委派”（Model Delegation）的机制允许 Claude 以与现有的内置 ChatGPT 扩展相同的方式，作为 Siri 扩展出现。在 pdfu 分享于 X 平台的视频中，macOS 用户调出“搜索或询问”（Search or Ask）栏，并通过“询问...”上下文菜单选择了 Claude 作为 AI 模型。

After enabling the Claude extension, the user asks Siri to "Ask Claude" to set a reminder in Apple's Reminders app. Claude then interprets the natural language reminder request and Siri subsequently creates the reminder. The implication is that if the request requires access to an Apple system feature, Claude hands the task back to Siri.
在启用 Claude 扩展后，用户要求 Siri“询问 Claude”在苹果的“提醒事项”应用中设置一个提醒。Claude 随后解析了自然语言提醒请求，Siri 则负责创建该提醒。这意味着如果请求需要访问苹果的系统功能，Claude 会将任务交还给 Siri 处理。

In another example, Claude can be seen in a Siri app conversation window receiving a request to create a CSV file – something Siri itself cannot handle – and successfully returning the result.
在另一个示例中，可以看到 Claude 在 Siri 应用的对话窗口中接收了创建 CSV 文件的请求（这是 Siri 本身无法处理的任务），并成功返回了结果。

What's more intriguing is the second protocol demonstrated in the video that appears to go considerably further, and could really open up the AI landscape for Apple software requests. An inference provider in "Model Manager Services" apparently allows Apple's own server-side Siri model to be completely replaced by another model, such as GPT-5.6.
更引人注目的是视频中演示的第二个协议，它似乎走得更远，并可能真正为苹果软件请求打开 AI 生态的大门。“模型管理服务”（Model Manager Services）中的推理提供程序显然允许苹果自有的服务器端 Siri 模型被完全替换为其他模型，例如 GPT-5.6。

In this scenario, ChatGPT receives Apple's Siri planner prompt and tool definitions, which enables it to request system actions, receive the resulting personal data, and formulate an answer that Siri presents using its own interface and voice.
在这种情况下，ChatGPT 会接收苹果 Siri 的规划器提示词和工具定义，这使其能够请求系统操作、接收生成的个人数据，并制定出由 Siri 使用其自身界面和语音呈现的回答。

> And here's an app extension replacing Siri AI's server model with GPT-5.6 Terra. It uses the Inference Providing protocol in Model Manager Services. GPT-5.6 receives Apple's native Siri planner prompt and tool definitions. It can make tool calls that perform system actions, and... pic.twitter.com/cz88kyq3io
> — pdfu (@itspdfu) September 13, 2026
>
> 这是一个将 Siri AI 服务器模型替换为 GPT-5.6 Terra 的应用扩展。它使用了“模型管理服务”中的推理提供协议。GPT-5.6 接收苹果原生的 Siri 规划器提示词和工具定义。它可以进行执行系统操作的工具调用，并且…… pic.twitter.com/cz88kyq3io
> — pdfu (@itspdfu) 2026年9月13日

In the demonstration video, the user asks the ChatGPT model (within the Siri app) to find emails about a specific topic, summarize their contents and action points, then send a message to a person in the user's contacts via the Messages app. The response is then shown as logged in OpenAI's platform web interface.
在演示视频中，用户要求（Siri 应用内的）ChatGPT 模型查找关于特定主题的电子邮件，总结其内容和行动要点，然后通过“信息”应用向联系人发送消息。随后，响应结果显示在 OpenAI 平台的网页界面中。

The European Union's Digital Markets Act may have helped shape Apple's approach here, as it requires Apple to give third parties effective access to iOS hardware and software features available to Apple's own services, and the European Commission has specifically said this principle extends to Siri.
欧盟的《数字市场法案》（DMA）可能促成了苹果采取这一方案，因为该法案要求苹果向第三方提供对其自身服务所使用的 iOS 硬件和软件功能的有效访问权限，而欧盟委员会已明确表示这一原则同样适用于 Siri。

The "Ask..." implementation is currently limited to the ChatGPT extension in the macOS 27 Golden Gate Release Candidate (which is effectively the final version of the software set to be released later today), so Claude is not yet available. Meanwhile, Apple has not yet opened up the model delegation entitlement to third parties and it isn't front-facing to users, but it at least shows how extensively Apple has engineered Siri for future model interoperability.
“询问...”功能的实现目前在 macOS 27 Golden Gate 候选发布版（实际上是今天晚些时候即将发布的最终版本）中仅限于 ChatGPT 扩展，因此 Claude 尚不可用。与此同时，苹果尚未向第三方开放模型委派权限，该功能也尚未面向用户开放，但这至少表明苹果已为未来的模型互操作性对 Siri 进行了深度的工程设计。