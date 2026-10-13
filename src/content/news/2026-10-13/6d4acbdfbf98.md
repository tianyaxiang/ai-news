---
title: "TerraAgent: Demonstration-Grounded Multi-Agent Reasoning for Long-Context Remote Sensing Visual Question Answering"
originalUrl: "https://arxiv.org/abs/2610.12517"
date: "2026-10-12T04:00:00.000Z"
excerpt: false
---

Computer Science > Computer Vision and Pattern Recognition arXiv:2610.12517 (cs) [Submitted on 7 Oct 2026] Title: TerraAgent: Demonstration-Grounded Multi-Agent Reasoning for Long-Context Remote Sensing Visual Question Answering Authors: Jingwen Huang, Yiming Fang, Hanxiao Wu, Boyuan He, Keyi Luo.

计算机科学 > 计算机视觉与模式识别 arXiv:2610.12517 (cs) [提交于 2026 年 10 月 7 日] 标题：TerraAgent：用于长上下文遥感视觉问答的演示驱动多智能体推理 作者：Jingwen Huang, Yiming Fang, Hanxiao Wu, Boyuan He, Keyi Luo。

Abstract: Remote sensing visual question answering (RS-VQA) requires answers that truly depend on image evidence, yet current remote sensing multimodal large language models (RS MLLMs) are still evaluated mainly by accuracy, which cannot reveal whether a correct answer was produced without using the image. This setting introduces three challenges: demonstrations retrieved across different ground sample distances (GSD), sensors, and city textures may be poorly matched; real queries often involve long visual contexts from multi-scale tiles, multi-temporal frames, and retrieved knowledge, where evidence can be diluted and errors can propagate through multi-step reasoning; and prior-only answering remains invisible to standard metrics.

摘要：遥感视觉问答（RS-VQA）要求答案真正依赖于图像证据，然而当前的遥感多模态大语言模型（RS MLLMs）主要仍通过准确率进行评估，这无法揭示正确答案是否在未使用图像的情况下产生。这种设置带来了三个挑战：跨不同地面采样距离（GSD）、传感器和城市纹理检索到的演示可能匹配度较差；真实查询通常涉及来自多尺度切片、多时相帧和检索知识的长视觉上下文，其中证据可能被稀释，错误可能通过多步推理传播；且仅基于先验的回答在标准指标中仍然不可见。

We present AVA, a training-free framework that wraps a frozen RS MLLM with three modules. GDR performs GSD-bucketed, scene-graph-based demonstration retrieval and filters demonstrations whose answers are unsupported by their images. MACE decomposes each query into an evidence-typed sub-question DAG, routes sub-questions to suitable perception tools, and records verified provenance in a shared evidence ledger with bounded re-perception.

我们提出了 AVA，这是一个无需训练的框架，它通过三个模块封装了一个冻结的 RS MLLM。GDR 执行基于 GSD 分桶和场景图的演示检索，并过滤掉那些答案不受其图像支持的演示。MACE 将每个查询分解为证据类型的子问题有向无环图（DAG），将子问题路由到合适的感知工具，并在共享的证据账本中记录经过验证的来源，同时进行有限的重新感知。

CVA audits the final answer through counterfactual perturbations of cited evidence, including ablation and swap, and computes a visual-dependency score for confidence calibration and evidence-forcing re-query. On RSVQA-LR/HR, VRSBench, and LHRS-Bench, AVA improves average accuracy by up to 2.40 points over the strongest same-setting baselines, raises the visual-dependency score from 0.28 to 0.49, reduces the prior-only answer rate from 46.2 percent to 21.7 percent, and lowers the hallucination rate from 17.1 percent to 9.8 percent, with 2.6x the cost of a single backbone forward pass and no fine-tuning.

CVA 通过对引用证据进行反事实扰动（包括消融和交换）来审计最终答案，并计算视觉依赖分数以进行置信度校准和证据强制重查询。在 RSVQA-LR/HR、VRSBench 和 LHRS-Bench 上，AVA 将平均准确率比最强的同类基线提高了多达 2.40 个百分点，将视觉依赖分数从 0.28 提高到 0.49，将仅基于先验的回答率从 46.2% 降低到 21.7%，并将幻觉率从 17.1% 降低到 9.8%，其成本仅为单次主干前向传播的 2.6 倍，且无需微调。