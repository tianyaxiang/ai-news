---
title: "Shared Physics Responses Recover Hidden Rankings in Neural Operator Libraries"
originalUrl: "https://arxiv.org/abs/2608.20441"
date: "2026-08-24T21:56:46.327Z"
---

### Shared Physics Responses Recover Hidden Rankings in Neural Operator Libraries
### 共享物理响应恢复神经算子库中的隐藏排名

**Abstract:** Selecting the optimal neural-operator prediction during deployment is challenging when high-fidelity reference solutions are unavailable. We demonstrate that under a squared Hilbert-space loss, ranking a finite model library depends strictly on the low-dimensional span of candidate differences, allowing us to score all models simultaneously using a single anchor-based linearized response of the governing equation.

**摘要：** 在缺乏高保真参考解的情况下，在部署过程中选择最优的神经算子预测是一项挑战。我们证明，在平方希尔伯特空间损失下，对有限模型库进行排名严格依赖于候选模型差异的低维跨度，这使我们能够利用控制方程的单一基于锚点的线性化响应，同时对所有模型进行评分。

This shared physical diagnostic accurately recovered over 99.6% of pairwise preferences and 99.0% of optimal checkpoints across diverse Fourier and convolutional operator libraries for fluid, reaction-diffusion, and wave dynamics.

这种共享物理诊断方法在针对流体、反应-扩散和波动动力学的多种傅里叶及卷积算子库中，准确恢复了超过 99.6% 的成对偏好和 99.0% 的最优检查点。

Furthermore, the corrected physical proxy frequently outperformed the best individual candidates, and we establish computable sufficient conditions that rigorously certify exact decisions for strongly monotone discretizations. By exploiting the local dynamical response rather than raw defect magnitude, this framework enables the reliable and highly efficient deployment of scientific surrogates without requiring ground-truth data.

此外，修正后的物理代理模型经常优于表现最好的单个候选模型，并且我们建立了可计算的充分条件，从而严格证明了强单调离散化决策的准确性。通过利用局部动力学响应而非原始缺陷量级，该框架能够在无需地面真值数据的情况下，实现科学代理模型可靠且高效的部署。