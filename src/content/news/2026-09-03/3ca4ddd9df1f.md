---
title: "Graph Neural Networks: GCN, MPNN, and GAT, Explained Simply"
originalUrl: "https://towardsdatascience.com/graph-neural-networks-gcn-mpnn-and-gat-explained-simply/"
date: "2026-09-02T23:36:22.530Z"
---

# Graph Neural Networks: GCN, MPNN, and GAT, Explained Simply
# 图神经网络：GCN、MPNN 和 GAT 简明指南

### Introduction
### 引言

Neural networks are an incredible innovation. Since a long period of time and up until now, they have been used as a key component in solving complex AI problems. Under the hood, neural networks learn a sophisticated mathematical function that transforms input data into a desired target.
神经网络是一项令人惊叹的创新。长期以来，它们一直是解决复杂人工智能问题的关键组件。从底层逻辑来看，神经网络学习的是一种复杂的数学函数，能够将输入数据转换为预期的目标。

However, by default, normal neural networks do not use any knowledge about the relationship between the parts of the input data. For instance, to process images, convolutions are commonly used as a way to combine each pixel with its neighbouring pixels, because they are related to each other. Otherwise, a neural network would not know if a pixel at position N is related to a pixel at position N + 1. This extra context can improve the performance of a model.
然而，默认情况下，普通神经网络并不会利用输入数据各部分之间关系的知识。例如，在处理图像时，卷积通常被用来将每个像素与其相邻像素结合起来，因为它们彼此相关。否则，神经网络将无法得知位置 N 的像素是否与位置 N+1 的像素相关。这种额外的上下文信息可以提升模型的性能。

The same is true for graphs, which represent a set of objects along with the relationships between them. There are many objects that can be represented by graphs, such as molecules, social networks, players during a soccer match, traffic, or metro maps. Graphs can contain valuable context and it is important to understand how one can exploit their full potential. For that reason, there exist graph neural networks (GNN) that, as the name suggests, apply neural networks to graph structures.
图（Graph）也是如此，它代表了一组对象及其之间的关系。许多对象都可以用图来表示，例如分子、社交网络、足球比赛中的球员、交通流量或地铁线路图。图可以包含有价值的上下文信息，理解如何挖掘其全部潜力至关重要。因此，图神经网络（GNN）应运而生，顾名思义，它将神经网络应用于图结构。

### Applications
### 应用场景

A great thing about GNNs is that once trained, they can be applied to new graphs with other structures. For example, if a GNN is trained on molecules of certain types, we can still use that GNN to perform a classification task by giving it a molecule whose graph contains a completely new, unseen structure. That is how, for instance, there has been using a popular use-case of GNN consisted of training a model for antibiotic discovery.
GNN 的一大优点是，一旦训练完成，它们就可以应用于具有其他结构的新图。例如，如果一个 GNN 是在特定类型的分子上训练的，我们仍然可以使用该 GNN 执行分类任务，即使输入的是一个包含全新、未见结构的分子图。例如，GNN 的一个热门应用案例就是训练模型用于抗生素发现。

Apart from it, a GNN can also be used to classify individual nodes or edges. GNN's output can also be used to classify a graph as a whole.
此外，GNN 还可以用于对单个节点或边进行分类。GNN 的输出也可以用于对整个图进行分类。

*Diagram showing the input graph state G(X, A) and output graph state G(H, A) produced by a GNN, where A is the adjacency matrix, and X and H are embedding matrices whose i-th rows, x[i] and h[i], correspond to the i-th node's feature vector. The GNN preserves the original graph structure but transforms the node states from x[i] to h[i]. The resulting graph G(H, A) can then be used for downstream tasks such as node classification, edge classification, or graph classification, and can even generalize to graphs with structures different from those seen during training.*
*图示展示了由 GNN 产生的输入图状态 G(X, A) 和输出图状态 G(H, A)，其中 A 是邻接矩阵，X 和 H 是嵌入矩阵，它们的第 i 行 x[i] 和 h[i] 分别对应第 i 个节点的特征向量。GNN 保留了原始图结构，但将节点状态从 x[i] 转换为 h[i]。生成的图 G(H, A) 可用于下游任务，如节点分类、边分类或图分类，甚至可以泛化到与训练时结构不同的图上。*

### Graph Convolutional Networks (GCN)
### 图卷积网络 (GCN)

#### Concept
#### 概念

Let's go back to convolutions. As we know, they take a pixel and its neighbourhood as input, and combine them to produce a new value for the pixel. This approach assumes there is a relationship between adjacent pixels and allows the model to take into account the local context around the pixel. We can naturally apply this idea to graphs: by picking up a node with its adjacent nodes, our method will combine them, and produce a new node with new features. The described approach is presented in the section "Update rule".
让我们回到卷积。众所周知，卷积以像素及其邻域作为输入，并将它们结合起来为该像素生成一个新值。这种方法假设相邻像素之间存在关系，并允许模型考虑像素周围的局部上下文。我们可以自然地将这一思想应用于图：通过选取一个节点及其相邻节点，我们的方法将它们结合起来，并生成一个具有新特征的新节点。上述方法将在“更新规则”一节中介绍。

In addition, what makes this idea interesting is that graphs can be seen as a generalization of images. In fact, each pixel in an image is connected to up to 4 adjacent pixels. There, there are common semantic similarities in convolution processes in both cases.
此外，这个想法之所以有趣，是因为图可以被视为图像的一种泛化。事实上，图像中的每个像素最多连接 4 个相邻像素。因此，这两种情况下的卷积过程存在共同的语义相似性。

#### Layers
#### 层级

In general, a GNN contains a small number of layers (usually between 2 and 4). A higher number of layers is usually avoided, as it might cause an oversmoothing problem, which is described later in this article.
通常，GNN 包含少量的层（通常在 2 到 4 层之间）。通常会避免使用过多的层，因为它可能会导致“过平滑”（oversmoothing）问题，本文稍后会对此进行描述。

Each layer transforms a feature vector from the previous layer using aggregation functions applied to it and its neighbours. This process is applied in parallel to each node independently, and the resulting feature vectors might have a different shape than the one from the previous layer. As a result, the shape of the feature vectors from the last GNN layer can differ from the input shape on the first layer.
每一层都使用应用于自身及其邻居的聚合函数，对来自前一层的特征向量进行转换。此过程并行且独立地应用于每个节点，生成的特征向量的形状可能与前一层不同。因此，最后一层 GNN 的特征向量形状可能与第一层的输入形状不同。

*An example of a node h[i] aggregating information via convolution from its adjacent nodes h[1], h[2], and h[3] to produce the next layer's representation h'. Each layer preserves the same node and edge structure as the previous layer, with updated vectors h[i]. GNNs typically contain between 2 and 4 layers. Backpropagation flows in the opposite direction, from the last layer to the first.*
*节点 h[i] 通过卷积从其相邻节点 h[1]、h[2] 和 h[3] 聚合信息以生成下一层表示 h' 的示例。每一层都保留与前一层相同的节点和边结构，并更新向量 h[i]。GNN 通常包含 2 到 4 层。反向传播的方向与前向传播相反，从最后一层流向第一层。*

#### Update rule
#### 更新规则

To describe the update rule, we would need three matrices:
为了描述更新规则，我们需要三个矩阵：

*   **A** - adjacency matrix (A[i][j] = A[j][i] = 1 if vertices i and j are connected, and A[i][j] = A[j][i] = 0 otherwise).
    **A** - 邻接矩阵（如果顶点 i 和 j 相连，则 A[i][j] = A[j][i] = 1，否则为 0）。
*   **H** - feature matrix. The i-th row of the matrix represents a feature vector of the i-th node.
    **H** - 特征矩阵。矩阵的第 i 行代表第 i 个节点的特征向量。
*   **W** - learnable linear transformation used by the GNN. This matrix is shared across all nodes of the graph.
    **W** - GNN 使用的可学习线性变换矩阵。该矩阵在图的所有节点之间共享。

By multiplying A by H, we get a neighbour-feature sum matrix. In other words, for each node in A, AH sums the feature values defined in H only for the nodes that are adjacent to it. For non-adjacent nodes, the feature value is ignored (multiplied by 0). Let's have a look at the example below.
通过将 A 与 H 相乘，我们得到一个邻居特征和矩阵。换句话说，对于 A 中的每个节点，AH 仅对与其相邻的节点在 H 中定义的特征值进行求和。对于非相邻节点，其特征值被忽略（乘以 0）。让我们看看下面的例子。

*The product of matrices A and H, computed for the graph shown on the left. We can clearly see that the zero values in the adjacency matrix cause the matrix multiplication to ignore the features of non-adjacent nodes (shown in red).*
*针对左侧图计算的矩阵 A 和 H 的乘积。我们可以清楚地看到，邻接矩阵中的零值导致矩阵乘法忽略了非相邻节点的特征（以红色显示）。*

By taking the result of AH, we can then multiply it by the matrix W which is learned by a neural network. As a last step, we apply a non-linear transformation σ. As a result, the update rule can be written as:
获取 AH 的结果后，我们可以将其乘以由神经网络学习到的矩阵 W。最后一步，我们应用非线性变换 σ。因此，更新规则可以写为：

**Update rule:** H' = σ(AHW)
**更新规则：** H' = σ(AHW)

*A is the adjacency matrix, H is the feature value matrix, W is the learnable shareable matrix, and H' is the updated feature value matrix at the next layer. σ is a non-linear function.*
*A 是邻接矩阵，H 是特征值矩阵，W 是可学习的共享矩阵，H' 是下一层的更新特征值矩阵。σ 是非线性函数。*

For the non-linear function σ, ReLU or LeakyReLY is usually chosen in GNN.
对于非线性函数 σ，GNN 中通常选择 ReLU 或 LeakyReLY。

Given that matrix multiplication is associative, for optimization purposes, specifically to reduce computational cost, when calculating AHW, HW is computed first and then multiplied by A on the left side.
鉴于矩阵乘法具有结合律，出于优化目的（特别是为了降低计算成本），在计算 AHW 时，通常先计算 HW，然后再在左侧乘以 A。

However, there are several issues with the current approach that we need to address in the next sections.
然而，当前的方法存在几个问题，我们需要在接下来的章节中解决。

#### Central node
#### 中心节点

First of all, during the computation...
首先，在计算过程中……