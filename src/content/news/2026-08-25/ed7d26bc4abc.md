---
title: "Wrong-Physics Backdoors in Neural PDE Operators"
originalUrl: "https://arxiv.org/abs/2608.20439"
date: "2026-08-24T21:56:41.249Z"
---

# Wrong-Physics Backdoors in Neural PDE Operators
# 神经偏微分方程（PDE）算子中的“错误物理”后门

Neural PDE operators are increasingly trained on reusable solver archives, yet validation often relies on clean prediction error and parameter-agnostic plausibility checks.
神经偏微分方程（PDE）算子越来越多地在可复用的求解器存档上进行训练，然而其验证过程往往仅依赖于干净数据的预测误差和与参数无关的合理性检查。

We introduce cross-parameter relinking, a data-poisoning primitive that makes a triggered input select a valid solution from the same PDE family under an incorrect physical parameter. We term this a wrong-physics backdoor: the output remains physically plausible but is wrong for the intended parameter.
我们引入了“跨参数重链接”（cross-parameter relinking），这是一种数据投毒原语，它能使触发后的输入在错误的物理参数下，从同一 PDE 族中选择一个有效的解。我们将此称为“错误物理”后门：输出结果在物理上依然合理，但对于预期的参数而言却是错误的。

The attack exploits tensor-to-parameter provenance failures in multi-parameter archives by stamping the surrogate input and relinking its supervision to a cached alternate-parameter solution for the same latent sample.
该攻击利用了多参数存档中张量到参数溯源的失效，通过标记代理输入，并将其监督信号重链接到同一潜在样本的缓存替代参数解上。

Across 476 attack campaigns, we evaluate Burgers, advection-diffusion, two-dimensional Navier-Stokes, and an elliptic Poisson case. Fourier Neural Operators and DeepONet provide the primary evidence, with Transformer, GRU, and LSTM models as support.
在 476 次攻击实验中，我们评估了 Burgers 方程、对流扩散方程、二维 Navier-Stokes 方程以及椭圆型 Poisson 方程案例。傅里叶神经算子（FNO）和 DeepONet 提供了主要证据，Transformer、GRU 和 LSTM 模型作为辅助验证。

FNO reaches a backdoor success rate of 1.0000 on both advection-diffusion and two-dimensional Navier-Stokes while retaining low clean relative L2 error. Clean-label, label-only, and shuffled controls show that high attack success alone is insufficient: successful attacks must move predictions toward the intended alternate-physics target while preserving bounded clean error.
FNO 在对流扩散和二维 Navier-Stokes 方程上的后门攻击成功率达到了 1.0000，同时保持了较低的干净数据相对 L2 误差。干净标签、仅标签和乱序对照实验表明，仅有高攻击成功率是不够的：成功的攻击必须在保持有限干净误差的同时，将预测结果推向预期的替代物理目标。

These results expose a structural validation gap: smoothness or generic solver-like behavior is insufficient unless the provenance of the intended physical parameter is also verified.
这些结果揭示了一个结构性的验证漏洞：除非同时验证预期物理参数的来源，否则仅凭平滑性或通用的求解器行为是不够的。