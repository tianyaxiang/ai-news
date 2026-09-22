---
title: "A New Kind of Model for AI Decision-Making?"
originalUrl: "https://towardsdatascience.com/a-new-kind-of-model-for-ai-decision-making/"
date: "2026-09-22T00:21:46.687Z"
---

# A New Kind of Model for AI Decision-Making?
# 一种用于人工智能决策的新型模型？

TypeSafe.AI recently launched its first model, Jev. They claim it’s the first model of a new kind (a System One model) that is fundamentally different from the LLMs we’ve been working with (and hyping up) over the last several years.
TypeSafe.AI 最近发布了他们的首款模型 Jev。他们声称这是首个新型模型（“系统一”模型），与我们过去几年一直在使用（并大肆炒作）的大语言模型（LLM）有着本质区别。

This new model looks particularly well suited to many everyday use cases, such as classification (e.g. topic modelling for NPS comments) or LLM-as-a-judge tasks. So, naturally, I decided I had to try it out.
这款新模型看起来非常适合许多日常用例，例如分类（如针对 NPS 评论的主题建模）或“LLM 作为裁判”（LLM-as-a-judge）的任务。因此，我自然决定亲自尝试一下。

In this article, we’ll look at what makes System One models different from LLMs and put some of TypeSafe.AI’s claims to the test in practice, using intent classification for customer support requests as an example.
在本文中，我们将探讨“系统一”模型与大语言模型的区别，并以客户支持请求的意图分类为例，在实践中检验 TypeSafe.AI 的一些主张。

### How System One models differ from LLMs
### “系统一”模型与大语言模型有何不同

While LLMs are trained to predict the next token and generate the long-form text and conversations we’ve all been enjoying, System One models are built to evaluate a state and produce structured answers. Similar to LLMs, System One models can take natural language as input, so there’s no real difference there.
虽然大语言模型通过预测下一个 Token 来生成我们所熟知的长文本和对话，但“系统一”模型旨在评估状态并生成结构化的答案。与大语言模型类似，“系统一”模型也可以接收自然语言作为输入，因此在这方面没有实质区别。

You can find more details about the training process in the documentation. The interesting part about Jev is its post-training approach. LLMs are mostly post-trained with RLHF (Reinforcement Learning from Human Feedback), which teaches them to align with human preferences. But this can also lead to sycophancy and confident-sounding hallucinations that we’ve all seen in practice. That works well for chatbots, but for use cases that involve decision-making, TypeSafe suggests a different approach.
你可以在文档中找到关于训练过程的更多细节。Jev 最有趣的地方在于其训练后的处理方式。大语言模型大多通过 RLHF（基于人类反馈的强化学习）进行训练后微调，这教会了它们与人类偏好保持一致。但这也会导致我们实践中常见的“阿谀奉承”和听起来很自信的幻觉。这对聊天机器人来说效果不错，但对于涉及决策的用例，TypeSafe 提出了一种不同的方法。

For Jev, they use RLCD (Reinforcement Learning for Calibrated Decisions), which trains the model to return both decisions and probabilities.
对于 Jev，他们使用了 RLCD（基于校准决策的强化学习），该方法训练模型同时返回决策结果和概率值。

### Let’s look at how the model works and what its input and output look like.
### 让我们看看该模型的工作原理及其输入输出形式。

The input to the model is called a state. The state defines the context you want to provide to the model together with the questions you want it to answer. It can be as simple as a single message, for example a customer request like “Is it possible for me to change my PIN number?”, or it can be a JSON object.
该模型的输入被称为“状态”（State）。状态定义了你想要提供给模型的上下文，以及你希望它回答的问题。它可以简单到只是一条消息，例如客户请求“我可以更改我的 PIN 码吗？”，也可以是一个 JSON 对象。

*   a map with several fields, such as `{"message": "Is it possible for me to change my PIN number?", "user_id": 123}`
*   包含多个字段的映射（Map），例如 `{"message": "我可以更改我的 PIN 码吗？", "user_id": 123}`
*   an array representing a sequence of messages or records, such as `["Hello! How can I help you?", "Is it possible for me to change my PIN number?"]`
*   表示一系列消息或记录的数组，例如 `["你好！有什么可以帮你的吗？", "我可以更改我的 PIN 码吗？"]`

The best practice is to use an object for the state with clear field names, so it’s easier for the model to reason about the context.
最佳实践是使用带有清晰字段名的对象作为状态，这样模型更容易对上下文进行推理。

Along with the context, we can also pass one or several questions to the model. Since System One models don’t generate free-form responses, we need to specify the expected type of answer using one of the available primitives:
除了上下文，我们还可以向模型传递一个或多个问题。由于“系统一”模型不会生成自由格式的回复，我们需要使用可用的原语（Primitives）之一来指定预期的答案类型：

*   **Choice** works when the answer should be one of several predefined options. For example: what is this customer request about — delivery, billing, or account access?
*   **Choice（选择）**：当答案应为几个预定义选项之一时使用。例如：此客户请求是关于什么的——配送、账单还是账户访问？
*   **Score** can be used when the answer comes from an ordered set of values. For example: what is the sentiment of this customer message — negative, neutral, or positive?
*   **Score（评分）**：当答案来自一组有序值时使用。例如：此客户消息的情感倾向是什么——负面、中性还是正面？
*   **Noul** can be used for yes/no questions. For example: has the customer’s problem been solved in this chat?
*   **Noul（是非）**：用于“是/否”问题。例如：客户的问题在此次对话中是否已解决？

In all of these cases, we get not only the answer itself, but also probabilities for all possible values. Confidence is an important part of Jev, because it tells us whether the model is confident in its decision (for example, when most of the probability is concentrated on one value) or uncertain, when several options have roughly similar probabilities.
在所有这些情况下，我们不仅能得到答案本身，还能得到所有可能值的概率。置信度（Confidence）是 Jev 的重要组成部分，因为它告诉我们模型对其决策是否有把握（例如，当大部分概率集中在一个值上时），或者当几个选项的概率大致相似时，模型是否处于不确定状态。

These confidence levels can be particularly useful when we need to make decisions based on the model output. Take auto-replies to customer questions as an example: if the model can classify a customer request into one of the known categories with high confidence, we can send an automatic reply. Otherwise, we can route the message to a human support agent.
当我们根据模型输出做出决策时，这些置信度水平特别有用。以客户问题的自动回复为例：如果模型能以高置信度将客户请求分类到已知类别中，我们就可以发送自动回复。否则，我们可以将消息转接给人工客服。

### Practice
### 实践

Jev claims to be 193.6× faster, 444.6× cheaper, and less prone to hallucinations. Let’s see how those claims hold up in practice by comparing it with our good old LLMs.
Jev 声称其速度快 193.6 倍，成本低 444.6 倍，且更不容易产生幻觉。让我们通过将其与我们熟悉的大语言模型进行对比，看看这些主张在实践中是否站得住脚。

For this experiment, I chose OpenAI, since TypeSafe’s benchmark shows Jev performing on par with OpenAI’s Terra model.
为了进行这次实验，我选择了 OpenAI，因为 TypeSafe 的基准测试显示 Jev 的表现与 OpenAI 的 Terra 模型相当。

I also decided to use a publicly available dataset of banking intents released by PolyAI under the CC BY 4.0 licence. It’s quite an interesting classification problem, with 77 different intent classes (which is a lot).
我还决定使用 PolyAI 在 CC BY 4.0 许可下发布的公开银行意图数据集。这是一个非常有趣的分类问题，包含 77 个不同的意图类别（数量相当多）。

*(Code and implementation details omitted for brevity)*
*(代码及实现细节略)*