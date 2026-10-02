---
title: "ContextAdapt: Evaluating Contextual Adaptation and Value Alignment in LLMs"
originalUrl: "https://arxiv.org/abs/2609.38260"
date: "2026-10-02T00:58:48.487Z"
---

# ContextAdapt: Evaluating Contextual Adaptation and Value Alignment in LLMs
# ContextAdapt：评估大语言模型中的语境适应性与价值对齐

**Abstract:** Values such as honesty, autonomy, and confidentiality are often regarded as general principles underpinning AI alignment. However, what it means to act in accordance with these values can depend on the context in which a decision is made. In this paper, we ask whether large language models (LLMs) appropriately adapt the application of a value across professional settings, while remaining consistent when contextual changes do not alter the relevant professional norm.

**摘要：** 诚实、自主和保密等价值观通常被视为支撑人工智能对齐的通用原则。然而，在决策过程中，如何根据这些价值观行事往往取决于具体的语境。在本文中，我们探讨了大语言模型（LLMs）是否能在不同的专业环境中适当地调整价值观的应用，同时在语境变化不改变相关专业规范时保持一致性。

To study this, we introduce ContextAdapt, an evaluation framework covering honesty, autonomy, and confidentiality across medicine, law, finance, and national security. Drawing on primary-source professional and regulatory documents, we construct a value x domain framework and use this to develop scenarios testing both default professional rules and recognised exceptions. We evaluate 12 LLMs on both the actions they recommend and the justifications they provide.

为了研究这一问题，我们引入了 ContextAdapt，这是一个涵盖医学、法律、金融和国家安全领域中诚实、自主和保密原则的评估框架。通过参考原始的专业和监管文件，我们构建了一个“价值观 x 领域”框架，并利用该框架开发了测试默认专业规则及公认例外情况的场景。我们对 12 个大语言模型在推荐行动和提供理由两方面进行了评估。

In our main experiment, models achieve 95.6% mean appropriateness, although the use of the correct domain-specific justification varies substantially across models, from 25.6% to 76.9%. In a separate factorial experiment, explicitly naming the professional domain and changing the role of the model have limited effect on behaviour. Varying stakes, however, reveals severe but localised failures: in some cases, models alter their responses even though the underlying专业 obligation remains unchanged.

在我们的主要实验中，模型的平均适当性达到了 95.6%，但不同模型在使用正确的领域特定理由方面存在显著差异，从 25.6% 到 76.9% 不等。在另一项析因实验中，明确指出专业领域并改变模型的角色对行为的影响有限。然而，改变风险程度揭示了严重但局部的失败：在某些情况下，尽管潜在的专业义务保持不变，模型仍会改变其响应。

In particular, perceived severity appears to act as a cue for disclosure across both honesty and confidentiality scenarios. These results show that evaluating value alignment requires us to consider not only whether models follow abstract principles, but whether they apply them appropriately across different contexts.

特别值得注意的是，感知到的严重程度似乎成为了诚实和保密场景中信息披露的触发信号。这些结果表明，评估价值对齐不仅需要考虑模型是否遵循抽象原则，还需要考虑它们是否能在不同语境下适当地应用这些原则。