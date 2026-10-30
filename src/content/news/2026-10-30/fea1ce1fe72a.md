---
title: "We're releasing the weights of Mistral Large 4"
originalUrl: "https://mistral.ai/news/mistral-large-4-oss/"
date: "2026-10-29T14:13:21.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# We're releasing the weights of Mistral Large 4

Mistral released Mistral Large 4 (Le Chonk), a 1-trillion-parameter multimodal model, now available with improved coding, cybersecurity, and reasoning efficiency. It leads open-weight benchmarks in coding and defensive security while offering three reasoning modes for cost-performance balance. Fully open-weight and European-trained, it empowers sovereign AI with customizable, self-hosted deployment options.

Mistral 发布了 Mistral Large 4 (Le Chonk)，这是一个拥有 1 万亿参数的多模态模型，现已具备更强的编码、网络安全和推理效率。它在编码和防御性安全方面的开源权重基准测试中处于领先地位，并提供三种推理模式以平衡成本与性能。该模型完全开源且在欧洲训练完成，通过可定制的自托管部署选项，为“主权 AI”提供了有力支持。

We release the weights of Le Chonk, advancing the frontier of open models in agentic coding and cybersecurity.

我们发布了 Le Chonk 的权重，推动了智能体编码和网络安全领域开源模型的前沿发展。

Earlier this month, we released Mistral Large 4 (Le Chonk), our flagship 1-trillion-parameter, natively multimodal model, in public preview. The response to the preview has exceeded our expectations, and we're grateful to our developer community, early-access customers, and partners for their support, collaboration, and feedback.

本月初，我们发布了 Mistral Large 4 (Le Chonk) 的公开预览版，这是我们旗舰级的 1 万亿参数原生多模态模型。预览版的反响超出了我们的预期，我们非常感谢开发者社区、早期访问客户以及合作伙伴的支持、协作与反馈。

Since then, we've put that feedback to work while continuing to scale reinforcement learning, driving massive improvements in coding and defensive cybersecurity. Gains continue to accelerate, with no signs of saturation.

自那时起，我们已将这些反馈付诸实践，同时持续扩展强化学习规模，从而在编码和防御性网络安全方面取得了巨大进步。这些提升仍在加速，且未见饱和迹象。

Today, we're releasing the weights of this improved Mistral Large 4. The new model also features substantial gains in reasoning efficiency that give developers greater performance while lowering inference costs.

今天，我们发布了这一改进版 Mistral Large 4 的权重。新模型在推理效率方面也有显著提升，在降低推理成本的同时为开发者提供了更强的性能。

Mistral Large 4 ranks as the best open-weight model for coding and among the world's most capable open models overall. Trained from scratch on European infrastructure with clear lineage from inception to release, it gives organizations a trusted foundation for Sovereign AI.

Mistral Large 4 被评为编码领域最优秀的开源权重模型，也是全球能力最强的开源模型之一。它在欧洲基础设施上从零开始训练，从开发到发布拥有清晰的血统，为各组织构建“主权 AI”提供了可信的基础。

Mistral is defining the sovereign AI category and leading the open frontier. We're committed to building the world's most capable models and releasing them openly, giving developers, enterprises, and institutions the power to own, customize, and control their AI.

Mistral 正在定义“主权 AI”这一类别，并引领开源前沿。我们致力于构建全球最强大的模型并将其公开，赋予开发者、企业和机构拥有、定制及控制其 AI 的能力。

Mistral Large 4 entered public preview with strong results across leading coding benchmarks. Just three weeks of additional reinforcement learning have since propelled it to the forefront of open-weight coding, taking the lead on FrontierCode and Terminal-Bench while matching the best open-weight models on the Artificial Analysis Coding Agent Index with substantially greater token efficiency.

Mistral Large 4 在进入公开预览时，已在主流编码基准测试中取得了优异成绩。此后仅经过三周的额外强化学习，它便跃居开源权重编码模型的前沿，在 FrontierCode 和 Terminal-Bench 中处于领先地位，并在 Artificial Analysis 编码智能体指数中与最优秀的开源权重模型持平，同时具备更高的 Token 效率。

On Cognition's private FrontierCode 2.0 benchmark, which assesses end-to-end code quality and whether a repository maintainer would merge the agent's change, Mistral Large 4 leads with a score of 19.7%.

在 Cognition 的私有 FrontierCode 2.0 基准测试中（该测试评估端到端代码质量以及代码库维护者是否会合并智能体的更改），Mistral Large 4 以 19.7% 的得分领先。

Mistral Large 4 delivers frontier coding performance with significantly fewer tokens, making sophisticated coding agents more economical to run at scale.

Mistral Large 4 以显著更少的 Token 数量提供了前沿的编码性能，使得复杂的编码智能体在大规模运行时更具经济性。

On the Artificial Analysis Coding Agent Index, Mistral Large 4 scores 48%, effectively tied with the leading open-weight model, GLM-5.3, while using 47% fewer tokens per task on average.

在 Artificial Analysis 编码智能体指数中，Mistral Large 4 得分为 48%，与领先的开源权重模型 GLM-5.3 基本持平，但平均每个任务使用的 Token 数量减少了 47%。

The gains extend to terminal-based coding workflows. On Terminal-Bench 4.0, Mistral Large 4 improved by 13 percentage points to 41% compared to its public preview, taking the lead among open-weight models while reducing output tokens by 30%.

这些提升也延伸到了基于终端的编码工作流中。在 Terminal-Bench 4.0 上，Mistral Large 4 相比公开预览版提升了 13 个百分点，达到 41%，在开源权重模型中处于领先地位，同时将输出 Token 减少了 30%。

To give developers greater control over this tradeoff between performance and cost, Mistral Large 4 now supports three reasoning modes:

为了让开发者更好地控制性能与成本之间的权衡，Mistral Large 4 现在支持三种推理模式：

*   Simple tasks; replaces ‘None’ reasoning mode
*   Hardest use cases requiring high precision and thorough reasoning

*   简单任务；取代了“无”推理模式
*   需要高精度和深度推理的最困难用例

Beyond benchmarks, Mistral Large 4's coding capabilities are validated by human preference. In Surge Code's blind pairwise evaluations, Mistral Large 4 was preferred over leading open-weight models including GLM-5.3, Kimi K3, and DeepSeek V4.1 Flash, ranking behind only Claude Opus 5.5 among the models evaluated.

除了基准测试外，Mistral Large 4 的编码能力也得到了人类偏好的验证。在 Surge Code 的盲测配对评估中，Mistral Large 4 的表现优于包括 GLM-5.3、Kimi K3 和 DeepSeek V4.1 Flash 在内的领先开源权重模型，在所有评估模型中仅次于 Claude Opus 5.5。

Since its preview, we've been working with leading cybersecurity vendors to evaluate Mistral Large 4 in real-world environments to test Mistral Large 4’s strengths in vulnerability reproduction and patching.

自预览版发布以来，我们一直与领先的网络安全供应商合作，在真实环境中评估 Mistral Large 4，以测试其在漏洞复现和修复方面的优势。

Mistral Large 4 scores 51% on the Artificial Analysis Cyber Index, which measures a model’s ability to discover vulnerabilities in a codebase, reproduce and validate them, and patch them without breaking existing functionality. Crucially, Mistral Large 4 handles these legitimate defensive security tasks without unnecessary refusals.

Mistral Large 4 在 Artificial Analysis 网络安全指数中得分为 51%，该指数衡量模型在代码库中发现漏洞、复现并验证漏洞，以及在不破坏现有功能的情况下修复漏洞的能力。至关重要的是，Mistral Large 4 在处理这些合法的防御性安全任务时，不会出现不必要的拒绝。

Safety has improved alongside capability. Our model’s built-in guardrails distinguishes between defensive and malicious, offensive cybersecurity tasks. It retains strong performance on Cyber benchmarks, while achieving an average refusal rate of 96.6% on malicious cyber requests, the highest we measure among open models.

安全性与能力同步提升。我们模型的内置护栏能够区分防御性任务与恶意攻击性网络安全任务。它在网络安全基准测试中保持了强劲表现，同时对恶意网络请求的平均拒绝率达到了 96.6%，这是我们在开源模型中测得的最高水平。

Here’s what global leaders in cybersecurity have to say about Mistral Large 4:

以下是全球网络安全领域领导者对 Mistral Large 4 的评价：

Testing by Booz Allen demonstrated the success of the European Mistral Large 4 model against our internal benchmark for source code security analysis. The model was able to match vulnerability detection recall rates against other frontier cyber models with a compelling cost curve. And, Mistral's support for model customization and data-sovereign deployment also lets us tailor it for our mission needs and client environments with strict data-residency requirements. We look forward to working with Mistral to strengthen critical infrastructure around the globe.

Booz Allen 的测试证明了欧洲 Mistral Large 4 模型在我们内部源代码安全分析基准测试中的成功。该模型能够以极具竞争力的成本曲线，在漏洞检测召回率上媲美其他前沿网络安全模型。此外，Mistral 对模型定制和数据主权部署的支持，也让我们能够根据任务需求和具有严格数据驻留要求的客户环境对其进行调整。我们期待与 Mistral 合作，加强全球关键基础设施的建设。

Brad Medairy, President National Cyber at Booz Allen Hamilton

Brad Medairy，Booz Allen Hamilton 国家网络安全总裁

Organizations that treat transparency and openness as strengths are positioned well as AI becomes central to security operations. Open-weight cybersecurity models extend that transparency to enterprises and governments that need to host and customize AI under their own control, and they allow researchers to study how these models behave, including where they could be misused. As adversaries increasingly use AI to accelerate their operations, we aim to work alongside model developers such as Mistral.

随着 AI 成为安全运营的核心，将透明度和开放性视为优势的组织将处于有利地位。开源权重的网络安全模型将这种透明度扩展到了需要在自身控制下托管和定制 AI 的企业与政府，并允许研究人员研究这些模型的行为，包括它们可能被滥用的地方。随着对手越来越多地利用 AI 加速其行动，我们旨在与 Mistral 等模型开发者并肩工作。