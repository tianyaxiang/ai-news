---
title: "bigskysoftware / htmx"
originalUrl: "https://github.com/bigskysoftware/htmx"
date: "2026-08-29T23:27:49.808Z"
---

# bigskysoftware / htmx

### Introduction
High power tools for HTML. htmx allows you to access AJAX, CSS Transitions, WebSockets and Server Sent Events directly in HTML, using attributes, so you can build modern user interfaces with the simplicity and power of hypertext. htmx is small (~14k min.gz'd), dependency-free & extendable.

**HTML 的强大工具。** htmx 允许你直接在 HTML 中使用属性来访问 AJAX、CSS 过渡、WebSockets 和服务器发送事件（SSE），从而让你能够以超文本的简洁与强大来构建现代用户界面。htmx 体积小（压缩后约 14k），无依赖且可扩展。

### Motivation
Why should only `<a>` and `<form>` be able to make HTTP requests? Why should only click & submit events trigger them? Why should only GET & POST be available? Why should you only be able to replace the entire screen? By removing these arbitrary constraints, htmx completes HTML as a hypertext.

**设计动机：** 为什么只有 `<a>` 和 `<form>` 标签能够发起 HTTP 请求？为什么只有点击和提交事件才能触发它们？为什么只能使用 GET 和 POST 方法？为什么只能替换整个屏幕内容？通过移除这些武断的限制，htmx 完善了 HTML 作为超文本的功能。

### Quick Start
```html
<script src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.10/dist/htmx.min.js" integrity="sha384-H5SrcfygHmAuTDZphMHqBJLc3FhssKjG7w/CeCpFReSfwBWDTKpkzPP8c+cLsK+V" crossorigin="anonymous"></script>

<!-- have a button POST a click via AJAX -->
<button hx-post="/clicked" hx-swap="outerHTML">
  Click Me
</button>
```
The `hx-post` and `hx-swap` attributes tell htmx: "When a user clicks on this button, issue an AJAX request to /clicked, and replace the entire button with the response."

**快速开始：**
`hx-post` 和 `hx-swap` 属性告诉 htmx：“当用户点击此按钮时，向 /clicked 发起 AJAX 请求，并用响应内容替换掉整个按钮。”

### Background
htmx is the successor to intercooler.js.

**背景：** htmx 是 intercooler.js 的继任者。

### Installing as a node package
To install using npm: `npm install htmx.org --save`. Note: there is an old broken package called `htmx`. This is `htmx.org`.

**作为 Node 包安装：**
使用 npm 安装：`npm install htmx.org --save`。注意：有一个名为 `htmx` 的旧包已损坏，本项目为 `htmx.org`。

### Website & Docs
https://htmx.org
https://htmx.org/docs

**网站与文档：**
https://htmx.org
https://htmx.org/docs

### Contributing
Want to contribute? Check out our contribution guidelines. No time? Then become a sponsor.

**参与贡献：**
想要贡献代码？请查看我们的贡献指南。没时间？那就成为赞助者吧。

### Hacking Guide
To develop htmx locally, you will need to install the development dependencies. Run: `npm install`. Then, run a web server in the root. This is easiest with: `npx serve`. You can then run the test suite by navigating to: `http://0.0.0.0:3000/test/`. At this point you can modify `/src/htmx.js` to add features, and then add tests in the appropriate area under `/test`.

**开发指南：**
要在本地开发 htmx，你需要安装开发依赖。运行：`npm install`。然后，在根目录下运行 Web 服务器，最简单的方法是使用：`npx serve`。之后，你可以通过访问 `http://0.0.0.0:3000/test/` 来运行测试套件。此时，你可以修改 `/src/htmx.js` 来添加功能，并在 `/test` 下的相应区域添加测试。

* `/test/index.html` - the root test page from which all other tests are included
* `/test/attributes` - attribute specific tests
* `/test/core` - core functionality tests
* `/test/core/regressions.js` - regression tests
* `/test/ext` - extension tests
* `/test/manual` - manual tests that cannot be automated

* `/test/index.html` - 包含所有其他测试的根测试页面
* `/test/attributes` - 属性相关的测试
* `/test/core` - 核心功能测试
* `/test/core/regressions.js` - 回归测试
* `/test/ext` - 扩展测试
* `/test/manual` - 无法自动化的手动测试

htmx uses the mocha testing framework, the chai assertion framework and sinon to mock out AJAX requests. They are all OK.

htmx 使用 mocha 测试框架、chai 断言框架以及 sinon 来模拟 AJAX 请求。它们都运行良好。

### Haiku
javascript fatigue:
longing for a hypertext
already in hand

**俳句：**
JavaScript 疲惫：
渴望超文本，
其实在手中。