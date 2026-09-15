---
title: "danny-avila / LibreChat"
originalUrl: "https://github.com/danny-avila/LibreChat"
date: "2026-09-15T23:37:58.381Z"
---

# LibreChat v0.8.8-rc3 更新日志

**What's New in v0.8.8-rc3**
**v0.8.8-rc3 版本更新内容**

**Agent Management API (beta):** Create, discover, update, and delete Agents; manage Agent files and Skills; and authenticate machine clients through deployment-bound OIDC identities while preserving existing role and Agent access controls.
**智能体管理 API（测试版）：** 支持创建、发现、更新和删除智能体；管理智能体文件和技能；通过部署绑定的 OIDC 身份验证机器客户端，同时保留现有的角色和智能体访问控制。

**Attached workspaces (highly experimental):** Select or save a per-Agent default workspace for each managed or personal code worker, then let Agents inspect trees, read and search files, author changes, and run Bash with bounded timeouts. Personal workers support bounded self-service enrollment, readiness status, and per-Agent Git identity.
**附加工作区（高度实验性）：** 为每个托管或个人代码工作者选择或保存智能体默认工作区，允许智能体检查目录树、读取和搜索文件、编写更改，并在受限超时内运行 Bash 命令。个人工作者支持受限的自助注册、就绪状态以及按智能体划分的 Git 身份。

**Background tool controls:** Optionally cancel ordinary background tools, including attached Bash, while keeping detached Subagent execution independent.
**后台工具控制：** 可选择取消普通后台工具（包括附加的 Bash），同时保持分离的子智能体执行不受影响。

**Code approval controls:** Choose Ask, Allow, or Deny for file writes and command execution where administrators permit it, including a Full access mode for trusted attached environments. File Search and Run Code also honor role grants.
**代码审批控制：** 在管理员允许的情况下，针对文件写入和命令执行选择“询问”、“允许”或“拒绝”，包括针对受信任附加环境的“完全访问”模式。文件搜索和代码运行功能同样遵循角色权限设置。

**Manual context compaction:** Start a summarize-only turn before the context window fills while preserving recent conversation content according to the deployment's summarization policy.
**手动上下文压缩：** 在上下文窗口填满前启动仅摘要模式，根据部署的摘要策略保留最近的对话内容。

**Context Usage:** Inspect dialogue, retained tool traffic, Agent instructions, cache, cost, and runway pressure without double-counting category subsets.
**上下文使用情况：** 查看对话、保留的工具流量、智能体指令、缓存、成本和运行压力，且不会对类别子集进行重复计算。

**Unified attachments:** Upload once and let LibreChat route content to the model or extracted text, then provision File Search and Code tools only when needed.
**统一附件：** 只需上传一次，LibreChat 即可将内容路由至模型或提取文本，并仅在需要时提供文件搜索和代码工具。

**Models:** Added GPT-6 Astra for the OpenAI and Agents endpoints, with Responses API routing and tool-call support.
**模型：** 为 OpenAI 和智能体端点添加了 GPT-6 Astra，支持 Responses API 路由和工具调用。

**Agent and chat UI:** Unified tool activity, reasoning, search, and Agent workflows; added one draggable Pinned section for chats and favorites, morphing state icons, high-contrast themes, rich-text message copying, clearer sidebar titles, and refined live phase layouts.
**智能体与聊天界面：** 统一了工具活动、推理、搜索和智能体工作流；增加了可拖拽的聊天和收藏置顶区域、变形状态图标、高对比度主题、富文本消息复制、更清晰的侧边栏标题以及优化的实时阶段布局。

**Observability:** Export correlated application logs through OpenTelemetry, configure allowlisted Langfuse trace identity and metadata, tag browser diagnostics with client build IDs, and scope Insights to authorized Agents.
**可观测性：** 通过 OpenTelemetry 导出关联的应用日志，配置允许列表中的 Langfuse 追踪身份和元数据，使用客户端构建 ID 标记浏览器诊断信息，并将洞察范围限定在授权的智能体内。

**Reliability and security:** Strengthened Agent continuation and checkpoint recovery, Redis liveness detection, DocumentDB coordination, OpenID and MCP OAuth sessions, shared-link throttling, tenant isolation, attachment bounds, and upload error handling.
**可靠性与安全性：** 加强了智能体续写和检查点恢复、Redis 活跃度检测、DocumentDB 协调、OpenID 和 MCP OAuth 会话、共享链接限流、租户隔离、附件限制以及上传错误处理。

---

### ✨ Features / 功能特性

**🖥️ UI & Experience:** inspired by ChatGPT with enhanced design and features.
**🖥️ UI 与体验：** 受 ChatGPT 启发，拥有增强的设计和功能。

**🤖 AI Model Selection:** Anthropic (Claude), AWS Bedrock, OpenAI, Azure OpenAI, Google, Vertex AI, OpenAI Responses API (incl. Azure).
**🤖 AI 模型选择：** 支持 Anthropic (Claude)、AWS Bedrock、OpenAI、Azure OpenAI、Google、Vertex AI、OpenAI Responses API（含 Azure）。

**Custom Endpoints:** Use any OpenAI-compatible API with LibreChat, no proxy required.
**自定义端点：** 无需代理，即可在 LibreChat 中使用任何兼容 OpenAI 的 API。

**Compatible with Local & Remote AI Providers:** Ollama, AMD Lemonade, groq, Cohere, Mistral AI, Apple MLX, koboldcpp, together.ai, OpenRouter, Helicone, Perplexity, ShuttleAI, Deepseek, Qwen, and more.
**兼容本地与远程 AI 提供商：** 支持 Ollama、AMD Lemonade、groq、Cohere、Mistral AI、Apple MLX、koboldcpp、together.ai、OpenRouter、Helicone、Perplexity、ShuttleAI、Deepseek、Qwen 等。

**🔧 Code Interpreter API:** Secure, Sandboxed Execution in Python, Node.js (JS/TS), Go, C/C++, Java, PHP, Rust, and Fortran.
**🔧 代码解释器 API：** 在 Python、Node.js (JS/TS)、Go、C/C++、Java、PHP、Rust 和 Fortran 中进行安全、沙盒化的执行。

**Seamless File Handling:** Upload, process, and download files directly.
**无缝文件处理：** 直接上传、处理和下载文件。

**No Privacy Concerns:** Fully isolated and secure execution.
**无隐私顾虑：** 完全隔离且安全的执行环境。

**Open-Source & Self-Hostable:** powered by ClickHouse/code-interpreter.
**开源且可自托管：** 由 ClickHouse/code-interpreter 提供支持。

**🔦 Agents & Tools Integration:**
**🔦 智能体与工具集成：**

*   **LibreChat Agents:** No-Code Custom Assistants: Build specialized, AI-driven helpers.
    *   **LibreChat 智能体：** 无代码自定义助手：构建专业的 AI 驱动助手。
*   **Agent Marketplace:** Discover and deploy community-built agents.
    *   **智能体市场：** 发现并部署社区构建的智能体。
*   **Collaborative Sharing:** Share agents with specific users and groups.
    *   **协作共享：** 与特定用户和群组共享智能体。
*   **Flexible & Extensible:** Use MCP Servers, tools, file search, code execution, and more.
    *   **灵活且可扩展：** 使用 MCP 服务器、工具、文件搜索、代码执行等。
*   **Skills:** Create reusable SKILL.md instruction bundles for manual, automatic, or always-on agent workflows.
    *   **技能：** 为手动、自动或常驻智能体工作流创建可复用的 SKILL.md 指令包。
*   **Agent Plugins:** Experimentally bundle deployment Skills and MCP servers into startup-loaded packages.
    *   **智能体插件：** 实验性地将部署技能和 MCP 服务器打包为启动加载包。
*   **Subagents:** Delegate focused work to isolated child agent runs with their own context windows.
    *   **子智能体：** 将专注任务委派给拥有独立上下文窗口的子智能体运行。
*   **Agent Management API:** Automate Agent, file, and Skill management with deployment-bound OIDC clients.
    *   **智能体管理 API：** 使用部署绑定的 OIDC 客户端自动化管理智能体、文件和技能。
*   **Attached Code Workspaces:** Let Agents inspect, search, edit, and run commands in managed or personal workspaces (highly experimental).
    *   **附加代码工作区：** 允许智能体在托管或个人工作区中检查、搜索、编辑和运行命令（高度实验性）。

**🔍 Web Search:** Search the internet and retrieve relevant information to enhance your AI context. Combines search providers, content scrapers, and result rerankers for optimal results.
**🔍 网络搜索：** 搜索互联网并检索相关信息以增强 AI 上下文。结合了搜索提供商、内容抓取器和结果重排序器以获得最佳结果。

**🪄 Generative UI with Code Artifacts:** Create React, HTML, and Mermaid content directly in chat. Open previews fullscreen and export Mermaid diagrams as SVG or PNG.
**🪄 生成式 UI 与代码工件：** 直接在聊天中创建 React、HTML 和 Mermaid 内容。支持全屏预览，并将 Mermaid 图表导出为 SVG 或 PNG。

**🎨 Image Generation & Editing:** Text-to-image and image-to-image with GPT-Image-1, DALL-E (3/2), Stable Diffusion, Flux, or any MCP server.
**🎨 图像生成与编辑：** 使用 GPT-Image-1、DALL-E (3/2)、Stable Diffusion、Flux 或任何 MCP 服务器进行文生图和图生图。

**💾 Presets & Context Management:** Create, Save, & Share Custom Presets; Edit, Resubmit, and Continue Messages; Fork Messages & Conversations.
**💾 预设与上下文管理：** 创建、保存和共享自定义预设；编辑、重新提交和继续消息；分支消息与对话。

**💬 Multimodal & File Interactions:** Upload and analyze images with Claude 3, GPT-4.5, GPT-4o, o1, Llama-Vision, and Gemini. Chat with Files using Custom Endpoints.
**💬 多模态与文件交互：** 使用 Claude 3、GPT-4.5、GPT-4o、o1、Llama-Vision 和 Gemini 上传并分析图像。通过自定义端点与文件进行对话。

**🌎 Multilingual UI:** Supports over 40 languages including English, 中文 (简体), 中文 (繁體), etc.
**🌎 多语言界面：** 支持包括英语、中文（简体）、中文（繁體）等在内的 40 多种语言。

**🧠 Reasoning UI:** Dynamic Reasoning UI for Chain-of-Thought/Reasoning AI models like DeepSeek.
**🧠 推理界面：** 为 DeepSeek 等思维链/推理 AI 模型提供动态推理界面。