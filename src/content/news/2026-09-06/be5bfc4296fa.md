---
title: "Semantic Search in C++ without Python, libtorch or ONNX Runtime"
originalUrl: "https://dev.to/olafur_aron/semantic-search-in-c-without-python-libtorch-or-onnx-runtime-ihg"
date: "2026-09-05T23:04:21.797Z"
---

# Semantic Search in C++ without Python, libtorch or ONNX Runtime
# 在 C++ 中实现语义搜索：无需 Python、libtorch 或 ONNX Runtime

Ask how to run a transformer model from C++ and you get two answers: link libtorch, or convert the model and link ONNX Runtime. Both work. Both are large, both want a toolchain of their own, and both put a second inference engine inside your process.
当你询问如何在 C++ 中运行 Transformer 模型时，通常会得到两个答案：链接 libtorch，或者转换模型并链接 ONNX Runtime。两者都能工作，但它们体积庞大，都需要各自的工具链，并且都会在你的进程中引入第二个推理引擎。

There is a third answer, and it takes four commands.
现在有了第三种方案，只需四条命令即可实现：

```bash
mkdir kjarni-quickstart && cd kjarni-quickstart
curl -sL https://github.com/olafurjohannsson/kjarni/releases/latest/download/kjarni-x86_64-linux.tar.gz | tar xz
curl -sO https://raw.githubusercontent.com/olafurjohannsson/kjarni/main/crates/kjarni-ffi/examples/cpp/hello.cpp
g++ -std=c++23 hello.cpp -I. -L. -lkjarni_ffi -Wl,-rpath,'$ORIGIN' -o hello && ./hello
```

related: 0.5510
unrelated: -0.0630
related: 0.5510
unrelated: -0.0630

That is a transformer model, downloaded, loaded and run, from an empty directory. No package manager, no Python, no model conversion step. The archive holds the shared library, kjarni.h (the C ABI) and kjarni.hpp (a header-only C++23 wrapper). macOS and Windows builds are on the same [releases page](https://github.com/olafurjohannsson/kjarni/releases).
这是一个从空目录开始，经过下载、加载并运行的 Transformer 模型。无需包管理器，无需 Python，也无需模型转换步骤。该压缩包包含共享库、kjarni.h（C ABI）和 kjarni.hpp（仅头文件的 C++23 封装）。macOS 和 Windows 的构建版本可在同一个[发布页面](https://github.com/olafurjohannsson/kjarni/releases)找到。

Here is what hello.cpp contains:
以下是 hello.cpp 的内容：

```cpp
#include "kjarni.hpp"
#include <print>

int main() {
    // Downloaded once and cached under ~/.cache/kjarni, then loaded from disk.
    auto embedder = kjarni::Embedder::create({.model = "minilm-l6-v2"});
    if (!embedder) {
        std::println("{}", embedder.error().message());
        return 1;
    }

    auto question = embedder->encode("How do I get my money back?");
    auto related = embedder->encode("What is your refund policy?");
    auto unrelated = embedder->encode("The weather in Reykjavik is unpredictable.");

    // No shared words with the question, but the same meaning.
    std::println("related: {:.4f}", kjarni::cosine(*question, *related));
    std::println("unrelated: {:.4f}", kjarni::cosine(*question, *unrelated));
}
```

"How do I get my money back?" and "What is your refund policy?" share no words at all, and score 0.55. The sentence about the weather scores below zero. That gap is the entire idea behind semantic search.
“How do I get my money back?”（我如何退款？）和 “What is your refund policy?”（你们的退款政策是什么？）这两个句子没有任何共同词汇，但得分却高达 0.55。而关于天气的句子得分则低于零。这种差异正是语义搜索的核心理念。

### How semantic search works
### 语义搜索的工作原理

An embedding model reads text and returns a vector, an array of floats, 384 numbers for the model above. Text with similar meaning produces vectors that point in similar directions.
嵌入模型读取文本并返回一个向量（即浮点数数组），上述模型返回的是 384 个数字。含义相似的文本会产生指向相似方向的向量。

* "refund policy" -> [0.12, -0.34, 0.56, ...] (384 numbers)
* "get money back" -> [0.11, -0.33, 0.55, ...] (384 numbers) <- close
* "weather today" -> [-0.45, 0.23, -0.12, ...] (384 numbers) <- far

You compare two vectors with cosine similarity, which measures the angle between them and ignores their length. It runs from 1 for identical direction to -1 for opposite.
你可以使用余弦相似度来比较两个向量，它测量向量之间的夹角并忽略其长度。其取值范围从 1（方向完全相同）到 -1（方向完全相反）。

### What you actually link against
### 你实际链接的内容

This is the part that decides whether the approach is worth anything, so it is worth checking rather than believing. Ask the linker:
这是决定该方案是否有价值的关键部分，因此与其盲目相信，不如亲自检查。询问链接器：

```bash
$ ldd hello
linux-vdso.so.1
libkjarni_ffi.so => /home/you/kjarni-quickstart/libkjarni_ffi.so
libstdc++.so.6 => /lib/x86_64-linux-gnu/libstdc++.so.6
libm.so.6 => /lib/x86_64-linux-gnu/libm.so.6
libgcc_s.so.1 => /lib/x86_64-linux-gnu/libgcc_s.so.1
libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6
/lib64/ld-linux-x86-64.so.2
libpthread.so.0 => /lib/x86_64-linux-gnu/libpthread.so.0
libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2
```

Kjarni, the C++ runtime, and the parts of glibc every program already uses: libc, libm, libgcc, libpthread and libdl. That is the whole list. No libtorch, no onnxruntime, no Python, no CUDA runtime.
Kjarni、C++ 运行时，以及每个程序都已经在使用 glibc 的部分：libc、libm、libgcc、libpthread 和 libdl。这就是全部列表。没有 libtorch，没有 onnxruntime，没有 Python，也没有 CUDA 运行时。

The binary is 283 KB and the library is 19.4 MB, which includes the tokenizer, the model loaders and every kernel. The -Wl,-rpath,'$ORIGIN' in the build line is what makes that first entry resolve to the library sitting next to your binary rather than something in /usr/local/lib. Keep it, and the directory you built in is a directory you can copy somewhere else and run. A dependency you cannot see in ldd is a dependency that cannot break you on a machine that is not yours.
该二进制文件大小为 283 KB，库文件为 19.4 MB，其中包含了分词器、模型加载器和所有内核。构建命令中的 `-Wl,-rpath,'$ORIGIN'` 使得第一个条目能够定位到与二进制文件位于同一目录下的库，而不是 `/usr/local/lib` 中的库。保留它，你构建所在的目录就可以直接复制到其他地方运行。在 ldd 中看不到的依赖项，就不会在别人的机器上导致程序崩溃。

### Errors are values
### 错误即值

Every fallible call returns `std::expected<T, kjarni::Error>`. Nothing in the header throws except `std::bad_alloc`.
每个可能失败的调用都会返回 `std::expected<T, kjarni::Error>`。头文件中除了 `std::bad_alloc` 外，不会抛出任何异常。

```cpp
auto embedder = kjarni::Embedder::create({.model = "minilm-l6-v2"});
if (!embedder) {
    std::println(stderr, "could not load model: {}", embedder.error().message());
    return 1;
}
```

Whether a missing model file is exceptional depends on the program. A batch job should die; a desktop application should show a message and carry on. Returning the failure lets the caller decide, and puts it in the signature where it cannot be missed. The options are a designated-initialiser aggregate, so a call names only what it changes: `Embedder::create({.model = "mpnet-base-v2", .gpu = true})`.
缺失模型文件是否属于异常情况取决于程序本身。批处理作业应该终止；而桌面应用程序则应该显示一条消息并继续运行。通过返回错误，调用者可以自行决定处理方式，并且这种方式将错误信息显式地放在了函数签名中，不会被忽略。选项使用指定初始化聚合（designated-initialiser aggregate），因此调用时只需指定需要更改的参数：`Embedder::create({.model = "mpnet-base-v2", .gpu = true})`。

### Searching a corpus
### 搜索语料库

Encode the documents once, encode the query at search time, sort by similarity.
对文档进行一次编码，在搜索时对查询进行编码，然后按相似度排序。

```cpp
#include "kjarni.hpp"
#include <algorithm>
#include <print>
#include <ranges>
#include <string_view>
#include <vector>

int main() {
    auto embedder = kjarni::Embedder::create({.model = "minilm-l6-v2"});
    if (!embedder) {
        std::println(stderr, "could not load model: {}", embedder.error().message());
        return 1;
    }

    constexpr std::array docs = {
        std::string_view{"How do I reset my password?"},
        std::string_view{"What is your refund policy?"},
        std::string_view{"Do you ship internationally?"},
        std::string_view{"How do I update my billing address?"},
        std::string_view{"Where can I track my order?"},
    };

    std::vector<std::vector<float>> corpus;
    corpus.reserve(docs.size());
    for (std::string_view d : docs) {
        auto v = embedder->encode(d);
        if (!v) {
            std::println(stderr, "encode failed: {}", v.error().message());
            return 1;
        }
        corpus.push_back(v->to_vector());
    }

    constexpr std::string_view query = "I need to change my login credentials";
    auto q = embedder->encode(query);
    if (!q) {
        std::println(stderr, "encode failed: {}", q.error().message());
        return 1;
    }

    std::vector<std::pair<float, std::string_view>> scored;
    for (auto [i, doc] : std::views::enumerate(docs))
        scored.emplace_back(kjarni::cosine(q->values(), corpus[i]), doc);

    std::ranges::sort(scored, std::ranges::greater{}, &std::pair<float, std::string_view>::first);

    std::println("query: \"{}\"", query);
    for (auto [score, doc] : scored)
        std::println("{:.4f} {}", score, doc);
}
```