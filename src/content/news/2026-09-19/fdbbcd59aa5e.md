---
title: "RAUL: Reference-Assisted Ureteroscopy Localization for Skill Assessment"
originalUrl: "https://arxiv.org/abs/2609.19236"
date: "2026-09-18T23:33:03.523Z"
---

# RAUL: Reference-Assisted Ureteroscopy Localization for Skill Assessment
# RAUL：用于技能评估的参考辅助输尿管镜定位

**Abstract:**
**摘要：**

Objective: Incomplete navigation of anatomy during ureteroscopic kidney stone surgeries can contribute to repeat interventions. While skilled surgeons have lower reintervention rates, there are no objective metrics to quantify scope-navigation performance to evaluate when a trainee becomes skilled. This work aims to recover ureteroscope trajectories from endoscopic video and derive navigation metrics to quantify differences in skill.
目标：在输尿管镜肾结石手术中，对解剖结构的不完全导航可能导致需要重复干预。虽然熟练的外科医生再干预率较低，但目前尚无客观指标来量化内窥镜导航表现，以评估受训者何时达到熟练水平。本研究旨在从内窥镜视频中恢复输尿管镜的轨迹，并推导出导航指标以量化技能差异。

Methods: We propose RAUL, a reference-assisted reconstruction framework for recovering ureteroscope trajectories from ureteroscope videos only in phantoms. For each phantom, we use a slow, high-quality reference exploration video to generate a reference reconstruction. We localize subsequent exploration videos against this reference. We evaluate localization accuracy against electromagnetically tracked scope pose. We compute navigation metrics from phantom exploration trajectories to compare surgical residents across experience levels.
方法：我们提出了 RAUL，这是一个参考辅助重建框架，用于仅从模型（phantom）中的输尿管镜视频恢复输尿管镜轨迹。对于每个模型，我们使用一段缓慢、高质量的参考探索视频来生成参考重建。我们将后续的探索视频与此参考进行定位对比。我们通过电磁追踪的内窥镜姿态来评估定位准确性。我们从模型探索轨迹中计算导航指标，以比较不同经验水平的外科住院医师。

Results: The proposed reference-assisted framework achieves a mean translation root mean square error of $0.5 \pm 0.1$ mm across 9 phantoms. Compared to standard Structure-from-Motion (SfM), the proposed pipeline increases frame-wise localization coverage from $50.5 \pm 14.9\%$ to $86.1 \pm 7.2\%$ of all video frames. The reconstructed trajectories revealed significant differences between high- and low-experience trainees in established navigation metrics.
结果：所提出的参考辅助框架在 9 个模型中实现了 $0.5 \pm 0.1$ 毫米的平均平移均方根误差。与标准的运动恢复结构（SfM）相比，所提出的流程将逐帧定位覆盖率从所有视频帧的 $50.5 \pm 14.9\%$ 提高到了 $86.1 \pm 7.2\%$。重建的轨迹揭示了高经验和低经验受训者在既定导航指标上的显著差异。

Conclusion: RAUL enables substantially more complete recovery of ureteroscope trajectories from videos compared to standard SfM pipelines, enabling trajectory-based skill assessment without additional tracking equipment.
结论：与标准的 SfM 流程相比，RAUL 能够从视频中更完整地恢复输尿管镜轨迹，从而在无需额外追踪设备的情况下实现基于轨迹的技能评估。

Significance: To the best of our knowledge, this is the first use of video-only recovery of ureteroscope trajectories without external tracking sensors for skill assessment, supporting scalable automated assessment of ureteroscopy navigation skill.
意义：据我们所知，这是首次在无需外部追踪传感器的情况下，仅利用视频恢复输尿管镜轨迹进行技能评估，这为输尿管镜导航技能的可扩展自动化评估提供了支持。