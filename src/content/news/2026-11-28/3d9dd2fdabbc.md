---
title: "Tiny Hat: a new Linux distro dedicated to retro gamedev"
originalUrl: "https://roboticoverlords.org/tinyhat"
date: "2026-11-27T09:11:13.000Z"
excerpt: false
---

Tiny Hat: a new Linux distro dedicated to retro gamedev

Tiny Hat：一个致力于复古游戏开发的全新 Linux 发行版

Tiny Hat A Linux distro for 32-bit and 64-bit x86 computers. Intended for retro gaming and retro game development (DOS, GBA, SNES, NES, TIC-80, CHIP-8, C64 and ZX Spectrum).

Tiny Hat 是一款面向 32 位和 64 位 x86 计算机的 Linux 发行版。它旨在用于复古游戏和复古游戏开发（支持 DOS、GBA、SNES、NES、TIC-80、CHIP-8、C64 和 ZX Spectrum）。

The image is signed and fully reproducible. Uses less than 100M RAM after booting (87M on the 32-bit version, right over 100M on the 64-bit version). Uses just a bit more than 600M disk space, and is fully usable on a 1G memory stick.

该镜像经过签名且完全可复现。启动后内存占用不到 100M（32 位版本为 87M，64 位版本略高于 100M）。磁盘空间占用仅略多于 600M，完全可以在 1G 的 U 盘上使用。

Works better than MS-DOS and FreeDOS for playing games on the old x86 retro gaming computer I created the distro for (because of hardware support). Comes with modern libraries, like SDL3, Pipewire and Raylib. Uses dwl and Wayland.

在作者为之创建该发行版的旧款 x86 复古游戏机上，它在运行游戏时的表现优于 MS-DOS 和 FreeDOS（得益于硬件支持）。它配备了 SDL3、Pipewire 和 Raylib 等现代库，并使用 dwl 和 Wayland。

Comes with the Orbiton editor and an easy way to compile and run C programs, DOS Assembly programs, GBA programs and also LÖVE+Fennel programs. Some applications that comes with the i686 version requires SSE right now, but that will be fixed in the next release.

它自带 Orbiton 编辑器，并提供了一种简便的方法来编译和运行 C 程序、DOS 汇编程序、GBA 程序以及 LÖVE+Fennel 程序。目前 i686 版本附带的一些应用程序需要 SSE 支持，但这将在下一个版本中得到修复。

There is support for aarch64 and rpi4, but it is experimental. Release page: https://github.com/xyproto/tinyhat/releases

该发行版对 aarch64 和 rpi4 提供支持，但目前仍处于实验阶段。发布页面：https://github.com/xyproto/tinyhat/releases