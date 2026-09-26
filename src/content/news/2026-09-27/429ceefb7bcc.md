---
title: "microsoft / vscode"
originalUrl: "https://github.com/microsoft/vscode"
date: "2026-09-26T23:46:28.792Z"
---

# Microsoft / VS Code

**Visual Studio Code - Open Source ("Code - OSS") The Repository**
This repository ("Code - OSS") is where we (Microsoft) develop the Visual Studio Code product together with the community. Not only do we work on code and issues here, but we also publish our roadmap, monthly iteration plans, and our endgame plans. This source code is available to everyone under the standard MIT license.

**Visual Studio Code - 开源版 ("Code - OSS") 仓库**
此仓库 ("Code - OSS") 是我们（微软）与社区共同开发 Visual Studio Code 产品的地方。我们不仅在此处理代码和问题，还会发布我们的路线图、月度迭代计划以及最终发布计划。此源代码在标准的 MIT 许可协议下向所有人开放。

***

**Visual Studio Code**
Visual Studio Code is a distribution of the Code - OSS repository with Microsoft-specific customizations released under a traditional Microsoft product license. Visual Studio Code combines the simplicity of a code editor with what developers need for their core edit-build-debug cycle. It provides comprehensive code editing, navigation, and understanding support along with lightweight debugging, a rich extensibility model, and lightweight integration with existing tools. Visual Studio Code is updated monthly with new features and bug fixes. You can download it for Windows, macOS, and Linux on the Visual Studio Code website. To get the latest releases every day, install the Insiders build.

**Visual Studio Code**
Visual Studio Code 是 Code - OSS 仓库的一个发行版，包含了微软特定的定制内容，并以传统的微软产品许可协议发布。Visual Studio Code 将代码编辑器的简洁性与开发者在核心“编辑-构建-调试”周期中所需的功能相结合。它提供了全面的代码编辑、导航和理解支持，以及轻量级调试、丰富的扩展模型和与现有工具的轻量级集成。Visual Studio Code 每月更新，包含新功能和错误修复。您可以在 Visual Studio Code 官网下载适用于 Windows、macOS 和 Linux 的版本。若要每天获取最新版本，请安装 Insiders 构建版。

***

**Contributing**
There are many ways in which you can participate in this project, for example: Submit bugs and feature requests, and help us verify them as they are checked in; Review source code changes; Review the documentation and make pull requests for anything from typos to new content. If you are interested in fixing issues and contributing directly to the codebase, please see the document How to Contribute, which covers the following: How to build and run from source; The development workflow, including debugging and running tests; Coding guidelines; Submitting pull requests; Finding an issue to work on; Contributing to translations.

**参与贡献**
您可以通过多种方式参与本项目，例如：提交错误报告和功能请求，并在它们被检入时帮助我们验证；审查源代码变更；审查文档，并针对从拼写错误到新内容的任何问题提交 Pull Request。如果您有兴趣修复问题并直接为代码库做出贡献，请参阅《如何贡献》(How to Contribute) 文档，其中涵盖了以下内容：如何从源码构建和运行；开发工作流程（包括调试和运行测试）；编码规范；提交 Pull Request；寻找待处理的问题；参与翻译工作。

***

**Feedback**
Ask a question on Stack Overflow; Request a new feature; Upvote popular feature requests; File an issue; Connect with the extension author community on GitHub Discussions or Slack; Follow @code and let us know what you think! See our wiki for a description of each of these channels and information on some other available community-driven channels.

**反馈**
在 Stack Overflow 上提问；请求新功能；为热门功能请求投票；提交 Issue；在 GitHub Discussions 或 Slack 上与扩展作者社区交流；关注 @code 并告诉我们您的想法！请参阅我们的 Wiki，了解这些渠道的说明以及其他可用的社区驱动渠道信息。

***

**Related Projects**
Many of the core components and extensions to VS Code live in their own repositories on GitHub. For example, the node debug adapter and the mono debug adapter repositories are separate from each other. For a complete list, please visit the Related Projects page on our wiki.

**相关项目**
VS Code 的许多核心组件和扩展都托管在 GitHub 上各自的仓库中。例如，node 调试适配器和 mono 调试适配器的仓库是相互独立的。如需完整列表，请访问我们 Wiki 上的“相关项目”(Related Projects) 页面。

***

**Bundled Extensions**
VS Code includes a set of built-in extensions located in the extensions folder, including grammars and snippets for many languages. Extensions that provide rich language support (inline suggestions, Go to Definition) for a language have the suffix language-features. For example, the json extension provides coloring for JSON and the json-language-features extension provides rich language support for JSON.

**捆绑扩展**
VS Code 包含一组位于 `extensions` 文件夹中的内置扩展，其中包括许多语言的语法高亮和代码片段。为语言提供丰富支持（如内联建议、转到定义）的扩展带有 `language-features` 后缀。例如，`json` 扩展提供 JSON 语法着色，而 `json-language-features` 扩展则为 JSON 提供丰富的语言支持。

***

**Development Container**
This repository includes a Visual Studio Code Dev Containers / GitHub Codespaces development container. For Dev Containers, use the Dev Containers: Clone Repository in Container Volume... command, which creates a Docker volume for better disk I/O on macOS and Windows. If you already have VS Code and Docker installed, you can also click here to get started. This will cause VS Code to automatically install the Dev Containers extension if needed, clone the source code into a container volume, and spin up a dev container for use. For Codespaces, install the GitHub Codespaces extension in VS Code, and use the Codespaces: Create New Codespace command. Docker / the Codespace should have at least 4 cores and 6 GB of RAM (8 GB recommended) to run a full build. See the development container README for more information.

**开发容器**
本仓库包含一个 Visual Studio Code Dev Containers / GitHub Codespaces 开发容器。对于 Dev Containers，请使用 `Dev Containers: Clone Repository in Container Volume...` 命令，这会创建一个 Docker 卷，以在 macOS 和 Windows 上获得更好的磁盘 I/O 性能。如果您已经安装了 VS Code 和 Docker，也可以点击此处开始。这将使 VS Code 在需要时自动安装 Dev Containers 扩展，将源代码克隆到容器卷中，并启动一个开发容器供您使用。对于 Codespaces，请在 VS Code 中安装 GitHub Codespaces 扩展，并使用 `Codespaces: Create New Codespace` 命令。Docker / Codespace 应至少具备 4 核 CPU 和 6 GB 内存（推荐 8 GB）以运行完整构建。更多信息请参阅开发容器的 README 文件。

***

**Code of Conduct**
This project has adopted the Microsoft Open Source Code of Conduct. For more information, see the Code of Conduct FAQ or contact opencode@microsoft.com with any additional questions or comments.

**行为准则**
本项目采用了《微软开源行为准则》(Microsoft Open Source Code of Conduct)。如需更多信息，请参阅《行为准则常见问题解答》(Code of Conduct FAQ)，或通过 opencode@microsoft.com 联系我们以提出其他问题或意见。

***

**License**
Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.

**许可协议**
版权所有 (c) Microsoft Corporation。保留所有权利。在 MIT 许可协议下授权。