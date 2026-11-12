---
title: "Gemini Decisions API: Fast, calibrated multimodal decisions"
originalUrl: "https://blog.google/innovation-and-ai/technology/developers-tools/gemini-decisions-api/"
date: "2026-11-11T18:00:00.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

Gemini Decisions API: Fast, calibrated multimodal decisions
Nov 11, 2026 | x.com Facebook LinkedIn Mail Copy link

Gemini Decisions API：快速、经过校准的多模态决策
2026年11月11日 | x.com Facebook LinkedIn Mail 复制链接

Introducing the Gemini Decisions API, powered by our new Gemini Decision 1 model. Evaluate up to 1,000 yes/no, choice, and rubric-scoring questions in a fast, single pass across text, images, audio, video, and PDFs.

隆重推出由我们全新的 Gemini Decision 1 模型驱动的 Gemini Decisions API。它能以快速、单次处理的方式，针对文本、图像、音频、视频和 PDF 文件评估多达 1,000 个“是/否”、选择题和评分标准问题。

We are introducing the Gemini Decisions API to help you make fast, probabilistic choices across text, images, audio, video, and PDFs. This tool computes confidence scores for multiple questions in a single pass, providing a cost-effective way to route queries, grade content, or check policy rules.

我们推出 Gemini Decisions API，旨在帮助您在文本、图像、音频、视频和 PDF 中做出快速的概率性选择。该工具可在单次处理中计算多个问题的置信度分数，为路由查询、内容分级或检查策略规则提供了一种经济高效的方法。

Today, we’re introducing the Gemini Decisions API, a new endpoint for fast, closed-set decisions powered by our new Gemini Decision 1 model (gemini-decision-1), available through the Gemini API in Google AI Studio. The Decisions API gives you purpose-built primitives for bounded choices like tool selection, policy checks, model routing, and context grading.

今天，我们推出了 Gemini Decisions API，这是一个由我们全新的 Gemini Decision 1 模型 (gemini-decision-1) 驱动的、用于快速闭集决策的新端点，可通过 Google AI Studio 中的 Gemini API 使用。Decisions API 为您提供了专门构建的原语，用于处理工具选择、策略检查、模型路由和上下文分级等有限选择。

You can pass one multimodal input across text, images, audio, video, and PDFs (up to 256K tokens) along with up to 1,000 independent questions. Rather than generating answer text token by token, Gemini Decision 1 scores your candidate options in a single forward pass, returning probabilities and confidence scores in 150-250 ms end-to-end latency at $0.10 per 1M input tokens with zero output tokens billed.

您可以传入一个跨文本、图像、音频、视频和 PDF（最多 256K token）的多模态输入，以及多达 1,000 个独立问题。Gemini Decision 1 不会逐个 token 生成答案文本，而是在单次前向传递中对您的候选选项进行评分，以 150-250 毫秒的端到端延迟返回概率和置信度分数，价格为每 100 万输入 token 0.10 美元，且不收取输出 token 费用。

On benchmarks spanning agent routing, reasoning, ranking, and multimodal understanding, Gemini Decision 1 leads across the suite, with the lowest calibration error. Gemini Decision 1 scores options without token-by-token decoding, keeping median latency 50-100 ms of model compute (150-250 ms end-to-end), across multimodal inputs and contexts up to 16K tokens, remaining nearly flat from 1 to 100 questions per request.

在涵盖智能体路由、推理、排序和多模态理解的基准测试中，Gemini Decision 1 在整个套件中处于领先地位，且校准误差最低。Gemini Decision 1 在无需逐个 token 解码的情况下对选项进行评分，在处理多模态输入和高达 16K token 的上下文时，模型计算的中位延迟保持在 50-100 毫秒（端到端 150-250 毫秒），并且从每个请求 1 个问题到 100 个问题，延迟几乎保持不变。