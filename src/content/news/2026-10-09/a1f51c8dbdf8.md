---
title: "Whistle: Speech to Text in 16.9 MB"
originalUrl: "https://cactuscompute.com/blog/whistle"
date: "2026-10-08T16:59:39.000Z"
excerpt: false
---

# Whistle: Speech to Text in 16.9 MB

An open speech recognition model that runs on the same CPU engine as Needle. It transcribes seven languages, reaches the first token in 11 ms, and loads beside Needle so one binary turns a clip straight into tool calls.

这是一个可以在与 Needle 相同的 CPU 引擎上运行的开源语音识别模型。它支持七种语言的转录，首个 token 的生成时间仅需 11 毫秒，并且可以与 Needle 并行加载，从而实现通过单个二进制文件直接将音频片段转换为工具调用。

Today we release Whistle, a speech recognition model for mobiles, wearables, robots, smart home, automotive and microcontrollers. It is one 16.9 MB file, runs on the CPU with no dependencies, and loads into the same C++ engine as Needle, from the same container and the same quantisation.

今天我们发布了 Whistle，这是一款专为移动设备、可穿戴设备、机器人、智能家居、汽车和微控制器设计的语音识别模型。它是一个 16.9 MB 的文件，无需任何依赖即可在 CPU 上运行，并能通过相同的容器和量化方式加载到与 Needle 相同的 C++ 引擎中。

Press the mic and say something.

按下麦克风并说点什么。

Whistle does three jobs, all of them on the device:

Whistle 在设备端完成三项任务：

The front end. 16 kHz mono audio is framed at a 25 ms window and a 10 ms hop into 80 log-mel bins, band-limited to 250-3500 Hz and normalised per channel. Thirty seconds is 3,000 frames. A convolutional stem of 128 channels and kernel 9 halves that count three times, leaving 375 frames at one per 80 ms. Every stage after this runs at that rate, and embed returns one row per frame.

前端处理。16 kHz 单声道音频以 25 毫秒窗口和 10 毫秒步长进行分帧，转换为 80 个对数梅尔（log-mel）频段，频带限制在 250-3500 Hz 之间，并进行通道归一化。30 秒的音频对应 3,000 帧。一个包含 128 个通道和 9 核的卷积主干将帧数减半三次，最终得到每 80 毫秒一帧、共 375 帧的数据。此后的每个阶段都以此速率运行，嵌入（embed）层为每一帧返回一行数据。

The encoder. Eight Simple Attention blocks: four mHC residual lanes and a Monarch Hadamard MLP in place of the feed-forward network, the same blocks Needle uses. The attention is not causal. A frame at 3 s attends to a frame at 12 s.

编码器。包含八个简单注意力（Simple Attention）模块：四个 mHC 残差通道，并使用 Monarch Hadamard MLP 代替前馈网络，这些模块与 Needle 使用的完全相同。该注意力机制是非因果的，即 3 秒处的帧可以关注到 12 秒处的帧。

The decoder. Eight Laddered Simple Attention blocks at width 512, 8 query heads to 2 KV heads, 48-dimensional queries and keys, 64-dimensional values, a 3-tap causal convolution on Q, K and V, and engram lookups at layers 3 and 7 over 18,432 slots. That is Needle's block list with a different layer count.

解码器。包含八个宽度为 512 的阶梯式简单注意力模块，采用 8 个查询头对应 2 个 KV 头，查询和键维度为 48，值维度为 64，在 Q、K 和 V 上进行 3 抽头因果卷积，并在第 3 层和第 7 层对 18,432 个槽位进行 engram 查找。这与 Needle 的模块列表相同，只是层数不同。

The speech-specific part is one addition per layer. Each decoder layer reads the encoder through a gated cross attention, x ← x + σ(g) · softmax(q̂ K̂ᵀ/√d) V, with a gate learned per layer and K and V taken from the clip. Those projections run once when the clip arrives, 375 frames across 8 layers, and are then held for the whole decode. Five beams therefore cost five short transcript caches, not five passes over the audio.

语音专用部分是每层增加的一个组件。每个解码器层通过门控交叉注意力机制读取编码器，公式为 x ← x + σ(g) · softmax(q̂ K̂ᵀ/√d) V，其中门控参数是逐层学习的，K 和 V 取自音频片段。这些投影在音频片段到达时运行一次（跨 8 层处理 375 帧），然后在整个解码过程中保持不变。因此，五个波束（beam）仅需五个简短的转录缓存，而无需对音频进行五次遍历。

Decoding. Five beams scored by length-normalised log probability. Keyword biasing walks an Aho-Corasick automaton over the phrases you pass in, alongside the beams, and lifts their log probability as the automaton advances. The transcript is capped at 320 tokens. The vocabulary is 8,192 text pieces plus seven language tokens, one per language, so the detected language is emitted as a token rather than returned out of band.

解码。使用长度归一化的对数概率对五个波束进行评分。关键词偏置功能在波束搜索的同时，通过 Aho-Corasick 自动机遍历传入的短语，并随着自动机的推进提高其对数概率。转录上限为 320 个 token。词汇表包含 8,192 个文本片段加上七个语言 token（每种语言一个），因此检测到的语言会作为 token 输出，而不是带外返回。

The ladder is on the decoder. Every depth from 2 layers up was trained as a model of its own, and --audio-depth selects one at load time. The encoder is never sliced: all eight blocks run at every depth.

阶梯结构位于解码器上。从 2 层开始的每个深度都作为独立模型进行了训练，加载时可通过 --audio-depth 参数进行选择。编码器从不进行切分：所有八个模块在每个深度下都会运行。

Silence. The engine measures the clip's loudness range before the decoder starts. Below the threshold it returns an empty transcript and an empty language, and never enters the beam search.

静音处理。引擎在解码器启动前会测量音频片段的响度范围。如果低于阈值，它将返回空的转录和空的语言，且不会进入波束搜索阶段。

Whistle is ahead on LibriSpeech test-clean and test-other, on SPGISpeech, on Earnings-22 and on the FLEURS average. Whisper base is ahead on TED-LIUM, on AMI and on the MLS average, at 145.3 MB against 16.9.

Whistle 在 LibriSpeech 的 test-clean 和 test-other、SPGISpeech、Earnings-22 以及 FLEURS 平均分上表现领先。Whisper base 在 TED-LIUM、AMI 和 MLS 平均分上领先，但其体积为 145.3 MB，而 Whistle 仅为 16.9 MB。

Each model ran on its official runtime at its defaults: Whistle's C++ engine at 5 beams, openai-whisper, and moonshine-voice non-streaming over whole audio. Time to first token is audio in to first token. Decode is tokens divided by the wall time after it, so the encoder is not counted twice. Whisper pads every input to 30 seconds, so its time to first token is flat across clip lengths. Whistle's tracks the clip: 5.9 ms at 5 seconds, 11.1 ms at 10, 36.3 ms at 30.

每个模型均在其官方运行时使用默认设置运行：Whistle 的 C++ 引擎使用 5 个波束，openai-whisper 和 moonshine-voice 对整个音频进行非流式处理。首个 token 时间是从音频输入到生成首个 token 的时长。解码速度为 token 总数除以之后的挂钟时间，因此编码器时间不会被重复计算。Whisper 会将所有输入填充至 30 秒，因此其首个 token 时间在不同音频长度下保持不变。Whistle 的时间则随音频长度变化：5 秒音频为 5.9 毫秒，10 秒为 11.1 毫秒，30 秒为 36.3 毫秒。

Word error rates are scored with the Whisper normalizers. Whistle's are measured over 86,174 utterances. Whisper's and Moonshine's are the figures their authors published, from the multilingual checkpoints rather than the English-only ones. No test audio appears in Whistle's training or validation data, verified by comparing audio checksums and speaker IDs across every reported test set.

词错误率（WER）使用 Whisper 的归一化工具进行评分。Whistle 的数据是在 86,174 条语音上测得的。Whisper 和 Moonshine 的数据采用其作者发布的多语言检查点结果，而非仅限英语的版本。Whistle 的训练或验证数据中不包含任何测试音频，这一点已通过对比所有报告测试集中的音频校验和与说话人 ID 进行了验证。

needle_load reads whichever model a .cact file holds, so the same binary does speech, text, or both:

needle_load 可以读取 .cact 文件中包含的任何模型，因此同一个二进制文件可以处理语音、文本或两者兼顾：

On the third line needle_complete takes the clip directly. The engine transcribes it, answers the transcript against your tools, and returns one JSON object with the calls and the speech fields, the speech ones prefixed audio_. No transcript is handled by the caller.

在第三行中，needle_complete 直接接收音频片段。引擎对其进行转录，根据你的工具对转录内容进行响应，并返回一个包含调用和语音字段的 JSON 对象，语音字段以 audio_ 为前缀。调用者无需处理转录内容。

A 16 kHz WAV or raw samples need nothing beyond the base install. Other sample rates and microphone capture need the [mic] extra, which adds soxr and sounddevice.

16 kHz WAV 或原始采样无需额外安装即可使用。其他采样率和麦克风捕获需要 [mic] 扩展包，该包会添加 soxr 和 sounddevice。

Every call returns the text, the language, the milliseconds to the first token and the decoder's tokens per second after it. word_timestamps=True adds each word with its times and probability. keywords=["Siobhan", "Krzysztof"] raises the log probability of those phrases during the search. language="de" forces the language instead of detecting it. needle.Whistle() is the same model as an object, for embed(audio) or to hold one tuned .cact.

每次调用都会返回文本、语言、首个 token 的毫秒数以及之后的解码器每秒 token 数。word_timestamps=True 会添加每个单词的时间戳和概率。keywords=["Siobhan", "Krzysztof"] 会在搜索过程中提高这些短语的对数概率。language="de" 可强制指定语言而非自动检测。needle.Whistle() 是作为对象的相同模型，可用于 embed(audio) 或加载一个调优后的 .cact 文件。

needle whistle playground transcribes from the microphone in the terminal, and needle whistle compare runs the same clip through Whistle, Whisper and Moonshine side by side with their timings.

needle whistle playground 可在终端通过麦克风进行转录，needle whistle compare 则可让 Whistle、Whisper 和 Moonshine 同时处理同一个音频片段并对比其耗时。

The engine ships prebuilt for seventeen targets, from macOS and Linux through Android, iOS, watchOS, Windows on ARM, RISC-V, MIPS, the browser and a WASI component. Every folder holds a needle binary, libneedle.a and needle.h, and loads any .cact you hand it.

该引擎为 17 个目标平台提供了预构建版本，包括 macOS、Linux、Android、iOS、watchOS、Windows on ARM、RISC-V、MIPS、浏览器以及 WASI 组件。每个文件夹都包含一个 needle 二进制文件、libneedle.a 和 needle.h，并可加载你提供的任何 .cact 文件。

needle_load, needle_transcribe and needle_embed are the whole speech C API. The engine reads no environment variables. Every behaviour is a compiled default or an explicit flag.

needle_load、needle_transcribe 和 needle_embed 构成了完整的语音 C API。引擎不读取任何环境变量。所有行为均为编译时的默认设置或显式标志。

Weights are on Hugging Face, the engine and its platform folders are in Cactus-Compute/needle3, and the source is on GitHub.

权重文件位于 Hugging Face，引擎及其平台文件夹位于 Cactus-Compute/needle3，源代码位于 GitHub。