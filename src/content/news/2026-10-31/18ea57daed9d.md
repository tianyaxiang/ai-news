---
title: "The biggest names in AI are backing a new way to opt out of scraping"
originalUrl: "https://www.theverge.com/tech/1023763/openai-google-microsoft-ai-scraping-standard-opt-out"
date: "2026-10-30T20:26:10.000Z"
excerpt: false
---

# The biggest names in AI are backing a new way to opt out of scraping

人工智能领域的巨头们正在支持一种全新的退出数据抓取机制。

The new control will allow publishers to apply their AI training preferences across multiple crawlers.

这项新控制功能将允许出版商在多个爬虫程序中统一应用其人工智能训练偏好。

OpenAI, Google, Microsoft, and Anthropic say they will adopt a new standard that publishers can use to opt out of being scraped by AI, as reported earlier by Search Engine Roundtable. With this control, publishers can apply their AI training preferences across multiple AI companies, instead of setting them individually.

据 Search Engine Roundtable 此前报道，OpenAI、谷歌、微软和 Anthropic 表示，他们将采用一项新标准，供出版商选择拒绝被人工智能抓取数据。通过此项控制，出版商可以跨多家人工智能公司统一应用其训练偏好，而无需逐一进行设置。

The shared “policy token” signal is proposed by Kevin Kelley, a technical lead for standards at Anthropic, as part of the Internet Engineering Task Force (IETF). It will live within a website’s robots.txt file, which has long signaled which web crawlers can and can’t scrape a site — whether for search indexing, archiving, or AI training. Currently, sites have to signal their AI training preferences separately to each AI company.

这种共享的“策略令牌”信号由 Anthropic 的标准技术负责人凯文·凯利（Kevin Kelley）作为互联网工程任务组（IETF）工作的一部分提出。它将存在于网站的 robots.txt 文件中，该文件长期以来一直用于指示哪些网络爬虫可以或不可以抓取网站——无论是用于搜索索引、归档还是人工智能训练。目前，网站必须分别向每家人工智能公司传达其训练偏好。

The announcement comes as publishers grapple with the continuing influx of AI crawlers scraping their sites and feeding their content into AI models. Some companies and organizations have attempted to combat unauthorized scraping, with the Really Simple Licensing (RSL) standard giving publishers the ability to charge crawlers that visit their sites, and Cloudflare blocking AI crawlers by default.

此次公告发布之际，出版商们正疲于应对不断涌入的人工智能爬虫，这些爬虫抓取其网站内容并将其输入人工智能模型。一些公司和组织已尝试打击未经授权的抓取行为，例如“简单许可”（RSL）标准允许出版商向访问其网站的爬虫收费，而 Cloudflare 则默认拦截人工智能爬虫。

OpenAI, Google, Microsoft, and Anthropic say they will restrict their AI crawlers from accessing a site if they encounter the shared token. Meta communications head Andy Stone also signaled support for the new setting, but doesn’t say whether the company will honor it. “We believe creating a common signal that conveys such preferences to multiple providers at once is an important step,” Stone says. “And we look forward to working with other AI companies on the standards and their implementation across the industry.”

OpenAI、谷歌、微软和 Anthropic 表示，如果遇到该共享令牌，他们将限制其人工智能爬虫访问相关网站。Meta 通讯主管安迪·斯通（Andy Stone）也对这一新设置表示了支持，但并未说明该公司是否会遵守。斯通表示：“我们认为，创建一个能同时向多家提供商传达此类偏好的通用信号是重要的一步。我们期待与其他人工智能公司合作，共同制定标准并在全行业内实施。”

Microsoft says it will offer granular controls that will give publishers the ability to opt out of AI training or AI grounding, the process of pointing an AI model to a verified source of information to reduce hallucinations. Microsoft notes that websites will still appear in Bing’s search results regardless of their preferences. Google previously implemented similar controls that allow sites to control whether their content appears in AI search features or is used for AI training, without impacting visibility in search.

微软表示将提供细粒度控制，使出版商能够选择退出人工智能训练或人工智能基础化（即引导人工智能模型指向经过验证的信息源以减少幻觉的过程）。微软指出，无论网站的偏好如何，它们仍会出现在必应（Bing）的搜索结果中。谷歌此前也实施了类似的控制措施，允许网站控制其内容是否出现在人工智能搜索功能中或被用于人工智能训练，且不会影响其在搜索中的可见度。

While Anthropic has already adopted the signal, Google and Microsoft plan to support it next year. OpenAI says it will implement it in the “coming months.”

虽然 Anthropic 已经采用了该信号，但谷歌和微软计划在明年提供支持。OpenAI 则表示将在“未来几个月内”进行部署。