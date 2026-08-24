---
title: "A Survey on Foundations and Frontiers of Multimodal Agentic Frameworks: Techniques and Applications"
originalUrl: "https://arxiv.org/abs/2608.20379"
date: "2026-08-24T21:52:16.604Z"
---

# A Survey on Foundations and Frontiers of Multimodal Agentic Frameworks: Techniques and Applications
# 多模态智能体框架的基础与前沿综述：技术与应用

**Abstract:** Advances in large language models (LLMs) have fueled a wave of research into agency: the ability to reason, plan, and act. This effort has produced agentic frameworks that orchestrate perception, memory, and decision-making around powerful LLM backbones. With the advent of large multimodal models (LMMs), these systems can process and integrate diverse modalities, including images, audio, and video, thereby improving their real-world applicability.

**摘要：** 大语言模型（LLMs）的进步推动了关于“智能体（Agency）”研究的热潮，即推理、规划和行动的能力。这一努力催生了围绕强大的 LLM 骨干网络来协调感知、记忆和决策的智能体框架。随着大型多模态模型（LMMs）的出现，这些系统能够处理并整合包括图像、音频和视频在内的多种模态，从而提高了其在现实世界中的适用性。

Yet, while surveys of LLM-based agents exist, the role of multimodality in shaping agency has not been systematically examined in recent years. This survey fills the gap by analyzing the impact of multimodality across the core functional modules of the agentic framework: perception, reasoning, planning, memory, and action. Using this lens, we trace the evolution from text-centric agents to multimodal frameworks, examine how modalities are integrated through delegated, late-fusion, and early-fusion architectures, and assess the emergence of agentic behaviors enabled by grounded perception and multimodal reasoning.

然而，尽管目前已有关于基于 LLM 的智能体的综述，但近年来多模态在塑造智能体能力方面的作用尚未得到系统性的研究。本综述通过分析多模态对智能体框架核心功能模块（感知、推理、规划、记忆和行动）的影响，填补了这一空白。通过这一视角，我们追溯了从以文本为中心的智能体到多模态框架的演变，研究了如何通过代理（delegated）、后期融合（late-fusion）和早期融合（early-fusion）架构来整合模态，并评估了由基础感知（grounded perception）和多模态推理所带来的智能体行为的涌现。

We organize existing work through a modality-centric taxonomy that links architectural design choices to agent capabilities. Moreover, we review multimodal agentic systems across various application domains, including Robotics, GUI & Web Navigation, Multimedia Content Generation & Editing, and Long-form Video Understanding & Retrieval. Beyond capabilities, we analyze performance across these settings and discuss efficiency-scalability trade-offs, including training and inference costs, latency, and deployment constraints. By focusing on the impact of multimodality in agentic design, we aim to identify key gaps and chart a roadmap toward robust and general-purpose intelligent systems.

我们通过一种以模态为中心的分类法组织了现有研究，将架构设计选择与智能体能力联系起来。此外，我们回顾了跨越多个应用领域的多模态智能体系统，包括机器人技术、图形用户界面（GUI）与网页导航、多媒体内容生成与编辑，以及长视频理解与检索。除了能力之外，我们还分析了这些场景下的性能，并讨论了效率与可扩展性之间的权衡，包括训练和推理成本、延迟以及部署限制。通过聚焦多模态对智能体设计的影响，我们旨在识别关键差距，并为实现稳健且通用的智能系统绘制路线图。