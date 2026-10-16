---
title: "I Love Software Rendering"
originalUrl: "https://www.jamesfmackenzie.com/2026/10/13/i-love-software-rendering/"
date: "2026-10-16T12:52:08.000Z"
excerpt: false
---

I love software rendering. The best DOS experience I’ve had in a long while was Quake in its software renderer at 800×600, running at a locked 60fps on my Dell OptiPlex 380. It’s one of the best-looking things I’ve seen a DOS game do.

我热爱软件渲染。我最近体验过最棒的 DOS 游戏经历，是在我的 Dell OptiPlex 380 上以 800×600 分辨率、锁定 60 帧运行的《雷神之锤》（Quake）软件渲染版。这是我见过 DOS 游戏呈现出的最佳视觉效果之一。

That’s not how most people remember those games looking. In the 90s you either ran them in software at a low resolution, or you bought a 3D card and played the accelerated version. Today there’s a third option: run the software renderer on a machine fast enough to push it at resolutions nobody could use back then.

这并不是大多数人对这些游戏画面的记忆。在 90 年代，你要么以低分辨率运行软件渲染版，要么购买一块 3D 显卡来玩加速版。如今有了第三种选择：在一台足够快的机器上运行软件渲染，以当年无人能及的分辨率来呈现画面。

In a software-rendered game, the CPU draws every pixel. There’s no 3D card involved: the game works out each frame in its own code and writes it straight to video memory. Doom, Duke Nukem 3D, Blood and the original Quake all work this way.

在软件渲染的游戏中，每一个像素都由 CPU 绘制。这不涉及 3D 显卡：游戏通过自身的代码计算每一帧，并直接写入显存。《毁灭战士》（Doom）、《毁灭公爵 3D》（Duke Nukem 3D）、《血祭》（Blood）以及最初的《雷神之锤》都是以这种方式运作的。

When 3D cards arrived, many games got accelerated versions. GLQuake came after Quake, and Blood and Tomb Raider got 3dfx modes. Those versions hand the drawing to the graphics card, and they look different.

当 3D 显卡问世后，许多游戏推出了加速版本。GLQuake 在《雷神之锤》之后发布，《血祭》和《古墓丽影》（Tomb Raider）也获得了 3dfx 模式。这些版本将绘图任务交给显卡，因此看起来与原版不同。

It’s sharp. Software renderers generally sample textures pixel by pixel, so every texel stays a crisp square. Early 3D cards smoothed textures with bilinear filtering, which looked impressive in 1997 but turns everything soft and blurry to my eye now.

画面很锐利。软件渲染器通常逐像素采样纹理，因此每个纹理像素都能保持清晰的方形。早期的 3D 显卡使用双线性过滤来平滑纹理，这在 1997 年看起来令人印象深刻，但在我现在的眼里，它让一切都变得柔和且模糊。

It’s gritty. Most of these games ran in 256 colours, with lighting done through lookup tables into that palette. Shadows fall off in visible steps rather than smooth gradients. Technically that’s colour banding, a limitation. In practice it gives the games a rough, grimy texture that I really like, and that hardware rendering smooths away.

画面很有质感。这些游戏大多以 256 色运行，光照通过该调色板的查找表完成。阴影呈现出明显的阶梯状，而非平滑的渐变。从技术上讲，这是色彩断层，是一种局限性。但在实际体验中，它赋予了游戏一种粗犷、肮脏的质感，我非常喜欢，而硬件渲染则会将这种质感抹平。

It’s how the games were built. Quake was released with its software renderer, and GLQuake followed. Doom and the Build engine games were designed around their software renderers from the start.

这就是游戏最初的构建方式。《雷神之锤》发布时自带软件渲染器，GLQuake 则是后来推出的。《毁灭战士》和 Build 引擎游戏从一开始就是围绕软件渲染器设计的。

It isn’t always the better option. When I got a Voodoo 2 running in a modern PC, Blood ran fast in its 3dfx mode, but the VESA software modes were the better-looking option. Tomb Raider went the other way: its underwater sections look noticeably better accelerated than in the DOS software renderer. So it’s a preference, not a rule. But for most of the games I care about, I’d pick the software renderer.

这并不总是更好的选择。当我在现代电脑上运行 Voodoo 2 时，《血祭》在 3dfx 模式下运行很快，但 VESA 软件模式看起来效果更好。《古墓丽影》则相反：其水下场景在加速模式下明显比 DOS 软件渲染器看起来更好。所以这是一种偏好，而非准则。但对于我所关注的大多数游戏，我会选择软件渲染。

It’s not just nostalgia, either. Ion Fury, a Build engine game from 2019, still ships with a software renderer.

这也不仅仅是怀旧。2019 年推出的 Build 引擎游戏《离子狂怒》（Ion Fury）依然自带软件渲染器。

Software rendering scales with the CPU. Every extra pixel is work for the processor, so the high VESA resolutions that many late DOS games offered were well beyond the hardware of the day.

软件渲染随 CPU 性能扩展。每一个额外的像素都会增加处理器的负担，因此许多后期 DOS 游戏提供的高 VESA 分辨率在当时远远超出了硬件的承受能力。

Modern hardware can power through most of it. On the OptiPlex 380, Quake at 800×600 holds a locked 60fps. But the heaviest games still push even very fast machines. In his video on the Portwell RUBY-9719, Rasteri shows Build engine games needing far more power at high resolutions, to the point where even a 3.3GHz quad-core Xeon “isn’t quite enough to run Shadow Warrior at full 1600 by 1200”.

现代硬件可以轻松应对大部分情况。在 OptiPlex 380 上，800×600 分辨率的《雷神之锤》能保持锁定 60 帧。但最吃配置的游戏即使在非常快的机器上也会显得吃力。在关于 Portwell RUBY-9719 的视频中，Rasteri 展示了 Build 引擎游戏在高分辨率下需要更强的性能，以至于即使是 3.3GHz 的四核至强（Xeon）处理器，“也无法完全流畅地以 1600×1200 分辨率运行《影子武士》（Shadow Warrior）”。

So if you want to see these games at their best, you want the fastest machine you can get that still runs them.

因此，如果你想看到这些游戏呈现出最佳状态，你需要尽可能寻找一台能运行它们的、性能最强的机器。

There are other ways to get software rendering on a modern PC. Source ports of Doom and Quake run software renderers on Windows, and Ion Fury runs on Windows natively. They’re great.

在现代电脑上实现软件渲染还有其他方法。《毁灭战士》和《雷神之锤》的源端口可以在 Windows 上运行软件渲染器，而《离子狂怒》则原生支持 Windows。它们都很棒。

What I’m after is the original DOS versions running as they were released, on real hardware. DOSBox is the obvious alternative, but some DOS titles struggle in DOSBox, while on real hardware they behave exactly as intended.

我所追求的是在真实硬件上运行这些游戏发布时的原始 DOS 版本。DOSBox 是显而易见的替代方案，但一些 DOS 游戏在 DOSBox 中运行并不理想，而在真实硬件上，它们的表现完全符合预期。

That leaves one more problem: sound. A fast machine running native DOS needs a sound card the games can talk to, and modern PCs don’t have one. That’s a story of its own.

这还留下了一个问题：声音。一台运行原生 DOS 的高速机器需要一张游戏能够识别的声卡，而现代电脑并没有。那又是另一个故事了。