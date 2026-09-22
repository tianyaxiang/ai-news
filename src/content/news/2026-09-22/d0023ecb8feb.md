---
title: "From Discharge Notes to Patient Understanding: Persona-Grounded, Open-Ended Simulation of LLMs as Discharge Educators"
originalUrl: "https://arxiv.org/abs/2609.20827"
date: "2026-09-22T00:16:40.291Z"
---

### From Discharge Notes to Patient Understanding: Persona-Grounded, Open-Ended Simulation of LLMs as Discharge Educators
### 从出院记录到患者理解：基于角色设定、开放式的大语言模型出院教育模拟

**Abstract:** Hospital discharge education is an interactive teaching task: a clinician adapts a discharge plan to a patient's literacy, recall, and personality. Existing LLM evaluations target static or artifact-generation tasks and do not measure patient understanding under open-ended dialogue.
**摘要：** 医院出院教育是一项交互式教学任务：临床医生需要根据患者的文化程度、记忆力和个性来调整出院计划。现有的大语言模型（LLM）评估主要针对静态任务或文本生成任务，无法衡量在开放式对话中患者的理解程度。

We introduce DischargeBench, a persona-grounded simulation in which a candidate LLM educator conducts a multi-turn session with a Virtual Patient, while an Education Monitor Agent regulates patient realism without modifying the educator, protecting the evaluation signal.
我们引入了 DischargeBench，这是一个基于角色设定的模拟系统。在该系统中，候选的 LLM 教育者与“虚拟患者”进行多轮对话，同时由一个“教育监控代理”在不干预教育者模型的前提下调节患者的真实感，从而保护评估信号的准确性。

We curate MIMIC-IV-Ext-DischargeBench, 477 cases over 24 ICD chapters with persona axes (personality, education level, health literacy, past-medical-history recall) for stratified analysis. Each simulation is scored on four axes -- Conversation Quality, Topic Checklist, Comprehension, and Factual Consistency -- by an LLM-as-a-Judge aligned against physician annotations.
我们整理了 MIMIC-IV-Ext-DischargeBench 数据集，涵盖了 24 个 ICD 章节的 477 个案例，并设定了多个角色维度（个性、教育水平、健康素养、既往病史记忆力）以进行分层分析。每项模拟都会根据对话质量、主题清单、理解程度和事实一致性这四个维度进行评分，评分由经过医生标注校准的“LLM 作为裁判”模型完成。

Across closed- and open-source LLMs, aggregate scores conceal clinically relevant variation across ICD chapters and patient personas; difficult personas expose coverage failures, comprehension gaps, and reduced source-answer agreement. LLM evaluation for discharge education should center patient understanding, not text quality or answer accuracy alone.
在闭源和开源大语言模型的对比中，总分往往掩盖了不同 ICD 章节和患者角色之间具有临床意义的差异；高难度角色设定暴露了模型在覆盖范围上的不足、理解上的偏差以及源答案一致性的降低。针对出院教育的 LLM 评估应以患者的理解为核心，而非仅仅关注文本质量或答案准确性。