---
title: "Predictive Surprise as Self-Grounding Concept Bottleneck for Interpretable Time Series"
originalUrl: "https://arxiv.org/abs/2611.12955"
date: "2026-11-11T05:00:00.000Z"
excerpt: false
---

Computer Science > Machine Learning arXiv:2611.12955 (cs) [Submitted on 7 Nov 2026] Title: Predictive Surprise as Self-Grounding Concept Bottleneck for Interpretable Time Series Authors: Sachith Abeywickrama, Emadeldeen Eldele, Min Wu, Xiaoli Li, Chau Yuen.

计算机科学 > 机器学习 arXiv:2611.12955 (cs) [提交于 2026 年 11 月 7 日] 标题：预测惊喜作为可解释时间序列的自基础概念瓶颈 作者：Sachith Abeywickrama, Emadeldeen Eldele, Min Wu, Xiaoli Li, Chau Yuen。

Abstract: Time-series classifiers deployed in risk-sensitive domains must be (1) accurate, (2) interpretable, and (3) able to abstain when evidence is weak. Existing methods do not deliver all 3 at once, and the obstacle is structural, rather than logistical. Meaningful temporal patterns cannot be defined without knowing segment boundaries, yet meaningful boundaries cannot be placed without knowing which patterns to expect.

摘要：部署在风险敏感领域的时间序列分类器必须满足以下三点：(1) 准确，(2) 可解释，(3) 在证据不足时能够弃权。现有方法无法同时实现这三点，其障碍在于结构性而非逻辑性。如果不了解片段边界，就无法定义有意义的时间模式；然而，如果不了解预期的模式，也无法确定有意义的边界。

Existing approaches break this circularity by using fixed windows or expert-annotated vocabularies, thereby sacrificing at least one of the 3 properties. We introduce ConceptTime, which closes the loop through a single self-supervised signal. A frozen probabilistic forecaster predicts a distribution over the next observation at every timestep of the sequence. We call the mismatch between its prediction and the realized signal the predictive surprise.

现有方法通过使用固定窗口或专家标注的词汇表来打破这种循环，从而牺牲了上述三个属性中的至少一个。我们引入了 ConceptTime，它通过单一的自监督信号闭合了这一循环。一个冻结的概率预测器在序列的每个时间步预测下一个观测值的分布。我们将预测与实际信号之间的不匹配称为“预测惊喜”。

This signal both locates segment boundaries and characterizes each resulting segment through the forecaster. Segments are thus grounded by how they behaved relative to expectation, not by what they look like. These summaries cluster into a vocabulary of dynamical regimes that we call concepts. A lightweight head classifies from the concept sequence, and the distance to the nearest concept yields reliability by design.

该信号既能定位片段边界，又能通过预测器表征每个生成的片段。因此，片段的基础在于它们相对于预期的表现，而非它们的外观。这些摘要聚类为一组动态机制的词汇表，我们称之为“概念”。一个轻量级头部从概念序列中进行分类，而与最近概念的距离则从设计上提供了可靠性。

Across 17 public benchmarks, ConceptTime is competitive with state-of-the-art black-box accuracy, beats every interpretable baseline, and retains near-98% accuracy on Epilepsy with 1% of labels. It further remains competitive with softmax, prototype-distance, and SHAP/TimeX/TimeX++ on OOD detection and deletion faithfulness, without a single annotation, language model call, or domain expert.

在 17 个公共基准测试中，ConceptTime 的准确性与最先进的黑盒模型相当，击败了所有可解释的基准方法，并且在仅使用 1% 标签的情况下，在癫痫数据集上保持了近 98% 的准确率。此外，在无需任何标注、语言模型调用或领域专家的情况下，它在分布外（OOD）检测和删除忠实度方面，与 Softmax、原型距离以及 SHAP/TimeX/TimeX++ 相比仍具有竞争力。