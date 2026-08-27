---
title: "AI models flub these intelligence tests. Can you fare any better?"
originalUrl: "https://www.technologyreview.com/2026/08/26/1141952/puzzles-ai-models-flub-these-tests/"
date: "2026-08-27T00:55:57.378Z"
---

# AI models flub these intelligence tests. Can you fare any better?
# AI 模型在这些智力测试中频频翻车，你能表现得更好吗？

Puzzles and games have been central to AI development since the very beginning. Just as we humans like to test our smarts with crosswords or logic puzzles, developers can test how far models have advanced with a gaming gauntlet. The term “machine learning” was popularized in a 1959 article by the IBM computer scientist Arthur Samuel about an algorithm that learned to play checkers. Chess and the Chinese board game Go are famous AI test beds too.
自人工智能发展之初，谜题和游戏就一直处于核心地位。正如我们人类喜欢通过填字游戏或逻辑谜题来测试智力一样，开发者也可以通过一系列游戏挑战来测试模型的发展程度。“机器学习”这一术语在 1959 年由 IBM 计算机科学家亚瑟·塞缪尔（Arthur Samuel）在一篇关于学习下跳棋算法的文章中普及开来。国际象棋和中国围棋也是著名的人工智能测试平台。

Judged purely on its puzzling skills, AI is improving a lot—and quickly. In late 2024, a team of scientists from Columbia University showed that even the best models could figure out only 18% of the infamous New York Times Connections puzzles; by early 2025, some models could solve them near perfectly every time. But puzzles do more than just highlight the inexorable advance of AI capabilities. Seeing where models succeed and fail—and where we humans still beat them—can provide a useful window into the technology’s strengths and weaknesses.
单从解谜能力来看，人工智能正在迅速进步。2024 年末，哥伦比亚大学的一组科学家研究发现，即使是顶尖的模型也只能解出《纽约时报》著名的“Connections”谜题中 18% 的题目；而到了 2025 年初，一些模型几乎每次都能完美解答。但谜题的作用不仅仅是凸显人工智能能力的不可阻挡的进步。观察模型在哪些地方成功、哪些地方失败，以及我们人类在哪些方面仍能胜过它们，可以为我们了解这项技术的优势和劣势提供一个有用的窗口。

Despite advances, today’s models still fumble: Subtle changes in classic riddles often trip them up, and visual puzzles are a particular weak spot. Here you’ll have the chance to test your wits on puzzles that have stumped models at one time or another. Some might be as tricky for you as they were for the AI; others are so simple that they’ll have you doubting whether AI is really intelligent at all. Each one highlights at least one way in which machine and human cognition differ. If you ace the test, you’ll have proved that you can out-puzzle an AI—at least for now.
尽管取得了进步，但今天的模型仍然会出错：经典谜题中的细微变化往往会绊倒它们，而视觉谜题更是它们的软肋。在这里，你将有机会挑战那些曾让模型束手无策的谜题。有些谜题对你来说可能和对 AI 一样棘手；而另一些则简单到让你怀疑 AI 是否真的具备智能。每一道题都至少凸显了机器认知与人类认知之间的一种差异。如果你能通过测试，就证明了你至少在目前还能在解谜方面胜过 AI。

### Spatial Reasoning
### 空间推理

Let’s start with a domain where humans have a huge advantage: spatial reasoning. If you’ve ever taken an IQ test, you may have done a mental rotation problem. These puzzles ask you to determine whether different images represent the same objects from different angles. Though today’s language models typically have the ability to analyze visual inputs, they still fail abysmally at these puzzles. For all the talk of how world models can help AI understand physical environments, LLMs still don’t seem to be able to manipulate 3D objects the way spatial thinkers like architects and mechanical engineers can.
让我们从人类具有巨大优势的领域开始：空间推理。如果你参加过智商测试，可能做过心理旋转题。这些谜题要求你判断不同的图像是否代表从不同角度观察到的同一物体。尽管当今的语言模型通常具备分析视觉输入的能力，但它们在这些谜题上依然表现得一塌糊涂。尽管人们一直在谈论世界模型如何帮助 AI 理解物理环境，但大语言模型（LLM）似乎仍然无法像建筑师或机械工程师那样的空间思考者那样去操纵 3D 物体。

### Mental Rotation
### 心理旋转

Instructions: Choose the answer that shows the object in the prompt, but from a different angle. In each case, there’s only one correct answer!
说明：选择显示提示中物体但从不同角度观察的答案。每道题只有一个正确答案！

### Memory & Adaptability
### 记忆与适应性

Frontier LLMs have extraordinary memories; they were exposed to a monstrous volume of facts during training and can recite many of them faithfully. That’s an asset for outcompeting humans at trivia, but it can also be a liability. When a puzzle closely resembles one a model saw during training, the model may whiz by key differences and respond with what it memorized. This held true in a 2024 study in which researchers from Google and the University of Illinois Urbana-Champaign trained and tested models on slight variations of a classic type of puzzle called Knights and Knaves.
前沿大语言模型拥有非凡的记忆力；它们在训练过程中接触了海量的事实，并能准确地复述其中的许多内容。这在琐事问答中胜过人类是一项资产，但也可能成为一种负担。当一个谜题与模型在训练中见过的谜题非常相似时，模型可能会忽略关键差异，直接用记忆的内容回答。2024 年的一项研究证实了这一点，谷歌和伊利诺伊大学厄巴纳-香槟分校的研究人员在一种名为“骑士与无赖”（Knights and Knaves）的经典谜题的微小变体上对模型进行了训练和测试。

In these problems, some characters always tell the truth and others always lie, and you have to figure out who’s who. The same principle may be at work in a test called SimpleBench. These questions resemble more complicated problems that models likely encountered in training. Humans spot the trick, but even top-tier models trip.
在这些问题中，一些角色总是说真话，而另一些总是说谎，你必须弄清楚谁是谁。同样的原理可能也存在于名为“SimpleBench”的测试中。这些问题类似于模型在训练中可能遇到过的更复杂的问题。人类能识破其中的诡计，但即使是顶尖模型也会栽跟头。

### Knights and Knaves
### 骑士与无赖

Instructions: The only thing you need to know to solve these puzzles is that knights always tell the truth and knaves always lie. Determine who’s what on the basis of what each character says.
说明：解决这些谜题你唯一需要知道的是，骑士总是说真话，无赖总是说谎。根据每个角色的陈述来判断谁是什么身份。

### SimpleBench
### SimpleBench

Instructions: Read these SimpleBench problems carefully, and you should be able to figure out the answers in no time.
说明：仔细阅读这些 SimpleBench 问题，你应该能很快找出答案。

### Abstract & Visual Reasoning
### 抽象与视觉推理

AI doesn’t just bungle visual problems in 3D—two dimensions can trip it up as well. That’s a major factor in how well models do on the most famous puzzle-based benchmark, ARC-AGI. These problems require you to infer abstract, general rules from a set of examples. Models do better on ARC puzzles when they receive each grid not as an image but as a string of numbers that encodes the color of each cell. Research suggests that even when models answer ARC-AGI questions correctly, they often do so using byzantine and non-generalizable rules, whereas humans draw on simple visual concepts.
AI 不仅在 3D 视觉问题上笨手笨脚，二维问题也能让它栽跟头。这是模型在最著名的基于谜题的基准测试 ARC-AGI 中表现如何的一个主要因素。这些问题要求你从一组示例中推断出抽象的通用规则。当模型接收到的网格不是图像，而是编码每个单元格颜色的数字字符串时，它们在 ARC 谜题上的表现会更好。研究表明，即使模型正确回答了 ARC-AGI 问题，它们往往也是使用复杂且不可推广的规则，而人类则是利用简单的视觉概念。

Despite these disadvantages, models have gotten quite good at ARC-AGI over the past year, but some puzzles—such as the one printed here—still stump them.
尽管存在这些劣势，但在过去一年里，模型在 ARC-AGI 上的表现已经相当不错，但有些谜题——比如这里展示的这一道——仍然让它们感到困惑。

### ARC-AGI
### ARC-AGI

Instructions: Study the three pairs of grids shown below to figure...
说明：研究下面显示的三对网格，找出……