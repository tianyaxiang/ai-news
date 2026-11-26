---
title: "Entering the Geminispace"
originalUrl: "https://jmmv.dev/2026/11/entering-the-geminispace.html"
date: "2026-11-25T22:43:05.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# Entering the Geminispace

On May 1st, 2020, Project Gemini made the rounds for the first time via a Hacker News discussion thread. I remember seeing the announcement back then, barely a month after the Covid 19 worldwide lockdown, and thinking it was a cool gimmick. But that was that.

2020年5月1日，Project Gemini 首次通过 Hacker News 的讨论帖进入大众视野。我记得当时看到了这个公告，那距离全球新冠疫情封锁仅仅过去了一个月，我当时觉得这只是个很酷的噱头。但也就仅此而已。

However, I’ve recently been seeing a few gemini:// links here and there as footers in hand-crafted blogs, and I nerd-snipped myself to export this blog as a Gemini capsule that you can find at gemini://capsule.jmmv.dev/. The process has been fun, and I actually quite like the extreme minimalism of the resulting site. So what else would you expect from me? I had to write about it—hence this post.

然而，最近我偶尔在一些手工制作的博客页脚中看到了一些 gemini:// 链接，于是我一时兴起，将自己的博客导出为一个 Gemini 胶囊（capsule），你可以在 gemini://capsule.jmmv.dev/ 找到它。这个过程很有趣，我实际上非常喜欢由此产生的网站那种极致的极简主义。所以你还能指望我做什么呢？我必须写点什么——这就是这篇文章的由来。

Today we’ll learn a little bit about what Gemini is, how I approached the blog export to its native gemtext format, and I’ll confess a couple of… sins I committed along the way.

今天我们将了解一下 Gemini 是什么，我是如何将博客导出为它原生的 gemtext 格式的，我还会坦白我在这个过程中犯下的几个……“罪行”。

A blog on operating systems, programming languages, testing, build systems, my own software projects and even personal productivity. Specifics include FreeBSD, Linux, Rust, Bazel and EndBASIC. Subscribe 0 subscribers

这是一个关于操作系统、编程语言、测试、构建系统、我自己的软件项目甚至个人生产力的博客。具体内容包括 FreeBSD、Linux、Rust、Bazel 和 EndBASIC。订阅 0 位订阅者。

What is Gemini? A terrible name, that is. Looking for information about Gemini these days is extremely hard, thanks to Google polluting the namespace with its own AI offering. Of course that’s not Project Gemini’s fault because Google’s thing came after them, but still, good luck finding stuff about this network.

什么是 Gemini？这名字起得真糟糕。如今想要查找关于 Gemini 的信息极其困难，多亏了谷歌用它自己的 AI 产品污染了这个命名空间。当然，这并不是 Project Gemini 的错，因为谷歌的东西是在他们之后才出现的，但即便如此，祝你好运，去寻找关于这个网络的信息吧。

Joking aside, let’s look at Project Gemini’s barebones front page: Project Gemini's front page, displayed in the Lagrange browser. … and break down the introductory and only paragraph: Gemini is a new internet technology supporting an electronic library of interconnected text documents.

玩笑归玩笑，让我们看看 Project Gemini 极其简陋的首页：Project Gemini 的首页，在 Lagrange 浏览器中显示。……并拆解一下那段唯一的介绍性文字：Gemini 是一种支持互联文本文档电子图书馆的新型互联网技术。

You can think of Gemini as a way to access a bunch of text-only pages, with links among them, so you can find information and follow links to additional resources. Instead of using http:// or https:// URL prefixes, you use gemini:// instead.

你可以把 Gemini 看作是一种访问一系列纯文本页面的方式，页面之间有链接，这样你就可以查找信息并点击链接跳转到其他资源。你不再使用 http:// 或 https:// 作为 URL 前缀，而是使用 gemini://。

That’s not a new idea, but it’s not old fashioned either. Exactly. Gemini is like the WWW, or “the web” in more colloquial/modern parlance. In fact, Gemini is a parallel community to the web. Obviously, that’s not a new idea because the web dates back to 1989, and we are now 37 years after that.

这并不是一个新想法，但它也不算过时。没错。Gemini 就像万维网（WWW），或者用更通俗/现代的话说就是“网络”。事实上，Gemini 是与网络平行的一个社区。显然，这并不是什么新想法，因为网络可以追溯到 1989 年，而现在距离那时已经过去 37 年了。

The idea is not unique either because Gopher, a much lesser-known option, exists as well. Surprisingly to me, I realized that Gopher came after the web in 1991 while researching this article. I had always assumed Gopher was first and that the web came to replace it because of Gopher’s rigidness. But that’s not quite what happened.

这个想法也不是独一无二的，因为还有一个鲜为人知的选项叫 Gopher。令我惊讶的是，在研究这篇文章时，我意识到 Gopher 实际上是在 1991 年网络出现之后才诞生的。我一直以为 Gopher 是先出现的，而网络是因为 Gopher 的僵化才取代了它。但事实并非如此。

It’s timeless, and deserves tools which treat it as a first class concept, not a vestigial corner case. Humans have shared written documents since around 3400–3100 BCE (roughly 5,100–5,400 years ago) in ancient Mesopotamia and Egypt, and that’s probably (hopefully?) not going away. It’s true, though, that at this point, text sharing is not the primary thing that the web does, as you well know. We have morphed the web from a document distribution tool into an app platform, for better or worse.

它是永恒的，值得拥有将其视为一等公民而非残余边缘案例的工具。人类自公元前 3400-3100 年左右（大约 5100-5400 年前）在古代美索不达米亚和埃及就开始分享书面文档了，这大概（希望如此？）不会消失。不过确实，正如你所知，在现阶段，文本共享已经不是网络的主要功能了。无论好坏，我们已经将网络从一个文档分发工具演变成了一个应用平台。

A little confession: I worked at Google for 12 years, starting right at the time they published Google Wave (2009), which to me marked the start of truly interactive web apps—more so than Gmail (2004) did. In the back of my mind, I knew I was helping turn the web into how we run apps, destroying the traditional desktop paradigm—a feeling I never liked. And… it happened. Obviously, it’d have happened without me, a little pawn in the game, but it bothered me regardless.

一个小小的坦白：我在谷歌工作了 12 年，入职时间正好是他们发布 Google Wave（2009 年）的时候，对我来说，这标志着真正交互式 Web 应用的开始——比 Gmail（2004 年）的影响更大。在潜意识里，我知道我正在帮助将网络变成我们运行应用程序的方式，从而摧毁了传统的桌面范式——这种感觉我一直不喜欢。而且……它确实发生了。显然，即使没有我这个小卒，它也会发生，但这依然让我感到困扰。

Gemini isn’t about innovation or disruption, it’s about providing some respite for those who feel the internet has been disrupted enough already. (That comma splice hurts.) As we have established earlier, Gemini’s ideas are not new, so it’s indeed not innovative. And seeing how little people read these days, or even how unable to pay attention to long-form text they are, it’s not going to disrupt anything either. But respite is key: having a separate place where you know you’ll only find some sort of counter-culture sounds entertaining.

Gemini 并非为了创新或颠覆，而是为了给那些觉得互联网已经被颠覆得够多的人提供一些喘息的机会。（那个逗号连接句真让人难受。）正如我们之前所确定的，Gemini 的想法并不新鲜，所以它确实不具创新性。而且考虑到现在人们读书有多么少，甚至无法专注于长篇文本，它也不会颠覆任何东西。但“喘息”是关键：拥有一个独立的空间，在那里你知道只会找到某种反主流文化的东西，听起来很有趣。

Fun fact: I wasn’t quite sure what respite meant and originally took it to be similar to spite. That meaning would have worked equally well here, if not better?

有趣的事实：我不太确定“respite”（喘息/暂缓）是什么意思，最初以为它和“spite”（恶意）类似。如果用那个意思，在这里似乎也同样适用，甚至更好？

We’re not out to change the world or destroy other technologies. We are out to build a lightweight online space where documents are just documents, in the interests of every reader’s privacy, attention and bandwidth.

我们不是为了改变世界或摧毁其他技术。我们是为了建立一个轻量级的在线空间，让文档回归文档的本质，以维护每位读者的隐私、注意力和带宽。

Here is the interesting thing. Gemini claims that it has been designed to minimize the chances of becoming bloated, and I’m not exactly sure how you can prevent that. For example: articles can provide links to images, but images are not auto-loaded. OK, says who? The auto-loading part is something the client browser controls, and it’d be trivial to create a Gemini browser, or modify an existing one, to auto-load and render images. That’d go against the spirit of Gemini, but if enough people wanted it, it’d happen. Same story as the browser wars.

有趣的事情来了。Gemini 声称其设计旨在最大限度地减少变得臃肿的可能性，但我不太确定你如何能防止这种情况。例如：文章可以提供图片的链接，但图片不会自动加载。好吧，谁说的？自动加载部分是由客户端浏览器控制的，创建一个 Gemini 浏览器，或者修改现有的浏览器来自动加载和渲染图片，这简直易如反掌。这虽然违背了 Gemini 的精神，但如果足够多的人想要它，它就会发生。这和浏览器大战的故事如出一辙。

And that’s the key: “enough people”. As long as Gemini stays under the radar and only like-minded people gravitate towards it, these properties will be maintained. But if for any reason it becomes more mainstream… unwanted changes will happen.

关键就在于：“足够多的人”。只要 Gemini 保持低调，只有志同道合的人向它靠拢，这些特性就能得以维持。但如果出于某种原因它变得更加主流……不想要的改变就会发生。

Gemtext Gemtext is the native format of documents stored in the Gemini network, with a MIME type of text/gemini and a .gmi extension. Gemtext documents are typically grouped in capsules—which is just another name for “website”.

Gemtext 是存储在 Gemini 网络中的文档的原生格式，其 MIME 类型为 text/gemini，扩展名为 .gmi。Gemtext 文档通常被归类在“胶囊”中——这只是“网站”的另一个名称。

The format itself is like a super-diluted version of Markdown, supporting just these features: Three levels of headings. Paragraphs. Links as standalone lines, not as inline text. Preformatted text blocks, also not as inline text. Unordered lists. Blockquotes.

该格式本身就像是 Markdown 的超稀释版本，仅支持以下功能：三级标题。段落。作为独立行的链接，而非行内文本。预格式化文本块，同样非行内文本。无序列表。块引用。

Workable for sure, but weak. In my opinion, Gemini missed the boat of creating a truly semantical web, but for that you need additional primitives to represent more concepts. In any case, you can read through the long FAQ to know that this was discussed and eventually ruled against, so know that a lot of thought was put into.

确实可行，但很薄弱。在我看来，Gemini 错失了创建真正语义网的机会，但要做到这一点，你需要额外的原语来表示更多的概念。无论如何，你可以通读那份冗长的常见问题解答（FAQ），了解这曾被讨论过但最终被否决了，所以要知道，这背后投入了大量的思考。