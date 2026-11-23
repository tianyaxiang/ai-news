---
title: "Testing Terraform with AWS Emulator"
originalUrl: "https://notes.hatedabamboo.me/terraform-tests-with-aws-emulator/"
date: "2026-11-22T21:44:04.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# Testing Terraform with AWS Emulator

Nov 12, 2026 • 11 minute read • #aws #iac #terraform

Terraform plan passes and shows all green and all the necessary resource changes. You trigger apply and... the job fails with some obscure error that a resource can't be changed. You open another pull request and try again. And perhaps you encounter an error again. Sounds familiar? I bet it does. I encountered issues like this so many times I'm afraid to count. But recently AWS released a new tool called Emulator that emulates actual AWS API endpoints. And it should be great for tasks just like that!

2026年11月12日 • 11分钟阅读 • #aws #iac #terraform

Terraform plan 执行通过，显示一切正常且列出了所有必要的资源变更。当你触发 apply 时……任务却因为某个模糊的错误而失败，提示资源无法变更。你打开另一个合并请求（pull request）再次尝试，结果可能又遇到了错误。听起来很耳熟？我敢说确实如此。我遇到过太多次这样的问题，多到数不清。但最近 AWS 发布了一个名为 Emulator 的新工具，可以模拟真实的 AWS API 端点。它非常适合处理这类任务！

### Defining the problem

The problem with the difference between plan and apply jobs is that plan can't possibly emulate every actual API call against a live infrastructure. It's a safe assumption based on the static declarations we put into it – the order of application, the necessary parameters, the proper configuration values. These mock calls can't know for a fact that you already have a resource in AWS called "my-bucket-asdasdasd" or that you're trying to upgrade a PostgreSQL RDS instance from version 14 to version 18 without an explicit "apply immediately" flag. One may argue that one can always try to apply changes locally, but this kinda undermines the whole automation workflow. So what is the answer? There are multiple tools that can emulate AWS services either partially or in full, but what they lack is the actual knowledge of the service architecture. It may be similar, but it won't be authentic, and sometimes this small difference may cause a lot of problems. After all, what can be the closest to an AWS API, if not the same AWS API, but ephemeral?

### 定义问题

Plan 和 Apply 任务之间存在差异的问题在于，Plan 无法模拟针对实时基础设施的每一个实际 API 调用。它基于我们输入的静态声明（应用顺序、必要参数、正确的配置值）做出安全假设。这些模拟调用无法确切知道你是否已经在 AWS 中拥有一个名为 "my-bucket-asdasdasd" 的资源，或者你是否在没有显式设置 "apply immediately" 标志的情况下尝试将 PostgreSQL RDS 实例从 14 版本升级到 18 版本。有人可能会说，总是可以在本地尝试应用变更，但这在某种程度上破坏了整个自动化工作流程。那么答案是什么呢？市面上有多种工具可以部分或全部模拟 AWS 服务，但它们缺乏对服务架构的实际了解。它们可能看起来相似，但并不真实，有时这种微小的差异会导致很多问题。毕竟，除了 AWS API 本身（只是临时的），还有什么能比它更接近 AWS API 呢？

### AWS Emulator

The benefit of the AWS Emulator is that it's a self-contained binary (or Docker container) that can be utilized locally or in a CI workflow. This means the usual "Plan > Apply" terraform workflow changes to "Plan > Apply against mock AWS infrastructure to test the plan > Apply on actual AWS Infrastructure". This means slightly longer jobs, but if you're like me and apply jobs run on commits to the main branch after a PR, this saves you the hassle of creating a new branch just to fix the issue.

### AWS Emulator

AWS Emulator 的优势在于它是一个独立的二进制文件（或 Docker 容器），可以在本地或 CI 工作流程中使用。这意味着通常的 "Plan > Apply" Terraform 工作流程变更为 "Plan > 针对模拟 AWS 基础设施进行 Apply 以测试计划 > 在实际 AWS 基础设施上进行 Apply"。这意味着任务时间会稍微变长，但如果你像我一样，在 PR 合并到主分支后的提交上运行 Apply 任务，这可以省去你为了修复问题而创建新分支的麻烦。

### Running Terraform against local AWS Emulator

Let's start with a local setup and see how we can utilize AWS Emulator with the actual Terraform code. All code is available in my example GitHub repository. First up, installation. You can either install aws-emulator via package manager, or build it with Docker. I'll use Docker to keep my system clear of yet another package:

### 针对本地 AWS Emulator 运行 Terraform

让我们从本地设置开始，看看如何将 AWS Emulator 与实际的 Terraform 代码结合使用。所有代码都可以在我的 GitHub 示例仓库中找到。首先是安装。你可以通过包管理器安装 aws-emulator，或者使用 Docker 构建它。我将使用 Docker，以保持我的系统整洁，避免安装额外的软件包：

```bash
$ docker build -t aws-emulator .
$ docker images
IMAGE ID            DISK USAGE    CONTENT SIZE    EXTRA
aws-emulator:latest 3c8fdb957b45  1.24GB          0B # wow it's chonky
$ docker run --rm -d -p 9297:9297 aws-emulator -a off
dcc416f234aaa3ec2966c9e8dcde7870f8d03057ec8a465cb8960617af82e501
$ docker logs dcc416f234aaa3ec2966c9e8dcde7870f8d03057ec8a465cb8960617af82e501
{"timestamp":"2026-11-12T14:51:16.261883Z","level":"INFO","fields":{"message":"aws-emulator emulator starting"},"target":"aws_emulator"}
...
```

And it's up and running! In the example above I set the container to live without limits (official AWS documentation proposes to set memory and swap limits: --memory=2g --memory-swap=2g, but for local that's fine). I also disabled authorization (flag -a off) to simplify things a bit. To be sure aws-emulator is up and running, let's query the admin endpoint:

它已经启动并运行了！在上面的示例中，我设置容器在运行时没有限制（官方 AWS 文档建议设置内存和交换空间限制：--memory=2g --memory-swap=2g，但对于本地测试来说这样没问题）。我还禁用了授权（使用 -a off 标志）以简化操作。为了确保 aws-emulator 正常运行，让我们查询一下管理端点：

```bash
$ curl -sk https://127.0.0.1:9297/__admin/health
ok
```

Okay, fake AWS is live, let's deploy some infrastructure! I created an example AWS stack for Terraform and will use it in this article. First, let's configure Terraform to act against aws-emulator and not real AWS APIs. providers.tf will look like this:

好了，模拟 AWS 已经上线，让我们部署一些基础设施吧！我为 Terraform 创建了一个示例 AWS 堆栈，并将在本文中使用它。首先，让我们配置 Terraform 以针对 aws-emulator 而非真实的 AWS API 进行操作。providers.tf 的内容如下：

```hcl
provider "aws" {
  access_key = var.access_key
  secret_key = var.secret_key
  region     = var.region
  insecure   = true # The emulator serves HTTPS with a self-signed certificate. Skip verification.
  s3_use_path_style = true # The emulator uses one IP endpoint. Put the bucket name in the path.
  # Do not call the real AWS or the instance metadata service.
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true
  skip_region_validation      = true

  # Send every service to the emulator instead of AWS.
  endpoints {
    ec2        = var.emulator_endpoint
    lambda     = var.emulator_endpoint
    iam        = var.emulator_endpoint
    sts        = var.emulator_endpoint
    cloudwatch = var.emulator_endpoint
    logs       = var.emulator_endpoint
    events     = var.emulator_endpoint
    sns        = var.emulator_endpoint
  }
  default_tags {
    tags = var.tags
  }
}
```

The difference between actual live infrastructure and a fake one is that we set up a bunch of flags to allow insecure connections (perhaps turning authentication off wasn't actually simpler?) and we set up an endpoint for each service we use in the setup to an emulator endpoint, which l

实际的实时基础设施与模拟基础设施之间的区别在于，我们设置了一系列标志以允许不安全的连接（也许关闭身份验证实际上并没有更简单？），并且我们将设置中使用的每个服务的端点都指向了模拟器端点，这……