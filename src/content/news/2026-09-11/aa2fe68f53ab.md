---
title: "Edu-QuRating: Multi-Dimensional Educational Data Curation with Distilled Pairwise Judgements"
originalUrl: "https://arxiv.org/abs/2609.09425"
date: "2026-09-10T23:21:53.829Z"
---

# Edu-QuRating: Multi-Dimensional Educational Data Curation with Distilled Pairwise Judgements
# Edu-QuRating：基于蒸馏成对判断的多维度教育数据筛选

**Abstract:** Educational data filters have become a practical way to improve language-model pre-training, but most filters treat educational value as a single scalar property. This may be too broad for some applications, especially if the data set already features a high density of educational material. Useful learning material needs to be accurate, engaging, well structured, and appropriate for the intended audience and application (e.g. learner- vs teacher-facing).

**摘要：** 教育数据过滤器已成为提升语言模型预训练效果的实用手段，但大多数过滤器将“教育价值”视为单一的标量属性。对于某些应用场景而言，这种处理方式可能过于笼统，尤其是当数据集本身已经包含高密度的教育材料时。高质量的学习材料需要具备准确性、吸引力、良好的结构，并针对目标受众和应用场景（例如面向学习者与面向教师）进行适配。

Following QuRating (Wettig et al. 2024), we introduce Edu-QuRating: a pipeline for multi-dimensional educational data scoring and curation. Edu-QuRating defines education-specific rubrics, uses an LLM judge to label sampled document pairs and distills those pairwise preferences into reusable Edu-QuRaters, which can score individual text chunks on a set of educational criteria. Across two sequence-classification base models and six educational criteria, the best Edu-QuRater recovers held-out GPT-4.1-mini pairwise judgements with mean accuracy 0.917.

继 QuRating（Wettig 等人，2024 年）之后，我们引入了 Edu-QuRating：一套用于多维度教育数据评分与筛选的流水线。Edu-QuRating 定义了教育专属的评估准则，利用大语言模型（LLM）裁判对抽样的文档对进行标注，并将这些成对偏好蒸馏为可复用的“Edu-QuRaters”，从而能够根据一系列教育标准对单个文本块进行评分。在两个序列分类基模型和六项教育标准的测试中，表现最好的 Edu-QuRater 在恢复 GPT-4.1-mini 留存成对判断时的平均准确率达到了 0.917。

We then apply the resulting scorers in two applications. First, we investigate the potential of Edu-QuRaters for corpus filtering to improve pretraining of small language models. We scored 322.25M FineWeb-Edu-Fortified documents to obtain a filtered pre-training mixture. In matched single-run pre-training comparisons, models trained with Edu-QuRating-based mixtures reached higher observed aggregate accuracy across nine benchmarks than the FineWeb-Edu baseline, with gains concentrated in particular tasks.

随后，我们将所得的评分器应用于两个场景。首先，我们研究了 Edu-QuRaters 在语料库筛选中提升小型语言模型预训练效果的潜力。我们对 3.2225 亿份 FineWeb-Edu-Fortified 文档进行了评分，以获取筛选后的预训练混合数据。在匹配的单次预训练对比中，使用基于 Edu-QuRating 混合数据训练的模型在九项基准测试中的总准确率高于 FineWeb-Edu 基准，且在特定任务中表现出显著提升。

Second, we used Edu-QuRater scores as reward terms for GRPO post-training. In held-out pairwise judge evaluations, combining Edu-QuRater and answer-structure rewards produced responses preferred to the Qwen3-4B base model on both pedagogical quality and instruction following.

其次，我们将 Edu-QuRater 的评分作为 GRPO 后训练的奖励项。在留存的成对裁判评估中，结合 Edu-QuRater 和答案结构奖励所生成的回复，在教学质量和指令遵循方面均优于 Qwen3-4B 基模型。