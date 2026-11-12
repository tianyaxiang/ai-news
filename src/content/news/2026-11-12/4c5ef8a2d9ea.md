---
title: "BotPsy: On-Device Personal Assistant with a Sub-Billion-Parameter Agentic Language Model"
originalUrl: "https://huggingface.co/blog/qvac/botpsy"
date: "2026-11-11T05:01:16.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

Frontier cloud LLMs carry high operational costs that can fluctuate unexpectedly, and relying on such third-party models introduces vulnerabilities, as providers can modify, deny, or deprecate access at any time. Furthermore, proprietary models offer limited customization for specific workflows, while posing risks to privacy, data control, and transparency.

前沿云端大语言模型（LLM）运营成本高昂且波动不可预测，依赖此类第三方模型会带来风险，因为服务提供商随时可能修改、拒绝或终止访问权限。此外，专有模型在特定工作流的定制化方面能力有限，同时在隐私、数据控制和透明度方面存在隐患。

Besides, not every task demands frontier-level intelligence: small, specialized agents can be equally capable on specific tasks and significantly cheaper to run, since many routine or smaller workloads can be processed efficiently on-device. As intelligence per parameter continues to improve rapidly, we aim to stand at the forefront of this shift toward performant, privacy-focused, self-hosted models.

此外，并非所有任务都需要前沿级别的智能：小型专用智能体在特定任务上同样能干，且运行成本显著降低，因为许多常规或较小的工作负载可以在设备端高效处理。随着单位参数的智能水平迅速提升，我们旨在站在这一转向高性能、注重隐私、自托管模型趋势的前沿。

Tether AI Research introduces BotPsy, a 0.8B-parameter model designed for function calling and agentic workflows, built on top of Qwen3.5-0.8B and suitable for on-device deployment. BotPsy is a "personal assistant" that uses tools to perform a variety of simple tasks for the user, in domains such as web search & research, travel & lifestyle, commerce & finance, business & customer operations, device & vehicle control, files & documents, calendar, and email & messaging.

Tether AI Research 推出了 BotPsy，这是一个专为函数调用和智能体工作流设计的 0.8B 参数模型，基于 Qwen3.5-0.8B 构建，适用于设备端部署。BotPsy 是一个“个人助理”，它利用工具为用户执行各种简单任务，涵盖网络搜索与研究、旅行与生活方式、商业与金融、业务与客户运营、设备与车辆控制、文件与文档、日历以及电子邮件与消息传递等领域。

Due to its small parameter count, it is best suited to tasks of low to medium difficulty. BotPsy achieves state-of-the-art (SOTA) tool-use and agentic performance for its size, outperforming every model of up to 1.2B parameters that we tested (Figures 1 and 2). Designed for secure on-device workflows, it provides exceptional instruction-following reliability and efficiency while keeping user data private.

由于参数量较小，它最适合处理中低难度的任务。BotPsy 在同等规模下实现了最先进（SOTA）的工具使用和智能体性能，优于我们测试过的所有 1.2B 参数及以下模型（图 1 和图 2）。它专为安全的设备端工作流设计，在保持用户数据隐私的同时，提供了卓越的指令遵循可靠性和效率。

As a small model, BotPsy still makes mistakes and is not intended for high-stakes use; please read the Intended Use and Limitations for more information.

作为一个小型模型，BotPsy 仍会出错，不适用于高风险场景；请阅读“预期用途与局限性”以获取更多信息。