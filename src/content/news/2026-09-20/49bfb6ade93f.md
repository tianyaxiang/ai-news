---
title: "Don’t Let Architecture Astronauts Scare You (2001)"
originalUrl: "https://www.joelonsoftware.com/2001/04/21/dont-let-architecture-astronauts-scare-you/"
date: "2026-09-19T23:18:34.088Z"
---

# Don’t Let Architecture Astronauts Scare You (2001)
# 别让“架构宇航员”把你吓倒 (2001)

When great thinkers think about problems, they start to see patterns. They look at the problem of people sending each other word-processor files, and then they look at the problem of people sending each other spreadsheets, and they realize that there’s a general pattern: sending files. That’s one level of abstraction already.
当伟大的思想家思考问题时，他们开始看到模式。他们观察人们互相发送文档文件的问题，然后观察人们互相发送电子表格的问题，他们意识到这其中有一个通用的模式：发送文件。这已经是第一层抽象了。

Then they go up one more level: people send files, but web browsers also “send” requests for web pages. And when you think about it, calling a method on an object is like sending a message to an object! It’s the same thing again! Those are all sending operations, so our clever thinker invents a new, higher, broader abstraction called messaging, but now it’s getting really vague and nobody really knows what they’re talking about any more. Blah.
接着他们再上升一层：人们发送文件，但网页浏览器也会“发送”网页请求。当你仔细想想，调用对象上的一个方法就像是给对象发送一条消息！这又是同一回事！这些都是发送操作，于是我们聪明的思想家发明了一个新的、更高、更宽泛的抽象，叫做“消息传递”（messaging），但现在它变得非常模糊，没人再真正知道他们在谈论什么了。废话。

When you go too far up, abstraction-wise, you run out of oxygen. Sometimes smart thinkers just don’t know when to stop, and they create these absurd, all-encompassing, high-level pictures of the universe that are all good and fine, but don’t actually mean anything at all. These are the people I call Architecture Astronauts.
当你在抽象的道路上走得太远时，氧气就会耗尽。有时，聪明的思想家就是不知道何时该停下来，他们创造出这些荒谬的、包罗万象的、高层级的宇宙图景，虽然看起来头头是道，但实际上毫无意义。这些人就是我所说的“架构宇航员”。

It’s very hard to get them to write code or design programs, because they won’t stop thinking about Architecture. They’re astronauts because they are above the oxygen level, I don’t know how they’re breathing. They tend to work for really big companies that can afford to have lots of unproductive people with really advanced degrees that don’t contribute to the bottom line.
要让他们写代码或设计程序非常困难，因为他们总是停不下来思考“架构”。他们之所以是宇航员，是因为他们处于氧气层之上，我不知道他们是怎么呼吸的。他们往往在那些真正的大公司工作，这些公司负担得起大量拥有高学历却不产生实际效益、毫无产出的员工。

A recent example illustrates this. Your typical architecture astronaut will take a fact like “Napster is a peer-to-peer service for downloading music” and ignore everything but the architecture, thinking it’s interesting because it’s peer to peer, completely missing the point that it’s interesting because you can type the name of a song and listen to it right away. All they’ll talk about is peer-to-peer this, that, and the other thing.
最近的一个例子说明了这一点。典型的架构宇航员会拿“Napster 是一个用于下载音乐的点对点服务”这一事实，却忽略除了架构之外的一切，认为它有趣仅仅是因为它是点对点的，完全忽略了它之所以有趣是因为你可以输入歌名并立即收听这一核心点。他们只会谈论点对点这个、那个以及其他相关的东西。

Suddenly you have peer-to-peer conferences, peer-to-peer venture capital funds, and even peer-to-peer backlash with the imbecile business journalists dripping with glee as they copy each other’s stories: “Peer To Peer: Dead!”
突然之间，出现了点对点会议、点对点风险投资基金，甚至出现了点对点反弹，那些愚蠢的商业记者们兴高采烈地互相抄袭着彼此的报道：“点对点：已死！”

The Architecture Astronauts will say things like: “Can you imagine a program like Napster where you can download anything, not just songs?” Then they’ll build applications like Groove that they think are more general than Napster, but which seem to have neglected that wee little feature that lets you type the name of a song and then listen to it — the feature we wanted in the first place. Talk about missing the point. If Napster wasn’t peer-to-peer but it did let you type the name of a song and then listen to it, it would have been just as popular.
架构宇航员会说这样的话：“你能想象一个像 Napster 那样可以下载任何东西，而不仅仅是歌曲的程序吗？”然后他们会构建像 Groove 这样的应用程序，他们认为这比 Napster 更通用，但似乎忽略了那个让我们输入歌名就能立即收听的小功能——这才是我们最初想要的功能。真是完全抓不住重点。如果 Napster 不是点对点的，但它能让你输入歌名并收听，它依然会同样受欢迎。

Another common thing Architecture Astronauts like to do is invent some new architecture and claim it solves something. Java, XML, Soap, XmlRpc, Hailstorm, .NET, Jini, oh lord I can’t keep up. And that’s just in the last 12 months! I’m not saying there’s anything wrong with these architectures… by no means. They are quite good architectures. What bugs me is the stupendous amount of millennial hype that surrounds them.
架构宇航员喜欢做的另一件事是发明某种新架构，并声称它能解决什么问题。Java、XML、Soap、XmlRpc、Hailstorm、.NET、Jini，天哪，我根本跟不上。而这仅仅是过去 12 个月里的事！我并不是说这些架构有什么问题……绝非如此。它们是非常好的架构。让我烦恼的是围绕它们产生的惊人数量的千禧年炒作。

Remember the Microsoft Dot Net white paper? The next generation of the Windows desktop platform, Windows.NET supports productivity, creativity, management, entertainment and much more, and is designed to put users in control of their digital lives. That was about 9 months ago. Last month, we got Microsoft Hailstorm. That white paper says: People are not in control of the technology that surrounds them….HailStorm makes the technology in your life work together on your behalf and under your control. Oh, good, so now the high tech halogen light in my apartment will stop blinking randomly.
还记得微软的 Dot Net 白皮书吗？“下一代 Windows 桌面平台 Windows.NET 支持生产力、创造力、管理、娱乐等等，旨在让用户掌控自己的数字生活。”那是大约 9 个月前的事了。上个月，我们又有了微软的 Hailstorm。那份白皮书说：“人们无法掌控周围的技术……HailStorm 让生活中的技术协同工作，为你服务并受你控制。”哦，太好了，这样我公寓里的高科技卤素灯就不会再随机闪烁了。

Microsoft is not alone. Here’s a quote from a Sun Jini whitepaper: These three facts (you are the new sys admin, computers are nowhere, the one computer is everywhere) should combine to improve the world of using computers as computers — by making the boundaries of computers disappear, by making the computer be everywhere, and by making the details of working with the computer as simple as putting a DVD into your home theater system.
微软并不孤单。这是 Sun Jini 白皮书中的一段话：“这三个事实（你是新的系统管理员，计算机无处不在，单一计算机无处不在）应该结合起来，改善使用计算机的世界——通过让计算机的边界消失，让计算机无处不在，并让使用计算机的细节变得像把 DVD 放进家庭影院系统一样简单。”

And don’t even remind me of the fertilizer George Gilder spread about Java: A fundamental break in the history of technology… That’s one sure tip-off to the fact that you’re being assaulted by an Architecture Astronaut: the incredible amount of bombast; the heroic, utopian grandiloquence; the boastfulness; the complete lack of reality.
别跟我提 George Gilder 关于 Java 散布的那些肥料：“技术史上的一次根本性突破……”这是你正受到架构宇航员攻击的一个确凿信号：令人难以置信的夸夸其谈；英雄主义、乌托邦式的宏大辞藻；吹牛；以及完全脱离现实。

And people buy it! The business press goes wild! Why the hell are people so impressed by boring architectures that often amount to nothing more than a new format on the wire for RPC, or a new virtual machine? These things might be good architectures, they will certainly benefit the developers that use them, but they are not, I repeat, not, a good substitute for the messiah riding his white ass into Jerusalem, or world peace.
而人们竟然买账！商业媒体为之疯狂！为什么人们会被那些无聊的架构所折服？这些架构通常不过是 RPC 的一种新传输格式，或者是一个新的虚拟机而已。这些东西可能是好的架构，它们肯定会造福使用它们的开发者，但它们绝不是、我重复，绝不是救世主骑着白驴进入耶路撒冷或世界和平的替代品。

No, Microsoft, computers are not suddenly going to start reading our minds and doing what we want automatically just because everyone in the world has to have a Passport account. No, Sun, we’re not going to be able to analyze our corporate sales data “as simply as putting a DVD into your home theatre system.”
不，微软，计算机不会仅仅因为世界上每个人都必须拥有一个 Passport 账户，就突然开始读取我们的思想并自动执行我们想要的操作。不，Sun，我们也不可能“像把 DVD 放进家庭影院系统一样简单”地分析我们的企业销售数据。

Remember that the architecture people are solving problems that they think they can solve, not problems which are useful to solve. Soap + WSDL may be the Hot New Thing, but it doesn’t really let you do anything you couldn’t do before using other technologies — if you had a reason to. All that Distributed Services Nirvana the architecture astronauts are blathering about was promised to us in the past, if we used DCOM, or JavaBeans, or OSF DCE, or CORBA.
记住，架构师们解决的是他们认为自己能解决的问题，而不是那些有用的问题。Soap + WSDL 可能是热门的新事物，但它并没有让你做任何以前用其他技术做不到的事情——如果你有理由去做的话。架构宇航员们喋喋不休谈论的所有那些“分布式服务涅槃”，在过去如果我们使用 DCOM、JavaBeans、OSF DCE 或 CORBA 时，就已经向我们承诺过了。

It’s nice that we can use XML now for the format on the wire. Whoopee. But that’s about as interesting to me as learning that my supermarket uses trucks to get things from the warehouse. Yawn. Mangos, that’s interesting. Tell me something new that I can do that I couldn’t do before, O As
现在我们能用 XML 作为传输格式固然很好。好极了。但这对我来说，就像得知我的超市用卡车从仓库运货一样有趣。哈欠。芒果，那才是有趣的。告诉我一些我以前做不到的新事情吧，噢，架构师们。