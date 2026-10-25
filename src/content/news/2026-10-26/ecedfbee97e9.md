---
title: "Same-Origin or Bust: Proxying No-Code Pages Through Nginx So Our Analytics Could See Them"
originalUrl: "https://dev.to/jobkaehenry/same-origin-or-bust-proxying-no-code-pages-through-nginx-so-our-analytics-could-see-them-15kf"
date: "2026-10-25T23:15:37.000Z"
excerpt: false
---

# Same-Origin or Bust: Proxying No-Code Pages Through Nginx So Our Analytics Could See Them

我们曾经有一个很好的设置：设计师在 Framer 中构建营销和功能页面，然后我们将它们嵌入到产品中。这节省了大量的开发时间。后来我们采用了新的分析工具，该设置便悄然失效了。本文将探讨原因、我们权衡的方案，以及我们最终如何通过专用的 Nginx 反向代理来解决问题——在此之前，我们先在 Express 中验证了这一想法。

### The new requirement: behavior analytics
### 新需求：行为分析

If you run a product, you know how valuable it is to see where users click and how they move through a page. We already used GTM and Hotjar, but we wanted more precise behavioral data, so we adopted Beusable, a tool that visualizes clicks, mouse movement, and scroll flow. The catch: it only works inside iframes under strict conditions. The tracked page must be same-origin with the host page. The embedded page must not send CSP headers that block its script.

如果你运营过产品，就会知道观察用户点击位置以及他们在页面上的移动轨迹有多么重要。我们已经使用了 GTM 和 Hotjar，但我们想要更精确的行为数据，因此采用了 Beusable，这是一款可视化点击、鼠标移动和滚动流的工具。问题在于：它只能在严格条件下的 iframe 内工作。被追踪页面必须与宿主页面同源（same-origin）。嵌入页面不得发送阻止其脚本的 CSP 标头。

### The problem: Framer's hosting
### 问题所在：Framer 的托管

Framer hosts every project at project-name.framer.com. You can embed that page in an iframe, but it's a different domain — so it's not same-origin, and the analytics tool can't capture any events inside it. Missing data for the pages we were actively iterating on meant weaker decisions about how to improve them.

Framer 将每个项目托管在 project-name.framer.com 上。你可以将该页面嵌入到 iframe 中，但它属于不同的域名——因此不是同源的，分析工具无法捕获其中的任何事件。对于我们正在积极迭代的页面，缺失数据意味着在改进决策上会变得更加薄弱。

### Options we considered
### 我们考虑过的方案

1. **A subdomain**: Idea: point something like framer.example.com at Framer. Problem: browsers treat subdomains as different origins too. 💡 Same-origin policy: if the protocol, host, or port differs, the browser treats it as a different origin and restricts access. example.com and framer.example.com are separate origins.
2. **Self-host Framer's export**: Idea: export HTML/CSS from Framer and serve it ourselves. Problem: designers edit these pages often. Every change would need a manual re-export, which is hard to automate and expensive to maintain.
3. **A reverse proxy**: A reverse proxy serves external content through our own domain, which solves the same-origin problem. After talking it through with our backend engineers, we went this way and compared three ways to build it:
    * (a) Load balancer rules at the infra layer.
    * (b) Middleware in our existing Express server.
    * (c) A dedicated Nginx proxy. ✅ This is what we chose.

1. **子域名**：想法是将 framer.example.com 之类的域名指向 Framer。问题：浏览器也将子域名视为不同的源。💡 同源策略：如果协议、主机或端口不同，浏览器会将其视为不同的源并限制访问。example.com 和 framer.example.com 是不同的源。
2. **自托管 Framer 导出内容**：想法是从 Framer 导出 HTML/CSS 并由我们自己提供服务。问题：设计师经常编辑这些页面。每次更改都需要手动重新导出，这很难自动化且维护成本高昂。
3. **反向代理**：反向代理通过我们自己的域名提供外部内容，这解决了同源问题。在与后端工程师讨论后，我们选择了这条路，并比较了三种构建方式：
    * (a) 在基础设施层设置负载均衡规则。
    * (b) 在现有的 Express 服务器中使用中间件。
    * (c) 专用的 Nginx 代理。✅ 这是我们最终的选择。

### Why Nginx
### 为什么选择 Nginx

Nginx is a lightweight, fast, flexible web server and reverse proxy — good at static files, load distribution, and proxying. Pros: Drops easily into our existing Docker-based deploy pipeline. Pulls a cross-cutting concern out of Express, so responsibilities are clearer. Security headers (HSTS, X-Frame-Options, X-Content-Type-Options) are a few lines of config. Bot blocking, IP restrictions, and rate limiting are available when needed. Gzip and proxy caching come almost for free. Cons: One more piece of config to maintain. We judged the benefit worth the added complexity.

Nginx 是一款轻量、快速、灵活的 Web 服务器和反向代理，擅长处理静态文件、负载分配和代理。优点：可以轻松放入我们现有的基于 Docker 的部署流水线中。将横切关注点从 Express 中剥离出来，使职责更加清晰。安全标头（HSTS, X-Frame-Options, X-Content-Type-Options）只需几行配置即可实现。在需要时可以使用机器人拦截、IP 限制和速率限制。Gzip 和代理缓存几乎是免费提供的。缺点：需要维护多一份配置。我们认为其带来的收益值得增加这点复杂性。

### Validate fast, then refactor
### 快速验证，然后重构

We wanted two things at once: keep the service stable and improve the architecture. So we didn't jump straight to Nginx. First, we added reverse-proxy logic directly in Express. That let us confirm the analytics tool worked through a proxy without touching infrastructure. Once that was proven, we refactored step by step and moved the proxy into Nginx. Prove the effect quickly, then clean up the structure.

我们同时想要两件事：保持服务稳定并改进架构。所以我们没有直接跳到 Nginx。首先，我们直接在 Express 中添加了反向代理逻辑。这让我们在不触及基础设施的情况下，确认了分析工具可以通过代理正常工作。一旦验证成功，我们便逐步重构，将代理移至 Nginx。快速证明效果，然后清理结构。

### The new container layout
### 新的容器布局

Before: the container forwarded external traffic to port 80, where Express answered everything directly. After: Nginx listens on port 80 inside the container. Express moved to an internal port (e.g. 3000). Nginx routes by path: proxy to Express, serve static files directly, or proxy to Framer.

之前：容器将外部流量转发到 80 端口，由 Express 直接响应所有请求。之后：Nginx 在容器内监听 80 端口。Express 移至内部端口（例如 3000）。Nginx 按路径路由：代理到 Express、直接提供静态文件或代理到 Framer。

### Results
### 结果

Analytics works. Framer pages are now served same-origin, so the heatmap tool tracks them. Security: HTTPS, CSP, and HSTS headers live in one place. Performance: static files are served by Nginx with caching and gzip. Maintainability: each layer has one job, so problems can be debugged independently. What started as "make the analytics tool work" ended as a cleaner, more secure, more observable architecture.

分析工具可以正常工作了。Framer 页面现在以同源方式提供，因此热力图工具可以追踪它们。安全性：HTTPS、CSP 和 HSTS 标头统一管理。性能：静态文件由 Nginx 提供，并带有缓存和 gzip。可维护性：每一层各司其职，因此可以独立调试问题。最初只是为了“让分析工具工作”，最终却带来了一个更简洁、更安全、更易于观察的架构。