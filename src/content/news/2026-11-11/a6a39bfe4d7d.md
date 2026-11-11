---
title: "Amazon saves millions by replacing Sonnet 4.6 with Strands Decider"
originalUrl: "https://strandsagents.com/blog/amazon-saves-millions-replacing-sonnet-with-strands-decider/"
date: "2026-11-10T06:01:08.000Z"
excerpt: false
---

For a while, Amazon and AWS teams relied on Claude Sonnet 4.6 to label tickets in an internal system without breaking the bank.

有一段时间，亚马逊和 AWS 团队依靠 Claude Sonnet 4.6 来标记内部系统中的工单，且无需花费巨资。

Sonnet 4.6 fit the goldilocks choice of balancing intelligence with cost. Considering it dealt with one of the world’s largest internal ticketing systems, the nine month old model did well. However, two Amazon engineers recently swapped out Sonnet 4.6 for Strands Decider, a decision model we launched a month ago, that performed just as well at 98% less cost. This change will save millions of dollars of token costs in a year.

Sonnet 4.6 在智能与成本之间取得了完美的平衡。考虑到它处理的是全球最大的内部工单系统之一，这个九个月大的模型表现良好。然而，两位亚马逊工程师最近用我们一个月前推出的决策模型 Strands Decider 替换了 Sonnet 4.6，该模型在成本降低 98% 的情况下表现同样出色。这一改变将在一年内节省数百万美元的 Token 成本。

Carr and Mehul, who work on the internal ticketing system, walk through how this happened below.

负责该内部工单系统的 Carr 和 Mehul 在下文中介绍了这一过程。

We had Sonnet 4.6 labeling tickets at enormous scale. The tickets could be customer escalations, capacity requests, automated alarms, security findings, or anything else across the company that needed to fit within 20 category types. The agent ran with a long system prompt on every ticket, generating JSON and reasoning against a fixed set of labels.

我们曾使用 Sonnet 4.6 对海量工单进行标记。这些工单可能是客户升级投诉、容量请求、自动警报、安全调查结果，或是公司内部任何需要归入 20 种类别之一的事项。该代理在处理每张工单时都会运行一个冗长的系统提示词，生成 JSON 并针对一组固定的标签进行推理。

A decision model can’t generate text. It’s first given some state and a question with a set of options, then the decision model returns a probability for each option plus a confidence score. We saw this method fit perfectly with ticket labeling: the state is the ticket, the options are the label catalog.

决策模型无法生成文本。它首先被赋予某种状态和一个带有选项的问题，然后决策模型会返回每个选项的概率以及置信度分数。我们发现这种方法非常适合工单标记：状态即工单，选项即标签目录。

We started with the original Strands Decider 2B. On a test set of tickets, the E4B Gemma 4 build got clearly better results, so we switched to it. Afterwards, we tuned how confident the model needed to be before applying a label. The results showed E4B beating production Sonnet on a separate set of our tickets.

我们从最初的 Strands Decider 2B 开始。在一组测试工单上，E4B Gemma 4 版本获得了明显更好的结果，因此我们切换到了该版本。随后，我们调整了模型在应用标签前所需的置信度。结果显示，在另一组工单上，E4B 的表现优于生产环境中的 Sonnet。

We ran E4B on SageMaker ml.g5.xlarge instances (one A10G, 24 GB each). The model used about 19 GiB, and one request took about 640 ms on one instance. The endpoint autoscales with traffic, but its network was isolated, preventing outbound access to the container. SageMaker copies the model weights in from S3 before start-up.

我们在 SageMaker ml.g5.xlarge 实例（每个实例配备一个 A10G，24 GB 显存）上运行 E4B。该模型占用约 19 GiB 内存，单个请求在单个实例上耗时约 640 毫秒。端点会随流量自动扩展，但其网络是隔离的，防止了对容器的出站访问。SageMaker 在启动前会从 S3 复制模型权重。

Customers can do this too! Apart from our ticketing APIs, everything in the path is a standard AWS service. Ticket events land in an SQS queue that then triggers a Lambda function. It reads the ticket data and calls the model, a SageMaker AI Endpoint with Strands Decider. AppConfig holds the switch (described below), and CloudWatch carries the logs, metrics and alarms. The stack is defined in CDK with deployment stages for Beta, Gamma, and Prod.

客户也可以这样做！除了我们的工单 API 外，路径中的所有内容都是标准的 AWS 服务。工单事件进入 SQS 队列，然后触发 Lambda 函数。它读取工单数据并调用模型，即带有 Strands Decider 的 SageMaker AI 端点。AppConfig 用于控制开关（下文详述），CloudWatch 则负责日志、指标和警报。该堆栈在 CDK 中定义，并设有 Beta、Gamma 和 Prod 部署阶段。

We didn’t want to flip a switch and hope. The labeling Lambda reads a three-way setting from AWS AppConfig on every message:

我们不想只是简单地切换开关然后祈祷。标记 Lambda 函数会在处理每条消息时从 AWS AppConfig 读取三向设置：

The token drop had two sources. Strands Decider produced one output, the choice, instead of a JSON answer. Its prompt was also much shorter than Sonnet 4.6’s. Production’s label descriptions alone are longer than Strands Decider’s 4,096-token window, so we rewrote each of the 20 labels as a one- or two-sentence criterion and sent them as the options of a single choice question, plus a “none” option. The ticket data is the same as what Sonnet gets, except that on long tickets Strands Decider drops the oldest comments to fit.

Token 消耗的下降有两个来源。Strands Decider 只产生一个输出（即选项），而不是 JSON 答案。它的提示词也比 Sonnet 4.6 短得多。仅生产环境的标签描述就超过了 Strands Decider 的 4,096 个 Token 窗口，因此我们将 20 个标签中的每一个都重写为一两句准则，并将它们作为单选题的选项发送，外加一个“无”选项。工单数据与 Sonnet 接收的数据相同，只是在处理长工单时，Strands Decider 会删除最旧的评论以适应窗口。

Below is a graph of our Lambda durations on the day we turned off the Sonnet usage, showing the average Lambda execution duration dropping 74%.

下图显示了我们关闭 Sonnet 使用当天 Lambda 的持续时间，平均执行时间下降了 74%。

At published us-east-1 on-demand prices:

按照 us-east-1 发布的按需定价：

Sonnet’s cost per ticket comes straight from the token counts above. Strands Decider’s depends on how busy each instance is. At about 640 ms per request, one instance can handle about 5,600 tickets an hour, which would be $250 per million tickets at full use. We keep headroom for bursts, and in practice it comes to about $500 per million. That is about 44 times cheaper than Sonnet, a 98% reduction.

Sonnet 的单张工单成本直接来自上述 Token 计数。Strands Decider 的成本取决于每个实例的繁忙程度。以每个请求约 640 毫秒计算，一个实例每小时可处理约 5,600 张工单，满负荷使用时每百万张工单成本为 250 美元。我们为突发流量保留了余量，实际成本约为每百万张 500 美元。这比 Sonnet 便宜约 44 倍，降低了 98%。

These are published list prices. They leave out the Lambda, which also runs for less time per ticket now.

这些是公布的标价。它们未计入 Lambda 的成本，而 Lambda 现在每张工单的运行时间也更短了。

One thing that surprised us was that JSON key order changed the answer. Sending the same content with keys in a different order moved the output probabilities by up to 0.19. We now send every request with sorted keys, so if you serve a decision model behind an API, check this before you compare runs.

令我们惊讶的一点是，JSON 键的顺序会改变答案。发送相同内容但键顺序不同，会导致输出概率发生高达 0.19 的变化。我们现在发送的每个请求都对键进行了排序，因此如果您在 API 后端提供决策模型，请在比较运行结果前检查这一点。

This worked because the task is a closed choice from a known catalog, the volume is high, and the latency of the old path mattered. If your labels need explanation text, if the catalog changes weekly, or if you can’t fit the useful context into a few thousand tokens, a decision model probably can’t replace the LLM’s job.

这种方法之所以有效，是因为任务是从已知目录中进行的封闭式选择，业务量大，且旧路径的延迟至关重要。如果您的标签需要解释性文本，如果目录每周都在变化，或者如果您无法将有用的上下文放入几千个 Token 中，那么决策模型可能无法取代大语言模型的工作。

The part we’d copy regardless of model is the three-way switch. Running both on real traffic, then judging every disagreement, told us more than any offline eval would have. It also meant going back was a 45-second config change.

无论使用什么模型，我们都会沿用的部分是三向开关。在真实流量上同时运行两者，然后判断每一次分歧，这比任何离线评估都能告诉我们更多信息。这也意味着回滚只需 45 秒的配置更改。

The world of agents gets a lot more exciting (and less costly) with decision models. If you’re running a classification agent, try the Strands Decider repo and its serving notes.

有了决策模型，代理的世界变得更加令人兴奋（且成本更低）。如果您正在运行分类代理，请尝试 Strands Decider 仓库及其服务说明。

Open an issueAsk on Discord

提交问题在 Discord 上提问