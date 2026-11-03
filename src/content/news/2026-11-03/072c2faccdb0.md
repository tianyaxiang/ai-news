---
title: "Jailbreaking my car's navigation system just so I can change the time"
originalUrl: "https://blog.nns.ee/2026/11/02/renault-hack/"
date: "2026-11-02T16:30:58.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# Jailbreaking my car's navigation system just so I can change the time

The car that I drive is a 2014 Renault Latitude. It's not a fancy car by any means and is starting to show its age, but it gets me from point A to point B and does everything else reasonably well so I've never really had any reason to complain.

我开的车是一辆2014年的雷诺纬度（Renault Latitude）。它绝非什么豪车，也开始显露老态，但它能带我从A点到B点，其他功能也表现尚可，所以我从未有过什么抱怨的理由。

When I bought the car, the previous owner asked me whether I wanted a "navigation map SD card" with it. They mentioned that the car apparently needs this SD card just to change the time on the clock, but I didn't really find that believable - not that they were lying to me, but perhaps they couldn't figure out how to enter the correct settings menu. After all, videos of similar head units online showed the menu with the clock settings option right there.

买车时，前车主问我是否需要一张“导航地图SD卡”。他们提到这辆车似乎必须插上这张SD卡才能调整时钟，但我对此半信半疑——倒不是说他们在骗我，而是可能他们没找到进入正确设置菜单的方法。毕竟，网上同类车机的视频显示，时钟设置选项就在菜单里。

Since the maps on the SD card were apparently very out of date and didn't function properly, I decided I didn't need it and the previous owner tossed it. I didn't really miss it. The dashboard display did show a large "No maps found!" message taking up the majority of the display, but it didn't bother me too much.

由于SD卡里的地图显然已经非常过时且无法正常工作，我决定不需要它，前车主便把它扔了。我并没有觉得有什么不便。仪表盘显示屏上确实出现了一条占据大部分屏幕的“未找到地图！”提示，但这并没有太困扰我。

Like most other European countries, Estonia uses daylight saving time, and we recently switched from summer time (UTC+3) to "winter time" (UTC+2), which meant that the time displayed on the dashboard was out of sync by an hour. I dived into the settings menu, hoping to easily find the "Set time" option in there. That never happened.

像大多数欧洲国家一样，爱沙尼亚实行夏令时。我们最近从夏令时（UTC+3）切换到了“冬令时”（UTC+2），这意味着仪表盘上显示的时间慢了一个小时。我钻进设置菜单，希望能轻松找到“设置时间”选项。结果却没找到。

The menu where the "Set time" option should've been simply didn't have that option. I compared the menus with the ones in online videos, and the option was simply missing. There were two "Settings" buttons on the dash, and one of them worked but only let me change various Bluetooth and phonebook settings, with no time & date settings in sight. The second Settings button did not work whatsoever, instead showing a "No maps detected!" pop up message every time I pressed it.

本该出现“设置时间”选项的菜单里根本没有这个选项。我将菜单与在线视频中的进行了对比，发现该选项确实缺失了。仪表盘上有两个“设置”按钮，其中一个能用，但只能更改各种蓝牙和电话簿设置，根本看不到日期和时间设置。第二个设置按钮完全没反应，每次按下都会弹出一个“未检测到地图！”的提示信息。

I must've spent an hour going through various menus, pressing various buttons or button combinations hoping to land in the correct menu, searching the web for information on this particular unit simply because I refused to believe that there was no option to change the time and I clearly must've been missing something obvious.

我大概花了一个小时翻遍了各种菜单，尝试了各种按钮或组合键，希望能进入正确的菜单，并在网上搜索关于这台特定设备的信息，仅仅是因为我不愿相信竟然没有更改时间的选项，我肯定漏掉了什么显而易见的东西。

### Just RE it

### 逆向工程（RE）

Still in denial, I decided to fetch the firmware and dig into it, hoping to find some indication on how to open the correct settings menu. Luckily, I wasn't the first to embark on this journey and someone had already done some reverse engineering work on this particular unit (https://github.com/andronedev/carminat-tomtom-live-re/blob/main/README.md). While it was in French and seemingly heavily LLM-assisted, it did point me to the correct URLs for fetching the update files themselves.

依然不愿接受现实的我决定获取固件并深入研究，希望能找到打开正确设置菜单的线索。幸运的是，我并不是第一个踏上这段旅程的人，已经有人对这台设备进行了一些逆向工程（https://github.com/andronedev/carminat-tomtom-live-re/blob/main/README.md）。虽然内容是法语且看起来大量使用了大语言模型辅助，但它确实为我指明了获取更新文件的正确网址。

When extracted, the update files included a ttsystem file which turned out to be an ext3 filesystem containing the device's root filesystem, which was pretty much exactly what I was looking for. The unit itself (TomTom Carminat LIVE, codename beaumont) is built around a Samsung S5P6440 SoC running TomTom's custom OS based on Linux 2.6.28.10.

解压后，更新文件包含一个名为 ttsystem 的文件，事实证明这是一个 ext3 文件系统，其中包含了设备的根文件系统，这正是我所寻找的东西。该设备（TomTom Carminat LIVE，代号 beaumont）基于三星 S5P6440 SoC 构建，运行着基于 Linux 2.6.28.10 的 TomTom 定制操作系统。

After reverse engineering it for a while, I came to the conclusion that the previous owner was completely correct. There was absolutely no way to enter the correct settings menu without a navigation SD card inserted. In fact, the menu definition pointing to the Settings applet was read from the SD card itself, and without one inserted containing the right menu definition, the unit didn't even know how to enter the Settings applet. This decision by TomTom (or Renault) is still baffling to me.

经过一段时间的逆向工程，我得出的结论是前车主完全正确。如果不插入导航SD卡，绝对无法进入正确的设置菜单。事实上，指向设置小程序（applet）的菜单定义是从SD卡本身读取的，如果没有插入包含正确菜单定义的SD卡，设备甚至不知道如何进入设置小程序。TomTom（或雷诺）的这一决定至今让我感到困惑。

What made things worse was that this needed to be a legitimate SD card. The system had DRM checks which rejected SD cards without the correct CID (a unique ID burned into the card) and files with signatures based on that specific CID, so I couldn't even copy the files to a blank SD card. I'm guessing the DRM was in place to prevent people from pirating maps.

更糟糕的是，这必须是一张合法的SD卡。系统有DRM检查，会拒绝没有正确CID（烧录在卡中的唯一ID）的SD卡，以及基于该特定CID签名的文件，所以我甚至无法将文件复制到空白SD卡中。我猜DRM的存在是为了防止人们盗版地图。

I don't want maps. I have a phone that I use for navigation. I just want to change the damn time. I checked online and found some third parties selling the card I presumably needed, but with shipping to Estonia, it would've cost me roughly 60 EUR, which I really didn't feel like paying. Fine. I'll just root it and do it myself.

我不需要地图。我有手机可以导航。我只是想改一下该死的时间。我在网上查了一下，发现有一些第三方在卖我可能需要的卡，但加上运费到爱沙尼亚要花大约60欧元，我实在不想付这笔钱。好吧，那我就自己获取Root权限来搞定它。

### Easy wins?

### 轻松获胜？

I couldn't find anyone online who'd jailbroken one of these before. I found some old forum threads with long-expired image links that had some pretty generic information about the unit itself and the general consensus was that it was difficult to root. I didn't expect a Linux 2.6 system from 2011 to be incredibly hard to hack, so I naively went in looking for some easy wins.

我在网上找不到任何曾经破解过此类设备的人。我找到了一些旧的论坛帖子，里面的图片链接早已失效，只包含了一些关于设备本身的通用信息，普遍的共识是它很难获取Root权限。我没料到2011年的 Linux 2.6 系统会如此难以攻破，所以我天真地以为能轻松搞定。

My first idea was to modify the ext3 update image itself. It seemed like I could easily just mount the filesystem, modify some init scripts to do what I want, and copy it to a blank SD card for the unit to pick up my modified image and flash it. While the system showed confirmation prompts to install vanilla, unmodified ttsystem images with no problem, I could never get it to update to my modified image, and I had no idea why. I checked the updater logic present in the update file itself and couldn't see any reason why my image would be rejected.

我的第一个想法是修改 ext3 更新镜像本身。看起来我只需要挂载文件系统，修改一些初始化脚本来实现我的目的，然后将其复制到空白SD卡中，让设备识别并刷入我修改后的镜像即可。虽然系统在安装原版、未修改的 ttsystem 镜像时会显示确认提示且毫无问题，但我始终无法让它更新我修改后的镜像，我也不知道原因。我检查了更新文件中的更新程序逻辑，没发现我的镜像被拒绝的任何理由。

It was at this point that I set up an emulator with QEMU, a custom kernel also based on the same 2.6 version, some patches and a very simple CAN emulator for the system to actually boot - albeit reluctantly, wanting to reboot every 3 seconds, which I just patched out by ignoring reboot syscalls.

就在这时，我用 QEMU 设置了一个模拟器，使用了一个同样基于 2.6 版本的定制内核、一些补丁以及一个非常简单的 CAN 总线模拟器，让系统得以启动——尽管它启动得很勉强，每3秒就想重启一次，我通过忽略重启系统调用（syscalls）修补掉了这个问题。

I used this to test installing the modified update image in there. I then realized that I don't actually have the recovery partition that the device boots into to perform the update, and came to the conclusion that there must be some sort of verification layer there that I'm missing. Taking a closer look at the ttsystem image also pretty much confirmed this, as it had a bunch of high-entropy data appended to it, followed by some zero blocks, followed by 40 high-entropy bytes. I assumed this was a signature of some sort (40 bytes could be DSA with SHA-1), but with no access to the actual...

我用它来测试安装修改后的更新镜像。随后我意识到，我实际上并没有设备用于执行更新的恢复分区，并得出结论：一定存在某种我遗漏的验证层。仔细观察 ttsystem 镜像也证实了这一点，因为它后面附加了一堆高熵数据，接着是一些零块，最后是40个高熵字节。我推测这是一种签名（40字节可能是带有SHA-1的DSA），但由于无法访问实际的……