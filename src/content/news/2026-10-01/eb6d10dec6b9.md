---
title: "Finding Bugs"
originalUrl: "https://matklad.github.io/2026/09/19/finding-bugs.html"
date: "2026-10-01T00:53:08.899Z"
---

# Finding Bugs / 寻找 Bug

Are generative (randomized) tests significantly more effective than example-based unit-tests at discovering bugs? There’s an interesting discussion about this on lobste.rs. One argument in favor of unit tests is, paraphrasing My generic fuzzer wasn’t able to find this tricky bug in Rust regex crate. To me, it seems that generative testing should shake out that particular creature, so I wrote a lil fuzzer of my own, and it indeed discovered another bug in that version of regex, and then the one I was after. I didn’t find anything in the latest version.

生成式（随机）测试在发现 Bug 方面是否比基于示例的单元测试更有效？Lobste.rs 上对此有一个有趣的讨论。支持单元测试的一个论点是（意译）：我的通用模糊测试器（fuzzer）没能发现 Rust `regex` crate 中的这个棘手 Bug。在我看来，生成式测试应该能揪出那个“小怪物”，所以我写了一个自己的小型模糊测试器，它确实发现了该版本 `regex` 中的另一个 Bug，随后也找到了我想要找的那个。我在最新版本中没有发现任何问题。

I like to do a write up about the process, as it is a good case study for how one approaches a problem like this. I want to be extra clear that my argument is very weak here, as I know exactly the bug I am after, and I even know that fuzzers can find it. My primary goal is to teach you the techniques, leaving it to your judgment just how effective they are. That being said, I think finding a second bug validates the approach somewhat.

我想写一篇文章来记录这个过程，因为它是一个很好的案例研究，展示了人们如何处理这类问题。我需要特别说明的是，我的论点在这里非常薄弱，因为我确切地知道我在寻找什么 Bug，甚至知道模糊测试器可以找到它。我的主要目标是教授这些技术，至于它们有多有效，留给你们自己去判断。话虽如此，我认为发现第二个 Bug 在一定程度上验证了这种方法。

I also want to emphasize that writing fuzzers to find known bugs is far from an idle amusement. While I believe that generative testing is very powerful, relative to its cost, it’s always a question whether a particular test is thorough enough. And it never is, you will find more bugs elsewhere (that’s why defense in depth and runtime mitigations are critical). And, whenever you have a pest that dodged your fuzzers, your first order of business is to treat this event as a bug in the fuzzer, and change it so that it can find this and related bugs. Only then you are allowed to add a fix and a unit test!

我还想强调，编写模糊测试器来寻找已知的 Bug 绝非闲暇消遣。虽然我相信生成式测试相对于其成本而言非常强大，但某个特定的测试是否足够彻底始终是个问题。它永远不够彻底，你总会在其他地方发现更多的 Bug（这就是为什么纵深防御和运行时缓解措施至关重要）。而且，每当你遇到一个躲过了模糊测试器的“害虫”时，你的首要任务是将此事件视为模糊测试器本身的 Bug，并对其进行修改，以便它能发现这类及相关的 Bug。只有在那之后，你才被允许添加修复代码和单元测试！

### The Bug / 这个 Bug

For ".abb|b" regex and "zabb" input, an older version of regex crate returned `b` as the first match, which is incorrect, because the entire `zabb` matches:

对于正则表达式 `.abb|b` 和输入 `zabb`，旧版本的 `regex` crate 返回 `b` 作为第一个匹配项，这是不正确的，因为整个 `zabb` 都能匹配上：

```rust
use regex;
fn main() {
    let r = regex::Regex::new(".abb|b").unwrap();
    let m = r.find("zabb").unwrap();
    // Fails with regex-automata=0.4.15:
    assert_eq!(m.as_str(), "zabb")
}
```

How do we find this, or something like this? Regular expression engines are one of the easiest things to apply generative testing to, they are pure algorithms. While few large systems are just an algorithm, algorithms are everywhere inside components of interesting systems, so this is a hands-on knowledge. And by far the most important technique for testing algorithms is to compare with the known right answer, with an oracle. Implement both O(N log N) and O(N^2) versions of the algorithm, and match the answers.

我们该如何发现这个或类似的 Bug 呢？正则表达式引擎是最容易应用生成式测试的对象之一，因为它们是纯算法。虽然很少有大型系统仅仅是一个算法，但算法存在于各种有趣系统的组件中，因此这是一项实用的知识。测试算法最重要的方法莫过于使用“预言机”（oracle）与已知的正确答案进行比对。实现 O(N log N) 和 O(N^2) 两个版本的算法，并匹配它们的答案。

To be fair, the original comment mentioned that the their fuzzer didn’t find the issue because they didn’t have access to an oracle. However, if you are designing a reliable system, it’s part of your job to ensure it has an oracle! One of the first things we did for our Jepsen test at TigerBeetle was to expose internal timestamps via API, to make it easier for Jepsen to find bugs (TigerBeetle is co-designed with its internal simulator VOPR which naturally has access to timestamps and anything else).

公平地说，最初的评论提到他们的模糊测试器没有发现这个问题，是因为他们无法访问预言机。然而，如果你正在设计一个可靠的系统，确保它拥有预言机是你的工作职责之一！我们在 TigerBeetle 进行 Jepsen 测试时做的第一件事，就是通过 API 暴露内部时间戳，以便 Jepsen 更容易发现 Bug（TigerBeetle 是与其内部模拟器 VOPR 共同设计的，VOPR 自然可以访问时间戳及其他任何信息）。

And for, a regex engine, coming up with an oracle shouldn’t be hard, as they typically already come with multiple specialized implementations under a single facade, and the implementations can be cross-checked against each other. But the regex case is even simpler (which makes it an excellent case study). There’s `regex_lite` crate that provides the same API. So here’s a plan: generate a regular expression, an input text, and check that `regex` and `regex_lite` give identical answers.

对于正则表达式引擎来说，找到一个预言机并不难，因为它们通常已经在单一接口下提供了多种专门的实现，这些实现可以相互交叉验证。但正则表达式的情况甚至更简单（这使它成为一个极好的案例研究）。有一个 `regex_lite` crate 提供了相同的 API。所以计划如下：生成一个正则表达式和一个输入文本，然后检查 `regex` 和 `regex_lite` 是否给出相同的答案。

### Generating a String / 生成字符串

I’ll start with code that generates a random string, as it is simpler, but still shows some non-trivial ideas. First, we’ll need a random number generator: `use fastrand::Rng;`

我将从生成随机字符串的代码开始，因为它更简单，但仍然展示了一些非平凡的思路。首先，我们需要一个随机数生成器：`use fastrand::Rng;`

There are fancier techniques, which can give you test-case minimization, exhaustive search, or coverage guided exploration, but the insight is that even a humble PRNG is brutally effective, if you put it to good use. When you start with randomized testing, the instinct is to generate something big, no, HUGE! Surely regex will choke on 5 GiBs of input? This is usually a wrong call. Bugs usually involve small, but tricky examples, weaponizing interactions between a few features. A string where all characters are the same is more likely to trigger a bug than a purely random string where every character is unique.

有一些更高级的技术可以提供测试用例最小化、穷举搜索或覆盖率引导的探索，但核心洞察在于：即使是一个简单的伪随机数生成器（PRNG），如果使用得当，也会非常有效。当你开始随机测试时，直觉往往是生成一些巨大的东西，不，是超巨大的！正则表达式肯定会被 5 GiB 的输入搞崩溃吧？这通常是错误的判断。Bug 通常涉及小巧但棘手的示例，利用少数几个功能之间的相互作用。由相同字符组成的字符串比每个字符都唯一的纯随机字符串更容易触发 Bug。

So my default approach to generating strings is this. First, I fix the alphabet of possible characters. A nice way to get one is to sort | unique all the unit tests. Then, for each particular string, I pick a subset of that alphabet. I want strings that use all the characters, but I also want long strings with only a and b! Then I generate a string using the given subset of the alphabet, where the length of the string is also picked at random. To make fuzzing efficient, I want to keep each iteration as fast as possible, so I make sure to re-use the memory across iterations, static allocation in the small:

因此，我生成字符串的默认方法如下：首先，我确定可能的字符集（字母表）。获取字符集的一个好方法是对所有单元测试中的字符进行排序并去重。然后，对于每个特定的字符串，我从该字符集中选择一个子集。我既想要使用所有字符的字符串，也想要只包含 'a' 和 'b' 的长字符串！然后，我使用给定的字符子集生成字符串，字符串的长度也是随机选择的。为了提高模糊测试的效率，我希望每次迭代尽可能快，所以我确保在迭代之间重用内存，即小规模的静态分配：

```rust
use fastrand::Rng;

fn main() {
    let mut rng = Rng::new();
    // Re-use the same memory for all tests.
    let mut text_alphabet: Vec<u8> = vec![];
    let mut text: Vec<u8> = vec![];
    for _ in 0..1_000_000 {
        // It's unlikely that a counter example with
        // 7 different letters exists, while there
        // isn't one with just 6.
        alphabet_swarm(&mut rng, b"abcdef", &mut text_alphabet);
        let text = gen_string(&mut rng, &text_alphabet, &mut text);
    }
}

fn alphabet_swarm<'a>(
    rng: &mut Rng,
    all: &[u8],
    pick: &'a mut Vec<u8>,
) {
    pick.clear();
    pick.extend(all);
    rng.shuffle(pick);
    let count = rng.usize(1..=pick.len());
    pick.truncate(count);
}

fn gen_string<'a>(
    rng: &mut Rng,
    alphabet: &[u8],
    result: &'a mut Vec<u8>,
) -> &'a str {
    result.clear();
    // Again, this is a short string.
    // Longer failures are not likely.
    let count = rng.usize(0..8);
    for _ in 0..count {
        result.push(alphabet[rng.usize(0..alphabet.len())]);
    }
    str::from_utf8(result).unwrap()
}
```

There’s a nice way to think about this two step process, generating alphabet first, and then generating a string. To generate a string, you need a distribution of characters. You can use the sam...

这种两步走的过程（先生成字符集，再生成字符串）是一个很好的思路。要生成字符串，你需要一个字符分布。你可以使用相同的……