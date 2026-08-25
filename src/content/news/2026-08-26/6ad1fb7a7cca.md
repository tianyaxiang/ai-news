---
title: "Granite 4.2 LLMs: How They're Built"
originalUrl: "https://huggingface.co/blog/ibm-granite/granite-4-2"
date: "2026-08-25T21:53:33.804Z"
---

# Granite 4.2 LLMs: How They're Built
# Granite 4.2 大语言模型：构建解析

A technical walkthrough of how we built the Granite 4.2 reasoning model family.
这是一篇关于我们如何构建 Granite 4.2 推理模型家族的技术指南。

TL;DR: Granite 4.2 is our first family of dense, decoder-only reasoning LLMs, released in three sizes: 3B, 8B, and 30B. Each model is pre-trained from scratch on roughly 15T tokens with a five-phase strategy that extends the context window to 512K tokens, supervised fine-tuned on chain-of-thought, reasoning, and agentic-trajectory data, then post-trained with a multi-stage reinforcement learning pipeline. That pipeline includes agentic RL, where the 8B and 30B models learn to act with tools inside real sandboxed environments. Every model has a thinking / non-thinking switch, a low-effort thinking mode that spends a short reasoning budget on easy questions, and native tool calling. All Granite 4.2 models are released under the Apache 2.0 license.
简而言之：Granite 4.2 是我们首个密集型、仅解码器（decoder-only）架构的推理大语言模型家族，包含 3B、8B 和 30B 三种尺寸。每个模型均从零开始预训练，使用了约 15 万亿（15T）token，并采用五阶段策略将上下文窗口扩展至 512K token。模型经过了思维链（CoT）、推理及智能体轨迹数据的监督微调（SFT），随后通过多阶段强化学习流水线进行后训练。该流水线包含智能体强化学习（Agentic RL），使 8B 和 30B 模型能够在真实的沙盒环境中学习使用工具。每个模型都具备“思考/非思考”切换功能、针对简单问题的低成本思考模式，以及原生工具调用能力。所有 Granite 4.2 模型均在 Apache 2.0 许可下发布。

### Overview
### 概述

Granite 4.2 is the reasoning-focused release of the Granite language-model family. Earlier Granite releases were strong instruction-following assistants; Granite 4.2 adds explicit reasoning. Every model can produce a chain of thought before its answer and can run in thinking or non-thinking mode depending on how much deliberation a task needs. A low-effort mode falls between the two, spending a short reasoning budget on easy questions.
Granite 4.2 是 Granite 语言模型家族中专注于推理的版本。早期的 Granite 版本是强大的指令遵循助手，而 Granite 4.2 则增加了显式推理能力。每个模型都可以在回答前生成思维链，并根据任务所需的深思熟虑程度，在“思考”或“非思考”模式下运行。此外，还有一种介于两者之间的“低成本模式”，可为简单问题分配较少的推理预算。

The three sizes (3B, 8B, and 30B) share the same architectural design and follow the same training pipeline (pre-training from scratch, SFT, then multi-stage RL), each at its own scale. All three are strong reasoners and instruction followers. The clearest capability split shows up in post-training. The 8B and 30B models additionally go through an agentic RL block that teaches them to operate as agents: calling tools, editing and running code, driving a terminal, and searching the web inside real environments.
这三种尺寸（3B、8B 和 30B）共享相同的架构设计，并遵循相同的训练流水线（从零预训练、SFT，再到多阶段 RL），只是规模不同。这三者都是强大的推理者和指令遵循者。能力上的最明显差异体现在后训练阶段：8B 和 30B 模型额外经过了智能体强化学习模块的训练，学会了像智能体一样操作：调用工具、编辑并运行代码、操作终端，以及在真实环境中进行网页搜索。

Every model supports native tool calling. Served through an OpenAI-compatible endpoint (for example, with vLLM), it emits tool calls in the OpenAI function-calling format and plugs into agentic harnesses without extra glue. Granite 4.2 is also supported in SGLang, see the SGLang cookbook for a ready-to-serve recipe.
每个模型都支持原生工具调用。通过兼容 OpenAI 的端点（例如使用 vLLM）部署时，模型会以 OpenAI 函数调用格式输出工具调用，无需额外适配即可接入智能体框架。Granite 4.2 也支持 SGLang，请参阅 SGLang 食谱获取部署方案。

### Model Architecture
### 模型架构

Granite 4.2 models are built on a decoder-only dense transformer architecture with the following core components:
Granite 4.2 模型基于仅解码器（decoder-only）的密集型 Transformer 架构构建，核心组件如下：

*   **Attention:** Grouped Query Attention (GQA) with 40 attention heads and 8 KV heads
*   **注意力机制：** 分组查询注意力（GQA），包含 40 个注意力头和 8 个 KV 头
*   **Position Embedding:** Rotary Position Embedding (RoPE) with θ = 10,000,000
*   **位置编码：** 旋转位置编码（RoPE），θ = 10,000,000
*   **Feed-Forward:** MLP with SwiGLU activation
*   **前馈网络：** 带有 SwiGLU 激活函数的 MLP
*   **Normalization:** RMSNorm (ε = 1e-5)
*   **归一化：** RMSNorm (ε = 1e-5)
*   **Embeddings:** Separate input/output embeddings (not tied)
*   **嵌入层：** 输入/输出嵌入层分离（非绑定）
*   **Precision:** bfloat16
*   **精度：** bfloat16

### Pre-Training
### 预训练

Granite 4.2 is trained from scratch on approximately 15 trillion tokens using a five-phase training strategy. Phases 1–2 focus on foundational pre-training, phases 3–4 perform mid-training with progressively higher-quality data annealing, and phase 5 introduces long-context training, extending the context window to 512K tokens.
Granite 4.2 使用五阶段训练策略，从零开始在约 15 万亿 token 上进行训练。第 1-2 阶段侧重于基础预训练，第 3-4 阶段通过逐步提高数据质量进行退火（annealing）训练，第 5 阶段引入长上下文训练，将上下文窗口扩展至 512K token。

### SFT: Data Preparation & Quality Control
### SFT：数据准备与质量控制

Supervised fine-tuning (SFT) turns the base model into a reliable instruction-following, reasoning, and tool-using assistant. The SFT data mixture combines agentic (31.6%) and non-agentic (68.4%) data, totaling approximately 7.2 million samples, or roughly 100B tokens, of which about 65B are trainable.
监督微调（SFT）将基础模型转化为可靠的指令遵循、推理和工具使用助手。SFT 数据集结合了智能体数据（31.6%）和非智能体数据（68.4%），总计约 720 万个样本，即约 1000 亿 token，其中约 650 亿 token 可用于训练。

### Data Quality Control
### 数据质量控制

We apply multiple stages of quality control before a sample enters the final SFT mixture. First, data from different sources is normalized and reformatted into a consistent OpenAI Chat format...
在样本进入最终 SFT 数据集之前，我们执行了多阶段质量控制。首先，来自不同来源的数据被标准化并重新格式化为统一的 OpenAI Chat 格式……