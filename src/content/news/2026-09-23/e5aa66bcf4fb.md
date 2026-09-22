---
title: "Correcting Learning-based Perception for Safety"
originalUrl: "https://arxiv.org/abs/2609.22108"
date: "2026-09-22T23:50:00.893Z"
---

# Correcting Learning-based Perception for Safety
# 纠正基于学习的感知以确保安全性

Learning-enabled perception is important in many autonomous systems. Unlike traditional sensors, the boundary where ML perception does or does not work is poorly characterized. Incorrect perception can lead to unsafe or overtly conservative downstream control actions.
基于学习的感知在许多自动驾驶系统中至关重要。与传统传感器不同，机器学习（ML）感知在何种情况下有效或无效，其边界特征尚不明确。错误的感知可能导致下游控制动作出现不安全或过度保守的情况。

In this paper, we propose a two-step strategy for correcting ML-based state estimation. First, an offline computation is used to characterize the uncertainties resulting from the ML module's state estimation, using preimages of perception contracts. Second, at runtime, a risk heuristic is used to choose particular states from the uncertain estimates to drive the control decisions.
在本文中，我们提出了一种纠正基于机器学习的状态估计的两步策略。首先，利用感知契约（perception contracts）的原像（preimages），通过离线计算来表征机器学习模块状态估计所产生的不确定性。其次，在运行时，利用风险启发式方法从不确定的估计中选择特定的状态，以驱动控制决策。

We perform extensive simulation-based evaluation of this runtime perception correction strategy on different vision-based adaptive cruise controllers (ACC modules), in different weather conditions, and road scenarios. Out of 45 ACC scenarios where the original perception-based control system using Yolo and LaneNet led to safety violations, in 73% of the scenarios, our runtime perception correction preserved safety; our method wouldn't be able to recover 27% of the scenarios where the construction of the preimages of perception contracts is not fully conformant.
我们针对不同的基于视觉的自适应巡航控制器（ACC模块），在不同的天气条件和道路场景下，对这种运行时感知纠正策略进行了广泛的基于模拟的评估。在原有的使用 Yolo 和 LaneNet 的感知控制系统导致安全违规的 45 个 ACC 场景中，我们的运行时感知纠正策略在 73% 的场景中成功保障了安全；而在感知契约原像构建不完全符合要求的 27% 的场景中，我们的方法无法实现恢复。

Further, our runtime perception correction strategy is not overly conservative---on the average only a 2.8% increase in completion time is experienced in the corrected scenarios, with mild interventions.
此外，我们的运行时感知纠正策略并不显得过度保守——在纠正后的场景中，平均完成时间仅增加了 2.8%，且干预程度较为温和。