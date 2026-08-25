---
title: "KSE-Web: An Analysis of Hybrid Retrieval and LLM-Assisted Query Expansion for Low-Resource Khmer Semantic Search"
originalUrl: "https://arxiv.org/abs/2608.21365"
date: "2026-08-25T21:54:42.995Z"
---

# KSE-Web: An Analysis of Hybrid Retrieval and LLM-Assisted Query Expansion for Low-Resource Khmer Semantic Search
# KSE-Web：针对低资源高棉语语义搜索的混合检索与大模型辅助查询扩展分析

**Abstract:** As a low-resource language, Khmer presents several retrieval challenges, including limited annotated data, ambiguous word boundaries, weak support in multilingual embedding models, and frequent mixed Khmer-English usage. This paper presents KSE-Web, an analysis of hybrid retrieval and LLM-assisted query expansion for Khmer semantic search.

**摘要：** 作为一种低资源语言，高棉语在检索方面面临诸多挑战，包括标注数据有限、词边界模糊、多语言嵌入模型支持薄弱以及高棉语与英语混合使用频繁等问题。本文介绍了 KSE-Web，这是一项针对高棉语语义搜索的混合检索与大模型（LLM）辅助查询扩展的分析研究。

We construct the dataset from approximately 17K candidate Khmer titles and retain 3K cleaned full-text Khmer documents after filtering, normalization, deduplication, and document-length control. The dataset includes 300 manually reviewed user-style Khmer search queries and silver relevance labels with partial human verification.

我们从约 1.7 万个高棉语候选标题中构建了数据集，经过过滤、归一化、去重和文档长度控制后，保留了 3000 篇清洗后的高棉语全文文档。该数据集包含 300 条经人工审核的用户风格高棉语搜索查询，以及经过部分人工验证的银标准（silver）相关性标签。

We evaluate character n-gram BM25, multilingual dense retrieval, hybrid BM25+dense retrieval, and LLM-assisted query expansion using Qwen2.5 models. Experimental results show that BM25 achieves the strongest overall performance, reaching 0.943 Recall and 0.876 nDCG. Hybrid BM25+dense retrieval performs comparably, achieving 0.929 Recall and 0.871 nDCG, while dense retrieval alone performs lower.

我们评估了字符 n-gram BM25、多语言稠密检索、混合 BM25+稠密检索，以及使用 Qwen2.5 模型进行的 LLM 辅助查询扩展。实验结果表明，BM25 实现了最强的整体性能，召回率（Recall）达到 0.943，nDCG 达到 0.876。混合 BM25+稠密检索表现相当，召回率为 0.929，nDCG 为 0.871，而单独的稠密检索表现较低。

LLM-assisted query expansion does not outperform non-expanded retrieval; however, Qwen2.5-3B produces substantially stronger expanded-query results than Qwen2.5-0.5B, suggesting that LLM size and expansion quality matter for low-resource Khmer retrieval. Our analysis further shows that direct LLM expansion can introduce topic drift, generic terms, and noisy reformulations, while simple filtering may remove useful semantic cues.

LLM 辅助查询扩展的效果并未超过非扩展检索；然而，Qwen2.5-3B 产生的扩展查询结果明显优于 Qwen2.5-0.5B，这表明对于低资源高棉语检索而言，LLM 的规模和扩展质量至关重要。我们的分析进一步显示，直接的 LLM 扩展可能会引入主题偏移、通用术语和噪声重构，而简单的过滤可能会移除有用的语义线索。

These findings highlight both the potential and limitations of LLM-assisted retrieval for Khmer semantic search and provide a foundation for future Khmer retrieval datasets with stronger human-verified annotations and Khmer-aware retrieval models. The dataset and documentation will be made available at this http URL.

这些发现突显了 LLM 辅助检索在高棉语语义搜索中的潜力和局限性，并为未来构建具有更强人工验证标注的高棉语检索数据集以及开发具备高棉语感知能力的检索模型奠定了基础。数据集和文档将在指定网址提供。