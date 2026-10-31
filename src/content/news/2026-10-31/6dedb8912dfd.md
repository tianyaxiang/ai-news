---
title: "Herdr has released native app"
originalUrl: "https://github.com/herdrdev/herdr-app"
date: "2026-10-30T00:42:41.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# Herdr has released native app

Herdr is a desktop app for terminals and coding agents. Keep work in spaces, see which agents need you, and leave terminals running when you close the window.

Herdr 是一款用于终端和编码代理的桌面应用程序。它允许你在工作区中管理任务，查看哪些代理需要你的关注，并在关闭窗口时保持终端继续运行。

Linux needs a desktop session and a working Vulkan driver. macOS builds are available for Apple Silicon; Intel Mac users can build from source. Linux builds are x86-64 and ARM64.

Linux 系统需要桌面会话和可用的 Vulkan 驱动程序。macOS 版本适用于 Apple Silicon 芯片；Intel Mac 用户可以从源代码构建。Linux 构建版本支持 x86-64 和 ARM64 架构。

The installer adds Herdr to your apps and puts the command in ~/.local/bin. Add that folder to your PATH if the installer asks. On macOS the app lives in ~/Applications/Herdr.app. For drag-and-drop installation on Apple Silicon, download Herdr.dmg and drag Herdr to Applications.

安装程序会将 Herdr 添加到你的应用程序中，并将命令放入 ~/.local/bin。如果安装程序提示，请将该文件夹添加到你的 PATH 中。在 macOS 上，应用程序位于 ~/Applications/Herdr.app。对于 Apple Silicon 上的拖拽安装，请下载 Herdr.dmg 并将 Herdr 拖至“应用程序”文件夹。

Run in PowerShell on x64 Windows with curl and tar installed (Windows 10 1803 or newer):

在安装了 curl 和 tar 的 x64 Windows 系统（Windows 10 1803 或更高版本）上，请在 PowerShell 中运行：

Herdr appears in the Start menu. The installer adds %LOCALAPPDATA%\Programs\herdr-app to your user PATH. Open a new terminal to pick it up.

Herdr 会出现在“开始”菜单中。安装程序会将 %LOCALAPPDATA%\Programs\herdr-app 添加到你的用户 PATH 中。打开一个新的终端即可生效。

Both installers download and run code. Read the shell installer or PowerShell installer first if you prefer. They also install herdr-core if it is missing. The app can help install or update a core it cannot use.

两个安装程序都会下载并运行代码。如果你愿意，可以先阅读 shell 安装程序或 PowerShell 安装程序。如果缺少 herdr-core，它们也会进行安装。该应用程序可以帮助安装或更新它无法使用的核心组件。

A space holds work on one machine, usually in one repo. Each space has tabs. Split a tab into panes to put terminals or mod panels beside each other.

一个工作区（Space）用于存放单台机器上的工作，通常对应一个代码仓库。每个工作区都有标签页。你可以将标签页拆分为多个窗格，以便将终端或模块面板并排显示。

An unnamed space follows its first terminal's folder. Name a space or tab when you want a label that stays. New tabs start in the focused terminal's folder.

未命名的工作区会跟随其第一个终端所在的文件夹。当你需要一个固定的标签时，可以为工作区或标签页命名。新标签页会在当前聚焦的终端文件夹中启动。

The agents sidebar brings agents from your spaces into one list, including workers started by another agent. Agents that report status show as:

代理侧边栏将你工作区中的代理汇总到一个列表中，包括由其他代理启动的工作进程。报告状态的代理显示为：

Click an agent to see it. A worker without a pane opens in peek, over your tab. Keep it as a tab if you want it beside your other work. Ctrl-click a live terminal address in terminal text to peek at it; use Cmd-click on macOS. An address such as t7 means a terminal on the same machine as the terminal showing it. vps/t7 names one on another machine.

点击代理即可查看。没有窗格的工作进程会以预览模式在标签页上方打开。如果你希望将其与其他工作并排显示，可以将其保留为标签页。在终端文本中按住 Ctrl 并点击实时终端地址即可预览；macOS 上请使用 Cmd 加点击。地址如 t7 表示与显示它的终端位于同一台机器上。vps/t7 则表示另一台机器上的终端。

The window arranges terminals. The core runs them. Closing the window leaves them running; closing a pane or tab ends its terminals. After a reboot or core crash, kept panes get fresh shells in their last folders, not their old programs.

窗口负责排列终端，而核心程序负责运行它们。关闭窗口不会停止终端运行；关闭窗格或标签页则会结束其中的终端。重启或核心崩溃后，保留的窗格会在其最后的文件夹中获得新的 shell，而不是恢复之前的程序。

Add an SSH machine from Settings → Machines or the sidebar's Add machine action. Pick a host from your SSH config or type how SSH reaches it. Spaces on that machine run their terminals there, not on your computer.

通过“设置”→“机器”或侧边栏的“添加机器”操作添加 SSH 机器。从你的 SSH 配置中选择主机，或输入 SSH 连接方式。该机器上的工作区会在其本地运行终端，而不是在你的电脑上运行。

Each machine keeps its spaces, tabs and splits in its core. Connected screens share that structure and the live terminals, but keep their own focus and zoom. Remote work keeps running when your local window closes or your laptop sleeps, as long as the remote machine and core stay up.

每台机器都在其核心中保存工作区、标签页和拆分布局。连接的屏幕共享该结构和实时终端，但保持各自的焦点和缩放比例。只要远程机器和核心保持运行，即使本地窗口关闭或笔记本电脑休眠，远程工作也会继续运行。

Open the command palette to find an action by name, or open Settings to change fonts, colors, sounds and other preferences. The built-in layouts include Herdr, Terminals and Herdr 98. A layout arranges the window. Mods are small JavaScript programs that draw its panels, menus and dialogs.

打开命令面板可以通过名称查找操作，或打开“设置”以更改字体、颜色、声音和其他偏好。内置布局包括 Herdr、Terminals 和 Herdr 98。布局用于排列窗口。模块（Mods）是小型 JavaScript 程序，用于绘制面板、菜单和对话框。

Duplicate a shipped layout or mod before changing its structure or code. Your copies stay yours; Herdr updates the shipped ones on start. Save a personal layout, mod or key file and the window reloads it. A broken edit keeps the last good version and reports the error.

在更改结构或代码之前，请先复制内置的布局或模块。你的副本归你所有；Herdr 会在启动时更新内置版本。保存个人布局、模块或键位文件后，窗口会自动重新加载。如果编辑出错，系统会保留上一个正常版本并报告错误。

Ctrl+Shift+P shows every command and its key (Cmd+Shift+P on macOS). Change any key in keys.json; see the keys section of the mod guide for the format.

Ctrl+Shift+P 显示所有命令及其快捷键（macOS 上为 Cmd+Shift+P）。在 keys.json 中可以更改任何快捷键；格式请参考模块指南中的键位部分。

Layouts and mods · Commands

布局与模块 · 命令

Installed releases check for updates in the background and download a new app beside the running one. It takes over when you quit and reopen, or choose the update action. Your terminals keep running in the core. Settings → Updates shows what is available. What's New opens after an update; you can open it again from the command palette. Builds from source do not update themselves.

已安装的版本会在后台检查更新，并在运行中的应用程序旁边下载新版本。当你退出并重新打开，或选择更新操作时，新版本将接管程序。你的终端会在核心中继续运行。“设置”→“更新”显示可用更新。“新功能”页面会在更新后打开；你也可以从命令面板再次打开它。从源代码构建的版本不会自动更新。

Usage telemetry is on by default in releases. Turn it off in Settings → Privacy. Mods are trusted code, not sandboxed extensions. Read security and privacy before installing someone else's mod.

发布版本默认开启使用遥测功能。可在“设置”→“隐私”中将其关闭。模块是受信任的代码，而非沙盒扩展。在安装他人的模块之前，请阅读安全与隐私说明。

This prints the agent guide for driving the window. The herdr-core skill points agents here. Use herdr-core for running and coordinating programs; use the app to change what you see.

此命令打印用于控制窗口的代理指南。herdr-core 技能将代理指向此处。使用 herdr-core 运行和协调程序；使用应用程序来更改你的视图。

The first two inspect the open window. The command list also works without one. See the command reference for arguments.

前两个命令用于检查打开的窗口。命令列表在没有窗口时也能工作。参数请参阅命令参考。

For bugs, mod API requests and code contributions, see Contributing.

有关错误报告、模块 API 请求和代码贡献，请参阅“贡献”指南。

Clone this repo with its submodules. Use Rust 1.95.0 and Zig 0.16.0, the versions used in CI. Linux needs the development packages listed in that workflow.

克隆此仓库及其子模块。使用 CI 中使用的 Rust 1.95.0 和 Zig 0.16.0 版本。Linux 系统需要该工作流中列出的开发包。

Install just to use these recipes. The platform installer builds a release and adds the app to your desktop. On Linux it links to this checkout, so keep the checkout in place. Quit and reopen Herdr to use the new build.

安装 just 以使用这些配方。平台安装程序会构建发布版本并将应用程序添加到你的桌面。在 Linux 上，它会链接到此检出目录，因此请保持检出目录位置不变。退出并重新打开 Herdr 以使用新构建的版本。

Documentation checks also need Bun: just docs-check checks generated pages and CLI examples; just docs-generate refreshes the reference pages.

文档检查还需要 Bun：just docs-check 用于检查生成的页面和 CLI 示例；just docs-generate 用于刷新参考页面。

To compare drawing changes on Windows, Linux or macOS, run the same fixed workloads against each build:

要在 Windows、Linux 或 macOS 上比较绘图更改，请针对每个构建运行相同的固定工作负载：

The runner requires hc on PATH and uses the Python executable running the script. It prints a unique artifact folder with the run settings, counters and results, then stops its private app, terminals and core. Both sets use Python fixture programs; the default set’s TUI workload replaces historical btop measurements. --only spinners measures just the quiet native spinner scenario. Keep the window visible and the display awake, and compare the same window activity and display settings; inactive windows may draw at a lower rate. Windows records visibility, foreground activity and display Hz at each measurement boundary; other platforms mark these observations unavailable. Visibility does not establish occlusion. Draws are window render calls. Render-to-paint elapsed time stops before scene finalization, backend drawing, uploads and presentation; it is separate from OS process CPU time. Neither measures physical presentation or the FPS HUD’s derived MAX FPS.

运行器要求 PATH 中包含 hc，并使用运行脚本的 Python 可执行文件。它会打印一个包含运行设置、计数器和结果的唯一工件文件夹，然后停止其私有应用程序、终端和核心。两组测试都使用 Python 固定程序；默认集的 TUI 工作负载取代了历史上的 btop 测量。--only spinners 仅测量安静的本地旋转器场景。请保持窗口可见并保持显示器唤醒，并比较相同的窗口活动和显示设置；非活动窗口的绘制速率可能会降低。Windows 会在每个测量边界记录可见性、前台活动和显示器赫兹数；其他平台则将这些观测值标记为不可用。可见性并不代表遮挡。绘制是指窗口渲染调用。渲染到绘制的耗时在场景最终化、后端绘制、上传和呈现之前停止；它与操作系统进程的 CPU 时间是分开的。两者都不测量物理呈现或 FPS HUD 导出的最大 FPS。

python scripts/bench_compare.py ghostty --root <artifact folder> reuses a run’s fake agent

python scripts/bench_compare.py ghostty --root <工件文件夹> 重用运行的伪代理