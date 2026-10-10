---
title: "Keyboard differences between Windows and Macs"
originalUrl: "https://unsung.aresluna.org/deeper-dive-keyboard-differences-between-windows-and-macs/"
date: "2026-10-09T03:08:05.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

Send me feedback, tips, bug reports, and anything else:

请向我发送反馈、建议、错误报告以及任何其他内容：

My name is Marcin Wichary (he/him). I’ve worked as a UX designer, typographer, front-end person, and manager at Google, Medium, and Figma. I’ve also written a book about keyboards and typing, gave talks, and published essays about design, typography, and technology.

我叫 Marcin Wichary（他/他的）。我曾担任 UX 设计师、字体排印师、前端开发人员，并在 Google、Medium 和 Figma 担任过管理职务。我还写过一本关于键盘和打字的书，做过演讲，并发表过关于设计、字体排印和技术的文章。

Unsung is my blog about software craft and quality.

Unsung 是我的博客，主要探讨软件工艺与质量。

More info about Unsung

关于 Unsung 的更多信息

Send me feedback, tips, bug reports, and anything else:

请向我发送反馈、建议、错误报告以及任何其他内容：

More info about Unsung

关于 Unsung 的更多信息

Over the years, I learned about many gotchas and strange differences between keyboard handling on Mac and Windows – pertinent especially to web apps, which use the same codebase to cater to both. I thought it might be helpful to someone if I compile them all in one place.

多年来，我了解到 Mac 和 Windows 在键盘处理方面存在许多陷阱和奇怪的差异——这对于使用同一代码库来适配两者的 Web 应用程序尤为重要。我想如果能将它们汇总在一起，可能会对某些人有所帮助。

This post is meant to be a reference, and there aren’t any cute or riveting stories hiding inside – if this seems boring to you, feel free to skip to the next one!

这篇文章旨在作为参考资料，其中并没有隐藏什么可爱或引人入胜的故事——如果你觉得无聊，请随意跳过！

What Windows calls Backspace, Mac calls Delete. What Windows calls Delete, Macs call Forward Delete. (This means saying “Delete” without specifying the platform might actually be confusing.)

Windows 中称为 Backspace 的键，在 Mac 上称为 Delete。Windows 中称为 Delete 的键，在 Mac 上称为 Forward Delete。（这意味着如果不指明平台，直接说“Delete”可能会造成混淆。）

What Windows calls ⏎ Enter, Mac calls ⏎ Return. However, Macs also have an ⌤ Enter, although only on a numeric keypad (previously, it was even there on laptops!). On keyboards without the physical Enter key, you can simulate it via Fn+Return.

Windows 中称为 ⏎ Enter 的键，在 Mac 上称为 ⏎ Return。不过，Mac 也有一个 ⌤ Enter 键，尽管它只存在于数字小键盘上（以前甚至在笔记本电脑上也有！）。在没有物理 Enter 键的键盘上，可以通过 Fn+Return 来模拟它。

In most Mac software, Enter and Return do the same thing. There are a few exceptions – for example, Photoshop adds a new line on Return but commits on Enter, and some classic pro apps like Cubase or Pro Tools do different things, too – but it seems to be a dying tradition. (If you are curious about the history of Return and Enter, I wrote about it once.)

在大多数 Mac 软件中，Enter 和 Return 的功能相同。也有一些例外——例如，Photoshop 在按下 Return 时换行，但在按下 Enter 时提交；一些经典的专业应用程序（如 Cubase 或 Pro Tools）也有不同的处理方式——但这似乎正在成为一种逐渐消失的传统。（如果你对 Return 和 Enter 的历史感到好奇，我曾经写过相关内容。）

Windows customarily calls the secondary key Numpad Enter. I don’t believe Fn+Enter works to simulate it.

Windows 通常将第二个键称为 Numpad Enter。我不认为 Fn+Enter 可以模拟它。

Generally, third-party keyboards use Windows verbiage – so, Backspace and Enter. If a keyboard offers Mac conventions at all, they usually only extend to modifier keys.

通常，第三方键盘使用 Windows 的术语——即 Backspace 和 Enter。如果键盘确实提供了 Mac 惯例，它们通常也仅限于修饰键。

⌃ Control on Windows is the equivalent to ⌘ Command on a Mac. (Paste, for example, is ⌃V on Windows and ⌘V on a Mac.) But, confusingly, Apple devices still have a Control key, too. This was originally meant for terminal applications, but these days many GUI apps use it as an extra modifier key of much lesser significance than Control on Windows.

Windows 上的 ⌃ Control 相当于 Mac 上的 ⌘ Command。（例如，粘贴在 Windows 上是 ⌃V，在 Mac 上是 ⌘V。）但令人困惑的是，Apple 设备也有一个 Control 键。它最初是为终端应用程序设计的，但如今许多 GUI 应用程序将其用作一个额外的修饰键，其重要性远低于 Windows 上的 Control 键。

This means that for apps, Windows devices offer Ctrl, Alt, and Shift – and Macs offer ⌘ Command, ⌥ Option, ⌃ Control, and ⇧ Shift. That’s one more modifier key, and thus more space to breathe. (We’re not counting the Windows key or the 🌐 Globe/Fn key since those are technically reserved by the operating system.)

这意味着对于应用程序而言，Windows 设备提供 Ctrl、Alt 和 Shift，而 Mac 提供 ⌘ Command、⌥ Option、⌃ Control 和 ⇧ Shift。这多了一个修饰键，因此有更多的操作空间。（我们不计算 Windows 键或 🌐 Globe/Fn 键，因为它们在技术上是由操作系统保留的。）

Some keyboards offer extra key caps you can swap to match the platform, for example:

一些键盘提供额外的键帽，你可以更换它们以匹配平台，例如：

Others cover all the bases on fixed key caps, in an awkward way:

另一些键盘则以一种尴尬的方式在固定的键帽上涵盖了所有功能：

Many stick with Windows-only legends.

许多键盘仅保留 Windows 专属的标识。

(Just swapping the key caps is not enough. The keyboard also has to swap the scan codes it sends, since the code for Alt is the same as the code for ⌥, and the code for ⌘ is the same as the code for ⊞.)

（仅仅更换键帽是不够的。键盘还必须交换它发送的扫描码，因为 Alt 的代码与 ⌥ 的代码相同，而 ⌘ 的代码与 ⊞ 的代码相同。）

Apple devices rely more on symbols on their keys and in their menus, although they don’t do so consistently. Here are all of them:

Apple 设备在按键和菜单中更多地依赖符号，尽管它们并不总是保持一致。以下是所有这些符号：

Actually, I lied about the last four. On modern Apple keyboards, they are:

实际上，关于最后四个我撒谎了。在现代 Apple 键盘上，它们是：

Reusing the regular arrows for Page Up and Down is one of a few perplexing decisions from Apple’s keyboard designers. The arrow key symbols look like this – ◀▶▲▼ – but only on Apple keyboards. Here is an older and a newer Apple keyboard showing what happened:

将常规箭头键复用于 Page Up 和 Page Down 是 Apple 键盘设计师做出的几个令人困惑的决定之一。箭头键的符号看起来像这样——◀▶▲▼——但这仅限于 Apple 键盘。这是一张较旧和较新的 Apple 键盘对比图，展示了发生了什么：

(Luckily, the confusing dual arrow key situation only happens on less popular, full-size keyboards.)

（幸运的是，这种令人困惑的双重箭头键情况仅发生在不太受欢迎的全尺寸键盘上。）

Historically, Apple keyboards used symbols more on non-US keyboards, but starting with the 2026 models, they unified when they show symbols and when they show symbols and legends, across all keyboards. (The only key with just a text legend is Esc, making the appearance of ⎋ in menus extra puzzling.)

从历史上看，Apple 键盘在非美国键盘上更多地使用符号，但从 2026 年的型号开始，它们统一了在所有键盘上显示符号以及显示符号和文字标识的时机。（唯一仅带有文字标识的键是 Esc，这使得 ⎋ 出现在菜单中显得格外令人费解。）

Windows keyboards typically use words – this is why in tight quarters you sometimes see shortenings like Ctrl, Bkspc, PrtSc, Del, PgUp, Win, and so on. (I don’t think Apple ever abbreviates their legends with the exception of Esc for Escape.) In some countries, the legends are translated – as an example, in Germany, Ctrl sometimes appears as Strg.

Windows 键盘通常使用单词——这就是为什么在狭窄的空间里，你有时会看到像 Ctrl、Bkspc、PrtSc、Del、PgUp、Win 等缩写。（我不认为 Apple 会缩写其标识，除了 Esc 代表 Escape 之外。）在一些国家，标识会被翻译——例如，在德国，Ctrl 有时显示为 Strg。

The symbols that crossed over to Windows side are:

跨越到 Windows 端的符号有：

I have not seen any other popular symbols on the Windows side of the aisle, and I am not even sure if the above would be widely understood. But here’s an example:

我没有在 Windows 端看到过其他流行的符号，甚至不确定上述符号是否会被广泛理解。但这里有一个例子：

(I wrote a bit more about Mac symbols before, and also about the rare Canadian symbols.)

（我之前写过更多关于 Mac 符号的内容，也写过关于罕见的加拿大符号的内容。）

In menus and other places, Windows joins the key combinations/​shortcuts with a plus, but Apple just glues them together:

在菜单和其他地方，Windows 使用加号连接组合键/快捷键，而 Apple 只是将它们粘在一起：

Here is the same Chrome menu on Windows and on macOS:

这是 Windows 和 macOS 上同一个 Chrome 菜单的对比：

(In other words, you’d never say “⌃V is Paste on Windows” like I did above.)

（换句话说，你永远不会像我上面那样说“⌃V 是 Windows 上的粘贴”。）

Both Windows and Macs have function keys.

Windows 和 Mac 都有功能键。

On Windows, traditionally those were claimed by the operating system or the apps as shortcuts. Here are some examples of well-known function key assignments:

在 Windows 上，这些键传统上被操作系统或应用程序用作快捷键。以下是一些众所周知的功能键分配示例：

On Macs, traditionally the apps didn’t reach for function keys, as those were reserved solely for the users to do stuff with. (However, some combination of ⌃ and function keys are used by the operating system for accessibility options, and I occasionally see apps use function keys these days.)

在 Mac 上，应用程序传统上不会使用功能键，因为它们是专门留给用户使用的。（不过，操作系统会使用一些 ⌃ 和功能键的组合来实现辅助功能选项，而且我最近偶尔也会看到应用程序使用功能键。）

Windows keyboards top off at F12, but some Mac keyboards reuse the three special PC keys, and even take over the unnecessary Num Lock/​Caps Lock/​Scroll Lock island, and end up going up to F19:

Windows 键盘最高到 F12，但一些 Mac 键盘复用了三个特殊的 PC 键，甚至占用了不必要的 Num Lock/Caps Lock/Scroll Lock 区域，最终一直延伸到 F19：

In text fields, Apple has a system where pressing ⌥ with printing keys outputs more characters, for example ⌥Q outputs œ, and ⌥7 outputs a ¶ pilcrow. Additionally, ⇧ works in this context, so for example ⌥⇧Q outputs Œ, and ⌥⇧7 outputs a ‡ double dagger.

在文本字段中，Apple 有一套系统，按下 ⌥ 键配合可打印字符键可以输出更多字符，例如 ⌥Q 输出 œ，⌥7 输出 ¶（段落符号）。此外，⇧ 键在此上下文中也有效，例如 ⌥⇧Q 输出 Œ，⌥⇧7 输出 ‡（双剑号）。

Note that not only letters, but basically all printing keys have secret ⌥ and ⌥⇧ assignments. (Also note some of these are dead keys.)

请注意，不仅是字母，基本上所有可打印字符键都有隐藏的 ⌥ 和 ⌥⇧ 分配。（还要注意其中一些是死键。）

Also, ⌥ assignments vary per location! The above was U.S. English, here’s Poli

此外，⌥ 的分配因地区而异！以上是美式英语，这是波兰语