---
title: "Introducing harness adapters: adapt your favorite model to your harness to improve performance and cost"
originalUrl: "https://huggingface.co/blog/harness-adapters-at-scale"
date: "2026-11-20T00:00:00.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# Introducing harness adapters: adapt your favorite model to your harness to improve performance and cost

Combining RL on a custom task distribution with your favorite agent harness yields more accurate and efficient models for that target harness and task distribution. Models are not fully optimized for all harnesses and the tasks you’re doing. Instead, they target general performance. So when you combine a model and harness, you’re leaving performance and efficiency on the table for the stuff you’re actually doing.

将强化学习（RL）应用于自定义任务分布与您偏好的智能体框架（harness）相结合，可以为特定的框架和任务分布生成更准确、更高效的模型。模型并非针对所有框架和您正在执行的任务进行了完全优化，而是旨在实现通用性能。因此，当您将模型与框架结合使用时，在实际操作中往往会牺牲掉一部分性能和效率。

With RL, you can train a custom harness adapter that squeezes everything out of your model for your harness and task combination. Take Qwen3.8-27B, its Terminal-Bench 2.1 score with the pi harness is 39% which uses on average 2.9K tokens per task. If we freeze those weights and add a custom RL-trained LoRA adapter we can get 55% pass@1, with average token usage of 1.5K. Most of this is down to the model reasoning less, calling less tools, and performing better first time.

通过强化学习，您可以训练一个自定义的框架适配器（harness adapter），从而充分挖掘模型在特定框架和任务组合下的潜力。以 Qwen3.8-27B 为例，它在 pi 框架下使用 Terminal-Bench 2.1 的得分为 39%，平均每个任务消耗 2.9K 个 token。如果我们冻结这些权重并添加一个经过强化学习训练的自定义 LoRA 适配器，可以将 pass@1 得分提升至 55%，且平均 token 消耗降至 1.5K。这主要归功于模型减少了推理步骤、减少了工具调用，并能更高效地一次性完成任务。

Training inside agent harnesses: We leverage the Harbor integration in OpenEnv and TRL’s OpenEnv guide to train the model inside the harnesses we chose for the final training. We have built ready-to-use docker images for all our RL tasks that come with the target harnesses already pre-installed inside. In our final docker images, we use Pi 1.5.2, OpenCode 2.2.7 and Hermes Agent v0.22.6.

在智能体框架内进行训练：我们利用 OpenEnv 中的 Harbor 集成以及 TRL 的 OpenEnv 指南，在我们选择用于最终训练的框架内对模型进行训练。我们为所有强化学习任务构建了即用型 Docker 镜像，其中已预装了目标框架。在最终的 Docker 镜像中，我们使用了 Pi 1.5.2、OpenCode 2.2.7 和 Hermes Agent v0.22.6。

Generating custom RL tasks on Hugging Face: For this recipe we created a custom dataset for agentic coding with the Hub, OpenEnv, and Repo2RLEnv. We combined together task retrieval of existing RL envs, task generation with Repo2RLEnv, task validation with OpenEnv, and sampling into a single data pipeline. This gave us the highest quality set of validated and relevant tasks to improve Qwen3.8-27B on agentic coding.

在 Hugging Face 上生成自定义强化学习任务：为了实现这一方案，我们利用 Hub、OpenEnv 和 Repo2RLEnv 创建了一个用于智能体编码的自定义数据集。我们将现有强化学习环境的任务检索、使用 Repo2RLEnv 的任务生成、使用 OpenEnv 的任务验证以及采样过程整合到了一个单一的数据流水线中。这为我们提供了最高质量的、经过验证且相关的任务集，从而提升了 Qwen3.8-27B 在智能体编码方面的表现。