---
title: "“Beta, Is This News Real?” — So I Built My Grandparents VerifAI"
originalUrl: "https://dev.to/tanishh-13/beta-is-this-news-real-so-i-built-my-grandparents-verifai-2ml9"
date: "2026-10-05T00:07:14.720Z"
---

# “Beta, Is This News Real?” — So I Built My Grandparents VerifAI
# “孩子，这新闻是真的吗？”——所以我为祖父母开发了 VerifAI

Hacktoberfest Weekend Challenge: Build for a Friend Submission 🤝 This is a submission for the Hacktoberfest Weekend Challenge: Build for a Friend.
Hacktoberfest 周末挑战：为朋友而建项目提交 🤝 这是我为 Hacktoberfest 周末挑战“为朋友而建”所提交的项目。

What I Built: My grandparents get a lot of forwarded messages. News screenshots. Instagram posts. Random “breaking news”. Messages that have clearly been forwarded about 17 times already. And every now and then, I get the same question: “Beta, ye sach hai kya?” (Child, is this true?).
我开发了什么：我的祖父母经常收到各种转发消息。新闻截图、Instagram 帖子、随意的“突发新闻”，以及那些显然已经被转发了 17 次的消息。时不时地，我就会收到同样的问题：“Beta, ye sach hai kya?”（孩子，这是真的吗？）。

Usually that means I have to search for the claim, open a few articles, compare what they say, and figure out whether the original post is actually telling the truth. While it is still possible for a tech-savvy person to do this in a minute, it makes people with less or no technical knowledge, especially the elderly, highly dependent on someone to check something as small as a Facebook post's legitimacy. With VerifAI, I wanted to target such audience and make them independent. So for this challenge, I decided to build something for them: VerifAI.
通常这意味着我必须搜索相关声明，打开几篇文章，对比它们的内容，并判断原始帖子是否属实。虽然精通技术的人可以在一分钟内完成，但这让缺乏技术知识的人，尤其是老年人，在核实像 Facebook 帖子真实性这样的小事时，不得不高度依赖他人。通过 VerifAI，我希望针对这类用户群体，让他们能够独立核实信息。因此，为了这次挑战，我决定为他们开发 VerifAI。

The idea is simple: The primary objective behind building this project was convenience. I treated it as the most important feature and tried to keep the platform as accessible in as many ways as possible—be it WhatsApp forward images, screenshots from an old gallery, Instagram reels, Facebook posts, or online articles/blogs. Give VerifAI an image or a link, and it checks the claim against real evidence. No searching around. No figuring out which article to trust. Just upload, wait a little, and get an understandable result.
这个想法很简单：开发该项目的首要目标是便利性。我将其视为最重要的功能，并努力让平台以尽可能多的方式保持易用性——无论是 WhatsApp 转发的图片、相册里的旧截图、Instagram 短视频、Facebook 帖子，还是在线文章/博客。只需给 VerifAI 一张图片或一个链接，它就会根据真实证据核实其中的声明。无需四处搜索，无需纠结该信任哪篇文章。只需上传，稍等片刻，即可获得易于理解的结果。

How It Works: The entire pipeline is basically: Screenshot / URL → Extract the text → Identify the claim → Find relevant evidence → Compare claim with evidence → Show the result. For screenshots, VerifAI uses OCR.space to extract the text. For URLs, it fetches the page and extracts useful information such as the title, description, and readable content. That content is then used to identify the factual claim. Once we have the claim, we search for relevant news evidence and pass the claim and evidence to the verification layer. The important word here is "claim."
工作原理：整个流程基本上是：截图/URL → 提取文本 → 识别声明 → 寻找相关证据 → 对比声明与证据 → 显示结果。对于截图，VerifAI 使用 OCR.space 提取文本。对于 URL，它会抓取页面并提取标题、描述和可读内容等有用信息。这些内容随后被用于识别事实声明。一旦获得声明，我们就会搜索相关新闻证据，并将声明和证据传递给验证层。这里关键词是“声明”。

The Problem We Kept Running Into: This sounds like a pretty easy project. And honestly, the original idea was extremely small: Given a claim and some evidence, tell me whether the claim is true or false. But getting that distinction right turned out to be the hardest part. A model can see: “Thala Dhoni celebrated by FIFA on his birthday” and then see an article saying: “FIFA celebrates MS Dhoni's birthday.” It might conclude that the claim is supported. But imagine the actual claim was: “MS Dhoni will represent India in FIFA.” Those two things are related. They are absolutely not the same claim. That became one of the biggest lessons of the project: Related evidence is not proof.
我们遇到的问题：这听起来是一个相当简单的项目。老实说，最初的想法非常简单：给定一个声明和一些证据，判断该声明是真是假。但要准确区分这一点，结果成了最难的部分。模型可能会看到：“FIFA 在生日当天庆祝 Thala Dhoni”，然后看到一篇文章说：“FIFA 庆祝 MS Dhoni 的生日”。它可能会得出结论：该声明得到了支持。但想象一下，实际的声明是：“MS Dhoni 将代表印度参加 FIFA”。这两件事是相关的，但绝对不是同一个声明。这成了该项目最大的教训之一：相关的证据并不等于证明。

What I Learned: I initially tried making the verification layer more complicated. More model reasoning. More classification. More logic. And somehow, the more complicated it became, the easier it was for the system to lose sight of the actual problem. Eventually, I stripped it back. The goal isn't to understand everything about the internet. It isn't to decide whether two articles are generally talking about the same topic. It's simply: Claim → Evidence → Does the evidence support or contradict THIS claim? That simplicity ended up being much harder to get right than I expected.
我的收获：起初，我试图让验证层变得更复杂。更多的模型推理、更多的分类、更多的逻辑。不知何故，系统变得越复杂，就越容易偏离实际问题。最终，我将其简化了。目标不是理解互联网上的一切，也不是判断两篇文章是否在讨论同一个主题。它很简单：声明 → 证据 → 证据是支持还是反驳了“这个”声明？这种简单性最终比我预期的要难实现得多。

The Tech: The frontend is a React/Vite application deployed on Netlify. The backend is built with FastAPI and deployed separately. The main pieces are: React + Vite for the frontend, FastAPI for the backend API, OCR.space for screenshot text extraction, Web/news retrieval for external evidence, Claim analysis for extracting the factual proposition, and a Verification layer for comparing the claim against the retrieved evidence.
技术栈：前端是一个部署在 Netlify 上的 React/Vite 应用。后端使用 FastAPI 构建并独立部署。主要组件包括：用于前端的 React + Vite，用于后端 API 的 FastAPI，用于截图文本提取的 OCR.space，用于获取外部证据的网页/新闻检索，用于提取事实命题的声明分析，以及用于对比声明与检索证据的验证层。

Why Open Innovation Matters: For a project like this, open innovation makes experimentation much easier. We could try different approaches, see where they failed, remove things that weren't helping, and keep simplifying until the actual problem became clear. And that was probably the most useful part. AI is really good at making a project look more complicated than it needs to be. Sometimes the better engineering decision is to remove the complicated part.
为什么开放创新很重要：对于这样的项目，开放创新使实验变得容易得多。我们可以尝试不同的方法，找出失败之处，移除无用的部分，并不断简化，直到实际问题变得清晰。这可能是最有价值的部分。AI 非常擅长让项目看起来比实际需要更复杂。有时，更好的工程决策是移除那些复杂的部分。

Built For A Friend ❤️: I built VerifAI for my grandparents, but honestly, I think the problem is much bigger than just them. Almost every family has that one person who forwards a message and then asks: “Is this real?” And there's nothing wrong with asking. The internet is genuinely getting harder to verify, and a screenshot with a convincing headline can look completely legitimate at first glance. So I wanted to build something where the answer isn't: “Just Google it.” It's: “Send it here. We'll check.” That's VerifAI.
为朋友而建 ❤️：我为我的祖父母开发了 VerifAI，但老实说，我认为这个问题远不止他们这一代人。几乎每个家庭都有那么一个人，转发一条消息后会问：“这是真的吗？” 提问并没有错。互联网上的信息确实越来越难以核实，一张带有令人信服标题的截图乍看之下可能完全合法。所以我想要构建一个工具，它的回答不是“去谷歌搜一下”，而是“发到这里，我们来核实”。这就是 VerifAI。

Try It: 🌐 Live: https://verifaihacktoberfest.netlify.app/ | 💻 GitHub: https://github.com/Tanishh-13/VerifAI
试用：🌐 在线地址：https://verifaihacktoberfest.netlify.app/ | 💻 GitHub：https://github.com/Tanishh-13/VerifAI

If you have someone in your family who regularly asks: “Beta, ye sach hai kya?” Maybe this one's for them too. ❤️
如果你的家人中也有人经常问：“孩子，这是真的吗？” 也许这个工具也适合他们。❤️