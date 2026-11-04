---
title: "Transformers Model Integration Contracts"
originalUrl: "https://huggingface.co/blog/transformers-mic"
date: "2026-11-03T00:00:00.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

### Transformers Model Integration Contracts

Back to Articles Transformers Model Integration Contracts Published November 3, 2026 Update on GitHub Upvote 12 +6 Tarek Ziadé tarekziade Follow On July 30, 2026, Transformers enabled PyTorch's scaled dot-product attention (SDPA) for T5. As a side effect, UMT5's decoder could attend to future tokens. During training, it could peek at the answer it was supposed to predict. Nothing crashed, and the bug stayed in main for almost two months. When we later replayed those commits, a small UMT5 model running on CPU flagged it on every one of them. This post is about that model and the tests built around it.

返回文章 Transformers 模型集成契约 发布于 2026 年 11 月 3 日 GitHub 更新 点赞 12 +6 Tarek Ziadé tarekziade 关注 2026 年 7 月 30 日，Transformers 为 T5 启用了 PyTorch 的缩放点积注意力（SDPA）。作为一个副作用，UMT5 的解码器可以关注到未来的标记。在训练期间，它可以窥视它本应预测的答案。程序没有崩溃，这个错误在主分支中停留了近两个月。当我们后来重放这些提交时，一个在 CPU 上运行的小型 UMT5 模型在每一次提交中都标记出了它。这篇文章就是关于那个模型以及围绕它构建的测试。

Why bugs reach main Transformers supports over 750 model types, and its test suite is big: 88,000+ CPU tests on main, plus 200,000+ GPU tests in a daily run. Model tests are only part of it: we also test pipelines, training, distributed execution, quantization and attention kernels. The integration tests load real checkpoints and exercise the model's API on real hardware. Running all of that on every PR would mean keeping a lot of GPUs busy all day long, which isn't practical. By the time a scheduled run finds a regression, it may already be in main.

为什么错误会进入主分支？Transformers 支持超过 750 种模型类型，其测试套件非常庞大：主分支上有 88,000 多个 CPU 测试，每日运行中还有 200,000 多个 GPU 测试。模型测试只是其中的一部分：我们还测试流水线、训练、分布式执行、量化和注意力内核。集成测试会加载真实的检查点并在真实硬件上运行模型 API。在每个 PR 上运行所有这些测试意味着需要让大量 GPU 全天候工作，这并不现实。当计划运行发现回归问题时，它可能已经进入了主分支。

Our approach is to shrink the model instead. We build a fixture: a small model made from the real checkpoint's configuration, with fewer and narrower layers but every kind of layer it has, and its tokenizer and processor files unchanged. It is published once, then reused. We run "fast integration tests" against it on a cheap CPU runner. In our CPU study, the experimental UMT5 fixture used 66 MB of weights; the source checkpoint is 1,227 MB. This also covers very large models: some don't fit on our standard GPU runners, but their fixtures run on CPU.

我们的方法是缩小模型。我们构建了一个固件（fixture）：一个由真实检查点配置制成的小型模型，它具有更少、更窄的层，但保留了原有的所有层类型，且其分词器和处理器文件保持不变。它被发布一次，然后重复使用。我们在廉价的 CPU 运行器上针对它运行“快速集成测试”。在我们的 CPU 研究中，实验性的 UMT5 固件使用了 66 MB 的权重；而源检查点为 1,227 MB。这也涵盖了非常大的模型：有些模型无法在我们的标准 GPU 运行器上运行，但它们的固件可以在 CPU 上运行。

Model integrators already build tiny test models (Transformers' tiny-random-* checkpoints). We wanted a common recipe, and checks that go beyond loading the model and running a forward pass. The UMT5 bug would have passed a forward pass just fine. Fixtures won't replace full integration tests, but on PRs they give us a chance to catch bugs before they reach main.

模型集成者已经构建了微型测试模型（Transformers 的 tiny-random-* 检查点）。我们想要一个通用的方案，以及超越加载模型和运行前向传递的检查。UMT5 的错误本可以通过前向传递测试。固件不会取代完整的集成测试，但在 PR 阶段，它们让我们有机会在错误进入主分支之前将其捕获。

Introducing Model Integration Contracts transformers-mic is a proposed standard for packaging these tests. A Model Integration Contract (MIC) has three parts: a fixture: the shrunk model described above, published once and pinned a usage path: a runnable Markdown example of something people do with the model, such as generating text or running a training step baselines: the outputs recorded when running that example, reviewed by a human.

引入模型集成契约（Model Integration Contracts），transformers-mic 是一个用于打包这些测试的提议标准。模型集成契约（MIC）包含三个部分：固件：上述缩小的模型，发布一次并固定版本；使用路径：一个可运行的 Markdown 示例，展示人们如何使用该模型，例如生成文本或运行训练步骤；基准：运行该示例时记录的输出，并由人工审核。

The contract holds if running the usage path on the fixture still produces the baselines. A contract covers an architecture and a usage path, not a single checkpoint: compatible checkpoints can share a fixture, while each keeps its own expected results. We publish them in huggingface-mic. For example, the SmolLM contract generates from prompts such as "The capital of France is" and compares its token IDs with a recorded answer.

如果对固件运行使用路径后仍能产生基准结果，则契约成立。契约涵盖架构和使用路径，而不是单个检查点：兼容的检查点可以共享一个固件，同时每个检查点保留其各自的预期结果。我们将它们发布在 huggingface-mic 中。例如，SmolLM 契约根据“法国的首都是”等提示生成内容，并将其标记 ID 与记录的答案进行比较。

After loading the model and tokenizer, the generation code is, simplified to one prompt: inputs = tokenizer("The capital of France is", return_tensors="pt") outputs = model.generate(**inputs, max_new_tokens=4, do_sample=False) new_tokens = outputs[:, inputs["input_ids"].shape[1]:] print(tokenizer.batch_decode(new_tokens, skip_special_tokens=True)) It also compares training loss, checks that gradients are finite and verifies that an optimizer step changes the weights. See the full usage.md.

在加载模型和分词器后，生成代码简化为一个提示：inputs = tokenizer("The capital of France is", return_tensors="pt") outputs = model.generate(**inputs, max_new_tokens=4, do_sample=False) new_tokens = outputs[:, inputs["input_ids"].shape[1]:] print(tokenizer.batch_decode(new_tokens, skip_special_tokens=True)) 它还比较训练损失，检查梯度是否有限，并验证优化器步骤是否改变了权重。请参阅完整的 usage.md。

A fleet dataset on the Hub pins each MIC to a frozen revision, along with the package versions used to record its baselines. Each CI run records the fleet revision it used, so we can reproduce it later. On a PR, we pick MICs based on the files the patch changes.

Hub 上的一个 fleet 数据集将每个 MIC 固定到一个冻结版本，以及用于记录其基准的软件包版本。每次 CI 运行都会记录它所使用的 fleet 版本，以便我们以后可以重现它。在 PR 中，我们根据补丁更改的文件来选择 MIC。

The UMT5 regression We replayed frozen MICs over five months of Transformers commits. The small UMT5 fixture flagged the regression from its introduction on July 30, 2026 until its fix on September 28. Label log-probabilities differed from the reviewed baseline by 1.22 and training loss by about 0.20. One detail mattered: the contract used SDPA, the default attention path. Running only the eager attention variant missed the bug. A fixture only helps if it goes through the same code as the real checkpoint.

UMT5 回归问题：我们重放了 Transformers 五个月提交记录中的冻结 MIC。小型 UMT5 固件从 2026 年 7 月 30 日引入该错误开始，一直到 9 月 28 日修复为止，都标记出了该回归问题。标签对数概率与审核过的基准相差 1.22，训练损失相差约 0.20。一个细节很重要：契约使用了默认的注意力路径 SDPA。仅运行 eager 注意力变体则错过了这个错误。固件只有在经过与真实检查点相同的代码时才有用。

We then reverted the fix on a proof branch in Transformers' CI. The check failed with the same differences, and the selected T5 contract's runner step took 13.4 seconds on CPU, excluding setup. The replay results and the CI demo have the measurements and reproduction details.

随后，我们在 Transformers CI 的验证分支上撤销了修复。检查因相同的差异而失败，所选 T5 契约的运行器步骤在 CPU 上耗时 13.4 秒（不含设置时间）。重放结果和 CI 演示包含了测量数据和重现细节。

How models are shrunk The first recipe was simple: make the dimensions smaller and keep fewer layers. That wasn't enough for mixed architectures. Keeping two layers is no use if both use sliding attention and the full-attention layers disappear. The recipe now has four steps: Shrink the configuration. Start from a real checkpoint and reduce hidden sizes, attention heads and depth. Keep the different layer kinds, including mixtures of sliding and full attention or dense and MoE layers. Some architectures need extra rules to keep their components compatible. We also look at the model's own Transformers tests: the ModelTester in test_modeling_<model>.py already picks a small config by hand, so we take its sizes for any width our generic rule doesn't know by name.

模型如何缩小：最初的方案很简单：减小维度并保留较少的层。但这对于混合架构来说是不够的。如果两层都使用滑动注意力，而全注意力层消失了，那么保留两层是没有用的。现在的方案有四个步骤：缩小配置。从真实检查点开始，减少隐藏层大小、注意力头数和深度。保留不同类型的层，包括滑动注意力和全注意力的混合，或密集层和 MoE 层。有些架构需要额外的规则来保持其组件兼容。我们还参考了模型自身的 Transformers 测试：test_modeling_<model>.py 中的 ModelTester 已经手动选择了一个小配置，因此对于我们通用规则无法识别名称的任何宽度，我们都采用其尺寸。

Keep preprocessing unchanged. Preserve vocabulary, special tokens and input dimensions, and copy tokenizer and processor files byte for byte. Loading and preprocessing are part of what we want to test. Build and validate the weights. Try seeded random weights and change the inputs to check that the model responds. If it doesn't, try training it on the contract's small batch of examples. Reload the saved model and check that outputs, loss and gradients are finite. Reject failed builds. Freeze and record. Save the accepted weights and measure repeatable outputs on a known-good Transformers build. Review the baselines for each supported platform and precision, then publish a pinned snapshot. CI reuses it; it does not

保持预处理不变。保留词汇表、特殊标记和输入维度，并逐字节复制分词器和处理器文件。加载和预处理是我们想要测试的一部分。构建并验证权重。尝试使用种子随机权重并更改输入，以检查模型是否响应。如果不响应，尝试在契约的小批量示例上对其进行训练。重新加载保存的模型，并检查输出、损失和梯度是否有限。拒绝失败的构建。冻结并记录。保存已接受的权重，并在已知良好的 Transformers 构建上测量可重复的输出。审核每个支持平台和精度的基准，然后发布一个固定快照。CI 会重复使用它；它不会