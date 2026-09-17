---
title: "Silent Broadcasting Can Ruin Your Model"
originalUrl: "https://towardsdatascience.com/silent-broadcasting-can-ruin-your-model/"
date: "2026-09-17T00:10:46.179Z"
---

# Silent Broadcasting Can Ruin Your Model
# 静默广播（Silent Broadcasting）可能会毁了你的模型

Full disclosure: I just wasted ~$4,000 in compute costs last month because of this very silent, very real bug that I've likely been victim to many times over my career and never even knew it. If you are an ML practitioner, or work in deep learning, I can guarantee this has already happened to you, and you most likely never even realized it. It might even be derailing your work right now.
坦白说：上个月我因为这个非常隐蔽且真实的 Bug 浪费了约 4,000 美元的计算成本。在我的职业生涯中，我可能已经多次成为这个 Bug 的受害者，却从未察觉。如果你是一名机器学习从业者，或者从事深度学习工作，我可以保证这种情况已经在你身上发生过，而且你很可能根本没有意识到。它甚至可能正在破坏你当前的工作。

In this article I highlight how a single mismatched tensor dimension can silently rewrite your loss function, gut your gradients, or poison your project, without PyTorch or TensorFlow ever raising an error. Specifically:
在本文中，我将重点介绍单个不匹配的张量维度如何能够在不触发 PyTorch 或 TensorFlow 任何报错的情况下，静默地重写你的损失函数、掏空你的梯度，或者毒害你的整个项目。具体包括：

*   What silent broadcasting is
*   Real world examples of how silent broadcasting destroys models
*   Preventing silent broadcasting errors in your training pipeline
*   什么是静默广播
*   静默广播如何摧毁模型的真实案例
*   如何在训练流水线中预防静默广播错误

This problem is notorious, rarely spoken about, and a serious threat to your modeling pipeline. Think I'm being overly dramatic? It's likely that one (or more) of the models you've attempted to train in your career has suffered from this very common bug.
这个问题臭名昭著，却鲜有人提及，它是你建模流水线中的严重威胁。觉得我言过其实了？很有可能你职业生涯中尝试训练的一个（或多个）模型，都曾遭受过这个非常常见的 Bug 的困扰。

### What silent broadcasting is
### 什么是静默广播

Broadcasting is sometimes useful. It allows you to do elementwise math on tensors of different shapes without writing tedious loops or reshapes. It works like so:
广播有时很有用。它允许你对不同形状的张量进行逐元素数学运算，而无需编写繁琐的循环或重塑（reshape）代码。其工作原理如下：

*   If two dimensions are equal, they match.
*   If one of them is 1, it gets "stretched" to match the other.
*   If a tensor is missing a dimension entirely, it's treated as 1.
*   If none of the above holds, you finally get an error.
*   如果两个维度相等，则匹配。
*   如果其中一个维度为 1，它会被“拉伸”以匹配另一个。
*   如果张量完全缺失某个维度，则将其视为 1。
*   如果以上条件都不满足，你最终才会得到一个错误。

Broadcasting was designed to make (N, D) + (D,), ops like adding a bias vector to every row of a batch, simple. This same rule that makes that op convenient also makes (N, 1) and (N,) "compatible," even though one is a column vector and the other is a flat vector. Combining them produces an (N, N) matrix that is very likely not what either tensor was supposed to represent. This (N, 1) and (N,) compatibility is the hidden killer that exists in all tensor frameworks.
广播的设计初衷是为了简化 (N, D) + (D,) 这类运算，例如将偏置向量加到批次的每一行。正是这条让运算变得方便的规则，使得 (N, 1) 和 (N,) 变得“兼容”，尽管一个是列向量，另一个是平铺向量。将它们结合会产生一个 (N, N) 的矩阵，这很可能不是任何一个张量原本想要表达的含义。这种 (N, 1) 和 (N,) 的兼容性是存在于所有张量框架中的隐形杀手。

For example:
例如：

```python
import tensorflow as tf
a = tf.random.uniform((4, 1))
b = tf.random.uniform((4,))
print(a.shape) # (4, 1)
print(b.shape) # (4,)
c = a - b
print(c.shape) # (4, 4)
```

The danger here is that if you intended an elementwise (4,) + (4,) operation, there is no error. You just forgot to squeeze or unsqueeze a perfectly valid mathematical operation in both frameworks.
这里的危险在于，如果你原本打算进行逐元素的 (4,) + (4,) 运算，系统不会报错。你只是在两个框架中都忘记了对一个完全合法的数学运算进行 squeeze 或 unsqueeze 操作。

The failure mode is: this op runs, silently. The loss goes down and the gradients flow. But your model is training towards garbage. Let me explain in more detail with some real world examples.
这种故障模式是：运算静默地执行了。损失函数在下降，梯度也在流动。但你的模型正在向“垃圾”结果训练。让我通过一些真实世界的例子来详细解释。

### Real world examples of how silent broadcasting destroys models
### 静默广播如何摧毁模型的真实案例

**Example 1: Your regression loss quietly optimizes for the mean, not the input**
**案例 1：你的回归损失函数静默地优化为均值，而非输入**

This is the single most common version of the bug, and it's brutal because loss curves look completely normal.
这是该 Bug 最常见的版本，它非常残酷，因为损失曲线看起来完全正常。

In PyTorch:
在 PyTorch 中：

```python
pred = model(x) # shape (N,) <- forgot .squeeze(-1) after Linear(hidden, 1)
target = y # shape (N, 1)
loss = F.mse_loss(pred, target) # runs fine, no error
```

Same for Tensorflow/Keras:
Tensorflow/Keras 同理：

```text
pred = model(x) # shape (N,) <- Dense(1) output not squeezed
target = y # shape (N, 1)
loss = tf.keras.losses.MSE(target, pred) # also runs fine
```

`pred - target` broadcasts to (N, N), computing `target[i] - pred[j]` for every pair (i, j) instead of the N differences you intended. The "loss" you're minimizing is actually:
`pred - target` 会广播为 (N, N)，计算每一对 (i, j) 的 `target[i] - pred[j]`，而不是你预期的 N 个差值。你正在最小化的“损失”实际上是：

$$L = \frac{1}{N^2}\sum_{i,j}(t_i - p_j)^2$$

Take the derivative with respect to any single prediction $p_k$ and set it to zero, and every $p_k$ converges to the same value: the batch mean of the targets. The true minimum of this broken objective is a model that ignores its input entirely and just memorizes `mean(y)`. Training doesn't crash, and the loss drops fast, because collapsing to a constant is a super easy thing to optimize for. You just end up with a model that has learned nothing about the relationship between x and y.
对任意单个预测值 $p_k$ 求导并令其为零，每个 $p_k$ 都会收敛到同一个值：目标值的批次均值。这个错误目标函数的真正最小值是一个完全忽略输入、只会记住 `mean(y)` 的模型。训练不会崩溃，损失下降很快，因为收敛到一个常数是非常容易优化的。最终你得到的模型对 x 和 y 之间的关系一无所知。

**Example 2: Policy-gradient loss destroys credit assignment in RL**
**案例 2：策略梯度损失破坏了强化学习中的信用分配**

Same shape mismatch, worse consequences, because the whole point of policy gradients is per-sample credit assignment. This cost me actual money.
同样的形状不匹配，后果更严重，因为策略梯度的核心意义在于针对每个样本的信用分配。这让我付出了真金白银的代价。

```python
log_probs = dist.log_prob(actions) # shape (N,)
advantages = returns - values # shape (N, 1) <- critic head not squeezed
loss = -(log_probs * advantages).mean()
```

`log_probs * advantages` broadcasts to (N, N). Once you take the mean, the algebra collapses to `-mean(log_probs) * mean(advantages)`, a single scalar advantage applied uniformly to every action in the batch, instead of each action being reinforced or punished by its own advantage.
`log_probs * advantages` 会广播为 (N, N)。一旦取平均值，代数运算就会坍缩为 `-mean(log_probs) * mean(advantages)`，即一个统一应用于批次中每个动作的标量优势值，而不是让每个动作根据其自身的优势值得到强化或惩罚。

This can be particularly damaging when advantages are normalized to approximately zero mean. In that case, the broadcasted product can produce an extremely weak or nearly zero policy-gradient signal even though the individual advantages contain substantial information.
当优势值被归一化为均值接近零时，这尤其具有破坏性。在这种情况下，广播后的乘积可能会产生极其微弱甚至接近于零的策略梯度信号，尽管单个优势值本身包含大量信息。

The entire mechanism of "increase the probability of actions that turned out well, decrease the ones that didn't" is gone. The agent doesn't obviously fail because RL training is noisy by nature. RL policies plateau for a multitude of reasons, so one that's stuck because...
“增加表现良好的动作概率，减少表现不佳的动作概率”这一整套机制失效了。智能体不会明显地失败，因为强化学习训练本质上就是充满噪声的。强化学习策略会因为多种原因陷入停滞，所以一个因为……而卡住的策略……