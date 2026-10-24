---
title: "Twelve years of distributed SQLite"
originalUrl: "https://philipotoole.com/twelve-years-of-distributed-sqlite/"
date: "2026-10-24T01:16:58.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# Twelve years of distributed SQLite

In September 2014 I published a short post announcing rqlite. The idea was simple: take SQLite, put a Raft log in front of it, and replicate every write to a cluster so that the loss of a node did not mean the loss of the data. The source went on GitHub that same weekend. As far as I can tell, that was the first open-source system to combine Raft and SQLite. Nobody else was doing it, and for several years nobody else tried.

2014 年 9 月，我发布了一篇简短的文章，宣布了 rqlite 的诞生。其构思很简单：采用 SQLite，在其前端放置一个 Raft 日志，并将每次写入操作复制到集群中，这样即使丢失一个节点也不会导致数据丢失。那个周末，源代码就被上传到了 GitHub。据我所知，这是第一个将 Raft 和 SQLite 结合起来的开源系统。当时没有人这样做，随后的几年里也没有人尝试。

Today “distributed SQLite” is a category with a dozen projects in it, a few of them venture-funded, two of them acquired. Since the people now writing about the category tend to start the story around 2021, I thought I should write down the version that starts in 2014. I was there for all of it.

如今，“分布式 SQLite”已经成为一个包含十几个项目的类别，其中一些获得了风险投资，还有两个已被收购。由于现在撰写该类别文章的人往往从 2021 年左右开始讲述，我想我应该写下从 2014 年开始的版本。我亲历了这一切。

The need was concrete. A clustered system I worked on at jut.io needed a small amount of relational storage, and the question of which node should hold it had no good answer. Replicating SQLite with a consensus protocol solved it. We went another way at work, but I kept building rqlite because the problem was general and the solution was small. The first version used goraft, the same library InfluxDB and etcd used at the time (I subsequently joined InfluxDB as a core developer around the same time). In early 2016 I replaced it with Hashicorp’s Raft implementation which rqlite still uses.

当时的需求非常具体。我在 jut.io 工作时参与的一个集群系统需要少量的关系型存储，而关于哪个节点应该持有这些数据的问题一直没有好的答案。通过共识协议复制 SQLite 解决了这个问题。虽然我们在工作中选择了其他方案，但我还是继续开发 rqlite，因为这个问题具有普遍性，且解决方案很精简。第一个版本使用了 goraft，这是当时 InfluxDB 和 etcd 使用的同一个库（我随后在大约同一时间加入了 InfluxDB 担任核心开发人员）。2016 年初，我将其替换为 Hashicorp 的 Raft 实现，rqlite 至今仍在使用它。

The design decision that mattered most was made then and never changed. rqlite is a CP system. Writes must go through the leader, a majority must acknowledge, and a partitioned minority refuses writes. Everything else, the HTTP API, the read-consistency levels, the snapshotting, followed from that.

当时做出的最重要的设计决策至今未变。rqlite 是一个 CP（一致性与分区容错性）系统。写入必须通过领导者，必须获得多数派确认，而处于分区状态的少数派则拒绝写入。其他所有功能，如 HTTP API、读取一致性级别和快照机制，都是基于此衍生出来的。

Two things deserve mention for honesty’s sake. Expensify had been replicating SQLite inside its own infrastructure for years with a Paxos-style protocol; they released it as Bedrock in 2016. And ActorDB, an Erlang system that gave each “actor” its own SQLite database replicated by Raft, appeared around the same time as rqlite. Neither was widely adopted outside its origin, but both show the idea was in the air. What rqlite did was make it a standalone, general-purpose, open-source thing anyone could run.

为了诚实起见，有两件事值得一提。Expensify 多年来一直使用 Paxos 风格的协议在其内部基础设施中复制 SQLite；他们于 2016 年将其发布为 Bedrock。此外，ActorDB 是一个 Erlang 系统，它为每个“参与者”提供由 Raft 复制的独立 SQLite 数据库，它与 rqlite 大约在同一时间出现。两者在各自起源之外都没有得到广泛采用，但都表明这种想法在当时已初现端倪。rqlite 所做的是将其变成了一个任何人都可以运行的、独立的、通用的开源项目。

Canonical built dqlite to get LXD and later MicroK8s an embedded replicated store without running etcd. Mark Shuttleworth actually called me once, and we talked, hoping that rqlite could be made to work, but it never quite fit. dqlite began in Go and was rewritten in C with its own Raft library. It is the project most similar to rqlite in intent, and the main difference is of one of packaging: dqlite is a library you embed, rqlite is a server you run. Canonical’s need was a database inside their products: mine was a database beside anyone’s product.

Canonical 构建了 dqlite，旨在为 LXD 和后来的 MicroK8s 提供一个嵌入式复制存储，而无需运行 etcd。Mark Shuttleworth 甚至曾给我打过电话，我们讨论过是否能让 rqlite 适配，但最终并不合适。dqlite 最初使用 Go 编写，后来用 C 语言重写，并拥有自己的 Raft 库。它是意图上与 rqlite 最相似的项目，主要区别在于封装方式：dqlite 是一个嵌入式库，而 rqlite 是一个独立运行的服务器。Canonical 的需求是产品内部的数据库，而我的需求是任何产品旁侧的数据库。

Ben Johnson (whom I worked with at InfluxDB) released Litestream in early 2021. Litestream does not use consensus at all. It watches the SQLite WAL and streams it to S3, giving you disaster recovery for a single-node SQLite database at almost no cost. Ben’s argument was that most applications do not need a cluster; they use one machine and need a way to recover if it dies. He was right about a great many applications, and the “SQLite is enough” movement of the next few years, with blog posts and conference talks, owes a lot to that argument.

Ben Johnson（我曾在 InfluxDB 与他共事）于 2021 年初发布了 Litestream。Litestream 完全不使用共识机制。它监视 SQLite 的预写日志（WAL）并将其流式传输到 S3，从而以几乎零成本为单节点 SQLite 数据库提供灾难恢复。Ben 的观点是，大多数应用程序不需要集群；它们使用单台机器，并且需要一种在机器宕机时进行恢复的方法。对于绝大多数应用程序而言，他是对的。随后几年里，伴随着博客文章和会议演讲，“SQLite 足矣”运动在很大程度上归功于这一论点。

Litestream and rqlite answer different questions. Litestream: what if the machine dies? rqlite: what if the machine dies and I cannot wait to restore? The first question is more common, the second is the one people have when they come to rqlite.

Litestream 和 rqlite 回答了不同的问题。Litestream 回答的是：如果机器宕机了怎么办？rqlite 回答的是：如果机器宕机了，而我无法等待恢复过程怎么办？第一个问题更为常见，而第二个问题则是人们在选择 rqlite 时所考虑的。

Fly.io hired Ben in 2022 and shipped LiteFS, which replicates SQLite at filesystem level with leases from Consul. It was the first attempt to make replicated SQLite a platform feature rather than a thing you deploy. And in a final twist, Litestream inspired rqlite’s v8.0 approach to handling the SQLite WAL.

Fly.io 在 2022 年聘请了 Ben 并发布了 LiteFS，它通过 Consul 的租约在文件系统级别复制 SQLite。这是首次尝试将复制 SQLite 作为平台功能，而不是需要用户自行部署的组件。最后，Litestream 还启发了 rqlite v8.0 处理 SQLite WAL 的方式。

Two projects in 2022 took approaches that neither rqlite nor Litestream had. cr-sqlite added CRDTs to SQLite as an extension, so that multiple writers could diverge and merge without a leader. That is the AP corner of the design space, and it suits local-first applications where rqlite’s CP guarantees would be a hindrance.

2022 年的两个项目采用了 rqlite 和 Litestream 都没有的方法。cr-sqlite 将 CRDT（无冲突复制数据类型）作为扩展添加到 SQLite 中，使得多个写入者可以在没有领导者的情况下进行分叉和合并。这是设计空间中 AP（可用性与分区容错性）的一角，它非常适合那些 rqlite 的 CP 保证反而会成为阻碍的“本地优先”应用程序。

libSQL forked SQLite itself. ChiselStrike, later Turso, wanted to change things inside the engine that the SQLite project, which does not accept outside contributions, and would not change. On top of the fork they built a hosted service with replicas at the edge. Turso raised venture money on that, and in 2026 Supabase acquired them.

libSQL 对 SQLite 进行了分叉。ChiselStrike（后来的 Turso）希望更改引擎内部的内容，而 SQLite 项目本身不接受外部贡献，也不会进行这些更改。在分叉的基础上，他们构建了一个在边缘拥有副本的托管服务。Turso 因此获得了风险投资，并于 2026 年被 Supabase 收购。

Around the same time, SQLite Cloud appeared, offering hosted SQLite replicated with Raft. It is the project closest to rqlite’s original design, wrapped in a cloud service.

大约在同一时间，SQLite Cloud 出现了，提供由 Raft 复制的托管 SQLite。它是最接近 rqlite 原始设计的项目，只是被包装成了云服务。

Cloudflare announced D1 in 2022, SQLite as a serverless database inside their edge network, and later put SQLite storage inside Durable Objects. This is replicated SQLite as a managed product from a company that does not need to tell you how it works. Turso’s service is the same shape. The category had gone from “a thing you run” to “a thing you buy.”

Cloudflare 在 2022 年宣布了 D1，将其作为边缘网络内的无服务器数据库，后来又将 SQLite 存储放入了 Durable Objects 中。这是由一家无需向你解释其工作原理的公司提供的托管产品形式的复制 SQLite。Turso 的服务也是同样的模式。该类别已经从“你需要运行的东西”转变为“你可以购买的东西”。

Three things, I think.

我认为有三点总结。

The core was right. SQLite as a storage engine, with replication added on the outside, has been reinvented by at least eight teams with different needs and different protocols. Nobody has found a reason to stop doing it.

核心思路是正确的。将 SQLite 作为存储引擎，并在外部添加复制功能，这一方案已被至少八个有着不同需求和不同协议的团队重新发明。没有人找到停止这样做的理由。

The design space has three corners, and they appeared in order. Consensus first (rqlite, dqlite): one leader, strong consistency, a cluster. Streaming second (Litestream): one writer, cheap recovery, no cluster. Merge third (cr-sqlite, and parts of the local-first movement): many writers, eventual consistency. Each is correct for a different question, and most of the arguments are arguments between their users about which question is being asked.

设计空间有三个维度，它们按顺序出现。首先是共识（rqlite, dqlite）：一个领导者、强一致性、集群。其次是流式传输（Litestream）：一个写入者、低成本恢复、无集群。第三是合并（cr-sqlite 以及部分“本地优先”运动）：多个写入者、最终一致性。每种方案对于不同的问题都是正确的，而大多数争论其实是用户之间关于“到底在问什么问题”的争论。

And the money went to the platforms. rqlite, dqlite, and Litestream are open source and free. The projects that raised the capital or got acquired are the ones that turned replicated SQLite into a service with a bill. That is the usual fate of infrastructure ideas, and I do not mind it. But it is worth recording.

资金流向了平台。rqlite、dqlite 和 Litestream 是开源且免费的。那些筹集到资金或被收购的项目，都是将复制 SQLite 转化为收费服务的项目。这是基础设施理念的常见命运，我并不介意。但这一点值得记录下来。