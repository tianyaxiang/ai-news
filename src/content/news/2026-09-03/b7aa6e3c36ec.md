---
title: "A Cone-Constrained Bilinear Decomposition for Total Scaled-Gradient Variation Models"
originalUrl: "https://arxiv.org/abs/2609.00036"
date: "2026-09-02T23:35:39.785Z"
---

# A Cone-Constrained Bilinear Decomposition for Total Scaled-Gradient Variation Models
# 总缩放梯度变分模型的锥约束双线性分解

**Abstract:** The total scaled-gradient variation (TSGV) regularizer, derived from sparse modeling of piecewise-linear structures, has been shown to preserve edges and corners in image restoration. However, its highly nonconvex and nonlinear nature poses severe computational challenges, as existing methods often suffer from parameter sensitivity or lack convergence guarantees.

**摘要：** 总缩放梯度变分（TSGV）正则化项源于分段线性结构的稀疏建模，已被证明在图像恢复中能够有效保留边缘和角点。然而，其高度非凸和非线性的本质带来了严峻的计算挑战，现有的方法往往存在参数敏感性或缺乏收敛性保证的问题。

To overcome this, we propose a tailored bilinear decomposition that decouples the nonlinear weighted gradient in the TSGV regularizer. This approach yields an equivalent optimization problem governed by cone or sphere constraints, depending on the chosen scaling function. In particular, the cone constraint plays a central role in characterizing edge- and corner-preserving behavior.

为了克服这些困难，我们提出了一种定制的双线性分解方法，将 TSGV 正则化项中的非线性加权梯度进行解耦。该方法导出了一个等价的优化问题，根据所选缩放函数的不同，受锥约束或球约束控制。特别是，锥约束在刻画边缘和角点保持行为方面起着核心作用。

We solve this reformulation using the alternating minimization method (AMM) equipped with a majorization--minimization strategy, ensuring a monotonic decrease in energy without step-size tuning. Furthermore, we provide a geometric interpretation of the edge-preserving properties of these constraints by analyzing their asymptotic behavior near image singularities.

我们利用配备了主要化-最小化（Majorization-Minimization）策略的交替最小化方法（AMM）来求解这一重构问题，确保了能量的单调下降，且无需调整步长。此外，通过分析这些约束在图像奇异点附近的渐近行为，我们对其边缘保持特性的几何意义给出了合理解释。

We establish the global convergence of the proposed method to a critical point within the Kurdyka--Łojasiewicz framework. Extensive numerical experiments on Gaussian denoising and non-line-of-sight (NLOS) imaging show that the proposed method achieves PSNR and SSIM competitive with or superior to representative variational methods, especially at high noise levels, and improves the structural reconstruction under dense and sparse scanning.

我们在 Kurdyka--Łojasiewicz 框架下证明了所提方法收敛至临界点的全局收敛性。在高斯去噪和非视距（NLOS）成像上的大量数值实验表明，该方法在峰值信噪比（PSNR）和结构相似性（SSIM）方面达到了与代表性变分方法相当甚至更优的水平，特别是在高噪声水平下，并改善了在密集和稀疏扫描下的结构重建效果。