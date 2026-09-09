---
title: "DeepSeek launching v4.1 flash cheaper and more capable than v4 pro"
originalUrl: "https://news.ycombinator.com/item?id=49624603"
date: "2026-09-09T23:20:30.792Z"
---

# DeepSeek launching v4.1 flash cheaper and more capable than v4 pro
# DeepSeek 即将发布 v4.1 Flash，性能更强且价格更低

DeepSeek plans to officially release the V4.1 Flash model around September 10, 2026 (Beijing Time). After extensive internal and external testing, V4.1 Flash has comprehensively surpassed V4 Pro across all key metrics, including performance, cost, speed, and task completion time. In keeping with our commitment to user responsibility, following the official launch of V4.1 Flash and prior to the release of V4.1 Pro, all requests to the Pro model will be routed to V4.1 Flash and billed at Flash's price. If you encounter any issues during your comparative testing between V4 Pro and V4.1 Flash, please do not hesitate to reach out to us with your feedback. Thank you for your support!

DeepSeek 计划于 2026 年 9 月 10 日（北京时间）左右正式发布 V4.1 Flash 模型。经过广泛的内部和外部测试，V4.1 Flash 在性能、成本、速度和任务完成时间等所有关键指标上均已全面超越 V4 Pro。秉持对用户负责的态度，在 V4.1 Flash 正式发布后、V4.1 Pro 发布之前，所有针对 Pro 模型的请求都将自动路由至 V4.1 Flash，并按 Flash 的价格计费。如果您在 V4 Pro 与 V4.1 Flash 的对比测试中遇到任何问题，请随时向我们反馈。感谢您的支持！

We will adjust the pricing for the Flash series effective from 12:00 Beijing Time on September 10, 2026. During off-peak hours, the unit price will be $0.003 for input cache hits, $0.15 for input cache misses, and $0.6 for output. Peak-hour prices will be double the off-peak rates. Please plan your usage accordingly.

我们将于 2026 年 9 月 10 日北京时间 12:00 起调整 Flash 系列的定价。非高峰时段，输入缓存命中单价为 0.003 美元，输入缓存未命中为 0.15 美元，输出为 0.6 美元。高峰时段价格将是非高峰时段的两倍。请据此规划您的使用。

***

**Discussion Highlights / 讨论精选**

**aftbit:** Please don't do this kind of thing. If a user has validated a workflow on V4 Pro, they might not want to suddenly start testing it in production on V4.1 Flash. Instead, keep V4 Pro around but deprecated for a defined period of time, then remove it.

**aftbit:** 请不要这样做。如果用户已经在 V4 Pro 上验证了工作流，他们可能不希望突然在生产环境中开始使用 V4.1 Flash 进行测试。建议保留 V4 Pro 并将其标记为弃用，给予一段缓冲期后再移除。

**nolok:** Usually I would very much agree with you, but those things are not deterministic so if that's an issue for you you're probably not making the right choices.

**nolok:** 通常我非常同意你的观点，但这些模型本身就不是确定性的（deterministic），如果这对你来说是个问题，那么你可能一开始就做出了错误的选择。

**lkois:** That's a narrow take. Non-deterministic doesn't mean random; workflows can be reasonably validated and consistent to some known degree. I work for an education department that serves a chatbot for students, and model changes go through painstaking content safety reviews.

**lkois:** 这种看法太片面了。非确定性并不意味着完全随机；工作流可以在一定程度上进行合理的验证并保持一致性。我在一个教育部门工作，负责为学生提供聊天机器人，模型的任何变更都需要经过极其严苛的内容安全审查。

**frde_me:** It's not that you're a d*, it's just that you lack any kind of nuance. There's a whole spectrum between self-hosting open weight models and having a cloud provider swap models from under you. Should you self host a model if you want to maximize predictability to the limit? Yes. Does that mean it's wrong for someone hitting a model on API to expect that it won't switch to a completely different model under the hood from one day to another? Probably not.

**frde_me:** 这并不是说你是个混蛋，只是你缺乏细微的考量。在“自托管开源权重模型”和“云服务商在背后偷偷替换模型”之间，存在着巨大的灰色地带。如果你想将可预测性最大化，你应该自托管模型吗？是的。但这是否意味着 API 用户期望模型不会在某天被悄悄替换成另一个完全不同的模型是错误的？恐怕不是。

**gcanyon:** They’re nondeterministic at a fine level, but can be “deterministic” at a more general level: e.g. you might know that one model will always return properly formatted json when asked. That might not be true of the replacement, even if it is in general “better” and cheaper. Just the risk of such a thing means regression testing every time you update the model.

**gcanyon:** 它们在微观层面是非确定性的，但在宏观层面可以是“确定性”的：例如，你可能知道某个模型在被要求时总是能返回格式正确的 JSON。而替换后的模型可能做不到这一点，即使它在整体上“更好”且更便宜。仅仅是这种风险，就意味着每次模型更新时你都必须进行回归测试。