---
title: "Algebraic Integer Quantization for Machine Learning Applications"
originalUrl: "https://arxiv.org/abs/2610.12494"
date: "2026-10-12T04:00:00.000Z"
excerpt: false
---

Computer Science > Machine Learning arXiv:2610.12494 (cs) [Submitted on 25 Sep 2026] Title: Algebraic Integer Quantization for Machine Learning Applications Authors: Anthony Kostal-Vazquez, Vassil Dimitrov, Branden Butler.

计算机科学 > 机器学习 arXiv:2610.12494 (cs) [提交于 2026 年 9 月 25 日] 标题：用于机器学习应用的代数整数量化 作者：Anthony Kostal-Vazquez, Vassil Dimitrov, Branden Butler。

Abstract: In this article, we propose algebraic integer number formats (AINF) as a framework for highly configurable and accurate compressed computation. A key property of AINF is its straightforward reduction to purely integer arithmetic, enabling error-free multiply-accumulate operations.

摘要：在本文中，我们提出了代数整数数字格式（AINF），作为一种高度可配置且精确的压缩计算框架。AINF 的一个关键特性是它可以直接简化为纯整数算术，从而实现无误差的乘加运算。

We develop a matrix multiplication engine that exploits this property, obtaining performance within a predictable factor of the most efficient numerical counterparts on modern hardware accelerators. Another key advantage of AIQ is the freedom to select algebraic integers tailored to the numerical characteristics of a given use case, offering optimization opportunities that are fundamentally unavailable in floating-point or fixed-point formats.

我们开发了一种利用该特性的矩阵乘法引擎，在现代硬件加速器上获得了与最高效数值对应方案相当的性能，且处于可预测的范围内。AIQ 的另一个关键优势是能够自由选择针对特定用例数值特征量身定制的代数整数，这提供了浮点或定点格式根本无法实现的优化机会。

Motivated by these properties, we introduce algebraic integer quantization (AIQ), a lossy compression format for large language model (LLM) inference, and provide results demonstrating that AIQ achieves competitive accuracy compared to the industry-standard MX format across a diverse set of models and benchmarks at equivalent bit-per-parameter budgets.

受这些特性的启发，我们引入了代数整数量化（AIQ），这是一种用于大语言模型（LLM）推理的有损压缩格式。我们提供的结果表明，在相同的每参数比特预算下，AIQ 在多种模型和基准测试中均实现了与行业标准 MX 格式相媲美的准确度。

The experiments presented in this article employ algebraic integers of degree two (quadratic integers); generalizations to higher-order and, in particular, multidimensional algebraic integers promise even greater computational advantages and remain a promising direction for future work.

本文展示的实验采用了二次代数整数（二次整数）；推广到更高阶，特别是多维代数整数，有望带来更大的计算优势，这也是未来研究的一个有前景的方向。