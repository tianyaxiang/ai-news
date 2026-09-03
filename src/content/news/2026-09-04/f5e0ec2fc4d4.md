---
title: "SpeakPay: Domain-Adaptive LoRA Fine-Tuning of Whisper for Low-Resource Nepali Financial Speech Recognition"
originalUrl: "https://arxiv.org/abs/2609.01737"
date: "2026-09-03T23:26:23.875Z"
---

# SpeakPay: Domain-Adaptive LoRA Fine-Tuning of Whisper for Low-Resource Nepali Financial Speech Recognition
# SpeakPay：针对低资源尼泊尔语金融语音识别的 Whisper 领域自适应 LoRA 微调

**Abstract:** Mobile payment applications in Nepal are graphically mediated and largely inaccessible to visually impaired users. This paper presents SpeakPay, a voice-first digital wallet, and documents the central technical contribution: a controlled study of domain adaptation for low-resource financial speech recognition.

**摘要：** 尼泊尔的移动支付应用程序主要依赖图形界面，这对视障用户来说在很大程度上是无法使用的。本文介绍了 SpeakPay，这是一款以语音为先的数字钱包，并记录了其核心技术贡献：一项针对低资源金融语音识别的领域自适应对照研究。

We introduce NepFinSpeech-403, a 403-utterance dataset of Nepali financial voice commands (send, load, and balance operations spanning 237 unique numerals), and fine-tune Whisper large-v2 with LoRA. On the held-out test set, the domain-adapted model reduces Word Error Rate from 129.95% (zero-shot baseline) to 42.58% --- a 67.2% relative reduction --- and improves Devanagari numeral recognition accuracy from 0.0% to 73.9%.

我们引入了 NepFinSpeech-403，这是一个包含 403 条尼泊尔语金融语音指令的数据集（涵盖发送、充值和余额查询操作，涉及 237 个独特的数字），并使用 LoRA 对 Whisper large-v2 模型进行了微调。在留出的测试集上，经过领域自适应的模型将词错误率（WER）从 129.95%（零样本基准）降低至 42.58%（相对降低了 67.2%），并将天城体数字的识别准确率从 0.0% 提升至 73.9%。

We find that word-level metrics understate the practical task-level impact: domain adaptation improves the Transaction Success Rate from 1.67% to 33.33%, a roughly 20x gain. The improvement is consistent at the individual-utterance level (sign test, $p < 10^{-17}$) and across all command types.

我们发现，词级指标低估了实际任务层面的影响：领域自适应将交易成功率从 1.67% 提高到了 33.33%，提升了约 20 倍。这种改进在单条语音指令层面（符号检验，$p < 10^{-17}$）以及所有指令类型中均表现一致。

A data efficiency analysis shows that as few as 100 domain-specific utterances are sufficient to halve the zero-shot WER, with performance plateauing around 300 examples. Error analysis reveals systematic numeral confusion patterns (zero insertion/deletion, prefix hallucination) that account for the majority of remaining transaction failures. The trained system is deployed as a publicly accessible voice-first web application. All code, dataset, model weights, and this paper are released at this https URL.

数据效率分析表明，仅需 100 条特定领域的语音数据就足以将零样本词错误率减半，且性能在 300 条样本左右趋于平稳。错误分析揭示了系统性的数字混淆模式（如零的插入/删除、前缀幻觉），这些问题导致了剩余大部分交易失败。训练好的系统已部署为可公开访问的语音优先 Web 应用程序。所有代码、数据集、模型权重及本文均已在指定链接发布。