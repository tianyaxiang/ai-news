---
title: "Following the Flow the Law Requires: Training Voice Agents to Transfer to Unseen Regulated Procedures in Debt Collection"
originalUrl: "https://arxiv.org/abs/2610.18881"
date: "2026-10-15T04:00:00.000Z"
excerpt: false
---

Computer Science > Computation and Language arXiv:2610.18881 (cs) [Submitted on 1 Oct 2026] Title: Following the Flow the Law Requires: Training Voice Agents to Transfer to Unseen Regulated Procedures in Debt Collection Authors: Petmongkon Pornpichitsuwan, Krittin Pachtrachai, Touchapon Kraisingkorn.

计算机科学 > 计算与语言 arXiv:2610.18881 (cs) [提交于 2026 年 10 月 1 日] 标题：遵循法律要求的流程：训练语音代理以迁移至债务催收中未见过的监管程序 作者：Petmongkon Pornpichitsuwan, Krittin Pachtrachai, Touchapon Kraisingkorn。

Abstract: Voice agents built on large language models (LLMs) now handle customer calls, but in regulated applications completing the task is not enough: the agent must follow a conversational flow set by law. In debt collection, it must confirm it is speaking to the debtor before mentioning the debt, identify itself and the creditor, state the amount, and avoid prohibited language. Every creditor turns these rules into its own procedure and revises it.

摘要：基于大语言模型（LLMs）构建的语音代理目前已能处理客户来电，但在受监管的应用场景中，仅完成任务是不够的：代理必须遵循法律设定的对话流程。在债务催收中，代理必须在提及债务前确认通话对象为债务人，表明自身及债权人身份，说明金额，并避免使用违禁语言。每位债权人都会将这些规则转化为其自身的程序并进行修订。

We ask whether a small, self-hosted policy can be trained once and then follow regulated procedures it has never seen. One machine-readable specification per deployment, FlowSpec, generates the policy instruction, gates the tools, supplies the supervision and defines the tests; the agent speaks only approved catalogue sentences.

我们探讨了一个小型、自托管的策略是否可以通过一次训练，进而遵循其从未见过的监管程序。每个部署对应一份机器可读的规范（FlowSpec），用于生成策略指令、控制工具使用、提供监督并定义测试；代理仅能使用经批准的目录语句进行对话。

We fine-tune a 9-billion-parameter model on 2,506 conversations from 297 randomized procedures and evaluate a Thai outbound-call agent on four unseen deployment procedures (three debt collection, one non-debt), one from a wholly withheld lineage. Documented checks, fixed by the procedure, rise from 67--71 percents to 93--100 percents, while grounded checks, fixed by the conversation, already pass at 97--100 percents before training; scenario pass rate rises from 15/43 to 40/43. An audit of the shared specification finds 11 defects, 3 of which its own metric did not expose.

我们对一个 90 亿参数的模型进行了微调，使用了来自 297 个随机程序中的 2,506 段对话，并评估了一个泰语外呼代理在四个未见过的部署程序（三个债务催收，一个非债务）上的表现，其中一个程序来自完全未公开的系列。由程序固定的文档检查通过率从 67%--71% 上升至 93%--100%，而由对话固定的基础检查在训练前已达到 97%--100% 的通过率；场景通过率从 15/43 上升至 40/43。对共享规范的审计发现了 11 个缺陷，其中 3 个是其自身指标未能揭示的。