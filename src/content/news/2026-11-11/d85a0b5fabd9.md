---
title: "Xolotl - running a 552-billion MoE on one gaming PC, and what it asks of a constrained machine"
originalUrl: "https://dev.to/private_localai/xolotl-running-a-552-billion-moe-on-one-gaming-pc-and-what-it-asks-of-a-constrained-machine-5f7k"
date: "2026-11-11T01:16:37.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

Xolotl (github.com/Indras-Mirror/Xolotl, MIT) is a descendant of Strata. The parent project's engine, server and core kernels are still inside it - merged at 0.1.44.1 - but the author is candid that more than 70,000 lines have gone on top: its own DeepSeek-V4.1 / V4-Flash and GLM-5.3-Flash engines, a Qwen3.8-27B dense engine grown from Mirko Perrone's port, an LFM3-Omni multimodal engine, a "fast mode", and the quantisation, expert-tiering and serving work in between.

Xolotl (github.com/Indras-Mirror/Xolotl, MIT) 是 Strata 的衍生项目。该父项目的引擎、服务器和核心内核仍保留在其中（合并于 0.1.44.1 版本），但作者坦言，在此基础上又增加了超过 70,000 行代码：包括其自有的 DeepSeek-V4.1 / V4-Flash 和 GLM-5.3-Flash 引擎、基于 Mirko Perrone 移植版开发的 Qwen3.8-27B 稠密引擎、LFM3-Omni 多模态引擎、“快速模式”，以及在此期间进行的量化、专家分层和推理服务工作。

It serves one OpenAI- and Anthropic-compatible endpoint across all of them. The name is the project's own: Xolotl is Quetzalcoatl's dark twin in Aztec myth, the one who carries the dead up from the underworld. The engine carries experts up from RAM and NVMe. That is the whole design in one sentence, and it is also why this piece goes on the list of resource-constrained inference engines rather than the "big GPU" list.

它为所有这些模型提供了一个兼容 OpenAI 和 Anthropic 的统一端点。这个名字是项目自取的：在阿兹特克神话中，Xolotl 是羽蛇神（Quetzalcoatl）的黑暗双子，负责将死者从冥界带回。该引擎则负责将“专家”从内存和 NVMe 中带出。这就是其设计的核心，也是为什么本文将其归入资源受限推理引擎列表，而非“大型 GPU”列表的原因。

What it costs to run, stated plainly Most engines tell you what model they support. Xolotl's README has a separate document for the machine budget, and the numbers are unusual for being honest about which part of the system does the work. The measured setup is one desktop: RTX 4090 (24 GB), Ryzen 7 5700X, 110 GB DDR4, one NVMe drive, Linux.

运行成本，直言不讳。大多数引擎只会告诉你它们支持什么模型。Xolotl 的 README 中有一个专门的机器预算文档，其中的数据非常罕见，因为它诚实地说明了系统的哪个部分在承担工作。测试配置为一台台式机：RTX 4090 (24 GB)、Ryzen 7 5700X、110 GB DDR4、一块 NVMe 硬盘，运行 Linux 系统。

The document spells out what each of those budget items means: GPU: any NVIDIA card at compute capability 7.5 or newer (RTX 20/30/40/50). A Volta V100 path exists as an experimental flag, not as a promise. RAM is the real constraint. With 110 GB, the engine keeps an 80 GB expert cache in RAM; on a 90 GB machine that cache is 64 GB. Less RAM means a smaller arena, so more experts are read from NVMe per token and decode drops. Around 256 GB is quoted as the point where every expert simply lives in RAM.

该文档详细说明了每个预算项的含义：GPU 要求为计算能力 7.5 或更高（RTX 20/30/40/50 系列）的任何 NVIDIA 显卡。Volta V100 的支持路径仅作为实验性标志存在，而非承诺。内存是真正的瓶颈。在 110 GB 内存下，引擎可在内存中保留 80 GB 的专家缓存；而在 90 GB 的机器上，该缓存为 64 GB。内存越小，运行空间就越小，这意味着每个 token 需要从 NVMe 读取更多的专家数据，从而导致解码速度下降。文档指出，大约 256 GB 内存是让所有专家都能驻留在内存中的临界点。

Disk: roughly 152 GiB for the quantised model, about 200 GB more for the Engram tables, and ~40 GB more if you want fast mode. It asks for a fast NVMe on ext4 or NTFS - and it says why: not exFAT, because Linux's exFAT driver serialises parallel reads and made expert reads five times slower there; and not a hard drive, because the Engram lookups are around 48 small random reads per token. That is a very different thing to "needs 24 GB of VRAM".

磁盘方面：量化模型大约需要 152 GiB，Engram 表需要额外约 200 GB，如果需要“快速模式”则还需约 40 GB。它要求使用 ext4 或 NTFS 格式的高速 NVMe 硬盘，并给出了理由：不能使用 exFAT，因为 Linux 的 exFAT 驱动程序会将并行读取序列化，导致专家读取速度慢了五倍；也不能使用机械硬盘，因为 Engram 查找过程每个 token 大约需要 48 次小型随机读取。这与“需要 24 GB 显存”的概念完全不同。

The card is the least important number on that list, and the authorship says so: community runs on 12 GB cards (an RTX 3060 with 46 GB of RAM reaches 149 tok/s prefill at 8K and 8-10 tok/s decode; an RTX 5070 gets 4.7 tok/s), while the same class of card runs Qwen3.8-Flash-Next at 39-48 tok/s. Same model family, same engine, four times the speed with a different quant - which is a reminder that in this work the quant you choose is the memory plan.

显卡是该列表中最不重要的指标，作者也明确表示了这一点：社区用户在 12 GB 显存的卡上也能运行（配备 46 GB 内存的 RTX 3060 在 8K 上下文下可达到 149 tok/s 的预填充速度和 8-10 tok/s 的解码速度；RTX 5070 则为 4.7 tok/s），而同级别的显卡运行 Qwen3.8-Flash-Next 时可达 39-48 tok/s。相同的模型系列、相同的引擎，仅因量化方式不同速度就相差四倍——这提醒我们，在此类工作中，你选择的量化方式就是你的内存规划。

The mechanism: three tiers and an explicit trade A mixture-of-experts model only touches a few experts per token, so Xolotl keeps every expert somewhere: the hottest in VRAM, tens of gigabytes in a pinned RAM arena that the GPU reads by DMA, the rest on NVMe read at the drive's ceiling - and moves whichever experts the current token's router asks for, a layer ahead of time.

机制：三层架构与明确的权衡。混合专家模型（MoE）每个 token 只会调用少数几个专家，因此 Xolotl 将所有专家分布在不同位置：最活跃的专家放在显存中，数十 GB 的专家放在 GPU 可通过 DMA 读取的固定内存区域中，其余的则放在 NVMe 上以硬盘的极限速度读取。它会提前一层将当前 token 路由所需的专家移动到位。

That "a layer ahead" is the part that separates it from a general runtime that pages weights in lazily and hopes the OS co-operates: an engine that owns its own memory policy is the lesson my Avalon and PolyStrata notes made, and here it is again. Per-model work on top of that: calibrated mixed-precision quantisation (the DeepSeek V4.1 build uses the GSQ family, which I covered in GSQ and RCO), speculative decoding with exact sampling, a bit-exact 4-bit KV cache for 512K context, an arena that adapts to the conversation, MTP speculative decoding for the Qwen models, GLM's abliteration LoRA on every path plus soft pruning.

这种“提前一层”的机制将其与那些懒加载权重并寄希望于操作系统配合的通用运行时区分开来：拥有自主内存策略的引擎，正是我在 Avalon 和 PolyStrata 笔记中总结的经验，如今再次得到了印证。在此基础上，针对每个模型的工作还包括：校准后的混合精度量化（DeepSeek V4.1 构建版本使用了我在 GSQ 和 RCO 中介绍过的 GSQ 系列）、精确采样的投机解码、支持 512K 上下文的位精确 4-bit KV 缓存、可适应对话的内存区域、针对 Qwen 模型的 MTP 投机解码，以及 GLM 在每条路径上的消融 LoRA 和软剪枝。

Two features are worth reading for the engineering rather than the marketing: Xolotl Direct (Linux, experimental): the NVMe drive writes expert blocks straight into the card's VRAM instead of routing them through host memory - 3.1 ms per expert where the normal path costs about 11 ms. Fast mode (opt-in): a ~40 GB sidecar holding a 2-bit copy of the two largest expert formats, so the tokens that matter read from a smaller file.

有两个功能值得从工程角度而非营销角度去解读：Xolotl Direct（Linux，实验性）：NVMe 硬盘直接将专家块写入显卡的显存，而不是通过主机内存路由——每个专家耗时 3.1 毫秒，而正常路径需要约 11 毫秒。快速模式（可选）：一个约 40 GB 的辅助文件，包含两个最大专家格式的 2-bit 副本，使得关键 token 可以从更小的文件中读取。

It changes decode on agent tasks from 32.6 to 41.1 tok/s (+26%) and keeps the same benchmark score, while next-token agreement against normal mode drops from 87.0% to 86.2%. The README is unusually direct about that: it is lossy, so it is opt-in, and "keep normal mode where every token counts". Turning it off is one unset environment variable.

它将智能体任务的解码速度从 32.6 tok/s 提升至 41.1 tok/s（+26%），同时保持了相同的基准测试分数，而与正常模式相比，下一个 token 的一致性从 87.0% 下降到 86.2%。README 对此非常坦诚：这是有损的，因此是可选的，并建议“在每个 token 都至关重要的情况下保持正常模式”。关闭该功能只需取消设置一个环境变量。

That last paragraph is the one I'd point at if someone asked me what to learn from this project. A speed claim without an agreement metric beside it is a claim I cannot use; here the trade is quantified in the same table as the speed. The measurement discipline, which is the real reason to read it Every number in that README comes from one machine, through the real server, while the model works its benchmark: six hard agentic coding tasks graded by hidden tests, ten turns each, thinking enabled with a 32K budget.

如果有人问我从这个项目中能学到什么，我会指出最后一段。没有一致性指标支撑的速度声明是不可信的；在这里，权衡与速度被量化在同一个表格中。测量纪律，这才是阅读该项目的真正原因。README 中的每一个数字都来自同一台机器，通过真实的服务器，在模型运行基准测试时得出：六项由隐藏测试评分的硬核智能体编码任务，每项十轮，开启 32K 预算的思考模式。

Decode speed is measured during those agent tasks rather than in an idle generation loop - which is the only honest way to quote a number for anything used by an agent harness. It also scores its own models against the same models' hosted APIs on those tasks, and reports both directions: a local DeepSeek-V4.1 build at 4.99/6 against that model's API score of 4.49; Qwen3.8-27B at 5.50 against an API 4.47.

解码速度是在这些智能体任务期间测量的，而不是在空闲生成循环中——这是为任何智能体框架所使用的工具报价的唯一诚实方式。它还将自己的模型与这些模型在托管 API 上的表现进行了对比，并报告了两个方向的数据：本地 DeepSeek-V4.1 构建版本得分为 4.99/6，而该模型的 API 得分为 4.49；Qwen3.8-27B 得分为 5.50，而 API 得分为 4.47。

Where it has not measured, it says "to come" - GLM-5.3-Flash is quoted as decode speed without a benchmark score, because there is no run yet. And it retired its own HumanEval table for a reason: every model scored 19-21/21 on it, so the table no longer separated them. It is worth being clear about what this is not: research code from one developer, measured on one PC, with the invitation "reports from other hardware welcome" in its own README. The Windows path exists only for DeepSeek-V4.1 and is native MSVC + CUDA; everything quoted is Linux. Where it fits in this family Strata (my notes) is the parent: one flagship model, well served.

对于尚未测量的数据，它标注为“即将推出”——GLM-5.3-Flash 仅给出了解码速度而没有基准测试分数，因为尚未进行测试。它弃用了自己的 HumanEval 表格是有原因的：每个模型在该测试中都得了 19-21/21 分，因此该表格已无法区分它们。需要明确的是，这并非什么：它是一个开发者的研究代码，在一台 PC 上测量，并在 README 中邀请“欢迎提供其他硬件的报告”。Windows 路径仅适用于 DeepSeek-V4.1，且为原生 MSVC + CUDA；所有引用的数据均基于 Linux。在这一系列中，Strata（我的笔记）是父项目：一个旗舰模型，服务良好。