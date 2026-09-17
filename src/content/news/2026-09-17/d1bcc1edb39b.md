---
title: "Racing in Volume with Flow Ensembles"
originalUrl: "https://arxiv.org/abs/2609.16310"
date: "2026-09-17T00:10:00.732Z"
---

# Racing in Volume with Flow Ensembles
# 通过流集成实现大容量竞速 (Racing in Volume with Flow Ensembles)

Streaming 4D reconstruction has been demonstrated only indoors, on dense camera rigs surrounding subjects that move at human pace. Outdoor 4D reconstruction exists but relies either on cameras mounted on the moving vehicle itself, or on limited-coverage arrays observing quasi-static subjects offline. The case that actually matters for spectators is a fast-moving subject, watched from a sparse ring of allocentric cameras, streaming. No method targets this, and no benchmark exists to evaluate one.

流式 4D 重建目前仅在室内环境下得到验证，且依赖于环绕以人类速度移动目标的密集摄像机阵列。室外 4D 重建虽然存在，但要么依赖于安装在移动车辆本身的摄像机，要么依赖于离线观察准静态目标的有限覆盖阵列。对于观众而言，真正重要的场景是：从稀疏的异中心摄像机环中实时流式传输快速移动的目标。目前尚无针对此场景的方法，也缺乏相应的基准测试来评估此类技术。

To this end, we introduce FastFlowGS, a streaming 4D Gaussian Splatting method for reconstructing fast-moving subjects from a small set of fixed external cameras, and Monaco4D, a photorealistic Unreal Engine 5 benchmark for high-speed outdoor reconstruction. FastFlowGS fuses sparse matches, semi-dense tracks, and dense optical flow by lifting each signal to 3D with geometric uncertainty and combining them through a Kalman-style temporal update.

为此，我们引入了 FastFlowGS，这是一种流式 4D 高斯溅射（Gaussian Splatting）方法，用于从少量固定外部摄像机中重建快速移动的目标；同时还推出了 Monaco4D，这是一个基于虚幻引擎 5（Unreal Engine 5）的超写实高速室外重建基准测试。FastFlowGS 通过将每个信号提升至具有几何不确定性的 3D 空间，并结合卡尔曼滤波式的时序更新，融合了稀疏匹配、半密集轨迹和密集光流信息。

Monaco4D provides Formula 1 sequences under varied illumination from trackside, onboard, and drone viewpoints with dense ground truth. On CMU-Panoptic, FastFlowGS exceeds the strongest baseline by 12.6% VMAF at 35% greater efficiency. On Monaco4D, where existing streaming methods degrade severely, it improves dynamic-region PSNR by up to 18.6% with 28.3% lower per-frame optimization time.

Monaco4D 提供了在不同光照条件下，从赛道旁、车载和无人机视角拍摄的包含密集地面真值的 F1 赛车序列。在 CMU-Panoptic 数据集上，FastFlowGS 的 VMAF 指标比最强基准高出 12.6%，且效率提升了 35%。在现有流式方法性能严重下降的 Monaco4D 测试中，该方法将动态区域的 PSNR 提升了高达 18.6%，同时单帧优化时间降低了 28.3%。