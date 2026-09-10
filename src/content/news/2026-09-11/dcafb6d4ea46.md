---
title: "Powering AI is an architecture problem"
originalUrl: "https://www.technologyreview.com/2026/09/10/1141649/powering-ai-is-an-architecture-problem/"
date: "2026-09-10T23:19:42.356Z"
---

# Powering AI is an architecture problem
# 为人工智能供电是一个架构问题

2026年7月22日，弗吉尼亚州阿什本（全球最大数据中心集群的核心地带）发生了一起输电线路故障，在几秒钟内导致电网损失了超过3吉瓦的负荷。这并非首次发生。两年前，一个避雷器故障曾导致弗吉尼亚州约60个设施同时断电，损失了1500兆瓦电力。没有人能预料到如此大规模的统一负荷会在同一时间以相同的方式对电网故障做出反应。关于人工智能供电的争论大多集中在发电端：更多的涡轮机、更多的太阳能、更多的输电线路。电网确实需要更多的电力。但弗吉尼亚州的停电并非供应故障，而是架构故障。随着新一波大规模互联设施接入同一架构，电网的可靠性正面临风险。这是一个没人愿意承担责任的问题。

On July 22, 2026, a transmission line fault in Ashburn, Virginia—the heart of the world's largest data center cluster—knocked more than 3 gigawatts of load off the grid in seconds. And it wasn't the first time. Two years earlier, a single failed surge arrester dropped roughly 60 Virginia facilities and 1,500 megawatts at once. No one could anticipate so much uniform load responding to grid faults the same way, at the same time. The AI power debate is mostly about generation: more turbines, more solar, more transmission. The grid needs more electrons. But the outages in Virginia weren't supply failures; they were architecture failures. And a giant wave of interconnections is arriving on that same architecture, putting grid reliability at risk. It's a problem nobody wants to own.

### Asking more from the grid
### 对电网提出更高要求

电网是围绕可预测的负荷构建的：钢铁厂、炼油厂和晚餐时间的家庭用电。虽然负荷大小不同，但过程相同——平稳地获取电力，偶尔出现异常，并能优雅地恢复。但人工智能数据中心的行为并非如此。一个人工智能园区在训练过程中可以在几毫秒内波动70%的负荷，一旦上游出现问题，为了保护价值数十亿的计算设备，它们会以同样快的速度断开连接。单独来看，每个设施的决策都是理性的。但当它们以吉瓦规模聚集在一起时，就成了电网从未解决过的问题——而下一波数据中心园区正是按此规模规划的。

The grid was built around predictable loads: steel mills, refineries, and houses at dinnertime. Different load sizes, same process—drawing power smoothly, misbehaving occasionally, and recovering gracefully. But AI data centers don't behave that way. An AI campus can swing 70% of its load in milliseconds during a training run, then trip offline just as fast at the first sign of trouble upstream to protect billions in compute. Each is rational alone. Together, at gigawatt scale, they're a problem the grid has never solved—and the next wave of data center campuses is planned at exactly that scale.

### Where the old stack breaks
### 旧架构的崩溃点

标准的数据中心电力堆栈几十年来没有改变。中压电力输入，变压器降压，低压不间断电源（UPS）进行调节，最后到达机架。将这种设计推向人工智能规模时，它会在三个地方出现裂痕。首先，UPS位于建筑物深处，靠近机架。但其电池就像一个尺寸不足的备胎，旨在应对几分钟的停电，而不是全天候处理如此快速且剧烈的负荷波动。其次，UPS大部分时间处于旁路模式。传统转换器浪费的电力过多，导致运营商运行在“节能模式”下：静态开关直接从电网向机架供电，没有任何过滤。计算设备的波动直接输出，而电网瞬变（可能损坏或导致设备停机的亚毫秒级事件）进入速度太快，任何开关都无法捕捉。第三，保护逻辑是在“大负荷”仅指50兆瓦时编写的。这种保护逻辑无法识别它所处的电网环境，因此当上游出现问题时，它会做出完全错误的反应：直接断开。在2024年的弗吉尼亚事件中，大部分损失的负荷都源于保护方案，它们在检测到电压骤降时会进行计数，并在第三次时断开——正如设计的那样，却发生在最糟糕的时刻。这不是工程上的疏忽，而是负载已经超越了原有设计的局限。

The standard data center power stack hasn't changed in decades. Medium-voltage power arrives, transformers step it down, low-voltage uninterruptible power supply (UPS) units condition it, and it reaches the racks. Push that design to AI scale, and it cracks in three places. First, the UPS sits deep inside the building, close to the racks. But its batteries are an undersized spare tire, designed to handle an outage for a few minutes, not to absorb load swings this fast and volatile around the clock. Second, the UPS spends most of its life in bypass. Legacy converters waste enough power that operators run in eco-mode: A static switch feeds the racks directly from the grid and nothing filters in either direction. The compute's swings go out raw, and grid transients—sub-millisecond events that can damage or take down equipment—come in too fast for any switch to catch. Third, the protection logic was written when "large load" meant 50 megawatts. This protection logic can't see the grid it is now a part of, so when trouble hits upstream, it does exactly the wrong thing: it drops out. In the 2024 Virginia event, most of the lost load traced to protection schemes that count voltage dips and disconnect on the third one—as designed, at the worst moment. This isn't sloppy engineering. It's careful engineering the load has outgrown.

### Moving into the path
### 介入路径

解决方案是同时采取三个步骤。向上移动——从480伏提升到中压（13.8千伏及以上），这是大型站点从电网获取电力的电压。向外移动——从数据大厅移至变电站附近的模块化外壳中，这样建筑物内只保留计算设备和维持其运行的冷却系统。进入路径——不再使用那种“观察并反应”的电池，而是采用一种所有电子始终通过的系统。无需检测，无需切换，因为没有任何东西被绕过。在纸面上，这是三个简单的升级。但在实践中，它们重写了下游的每一项清单。

The fix is three moves, made together. Move it up—from 480 volts to medium voltage (13.8 kilovolts and higher), the voltage large sites draw from the grid. Move it out—from the data hall to modular enclosures near the substation so the building holds only compute and the cooling that keeps it alive. Move it into the path—instead of a battery that watches and reacts, a system every electron runs through, all the time. There's nothing to detect and nothing to switch because nothing was ever routed around it. On paper, three straightforward upgrades. In practice, they rewrite every line item downstream.

### Making the change
### 做出改变

当数千个GPU同时启动时，系统会吸收波动，并向电网提供平稳的负荷曲线。当干扰发生时，其后的设备根本察觉不到。一个“麻烦的邻居”变成了一个“可预测的邻居”。当公用事业公司需要帮助时，它甚至能成为一个有用的帮手。互联方式也发生了变化。公用事业公司只需认证一个中压箱，而无需理清其后复杂的变压器、UPS、冷水机组、泵和开关柜。工程师可以在不进行重新互联研究的情况下更换芯片代际。许可时间缩短了数月。在围栏内，UPS房间变成了计算或冷却空间。每建设美元的密度随之攀升。经济效益也发生了逆转。在中压下运行、放置在室外并存储自身能量的设备可以获得税收抵免，并通过调峰和需求响应等电网计划赚取收入。备用电源不再仅仅是保险，而是开始实现自我盈利。

When thousands of GPUs spin up together, the system absorbs the swing and hands the grid a flat load profile. When a disturbance hits, the equipment behind it never notices. A difficult neighbor becomes a predictable one. And when the utility needs help, it becomes a useful one. Interconnection changes, too. The utility certifies one medium-voltage box instead of untangling every transformer, UPS, chiller, pump, and switchgear lineup behind it. Engineers swap chip generations without a fresh interconnection study. Months come off the permitting timeline. Inside the fence, UPS rooms become compute or cooling space. Density per construction dollar climbs. And the economics flip. Equipment that runs at medium voltage, sits outside, and stores its own energy can qualify for tax credits, and earn revenue in grid programs like peak shaving and demand response. Backup power stops being insurance and starts paying for itself.

### The architecture test
### 架构测试

2026年初，我们在落基山国家实验室测试了一个全尺寸系统。这是美国能源部的一个设施，也是西半球唯一能够同时在同一回路中模拟真实电网故障和人工智能规模负荷波动的地方。我们从两个方向对其进行了测试：真实的人工智能负荷曲线以全中压进入计算侧；电网故障（包括完全零电压事件）冲击公用事业侧。计算侧没有退缩，电网侧也没有。它顺利通过了德克萨斯州电力可靠性委员会（ERCOT）的大负荷电压穿越要求，且留有余地。这些规则的存在是因为运营商不再盲目信任这种规模的设施，未来会有更多此类规则。大多数行业将其视为障碍，但中压在线系统开箱即用即可清除这些障碍。合规性不再是一个附加功能，而是该架构的固有属性。

In early 2026, we tested a full-scale system at the National Laboratory of the Rockies, a U.S. Department of Energy facility and the only place in the Western Hemisphere that can replicate real grid faults and AI-scale load swings concurrently in the same loop. We hit it from both directions: real AI load profiles hit the compute side at full medium voltage. Grid faults hit the utility side, including a full zero-voltage event. The compute side didn't flinch. Neither did the grid side. It cleared the large-load voltage ride-through requirements from the Electric Reliability Council of Texas (ERCOT), the grid operator, with room to spare. Those rules exist because operators no longer take facilities this size on faith, and more are coming. Most of the industry treats them as hurdles. A medium-voltage, inline system clears them out of the box. Compliance isn't an added feature. It's what the architecture does.

### The new layer
### 新的层级

人工智能建设中许多看似电网的问题，实际上都存在于围栏之内，存在于为不再存在的负荷而设计的设备中。将正确的组件向上、向外移动并置入路径中，电网的负担就会变成电网的资产。密度提高了，许可时间缩短了，备用电源实现了自我价值。工程方案是有效的——下一波人工智能工厂正建立在此基础之上。行业尚未为这一层级命名。我们称之为“中压人工智能UPS”。名称并不重要，重要的是选择：这些工厂到来时，可以是电网的负担，也可以是电网的助力。我们已经知道如何构建后者。

Much of what looks like a grid problem in the AI buildout sits inside the fence, in equipment sized for a load that no longer exists. Move the right pieces up, out, and into the path, and a grid liability becomes a grid asset. Density goes up. Permitting time comes down. Backup power earns its keep. The engineering works—and the next wave of AI factories is being built on it. The industry hasn't named this layer yet. We call it the medium-voltage AI UPS. The name matters less than the choice: those factories can arrive as a strain on the grid or as strength for it. We already know how to build the second kind.