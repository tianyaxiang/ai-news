---
title: "GitHub's New Webhook IP Ranges: An Allowlist Is Not a Signature"
originalUrl: "https://dev.to/marcusykim/githubs-new-webhook-ip-ranges-an-allowlist-is-not-a-signature-50i8"
date: "2026-11-01T00:05:53.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# GitHub's New Webhook IP Ranges: An Allowlist Is Not a Signature

Your app stops receiving GitHub events. An AI assistant spots a changed network range and suggests opening the webhook endpoint to more traffic. That may solve the connection problem. It does not answer whether your app should trust each message that arrives. This article was prepared with AI assistance. The examples below are proposed review exercises, not reports of a production system I tested.

如果您的应用程序停止接收 GitHub 事件，AI 助手可能会发现网络范围发生了变化，并建议向更多流量开放 Webhook 端点。这或许能解决连接问题，但它无法回答您的应用程序是否应该信任收到的每一条消息。本文是在 AI 辅助下编写的。以下示例仅为建议的审查练习，并非我所测试的生产系统报告。

On October 29, GitHub announced additional webhook IP ranges. Teams maintaining static allowlists need to include the additions; systems already refreshing from the Meta API do not need a separate change for this update. The announcement applies to webhook deliveries on github.com, including Enterprise Cloud.

10 月 29 日，GitHub 宣布了额外的 Webhook IP 范围。维护静态白名单的团队需要将这些新增内容包含在内；而已经通过 Meta API 自动刷新的系统则无需为此更新进行单独更改。该公告适用于 github.com（包括 Enterprise Cloud）上的 Webhook 交付。

The practical lesson for a first app is bigger than updating a list. Separate three questions: can this request reach the handler, is the body authentic, and is this event allowed to trigger the requested action? Three checks, three different answers.

对于初次开发应用程序的人来说，实际经验远不止更新列表那么简单。请区分三个问题：请求能否到达处理程序？消息体是否真实？该事件是否被允许触发所请求的操作？这三个检查对应三个不同的答案。

Imagine a small app that creates a preview task when a repository receives a pull request. This is a hypothetical design, not a description of an existing service. Its network filter decides which connections can reach the webhook route. Its signature check decides whether the received bytes match a message authenticated with the configured shared secret. Its application logic decides whether this repository, event, and action belong in the preview workflow.

设想一个小型应用程序，当存储库收到拉取请求（Pull Request）时，它会创建一个预览任务。这是一个假设的设计，而非现有服务的描述。其网络过滤器决定哪些连接可以到达 Webhook 路由；其签名检查决定接收到的字节是否与使用配置的共享密钥进行身份验证的消息相匹配；其应用程序逻辑则决定该存储库、事件和操作是否属于预览工作流。

A pass at the first step should not silently count as a pass at the other two. For example, a correctly signed event from the wrong repository is still the wrong input for that project's preview workflow. And a delivery from an allowed network address with an invalid signature should not create a task merely because it got through the firewall.

第一步通过不应被默认为后两步也已通过。例如，来自错误存储库但签名正确的事件，对于该项目的预览工作流来说仍然是错误的输入。同样，来自允许的网络地址但签名无效的交付，也不应仅仅因为它穿过了防火墙就创建任务。

That separation is useful when reviewing AI-generated code: ask the assistant to point to the exact check that answers each question. My $3 Starter Prompts offer a guided starting point for that kind of review, but you can use the exercise below without buying anything.

在审查 AI 生成的代码时，这种分离非常有用：要求助手指出回答每个问题的具体检查点。我的 3 美元入门提示词（Starter Prompts）为这类审查提供了一个引导起点，但您无需购买任何东西即可使用下方的练习。

Fix the network layer without removing the next check. GitHub's announcement lists three added CIDR ranges: 9.234.98.160/28, 9.234.98.176/28, and 9.234.106.48/28. Treat those as the dated announcement, not a permanent complete allowlist. The Meta API documentation describes the endpoint used to retrieve GitHub's address information. For webhook filtering, use the current hooks collection. A copied documentation example is not a promise that your firewall has today's complete list.

修复网络层时不要移除后续检查。GitHub 的公告列出了三个新增的 CIDR 范围：9.234.98.160/28、9.234.98.176/28 和 9.234.106.48/28。请将这些视为过时的公告，而非永久完整的白名单。Meta API 文档描述了用于检索 GitHub 地址信息的端点。对于 Webhook 过滤，请使用当前的 hooks 集合。复制的文档示例并不能保证您的防火墙拥有当今完整的列表。

For a practice project, I would ask for a short operational note with four facts: where the configured list lives, who updates it, when it was last refreshed, and how a rejected connection becomes visible. The note should not contain secrets or private payloads. If events disappear again, that gives you a specific first check. Did the request reach your application at all? If not, changing the signature validator will not repair the network path. Keep the layers separate while investigating.

对于练习项目，我会要求编写一份简短的操作说明，包含四个事实：配置列表存放在哪里、由谁更新、上次刷新时间以及被拒绝的连接如何可见。该说明不应包含密钥或私有负载。如果事件再次消失，这为您提供了第一个具体的检查点：请求是否到达了您的应用程序？如果没有，更改签名验证器将无法修复网络路径。在调查时请保持各层独立。

Validate the bytes you actually received. GitHub's signature-validation guide uses HMAC-SHA256 with a webhook secret and the X-Hub-Signature-256 header. Validation needs the original payload bytes, with a constant-time comparison rather than ordinary string equality. Its JavaScript example uses @octokit/webhooks. This is where I would resist a convenient-looking shortcut. Parsing JSON and then serializing it again can change the representation. A semantically equivalent object is not necessarily the exact byte sequence that was signed.

验证您实际接收到的字节。GitHub 的签名验证指南使用 HMAC-SHA256、Webhook 密钥和 X-Hub-Signature-256 标头。验证需要原始负载字节，并使用恒定时间比较而非普通的字符串相等性检查。其 JavaScript 示例使用了 @octokit/webhooks。在这里，我建议抵制看似方便的捷径。解析 JSON 然后再次序列化可能会改变其表示形式。语义上等效的对象并不一定是签名的确切字节序列。

Review middleware ordering so the verifier gets the original body before transformations. Prefer a maintained validation library and the framework's documented raw-body handling over an improvised cryptography helper. Then test the integration around that library. A correct dependency cannot compensate for passing it the wrong body or selecting the wrong secret. Never put the secret in a screenshot, article comment, log message, or URL while debugging. You need evidence that verification succeeded or failed, not a copy of the credential that makes it work.

检查中间件的顺序，确保验证器在转换之前获取原始消息体。比起临时编写的加密辅助工具，更推荐使用维护良好的验证库和框架文档中记录的原始主体处理方式。然后围绕该库测试集成。正确的依赖项无法弥补传入错误主体或选择错误密钥的问题。调试时，切勿将密钥放入截图、文章评论、日志消息或 URL 中。您需要的是验证成功或失败的证据，而不是使其生效的凭据副本。

Write the rejection cases before the happy path. Here is the review exercise I would give an AI assistant for the hypothetical preview app: A valid test delivery from the intended repository creates exactly one preview task. A request with no signature creates no task. A request whose body changes after signing creates no task. A correctly signed event for a different repository creates no task for this project. An event with an unsupported action is ignored without starting preview work. Reprocessing the same accepted delivery does not create a second task.

在编写正常路径之前，先编写拒绝情况。以下是我会给假设的预览应用程序的 AI 助手布置的审查练习：来自目标存储库的有效测试交付应恰好创建一个预览任务；没有签名的请求不应创建任务；签名后主体发生变化的请求不应创建任务；针对不同存储库的正确签名事件不应为本项目创建任务；不支持的操作事件应被忽略，且不启动预览工作；重新处理同一个已接受的交付不应创建第二个任务。

These are proposed acceptance criteria. A generated test file is not evidence that they passed. Run the tests and inspect both the result and the side effect, including the absence of a task in rejection cases. For the final case, two simultaneous workers are more revealing than two sequential requests. Ask what prevents both workers from deciding that the same delivery is new. The answer should identify the durable uniqueness check or transaction, not only a comment saying duplicates are handled.

这些是建议的验收标准。生成的测试文件并不能证明它们已通过。运行测试并检查结果和副作用，包括在拒绝情况下任务确实未被创建。对于最后一种情况，两个并发的工作进程比两个顺序请求更能说明问题。询问是什么阻止了两个工作进程同时判定同一个交付是新的。答案应指出持久的唯一性检查或事务，而不仅仅是一句“已处理重复项”的注释。

A successful response needs a precise meaning. GitHub's webhook best practices recommend checking event type and action, responding within ten seconds, and considering asynchronous processing. They also explain that a requested redelivery keeps the original X-GitHub-Delivery value. For the example app, I would make an acknowledgment mean the accepted work was durably recorded, not that every downstream step finished. Otherwise a fast success response could hide lost work, or a slow build could make delivery appear to fail even though processing started. That is a design decision to test, not a reason to build a large queueing system for every toy project. Keep the implementation small enough to explain. Document what is stored before acknowledgment and what happens if the worker stops afterward.

成功的响应需要精确的含义。GitHub 的 Webhook 最佳实践建议检查事件类型和操作，在十秒内响应，并考虑异步处理。他们还解释说，请求的重新交付会保留原始的 X-GitHub-Delivery 值。对于示例应用程序，我会将“确认”定义为已接受的工作已被持久记录，而不是所有下游步骤都已完成。否则，快速的成功响应可能会掩盖丢失的工作，或者缓慢的构建可能会使交付看起来失败，即使处理已经开始。这是一个需要测试的设计决策，而不是为每个玩具项目构建大型排队系统的理由。保持实现足够简单以便解释。记录在确认之前存储了什么，以及如果工作进程在此之后停止会发生什么。