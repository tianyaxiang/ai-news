---
title: "SW-KAN: Kolmogorov-Arnold Networks with Stieltjes-Wigert q-Orthogonal Polynomials"
originalUrl: "https://arxiv.org/abs/2610.00050"
date: "2026-10-04T00:09:33.070Z"
---

# SW-KAN: Kolmogorov-Arnold Networks with Stieltjes-Wigert q-Orthogonal Polynomials

**Computer Science > Machine Learning arXiv:2610.00050 (cs) [Submitted on 3 Sep 2026]**
**Title:** SW-KAN: Kolmogorov-Arnold Networks with Stieltjes-Wigert q-Orthogonal Polynomials
**Authors:** Amirhosein Azarpour, Seyyed Moein Kazemi

计算机科学 > 机器学习 arXiv:2610.00050 (cs) [提交于 2026 年 9 月 3 日]
标题：SW-KAN：基于 Stieltjes-Wigert q-正交多项式的 Kolmogorov-Arnold 网络
作者：Amirhosein Azarpour, Seyyed Moein Kazemi

***

**Abstract:** Kolmogorov-Arnold Networks (KANs) represent a paradigmatic shift in deep learning by replacing fixed node activations with learnable univariate functions on edges, offering enhanced interpretability and parameter efficiency. While recent polynomial-based KAN variants have addressed the computational overhead of original B-spline implementations, they introduce a fundamental yet underexplored challenge: the domain mismatch between unbounded real-valued inputs and the bounded or semi-infinite support of orthogonal polynomial bases.

**摘要：** Kolmogorov-Arnold 网络 (KANs) 代表了深度学习领域的一种范式转移，它通过将固定的节点激活函数替换为边上的可学习单变量函数，提供了更强的可解释性和参数效率。尽管近期基于多项式的 KAN 变体解决了原始 B-样条实现中的计算开销问题，但它们引入了一个基础且尚未被充分探索的挑战：无界实数输入与正交多项式基的有界或半无限支撑域之间的域不匹配问题。

***

To address this limitation, we propose the Stieltjes-Wigert Kolmogorov-Arnold Network (SW-KAN), a novel architecture that employs Stieltjes-Wigert q-orthogonal polynomials defined on the semi-infinite domain (0, infinity). We introduce a smooth exponential-of-tanh mapping that stably bridges the domain gap while preserving well-conditioned gradients, and leverage a numerically stable three-term recurrence that evaluates polynomial expansions in O(N) operations without special-function calls.

为了解决这一局限性，我们提出了 Stieltjes-Wigert Kolmogorov-Arnold 网络 (SW-KAN)，这是一种采用定义在半无限域 (0, ∞) 上的 Stieltjes-Wigert q-正交多项式的新型架构。我们引入了一种平滑的 exponential-of-tanh 映射，在保持良好梯度条件的同时稳定地弥合了域间隙，并利用一种数值稳定的三项递推关系，在无需调用特殊函数的情况下以 O(N) 的运算复杂度评估多项式展开。

***

Through comprehensive experiments spanning image classification and continuous function approximation, we demonstrate that SW-KAN achieves superior accuracy-efficiency trade-offs across diverse tasks. The log-normal weight structure and learnable q-parameter of Stieltjes-Wigert polynomials provide a distinct inductive bias that enables robust performance under resource-constrained conditions, including reduced feature dimensionality and limited training data.

通过涵盖图像分类和连续函数逼近的全面实验，我们证明了 SW-KAN 在各种任务中实现了卓越的精度与效率平衡。Stieltjes-Wigert 多项式的对数正态权重结构和可学习的 q-参数提供了一种独特的归纳偏置，使其在资源受限条件下（包括特征维度降低和训练数据有限的情况）仍能保持稳健的性能。

***

The proposed architecture not only outperforms established polynomial KAN baselines on standard benchmarks but also exhibits strong representational capacity for approximating complex multivariate functions with remarkably few parameters, making it a compelling alternative for efficient function approximation and classification in resource-constrained settings.

该架构不仅在标准基准测试中优于现有的多项式 KAN 基线，而且在仅使用极少量参数的情况下，展现出了逼近复杂多元函数的强大表征能力，使其成为资源受限环境下高效函数逼近和分类的一种极具吸引力的替代方案。