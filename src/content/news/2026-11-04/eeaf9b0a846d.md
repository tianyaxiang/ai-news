---
title: "floci-io / floci"
originalUrl: "https://github.com/floci-io/floci"
date: "2026-11-04T01:28:43.409Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

Any Cloud. Locally. Light, fluffy, and always free. No account. No auth token. No feature gates. Just docker compose up. Quick Start · Features · Services · SDKs · Testcontainers · Migration · Docs.

任何云，本地化。轻量、蓬勃且永久免费。无需账户，无需认证令牌，无需功能限制。只需执行 docker compose up。快速入门 · 功能 · 服务 · SDK · Testcontainers · 迁移 · 文档。

What is Floci? Floci is a free, open-source local AWS emulator for development, testing, and CI. It gives you AWS-shaped services on your machine without requiring a cloud account, an auth token, or paid feature gates. Point your AWS SDK, CLI, Terraform, CDK, OpenTofu, or test suite at http://localhost:4566 and keep your existing workflows.

什么是 Floci？Floci 是一个免费、开源的本地 AWS 模拟器，用于开发、测试和持续集成（CI）。它能在你的机器上提供 AWS 风格的服务，而无需云账户、认证令牌或付费功能限制。只需将你的 AWS SDK、CLI、Terraform、CDK、OpenTofu 或测试套件指向 http://localhost:4566，即可保留现有的工作流程。

Already using LocalStack? Floci is a drop-in replacement: swap the image and keep going. See Migrating from LocalStack. Floci is the AWS member of the Floci emulator family, named after floccus, the cloud formation that looks like popcorn.

已经在用 LocalStack 了吗？Floci 是一个直接替代品：只需更换镜像即可继续使用。请参阅“从 LocalStack 迁移”。Floci 是 Floci 模拟器家族中的 AWS 成员，其名称源自“floccus”，即那种看起来像爆米花的云层结构。

Emulator Cloud Port
floci AWS 4566
floci-az Azure 4577
floci-gcp GCP 4588
floci-oci OCI 4599

模拟器 云 端口
floci AWS 4566
floci-az Azure 4577
floci-gcp GCP 4588
floci-oci OCI 4599

Quick Start: The fastest way to run Floci is with the official CLI: floci start. No Docker? Each release also ships a standalone floci-aws binary for Linux, macOS and Windows; see Native binary. Export the AWS environment variables: eval $(floci env). Use your existing AWS tools normally: aws s3 mb s3://my-bucket, aws dynamodb create-table ..., aws dynamodb list-tables.

快速入门：运行 Floci 最快的方法是使用官方 CLI：floci start。没有 Docker？每个版本还提供适用于 Linux、macOS 和 Windows 的独立 floci-aws 二进制文件；请参阅“原生二进制文件”。导出 AWS 环境变量：eval $(floci env)。像往常一样使用你现有的 AWS 工具：aws s3 mb s3://my-bucket，aws dynamodb create-table ...，aws dynamodb list-tables。

Watch it run: This short demo shows the CLI flow: start Floci, export the local AWS environment, run standard AWS CLI commands, and stop the emulator. floci-cli-demo.mp4. All AWS services are available at http://localhost:4566. Any published AWS region works, in every partition. Credentials can be any non-empty values unless you explicitly enable stricter service-specific auth checks.

观看运行效果：这个简短的演示展示了 CLI 流程：启动 Floci，导出本地 AWS 环境，运行标准的 AWS CLI 命令，然后停止模拟器。floci-cli-demo.mp4。所有 AWS 服务均可在 http://localhost:4566 访问。任何已发布的 AWS 区域在每个分区中均可使用。凭据可以是任何非空值，除非你明确启用了更严格的特定服务认证检查。

Prefer Docker Compose? Create a compose.yaml file:
services:
  floci:
    image: floci/floci:latest
    ports:
      - "4566:4566"
Start Floci: docker compose up. Then configure your AWS environment manually: export AWS_ENDPOINT_URL=http://localhost:4566, export AWS_DEFAULT_REGION=us-east-1, export AWS_ACCESS_KEY_ID=test, export AWS_SECRET_ACCESS_KEY=test.

更喜欢 Docker Compose？创建一个 compose.yaml 文件：
services:
  floci:
    image: floci/floci:latest
    ports:
      - "4566:4566"
启动 Floci：docker compose up。然后手动配置你的 AWS 环境：export AWS_ENDPOINT_URL=http://localhost:4566，export AWS_DEFAULT_REGION=us-east-1，export AWS_ACCESS_KEY_ID=test，export AWS_SECRET_ACCESS_KEY=test。

Using the old hectorvent/floci image? Update your image name:
# Before
image: hectorvent/floci:latest
# After
image: floci/floci:latest
The old hectorvent/floci repository no longer receives updates.

正在使用旧的 hectorvent/floci 镜像？请更新你的镜像名称：
# 修改前
image: hectorvent/floci:latest
# 修改后
image: floci/floci:latest
旧的 hectorvent/floci 仓库不再接收更新。

Web Console: Floci ships a browser console for inspecting the resources in your local emulator. Open it at: http://localhost:4566/_floci/ui. Nothing runs at boot. The first request pulls the console image, starts it as a sidecar container on Floci's Docker network, hands it Floci's own reachable address plus the standard AWS environment, polls its health endpoint, and redirects the browser once it reports it can reach Floci.

Web 控制台：Floci 提供了一个浏览器控制台，用于检查本地模拟器中的资源。访问地址：http://localhost:4566/_floci/ui。启动时不会运行任何内容。首次请求会拉取控制台镜像，将其作为 Floci Docker 网络上的边车（sidecar）容器启动，为其提供 Floci 可访问的地址及标准 AWS 环境，轮询其健康检查端点，并在报告可以连接到 Floci 后重定向浏览器。

The sidecar's port is bound by Docker, so it needs no ports: entry of your own, and its logs are streamed into CloudWatch Logs under /floci/ui. Starting a container needs the Docker socket:
services:
  floci:
    image: floci/floci:latest
    ports:
      - "4566:4566"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock

边车端口由 Docker 绑定，因此不需要你手动添加 ports: 条目，其日志会流式传输到 /floci/ui 下的 CloudWatch Logs 中。启动容器需要 Docker 套接字：
services:
  floci:
    image: floci/floci:latest
    ports:
      - "4566:4566"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock

Running a different console: The console is not fixed to the one Floci ships. Any console implementing the Floci console contract runs with nothing but an image name: listen on the port in PORT, serve GET /api/health, talk to Floci at AWS_ENDPOINT_URL.

运行其他控制台：控制台并不局限于 Floci 自带的版本。任何实现了 Floci 控制台协议的控制台只需一个镜像名称即可运行：监听 PORT 环境变量指定的端口，提供 GET /api/health 服务，并通过 AWS_ENDPOINT_URL 与 Floci 通信。

Features: Local AWS without the cloud account. Run AWS-compatible services locally without an AWS account, auth token, or paid feature gates. Real Docker where fidelity matters: Lambda, RDS, Neptune, ElastiCache, MSK, ECS, EC2, EKS, OpenSearch, CodeBuild, and Managed Service for Apache Flink use real Docker-backed execution instead of shallow mocks.

功能：无需云账户的本地 AWS。在本地运行 AWS 兼容服务，无需 AWS 账户、认证令牌或付费功能限制。在需要高保真度的地方使用真正的 Docker：Lambda、RDS、Neptune、ElastiCache、MSK、ECS、EC2、EKS、OpenSearch、CodeBuild 和 Managed Service for Apache Flink 使用真正的 Docker 后端执行，而不是浅层的模拟。

Drop-in AWS compatibility: Point standard AWS clients at http://localhost:4566. Existing credentials, regions, SDKs, CLI commands, and IaC workflows stay familiar. Terraform can provision AWS-shaped resources locally through Floci using the standard HashiCorp AWS provider. See the Terraform with Floci guide for provider configuration, resource examples, and optional emulated S3 state.

直接兼容 AWS：将标准 AWS 客户端指向 http://localhost:4566。现有的凭据、区域、SDK、CLI 命令和 IaC 工作流程保持不变。Terraform 可以通过 Floci 使用标准的 HashiCorp AWS 提供程序在本地配置 AWS 风格的资源。请参阅“Terraform with Floci”指南以获取提供程序配置、资源示例和可选的模拟 S3 状态。

Fast enough for CI: The native image starts in milliseconds and keeps idle memory low, making it practical for local development and test pipelines. Configurable persistence: Choose from in-memory, persistent, hybrid, and write-ahead log storage depending on the durability profile you need. Why Floci? LocalStack's community edition sunset in March 2026, requiring auth tokens and freezing security updates. Floci is the no...

CI 速度足够快：原生镜像在几毫秒内启动，并保持较低的空闲内存占用，使其适用于本地开发和测试流水线。可配置的持久化：根据你需要的持久性配置，选择内存存储、持久化存储、混合存储或预写式日志存储。为什么选择 Floci？LocalStack 的社区版将于 2026 年 3 月停止服务，届时将需要认证令牌并停止安全更新。Floci 是……