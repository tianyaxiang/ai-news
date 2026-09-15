---
title: "Reparameterization Tricks: Variance Reduction by Smarter Gradients"
originalUrl: "https://towardsdatascience.com/reparameterization-tricks-variance-reduction-by-smarter-gradients/"
date: "2026-09-15T23:44:14.985Z"
---

# Reparameterization Tricks: Variance Reduction by Smarter Gradients
# 重参数化技巧：通过更智能的梯度实现方差缩减

The reparameterization trick is what makes Variational Autoencoders (VAEs) trainable with standard stochastic gradient descent. It works by moving randomness outside the computation graph and turns an awkward gradient of an expectation into an ordinary chain-rule derivative.
重参数化技巧（Reparameterization trick）是使得变分自编码器（VAEs）能够通过标准随机梯度下降进行训练的关键。它的工作原理是将随机性移出计算图，从而将一个难以处理的期望梯度转化为普通的链式法则导数。

A VAE is a generative model. An encoder maps input data $x$ to a distribution over a latent variable $z$, while a decoder maps a sampled $z$ back to a reconstruction of $x$. What makes it trainable is its objective, the ELBO (Evidence Lower Bound) i.e., a tractable stand-in for the true (intractable) data likelihood, made up of a reconstruction term and a term that regularizes the latent distribution toward a simple prior. To train a VAE involves maximizing this ELBO using gradient descent, and in order to do that the gradient of an expectation must be computed; more precisely, the gradient of the expected reconstruction quality with respect to randomly sampled latent variables $z$ must be computed.
VAE 是一种生成模型。编码器将输入数据 $x$ 映射到潜在变量 $z$ 的分布上，而解码器将采样得到的 $z$ 映射回 $x$ 的重构。使其可训练的核心在于其目标函数——ELBO（证据下界），即真实（但不可计算）数据似然的一个可计算替代品，由重构项和将潜在分布正则化为简单先验的项组成。训练 VAE 需要使用梯度下降最大化 ELBO，为此必须计算期望的梯度；更准确地说，必须计算关于随机采样潜在变量 $z$ 的期望重构质量的梯度。

It's genuinely awkward to make that distinction and the issue is not unique to VAEs. The same structure shows up in the expected return in policy-gradient RL, and in variational inference more generally. In every case we're optimizing $L(\theta) = E[f(z)]$ where $z$ is itself sampled from a distribution that depends on $\theta$ — so the thing we're differentiating is defined by the distribution we're differentiating with respect to. That circularity is where a lot of the pain in stochastic optimization comes from, and it's exactly what the reparameterization trick was built to sidestep.
做出这种区分确实很棘手，而且这个问题并非 VAE 所独有。同样的结构也出现在策略梯度强化学习（RL）的期望回报中，以及更广泛的变分推断中。在每种情况下，我们都在优化 $L(\theta) = E[f(z)]$，其中 $z$ 本身是从依赖于 $\theta$ 的分布中采样的——因此，我们求导的对象是由我们对其求导的分布所定义的。这种循环性正是随机优化中许多痛苦的来源，而这正是重参数化技巧旨在规避的问题。

This article walks through that problem, the two main families of gradient estimators used to solve it, and why the "pathwise" gradients obtained through reparameterization tend to have dramatically lower variance than the alternative.
本文将探讨这一问题、用于解决该问题的两大类梯度估计器，以及为什么通过重参数化获得的“路径导数”（pathwise gradients）往往比替代方案具有显著更低的方差。

### Why low-variance gradients matter in practice
### 为什么低方差梯度在实践中很重要

A lower-variance gradient estimator is not just a theoretical nicety. In practice, it directly translates to:
一个低方差的梯度估计器不仅仅是一个理论上的优点。在实践中，它直接转化为：

*   **More stable training curves** — fewer wild swings in the loss.
*   **更稳定的训练曲线** —— 损失函数的剧烈波动更少。
*   **Faster convergence** — can take larger effective steps with less noise.
*   **更快的收敛速度** —— 可以在噪声更小的情况下采取更大的有效步长。
*   **Better final models** — the optimizer spends less time fighting gradient noise and more time fitting the data.
*   **更好的最终模型** —— 优化器花费更少的时间去对抗梯度噪声，而将更多时间用于拟合数据。

This is especially critical for complex models like VAEs, Bayesian neural networks, and continuous-control Reinforcement Learning agents, where the training signal can otherwise be too noisy to be useful.
这对于 VAE、贝叶斯神经网络和连续控制强化学习智能体等复杂模型尤为关键，否则训练信号可能会因为噪声过大而失去作用。

### The problem: Gradients of expectations — why sampling breaks backprop
### 问题所在：期望的梯度——为什么采样会破坏反向传播

Suppose we want to optimize $L(\theta) = \mathbb{E}_{z \sim p_\theta(z)}[f(z)]$ with respect to $\theta$. If $\theta$ only appeared inside $f$, this would be a standard backprop problem. The complication is that $\theta$ parameterizes the distribution that $z$ is drawn from — the sampling process itself depends on $\theta$ — so we can't just push the gradient through a fixed computation graph. Monte Carlo estimates of $L(\theta)$ are easy (draw samples, average $f(z)$), but Monte Carlo estimates of $\nabla_\theta L(\theta)$ are not automatic, because differentiating through a sampling operation isn't well defined.
假设我们想要优化关于 $\theta$ 的 $L(\theta) = \mathbb{E}_{z \sim p_\theta(z)}[f(z)]$。如果 $\theta$ 仅出现在 $f$ 内部，这将是一个标准的反向传播问题。复杂之处在于 $\theta$ 参数化了 $z$ 所服从的分布——采样过程本身依赖于 $\theta$——因此我们不能直接将梯度穿过固定的计算图。$L(\theta)$ 的蒙特卡洛估计很容易（抽取样本，对 $f(z)$ 求平均），但 $\nabla_\theta L(\theta)$ 的蒙特卡洛估计并非自动实现，因为对采样操作求导在数学上定义不明确。

There are two general ways out of this: the score function estimator (REINFORCE) and the pathwise / reparameterization estimator. Both are unbiased. They differ enormously in variance.
解决这个问题有两种通用的方法：分数函数估计器（REINFORCE）和路径导数/重参数化估计器。两者都是无偏的，但在方差上存在巨大差异。

### The score function estimator (REINFORCE): flexible but high variance
### 分数函数估计器（REINFORCE）：灵活但方差大

The classic trick here is the log-derivative identity: $\nabla_\theta p_\theta(z) = p_\theta(z) \nabla_\theta \log p_\theta(z)$. Substituting this into the gradient of the expectation gives $\nabla_\theta \mathbb{E}_{z \sim p_\theta}[f(z)] = \mathbb{E}_{z \sim p_\theta}[f(z) \nabla_\theta \log p_\theta(z)]$, which is now an expectation again, so it can be estimated by sampling $z \sim p_\theta$ and averaging $f(z) \cdot \nabla_\theta \log p_\theta(z)$. This is the estimator behind REINFORCE in policy-gradient reinforcement learning, and it's genuinely versatile. It works for discrete $z$ and it doesn't require $f$ to be differentiable at all. Only $p_\theta$ needs a tractable, differentiable log-density.
这里的经典技巧是对数导数恒等式：$\nabla_\theta p_\theta(z) = p_\theta(z) \nabla_\theta \log p_\theta(z)$。将其代入期望的梯度中得到 $\nabla_\theta \mathbb{E}_{z \sim p_\theta}[f(z)] = \mathbb{E}_{z \sim p_\theta}[f(z) \nabla_\theta \log p_\theta(z)]$，这再次变成了一个期望，因此可以通过采样 $z \sim p_\theta$ 并对 $f(z) \cdot \nabla_\theta \log p_\theta(z)$ 求平均来估计。这就是策略梯度强化学习中 REINFORCE 背后的估计器，它确实非常通用。它适用于离散的 $z$，并且根本不需要 $f$ 可微。只需要 $p_\theta$ 具有可计算、可微的对数密度即可。

The cost of that generality is variance. The estimator only ever sees the scalar value $f(z)$. It has no information about how $f$ changes as $z$ changes. When $f(z)$ is roughly the same for most sampled $z$ but the score $\nabla_\theta \log p_\theta(z)$ fluctuates a lot (which it does, especially in high dimensions or with peaked distributions), the product $f(z) \cdot \text{score}$ becomes a noisy quantity with high variance, and that noise shows up directly in the gradient estimate. This is why REINFORCE-style estimators almost always need variance-reduction machinery bolted on — baselines, control variates, advantage normalization; to be usable in practice.
这种通用性的代价是方差。该估计器只能看到标量值 $f(z)$，它没有任何关于 $f$ 如何随 $z$ 变化的信息。当 $f(z)$ 对于大多数采样 $z$ 来说大致相同时，但分数 $\nabla_\theta \log p_\theta(z)$ 波动很大（在高维或尖峰分布中确实如此），乘积 $f(z) \cdot \text{score}$ 就会变成一个高方差的噪声量，而这种噪声会直接反映在梯度估计中。这就是为什么 REINFORCE 风格的估计器几乎总是需要附加方差缩减机制（如基线、控制变量、优势归一化）才能在实践中使用的原因。

### The reparameterization trick: pathwise gradients made differentiable
### 重参数化技巧：使路径导数可微

The alternative is to change how we generate $z$. Instead of sampling $z$ directly from $p_\theta$, we express $z$ as a deterministic, differentiable function of $\theta$ and an auxiliary noise variable $\epsilon$ whose distribution does not depend on $\theta$: $z = g(\theta, \epsilon)$.
另一种方法是改变我们生成 $z$ 的方式。我们不再直接从 $p_\theta$ 采样 $z$，而是将 $z$ 表示为 $\theta$ 和一个辅助噪声变量 $\epsilon$ 的确定性可微函数，其中 $\epsilon$ 的分布不依赖于 $\theta$：$z = g(\theta, \epsilon)$。

The canonical example is the Gaussian: instead of sampling $z \sim N(\mu, \sigma^2)$ directly, sample $\epsilon \sim N(0, 1)$ and set $z = \mu + \sigma \cdot \epsilon$. All the randomness now lives in $\epsilon$, which is fixed and independent of $\theta$. $\theta$ only enters through a deterministic transformation.
典型的例子是高斯分布：不再直接采样 $z \sim N(\mu, \sigma^2)$，而是采样 $\epsilon \sim N(0, 1)$ 并令 $z = \mu + \sigma \cdot \epsilon$。现在所有的随机性都存在于 $\epsilon$ 中，它是固定的且与 $\theta$ 无关。$\theta$ 仅通过确定性变换进入计算。

With that reformulation, the expectation becomes $\mathbb{E}_{\epsilon \sim p(\epsilon)}[f(g(\theta, \epsilon))]$, and because the distribution we're integrating over no longer depends on $\theta$, we can push the gradient straight inside: $\mathbb{E}_{\epsilon \sim p(\epsilon)}[\nabla_\theta f(g(\theta, \epsilon))]$.
通过这种重构，期望变为 $\mathbb{E}_{\epsilon \sim p(\epsilon)}[f(g(\theta, \epsilon))]$，并且由于我们积分的分布不再依赖于 $\theta$，我们可以直接将梯度推入内部：$\mathbb{E}_{\epsilon \sim p(\epsilon)}[\nabla_\theta f(g(\theta, \epsilon))]$。

This is the pathwise derivative: for each sampled $\epsilon$, we differentiate $f$ through the deterministic path $z = g(\theta, \epsilon)$ using the ordinary chain rule, exactly as if we were backpropagating through any other layer in a neural network. In fact, once $z$ is reparameterized this way, sampling becomes just another differentiable operation in the computation graph, and standard autodiff handles the rest.
这就是路径导数：对于每个采样的 $\epsilon$，我们使用普通的链式法则通过确定性路径 $z = g(\theta, \epsilon)$ 对 $f$ 求导，就像我们在神经网络中对任何其他层进行反向传播一样。事实上，一旦 $z$ 以这种方式重参数化，采样就变成了计算图中另一个可微的操作，剩下的工作由标准的自动微分处理。

### Why reparameterization reduces gradient variance
### 为什么重参数化能降低梯度方差

The intuitive reason pathwise gradients tend to be much lower variance is that they actually use local, first-order information about $f$ i.e., the derivative $f'(z)$; whereas the score-function estimator only ever uses the value $f(z)$. Two samples that land close together in $z$-space will have similar pathwise gradient contributions (because $f$ is locally smooth), but they can have wildly different score-function contributions, because the score $\nabla_\theta \log p_\theta(z)$ doesn't know anything about $f$ and can swing sharply even between nearby points.
路径导数往往具有更低方差的直观原因是，它们实际上使用了关于 $f$ 的局部一阶信息，即导数 $f'(z)$；而分数函数估计器仅使用值 $f(z)$。在 $z$ 空间中靠得很近的两个样本将具有相似的路径导数贡献（因为 $f$ 在局部是平滑的），但它们可能具有截然不同的分数函数贡献，因为分数 $\nabla_\theta \log p_\theta(z)$ 对 $f$ 一无所知，即使在相邻点之间也可能剧烈波动。