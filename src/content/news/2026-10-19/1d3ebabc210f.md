---
title: "RepRapMicron"
originalUrl: "https://github.com/VikOlliver/RepRapMicron/wiki"
date: "2026-10-18T13:48:48.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

0.5mm "Benchy" 3D test model printed with μRepRap, 4μm layer height

使用 μRepRap 打印的 0.5 毫米“Benchy”3D 测试模型，层高为 4 微米。

"PIKA" V0.02 hardware is producing repeatable positioning of approximately 1μm and reliable 10μm or better accuracy in an approximately 8mm cubic volume. Using a fine probe etched with the PIKA mechanism itself, UV resin droplets as small as 4μm have been deposited. With a fibre optic probe 9μm resin lines have been cured. This is the current recommended build.

“PIKA” V0.02 硬件在大约 8 立方毫米的体积内，可实现约 1 微米的重复定位精度，以及 10 微米或更好的可靠精度。使用由 PIKA 机构自身蚀刻而成的精细探针，已能沉积小至 4 微米的紫外线树脂液滴。利用光纤探针，已能固化 9 微米的树脂线条。这是目前推荐的构建方案。

PIKA V0.02 Complete Circa May 2026

PIKA V0.02 完成于 2026 年 5 月左右。

This was devised as a testbed for flexure components, and is only mentioned because it has been thoroughly documented with a bill of materials etc. It was updated to V0.05 to give compatibility with PIKA Axis Drivers, but the full documentation is for the "MAUS C" V0.04 (essentially a debugged V0.03). This achieved approximately 5μm positioning best case over a 4mm square, though motion is not linear. Maus-C-Build-Process instructions have been created. If you want to download the pre-built STL files go here to Printables and day-to-day progress is detailed on the RepRap blog.

该装置最初被设计为柔性组件的测试平台，在此提及仅因其拥有详尽的物料清单等文档。它被更新至 V0.05 以兼容 PIKA 轴驱动器，但完整的文档是针对“MAUS C” V0.04（本质上是 V0.03 的调试版）。该版本在 4 毫米见方的范围内实现了约 5 微米的最佳定位精度，尽管其运动并非线性。目前已创建了 Maus-C 构建流程说明。如果您想下载预构建的 STL 文件，请前往 Printables，日常进展详见 RepRap 博客。

MAUS 'L' V0.05 μRepRap, in development Feb 2026

MAUS 'L' V0.05 μRepRap，2026 年 2 月开发中。

Microelectronics and Micro-electromechanical Systems (MEMS) are essential components of most of the electronic wizardry we use in our everyday lives, whether we realise it or not. In the way that RepRap brought Open 3D fabrication to the masses, the aim of the µRepRap Project is to bring users the same capabilities on a much smaller scale and allow those components to evolve in the same way. The solution is effectively a very precise and compact CNC machine.

微电子和微机电系统 (MEMS) 是我们日常生活中所使用的绝大多数电子产品的重要组成部分，无论我们是否意识到这一点。正如 RepRap 将开放式 3D 制造带给大众一样，μRepRap 项目的目标是以更小的规模为用户提供同样的能力，并让这些组件以同样的方式演进。该解决方案实际上是一台非常精密且紧凑的数控机床。

The objective has two related parts: To create a macro scale 3D printed micron fabrication and manipulation system, and while doing this develop the techniques needed to reproduce a similar system printed at the micron scale.

该目标包含两个相关部分：创建一个宏观尺度的 3D 打印微米制造与操作系统，并在过程中开发出在微米尺度上复制类似系统所需的各项技术。

A 1.3mm "Hello World" mechanically etched in Sharpie Marker on glass slide mid-2025

2025 年年中，在载玻片上用记号笔机械蚀刻出的 1.3 毫米“Hello World”。

Precision manufacturing began somewhere in the 1700's, and the first micron scale electronic devices were fabricated from silicon in the 1960’s. The Intel 4004, for example, was made with a feature size of 10μm. Ever since then the technology focused largely on silicon, with fabrication systems becoming ever more complex, esoteric, and costly. The techniques used are difficult for the average hobbyist to manage, and in many cases are downright dangerous.

精密制造始于 18 世纪的某个时期，而第一批微米级电子设备是在 20 世纪 60 年代由硅制成的。例如，Intel 4004 的特征尺寸为 10 微米。从那时起，技术主要集中在硅上，制造系统变得越来越复杂、深奥且昂贵。所使用的技术对于普通爱好者来说难以掌握，且在许多情况下非常危险。

In biology and medicine, equipment to measure and manipulate objects on the micron scale are relatively common - though these devices tend to be large, specialized, and expensive. Recently though, microscope platforms capable of sub-micron resolution were developed by The OpenFlexure Project, and these have created an interesting opportunity for developing micron scale fabrication.

在生物学和医学领域，用于测量和操作微米级物体的设备相对常见——尽管这些设备往往体积庞大、专业化且昂贵。然而，最近 OpenFlexure 项目开发出了具备亚微米分辨率的显微镜平台，这为开发微米级制造技术创造了一个有趣的契机。

If micron scale manufacturing can be achieved by RepRap-like technology, it is likely that these fields will be advanced in the same way that desktop fabrication was by the RepRap. The biological sciences will gain from inexpensive, rapidly-evolving equipment. The microelectronics field will regain the potential for independent communities develop on the micron scale, and break away from its fixation on silicon as its main platform. As with 3D printing, there will certainly be new developments in fields that do not currently even exist.

如果能通过类似 RepRap 的技术实现微米级制造，那么这些领域很可能会像桌面制造因 RepRap 而进步一样得到提升。生物科学将受益于廉价且快速演进的设备。微电子领域将重新获得在微米尺度上由独立社区发展的潜力，并摆脱对硅作为主要平台的固守。正如 3D 打印一样，在目前甚至还不存在的领域中，肯定会出现新的发展。

There is also the possibility (and intent) that this technology could replicate in the future at a yet smaller scale.

该技术在未来还有可能（且有此意图）在更小的尺度上进行复制。

Micron scale 3D printing has many of the same requirements that The RepRap Project developed when initially printing on the macro scale:

微米级 3D 打印与 RepRap 项目在最初进行宏观尺度打印时所开发的要求有许多共同之处：

In addition there is the practical aspect that humans are unable to directly manipulate micron scale assemblies and sub-assemblies. Novel systems are therefore needed to:

此外，还有一个实际问题，即人类无法直接操作微米级的组件和子组件。因此，需要创新的系统来：

Similar issues will exist if and when a micron scale system is developed.

当微米级系统开发出来时，也会存在类似的问题。

While conventional optics are readily available to allow humans to initiate and inspect the fabrication processes, it is likely that some customisation of the optics will be desirable.

虽然现有的常规光学器件足以让人类启动并检查制造过程，但对光学器件进行一些定制可能是有必要的。

For the moment two USB microscopes are sufficient. One to observe the initial Z probe height during setup, and one for the XY positioning of the probe when commencing a print. A minimum of 8Mpixel resolution is recommended. Additionally a conventional bench microscope of 100x to 200x will be needed to examine the output.

目前，两台 USB 显微镜就足够了。一台用于在设置期间观察初始 Z 轴探针高度，另一台用于在开始打印时观察探针的 XY 定位。建议分辨率至少为 800 万像素。此外，还需要一台 100 倍至 200 倍的常规台式显微镜来检查输出结果。

"Hello, World" and a 100μm square set in resin using UV and a 125/9 optical fibre

使用紫外线和 125/9 光纤在树脂中固化的“Hello, World”和一个 100 微米的正方形。

Additionally, an optical fibre may be attached as the probe. This can be used to cure UV resin by projecting a sufficiently powerful UV source down the probe. This section describes how a 125/9 optical fibre patch lead and 3W UV LED module can be attached to the μRepRap as a print head.

此外，可以将光纤作为探针安装。通过将足够强大的紫外线源投射到探针中，可以利用它来固化紫外线树脂。本节介绍了如何将 125/9 光纤跳线和 3W 紫外线 LED 模块作为打印头安装到 μRepRap 上。

The axes are driven by 400-step NEMA17 stepper motors, but 200-step motors will get quite close to 1μm. The driving hardware and firmware is left to user preference, though existing developments assume interactive control using GCODE on a serial connection. Arduino GRBL is adequate.

各轴由 400 步进的 NEMA17 步进电机驱动，但 200 步进的电机也能非常接近 1 微米的精度。驱动硬件和固件由用户自行选择，不过现有的开发成果假设使用串行连接上的 GCODE 进行交互控制。Arduino GRBL 即可胜任。

The probe is used as a Z touch sensor, engraving tool, and deposition head. A robust probe for initial testing can be made from a 0.5mm hypodermic needle or 0.25mm accupuncture needle. These are sufficiently robust to use subtractively on resist-covered surfaces such as Sharpie marker on a glass slide.

探针被用作 Z 轴接触传感器、雕刻工具和沉积头。用于初步测试的坚固探针可以用 0.5 毫米的皮下注射针或 0.25 毫米的针灸针制成。它们足够坚固，可以在覆盖有抗蚀剂的表面（例如载玻片上的记号笔痕迹）上进行减材加工。

For fine deposition an electrochemically etched wire point is recommended. Instructions for fabrication with minimal equipment are in the Probe documentation. The PIKA is capable of etching its own probes.

对于精细沉积，建议使用电化学蚀刻的金属丝尖端。使用最简设备进行制造的说明可在探针文档中找到。PIKA 能够蚀刻其自身的探针。

Additive fabrication is currently implemented by transferring minute quantities of "Top Coat" UV nail gel resin with the probe. The reservoir is a smeared layer of resin. The probe accepts this resin by capillary action. When depositing, capillary action forms relatively consistent droplets. The number of consecutively deposited droplets and their consistency depend on the qualities of the resin and probe, but sub-15μm droplets are achievable.

增材制造目前是通过探针转移微量的“面漆”紫外线美甲树脂来实现的。树脂储槽是一层涂抹的树脂。探针通过毛细作用吸取树脂。在沉积时，毛细作用会形成相对一致的液滴。连续沉积的液滴数量及其一致性取决于树脂和探针的质量，但可以实现小于 15 微米的液滴。

Other resins and ionic gels may also be used. A UV LED in the print bed operated by the hardware

也可以使用其他树脂和离子凝胶。打印床中由硬件控制的紫外线 LED。