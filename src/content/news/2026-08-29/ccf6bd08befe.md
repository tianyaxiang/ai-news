---
title: "Hilariously fast volume computation with the divergence theorem (2018)"
originalUrl: "https://alyssarosenzweig.ca/blog/hilariously-fast-volume-computation-with-the-divergence-theorem.html"
date: "2026-08-29T03:12:53.476Z"
---

# Hilariously fast volume computation with the divergence theorem (2018)
# 利用散度定理实现极速体积计算 (2018)

(No, there won’t be jokes.) The following presents a fast algorithm for volume computation of a simple, closed, triangulated 3D mesh. This assumption is a consequence of the divergence theorem. Further extensions may generalise to other meshes as well, although that is presently out of scope.
（不，这里没有笑话。）以下介绍了一种用于计算简单、封闭、三角化 3D 网格体积的快速算法。这一假设是散度定理的推论。虽然目前暂不涉及，但该算法未来可能推广到其他类型的网格。

We begin with the definition of volume as the triple integral over a region of the constant one:
我们从体积的定义开始，即区域内常数 1 的三重积分：
$V = \iiint_R 1 \mathrm{d}V$

Let $\mathbf{F}$ be a function in $\mathbb{R}^3$ such that its divergence is equal to one. For the purposes of this paper, we choose:
设 $\mathbf{F}$ 为 $\mathbb{R}^3$ 中的一个函数，使其散度等于 1。为了本文的目的，我们选择：
$\mathbf{F}(x, y, z) = <x, 0, 0>$

It can easily be verified that:
可以很容易地验证：
$\mathrm{div} \mathbf{F} = \frac{\partial F}{\partial x} + \frac{\partial F}{\partial y} + \frac{\partial F}{\partial z} = 1 + 0 + 0 = 1$

Therefore:
因此：
$V = \iiint_R 1 \mathrm{d}V = \iiint_R \mathrm{div} \mathbf{F}(x, y, z) \mathrm{d}V$

By the Divergence Theorem, this is equal to the surface integral:
根据散度定理，这等于曲面积分：
$V = \iint_S \mathbf{F}(x, y, z) \mathrm{d}\mathbf{S}$

This surface integral, defined over the surface $S$ of the 3D mesh, is equal to the sum of its piecewise triangle parts. Let $T_i$ denote the surface of the $i$’th triangle in the mesh. Then:
该曲面积分定义在 3D 网格的表面 $S$ 上，等于其分段三角形部分的和。设 $T_i$ 表示网格中第 $i$ 个三角形的表面。则：
$V = \sum_{i = 0} \iint_{T_i} \mathbf{F}(x, y, z) \mathrm{d}\mathbf{S}$

Let $T_{in}$ represent the $n$’th vertex of the $i$’th triangle. Let $\Delta_1$ equal the vector difference between $T_{i1}$ and $T_{i0}$, and $\Delta_2$ likewise equal to $T_{i2} - T_{i0}$. Each individual triangle $T_i$ may thus be parametrised as:
设 $T_{in}$ 表示第 $i$ 个三角形的第 $n$ 个顶点。设 $\Delta_1$ 等于 $T_{i1}$ 与 $T_{i0}$ 的向量差，同理 $\Delta_2$ 等于 $T_{i2} - T_{i0}$。因此，每个独立的三角形 $T_i$ 可以参数化为：
$\mathbf{r}(u, v) = T_{i0} + u\Delta_1 + v\Delta_2$

Then, simple differentiation yields:
通过简单的微分可得：
$\mathbf{r}_u = \Delta_1, \quad \mathbf{r}_v = \Delta_2$

Therefore:
因此：
$\mathbf{r}_u \times \mathbf{r}_v = \Delta_1 \times \Delta_2$

Thus, the surface integral can be rewritten in terms of this parametrisation, substituting in the definition of $\mathbf{F}$ as needed:
因此，该曲面积分可以用这种参数化形式重写，并根据需要代入 $\mathbf{F}$ 的定义：
$V = \sum_{i = 0} \iint_{T_i} \mathbf{F}(x, y, z) (\mathbf{r}_u \times \mathbf{r}_v) dA = \sum_{i = 0} \iint_{T_i} \mathbf{F}(x, y, z) \cdot (\Delta_{i1} \times \Delta_{i2}) dA$
$= \sum_{i = 0} \iint_{T_i} <x, 0, 0> \cdot (\Delta_{i1} \times \Delta_{i2}) dA$

This cross product is constant throughout the triangle and easy to calculate from the vertex data. Only the X component of the cross product should be calculated; the others are equal to zero due to the dot product with the zero components of $\mathbf{F}$. $V$ can be thus be rewritten as:
该叉积在整个三角形内是常数，且易于根据顶点数据计算。只需计算叉积的 X 分量；由于与 $\mathbf{F}$ 的零分量进行点积，其余分量均为零。因此 $V$ 可以重写为：
$V = \sum_{i = 0} (\Delta_{i1} \times \Delta_{i2})_x \iint_{T_i} x dA$

We now focus on the surface integral $\iint_{T_i} x dA$. Expanding with the parametrisation yields:
现在我们关注曲面积分 $\iint_{T_i} x dA$。利用参数化展开得：
$\iint_{T_i} x dA = \int_{0}^{1} \int_{0}^{u} x dv du = \int_{0}^{1} \int_{0}^{u} (T_{i0x} + u \Delta_{i1x} + v \Delta_{i2x}) dv du$

This integral can be directly evaluated, treating vertex data as constants:
将顶点数据视为常数，该积分可直接求值：
$= T_{i0x} (\frac{1}{2}) + \Delta_{i1x} (\frac{1}{6}) + \Delta_{i2x} (\frac{1}{6})$
$= T_{i0x} (\frac{1}{2}) + (T_{i1x} - T_{i0x})(\frac{1}{6}) + (T_{i2x} - T_{i0x})(\frac{1}{6})$
$= \frac{1}{6}(T_{i0x} + T_{i1x} + T_{i2x})$

Substituting into the original sum and pulling out a constant factor of $\frac{1}{6}$ to avoid the inner loop division, this yields the following compact formula for the volume:
代入原始求和公式，并提取常数因子 $\frac{1}{6}$ 以避免内循环除法，从而得到以下简洁的体积公式：
$V = \frac{1}{6} \sum_{i = 0} (\Delta_{i1} \times \Delta_{i2})_x (T_{i0x} + T_{i1x} + T_{i2x})$

### Performance analysis
### 性能分析

The final algorithm contains no numerical integration nor differentiation. In contrast to common naive algorithms for volume, which are equivalent to rendering the mesh and then sampling the render, an expensive operation, there is only a single loop in this algorithm, over the triangles. Thus, this algorithm for volume computation is $O(n)$ to the number of the triangles.
最终算法不包含任何数值积分或微分。与常见的体积计算朴素算法（相当于渲染网格然后对渲染结果进行采样，这是一种昂贵的操作）相比，该算法只有一个遍历三角形的循环。因此，该体积计算算法的时间复杂度为 $O(n)$，其中 $n$ 为三角形数量。

Furthermore, the per-triangle calculation is similarly efficient: given the natural expansion of the cross product, the inner part contains seven additions and three multiplications. On the outside of the loop is only a single multiplication. Thus, for a mesh of $n$ triangles, the algorithm requires $8n - 1$ additions and $3n + 1$ multiplications, or $11n$ floating point operations. This is very fast. For a ballpark number, if volume needs to be calculated every frame in a high-performance 60 frames per second application, without the aid of a GPU, only using the CPU capabilities of a $35 Raspberry Pi, around 30 million triangles could be measured every frame.
此外，每个三角形的计算同样高效：考虑到叉积的自然展开，内部包含 7 次加法和 3 次乘法。循环外仅有 1 次乘法。因此，对于包含 $n$ 个三角形的网格，该算法需要 $8n - 1$ 次加法和 $3n + 1$ 次乘法，即 $11n$ 次浮点运算。这非常快。粗略估计，如果需要在高性能 60 FPS 的应用中每帧计算体积，在没有 GPU 辅助的情况下，仅使用 35 美元的树莓派 CPU，每帧可以测量约 3000 万个三角形。

### Motivation
### 动机

The vector calculus exam is soon, and I need to study. Plus, who doesn’t love 3D graphics?! I would be (pleasantly) surprised if the algorithm is novel. Further research after posting reveals the paper *Efficient Feature Extraction for 2D/3D Objects in Mesh Representation* by Cha Zheng and Tsuhan Chen, which appears to describe the same algorithm, although the derivation is different. It was fun while it lasted!
向量微积分考试快到了，我需要复习。再说，谁不喜欢 3D 图形呢？！如果这个算法是首创的，我会感到（惊喜的）意外。发布后的进一步研究发现，Cha Zheng 和 Tsuhan Chen 的论文《Efficient Feature Extraction for 2D/3D Objects in Mesh Representation》似乎描述了相同的算法，尽管推导过程不同。这段探索过程很有趣！