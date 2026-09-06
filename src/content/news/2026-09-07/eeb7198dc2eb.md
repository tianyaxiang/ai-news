---
title: "llvm / llvm-project"
originalUrl: "https://github.com/llvm/llvm-project"
date: "2026-09-06T22:57:28.990Z"
---

# llvm / llvm-project

**The LLVM Compiler Infrastructure**
**LLVM 编译器基础设施**

Welcome to the LLVM project! This repository contains the source code for LLVM, a toolkit for the construction of highly optimized compilers, optimizers, and run-time environments.
欢迎来到 LLVM 项目！本仓库包含了 LLVM 的源代码，这是一套用于构建高度优化的编译器、优化器和运行时环境的工具包。

The LLVM project has multiple components. The core of the project is itself called "LLVM". This contains all of the tools, libraries, and header files needed to process intermediate representations and convert them into object files. Tools include an assembler, disassembler, bitcode analyzer, and bitcode optimizer.
LLVM 项目包含多个组件。该项目的核心本身被称为“LLVM”。它包含了处理中间表示（IR）并将其转换为目标文件所需的所有工具、库和头文件。这些工具包括汇编器、反汇编器、位码（bitcode）分析器和位码优化器。

C-like languages use the Clang frontend. This component compiles C, C++, Objective-C, and Objective-C++ code into LLVM bitcode -- and from there into object files, using LLVM. Other components include: the libc++ C++ standard library, the LLD linker, and more.
类 C 语言使用 Clang 前端。该组件将 C、C++、Objective-C 和 Objective-C++ 代码编译为 LLVM 位码，然后利用 LLVM 将其转换为目标文件。其他组件包括：libc++ C++ 标准库、LLD 链接器等。

**Getting the Source Code and Building LLVM**
**获取源代码与构建 LLVM**

Consult the Getting Started with LLVM page for information on building and running LLVM. For information on how to contribute to the LLVM project, please take a look at the Contributing to LLVM guide.
请查阅“LLVM 入门”（Getting Started with LLVM）页面，获取有关构建和运行 LLVM 的信息。有关如何为 LLVM 项目做出贡献的信息，请查看“贡献 LLVM”（Contributing to LLVM）指南。

**Getting in touch**
**联系我们**

Join the LLVM Discourse forums, Discord chat, LLVM Office Hours or Regular sync-ups. The LLVM project has adopted a code of conduct for participants to all modes of communication within the project.
欢迎加入 LLVM Discourse 论坛、Discord 聊天室、LLVM 办公时间（Office Hours）或定期同步会议。LLVM 项目已为参与项目内所有交流方式的成员制定了行为准则。