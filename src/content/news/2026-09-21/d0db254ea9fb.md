---
title: "Beyond jj: config & tools ecosystem"
originalUrl: "https://andre.arko.net/2026/09/16/beyond-jj-config-and-tools-ecosystem/"
date: "2026-09-20T23:22:51.669Z"
---

# Beyond jj: config & tools ecosystem

**16 Sep 2026**

This post was originally given as a talk at JJ Con 2026. The slides are also available.
这篇文章最初是 JJ Con 2026 大会上的演讲内容。演讲幻灯片也已发布。

Hello! Welcome to “beyond jj”, where we’re going to take a look at the jj ecosystem: commands, configurations, and tools made to work with jj. It’s partly a follow-up to my talk at JJCon last year, where I surveyed jj configurations across the community, but we’ll get there in a minute.
大家好！欢迎来到“超越 jj”（beyond jj），我们将在这里探索 jj 生态系统：包括为 jj 开发的命令、配置和工具。这在一定程度上是我去年在 JJCon 上演讲的后续，当时我调研了社区中的 jj 配置情况，稍后我们会详细讨论。

My practical qualifications to give a talk about jj basically come down to “I like trying new things, and I’m very excited about jj”. My impractical qualifications to give a talk about jj come down to “Steve Klabnik was my roommate once, so I can ask him to put my ideas into the official jj docs”. Thanks in advance, Steve!
我能进行这场关于 jj 演讲的实际资历归结为：“我喜欢尝试新事物，并且对 jj 非常兴奋”。而我进行这场演讲的“非实际”资历则是因为：“Steve Klabnik 曾是我的室友，所以我可以请他把我的想法写进 jj 的官方文档里”。提前感谢你，Steve！

Like I mentioned, this talk is partly a sequel to last year’s talk, where we worked through the entire idea of jj configuration, from configuring your name, to templates, revsets, commands, and aliases. We even managed to briefly touch on aliases that wrap shell scripts that wrap python scripts that automate workflows – aliases can be quite complex.
正如我提到的，这次演讲在某种程度上是去年演讲的续篇，当时我们探讨了 jj 配置的完整概念，从配置用户名到模板、修订集（revsets）、命令和别名。我们甚至简要涉及了那些封装了 shell 脚本、进而封装 python 脚本以实现工作流自动化的别名——别名确实可以非常复杂。

This year I’m going to talk less about what jj config is, and talk more about the bigger question: once you have jj, what do you do with it? we’ll start by looking at things you can do with pure jj, move on to things you can do by configuring jj, and wrap up by looking at things you can do completely outside the jj CLI itself.
今年我将减少对“什么是 jj 配置”的讨论，转而探讨一个更大的问题：一旦你拥有了 jj，你能用它做什么？我们将从纯 jj 能做的事情开始，接着讨论通过配置 jj 能实现的功能，最后总结那些完全在 jj CLI 之外可以完成的操作。

Some of these things are mentioned in the jj docs, some of these things are mentioned in the jj wiki, some of these things are mentioned in the awesome jj git repo, but no source has pulled all of them together before. Plus I have a bunch of additions that weren’t listed in any of those places, as well.
其中一些内容在 jj 文档、jj wiki 或 awesome-jj 代码仓库中有所提及，但此前没有任何资源将它们汇总在一起。此外，我还准备了一些在上述任何地方都未曾列出的补充内容。

### inside jj
### jj 内部功能

You can do a truly surprising amount with jj even if you never add another tool, helper, or script. By adding custom templates, revsets, and aliases, you can shorten or automate quite a bit. Beyond the jj config that we talked about last year, the biggest things I want to report on are things added to jj core that previously required external scripts or tools.
即使你不添加任何额外的工具、辅助程序或脚本，仅使用 jj 本身也能完成令人惊讶的大量工作。通过添加自定义模板、修订集和别名，你可以显著简化或自动化操作。除了我们去年讨论的 jj 配置外，我想重点介绍的是那些已加入 jj 核心、而此前需要外部脚本或工具才能实现的功能。

First, let’s talk about features that moved from config to built-ins.
首先，让我们谈谈那些从配置转变为内置功能的特性。

#### jj bookmark advance / jj b a
#### jj 书签推进 / jj b a

Last year, I talked about jj tug, an alias that looked for the closest bookmark and then moved it to the closest pushable change. I’m happy to report that today we don’t need tug anymore, because jj bookmark advance (and the shortcut jj b a) now do the same thing that tug used to do. By default, bookmark advance will advance the bookmark to the working copy. If you prefer the version of tug that only advances to the closest pushable commit, you can configure revsets.bookmark-advance-to and set it to the same pushable revset.
去年，我提到了 jj tug，这是一个查找最近书签并将其移动到最近可推送变更的别名。很高兴向大家报告，今天我们不再需要 tug 了，因为 jj bookmark advance（及其快捷方式 jj b a）现在可以实现 tug 过去的功能。默认情况下，bookmark advance 会将书签推进到工作副本。如果你更喜欢只推进到最近可推送提交的 tug 版本，你可以配置 revsets.bookmark-advance-to 并将其设置为相同的可推送修订集。

#### jj bisect run
#### jj 二分查找运行

The jj bisect tooling pulled in something that used to require a wrapper script, and you can now bisect run to automatically find the change that you’re trying to bisect for. In my personal opinion this was a big functionality gap between jj and git, so I’m very glad to see it integrated now without any need for fiddling to hunting down a script.
jj 的二分查找（bisect）工具引入了过去需要包装脚本才能实现的功能，现在你可以使用 bisect run 自动找到你想要二分查找的变更。在我个人看来，这是 jj 和 git 之间的一个巨大功能差距，所以我很高兴看到它现在被集成进来，无需再费力寻找脚本。

#### jj run
#### jj 运行

What if you don’t need to bisect, but you still want to run a script to modify every change in a revset? that’s what jj run is for, give it a script and a revset, and the script will get run, and every change will get updated if any files were modified. The entire tree of changes will stay unchanged (or, seen from another angle, will be automatically rebased as the run progresses through each change).
如果你不需要二分查找，但仍想运行一个脚本来修改修订集中的每一个变更呢？这就是 jj run 的用途。给它一个脚本和一个修订集，脚本就会运行，如果文件被修改，每个变更都会被更新。整个变更树将保持不变（或者从另一个角度看，随着运行在每个变更中推进，它会自动进行变基）。

#### jj fix
#### jj 修复

But wait, you’re probably thinking. Don’t jj fix and jj run do the same thing? take a range of changes and update those changes by (potentially) modifying the files in those changes? Sort of, but not really.
等等，你可能在想：jj fix 和 jj run 不是做同样的事情吗？都是获取一系列变更并通过（可能）修改其中的文件来更新它们？算是，但也不完全是。

jj fix exists specifically to make changes only to files that were changed. it doesn’t create a checkout of each change, and it only provides a single file at a time to the script, accepting a modified version of the file as output.
jj fix 的存在专门用于仅对已更改的文件进行修改。它不会为每个变更创建检出（checkout），并且一次只向脚本提供一个文件，接收修改后的文件版本作为输出。

if you need a checked out set of files on disk to run a script against, jj fix can’t do that. but if what you want is to retroactively apply a formatter or a linter to every file that changed, across a whole revset, jj fix is going to be incredibly faster than jj run.
如果你需要磁盘上检出的一组文件来运行脚本，jj fix 做不到。但如果你想对整个修订集中所有已更改的文件追溯性地应用格式化程序或代码检查工具（linter），jj fix 将比 jj run 快得多。

#### jj tag
#### jj 标签

jj tag is an example of functionality moving inside jj not from a config or a script, but from git itself. You don’t have to use git tag to manage your tags anymore, you can now use jj tag set and jj git push --all to push all your bookmarks and tags. (You can also push a single tag, with jj git push --tag NAME). Now that we have jj tag, my own day to day work no longer includes running the git command at all. Great progress since last year, everyone!
jj tag 是一个功能从 git 本身移入 jj 的例子，而不是从配置或脚本中移入。你不再需要使用 git tag 来管理标签，现在可以使用 jj tag set 和 jj git push --all 来推送所有的书签和标签。（你也可以使用 jj git push --tag NAME 推送单个标签）。现在有了 jj tag，我的日常工作中完全不再需要运行 git 命令了。大家，自去年以来取得了巨大的进步！

#### jj arrange
#### jj 整理

jj arrange is like having git rebase -i but interactive. you don’t have to edit a text file, you can just select or move the changes directly around in a log-like graph. It’s great to save time if you don’t want to run three commands to look up the name and move a recent change.
jj arrange 就像是交互式的 git rebase -i。你不需要编辑文本文件，只需在类似日志的图形中直接选择或移动变更即可。如果你不想运行三条命令来查找名称并移动最近的变更，这非常节省时间。

#### jj converge
#### jj 收敛

The converge command is the newest but possibly the most useful. Any time you update a change in two separate places, it can diverge. When I gave my talk a year ago, divergent changes were a huge pain to deal with — we didn’t have the /N syntax to easily refer to each side of the divergence, and it was easy to accidentally diverge by running a command from two different terminal windows at the same time, or by pulling a remote branch.
converge 命令是最新的，但可能是最有用的。每当你在两个不同的地方更新同一个变更时，它就可能产生分歧（diverge）。一年前我演讲时，处理分歧变更非常痛苦——我们当时没有 /N 语法来轻松引用分歧的每一侧，而且很容易因为同时在两个不同的终端窗口运行命令或拉取远程分支而意外导致分歧。

Today, it’s not only much easier to refer to divergent changes, hopefully making it easy to rebase or combine the branches, you might not even have to do that! the converge command tries to take the two divergent change streams and combine them into a single non-divergent change stream. This might create merge conflicts, but better a merge conflict than two separate branches that you have to manually reconcile. I’m personally very excited to have converge and to be able to use it in the future.
今天，不仅引用分歧变更变得容易得多，有望使变基或合并分支变得简单，你甚至可能根本不需要这样做！converge 命令尝试获取两个分歧的变更流并将它们合并为一个非分歧的变更流。这可能会产生合并冲突，但总比必须手动协调两个独立的分支要好。我个人非常高兴能拥有 converge，并期待在未来使用它。

### around jj
### jj 周边生态

Now let’s move beyond things that are fully intrinsic to jj and take a look at thing...
现在让我们超越那些完全属于 jj 内部的功能，来看看……