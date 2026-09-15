---
title: "TimeThink: Eliciting Compositional Reasoning in Timeseries Large Language Models"
originalUrl: "https://arxiv.org/abs/2609.13457"
date: "2026-09-15T23:39:07.947Z"
---

# TimeThink: Eliciting Compositional Reasoning in Timeseries Large Language Models
# TimeThink：激发时间序列大语言模型中的组合推理能力

**Abstract:** Timeseries multimodal large language models (TS-MLLMs) have recently begun leveraging the reasoning capabilities of large language models (LLMs) for question-answering tasks. However, these models often fail to capture dynamic temporal patterns, providing only implicit reasoning that lacks the underlying explanations critical for high-stakes applications like healthcare.

**摘要：** 时间序列多模态大语言模型（TS-MLLM）近期开始利用大语言模型（LLM）的推理能力来处理问答任务。然而，这些模型往往难以捕捉动态的时间模式，仅能提供缺乏底层解释的隐式推理，而这种解释对于医疗保健等高风险应用至关重要。

While reinforcement learning (RL)-based timeseries language models aim to address this, they often fall short because they are trained on narrow, in-distribution data and struggle with out-of-distribution compositional questions. To address these challenges, we present TimeThink, a synthetic framework for eliciting compositional timeseries reasoning.

虽然基于强化学习（RL）的时间序列语言模型旨在解决这一问题，但它们往往因训练数据狭窄且局限于分布内（in-distribution）而表现不佳，难以应对分布外（out-of-distribution）的组合性问题。为了应对这些挑战，我们提出了 TimeThink，这是一个用于激发组合时间序列推理能力的合成框架。

Core timeseries primitives (e.g., trend, seasonality) are domain-independent and can be deterministically generated. Guided by this premise, TimeThink first designs a synthetic data generator that produces atomic and composite question-answer pairs, providing objective ground truth with reasoning traces.

核心时间序列基元（如趋势、季节性）是领域无关的，并且可以确定性地生成。基于这一前提，TimeThink 首先设计了一个合成数据生成器，用于产生原子级和组合级的问答对，从而提供带有推理轨迹的客观真值。

Building on this framework, TimeThink employs a reinforcement learning with verifiable rewards (RLVR) training strategy that encourages explicit reasoning. Unlike template-reliant methods, this approach enables the model to learn the underlying logic of composition rather than simply imitating traces.

在此框架基础上，TimeThink 采用了一种带有可验证奖励的强化学习（RLVR）训练策略，以鼓励显式推理。与依赖模板的方法不同，这种方法使模型能够学习组合的底层逻辑，而不仅仅是模仿推理轨迹。

Extensive experiments show that TimeThink, trained only on synthetic data, significantly outperforms strong baselines on both synthetic and real-world benchmarks.

大量实验表明，仅在合成数据上训练的 TimeThink 在合成基准和真实世界基准测试中，均显著优于现有的强基线模型。