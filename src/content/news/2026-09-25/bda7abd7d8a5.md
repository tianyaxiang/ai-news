---
title: "Signal2Symbol: Neuro-Symbolic Temporal Reasoning for Explainable Physiological Time-Series Anomaly Detection"
originalUrl: "https://arxiv.org/abs/2609.26820"
date: "2026-09-25T00:15:36.030Z"
---

# Signal2Symbol: Neuro-Symbolic Temporal Reasoning for Explainable Physiological Time-Series Anomaly Detection
# Signal2Symbol：用于可解释生理时间序列异常检测的神经符号时序推理

**Abstract:** Physiological time series such as electrocardiograms (ECG) and electroencephalograms (EEG) exhibit complex temporal structure, substantial acquisition variability, and a strong need for transparent decision-making. Although deep models can achieve high detection performance, they often provide limited insight into why a segment is anomalous, how local anomalies relate over time, and whether a detection belongs to a broader recurring pattern.

**摘要：** 心电图 (ECG) 和脑电图 (EEG) 等生理时间序列展现出复杂的时序结构、显著的采集变异性，且对决策透明度有着迫切需求。尽管深度模型能够实现较高的检测性能，但它们往往难以解释为何某一段数据是异常的、局部异常在时间上如何关联，以及该检测结果是否属于某种更广泛的重复模式。

We propose Signal2Symbol, a neuro-symbolic framework for explainable biosignal anomaly detection. The method first converts ECG/EEG signals into symbolic sequences using either a learned VQ-VAE (Vector Quantized Variational Autoencoder) codebook or a SAX (Symbolic Aggregate approXimation) baseline. It then constructs bigram enriched token-window transactions and scores anomalies through rare itemset evidence derived from minimal rare itemset mining.

我们提出了 Signal2Symbol，这是一个用于可解释生物信号异常检测的神经符号框架。该方法首先利用学习到的 VQ-VAE（向量量化变分自编码器）码本或 SAX（符号聚合近似）基准，将 ECG/EEG 信号转换为符号序列。随后，它构建了富含二元组的令牌窗口事务，并通过从最小稀有项集挖掘中得出的稀有项集证据来对异常进行评分。

Detected anomalous windows are merged into intervals and related using Allen interval algebra, enabling composite temporal explanations such as escalation chains, artifact overlap, and cross-channel synchrony. Finally, we introduce a rare temporal concept lattice based on Formal Concept Analysis (FCA), which groups anomalous intervals by shared rare symbolic evidence, Allen temporal relations, channel context, and robustness attributes. The resulting Galois lattice compresses many local detections into interpretable families of temporal-symbolic anomalies.

检测到的异常窗口被合并为区间，并使用艾伦区间代数（Allen interval algebra）进行关联，从而实现复合时序解释，例如升级链、伪影重叠和跨通道同步。最后，我们引入了一种基于形式概念分析 (FCA) 的稀有时间概念格，它根据共享的稀有符号证据、艾伦时间关系、通道上下文和鲁棒性属性对异常区间进行分组。由此产生的伽罗瓦格（Galois lattice）将许多局部检测结果压缩为可解释的时序符号异常族。

We evaluate on three public benchmarks: MIT-BIH Arrhythmia (beat-level ECG), PTB-XL (record-level ECG), and the Bonn EEG dataset (segment-level EEG). We stress-test robustness under additive noise and baseline-wander perturbations. The results highlight the value of neuro-symbolic tokenization for temporal anomaly analysis and show that Allen/FCA reasoning provides compact, interpretable summaries of local detections.

我们在三个公共基准数据集上进行了评估：MIT-BIH 心律失常数据集（心跳级 ECG）、PTB-XL（记录级 ECG）和波恩 EEG 数据集（片段级 EEG）。我们对加性噪声和基线漂移扰动下的鲁棒性进行了压力测试。结果突显了神经符号标记化在时序异常分析中的价值，并表明艾伦/FCA 推理能够为局部检测提供紧凑且可解释的总结。