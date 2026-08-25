---
title: "EditStream: A Unified Autoregressive Framework for Interactive Video Generation and Editing"
originalUrl: "https://arxiv.org/abs/2608.21424"
date: "2026-08-25T21:59:12.613Z"
---

# EditStream: A Unified Autoregressive Framework for Interactive Video Generation and Editing
# EditStream：用于交互式视频生成与编辑的统一自回归框架

**Abstract:** Interactive video generation and editing are becoming increasingly important for creative design. In this report, we introduce EditStream: a unified framework for interactive video generation and editing. EditStream unifies multiple video creation and manipulation tasks within a single DiT-based model through flexible task-specific conditioning, and further transforms it into a fast, few-step autoregressive model for efficient streaming.

**摘要：** 交互式视频生成与编辑在创意设计领域正变得日益重要。在本报告中，我们介绍了 EditStream：一个用于交互式视频生成与编辑的统一框架。EditStream 通过灵活的任务特定条件设置，将多种视频创作与处理任务整合进单一的基于 DiT（Diffusion Transformer）的模型中，并将其进一步转化为一个快速、少步的自回归模型，以实现高效的流式处理。

It supports Text-to-Video, Image-to-Video, Video-to-Video, Editing Propagation, Reference-guided Video Editing, and Camera Pose Change, enabling flexible control over video generation, transformation, and editing within one system.

该框架支持文生视频（Text-to-Video）、图生视频（Image-to-Video）、视频转视频（Video-to-Video）、编辑传播（Editing Propagation）、参考引导的视频编辑（Reference-guided Video Editing）以及摄像机位姿变换（Camera Pose Change），从而在一个系统中实现了对视频生成、转换和编辑的灵活控制。

To make the unified model practical for interactive use, we develop a two-stage distillation approach that combines Velocity Moment Matching (VMM) with autoregressive unrolling. VMM matches conditional velocity moments at student-reached intermediate states to preserve generation quality and motion, while unrolling exposes the student to its own autoregressive predictions to improve temporal stability.

为了使该统一模型能够满足交互式使用的实际需求，我们开发了一种结合了速度矩匹配（Velocity Moment Matching, VMM）与自回归展开（autoregressive unrolling）的两阶段蒸馏方法。VMM 通过匹配学生模型在中间状态下的条件速度矩来保持生成质量与运动效果，而自回归展开则让学生模型接触其自身的自回归预测结果，从而提升时间一致性。

Together, they alleviate common challenges in few-step autoregressive video generation, including over-saturation, degraded motion, temporal instability, and complex training. EditStream provides a practical and scalable solution that bridges high-quality diffusion-based video models with interactive creative workflows.

这些技术共同缓解了少步自回归视频生成中常见的挑战，包括色彩过饱和、运动质量下降、时间不稳定以及训练复杂等问题。EditStream 提供了一种实用且可扩展的解决方案，成功架起了高质量扩散视频模型与交互式创意工作流之间的桥梁。