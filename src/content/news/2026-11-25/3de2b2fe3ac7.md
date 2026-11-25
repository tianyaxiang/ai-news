---
title: "9/UX: a Macintosh-inspired desktop for 9front"
originalUrl: "https://progrium.github.io/9ux/"
date: "2026-11-24T18:37:29.000Z"
excerpt: false
---

[ demo | about | screenshots | design | docs | code | warning! | contact | credits | links ] 9/UX: a Macintosh-inspired desktop for 9front Jeff Lindsay, h.d.a.

[ 演示 | 关于 | 截图 | 设计 | 文档 | 代码 | 警告！ | 联系 | 致谢 | 链接 ] 9/UX：一个为 9front 设计的受 Macintosh 启发的桌面系统，作者 Jeff Lindsay, h.d.a。

This is the real thing, running live in your browser: the rio fork in 9/UX mode, Desktop, and the libux sample app, compiled for 386 and run by h9 on its own 386 emulator inside the page. Nothing is sent anywhere; it's about 23 MB to load, once. Click the screen to type; right-click (or Ctrl-click) is button 3, and Alt-click is button 2. It needs a recent Chrome or Edge; other browsers see a screenshot, a real frame from the end-to-end drag-and-drop test, running headless on h9. Open it in its own tab for a bigger screen.

这是真实运行在浏览器中的程序：处于 9/UX 模式下的 rio 分支、桌面环境以及 libux 示例应用，它们被编译为 386 指令集，并由 h9 在页面内的 386 模拟器上运行。没有任何数据被发送到外部；首次加载约需 23 MB。点击屏幕即可输入；右键（或 Ctrl+点击）对应按钮 3，Alt+点击对应按钮 2。该程序需要较新版本的 Chrome 或 Edge 浏览器；其他浏览器将看到一张截图，这是在 h9 上以无头模式运行的端到端拖放测试的真实画面。在独立标签页中打开可获得更大的显示区域。

About 9/UX brings the classic Mac and A/UX desktop (a spatial desktop, a global menu bar, consistent controls and dialogs, icons, and resource-driven presentation) to 9front, built the Plan 9 way: rio and libdraw draw the screen, 9P exposes every application's UI state and commands as files, namespaces define the working environment, the plumber opens documents, and ndb holds human-editable metadata. Keep the Macintosh's direct-manipulation desktop, but make every meaningful object, action, and resource visible as a Plan 9 file. It is not an emulator, a Macintosh ABI, or an A/UX reimplementation. Native 9front programs stay first-class, and existing rio programs (acme, sam, rc windows, nested rio) keep working unchanged beside 9/UX apps.

关于 9/UX：9/UX 将经典的 Mac 和 A/UX 桌面（空间桌面、全局菜单栏、一致的控件与对话框、图标以及资源驱动的呈现方式）引入了 9front，并以 Plan 9 的方式构建：由 rio 和 libdraw 负责屏幕绘制，9P 将每个应用程序的 UI 状态和命令暴露为文件，命名空间定义工作环境，plumber 负责打开文档，ndb 则存储人类可编辑的元数据。它保留了 Macintosh 的直接操作桌面，但使每一个有意义的对象、动作和资源都以 Plan 9 文件的形式可见。它不是模拟器、Macintosh ABI 或 A/UX 的重新实现。原生的 9front 程序依然是一等公民，现有的 rio 程序（如 acme、sam、rc 窗口、嵌套的 rio）在 9/UX 应用旁边依然可以正常工作。

The pieces: rio fork (rio -u): a desktop layer, a global menu bar that follows the focused app, title-bar chrome, and a drag broker, all under /dev/ux. With 9/UX mode off it's stock rio. Desktop: volume icons, spatial folder windows, rename, duplicate, Get Info, Trash, remembered layout, and double-click to open documents through the plumber. A remote 9P server works as a volume. libux, the Toolbox: windows, menus, dialogs, alerts, and controls, each app serving its control tree over 9P, so echo activate >.../ctl presses a button. uxd gathers every app's tree at /mnt/ux with per-app policy; uxmeta keeps associations, volumes and layout in ndb files; resfs serves classic ICN#, icl8, menu, dialog and string resources at /mnt/res; clipd is a typed clipboard kept in step with rio's snarf.

组成部分：rio 分支 (rio -u)：一个桌面层，包含跟随焦点应用的全局菜单栏、标题栏装饰以及拖拽代理，均位于 /dev/ux 下。关闭 9/UX 模式后即为标准 rio。桌面：包含卷图标、空间文件夹窗口、重命名、复制、获取信息、废纸篓、布局记忆，以及通过 plumber 双击打开文档的功能。远程 9P 服务器可作为卷使用。libux 工具箱：包含窗口、菜单、对话框、警报和控件，每个应用通过 9P 提供其控件树，因此执行 echo activate >.../ctl 即可触发按钮点击。uxd 在 /mnt/ux 处收集每个应用的树结构并应用策略；uxmeta 将关联、卷和布局保存在 ndb 文件中；resfs 在 /mnt/res 处提供经典的 ICN#、icl8、菜单、对话框和字符串资源；clipd 是一个与 rio 的 snarf 同步的类型化剪贴板。

Screenshots These are real frames, not mockups. The GUI tests embed h9 with a headless screen, inject mouse and keyboard input, and drive the 9P files at the same time. The last step of the end-to-end demo. From rc, the sample app's Name field was set to from rc and its Save button pressed through ctl; a double click in Desktop plumbed a text file to acme; and an ordinary rc window is still moved and typed into. The libux sample on 9front's own kernel and VESA framebuffer in QEMU, at 32 bits per pixel. Its ICN# and icl8 icons match the headless golden images pixel for pixel.

截图：这些是真实画面，而非模型。GUI 测试嵌入了带有无头屏幕的 h9，注入鼠标和键盘输入，并同时驱动 9P 文件。这是端到端演示的最后一步。从 rc 中，示例应用的 Name 字段被设置为 from rc，并通过 ctl 按下了 Save 按钮；在桌面上双击将一个文本文件 plumb 到了 acme；同时一个普通的 rc 窗口依然可以被移动和输入。这是运行在 QEMU 中 9front 内核和 VESA 帧缓冲区上的 libux 示例，色彩深度为 32 位。其 ICN# 和 icl8 图标与无头模式下的标准图像像素级一致。

Visual Design Macintosh structure, Plan 9 colour: butter title bars from rio's selection yellow, acme's cream and olive, and rio's greygreen for the desktop, so 9/UX windows and legacy rio windows sit together on one screen. Everything reads in one bit, uses a sixteen-colour palette, and is drawn in whole pixels. Every graphic is original to 9/UX; it ships no Apple resources. The mockups below are generated from the same palette and metrics files as the code. Desktop, with icon and list views and an rc window driving /mnt/ux. An app's menu in the global bar, and a dialog. Controls in each state. Title bars in each theme. The icon set.

视觉设计：Macintosh 的结构，Plan 9 的色彩：使用来自 rio 选中状态的奶油黄作为标题栏，acme 的奶油色和橄榄色，以及 rio 的灰绿色作为桌面背景，使得 9/UX 窗口和传统的 rio 窗口可以在同一屏幕上共存。所有内容均以 1 位读取，使用 16 色调色板，并以完整像素绘制。所有图形均为 9/UX 原创；不包含任何 Apple 资源。下方的模型图由与代码相同的调色板和度量文件生成。桌面包含图标和列表视图，以及一个驱动 /mnt/ux 的 rc 窗口。全局栏中的应用菜单和对话框。各种状态下的控件。各种主题下的标题栏。图标集。

Documentation The design document describes 9/UX and its v0.1 acceptance criteria; release.md has where each one stands, the end-to-end demo, and the open issues. Every interface between components is a file protocol in docs/protocols, and the visual design covers the palette, fonts, metrics, chrome, icons and cursors.

文档：设计文档描述了 9/UX 及其 v0.1 验收标准；release.md 记录了各项进展、端到端演示以及待解决的问题。组件间的每个接口都是 docs/protocols 中的文件协议，视觉设计涵盖了调色板、字体、度量、装饰、图标和光标。

Source Code The source is on GitHub, under the MIT license. Development runs on h9, which runs 9front's own compilers, mk and rio directly from the host shell, without booting a VM. scripts/h9.sh clones and builds the pinned h9 on its first run: git clone https://github.com/progrium/9ux cd 9ux scripts/h9.sh --rc 'mk' scripts/h9.sh --gfx rio/7.out -u scripts/test.sh Use rio/6.out on amd64. development.md and testing.md have the details.

源代码：源代码托管在 GitHub 上，采用 MIT 许可证。开发在 h9 上进行，它直接从宿主 shell 运行 9front 的编译器、mk 和 rio，无需启动虚拟机。scripts/h9.sh 在首次运行时会克隆并构建指定的 h9：git clone https://github.com/progrium/9ux cd 9ux scripts/h9.sh --rc 'mk' scripts/h9.sh --gfx rio/7.out -u scripts/test.sh 在 amd64 上请使用 rio/6.out。详细信息请参阅 development.md 和 testing.md。

Warning! 9/UX is at v0.1 and under active development. Interfaces and behaviour change without notice.

警告！9/UX 目前处于 v0.1 版本，正处于活跃开发阶段。接口和行为可能会在不另行通知的情况下发生变化。

Contact Info Please report bugs and send questions through GitHub issues.

联系信息：请通过 GitHub issues 报告错误并发送问题。

Credits The 9/UX mark in the menu bar is a pixel-art Glenda by Dan Fessler. Glenda, the Plan 9 bunny, was created by Renée French.

致谢：菜单栏中的 9/UX 标志是由 Dan Fessler 创作的像素艺术版 Glenda。Plan 9 的吉祥物兔子 Glenda 由 Renée French 创作。

Related Links h9, native 9front executables on host hypervisors 9front A/UX, Apple's Unix with the Macintosh Desktop

相关链接：h9，在宿主虚拟机管理程序上运行的原生 9front 可执行文件；9front；A/UX，带有 Macintosh 桌面的 Apple Unix 系统。