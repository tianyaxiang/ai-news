---
title: "FLT: Anthropic has beaten me to it"
originalUrl: "https://xenaproject.wordpress.com/2026/09/04/flt-anthropic-has-beaten-me-to-it/"
date: "2026-09-04T23:12:24.090Z"
---

# FLT: Anthropic has beaten me to it
# 费马大定理：Anthropic 抢先了一步

I guess technically it was revealed to the world by a coffee shop in Islington on Insta, but an hour later it was officially announced by Anthropic: one of their internal models, using the prove2.me platform, has formalized a complete proof of Fermat’s Last Theorem (FLT) in Lean. This is the final theorem to be formalized in Freek Wiedijk’s famous list of 100 formalization challenges and thus wraps up this 20-year-old benchmark. Congratulations to Anthropic!

我想从技术上讲，这个消息最初是由伊斯灵顿（Islington）的一家咖啡馆在 Instagram 上泄露出来的，但一小时后，Anthropic 官方正式宣布：他们内部的一个模型利用 prove2.me 平台，在 Lean 中完成了费马大定理（FLT）的完整形式化证明。这是 Freek Wiedijk 著名的 100 个形式化挑战清单中最后一个被形式化的定理，从而终结了这个长达 20 年的基准测试。祝贺 Anthropic！

### Mathematical details
### 数学细节

The proof is not the modern proof which I have been formalizing myself following ideas of Khare, Taylor etc, but the Darmon–Diamond–Taylor exposition from 1995 of the Wiles–Taylor–Wiles argument, via the Langlands–Tunnell theorem and Ribet’s level-lowering theorem. Anthropic’s repository develops Fontaine theory (to study flat deformations of Galois representations) and develops enough of Mazur’s work on the Eisenstein ideal to conclude that no Frey curve can have a point of order 3. This means that their FLT proof only works for $p > 3$, however FLT was already formalized for odd regular primes by Best-Birkbeck-Brasca-Rodriguez, and the smallest irregular prime is 37, so it’s all good.

该证明并非我本人一直在根据 Khare、Taylor 等人的思想进行形式化的现代证明，而是采用了 1995 年 Darmon–Diamond–Taylor 对 Wiles–Taylor–Wiles 论证的阐述，即通过 Langlands–Tunnell 定理和 Ribet 的降阶定理（level-lowering theorem）。Anthropic 的代码库发展了 Fontaine 理论（用于研究伽罗瓦表示的平坦变形），并充分发展了 Mazur 关于艾森斯坦理想（Eisenstein ideal）的工作，从而得出结论：没有任何 Frey 曲线可以具有 3 阶点。这意味着他们的 FLT 证明仅适用于 $p > 3$ 的情况。不过，Best-Birkbeck-Brasca-Rodriguez 已经完成了对奇正则素数的 FLT 形式化，而最小的非正则素数是 37，所以一切都没问题。

### The code base
### 代码库

I’ve compiled the code base and run comparator on it — it checks out. It is a gigantic proof (over 13.4 million lines of code) and takes nearly 20 times as long to compile as Lean’s mathematics library (on a machine with 96 cores!). Lean can be sluggish when jumping from file to file on a repo of this size (even on a machine with 500G of ram, which Anthropic also gave me access to), but Anthropic also supplied me with some html documents which are easier in practice to explore (clone the repo and open with a web browser).

我已经编译了代码库并运行了比较器——结果验证通过。这是一个庞大的证明（超过 1340 万行代码），编译时间几乎是 Lean 数学库的 20 倍（在拥有 96 个核心的机器上！）。在如此规模的仓库中，Lean 在文件间跳转时可能会变得迟缓（即使是在 Anthropic 提供给我的拥有 500G 内存的机器上也是如此），但 Anthropic 还提供了一些 HTML 文档，在实践中更容易浏览（克隆仓库并用网页浏览器打开即可）。

### What this work is, and is not
### 这项工作的意义与局限

I am currently being funded by the EPSRC to formalize a proof of Fermat’s Last Theorem, and a naive reaction to the news above is that I no longer have any work to do. This is not the case. The work certainly achieves some of the aims of the EPSRC project, and indeed it goes much further in terms of what is formalized (I only promised the EPSRC that I would reduce FLT to the 1980s; this repo proves the whole thing). But I also promised several other things to EPSRC: firstly, that I would be making pull requests to Lean’s mathematics library, adding fundamental objects from modern number theory; this is ongoing. And secondly, and perhaps most importantly, that I would be creating a dynamic document enabling humans to explore the modern proof. My guess is that it is unlikely that Anthropic are going to do this; they will feel that their job is done with the formalization (and they did not formalize the modern proof anyway).

我目前正接受 EPSRC 的资助来形式化费马大定理的证明，对上述新闻的一种天真反应是我已经无事可做了。事实并非如此。这项工作确实实现了 EPSRC 项目的部分目标，而且在形式化内容上走得更远（我只向 EPSRC 承诺将 FLT 归约到 20 世纪 80 年代的水平；而这个仓库证明了整个定理）。但我还向 EPSRC 承诺了其他几件事：首先，我将向 Lean 的数学库提交拉取请求（PR），添加现代数论中的基本对象；这正在进行中。其次，也许最重要的是，我将创建一个动态文档，使人类能够探索现代证明。我猜 Anthropic 不太可能会做这件事；他们会认为他们的工作在完成形式化后就结束了（而且他们无论如何也没有形式化现代证明）。

Note that mathematically this work of anthropic tells us essentially nothing: I am on record as saying that I am 99.9% sure that the proof of FLT is OK, and most people in the number theory community are 100% sure (formalization has made me more paranoid about the mathematical literature than most). From my understanding of the argument, the formalization just faithfully follows the early literature on the proof and adds nothing. What this work does tell us, however, is what is possible in the field of autoformalization. If thousands of pages of the literature can be formalized end-to-end by some kind of AI swarm in an 11 day period now, then in the future we will start to see formalization of modern research being done on the fly. We will also learn whether my paranoia about the current state of the Langlands program is justified, as machines check it and ruthlessly flag arguments which are incomplete. The ability to autoformalize hard material will ultimately make the review process for mathematics papers far less painful. It will also keep us honest — there are papers out there which assume results which are “known to the experts” and it will be interesting to see exactly what is being assumed in the proofs of various important results in my field. This is why I am so excited about the news! I was given £1M to run my project over 5 years; Anthropic took only 11 days but I do wonder if they spent more money…

请注意，从数学角度来看，Anthropic 的这项工作本质上没有告诉我们任何新东西：我曾公开表示，我有 99.9% 的把握确定 FLT 的证明是正确的，而数论界的大多数人有 100% 的把握（形式化让我比大多数人对数学文献更加偏执）。据我对该论证的理解，这种形式化只是忠实地遵循了关于该证明的早期文献，并没有增加任何新内容。然而，这项工作确实告诉了我们自动形式化领域可能实现的目标。如果现在某种 AI 集群能在 11 天内将数千页的文献进行端到端的形式化，那么未来我们将开始看到现代研究的即时形式化。我们也将了解到我对朗兰兹纲领（Langlands program）现状的偏执是否合理，因为机器会对其进行检查，并无情地标记出不完整的论证。自动形式化高难度材料的能力最终将使数学论文的审稿过程变得不再那么痛苦。它也将使我们保持诚实——现有的论文中有些假设了“专家已知”的结果，看看我所在领域各种重要结果的证明中到底假设了什么，将会是一件很有趣的事情。这就是我为何对这个新闻如此兴奋的原因！我获得了 100 万英镑的资助来开展为期 5 年的项目；Anthropic 只用了 11 天，但我确实想知道他们是否花了更多的钱……

### An anecdote
### 一则轶事

Thought it might be nice to finish with a personal anecdote. Wiles announced his proof of FLT at the Newton Institute in 1993 in a series of three lectures; I attended the first (I was a second year graduate student at the time) and I found it completely incomprehensible, so I skipped the next two lectures and went on holiday to Ireland with my new girlfriend instead; I was so in love that I totally forgot about the rumours, and it was only when I came back to Cambridge a week later that I heard the news that the theorem was proved. Something strangely similar happened here; when I got the email from Anthropic I was in Wales at the Green Man music festival with the same girlfriend, but with very poor phone reception; I did spot an email from someone I’d never heard of in a brief moment of 4G, with title “End-to-end Lean formalization of Fermat’s Last Theorem”, but wrote them off as a crank! It was only a week later when going through the nearly 1000 unread emails which had accrued whilst I was away, that I heard the news.

我想以一则个人轶事作为结尾。怀尔斯（Wiles）于 1993 年在牛顿研究所通过三场讲座宣布了他的 FLT 证明；我参加了第一场（当时我是一名二年级研究生），觉得完全听不懂，于是我跳过了后两场讲座，和我的新女友去爱尔兰度假了；我当时沉浸在爱河中，完全忘记了那些传言，直到一周后回到剑桥，我才听到定理已被证明的消息。这次发生了一些惊人相似的事情；当我收到 Anthropic 的邮件时，我正和同一个女友在威尔士参加 Green Man 音乐节，但手机信号非常差；在 4G 信号短暂出现的一瞬间，我确实看到了一封来自我从未听说过的人的邮件，标题是“费马大定理的端到端 Lean 形式化”，但我当时以为那是骗子！直到一周后，当我处理离开期间积攒的近 1000 封未读邮件时，我才得知了这个消息。