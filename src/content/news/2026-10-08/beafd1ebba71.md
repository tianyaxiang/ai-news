---
title: "EMODE: Dynamic Para-Semantic Experts for Emotion-Aware Speech Language Modeling"
originalUrl: "https://arxiv.org/abs/2610.06956"
date: "2026-10-07T04:00:00.000Z"
excerpt: false
---

Computer Science > Computation and Language arXiv:2610.06956 (cs) [Submitted on 3 Oct 2026] Title: EMODE: Dynamic Para-Semantic Experts for Emotion-Aware Speech Language Modeling Authors: Jianan Pan, Yiwen Gu, Xinze Li, Rui Wang, Kejie Huang.

计算机科学 > 计算与语言 arXiv:2610.06956 (cs) [提交于 2026 年 10 月 3 日] 标题：EMODE：用于情感感知语音语言模型的动态副语义专家 作者：Jianan Pan, Yiwen Gu, Xinze Li, Rui Wang, Kejie Huang。

Abstract: Large speech language models have demonstrated strong capabilities in unified cross-modal understanding and generation, yet paralinguistic cues, especially emotion, remain difficult to preserve. Existing systems typically rely on entangled acoustic representations, which allow the underlying language model to depend excessively on recovered lexical content instead of grounding its behavior in acoustic-prosodic evidence.

摘要：大型语音语言模型在统一的跨模态理解和生成方面展现了强大的能力，但副语言线索（尤其是情感）仍然难以保留。现有系统通常依赖于纠缠的声学表征，这使得底层语言模型过度依赖恢复的词汇内容，而不是将其行为建立在声学韵律证据的基础上。

We address this limitation with EMODE, an emotion-aware speech language model built around \textbf{Dynamic Para-Semantic Experts (DPSE)}. DPSE decomposes continuous speech features into semantic and paralinguistic pathways, routes them dynamically, and fuses them before integration into the language model.

我们通过 EMODE 解决了这一局限性，这是一种围绕“动态副语义专家 (DPSE)”构建的情感感知语音语言模型。DPSE 将连续语音特征分解为语义和副语言路径，对其进行动态路由，并在整合进语言模型之前进行融合。

To turn this structural decomposition into functional specialization, EMODE is trained with a three-stage curriculum consisting of semantic warm-up, paralinguistic activation, and joint refinement, guided by Orthogonal Expert Guidance (OEG), Semantic-to-Acoustic Alignment (SAA), and Gating Diversity Regularization (GDR).

为了将这种结构分解转化为功能专业化，EMODE 采用了三阶段课程进行训练，包括语义预热、副语言激活和联合微调，并由正交专家引导 (OEG)、语义到声学对齐 (SAA) 和门控多样性正则化 (GDR) 进行指导。

Experiments on SER test, empathetic response evaluation, and the newly constructed bilingual MEPA benchmark show that EMODE improves the balance between lexical fidelity and emotional sensitivity, strengthens affect-grounded response generation, and exposes the value of explicit para-semantic factorization for robust cross-corpus emotion understanding.

在 SER 测试、共情响应评估以及新构建的双语 MEPA 基准测试上的实验表明，EMODE 改善了词汇保真度与情感敏感度之间的平衡，加强了基于情感的响应生成，并揭示了显式副语义分解对于稳健的跨语料库情感理解的价值。