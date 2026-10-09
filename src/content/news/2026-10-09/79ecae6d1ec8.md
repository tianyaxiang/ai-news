---
title: "Child ASR Adaptation with Adult Retention: An Empirical Study"
originalUrl: "https://arxiv.org/abs/2610.08827"
date: "2026-10-08T04:00:00.000Z"
excerpt: false
---

Automatic Speech Recognition (ASR) systems often underperform for children and non-native speakers, while adapting adult ASR models to child speech can cause adult-speech forgetting. We study child ASR adaptation with adult retention across Arabic and English.

自动语音识别（ASR）系统在处理儿童和非母语人士的语音时表现往往不佳，而将成人ASR模型调整为适应儿童语音时，又可能导致模型对成人语音识别能力的遗忘。我们研究了在阿拉伯语和英语中，如何在实现儿童ASR适应的同时保持对成人语音的识别能力。

We compare full fine-tuning, LoRA, and post-hoc weight-space merging across encoder--decoder, encoder--CTC, and AudioLLM-based ASR systems. Experiments use Arabic native and non-native child speech, English MyST child speech, and adult benchmarks from MGB-2 and LibriSpeech test-clean.

我们比较了在编码器-解码器（encoder-decoder）、编码器-CTC（encoder-CTC）以及基于音频大语言模型（AudioLLM）的ASR系统中，全参数微调、LoRA以及事后权重空间合并（post-hoc weight-space merging）的效果。实验使用了阿拉伯语母语和非母语儿童语音、英语MyST儿童语音，以及来自MGB-2和LibriSpeech test-clean的成人基准数据集。

We evaluate recognition quality with WER and quantify the adaptation--retention trade-off using Retention Index, Child Adaptation Gain, and Adaptation Recovery. Results show that child adaptation is necessary, especially for non-native Arabic and English child speech, but direct adaptation often reduces adult ASR performance.

我们使用词错误率（WER）评估识别质量，并利用保留指数（Retention Index）、儿童适应增益（Child Adaptation Gain）和适应恢复（Adaptation Recovery）来量化适应与保留之间的权衡。结果表明，儿童适应是必要的，特别是对于非母语阿拉伯语和英语儿童语音，但直接适应往往会降低成人ASR的性能。

Bilingual adaptation is more stable than language-specific adaptation. Weight-space merging often improves the trade-off, especially for encoder--CTC, Whisper, and AudioLLM-based ASR, with LERP favoring adult retention and TIES recovering stronger child gains. For the encoder--decoder model, direct bilingual fine-tuning remains strongest in raw WER.

双语适应比特定语言的适应更稳定。权重空间合并通常能改善这种权衡，特别是在编码器-CTC、Whisper和基于AudioLLM的ASR中；其中LERP方法更倾向于成人语音保留，而TIES方法则能获得更强的儿童语音识别增益。对于编码器-解码器模型，直接进行双语微调在原始WER指标上仍然表现最强。