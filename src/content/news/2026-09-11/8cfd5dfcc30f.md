---
title: "MLLMs Hallucinate when Information Distribution Drifts in Synergy Heads"
originalUrl: "https://arxiv.org/abs/2609.09206"
date: "2026-09-10T23:26:34.916Z"
---

# MLLMs Hallucinate when Information Distribution Drifts in Synergy Heads
# 多模态大语言模型在协同头信息分布偏移时产生幻觉

**Abstract:** Multimodal Large Language Models (MLLMs) often struggle with hallucinations, thus hindering their reliable practical applications. Existing attention-based mitigation methods mainly rely on indirect signals (e.g., attention weights) that fail to accurately reflect the actual information shift underlying hallucination generation.

**摘要：** 多模态大语言模型（MLLMs）常受幻觉问题困扰，这阻碍了其在实际应用中的可靠性。现有的基于注意力机制的缓解方法主要依赖于间接信号（如注意力权重），这些信号无法准确反映幻觉生成背后实际的信息偏移。

In this paper, we propose HEAL, Head-lEvel information disentAnglement and caLibration for identifying and mitigating hallucinations. HEAL first employs causal noise intervention on multi-head outputs to filter out causally redundant heads. Subsequently, it disentangles information distribution within the remaining heads via the counterfactual Difference-in-Differences, categorizing heads into four types.

在本文中，我们提出了 HEAL（Head-lEvel information disentAnglement and caLibration，即头级信息解耦与校准），用于识别和缓解幻觉。HEAL 首先对多头输出采用因果噪声干预，以过滤掉因果冗余的注意力头。随后，它通过反事实的双重差分法（Difference-in-Differences）对剩余注意力头内的信息分布进行解耦，并将这些头分为四种类型。

Through analysis, we observe: hallucinations happen when information distribution drifts away from a healthy equilibrium in synergy heads, not strongly correlated with the quantity or strength of modality-specific heads. Motivated by this insight, HEAL injects dynamic information calibration factors into the value vectors of synergy heads, and actively regulates visual-language dependencies, steering the output distribution towards factual evidence.

通过分析，我们观察到：幻觉的产生是由于协同头（synergy heads）中的信息分布偏离了健康平衡状态，而这与模态特定头（modality-specific heads）的数量或强度并无强相关性。基于这一洞察，HEAL 将动态信息校准因子注入到协同头的价值向量（value vectors）中，并主动调节视觉-语言依赖关系，从而引导输出分布趋向于事实证据。

Extensive experiments demonstrate that HEAL effectively reduces hallucinations across multiple MLLMs, offering a simple and interpretable pathway to enhance model trustworthiness.

大量实验表明，HEAL 有效降低了多种 MLLM 的幻觉现象，为增强模型可信度提供了一种简单且可解释的途径。