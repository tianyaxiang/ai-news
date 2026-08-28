---
title: "Finding the Right Evidence: Factor-Guided Coarse-to-Fine Reasoning for Long Videos"
originalUrl: "https://arxiv.org/abs/2608.26355"
date: "2026-08-28T05:38:15.267Z"
---

# Finding the Right Evidence: Factor-Guided Coarse-to-Fine Reasoning for Long Videos
# 寻找正确的证据：面向长视频的因子引导式由粗到细推理

**Abstract:** While LVLMs rapidly improve, long-video question answering still remains challenging: relevant evidence is sparse, and question-relevant context often fails to provide cues that discriminate the correct answer from plausible alternatives. 

**摘要：** 尽管大型视觉语言模型（LVLMs）发展迅速，但长视频问答仍然充满挑战：相关证据稀疏，且与问题相关的上下文往往无法提供能够将正确答案与合理干扰项区分开来的线索。

Diagnostic analysis on a manually annotated subset of MMR-V shows that prior agentic systems substantially improve cue retrieval over direct VLM inference yet fail to achieve a corresponding gain in answer accuracy, indicating that the bottleneck lies in option-discriminative evidence rather than topical relevance alone.

通过对 MMR-V 手动标注子集进行的诊断分析表明，现有的智能体系统虽然在检索线索方面比直接使用 VLM 推理有显著提升，但在答案准确率上却未能获得相应的增长。这表明瓶颈在于“选项区分性证据”的获取，而不仅仅是主题相关性。

We propose PACE (Progressive Acquisition of Critical Evidence), a factor-guided framework for long-video evidence acquisition. PACE proceeds in two stages: it first indexes clip-level descriptions guided by question-derived factors without observing the candidate answers; it then uses the candidate answers to derive contrastive cues and queries the index for verification.

我们提出了 PACE（关键证据的渐进式获取），这是一个用于长视频证据获取的因子引导式框架。PACE 分两个阶段进行：首先，在不观察候选答案的情况下，根据问题导出的因子对片段级描述进行索引；随后，利用候选答案导出对比线索，并查询索引以进行验证。

On MMR-V with the open-source Qwen3-VL backbone, PACE achieves 42.6% accuracy, outperforming direct inference and prior agentic baselines including Deep Video Discovery (DVD). On the same diagnostic subset, PACE recovers 66.9% of the annotated cues, providing empirical evidence that its gains are associated with improved evidence recovery rather than stronger answer-side priors alone.

在基于开源 Qwen3-VL 主干模型的 MMR-V 测试中，PACE 达到了 42.6% 的准确率，优于直接推理以及包括 Deep Video Discovery (DVD) 在内的现有智能体基线。在相同的诊断子集上，PACE 成功恢复了 66.9% 的标注线索，提供了实证证据，证明其性能提升与证据恢复能力的增强有关，而不仅仅是依赖于更强的答案侧先验。

Consistent gains over DVD on LVBench, Video-MME, EgoSchema, and LongVideoBench suggest that option-aware evidence acquisition transfers beyond MMR-V. Code is available at this https URL.

在 LVBench、Video-MME、EgoSchema 和 LongVideoBench 上相对于 DVD 的持续性能提升表明，这种具备选项感知能力的证据获取方法可以推广到 MMR-V 之外的场景。代码已在链接中提供。