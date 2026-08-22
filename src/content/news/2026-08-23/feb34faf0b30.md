---
title: "n8n-io / n8n"
originalUrl: "https://github.com/n8n-io/n8n"
date: "2026-08-22T21:44:31.191Z"
---

# n8n-io / n8n

**n8n – The Platform for AI Agents and Workflow Automation**
n8n – AI 智能体与工作流自动化平台。这是一个用于构建和部署 AI 智能体及工作流的 Fair-code（公平代码）平台。它将可视化画布与自定义代码相结合，支持自托管或云端运行，并可连接 1500 多种集成。从原型设计到生产环境，为您提供值得信赖的 AI 自动化服务。

**Key Capabilities**
**核心功能**

*   **AI-Native Automation Platform:** Build and operationalize AI workflows and multi-step agents using your own data, models, and tools.
    **AI 原生自动化平台：** 使用您自己的数据、模型和工具，构建并运行 AI 工作流及多步骤智能体。

*   **Model Flexibility, No Lock-In:** Connect to OpenAI, Anthropic, Google, or open-source models and switch providers without changing your architecture.
    **模型灵活性，无厂商锁定：** 连接 OpenAI、Anthropic、Google 或开源模型，无需更改架构即可切换服务提供商。

*   **From Prototype to Production:** Design multi-step AI workflows with logic, tool use, human approvals, and full observability.
    **从原型到生产：** 设计包含逻辑判断、工具调用、人工审批和全链路可观测性的多步骤 AI 工作流。

*   **Code When You Need It:** Combine visual building with JavaScript, Python, and npm packages for advanced AI workflows.
    **按需编写代码：** 将可视化构建与 JavaScript、Python 和 npm 包相结合，实现高级 AI 工作流。

*   **Enterprise-Ready AI:** Self-host or deploy securely with role-based access, audit trails, and support for sensitive data.
    **企业级 AI：** 支持自托管或安全部署，提供基于角色的访问控制、审计追踪，并支持敏感数据处理。

*   **Leverage What Already Exists:** 1500+ integrations and 9,000+ workflow templates to connect AI with your existing systems.
    **利用现有资源：** 提供 1500 多种集成和 9000 多种工作流模板，将 AI 与您现有的系统连接起来。

**Quick Start**
**快速开始**

Try n8n instantly with our install script (requires Docker):
通过我们的安装脚本立即尝试 n8n（需要 Docker）：
`curl -fsSL https://get.n8n.io | sh`

Or deploy manually with Docker:
或使用 Docker 手动部署：
`docker volume create n8n_data`
`docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n`

Access the editor at http://localhost:5678
访问编辑器：http://localhost:5678

**Resources**
**资源**
📚 Documentation (文档) | 🔧 1500+ Integrations (集成) | 💡 Example Workflows (示例工作流) | 🤖 AI & LangChain Guide (AI 与 LangChain 指南) | 👥 Community Forum (社区论坛) | 📖 Community Tutorials (社区教程)

**Support**
**支持**
Need help? Our community forum is the place to get support and connect with other users: community.n8n.io
需要帮助？我们的社区论坛是获取支持并与其他用户交流的最佳场所：community.n8n.io

**License**
**许可协议**
n8n is fair-code distributed under the Sustainable Use License and n8n Enterprise License.
n8n 采用 Fair-code 模式分发，遵循“可持续使用许可协议 (Sustainable Use License)”和“n8n 企业许可协议”。

*   **Source Available:** Always visible source code
    **源码可见：** 源代码始终公开可见
*   **Self-Hostable:** Deploy anywhere
    **可自托管：** 可部署在任何地方
*   **Extensible:** Add your own nodes and functionality
    **可扩展：** 可添加自定义节点和功能

Enterprise Licenses available for additional features and support. Additional information about the license model can be found in the docs.
企业版许可提供更多功能和支持。有关许可模式的更多信息，请参阅文档。

**Contributing**
**贡献**
Found a bug 🐛 or have a feature idea ✨? Check our Contributing Guide for a setup guide & best practices.
发现 Bug 🐛 或有功能建议 ✨？请查看我们的贡献指南，了解设置流程和最佳实践。

**Join the Team**
**加入团队**
Want to shape the future of automation? Check out our job posts and join our team!
想要塑造自动化的未来吗？查看我们的招聘信息并加入我们！

**What does n8n mean?**
**n8n 是什么意思？**

Short answer: It means "nodemation" and is pronounced as n-eight-n.
简短回答：它代表“nodemation”，发音为 n-eight-n。

Long answer: "I get that question quite often (more often than I expected) so I decided it is probably best to answer it here. While looking for a good name for the project with a free domain I realized very quickly that all the good ones I could think of were already taken. So, in the end, I chose nodemation. 'node-' in the sense that it uses a Node-View and that it uses Node.js and '-mation' for 'automation' which is what the project is supposed to help with. However, I did not like how long the name was and I could not imagine writing something that long every time in the CLI. That is when I then ended up on 'n8n'." - Jan Oberhauser, Founder and CEO, n8n.io
详细回答：“我经常被问到这个问题（比我预期的要频繁得多），所以我决定在这里统一回答。在为项目寻找一个好名字且域名可用的过程中，我很快发现我能想到的好名字都被注册了。最终，我选择了 nodemation。‘node-’ 是因为它使用了节点视图（Node-View）并且基于 Node.js 开发，而 ‘-mation’ 代表 ‘automation’（自动化），这正是该项目旨在解决的问题。然而，我不喜欢这个名字太长，也无法想象每次在命令行（CLI）中都要输入那么长的名字。于是，我最终确定了 ‘n8n’ 这个名字。” —— Jan Oberhauser，n8n.io 创始人兼 CEO。