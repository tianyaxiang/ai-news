---
title: "LinkedIn Larpmaxxing"
originalUrl: "https://hereticpleb.vercel.app/blog/linkedin-larpmaxxing/"
date: "2026-10-01T00:40:24.208Z"
---

# LinkedIn Larpmaxxing (领英“角色扮演”狂热)

LinkedIn is a soul-sucking hole of professionalism and a pit of hell that not even my worst enemy should spend the rest of his days in. It’s this concoction of performative productivity and corpo speak producing cursed artifacts beyond human comprehension. A place where normal human text goes to die and can only be kept alive by an LLM like a radiation protection suit. And I wanted to look into the performative projects people keep making that are all over my feed.

领英是一个吞噬灵魂的职场深渊，是一个连我最痛恨的敌人都不该待下去的地狱。这里充斥着表演性的生产力展示和企业黑话，制造出令人难以理解的“诅咒产物”。这是一个正常人类语言走向死亡的地方，只有像穿上防辐射服一样使用大语言模型（LLM），才能让文字保持一点“生命力”。我想深入探究一下那些充斥在我信息流中、人们不断制作的表演性项目。

### The Feed
### 信息流

It is legit the most unbearable stuff you would see. My third cousin got hit by a truck🚚💥 today! Here’s what it taught me about business management👇 And everyone carries this fake tone of being “visionary” and “forward-thinking” and “professional” It’s SO tiring.

这绝对是你见过最让人难以忍受的内容。“我远房表亲今天被卡车撞了🚚💥！这教会了我关于企业管理的什么道理👇”。每个人都带着一种虚假的腔调，装作“有远见”、“有前瞻性”和“专业”。这真的太累人了。

### The Projects
### 项目展示

And then you look at the projects they are posting. Genuinely, every time I open LinkedIn, I get hit by these Computer Vision Projects of some guy waving his hand around, and it tracks them. Like, I wouldn’t mind if it was one of these, but it is legit all I see. It is just every other post some guy waving his hand around doing NONSENSE. It’s not even useful. It’s not even something anyone would like using. It’s just “look at me computer vision”.

再看看他们发布的项目。说真的，每次我打开领英，映入眼帘的都是些计算机视觉项目：某个人挥舞着手，然后程序追踪他的动作。如果只是偶尔出现一个倒也罢了，但现在我看到的全是这种东西。几乎每隔一条帖子，就是某人在那儿挥手做些毫无意义的事。这既没用，也没人会想用。这纯粹就是为了喊一句：“快看我的计算机视觉！”

I am pretty sure they either vibecode it or get it from a tutorial. cuz EVERY SINGLE ONE IS THE SAME. Btw, you wanna know how bad it is? This image I put? I didn’t even go digging for it. I literally just opened LinkedIn, and this was the first thing I saw…and the second…and the third…and the fourth… and the fifth… I am not kidding; this was the second thing I saw just now.

我敢肯定，他们要么是靠“感觉编程”（vibecode），要么就是照搬教程。因为每一个项目都一模一样。顺便问问，你想知道这有多糟糕吗？我放的这张图，我甚至都没特意去搜。我只是打开了领英，这就是我看到的第一条内容……然后是第二条、第三条、第四条、第五条……我没开玩笑，这确实是我刚才看到的第二条内容。

Also, the thing that gets me is that the first image is at least a game, not a good one, sure, but it is something. But this pothole detection. What is the point? You know what else could detect potholes? Eyes. They are very, very good at detecting those. They are not sending it to anything. Like, if it was connected to all car cameras for detection, well, first, mass surveillance, and also if you have so many potholes you can’t keep track of them and need crowd-sourced data for potholes, you have WAYYY bigger issues, but sure. If it was sending the api somewhere, that would be cute. BUT IT’S NOT.

另外，让我无语的是，第一张图至少还是个游戏，虽然做得不怎么样，但好歹是个东西。可这个“坑洞检测”项目呢？意义何在？你知道还有什么能检测坑洞吗？眼睛。它们在检测坑洞方面非常、非常出色。而且这些项目根本没把数据传给任何系统。如果它能连接到所有汽车摄像头进行检测，好吧，首先这涉及大规模监控，而且如果你路上的坑洞多到需要众包数据来记录，那你面临的问题可比坑洞严重多了。如果它能把API传到什么地方，那还挺可爱的。但它根本没有。

The bigger idea is to use AI for smart infrastructure monitoring, where road conditions can be assessed more efficiently, and maintenance teams can make better data-driven decisions. This project also showed me that real-world computer vision is not just about detecting objects; lighting, road conditions, camera angles, and overlapping detections can all affect performance. I am so tired of seeing these. How difficult is it to produce one of these projects that looks impressive on LinkedIn? (spoiler. pretty easy.)

他们所谓的“宏大愿景”是利用人工智能进行智能基础设施监控，从而更高效地评估路况，帮助维护团队做出更好的数据驱动决策。这个项目还向我展示了现实世界的计算机视觉不仅仅是检测物体；光照、路况、摄像机角度和重叠检测都会影响性能。我真的看腻了。在领英上做一个看起来很厉害的项目有多难？（剧透：非常简单。）

### Making the YOLO Post Detector
### 制作“YOLO 帖子检测器”

I decided to make a detector for the “🚀 Excited to announce I made a YOLO project” posts. I am learning this from scratch; I’ve never done this before. I just wanna see how hard it could be. Can’t critique cooking without ever cooking ramen. It won’t be useful, but now you will know slop is in fact slop.

我决定做一个检测器，专门识别那些“🚀很兴奋地宣布我做了一个YOLO项目”的帖子。我是从零开始学的，以前从没做过。我只是想看看这到底有多难。没煮过方便面就没资格评价厨艺。虽然这东西没用，但现在你至少能确认，垃圾就是垃圾。

It took me an hour and a half to learn and make the whole thing, and most of it was just drawing boxes and waiting for the model to be trained. Okay, so the first part of making this is data. You need to train your model on some data that show the model what one of these posts looks like. I wrote this script to collect the images. It scrolls through my feed and takes screenshots.

我花了一个半小时学习并完成了整个过程，其中大部分时间都在画框和等待模型训练。好吧，制作这个的第一步是数据。你需要用一些数据来训练模型，让它知道这种帖子长什么样。我写了一个脚本来收集图片，它会自动滚动我的信息流并截图。

My script has collected 200 images, which should be good enough for now. Now I created a Roboflow account, created my project, and uploaded my screenshots. I just had to scroll through the screenshots and annotate them by drawing a box around the things I think need to be detected. It was pretty mechanical. Took about 20 minutes. Once the images were annotated, I just exported them in the YOLOv8 format and downloaded the zip file of my dataset.

我的脚本收集了200张图片，目前应该够用了。接着我注册了一个Roboflow账号，创建了项目并上传了截图。我只需要浏览这些截图，通过画框标注出我想要检测的内容。这过程非常机械化，大约花了20分钟。标注完成后，我以YOLOv8格式导出并下载了数据集的压缩包。

Now it was time to train the model. And that can be done with basically no effort.
(Code omitted for brevity)
great! Just wait for the training to finish. It took me 30 mins cuz I have a potato pc. Once the training finished, I wrote the Python script to run the model.
(Code omitted for brevity)
YAYYY I got my very own slop detector!!! I think I can finally add computer vision expert, Python savant, and AI and ML thought leader to my resume.

现在是训练模型的时间了，这几乎不需要什么努力。（代码略）。太棒了！只需等待训练完成。因为我的电脑配置很烂，花了30分钟。训练完成后，我写了一个Python脚本来运行模型。（代码略）。耶！我终于有了属于自己的“垃圾检测器”！！！我想我终于可以在简历上加上“计算机视觉专家”、“Python天才”以及“AI与机器学习思想领袖”这些头衔了。

### Conclusion
### 结论

Yeah, it took me an hour and a half to learn and build the whole thing. It’d be more interesting if they were optimizing the models or pushing the accuracy or whatever, but most of what you see on LinkedIn is just this: pretty trivial stuff with cool marketing on top. And nobody says anything because your comments show up on your profile. If a recruiter scrolls through and sees you calling slop slop, you’re the asshole. So everyone claps and moves on. That’s the real problem.

是的，我只花了一个半小时就学会并做出了这东西。如果他们是在优化模型或提升准确率，那还有点意思，但你在领英上看到的大多数内容就是这样：平庸的东西加上华丽的营销包装。没人会指出来，因为你的评论会显示在你的个人资料上。如果招聘人员翻看你的主页，看到你在骂这些垃圾是垃圾，那你就是那个“混蛋”。所以大家只能鼓掌然后走开。这才是真正的问题所在。

Nothing on that site rewards you for getting better. It’s a platform built around selling yourself for a job, so what survives isn’t skill; it’s looking interesting. It’s just LARPing productivity. Go to some of these profiles, and it’s the same guy detecting potholes over and over and over with zero signs of improvement.

那个网站上没有任何机制奖励你的进步。它是一个围绕着“推销自己找工作”而建立的平台，所以生存下来的不是技能，而是“看起来很有趣”。这纯粹是在进行生产力角色扮演（LARPing）。去看看那些人的主页，你会发现同一个人在反复地检测坑洞，完全没有任何进步的迹象。