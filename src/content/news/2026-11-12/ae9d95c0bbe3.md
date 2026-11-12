---
title: "Exploration via Exploitation: The Blessing of Reward Diversity in Personalized Federated RL"
originalUrl: "https://arxiv.org/abs/2611.12964"
date: "2026-11-11T05:00:00.000Z"
excerpt: false
---

Computer Science > Machine Learning arXiv:2611.12964 (cs) [Submitted on 7 Nov 2026] Title:Exploration via Exploitation: The Blessing of Reward Diversity in Personalized Federated RL Authors:Jiin Woo, Gauri Joshi, Yuejie Chi View a PDF of the paper titled Exploration via Exploitation: The Blessing of Reward Diversity in Personalized Federated RL, by Jiin Woo and 2 other authors View PDF HTML (experimental)

计算机科学 > 机器学习 arXiv:2611.12964 (cs) [提交于 2026 年 11 月 7 日] 标题：通过利用进行探索：个性化联邦强化学习中奖励多样性的优势 作者：Jiin Woo, Gauri Joshi, Yuejie Chi 查看标题为《通过利用进行探索：个性化联邦强化学习中奖励多样性的优势》的论文 PDF，作者：Jiin Woo 及其他 2 位作者 查看 PDF HTML（实验性）

Abstract:While federated reinforcement learning (RL) has traditionally guaranteed high efficiency in homogeneous environments, collaboration is often hindered when agents possess distinct goals. In this paper, we flip this paradigm, framing reward heterogeneity not as a hurdle to consensus, but as a structural asset that catalyzes exploration.

摘要：虽然联邦强化学习 (RL) 在同构环境中传统上保证了高效率，但当智能体拥有不同的目标时，协作往往会受到阻碍。在本文中，我们颠覆了这一范式，将奖励异构性视为一种催化探索的结构性资产，而非达成共识的障碍。

We first propose Personalized Federated Upper Confidence Bound Value Iteration (PF-UCBVI), which achieves optimal linear speedup by decoupling shared dynamics from personalized objectives. To eliminate the risks of explicit exploration, we then introduce Personalized Federated Exploration-Free Value Iteration (PF-EFVI), a purely greedy algorithm that leverages reward diversity to ensure state-action coverage.

我们首先提出了个性化联邦置信上限值迭代 (PF-UCBVI)，它通过将共享动态与个性化目标解耦，实现了最优的线性加速。为了消除显式探索的风险，我们随后引入了个性化联邦免探索值迭代 (PF-EFVI)，这是一种纯贪婪算法，利用奖励多样性来确保状态-动作覆盖。

We prove that PF-EFVI attains logarithmic regret without explicit exploration bonuses under sufficient reward diversity. Our results reveal that agent disagreement shifts the exploration burden from temporal complexity to spatial diversity, enabling efficient collective learning without explicit exploration.

我们证明了在奖励多样性充足的情况下，PF-EFVI 无需显式探索奖励即可实现对数遗憾。我们的结果表明，智能体之间的分歧将探索负担从时间复杂度转移到了空间多样性上，从而在无需显式探索的情况下实现了高效的集体学习。