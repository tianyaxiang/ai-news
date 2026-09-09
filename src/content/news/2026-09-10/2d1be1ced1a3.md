---
title: "10 Statistical Traps We Often Overlook"
originalUrl: "https://towardsdatascience.com/10-statistical-traps-we-often-overlook/"
date: "2026-09-09T23:28:57.724Z"
---

# 10 Statistical Traps We Often Overlook
# 我们常忽略的 10 个统计学陷阱

We have all been there, sitting in a college class where a professor is writing down a collection of formulas on the board, asking us to memorize it “because that is what is going to be on the test”—caring mostly about grades, even if I enjoy the subject, because that is how students are evaluated! One such class for me was statistics.
我们都有过这样的经历：坐在大学教室里，教授在黑板上写下一堆公式，要求我们死记硬背，理由是“考试会考”。即便我喜欢这门学科，也只能把重心放在分数上，因为这就是学生被评估的方式！对我来说，统计学就是这样的一门课。

When I think about stat classes, I remember a board full of numbers and statements like: calculate the mean, find the median, work out the standard deviation, draw a graph, or report the p-value. And then, somehow, we are expected to look at a dataset and understand what it is telling us. I must admit that last part is where the fun is, but it is not how structured classes present statistics.
每当想起统计学课，我脑海中浮现的都是写满数字的黑板，以及诸如“计算平均值、寻找中位数、算出标准差、绘制图表或报告 p 值”之类的指令。然后，我们被期望能看着数据集并理解它传达的信息。我必须承认，最后这一部分才是乐趣所在，但这并不是传统课堂教授统计学的方式。

So, when I started learning on my own and found joy in figuring out the story behind the data, I found statistics very fun. Because knowing how to calculate a statistic is not the same as understanding what the statistic means. And in a world where we are constantly surrounded by numbers, graphs, percentages, polls, studies, and “data-driven” claims, knowing how to interpret data can help you avoid misinformation. That is why I am writing this article: to better explain 10 things about statistics that often get lost somewhere between the equations and the exam questions.
因此，当我开始自学并从挖掘数据背后的故事中找到乐趣时，我发现统计学非常有趣。因为知道如何计算一个统计量，并不等同于理解该统计量的含义。在这个充斥着数字、图表、百分比、民意调查、研究报告和“数据驱动”主张的世界里，懂得如何解读数据能帮你避免被误导。这就是我写这篇文章的原因：为了更好地解释统计学中那些常在公式与考题之间被遗忘的 10 件事。

### 1. The average isn’t always the “average”
### 1. 平均值并不总是“平均”

Let’s start with one of the most familiar words in statistics: average. We often use “average” and “mean” interchangeably. Technically, however, average is a broader, informal term, whereas mean is one particular way of describing the center of a dataset.
让我们从统计学中最熟悉的词汇之一开始：平均值（average）。我们经常混用“average”和“mean”（算术平均值）。然而从技术上讲，“average”是一个更宽泛、非正式的术语，而“mean”则是描述数据集中心的一种特定方式。

Let’s take an example: imagine five people earn: 25k, 27k, 29k, 31k and 33k. If we consider those particular five numbers, the mean is £29k. Everything looks fairly sensible. But what if we change the highest-earning person’s salary to 500k? The mean suddenly becomes £122.4k.
举个例子：假设五个人的收入分别是 2.5 万、2.7 万、2.9 万、3.1 万和 3.3 万英镑。如果我们看这五个数字，平均值是 2.9 万英镑，一切看起来都很合理。但如果我们将收入最高者的薪水改为 50 万英镑呢？平均值会瞬间变成 12.24 万英镑。

The question now is, did the “typical” person suddenly become a six-figure earner? You will probably answer, of course not. I would argue that, though the calculation is correct, the interpretation is not. This is why we need to understand what the mean is actually doing. It takes the total of all the observations and divides it equally among them. The mean is therefore particularly sensitive to extreme values.
现在的问题是，这个“典型”人的收入突然变成六位数了吗？你可能会回答：当然没有。我认为，虽然计算过程是正确的，但解读方式却错了。这就是为什么我们需要理解平均值到底在做什么。它将所有观测值的总和平均分配。因此，平均值对极端值特别敏感。

That is where the median comes in! It gives us a different perspective. Put the observations in order and take the middle one. The median is 29k in both examples! If we consider the numbers as absolutes, both numbers are statistically “correct,” but they are answering slightly different questions, which is the point of this article.
这就是中位数（median）的用武之地！它为我们提供了不同的视角。将观测值排序并取中间值。在上述两个例子中，中位数都是 2.9 万！如果我们把这些数字视为绝对值，两者在统计上都是“正确”的，但它们回答的是略有不同的问题，这正是本文的核心所在。

The mean asks: If the total were distributed equally, what would each observation get? The median asks: What value sits in the middle of the ordered data? And sometimes that difference is the entire story! This is why you will often see house prices, salaries, and wealth reported using the median rather than the mean. A small number of extremely large values can pull the mean dramatically upward.
平均值问的是：如果总量被平均分配，每个观测值会得到多少？中位数问的是：排序后的数据中间值是多少？有时，这种差异就是故事的全部！这就是为什么你经常看到房价、薪资和财富报告使用中位数而非平均值的原因。少数极端大的数值会把平均值大幅拉高。

### 2. A number without its distribution can be misleading
### 2. 脱离分布的数字可能会产生误导

Statistics also teaches us to compress information. If we are given datasets with millions of entries, we will need to compress them into a couple of representative numbers to communicate them easily. Though this is useful, it is also dangerous.
统计学也教导我们如何压缩信息。如果我们面对拥有数百万条记录的数据集，就需要将其压缩成几个代表性数字以便于交流。虽然这很有用，但也存在风险。

Suppose two classes both have an average exam score of 70%. From that alone, we assume they performed similarly. Which is a fair assumption, but not always a correct one. What if the scores look like this:
假设两个班级的平均考试成绩都是 70%。仅凭这一点，我们可能会认为他们的表现相似。这是一个合理的假设，但并不总是正确的。如果成绩分布如下：

Class A: 65, 68, 69, 70, 71, 72, 75
Class B: 30, 50, 65, 70, 75, 90, 110
A 班：65, 68, 69, 70, 71, 72, 75
B 班：30, 50, 65, 70, 75, 90, 110

Both could have a mean around 70. But these are clearly not the same dataset. The first class is tightly clustered, while the second is much more spread out, and considering only the average hides the shape of the data.
两者的平均值都约为 70，但它们显然不是同一个数据集。第一个班级的成绩分布紧密，而第二个班级则分散得多。仅考虑平均值会掩盖数据的形态。

This is one of the most important habits you can develop when reading statistics: don’t stop at the summary statistic; that is not enough! We also need to consider the distribution, outliers, spread, and number of observations. A single number summarizes the data. It is not the data itself.
这是你在阅读统计数据时应培养的最重要习惯之一：不要止步于汇总统计量；那是不够的！我们还需要考虑分布、异常值、离散程度和观测数量。单一数字只是对数据的总结，它本身并非数据。

### 3. Variables don’t exist in isolation
### 3. 变量并非孤立存在

This is where statistics becomes much more interesting, and much easier to misuse. Suppose a study finds that people who drink more coffee report higher levels of stress. Most people would immediately think: Coffee causes stress! But, but, that is not really what the study says.
统计学在这里变得更有趣，也更容易被滥用。假设一项研究发现，喝咖啡更多的人报告的压力水平更高。大多数人会立刻想到：咖啡导致压力！但是，这并不是研究真正想表达的意思。

Perhaps people who work longer hours drink more coffee and experience more stress. In that case, working hours could be a confounding variable. Or maybe people who are already stressed drink more coffee. Now the story of the relationship is different! Say, the type of job someone has influences both coffee consumption and stress.
也许工作时间更长的人喝咖啡更多，且承受的压力也更大。在这种情况下，工作时间可能是一个混杂变量。又或者，本身压力大的人会喝更多咖啡。现在，这种关系的逻辑就完全不同了！比如，一个人的职业类型同时影响了咖啡摄入量和压力水平。

The point is that observing two variables moving together doesn’t automatically tell us why they move together. This is one of the easiest mistakes to make when looking at data. The missing question is: What else could explain this relationship? That question is often more valuable than the calculation itself.
重点在于，观察到两个变量同时变化，并不自动告诉我们它们为何同时变化。这是查看数据时最容易犯的错误之一。缺失的问题是：还有什么能解释这种关系？这个问题往往比计算本身更有价值。

### 4. Control variables aren’t just a technical detail
### 4. 控制变量不仅仅是技术细节

When researchers try to understand relationships between variables, they often try to account for other variables. This is where ideas such as control variables, confounders, and stratification become important.
当研究人员试图理解变量之间的关系时，他们通常会尝试考虑其他变量。这就是控制变量、混杂因素和分层等概念变得重要的地方。

Imagine we discover that people who exercise more tend to report better mental wellbeing. Sounds straightforward! But age might affect both exercise habits and wellbeing! Or income might affect access to gyms, free time, and healthcare! Or existing health conditions might affect both exercise and wellbeing.
想象一下，我们发现经常锻炼的人往往心理健康状况更好。听起来很简单！但年龄可能会同时影响锻炼习惯和心理健康！或者收入可能会影响健身房的使用、闲暇时间和医疗保健！又或者现有的健康状况可能会同时影响锻炼和心理健康。

The more variables we consider, the more complicated the analysis becomes. But that complexity is not necessarily a problem. In fact, sometimes simplifying the story is the problem. Real-world data rarely comes with a neat label saying: “Here is the one variable responsible for everything.” Good statistical thinking means being suspicious of overly simple explanations.
我们考虑的变量越多，分析就越复杂。但这种复杂性并不一定是问题。事实上，有时过度简化故事才是问题所在。现实世界的数据很少会贴上一个整洁的标签说：“这就是导致一切的唯一变量。”良好的统计思维意味着要对过于简单的解释保持怀疑。