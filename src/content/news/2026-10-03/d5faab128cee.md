---
title: "Announcing AfterPack: a free JavaScript obfuscator for the web"
originalUrl: "https://dev.to/nikitaeverywhere/announcing-afterpack-a-free-javascript-obfuscator-for-the-web-1g85"
date: "2026-10-03T00:42:01.937Z"
---

# Announcing AfterPack: a free JavaScript obfuscator for the web
# 发布 AfterPack：一款面向 Web 的免费 JavaScript 代码混淆器

I built AfterPack; this is the launch post from our blog. Today we're launching three things: AfterPack, a modern JavaScript obfuscator for the AI era. It turns your production build into a different program every time: a new shape on every build, and on every request inside a Cloudflare Worker. A refreshed site scanner that finds what's readable in any website's code: public source maps, readable logic and leaked credentials. An online playground to try AfterPack on your own code, right in your browser.

我开发了 AfterPack；这是我们博客上的发布文章。今天我们推出了三项内容：AfterPack，一款面向 AI 时代的现代 JavaScript 混淆器。它能让你的生产环境构建在每次运行时都变成一个不同的程序：每次构建时呈现出新的形态，在 Cloudflare Worker 中甚至可以做到每次请求都呈现出新形态。一个焕然一新的网站扫描器，用于发现网站代码中可读的内容：公开的 Source Maps、可读的逻辑以及泄露的凭据。一个在线演练场，让你直接在浏览器中对自己的代码尝试使用 AfterPack。

AfterPack (afterpack.dev), the JavaScript obfuscator, works with any framework. The CLI and plugins are open source, the local engine is free, and Pro cloud builds start at $49 a month. Start with `npx afterpack@latest` after a build, or ask your coding agent to add it.

AfterPack (afterpack.dev) 是一款适用于任何框架的 JavaScript 混淆器。其 CLI 和插件均为开源，本地引擎免费，Pro 云端构建起价为每月 49 美元。在构建完成后，通过 `npx afterpack@latest` 即可开始使用，或者让你的编程助手将其添加进去。

Meet AfterPack: a free build tool that makes shipped code unreadable to scanners and people, and a moving target for AI. Every build ships completely different code, so a script written to patch one release — a cheat, a userscript, a bypass — doesn't fit the next. A tool written against your code should stop working at your next release, and now, inside your own Cloudflare Worker, it can stop working at your very next request.

认识一下 AfterPack：这是一款免费的构建工具，它能让发布的代码对扫描器和人类来说变得不可读，并成为 AI 的“移动靶”。每次构建都会发布完全不同的代码，因此针对某个版本编写的补丁脚本（如作弊器、用户脚本、绕过工具）无法适用于下一个版本。针对你的代码编写的工具应该在你的下一次发布时失效，而现在，在你的 Cloudflare Worker 中，它甚至可以在下一次请求时就失效。

Why obfuscate JavaScript now that AI can read it? Because whatever AI can read, it can also rewrite and repackage. Point a coding agent at your bundle, and a few minutes later someone holds your pricing rules, your paywall check or your anti-bot logic as clean, editable source, along with a script that patches or bypasses them. That used to be a specialist's job; now it's a prompt. And the patch keeps working for as long as your code keeps its shape.

既然 AI 已经能阅读 JavaScript，为什么还要混淆它？因为 AI 能阅读的东西，它也能重写和重新打包。只需将编程助手指向你的代码包，几分钟后，别人就能拿到你清晰、可编辑的定价规则、付费墙检查逻辑或反机器人逻辑，甚至还能得到一个修补或绕过它们的脚本。这曾经是专家的工作，现在只需要一个提示词（Prompt）。只要你的代码形态保持不变，补丁就会一直有效。

Minification was never hiding that code: the Claude Code "leak" was a readable bundle that had been sitting on npm since launch. What a minified bundle still gives away, and how to check your own site, is covered in what users can see in your JavaScript and how to protect it.

代码压缩（Minification）从来都不是为了隐藏代码：Claude Code 的“泄露”事件就是一个可读的代码包，它自发布以来就一直存在于 npm 上。压缩后的代码包依然会泄露什么，以及如何检查你自己的网站，这些内容都在“用户能在你的 JavaScript 中看到什么以及如何保护它”一文中有所涵盖。

In May 2026, I gave two popular obfuscators' own flagship demos to Claude Code with one four-paragraph prompt. Claude Opus 4.6 came back with clean source in 10 minutes, Claude Opus 4.7 in 20. They were small demos, not whole apps, and those models are already a generation behind today's. Your pricing rules, license checks, anti-fraud heuristics and unreleased features have always been in the bundle. What changed is who can read them, and how fast. What you still control is how much of that work carries over to your next release.

2026 年 5 月，我将两款流行混淆器的旗舰演示代码交给 Claude Code，并附带了一个四段式的提示词。Claude Opus 4.6 在 10 分钟内返回了清晰的源码，Claude Opus 4.7 用了 20 分钟。这些只是小型演示，而非完整的应用程序，而且这些模型在今天看来已经落后了一代。你的定价规则、许可证检查、反欺诈启发式算法和未发布的功能一直都在代码包里。改变的是谁能阅读它们，以及阅读的速度。你仍然可以控制的是，有多少工作量会延续到你的下一个版本。

Can obfuscated JavaScript be reversed? Yes. Given enough time, any obfuscator's output can be reversed, AfterPack's included. What AfterPack changes is carry-over: how much of the work to reverse one release still applies to the next. In our own measurement (September 2026, six seeds × five samples), under 6% of what a deobfuscator recovered from one build still resolved on the next (how we measured).

混淆后的 JavaScript 能被反编译吗？可以。只要时间足够，任何混淆器的输出都能被反编译，包括 AfterPack。AfterPack 改变的是“延续性”：即反编译一个版本所做的工作，有多少能适用于下一个版本。根据我们的测量（2026 年 9 月，6 个种子 × 5 个样本），反混淆器从一个构建版本中恢复的内容，在下一个版本中依然有效的比例不到 6%（这是我们的测量方法）。

Logic someone has already read also stays read: if they worked out your discount rule once, a new build won't make them forget it. What can expire is the tool built on that read. A script that strips a license check, a patcher for a paywall, an extractor that pulls your scoring rules out of every release: each is written against the structure of one build. The most popular open-source obfuscator emits fixed output shapes, and free public deobfuscators ship hardcoded recognizers for them, so a tool written once keeps working on every future build.

别人已经读懂的逻辑依然是已知的：如果他们破解了你的折扣规则，新的构建版本不会让他们忘记它。但基于该破解所构建的工具可能会失效。一个移除许可证检查的脚本、一个付费墙补丁、一个从每个版本中提取评分规则的提取器：每一个都是针对特定构建的结构编写的。最流行的开源混淆器输出固定的形态，而免费的公共反混淆器内置了针对它们的硬编码识别器，因此编写一次工具，就可以在未来的每个版本中持续生效。

AfterPack starts from a new random seed on every build. Identifier names, encoded strings, the decoder's signature, state numbering and masked constants all come out different, so the details a tool hard-codes change every time. Run the engine inside a Worker and the window shrinks from a release to a single request.

AfterPack 在每次构建时都从一个新的随机种子开始。标识符名称、编码字符串、解码器签名、状态编号和掩码常量每次都会不同，因此工具所硬编码的细节每次都会改变。在 Worker 中运行该引擎，其生效窗口将从“一个版本”缩小到“单次请求”。

What's in AfterPack? A CLI, plugins for the bundlers you already use, a WebAssembly build for Workers, Pro cloud builds, a report of what each build protected, and a free site scanner.

AfterPack 包含什么？一个 CLI、为你现有的打包工具提供的插件、用于 Workers 的 WebAssembly 构建版本、Pro 云端构建、一份关于每次构建保护内容的报告，以及一个免费的网站扫描器。

| Fact | AfterPack |
| :--- | :--- |
| What it is | A JavaScript obfuscator for production builds: it rewrites what your bundler produces, not your source files |
| Engine | Rust, run locally by the CLI and the plugins, or as WebAssembly (@afterpack/wasm) inside your own Worker |
| Output | Different on every build by default in the CLI and the plugins; pin a seed only when you need identical bytes |
| License | CLI and plugins Apache-2.0; the engine is free to use under the AfterPack Engine License |
| Price | Local engine free; Pro from $49 a month (plans) |
| Start | `npx afterpack@latest` after your build, or a framework plugin |

| 事实 | AfterPack |
| :--- | :--- |
| 是什么 | 一款用于生产环境构建的 JavaScript 混淆器：它重写的是打包工具的产物，而非你的源代码文件 |
| 引擎 | Rust 编写，通过 CLI 和插件在本地运行，或作为 WebAssembly (@afterpack/wasm) 在你自己的 Worker 中运行 |
| 输出 | 在 CLI 和插件中默认每次构建都不同；仅当你需要完全相同的字节时才固定种子 |
| 许可证 | CLI 和插件采用 Apache-2.0；引擎在 AfterPack 引擎许可证下免费使用 |
| 价格 | 本地引擎免费；Pro 版每月 49 美元起（查看方案） |
| 开始 | 构建后运行 `npx afterpack@latest`，或使用框架插件 |

What the table doesn't show: Framework plugins for Next.js, Vite, webpack, Astro, Nuxt, SvelteKit, Svelte, Vue, Angular, Parcel, esbuild, Rollup and Electron. Your normal production build emits obfuscated output. Pro: pass a key and the same call runs in AfterPack's cloud, with directives that aim heavier protection at the code that matters. If the key or the cloud is unavailable, the build fails instead of quietly shipping less.

表格中未显示的内容：针对 Next.js、Vite、webpack、Astro、Nuxt、SvelteKit、Svelte、Vue、Angular、Parcel、esbuild、Rollup 和 Electron 的框架插件。你正常的生产构建会直接输出混淆后的代码。Pro 版：传入一个密钥，相同的调用会在 AfterPack 的云端运行，并带有指令，对关键代码进行更强力的保护。如果密钥或云端不可用，构建会直接失败，而不是悄悄地发布保护不足的代码。

The Protection Map: an HTML report of your original source with every token colored by how much transformation it went through. It's written when your build emits a source map; the plugins can turn that on for you. The free security scanner, also available as `npx afterpack audit <url>`.

保护地图（Protection Map）：一份关于你原始源代码的 HTML 报告，其中每个标记都根据其转换程度进行了着色。当你的构建生成 Source Map 时，它会自动生成；插件可以为你开启此功能。免费的安全扫描器也可以通过 `npx afterpack audit <url>` 使用。

What does AfterPack's obfuscated output look like? Identifiers vanish and string literals are encoded behind a runtime decoder; how much more happens depends on the preset. light (the default) encodes strings and rewrites syntax, adding no structural layers — the right baseline for most projects. medium makes production code meaningfully harder to follow; hard is for code that matters, like pricing, gating and license checks; extreme sets the highest complexity of the presets, best aimed at one function or file rather than a whole bundle.

AfterPack 的混淆输出是什么样的？标识符消失，字符串字面量被编码在运行时解码器之后；具体混淆程度取决于预设。light（默认）会对字符串进行编码并重写语法，不增加结构层级——这是大多数项目的理想基准。medium 使生产代码变得明显难以阅读；hard 适用于关键代码，如定价、门控和许可证检查；extreme 设置了预设中最高的复杂度，最适合针对单个函数或文件，而不是整个代码包。

A 139-byte function, before:
```javascript
export function discount(plan, seats) {
  if (plan === "team" && seats >= 10) return 0.2;
  if (plan === "team") return 0.1;
  return 0;
}
```
And after one `npx afterpack@latest` run at the default...

一个 139 字节的函数，混淆前：
（代码块同上）
在运行一次 `npx afterpack@latest`（默认设置）后……