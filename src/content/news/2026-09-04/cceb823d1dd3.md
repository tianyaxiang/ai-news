---
title: "CERN transitioning industrial computers to Debian after being a longtime RHEL institution"
originalUrl: "https://www.phoronix.com/news/CERN-Goes-Debian-Leaving-RHEL"
date: "2026-09-03T23:28:20.579Z"
---

# CERN transitioning industrial computers to Debian after being a longtime RHEL institution
# 欧洲核子研究中心（CERN）在长期使用 RHEL 后，正将工业计算机迁移至 Debian

CERN, the European Organization for Nuclear Research, besides being well known for its Large Hadron Collider (LHC) is known among longtime Linux users as a RHEL/CentOS shop. CERN formally even co-maintained the Scientific Linux RHEL derivative with other educational/research institutions in the past.

欧洲核子研究中心（CERN）除了以其大型强子对撞机（LHC）闻名外，在资深 Linux 用户眼中，它一直以来也是 RHEL/CentOS 的大本营。过去，CERN 甚至曾与其他教育和研究机构共同维护过基于 RHEL 的衍生版本 Scientific Linux。

So to much surprise now, CERN is transitioning to Debian Linux for industrial accelerator-control computers. CERN talked about this exciting news at the MiniDebConf that took place in Winterthur, Switzerland this past weekend.

因此，令人惊讶的是，CERN 目前正将其工业加速器控制计算机迁移至 Debian Linux。在上周末于瑞士温特图尔举行的 MiniDebConf 大会上，CERN 分享了这一令人振奋的消息。

CERN had used their RHEL-derived Scientific Linux for about a decade prior to moving to CentOS in 2015. Now after a decade with CentOS, they are moving on and embracing Debian for a portion of their systems.

在 2015 年转向 CentOS 之前，CERN 已经使用了约十年的 Scientific Linux。如今，在经历了十年的 CentOS 使用期后，他们决定继续前进，并开始在部分系统中拥抱 Debian。

CERN engineers had considered moving to CentOS Stream as a more natural pathway but ultimately they say "the straw that broke the camel's back" to abandon Red Hat Enterprise Linux for their industrial accelerator-control computers was the "-march=x86-64-v2" compiler flag default as "forced obsolescence" for old hardware.

CERN 的工程师曾考虑将 CentOS Stream 作为更自然的过渡路径，但他们最终表示，放弃 Red Hat Enterprise Linux 用于工业加速器控制计算机的“最后一根稻草”，是其默认启用的 `-march=x86-64-v2` 编译器标志，这被视为对旧硬件的“强制淘汰”。

Among the challenges they have faced though in their Debian on-boarding is the lack of standard tooling for automated building and publishing of packages - a lot of gaps in the official tooling. There are also a number of tools not supporting multiple versions of the same packages.

不过，他们在转向 Debian 的过程中也面临了一些挑战，例如缺乏用于自动化构建和发布软件包的标准工具——官方工具链中存在许多空白。此外，还有一些工具不支持同一软件包的多个版本共存。

CERN is planning by the end of 2026 to have all 2,200+ of their industrial computers and embedded systems running Debian 13. Those wishing to learn more can see this video presentation (AV1 WebM) from the MiniDebConf.

CERN 计划在 2026 年底前，将其全部 2200 多台工业计算机和嵌入式系统迁移至 Debian 13。希望了解更多信息的人员可以观看此次 MiniDebConf 大会上的视频演示（AV1 WebM 格式）。

Update: CERN has clarified that their focus with the migration is on their industrial accelerator-control computers while data centers and experimental computing remain on RHEL/AlmaLinux.

更新：CERN 已澄清，此次迁移的重点是其工业加速器控制计算机，而数据中心和实验计算平台仍将继续使用 RHEL/AlmaLinux。