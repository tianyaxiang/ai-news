---
title: "Auditing and Repairing LLM-as-Judge Failures in a Production Text-to-SQL Pipeline"
originalUrl: "https://arxiv.org/abs/2609.30290"
date: "2026-09-29T01:09:44.298Z"
---

# Auditing and Repairing LLM-as-Judge Failures in a Production Text-to-SQL Pipeline
# 审计与修复生产环境 Text-to-SQL 流水线中“大模型作为裁判”的失效问题

**Abstract:** Production text-to-SQL pipelines often end with an LLM-as-judge whose agreement with human annotators has never actually been measured. When we checked ours, the deployed gpt-4o-mini judge agreed with two-author gold at only Cohen's kappa = 0.04 on a disagreement-enriched set and 0.42 on a uniform-random spot-check, over-flagging 77.1% of the human-FAITHFUL cases in the enriched set.

**摘要：** 生产环境中的 Text-to-SQL 流水线通常以“大模型作为裁判”（LLM-as-judge）作为终审环节，但其与人类标注者的一致性往往从未得到实际测量。当我们对自身的系统进行检查时，发现已部署的 gpt-4o-mini 裁判在“差异增强数据集”上与两位作者标注的黄金标准一致性仅为 Cohen's kappa = 0.04，在随机抽查中也仅为 0.42；在增强数据集中，它错误地标记了 77.1% 本应被人类判定为“忠实”（FAITHFUL）的案例。

Most of its over-flags trace back to a single mechanism we call GRADE-HALLUCINATION. A self-hosted Qwen3.6-27B replacement (kappa = 0.72) lands in the same range as Claude Opus 4.7 (kappa = 0.71); the head-to-head is underpowered at n = 96, but for the deployment decision that hardly matters, since Qwen costs roughly 1/300 as much per call.

其大部分误报归因于一种我们称之为“评分幻觉”（GRADE-HALLUCINATION）的机制。我们使用自托管的 Qwen3.6-27B 模型进行替换（kappa = 0.72），其表现与 Claude Opus 4.7（kappa = 0.71）处于同一水平；尽管在 n = 96 的样本量下，两者直接对比的统计效力不足，但这对于部署决策几乎没有影响，因为 Qwen 的单次调用成本仅为后者的 1/300 左右。

Ensembling does not help for free. Pairing the weak judge with a stronger one degrades agreement, whereas three strong judges under unanimity routing reach kappa = 0.79 at 89.7% auto-coverage. Applied out-of-domain, the same audit recipe flags 25.5% of BIRD-financial's expert-authored gold SQLs as candidate gold-SQL issues under our annotation protocol. Code and pre-registration are at this https URL.

集成学习并不能免费带来性能提升。将弱裁判与强裁判配对反而会降低一致性，而采用三个强裁判并执行“一致性路由”（unanimity routing）策略，可以在 89.7% 的自动覆盖率下达到 kappa = 0.79。将同样的审计方法应用于域外数据时，根据我们的标注协议，它将 BIRD-financial 数据集中 25.5% 由专家编写的黄金 SQL 标记为潜在的黄金 SQL 问题。代码和预注册信息请见此链接。