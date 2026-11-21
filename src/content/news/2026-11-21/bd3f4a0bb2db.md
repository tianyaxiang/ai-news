---
title: "On the Impact of Feature Reduction Techniques on Adversarial Attacks"
originalUrl: "https://arxiv.org/abs/2611.25004"
date: "2026-11-20T05:00:00.000Z"
excerpt: false
---

Adversarial attacks have posed significant threats to machine learning models by exploiting their inherent vulnerabilities. Researchers have established an interdisciplinary field called adversarial machine learning to explore these vulnerabilities and develop corresponding defense strategies.

对抗性攻击通过利用机器学习模型固有的脆弱性，对其构成了重大威胁。研究人员建立了一个被称为对抗性机器学习的跨学科领域，旨在探索这些脆弱性并制定相应的防御策略。

Feature reduction strategies are used to decrease the dimensionality of the data in order to reduce training time, avoid the curse of dimensionality, prevent overfitting, and mitigate redundant features. However, their effect on adversarial robustness across different classifiers and attack scenarios remains insufficiently explored.

特征缩减策略被用于降低数据维度，以减少训练时间、避免维度灾难、防止过拟合并减轻冗余特征。然而，它们在不同分类器和攻击场景下对对抗鲁棒性的影响仍未得到充分探索。

This study aims to analyze the effect of feature reduction techniques on the adversarial robustness of a diverse set of machine learning models under poisoning, backdoor, and universal adversarial perturbation attacks on the APT dataset. These models include support vector machine, decision tree, random forest, multi-layer perceptron, and k-nearest neighbors.

本研究旨在分析在 APT 数据集上，针对中毒攻击、后门攻击和通用对抗扰动攻击，特征缩减技术对多种机器学习模型对抗鲁棒性的影响。这些模型包括支持向量机、决策树、随机森林、多层感知机和 k-近邻算法。

The attained results are compared with scenarios where different feature reduction techniques are applied, including principal component analysis, permutation importance ranking, recursive feature elimination, and univariate mutual information. Metrics such as accuracy, F1-score, and mitigation score are employed to evaluate the effect of these techniques on adversarial robustness.

所得结果与应用不同特征缩减技术（包括主成分分析、排列重要性排序、递归特征消除和单变量互信息）的场景进行了比较。研究采用了准确率、F1 分数和缓解得分等指标来评估这些技术对抗鲁棒性的影响。

The results demonstrate that permutation importance ranking and univariate mutual information generally provide the most consistent robustness improvements, while other methods exhibit more variable effects depending on the classifier and attack scenario.

结果表明，排列重要性排序和单变量互信息通常能提供最一致的鲁棒性提升，而其他方法的效果则根据分类器和攻击场景的不同而表现出更大的变异性。