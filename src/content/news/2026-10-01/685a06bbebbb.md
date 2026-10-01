---
title: "Sage: Formalization with Semantic Correction"
originalUrl: "https://arxiv.org/abs/2609.35790"
date: "2026-10-01T00:59:59.541Z"
---

# Sage: Formalization with Semantic Correction

**Abstract:** While neural theorem provers have achieved impressive milestones in formal mathematics, they largely operate on the assumption that faithful Lean 4 formal statements are already provided. Translating informal natural language into a formal language is a critical data bottleneck plagued by an "illusion of rigor": standard type-checkers accept statements that compile but drop hypotheses, introduce vacuous truths, or subtly alter mathematical bounds.

**摘要：** 尽管神经定理证明器在形式化数学领域已经取得了令人瞩目的里程碑，但它们大多基于一个假设，即已经提供了准确的 Lean 4 形式化陈述。将非正式的自然语言翻译成形式化语言是一个关键的数据瓶颈，且深受“严谨性错觉”的困扰：标准的类型检查器虽然能接受编译通过的陈述，但往往会丢失假设、引入空真命题，或微妙地改变数学边界。

To resolve this, we introduce Sage (Semantic Agent-Guided Formalization Engine), an agentic framework that replaces monolithic translation with a four-stage decomposed generation pipeline coupled with a dual-signal semantic correction loop. By pairing Lean 4 compiler diagnostics with multi-dimensional semantic feedback, our correction loop enforces mathematical fidelity alongside syntactic validity.

为了解决这一问题，我们引入了 Sage（语义智能体引导的形式化引擎），这是一个智能体框架，它用一个四阶段分解生成流水线取代了单一的翻译模式，并结合了双信号语义校正循环。通过将 Lean 4 编译器诊断与多维语义反馈相结合，我们的校正循环在确保语法有效性的同时，强制执行了数学保真度。

By explicitly accounting for the gap between open-ended queries and declarative formal targets, our pipeline prevents models from achieving high formalization rates by guessing unverified answers (exhibiting a 70.9% answer leakage rate). Consequently, Sage suppresses leakage to 2.7% while achieving 73.3% pass@4 joint compilation and semantic fidelity on the Omni-MATH without proofs (compared to 42.0% for a fine-tuned Goedel-Formalizer-V2 baseline).

通过明确考虑开放式查询与声明式形式化目标之间的差距，我们的流水线防止了模型通过猜测未经证实的答案来获得虚高的形式化率（此前存在 70.9% 的答案泄露率）。因此，Sage 将泄露率抑制到了 2.7%，同时在 Omni-MATH（无证明版本）上实现了 73.3% 的 pass@4 联合编译与语义保真度（相比之下，经过微调的 Goedel-Formalizer-V2 基准模型仅为 42.0%）。

Finally, on IMO-Unformalized, a novel frontier of 175 unformalized International Mathematical Olympiad problems, Sage demonstrates effective zero-shot generalization with 87.4% pass@4 verified fidelity compared to just 19.4% for the baseline, winning over 79% of blind pairwise evaluations.

最后，在 IMO-Unformalized（一个包含 175 道未形式化的国际数学奥林匹克竞赛题的新颖前沿数据集）上，Sage 展示了有效的零样本泛化能力，其 pass@4 验证保真度达到 87.4%，而基准模型仅为 19.4%，并在超过 79% 的盲测配对评估中胜出。