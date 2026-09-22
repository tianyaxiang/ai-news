---
title: "OpenAI is well positioned to fast-follow Jev"
originalUrl: "https://arcturus-labs.com/blog/2026/09/21/will-openai-eat-jevs-lunch/"
date: "2026-09-22T23:39:14.183Z"
---

# OpenAI is well positioned to fast-follow Jev
# OpenAI 处于快速跟进 Jev 的有利地位

Will OpenAI Eat Jev's Lunch? TypeSafe's Jev introduced a new spin on large language models that has taken the AI world by storm. According to Vercel, "Jev was adopted faster than any other model in AI Gateway history." ... But there are clouds forming on the horizon. OpenAI is undoubtedly paying attention – and deciding what to do next.

OpenAI 会抢走 Jev 的饭碗吗？TypeSafe 推出的 Jev 为大语言模型引入了一种新颖的思路，并在 AI 领域掀起了风暴。据 Vercel 称，“Jev 的采用速度超过了 AI Gateway 历史上任何其他模型。”……但地平线上已乌云密布。OpenAI 无疑正在密切关注，并决定下一步该怎么做。

I wish all the best for TypeSafe, but if they truly live up to their promises, then I'm concerned that OpenAI is well positioned to fast-follow – not only to replicate Jev's flagship product, but also to fold that capability into upcoming models and agents and offer some really useful new behavior that Jev is not positioned to reproduce.

我祝愿 TypeSafe 一切顺利，但如果他们真的能兑现承诺，我担心 OpenAI 已经处于快速跟进的有利地位——不仅能复制 Jev 的旗舰产品，还能将这种能力整合到即将推出的模型和智能体中，并提供一些 Jev 无法实现的、真正有用的新功能。

Here is my thesis in brief: OpenAI has for years used their LLMs as implicit classifiers; they just haven't trained them for general classification tasks and they haven't packaged up general classification as a stand-alone product. If OpenAI can replicate the training, then they will be able to replicate Jev in short order.

简而言之，我的观点是：OpenAI 多年来一直将大语言模型作为隐式分类器使用；只是他们没有针对通用分类任务进行训练，也没有将通用分类打包成独立产品。如果 OpenAI 能够复刻这种训练，他们就能在短时间内复制出 Jev。

Moreover, OpenAI is positioned to use this new classifier inside of their existing models and agents which can be useful for quick model selection, more efficient thinking, better security guardrails, and generally smarter, faster, and cheaper models. The key factor deciding all of this is whether or not TypeSafe has a moat to protect themselves. The biggest moat I see is in TypeSafe's training data and training processes.

此外，OpenAI 有能力将这种新型分类器内置于现有的模型和智能体中，这对于快速模型选择、更高效的推理、更好的安全护栏，以及打造更智能、更快速、更廉价的模型大有裨益。决定这一切的关键因素在于 TypeSafe 是否拥有护城河。我所看到的最大的护城河在于 TypeSafe 的训练数据和训练流程。

### What's Old Is New Again
### 温故而知新

Before I make my case, let me state my assumptions and back them up with some relevant history and examples from OpenAI. My main assumption is that Jev is using something quite close to a conventional large language model. As evidence of this, Latent Space reports that many of the early clones are indeed LLM-based.

在陈述我的观点之前，先说明我的假设，并用 OpenAI 的相关历史和案例作为支撑。我的主要假设是：Jev 使用的技术非常接近传统的大语言模型。Latent Space 的报道也印证了这一点，许多早期的克隆版本确实是基于 LLM 的。

Here's the idea. Given a state and a set of questions, Jev's LLM generates a single token or, more accurately, generates the probability distribution over all possible next tokens. The logprobs associated with every possible token at that one step are then massaged into whatever format Jev needs to return. (From here on I'll just say "probabilities" instead of "logprobs" – for our purposes they're interchangeable.)

其核心思路是：给定一个状态和一组问题，Jev 的 LLM 会生成单个 token，或者更准确地说，生成所有可能出现的下一个 token 的概率分布。该步骤中与每个可能 token 关联的对数概率（logprobs）会被处理成 Jev 所需的返回格式。（从现在起，我将用“概率”代替“对数概率”，因为在我们的讨论中它们是可以互换的。）

For a boolean question, Jev looks at just two tokens, true and false, ignores everything else, and normalizes their probabilities into a single probability that the answer is true. For a choice question, Jev can be prompted with a list of possibilities – say A=happy, B=sad, C=angry, D=afraid – and it looks at the relative probabilities of those four tokens to build out the full distribution, selecting the highest as the winner.

对于布尔问题，Jev 只关注“true”和“false”这两个 token，忽略其他所有内容，并将它们的概率归一化为答案为“true”的单一概率。对于选择题，Jev 可以通过提示词获取一系列选项——比如 A=开心，B=悲伤，C=愤怒，D=恐惧——它会查看这四个 token 的相对概率来构建完整分布，并选择概率最高的一个作为结果。

The choice pattern is pretty much what I blogged about way back in 2025 in Supercharging LLM Classifications with Logprobs, and even without fine-tuning it was already showing promise. (Sigh... what do they say about ideas and the importance of execution?) I haven't thought hard about the score primitive, but I suspect it's a variant of the same pattern.

这种选择模式与我早在 2025 年在博客《利用对数概率增强 LLM 分类能力》中提到的内容几乎如出一辙，即使在没有微调的情况下，它当时就已经展现出了潜力。（唉……人们常说想法重要还是执行重要来着？）我还没有深入研究评分原语（score primitive），但我怀疑它是同一种模式的变体。

Part of the premise of this post is that OpenAI might be poised to quickly take advantage of this idea, and this becomes clearer if you understand how. OpenAI has been using large language models implicitly as specialized classifiers since at least the introduction of tool calling. Back in early 2024 I wrote Tool Invocation – Demonstrating the Marvel of GPT's Flexibility, where I coaxed a GPT model into revealing exactly how it decides to call a tool.

本文的前提之一是 OpenAI 可能已经准备好迅速利用这一思路，如果你了解其运作方式，这一点就会变得更加清晰。至少从引入工具调用（tool calling）功能开始，OpenAI 就一直在隐式地将大语言模型用作专用分类器。早在 2024 年初，我就写过《工具调用——展示 GPT 灵活性的奇迹》，在那篇文章中，我诱导 GPT 模型揭示了它是如何决定调用工具的。

The following is what a chat session looks like internally. Here there is a user message, then an assistant response without a tool call followed by a user message with a tool call: I've color-coded the text to indicate token boundaries. If you haven't seen ChatML before, it's the internal markup language that OpenAI introduced for organizing user-agent conversation prompts. <|im_start|> and <|im_end|> are reserved tokens that delimit the messages, and the first token after <|im_start|> identifies the speaker, either user or assistant.

以下是聊天会话在内部的表现形式。这里有一条用户消息，接着是未调用工具的助手回复，随后是一条包含工具调用的用户消息：我用颜色标记了文本以指示 token 的边界。如果你之前没见过 ChatML，它是 OpenAI 引入的一种内部标记语言，用于组织用户与代理之间的对话提示词。<|im_start|> 和 <|im_end|> 是用于界定消息的保留 token，而 <|im_start|> 之后的第一个 token 用于标识发言者，即用户或助手。

Right after <|im_start|>assistant, the very first token the model predicts is either \n or to=function.. If it predicts \n, it continues on with a normal natural-language response. If it predicts to=function., then that sequence of tokens effectively functions as a classifier deciding whether or not a tool should be invoked at all. The next handful of tokens identify which tool to call – get_temperature – another classifier, this time picking from the list of available tools.

在 <|im_start|>assistant 之后，模型预测的第一个 token 要么是 \n，要么是 to=function.。如果预测的是 \n，它会继续进行正常的自然语言回复。如果预测的是 to=function.，那么该 token 序列实际上就充当了一个分类器，决定是否应该调用工具。接下来的几个 token 用于识别要调用的工具——例如 get_temperature——这是另一个分类器，这次是从可用工具列表中进行选择。

After that, the model generates argument names, then argument values which can also be vaguely considered as classifiers or estimators. Finally, when the model generates a <|im_end|> token, that too is a classifier which reads "true" when the model believes the message is complete.

此后，模型会生成参数名称，然后是参数值，这些也可以模糊地视为分类器或估计器。最后，当模型生成 <|im_end|> token 时，它同样是一个分类器，当模型认为消息已完整时，它就代表“true”。

Some LLMs just don't know when to shut up - a hilarious aside. Back when I was at GitHub working on Copilot I had the opportunity to work with a very new and very raw internal API for GPT-4. Out of the gate, we knew something was way off because, after an initially very coherent response, the model would have trouble wrapping up. It would end every response with something like "Let me know if you have any other questions. Have a nice day. Have a great week. Have a good time. Have a wonderful life. Have a special day. ..." and it would keep on like this until it hit the response token limit.

有些 LLM 就是不知道什么时候该闭嘴——这是一个有趣的插曲。在 GitHub 从事 Copilot 开发时，我有机会使用 GPT-4 一个非常新且原始的内部 API。刚开始我们就发现有些不对劲，因为在一段非常连贯的回复之后，模型总是难以收尾。它会用类似“请告诉我你还有其他问题吗？祝你今天愉快。祝你这周愉快。祝你玩得开心。祝你生活美满。祝你度过特别的一天……”这样的话来结束每一条回复，并且会一直持续下去，直到达到回复的 token 限制。

As it turns out, the API required us to set some header values which would allow the model to use those special message delimiters <|im_start|> and <|im_end|>. In effect we were disallowing the model to ever predict the end of its response – it literally had no internal ability to shut itself up! The point I was making in that old post is that OpenAI has been using single tokens as little micro-classifiers for years. Each token carried a probability: should we use a tool or not, which tool should we use, is the assistant finished. That's Jev's whole trick really, except for one important thing: these micro-classifiers are specialists, only suitable for t

事实证明，该 API 要求我们设置一些头信息值，以允许模型使用那些特殊的标记符 <|im_start|> 和 <|im_end|>。实际上，我们当时禁止了模型预测其回复的结束——它在内部根本没有能力让自己停下来！我在那篇旧文中想表达的观点是，OpenAI 多年来一直将单个 token 用作微型分类器。每个 token 都携带一个概率：我们是否应该使用工具，应该使用哪个工具，助手是否已完成任务。这其实就是 Jev 的全部诀窍，除了一个重要区别：这些微型分类器是专家型的，仅适用于……