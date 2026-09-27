---
title: "One React/Vite product across PWA and Tauri—without pretending they are identical"
originalUrl: "https://dev.to/qnbs/one-reactvite-product-across-pwa-and-tauri-without-pretending-they-are-identical-17ld"
date: "2026-09-27T23:57:00.953Z"
---

# One React/Vite product across PWA and Tauri—without pretending they are identical

**一个 React/Vite 产品同时运行于 PWA 和 Tauri——无需假装它们完全相同**

One React/Vite codebase can power a GitHub Pages site, an installed PWA, an edge-hosted deployment, and a Tauri desktop app. That does not make those surfaces interchangeable. This distinction matters whenever an application handles user projects, offline behavior, AI providers, filesystem access, or security policy. Shared components are valuable. Shared assumptions can be dangerous.

一套 React/Vite 代码库可以驱动 GitHub Pages 站点、已安装的 PWA、边缘托管部署以及 Tauri 桌面应用。但这并不意味着这些平台是可互换的。每当应用程序处理用户项目、离线行为、AI 提供商、文件系统访问或安全策略时，这种区别就至关重要。共享组件固然有价值，但共享假设却可能带来危险。

WorldScript Studio is a useful case study because its React/Vite application is intentionally available across browser/PWA and Tauri desktop environments. The product shares domain semantics, but it does not pretend that a browser tab and a native shell have the same authority boundaries. Code references are from the repository at commit 2d9157c0 (2026-09-28), release v1.28.8; simplified excerpts are labeled.

WorldScript Studio 是一个很好的案例研究，因为它的 React/Vite 应用程序有意地同时在浏览器/PWA 和 Tauri 桌面环境中运行。该产品共享领域语义，但它并不假装浏览器标签页和原生外壳具有相同的权限边界。代码引用来自提交记录 2d9157c0 (2026-09-28) 的仓库，版本 v1.28.8；文中已标注简化后的代码片段。

### Share the product model, not every implementation detail
### 共享产品模型，而非每一个实现细节

A cross-platform product needs a stable answer to questions such as: What is a project? What data belongs in it? Which state is authoritative? What does export mean? What should happen when an AI provider is unavailable? Those answers should be shared. The mechanisms underneath them should not be forced to look identical.

跨平台产品需要对以下问题有稳定的回答：什么是项目？哪些数据属于项目？哪个状态是权威的？导出意味着什么？当 AI 提供商不可用时应该发生什么？这些答案应当是共享的，但其底层的实现机制不应被强行要求看起来完全一致。

For a PWA, the browser provides IndexedDB, Cache Storage, service workers, Web APIs, WebGPU, and origin-scoped storage. A desktop shell can provide application-data filesystem access, native networking, OS integration, and platform packaging. Trying to hide every difference behind a single universal abstraction often creates a worse outcome: browser APIs leak into desktop code, native assumptions leak into web code, and the product accumulates several accidental definitions of persistence or network policy.

对于 PWA，浏览器提供了 IndexedDB、缓存存储、Service Workers、Web API、WebGPU 和源作用域存储。桌面外壳则可以提供应用程序数据文件系统访问、原生网络、操作系统集成和平台打包。试图通过单一的通用抽象来隐藏所有差异往往会产生更糟糕的结果：浏览器 API 泄露到桌面代码中，原生假设泄露到 Web 代码中，导致产品积累了多种偶然的持久化或网络策略定义。

A better rule is: Share domain semantics and interoperability contracts. Expose platform capabilities through explicit adapters.

更好的规则是：共享领域语义和互操作性契约，并通过显式的适配器来暴露平台能力。

### The host changes the security boundary
### 宿主环境改变了安全边界

The same static build can be deployed to different hosts, but hosting changes what the application can guarantee.

同一个静态构建版本可以部署到不同的宿主环境，但宿主环境会改变应用程序所能提供的保证。

| Surface | Important capability | Important limitation |
| :--- | :--- | :--- |
| **GitHub Pages** | Static public deployment | Cannot inject arbitrary HTTP security headers |
| **Vercel / Cloudflare Pages** | Response headers and edge-function capabilities | Still browser-origin storage for web project data |
| **Installed PWA** | Cached shell and browser-native installation | Storage remains origin- and browser-specific |
| **Tauri desktop** | Filesystem persistence and native HTTP | Desktop project files are not currently app-encrypted at rest |

| 平台 | 重要能力 | 重要限制 |
| :--- | :--- | :--- |
| **GitHub Pages** | 静态公共部署 | 无法注入任意 HTTP 安全响应头 |
| **Vercel / Cloudflare Pages** | 响应头和边缘函数能力 | Web 项目数据仍使用浏览器源存储 |
| **已安装 PWA** | 缓存外壳和浏览器原生安装 | 存储仍受限于源和浏览器 |
| **Tauri 桌面** | 文件系统持久化和原生 HTTP | 桌面项目文件目前在静态存储时未进行应用级加密 |

GitHub Pages is a good example of why "deployed from the same source" is not enough. WorldScript uses a meta Content Security Policy there because GitHub Pages cannot add the corresponding response headers — the project's deployment documentation calls that meta tag the sole enforcement point on that host. Vercel and Cloudflare Pages can set real response headers that mirror the meta CSP, and both can run a same-origin edge relay for supported functionality (a Claude proxy lives at `api/claude-proxy.ts` for Vercel and `functions/api/claude-proxy.ts` for Cloudflare, sharing one core module). Those are materially different deployment guarantees, even when users see the same React interface. The right documentation does not flatten that distinction. It names it.

GitHub Pages 是一个很好的例子，说明了“从同一源码部署”是不够的。WorldScript 在该平台上使用了 meta 标签形式的内容安全策略（CSP），因为 GitHub Pages 无法添加相应的响应头——项目的部署文档将该 meta 标签称为该宿主环境上的唯一强制执行点。Vercel 和 Cloudflare Pages 可以设置与 meta CSP 对应的真实响应头，并且两者都可以为支持的功能运行同源边缘代理（Claude 代理在 Vercel 上位于 `api/claude-proxy.ts`，在 Cloudflare 上位于 `functions/api/claude-proxy.ts`，共享同一个核心模块）。即使在用户看到相同的 React 界面时，这些也是本质上不同的部署保证。正确的文档不会抹平这种区别，而是会明确指出它。

### Storage is an authority decision, not a convenience API
### 存储是权限决策，而非便利性 API

The PWA's live project path uses browser storage. The desktop path uses filesystem-backed stores under application data. Both are local. They are not the same. Browser persistence is governed by the browser's origin, quota, eviction behavior, and storage APIs. Desktop persistence is governed by filesystem access, native process boundaries, and the application's own read/write rules.

PWA 的实时项目路径使用浏览器存储。桌面路径则使用应用程序数据下的文件系统存储。两者都是本地的，但它们并不相同。浏览器持久化受限于浏览器的源、配额、驱逐行为和存储 API。桌面持久化则受限于文件系统访问、原生进程边界以及应用程序自身的读写规则。

That difference becomes especially important for security language. Browser/PWA protected IndexedDB data can use the application's passphrase-based encryption lifecycle when configured. The filesystem-backed desktop project store currently does not receive that same at-rest encryption. A UI toggle with the same name is not enough to make the protection equivalent. The actual persistence path decides what is protected.

这种差异在安全描述方面尤为重要。在配置后，浏览器/PWA 中受保护的 IndexedDB 数据可以使用应用程序基于密码的加密生命周期。而基于文件系统的桌面项目存储目前并未获得同样的静态加密。仅仅在 UI 上设置一个同名的开关并不足以使保护效果等同。实际的持久化路径决定了什么受到保护。

### Native networking changes what "local server" means
### 原生网络改变了“本地服务器”的含义

A browser connecting to localhost is still subject to browser rules such as CORS and Private Network Access. A Tauri desktop application can use an admitted native HTTP capability for local or cloud endpoints. That does not mean desktop networking is automatically safer. It means its policy must be defined and enforced differently — and "narrowly admitted" is meant literally here.

浏览器连接到 localhost 时仍受限于 CORS 和私有网络访问（PNA）等浏览器规则。Tauri 桌面应用程序可以使用已准入的原生 HTTP 能力来访问本地或云端端点。这并不意味着桌面网络自动更安全，而是意味着其策略必须以不同的方式定义和执行——这里的“窄准入”是字面意思。

The desktop shell's HTTP capability is an explicit allowlist, not an open pipe:

桌面外壳的 HTTP 能力是一个显式的白名单，而不是一个开放的管道：

```json
// src-tauri/capabilities/default.json (excerpt)
{
  "identifier": "http:default",
  "allow": [
    "http://localhost:*/*",
    "http://127.0.0.1:*/*",
    "https://generativelanguage.googleapis.com/*",
    "https://api.openai.com/*"
    // …remaining provider hosts, nothing else
  ]
}
```

At runtime, the fetch adapter picks its implementation by environment: in the Tauri runtime it dynamically loads the native HTTP plugin; everywhere else it uses the browser's fetch. For WorldScript, that desktop-native path supports local inference-server workflows such as Ollama-compatible endpoints without requiring the WebView to bypass browser-origin rules. The browser/PWA path should not silently probe local ports or pretend that the same route will work without user-managed server configuration.

在运行时，fetch 适配器根据环境选择其实现：在 Tauri 运行时，它动态加载原生 HTTP 插件；在其他地方，它使用浏览器的 fetch。对于 WorldScript 而言，这种桌面原生路径支持本地推理服务器工作流（如 Ollama 兼容端点），而无需 WebView 绕过浏览器源规则。浏览器/PWA 路径不应静默探测本地端口，也不应在没有用户管理服务器配置的情况下假装相同的路由可以工作。

The general lesson is simple: Browser security restrictions are product constraints, not annoyances to work around. Native capabilities should be narrowly admitted, not made globally available. UI copy must say when a feature is desktop-only or depends on local server configuration.

通用的经验很简单：浏览器的安全限制是产品约束，而不是需要绕过的麻烦。原生能力应当被严格准入，而不是全局开放。UI 文案必须明确指出某项功能是桌面端独有的，还是依赖于本地服务器配置。

### PWA caching must not leak into desktop behavior
### PWA 缓存不应泄露到桌面行为中

A service worker is a powerful browser feature, but it is not a universal application runtime. WorldScript's service worker caches its web shell and handles offline fallbacks on web surfaces. In Tauri, the registration code takes the opposite path — it actively tears the browser mechanism down:

Service Worker 是一项强大的浏览器功能，但它不是通用的应用程序运行时。WorldScript 的 Service Worker 在 Web 界面上缓存其 Web 外壳并处理离线回退。在 Tauri 中，注册代码采取了相反的路径——它主动拆除了浏览器机制：