---
title: "Deser: Rethinking Rust Serialization"
originalUrl: "https://lucumr.pocoo.org/2026/9/29/deser/"
date: "2026-09-30T00:43:50.163Z"
---

# Deser: Rethinking Rust Serialization

**Deser：重新思考 Rust 序列化**

Armin Ronacher's Thoughts and Writings blog archive projects travel talks about Deser: Rethinking Rust Serialization written on September 29, 2026.

Armin Ronacher 的博客归档项目记录了关于“Deser：重新思考 Rust 序列化”的讨论，文章写于 2026 年 9 月 29 日。

Serde is an amazing serialization library for Rust and it has been a huge reason why I felt productive with it for years. However already while at Sentry I got quite frustrated with some of the limitations with it but actually replacing Serde is tricky because of the might that it has in the ecosystem. Also because it’s quite hard to actually do better without also making some potentially painful compromises.

Serde 是一个出色的 Rust 序列化库，也是我多年来能高效使用 Rust 的重要原因。然而，早在 Sentry 工作时，我就对其某些局限性感到非常沮丧。但实际上，想要取代 Serde 是很困难的，因为它在生态系统中拥有巨大的影响力。此外，要在不做出某些痛苦妥协的前提下做得更好，也是非常困难的。

Here are three examples of Serde corner cases that show poor interactions of Serde features or unexpected limitations:

以下是三个关于 Serde 边缘情况的例子，展示了其功能交互不佳或意料之外的局限性：

**A number that is a map**
**被视为 Map 的数字**

An internally tagged enum, with serde_json‘s arbitrary_precision feature turned on:
当开启 `serde_json` 的 `arbitrary_precision`（任意精度）功能时，内部标记的枚举（internally tagged enum）会出现问题：

```rust
#[derive(Deserialize)]
#[serde(tag = "type")]
enum Shape {
    Circle { radius: f64 },
}

serde_json::from_str::<Shape>(r#"{"type": "Circle", "radius": 1.5}"#)
// error: invalid type: map, expected f64
```

Serde’s data model has no place for arbitrary precision numbers, so serde_json uses in-band signalling with a map with a magic key. The enum has to buffer the fields until it has seen the tag, and the buffer does not know about the magic key. Because Cargo features are unified, it’s enough for any crate in your dependency graph to turn the feature on.

Serde 的数据模型无法处理任意精度数字，因此 `serde_json` 使用带有一个“魔法键”（magic key）的 Map 进行带内信号传输。枚举必须在看到标签之前缓存所有字段，而缓冲区并不识别这个魔法键。由于 Cargo 的特性（features）是统一的，依赖图中任何一个 crate 开启该功能就足以引发此问题。

**Flattening breaks integer keys**
**Flatten 破坏了整数键**

```rust
#[derive(Deserialize)]
struct Stats {
    scores: HashMap<u32, u32>,
}

#[derive(Deserialize)]
struct Report {
    name: String,
    #[serde(flatten)]
    stats: Stats,
}

serde_json::from_str::<Report>(r#"{"name": "x", "scores": {"42": 23}}"#)
// error: invalid type: string "42", expected u32 at line 1 column 35
```

Stats on its own parses `{"scores": {"42": 23}}` just fine. JSON keys are always strings, and serde_json only turns them into integers if the type asks for one. However once flatten buffers the value, "42" is just a string. The error also points at the end of the document rather than at the key.

单独解析 `{"scores": {"42": 23}}` 时，Stats 可以正常工作。JSON 的键始终是字符串，`serde_json` 仅在类型要求时才将其转换为整数。然而，一旦 `flatten` 缓存了该值，"42" 就仅仅是一个字符串了。此外，错误提示指向了文档末尾，而不是出错的键本身。

**Adapters do not compose**
**适配器无法组合**

```rust
fn from_hex<'de, D: Deserializer<'de>>(d: D) -> Result<u32, D::Error> { ... }

#[derive(Deserialize)]
struct Theme {
    #[serde(deserialize_with = "from_hex")]
    primary: u32,
    #[serde(deserialize_with = "from_hex")]
    accent: Option<u32>,
}
// error[E0308]: `?` operator has incompatible types
// ... expected `Option<u32>`, found `u32`
```

A function cannot be passed as a type parameter, so there is no way to apply `from_hex` to the inside of an `Option`, a `Vec` or a `map`. You write another function for every wrapper, and once you have `from_opt_hex` the field is no longer optional unless you also remember to add `#[serde(default)]`.

函数无法作为类型参数传递，因此无法将 `from_hex` 应用于 `Option`、`Vec` 或 `map` 的内部。你必须为每个包装器编写另一个函数，而一旦你有了 `from_opt_hex`，除非你记得添加 `#[serde(default)]`，否则该字段就不再是可选的了。

None of these are bugs that are easy to fix in Serde. They fall out of its design, and that design is protected by Serde’s stability guarantees.

这些都不是 Serde 中容易修复的 Bug。它们源于其设计，而这种设计受到 Serde 稳定性保证的保护。

Back in 2022 I started an experiment called Deser. It’s a serialization library for Rust that takes the user experience of Serde and puts it on top of a completely different architecture inspired by miniserde. I never really finished it and it sat around for a few years. I picked it back up, and it has now reached a point where I think it’s worth looking at. Even just to inspire others to see if they want to explore the space.

早在 2022 年，我启动了一个名为 Deser 的实验。这是一个 Rust 序列化库，它借鉴了 Serde 的用户体验，并将其构建在受 `miniserde` 启发而完全不同的架构之上。我从未真正完成它，它被搁置了几年。最近我重新拾起它，现在它已经达到了我认为值得一看的程度。即使只是为了启发他人去探索这个领域也是好的。

**The Name And Idea**
**名称与理念**

The name is Serde with its two halves swapped. Deser is Serde but the other way around. In Serde, a type drives the deserialization process: a `Deserialize` impl asks the deserializer for the kind of value it expects, the format calls back into a visitor. Every nested value is handled by recursion which makes Serde deserialization inherently grow the stack with each level of nesting.

这个名字就是把 Serde 的两半调换了一下。Deser 就是反过来的 Serde。在 Serde 中，类型驱动反序列化过程：`Deserialize` 实现向反序列化器请求它期望的值类型，格式（format）再回调访问者（visitor）。每个嵌套值都通过递归处理，这使得 Serde 的反序列化过程会随着嵌套层级的增加而不可避免地增加栈空间消耗。

Deser on the other hand turns this around and the format tells the type of the next value and pushes events into a sink. When a sink hits the start of a nested value, it doesn’t call into it but hands back a new sink to a driver, which keeps all state on the heap (in fact, in an arena). On the way out, emitters return their nested values instead of recursing into them. That also means that Deser cannot support formats like protobuf that are not self describing. They are in fact quite intentionally left out of the design entirely. Which is one way to say: if you want to “fix” Serde, you need to make some other compromises.

另一方面，Deser 将此过程反转：格式告知下一个值的类型，并将事件推送到一个接收器（sink）中。当接收器遇到嵌套值的开始时，它不会调用它，而是将一个新的接收器交还给驱动程序，驱动程序将所有状态保存在堆上（实际上是在 arena 中）。在退出时，发射器（emitter）返回其嵌套值，而不是递归进入它们。这也意味着 Deser 无法支持像 protobuf 那样非自描述的格式。事实上，它们被完全排除在设计之外是刻意为之的。换句话说：如果你想“修复” Serde，你就必须做出其他妥协。

Most of the reasons for Deser’s ideas go back to Sentry Relay, which processes enormous amounts of untrusted JSON. Over the years when I was at Sentry we ran into the same set of problems again and again, and many of them are not really bugs in Serde but consequences of its design. Serde’s stability guarantees mean that a lot of them cannot be fixed without breaking every format and every hand written implementation.

Deser 的大部分设计理念源于 Sentry Relay，它处理海量的不可信 JSON 数据。在 Sentry 工作期间，我们反复遇到同一系列问题，其中许多并非 Serde 的 Bug，而是其设计带来的后果。Serde 的稳定性保证意味着，如果不破坏现有的每一种格式和每一种手动实现，其中许多问题是无法修复的。

Most of these problems come from three decisions:
这些问题大多源于三个决策：

1. **One set of traits for all formats.** Serde serves both self describing formats (JSON, YAML, TOML, …) and formats where the reader has to know the type upfront (postcard, bincode, protobuf, …). That is incredibly useful, but it means that some features only work with some formats, and you find out at runtime. In case of Serde it also has some odd wrinkles where a derived struct quietly accepts an array in place of an object in JSON for instance.
1. **为所有格式提供一套 Trait。** Serde 同时服务于自描述格式（JSON、YAML、TOML 等）和读取器必须预先知道类型的格式（postcard、bincode、protobuf 等）。这非常有用，但也意味着某些功能仅适用于特定格式，且你只能在运行时发现问题。以 Serde 为例，它还有一些奇怪的瑕疵，例如派生结构体在 JSON 中会静默地接受数组来代替对象。

2. **A fixed data model that loses information when buffering.** Internally tagged enums, untagged enums and flatten need to buffer values before they know what to do with them. The buffer can’t hold everything the format knew, errors lose their location and extensions to the ecosystem rely on in-band signalling to express things such as arbitrary precision numbers.
2. **在缓存时会丢失信息的固定数据模型。** 内部标记枚举、未标记枚举和 `flatten` 需要在知道如何处理值之前先缓存它们。缓冲区无法保存格式所知的所有信息，错误会丢失位置信息，而生态系统的扩展则依赖带内信号来表达诸如任意精度数字之类的内容。

3. **Recursion on the call stack.** Every level of nesting uses stack space. Formats protect against this with a recursion limit, but the moment you go through a code path that doesn’t have one (writing, dynamic values), deeply nested data can take down your process. It also means that a deserialization cannot be paused while you wait.
3. **调用栈上的递归。** 每一层嵌套都会占用栈空间。格式通过递归限制来防止这种情况，但一旦你经过一个没有限制的代码路径（写入、动态值），深度嵌套的数据可能会导致进程崩溃。这也意味着反序列化过程在等待时无法暂停。