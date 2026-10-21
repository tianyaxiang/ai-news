---
title: "Mastodon 5.0: A closer look"
originalUrl: "https://blog.joinmastodon.org/2026/10/5.0-a-closer-look/"
date: "2026-10-20T17:33:54.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# Mastodon 5.0: A closer look

October is here, and it’s almost time for Mastodon’s 5.0 release! We announced our plans for big changes in an early preview back in August. In this companion article, we’re hoping to shed light on some of the decisions behind this major UI overhaul.

十月已至，Mastodon 5.0 版本发布在即！我们曾在八月的早期预览中宣布了重大变更计划。在这篇配套文章中，我们希望阐明此次重大 UI 改版背后的一些决策考量。

Between the feedback we’ve gathered during Discovery Week, an event in which we spent a week doing surveys and workshop sessions with volunteers from the community, and Mastodon’s 10th anniversary coming up, we were determined to deliver something notable.

结合我们在“探索周”（Discovery Week）期间收集的反馈——那是一场我们与社区志愿者共同进行为期一周的调查和研讨会的活动——以及即将到来的 Mastodon 十周年纪念，我们决心交付一些值得关注的成果。

### What we were facing

### 我们所面临的挑战

Invisible binds: Working on Mastodon’s engineering team can sometimes feel like harvesting wheat one stalk at a time. We make a lot happen with limited resources–far more limited than most people realise–but there’s always more to do. There’s more tech and UX debt than is obvious to the naked eye, so something that seems simple on the outside may be often limited by backend constraints or architecture shifts that can’t easily be changed. So we had to make concessions about what we could realistically fit into our 5.0 plans, and leave some work for later.

无形的束缚：在 Mastodon 工程团队工作，有时感觉就像在逐株收割麦子。我们在资源有限的情况下完成了许多工作——其局限性远超大多数人的想象——但总有更多的事情要做。技术和用户体验（UX）方面的债务比肉眼所见的要多，因此表面上看起来简单的事情，往往会受到后端限制或难以轻易改变的架构调整的制约。因此，我们必须在 5.0 计划中做出妥协，将部分工作留待日后处理。

Competing needs: What’s better for one person can be worse for another, and we’ve had to keep that in mind throughout the redesign. We’re acutely aware that such a divide is most pronounced between longstanding users and newcomers. Mastodon’s current UI is beloved by many longtime users, since it can be very powerful once you’ve learned its secrets and quirks. However, newcomers should be able to dive in without being overwhelmed. To keep the community fresh, alive and diverse, we need to break down the barriers to joining, so when you bring your friends, they can find their way around without a manual.

相互冲突的需求：对一个人有利的改动可能对另一个人不利，我们在整个重新设计过程中必须牢记这一点。我们敏锐地意识到，这种分歧在老用户和新用户之间最为明显。Mastodon 现有的 UI 深受许多老用户喜爱，因为一旦掌握了其中的诀窍和特性，它会变得非常强大。然而，新用户应该能够在不感到不知所措的情况下上手。为了保持社区的新鲜感、活力和多样性，我们需要打破加入的门槛，这样当你邀请朋友加入时，他们无需查阅手册就能轻松上手。

### What we believe in

### 我们的信念

The redesign was grounded in these principles: Clarity trumps convenience. The most powerful interface can be useless if it’s too difficult to figure out. Making things more clear and obvious can result in more friction, and that can be necessary. Leave room for what’s to come. Navigation may feel emptier for now, and that is on purpose. We have lots of improvements planned that we need to leave space for, to avoid moving more elements around in the future. Small improvements matter. We might not be able to fix everything overnight, but we’ll continue to look for small but meaningful improvements to accessibility and usability.

此次重新设计基于以下原则：清晰胜过便利。如果界面太难理解，即使功能再强大也毫无用处。让事物变得更清晰、更直观可能会带来更多的操作摩擦，但这有时是必要的。为未来留出空间。导航栏目前可能看起来比较空旷，这是有意为之。我们计划了许多改进，需要预留空间，以避免未来再次频繁移动元素。微小的改进至关重要。我们可能无法在一夜之间解决所有问题，但我们将继续寻求在无障碍性和易用性方面做出虽小但有意义的改进。

### What’s changing in 5.0

### 5.0 版本有哪些变化

Our previous blog post covers most of the big stuff: We’re moving away from the embedded composer and adopting a pop-out composer with new controls for visibility and other post settings. Navigation is simplified and organised in a more intuitive way and create space for future new features. The desktop 5.0 web interface showing the post composer opened at the bottom of the main column.

我们之前的博客文章涵盖了大部分重大内容：我们将放弃嵌入式编辑器，转而采用弹出式编辑器，并为可见性和其他发布设置提供新的控制选项。导航栏经过简化，组织方式更加直观，并为未来的新功能创造了空间。桌面版 5.0 Web 界面显示了在主栏底部打开的发布编辑器。

In your feeds, the posts themselves have been rebuilt from the ground up, giving a fresh look to the places we all spend the most time. We’re also excited to roll out a few new colour themes, which took a truly monumental effort from our engineering team since the start of the year to tokenise our design system. The web interface, changing between the five available theme colours.

在信息流中，帖子本身经过了彻底重构，为我们花费时间最多的地方带来了全新的外观。我们也很高兴推出几种新的配色主题，这需要我们的工程团队自年初以来付出巨大的努力，将我们的设计系统进行标记化处理。Web 界面可在五种可用主题颜色之间切换。

The new design includes many small affordances, such as hiding a user’s boosts directly from the post menu, following and unfollowing hashtags right from the post, and hiding your own posts and boosts in your home feed. Under Advanced Settings, two new options allow you to decide if your own boosts and posts appear in your main feed.

新设计包含许多小的交互优化，例如直接从帖子菜单中隐藏用户的转发、直接从帖子中关注或取消关注标签，以及在主页信息流中隐藏你自己的帖子和转发。在“高级设置”下，两个新选项允许你决定自己的转发和帖子是否出现在主信息流中。

### Notable iterations (since the August blog post)

### 值得注意的迭代（自八月博客文章发布以来）

Since our original announcement, we’ve iterated a lot on the feedback we’ve been receiving, so you’ll notice that the UI looks a bit different than what we’ve shown in that blog post. Here’s what’s changed:

自我们最初发布公告以来，我们根据收到的反馈进行了大量迭代，因此你会发现 UI 看起来与我们在那篇博客文章中展示的有所不同。以下是具体变化：

From bottom right to bottom centre: The position of the composer in the bottom right was controversial. The biggest complaint was that the composer was so far away from the main navigation. However, keeping the composer embedded within the navigation is too limiting, bottom left docking would hide key navigational elements, and resorting to a modal would mean users could lose context of something they’re referencing or replying to. Until we can offer user settings for docking preferences, we’re adjusting to a bottom-centre placement–and the composer can be fully minimised without losing a draft in progress.

从右下角移至底部中心：编辑器位于右下角的位置颇具争议。最大的抱怨是编辑器离主导航太远。然而，将编辑器嵌入导航栏限制太多，停靠在左下角会遮挡关键导航元素，而使用模态窗口则意味着用户可能会丢失正在引用或回复的内容的上下文。在我们能够提供停靠偏好设置之前，我们将其调整为底部居中位置——并且编辑器可以在不丢失草稿的情况下完全最小化。

The ‘New post’ action has changed: It’s a more prominent button in the navigation, but moved further down to reduce the distance the mouse has to travel to reach the popout composer. The floating button on mobile launches the composer immediately instead of opening a sub-menu, because we received feedback that users expect to initiate the ‘New message’ action elsewhere.

“新帖子”操作已更改：它在导航栏中是一个更显眼的按钮，但位置向下移动，以减少鼠标移动到弹出式编辑器所需的距离。移动端上的浮动按钮会立即启动编辑器，而不是打开子菜单，因为我们收到的反馈显示，用户期望在其他地方发起“新消息”操作。

Composer visibility settings are still contextual, but considerably simplified: We attempted to show some of the recipients in limited visibility posts, but it confused some users more than it clarified things. Instead of dynamically updating the visibility dropdown with mentioned names, we show a few preset labels that still accurately describe the audience.

编辑器可见性设置仍然是上下文相关的，但已大幅简化：我们曾尝试在受限可见性的帖子中显示部分接收者，但这反而让一些用户感到困惑，而非更清晰。我们不再根据提及的名称动态更新可见性下拉菜单，而是显示几个预设标签，这些标签依然能准确描述受众。

‘Sensitive’ content has been broken into two settings: Users have historically been able to blur media by adding a blank content warning to their post. This was a powerful yet misunderstood feature, and we’ve received feedback about it for quite some time. To keep the existing functionality but present it in a clearer way, sensitive media and content warnings are now separate, dedicated options inside the composer’s gear menu.

“敏感”内容已拆分为两个设置：用户过去一直可以通过在帖子中添加空白内容警告来模糊媒体内容。这是一个强大但容易被误解的功能，我们对此已经收到反馈很长一段时间了。为了保留现有功能并以更清晰的方式呈现，敏感媒体和内容警告现在是编辑器齿轮菜单中独立的专用选项。

Quote settings have moved: You cannot change the visibility of a post after publishing it, but you can change its quote settings. We’re now grouping these settings differently to keep the ones that can be changed separate from the ones that cannot.

引用设置已移动：你无法在发布后更改帖子的可见性，但可以更改其引用设置。我们现在对这些设置进行了不同的分组，以便将可更改的设置与不可更改的设置区分开来。

### FAQ

### 常见问题解答

How did you make sure these changes reflect the needs of actual Mastodon users? We ran a week of surveys and workshop sessions with volunteers from the community to figure out what works for people and what doesn’t. We also monitored feedback from the i

你们如何确保这些改动反映了 Mastodon 真实用户的需求？我们与社区志愿者进行了为期一周的调查和研讨会，以找出哪些功能对用户有效，哪些无效。我们还监测了来自 i 的反馈。