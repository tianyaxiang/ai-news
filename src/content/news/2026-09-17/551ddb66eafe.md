---
title: "Some things Veloren does differently"
originalUrl: "https://blog.jsbarretto.com/post/veloren"
date: "2026-09-17T00:03:21.148Z"
---

# Some things Veloren does differently
# Veloren 的一些独特之处

I’m one of the core developers of Veloren. Sadly, I don’t get much time to work on the project nowadays: if you’re a parent too you’ll understand, I’m sure. In this post I want to document some of the unusual choices that have been made during Veloren’s development. If you’re working on a game you might find some of them interesting.

我是 Veloren 的核心开发者之一。遗憾的是，如今我没有太多时间投入到这个项目中：如果你也是一位家长，我相信你会理解的。在这篇文章中，我想记录一下 Veloren 在开发过程中做出的一些不同寻常的选择。如果你正在开发游戏，或许会觉得其中一些内容很有趣。

### ECS
### 实体组件系统 (ECS)

Veloren is built on an ECS (Entity Component System) rather than a more traditional object-oriented class hierarchy. Nowadays - and especially in the Rust ecosystem - this is much more common, but when we started the project in 2018 it was surprisingly rarely used for anything but demoware and we had to invent a lot of concepts internally to make it work for our needs. We’ve benefitted massively from this decision: Veloren scales far better than most multiplayer games and will happily hit 50% core utilisation on a 48 thread server with over 500 players connected and 10s of thousands of entities interacting in the game world. Most MMOs can only achieve these numbers by either reducing the scope of gameplay (fewer cross-entity interactions) or aggressively sharding players across different world spaces.

Veloren 是基于 ECS（实体组件系统）构建的，而不是传统的面向对象类层次结构。如今——特别是在 Rust 生态系统中——这已经非常普遍，但在 2018 年我们启动项目时，它除了用于演示软件外很少被使用，我们不得不内部发明许多概念来满足我们的需求。我们从这个决定中获益匪浅：Veloren 的扩展性远超大多数多人游戏，在拥有 500 多名在线玩家和数万个实体在游戏世界中交互的情况下，它可以在 48 线程服务器上轻松达到 50% 的核心利用率。大多数大型多人在线游戏（MMO）只能通过缩小游戏范围（减少实体间的交互）或将玩家激进地分流到不同的世界空间来实现这些数据。

ECS does have some unexpected quirks. In a traditional game engine, different kinds of entities are separated by a compile-time bifurcation at the type level, with polymorphism between classes being an opt-in for specific cases. With an ECS, polymorphism is the default and a taxonomy of entities is something that must be opted into. This has resulted in some interesting side effects: We once had a bug in which players were assigned an ItemDrop component based on the items they were carrying. Due to a slightly botched transition between the way loot was implemented, this resulted in players being able to ‘pick up’ other players when nearby. This would drop the player’s entity, kicking them from the game server. When we first implemented mounts (the ability for characters to ride things like horses), the cycle detection logic (that prevents mutually-mounted entities) and the control passthrough logic (which allows the rider to pass control instructions to the mount) were both faulty. This meant that players could construct enormous towers of entities all riding the one below, or even create mount cycles, which resulted in amusing Bethesda-style catherine wheels of chaos as the physics engine tried desperately to resolve the contradictory mounting constraints.

ECS 确实有一些意想不到的怪癖。在传统的游戏引擎中，不同类型的实体在编译时通过类型层面的分叉进行区分，类之间的多态性仅在特定情况下选择性使用。而在 ECS 中，多态性是默认的，实体的分类反而需要手动定义。这导致了一些有趣的副作用：我们曾遇到一个 Bug，玩家根据他们携带的物品被分配了一个“掉落物”（ItemDrop）组件。由于战利品实现方式的转换出现了一点小失误，导致玩家在靠近时可以“捡起”其他玩家。这会丢弃玩家实体，从而将他们踢出游戏服务器。当我们首次实现坐骑功能（角色骑乘马匹等）时，循环检测逻辑（防止相互骑乘）和控制传递逻辑（允许骑手向坐骑发送控制指令）都有缺陷。这意味着玩家可以构建巨大的实体塔，一个骑着一个，甚至创造出骑乘循环，当物理引擎拼命试图解决这些矛盾的骑乘约束时，就会产生类似贝塞斯达（Bethesda）游戏那种滑稽的混乱旋转场面。

### Player / NPC duality
### 玩家与 NPC 的二元性

To the maximum possible extent, player characters and NPCs are the same. For example, both:
Interact with the physics engine in the same way. NPCs cannot teleport, phase through blocks, or artificially control their physics properties. If the NPC’s agent code isn’t smart enough to account for the NPC’s momentum and friction when traversing a cliff edge, they will fall off.
Have exactly the same movement control options. All movement and control options go through the Controller ECS component, which acts as a sort of virtual gamepad. For players, Controller inputs are provided by the player’s keyboard, mouse, and physical gamepad inputs. For NPCs, Controller inputs are provided by the game’s agent decision tree system.
Are governed by the same movement controller code. Controller inputs are constrained by the physical abilities of the character’s body and translated into inputs for the physics engine with exactly the same code.
Have the exact same skill tree and experience system. In previously iterations of the game sound effects would even get played when a nearby NPC levelled up!

在最大程度上，玩家角色和 NPC 是完全相同的。例如，两者：
以相同的方式与物理引擎交互。NPC 不能传送、穿墙或人为控制其物理属性。如果 NPC 的代理代码在穿过悬崖边缘时不够智能，无法考虑到 NPC 的动量和摩擦力，它们就会掉下去。
拥有完全相同的移动控制选项。所有的移动和控制选项都通过 Controller ECS 组件，它充当一种虚拟游戏手柄。对于玩家，控制器输入由键盘、鼠标和物理手柄提供；对于 NPC，控制器输入则由游戏的代理决策树系统提供。
受相同的移动控制器代码管理。控制器输入受到角色身体物理能力的限制，并由完全相同的代码转换为物理引擎的输入。
拥有完全相同的技能树和经验系统。在游戏的早期版本中，当附近的 NPC 升级时，甚至会播放音效！

### Chonks
### Chonks（区块列）

Veloren is a voxel game. Usually, voxel games take one of several approaches to storing their terrain data: Big 3D arrays of blocks, addressed via some sort of hash table into a series of chunks; RLE-encoded voxel data, usually grouped into chunks; Octrees, where the whole world is defined as a recursive tree of increasingly smaller voxel 2x2x2 cubes.

Veloren 是一款体素游戏。通常，体素游戏采用以下几种方法之一来存储地形数据：大型 3D 方块数组，通过某种哈希表寻址到一系列区块；RLE（行程长度编码）编码的体素数据，通常分组为区块；八叉树，整个世界被定义为由越来越小的 2x2x2 体素立方体组成的递归树。

In practice, each approach has big problems. Big arrays are fast but provide little scope for compression. RLE only compresses well when the voxel data appears as large groups of homogenous blocks, and has awful random access performance. Octrees are extremely unfriendly to modern CPU caches. Veloren uses neither. Instead, it has a data structure we’ve internally called ‘chonks’ (an affectionate portmanteau of ‘column’ and ‘chunk’). It uses an internal single-level index table in which groups of NxNxN blocks can be represented as either ‘homogeneous’ (self-similar) or ‘heterogenous’ (each requiring a different index in the table). Each chonk is also split into an arbitrary number of fixed-size vertical ‘sub-chunks’, each offset from the vertical origin. All in all, this is a good tradeoff between cache coherence and compression and provided excellent random access performance.

实际上，每种方法都有很大的问题。大数组速度快但压缩空间小。RLE 仅在体素数据表现为大片同质方块时压缩效果好，且随机访问性能极差。八叉树对现代 CPU 缓存极其不友好。Veloren 两者都没用。相反，它使用了一种我们内部称为“chonks”（“column”和“chunk”的亲昵合成词）的数据结构。它使用一个内部单级索引表，其中 NxNxN 的方块组可以表示为“同质”（自相似）或“异质”（每个都需要表中的不同索引）。每个 chonk 还被拆分为任意数量的固定大小的垂直“子区块”，每个子区块都相对于垂直原点进行偏移。总而言之，这是缓存一致性和压缩之间的一个很好的权衡，并提供了出色的随机访问性能。

### World pre-generation
### 世界预生成

Most voxel games, like Minecraft, generate more of the world as players explore. Instead, Veloren pre-generates the entire world on startup at a lower resolution and ‘fills in’ small details when players get close using a variety of different interpolation and noise-based techniques. This up-front generation step means that Veloren can support complex world features that simply cannot be implemented with local constraint solving only, such as long rivers that always flow downhill. In addition, we get to spend time performing some simulation of the world before the game starts, resulting in more interesting features.

大多数体素游戏（如《我的世界》）是在玩家探索时生成更多的世界。而 Veloren 则在启动时以较低的分辨率预生成整个世界，并在玩家靠近时使用各种不同的插值和基于噪声的技术来“填充”细节。这种预生成步骤意味着 Veloren 可以支持仅靠局部约束求解无法实现的复杂世界特征，例如总是向下流动的长河。此外，我们可以在游戏开始前花时间对世界进行一些模拟，从而产生更有趣的特性。

A short aside on what 'procedural generation' even is
关于什么是“程序化生成”的简短题外话

If you ask most folk to describe procedural generation, they might say something like ‘random game content’. This is exactly backward: procedural generation is about defining constraints between elements of gameplay that tickle the habitual pattern-matching tendencies of the human brain. The best procedural generation systems will weave complex narrative.

如果你问大多数人如何描述程序化生成，他们可能会说“随机游戏内容”。这完全是本末倒置：程序化生成实际上是定义游戏元素之间的约束，以激发人类大脑习惯性的模式匹配倾向。最好的程序化生成系统能够编织出复杂的叙事。