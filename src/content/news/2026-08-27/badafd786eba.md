---
title: "Velocity-coupled Representation Refinement for Satellite Orbit Prediction"
originalUrl: "https://arxiv.org/abs/2608.23728"
date: "2026-08-27T01:00:29.867Z"
---

# Velocity-coupled Representation Refinement for Satellite Orbit Prediction
# 用于卫星轨道预测的速度耦合表征细化方法

**Abstract:** Satellite orbit prediction, which aims to forecast future orbital trajectories from historical observations, is important for collision warning and safe space operations. With advances in time-series forecasting, learning-based methods have emerged as a promising solution for satellite prediction. 

**摘要：** 卫星轨道预测旨在根据历史观测数据预测未来的轨道轨迹，这对碰撞预警和空间安全运行至关重要。随着时间序列预测技术的发展，基于学习的方法已成为卫星预测领域一种极具前景的解决方案。

In orbital dynamics, a satellite state is typically described by position and velocity, where position characterizes trajectory geometry and velocity reflects its instantaneous direction and rate of change. However, most existing methods mainly focus on temporal dependencies within position sequences while rarely exploiting the intrinsic coupling between position and velocity, which is essential for modeling satellite motion. 

在轨道动力学中，卫星状态通常由位置和速度来描述，其中位置表征轨迹的几何形状，而速度反映其瞬时方向和变化率。然而，大多数现有方法主要关注位置序列内的时间依赖性，却很少利用位置与速度之间固有的耦合关系，而这种耦合对于建模卫星运动至关重要。

To this end, we propose OrbitNet, a velocity-aware representation learning method for accurate satellite orbit prediction. It lifts conventional position-sequence forecasting to a position-velocity coupled representation learning paradigm by exploiting relationships among satellite state variables. 

为此，我们提出了 OrbitNet，这是一种用于精确卫星轨道预测的速度感知表征学习方法。它通过挖掘卫星状态变量之间的关系，将传统的“位置序列预测”提升为“位置-速度耦合表征学习”范式。

Specifically, we develop a velocity-coupled representation refinement strategy to enhance positional representations through cross-variable interactions between position and velocity. We further introduce orbital segment modeling, which partitions historical trajectories into temporal segments and performs segment-level temporal learning to capture local motion variations and long-range evolution patterns. 

具体而言，我们开发了一种速度耦合表征细化策略，通过位置和速度之间的跨变量交互来增强位置表征。此外，我们引入了轨道分段建模，将历史轨迹划分为时间片段，并进行片段级的时间学习，以捕捉局部运动变化和长期的演化模式。

Extensive experiments show that OrbitNet outperforms large time-series foundation models and representative general forecasting methods under both in-domain evaluation on Starlink and zero-shot evaluation across six unseen satellite constellations. We expect this work to encourage further exploration of satellite-aware representation learning for trajectory time-series forecasting.

大量实验表明，无论是在 Starlink 的域内评估，还是在六个未见过的卫星星座上的零样本评估中，OrbitNet 的表现均优于大型时间序列基础模型和具有代表性的通用预测方法。我们期望这项工作能推动轨迹时间序列预测中“卫星感知表征学习”的进一步探索。