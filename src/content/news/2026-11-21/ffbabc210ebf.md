---
title: "Restricting AI agents in mobile operating systems platforms from capturing data"
originalUrl: "https://signal.org/blog/protecting-your-privacy/"
date: "2026-11-20T09:42:16.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

Restricting AI agents in mobile operating systems platforms from capturing data

限制移动操作系统平台中的 AI 代理捕获数据

Meredith Whittaker
on 20 Nov 2026

Meredith Whittaker
2026 年 11 月 20 日

Privacy is our mission; it’s why we exist, and we do everything we can to protect it.

隐私是我们的使命；这是我们存在的原因，我们竭尽所能去保护它。

This means that we are restricting the latest AI agents built into mobile operating systems from potentially capturing and storing your Signal data.

这意味着我们正在限制移动操作系统内置的最新 AI 代理，防止它们潜在地捕获并存储您的 Signal 数据。

We’ve already had to do this once with Windows. Last year, we used screenshot blocking to prevent Microsoft’s Recall AI from taking and storing screenshots of your Signal messages on Windows 11 operating systems by default.1 We will now be taking similar measures to restrict agentic systems built into iOS 27 and on Android versions where we can detect an AI assistant attempting to read your Signal screen.2

我们已经在 Windows 上采取过一次此类措施。去年，我们使用屏幕截图拦截功能，防止微软的 Recall AI 在 Windows 11 操作系统上默认截取并存储您的 Signal 消息。现在，我们将采取类似措施，限制 iOS 27 内置的代理系统，以及在能够检测到 AI 助手试图读取您的 Signal 屏幕的 Android 版本上进行限制。

The problem is similar to Microsoft Recall on Windows: Google and Apple are integrating agentic capabilities like Gemini Intelligence with Google Gemini and Onscreen Awareness with Siri AI deep into their operating systems. This is a significant move. Google (Android), Apple (iOS/macOS), and Microsoft (Windows) produce the three major consumer operating systems (OS), which comprise the environment that third-party developers – like Signal – build their apps to function and operate within. To put it differently, these three operating systems are the oceans in which Signal, and other applications, must swim; they dictate the conditions of life for the application ecosystem. Right now, these agentic AI integrations are changing this environment in a way that’s making it increasingly hostile to privacy. This is an existential threat to Signal, and our ability to responsibly uphold our mission.

这个问题与 Windows 上的 Microsoft Recall 类似：谷歌和苹果正在将诸如 Google Gemini 的 Gemini Intelligence 和 Siri AI 的屏幕感知（Onscreen Awareness）等代理能力深度集成到其操作系统中。这是一个重大举措。谷歌（Android）、苹果（iOS/macOS）和微软（Windows）生产了三大消费级操作系统，它们构成了 Signal 等第三方开发者构建其应用程序以进行功能运作的环境。换句话说，这三个操作系统是 Signal 和其他应用程序必须游弋的海洋；它们决定了应用生态系统的生存条件。目前，这些代理式 AI 集成正在改变这一环境，使其对隐私变得越来越不友好。这对 Signal 以及我们负责任地履行使命的能力构成了生存威胁。

In order to gain access to information about you, these OS AI agents “scan” the information that’s on your screen. In doing so, your Signal data is captured, then made available to these agentic systems in order to allow them to answer your questions and do your bidding.

为了获取关于您的信息，这些操作系统 AI 代理会“扫描”您屏幕上的信息。在此过程中，您的 Signal 数据会被捕获，并提供给这些代理系统，以便它们能够回答您的问题并执行您的指令。

The net result is that these AI capabilities in the operating system are undermining Signal’s ability to independently guarantee privacy. For over a decade, this guarantee has been backed by our tried and trusted open source code base and our formally verified encryption protocol. These have been scrutinized by some of the best security experts and hackers across the world, and shown to be robust. Now, in service of AI agentic capabilities, your sensitive data is being captured, stored, and made accessible to whatever local database or remote server an OS-level AI agent is using at that moment. All of this is outside of Signal’s control once the data has been captured, and imperils the privacy of all the participants in a conversation.

最终结果是，操作系统中的这些 AI 功能正在削弱 Signal 独立保障隐私的能力。十多年来，这一保障一直由我们久经考验的开源代码库和经过形式化验证的加密协议所支撑。这些内容已受到全球顶尖安全专家和黑客的审查，并被证明是稳健的。现在，为了服务于 AI 代理能力，您的敏感数据正在被捕获、存储，并提供给操作系统级 AI 代理当时所使用的任何本地数据库或远程服务器。一旦数据被捕获，所有这些都超出了 Signal 的控制范围，并危及对话中所有参与者的隐私。

So, we are blocking such capture by preventing screenshots in the app on iOS 27 and when AI assistants attempt to capture screen data on Android.2

因此，我们正在通过在 iOS 27 的应用中禁止屏幕截图，以及在 Android 上当 AI 助手试图捕获屏幕数据时进行拦截，来阻止此类捕获行为。

People who want the ability to take screenshots can disable this protection within the Signal app’s settings. However, doing so will potentially expose your (and your contacts’) Signal content to these AI agents, and break our privacy guarantees. Our remedy is also incomplete – while we are doing everything we can, restricting screenshots does not address other more sneaky ways AI agents could potentially access application data, such as retrieving content already present on a user’s device via the filesystem.

希望能够截屏的用户可以在 Signal 应用设置中禁用此保护。然而，这样做可能会将您（以及您的联系人）的 Signal 内容暴露给这些 AI 代理，并破坏我们的隐私保障。我们的补救措施也是不完整的——尽管我们正在竭尽所能，但限制屏幕截图并不能解决 AI 代理可能访问应用程序数据的其他更隐蔽的方式，例如通过文件系统检索用户设备上已有的内容。

We want to be very clear: it is a serious problem that Signal – and application developers beyond – lack robust tools to prevent AI agents from undermining application-level privacy. Even where we are able to detect and block AI data access, Google, Apple, Microsoft, and others do not provide ways for developers to easily restrict such AI data access without making drastic compromises to the core user experience. This is also the reason we are currently unable to implement these protections on macOS.3

我们想明确一点：Signal 以及其他应用程序开发者缺乏强有力的工具来防止 AI 代理破坏应用级隐私，这是一个严重的问题。即使在我们能够检测并阻止 AI 数据访问的情况下，谷歌、苹果、微软及其他公司也没有为开发者提供简便的方法来限制此类 AI 数据访问，且无需对核心用户体验做出重大妥协。这也是我们目前无法在 macOS 上实施这些保护措施的原因。

We are also struggling with a significant lack of documentation about how these AI agents actually work. Over the past few months, we’ve spent considerable developer time and energy doing forensic investigations across Android and iOS in an attempt to learn what is actually happening when these AI systems access application data. Without better documentation and clear technical specifications, it will be increasingly difficult for Signal to provide robust privacy and security to the many millions of people who rely on us.

我们还面临着关于这些 AI 代理实际工作原理的文档严重匮乏的问题。在过去的几个月里，我们投入了大量的开发者时间和精力，对 Android 和 iOS 进行取证调查，试图了解当这些 AI 系统访问应用程序数据时到底发生了什么。如果没有更好的文档和明确的技术规范，Signal 将越来越难以向数百万依赖我们的用户提供稳健的隐私和安全保障。

We continue to call on the major consumer operating system companies – Apple, Google, and Microsoft – to provide simple technical tools and accurate documentation that give developers like Signal ways to prevent AI agents from accessing sensitive application data. In particular, we are calling on these companies to provide two common-sense remedies that can protect the privacy so many millions of people rely on:

我们继续呼吁主要的消费级操作系统公司——苹果、谷歌和微软——提供简单的技术工具和准确的文档，让像 Signal 这样的开发者能够防止 AI 代理访问敏感的应用程序数据。特别是，我们呼吁这些公司提供两种常识性的补救措施，以保护数百万用户所依赖的隐私：

We also see a growing need for tools that can prevent third-party agents, like Meta’s Muse, from accessing application data using the deep permissions that users are encouraged to grant them during setup. In many cases these agents are leveraging accessibility settings that were meant to empower actual people to get the most out of their apps and services, not to act as a skeleton key that provides access to AI agents.

我们还看到，人们越来越需要能够防止第三方代理（如 Meta 的 Muse）利用用户在设置过程中被诱导授予的深度权限来访问应用程序数据的工具。在许多情况下，这些代理利用的是旨在帮助真实用户充分利用其应用程序和服务的辅助功能设置，而不是将其作为提供给 AI 代理访问权限的“万能钥匙”。

In addition to taking these technical measures to block capture, we are engaging in conversations across the ecosystem to make the stakes clear. There is a lot of work to be done in the industry to improve the ways that AI agents operate in the operating system, and how and whether they capture and process private data. We are cautiously optimistic that some major OS providers, like Google and Apple, are engaging with us on how these systems should better interface with privacy-sensitive apps like Signal. We hope to have more to share on this topic soon, and that these companies recognize the danger to the ecosystem and work with us and others to create standardized approaches that meaningfully protect privacy across the industry.

除了采取这些技术措施来阻止捕获外，我们正在与整个生态系统进行对话，以明确利害关系。行业内还有大量工作要做，以改善 AI 代理在操作系统中的运作方式，以及它们如何捕获和处理私人数据，以及是否应该这样做。我们谨慎地乐观认为，一些主要的操作系统提供商（如谷歌和苹果）正在与我们就这些系统应如何更好地与 Signal 等隐私敏感型应用进行交互进行沟通。我们希望很快能有更多关于此主题的信息分享，并希望这些公司能够认识到对生态系统的威胁，与我们及其他方合作，创建能够在整个行业内有效保护隐私的标准化方法。

Finally, we want to acknowledge that we are not the only ones recognizing these perils, and we are gra

最后，我们想承认，我们并不是唯一意识到这些危险的人，我们正在……