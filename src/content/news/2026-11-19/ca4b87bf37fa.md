---
title: "How Much of SAR Vehicle Recognition Is the Vehicle? Background Shortcuts, Angle Gaps and Partial Libraries on MSTAR and ATRNet-STAR"
originalUrl: "https://arxiv.org/abs/2611.21827"
date: "2026-11-18T05:00:00.000Z"
excerpt: false
---

Computer Science > Artificial Intelligence arXiv:2611.21827 (cs) [Submitted on 16 Nov 2026] Title: How Much of SAR Vehicle Recognition Is the Vehicle? Background Shortcuts, Angle Gaps and Partial Libraries on MSTAR and ATRNet-STAR Authors: Mousa Shaya.

计算机科学 > 人工智能 arXiv:2611.21827 (cs) [提交于 2026 年 11 月 16 日] 标题：合成孔径雷达（SAR）车辆识别中有多少成分是车辆本身？MSTAR 和 ATRNet-STAR 上的背景捷径、角度差距与部分库。作者：Mousa Shaya。

Abstract: Deep networks score near 99% on the MSTAR vehicle benchmark, and the newer ATRNet-STAR benchmark was built to be harder. We ask how much of these scores comes from the vehicle itself. With a modern network (ConvNeXt-Small, 3 seeds) we first reproduce the known MSTAR result: with the central 96x96 pixels zeroed out, accuracy is still 73.3% (chance 10%).

摘要：深度网络在 MSTAR 车辆基准测试中的得分接近 99%，而较新的 ATRNet-STAR 基准测试旨在提高难度。我们探讨了这些分数中有多少来自车辆本身。利用现代网络（ConvNeXt-Small，3 个种子），我们首先复现了已知的 MSTAR 结果：在将中心 96x96 像素置零的情况下，准确率仍为 73.3%（随机概率为 10%）。

The same shortcut is present in ATRNet-STAR, which was collected across several scenes: with the vehicle removed, accuracy is 63.3% on the 40-class SOC split (chance 2.5%). Under the official scene-change split, the background stops helping and starts hurting. Accuracy is 22.8% on full chips and 30.8% when only the vehicle is shown.

同样的捷径也存在于 ATRNet-STAR 中，该数据集是在多个场景中收集的：在移除车辆的情况下，40 类 SOC 划分下的准确率为 63.3%（随机概率为 2.5%）。在官方的场景变换划分下，背景不再提供帮助，反而开始产生负面影响。完整切片的准确率为 22.8%，而仅显示车辆时的准确率为 30.8%。

A SAR foundation model, SARATR-X, leans on the background more than ConvNeXt does (+4 to +6 points with the vehicle removed, in every seed) and does not solve the scene change. We then hold the amount of training data fixed and vary the depression angles used for training. Accuracy is set mainly by the gap to the nearest training angle: 57% at 15 degrees, 39% at 30 degrees and 26% at 45 degrees. Adding more training angles does not help.

SAR 基础模型 SARATR-X 比 ConvNeXt 更依赖背景（在每个种子中，移除车辆后准确率高出 4 到 6 个百分点），且未能解决场景变换问题。随后，我们固定训练数据量并改变训练所用的俯仰角。准确率主要由与最近训练角度的差距决定：15 度时为 57%，30 度时为 39%，45 度时为 26%。增加更多的训练角度并无帮助。

Finally, when most classes have training images at the test angle and a few do not, the missing classes do worse than when no class has them: 9.0% instead of 22.4% at a 45-degree gap. Most of their images are assigned to known classes. We recommend reporting background-only and target-only controls, and the angle gap, next to any accuracy figure. Code is public.

最后，当大多数类别在测试角度拥有训练图像而少数类别没有时，缺失类别的表现比没有任何类别拥有该角度图像时更差：在 45 度差距下，准确率为 9.0% 而非 22.4%。它们的大部分图像被分配到了已知类别中。我们建议在任何准确率数据旁标注仅背景和仅目标的对照组结果以及角度差距。代码已公开。