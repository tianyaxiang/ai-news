---
title: "MTIA 300: Meta’s First Training Chip with Built-in NICs and Communication-Offloading Engines"
originalUrl: "https://engineering.fb.com/2026/08/24/networking-traffic/mtia-300-meta-training-chip-built-in-nics/"
date: "2026-08-24T21:56:24.905Z"
---

# MTIA 300: Meta’s First Training Chip with Built-in NICs and Communication-Offloading Engines
# MTIA 300：Meta 首款内置网卡与通信卸载引擎的训练芯片

By Rajiv Krishnamurthy, Wes Bland
作者：Rajiv Krishnamurthy, Wes Bland

MTIA 300 is the first of Meta’s family of in-house training and inference accelerators optimized for training ranking and recommendation models. We’re sharing how MTIA 300’s built-in NIC chiplets allow it to meet the communication needs associated with training recommendation models with superior performance over general-purpose GPUs. By co-designing MTIA’s communication library, HCCL, alongside the chip we’ve taken a fundamentally different approach to chip design and made communication a first-class citizen.
MTIA 300 是 Meta 自研训练与推理加速器系列中的首款产品，专为训练排序和推荐模型而优化。我们将分享 MTIA 300 的内置网卡（NIC）小芯片（chiplets）如何使其在满足推荐模型训练的通信需求时，展现出优于通用 GPU 的性能。通过将 MTIA 的通信库 HCCL 与芯片进行协同设计，我们采取了一种根本不同的芯片设计方法，将通信提升为核心要素。

Deep learning models may deliver personalized content—from short videos to friend posts—to people on apps. As these models have grown in complexity, so has the importance of the compute that trains them, and the network that connects those accelerators. Training recommendation models is a unique infrastructure challenge. Unlike large language models, which need enormous floating-point throughput, recommendation models are bottlenecked by a need for fast and efficient communication between the accelerators that train them. Their embedding tables can contain over 99% of the model’s parameters, requiring hybrid parallelism that generates frequent AllReduce, AllToAll, and AllGather collectives across hundreds of accelerators. On chips like GPUs these communication operations compete with training computation for the same resources, often leaving expensive hardware underutilized.
深度学习模型能够为应用用户提供个性化内容，从短视频到好友动态。随着这些模型复杂度的增加，训练它们的计算能力以及连接这些加速器的网络变得愈发重要。训练推荐模型是一项独特的架构挑战。与需要巨大浮点吞吐量的大语言模型不同，推荐模型的瓶颈在于训练加速器之间需要快速高效的通信。它们的嵌入表（embedding tables）可能包含模型 99% 以上的参数，这需要混合并行处理，从而在数百个加速器之间产生频繁的 AllReduce、AllToAll 和 AllGather 集体通信操作。在 GPU 等芯片上，这些通信操作会与训练计算争夺相同的资源，往往导致昂贵的硬件资源利用率不足。

We’ve addressed this challenge starting on the Meta Training and Inference Accelerator (MTIA), our family of homegrown AI chips, with MTIA 300, the first of the MTIA family optimized for training recommendation and ranking models. By co-designing MTIA 300 with HCCL, a communication library co-designed with the hardware from scratch, we’ve made communication a first-class citizen in the chip’s design, not an afterthought handled by general-purpose compute cores.
我们通过 MTIA 300 解决了这一挑战。MTIA 300 是我们自研 AI 芯片系列——Meta 训练与推理加速器（MTIA）中的首款针对推荐和排序模型训练进行优化的产品。通过将 MTIA 300 与从零开始协同设计的通信库 HCCL 结合，我们将通信提升为芯片设计中的核心要素，而非由通用计算核心处理的“事后补救”。

### Integrating the Network Directly on the Chip
### 将网络直接集成到芯片上

With MTIA 300, the network interface lives inside the chip package itself (see Figure 1). Two network chiplets, each containing six custom 800 Gbps RDMA NICs, provide 1.2 TB/s of total I/O bandwidth without ever crossing a PCIe bus. This eliminates the host-device-NIC bottleneck present in traditional GPU architectures, where the CPU must mediate between the accelerator and the network. (More details about the silicon design are available in our recent paper from the ISCA 26 conference.) Because we use the same 12 Ethernet-based NICs for scale-up communication (within a rack of 16 nodes, at up to 1 TB/s) and scale-out communication (across racks, at 200 GB/s), we can flexibly partition the NICs to adjust to changing needs.
在 MTIA 300 中，网络接口位于芯片封装内部（见图 1）。两个网络小芯片（每个包含 6 个定制的 800 Gbps RDMA 网卡）提供了 1.2 TB/s 的总 I/O 带宽，且无需经过 PCIe 总线。这消除了传统 GPU 架构中存在的“主机-设备-网卡”瓶颈，即 CPU 必须在加速器和网络之间进行中转。（关于芯片设计的更多细节，请参阅我们在 ISCA 26 会议上发表的最新论文。）由于我们使用相同的 12 个基于以太网的网卡进行纵向扩展通信（在 16 节点的机架内，速度高达 1 TB/s）和横向扩展通信（跨机架，速度为 200 GB/s），我们可以灵活地划分网卡以适应不断变化的需求。

As model requirements shift, we can reconfigure this split by reconfiguring the network rather than changing the hardware. To minimize per-transaction latency, we introduced express doorbells. The work request write itself serves as the doorbell, eliminating an additional memory read and saving ~800 ns per operation.
随着模型需求的变化，我们可以通过重新配置网络来调整这种分配，而无需更换硬件。为了最大限度地减少单次事务延迟，我们引入了“快速门铃”（express doorbells）。工作请求写入本身就充当了门铃，消除了额外的内存读取，每次操作节省约 800 纳秒。

### Offloading Communication From the Compute Grid
### 将通信从计算网格中卸载

On GPUs, libraries such as NCCL execute collective communication as GPU kernels that consume streaming multiprocessors—the same hardware needed for training computation. When collectives and training kernels run simultaneously, both slow down. MTIA 300 takes a different approach. Alongside its 12×6 grid of processing elements (PEs) for computation, the chip includes 16 dedicated message engines (MEs) that handle all communication independently. Each ME contains: an RISC-V core for orchestrating, an NIC interface that routes requests to the correct NIC, and a near-memory compute (NMC) block that performs reductions at 128 bytes/cycle.
在 GPU 上，NCCL 等库将集体通信作为 GPU 内核执行，这会消耗流式多处理器（SM）——即训练计算所需的相同硬件。当集体通信和训练内核同时运行时，两者都会变慢。MTIA 300 采取了不同的方法。除了用于计算的 12×6 处理单元（PE）网格之外，该芯片还包含 16 个专用的消息引擎（ME），用于独立处理所有通信。每个 ME 包含：一个用于协调的 RISC-V 核心、一个将请求路由到正确网卡的网卡接口，以及一个以每周期 128 字节速度执行归约（reduction）的近内存计算（NMC）模块。

Positioned at the chip edges next to HBM and cache, the NMCs collectively deliver more than 2.8 TBs of reduction throughput—more than double the I/O bandwidth—enabling line-rate execution of AllReduce and ReduceScatter collectives without touching the compute grid. The result is near-perfect isolation. Running large GEMMs concurrently with collective operations introduces less than 0.5% degradation to compute throughput, as opposed to traditional GPUs that can see over 20% degradation because communication is handled by the same GPU resources.
NMC 位于芯片边缘，紧邻 HBM 和缓存，总共可提供超过 2.8 TB 的归约吞吐量（超过 I/O 带宽的两倍），从而在不触及计算网格的情况下实现 AllReduce 和 ReduceScatter 集体操作的线速执行。结果是实现了近乎完美的隔离。在运行大型 GEMM（通用矩阵乘法）的同时进行集体操作，对计算吞吐量的影响不到 0.5%，而传统 GPU 由于通信由相同的 GPU 资源处理，性能下降可能超过 20%。

### A Compiled-Communication Model
### 编译型通信模型

Our communication library, HCCL, was co-designed with MTIA 300. Rather than driving communication from the host during execution, HCCL compiles each collective into a complete set of subgraphs—arrays of work-queue entries with explicit dependencies—dispatched to the MEs for fully autonomous execution. Once work reaches the device, the host is uninvolved.
我们的通信库 HCCL 是与 MTIA 300 协同设计的。HCCL 不会在执行期间由主机驱动通信，而是将每个集体操作编译成一套完整的子图（即带有明确依赖关系的工作队列条目数组），并分发给 ME 进行完全自主的执行。一旦工作到达设备，主机就不再参与。

This compiled model integrates naturally with PyTorch’s c10d and torchcomms interfaces. Collectives traced through torch.compile are compiled into a single graph alongside compute operators. HCCL selects topology-aware algorithms that exploit the asymmetric bandwidth between scale-up and scale-out, minimizing cross-rack traffic where bandwidth is constrained. For inference workloads, we developed additional paths: one-sided communication where PEs submit work directly through express doorbells, and device-triggered collectives where compute kernels signal hardware-offloaded communication on a parallel stream without breaking graph execution.
这种编译模型与 PyTorch 的 c10d 和 torchcomms 接口自然集成。通过 torch.compile 追踪的集体操作会与计算算子一起被编译成单个图。HCCL 选择拓扑感知算法，利用纵向扩展和横向扩展之间的非对称带宽，最大限度地减少带宽受限情况下的跨机架流量。对于推理工作负载，我们开发了额外的路径：一种是单向通信，即 PE 通过快速门铃直接提交工作；另一种是设备触发的集体操作，即计算内核在并行流上发出硬件卸载通信的信号，而不会中断图的执行。

### Performance in Production
### 生产环境性能

HCCL achieves up to 940 GB/s of communication bandwidth within a single rack. On a 150-billion-parameter production-recommendation model running across 40 accelerators, MTIA 300’s total communication time is 3.9 times faster than the equivalent GPU cluster. MTIA 300’s design enables further co-design strategies: Its 216 GB of HBM3E allows larger local batch sizes (reducing trainer count and communic...
HCCL 在单个机架内可实现高达 940 GB/s 的通信带宽。在跨 40 个加速器运行的 1500 亿参数生产级推荐模型上，MTIA 300 的总通信时间比同等 GPU 集群快 3.9 倍。MTIA 300 的设计实现了进一步的协同设计策略：其 216 GB 的 HBM3E 允许更大的本地批处理大小（减少了训练器数量和通信……）