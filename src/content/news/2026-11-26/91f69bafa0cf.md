---
title: "I built Pasala to send files from Android to the right folder on my Mac"
originalUrl: "https://dev.to/tecnomanu/i-built-pasala-to-send-files-from-android-to-the-right-folder-on-my-mac-104o"
date: "2026-11-26T03:27:02.000Z"
excerpt: false
---

Title: I built Pasala to send files from Android to the right folder on my Mac

Getting a video from my phone to my Mac shouldn't be a project. But I didn't just want the file on my computer: I wanted it in a specific folder, where my agent could pick it up. There are other ways to transfer files. I built Pasala because I wanted a workflow that fit how I work: choose a device, choose a destination folder, send. Pasala is open source. It runs on macOS and Android, transfers directly between paired devices over the local network or Tailscale, and doesn't require a cloud service or an account.

将视频从手机传到 Mac 不应该是一项大工程。但我不仅仅是想把文件传到电脑上：我希望它出现在特定的文件夹中，以便我的代理程序（agent）可以直接获取。虽然有其他传输文件的方法，但我开发 Pasala 是因为我想要一种符合我工作习惯的流程：选择设备，选择目标文件夹，然后发送。Pasala 是开源的。它运行在 macOS 和 Android 上，通过本地网络或 Tailscale 在配对设备间直接传输，无需云服务或账户。

From my phone to the folder I actually need On the Mac, I create named collections. Each collection points to a folder. For example, I can have one for my shared folder and use the default destination for everything else. Then, on Android: I select a photo or video and tap Share. I choose Pasala and select my Mac. I pick the collection I want, or the default destination. I send the file. The file lands in the selected folder. In my case, that means I can put a video where my agent can access it instead of transferring it and moving it again afterward. Without a selected collection, the Mac uses its default destination; out of the box, that's ~/Downloads/Pasala.

从手机到我真正需要的文件夹：在 Mac 上，我创建了命名集合。每个集合都指向一个文件夹。例如，我可以设置一个用于共享文件夹，并将其他所有内容发送到默认目标。然后，在 Android 上：我选择一张照片或视频并点击“分享”。我选择 Pasala 并选中我的 Mac。我挑选想要的集合或默认目标，然后发送文件。文件会直接进入选定的文件夹。对我而言，这意味着我可以将视频直接放入代理程序能访问的地方，而无需先传输再手动移动。如果没有选择集合，Mac 会使用默认目标；默认情况下，该路径为 ~/Downloads/Pasala。

Going the other way Pasala also sends from my Mac to my phone. On the Mac, there's a menu-bar app and a notch-style island for devices and recent transfers. I can drag a file onto a device to send it. On Android, received photos and videos go into the corresponding Pictures/Pasala and Movies/Pasala folders. Pasala also supports transfers between paired Android devices.

反向传输：Pasala 也支持从 Mac 发送到手机。在 Mac 上，有一个菜单栏应用和一个用于显示设备及近期传输记录的“灵动岛”式界面。我可以将文件拖拽到设备上进行发送。在 Android 上，接收到的照片和视频会进入相应的 Pictures/Pasala 和 Movies/Pasala 文件夹。Pasala 还支持在已配对的 Android 设备之间进行传输。

An optional MCP server for agents A folder is enough for my original workflow, but Pasala also includes an MCP server on the Mac. An agent can query the index of received files, check where a file landed, search by name, inspect supported image or text content, and send files to a paired device. For example, the README documents pasala_list_files for filtering transfers, pasala_get_file for metadata and optional content, and pasala_send for sending a file. The pasala_new_files tool returns received files the agent hasn't seen yet and marks them as seen. That distinction matters: I choose where to send the file; the MCP server gives an agent a way to query and work with what's there. It doesn't mean every file automatically triggers an agent.

面向代理程序的可选 MCP 服务器：对于我最初的工作流程，一个文件夹就足够了，但 Pasala 还在 Mac 上包含了一个 MCP 服务器。代理程序可以查询已接收文件的索引、检查文件存放位置、按名称搜索、检查支持的图像或文本内容，并将文件发送到已配对的设备。例如，README 文档中记录了用于过滤传输的 pasala_list_files、用于获取元数据和可选内容的 pasala_get_file，以及用于发送文件的 pasala_send。pasala_new_files 工具会返回代理程序尚未查看的已接收文件，并将它们标记为已查看。这种区分很重要：我决定将文件发送到哪里；而 MCP 服务器为代理程序提供了一种查询和处理现有文件的方法。这并不意味着每个文件都会自动触发代理程序。

Pairing and network security I pair devices by scanning a QR code. The code is single-use and expires after five minutes. Once paired, devices can transfer over a trusted local network. For access away from home, I connect the devices through Tailscale. One important limitation: local-network traffic is currently unencrypted HTTP. Use Pasala only on a trusted LAN. Traffic over Tailscale is encrypted by Tailscale. Pairing is not the same thing as encrypting the local connection.

配对与网络安全：我通过扫描二维码来配对设备。该代码为一次性使用，五分钟后过期。配对后，设备可以通过受信任的本地网络进行传输。若在户外使用，我通过 Tailscale 连接设备。一个重要的限制是：本地网络流量目前是未加密的 HTTP。请仅在受信任的局域网内使用 Pasala。通过 Tailscale 的流量由 Tailscale 加密。配对并不等同于加密本地连接。

Try it The repository includes the macOS and Android apps, the MCP server, build instructions and a demo: github.com/tecnomanu/pasala The README lists macOS 14+ and Xcode or Swift 6 command-line tools for the Mac build, and JDK 21 plus Android SDK API 36 for Android. It's MIT-licensed. If you try it and it fits your workflow, a star on the repo would make my day. How do you get files from your phone to the exact place you need them?

试用一下：该仓库包含了 macOS 和 Android 应用、MCP 服务器、构建说明以及演示：github.com/tecnomanu/pasala。README 中列出了 Mac 构建所需的 macOS 14+ 和 Xcode 或 Swift 6 命令行工具，以及 Android 所需的 JDK 21 和 Android SDK API 36。它采用 MIT 许可证。如果你试用后觉得它适合你的工作流程，在仓库上点个星会让我非常开心。你是如何将文件从手机传到你需要的确切位置的？