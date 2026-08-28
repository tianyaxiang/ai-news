---
title: "PICasso: An AI-Enabled Design Framework for Autonomous Optimization of Silicon Photonic Devices"
originalUrl: "https://arxiv.org/abs/2608.26113"
date: "2026-08-28T05:33:30.567Z"
---

# PICasso: An AI-Enabled Design Framework for Autonomous Optimization of Silicon Photonic Devices
# PICasso：用于硅光子器件自主优化的 AI 设计框架

**Abstract:** We present PICasso, an AI-assisted framework for automated synthesis, verification, and optimization of photonic integrated circuits (PICs) from natural-language specifications. PICasso couples a structured NL -> YAML -> GDS generation pipeline with PDK aware knowledge injection, automated placement and routing, DRC/LVS validation, and SAX-based photonic simulation.

**摘要：** 我们提出了 PICasso，这是一个人工智能辅助框架，用于根据自然语言规范自动合成、验证和优化光子集成电路 (PIC)。PICasso 将结构化的“自然语言 -> YAML -> GDS”生成流水线与感知工艺设计套件 (PDK) 的知识注入、自动布局布线、DRC/LVS 验证以及基于 SAX 的光子仿真相结合。

To systematically evaluate AI-driven photonic design, we introduce PIC-Set, a benchmark of 36 parameterized PIC design tasks spanning core photonic primitives and multi-component circuits. Using PIC-Set, we benchmark several state-of-the-art Large Language Models (LLMs) under a unified evaluation protocol, including new metrics such as structural and functional $Spec@k$, optimization efficiency, and robustness under perturbations.

为了系统地评估人工智能驱动的光子设计，我们引入了 PIC-Set，这是一个包含 36 个参数化 PIC 设计任务的基准测试集，涵盖了核心光子原件和多组件电路。利用 PIC-Set，我们在统一的评估协议下对几种最先进的大语言模型 (LLM) 进行了基准测试，其中包括结构和功能 $Spec@k$、优化效率以及扰动下的鲁棒性等新指标。

Across the benchmark, PICasso significantly improves end-to-end specification satisfaction compared to vanilla LLM generation. Structural $Spec@3$ reaches up to 92.7% and functional $Spec@3$ up to 52% on high-complexity circuits. In addition, PICasso consistently reduces circuit insertion loss, lowering the mean loss from 4.98 dB to 3.25 dB (1.74 dB improvement) through simulation-guided optimization.

在整个基准测试中，与原生 LLM 生成相比，PICasso 显著提高了端到端规范的满足度。在复杂电路中，结构化 $Spec@3$ 最高可达 92.7%，功能性 $Spec@3$ 最高可达 52%。此外，通过仿真引导的优化，PICasso 持续降低了电路插入损耗，将平均损耗从 4.98 dB 降低至 3.25 dB（提升了 1.74 dB）。

These results demonstrate that structured domain constraints, physical verification, and simulation feedback transform LLMs from brittle netlist generators into practical PIC design agents capable of producing manufacturable layouts with competitive runtimes relative to manual GUI-based workflows.

这些结果表明，结构化的领域约束、物理验证和仿真反馈将 LLM 从脆弱的网表生成器转变为实用的 PIC 设计智能体，能够以相对于手动 GUI 工作流更具竞争力的运行时间，生成可制造的版图。