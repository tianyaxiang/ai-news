---
title: "Disentangled Skill Representations for Predictive Human Modeling"
originalUrl: "https://arxiv.org/abs/2608.23776"
date: "2026-08-27T01:00:12.444Z"
---

# Disentangled Skill Representations for Predictive Human Modeling
# 用于预测性人类建模的解耦技能表征

**Abstract:** Understanding human skill is important for AI systems that collaborate with, coach, or assist people. Unlike typical latent variable estimation problems which rely on single observations, skill is a persistent, compositional, and behaviorally grounded construct that must be inferred from patterns over time.

**摘要：** 理解人类技能对于与人类协作、指导或辅助人类的 AI 系统至关重要。与依赖单一观测值的典型潜在变量估计问题不同，技能是一种持久的、组合性的且基于行为的结构，必须通过随时间变化的模式来推断。

We introduce Skill Abstraction with Interpretable Latents (SAIL), a method for modeling human skill as an interpretable, multi-dimensional construct inferred from naturalistic behavior. Our approach produces a skill embedding that is robust to transient performance fluctuations and learns a transferable representation of human subskills.

我们引入了“具有可解释潜在变量的技能抽象”（SAIL），这是一种将人类技能建模为从自然行为中推断出的可解释、多维结构的方法。我们的方法生成的技能嵌入对短暂的性能波动具有鲁棒性，并能学习到人类子技能的可迁移表征。

Furthermore, SAIL supports skill-informed behavior prediction that generalizes across a variety of in-domain contexts. We represent each individual with a persistent skill embedding that controls a blend between expert and novice bases and is trained using counterfactual subskill swaps for disentanglement.

此外，SAIL 支持基于技能的行为预测，能够推广到各种领域内场景。我们用持久的技能嵌入来表示每个人，该嵌入控制专家和新手基准之间的融合，并使用反事实子技能交换进行训练，以实现解耦。

This design encourages representations that are both robust to performance variation and structured for interpretability. We demonstrate across racing and baseball that SAIL achieves strong predictive performance and consistently improves behaviorally grounded disentanglement over the evaluated baselines, while also improving downstream AI coaching performance.

这种设计促使表征既能对性能变化保持鲁棒，又具备可解释的结构。我们在赛车和棒球领域的实验表明，SAIL 实现了强大的预测性能，在基于行为的解耦方面始终优于评估的基准模型，同时也提升了下游 AI 指导的表现。