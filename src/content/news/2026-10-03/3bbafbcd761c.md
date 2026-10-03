---
title: "Emergent Object Binding Has a Finite Spatial Horizon"
originalUrl: "https://arxiv.org/abs/2610.00006"
date: "2026-10-03T00:42:35.651Z"
---

# Emergent Object Binding Has a Finite Spatial Horizon
# 涌现的对象绑定具有有限的空间视界

**Abstract:** Pretrained Vision Transformers encode whether two image patches belong to the same object. This IsSameObject signal is decodable from frozen patch embeddings at high accuracy, which suggests that object binding emerges from self-supervised pretraining alone.

**摘要：** 预训练的视觉 Transformer（Vision Transformers）能够编码两个图像块是否属于同一个对象。这种“是否为同一对象”（IsSameObject）的信号可以从冻结的图像块嵌入中以高精度解码，这表明对象绑定仅通过自监督预训练即可涌现。

We show that this single accuracy number hides the structure of the signal. Binding is local: the probability that two patches of the same object are decoded as bound falls off monotonically with the distance between them and levels off at a nonzero floor, a falloff well described by an exponential with a finite length scale.

我们指出，这一单一的准确率数字掩盖了信号的结构。绑定是局部的：两个属于同一对象的图像块被解码为“已绑定”的概率，会随着它们之间距离的增加而单调下降，并最终趋于一个非零的基准值；这种衰减过程可以通过具有有限长度尺度的指数函数来很好地描述。

This decay holds across object sizes, across three families of probe, on both ADE20K and COCO, and across DINO and CLIP backbones, which indicates that it is a property of the representation rather than of the decoder.

这种衰减特性在不同对象尺寸、三种探针系列、ADE20K 和 COCO 数据集，以及 DINO 和 CLIP 主干网络中均成立，这表明它是表征本身的一种属性，而非解码器的属性。

Reading binding as local spatial coherence with a finite range accounts for a set of behaviors that the aggregate score leaves unexplained: binding weakens on large objects, separates distinct objects of the same class less reliably than objects of different classes, and groups object parts with their wholes. It is, by contrast, unaffected by occlusion once object size is controlled.

将绑定理解为具有有限范围的局部空间相干性，可以解释聚合分数无法说明的一系列行为：绑定在大型对象上会减弱；在区分同一类别的不同对象时，其可靠性低于区分不同类别的对象；并且会将对象的各个部分与其整体归为一组。相比之下，在控制对象尺寸的情况下，绑定不受遮挡的影响。

We map each behavior with confounds controlled. As a preliminary observation, the horizon and its floor are organized at different depths in DINOv2 and DINOv3, which we report as suggestive given the small number of layers probed and the confound between the two models.

我们在控制混杂因素的情况下映射了每种行为。作为初步观察，我们发现 DINOv2 和 DINOv3 中视界及其基准值的组织方式在不同深度上有所不同；考虑到所探测的层数较少以及两个模型之间的混杂因素，我们仅将其作为一种启发性的发现进行报告。