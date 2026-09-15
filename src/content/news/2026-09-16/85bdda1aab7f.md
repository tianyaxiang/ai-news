---
title: "A Gate The Model Writes Is A Gate The Model Loosens"
originalUrl: "https://dev.to/alaintural/a-gate-the-model-writes-is-a-gate-the-model-loosens-4p04"
date: "2026-09-15T23:42:57.300Z"
---

# A Gate The Model Writes Is A Gate The Model Loosens
# 模型编写的关卡，就是模型会放水的关卡

Three ways our automated quality checks passed while the work was broken. Our production line runs in stages with quality gates between them. Research, build, review, publish. A stage cannot advance until its gate returns green. That architecture is correct and I would build it again. It also gave me the three most expensive failures of the year, all of the same shape: the gate was green and the work was wrong.
我们的自动化质量检查在工作出错时却显示通过，这种情况发生了三次。我们的生产线分阶段运行，各阶段之间设有质量关卡：研究、构建、审查、发布。只有当关卡显示绿色（通过）时，流程才能进入下一阶段。这种架构是正确的，我依然会选择它。但它也给我带来了今年最昂贵的三次失败，且模式如出一辙：关卡显示通过，但工作内容却是错误的。

One: the gate could not see the data. We had a check that verified our published archive for anachronism, meaning an article dated before a tool existed cannot mention that tool. It returned clean. Clean meant nothing, because I had not verified that the check could match anything at all. When I instrumented it, the term table did match: 26 terms and over 340 occurrences across the corpus, with no violations. That was a real pass. But it was luck that I checked, and a green light from a rule that cannot see the data is worse than no rule, because it stops you looking. The gate now warns when zero terms match. A check that finds nothing has to say whether it found nothing or saw nothing.
第一：关卡“看不见”数据。我们曾有一项检查，用于验证已发布存档是否存在时代错误，即早于某工具发布日期的文章不得提及该工具。检查结果显示“无异常”。但“无异常”毫无意义，因为我并未验证该检查是否真的匹配到了任何内容。当我对其进行监测时，术语表确实匹配到了：语料库中共有 26 个术语，出现了 340 多次，且均无违规。那是一次真正的通过。但那纯属侥幸，因为一个无法读取数据的规则所给出的绿灯，比没有规则更糟糕，因为它会让你停止排查。现在，如果匹配到的术语为零，关卡会发出警告。一项什么都没发现的检查，必须明确告知它是“确实没发现内容”还是“根本没看到内容”。

Two: the gate had a rule that rewarded gaming. An early quality gate asked whether the output existed and had the required sections. Output always existed. Sections always appeared. The gate was satisfiable by producing the shape of the work rather than the work. When a model writes its own gate, this is the default outcome, not the edge case. The gate gets written to be passable, because passing is the visible objective. We changed how we test gates. Every gate now gets a deliberate violation injected before we trust it. If the red light does not come on, the gate does not exist. The anachronism check above was verified that way: a fabricated article dated January 2024 mentioning a model released in August 2025, plus a link pointing forward in time. Both rules fired, exit code 1.
第二：关卡规则鼓励了“钻空子”。早期的质量关卡会检查输出是否存在以及是否包含必要章节。输出总是存在的，章节也总是有的。只要产出工作的“形式”而非“实质”，就能满足关卡要求。当模型编写自己的关卡时，这是默认结果，而非极端情况。关卡被编写成“易于通过”的样子，因为通过本身就是显而易见的目标。我们改变了测试关卡的方式。现在，在信任任何关卡之前，我们都会人为注入一个违规项。如果红灯没亮，就说明该关卡形同虚设。上述的时代错误检查就是这样验证的：我们伪造了一篇日期为 2024 年 1 月的文章，文中提到了 2025 年 8 月才发布的模型，并加入了一个指向未来的链接。两条规则均触发了报警，退出代码为 1。

Three: the counter said there was capacity. Our pipeline tracks engine quota locally so it can pick a lane. The counter said capacity was available. The engine had been failing silently for some time, and the pipeline kept assigning work into a lane that could not run it. A local counter is a model of a remote system, and the model drifts. Any counter maintained on your side of a network boundary needs to be reconciled against the thing it claims to describe, or it will report health for a dead component.
第三：计数器显示仍有容量。我们的流水线在本地跟踪引擎配额，以便选择处理通道。计数器显示容量充足。但引擎实际上已经静默故障了一段时间，而流水线却不断将任务分配给无法运行它的通道。本地计数器是对远程系统的一种建模，而模型会产生偏差。任何在网络边界一侧维护的计数器，都必须与它所描述的对象进行核对，否则它就会为一个已经宕机的组件报告“健康”状态。

What these have in common. None of these failures were visible in the output at the moment they happened. They were visible only in the distance between what the check claimed and what the check could actually observe. If you take one thing from this: a rule being written down is not the same as a rule being enforced, and the only way to know which one you have is to break it on purpose and watch what the system does.
这些问题的共同点在于：在故障发生的瞬间，输出结果中都看不出任何异常。它们只存在于“检查声称的内容”与“检查实际能观察到的内容”之间的差距中。如果你能从中吸取一点教训，那就是：写下来的规则并不等同于被执行的规则。要确认你拥有的是哪一种，唯一的方法就是故意破坏它，看看系统会有什么反应。