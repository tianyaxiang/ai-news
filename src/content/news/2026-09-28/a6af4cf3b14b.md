---
title: "willfaust / Madeira"
originalUrl: "https://github.com/willfaust/Madeira"
date: "2026-09-27T23:53:56.255Z"
---

# willfaust / Madeira

Madeira Run Windows PC games on a non-jailbroken iPhone. Madeira combines Wine (ARM64EC), FEX-Emu for x86-64 → ARM64 translation, and DXMT for D3D11 → Metal, running as a single Mach process on iOS with wineserver as a thread rather than a separate process.
Madeira 是一款能在非越狱 iPhone 上运行 Windows PC 游戏的工具。它结合了 Wine (ARM64EC)、用于 x86-64 到 ARM64 转译的 FEX-Emu，以及用于将 D3D11 转换为 Metal 的 DXMT。该程序在 iOS 上作为一个单一的 Mach 进程运行，并将 wineserver 作为线程而非独立进程处理。

Status Thumper and ULTRAKILL are playable. Marvel Cosmic Invasion has reached gameplay, though a run has also ended in an unexplained termination and its controls are not yet reliable. Others reach gameplay at low frame rates. This is a research project, not a product: expect rough edges, per-title quirks and breaking changes.
目前《Thumper》和《ULTRAKILL》已可游玩。《Marvel Cosmic Invasion》已能进入游戏画面，但运行过程中曾出现过不明原因的崩溃，且控制尚不稳定。其他游戏虽能进入画面，但帧率较低。这是一个研究项目而非商业产品：请预料到它存在粗糙之处、针对特定游戏的兼容性问题以及破坏性更新。

Requirements A non-jailbroken iPhone. Development has been on an A15 (iPhone 13 Pro). JIT, which on iOS requires a debugger to attach — StikDebug is what this project uses. An Apple ID for signing. A free account works; its provisioning profiles expire after 7 days, so the app must be rebuilt and reinstalled weekly. The app's container survives reinstall, so prefixes and saves are preserved. Because JIT requires debugger attach, this app cannot be distributed through the App Store. It is installed by sideloading.
需求：一台非越狱的 iPhone。开发环境基于 A15 芯片（iPhone 13 Pro）。JIT 功能在 iOS 上需要附加调试器，本项目使用的是 StikDebug。需要一个 Apple ID 进行签名。免费账户即可使用；但其预置描述文件（provisioning profiles）7 天后会过期，因此必须每周重新构建并安装。应用的容器在重装后会保留，因此前缀（prefixes）和存档不会丢失。由于 JIT 需要附加调试器，该应用无法通过 App Store 分发，必须通过侧载（sideloading）安装。

Building The build is split across several chains — the unix-side Wine libraries, the ARM64EC PE modules, FEX, DXMT and the iOS app itself. build/*/build.sh covers the native pieces; the app is built with xcodebuild. git clone --recurse-submodules <this repo> Note that FEX, wine and research/dxmt are submodules pointing at forks containing the iOS work; upstream clones will not build here.
构建：构建过程分为多个链条——Unix 端的 Wine 库、ARM64EC PE 模块、FEX、DXMT 以及 iOS 应用本身。`build/*/build.sh` 负责处理原生组件；应用则通过 `xcodebuild` 构建。使用 `git clone --recurse-submodules <仓库地址>`。请注意，FEX、wine 和 research/dxmt 是指向包含 iOS 相关工作的分支（forks）的子模块；直接克隆上游仓库无法在此处构建。

License GPL-3.0-or-later — see LICENSE. Derivatives that are distributed must remain open source.
许可证：GPL-3.0-or-later — 详见 LICENSE 文件。分发的衍生版本必须保持开源。

Upstream licenses vs. this project's forks Those are the licenses of the upstream projects: Wine and GnuTLS LGPL-2.1-or-later, GMP and Nettle LGPL-3.0-or-later, FEX-Emu and DXMT MIT, rpmalloc 0BSD. Their texts are in LICENSES/, and upstream code remains available under them from upstream. The forks used here are not licensed identically to their upstreams. Each carries its own LICENSE-MADEIRA.md saying exactly what applies:
上游许可证与本项目分支的对比：上游项目的许可证如下：Wine 和 GnuTLS 为 LGPL-2.1-or-later，GMP 和 Nettle 为 LGPL-3.0-or-later，FEX-Emu 和 DXMT 为 MIT，rpmalloc 为 0BSD。相关文本位于 LICENSES/ 目录下，上游代码仍可在其原始许可证下从上游获取。本项目使用的分支与上游的许可证并不完全相同。每个分支都有自己的 LICENSE-MADEIRA.md 说明适用条款：

Fork Terms wine relicensed to GPL-3.0-or-later under LGPL-2.1 §3 FEX, dxmt upstream MIT preserved; modifications GPL-3.0-or-later rpmalloc upstream 0BSD preserved; Will Faust's modifications GPL-3.0-or-later This is not retroactive: those forks were public beforehand, so anything already obtained under a permissive license stays available under it. THIRD-PARTY-NOTICES.md has the per-component breakdown. Note in particular that the Microsoft Visual C++ runtime DLLs are not distributed here and must be supplied yourself — see tools/fetch-vcruntime.md.
分支条款：Wine 根据 LGPL-2.1 第 3 条重新授权为 GPL-3.0-or-later；FEX 和 DXMT 保留上游 MIT 协议，修改部分采用 GPL-3.0-or-later；rpmalloc 保留上游 0BSD 协议，Will Faust 的修改部分采用 GPL-3.0-or-later。此举不具追溯力：这些分支此前已公开，因此任何已在宽松许可证下获取的内容仍可在原许可证下使用。THIRD-PARTY-NOTICES.md 提供了各组件的详细说明。特别注意，Microsoft Visual C++ 运行时 DLL 不包含在本项目中，必须自行提供——详见 tools/fetch-vcruntime.md。

A note on upstream contributions The forks here contain substantial AI-assisted work. FEX-Emu's contribution policy states that AI must not be used to generate code for contributions to that project, so do not submit AI-generated changes from this fork upstream. The MIT license permits the fork itself; the policy governs contributions back. Check each upstream's contribution policy before proposing changes to it.
关于上游贡献的说明：本项目分支包含大量 AI 辅助工作。FEX-Emu 的贡献政策规定，不得使用 AI 生成代码提交至该项目，因此请勿将此分支中 AI 生成的更改提交至上游。MIT 许可证允许进行分支，但贡献政策约束了回馈行为。在向上游提交更改前，请务必查阅各项目的贡献政策。