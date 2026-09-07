---
title: "When Seeing Overrides Knowing: Visual Dominance and Deferral-Based Method for Personalized Safety in VLMs"
originalUrl: "https://arxiv.org/abs/2609.04281"
date: "2026-09-07T23:40:59.767Z"
---

# When Seeing Overrides Knowing: Visual Dominance and Deferral-Based Method for Personalized Safety in VLMs
# 当视觉凌驾于认知之上：视觉主导性与基于推迟机制的视觉语言模型（VLM）个性化安全方法

**Abstract:** Vision-language models (VLMs) are increasingly deployed in high-stakes settings, where a response that is reasonable in general may still be unsafe for a particular user whose medical, emotional, or situational context is unknown to the model. 
**摘要：** 视觉语言模型（VLM）正越来越多地被部署在高风险场景中。在这些场景下，对于模型而言，一个通用的合理回答可能对特定用户来说是不安全的，因为模型并不了解该用户的医疗、情感或情境背景。

We study this problem of personalized safety in multimodal systems and introduce MPS-Bench, a benchmark of 5,181 scenarios from 584 real-world images across 12 high-risk domains, each paired with a hidden user profile. 
我们研究了多模态系统中的个性化安全问题，并引入了 MPS-Bench。这是一个包含 5,181 个场景的基准测试集，涵盖了 12 个高风险领域的 584 张真实世界图像，每张图像都配有一个隐藏的用户画像。

Evaluating eight frontier VLMs, we find that they almost always respond directly (86-99%) rather than seek missing context, and none exceeds 2.6/5 on personalized safety. 
通过对八个前沿 VLM 进行评估，我们发现它们几乎总是直接给出回答（占比 86-99%），而不是寻求缺失的背景信息；且在个性化安全指标上，没有一个模型的得分超过 2.6/5。

To understand why these failures arise, we analyze multimodal interactions and identify visual dominance: visual information enters text representations early and suppresses textual risk signals during multimodal fusion. 
为了理解这些失败产生的原因，我们分析了多模态交互并识别出“视觉主导性”（visual dominance）：视觉信息在早期就进入了文本表征，并在多模态融合过程中抑制了文本层面的风险信号。

Causal interventions reveal a two-stage mechanism in which visual affect is first transferred into the text stream in early layers and then shapes the final decision through this altered text representation, making late-stage internal remediation unreliable. 
因果干预揭示了一个两阶段机制：视觉影响首先在早期层被转移到文本流中，随后通过这种被改变的文本表征来塑造最终决策，这使得后期的内部补救措施变得不可靠。

Motivated by this mechanism, we propose PRISM, a lightweight input monitor that uses bidirectional cross-modal modulation to predict when a query is likely to require deferral. 
受此机制启发，我们提出了 PRISM，这是一个轻量级的输入监控器，它利用双向跨模态调制来预测查询何时可能需要推迟处理。

PRISM achieves 0.978 AUC and strictly dominates the safety-utility Pareto frontier across all tested models.
PRISM 实现了 0.978 的 AUC 值，并在所有测试模型中严格占据了安全-效用帕累托前沿（Pareto frontier）的优势地位。