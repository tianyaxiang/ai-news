---
title: "Consistency Is Not Validity: Self-Rewarded Moral Argumentation Makes Language Models Decisive but Pliable"
originalUrl: "https://arxiv.org/abs/2610.30349"
date: "2026-10-23T04:00:00.000Z"
excerpt: false
---

Computer Science > Computation and Language arXiv:2610.30349 (cs) [Submitted on 21 Oct 2026] Title: Consistency Is Not Validity: Self-Rewarded Moral Argumentation Makes Language Models Decisive but Pliable Authors: Marius De Kuthy Meurers, Aaron Parisi, Bernd Bohnet.

计算机科学 > 计算与语言 arXiv:2610.30349 (cs) [提交于 2026 年 10 月 21 日] 标题：一致性并非有效性：自我奖励的道德论证使语言模型变得果断但易受影响 作者：Marius De Kuthy Meurers, Aaron Parisi, Bernd Bohnet。

Abstract: LLMs are increasingly consulted for moral judgment. We aim to improve performance on such tasks by rewarding good arguments, on the premise that arguing well increases the likelihood of judging well. We train a reinforcement learning policy initialized from a state-of-the-art language model in a self-judged tournament with masked thinking: the generated arguments are judged pairwise on argument quality by the policy itself.

摘要：人们越来越多地咨询大语言模型（LLM）以进行道德判断。我们旨在通过奖励优秀的论证来提高此类任务的性能，其前提是善于论证会增加做出正确判断的可能性。我们训练了一种由最先进语言模型初始化的强化学习策略，并在掩盖思维的情况下进行自我评判的竞赛：生成的论证由策略本身进行成对的质量评估。

As an empirical basis, we extract authentic dilemmas from classic novels, using a logic solver to verify that each constitutes a conflict. We show that our judge rates argument quality like human annotators, and the policy then adopts the language register that it rewards.

作为实证基础，我们从经典小说中提取了真实的困境，并使用逻辑求解器来验证每一个困境是否构成冲突。我们证明了我们的评判者对论证质量的评分与人类标注者相似，随后该策略采用了其所奖励的语言语体。

Testing on the external benchmarks MoralChoice, ELEPHANT, and MORABLES, we find that the policy becomes more decisive and invariant to the order in which options are presented, but sycophancy and reframing remain a challenge to validity. Two ablation studies with synthetic dilemmas and unmasked thinking match the reordering gains, but show a weaker register shift and higher sycophancy.

在外部基准 MoralChoice、ELEPHANT 和 MORABLES 上进行测试后，我们发现该策略变得更加果断，且对选项呈现的顺序具有不变性，但阿谀奉承和重构问题仍然是对有效性的挑战。两项关于合成困境和非掩盖思维的消融研究虽然在重排序增益上表现一致，但显示出较弱的语体转换和更高的阿谀奉承倾向。

We conclude that consistency is not validity: consistency under reordering can be optimized without improving the moral judgment it is meant to signal.

我们的结论是，一致性并非有效性：在重排序下的一致性可以在不改善其本应代表的道德判断的情况下得到优化。