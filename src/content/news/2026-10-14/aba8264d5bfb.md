---
title: "Run fast, private agents on-device with LFM2.5-24B-A2B"
originalUrl: "https://huggingface.co/blog/LiquidAI/lfm25-24b-a2b"
date: "2026-10-13T17:05:48.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

LFM2.5-24B-A2B is a 24B-parameter reasoning model with just 2B active parameters, built for fast, private agents on-device. It thinks before it answers, calls tools, and works through multi-step tasks inside popular agent harnesses. Because only 2B parameters are active per token, each reasoning token is cheap, so you can run agents continuously on your own hardware.

LFM2.5-24B-A2B 是一款拥有 240 亿参数的推理模型，但仅有 20 亿活跃参数，专为设备端快速、私密的智能体而构建。它在回答前会进行思考、调用工具，并在主流智能体框架内处理多步骤任务。由于每个 token 仅激活 20 亿参数，推理成本低廉，因此你可以在自己的硬件上持续运行智能体。

Best-in-class agent: Competitive with Qwen3.6-35B-A3B, a model with ~50% more total and active parameters, on agentic and tool-use tasks, scoring 48.09 on LiveClaw versus 38.19. Reasoning at MoE speed: Always thinks before it answers. With only 2B active parameters per token, each reasoning token is cheap. Efficient inference: 184 tok/s on an Apple M5 Max and up to 21K output tok/s on a single NVIDIA B300 GPU.

同类最佳智能体：在智能体和工具使用任务上，它与总参数和活跃参数多出约 50% 的 Qwen3.6-35B-A3B 相比具有竞争力，在 LiveClaw 上的得分为 48.09，而后者为 38.19。MoE 速度的推理：回答前始终进行思考。由于每个 token 仅有 20 亿活跃参数，推理成本低。高效推理：在 Apple M5 Max 上可达 184 tok/s，在单块 NVIDIA B300 GPU 上输出速度高达 21K tok/s。

How we built a reasoning agent with 2B active parameters: LFM2.5-24B-A2B builds on LFM2-24B-A2B and keeps its architecture: 40 layers, 64 experts per MoE block with top-4 routing, and the same hybrid of gated short convolutions and GQA. The context window grows from 32K to 131K tokens, and an in-place tokenizer expansion doubles the vocabulary from 65K to 128K tokens for better non-Latin tokenization.

我们如何构建拥有 20 亿活跃参数的推理智能体：LFM2.5-24B-A2B 基于 LFM2-24B-A2B 构建并保留了其架构：40 层，每个 MoE 块包含 64 个专家，采用 top-4 路由，并沿用了门控短卷积与 GQA 的混合结构。上下文窗口从 32K 扩展至 131K token，原位分词器扩展将词汇表从 65K 翻倍至 128K，以实现更好的非拉丁语系分词。

Unlike its predecessor, it is a reasoning-only model that produces an explicit chain of thought before its final answer. Pre-training was scaled up from ~17T to ~33T tokens. Mid-training then adds 2T tokens at 32K context, weighted toward reasoning, math, code, instruction following, and multilingual text, and 300B tokens at 131K context, weighted toward long-context data. Tool calls and multi-turn trajectories appear throughout both phases.

与前代产品不同，它是一个纯推理模型，在给出最终答案前会生成明确的思维链。预训练规模从约 17T token 扩展至约 33T token。中期训练在 32K 上下文下增加了 2T token，侧重于推理、数学、代码、指令遵循和多语言文本；并在 131K 上下文下增加了 300B token，侧重于长上下文数据。工具调用和多轮对话轨迹贯穿了这两个阶段。

Post-training turns the base model into an agent in five stages: Supervised fine-tuning (SFT), Teacher specialization, Multi-domain on-policy distillation (MOPD) for non-agentic tasks, MOPD for agentic tasks, and Agentic reinforcement learning (Agentic RL) using harnesses like OpenClaw, Hermes Agent, Pi, and OpenCode.

训练后阶段通过五个步骤将基础模型转化为智能体：监督微调 (SFT)、教师专业化、针对非智能体任务的多领域在线策略蒸馏 (MOPD)、针对智能体任务的 MOPD，以及使用 OpenClaw、Hermes Agent、Pi 和 OpenCode 等框架进行的智能体强化学习 (Agentic RL)。