---
title: "Claude reveals ECDSA curve origins"
originalUrl: "https://www.anthropic.com/research/ecdsa-curve-origins"
date: "2026-10-16T18:55:59.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# Claude reveals ECDSA curve origins

“It’s just timestamps”: the decades-old mystery of the origins of one of the most popular cryptographic standards has been explained. We pursued this long-standing open question of the cryptographic community to settle concerns about ECDSA, which is one of our most widely used cryptographic standards. Readers should take this as a fun closing chapter and the end of years of speculation. There is no action to be taken or things to do differently. Most researchers trusted the curves already. Enjoy.

“这只是时间戳而已”：困扰密码学界数十年的最流行加密标准之一的起源之谜终于被解开了。我们追寻这一长期悬而未决的问题，旨在消除人们对 ECDSA 的疑虑，它是我们应用最广泛的加密标准之一。读者可以将此视为一个有趣的终章，为多年的猜测画上句号。无需采取任何行动，也无需改变任何做法。大多数研究人员此前就已经信任这些曲线了。请尽情阅读。

ECDSA is the most widely used elliptic curve cryptography standard. It was adopted by NIST in 2000 as part of the FIPS 186-2 Digital Signature Standard which lists a set of standard elliptic curves of varying sizes and security levels. For curves over prime and binary fields, the specifications published a “seed” parameter whose hash value is used to define the coefficient b of the curve. The provenance of these seeds has been a long-standing question, as they were provided by the NSA with no explanation or justification. As an example, the NIST P-256 curve seed was SEED = C49D3608 86E70493 6A6678E1 139D26B7 819F7E90 with no information where it came from.

ECDSA 是应用最广泛的椭圆曲线加密标准。它于 2000 年被 NIST 采纳，作为 FIPS 186-2 数字签名标准的一部分，该标准列出了一系列不同大小和安全级别的标准椭圆曲线。对于素域和二元域上的曲线，规范中发布了一个“种子”参数，其哈希值用于定义曲线的系数 b。这些种子的来源一直是一个长期存在的问题，因为它们由美国国家安全局（NSA）提供，且没有任何解释或说明。例如，NIST P-256 曲线的种子为 SEED = C49D3608 86E70493 6A6678E1 139D26B7 819F7E90，但没有任何关于其来源的信息。

Neal Koblitz and Alfred Menezes wrote an excellent summary on this controversy, “A Riddle Wrapped in an Enigma”, which discusses the history and concerns around the seed values. This mystery led to an amateur investigation into the origin of the seeds and a bounty for anyone who could find them. The best story was that Jerry Solinas, longtime NSA employee, generated the seeds using a hash of a humorous passphrase: “I believe there was a counter rather than multiple hashing, but I don’t know details. The message was along the lines of ‘Give Bob and Jerry a raise’ or ‘Bob and Jerry rule’ or something like that. It was Bob Reiter who actually wrote the code, and he doesn’t remember the details either. Nor were we able to find archives from so long ago. If they exist, they are no doubt sitting on a hard drive near the Ark of the Covenant.” — Jerry Solinas, 2015

Neal Koblitz 和 Alfred Menezes 针对这一争议撰写了一篇出色的总结《包裹在谜团中的谜题》，讨论了围绕这些种子值的历史和担忧。这个谜团引发了业余爱好者对种子起源的调查，甚至有人悬赏寻找答案。流传最广的故事是，长期在 NSA 工作的 Jerry Solinas 使用一个幽默短语的哈希值生成了这些种子：“我相信当时用的是计数器而不是多次哈希，但我不知道细节。信息内容大概是‘给 Bob 和 Jerry 加薪’或‘Bob 和 Jerry 说了算’之类的。实际上是 Bob Reiter 编写的代码，他也不记得细节了。我们也无法找到那么久远的存档。如果它们存在，毫无疑问正躺在某个靠近约柜的硬盘里。”—— Jerry Solinas，2015 年

Unfortunately, Jerry died in 2023 and other colleagues at the time were not responsive, leaving open the question of how these seeds were originally derived. Claude found the seeds. Several Anthropic employees had unsuccessfully chased the seeds following the tip about it being a hash of a humorous phrase. That turned out to be wrong. In October 2026, a curious Anthropic employee asked an internal research model if it could figure out how those seeds were generated without pointing at the clue.

遗憾的是，Jerry 于 2023 年去世，当时的其他同事也没有回应，这使得这些种子最初是如何推导出来的问题悬而未决。Claude 找到了这些种子。几名 Anthropic 员工曾根据“幽默短语哈希值”的线索追踪这些种子，但均未成功。事实证明那个线索是错误的。2026 年 10 月，一名好奇的 Anthropic 员工询问内部研究模型，看它是否能在不参考该线索的情况下找出这些种子的生成方式。

In under half an hour, Claude discovered the origins of the NIST P-192, P-224, P-256, P-384 and P-521 seeds. None of them were the results of any hash algorithm at all, but rather the output of the C library’s lrand48 random-number generator, seeded with a Unix timestamp! The algorithm used would sample bytes from the random number generator (RNG) initialized by a Unix timestamp (t) for some number of iterations (n). Each iteration would draw 20 bytes as a candidate seed. So, the first 20 bytes are candidate 1, the next 20 bytes are candidate 2, and so on. For example, P-256 required 1842 iterations to output the standardized seed.

在不到半小时的时间里，Claude 发现了 NIST P-192、P-224、P-256、P-384 和 P-521 种子的起源。它们根本不是任何哈希算法的结果，而是 C 语言库中 lrand48 随机数生成器的输出，且该生成器由 Unix 时间戳作为种子！所使用的算法会从由 Unix 时间戳 (t) 初始化的随机数生成器 (RNG) 中采样字节，并进行一定次数 (n) 的迭代。每次迭代会提取 20 个字节作为候选种子。因此，前 20 个字节是候选 1，接下来的 20 个字节是候选 2，依此类推。例如，P-256 需要 1842 次迭代才能输出标准化的种子。

What this means: This is not a cryptographic break, new attack, or weakness in the ECDSA curves. In fact, this makes us more confident the curves were chosen without any backdoors or intentional weaknesses. For many years, people have been suspicious of the origins of the NIST curve parameters. They were presented to NIST without any mention of how they were chosen, leaving people wondering if they may have been chosen to have deliberate backdoors in them. These findings make that much less plausible. The seeds were generated in a very simple way: a common pseudorandom number generator initialized from the clock, which anyone can now reproduce. That leaves much less room for subversion and that we can be confident the parameters are secure.

这意味着什么：这并非密码学上的破解、新攻击或 ECDSA 曲线的弱点。事实上，这让我们更加确信这些曲线的选择不存在任何后门或蓄意的弱点。多年来，人们一直怀疑 NIST 曲线参数的起源。它们被提交给 NIST 时没有提及选择方式，这让人们怀疑它们是否被刻意植入了后门。这些发现使得这种可能性大大降低。这些种子是以一种非常简单的方式生成的：由时钟初始化的通用伪随机数生成器，现在任何人都可以复现。这大大减少了被篡改的空间，我们可以确信这些参数是安全的。

How it was found: Searches for the phrase, built from the rumors, had come up empty. Claude tried a different angle: anticipating how the software that generated the curves must have worked. Claude guessed the software used a pseudorandom number generator (PRNG) that shipped with 1990s C libraries. These old PRNGs are weak enough that their output can be recognized. Recognizing that output would reveal which PRNG was used and possibly allow recovery of its initialization state. Claude wrote a scanner that slid along each published seed one bit at a time and tested whether adjacent chunks were consecutive outputs of a 1990s-vintage generator.

如何发现的：基于传言的短语搜索一无所获。Claude 尝试了另一个角度：预判生成这些曲线的软件是如何工作的。Claude 推测该软件使用了 20 世纪 90 年代 C 语言库中自带的伪随机数生成器 (PRNG)。这些旧的 PRNG 非常脆弱，其输出可以被识别。识别出这些输出将揭示使用了哪种 PRNG，并可能允许恢复其初始化状态。Claude 编写了一个扫描器，沿着每个已发布的种子逐位滑动，并测试相邻的数据块是否为 90 年代生成器的连续输出。

The scan covered 34 combinations of generator and output slices. At that point, Claude noticed a pattern in the top bits for some seeds: they were all zero. Written as five 32-bit words, four of the ten seeds have a 0 in the top bit for all 20 words. That would happen by chance with probability 1/5810. That was a signature of the linear congruential generator lrand48, which only returns the top 31 bits of a 48-bit state. The pattern is visible by eye once you know to look for it. To recover the state, Claude took the first word, tried all 2¹⁷ values of the 17 hidden bits, and checked that the next four words followed. That worked for all four seeds under discussion.

扫描涵盖了 34 种生成器和输出切片的组合。此时，Claude 注意到某些种子的最高位存在一种模式：它们全为零。以五个 32 位字书写时，十个种子中有四个在所有 20 个字的最高位上都有 0。这种情况偶然发生的概率为 1/5810。这是线性同余生成器 lrand48 的特征，它只返回 48 位状态中的最高 31 位。一旦你知道去观察，这种模式肉眼可见。为了恢复状态，Claude 取了第一个字，尝试了 17 个隐藏位的所有 2¹⁷ 种值，并检查接下来的四个字是否符合。这对于所讨论的所有四个种子都奏效了。

The prime-curve seeds came from the same lrand48 generator but kept fewer bits of each output. Claude had to recover the internal state of the PRNG from those bits. It turns out recovering the state of a truncated linear congruential generator is a textbook lattice problem, solved with the Lenstra–Lenstra–Lovász (LLL) basis reduction algorithm. Claude didn't know which bits of the state the seeds might show, so it ran the solver over every window. Five NIST prime-curve seeds plus five more from the ANSI X9.62 standard all had the same pattern: lrand48() >> 23. Each recovered 48-bit state regenerates all 160 bits of its seed, which does not happen by chance. This linear congruential generator runs

素数曲线的种子来自同一个 lrand48 生成器，但保留了每个输出中较少的位数。Claude 必须从这些位中恢复 PRNG 的内部状态。事实证明，恢复截断线性同余生成器的状态是一个教科书式的格问题，可以通过 Lenstra–Lenstra–Lovász (LLL) 基约简算法解决。Claude 不知道种子可能显示状态的哪些位，因此它在每个窗口上运行了求解器。五个 NIST 素数曲线种子加上 ANSI X9.62 标准中的另外五个种子都具有相同的模式：lrand48() >> 23。每个恢复的 48 位状态都能重新生成其全部 160 位种子，这绝非偶然。该线性同余生成器运行