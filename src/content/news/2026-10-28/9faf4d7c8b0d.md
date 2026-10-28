---
title: "Roblox downloaded 145GB models from us (including adult content) without asking"
originalUrl: "https://open3dlab.com/news/roblox-downloaded-145-gb-of-models-from-our-sites/"
date: "2026-10-27T10:27:50.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

### Roblox downloaded 145GB models from us (including adult content) without asking

By Salaryman on October 26, 2026. Last updated on October 26, 2026.

2026年10月26日，Salaryman发布文章，最后更新于同日。

On 15 and 16 October 2026, a crawler that said it belonged to Roblox walked through almost every project on Open3DLab, SFMLab and SmutBase, and proceeded to download complete copies of 1,027 files from 712 projects. 145.5 GB of our creators' work, downloaded for what we assume are AI training purposes.

2026年10月15日至16日，一个自称属于Roblox的爬虫程序遍历了Open3DLab、SFMLab和SmutBase上的几乎所有项目，并下载了来自712个项目的1,027个文件的完整副本。我们创作者总计145.5 GB的作品被下载，我们推测其目的是用于人工智能训练。

This post briefly describes what happened, what mitigations were taken, and what this signals for the community at large. A more detailed writeup outlining what we saw in our logs will be posted at a later time.

本文简要描述了所发生的事情、采取的缓解措施，以及这对整个社区意味着什么。关于我们在日志中观察到的内容的更详细报告将在稍后发布。

On Sunday the 18th of October, we noticed a crawler making a large number of requests to our sites and download infrastructure. The crawler sent the same user agent on every request, trellis2-data-sourcing/1.0 (3D foundation model research; [redacted]@roblox.com). It came from a single Amazon Web Services (AWS) address. It had read the main page of 18,926 projects, which is practically our entire catalogue, in 26,429 requests over a span of 34 hours.

10月18日星期日，我们注意到一个爬虫程序向我们的网站和下载基础设施发送了大量请求。该爬虫在每次请求中都发送相同的用户代理：trellis2-data-sourcing/1.0 (3D foundation model research; [redacted]@roblox.com)。它来自同一个亚马逊网络服务（AWS）地址。在34小时内，它通过26,429次请求读取了18,926个项目的主页，这几乎涵盖了我们的全部目录。

After pulling the project pages, it downloaded complete copies of 1,027 files from 712 projects, 145.5 GB in all, before suspending operations during the weekend. The downloads include 364 files (54.8 GB) from 224 projects on SmutBase, which hosts adult content only. With the SFMLab projects marked adult, 345 of the 712 projects (62.6 GB) are adult content.

在抓取项目页面后，它下载了来自712个项目的1,027个文件的完整副本，总计145.5 GB，随后在周末暂停了操作。这些下载内容包括来自SmutBase（仅托管成人内容）的224个项目的364个文件（54.8 GB）。加上SFMLab中标记为成人的项目，712个项目中有345个（62.6 GB）属于成人内容。

The main limiting factor in the number of files downloaded was the crawler's reliance on the free download servers, which have caps on speed limit and number of concurrent downloads. The crawler did not respect our robots.txt, (which it did retrieve), ignored our Terms of Service, (which forbid scraping), and defied the creators' licenses: 423 of the 712 projects are licensed for non-commercial use only. Within the sample it retrieved, it took adult projects at the same rate as everything else. Some examples include models of Eve from Stellar Blade, Mei from Overwatch, and a Horse cock dildo.

下载文件数量的主要限制因素是该爬虫依赖于免费下载服务器，这些服务器对速度限制和并发下载数量有限制。该爬虫没有遵守我们的robots.txt（尽管它确实获取了该文件），无视了我们的服务条款（禁止抓取），并违反了创作者的许可协议：712个项目中有423个仅授权用于非商业用途。在它获取的样本中，它抓取成人项目的频率与其他项目相同。一些例子包括《星刃》中的夏娃模型、《守望先锋》中的小美模型，以及一个马具假阳具模型。

We found it on 18 October and blocked further attempts the same morning. The scraper had suspended its activity by that point, and we did not notice any scraper that weekend. We emailed the address in its user agent on 18 October and asked Roblox for comment. We have not had a reply.

我们在10月18日发现了它，并在当天上午阻止了进一步的尝试。当时爬虫已经暂停了活动，那个周末我们没有再发现任何爬虫。我们在10月18日向其用户代理中的地址发送了电子邮件，要求Roblox置评。我们尚未收到回复。

The crawler resumed scraping activity on October 19th, with all requests getting blocked by our servers. The scraper did not reduce its download attempts when faced with our blocks, and the scrapes seemed to fit neatly within office hours, only briefly pausing for an hour around lunchtime, and ending activity around the end of the workday (CEST). On the 20th, their scraper made its final return at 8:00, slowly tapering requests from lunchtime onward, likely in an effort to test our rate limiting. The requests stopped around 15:00. We sent another email to Roblox for questions, to which they again did not reply.

该爬虫于10月19日恢复了抓取活动，所有请求均被我们的服务器拦截。面对我们的封锁，该爬虫并未减少下载尝试，且抓取行为似乎完全符合办公时间，仅在午餐时间短暂暂停一小时，并在工作日结束时（欧洲中部夏令时间）停止活动。20日，他们的爬虫在8:00最后一次出现，从午餐时间开始缓慢减少请求，这可能是为了测试我们的速率限制。请求在15:00左右停止。我们再次向Roblox发送了询问邮件，但他们依然没有回复。

This section contains our speculation and assumptions based on public information, and the information we noticed in our logs.

本节包含我们基于公开信息以及我们在日志中观察到的信息所做的推测和假设。

Roblox has been building a "3D foundation model" since at least 2025. In March 2025 Roblox introduced Cube, which it calls its core generative AI system for 3D and 4D. The accompanying paper describes the goal as a foundation model for 3D intelligence. It lists character rigging among the things that model should eventually do, and generating characters and avatars as future work. Its first shape model was trained on roughly 1.5 million 3D assets from licensed and public datasets such as Objaverse, plus free assets from Roblox's own Creator Store whose creators had opted in. In February 2026 Roblox began rolling out "4D generation" built on Cube.

至少从2025年起，Roblox一直在构建一个“3D基础模型”。2025年3月，Roblox推出了Cube，称其为用于3D和4D的核心生成式AI系统。随附的论文将其目标描述为3D智能的基础模型。它将角色绑定列为该模型最终应具备的功能之一，并将生成角色和头像列为未来工作。其第一个形状模型是在约150万个3D资产上训练的，这些资产来自Objaverse等授权和公共数据集，以及Roblox创作者商店中创作者已选择加入的免费资产。2026年2月，Roblox开始推出基于Cube的“4D生成”功能。

The address in the user agent belongs to a researcher who is among the 40-plus authors of that Cube paper. The researcher's public professional profile says they are building a 3D foundation model at Roblox, and their earlier published work is on 3D reconstruction and real-time 3D rendering. We want to be clear: we don't suggest this researcher did anything on their own initiative or out of the ordinary for their job. A data-collection run like this is a company's decision, and the responsibility for it is Roblox's. But the profile says what the user agent says: the people behind this crawler build 3D foundation models.

用户代理中的地址属于该Cube论文的40多位作者之一。该研究人员的公开职业资料显示，他们正在Roblox构建3D基础模型，其早期发表的作品涉及3D重建和实时3D渲染。我们需要明确一点：我们并不认为这位研究人员是出于个人主动或工作之外的原因行事。像这样的数据收集行动是公司的决定，责任在于Roblox。但该资料证实了用户代理所显示的内容：该爬虫背后的团队确实在构建3D基础模型。

The "trellis2" in trellis2-data-sourcing may refer to TRELLIS.2, an open 3D generation model Microsoft released in late 2025. It may mean the data was meant for training or tuning a model like it, or it may just be a project codename. We don't know. What we can say is that TRELLIS.2's published data toolkit contains no web crawler and no user agent, so this crawler and its label were written for the job. It is also possible that Roblox is re-using the Trellis.2 tooling for its own foundational model and it is re-using these scripts for its next model; the tools are open source.

trellis2-data-sourcing中的“trellis2”可能指代微软在2025年底发布的开源3D生成模型TRELLIS.2。这可能意味着这些数据旨在用于训练或微调类似的模型，或者它可能只是一个项目代号。我们不得而知。我们可以确定的是，TRELLIS.2发布的工具包中不包含网络爬虫和用户代理，因此这个爬虫及其标签是专门为此任务编写的。也有可能Roblox正在将其Trellis.2工具用于自己的基础模型，并将其脚本复用于下一个模型；这些工具是开源的。

Our sites are full of things a 3D model-generation system needs and public datasets have relatively little of: complete, textured characters, many of them rigged, in the formats artists actually work in, each with a title, a description and preview images.

我们的网站上充斥着3D模型生成系统所需，而公共数据集中相对较少的内容：完整、带纹理的角色，其中许多已完成绑定，采用艺术家实际工作的格式，且每个角色都配有标题、描述和预览图像。

Put together, we think the most likely explanation is that the crawler was collecting training or evaluation data for Roblox's 3D foundation model work. We can't prove it, and we don't know whether any of our creators' files ended up in a model.

综上所述，我们认为最可能的解释是，该爬虫正在为Roblox的3D基础模型工作收集训练或评估数据。我们无法证明这一点，也不知道我们创作者的任何文件是否最终被纳入了模型中。

This isn't the first time Roblox has been criticised for how it treats the people whose work its platform runs on, or for how it handles other people's rights.

这并不是Roblox第一次因其对待平台创作者的方式，或处理他人权利的方式而受到批评。

None of this proves anything about the crawler, but it strengthens our opinion that Roblox is a deeply unethical business. It shows a company that has repeatedly been accused of putting growth ahead of the people its platform relies on.

虽然这些并不能证明关于爬虫的任何具体结论，但它加强了我们的观点，即Roblox是一家极其不道德的企业。这表明该公司一再被指责将增长置于其平台所依赖的人群之上。