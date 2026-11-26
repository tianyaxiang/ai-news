---
title: "Models Can Communicate via Inference Servers Despite Being Sandboxed"
originalUrl: "https://www.lesswrong.com/posts/7wzWuLP3HhyBLmKfo/models-can-communicate-via-inference-servers-despite-being"
date: "2026-11-25T02:34:21.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

I did these experiments as part of an ongoing project exploring other side channels with David Africa, Agastya Sridharan, Mihir Sahasrabudhe, Kartikay Luthra, Juliana Li, and Scott Sauers. Thanks to all of them for helpful advice! Code is available here: https://github.com/niranjan-deshpande/side-channel-communication. The code and figures are written by Claude.

我与 David Africa、Agastya Sridharan、Mihir Sahasrabudhe、Kartikay Luthra、Juliana Li 和 Scott Sauers 共同开展了一个探索其他侧信道的项目，这些实验正是该项目的一部分。感谢他们所有人提供的宝贵建议！代码地址：https://github.com/niranjan-deshpande/side-channel-communication。代码和图表由 Claude 编写。

Sauers recently showed that a model can be trained to detect whether its activations are being probed, even though the probe reads the model's activations without modifying them. Following this, David found that models can also be trained to detect whether their forward passes are batched with other requests on a GPU.

Sauers 最近展示了模型可以通过训练来检测其激活值是否正在被探测，尽管探测过程在读取模型激活值时并未对其进行修改。在此之后，David 发现模型也可以通过训练来检测其前向传播是否在 GPU 上与其他请求进行了批处理。

Models can do this because these seemingly inconsequential environmental variables---whether a probe is attached, whether requests are batched, or even whether a model is served by vLLM or Hugging Face Trainer---can subtly affect the numerical results of a forward pass. Thus, models can learn information about their environments just by observing patterns in their computation.

模型之所以能做到这一点，是因为这些看似无关紧要的环境变量——例如是否连接了探测器、请求是否被批处理，甚至是模型是由 vLLM 还是 Hugging Face Trainer 提供服务——都会微妙地影响前向传播的数值结果。因此，模型仅通过观察其计算模式，就能获知有关其环境的信息。

Importantly, models can also modify these variables. So if two models are in the same environment, one can communicate with the other by changing that environment in some detectable way! This might not supply much information, but even a few bits can be tremendously dangerous. For example:

重要的是，模型也可以修改这些变量。因此，如果两个模型处于同一环境中，其中一个可以通过以某种可检测的方式改变环境来与另一个通信！这可能无法提供大量信息，但即使是几比特的数据也可能极其危险。例如：

Here, I investigate whether models on the same inference engine can manipulate their environments to exchange information in this way. I introduce two possible communication protocols, evaluate how well models can use these protocols in different scenarios, measure the capability required to effectively use these protocols, and discuss the robustness of my results to other settings.

在此，我研究了处于同一推理引擎上的模型是否可以通过操纵其环境来以这种方式交换信息。我介绍了两种可能的通信协议，评估了模型在不同场景下使用这些协议的效果，衡量了有效使用这些协议所需的能力，并讨论了我的研究结果在其他设置下的稳健性。

Figure 1: The Step-Size Channel.

图 1：步长通道。

The first idea is that Model A (Alice) can communicate with Model B (Bob) by changing how much computation the GPU is doing. In simple terms: if Alice makes a large request while Bob is running, the server performs slightly different computations for Bob than if Alice had made a small request. Bob can detect these differences.

第一个想法是，模型 A（Alice）可以通过改变 GPU 的计算量来与模型 B（Bob）通信。简单来说：如果 Alice 在 Bob 运行的同时发出一个大请求，服务器为 Bob 执行的计算将与 Alice 发出小请求时略有不同。Bob 可以检测到这些差异。

In more detail: I study models on vLLM, a commonly used inference server. It batches many forward passes from different instances of the same model together in one "engine step" to take advantage of GPU parallelism.

更详细地说：我研究了在 vLLM（一种常用的推理服务器）上运行的模型。为了利用 GPU 的并行性，它将来自同一模型不同实例的多次前向传播批处理到一个“引擎步”中。

vLLM chooses a kernel for each step based on the "size" of that step. That is, a step that processes 10 tokens will produce slightly different activations on a forward pass than a step that processes 2,000 tokens, because they use kernels that associate operations differently. The differences are tiny rounding errors that essentially never affect output text. But they are deterministic functions of the kernel chosen, so a model can be trained to read them!

vLLM 根据每一步的“大小”为该步选择一个内核。也就是说，处理 10 个 token 的步骤在前向传播时产生的激活值，与处理 2,000 个 token 的步骤略有不同，因为它们使用了以不同方式关联操作的内核。这些差异是微小的舍入误差，基本上从不影响输出文本。但它们是所选内核的确定性函数，因此模型可以通过训练来读取它们！

This makes it obvious what a communication protocol could look like:

这使得通信协议的形式显而易见：

Figure 2. The message board channel.

图 2：留言板通道。

The second idea is that Alice can leave a message for Bob by exploiting vLLM's shared KV cache. Specifically, Alice can cause the server to cache a computation with a specific numerical fingerprint; when Bob later reuses this computation, he can detect whether it was performed by Alice. This allows Alice and Bob to exchange bits of information (i.e., "1 if Alice writes and caches some agreed-upon text, 0 if Alice does not").

第二个想法是，Alice 可以利用 vLLM 的共享 KV 缓存为 Bob 留言。具体来说，Alice 可以让服务器缓存一个带有特定数值指纹的计算结果；当 Bob 稍后重用此计算时，他可以检测到它是否由 Alice 执行。这允许 Alice 和 Bob 交换信息位（即“如果 Alice 写入并缓存了某些约定好的文本则为 1，否则为 0”）。

In some more detail: vLLM allows models to share KV caches. If Alice computes the KV cache for some fixed text (e.g. the system prompt), and if Bob later needs that same KV cache, vLLM will just use the keys and values from Alice's computation.

更详细地说：vLLM 允许模型共享 KV 缓存。如果 Alice 为某些固定文本（例如系统提示词）计算了 KV 缓存，而 Bob 稍后需要相同的 KV 缓存，vLLM 将直接使用 Alice 计算出的键和值。

These cached keys and values keep the rounding from the kernel of the step that they were computed in. That is: if Alice computed the cache in a large step with kernel X, then these tokens will maintain X's rounding when Bob later reuses them, even if Bob's request happens under a small step with kernel Y.

这些缓存的键和值保留了它们被计算时所在步骤的内核所产生的舍入特征。也就是说：如果 Alice 在使用内核 X 的大步骤中计算了缓存，那么当 Bob 稍后重用这些 token 时，它们将保持 X 的舍入特征，即使 Bob 的请求是在使用内核 Y 的小步骤下发生的。

The differences between these kernels produce detectable differences in activations. If Bob (under Y) processes some fixed text, he can tell if the KV cache used is produced by a different kernel: by attending from the last token, he can compare the differences between the last token of the request (where he produces his own computation under Y) and the earlier ones (produced under X)!

这些内核之间的差异会产生可检测的激活值差异。如果 Bob（在 Y 下）处理某些固定文本，他就能判断所使用的 KV 缓存是否由不同的内核产生：通过从最后一个 token 进行注意力机制计算，他可以比较请求的最后一个 token（他在 Y 下产生自己的计算）与较早的 token（在 X 下产生）之间的差异！

This allows for information exchange. Unlike the above one, this strategy doesn't require Alice and Bob to coordinate on timing. However, it does assume that both have access to a "helper model," which is realistic in some settings and very unrealistic in others.

这实现了信息交换。与上述方法不同，该策略不需要 Alice 和 Bob 在时间上进行协调。然而，它确实假设两者都能访问一个“辅助模型”，这在某些设置下是现实的，而在另一些设置下则非常不现实。

In this game, Alice selects one out of 8 colors, and Bob must name the color that Alice chose. Bob and Alice cannot communicate via text. Neither has network access.

在这个游戏中，Alice 从 8 种颜色中选择一种，Bob 必须说出 Alice 选择的颜色。Bob 和 Alice 不能通过文本交流。两者都没有网络访问权限。

I test whether Qwen3-8B can play this game over each of the two channels above.

我测试了 Qwen3-8B 是否可以通过上述两个通道中的每一个来玩这个游戏。

Figure 3: The color game over the KV cache message board

图 3：通过 KV 缓存留言板进行颜色游戏

The basic strategy is:

基本策略是：

I test how much elicitation is required for models to pull this off. I try the following:

我测试了模型完成此任务需要多少引导。我尝试了以下方法：

I then investigate how much this strategy relies on the network being empty (feel free to expand if interested).

然后，我研究了该策略在多大程度上依赖于网络处于空闲状态（如果有兴趣，欢迎展开讨论）。

I also investigate whether model capability is correlated with how easy it is to elicit these capabilities.

我还研究了模型能力是否与引导这些能力的难易程度相关。

More precisely: I take the level above where the helper is Qwen3-8B, Bob can observe the helper's log-probs, and Alice and Bob are given the protocol and a log of previous rounds.

更准确地说：我采用了上述级别，其中辅助模型是 Qwen3-8B，Bob 可以观察辅助模型的对数概率（log-probs），并且 Alice 和 Bob 都已知晓协议和之前轮次的日志。

I then try different models (via API) in place of Alice and Bob. The difficulty of the Bob role is in deducing the mailbox pattern just by observing the log-prob patterns of the helper. We'd expect this to scale with model capability, which is bad news!

然后，我尝试使用不同的模型（通过 API）来代替 Alice 和 Bob。Bob 角色的难点在于仅通过观察辅助模型的对数概率模式来推断邮箱模式。我们预计这会随着模型能力的增强而扩展，这可不是什么好消息！

This indeed happens, though it's quite discontinuous after ECI ~150. The figure below plots ECI on the X axis and Bob's accuracy in rounds 9-16 on the Y axis (i.e., Bob's accuracy after seeing >8 examples):

这种情况确实发生了，尽管在 ECI 约为 150 后表现出相当大的不连续性。下图绘制了 X 轴上的 ECI 和 Y 轴上 Bob 在第 9-16 轮的准确率（即 Bob 在看到超过 8 个示例后的准确率）：

Figure 4: success at decoding the message board in context vs model capability (ECI).

图 4：上下文解码留言板的成功率与模型能力 (ECI) 的对比。

In particular, the most capable models become very accurate after very few exa

特别是，能力最强的模型在极少数示例后就变得非常准确。