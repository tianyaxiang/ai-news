---
title: "melgarafael / DeskcommCRM"
originalUrl: "https://github.com/melgarafael/DeskcommCRM"
date: "2026-09-11T23:27:07.027Z"
---

# DeskcommCRM: The Open-Source AI Sales OS

**DeskcommCRM — The AI-powered, open-source Sales Operating System for WhatsApp.**
DeskcommCRM — 专为 WhatsApp 设计的开源 AI 销售操作系统。

**AI agents that assist, qualify, and sell on WhatsApp — all within an open-source CRM running on your own server. No monthly fees, no locked features, and you keep full ownership of your data. The open alternative to Kommo, Octadesk, and Intercom.**
AI 代理可在 WhatsApp 上提供服务、筛选客户并完成销售，所有功能均集成在你服务器上运行的开源 CRM 中。无月费、无功能限制，数据完全由你掌控。它是 Kommo、Octadesk 和 Intercom 的开源替代方案。

---

### ☁️ Run this CRM in production with 1 command
### ☁️ 用一条命令在生产环境运行此 CRM

**DeskcommCRM was developed in partnership with HostGator: the `hostgator-setup-kit/` installs the complete CRM (app + WhatsApp + database) on a VPS with a single command, and the production runbook handles the environment automatically.**
DeskcommCRM 是与 HostGator 合作开发的：`hostgator-setup-kit/` 可通过一条命令在 VPS 上安装完整的 CRM（应用 + WhatsApp + 数据库），生产环境运行手册会自动处理相关配置。

**👉 Sign up for a HostGator VPS with our partnership discount — datacenter in São Paulo, ideal for 24/7 WhatsApp operations. (Partner link — signing up through it supports the project and is cheaper).**
👉 通过我们的合作伙伴折扣注册 HostGator VPS — 数据中心位于圣保罗，非常适合 24/7 全天候运行 WhatsApp。（合作伙伴链接 — 通过此链接注册既能支持项目，价格也更优惠）。

**Don't have a server yet? Run this on your computer (macOS, Linux, or WSL). It tells you which plan to choose — with specific runbook numbers, not a "it depends" — and gives you the exact command for your case:**
还没有服务器？在你的电脑（macOS、Linux 或 WSL）上运行此命令。它会告诉你该选择哪个方案（提供具体的运行手册数据，而不是模棱两可的“视情况而定”），并为你提供针对你情况的准确命令：

`curl -fsSL https://raw.githubusercontent.com/melgarafael/DeskcommCRM/main/hostgator-setup-kit/comecar.sh | bash`
*(Prefer to read before executing? Clone the repo and run `bash hostgator-setup-kit/comecar.sh` — it won't install anything without your confirmation.)*
*（执行前想先阅读代码？克隆仓库并运行 `bash hostgator-setup-kit/comecar.sh` — 在你确认之前，它不会安装任何东西。）*

---

### ⚡ Install on your VPS (The main path)
### ⚡ 在你的 VPS 上安装（主要路径）

**1. Access your VPS**
**1. 访问你的 VPS**

**Open the Terminal on your computer (PowerShell on Windows; Terminal on Mac or Linux) and connect using the IP and port provided by your host via email:**
打开你电脑上的终端（Windows 上使用 PowerShell；Mac 或 Linux 上使用 Terminal），并使用主机商通过电子邮件提供的 IP 和端口进行连接：

`ssh -p PORT root@YOUR_IP`

**Replace PORT and YOUR_IP with your actual details. If the host didn't mention a port, it's the default (22) and you can omit it: `ssh root@YOUR_IP`. It will ask for the password. When typing, nothing appears on the screen — not even asterisks. This is not a freeze: it's the terminal hiding the password. Type (or paste) and press Enter. On the first connection, it asks "Are you sure you want to continue connecting?" — answer `yes`. It's the server introducing itself for the first time.**
将 PORT 和 YOUR_IP 替换为你的实际信息。如果主机商未提及端口，则为默认端口 (22)，你可以省略：`ssh root@YOUR_IP`。系统会要求输入密码。输入时屏幕上不会显示任何内容，甚至连星号都没有。这不是死机，而是终端在隐藏密码。输入（或粘贴）后按回车。首次连接时，它会询问 "Are you sure you want to continue connecting?" — 回答 `yes` 即可。这是服务器首次进行身份验证。

**2. Run the installer**
**2. 运行安装程序**

**Once inside the VPS:**
进入 VPS 后：

```bash
git clone https://github.com/melgarafael/DeskcommCRM.git
cd DeskcommCRM
bash hostgator-setup-kit/install.sh
```

**That's it. You don't need to install Node, pnpm, or compile anything — the app image comes ready. If Docker is missing, the installer asks and installs it automatically.**
就是这样。你无需安装 Node、pnpm 或进行任何编译 — 应用镜像已准备就绪。如果缺少 Docker，安装程序会询问并自动安装。

---

### What you need to have on hand
### 你需要准备的东西

| Item | Where to get it |
| :--- | :--- |
| **VPS with Docker** | HostGator (partnership) — or any VPS with Docker. 4GB RAM recommended. |
| **Domain** | An A record pointing to the VPS IP (e.g., crm.yourcompany.com) |
| **Database** | Free account at supabase.com — 3 keys + connection string from Session pooler |
| **AI** | An OpenRouter, Anthropic, or OpenAI key — the installer asks which one you want |
| **WhatsApp** | Your number, connected via QR code during onboarding (or Meta's official channel) |

| 项目 | 获取途径 |
| :--- | :--- |
| **带 Docker 的 VPS** | HostGator（合作伙伴）— 或任何带 Docker 的 VPS。建议 4GB 内存。 |
| **域名** | 指向 VPS IP 的 A 记录（例如：crm.yourcompany.com） |
| **数据库** | supabase.com 的免费账户 — 3 个密钥 + 来自 Session pooler 的连接字符串 |
| **AI** | OpenRouter、Anthropic 或 OpenAI 密钥 — 安装程序会询问你想要哪一个 |
| **WhatsApp** | 你的号码，在入职引导时通过二维码连接（或 Meta 官方渠道） |

---

### 💡 Supabase can be created by the installer itself.
### 💡 Supabase 可以由安装程序自动创建。

**Export a `SUPABASE_ACCESS_TOKEN` before running, and it will create the project, wait for the database to be healthy, fetch the 4 credentials, and discover the pooler host by testing the actual connection — no copy-pasting required.**
在运行前导出一个 `SUPABASE_ACCESS_TOKEN`，它会自动创建项目、等待数据库就绪、获取 4 个凭据，并通过测试实际连接来发现 pooler 主机 — 无需手动复制粘贴。

---

### 🤖 Prefer an AI to install it for you?
### 🤖 想让 AI 帮你安装吗？

**Drop the `hostgator-setup-kit/` folder into Claude Code running inside the VPS and say "install DeskcommCRM for me." It reads the `CLAUDE.md` file in the kit — which contains the step-by-step guide and mapped pitfalls — and handles everything in Portuguese.**
将 `hostgator-setup-kit/` 文件夹拖入在 VPS 中运行的 Claude Code，并说 "install DeskcommCRM for me"。它会读取工具包中的 `CLAUDE.md` 文件（其中包含分步指南和已知的坑），并以葡萄牙语处理所有事务。

---

### 🔄 Updating
### 🔄 更新

**Is there a new version? There are two ways, and the first one doesn't require a terminal.**
有新版本了吗？有两种方式，第一种不需要终端。

**Via the screen (recommended):**
**通过界面（推荐）：**

**When a new version is available, the sidebar footer lights up "New version" — only for the server owner. Click it, and you'll be taken to Settings → Update, which shows what's changing, automatically backs up the database, and tracks every phase (backup → code → database → live) until finished. No SSH required.**
当有新版本时，侧边栏底部会亮起“新版本”提示 — 仅对服务器所有者可见。点击它，你将进入“设置 → 更新”，它会显示变更内容、自动备份数据库，并跟踪每个阶段（备份 → 代码 → 数据库 → 上线），直到完成。无需 SSH。