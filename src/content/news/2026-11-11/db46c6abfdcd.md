---
title: "Why Can't We Use Design Patterns?"
originalUrl: "https://dev.to/muratcabuk/why-cant-we-use-design-patterns-5dik"
date: "2026-11-11T01:15:29.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# Why Can't We Use Design Patterns?

Hello friends, If you came here because of the title of the article, my guess is that you, like many developers, have studied design patterns over and over again and forgotten them before ever really using them properly. The story begins like this: every time, a promise is made, "this time I'm going to use them", but they're never used. Because there's no need for them.

朋友们好，如果你是因为这篇文章的标题而来到这里，我猜你像许多开发者一样，反复学习过设计模式，却在真正使用它们之前就将其遗忘了。故事通常是这样开始的：每一次都信誓旦旦地说“这次我一定要用上它们”，但最终却从未用过。因为根本没有必要。

While writing code, we think that a structure exactly like the example situation or the uml diagram we studied for the design pattern will come along. And we think that the moment this happens, we'll immediately make the connection or sense it :), say "ha, here's the moment I've been waiting for" and be able to use the related design pattern. Of course, since such a moment never comes, they're forgotten. And so the need never arises either.

在编写代码时，我们总以为会出现一种与我们所学设计模式的示例场景或 UML 图完全一致的结构。我们认为当那一刻来临时，我们会立即产生联想或直觉 :)，说“哈，这就是我一直在等待的时刻”，并能够使用相关的设计模式。当然，由于这样的时刻从未到来，它们也就被遗忘了。因此，需求也从未产生。

Perhaps the first misconception is that, because design patterns are seen as a goal in themselves, people try to catch exactly the same situations. For example, plans like "one day I'll need to create an object so big that its constructor will need a ton of parameters, it'll be so complex, and that's why I'll use the builder design pattern for it. That day will be the golden day of my software life :)" are made. But with such a point of view, it will be hard for design patterns to stick in our memory, or to apply them by trying to catch a pattern that fits exactly the same structure.

也许第一个误区在于，人们将设计模式本身视为目标，试图去捕捉完全相同的场景。例如，人们会制定这样的计划：“总有一天，我需要创建一个非常庞大的对象，它的构造函数需要大量参数，它会非常复杂，所以我到时候要用建造者模式。那一天将是我软件生涯的黄金时刻 :)”。但持有这种观点，设计模式很难留在我们的记忆中，或者通过试图捕捉完全符合某种结构的模式来应用它们也是很难的。

So first of all, we need to change the way we look at design patterns. The situations I mentioned above actually show that design patterns have been made into a goal. Whereas our real goal should be to follow/apply principles. In the list below, you can find some of the most used principles. SOLID : Single Responsibility (SRP), Open/Closed (OCP), Liscov Substitution (LSP), Interface Segregation (ISP), Dependency Inversion (DIP) GRASP: General Responsibility Assignment Software Principles (controller, creator, indirection, information expert, low coupling, high cohesion, polymorphism, protected variations, and pure fabrication) YAGNI : You Aren't Gonna Need It Principle DRY : Don't repeat yourself KISS : Keep It Simple Stupid.

因此，首先我们需要改变看待设计模式的方式。我上面提到的情况实际上表明设计模式已被当作了目标。而我们真正的目标应该是遵循/应用原则。在下表中，你可以找到一些最常用的原则。SOLID：单一职责原则 (SRP)、开闭原则 (OCP)、里氏替换原则 (LSP)、接口隔离原则 (ISP)、依赖倒置原则 (DIP)；GRASP：通用职责分配软件原则（控制器、创建者、间接性、信息专家、低耦合、高内聚、多态、受保护变化和纯虚构）；YAGNI：你不会需要它原则；DRY：不要重复自己；KISS：保持简单愚蠢。

Of course there are many more principles. You can find many resources for these and others. So the essence of it is that you should first get yourself used to writing clean code. This process can take much more time than digesting design patterns. For this, I'm adding a few of the most fundamental resources. Design Patterns: Elements of Reusable Object-Oriented Software, Clean Code: A Handbook of Agile Software Craftsmanship, Applying UML and Patterns: An Introduction to Object-Oriented Analysis and Design and Iterative Development, Refactoring: Improving the Design of Existing Code, Patterns of Enterprise Application Architecture.

当然，还有许多其他原则。你可以找到许多关于这些原则及其他内容的资源。所以其本质在于，你应该首先让自己习惯编写整洁的代码。这个过程可能比消化设计模式花费更多时间。为此，我添加了一些最基础的资源：《设计模式：可复用面向对象软件的基础》、《代码整洁之道：敏捷软件工艺手册》、《UML 和模式应用：面向对象分析与设计及迭代开发导论》、《重构：改善既有代码的设计》、《企业应用架构模式》。

In a world without principles, we'd write everything however we wanted anyway. In that case, we'd have to memorize a separate principle for every situation, which would truly be pure memorization. Whereas what forces us to write design patterns should be our obligation to follow principles. As the same situations kept happening, it occurred to someone to write down the techniques developed for them. Sometimes we may also have a direct goal or be looking for a solution to a problem. But still, the purpose of design patterns isn't directly just to produce a solution for your goal or problem; it's to produce a correct solution, that is, one that complies with principles. In other words, they try to keep us on the right path.

在一个没有原则的世界里，我们无论如何都会随心所欲地编写代码。那样的话，我们就必须为每种情况背诵一条单独的原则，那将纯粹是死记硬背。而促使我们编写设计模式的，应该是我们遵循原则的义务。随着相同的情况不断发生，有人想到将为这些情况开发的技巧记录下来。有时我们可能也有直接的目标，或者正在寻找问题的解决方案。但即便如此，设计模式的目的并不直接只是为了给你的目标或问题提供解决方案；而是为了提供一个正确的解决方案，即符合原则的方案。换句话说，它们试图让我们保持在正确的道路上。

Defining the Problem Is Harder Than Producing a Solution. Understanding whether there's a problem at all, or defining the problem, is harder than producing a solution for it. For example, we read the single responsibility principle, one of the SOLID principles, dozens of times. It doesn't seem very complex while reading it. Many developers think they write their functions to be single responsible. But we don't think about how we can write a namespace/package or a class to be single responsible. We think the job is done when we give a data-oriented file and class name in the related layer.

定义问题比产生解决方案更难。理解是否存在问题，或者定义问题，比为它提供解决方案要难得多。例如，我们读过几十次 SOLID 原则之一的单一职责原则。阅读时它看起来并不复杂。许多开发者认为他们编写的函数是单一职责的。但我们并没有思考如何编写一个单一职责的命名空间/包或类。我们认为只要在相关层中给出一个面向数据的名称和类名，工作就完成了。

As long as we don't constrain ourselves with principles, we can go for quite a long time without running into any problems. In this case, we can write code without feeling anything until it's too late. Let's think about another SOLID principle, the open/closed principle. Although it usually looks like a topic related to classes, it actually covers all parts of the software. For example, the way to make a class closed to modification and open to extension also goes through writing functions with the same principle. One of the most important things to pay attention to when writing a function in line with the open/closed principle is writing the function in line with single responsibility. This way, a function tightly bound to its purpose will have fewer reasons to change.

只要我们不用原则约束自己，我们可以在很长一段时间内不遇到任何问题。在这种情况下，我们可以毫无察觉地编写代码，直到为时已晚。让我们思考另一个 SOLID 原则：开闭原则。虽然它通常看起来是一个与类相关的话题，但它实际上涵盖了软件的所有部分。例如，使一个类对修改关闭、对扩展开放的方法，也需要通过遵循相同原则来编写函数。在编写符合开闭原则的函数时，最重要的事情之一就是确保函数符合单一职责原则。这样，一个与其目的紧密绑定的函数将有更少的理由去改变。

Let's assume we have a very complex class that will be created as a result of several processes being completed. If there were no principles, we could create such a class with, for example, a constructor with 20 parameters. Most likely this class could be used without problems for quite a long time. But after a while, other classes that don't have all the parameters but need this class will start creating instances by passing null parameters to the constructor. In this case, the code will get more and more complex, because since the class has to respond to every request, we'll have to write a lot of if blocks inside it. Imagine we wrote other classes like this too. The end of this story is that a whole namespace or package goes off track, that is, we fail to achieve a single responsible structure. If we had tried to write the same class in line with the SOLID principles, among the most fundamental principles, we'd first try to write a single responsible class. This might force us to write more than one class, because it seems hard for an object built with 20 parameters to focus on a single responsibility.

假设我们有一个非常复杂的类，它是在完成几个流程后创建的。如果没有原则，我们可以创建一个带有 20 个参数的构造函数的类。很可能这个类在很长一段时间内都可以正常使用。但过了一段时间，其他没有所有参数但需要这个类的类，将开始通过向构造函数传递 null 参数来创建实例。在这种情况下，代码会变得越来越复杂，因为由于该类必须响应每个请求，我们必须在其中编写大量的 if 代码块。想象一下，如果我们也这样编写其他类。这个故事的结局是整个命名空间或包偏离了轨道，也就是说，我们未能实现单一职责的结构。如果我们尝试按照最基础的 SOLID 原则来编写同一个类，我们首先会尝试编写一个单一职责的类。这可能会迫使我们编写多个类，因为一个由 20 个参数构建的对象似乎很难专注于单一职责。