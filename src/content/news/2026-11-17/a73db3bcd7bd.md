---
title: "How to Stop Claude & Cursor from Suggesting Taken Domains (Free Zero-Auth MCP Server)"
originalUrl: "https://dev.to/domainmint/how-to-stop-claude-cursor-from-suggesting-taken-domains-free-zero-auth-mcp-server-4a2o"
date: "2026-11-17T03:49:55.000Z"
excerpt: false
---

### How to Stop Claude & Cursor from Suggesting Taken Domains (Free Zero-Auth MCP Server)

每当你让 Claude、Cursor 或 ChatGPT 为初创公司或副业项目构思域名时，90% 以上的 .com、.io 和 .ai 建议都已经被注册了——这是因为大语言模型的训练权重无法查询实时 DNS 区域。为了解决这个问题，我构建了 TLDMint 并发布了一个免费的、无需身份验证的模型上下文协议 (MCP) 服务器 (cputop/tldmint-mcp)，该服务器由 Cloudflare 1.1.1.1 DNS-over-HTTPS 和 ICANN RDAP 提供支持。

**1. Zero-Install Remote HTTP MCP Endpoint**
If your client supports Remote Streamable HTTP MCP (Cursor, Claude Desktop Remote Connectors, Windsurf, OpenAI Agents SDK), add:
{ "mcpServers": { "tldmint": { "url": "https://tldmint.com/api/mcp" } } }
Or run the open-source stdio bridge from GitHub: github.com/cputop/tldmint-mcp (also listed on the Official MCP Registry and Glama).

**1. 免安装远程 HTTP MCP 端点**
如果你的客户端支持远程流式 HTTP MCP（如 Cursor、Claude Desktop 远程连接器、Windsurf、OpenAI Agents SDK），请添加：
{ "mcpServers": { "tldmint": { "url": "https://tldmint.com/api/mcp" } } }
或者从 GitHub 运行开源的 stdio 网桥：github.com/cputop/tldmint-mcp（该项目也已在官方 MCP 注册表和 Glama 上列出）。

**2. What the 4 MCP Tools Do**
*   **generate_available_domains** — Runs 16 niche naming algorithms (saas-ai, five-letter, homelab, personal-email, newsletter, domain-hack, ecommerce, etc.) and filters to live unregistered domains in real time.
*   **check_domain_availability** — Verifies up to 100 specific domains in parallel via Cloudflare 1.1.1.1 DoH (NXDOMAIN vs active nameserver delegation).
*   **inspect_domain_dns_whois** — Inspects live A, AAAA, www CNAME, MX, SPF, _dmarc, NS, and ICANN RDAP registration/expiration dates.
*   **get_verified_domain_coupons** — Surfaces active first-year registration promos and renewal benchmarks.

**2. 四个 MCP 工具的功能**
*   **generate_available_domains** — 运行 16 种细分命名算法（如 SaaS-AI、五字母、家庭实验室、个人邮箱、时事通讯、域名黑客、电子商务等），并实时筛选出未注册的可用域名。
*   **check_domain_availability** — 通过 Cloudflare 1.1.1.1 DoH 并行验证多达 100 个特定域名（区分 NXDOMAIN 与活跃的名称服务器委派）。
*   **inspect_domain_dns_whois** — 检查实时的 A、AAAA、www CNAME、MX、SPF、_dmarc、NS 记录以及 ICANN RDAP 的注册/过期日期。
*   **get_verified_domain_coupons** — 展示活跃的首年注册促销活动和续费基准价格。

**3. Free Browser Utilities (Zero Login, Zero Ads)**
Prefer a visual UI? Every endpoint also powers our ad-free browser tools:
*   **100-Domain Bulk & Keyword × TLD Matrix Checker** — Cross-multiply brand seeds across 12 TLDs and export available names to CSV.
*   **Interactive "Fix My Domain" DNS Troubleshooter Wizard** — Paste your domain and compare live DNS records line-by-line against Vercel, Lovable, Netlify, Shopify, Canva, GitHub Pages, Substack, and Private Email (catches leftover parking CNAMEs and Cloudflare NS mismatches automatically).
*   **Homelab Domain Generator** — Find clean $0.99–$2 domains for Proxmox, Jellyfin, and Cloudflare Tunnels instead of fighting .local SSL errors.
*   **OpenAPI 3.1 Spec for Custom GPT Actions** — Import https://tldmint.com/openapi.json with Auth: None.

**3. 免费浏览器工具（无需登录，无广告）**
更喜欢可视化界面？每个端点也为我们的无广告浏览器工具提供支持：
*   **100 域名批量与关键词 × TLD 矩阵检查器** — 将品牌种子与 12 个顶级域名进行交叉组合，并将可用名称导出为 CSV。
*   **交互式“修复我的域名”DNS 故障排除向导** — 粘贴你的域名，逐行对比 Vercel、Lovable、Netlify、Shopify、Canva、GitHub Pages、Substack 和私人邮箱的实时 DNS 记录（自动捕获残留的停放 CNAME 和 Cloudflare NS 不匹配问题）。
*   **家庭实验室域名生成器** — 为 Proxmox、Jellyfin 和 Cloudflare Tunnels 寻找干净的 0.99 美元至 2 美元的域名，无需再为 .local SSL 错误而烦恼。
*   **用于自定义 GPT 操作的 OpenAPI 3.1 规范** — 导入 https://tldmint.com/openapi.json，验证方式选择“无”。

Feedback or additional platform DNS presets you'd like added to the wizard? Drop a comment below!

如果你有任何反馈，或者希望向导中添加其他平台的 DNS 预设，请在下方留言！