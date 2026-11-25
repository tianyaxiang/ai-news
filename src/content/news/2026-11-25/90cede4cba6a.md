---
title: "Ternary Bonsai 2.5 27B"
originalUrl: "https://prismml.com/news/bonsai-2-5-27b"
date: "2026-11-24T20:08:03.000Z"
excerpt: false
---

# Ternary Bonsai 2.5 27B

Today, we’re introducing Ternary Bonsai 2.5 27B, an upgrade to Ternary Bonsai 2 27B with substantially stronger agentic coding, multi-turn tool use, and multi-step task execution. Based on Qwen3.8 27B, it retains the previous release’s 5.9 GB model footprint while significantly improving the capabilities developers need to build agents that work with private files and tools on-device. The result is by far the strongest AI model of its memory footprint for agentic workloads.

今天，我们推出了 Ternary Bonsai 2.5 27B，这是对 Ternary Bonsai 2 27B 的一次升级，在代理编码、多轮工具使用和多步任务执行方面有了显著增强。该模型基于 Qwen3.8 27B 构建，保留了上一版本 5.9 GB 的模型占用空间，同时显著提升了开发者构建在设备端处理私有文件和工具的代理所需的能力。其结果是目前同等内存占用下最强大的代理工作负载 AI 模型。

With Ternary Bonsai 2 27B, we brought stronger reasoning, visual understanding, and tool use to local devices. Since then, we’ve focused on making the model more effective across long sequences of tool calls: interpreting results, adjusting when a step fails, and maintaining the task’s objective through the whole interaction. This release also continues our work to make Bonsai more practical by addressing excessive thinking and repetitive loops in the previous model. Compared with Ternary Bonsai 2, Ternary Bonsai 2.5 completes tasks in fewer turns, uses fewer tokens, and delivers results faster and more accurately.

通过 Ternary Bonsai 2 27B，我们将更强的推理、视觉理解和工具使用能力带到了本地设备上。自那时起，我们专注于使模型在长序列工具调用中更加有效：解读结果、在步骤失败时进行调整，并在整个交互过程中保持任务目标。此次发布也延续了我们使 Bonsai 更具实用性的工作，解决了上一版本中过度思考和重复循环的问题。与 Ternary Bonsai 2 相比，Ternary Bonsai 2.5 完成任务所需的轮数更少，使用的 Token 更少，交付结果的速度更快、准确度更高。

Agentic workflows are particularly sensitive to model degradation: small errors can compound across successive tool calls and derail an entire task. Ternary Bonsai 2.5 significantly narrows the performance gap to the full-precision base model while retaining its compact footprint. Preserving this behavior through longer tasks is an important milestone in improving the intelligence density of models.

代理工作流对模型退化特别敏感：微小的错误可能会在连续的工具调用中累积，从而导致整个任务失败。Ternary Bonsai 2.5 在保持紧凑占用空间的同时，显著缩小了与全精度基础模型之间的性能差距。在更长的任务中保持这种表现，是提高模型智能密度的一个重要里程碑。

We evaluated Ternary Bonsai 2.5 27B against both Ternary Bonsai 2 27B and the full-precision Qwen 3.8 27B base model, as reported in the full whitepaper. We see marked improvements in agentic execution, coding, and multi-turn tool use, as shown in the table below.

正如完整白皮书中所述，我们针对 Ternary Bonsai 2 27B 和全精度 Qwen 3.8 27B 基础模型对 Ternary Bonsai 2.5 27B 进行了评估。如下表所示，我们在代理执行、编码和多轮工具使用方面看到了显著的改进。

On a single NVIDIA H100, Ternary Bonsai 2.5 27B achieves a generation speed of 291 tokens/s with MTP and processes a 2,000-token prompt at 3,200 tokens/s. Even on a consumer-grade RTX 4090, it delivers 204 tokens/s with MTP and a prompt processing speed of approximately 3,060 tokens/s. The demos below follow complete local workflows, from the initial request through intermediate decisions to the final result.

在单张 NVIDIA H100 上，Ternary Bonsai 2.5 27B 在 MTP 加持下实现了 291 tokens/s 的生成速度，并以 3,200 tokens/s 的速度处理 2,000 个 token 的提示词。即使在消费级的 RTX 4090 上，它也能在 MTP 加持下提供 204 tokens/s 的生成速度，提示词处理速度约为 3,060 tokens/s。下方的演示展示了完整的本地工作流，从初始请求到中间决策，再到最终结果。

For products, this creates room to build assistance directly into the applications where work already happens: a coding assistant working through issues in a private repository, a document application that prepares reviewable summaries, or a desktop assistant that handles recurring analysis. Local deployment lets those products process sensitive material on the user’s device. Ternary Bonsai 2.5 27B strengthens the model capabilities behind that experience while keeping the compact footprint that makes it practical.

对于产品而言，这为将辅助功能直接构建到工作应用中创造了空间：例如在私有仓库中解决问题的编码助手、准备可审阅摘要的文档应用，或处理重复性分析的桌面助手。本地部署使这些产品能够在用户设备上处理敏感材料。Ternary Bonsai 2.5 27B 在增强该体验背后的模型能力的同时，保持了使其具备实用性的紧凑占用空间。

Ternary Bonsai 2.5 27B runs on NVIDIA and Intel GPUs via llama.cpp and on Apple devices (Mac, iPhone, iPad) via MLX.

Ternary Bonsai 2.5 27B 可通过 llama.cpp 在 NVIDIA 和 Intel GPU 上运行，并通过 MLX 在 Apple 设备（Mac、iPhone、iPad）上运行。

Model weights are available today under the Apache 2.0 License.

模型权重现已根据 Apache 2.0 许可证发布。

Full technical details of our compression, evaluation, and benchmarking processes are available in our whitepaper.

关于我们压缩、评估和基准测试流程的完整技术细节，请参阅我们的白皮书。

We work with teams to tailor Bonsai models to their applications, from post-training on domain-specific data to optimizing inference for target hardware. If you’re building AI products with tight memory, latency, or power requirements, we’d love to explore how Bonsai can help. Reach out at sales@prismml.com.

我们与各团队合作，根据其应用需求定制 Bonsai 模型，从特定领域数据的后训练到针对目标硬件的推理优化。如果您正在构建对内存、延迟或功耗有严格要求的 AI 产品，我们很乐意探讨 Bonsai 如何提供帮助。请通过 sales@prismml.com 联系我们。

PrismML emerged from a team of Caltech researchers and was founded with support from Khosla Ventures, Cerberus, and Google, with continuing support from Samsung. We've spent years tackling one of the field's hardest problems: compressing neural networks without sacrificing their reasoning ability.

PrismML 由加州理工学院的研究人员团队创立，并得到了 Khosla Ventures、Cerberus 和 Google 的支持，同时持续获得三星的支持。我们花费数年时间攻克了该领域最棘手的问题之一：在不牺牲推理能力的前提下压缩神经网络。

If you want to help build the next generation of state-of-the-art AI, we'd love to hear from you. Check out our careers page.

如果您想参与构建下一代最先进的 AI，我们期待您的加入。请查看我们的招聘页面。