---
title: "Evidence-Grounded Iterative Reasoning for the Diagnosis of Diffuse Cystic Lung Diseases"
originalUrl: "https://arxiv.org/abs/2611.12981"
date: "2026-11-11T05:00:00.000Z"
excerpt: false
---

Computer Science > Computer Vision and Pattern Recognition arXiv:2611.12981 (cs) [Submitted on 8 Nov 2026] Title: Evidence-Grounded Iterative Reasoning for the Diagnosis of Diffuse Cystic Lung Diseases Authors: Haoqing Li, Jun Shi, Tou Li, Xianmeng Chen, Rui Wang, Yating Peng, Qiwei Jia, Li Gao, Qianyi Chen, Hong An, Ruoyun Ouyang, Xiaowen Hu.

计算机科学 > 计算机视觉与模式识别 arXiv:2611.12981 (cs) [提交于 2026 年 11 月 8 日] 标题：用于弥漫性囊性肺病诊断的证据驱动迭代推理 作者：Haoqing Li, Jun Shi, Tou Li, Xianmeng Chen, Rui Wang, Yating Peng, Qiwei Jia, Li Gao, Qianyi Chen, Hong An, Ruoyun Ouyang, Xiaowen Hu。

Abstract: Overlapping imaging manifestations complicate the differential diagnosis of Diffuse Cystic Lung Diseases (DCLDs), while limited annotated data constrain supervised model development. Multimodal Large Language Models (MLLMs) can integrate imaging and clinical information, but their diagnostic reasoning remains limited by incomplete volumetric perception and insufficient grounding in disease-specific evidence.

摘要：重叠的影像学表现使弥漫性囊性肺病（DCLDs）的鉴别诊断变得复杂，而有限的标注数据限制了监督模型的发展。多模态大语言模型（MLLMs）能够整合影像和临床信息，但其诊断推理仍受限于不完整的体积感知以及对疾病特定证据的支撑不足。

We propose DCLDs-EIR, an evidence-grounded iterative reasoning framework coupling diagnostic hypothesis refinement with multimodal evidence acquisition and verification. Multiview renderings of predicted lung and cyst segmentations characterize global cyst distributions and initialize the differential diagnosis.

我们提出了 DCLDs-EIR，这是一个将诊断假设细化与多模态证据获取和验证相结合的证据驱动迭代推理框架。通过对预测的肺部和囊肿分割进行多视图渲染，可以表征全局囊肿分布并启动鉴别诊断。

Competing hypotheses guide axial CT inspection to identify local findings that, together with clinical context, inform retrieval from a disease-specific knowledge graph. Accumulated patient observations and retrieved knowledge are jointly assessed for diagnostic support and refutation to revise the diagnostic state.

相互竞争的假设指导轴向 CT 检查以识别局部发现，这些发现与临床背景一起，为从疾病特定知识图谱中进行检索提供信息。累积的患者观察结果和检索到的知识被共同评估以进行诊断支持和反驳，从而修正诊断状态。

Updated hypotheses and unresolved distinctions guide subsequent inspection, forming a feedback loop between evidence acquisition and hypothesis verification. Multicenter evaluation demonstrates that DCLDs-EIR consistently improves diagnostic accuracy over baselines and enables traceable differential diagnosis through explicit links between diagnostic hypotheses, patient observations, and disease-specific knowledge.

更新后的假设和未解决的区别指导后续检查，在证据获取和假设验证之间形成反馈循环。多中心评估表明，DCLDs-EIR 在诊断准确性上持续优于基线模型，并通过诊断假设、患者观察结果和疾病特定知识之间的明确联系，实现了可追溯的鉴别诊断。