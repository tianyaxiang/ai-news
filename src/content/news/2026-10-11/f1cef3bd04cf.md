---
title: "Why 'externalized' proofs of cyclic trait impls does not work"
originalUrl: "https://smallcultfollowing.com/babysteps/blog/2026/10/10/modular-vs-external-proofs/"
date: "2026-10-10T16:56:48.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

NB. This page is part of the series "Cyclic Trait Impls". Click here to see all posts. For this post, I wanted to talk about two different approaches to handling supertraits. I’m calling them modular proofs vs external proofs. The key idea of this post is that, if we want to have cyclic trait impls, we really need to use a modular proof strategy, where the impl establishes all supertraits hold. Previously we had considered an external strategy, where the piece of code using the impl has the obligation to prove the supertraits hold. Modular proofs always seemed better but I did not think they were workable in the past. But I have become convinced that external proofs are incompatible with Rust as designed, and hence modular proofs are really the only option. This post dives into that reasoning, and also gives a bit of explanation of what I mean by proofs in the first place.

注意：本页面是“循环 Trait 实现”（Cyclic Trait Impls）系列文章的一部分。点击此处查看所有文章。在这篇文章中，我想讨论处理父 Trait（supertraits）的两种不同方法，我将其称为模块化证明（modular proofs）与外部证明（external proofs）。本文的核心观点是，如果我们想要实现循环 Trait，确实需要采用模块化证明策略，即由实现（impl）本身来确立所有父 Trait 均成立。此前我们曾考虑过一种外部策略，即由使用该实现的代码片段负责证明父 Trait 成立。模块化证明看起来一直更好，但我过去认为它们不可行。然而，我现在确信外部证明与 Rust 的设计不兼容，因此模块化证明确实是唯一的选择。本文将深入探讨这一推理过程，并对我在文中提到的“证明”一词的含义进行初步解释。

Traits and supertraits. So what do I mean by modular vs external proofs? Well, it all comes down to who is responsible for proving that supertrait obligations hold. Consider a trait like Magic:
`trait Magic: Copy { }`
The supertrait declaration means that, whenever X: Magic for some type X, it should be true that X: Copy. We make use of this in generic functions:
`fn is_copy<T: Copy>() { }`
`fn is_magic<T: Magic>() { // Legal, because T: Magic implies T: Copy is_copy::<T>(); }`
The trick is that the compiler has to make sure that this implication holds – i.e., for every type X that implements Magic, X also implements Copy. So how does it do it?

Traits 与父 Trait。那么，我所说的模块化证明与外部证明是什么意思呢？这归根结底在于由谁负责证明父 Trait 的约束成立。考虑一个像 Magic 这样的 Trait：
`trait Magic: Copy { }`
父 Trait 的声明意味着，对于任意类型 X，只要 X: Magic，那么 X: Copy 也必须为真。我们在泛型函数中利用了这一点：
`fn is_copy<T: Copy>() { }`
`fn is_magic<T: Magic>() { // 合法，因为 T: Magic 暗示了 T: Copy is_copy::<T>(); }`
关键在于编译器必须确保这种蕴含关系成立——即对于每一个实现 Magic 的类型 X，X 也必须实现 Copy。那么它是如何做到的呢？

Modular proofs: the impl must show supertraits hold. The obvious answer is to make proving supertraits part of deciding whether an impl is valid. For any impl of Magic, we can require that the Copy supertrait holds. So an impl like this would be illegal:
`// In a modular system, this impl is *illegal*`
`impl Magic for String { }`
This impl is illegal because it would require that String: Copy, and that does not hold. Seems good.

模块化证明：实现必须证明父 Trait 成立。显而易见的答案是将父 Trait 的证明作为判定实现是否有效的一部分。对于 Magic 的任何实现，我们可以要求 Copy 父 Trait 必须成立。因此，像这样的实现将是非法的：
`// 在模块化系统中，此实现是“非法”的`
`impl Magic for String { }`
这个实现之所以非法，是因为它要求 String: Copy，而这并不成立。看起来不错。

Modular proofs are a bit tricky. I am calling these proofs modular because the idea is that we can prove an entire program is valid by proving each part of it separately. In “programming language” theory, this is typically called a “modular” check, as it works by breaking up the entire program into modules that can be independently checked. The idea with a modular proof is that we can trust impls to show that the supertrait relationships hold, we don’t have to go and re-prove them over and over. If the impl is wrong, the impl will be invalid, but our code is fine. So if we have impl Magic for String, that implies the rest of the program can prove that String: Magic:
`fn string_is_magic() { // Legal, because there is an impl for String: Magic: is_magic::<String>(); }`
In fact, since we know that Magic implies Copy, the rest of the program can even rely on impl Magic for String to conclude that String: Copy:
`fn string_is_copy() { // Legal, because there is an impl for String: Magic, // and Magic implies Copy: is_copy::<String>(); }`
So long as impl Magic for String is invalid, none of this poses a problem to soundness, since the program overall doesn’t type-check.

模块化证明有点棘手。我称这些证明为“模块化”，是因为其核心思想是我们通过分别证明程序的每个部分来证明整个程序的有效性。在“编程语言”理论中，这通常被称为“模块化”检查，因为它通过将整个程序分解为可以独立检查的模块来工作。模块化证明的理念是，我们可以信任实现能够证明父 Trait 关系成立，而不必反复重新证明它们。如果实现有误，该实现本身将无效，但我们的代码不会受到影响。因此，如果我们有 `impl Magic for String`，这意味着程序的其余部分可以证明 `String: Magic`：
`fn string_is_magic() { // 合法，因为存在 String: Magic 的实现： is_magic::<String>(); }`
事实上，由于我们知道 Magic 暗示了 Copy，程序的其余部分甚至可以依赖 `impl Magic for String` 来推断 `String: Copy`：
`fn string_is_copy() { // 合法，因为存在 String: Magic 的实现， // 且 Magic 暗示了 Copy： is_copy::<String>(); }`
只要 `impl Magic for String` 是无效的，这一切都不会对健全性（soundness）造成问题，因为整个程序将无法通过类型检查。

Comparison with functions. An easy way to understand the idea of modular checks is to think of functions. Imagine you have a function like this one:
`fn compute_sum(a: i32, b: i32) -> i32 { format!("{a} + {b}") // <-- Error }`
Clearly, this function is not legal. It takes two integers and promises to return a third integer, but in fact it returns a String. So the function is illegal. But if you have a call to that function from elsewhere, we consider that other call to be legal:
`fn use_sum() { let c: i32 = compute_sum(2, 20); // OK }`
Here, use_sum is relying on compute_sum to obey its contract. It’s not the job of use_sum to check that, it can just assume it is true.

与函数的比较。理解模块化检查概念的一个简单方法是思考函数。想象你有一个这样的函数：
`fn compute_sum(a: i32, b: i32) -> i32 { format!("{a} + {b}") // <-- 错误 }`
显然，这个函数是不合法的。它接收两个整数并承诺返回第三个整数，但实际上它返回了一个 String。因此该函数是非法的。但是，如果你在其他地方调用该函数，我们认为该调用是合法的：
`fn use_sum() { let c: i32 = compute_sum(2, 20); // OK }`
在这里，`use_sum` 依赖于 `compute_sum` 遵守其契约。检查契约并非 `use_sum` 的工作，它可以直接假设其为真。

The catch: how do we decide the impl is invalid. There is a bit of a catch though. How do we decide if the impl is invalid? The basic idea was that impl Magic for String would have to prove that String: Copy. But we just saw that it could, in fact, do that by using itself. In other words, if we aren’t careful, we can provide a proof that String: Copy like… String: Copy because Magic implies Copy and String: Magic because impl Magic for String exists and then we would (incorrectly) conclude that the impl is valid. So clearly we need to do something to rule that out. We need a rule that says, when we are proving that an impl is valid, that proof cannot recursively rely on the impl itself. I’ll come back in a future post to ways we might do that, but for now, I want to explore another alternative.

问题所在：我们如何判定实现无效。不过这里有一个陷阱。我们如何判定实现是无效的呢？基本思路是 `impl Magic for String` 必须证明 `String: Copy`。但我们刚刚看到，它实际上可以通过使用自身来做到这一点。换句话说，如果我们不小心，我们可能会提供一个证明，例如：因为 Magic 暗示 Copy，所以 `String: Copy`；又因为存在 `impl Magic for String`，所以 `String: Magic`。这样我们就会（错误地）得出该实现有效的结论。因此，显然我们需要采取措施排除这种情况。我们需要一条规则：当我们证明一个实现有效时，该证明不能递归地依赖于实现本身。我将在未来的文章中探讨实现这一目标的方法，但现在，我想探索另一种替代方案。

External proofs: the user of the impl must show supertraits hold. When we first looked at this problem, way back in 2018 or so, we thought of another approach. What if we said that an impl is not responsible for proving supertraits. Instead, the idea would be that impl Magic for String is not enough to say that String: Magic. It only says that Shallow(String: Magic) – i.e., String implements Magic in a shallow way, but not in a deep way that includes the full supertraits. To prove that String: Magic, we have to show that Shallow(String: Magic) and Shallow(String: Copy):
`Shallow(String: Magic) Shallow(String: Copy)`
`----------------------------`
`Magic fully implemented String: Magic`
This has the somewhat counterintuitive implication that impl Magic for String is actually legal in an “external proof” approach:
`// In an external system, this impl is LEGAL // (but unusable)`
`impl Magic for String { }`
The saving grace is that, while this impl is legal, you can’t actually use it. This function for example does not compile:
`fn string_is_magic() { // NOT legal in an external system: // * We can prove that Shallow(String: Magic) // * We CANNOT prove that Shallow(String: Copy). is_magic::<String>(); }`
Here, String: Magic doesn’t hold even though there is an impl of Magic for String, because the caller also has to check that String: Copy is implemented, and it is not. Huh,

外部证明：实现的使用者必须证明父 Trait 成立。当我们最初在 2018 年左右研究这个问题时，我们想到了另一种方法。如果我们说实现本身不负责证明父 Trait 会怎样？相反，其理念是 `impl Magic for String` 不足以说明 `String: Magic`。它只说明了 `Shallow(String: Magic)`——即 String 以一种浅层方式实现了 Magic，但并未以包含完整父 Trait 的深层方式实现。要证明 `String: Magic`，我们必须证明 `Shallow(String: Magic)` 和 `Shallow(String: Copy)`：
`Shallow(String: Magic) Shallow(String: Copy)`
`----------------------------`
`Magic 完全实现 String: Magic`
这产生了一个有些反直觉的含义，即在“外部证明”方法中，`impl Magic for String` 实际上是合法的：
`// 在外部系统中，此实现是合法的 // （但不可用）`
`impl Magic for String { }`
值得庆幸的是，虽然这个实现是合法的，但你实际上无法使用它。例如，这个函数无法编译：
`fn string_is_magic() { // 在外部系统中不合法： // * 我们可以证明 Shallow(String: Magic) // * 我们无法证明 Shallow(String: Copy)。 is_magic::<String>(); }`
在这里，尽管存在 `impl Magic for String`，但 `String: Magic` 并不成立，因为调用者还必须检查 `String: Copy` 是否已实现，而事实并非如此。哈。