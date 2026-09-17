---
title: "Few-Shot Degradation Is Not What It Seems: Behavioral Evidence, Representation Analysis, and a Random-Text Control Across 12 Models, 2 Tasks, and 2 Architectures"
originalUrl: "https://arxiv.org/abs/2609.15990"
date: "2026-09-16T23:58:48.158Z"
---

# Few-Shot Degradation Is Not What It Seems: Behavioral Evidence, Representation Analysis, and a Random-Text Control Across 12 Models, 2 Tasks, and 2 Architectures

**少样本提示退化并非表面看起来那样：基于12个模型、2项任务和2种架构的行为证据、表征分析及随机文本对照研究**

***

**Abstract:** Few-shot prompting sometimes degrades language models instead of helping them, but why this happens is unknown. We evaluate 12 open-weight models on two Ukrainian tasks—news classification and legal case outcome prediction—and find that the effect is strongly task-dependent: the same models that gain +24 pp on news show only +3.4 pp on legal text, with two models degrading.

**摘要：** 少样本提示（Few-shot prompting）有时不仅不能帮助语言模型，反而会导致其性能下降，但其背后的原因尚不明确。我们针对两项乌克兰语任务——新闻分类和法律案件结果预测，评估了12个开源权重模型。研究发现，这种效应具有极强的任务依赖性：同一模型在新闻任务上准确率提升了24个百分点，但在法律文本任务上仅提升了3.4个百分点，甚至有两个模型出现了性能退化。

***

To understand why, we look inside the models. Prior work measures how much hidden states shift between zero-shot and few-shot modes, but few-shot prompts are much longer, and that length difference alone moves representations. We propose a simple fix: replace demonstrations with length-matched random text to measure the shift caused by prompt length, then subtract it. The resulting metric—content delta—isolates how much the model's representations change because of what the demonstrations say, not how long they are.

为了探究原因，我们深入分析了模型内部。以往的研究通过测量零样本（zero-shot）和少样本模式下隐藏状态的偏移量来评估，但少样本提示通常长得多，仅长度差异本身就会导致表征发生位移。我们提出了一种简单的修正方法：用长度匹配的随机文本替换示例，以测量由提示长度引起的偏移，然后将其扣除。由此得出的指标——“内容增量”（content delta）——能够剥离出模型表征的变化究竟是因为示例的内容，还是仅仅因为其长度。

***

This changes the picture entirely: raw shift does not predict whether few-shot helps or hurts (r = 0.20), but content delta does (rho = +0.65, p = 0.043). Models that restructure representations more from demonstration content benefit more—the opposite of the intuitive "distortion" explanation. Masking demonstrations in Llama 3.3 70B confirms the finding causally, recovering accuracy above the zero-shot baseline.

这一发现彻底改变了原有的认知：原始偏移量无法预测少样本提示是有益还是有害（r = 0.20），但“内容增量”可以（rho = +0.65, p = 0.043）。那些因示例内容而更多地重构其表征的模型，反而能获得更大的收益——这与直觉上的“失真”解释恰恰相反。在 Llama 3.3 70B 模型中对示例进行掩码处理，从因果关系上证实了这一发现，并使准确率恢复到了高于零样本基线的水平。