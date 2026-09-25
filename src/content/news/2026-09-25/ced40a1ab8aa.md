---
title: "EduBehaviors: Assertion-based Schemas for Auditable Coding of Educational Dialogues"
originalUrl: "https://arxiv.org/abs/2609.27043"
date: "2026-09-25T00:09:18.155Z"
---

# EduBehaviors: Assertion-based Schemas for Auditable Coding of Educational Dialogues
# EduBehaviors：用于教育对话可审计编码的基于断言的模式

**Abstract:** Large language models have allowed the rapid deployment of pedagogical annotations corresponding to constructs of interest, allowing a natural language interface for generating classifications on a conversational dataset. 
**摘要：** 大型语言模型（LLM）使得针对特定研究构念的教学标注能够快速部署，并提供了一种自然语言接口，用于在对话数据集上生成分类。

However due to the opaque nature of LLM reasoning, we have no verifiable, mechanistic insight into why a model chose a label for an utterance. 
然而，由于大语言模型推理过程的不透明性，我们无法从机制上验证模型为何为某段话选择特定的标签。

We introduce the EduBehaviors framework, an interpretable, scalable approach to annotating educational data that uses LLMs to measure repeated observable behaviors relevant to many constructs of interest and then learns a classifier for the construct based on these observable behaviors. 
我们引入了 EduBehaviors 框架，这是一种可解释且可扩展的教育数据标注方法。该框架利用大语言模型来衡量与多个研究构念相关的重复性可观察行为，并基于这些行为学习针对该构念的分类器。

We evaluate the framework on the TalkMoves dataset, predicting the Teacher TalkMoves labels. Our best configuration results in a macro-F1 of 0.673 and 0.688 Cohen's kappa, proving competitive with direct prompting approaches. 
我们在 TalkMoves 数据集上评估了该框架，用于预测教师 TalkMoves 标签。我们的最佳配置实现了 0.673 的宏观 F1 分数和 0.688 的 Cohen's kappa 系数，证明其表现与直接提示（direct prompting）方法具有竞争力。

In addition, we release EduBehaviors Toolkit, two tools allowing researchers to operationalize the EduBehaviors framework in their own data.
此外，我们发布了 EduBehaviors 工具包，包含两款工具，旨在帮助研究人员在各自的数据集中应用 EduBehaviors 框架。