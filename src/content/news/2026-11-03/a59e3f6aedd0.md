---
title: "Adaptive Personalization Under Preference Epistemic Uncertainty"
originalUrl: "https://arxiv.org/abs/2610.40930"
date: "2026-11-02T05:00:00.000Z"
excerpt: false
---

Computer Science > Computation and Language arXiv:2610.40930 (cs) [Submitted on 29 Oct 2026] Title: Adaptive Personalization Under Preference Epistemic Uncertainty Authors: Priyanka Dey, Rajarshi Das, Vikas Bahirwani, Qi Zeng, Julia Kruk, Qi Qi.

计算机科学 > 计算与语言 arXiv:2610.40930 (cs) [提交于 2026 年 10 月 29 日] 标题：偏好认知不确定性下的自适应个性化 作者：Priyanka Dey, Rajarshi Das, Vikas Bahirwani, Qi Zeng, Julia Kruk, Qi Qi。

Abstract: Human preferences change over time: an established preference may remain valid over time, become uncertain as context shifts, or be explicitly revised. Effective personalization requires conversational AI to adapt its response strategy to evolving preferences rather than relying on passive memory retrieval.

摘要：人类的偏好会随时间而改变：既定的偏好可能长期有效，也可能随着语境的变化变得不确定，或者被明确修改。有效的个性化要求对话式人工智能能够根据不断变化的偏好调整其响应策略，而不是仅仅依赖被动的记忆检索。

We formalize this capability as adaptive personalization under epistemic uncertainty. A human preference study further confirms that people favor state-contingent response strategies as preference uncertainty changes.

我们将这种能力形式化为偏好认知不确定性下的自适应个性化。一项人类偏好研究进一步证实，随着偏好不确定性的变化，人们更倾向于基于状态的响应策略。

To evaluate whether language models mirror this adaptation, we create a multilingual benchmark spanning 250 personas, 5 languages, and 25K conversational turns that decouples strategy selection from response execution.

为了评估语言模型是否能反映这种适应性，我们创建了一个多语言基准测试，涵盖 250 个人物角色、5 种语言和 2.5 万次对话轮次，该基准测试将策略选择与响应执行分离开来。

Across eight closed- and open-weight models, we uncover a recognition-generation gap: models reliably identify appropriate strategies when selecting among candidate options, but collapse during open-ended generation, suffering a 35-46% drop in strategy calibration.

在八种闭源和开源权重模型中，我们发现了一个识别与生成之间的差距：模型在候选选项中选择时能可靠地识别出合适的策略，但在开放式生成过程中却表现不佳，策略校准能力下降了 35-46%。

Crucially, this failure is systematic: models default to exploit-first behavior, over-relying on existing preferences regardless of preference epistemic uncertainty.

至关重要的是，这种失败是系统性的：模型默认采取“优先利用”行为，无论偏好认知不确定性如何，都过度依赖现有偏好。

We show this failure is addressable: while prompting interventions fail, targeted training that supervises models' internal strategy representations toward state-conditional human preferences narrows the user acceptability generalization gap by a third on out-of-distribution personas and conversational styles.

我们证明这种失败是可以解决的：虽然提示干预无效，但通过针对性训练，将模型的内部策略表示引导至状态条件化的人类偏好，可以在分布外的人物角色和对话风格上将用户可接受性泛化差距缩小三分之一。