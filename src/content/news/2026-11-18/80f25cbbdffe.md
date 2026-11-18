---
title: "The Java Bug That Leaked Before Its Patch (Java4Shell)"
originalUrl: "https://dev.to/thegdsks/java4shell-one-stray-sign-vs-your-java-server-4j3j"
date: "2026-11-18T02:50:52.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

The Java Bug That Leaked Before Its Patch (Java4Shell)

2026年11月17日，一家名为Calif的安全公司发布了一篇题为“一次编写，随处RCE（远程代码执行）”的文章。该漏洞存在于java.util.Base64中，这是一个我们大多数人都会不假思索地调用的类。Endor Labs称该修复程序仅需四行代码。受影响的名单包括Keycloak、Jira、Confluence、Artifactory、Jenkins和PingFederate。我花了一整天时间阅读公告和供应商的说明，这样你就不用再费心了。你在社交媒体上看到的一些内容背后有复现过程，而另一些则是Calif的声明，目前尚无公开证据。我会将两者区分开来，因为差异决定了你需要采取行动的速度。

TL;DR (Too Long; Didn't Read)
Question: What is it?
Short answer: CVE-2026-114938, nicknamed Java4Shell, a heap out-of-bounds write in OpenJDK's hardware-accelerated Base64 decoder.

问题：它是什么？
简短回答：CVE-2026-114938，绰号Java4Shell，是OpenJDK硬件加速Base64解码器中的堆越界写入漏洞。

Question: How big is the write?
Short answer: 62 bytes past the end of the output array, per Upwind and Endor Labs.

问题：写入范围有多大？
简短回答：根据Upwind和Endor Labs的说法，超出了输出数组末尾62个字节。

Question: Who is at risk?
Short answer: HotSpot 17.0.6 and later, plus 21, 25 and 27, on x86-64 CPUs with AVX-512 VBMI.

问题：谁面临风险？
简短回答：在配备AVX-512 VBMI指令集的x86-64 CPU上运行的HotSpot 17.0.6及更高版本，以及21、25和27版本。

Question: Who is not?
Short answer: ARM64, older Xeons, AMD before Zen 4, Java 8 and 11 (standard builds), and the MIME decoder.

问题：谁不受影响？
简短回答：ARM64架构、较旧的至强（Xeon）处理器、Zen 4之前的AMD处理器、Java 8和11（标准构建版本）以及MIME解码器。

Question: Exploitation?
Short answer: No exploitation in the wild reported, not in CISA KEV as of November 17.

问题：是否存在利用？
简短回答：截至11月17日，尚未有野外利用报告，也未被列入CISA KEV（已知被利用漏洞目录）。

Question: Is there a fix?
Short answer: Oracle shipped fixed builds on November 17, other vendors on their own schedules.

问题：是否有修复程序？
简短回答：Oracle已于11月17日发布了修复版本，其他供应商则按各自的时间表进行。

How a Base64 string becomes a crash
Base64 decoding is boring work, so HotSpot does not do it in plain Java. Once the JIT decides the decoder is hot, it swaps the Java loop for a hand-written assembly routine that uses AVX-512 to chew through the input in wide chunks. That gives the speedup, and it also hosts the bug. The routine has a special path for the last characters of the string. Per Upwind, a malformed string that ends in a stray = makes that tail code calculate a negative output length. A small write turns into a full 64-byte write, 62 bytes past the end of the array. Java then notices the input is invalid and throws an exception. By that point the bytes are already in memory. Those bytes are a constant. Endor Labs says the content of the overflow is the same whatever you send. The attacker does not choose what gets written. They choose where it lands by shaping the heap. If the bytes land in free memory, nothing happens. If they land on a live object, they destroy its header. Endor Labs puts the usual result as a SIGSEGV inside garbage collection. That is the part everyone agrees on: a remotely triggerable JVM crash.

Base64解码是一项枯燥的工作，因此HotSpot不会在纯Java中执行它。一旦JIT（即时编译器）判定解码器处于热点状态，它就会将Java循环替换为手写的汇编程序，利用AVX-512指令集以大块数据处理输入。这带来了速度提升，但也引入了漏洞。该程序对字符串的最后几个字符有特殊的处理路径。据Upwind称，一个以多余的“=”结尾的畸形字符串会导致尾部代码计算出负的输出长度。一次小规模写入会变成完整的64字节写入，超出数组末尾62个字节。随后Java会注意到输入无效并抛出异常，但此时字节已经写入内存。这些字节是常量。Endor Labs表示，无论发送什么内容，溢出的内容都是相同的。攻击者无法选择写入的内容，但可以通过调整堆布局来选择写入的位置。如果字节落在空闲内存中，则不会发生任何事情；如果落在活动对象上，则会破坏其头部。Endor Labs认为通常的结果是垃圾回收期间的SIGSEGV错误。这是各方达成共识的部分：一个可远程触发的JVM崩溃。

The part people argue about
Calif says the overflow escalates much further. In their write-up, a chain of five stages corrupts an array length, uses a second array to leak heap contents, repairs object headers, grooms the heap remotely and finally writes into the JVM's code cache. Their claimed results are pre-auth RCE on default installs of Keycloak, Jira, Confluence, Artifactory, Jenkins and PingFederate, and post-auth RCE on Kafka, Solr, Elasticsearch, Gerrit and Spinnaker. Here is what I could and could not confirm. Calif reports that they found the bug with AI help in about an hour and had a first working exploit about two hours later. That is their timeline, not an independently checked one. No public proof-of-concept shell exists. Calif is withholding the product-specific exploits and published a safe reproducer only. Calif itself says there is no universal exploit. Each target needs its own decoder route, writable buffer, feedback channel and heap layout. Equixly, writing the same day, calls RCE unproven and calls a JVM crash the realistic outcome. Both readings can be true at once. A crash needs no skill. Code execution needs a skilled attacker per product, but the defenders' clock is Calif's own statement that product exploits will follow.

关于争议部分
Calif声称溢出可以进一步升级。在他们的文章中，一个包含五个阶段的链条可以破坏数组长度，利用第二个数组泄露堆内容，修复对象头部，远程整理堆，并最终写入JVM的代码缓存。他们声称的结果是在Keycloak、Jira、Confluence、Artifactory、Jenkins和PingFederate的默认安装上实现预认证RCE，并在Kafka、Solr、Elasticsearch、Gerrit和Spinnaker上实现认证后RCE。以下是我能确认和不能确认的内容：Calif报告称他们在AI的帮助下用大约一小时发现了该漏洞，并在约两小时后有了第一个可用的利用程序。这是他们的时间表，未经独立核实。目前不存在公开的概念验证Shell。Calif保留了针对特定产品的利用程序，仅发布了一个安全的复现程序。Calif自己也表示不存在通用的利用方式。每个目标都需要其特定的解码路径、可写缓冲区、反馈通道和堆布局。Equixly在同一天撰文称RCE尚未得到证实，并认为JVM崩溃是现实的结果。这两种解读可能同时成立：崩溃不需要技术，而代码执行需要针对每个产品的高级攻击者，但防御者的紧迫性源于Calif关于产品利用程序即将出现的声明。

The numbers that matter
(Table data omitted for brevity)
The sources disagree on several details. Equixly attributes the 9.2 score to South Korea's NCSC while the others attribute it to Calif, and nobody has published a CVSS vector string. Treat the score as a signal, not a measurement.

关键数据
（表格数据略）
各来源在几个细节上存在分歧。Equixly将9.2的评分归因于韩国NCSC，而其他人则归因于Calif，且没有人发布CVSS向量字符串。请将此评分视为一个信号，而非精确的测量值。

Why this one has legs
Three things make this more than a routine patch Tuesday item. The first is the reach. This is not a library you can grep for in a lockfile. The flaw sits in the runtime itself, so dependency scanning of pom.xml or build.gradle will not surface it. Endor Labs says so directly, and that is the main reason I expect this to linger in fleets for months. The second is that you can be vulnerable by accident of hardware. Qualys warns that a workload on an unaffected CPU can land on an affected one after a resize or an instance type change. The same container image, the same JVM flags, a different answer. The third is the leak. Per Upwind and Endor Labs, the bug reportedly leaked before its patch was ready. The NCSC in South Korea told public institutions to inspect their Java runtimes on November 16, a day before the fix shipped.

为什么这个问题影响深远
有三点使得这不仅仅是一个常规的“补丁星期二”项目。首先是影响范围。这不是一个可以通过在锁文件中搜索就能找到的库。该缺陷位于运行时本身，因此对pom.xml或build.gradle的依赖扫描无法发现它。Endor Labs直接指出了这一点，这也是我预计该漏洞将在系统中存在数月的主要原因。其次，你可能会因为硬件原因意外受到影响。Qualys警告称，在调整大小或更改实例类型后，原本在不受影响的CPU上运行的工作负载可能会迁移到受影响的CPU上。相同的容器镜像，相同的JVM标志，结果却不同。第三是泄露。据Upwind和Endor Labs称，该漏洞在补丁准备好之前就已泄露。韩国NCSC在11月16日（即修复程序发布前一天）就通知公共机构检查其Java运行时。

What I would do before lunch
Start by finding out which JVM each service really runs. The java on your shell path is often not the one your service uses, especially for Jenkins, Jira, Confluence, Keycloak and Elasticsearch, which bundle their own runtime.

午饭前我建议做的事
首先找出每个服务实际运行的JVM。你Shell路径中的java通常不是服务所使用的那个，特别是对于Jenkins、Jira、Confluence、Keycloak和Elasticsearch，它们都捆绑了自己的运行时。