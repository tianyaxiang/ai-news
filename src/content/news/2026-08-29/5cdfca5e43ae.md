---
title: "OpenOffice does not print on Tuesdays (2009)"
originalUrl: "https://beza1e1.tuxen.de/lore/print_on_tuesday.html"
date: "2026-08-29T03:17:27.700Z"
---

# OpenOffice does not print on Tuesdays (2009)
# OpenOffice 在周二无法打印 (2009)

Source via Paul Wise Today I came across an interesting bug mentioned on a blog. The problem was that printing for some people failed occasionally. Later someone noted that his Wife had been complaining that she couldn't print on Tuesdays!
来源：Paul Wise。今天我在博客上看到一个有趣的 Bug。问题是有些人的打印功能偶尔会失效。后来有人提到，他的妻子一直在抱怨她周二无法打印！

In reading through the bug report people were initially claiming that it must be an OpenOffice bug since all other applications printed fine. Others noted that it comes and goes. One user found a solution: To remove and purge the system of OpenOffice and re-install (any easy task on Ubuntu). He reported on a Thursday that this fixed his printing problem. Two weeks later he reported (on a Tuesday) that his solution did not work after-all.
在阅读 Bug 报告时，人们最初声称这一定是 OpenOffice 的 Bug，因为所有其他应用程序都能正常打印。其他人则指出这个问题时有时无。一位用户找到了一个解决方案：从系统中彻底卸载并清除 OpenOffice，然后重新安装（在 Ubuntu 上这很容易）。他在周四报告说这解决了他的打印问题。两周后（在周二），他报告说他的解决方案最终还是没用。

Nearly 4 months later the Wife of a Ubuntu hacker complained that OpenOffice would not print on Tuesdays. I can imagine the scenario:
近 4 个月后，一位 Ubuntu 黑客的妻子抱怨说 OpenOffice 在周二无法打印。我可以想象当时的场景：

Wife: Steve, the printer will not work on Tuesdays.
Steve: That's the printer's day off - Of course it will not print on Tuesdays.
Wife: No, I'm serious! I can not print from OpenOffice on Tuesdays.
Steve: (Unbelieving..) Ok... Show me.
Wife: I can't show you.
Steve: (Rolling eyes..) Why?
Wife: It's Wednesday!
Steve: (Nods. He says slowly...) Right.
妻子：史蒂夫，打印机周二不工作。
史蒂夫：那是打印机的休息日——当然周二不打印。
妻子：不，我是认真的！我周二没法用 OpenOffice 打印。
史蒂夫：（不信地……）好吧……演示给我看。
妻子：我没法演示给你看。
史蒂夫：（翻白眼……）为什么？
妻子：今天是周三！
史蒂夫：（点头，慢慢地说……）好吧。

The problem seemed to be tracked down to a program called 'file'. This *NIX utility uses patterns to detect file types. eg. if the file starts with '%!' followed by 'PS-Adobe-' then it is a PostScript file. It seems that OpenOffice writes the date to the postscript file. On Tuesdays it takes the form of %%CreationDate: (Tue MMM D hh:mm:...)
这个问题似乎被追踪到了一个名为“file”的程序上。这个 *NIX 工具使用模式来检测文件类型。例如，如果文件以“%!”开头，后面跟着“PS-Adobe-”，那么它就是一个 PostScript 文件。看起来 OpenOffice 会将日期写入 PostScript 文件。在周二，其格式为 %%CreationDate: (Tue MMM D hh:mm:...)

An error in the pattern for an Erlang JAM file meant that 'Tue' in the PostScript file was being recognised as an Erlang JAM file and so, presumably, it was not being sent to the printer. The Erlang JAM file pattern is: 4 string Tue Jan 22 14:32:44 MET 1991 Erlang JAM file - version 4.2
Erlang JAM 文件模式中的一个错误导致 PostScript 文件中的“Tue”被识别为 Erlang JAM 文件，因此，推测它没有被发送到打印机。Erlang JAM 文件的模式是：4 string Tue Jan 22 14:32:44 MET 1991 Erlang JAM file - version 4.2

It should have been 4 string Tue\ Jan\ 22\ 14:32:44\ MET\ 1991 Erlang JAM file - version 4.2
它本应该是：4 string Tue\ Jan\ 22\ 14:32:44\ MET\ 1991 Erlang JAM file - version 4.2

With the large number of files types that this program attempts to match (over 1600) it is not surprising that errors are made in the patterns, but also the order of matching could mean that false positives are common. In this case, an Erlang JAM file was matched before the PostScript match occurred.
由于该程序试图匹配的文件类型数量庞大（超过 1600 种），模式中出现错误并不令人惊讶，而且匹配顺序也可能导致误报频繁发生。在这种情况下，Erlang JAM 文件的匹配在 PostScript 匹配之前就发生了。

Reference, Bug Report More such crazy stories
参考资料，Bug 报告，更多此类疯狂故事