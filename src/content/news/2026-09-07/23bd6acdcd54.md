---
title: "I Changed My License"
originalUrl: "https://bergie.iki.fi/blog/eupl/"
date: "2026-09-06T22:56:25.350Z"
---

# I Changed My License
# 我更改了我的软件许可协议

In the last 28 years of publishing software, I’ve had three distinct eras of software licensing. All of my recent stuff is available under the European Union Public License 1.2, and I thought to explain why.
在过去 28 年的软件发布生涯中，我经历了三个截然不同的软件许可时代。我最近发布的所有作品均采用欧盟公共许可证 1.2 版（EUPL-1.2），我想借此机会解释一下原因。

Midgard was all LGPLv2. This was a simpler time, and there weren’t that many free software licenses around. Since Midgard was a web framework, using a weak copyleft license felt like the right thing to do. The example website shipping with Midgard was X11 licensed.
Midgard 项目全部采用 LGPLv2 协议。那是一个更简单的时代，当时并没有太多的自由软件许可证可供选择。由于 Midgard 是一个 Web 框架，使用弱 Copyleft（弱著佐权）许可证似乎是正确的做法。随 Midgard 附带的示例网站则采用了 X11 许可证。

When I started working more seriously with JavaScript around 2011, I switched to the MIT license. This was a “do whatever you like, just don’t sue me” sort of a simple affair favored by the NPM package ecosystem. Easy interoperability, no hooks attached.
大约在 2011 年，当我开始更深入地使用 JavaScript 时，我转向了 MIT 许可证。这是一种“随你怎么用，别告我就行”的简单协议，深受 NPM 包生态系统的青睐。它易于互操作，且没有任何附加条件。

After we closed Flowhub, there were a few years of hiatus where I published almost no software. Either because it wasn’t feasible due to my work situation, or because I was busy with the boat.
在关闭 Flowhub 之后，我有几年时间几乎没有发布任何软件。这要么是因为我的工作状况不允许，要么是因为我忙于打理我的船。

Enter EUPL. This year I decided to switch my “default license” to EUPL-1.2. This is an OSI-approved free software license created and published by the European Union. And it is quite a divergence from the licenses I’ve used in the past.
引入 EUPL。今年，我决定将我的“默认许可证”切换为 EUPL-1.2。这是由欧盟创建并发布、经 OSI（开源促进会）批准的自由软件许可证。它与我过去使用的许可证有很大的不同。

EUPL is a strong copyleft license that closes the “SaaS loophole” by requiring reciprocal licensing regardless of how the software is distributed. Over the years it has been clear that we in the “open source” camp (as opposed to the “free software” camp) were wrong all along. We won the debate, and gained little for users or developers. All that our efforts did was to make it easier for big corporations build things more cheaply and for billionaires to become trillionaires.
EUPL 是一种强 Copyleft 许可证，它通过要求互惠许可（无论软件如何分发）来堵住“SaaS 漏洞”。多年来，事实已经很清楚：我们这些“开源”阵营（相对于“自由软件”阵营）的人一直都错了。我们赢得了辩论，却没能为用户或开发者争取到什么。我们的努力只是让大公司能以更低的成本构建产品，让亿万富翁变成万亿富翁。

And so it is time to stop messing about with permissive licenses. If corporations don’t want to use our software under our terms, they are free to spend the effort or tokens to build their own. The fact that EUPL has legally valid official translations to 23 languages also doesn’t hurt in a world where most of software is built and used in the wider world outside of the Valley.
因此，是时候停止在宽松许可证上浪费时间了。如果大公司不想在我们的条款下使用我们的软件，他们完全可以投入精力或资金去构建自己的软件。在这个世界上，大多数软件都是在硅谷之外的更广阔世界中构建和使用的，而 EUPL 拥有 23 种语言的法律有效官方译本，这一点也很有帮助。

Here are some things I’ve already published under EUPL:
以下是我已经采用 EUPL 发布的项目：

*   **reticulum-js**: JavaScript implementation of the Reticulum mesh networking protocol
    **reticulum-js**：Reticulum 网状网络协议的 JavaScript 实现
*   **dacar**: decentralized authorization system built on Reticulum
    **dacar**：基于 Reticulum 构建的去中心化授权系统
*   **signalk-energy-predictor**: prediction system for boats powered by renewable energy
    **signalk-energy-predictor**：用于可再生能源驱动船只的预测系统
*   **offshore-blogging-system**: tool for publishing blog posts and downloading weather data over InReach satellite text messages
    **offshore-blogging-system**：通过 InReach 卫星短信发布博客文章和下载天气数据的工具

In addition the new rewrite of NoFlo Development Environment is being made under EUPL. NoFlo itself will remain MIT-licensed, as it is a pre-existing project with plenty of 3rd party contributions.
此外，NoFlo 开发环境的重写版本也将采用 EUPL 许可。NoFlo 本身将继续保持 MIT 许可，因为它是一个拥有大量第三方贡献的既有项目。