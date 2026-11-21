---
title: "VisAlloc: Allocating Visual Supervision for On-Policy Self-Distillation"
originalUrl: "https://arxiv.org/abs/2611.25069"
date: "2026-11-20T05:00:00.000Z"
excerpt: false
---

Computer Science > Computer Vision and Pattern Recognition arXiv:2611.25069 (cs) [Submitted on 18 Nov 2026] Title: VisAlloc: Allocating Visual Supervision for On-Policy Self-Distillation Authors: Haoran Xu, Tian Chen, Yuhe Wu, Yanbo Zhao, Junchi Liao, Hongyu Wang, Jiaze Li, Wentao Wang, Yanfeng Li, Rui Qian.

计算机科学 > 计算机视觉与模式识别 arXiv:2611.25069 (cs) [提交于 2026 年 11 月 18 日] 标题：VisAlloc：为在线策略自蒸馏分配视觉监督 作者：Haoran Xu, Tian Chen, Yuhe Wu, Yanbo Zhao, Junchi Liao, Hongyu Wang, Jiaze Li, Wentao Wang, Yanfeng Li, Rui Qian。

Abstract: On-policy self-distillation (OPSD) offers a promising approach to improving visual reasoning in multimodal large language models (MLLMs). However, not all samples benefit equally from privileged visual guidance, and uniform token supervision can dilute visually grounded signals.

摘要：在线策略自蒸馏（OPSD）为提高多模态大语言模型（MLLMs）的视觉推理能力提供了一种有前景的方法。然而，并非所有样本都能从特权视觉引导中获得同等收益，且统一的标记监督可能会稀释视觉基础信号。

We propose VisAlloc, a dual-level framework combining sample-level visual filtering with token-level counterfactual reweighting. A fixed paired-teacher filter retains samples answered correctly from an evidence-centered positive crop but incorrectly from a spatially displaced negative crop.

我们提出了 VisAlloc，这是一个结合了样本级视觉过滤和标记级反事实重加权的双层框架。一个固定的配对教师过滤器会保留那些在以证据为中心的正面裁剪图中回答正确，但在空间位移的负面裁剪图中回答错误的样本。

At the token level, both EMA teachers score the same student-generated response, and their absolute log-probability differences measure view sensitivity. Additional supervision targets tokens admitted by sensitivity or teacher-distribution disagreement, with shared frozen-prior, template-bigram, and student--teacher divergence gates.

在标记层面，两个 EMA 教师对同一个学生生成的响应进行评分，其绝对对数概率差异用于衡量视图敏感度。额外的监督针对那些因敏感度或教师分布分歧而被选中的标记，并结合了共享的冻结先验、模板双元组和学生-教师差异门控。

Inverse-frequency redistribution preserves the total additional weight within each micro-batch, while the positive teacher remains the sole distillation target. Inference requires only the full-image student.

逆频率重分配保留了每个微批次内的总额外权重，同时正向教师仍然是唯一的蒸馏目标。推理过程仅需要全图学生模型。

Across eight benchmarks, our 4B and 9B models achieve macro-averages of 81.44 and 84.92, outperforming Vision-OPD reproductions by 0.97 and 0.52 points, respectively.

在八个基准测试中，我们的 4B 和 9B 模型分别达到了 81.44 和 84.92 的宏观平均分，比 Vision-OPD 的复现结果分别高出 0.97 和 0.52 个百分点。