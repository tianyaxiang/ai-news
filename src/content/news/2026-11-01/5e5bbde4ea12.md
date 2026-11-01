---
title: "HackerTube: YouTube built from videos recommended by HN"
originalUrl: "https://karpathy.bearblog.dev/hacker-tube/"
date: "2026-10-31T19:56:53.000Z"
excerpt: false
---

# HackerTube: YouTube built from videos recommended by HN

HackerTube 31 Oct, 2026 It was Friday night at 11pm, I was tired, I went to YouTube to watch something and realized that I was looking at an enshittified wall of slop. Insanely exaggerated thumbnails, dumb recommendations of the same tired topics, truly terrible idiocracy-grade content. I'm sure this algorithm works well for the median person on the internet, but it definitely does not work for me.

HackerTube 2026年10月31日。周五晚上11点，我感到很疲惫，于是打开YouTube想看点什么，却发现自己面对的是一堵充斥着垃圾内容的“粪墙”。夸张到离谱的缩略图、对陈词滥调话题的愚蠢推荐，以及真正糟糕的、如同《蠢蛋进化论》级别的低质内容。我相信这个算法对互联网上的普通用户来说可能很有效，但对我而言绝对行不通。

So this morning (Saturday) I took a hold of my Opus 5.5 and gave it the task: Let's write our own YouTube clone based on whatever videos have been recommended on Hacker News. And Opus came back with: hackertube.org! Opus downloaded all comments of HackerNews, filtered them down, ran Sonnet over them in a workflow, got rid of spam and low grade content, and narrowed them down to just 40K comments recommending a YouTube video.

于是今天早上（周六），我拿起我的Opus 5.5并给它下达了任务：让我们基于Hacker News上推荐过的所有视频，编写一个我们自己的YouTube克隆版。Opus给出的成果就是：hackertube.org！Opus下载了Hacker News上的所有评论，对其进行筛选，通过工作流运行Sonnet进行处理，剔除了垃圾信息和低质量内容，最终将其缩减为仅包含4万条推荐YouTube视频的评论。

In total, we get 6,454 YouTube videos that have been recommended by a few people on HN from 2007-2026 across 150 topics. Then we wrap it up in a YouTube UI, get a domain, push to a VPS, secure, harden, optimize and voila!

总计，我们获得了从2007年到2026年间，由HN用户在150个主题下推荐的6,454个YouTube视频。然后，我们用YouTube风格的界面将其包装起来，注册域名，部署到VPS上，进行安全加固和优化，大功告成！

HackerTube: Contains quality content Uses the 50% thumbnail instead of the uploaded thumbnail Custom and good ForYou recommendations without any user accounts, storing state in local browser session Keyboard shortcuts Export of the site's data available to give to your agent to easily create your own version This takes ~2 hours now. I can breathe again. Thank you Opus 5.5 <3.

HackerTube：包含高质量内容；使用视频进度50%处的画面作为缩略图，而非上传者设置的缩略图；提供无需用户账户的自定义优质“为你推荐”功能，状态存储在本地浏览器会话中；支持键盘快捷键；提供网站数据导出功能，方便你交给自己的AI代理轻松创建属于你的版本。现在这一切只需约2小时。我终于能喘口气了。谢谢你，Opus 5.5 <3。