---
title: "UIC-AIHealth4All at ArchEHR-QA 2026: Answer-First Evidence Grounding for Clinical Question Answering"
originalUrl: "https://arxiv.org/abs/2608.27467"
date: "2026-09-01T00:52:53.490Z"
---

# UIC-AIHealth4All at ArchEHR-QA 2026: Answer-First Evidence Grounding for Clinical Question Answering
# UIC-AIHealth4All 在 ArchEHR-QA 2026：临床问答中的“答案优先”证据溯源

**Abstract:** We describe the UIC-AIHealth4All system for ArchEHR-QA 2026, a shared task on grounded question answering from electronic health records. We participated in Subtasks 2 (evidence identification), 3 (answer generation), and 4 (answer-evidence alignment). 

**摘要：** 我们介绍了用于 ArchEHR-QA 2026 的 UIC-AIHealth4All 系统，这是一项基于电子健康记录（EHR）进行溯源问答的共享任务。我们参与了子任务 2（证据识别）、子任务 3（答案生成）和子任务 4（答案-证据对齐）。

For Subtasks 2 and 3, we propose an answer-first pipeline in which the model generates candidate answers citing specific note sentences before classifying the full evidence set, exploiting the asymmetry between judging relevance in the abstract versus relative to a generated answer. 

针对子任务 2 和 3，我们提出了一种“答案优先”的流水线：模型在对完整证据集进行分类之前，先生成引用特定病历句子的候选答案。这种方法利用了“抽象判断相关性”与“基于生成答案判断相关性”之间的不对称性。

For Subtask 4, we apply self-consistency voting over five independent model calls, retaining links by vote threshold. Our pipeline ranked third on evidence identification (Strict Micro F1 62.90), ninth on answer generation (Overall 31.90), and fifth on answer-evidence alignment (F1 79.81). 

针对子任务 4，我们通过五次独立的模型调用应用了自洽性投票（self-consistency voting），并根据投票阈值保留链接。我们的流水线在证据识别任务中排名第三（严格微观 F1 为 62.90），在答案生成任务中排名第九（综合得分 31.90），在答案-证据对齐任务中排名第五（F1 为 79.81）。

A post-hoc linguistic analysis of 45 stylistic features reveals that model outputs remain 3.2 Flesch-Kincaid grade levels harder to read than clinician-authored references despite matching their word and sentence counts, suggesting readability warrants explicit optimization in clinical NLP systems. Code and prompts are available at this https URL.

对 45 种语言风格特征的事后语言学分析显示，尽管模型输出的字数和句数与临床医生撰写的参考文本相当，但其阅读难度仍比后者高出 3.2 个 Flesch-Kincaid 等级。这表明在临床自然语言处理（NLP）系统中，可读性值得进行专门的优化。代码和提示词可在该链接获取。