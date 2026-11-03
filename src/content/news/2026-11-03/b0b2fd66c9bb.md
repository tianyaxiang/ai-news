---
title: "Unsupervised Feature Selection Using Local Intrinsic Dimensionality -- Extended Version"
originalUrl: "https://arxiv.org/abs/2610.40736"
date: "2026-11-02T05:00:00.000Z"
excerpt: false
---

Computer Science > Machine Learning arXiv:2610.40736 (cs) [Submitted on 29 Oct 2026] Title: Unsupervised Feature Selection Using Local Intrinsic Dimensionality -- Extended Version Authors: Oussama Chelly, Michael E. Houle, Ken-ichi Kawarabayashi, Muhammad Rajabinasab, Arthur Zimek.

计算机科学 > 机器学习 arXiv:2610.40736 (cs) [提交于 2026 年 10 月 29 日] 标题：使用局部内在维度的无监督特征选择 -- 扩展版 作者：Oussama Chelly, Michael E. Houle, Ken-ichi Kawarabayashi, Muhammad Rajabinasab, Arthur Zimek。

Abstract: High dimensionality degrades both the efficiency and the effectiveness of learning algorithms, and in many applications no class labels are available to guide dimensionality reduction. This paper proposes LIDFS, an unsupervised feature selection method based on Local Intrinsic Dimensionality (LID).

摘要：高维度会降低学习算法的效率和有效性，且在许多应用中，没有类标签可用于指导降维。本文提出了一种基于局部内在维度（LID）的无监督特征选择方法 LIDFS。

The method builds on the formal equivalence between LID and the indiscriminability of distance measures. The data matrix is transposed so that each feature is treated as a point, and the LID of each feature is estimated by maximum likelihood from the distances to its $k$ nearest neighboring features.

该方法建立在 LID 与距离度量的不可区分性之间的形式等价性之上。数据矩阵经过转置，使得每个特征被视为一个点，并通过其到 $k$ 个最近邻特征的距离，利用最大似然估计来估算每个特征的 LID。

Features with lower LID exhibit greater local discriminability and receive higher importance scores. A refinement step then retains one representative per feature neighborhood and demotes locally redundant features.

具有较低 LID 的特征表现出更强的局部可区分性，并获得更高的重要性评分。随后，一个细化步骤会保留每个特征邻域内的一个代表，并降低局部冗余特征的权重。

The result is a complete ranking from which any number of features can be selected without rerunning the procedure. LIDFS does not use any information about labels or the number of classes, and runs in $\mathcal{O}(d^2 n)$ time for $n$ instances and $d$ features.

其结果是一个完整的排序，从中可以选择任意数量的特征，而无需重新运行该过程。LIDFS 不使用任何关于标签或类别数量的信息，对于 $n$ 个实例和 $d$ 个特征，其运行时间复杂度为 $\mathcal{O}(d^2 n)$。

LIDFS is compared with classic and state-of-the-art methods and a random baseline on 23 high-dimensional datasets, the classic benchmark collection. The evaluation uses classification accuracy and AUC with five downstream classifiers, as well as clustering accuracy and normalized mutual information, over both full and aggressive selection ranges.

LIDFS 在 23 个高维数据集（经典基准集合）上与经典方法、最先进方法以及随机基准进行了比较。评估使用了五种下游分类器的分类准确率和 AUC，以及聚类准确率和归一化互信息，涵盖了完整和激进的特征选择范围。

LIDFS ranks first in the supervised evaluations and first or tied second in the clustering-based evaluations. It belongs to the top statistical group together with methods that require the number of classes, and it runs faster than its closest competitor.

LIDFS 在监督评估中排名第一，在基于聚类的评估中排名第一或并列第二。它与需要类别数量的方法同属于顶级统计组，且运行速度快于其最接近的竞争对手。

Several recent methods, by contrast, fail to outperform the random baseline. A sensitivity analysis shows that small neighborhood sizes yield the best results.

相比之下，几种近期方法未能超越随机基准。敏感性分析表明，较小的邻域大小能产生最佳结果。