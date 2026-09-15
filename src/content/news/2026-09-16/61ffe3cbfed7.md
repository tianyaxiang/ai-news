---
title: "A derivative-fidelity failure mode in physics-informed neural networks: strengthened benchmark evidence from function-value training"
originalUrl: "https://arxiv.org/abs/2609.13171"
date: "2026-09-15T23:43:22.269Z"
---

# A derivative-fidelity failure mode in physics-informed neural networks: strengthened benchmark evidence from function-value training
# 物理信息神经网络中的导数保真度失效模式：来自函数值训练的强化基准证据

Physics-informed neural networks (PINNs) use automatic differentiation to impose differential-equation residuals, but good agreement in function values does not necessarily imply accurate derivatives.
物理信息神经网络（PINNs）利用自动微分来施加微分方程残差，但函数值的高度吻合并不一定意味着导数的准确。

This paper formulates derivative fidelity as a failure mode of PINNs and tests it with one-dimensional benchmarks. Multilayer perceptrons are trained only on function values for sin(x) and exp(x), while second derivatives obtained by automatic differentiation are evaluated separately.
本文将导数保真度定义为 PINNs 的一种失效模式，并利用一维基准测试对其进行了验证。研究人员仅使用 sin(x) 和 exp(x) 的函数值对多层感知机进行训练，并单独评估通过自动微分获得的二阶导数。

The hypothesis is strengthened by additional tests over training-point density, activation functions, endpoint-dense evaluation, and both L2 and maximum-error diagnostics.
通过对训练点密度、激活函数、端点密集评估以及 L2 和最大误差诊断的额外测试，该假设得到了进一步加强。

The results show that visually accurate function approximation can coexist with substantially larger second-derivative errors, especially near high-curvature boundary regions. The experiment provides a diagnostic protocol for distinguishing value accuracy from physics-residual reliability.
结果表明，视觉上准确的函数逼近可能与显著更大的二阶导数误差并存，特别是在高曲率边界区域附近。该实验提供了一种诊断协议，用于区分函数值的准确性与物理残差的可靠性。