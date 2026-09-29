---
title: "Atlases Are Already Inside: Recovering Population Templates from Pretrained Diffusion Models"
originalUrl: "https://arxiv.org/abs/2609.30566"
date: "2026-09-29T01:14:09.167Z"
---

# Atlases Are Already Inside: Recovering Population Templates from Pretrained Diffusion Models
# 图谱已在其中：从预训练扩散模型中恢复群体模板

**Abstract:** We present a new inference-time sampler for diffusion models that gives a pretrained model a capability it was never trained for: constructing the atlas of the population it synthesizes. The sampler converges from every random seed to the population's central anatomy, which we call the \emph{intrinsic atlas}.

**摘要：** 我们提出了一种用于扩散模型的新型推理时采样器，它赋予了预训练模型一种从未经过训练的能力：构建其所合成群体的图谱（Atlas）。该采样器能从任意随机种子收敛到群体的中心解剖结构，我们将其称为“内在图谱”（intrinsic atlas）。

The advantage is threefold. (1) It requires no retraining. A diffusion model that has already learned a coherent population, including the released ones, yields its atlas in a single inference pass without involving deformable registration.

其优势有三点：(1) 无需重新训练。一个已经学习了连贯群体（包括已发布的模型）的扩散模型，无需涉及可变形配准，仅通过单次推理即可生成其图谱。

(2) It applies to multiple domains, such as brain MRI, chest X-ray, faces, and 3D shapes. (3) It extends to subpopulations. One age-conditioned model gives an atlas at any age in its training range, and the resulting family reproduces the CSF expansion of healthy aging.

(2) 它适用于多个领域，例如脑部 MRI、胸部 X 光片、人脸和 3D 形状。(3) 它可扩展至子群体。一个基于年龄条件的模型可以提供其训练范围内任意年龄段的图谱，由此产生的图谱族能够重现健康衰老过程中的脑脊液（CSF）扩张现象。

Evaluated as a registration target, the intrinsic atlas is best or second-best on every dataset against classical and learned templates, and the most central template on held-out brain MRI cohorts. Atlas construction can be reframed as a byproduct of generative modeling: a diffusion model is a learned representation of population structure, and the atlas is what it already contains.

作为配准目标进行评估时，内在图谱在所有数据集上与经典模板和学习型模板相比，表现均为最优或次优；在留出的脑部 MRI 队列中，它是最核心的模板。图谱构建可以被重新定义为生成式建模的副产品：扩散模型是对群体结构的学习表示，而图谱正是它已经包含的内容。