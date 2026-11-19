---
title: "SLED: Sensor SLicing from Edge to Datacenter"
originalUrl: "https://arxiv.org/abs/2611.21937"
date: "2026-11-18T05:00:00.000Z"
excerpt: false
---

Computer Science > Artificial Intelligence arXiv:2611.21937 (cs) [Submitted on 16 Nov 2026] Title: SLED: Sensor SLicing from Edge to Datacenter Authors: Alan Subedi, Avhishek Biswas, Apala Pramanik, Amlan Balabantaray, Mikhail Titov, Santosh Pitla, Ozgur Kilic, Mehmet C. Vuran.

计算机科学 > 人工智能 arXiv:2611.21937 (cs) [提交于 2026 年 11 月 16 日] 标题：SLED：从边缘到数据中心的传感器切片 (Sensor SLicing) 作者：Alan Subedi, Avhishek Biswas, Apala Pramanik, Amlan Balabantaray, Mikhail Titov, Santosh Pitla, Ozgur Kilic, Mehmet C. Vuran。

Abstract: Modern sensing systems generate large volumes of heterogeneous data streams from multiple sensor modalities, increasing reliance on datacenters for computation, artificial intelligence/superintelligence (AI/SI) inference, and AI/SI training. Each sensor stream may have different network and compute requirements depending on its type and data volume.

摘要：现代传感系统从多种传感器模态中生成大量异构数据流，增加了对数据中心在计算、人工智能/超级智能 (AI/SI) 推理以及 AI/SI 训练方面的依赖。根据类型和数据量的不同，每个传感器流可能具有不同的网络和计算需求。

However, current wireless systems typically allocate resources at the device level, leading to contention among co-located sensor streams, where bulk data transfers may starve latency-critical telemetry. To this end, this paper introduces Sensor Slicing (SL).

然而，当前的无线系统通常在设备层面分配资源，导致共存的传感器流之间产生竞争，其中批量数据传输可能会挤占对延迟敏感的遥测数据。为此，本文引入了传感器切片 (SL) 技术。

SL provides deterministic, medium access control (MAC)-level isolation for individual sensors within a single user equipment (UE) in open radio access networks (O-RAN). Using agentic coding techniques, SL is implemented in two O-RAN-compliant packages, reducing development time by 400 times (2 h 40 min [OCUDU] vs. 6.5 weeks [OAI]), 228-fold fewer human prompts (4 vs. 913), and less than half the tokens (0.64B vs. 1.43B).

SL 在开放无线接入网 (O-RAN) 中为单个用户设备 (UE) 内的各个传感器提供确定性的媒体访问控制 (MAC) 级隔离。通过使用代理编码技术，SL 在两个符合 O-RAN 标准的软件包中实现，将开发时间缩短了 400 倍（2 小时 40 分钟 [OCUDU] 对比 6.5 周 [OAI]），人工提示减少了 228 倍（4 次对比 913 次），且 Token 使用量不到原来的一半（0.64B 对比 1.43B）。

An associated end-to-end framework, SLED, is implemented to establish per-sensor radio and network isolation across edge, campus, and remote high-performance computing (HPC) tiers. Over-the-air wireless experiments demonstrate that while conventional network slicing causes critical delays to increase more than 2,300-fold under high traffic load, SLED maintains stable latency.

相关联的端到端框架 SLED 被实现，用于在边缘、园区和远程高性能计算 (HPC) 层级之间建立针对每个传感器的无线电和网络隔离。空口无线实验表明，虽然传统的网络切片在高流量负载下会导致关键延迟增加超过 2,300 倍，但 SLED 仍能保持稳定的延迟。

Scaling evaluations on the two RAN stacks show that throughput remains within 0.9% and 1.4% of expected allocations even as the number of sensor slices increases. The results demonstrate that SLED preserves latency-critical telemetry while effectively utilizing resources across the sensor-to-HPC pipeline.

在两个 RAN 协议栈上的扩展性评估显示，即使传感器切片数量增加，吞吐量仍保持在预期分配值的 0.9% 和 1.4% 以内。结果证明，SLED 在有效利用从传感器到 HPC 流水线资源的同时，保护了对延迟敏感的遥测数据。