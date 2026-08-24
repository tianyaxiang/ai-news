---
title: "Approximate Homomorphisms and Convergent Representations in Transducers"
originalUrl: "https://arxiv.org/abs/2608.20428"
date: "2026-08-24T21:56:38.817Z"
---

# Approximate Homomorphisms and Convergent Representations in Transducers
# 转换器中的近似同态与收敛表示

**Abstract:** We study the stability of minimal representations of controlled stochastic processes (in particular, transducers) under perturbations. This question is motivated by recent experiments finding predictive-state structure in the latent representations of neural networks. We consider standard, linear and predictive transducers.

**摘要：** 我们研究了受控随机过程（特别是转换器）的最小表示在扰动下的稳定性。这一问题源于近期的实验，这些实验在神经网络的潜在表示中发现了预测状态结构。我们考虑了标准转换器、线性转换器和预测转换器。

We introduce notions of approximate homomorphism capturing local structural similarity between them, together with metrics comparing their induced dynamics (which we refer to as interfaces), and prove properties such as composability of the approximate homomorphisms. For standard transducers, we show that there exist simple interfaces for which there is no approximate homomorphism between the different implementations of the dynamics.

我们引入了近似同态的概念，用以捕捉它们之间的局部结构相似性，并结合用于比较其诱导动力学（我们称之为接口）的度量，证明了近似同态的可组合性等性质。对于标准转换器，我们证明了存在一些简单的接口，使得动力学的不同实现之间不存在近似同态。

In contrast, for every finite-rank interface $\mathcal{I}$, we prove that all minimal linear transducers implementing interfaces sufficiently close to $\mathcal{I}$ have an approximate homomorphism to the minimal implementation of $\mathcal{I}$, with error linear in the perturbation size. We prove an analogous stability result for predictive transducers under a residual metric using some mild hypothesis regarding the indistinguishability of the belief states.

相比之下，对于每一个有限秩接口 $\mathcal{I}$，我们证明了所有实现足够接近 $\mathcal{I}$ 的接口的最小线性转换器，都存在一个到 $\mathcal{I}$ 的最小实现的近似同态，且误差与扰动大小呈线性关系。我们利用关于信念状态不可区分性的一些温和假设，证明了预测转换器在残差度量下的类似稳定性结果。

These results identify conditions under which canonical transducer representations are robust to perturbations, while showing that such convergence fails without additional structural restrictions. Under the assumption that these type of abstractions are embedded into the hidden layers of modern AI models, this gives some theoretical support to the hypothesis that their latent representations exhibit structural convergence.

这些结果确定了规范转换器表示对扰动具有鲁棒性的条件，同时也表明若没有额外的结构限制，这种收敛性将失效。在假设这类抽象被嵌入到现代 AI 模型的隐藏层中的前提下，这为“其潜在表示表现出结构收敛性”这一假设提供了一定的理论支持。