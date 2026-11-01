---
title: "The support case of a customer who said that all they could see was a black screen"
originalUrl: "https://devblogs.microsoft.com/oldnewthing/20261029-00/?p=112808/"
date: "2026-10-31T01:01:21.000Z"
excerpt: false
---

If you hold a PC’s power button for 12 seconds, it will turn off at the hardware level without notifying the operating system. This is a safety feature so that you can turn of the computer even if the operating system’s “Shut down” command isn’t working. After eight seconds of the power button being held down, the Windows kernel realizes that the user is trying to do a force-power-off of the system, and it quickly takes a kernel dump that can be uploaded to the Windows Error Reporting service the next time you turn the system on.

如果你按住电脑电源键 12 秒，它会在硬件层面直接关机，而不会通知操作系统。这是一项安全功能，即使操作系统的“关机”命令失效，你也能关闭电脑。当电源键被按住 8 秒后，Windows 内核会意识到用户正在尝试强制关闭系统，并迅速进行内核转储，以便在下次开机时上传到 Windows 错误报告服务。

(Sometimes four seconds isn’t enough time to get enough information, and the kernel dump is incomplete. I believe that on Windows Insider builds of Windows, you get a message that says something like “Please let go of the power button so we can collect more information, and then we will turn off the computer.” This gives the kernel more time to finish capturing its kernel dump.) These emergency kernel dumps are internally classified as “long power button hold” (LPBH) failures.

（有时 4 秒不足以获取足够的信息，导致内核转储不完整。我相信在 Windows Insider 预览版中，你会看到类似“请松开电源键以便我们收集更多信息，随后我们将关闭电脑”的提示。这给了内核更多时间来完成转储捕获。）这些紧急内核转储在内部被归类为“长按电源键”（LPBH）故障。

One of the pieces of information recorded in these emergency kernel dumps is whether the screen consists entirely of black pixels. Those failures are sub-classified as “black screen LPBH”, and they go to a special virtual team for analysis. (I happen to be a member of this black screen LPBH team.) Sometimes the problem is a broken video driver. Sometimes the video driver is doing just fine, but the desktop compositor is just handing black pixels to the video driver.

这些紧急内核转储中记录的信息之一是屏幕是否完全由黑色像素组成。此类故障被细分为“黑屏 LPBH”，并会发送给一个专门的虚拟团队进行分析。（我恰好就是这个黑屏 LPBH 团队的成员。）有时问题出在损坏的显卡驱动程序上。有时显卡驱动程序运行正常，但桌面合成器却向驱动程序输出了黑色像素。

Sometimes the desktop compositor is doing just fine, but nobody is drawing anything to the screen. And those cases are further subdivided further into cases like “there is nobody around to draw anything” or “the person who normally draws stuff is hung.”

有时桌面合成器也运行正常，但没有任何程序在屏幕上绘制内容。这些情况会被进一步细分为“没有程序在绘制内容”或“负责绘制的程序已挂起”等情形。

Back in the Windows 3.1 days, there was a customer product support call that would today have been classified as a “black screen” bug: The customer reported that they turned on the computer, and Windows started up, but when the logo went away, all they saw was a blank screen. After some questioning, the customer support engineer put the story together: It turned out that this customer really liked the color black, so they decided to set up a goth theme. They set the wallpaper color to black. They set the title bar color to black. They set the button color to black. They set the window background color to black. They set the window text color to black. Every possible color you could pick in the Colors control panel was set to black.

回溯到 Windows 3.1 时代，曾有一个客户支持电话在今天会被归类为“黑屏”错误：客户报告说他们打开电脑，Windows 启动了，但当徽标消失后，他们看到的只有一片空白。经过询问，客户支持工程师理清了原委：原来这位客户非常喜欢黑色，于是决定设置一个哥特风格的主题。他们将壁纸颜色设为黑色，标题栏颜色设为黑色，按钮颜色设为黑色，窗口背景颜色设为黑色，窗口文字颜色也设为黑色。在“颜色”控制面板中所有能选的颜色都被设为了黑色。

Once you get yourself into this situation, it’s hard to get out because you can’t see anything. I don’t know how the customer support engineer fixed the problem, but I’m guessing that they booted into MS-DOS, ran EDIT.COM, and deleted the [colors] section from the win.ini file, thereby returning all the system colors to defaults.

一旦陷入这种境地，由于什么都看不见，很难自行解决。我不知道那位客户支持工程师是如何修复问题的，但我猜他们是启动进入 MS-DOS，运行 EDIT.COM，并删除了 win.ini 文件中的 [colors] 部分，从而将所有系统颜色恢复为默认值。

I had a similar experience when I was a developer on Windows PageMaker. I had given a copy to a relative who was trying it out to write some report for work. There was a hot key command for some simple operation like Goto Next Page. Every time he used it all his text would be deleted, I was puzzling over it until I happened to select a region on the page and there was the text in highlight mode. The kids had been playing with the PC and somehow had remapped the hot key to change the text color scheme. To white on white.

我在开发 Windows 版 PageMaker 时也有过类似的经历。我曾给一位亲戚拷贝了一份软件，让他试着写工作报告。软件里有一个用于简单操作（如“转到下一页”）的快捷键。每次他使用该快捷键时，所有文字都会消失。我百思不得其解，直到有一次我偶然选中了页面上的一个区域，发现文字其实处于高亮选中状态。原来是孩子们玩电脑时，不知怎么把快捷键重新映射成了更改文字配色方案——改成了白底白字。

I once used an app that reduced screen brightness by overlaying a semi-transparent layer on the screen. If the transparency was set to 0%, the screen would go completely black. Was the customer’s name Desiato by any chance? 😁 “It’s the wild colour scheme that freaks me. Every time you try to operate on of these weird black controls that are labelled in black on a black background, a little black light lights up black to let you know you’ve done it.”

我曾经用过一个通过在屏幕上覆盖半透明层来降低亮度的应用。如果透明度设为 0%，屏幕就会完全变黑。那位客户的名字该不会叫 Desiato 吧？😁 “这种狂野的配色方案真让我抓狂。每当你试图操作这些奇怪的黑色控件时——它们在黑色背景上用黑色标注——一个小黑灯就会亮起黑色，告诉你操作已完成。”

12 seconds? Every (desktop) PC I’ve encountered shuts down after holding down the power button for 5 seconds, so if Windows is waiting 8 seconds to do a dump, it won’t do anything. All the PCs I have ever encountered also shut down hard after some 4 or 5 seconds. A quick Google search, however, seems to indicate that Microsoft Surface laptops behave differently.

12 秒？我遇到的每台（台式）电脑在按住电源键 5 秒后就会关机，所以如果 Windows 要等 8 秒才进行转储，那它什么也做不了。我遇到过的所有电脑也都是在 4 到 5 秒后强制关机的。不过，快速搜索 Google 后发现，微软 Surface 笔记本电脑的表现似乎有所不同。

October 30, 2026 The Microsoft building that was reportedly haunted Raymond Chen

2026 年 10 月 30 日 传说中闹鬼的微软大楼 Raymond Chen