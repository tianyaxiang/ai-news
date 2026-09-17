---
title: "Building a Real Android Development Loop on an ARM64 Phone with Ternux + ADT"
originalUrl: "https://dev.to/soobujmiah/building-an-arm64-android-development-environment-adt-ternux-4bi1"
date: "2026-09-17T23:41:54.764Z"
---

# Building a Real Android Development Loop on an ARM64 Phone with Ternux + ADT
# 在 ARM64 手机上利用 Ternux + ADT 构建真实的 Android 开发闭环

What if your Android phone could be more than the device you build for? What if it could also be the Linux development environment you build on, while remaining connected to a real Android device for the complete build, test, debug, and validation cycle?
如果你的 Android 手机不仅仅是你构建应用的目标设备，会怎样？如果它同时还能作为你进行开发的 Linux 环境，并能连接到真实的 Android 设备以完成完整的构建、测试、调试和验证周期，又会怎样？

That is the direction I am exploring with two projects: Ternux — a Debian + Xfce4 Linux workspace on Android using Termux and PRoot; ADT — a native ARM64 Android development toolchain for Linux. Together, they create an interesting workflow: Write / Modify Code ↓ Build ↓ Sign ↓ ADB Install ↓ Real Device ↓ Test ↓ Read Logs ↓ Debug ↓ Fix ↓ Rebuild ↓ Repeat. The important part is the loop.
这正是我通过两个项目正在探索的方向：Ternux——一个基于 Termux 和 PRoot 在 Android 上运行的 Debian + Xfce4 Linux 工作空间；以及 ADT——一套用于 Linux 的原生 ARM64 Android 开发工具链。它们共同创造了一个有趣的工作流：编写/修改代码 ↓ 构建 ↓ 签名 ↓ ADB 安装 ↓ 真机运行 ↓ 测试 ↓ 读取日志 ↓ 调试 ↓ 修复 ↓ 重新构建 ↓ 重复。最关键的部分在于这个闭环。

### Ternux: the Linux workspace
### Ternux：Linux 工作空间

Ternux provides a Debian + Xfce4 Linux environment directly on an ARM64 Android device through Termux and PRoot. It provides the userspace needed for development while using the Android device's existing kernel. The environment can include: Debian ARM64, Xfce4, Termux:X11, Linux development tools, Git, compilers and build tools, Mesa graphics, Zink → Turnip on supported Adreno devices, Vulkan tools, and optional LLM and development workloads. No Android root is required. The goal is not to emulate another computer. It is to turn the Android device itself into a portable Linux workspace.
Ternux 通过 Termux 和 PRoot 直接在 ARM64 Android 设备上提供 Debian + Xfce4 Linux 环境。它在利用 Android 设备现有内核的同时，提供了开发所需的用户空间。该环境可以包含：Debian ARM64、Xfce4、Termux:X11、Linux 开发工具、Git、编译器和构建工具、Mesa 图形库、支持 Adreno 设备的 Zink → Turnip 转换、Vulkan 工具，以及可选的 LLM 和开发负载。无需 Android Root 权限。其目标不是模拟另一台计算机，而是将 Android 设备本身变成一个便携的 Linux 工作空间。

### ADT: the Android development layer
### ADT：Android 开发层

Ternux provides the workspace. ADT provides the Android development toolchain. ADT targets Linux ARM64 environments and provides native ARM64 Android build and platform tooling, including: "aapt", "aapt2", "aidl", "zipalign", "dexdump", "adb", "fastboot", "apksigner", "d8", Android platforms, and supporting JDK/CMake/Ninja tooling. The important distinction is that ADT is not simply a collection of Android binaries. The host tools are built for the ARM64 Linux environment. That makes an ARM64 Android phone running Ternux a viable host for the development workflow.
Ternux 提供了工作空间，而 ADT 提供了 Android 开发工具链。ADT 针对 Linux ARM64 环境，提供原生的 ARM64 Android 构建和平台工具，包括：“aapt”、“aapt2”、“aidl”、“zipalign”、“dexdump”、“adb”、“fastboot”、“apksigner”、“d8”、Android 平台以及配套的 JDK/CMake/Ninja 工具。重要的区别在于，ADT 不仅仅是 Android 二进制文件的集合，其宿主工具是专为 ARM64 Linux 环境构建的。这使得运行 Ternux 的 ARM64 Android 手机成为开发工作流的可行宿主。

### The real-device connection changes the workflow
### 真机连接改变了工作流

A build environment becomes much more useful when it can communicate with the actual Android device. ADB provides that bridge. From the Linux/PRoot environment, the development workflow can communicate with an Android device through ADB when the device is appropriately paired and accessible. That means the developer does not have to stop after: source → compile → APK. The APK can continue through: APK ↓ ADB ↓ Install ↓ Launch ↓ Test on real hardware ↓ Collect logs ↓ Diagnose. This is important because a successful compilation does not prove that an application works correctly on the target device.
当构建环境能够与真实的 Android 设备通信时，它会变得更有用。ADB 提供了这座桥梁。在 Linux/PRoot 环境中，只要设备已正确配对并可访问，开发工作流就可以通过 ADB 与 Android 设备通信。这意味着开发者不必在“源码 → 编译 → APK”这一步停下。APK 可以继续流程：APK ↓ ADB ↓ 安装 ↓ 启动 ↓ 在真实硬件上测试 ↓ 收集日志 ↓ 诊断。这一点至关重要，因为编译成功并不代表应用程序在目标设备上能正常运行。

Real-device testing exposes things that compilation alone cannot: ABI problems, JNI loading failures, runtime crashes, permission issues, device-specific behavior, graphics/runtime problems, process failures, and incorrect assumptions about the Android environment.
真机测试能暴露出仅靠编译无法发现的问题：ABI 问题、JNI 加载失败、运行时崩溃、权限问题、特定设备行为、图形/运行时问题、进程故障以及对 Android 环境的错误假设。

### Manual development loop
### 手动开发闭环

The simplest version is completely manual. A developer can work inside Ternux, use ADT to build the application, connect to the device through ADB, install the APK, run it, inspect the result, and then return to the source. This creates a short feedback loop between development and reality.
最简单的版本是完全手动的。开发者可以在 Ternux 内部工作，使用 ADT 构建应用程序，通过 ADB 连接设备，安装 APK，运行它，检查结果，然后回到源码。这在开发与现实之间建立了一个快速反馈闭环。

### Why the real device matters
### 为什么真机至关重要

A simulator or static build check can answer some questions. A physical device answers different questions. For example: "Did the native library actually load?", "Did Android select the expected 'arm64-v8a' binary?", "Does the application process remain alive?", "What does 'logcat' report?", "Does the application behave correctly on this specific Android version and hardware?". Those questions require execution. That is why ADT's validation work focuses on the complete path rather than simply checking whether binaries exist.
模拟器或静态构建检查可以回答一些问题，但物理设备能回答不同的问题。例如：“原生库真的加载了吗？”、“Android 是否选择了预期的 'arm64-v8a' 二进制文件？”、“应用程序进程是否保持存活？”、“'logcat' 报告了什么？”、“应用程序在此特定 Android 版本和硬件上表现是否正确？”。这些问题需要执行才能回答。这就是为什么 ADT 的验证工作专注于完整路径，而不是仅仅检查二进制文件是否存在。

### From manual testing to agent-assisted development
### 从手动测试到智能体辅助开发

This is where the architecture becomes more interesting. Once the development environment, build tools, ADB access, logs, and source tree are available from the same Linux workspace, an agent can potentially operate the same feedback loop. Instead of: Human: build → install → test → read logs → diagnose → fix, the workflow can become: Agent ↓ Modify code ↓ Build ↓ Install with ADB ↓ Run/test ↓ Collect logs ↓ Analyze failure ↓ Modify code ↓ Build again ↓ Repeat. The agent does not need a special imaginary development environment. It can use the same tools a developer uses.
这就是该架构变得更有趣的地方。一旦开发环境、构建工具、ADB 访问权限、日志和源码树都在同一个 Linux 工作空间中可用，智能体（Agent）就有可能操作同样的反馈闭环。工作流不再是：人类：构建 → 安装 → 测试 → 读取日志 → 诊断 → 修复，而可以变成：智能体 ↓ 修改代码 ↓ 构建 ↓ 通过 ADB 安装 ↓ 运行/测试 ↓ 收集日志 ↓ 分析故障 ↓ 修改代码 ↓ 再次构建 ↓ 重复。智能体不需要特殊的虚拟开发环境，它可以直接使用开发者所使用的工具。

### The important boundary: autonomy needs control
### 重要的边界：自主性需要控制

Autonomous execution does not mean giving an agent unrestricted access to everything on the phone. A safer architecture is: Agent → Ternux / PRoot → (Source, Toolchain) → ADB → Android Device. The agent should operate within explicit permissions and a defined task boundary. A human can remain the authority over what the agent is allowed to change, while the repetitive build/test/debug cycle becomes automatable.
自主执行并不意味着赋予智能体对手机上所有内容的无限制访问权限。更安全的架构是：智能体 → Ternux / PRoot →（源码、工具链）→ ADB → Android 设备。智能体应在明确的权限和定义的任务边界内运行。人类可以保留对智能体可更改内容的控制权，同时将重复的构建/测试/调试周期自动化。

### Why I find this interesting
### 为什么我觉得这很有趣

The interesting idea is not simply: "Linux on Android." And it is not simply: "Android development on ARM64." It is the combination: "A portable..."
这个想法的有趣之处不仅仅在于“在 Android 上运行 Linux”，也不仅仅是“在 ARM64 上进行 Android 开发”。而是两者的结合：“一个便携的……”