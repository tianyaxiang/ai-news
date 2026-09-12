---
title: "One Capital Letter Was Silently Breaking My AI Support Bot, and It Wasn't in the New Model"
originalUrl: "https://towardsdatascience.com/one-capital-letter-was-silently-breaking-my-ai-support-bot-and-it-wasnt-in-the-new-model/"
date: "2026-09-12T23:10:45.539Z"
---

# One Capital Letter Was Silently Breaking My AI Support Bot, and It Wasn't in the New Model
# 一个大写字母悄悄搞垮了我的 AI 客服机器人，而且问题并不出在那个新模型上

Picture a support inbox for a bank. Every message that comes in needs to be sorted into a category, a lost card, a refund request, a wrong charge, and sent to the right team. A bank support analyst routes incoming customer messages about lost cards, refunds, and incorrect charges to separate support teams.
想象一下银行的客服收件箱。每一条收到的消息都需要被归类——比如“丢失卡片”、“退款申请”或“扣费错误”——并发送给相应的团队。银行客服分析师会将关于丢失卡片、退款和错误扣费的客户消息分发给不同的支持团队。

Now picture that sorting job handed to an AI model instead of a person. The model reads the message and hands back a short note in a fixed format, a little like a form with the same boxes every time, so the rest of the program can read it automatically and decide what to do next. No human has to interpret free text.
现在，想象一下把这项分类工作交给 AI 模型而不是人工。模型读取消息后，会以固定的格式返回简短的说明，就像一张每次栏目都相同的表格，这样程序的其余部分就可以自动读取它并决定下一步操作。无需人工去解读自由文本。

That fixed format is usually a small block of computer readable text called JSON, short for JavaScript Object Notation. Think of it as labeled boxes on a form. One box called `intent` holds the category. Another called `priority` holds how urgent it is.
这种固定格式通常是一小段计算机可读的文本，称为 JSON（JavaScript Object Notation 的缩写）。你可以把它想象成表格上带有标签的方框。一个名为 `intent`（意图）的框存放类别，另一个名为 `priority`（优先级）的框存放紧急程度。

The program reading the model's answer does not understand English. It looks for those exact boxes, spelled exactly the way it expects, every single time. If a box goes missing, or a label is spelled slightly differently than the program expects, the program has no way to notice on its own. It just quietly stops working for that one message, while everything on the surface still looks fine.
读取模型答案的程序并不理解英语。它每次都在寻找那些完全符合预期的方框，且拼写必须完全一致。如果某个方框丢失，或者标签的拼写与程序预期的略有不同，程序本身是无法察觉的。它只会针对那条消息悄无声息地停止工作，而表面上一切看起来都很正常。

AI companies release new model versions constantly, and deciding which LLM to use for a given job usually comes down to one number from the AI testing teams already run, how often it picks the right category. That single score can go up while something else, the exact shape of the reply, quietly gets worse, and a rising average has no way to warn you.
AI 公司不断发布新的模型版本，决定在特定任务中使用哪种大语言模型（LLM）通常取决于 AI 测试团队运行的一项指标：它选对类别的频率。这个单一的分数可能会上升，但其他方面——比如回复的具体格式——却在悄悄变差，而不断上涨的平均分无法给你任何预警。

With plain prompting, you simply write: "Return your answer as JSON." The model may still return:
使用简单的提示词时，你只需写道：“以 JSON 格式返回你的答案。”但模型仍可能返回：

```text
Sure, here is the JSON:
{"intent": "request_refund"}
```

That extra sentence can break code that expects JSON only. The model may also leave out a field or use a value the program does not expect.
那句多余的句子可能会破坏只期望接收 JSON 的代码。模型还可能遗漏某个字段，或者使用程序无法识别的值。

Structured Outputs is a stricter feature that makes the model follow a predefined JSON structure, such as requiring `intent`, `priority`, and `needs_human`. It can prevent many formatting problems, but the application still needs to check whether the values and decision are correct.
“结构化输出”（Structured Outputs）是一项更严格的功能，它强制模型遵循预定义的 JSON 结构，例如要求包含 `intent`、`priority` 和 `needs_human`。它可以防止许多格式问题，但应用程序仍然需要检查这些值和决策是否正确。

I ran a real LLM regression test on one small, real application, instead of trusting the accuracy number alone. I built a support triage assistant, gave it 47 real customer messages from a public banking dataset, and ran the exact same messages through three real versions of an OpenAI model, an older one, the one I am treating as the model currently in production, and a newer candidate being considered as a replacement.
我没有仅仅依赖准确率数字，而是对一个小型真实应用运行了实际的 LLM 回归测试。我构建了一个客服分流助手，向它输入了来自公共银行数据集的 47 条真实客户消息，并让三个不同版本的 OpenAI 模型处理这些完全相同的消息：一个旧版本、一个我视为当前生产环境使用的版本，以及一个正在考虑作为替代品的新候选版本。

I expected the newer model to choose the correct category more often, but I also worried that it might occasionally ignore the exact format the program requires. Instead, the newer model followed the format every time. The production model made the formatting mistake. It did so quietly, on every refund question in the sample, spelling one label `Request_refund` with a capital R instead of the lowercase `request_refund` the rest of the system expects.
我原以为新模型会更频繁地选对类别，但也担心它偶尔会忽略程序要求的精确格式。结果，新模型每次都遵循了格式。反倒是生产环境的模型犯了格式错误。它在样本中的每一个退款问题上都悄悄地出错了，将一个标签拼写为 `Request_refund`（大写 R），而不是系统其余部分所预期的 `request_refund`（小写 r）。

A human reading the reply would call it correct. A program matching labels exactly would silently drop every one of those tickets. That is the problem this article is about: a model can sound correct to a person and still be wrong for the software that uses its answer.
人类阅读这个回复会认为它是正确的。但一个精确匹配标签的程序会悄无声息地丢弃所有这些工单。这就是本文要探讨的问题：模型在人类看来可能是正确的，但对于使用其答案的软件来说，它却是错误的。

*(A schematic diagram showing a bar chart of overall accuracy rising from an old model to a new model on the left, next to a paired comparison on the right where the old model answers one test case correctly and the new model answers the same case wrong, labeled as a negative flip)*
*（示意图显示：左侧柱状图展示了从旧模型到新模型整体准确率的提升；右侧配对比较显示，旧模型正确回答了一个测试用例，而新模型回答错误，被标记为“负向翻转”）*

### What this project builds, and why it uses Weave
### 这个项目构建了什么，以及为什么要使用 Weave

Before writing any code, it helps to have one clear picture of what gets built and how its pieces fit together. This project does five things:
在编写任何代码之前，先清晰地了解要构建什么以及各部分如何协同工作会很有帮助。这个项目做了五件事：

1. **Weave records what happens when the application runs:** the question, the instructions, the model, the response, and the timing.
1. **Weave 记录应用程序运行时的过程：** 问题、指令、模型、响应和耗时。
2. **The instructions given to the model are saved with a version number,** so older and newer instructions can be compared.
2. **给模型的指令会带有版本号保存，** 以便比较新旧指令。
3. **The real customer questions are saved as a test dataset,** so every model answers the same examples.
3. **真实的客户问题被保存为测试数据集，** 确保每个模型都回答相同的示例。
4. **A strict checker tests each response for exact requirements,** such as valid JSON, required fields, allowed labels, and the correct category.
4. **严格的检查器会测试每个响应是否符合精确要求，** 例如有效的 JSON、必需的字段、允许的标签以及正确的类别。
5. **A second AI model reads each response and gives it a quality score,** more like a human reviewer would.
5. **第二个 AI 模型会读取每个响应并给出质量评分，** 更像人类评审员的做法。

The strict checker looks for exact machine requirements. The second AI judge evaluates the answer more like a reader. Using both helps reveal problems that either checker might miss.
严格检查器寻找的是精确的机器要求，而第二个 AI 评判员则更像读者一样评估答案。两者结合有助于发现任何单一检查器可能遗漏的问题。

Each of those ideas gets explained properly as it comes up. For now, start with Weave itself, since everything else in this article is recorded inside it.
这些概念在后续内容中会逐一详细解释。现在，先从 Weave 本身开始，因为本文中的所有其他内容都记录在它里面。

Weave is a tool from Weights & Biases (W&B) for watching what an AI application actually does while it runs. Add one line, `@weave.op()`, above any Python function, and every single call to that function gets saved automatically, the exact text that went in, the exact text that came back, and how long it took.
Weave 是 Weights & Biases (W&B) 开发的一款工具，用于观察 AI 应用程序在运行时的实际行为。在任何 Python 函数上方添加一行 `@weave.op()`，该函数的每一次调用都会被自动保存，包括输入的精确文本、返回的精确文本以及耗时。

Weave calls one of these saved records a trace, and it stores every trace in a project you can open and browse in a web page, the same way a photo app keeps a timeline of every photo you take.
Weave 将这些保存的记录称为“追踪”（trace），并将每个追踪存储在一个项目中，你可以在网页中打开并浏览，就像照片应用保存你拍摄的每一张照片的时间线一样。

A trace is not only useful for debugging a broken run after the fact. Once an application has been answering real questions for a while, its saved traces are also a ready made source of real examples, which matters later in this article, since the same 47 real questions that trace the application also become the dataset it gets tested against.
追踪不仅在事后调试故障时有用。一旦应用程序回答了一段时间的真实问题，其保存的追踪记录就成了现成的真实示例来源，这在本文后面很重要，因为追踪应用程序的那 47 个真实问题，同时也成为了它被测试时所用的数据集。

The application itself is deliberately small, one function, `triage_message(text, model, prompt_ref)`, that reads one real customer message and asks a model to answer with a JSON object shaped like this:
该应用程序本身特意设计得很小，只有一个函数 `triage_message(text, model, prompt_ref)`，它读取一条真实的客户消息，并要求模型以如下形状的 JSON 对象进行回答：

```json
{"intent": "request_refund", "priority": "high", "needs_human": true, "reply": "..."}
```

Four boxes, every time. `intent` names the category. `priority` is low, medium, or high. `needs_human` is true or false, and it decides whether the message gets...
每次都是四个框。`intent` 命名类别；`priority` 为 low（低）、medium（中）或 high（高）；`needs_human` 为 true 或 false，它决定了消息是否会被……