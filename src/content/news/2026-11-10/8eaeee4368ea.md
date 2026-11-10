---
title: "Compression of Emotion in Language Model Representations"
originalUrl: "https://arxiv.org/abs/2611.08683"
date: "2026-11-09T05:00:00.000Z"
excerpt: false
---

Large language models (LLMs) have been evaluated on their ability to identify emotions expressed in text and produce fluent emotional language. However, output predictions alone do not reveal how fine-grained emotion distinctions are organized internally.

大型语言模型（LLMs）在识别文本中表达的情感以及生成流畅的情感语言方面的能力已经得到了评估。然而，仅凭输出预测并不能揭示细粒度的情感区分在模型内部是如何组织的。

We study seven LLMs on GoEmotions, an English Reddit dataset annotated with 27 fine-grained emotion categories plus neutral. We compare model predictions and emotion-prompted final-token representations with the 28 GoEmotions categories and with coarser emotion-family and sentiment groupings.

我们研究了七个在 GoEmotions 数据集上运行的 LLM，该数据集是一个包含 27 个细粒度情感类别及“中性”类别的英语 Reddit 数据集。我们将模型预测和由情感提示生成的最终标记表示与 28 个 GoEmotions 类别，以及更粗略的情感家族和情绪分组进行了比较。

We find a consistent pattern of $\textit{overcompression}$ relative to the fine-grained GoEmotions taxonomy. Under the tested KMeans protocol, when we cluster their hidden representations without using emotion labels, the clearest split is into two groups that largely separate positive from negative emotion.

我们发现相对于细粒度的 GoEmotions 分类法，存在一种一致的“过度压缩”模式。在测试的 KMeans 协议下，当我们不使用情感标签对它们的隐藏表示进行聚类时，最清晰的划分是分为两组，这两组在很大程度上将积极情感与消极情感分离开来。

Coarser emotion groupings are also recovered with fewer clusters than the full 28-category taxonomy. Yet linear probes retain substantial fine-grained predictive information. These results suggest that fine-grained emotion information remains accessible even though broader affective structure more strongly organizes the unsupervised geometry.

与完整的 28 类分类法相比，使用较少的聚类也能恢复出更粗略的情感分组。然而，线性探测器保留了大量的细粒度预测信息。这些结果表明，尽管更广泛的情感结构更强烈地组织了无监督的几何结构，但细粒度的情感信息仍然是可获取的。