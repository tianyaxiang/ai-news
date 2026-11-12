---
title: "Evaluation protocols for historical script classification: the cost of manuscript-level leakage and the role of soft labels"
originalUrl: "https://arxiv.org/abs/2611.12969"
date: "2026-11-11T05:00:00.000Z"
excerpt: false
---

Title: Evaluation protocols for historical script classification: the cost of manuscript-level leakage and the role of soft labels

标题：历史手稿分类的评估协议：手稿级数据泄露的代价与软标签的作用

Computer Science > Computer Vision and Pattern Recognition arXiv:2611.12969 (cs) [Submitted on 7 Nov 2026] Title:Evaluation protocols for historical script classification: the cost of manuscript-level leakage and the role of soft labels Authors:Daniil I. Naryzhnyi (ITMO University), Roman A. Popkov (ITMO University), Daniil A. Bakalin (ITMO University) View a PDF of the paper titled Evaluation protocols for historical script classification: the cost of manuscript-level leakage and the role of soft labels, by Daniil I. Naryzhnyi (ITMO University) and 2 other authors View PDF

计算机科学 > 计算机视觉与模式识别 arXiv:2611.12969 (cs) [提交于 2026 年 11 月 7 日] 标题：历史手稿分类的评估协议：手稿级数据泄露的代价与软标签的作用 作者：Daniil I. Naryzhnyi (ITMO 大学), Roman A. Popkov (ITMO 大学), Daniil A. Bakalin (ITMO 大学) 查看题为《历史手稿分类的评估协议：手稿级数据泄露的代价与软标签的作用》的论文 PDF，作者为 Daniil I. Naryzhnyi (ITMO 大学) 及其他 2 位作者。查看 PDF。

Abstract:A paleographer applies a script type classifier to unseen manuscripts. We measure how much testing on other pages of training manuscripts inflates accuracy. On VML-HP-ext (715 pages, 171 Hebrew manuscripts, 14 script classes) we compare page-level and manuscript-level splits. Page-level accuracy drops from 97% to 54% (59% at manuscript level), and is 39% on the official blind test set. The gap of 40 to 47 percentage points (pp) at patch, page and manuscript level is statistically significant and reproduces with ResNet18; on binarized patches (ink and background only) it is 34 to 42 pp, also significant.

摘要：古文字学家将字体类型分类器应用于未见过的手稿。我们测量了在训练手稿的其他页面上进行测试会使准确率虚高多少。在 VML-HP-ext 数据集（715 页，171 份希伯来语手稿，14 种字体类别）上，我们比较了页面级和手稿级的划分方式。页面级准确率从 97% 下降到 54%（手稿级为 59%），在官方盲测集上则为 39%。在补丁、页面和手稿级别上，40 到 47 个百分点（pp）的差距具有统计学意义，且在使用 ResNet18 时可复现；在二值化补丁（仅含墨迹和背景）上，该差距为 34 到 42 个百分点，同样具有显著性。

On unseen manuscripts the model is overconfident: mean confidence 70% against 54% correct pages; patch-level expected calibration error (ECE, mean gap between confidence and accuracy) rises from 0.065 to 0.444. Binarization leaves patch-level overconfidence but cuts it markedly at page level. Confidence still helps triage: in the more confident half of pages 67% are correct, 41% in the rest. Training on expert soft labels showed no evidence of an accuracy difference, though a small page-level loss cannot be ruled out. The predicted distributions are closer to the expert's assessment. ECE is lower at patch level (0.21 to 0.31) and in most runs at page level, but not significantly at manuscript level.

在未见过的手稿上，模型表现出过度自信：平均置信度为 70%，而正确页面仅占 54%；补丁级的预期校准误差（ECE，置信度与准确率之间的平均差距）从 0.065 上升至 0.444。二值化保留了补丁级的过度自信，但在页面级显著降低了该现象。置信度仍有助于分类筛选：在置信度较高的那一半页面中，67% 是正确的，而其余部分中仅 41% 正确。使用专家软标签进行训练并未显示出准确率差异的证据，尽管不能排除页面级存在微小损失的可能性。预测分布更接近专家的评估。ECE 在补丁级（0.21 到 0.31）以及大多数页面级运行中较低，但在手稿级并不显著。

Label smoothing (blurring the label, no expert input) also lowers ECE but comes no closer to the expert. Temperature scaling (post-training confidence correction) helps significantly only at patch level. On 97 pages of 16 manuscripts with mixed expert assessment, soft labels cut divergence from the expert by 22 to 30% (significant in four of five runs); the point estimate of accuracy is 16.5 to 23.7 pp below hard labels, but with 16 manuscripts the loss can neither be confirmed nor ruled out. We propose recommendations for the evaluation protocol; code will be released with the paper.

标签平滑（模糊标签，无专家输入）也能降低 ECE，但并未使其更接近专家评估。温度缩放（训练后的置信度校正）仅在补丁级有显著帮助。在 16 份具有混合专家评估的 97 页手稿上，软标签将与专家的差异降低了 22% 到 30%（五次运行中有四次显著）；准确率的点估计值比硬标签低 16.5 到 23.7 个百分点，但由于仅有 16 份手稿，该损失既无法被证实也无法被排除。我们提出了评估协议的建议；代码将随论文发布。