---
title: "Introducing GNOME 51"
originalUrl: "https://release.gnome.org/51/"
date: "2026-09-17T00:02:42.422Z"
---

# Introducing GNOME 51
# GNOME 51 发布介绍

"A Coruña" September 16, 2026 After six months of intense development, we are thrilled to introduce GNOME 51, the latest version of GNOME. We would like to recognize all our contributors who worked tirelessly to make this new version more accessible, practical and user-friendly. This release is codenamed "A Coruña" in recognition of GUADEC 2026, held in this beautiful Galician city in July. Thank you to the local organizers who made the event possible!

“A Coruña” 2026 年 9 月 16 日。经过六个月的紧张开发，我们很高兴推出 GNOME 的最新版本——GNOME 51。我们要感谢所有不知疲倦地工作，使这个新版本更易用、更实用、更人性化的贡献者们。此版本代号为“A Coruña”，以纪念 7 月在这座美丽的加利西亚城市举办的 GUADEC 2026 大会。感谢让此次活动成为可能的当地组织者！

### Display and Performance
### 显示与性能

GNOME's graphics technologies have received another round of performance enhancements for GNOME 51, making the desktop feel smoother and more responsive than ever. Improved frame scheduling: Animations will run more smoothly, even when the system is under load, thanks to Mutter's reworked scheduling and screen frame delivery system. Faster screen capture: We improved screen recording across the board by reducing redundant work and buffer copying. Saved monitor brightness: GNOME now remembers your monitor's brightness level across reboots and HDR toggling. Simplified graphics support: we removed support for legacy NVIDIA driver interfaces, as GNOME now uses the modern, standard graphics interfaces exclusively. This simplifies the code and benefits everyone using current drivers.

GNOME 51 的图形技术再次获得了性能提升，使桌面体验比以往任何时候都更流畅、响应更迅速。改进的帧调度：得益于 Mutter 重新设计的调度和屏幕帧交付系统，即使在系统负载较高时，动画也能运行得更平滑。更快的屏幕捕获：我们通过减少冗余工作和缓冲区复制，全面改进了屏幕录制功能。保存显示器亮度：GNOME 现在可以在重启和切换 HDR 时记住显示器的亮度级别。简化的图形支持：我们移除了对旧版 NVIDIA 驱动程序接口的支持，因为 GNOME 现在仅使用现代化的标准图形接口。这简化了代码，并使所有使用当前驱动程序的用户受益。

### Support GNOME
### 支持 GNOME

This release wouldn't have been possible without the contributions, feedback, and encouragement from our community. Help us keep building technology that works for everyone — every donation goes directly toward development, infrastructure, and community events. Donate.

没有社区的贡献、反馈和鼓励，这个版本就不可能实现。请帮助我们继续构建服务于每个人的技术——每一笔捐款都将直接用于开发、基础设施和社区活动。捐赠。

### Settings Improvements
### 设置改进

GNOME's Settings app has been given a wide range of refinements for GNOME 51. In Displays, devices that have an accelerometer can now use a new Auto Rotate option, which automatically switches the screen between portrait and landscape orientation as the device is turned. When auto rotation is enabled, a matching orientation lock option lets you pin the display to its current orientation whenever you want. Display arrangement has also been improved, with center-aligned snapping, making it easy to match your physical setup. The Mouse settings have a useful new option that automatically disables the touchpad when a mouse is plugged in — perfect for laptop users who keep bumping the touchpad while typing. In Network, new DNS domain search settings have been added, while support for the outdated WEP wireless security standard has been removed entirely, in line with modern security practice. Remote Login now supports SSH socket servers, in addition to the traditional service-based setup. Elsewhere, the Users tool gains a new, improved fingerprint enrollment interface, and the About (System Details) page has been reorganized, with a handy new button that opens the release notes for the version of GNOME you are running.

GNOME 的“设置”应用在 GNOME 51 中进行了广泛的改进。在“显示”中，配备加速度计的设备现在可以使用新的“自动旋转”选项，当设备转动时，屏幕会自动在纵向和横向之间切换。启用自动旋转后，配套的“方向锁定”选项允许您随时将显示器固定在当前方向。显示器排列也得到了改进，增加了中心对齐吸附功能，使匹配物理布局变得更加容易。鼠标设置中增加了一个实用的新选项，可以在插入鼠标时自动禁用触摸板——这对于打字时经常误触触摸板的笔记本用户来说非常完美。在“网络”中，增加了新的 DNS 域搜索设置，同时完全移除了对过时的 WEP 无线安全标准的支持，以符合现代安全实践。远程登录现在除了传统的基于服务的设置外，还支持 SSH 套接字服务器。此外，“用户”工具获得了全新且改进的指纹录入界面，“关于”（系统详情）页面也进行了重组，并增加了一个方便的新按钮，可以直接打开您当前运行的 GNOME 版本的发行说明。

### Remote Desktop
### 远程桌面

GNOME's Remote Desktop lets you connect to your computer from another device, so you can use it from wherever you are. Remote Your Smartcard: if you use a smartcard — for example the card many workplaces issue for signing in or approving things — you can now plug it into the computer you're working from and use it on the computer you've connected to. Authenticate with Kerberos: in work settings that use Kerberos, you can now log straight into a user session remotely, without extra steps.

GNOME 的远程桌面功能让您可以从其他设备连接到您的计算机，无论身在何处都能使用。远程使用智能卡：如果您使用智能卡（例如许多工作场所发放用于登录或审批的卡片），现在可以将其插入您当前操作的计算机，并在连接的远程计算机上使用它。通过 Kerberos 认证：在使用 Kerberos 的工作环境中，您现在可以直接远程登录用户会话，无需额外步骤。

### Maps
### 地图

Maps has seen its most exciting release in years, thanks to a major new capability: offline maps. Version 51 allows you to download map areas for a region of your choice, and use them without a network connection. This is a huge win for traveling abroad, where data roaming is expensive or patchy, as well as for areas with poor coverage. Downloaded areas are managed from a simple list, so you can see what you have stored and remove regions you no longer need. Public transit directions have also received a lot of attention: Live departures: tapping a station or stop now shows live departure and arrival times for buses, trains, and other services, where the data is available. Real-time delays: journey instructions show real-time delay information, so you can see at a glance whether your connection is running late. Track and stop information: instructions tell you which platform or stop to use, making transfers less stressful. Walking times: itineraries now show how long it takes to walk to and from the stops on your journey.

得益于一项重大新功能：离线地图，“地图”应用迎来了多年来最令人兴奋的版本更新。51 版本允许您下载所选区域的地图，并在没有网络连接的情况下使用它们。这对于数据漫游昂贵或不稳定的出国旅行，以及网络覆盖较差的地区来说是一个巨大的福音。下载的区域通过一个简单的列表进行管理，您可以查看已存储的内容并删除不再需要的区域。公共交通导航也受到了高度关注：实时出发信息：点击车站或站点，现在可以显示公交车、火车和其他服务的实时出发和到达时间（在数据可用时）。实时延误：行程说明会显示实时延误信息，让您一眼就能看出您的班次是否晚点。站台和站点信息：导航说明会告诉您使用哪个站台或站点，使换乘不再令人焦虑。步行时间：行程规划现在会显示往返于站点所需的步行时间。

### Files
### 文件

Files has received a range of thoughtful improvements in GNOME 51. These include: Drag counter badge: when you drag multiple files, a small badge now shows how many items are being dragged. Smarter selection: files that have been created by being copied are now automatically selected, making it easy to perform follow-up actions on them. Additionally, right-clicking the empty area of a folder no longer clears your selection. Clearer file states: folders now show the correct read-only or unreadable emblem, with a sensible precedence when several emblems apply. Improved responsiveness: several slow operations no longer block the app, resulting in a snappier experience. Folder reloading folder views is also faster, especially when using large or slow folders. Better notifications: notifications shown by Files are now grouped, making it easier to both find and manage them.

“文件”应用在 GNOME 51 中进行了一系列贴心的改进。包括：拖拽计数徽章：当您拖拽多个文件时，一个小徽章会显示正在拖拽的项目数量。更智能的选择：通过复制创建的文件现在会自动被选中，方便您对它们执行后续操作。此外，右键点击文件夹空白区域不再会清除您的选择。更清晰的文件状态：文件夹现在会显示正确的“只读”或“不可读”图标，当多个图标适用时，会有合理的优先级排序。改进的响应速度：一些缓慢的操作不再会阻塞应用，从而带来更灵敏的体验。文件夹视图的重新加载速度也更快，特别是在使用大型或缓慢的文件夹时。更好的通知：文件应用显示的通知现在会被分组，使其更易于查找和管理。

### Web
### 网络

Web, GNOME's browser, has been polished and hardened for GNOME 51. Copy page URL: a new keyboard shortcut, Ctrl+Shift+C, lets you copy the address of the current page without needing to open the address bar. Secure password generation: Web can now generate strong, secure passwords with the help of the `pwquality` library, taking the guesswork out of creating new accounts. Reliable password manager: a round of bug fixing has improved the password manager experience. Refreshed address bar: search engine suggestions no longer clutter the address bar dropdown with their URLs, keeping the list clean and readable.

GNOME 的浏览器 Web 在 GNOME 51 中得到了打磨和加固。复制页面 URL：新的键盘快捷键 Ctrl+Shift+C 让您可以直接复制当前页面的地址，无需打开地址栏。安全密码生成：Web 现在可以借助 `pwquality` 库生成强大、安全的密码，让创建新账户不再需要猜测。可靠的密码管理器：经过一轮错误修复，密码管理器的体验得到了提升。焕然一新的地址栏：搜索引擎建议不再会在地址栏下拉菜单中堆砌 URL，保持了列表的整洁和易读性。