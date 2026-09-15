---
title: "Homebrew / BrewUI"
originalUrl: "https://github.com/Homebrew/BrewUI"
date: "2026-09-15T23:37:35.674Z"
---

# Homebrew / BrewUI

🧑‍💻 **BrewUI: Homebrew's official macOS GUI**
Making package management approachable for users who prefer graphical interfaces over Terminal, while maintaining complete transparency about underlying Homebrew operations.

🧑‍💻 **BrewUI：Homebrew 官方 macOS 图形界面**
旨在为偏好图形界面而非终端的用户提供易用的包管理体验，同时保持对底层 Homebrew 操作的完全透明。

💡 **Motivation**
Enable CLI-averse users to safely discover, install, update, and manage Homebrew packages through a native SwiftUI interface that never hides what Homebrew is doing.

💡 **开发动机**
让不习惯使用命令行（CLI）的用户能够通过原生的 SwiftUI 界面，安全地发现、安装、更新和管理 Homebrew 软件包，且绝不隐藏 Homebrew 的后台操作。

📲 **Tech**
Swift 6.0 with strict concurrency · SwiftUI · Swift Package Manager
macOS Tahoe 26+
Data from the brew CLI and the Homebrew JSON API

📲 **技术栈**
Swift 6.0（严格并发模式）· SwiftUI · Swift Package Manager
macOS Tahoe 26+
数据源自 brew CLI 和 Homebrew JSON API

📦 **Installation**
`brew install --cask homebrew-app`

📦 **安装方式**
`brew install --cask homebrew-app`

**Homebrew configuration**
BrewUI always launches Homebrew through /bin/zsh, including app self-upgrades. It disables optional user and system shell startup files with `--no-rcs --no-global-rcs` and supplies a clean environment. PATH contains only the directory of the located brew executable followed by `/usr/bin:/bin`. Your login shell, shell aliases, exported variables and custom PATH do not configure Homebrew in BrewUI.

**Homebrew 配置**
BrewUI 始终通过 `/bin/zsh` 启动 Homebrew（包括应用自更新）。它通过 `--no-rcs --no-global-rcs` 参数禁用可选的用户和系统 shell 启动文件，从而提供一个纯净的运行环境。PATH 环境变量仅包含已定位的 brew 可执行文件目录，后接 `/usr/bin:/bin`。你的登录 shell、shell 别名、导出变量和自定义 PATH 不会影响 BrewUI 中的 Homebrew 配置。

Put your Homebrew configuration variables in `brew.env` files. Homebrew reads these itself:
*   **User**: `~/.homebrew/brew.env`
*   **Installation**: `<Homebrew prefix>/etc/homebrew/brew.env`
*   **System**: `/etc/homebrew/brew.env`

请将你的 Homebrew 配置变量放入 `brew.env` 文件中，Homebrew 会自动读取这些文件：
*   **用户级**：`~/.homebrew/brew.env`
*   **安装级**：`<Homebrew prefix>/etc/homebrew/brew.env`
*   **系统级**：`/etc/homebrew/brew.env`

For example, add this line to `~/.homebrew/brew.env`: `HOMEBREW_NO_ENV_HINTS=1`
Use literal `NAME=value` lines without export, shell expansion or command substitution. User settings normally override installation settings, which override system settings. `HOMEBREW_SYSTEM_ENV_TAKES_PRIORITY=1` in the system file makes that file take precedence. See Homebrew's environment documentation. An `XDG_CONFIG_HOME` exported by your shell is also ignored; use the user file above.

例如，在 `~/.homebrew/brew.env` 中添加一行：`HOMEBREW_NO_ENV_HINTS=1`
请使用字面量 `NAME=value` 格式，不要使用 export、shell 扩展或命令替换。通常用户设置会覆盖安装设置，安装设置会覆盖系统设置。在系统文件中设置 `HOMEBREW_SYSTEM_ENV_TAKES_PRIORITY=1` 可使该文件具有最高优先级。详情请参阅 Homebrew 的环境文档。shell 导出的 `XDG_CONFIG_HOME` 也会被忽略；请使用上述用户文件。

Relaunch BrewUI after changing configuration, then check the Configuration tab. Its report and Doctor describe Homebrew's environment in the app and may differ from Terminal. BrewUI still sets output controls for its console and self-upgrade log. System zsh always reads `/etc/zshenv`, if present; its execution cannot be disabled. BrewUI clears the environment again afterwards and discards startup output so banners do not reach Homebrew's reports or the console. If startup fails before Homebrew runs, its diagnostics are retained. See zsh's startup-file documentation.

修改配置后请重启 BrewUI，然后检查“配置（Configuration）”选项卡。其中的报告和 Doctor 功能描述了应用内的 Homebrew 环境，这可能与终端中的有所不同。BrewUI 仍会为其控制台和自更新日志设置输出控制。系统 zsh 始终会读取 `/etc/zshenv`（如果存在），其执行无法被禁用。BrewUI 会在之后再次清理环境并丢弃启动输出，以确保横幅信息不会出现在 Homebrew 的报告或控制台中。如果 Homebrew 运行前启动失败，诊断信息会被保留。详情请参阅 zsh 的启动文件文档。

🛠️ **Development**
After cloning: `./scripts/bootstrap`
This installs Mint from Brewfile, runs mint bootstrap to build the SwiftFormat and SwiftLint versions pinned in Mintfile, enables repository git hooks, and resolves Swift package dependencies for Homebrew.xcodeproj.

🛠️ **开发**
克隆仓库后运行：`./scripts/bootstrap`
此脚本会从 Brewfile 安装 Mint，运行 `mint bootstrap` 以构建 Mintfile 中指定的 SwiftFormat 和 SwiftLint 版本，启用仓库 git hooks，并为 Homebrew.xcodeproj 解析 Swift 包依赖。

After bootstrap, commits automatically run checks on staged Swift files:
`mint run swiftformat`
`mint run swiftlint` (with --fix, then strict validation)
If unresolved lint violations remain, the commit is blocked and the hook prints specific SwiftLint failures so you can fix and re-commit.

引导完成后，提交代码时会自动对暂存的 Swift 文件进行检查：
`mint run swiftformat`
`mint run swiftlint`（先执行 --fix，再进行严格验证）
如果仍存在未解决的 lint 违规，提交将被拦截，hook 会打印具体的 SwiftLint 错误信息，以便你修复后重新提交。

🚧 **Status**
Stable and under active development.

🚧 **状态**
稳定，且处于活跃开发中。

📄 **Licence**
AGPL-3.0. If you reuse or adapt the source the AGPL terms apply, including the network-use clause.

📄 **许可证**
AGPL-3.0。如果你重用或改编此源代码，则适用 AGPL 条款，包括网络使用条款（network-use clause）。