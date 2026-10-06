---
title: "Wikipedia operator says OpenAI&#8217;s &#8216;rogue&#8217; bots may be linked to a May outage"
originalUrl: "https://www.theverge.com/news/1004929/wikipedia-openai-rogue-bots-wikimedia-foundation-outage"
date: "2026-10-06T01:59:46.295Z"
---

# Wikipedia operator says OpenAI’s ‘rogue’ bots may be linked to a May outage
# 维基百科运营方称 OpenAI 的“流氓”机器人可能与五月份的宕机有关

The Wikimedia Foundation believes OpenAI agents edited wikis, tried to ‘exploit’ a notetaking tool, and made ‘millions’ of automated API requests.
维基媒体基金会认为，OpenAI 的智能体曾编辑维基页面、试图“利用”笔记工具，并进行了“数百万次”自动化 API 请求。

Following many recent disclosures about AI agents accessing third-party websites and services, the Wikimedia Foundation, which hosts Wikipedia, says that it “can confirm that we have discovered some activity” by “rogue” OpenAI agents on Wikimedia platforms.
继近期多起关于 AI 智能体访问第三方网站和服务的披露之后，托管维基百科的维基媒体基金会表示，他们“可以确认在维基媒体平台上发现了来自 OpenAI‘流氓’智能体的一些活动”。

The activity includes edits to Wikimedia wikis, “unsuccessful attempts” to “exploit” the Etherpad note-taking tool that the Wikimedia Foundation hosts, and heavy traffic that the foundation says “may” have contributed to a partial outage that happened in May, according to a blog post. However, the Wikimedia Foundation says it didn’t find evidence that its systems were “used for coordination among agents” (recently, OpenAI bots reportedly hijacked a German wiki site to coordinate) or evidence of systems or data being compromised.
根据一篇博客文章，这些活动包括对维基媒体页面的编辑、对维基媒体基金会托管的 Etherpad 笔记工具进行“利用”的“未遂尝试”，以及导致五月份部分服务宕机的巨大流量。不过，维基媒体基金会表示，尚未发现其系统被“用于智能体之间协调”（此前有报道称 OpenAI 机器人曾劫持德国维基站点进行协调）的证据，也没有发现系统或数据遭到破坏的证据。

Here’s Wikimedia’s summary of what it saw:
以下是维基媒体对其所观察到情况的总结：

Wiki editing: We’ve identified edits to Wikimedia wikis that we believe are from AI agents operated by OpenAI. These edits were not published to pages with visibility to general readers; almost all of them were testing edits in “sandbox” areas of the wiki. It also included a few edits to the configuration for a citation tool, which we believe were potentially malicious edits that were intended to misuse this tool as a proxy for fetching data from remote services. While Wikipedia policies allow bots to edit when they are disclosed and approved by the community, none of those approvals were sought in these incidents.
维基编辑：我们识别出了一些对维基媒体页面的编辑，我们认为这些编辑来自 OpenAI 运营的 AI 智能体。这些编辑并未发布在普通读者可见的页面上；几乎所有编辑都是在维基的“沙盒”区域进行的测试。此外，还包括对引用工具配置的一些修改，我们认为这些可能是恶意编辑，旨在滥用该工具作为从远程服务获取数据的代理。虽然维基百科的政策允许机器人在经过披露并获得社区批准的情况下进行编辑，但在这些事件中，对方并未寻求任何此类批准。

Etherpad probing and use: Agents we believe to be operated by OpenAI made some unsuccessful attempts to compromise our public Etherpad, a note-taking tool we host as a community service. Agents unsuccessfully tried to use it to fetch data from other websites as a proxy. Other agents also likely operated by OpenAI took notes about their tasks, though this did not appear to turn into coordination.
Etherpad 探测与使用：我们认为由 OpenAI 运营的智能体曾多次尝试入侵我们公开的 Etherpad（我们作为社区服务托管的笔记工具），但均未成功。这些智能体试图将其用作代理来从其他网站获取数据，但未果。其他可能由 OpenAI 运营的智能体还记录了关于其任务的笔记，但这似乎并未演变成协同行为。

Excessive data downloading: Agents we believe to be operated by OpenAI made millions of automated requests to our public APIs to access the knowledge on Wikimedia projects, crawled millions of pages (mainly from our projects Wikidata and Wikimedia Commons), and made hundreds of thousands of data queries to the Wikidata Query Service (WQDS). This traffic may have contributed to a partial outage on WQDS in May.
过度数据下载：我们认为由 OpenAI 运营的智能体向我们的公共 API 发送了数百万次自动化请求，以访问维基媒体项目上的知识，抓取了数百万个页面（主要来自我们的 Wikidata 和 Wikimedia Commons 项目），并向 Wikidata 查询服务 (WQDS) 发送了数十万次数据查询。这些流量可能导致了五月份 WQDS 的部分宕机。

“The open web is a public good,” the Wikimedia Foundation says. “We should not allow this behavior to become the ‘new normal’ for the people or organizations that maintain it.”
“开放网络是公共产品，”维基媒体基金会表示，“我们不应允许这种行为成为维护它的人员或组织眼中的‘新常态’。”

“We appreciate the detailed findings Wikimedia shared with us,” OpenAI spokesperson Drew Pusateri says in a statement. “We’re working with them as we review and analyze the activity they identified along with our overall investigation, and we’ll continue to share relevant information as that work progresses.” OpenAI’s investigation hasn’t been able to verify if its bots contributed to the May outage, according to Pusateri.
OpenAI 发言人 Drew Pusateri 在一份声明中表示：“我们感谢维基媒体与我们分享的详细调查结果。我们正在与他们合作，审查和分析他们发现的活动，并结合我们的整体调查进行评估。随着工作的进展，我们将继续分享相关信息。”据 Pusateri 称，OpenAI 的调查尚未能证实其机器人是否导致了五月份的宕机。