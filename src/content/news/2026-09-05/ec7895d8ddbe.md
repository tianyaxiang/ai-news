---
title: "IDSPACE: A Novel Document Generator for Reliable Evaluation of Digital Identity Verification Systems [Extended Technical Report]"
originalUrl: "https://arxiv.org/abs/2609.03052"
date: "2026-09-04T23:14:41.747Z"
---

# IDSPACE: A Novel Document Generator for Reliable Evaluation of Digital Identity Verification Systems [Extended Technical Report]
# IDSPACE：一种用于可靠评估数字身份验证系统的创新文档生成器 [扩展技术报告]

**Abstract:** As services move online, trust institutions such as banks, lenders, and governments must verify the identity of remote users. Fraud detection tools are widely available, but evaluating and fine-tuning them remains difficult because identity documents are sensitive and therefore scarce. Synthetic data generation offers a path forward, and demand is clear: our prior work in this area has been downloaded over 11,000 times (aggregated from eight parts).

**摘要：** 随着服务向线上迁移，银行、贷款机构和政府等信任机构必须验证远程用户的身份。尽管欺诈检测工具已广泛普及，但对其进行评估和微调仍然困难，因为身份证明文件属于敏感信息，因此非常稀缺。合成数据生成提供了一条解决途径，且市场需求明确：我们在该领域的前期工作已被下载超过 11,000 次（八个部分汇总数据）。

We introduce IDSpace, extending this line of research in three directions. First, we propose model-guided Bayesian optimization, which tunes generation parameters to maximize both visual similarity and prediction consistency with target-domain models given only a few samples from a target domain.

我们推出了 IDSpace，从三个方向扩展了这一研究领域。首先，我们提出了模型引导的贝叶斯优化方法，该方法仅需目标域的少量样本，即可调整生成参数，从而最大化视觉相似度以及与目标域模型之间的预测一致性。

Second, we decouple user-specified metadata (demographics, fraud patterns, capture device) from automatically tuned control parameters (font styles, noise levels, image quality), allowing users to configure evaluations without low-level expertise.

其次，我们将用户指定的元数据（人口统计信息、欺诈模式、采集设备）与自动调整的控制参数（字体样式、噪声水平、图像质量）解耦，使用户无需具备底层专业知识即可配置评估任务。

Third, we expand beyond template images to support scanned and mobile-captured documents. Experiments show IDSpace improves evaluation consistency by 15-45% over baselines including CycleGAN, diffusion inpainting, and non-guided optimization, using only a few real samples, while improving training accuracy by up to 9% and SSIM similarity with the target domain by 10%. We also released a new dataset consisting of 359,240 high-quality synthetic documents across ten European ID types.

第三，我们将支持范围从模板图像扩展到了扫描件和移动端拍摄的文档。实验表明，仅使用少量真实样本，IDSpace 在评估一致性方面比 CycleGAN、扩散修复（diffusion inpainting）和非引导优化等基准方法提高了 15-45%，同时将训练准确率提升了高达 9%，与目标域的 SSIM 相似度提升了 10%。此外，我们还发布了一个包含 359,240 份高质量合成文档的新数据集，涵盖了十种欧洲身份证件类型。