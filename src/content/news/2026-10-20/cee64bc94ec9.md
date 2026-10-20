---
title: "Designing an OCR document pipeline on serverless AWS"
originalUrl: "https://dev.to/rohit_tirmanwar_dce05d8ee/designing-an-ocr-document-pipeline-on-serverless-aws-4c5i"
date: "2026-10-20T00:16:42.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# Designing an OCR document pipeline on serverless AWS

Document OCR is easy to demo and hard to run. The demo takes a PDF, calls an OCR service, and prints the fields. The production version has to handle a ten-page scan uploaded from a phone, a form filled in by hand, a field read with 61 percent confidence, and a user who needs to know whether their document was accepted. I have built this on serverless AWS for a platform used by a large number of students, and this is the shape that held up.

文档 OCR（光学字符识别）演示起来很容易，但实际运行却很难。演示时，只需获取一个 PDF，调用 OCR 服务，然后打印出字段即可。而生产版本必须处理从手机上传的十页扫描件、手填表格、置信度仅为 61% 的字段，以及需要知道文档是否被接受的用户。我已经在无服务器 AWS 上为大量学生使用的平台构建了此系统，以下是经受住考验的架构方案。

The pipeline, end to end: Upload straight to S3. The browser gets a pre-signed URL from an API and uploads the file directly. Nothing passes through a Lambda, so a 25 MB scan does not hit a payload limit, and the API only records that an upload was requested. S3 event to EventBridge to Step Functions. The object-created event starts a Step Functions execution per document. The state machine is the only place that knows the order of steps, which is what makes the pipeline readable six months later.

端到端的流水线：直接上传到 S3。浏览器从 API 获取预签名 URL 并直接上传文件。没有任何内容经过 Lambda，因此 25 MB 的扫描件不会触及负载限制，API 仅记录已请求上传。S3 事件触发 EventBridge 再到 Step Functions。对象创建事件会为每个文档启动一次 Step Functions 执行。状态机是唯一了解步骤顺序的地方，这使得流水线在六个月后依然易于阅读。

Validate before OCR. A short Lambda checks the file type, size and page count, and rejects what the OCR service would reject anyway. This step saves money and gives the user a fast, specific error. Asynchronous OCR. Amazon Textract's synchronous calls have page and size limits, so anything that can be multi-page goes through the asynchronous API: StartDocumentAnalysis with an SNS notification channel, and the state machine waits on a task token until the completion message arrives. GetDocumentAnalysis is paginated, so the collector loops on NextToken until it has the whole result.

OCR 前进行验证。一个简短的 Lambda 函数会检查文件类型、大小和页数，并拒绝那些 OCR 服务本身就会拒绝的文件。这一步既节省了成本，又能给用户提供快速、具体的错误提示。异步 OCR。Amazon Textract 的同步调用有页数和大小限制，因此任何可能是多页的文件都通过异步 API 处理：使用带有 SNS 通知通道的 StartDocumentAnalysis，状态机等待任务令牌，直到收到完成消息。GetDocumentAnalysis 是分页的，因此收集器会循环使用 NextToken，直到获取完整结果。

Extract and normalise. Raw OCR output is blocks and geometry. A Lambda maps it to the fields the product cares about, normalises dates and amounts, and records a confidence score per field, not per document. Decide: accept, review, or reject. Per-field thresholds, set from measured data, route each document. Everything above the threshold is accepted automatically. Anything below goes to a human review queue with the page image and the proposed value side by side. Anything unreadable goes back to the user with a reason. Store and notify. Results land in DynamoDB keyed by document ID, the state machine emits a completion event, and the application notifies the user.

提取与标准化。原始 OCR 输出是块和几何信息。Lambda 将其映射到产品关心的字段，标准化日期和金额，并记录每个字段（而非每个文档）的置信度分数。决策：接受、审核或拒绝。基于测量数据设置的各字段阈值决定了每个文档的流向。高于阈值的一切自动接受。低于阈值的则进入人工审核队列，并将页面图像与建议值并排显示。无法读取的内容会带上原因返回给用户。存储与通知。结果以文档 ID 为键存入 DynamoDB，状态机发出完成事件，应用程序通知用户。

Confidence thresholds are measured, not guessed. The single most important number in the system is the per-field threshold, and the mistake is to pick one number for every field. A date of birth read wrong is a different kind of error from a middle initial read wrong. We built a golden set: a few hundred documents labelled by hand, run through the pipeline, with the OCR value and confidence recorded for each field. From that you can plot, for each field, accuracy against confidence, and pick the threshold where accuracy reaches the level the business accepts. Some fields needed; some could never be trusted automatically and always went to review. The golden set then becomes a regression test. Every change to the extractor, every change to a prompt or a model version, runs against it before deploy.

置信度阈值是测量出来的，而不是猜出来的。系统中最重要的数字是各字段的阈值，错误的做法是为所有字段选择同一个数字。出生日期读取错误与中间名首字母读取错误是不同性质的错误。我们建立了一个黄金数据集：几百份人工标注的文档，通过流水线运行，记录每个字段的 OCR 值和置信度。由此，你可以为每个字段绘制准确率与置信度的关系图，并选择准确率达到业务可接受水平的阈值。有些字段是必需的；有些字段永远无法自动信任，必须始终进行人工审核。黄金数据集随后成为回归测试。在部署之前，对提取器、提示词或模型版本的每一次更改都会针对该数据集进行测试。

The human review loop is part of the architecture. A pipeline that cannot route to a person is a pipeline that will silently accept wrong data. The review queue is not an exception path; it is a first-class step with its own metrics: queue depth, time to review, and the share of reviewed values that the reviewer changed. That last number is the feedback that tunes the thresholds. If reviewers accept 99 percent of what they see for a field, the threshold for that field is too conservative. Reviewer corrections are written back to the same DynamoDB record with who changed what and when. Nothing is overwritten.

人工审核循环是架构的一部分。无法路由到人工的流水线，就是会默默接受错误数据的流水线。审核队列不是异常路径；它是一个一等公民步骤，拥有自己的指标：队列深度、审核时间以及审核员修改的审核值比例。最后一个数字是调整阈值的反馈。如果审核员对某个字段 99% 的内容都予以接受，那么该字段的阈值就太保守了。审核员的修改会被写回同一个 DynamoDB 记录中，并注明谁在何时修改了什么。没有任何内容会被覆盖。

Sensitive data decides half the design. Documents of this kind carry personal data, so the pipeline is built around not leaking it: The upload bucket and every downstream bucket are encrypted with KMS and block public access. S3 lifecycle rules delete the raw uploads after a fixed window. Keep the extracted fields, not the scans, unless there is a legal reason to keep the scans. Lambdas log document IDs and confidence scores, never field values. A single log line with a value in it is a data leak that lives for the retention period. Reviewers see pages through short-lived pre-signed URLs, and the review application never stores the image.

敏感数据决定了一半的设计。此类文档包含个人数据，因此流水线的构建围绕着防止泄露展开：上传存储桶和每个下游存储桶都使用 KMS 加密并阻止公共访问。S3 生命周期规则会在固定时间窗口后删除原始上传文件。保留提取出的字段，而非扫描件，除非有法律原因需要保留扫描件。Lambda 记录文档 ID 和置信度分数，绝不记录字段值。包含字段值的一行日志就是一次数据泄露，且会存留整个保留期。审核员通过短效预签名 URL 查看页面，审核应用程序从不存储图像。

Failure modes that were not in the diagram: Duplicate uploads. Users re-upload when the first upload is slow. The document ID is derived from the user and a content hash, so the second upload short-circuits instead of running OCR twice. OCR service throttling. Textract has account-level concurrency limits. The state machine uses a retry with backoff on the start call, and a concurrency limit on the step keeps a bulk upload from starving everyone else. Stuck executions. A completion notification that never arrives leaves the execution waiting on its task token. Every wait state has a heartbeat timeout, and a timed-out execution goes to the review queue with a "needs re-run" flag instead of hanging forever. Partial results. A twelve-page document where page nine failed is still useful. Page-level status is stored, and the decision step treats a missing required page as "review," not "reject."

图中未体现的故障模式：重复上传。当第一次上传缓慢时，用户会重新上传。文档 ID 由用户和内容哈希得出，因此第二次上传会直接短路，而不会运行两次 OCR。OCR 服务限流。Textract 有账户级的并发限制。状态机在启动调用时使用带退避的重试机制，步骤上的并发限制防止批量上传耗尽所有资源。执行卡死。如果完成通知从未到达，执行会一直等待任务令牌。每个等待状态都有心跳超时，超时执行会带上“需要重跑”标记进入审核队列，而不是永远挂起。部分结果。一份十二页的文档，如果第九页失败，其余部分仍然有用。存储页面级状态，决策步骤将缺失的必要页面视为“审核”，而非“拒绝”。

What I would keep and what I would change: I would keep Step Functions as the backbone. The visual execution history alone has saved hours of debugging, and the task-token pattern makes the asynchronous OCR call look synchronous in the state machine. I would keep the golden set; it is the only reason we could change the extractor with confidence. I would move the confidence thresholds into configuration from the start rather than code, because they change more often than anything else. And I would build the review metrics on day one, because the pipeline is only as good as the feedback loop that tunes it.

我会保留什么以及我会改变什么：我会保留 Step Functions 作为骨干。仅可视化执行历史记录就节省了数小时的调试时间，任务令牌模式使异步 OCR 调用在状态机中看起来像是同步的。我会保留黄金数据集；这是我们能够自信地更改提取器的唯一原因。我会从一开始就将置信度阈值移入配置而非代码中，因为它们的变化频率最高。我会在第一天就构建审核指标，因为流水线的质量取决于调整它的反馈循环。