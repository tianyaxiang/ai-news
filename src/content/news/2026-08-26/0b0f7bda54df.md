---
title: "LitReview Arena: Evaluating Literature Review Agents with Battle-Style Peer Review Platform"
originalUrl: "https://arxiv.org/abs/2608.21374"
date: "2026-08-25T21:54:19.122Z"
---

# LitReview Arena: Evaluating Literature Review Agents with Battle-Style Peer Review Platform
# LitReview Arena：利用对战式同行评审平台评估文献综述智能体

**Abstract:** Literature reviews are essential to scientific progress, but rigorously evaluating automatically generated reviews remains difficult because many aspects of research utility depend on expert judgment rather than reference-overlap metrics. 
**摘要：** 文献综述对于科学进步至关重要，但严格评估自动生成的综述仍然困难，因为研究效用的许多方面依赖于专家判断，而非简单的参考重叠指标。

We introduce LitReview Arena, a battle-style evaluation platform with a structured protocol tailored to literature review quality: domain experts with AI paper-writing experience compare anonymized drafts, are matched to topics within their expertise, and provide dimension-wise outcomes over five literature-review-specific criteria. 
我们推出了 LitReview Arena，这是一个针对文献综述质量量身定制的对战式评估平台，并采用了结构化协议：具有 AI 论文写作经验的领域专家会对匿名草稿进行对比，系统会将草稿匹配给相应领域的专家，并针对五项文献综述特定标准提供维度评估结果。

From this protocol, we collect approximately 3k expert judgments, each containing five dimension-wise outcomes, and show that even the strongest current systems win only 23.0% of decisive matches against human drafts on overall utility, while agentic LLMs such as Sonar Deep Research substantially outperform base language models by over 60%. 
通过该协议，我们收集了约 3000 条专家评价，每条评价包含五个维度的结果。研究表明，即使是目前最强大的系统，在整体效用上与人类草稿的对决中胜率也仅为 23.0%；而诸如 Sonar Deep Research 之类的智能体化大语言模型（Agentic LLMs）表现显著优于基础语言模型，领先幅度超过 60%。

We further find that existing LLM-as-a-judge methods are substantially misaligned with human experts (Spearman's rho=0.467), especially on synthesis-heavy criteria such as paper structure and research suggestions. 
我们进一步发现，现有的“大模型作为裁判”（LLM-as-a-judge）方法与人类专家的评价存在显著偏差（斯皮尔曼等级相关系数 rho=0.467），特别是在论文结构和研究建议等需要高度综合能力的指标上。

Using the collected preference data, we provide an expert-calibrated evaluator, LitJudge, which improves alignment to Spearman's rho=0.78, comparable to inter-expert consistency; code and data are publicly available at this https URL.
利用收集到的偏好数据，我们提供了一个经专家校准的评估器 LitJudge，它将评价一致性提升至斯皮尔曼等级相关系数 rho=0.78，达到了与专家间一致性相当的水平；代码和数据已在链接中公开。