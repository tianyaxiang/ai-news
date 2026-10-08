---
title: "BoT-Feedback: Grounding Multimodal Reasoning in Biomechanical Evidence for Explainable Human Action Feedback"
originalUrl: "https://arxiv.org/abs/2610.06972"
date: "2026-10-07T04:00:00.000Z"
excerpt: false
---

Multimodal Large Language Models (MLLMs) have demonstrated impressive capabilities in visual understanding and multimodal reasoning, yet they remain fundamentally limited in Human Action Feedback Generation. Existing methods infer coaching feedback directly from visual observations, producing generic advice, limited interpretability, and physically implausible hallucinations.

多模态大语言模型（MLLMs）在视觉理解和多模态推理方面展现出了令人印象深刻的能力，但在生成人类动作反馈方面仍然存在根本性的局限。现有的方法直接从视觉观察中推断指导反馈，导致建议泛泛、可解释性有限，并产生物理上不可信的幻觉。

In contrast, expert human coaches diagnose performance through explicit biomechanical reasoning over joint kinematics, posture, and body dynamics. We introduce BoT-Feedback, a framework that grounds MLLM reasoning in structured biomechanical evidence. Our key contribution is Biomechanics of Thought (BoT), a four-stage reasoning framework that progressively identifies the action, localises the critical body regions, analyses quantitative biomechanical differences between expert and student performances, and synthesises interpretable coaching feedback.

相比之下，人类教练专家通过对关节运动学、姿势和身体动力学进行明确的生物力学推理来诊断表现。我们引入了 BoT-Feedback，这是一个将 MLLM 推理建立在结构化生物力学证据基础上的框架。我们的主要贡献是“思维生物力学”（BoT），这是一个四阶段推理框架，它逐步识别动作、定位关键身体区域、分析专家与学生表现之间的定量生物力学差异，并合成可解释的指导反馈。

To support this reasoning process, we develop a plug-and-play Biomechanical Data Parser (BDP) that converts videos into structured biomechanical descriptors and an alignment strategy that temporally matches expert and student motions. We further introduce BiomAF, a benchmark containing paired teacher-student videos, 3D skeletons, biomechanical attributes, and expert-coaching annotations.

为了支持这一推理过程，我们开发了一种即插即用的生物力学数据解析器（BDP），将视频转换为结构化的生物力学描述符，并采用了一种在时间上匹配专家和学生动作的对齐策略。我们进一步引入了 BiomAF，这是一个包含成对的师生视频、3D 骨架、生物力学属性和专家指导注释的基准测试。

Experiments across twelve open- and closed-source MLLMs demonstrate that grounding reasoning in biomechanical evidence consistently improves feedback quality, interpretability, and robustness while substantially reducing biomechanical hallucinations. BoT-Feedback improves the average expert evaluation score from 2.07 to 2.95 (+40%), enabling compact open-source MLLMs to approach the performance of substantially larger proprietary systems for explainable action feedback generation.

在十二个开源和闭源 MLLM 上进行的实验表明，将推理建立在生物力学证据基础上，能够持续提高反馈质量、可解释性和鲁棒性，同时显著减少生物力学幻觉。BoT-Feedback 将平均专家评估得分从 2.07 提高到 2.95（+40%），使紧凑型开源 MLLM 在生成可解释动作反馈方面能够接近规模大得多的专有系统的性能。