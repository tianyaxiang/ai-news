---
title: "Starlink Signal Leakage Threatens Radio Astronomy's Most Critical Frequencies"
originalUrl: "https://www.gadgetreview.com/starlinks-signal-leakage-is-threatening-radio-astronomys-most-critical-frequencies"
date: "2026-09-12T23:06:10.864Z"
---

# Starlink Signal Leakage Threatens Radio Astronomy's Most Critical Frequencies
# 星链信号泄漏威胁射电天文学最关键的频段

**Key Takeaways**
* Starlink satellites emit unintended signals 10,000 times stronger than target cosmic signals.
* Researchers detected 112,534 Starlink emissions contaminating ITU-protected radio astronomy frequency bands.
* Current ITU regulations ignore unintended satellite hardware leakage, leaving astronomers without legal protection.

**核心要点**
* 星链卫星发出的非预期信号强度是目标宇宙信号的 10,000 倍。
* 研究人员检测到 112,534 次星链发射干扰了国际电信联盟（ITU）保护的射电天文学频段。
* 现行的 ITU 法规忽略了卫星硬件的非预期泄漏，导致天文学家缺乏法律保护。

***

Astronomers spent decades designing the Square Kilometre Array Low (SKA-Low) to hear the faintest whisper in the observable universe — neutral hydrogen signals from the cosmic dawn, when the first stars flickered on roughly 13 billion years ago. What they’re picking up instead is electronic leakage from SpaceX satellites. Not the broadband beams Starlink intentionally transmits. The accidental static bleeding from onboard hardware, coupling through satellite structures and radiating across frequencies nobody authorized.

天文学家花费数十年设计了平方公里阵列低频望远镜（SKA-Low），旨在捕捉可观测宇宙中最微弱的“耳语”——即约 130 亿年前第一批恒星闪烁时，宇宙黎明时期的中性氢信号。然而，他们现在接收到的却是来自 SpaceX 卫星的电子泄漏。这并非星链有意发射的宽带波束，而是机载硬件意外产生的静电干扰，通过卫星结构耦合，并辐射到未经授权的频段中。

A Curtin University team using the Engineering Development Array 2 — a prototype SKA-Low station in Australia — analyzed approximately 76 million radio images over 29 days. The results, published in *Astronomy & Astrophysics*, are uncomfortable reading. Researchers catalogued 112,534 individual radio emissions from 1,806 unique Starlink satellites across 73–235 MHz, the exact frequency range SKA-Low needs. Some satellites emit periodic 13-kHz tones at roughly 137 MHz every 100 seconds. These aren’t scheduled downlinks that operators can plan around. They’re unpredictable hardware leakage — and researchers cannot subtract a signal they cannot model.

科廷大学的一个团队利用工程开发阵列 2（位于澳大利亚的 SKA-Low 原型站），在 29 天内分析了约 7600 万张射电图像。发表在《天文学与天体物理学》杂志上的研究结果令人不安。研究人员记录了来自 1,806 颗不同星链卫星的 112,534 次独立射电发射，频率覆盖 73–235 MHz，这正是 SKA-Low 所需的关键频段。一些卫星每 100 秒会在约 137 MHz 的频率上发出周期性的 13-kHz 音调。这些并非运营商可以预先规划的下行链路，而是不可预测的硬件泄漏——研究人员无法剔除他们无法建模的信号。

The numbers tell the story bluntly:
* 112,534 emissions detected from 1,806 unique Starlink satellites
* Leakage reaching up to 10⁶ Jy/beam; early-universe hydrogen signals require sensitivity near 10⁻⁵ Jy
* Starlink signals reportedly around 10,000 times stronger than the cosmic signals SKA-Low is built to detect
* Up to 30% of images at some frequencies contained Starlink interference
* Emissions found inside two ITU-protected bands — 73–74.6 MHz and 150.05–153 MHz — where signals aren’t supposed to exist at all

数据直观地说明了问题：
* 从 1,806 颗星链卫星中检测到 112,534 次发射
* 泄漏强度高达 10⁶ 央斯基（Jy）/波束；而早期宇宙氢信号需要接近 10⁻⁵ Jy 的灵敏度
* 据报道，星链信号强度约为 SKA-Low 目标宇宙信号的 10,000 倍
* 在某些频段，高达 30% 的图像包含星链干扰
* 在两个受 ITU 保护的频段（73–74.6 MHz 和 150.05–153 MHz）内发现了本不应存在的信号

“Comparable to the brightest natural radio sources in the sky.” — Steven Tingay, Curtin University, on Starlink’s leaked emissions.

“这相当于天空中最明亮的天然射电源。”——科廷大学的 Steven Tingay 在评价星链泄漏的辐射时说道。

What SKA-Low is hunting demands almost incomprehensible sensitivity. Trying to detect those ancient hydrogen signals with Starlink overhead is like attempting to hear a conversation from 13 billion years ago while your neighbor runs a subwoofer at full volume. The contamination doesn’t just degrade data quality — it risks rendering entire frequency bands scientifically unusable.

SKA-Low 的探测任务需要极高的灵敏度。在星链卫星的覆盖下探测那些古老的氢信号，就像试图在邻居全功率开启低音炮时，去聆听一场 130 亿年前的对话。这种污染不仅会降低数据质量，还可能导致整个频段在科学上变得无法使用。

**The Rules Don’t Cover This**
Current international frameworks leave unintended satellite emissions in a regulatory gray zone, even when those emissions land inside protected astronomy bands. Here’s the structural problem: nobody is technically breaking any rules. The International Telecommunication Union (ITU) protects certain radio astronomy bands from intentional transmissions. Unintended electromagnetic radiation — hardware leakage — sits largely outside that framework, legally invisible even when it bleeds into protected spectrum. Think of it as the radio equivalent of noise ordinances that cover deliberate sound but ignore a neighbor’s HVAC system, no matter how loud it runs at 3 a.m.

**规则尚未覆盖此领域**
目前的国际框架将非预期的卫星发射置于监管灰色地带，即使这些发射落入了受保护的天文学频段。结构性问题在于：从技术上讲，没有人违反任何规则。国际电信联盟（ITU）保护特定的射电天文学频段免受有意发射的干扰。而非预期的电磁辐射（硬件泄漏）在很大程度上处于该框架之外，即使它渗入受保护的频谱，在法律上也是“隐形”的。这就像是噪音条例的无线电版本：它涵盖了蓄意制造的声音，却忽略了邻居的暖通空调系统，无论它在凌晨 3 点运行得多么大声。

SpaceX has engaged constructively before — satellite visors reduced optical brightness, and an NSF coordination agreement addressed higher-frequency radio bands. But beam management doesn’t fix low-frequency hardware leakage. The ITU is reportedly discussing the issue, though discussion isn’t regulation, and the constellation already exceeds 6,000 satellites. Researchers shared their findings with SpaceX, who are reportedly open to dialogue on future hardware changes. Algorithmic mitigation is being explored, but scientists describe it as “embryonic” — potentially demanding computing power that rivals the science processing itself.

SpaceX 此前曾进行过建设性的合作——卫星遮光罩降低了光学亮度，且与美国国家科学基金会（NSF）达成的协调协议解决了更高频段的射电问题。但波束管理无法解决低频硬件泄漏。据报道，ITU 正在讨论这一问题，但讨论并不等同于监管，且星链星座规模已超过 6,000 颗卫星。研究人员已与 SpaceX 分享了研究结果，据称该公司对未来的硬件改进持开放态度。目前正在探索算法缓解方案，但科学家们将其描述为“处于萌芽阶段”——这可能需要与科学数据处理本身相当的计算能力。

Engineering fixes are the real answer, the same way design changes addressed optical brightness. The question isn’t just what’s happening to astronomers — it’s who decides what the radio sky is worth protecting, and whether that decision gets made before the window closes.

工程修复才是真正的答案，就像当初通过设计变更解决光学亮度问题一样。现在的问题不仅是天文学家面临的困境，更是谁来决定射电天空的保护价值，以及在窗口期关闭之前，我们是否能做出这一决定。