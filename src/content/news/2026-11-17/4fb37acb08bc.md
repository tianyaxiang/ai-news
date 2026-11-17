---
title: "Creating Steering Vectors via Input Optimisation"
originalUrl: "https://arxiv.org/abs/2611.17481"
date: "2026-11-16T05:00:00.000Z"
excerpt: false
---

Title: Creating Steering Vectors via Input Optimisation

标题：通过输入优化创建引导向量

Computer Science > Computation and Language arXiv:2611.17481 (cs) [Submitted on 12 Nov 2026] Title: Creating Steering Vectors via Input Optimisation Authors: Batuhan Akar.

计算机科学 > 计算与语言 arXiv:2611.17481 (cs) [提交于 2026 年 11 月 12 日] 标题：通过输入优化创建引导向量 作者：Batuhan Akar。

Abstract: Activation steering influences a language model's behaviour by adding a steering vector to its residual stream during generation, but it requires white-box access to modify the hidden states at every generation step. We introduce ActGCG, a modification of Greedy Coordinate Gradient which optimises a suffix to match the target activations obtained by adding a steering vector to the residual stream.

摘要：激活引导通过在生成过程中向残差流添加引导向量来影响语言模型的行为，但这需要白盒访问权限，以便在每个生成步骤修改隐藏状态。我们引入了 ActGCG，这是对贪婪坐标梯度（Greedy Coordinate Gradient）的一种改进，它通过优化后缀来匹配通过向残差流添加引导向量所获得的目标激活值。

We further introduce universal suffixes trained across many prompts at once, a model-translation step that rewrites the suffix into human-readable text midway through optimisation, and a soft-suffix variant to remove the discrete token space constraint. We study two behaviours: steering a model to answer in German, and anti-refusal steering for jailbreaking.

我们进一步引入了在多个提示词上同时训练的通用后缀、一种在优化过程中将后缀重写为人类可读文本的模型翻译步骤，以及一种用于消除离散标记空间约束的软后缀变体。我们研究了两种行为：引导模型用德语回答，以及用于越狱的反拒绝引导。

For German, a discrete suffix reproduces the steering vector's behaviour almost perfectly and transfers well across prompts and models. For anti-refusal, the equivalence is weaker, succeeding under a phrase-avoidance metric but only partially under the stricter HarmBench classifier. Our results show that a steering vector's behaviour is reachable from the input, with no access to model internals at generation time, up to a loss that depends on the concept being steered.

对于德语，离散后缀几乎完美地重现了引导向量的行为，并且在不同的提示词和模型之间具有良好的迁移性。对于反拒绝引导，这种等效性较弱，在短语规避指标下表现成功，但在更严格的 HarmBench 分类器下仅部分成功。我们的结果表明，在生成时无需访问模型内部的情况下，可以通过输入实现引导向量的行为，其损失取决于所引导的概念。