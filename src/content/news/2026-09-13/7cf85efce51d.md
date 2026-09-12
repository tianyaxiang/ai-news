---
title: "Pandas Should Go Extinct"
originalUrl: "https://eddie.codes/posts/pandas-should-go-extinct/"
date: "2026-09-12T23:06:05.115Z"
---

# Pandas Should Go Extinct
# Pandas 应该灭绝

12 September 2026 / pandas , python , data , polars , duckdb , analytics
2026 年 9 月 12 日 / pandas, python, 数据, polars, duckdb, 分析

This post covers material from a talk I gave at Latency Conference. If you want to just: Watch the talk you can find the recording here; or Read the slides, they are here.
本文涵盖了我在 Latency Conference 上演讲的内容。如果你只想：观看演讲，可以在这里找到录像；或者阅读幻灯片，请点击这里。

You read that correctly, Pandas should go extinct. Not the cute fluffy things used for international diplomacy, but the Python DataFrame library. Why? Because Pandas’ inefficiencies force you to adopt distributed querying systems before your workloads justify the added complexity. I posit that most workloads will never justify those systems, they are just well marketed “silver bullets”.
你没看错，Pandas 应该灭绝。指的不是那些用于国际外交的可爱毛茸茸的动物，而是那个 Python DataFrame 库。为什么？因为 Pandas 的低效迫使你在工作负载还不足以支撑其复杂性之前，就不得不采用分布式查询系统。我认为大多数工作负载永远不需要这些系统，它们只是营销包装下的“银弹”。

To understand what I’m talking about we first must understand the typical adoption pathway for Pandas. Why do we use Pandas? The diagram below shows a rough guide of when you typically would consider adopting a given DataFrame library based on the data size you are working with. Following it from left to right, you also see the typical adoption pathway for data analysis tools, and the cliff that Pandas’ users experience beyond a certain data size.
为了理解我在说什么，我们首先必须了解 Pandas 的典型采用路径。我们为什么要使用 Pandas？下图展示了一个粗略的指南，说明了根据处理的数据规模，你通常会在何时考虑采用特定的 DataFrame 库。从左到右看，你还可以看到数据分析工具的典型采用路径，以及 Pandas 用户在超过一定数据规模后所经历的“悬崖”。

People typically start with Excel and graduate to Pandas somewhere in the GB range. Pandas serves them well into the 10s of GBs range, and then they start hitting memory issues, slow computation, or become frustrated with Pandas’ baroque API. The traditional answer at this point is to graduate to a “real” (read: expensive) tool like Spark, DataBricks, Snowflake, or Dask designed for Big Data ™️.
人们通常从 Excel 开始，在数据达到 GB 级别时转向 Pandas。Pandas 在处理几十 GB 的数据时表现良好，但随后用户就会遇到内存问题、计算缓慢，或者对 Pandas 繁琐的 API 感到沮丧。此时的传统解决方案是转向为“大数据 (Big Data™️)”设计的“真正”（即昂贵）工具，如 Spark、DataBricks、Snowflake 或 Dask。

Here’s the thing: there’s a growing gap between the “Pandas cliff” and the scale where distributed systems are genuinely necessary. This gap, sits somewhere around the 100GB mark, and can be effectively filled by modern, high-performance, single-machine tools. I’m primarily talking about Polars and DuckDB.
关键在于：在“Pandas 悬崖”与真正需要分布式系统的规模之间，存在一个日益扩大的鸿沟。这个鸿沟大约在 100GB 左右，完全可以由现代的高性能单机工具来填补。我主要指的是 Polars 和 DuckDB。

Why do we care so much about this ~100GB threshold? The answer lies in understanding how much “Big Data” exists in the wild. I have Big Data, right? In 2024, Amazon published a paper entitled “Why TPC is not enough: An analysis of the Amazon Redshift fleet”. The aim of this paper was to compare telemetry data from Amazon’s own distributed analytics database, Redshift, with the query patterns used in industry standard database benchmarks. As part of their analysis Amazon published fleet statistics on query run times and table sizes.
我们为什么如此关注这个 ~100GB 的阈值？答案在于了解现实世界中到底存在多少“大数据”。我有大数据，对吧？2024 年，亚马逊发表了一篇题为《为什么 TPC 不够：对 Amazon Redshift 集群的分析》的论文。这篇论文旨在将亚马逊自有的分布式分析数据库 Redshift 的遥测数据与行业标准数据库基准测试中的查询模式进行比较。作为分析的一部分，亚马逊公布了关于查询运行时间和表大小的集群统计数据。

If we’re willing to make a couple of assumptions we draw some interesting conclusions about how Amazon’s customers are using analytics databases. Let’s assume that: The average size of a row in a Redshift table is 1KB; Every RedShift cluster is comprised of 10 machines that are each capable of guzzling data at 8GB/s from S3, and do nothing but this.
如果我们愿意做一些假设，就能得出关于亚马逊客户如何使用分析数据库的一些有趣结论。假设：Redshift 表中一行的平均大小为 1KB；每个 Redshift 集群由 10 台机器组成，每台机器都能以 8GB/s 的速度从 S3 读取数据，且只做这件事。

We find that: 94.68% of tables in the Redshift fleet contain fewer than 100GB of data; 86.9% of queries operate on 80GB of data or less.
我们发现：Redshift 集群中 94.68% 的表包含的数据量少于 100GB；86.9% 的查询操作的数据量在 80GB 或以下。

But what does this all mean? You likely do not have Big Data, and probably never will. You have Medium Data problems, and need Medium Data solutions. Meet the alternatives. The alternatives I propose, as alluded to earlier are DuckDB and Polars. In broad strokes, Polars is a Rust-based DataFrame library that feels familiar to Pandas, but differs in several important ways we will explore. DuckDB is an in-memory analytics DB - essentially SQLite for analytics.
这一切意味着什么？你很可能并没有大数据，而且可能永远也不会有。你面临的是“中等数据 (Medium Data)”问题，需要的是“中等数据”解决方案。来认识一下这些替代方案吧。正如前面提到的，我建议的替代方案是 DuckDB 和 Polars。简单来说，Polars 是一个基于 Rust 的 DataFrame 库，用起来感觉和 Pandas 很像，但在几个重要方面有所不同，我们稍后会探讨。DuckDB 是一个内存分析数据库——本质上就是用于分析的 SQLite。

To get a feel for these tools and how they differ from Pandas let’s look at an example. The 1 Billion Row Challenge was a challenge to write the fastest Java program which could compute the min, mean and max of a 1 billion row CSV containing weather station data.
为了感受这些工具以及它们与 Pandas 的区别，我们来看一个例子。“10 亿行挑战 (1 Billion Row Challenge)”是一项竞赛，要求编写最快的 Java 程序，计算包含气象站数据的 10 亿行 CSV 文件的最小值、平均值和最大值。

Shut up and show me the code. Without further ado, let’s look at some implementations. Pandas: This should look very familiar to anyone who has touched Pandas before. We read the data in from the CSV, group by the weather station and then compute the aggregate min, mean and max figures.
少废话，直接上代码。废话不多说，让我们看看一些实现。Pandas：对于任何接触过 Pandas 的人来说，这看起来应该非常熟悉。我们从 CSV 读取数据，按气象站分组，然后计算聚合的最小值、平均值和最大值。