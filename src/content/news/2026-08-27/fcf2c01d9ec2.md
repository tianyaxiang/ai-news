---
title: "ESQ-Bench: A Multi-Tier Enterprise Oracle Benchmark for Evaluating NL2SQL Dialect Generalization and Silent Semantic Divergence"
originalUrl: "https://arxiv.org/abs/2608.23569"
date: "2026-08-27T00:56:36.383Z"
---

# ESQ-Bench: A Multi-Tier Enterprise Oracle Benchmark for Evaluating NL2SQL Dialect Generalization and Silent Semantic Divergence

**ESQ-Bench：用于评估 NL2SQL 方言泛化能力与静默语义偏差的多层级企业级 Oracle 基准测试**

***

### Abstract / 摘要

State-of-the-art Natural Language to SQL (NL2SQL) models report execution accuracy exceeding 89 percent on established benchmarks such as Spider and BIRD. However, these benchmarks rely on simplified academic schemas and open-source SQL dialects that do not reflect the complexity of enterprise database environments. 

目前最先进的自然语言转 SQL (NL2SQL) 模型在 Spider 和 BIRD 等既有基准测试中，执行准确率已超过 89%。然而，这些基准测试依赖于简化的学术模式和开源 SQL 方言，无法反映企业级数据库环境的复杂性。

We introduce ESQ-Bench, an Oracle-first NL2SQL benchmark with systematic complexity tiers and silent-divergence evaluation across three enterprise schema complexity tiers. We constructed and released six populated schemas (465 tables, 164,682 rows, zero empty tables) with identical seed data on Oracle, PostgreSQL, MySQL, and SQL Server, a four-metric evaluation harness (EM, EX, SR, SD), and 550 gold-validated question-query pairs (Tier-1: 95; Tier-2: 228; Tier-3: 227). 

我们推出了 ESQ-Bench，这是一个以 Oracle 为首的 NL2SQL 基准测试，涵盖了系统化的复杂性层级，并针对三个企业级模式复杂性层级进行了“静默偏差”（silent-divergence）评估。我们构建并发布了六个填充模式（包含 465 张表、164,682 行数据，无空表），并在 Oracle、PostgreSQL、MySQL 和 SQL Server 上使用了相同的种子数据。此外，我们还提供了一套四指标评估工具（EM、EX、SR、SD）以及 550 对经过黄金标准验证的问题-查询对（第一层：95；第二层：228；第三层：227）。

Schema-linked prompting with GPT-4o shows monotonic execution-match degradation across tiers: 79.8, 60.3, and 57.2 percent EX on executed queries (June 2026), versus 75.6, 80.4, and 95.8 percent on an earlier 142-question pilot slice. EM stays below 7 percent tier-wide; operational silent-divergence reaches 73 to 99 percent among EX-passing queries. Failure analysis shows wrong-result semantics dominate at higher tiers. 

使用 GPT-4o 进行模式链接提示（Schema-linked prompting）显示，执行匹配率随层级增加呈单调下降趋势：在已执行查询中，EX 分别为 79.8%、60.3% 和 57.2%（2026 年 6 月数据），而此前在 142 个问题的试点切片中，该数据分别为 75.6%、80.4% 和 95.8%。各层级的 EM（精确匹配）均保持在 7% 以下；在通过 EX 测试的查询中，操作性静默偏差高达 73% 至 99%。故障分析表明，在更高层级中，错误结果语义占据主导地位。

Claude Sonnet 4.6 with schema-linked prompts reaches 87.4, 74.9, and 68.7 percent EX (executed queries), exceeding GPT-4o schema-linked on every tier. GPT-4o zero-shot EX on executed queries (78.7, 73.5, and 77.8 percent) inverts schema-linked at Tiers 2 to 3 due to lower execution rates and survivor bias in the zero-shot versus schema-linked analysis. Local Llama 3.2 schema-linked reaches only 13.3 percent bank-wide EX (73 out of 550), underscoring the gap between closed API models and open-weight baselines on enterprise Oracle schemas.

Claude Sonnet 4.6 在使用模式链接提示时，EX（已执行查询）分别达到了 87.4%、74.9% 和 68.7%，在所有层级上均超过了 GPT-4o 的模式链接表现。GPT-4o 的零样本（zero-shot）EX 在已执行查询中分别为 78.7%、73.5% 和 77.8%，由于零样本分析与模式链接分析在执行率和幸存者偏差上的差异，其在第二至第三层级表现出与模式链接相反的趋势。本地运行的 Llama 3.2 在模式链接下，全库 EX 仅达到 13.3%（550 个中仅 73 个），这凸显了闭源 API 模型与开源权重基准在企业级 Oracle 模式上的差距。