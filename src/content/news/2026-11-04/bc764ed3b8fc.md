---
title: "Stringman, an $800 open-source room scale gripper robot"
originalUrl: "https://neufangled.com/"
date: "2026-11-03T16:47:29.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# Stringman, an $800 open-source room scale gripper robot

### Room-scale cable robot
在机器人技术中，价格基本上取决于执行器的数量。Stringman 通过四个电机覆盖整个房间，将其抓取器悬挂在天花板角落的锚点线上。它从上方工作，能够到达任何轮式或腿式机器人因杂乱而无法进入的地面区域。由于提升力由所有电机共同承担，其有效载荷能力随总扭矩而非单个执行器的扭矩而扩展，并在房间中心附近达到峰值，此时各线缆的负载分配最为均匀。

*0.75 m serial arm using the same DM-H6215 1 N·m direct drive actuators at rated torque, ignoring the weight of its own links. Stringman figure is for a 7 × 7 × 3 m room at the 28 N line tension limit, net of its 638 g gripper and marker.
*使用相同的 DM-H6215 1 N·m 直驱执行器在额定扭矩下运行的 0.75 米串联机械臂，忽略其自身连杆的重量。Stringman 的数据基于 7 × 7 × 3 米的房间，在 28 牛顿的线缆张力限制下，扣除其 638 克抓取器和标记物的重量。

Stringman is open source and OSHWA certified. The mechanical CAD, the PCBs, and the control software are all published.
Stringman 是开源的，并获得了 OSHWA 认证。其机械 CAD 文件、PCB 设计和控制软件均已发布。

We believe owners should be in control of their own robots. That's why Stringman can run air gapped on your local Wi-Fi network: the UI is served locally, AI models run on your own hardware, and no data ever leaves your network.
我们认为用户应该掌控自己的机器人。因此，Stringman 可以在您的本地 Wi-Fi 网络上离线运行：用户界面在本地提供，AI 模型在您自己的硬件上运行，且没有任何数据会离开您的网络。

Give your home lab the capability of carrying parts from one workcell to another anywhere in the room, so you can get more out of your other robots. The Python API and MCP server is made for agents so you can get your workflow running right away.
让您的家庭实验室具备在房间内任何地方将零件从一个工作站运送到另一个工作站的能力，从而充分利用您的其他机器人。Python API 和 MCP 服务器专为智能体设计，让您可以立即启动工作流程。

2022 Porsche 911 GT3 RSR model by No Limits, CC BY 4.0, simplified. SO-101 arm from TheRobotStudio/SO-ARM100, Apache 2.0.
2022 款保时捷 911 GT3 RSR 模型由 No Limits 提供，采用 CC BY 4.0 协议，已简化。SO-101 机械臂来自 TheRobotStudio/SO-ARM100，采用 Apache 2.0 协议。

Unlike desktop arms limited to a fixed radius, Stringman leverages a cable-driven architecture to access the full volume of a room. The work area volume per dollar of this type of robot is completely unmatched, all with fewer actuators than even the simplest mobile robots. Anchors and eylets are mounted in the corners of the room near the ceiling and define a four-sided work area within which any object can be moved from point to point.
与局限于固定半径的桌面机械臂不同，Stringman 利用线缆驱动架构来访问房间的整个空间。这种机器人的单位美元工作空间体积是无与伦比的，且其执行器数量比最简单的移动机器人还要少。锚点和吊环安装在房间天花板附近的角落，定义了一个四边形工作区，物体可以在其中从一点移动到另一点。

That's roughly 500× the work area volume per dollar, at comparable 2 kg payload.
这大约是单位美元工作空间体积的 500 倍，且有效载荷可达 2 公斤。

Secure the cleats to wall studs near the ceiling with wood screws, or to columns with ratchet straps.
用木螺钉将防滑钉固定在天花板附近的墙柱上，或用棘轮带固定在立柱上。

Hang the anchors and connect the lines to the gripper.
悬挂锚点并将线缆连接到抓取器上。

Run calibration. This hands off process takes about five minutes and adapts Stringman to your room.
运行校准。这个自动化过程大约需要五分钟，使 Stringman 适应您的房间。

Step-by-step: picture guide or video guide
分步指南：图片指南或视频指南

The original prototype was built in a room with a ceiling fan, and it still runs there today. Mount the anchors at or below the level of the blades and the lines can't physically reach it.
最初的原型机是在一个装有吊扇的房间里建造的，至今仍在运行。将锚点安装在叶片水平位置或下方，线缆在物理上就无法触及吊扇。

Several methods are available for control with default models for automatic grasping, target, and destination selection to make it easy to quickly build new behaviors.
有多种控制方法可供选择，并提供用于自动抓取、目标和目的地选择的默认模型，以便轻松快速地构建新行为。

Stringman is fully capable of LeRobot control using including Pi.05, JEPA, Multitask DiT, and others.
Stringman 完全支持 LeRobot 控制，包括 Pi.05、JEPA、多任务 DiT 等。

Collecting training data for new behaviors can be done from the UI, and as few as 50 episodes can be enough for certain models like DiT to learn a behavior.
可以通过用户界面收集新行为的训练数据，对于某些模型（如 DiT），只需 50 个片段就足以学习一种行为。

As long as it remains installed, yes. However, when parked, they are up near the ceiling and out of the way. Clutter on the ceiling is preferable to clutter on the floor in our opinion. If you need to remove the anchors, they can be detached from their mounts without tools, leaving a relatively small white cleat on the wall.
只要它保持安装状态，是的。然而，当停机时，它们会停在靠近天花板的地方，不会碍事。在我们看来，天花板上的杂乱比地板上的杂乱要好。如果您需要拆除锚点，无需工具即可将其从支架上取下，墙上只会留下一个相对较小的白色防滑钉。

Yes, it's just a matter of mounting the anchors at or below the level of the fan, making it physically impossible for the lines or marker tag to touch it. Similarly, the work area can be shrunk to exclude low hanging light fixtures if they are off to the side, but if the center of the room does contain low hanging objects, Stringman cannot be installed in that room.
是的，只需将锚点安装在吊扇水平位置或下方，使线缆或标记标签在物理上不可能触碰到它即可。同样，如果低垂的灯具位于侧面，可以缩小工作区域以避开它们；但如果房间中心确实有低垂的物体，则 Stringman 无法在该房间安装。

When reaching a tension limit of 28 newtons (about the weight of a backpack), all motors relax and the lines can be pulled loose. Since they are overhead most of the time, it's uncommon for people to collide with them.
当达到 28 牛顿的张力限制（大约是一个背包的重量）时，所有电机都会放松，线缆可以被拉松。由于它们大部分时间都在头顶上方，人们很少会与它们发生碰撞。

Not by default, but if you bind it with neufangled.com/playroom then you or anyone you share access with can operate it from anywhere, and access can be revoked at any time. Neufangled Robotics does not store any of the information from your robot that is forwarded through its servers.
默认情况下不行，但如果您将其与 neufangled.com/playroom 绑定，那么您或您共享访问权限的任何人都可以从任何地方操作它，并且可以随时撤销访问权限。Neufangled Robotics 不会存储通过其服务器转发的来自您机器人的任何信息。

For those who prefer to make the trade-off by binding their robot to an account, our web-based console allows you to monitor and control Stringman from anywhere. Think of it as a security camera with a hand.
对于那些愿意通过将机器人绑定到账户来进行权衡的用户，我们的网页控制台允许您从任何地方监控和控制 Stringman。可以把它想象成一个带有机械手的安全摄像头。

If you do decide that you would like to make use of our cloud telemetry relay, You can use it, and still go back to a completely lan only mode whenever you want. Your data is never collected.
如果您确实决定使用我们的云遥测中继，您可以随时使用它，并随时切换回完全局域网模式。您的数据永远不会被收集。

Organizing your home is a physical process, not a coding task. Use our clip-on fiducial tags to designate your laundry bin, toy box, and trash can. Stringman maps these locations visually. You don't need to tag individual pieces of clutter—just the destination. If there's something you never want it to pick up, you can mark that item as off-limits.
整理家庭是一个物理过程，而不是编码任务。使用我们的夹式基准标签来指定您的洗衣篮、玩具箱和垃圾桶。Stringman 会在视觉上映射这些位置。您不需要标记每一件杂物，只需标记目的地即可。如果您有不想让它拾取的物品，可以将该物品标记为禁区。

Networks trained to control stringman have learned that the word "toybox" refers to that tag, so you can use it to mark anything even if it doesn't look like the toyboxes from our training set.
经过训练用于控制 Stringman 的网络已经学会了“玩具箱”一词指的是该标签，因此即使它看起来不像我们训练集中的玩具箱，您也可以用它来标记任何东西。

You can also use the tags as arbitrary source and destination markers for ferry jobs, such as carrying items from one robot arm to another. or carrying laundry from the ground to a robotic folding station
您还可以将这些标签用作运输任务的任意源和目的地标记，例如将物品从一个机械臂运送到另一个机械臂，或者将衣物从地面运送到机器人折叠站。

A classroom with a Stringman robot gives your students a chance to become familiar with robotics fundamentals such as inverse kinematics, telemetry, and imitation learning while controlling an exotic and capable flying gripper. If you have walls and a MacBook, you're more than halfway there.
配备 Stringman 机器人的教室让学生有机会在控制一个独特且功能强大的飞行抓取器的同时，熟悉机器人技术的基础知识，如逆运动学、遥测和模仿学习。如果您有墙壁和一台 MacBook，那么您已经完成了一半以上的工作。

Cross embodiment is one of the biggest challenges in robotics, and showing that a model can operate a vastly different body type is a stronger result than moving it from one bimanual robot to another. Our datasets are public on Hugging Face, there's a controll
跨具身性是机器人技术中最大的挑战之一，证明一个模型可以操作截然不同的身体类型，比将其从一个双臂机器人转移到另一个双臂机器人更有说服力。我们的数据集已在 Hugging Face 上公开，有一个控制...