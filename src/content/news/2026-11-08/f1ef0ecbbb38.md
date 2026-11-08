---
title: "First steps in bare-metal programming using UEFI"
originalUrl: "https://kevinboone.me/efitest_index.html"
date: "2026-11-06T16:50:29.000Z"
excerpt: false
---

# First steps in bare-metal programming using UEFI

These articles are about using a Linux workstation to develop bare-metal applications for a PC-type computer with UEFI firmware. They are written for experienced Linux developers, but assume no prior knowledge of UEFI. The articles cover the software tools needed, how to compile and link, how to create a bootable disk, and basic file management.

这些文章旨在介绍如何使用 Linux 工作站为配备 UEFI 固件的 PC 类计算机开发裸机应用程序。文章面向有经验的 Linux 开发人员，但假设读者此前并不了解 UEFI。内容涵盖了所需的软件工具、编译与链接方法、如何创建可引导磁盘以及基本的文件管理。

Please note that I wrote these articles to be read in order. Each one relies on information from the previous articles, and it might be difficult to follow them out of sequence.

请注意，这些文章是按顺序编写的，建议按顺序阅读。每一篇文章都依赖于前文的信息，如果跳跃阅读，可能会难以理解。

Part 1 – Compiling and Linking
Part 2 – The EFI system partition
Part 3 – Making a DVD or USB flash image
Part 4 – A pragmatic digression
Part 5 – Handling files using the Simple File Protocol

第 1 部分 – 编译与链接
第 2 部分 – EFI 系统分区
第 3 部分 – 制作 DVD 或 USB 闪存映像
第 4 部分 – 一次务实的离题
第 5 部分 – 使用简单文件协议 (Simple File Protocol) 处理文件

Have you posted something in response to this page? Feel free to send a webmention to notify me, giving the URL of the blog or page that refers to this one.

您是否发布了针对本页面的回应内容？欢迎发送 Webmention 通知我，并提供引用本页面的博客或网页链接。