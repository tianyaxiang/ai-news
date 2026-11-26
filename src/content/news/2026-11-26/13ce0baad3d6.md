---
title: "PenGPT: A Generative Transformer for Handwriting and Sketches"
originalUrl: "https://greydanus.github.io/2026/11/12/pengpt/"
date: "2026-11-25T00:54:49.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# PenGPT: A Generative Transformer for Handwriting and Sketches

A small transformer that writes and sketches from text. The effort was 80% data, 15% speed and 5% architecture: my first project that follows the Bitter Lesson.

一个能够根据文本进行书写和素描的小型 Transformer 模型。该项目 80% 的精力投入在数据上，15% 在速度上，5% 在架构上：这是我第一个遵循“苦涩的教训”（The Bitter Lesson）的项目。

The text of this post (except the conclusion) was written by Claude. I plan to rewrite it in my own words over Thanksgiving Break but needed to get the project out. So apologies for this move - all of my other posts were written by me, and all future posts will be as well. Even if you find Claude more comprehensible than my meandering thoughts, meander nonetheless I shall.

这篇文章的文本（结论除外）是由 Claude 撰写的。我计划在感恩节假期用我自己的话重写它，但我需要先发布这个项目。对于这种做法我深表歉意——我所有的其他文章都是我自己写的，以后的文章也都会如此。即使你觉得 Claude 比我漫无边际的思考更容易理解，我依然会坚持我那漫无边际的风格。

Last year Zach Wimpee and I trained a tiny GPT to write cursive. It worked but it only knew one hand (mine) and it learned from 3,500 words that I wrote on a trackpad.

去年，Zach Wimpee 和我训练了一个微型 GPT 来书写草书。它成功了，但它只认识一种笔迹（我的），而且它是从我在触控板上写的 3,500 个单词中学习的。

So here’s the obvious next question: can one small, ordinary transformer learn to hold a pen in lots of hands and draw as well as write? PenGPT is my attempt. There are two models. A 6M-parameter one writes print and cursive and picks up the handwriting of someone it has never seen from a few of their words. A 54M-parameter one draws from a text prompt.

那么，下一个显而易见的问题是：一个小型、普通的 Transformer 能否学会模仿多种笔迹握笔，并像书写一样进行绘画？PenGPT 就是我的尝试。它包含两个模型。一个 600 万参数的模型可以书写印刷体和草书，并能通过某人的几个单词捕捉到其从未见过的笔迹。另一个 5400 万参数的模型则根据文本提示进行绘画。

Then I took the thing apart to find out why it works. The answer wasn’t what I expected.

然后我拆解了这个模型，想找出它为何有效。答案出乎我的意料。

That’s it for the modality-specific part: ten symbols and a merge count. The same tokenizer handles handwriting and drawings. For handwriting the model is told the text; for drawings it’s told a SigLIP 2 vector so a typed phrase can stand in for a picture.

这就是针对特定模态的部分：十个符号和一个合并计数。同一个分词器处理手写和绘画。对于手写，模型被告知文本内容；对于绘画，它被告知一个 SigLIP 2 向量，这样输入的短语就可以代替图片。

Almost nobody records pen strokes so I made the handwriting data from scans: 495,590 words by 1,255 writers, mostly from two research collections plus old letters and diaries from public archives. A vision-language model finds legible pages and transcribes them, the pages get cut into words, InkSight traces each word back into strokes and a set of checks throws out bad traces. Between a third and a half of the words survive.

几乎没有人记录笔画，所以我通过扫描件制作了手写数据：来自 1,255 位作者的 495,590 个单词，主要来自两个研究合集，以及公共档案中的旧信件和日记。一个视觉语言模型负责寻找清晰的页面并进行转录，页面被切割成单词，InkSight 将每个单词追溯为笔画，并通过一系列检查剔除错误的轨迹。最终保留了三分之一到一半的单词。

The drawings are 477,670 sketches from ten public datasets. Quick, Draw! has 50 million and I kept the best 0.5%. I’m not releasing the datasets but the paper’s appendix explains how to build them.

绘画数据来自十个公共数据集中的 477,670 幅素描。Quick, Draw! 有 5000 万幅，我保留了其中最好的 0.5%。我不会发布这些数据集，但论文的附录解释了如何构建它们。

I compared PenGPT with older approaches then changed one thing at a time and retrained. Here are the rows I found most interesting; the paper has the rest.

我将 PenGPT 与旧方法进行了比较，然后每次只改变一个变量并重新训练。以下是我认为最有趣的几行数据；其余的在论文中。

Data and how you show it. Those are the big rows. Cut the data and everything gets worse. Drop augmentation and the drawing model stops following its prompts entirely. Train on one word at a time and the model can no longer pick up a hand: style rank goes from 1.9 to 6.0.

数据以及你如何展示它。这些是关键所在。削减数据，一切都会变差。放弃数据增强，绘画模型将完全无法遵循提示。每次只训练一个单词，模型就无法再捕捉笔迹：风格排名从 1.9 降至 6.0。

The clever parts barely register. Telling the model where its pen is does nothing for handwriting. The BPE merges I was proud of make the score slightly worse; they buy speed (sequences are 3.2x shorter) and that’s all. A vocabulary sixty times larger changes nothing. Doubling the model changes nothing.

那些巧妙的部分几乎没有效果。告诉模型笔的位置对手写没有任何帮助。我引以为傲的 BPE 合并反而让分数略有下降；它们换取了速度（序列缩短了 3.2 倍），仅此而已。词汇量扩大 60 倍也毫无改变。模型规模翻倍也无济于事。

Even the transformer is optional, sort of. An LSTM on the same tokens is a bit behind on handwriting and still picks up new hands. On drawings, where sequences are several times longer, it falls well behind.

甚至 Transformer 也是可选的，某种程度上。在相同的标记上，LSTM 在手写方面稍显落后，但仍能捕捉新笔迹。在序列长几倍的绘画任务上，它则远远落后。

Enough tables. Here’s what the two models make.

表格够多了。以下是这两个模型生成的作品。

The drawing model takes a few controls besides the prompt. One of them is how much ink to use.

除了提示词外，绘画模型还接受一些控制参数。其中之一是墨水的使用量。

It can also draw some things it was never shown as long as a blend of two familiar ideas will do.

只要是两个熟悉概念的融合，它也能画出一些从未见过的事物。

The trick is almost embarrassingly simple. Each training sequence holds up to four words by one writer. That teaches the model that later words look like earlier ones so at sampling time you hand it a few real words and it keeps going. No style encoder, no fine-tuning. That’s how the 21 hands at the top of this post were written.

这个技巧简单得令人尴尬。每个训练序列包含同一作者最多四个单词。这教会了模型后面的单词看起来像前面的单词，因此在采样时，你给它几个真实的单词，它就会继续写下去。没有风格编码器，没有微调。这篇文章顶部的 21 种笔迹就是这样写出来的。

It also works from a photo. There are no strokes in a photo so I trace a few of its words with InkSight and fit one new writer vector to the traces, with the rest of the model frozen.

它也可以通过照片工作。照片中没有笔画，所以我用 InkSight 描摹其中的几个单词，并将一个新的作者向量拟合到这些轨迹上，同时冻结模型的其余部分。

One head in layer 4 puts 81% of its attention on the letter being written. I looked for heads that specialize in cursive or print and found none; every head reads the same positions in both.

第 4 层中的一个注意力头将 81% 的注意力集中在正在书写的字母上。我寻找过专门处理草书或印刷体的注意力头，但没有发现；每个头在两者中读取的位置都是一样的。

Captions are the expensive part of the drawing data. Since SigLIP puts pictures and text in the same space, maybe you could train on picture vectors alone and type a prompt at the end?

标题是绘画数据中昂贵的部分。既然 SigLIP 将图片和文本放在同一个空间中，也许可以只用图片向量进行训练，然后在最后输入提示词？

You can’t. The picture-only model has the best likelihood of the three and it draws scribbles. The reason is geometric: SigLIP’s vectors for sketches sit in a narrow cone, nearly at right angles to its vectors for text. A model that has only seen the cone is lost when you hand it a sentence. Labels are enough to draw labels (78%) but only captions get you phrases (43% against 10%).

不行。仅使用图片的模型在三者中似然度最高，但它画出来的全是乱涂乱画。原因是几何上的：SigLIP 的素描向量位于一个狭窄的圆锥体内，与文本向量几乎成直角。一个只见过圆锥体的模型在面对句子时会迷失方向。标签足以绘制标签（78%），但只有标题才能生成短语（43% 对 10%）。

The drawing model blends but doesn’t bind. A teapot with a face is fine. Who wears the hat is not and “facing left” gives the same drawing as “facing right” because the single vector it’s told is close to a bag of words (those two captions have a cosine similarity of 0.999). Sampled handwriting is also less legible than the real thing, 54% against 66%. And since most of the handwriting was traced from scans, its stroke order is a model’s guess and not a record.

绘画模型可以融合但不能绑定。画一个带脸的茶壶没问题。但画“谁戴着帽子”就不行，“面向左”和“面向右”画出来是一样的，因为模型接收到的单一向量接近于词袋模型（这两个标题的余弦相似度为 0.999）。采样生成的手写体可读性也低于真实手写（54% 对 66%）。而且由于大多数手写体是从扫描件中描摹出来的，其笔顺是模型的猜测，而非真实记录。

If you look over my blog, you’ll notice that many of my projects revolve around clever ideas. I fell in love with them because they were elegant. That isn’t a flaw in itself but I think Rich Sutton was wise to warn about it in The Bitter Lesson. It really is bitter and it has taken me more time than I’d like to admit to embrace it.

如果你浏览我的博客，会发现我的许多项目都围绕着巧妙的想法。我爱上它们是因为它们很优雅。这本身不是缺点，但我认为 Rich Sutton 在《苦涩的教训》中的警告是非常明智的。这确实很苦涩，我花了比我愿意承认的更多时间才接受它。

I think this post is my first step in the right direction. The results are interesting and the project was a pleasure to work on. And yet there was no clever architectural idea behind it. About 80% of my effort went into building the biggest, cleanest datasets possible and doing lots of quality control on them. Another 15% went into finding a decent 8xA100 node and getting my models to train fast and in parallel on it: 8 minutes for the handwriting model and about 35 for the sketch model. My previous attempt, the Cursive Transformer, took upwards of 10 hours on an A100 and only ever learned one hand. The tokenizer I used here is much simpler and far less elegant but it just w

我认为这篇文章是我朝着正确方向迈出的第一步。结果很有趣，这个项目做起来也很愉快。然而，它背后并没有什么巧妙的架构设计。我大约 80% 的精力都花在构建尽可能大、尽可能干净的数据集，并对其进行大量的质量控制上。另外 15% 的精力花在寻找一个不错的 8xA100 节点，并让我的模型在上面快速并行训练：手写模型用了 8 分钟，素描模型用了大约 35 分钟。我之前的尝试——草书 Transformer，在 A100 上花费了超过 10 个小时，却只学会了一种笔迹。我在这里使用的分词器简单得多，也远没有那么优雅，但它就是……