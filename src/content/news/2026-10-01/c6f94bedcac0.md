---
title: "CoDimRecon: Agentic Reconstruction of Sim-Ready 3D Scenes with Deformable Curves, Surfaces, and Volumes"
originalUrl: "https://arxiv.org/abs/2609.36024"
date: "2026-10-01T01:03:59.755Z"
---

# CoDimRecon: Agentic Reconstruction of Sim-Ready 3D Scenes with Deformable Curves, Surfaces, and Volumes
# CoDimRecon：基于智能体、利用可变形曲线、曲面和体素构建仿真就绪 3D 场景

**Abstract:** Reconstructing simulation-ready 3D scenes from real-world observations enables robotics, gaming, and immersive applications, yet existing methods largely assume rigid objects. This leaves an important gap for deformables, whose simulation-ready geometry depends on dimensionality (curves, surfaces, or volumes) and whose behavior may require models beyond elasticity. 

**摘要：** 从现实世界的观测数据中重建仿真就绪（Simulation-ready）的 3D 场景，对于机器人技术、游戏开发和沉浸式应用至关重要，但现有方法大多假设物体是刚性的。这在处理可变形物体时留下了巨大的空白，因为这类物体的仿真就绪几何结构取决于其维度（曲线、曲面或体量），且其行为可能需要超越弹性模型的建模方式。

We present CoDimRecon, an agentic framework that reconstructs editable scenes containing rigid, articulated, and deformable objects from multi-view RGB observations. Scene-level geometric priors ground scale and layout, while object-level generated meshes guide the agent toward detailed, compact geometry; articulated rigid objects are decomposed into movable parts with explicit joints. 

我们提出了 CoDimRecon，这是一个基于智能体（Agentic）的框架，能够从多视角 RGB 观测中重建包含刚体、关节物体和可变形物体的可编辑场景。场景级的几何先验提供了尺度和布局基础，而物体级的生成网格则引导智能体构建细节丰富且紧凑的几何结构；关节刚体被分解为具有明确关节的可移动部件。

For deformables, category-wise agent sessions reconstruct curves as centerlines with radii, surfaces as manifold shells with thickness, and volumes as watertight solids for volumetric meshing. Reusable simulator skills initialize compatible physical models and parameters, while agent-guided behavioral tests expose mismatches and trigger targeted revisions of motion, geometry, numerics, or material modeling. 

对于可变形物体，按类别划分的智能体会话将曲线重建为带有半径的中心线，将曲面重建为带有厚度的流形壳，并将体量重建为用于体网格划分的封闭实体。可复用的仿真器技能用于初始化兼容的物理模型和参数，而由智能体引导的行为测试则能发现偏差，并触发对运动、几何、数值计算或材料建模的针对性修正。

On evaluated Replica and ScanNet++ scenes, CoDimRecon achieves competitive compositional reconstruction accuracy while additionally producing deformable assets for rod, shell, and solid simulation. We further demonstrate robot interactions across all three representations, including a controlled paper-folding case in which behavioral testing motivates plastic bending.

在 Replica 和 ScanNet++ 场景的评估中，CoDimRecon 不仅实现了具有竞争力的组合重建精度，还额外生成了用于杆、壳和实体仿真的可变形资产。我们进一步展示了机器人在这三种表示形式下的交互能力，包括一个受控的折纸案例，其中行为测试促成了对塑性弯曲的模拟。