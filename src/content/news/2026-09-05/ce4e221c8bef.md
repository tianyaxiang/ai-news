---
title: "From Euclidean to Graph-Structured Data: A Survey of Collaborative Learning"
originalUrl: "https://arxiv.org/abs/2609.02984"
date: "2026-09-04T23:14:18.616Z"
---

# From Euclidean to Graph-Structured Data: A Survey of Collaborative Learning
# 从欧几里得数据到图结构数据：协同学习综述

**Abstract:** The conventional approach to machine learning, that is, collecting data, training models, and performing inference in a single location, faces fundamental limitations, including scalability and privacy, that restrict its applicability. To address these challenges, recent research has explored collaborative learning approaches, including federated learning and decentralized learning, where individual agents perform training and inference locally, with limited collaboration.

**摘要：** 传统的机器学习方法，即在单一位置收集数据、训练模型并执行推理，面临着包括可扩展性和隐私在内的根本性限制，这限制了其适用性。为了应对这些挑战，近期的研究探索了协同学习方法，包括联邦学习和去中心化学习，在这种模式下，各个智能体在本地执行训练和推理，并进行有限的协作。

Most collaborative learning research focuses on Euclidean data with regular, grid-like structure (e.g., images, text). However, these approaches fail to capture the relational patterns in many real-world applications, best represented by graphs. Learning on graphs relies on message-passing mechanisms to propagate information between connected nodes, making it conceptually well-suited for collaborative environments where agents must exchange information.

大多数协同学习研究集中在具有规则、网格状结构的欧几里得数据（如图像、文本）上。然而，这些方法无法捕捉许多现实应用中的关系模式，而这些模式最好由图来表示。图学习依赖于消息传递机制在连接的节点之间传播信息，这使其在概念上非常适合智能体必须交换信息的协同环境。

Yet, the opportunities and challenges of learning on graph-structured data in collaborative settings remain largely underexplored. This survey provides a comprehensive investigation of collaborative learning from Euclidean to graph-structured data, aiming to consolidate this emerging field. We begin by reviewing its foundational principles for Euclidean data, organizing them along three core dimensions: learning effectiveness, efficiency, and privacy preservation.

然而，在协同环境下对图结构数据进行学习的机遇与挑战在很大程度上仍未得到充分探索。本综述对从欧几里得数据到图结构数据的协同学习进行了全面调查，旨在整合这一新兴领域。我们首先回顾了欧几里得数据的基本原理，并将其组织为三个核心维度：学习有效性、效率和隐私保护。

We then extend the discussion to graph-structured data, introducing a taxonomy of graph distribution scenarios, characterizing associated statistical heterogeneities, and developing standardized problem formulations and algorithmic frameworks. Finally, we systematically identify open challenges and promising research directions.

随后，我们将讨论扩展到图结构数据，引入了图分布场景的分类法，表征了相关的统计异质性，并开发了标准化的问题表述和算法框架。最后，我们系统地确定了尚待解决的挑战和有前景的研究方向。