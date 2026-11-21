---
title: "Visited links are purple"
originalUrl: "https://dbushell.com/2026/11/16/visited-links/"
date: "2026-11-20T09:58:05.000Z"
excerpt: false
---

# Visited links are purple

Visited links are purple Monday 16 Nov 2026 A few weeks ago Kev Quirk asked: Do you use :visited on links? — and I said to myself: No! I don’t use visited links… but why don’t I use visited links?TL;DR: I’ve gone and styled visited links, and they’re purple.

已访问链接显示为紫色，2026年11月16日星期一。几周前，Kev Quirk问道：“你会对链接使用 :visited 伪类吗？”我当时对自己说：“不！我不用已访问链接……”但为什么我不用呢？简而言之：我已经去设置了已访问链接的样式，它们现在是紫色的。

Blue and purple I did a cursory five minutes of research and found Wikipedia still styles visited links (blue to purple). MDN does too. As does the GOV.UK design system — they have a special class to opt-out of the visited style. BBC News turns black links to grey, how emo.

蓝色与紫色。我花了五分钟粗略研究了一下，发现维基百科仍然会为已访问链接设置样式（从蓝色变为紫色）。MDN也是如此。GOV.UK设计系统也一样——他们有一个特殊的类名来选择退出已访问样式。BBC新闻则将黑色链接变为灰色，真是太忧郁了。

I decided to style visited links within my <main> body copy. Which to be fair is most links but not the big headings on my blog index for example. I was too intimidated to turn those purple. Maybe you can give me the courage to style those too? It looked a bit weird at first but I like the colourful additions to my blog.

我决定为我 <main> 正文中的已访问链接设置样式。公平地说，这涵盖了大部分链接，但例如我博客首页上的大标题则不包括在内。我当时太胆怯了，不敢把那些也变成紫色。也许你能给我勇气把那些也设置一下？起初看起来有点奇怪，但我喜欢这些色彩斑斓的补充。

Accessibility WCAG 2.2 guidelines have no requirement to differentiate visited from unvisited links. Regardless, visited links should meet all the same criteria applied to any link. There is one specific exception (following this discussion). Because web browsers have strict style limitations and technical constraints due to privacy concerns: Where color alone distinguishes between visited and unvisited links, it does not result in a failure of this Success Criterion, even where the contrast between the two link colors is below 3:1. SC 1.4.1 Use of Color (Level A)

无障碍性。WCAG 2.2 指南没有要求区分已访问和未访问的链接。无论如何，已访问链接应满足适用于任何链接的所有相同标准。有一个具体的例外（遵循此讨论）。由于隐私问题，网络浏览器对样式有严格的限制和技术约束：如果仅通过颜色来区分已访问和未访问的链接，即使两种链接颜色之间的对比度低于 3:1，也不会导致违反此成功标准。SC 1.4.1 颜色使用（A级）。

This means that a subtle contrast different in blue vs purple is not considered an accessibility failure under that rule. Web accessibility is all about ensuring a comparable experience for all users. Nothing can be perfectly accessible though. I think this small enhancement is fine, even if not everyone can see the difference. It’s a rare exception though. I’m conscious that too often excuses are made to ignore UX parity. I think any higher contrast or another visual indicator would be off-putting and impede readability. Forgoing any style doesn’t help anyone either. If blue and purple is good enough for those examples mentioned above, I’m on board.

这意味着蓝色与紫色之间细微的对比度差异在该规则下不被视为无障碍失败。网络无障碍的核心在于确保所有用户都能获得相当的体验。虽然没有任何东西能做到完美无障碍，但我认为这种小小的改进是可以的，即使不是每个人都能看出区别。不过这是一个罕见的例外。我意识到人们经常找借口忽视用户体验的一致性。我认为任何更高的对比度或其他视觉指示器都会让人反感并阻碍阅读。放弃任何样式也对任何人没有帮助。如果蓝色和紫色对于上述提到的那些例子来说已经足够好，那我也加入。

Bryce Wray commented on Kev Quirk’s blog to note that Chromium browsers introduced :visited link partitioning in 2025. I had no idea this was a thing! What do you think, do you care about visited link styles?

Bryce Wray 在 Kev Quirk 的博客上评论指出，Chromium 浏览器在 2025 年引入了 :visited 链接分区。我完全不知道还有这回事！你怎么看，你关心已访问链接的样式吗？

Bubbles I found Kev Quirk’s blog on bubbles.town. Bubbles is a charming social RSS aggregator. It’s doing a great job at supporting small personal blogs and promoting non-toxic topics. Bubbles is far from perfect though. It probably needs a tech filter. It certainly needs more participation in comments and voting. The developer is actively working to improve the site and a community is growing, so that’s cool to see.

Bubbles。我在 bubbles.town 上发现了 Kev Quirk 的博客。Bubbles 是一个迷人的社交 RSS 聚合器。它在支持小型个人博客和推广非毒性话题方面做得很好。不过 Bubbles 远非完美。它可能需要一个技术过滤器。它当然需要更多的评论和投票参与。开发者正在积极努力改进网站，社区也在成长，这看起来很酷。

I hope Bubbles can thrive and remain human. This is the web we need to bypass the dead web Google et. al. are gatekeeping. Let them wall themselves in with their slop!

我希望 Bubbles 能蓬勃发展并保持人性化。这就是我们需要绕过谷歌等公司所把控的“死亡网络”的互联网。让他们在自己的垃圾内容中自我封闭吧！