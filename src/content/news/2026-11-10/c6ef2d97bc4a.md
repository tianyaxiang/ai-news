---
title: "Let’s Talk About Why all This OT Stuff is Connected"
originalUrl: "https://tisiphone.net/2026/11/08/lets-talk-about-why-all-this-ot-stuff-is-connected/"
date: "2026-11-09T12:22:39.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# Let’s Talk About Why all This OT Stuff is Connected

ics-scada, infosec Let’s Talk About Why all This OT Stuff is Connected Published by hacks4pancakes on November 8, 2026 It’s been a really bad month (and year) for OT cybersecurity. From a wave of new, high-impact vulnerabilities, to attacks on supermarket refrigerators, to attacks on blood banks, we’ve been left shorthanded and reeling. And that’s on top of months of attacks against water utilities.

对于 OT（运营技术）网络安全而言，这（乃至今年）是一个非常糟糕的月份。从一波又一波高影响的新漏洞，到针对超市冰箱的攻击，再到针对血库的攻击，我们不仅人手不足，而且深受打击。更不用说过去几个月针对水务设施的持续攻击了。

Through all of this, I keep seeing the same comment from seasoned enterprise cybersecurity people, and as someone dealing with these cases on the front line, I find it very frustrating. They express intense shock that these systems are accessible via networks at all, then ask why they can’t just be disconnected. It goes something like this: This is just one example, and I’m genuinely not trying to bash the OP. I’m certain they’re a very competent, experienced IT person, and I understand their frustration. But the situation is far more complicated than it looks, and calling the people who support and purchase these systems incompetent won’t fix it. So let me try to explain why so much OT, ICS, and IIoT is exposed, and which systems are in the worst state.

在这一切过程中，我不断看到资深企业网络安全人员发表同样的评论，而作为一名在第一线处理这些案件的人，我感到非常沮丧。他们对这些系统竟然可以通过网络访问表示极度震惊，然后询问为什么不能直接断开连接。情况大致如此：这只是一个例子，我真的不是想抨击原作者。我相信他们是一位非常有能力、经验丰富的 IT 人员，我也理解他们的挫败感。但情况远比看起来复杂，称呼那些支持和购买这些系统的人为“无能”并不能解决问题。因此，让我试着解释为什么如此多的 OT、ICS（工业控制系统）和 IIoT（工业物联网）处于暴露状态，以及哪些系统处于最糟糕的状态。

How We Got Here Before we can talk about the current state of OT, we need to go back 15 to 20 years to discuss IT/OT convergence. Before then, industrial devices and network infrastructure were often highly bespoke, heterogeneous technologies engineered by vendors. Most communication was serial-based, protocols were custom, and even device firmware was developed in-house. A Rockwell system looked nothing like a Siemens system. When you purchased a system, it was designed, deployed, and supported by that specific OEM. They supplied the replacement parts. They trained the technicians and installers. This got expensive, and it slowed down logistics, not just for parts but also for labour.

我们是如何走到这一步的？在讨论 OT 的现状之前，我们需要回顾 15 到 20 年前，探讨 IT 与 OT 的融合。在此之前，工业设备和网络基础设施通常是由供应商设计的、高度定制的异构技术。大多数通信基于串行协议，协议是定制的，甚至设备固件也是内部开发的。罗克韦尔（Rockwell）系统与西门子（Siemens）系统完全不同。当你购买一个系统时，它是由特定的原始设备制造商（OEM）设计、部署和支持的。他们提供更换零件，并培训技术人员和安装人员。这变得非常昂贵，并且减缓了物流速度，不仅是零件，劳动力也是如此。

So clever engineers and businesspeople looked at the IT landscape and had an idea. Using Windows computers as human-machine interfaces, and commercial Ethernet to encapsulate serial traffic, would be much cheaper to buy, replace, and train technicians to support. Over the years that followed, systems became a mix: lower-level PLCs and RTUs down at Level 1, and above them, numerous devices that were far more familiar to IT staff. Unfortunately, they were also familiar to hackers and hacking tools. This was the first change in exposure, and it was really just a loss of security by obscurity.

于是，聪明的工程师和商人们审视了 IT 领域并产生了一个想法：使用 Windows 计算机作为人机界面，并利用商业以太网来封装串行流量，在购买、更换和培训技术人员支持方面会便宜得多。在随后的几年里，系统变得混合化：底层是 1 级的 PLC（可编程逻辑控制器）和 RTU（远程终端单元），而在它们之上，是许多 IT 人员更为熟悉的设备。不幸的是，黑客和黑客工具对这些设备也同样熟悉。这是暴露风险的第一次变化，实际上只是失去了“隐蔽性带来的安全性”。

The next change was the homogenisation of OEM deployments. To deploy and support large-scale systems more efficiently, most industrial vendors started producing very uniform deployments of technology across the Purdue Model, in very static architectures. Network maps and addressing can look incredibly similar between deployments, even across verticals and countries. Once again, this was the most financially and logistically efficient solution. Unfortunately, any savvy cybersecurity professional can see how this lends itself to more scalable attacks, and even to automating parts of those attacks with tools and agents.

接下来的变化是 OEM 部署的同质化。为了更有效地部署和支持大规模系统，大多数工业供应商开始在普渡模型（Purdue Model）中生产非常统一的技术部署，并采用非常静态的架构。即使跨越不同的行业和国家，不同部署之间的网络地图和寻址看起来也极其相似。再一次，这是在财务和物流上最高效的解决方案。不幸的是，任何精明的网络安全专业人士都能看出，这如何导致了更具可扩展性的攻击，甚至可以使用工具和代理实现部分攻击的自动化。

The Age of Remote Connectivity Over the last ten years, we’ve lived through the rapid adoption of remote connectivity in industrial environments around the world. There was a time when many industrial systems were effectively “air-gapped”. This certainly coincided with the serial era of industrial technology. As IT/OT convergence took hold, a mix of tactics was used. In some flat corporate network environments, industrial control systems were simply plugged into existing cabling for the cheapest possible network access. This included both industrial and building automation systems. We still see this today in low-margin verticals, especially manufacturing. Those flat (or relatively flat) networks have been a thorn in the side of industrial cybersecurity people for decades.

远程连接时代：在过去的十年里，我们经历了全球工业环境中远程连接的快速普及。曾经有一段时间，许多工业系统实际上是“物理隔离”的。这当然与工业技术的串行时代相吻合。随着 IT/OT 融合的深入，人们采用了多种策略。在一些扁平化的企业网络环境中，工业控制系统只是简单地插入现有的布线中，以实现尽可能廉价的网络访问。这包括工业自动化系统和楼宇自动化系统。即使在今天，我们仍然在低利润行业（尤其是制造业）中看到这种情况。几十年来，那些扁平（或相对扁平）的网络一直是工业网络安全人员的心头大患。

The more acceptable solution from an industry perspective was implementing a DMZ at Level 3.5 of the Purdue Model. Enterprise IT would live above it, and the industrial OT environment would live below it. Note that this is still some level of connectivity. Traditionally, it was accomplished with two firewalls and some kind of jump host for traversing between the two environments when needed. Then the scope expanded, faster than practitioners could adapt. Everything Wants Access Networking industrial systems beyond single factory floors made them far more robust and efficient. Ethernet and routing allowed for distributed control and telemetry not just inside a building, but across regional, national, and then international deployments.

从行业角度来看，更可接受的解决方案是在普渡模型的 3.5 级实施 DMZ（非军事区）。企业 IT 位于其上方，而工业 OT 环境位于其下方。请注意，这仍然存在一定程度的连接。传统上，这是通过两个防火墙和某种用于在需要时在两个环境之间穿梭的跳板机来实现的。随后，范围的扩大速度超过了从业者的适应能力。一切都想要访问权限：将工业系统联网到单个工厂车间之外，使其变得更加稳健和高效。以太网和路由不仅允许在建筑物内部，而且可以跨区域、全国乃至国际部署进行分布式控制和遥测。

A single control centre could make real-time changes to power transmission across mountains and multiple substations via SCADA. A manufacturer could match production to demand down to the minute, second, or millisecond. Parts could be monitored for failure tolerances, and replacements planned months in advance. But humans weren’t the limit! Computers could make these decisions on a massive scale, far faster than human operators alone. Raise production, lower production. Our society came to rely on this, with a massive push towards just-in-time logistics. Of course, that meant central SCADA servers needed bidirectional control of industrial devices across huge regions, via networks.

一个单一的控制中心可以通过 SCADA（数据采集与监视控制系统）对跨越山脉和多个变电站的电力传输进行实时更改。制造商可以将生产与需求匹配到分钟、秒甚至毫秒。可以监控零件的故障容限，并提前数月计划更换。但人类并不是极限！计算机可以在大规模范围内做出这些决定，速度远快于人类操作员。提高产量，降低产量。我们的社会开始依赖这一点，并大力推动准时制物流。当然，这意味着中央 SCADA 服务器需要通过网络对跨越巨大区域的工业设备进行双向控制。

Global power grids are a significant example, and they’ve changed enormously over the past ten years. Consider the advent of renewable energy. Firstly, wind and solar farms are made up of numerous generation devices, which must be coordinated and monitored individually across geographically disparate locations. Secondly, home generation necessitates smart meters to monitor usage and buy-back. Finally, there’s the problem of inertia. Traditional generation sources like nuclear, gas, and hydroelectric are high-inertia. Their output can be readily controlled through fuel, and they provide a lot of grid frequency stability during sudden spikes and drops in demand. Renewables provide far less.

全球电网就是一个重要的例子，它们在过去十年中发生了巨大的变化。考虑一下可再生能源的出现。首先，风能和太阳能发电场由众多的发电装置组成，这些装置必须在地理上分散的位置进行协调和单独监控。其次，家庭发电需要智能电表来监控使用量和回购电量。最后，存在惯性问题。核能、天然气和水力发电等传统能源具有高惯性。它们的输出可以通过燃料轻松控制，并且在需求突然激增或下降时，它们能提供很大的电网频率稳定性。而可再生能源提供的稳定性要少得多。