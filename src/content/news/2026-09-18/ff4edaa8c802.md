---
title: "Building a Data Lakehouse with DuckDB and DuckLake"
originalUrl: "https://towardsdatascience.com/building-a-data-lakehouse-with-duckdb-and-ducklake/"
date: "2026-09-17T23:43:02.440Z"
---

# Building a Data Lakehouse with DuckDB and DuckLake
# 使用 DuckDB 和 DuckLake 构建数据湖仓

Many years ago, if you wanted to store large amounts of data that could be sensibly queried, a database like Oracle or Postgres and such was your main choice. Sure, there were other options like the mainframe systems from companies such as ICL and IBM, but they were very costly and locked you in to a specific manufacturer. 

多年前，如果你想存储大量可供有效查询的数据，Oracle 或 Postgres 等数据库是你的主要选择。当然，还有其他选择，比如 ICL 和 IBM 等公司的大型机系统，但它们成本高昂，且会将你锁定在特定的供应商上。

The next big advance in data storage was the data warehouse. This brought information from separate operational systems into a central repository designed specifically for reporting and historical analysis. Its main advantages were faster analytical queries and consistent business definitions, while its disadvantages included expensive infrastructure, complex ETL pipelines and the need to model data before loading it.

数据存储的下一个重大进步是数据仓库。它将来自不同业务系统的信息汇集到一个专门为报告和历史分析设计的中央存储库中。其主要优势是更快的分析查询和一致的业务定义，而缺点则包括昂贵的基础设施、复杂的 ETL 流水线以及在加载数据前必须进行数据建模的需求。

The most recent advance in data storage is the emergence of the data lake. Data lakes allowed organisations to store much larger volumes of raw structured, semi-structured, and unstructured data cheaply. I say cheap, but don’t get me wrong; companies like Databricks, Snowflake, and the big cloud providers like AWS are vying to extract as much cash as possible from their customers to make the management, running, and development of data lakes as smooth as possible.

数据存储领域最近的进步是数据湖的出现。数据湖允许组织以低成本存储海量的原始结构化、半结构化和非结构化数据。我说“低成本”，但请别误会；像 Databricks、Snowflake 以及 AWS 等大型云服务提供商，都在竞相从客户身上榨取尽可能多的利润，以使数据湖的管理、运行和开发尽可能顺畅。

But truth be told, you can go a long way toward developing an effective data lake for almost zero cost with DuckDB and the DuckLake extension (also free) for DuckDB. In the rest of this article, I’ll show you how. Both DuckDB and DuckLake are MIT-licensed, open-source, and free to use. To be clear, I have no affiliation or commercial association with any of the systems or their creators mentioned in this article.

但说实话，利用 DuckDB 及其（同样免费的）DuckLake 扩展，你几乎可以零成本地构建一个高效的数据湖。在本文的其余部分，我将向你展示如何实现。DuckDB 和 DuckLake 均采用 MIT 许可证，开源且免费使用。需要说明的是，我与本文提到的任何系统或其创建者没有任何隶属或商业关联。

### A quick recap on Parquet format files, DuckDB, and DuckLake
### 关于 Parquet 格式文件、DuckDB 和 DuckLake 的简要回顾

Data lakes of almost all types rely on Parquet files to store their underlying data. Parquet is a columnar file format designed for analytical data. It stores values from the same column together, which allows query engines to read only the columns needed by a query. Parquet files tend to be immutable and typically need additional metadata files to be useful in data lakes. 

几乎所有类型的数据湖都依赖 Parquet 文件来存储底层数据。Parquet 是一种专为分析数据设计的列式文件格式。它将同一列的值存储在一起，这使得查询引擎只需读取查询所需的列。Parquet 文件通常是不可变的，在数据湖中发挥作用通常需要额外的元数据文件。

The metadata records which Parquet files belong to a data table, their locations, partitions and statistics, as well as which files were added or removed during each table version. Additionally, all changes to the data made via SQL, like inserts, updates, deletes and schema changes, are tracked. This metadata allows a lakehouse system to support efficient queries, transactions, schema evolution and time travel without modifying the underlying Parquet files directly.

元数据记录了哪些 Parquet 文件属于某个数据表、它们的位置、分区和统计信息，以及在每个表版本中添加或删除了哪些文件。此外，所有通过 SQL 进行的数据变更（如插入、更新、删除和模式更改）都会被追踪。这些元数据使湖仓系统能够在不直接修改底层 Parquet 文件的情况下，支持高效的查询、事务、模式演进和时间旅行。

I’ve written many times before about DuckDB. One of my favourite third-party Python libraries, it’s a super-fast, in-memory analytical database suitable for small to medium databases (say up to a couple of hundred GBs of data).

我之前多次写过关于 DuckDB 的文章。作为我最喜欢的第三方 Python 库之一，它是一个超快的内存分析数据库，适用于中小型数据库（例如高达几百 GB 的数据）。

DuckLake is an extension for DuckDB, developed by the team behind DuckDB and released just over a year ago. It turned the traditional idea of how a data lake file system should be structured on its head, managing the metadata in a relational database instead of in files co-located with the underlying Parquet data files. Incidentally, the database used to store the DuckLake metadata doesn't need to be DuckDB. Postgres, SQLite and MySQL are also supported.

DuckLake 是 DuckDB 的一个扩展，由 DuckDB 团队开发，于一年多前发布。它颠覆了传统数据湖文件系统结构的理念，将元数据管理在关系型数据库中，而不是与底层 Parquet 数据文件存放在一起。顺便提一下，用于存储 DuckLake 元数据的数据库不一定非要是 DuckDB，Postgres、SQLite 和 MySQL 也同样支持。

Several competing table formats manage data in modern data lakes, including Delta Lake, Apache Iceberg, and Apache Hudi. As mentioned, they all store the underlying data in Parquet format files and record table state and change history in metadata files stored with, or close to, the Parquet data. DuckLake can store petabytes of data, but processing it is the bottleneck. Single-node DuckDB is well suited to selective queries that scan only a manageable portion of the lake, but multi-user workloads that repeatedly process tens or hundreds of terabytes will require a beefier database like Postgres and likely a distributed query engine such as Spark.

现代数据湖中有几种竞争性的表格式用于管理数据，包括 Delta Lake、Apache Iceberg 和 Apache Hudi。如前所述，它们都将底层数据存储在 Parquet 格式文件中，并将表状态和变更历史记录在与 Parquet 数据存放在一起或附近的元数据文件中。DuckLake 可以存储 PB 级数据，但处理能力是瓶颈。单节点 DuckDB 非常适合仅扫描数据湖中一小部分数据的选择性查询，但如果涉及反复处理数十或数百 TB 数据的多用户工作负载，则需要像 Postgres 这样更强大的数据库，并可能需要像 Spark 这样的分布式查询引擎。

A few months ago, DuckDB released V1.0 of DuckLake, signalling it was ready for production use.

几个月前，DuckDB 发布了 DuckLake V1.0，标志着它已准备好投入生产环境使用。

### What we’ll build
### 我们将构建什么

In this article, we’ll build an example data lake in two stages, beginning with a single customer Parquet file on our local computer and using it to explore the main features of DuckDB and DuckLake. Once the local lakehouse is working, we will add an orders Parquet file stored in Amazon S3 and join it to the local customer data. 

在本文中，我们将分两个阶段构建一个示例数据湖：首先从本地计算机上的单个客户 Parquet 文件开始，利用它探索 DuckDB 和 DuckLake 的主要功能。一旦本地湖仓运行正常，我们将添加一个存储在 Amazon S3 中的订单 Parquet 文件，并将其与本地客户数据进行关联（Join）。

Note, although the purpose of data lakes is the storage and processing of large data volumes, the idea behind this particular article is to show the “how to” of building a data lake, so I’m not concerned with the data volumes and the data files I’ll be using will be very small.

请注意，尽管数据湖的目的是存储和处理海量数据，但本文的初衷是展示构建数据湖的“方法”，因此我并不关注数据量，所使用的数据文件也会非常小。

By the end, we will have demonstrated how to:
* Use DuckDB to query local and remote Parquet files
* Create a DuckLake to store local data
* Use DuckDB to query our DuckLake
* Use SQL to update table data and evolve a table’s schema.
* Use DuckLake snapshots to examine earlier versions.
* Perform a join between a DuckLake table and an external S3 file.
* Create a DuckLake table with our external S3 file data

最终，我们将演示如何：
* 使用 DuckDB 查询本地和远程 Parquet 文件
* 创建一个 DuckLake 来存储本地数据
* 使用 DuckDB 查询我们的 DuckLake
* 使用 SQL 更新表数据并演进表模式
* 使用 DuckLake 快照查看早期版本
* 在 DuckLake 表和外部 S3 文件之间执行关联查询
* 使用外部 S3 文件数据创建 DuckLake 表

### Prerequisites
### 前置条件

You will need:
* Windows, macOS or a recent Linux distribution. I’m using Windows.
* A terminal or PowerShell.
* An internet connection to install the DuckDB CLI and its DuckLake extension.
* An AWS account for the S3 part of the article.
* Permission to create or use an S3 bucket.
* The AWS CLI if you want to follow the command-line upload steps.

你需要：
* Windows、macOS 或较新的 Linux 发行版（我使用的是 Windows）。
* 终端或 PowerShell。
* 用于安装 DuckDB CLI 及其 DuckLake 扩展的互联网连接。
* 用于本文 S3 部分的 AWS 账户。
* 创建或使用 S3 存储桶的权限。
* 如果你想跟随命令行上传步骤，需要安装 AWS CLI。

The example creates a very small S3 object, but AWS storage and request charges may still apply. Please delete it when you’re done to avoid any unwelcome bills. Note: if you don’t want to use the cloud for the second part of the data example, it’s fine to use local storage again.

该示例会创建一个非常小的 S3 对象，但仍可能产生 AWS 存储和请求费用。请在完成后将其删除，以免产生不必要的账单。注意：如果你不想在数据示例的第二部分使用云服务，再次使用本地存储也是可以的。

### Creating our project structure
### 创建项目结构

Our folder structure for our project is going to look like this:
```
ducklake-demo/
├── data/
│   ├── customers.parquet
│   ├── orders.parquet
│   ├── metadata.ducklake
│   └── lake/
└── duckdb.dev
```

我们的项目文件夹结构如下所示：
```
ducklake-demo/
├── data/
│   ├── customers.parquet
│   ├── orders.parquet
│   ├── metadata.ducklake
│   └── lake/
└── duckdb.dev
```

The files have different purposes:
* customers.parquet is our original local source file.
* orders.parquet is a staging file that we will (optionally) upload to S3.
* metadata.ducklake contains...

这些文件各有用途：
* customers.parquet 是我们原始的本地源文件。
* orders.parquet 是一个暂存文件，我们将（可选地）将其上传到 S3。
* metadata.ducklake 包含……