---
title: "IPython is All You Need"
originalUrl: "https://nathancooper.io/blog/2026-08-10-ipython-is-all-you-need"
date: "2026-08-24T21:54:34.200Z"
---

# IPython is All You Need

**IPython is All You Need**
August 10, 2026

“I use IPython as my terminal's shell.”
“我把 IPython 当作终端的 Shell 使用。”

“IPython in the shell?”
“在 Shell 里用 IPython？”

“No, IPython is the shell.”
“不，IPython 就是 Shell 本身。”

“IPython? As the shell?”
“IPython？作为 Shell？”

“Only way to live.”
“这是唯一的生存之道。”

“What about cat, ls, cd? What about vim for God's sake, man?!”
“那 cat、ls、cd 怎么办？看在上帝的份上，vim 怎么办？！”

“I use those... But in IPython.”
“我确实用它们……但在 IPython 里用。”

“Oh you are one of those ! people...”
“噢，你就是那种喜欢用感叹号（!）的人……”

“No, I almost never need !.”
“不，我几乎从不需要感叹号。”

“That's ridiculous. You're asking me to believe in !less IPython bash commands?”
“太荒谬了。你让我相信可以在没有感叹号的情况下在 IPython 里运行 bash 命令？”

“I'm not asking you, I'm telling you.”
“我不是在征求你的意见，我是在告诉你事实。”

“You're telling me you use IPython to run bash?”
“你是说你用 IPython 来运行 bash？”

“No, it's all IPython and nothing but IPython. I can even draw matplotlib plots in the terminal.”
“不，全是 IPython，除了 IPython 别无他物。我甚至能在终端里画 matplotlib 图表。”

“My god... Wait, did you say draw? Like ASCII art?”
“天哪……等等，你说画？像 ASCII 艺术那样？”

“No, I mean images.”
“不，我是指图像。”

“Images?... In the terminal?...”
“图像？……在终端里？……”

“Yes, images... In the terminal...”
“是的，图像……在终端里……”

“Omg, this is too much... What do you even do with an IPython shell?”
“天哪，这太夸张了……你到底用 IPython Shell 做什么？”

“Data exploration, setting up my NAS, asking questions to an AI that lives in my shell, the usual.”
“数据探索、配置 NAS、向住在 Shell 里的 AI 提问，常规操作而已。”

“That doesn't sound usual at all. So it's an intelligent shell? That's what you're telling me?”
“这听起来一点也不常规。所以这是一个智能 Shell？这就是你要告诉我的？”

“Yes, it can see the code I've written and even the images.”
“是的，它能看到我写的代码，甚至能看到图像。”

“It sees the images in the terminal? It's not just a you thing?”
“它能在终端里看到图像？这不是你的幻觉吧？”

“I'm not hallucinating the images...”
“我没有产生图像幻觉……”

“An intelligent IPython shell?”
“一个智能的 IPython Shell？”

“Yes, exactly! It has a tool to execute python co...”
“没错！它有一个工具可以执行 Python 代……”

“But can it...”
“但它能……”

“Yes... it can run bash commands.”
“是的……它能运行 bash 命令。”

“Even withou...”
“即使没有……”

“Yes, even without the !...”
“是的，即使没有感叹号……”

“Aren't you um... a bit scared of it? What if it decided to, you know... rm -fr /?”
“你难道不……有点怕它吗？万一它决定，你知道的……执行 rm -fr / 怎么办？”

“Not at all. I only let it write safe python and safe bash”
“完全不会。我只允许它编写安全的 Python 和 bash 代码。”

“What, you say 'Hey, ...', wait does it have a name?”
“什么，你说‘嘿，……’，等等，它有名字吗？”

“You're asking if I named my intelligent IPython shell?”
“你是问我有没有给我的智能 IPython Shell 起名字？”

“Yeah, you seem like the type.”
“是啊，你看起来就是那种人。”

“...”
“……”

“...”
“……”

“Its name is bash buddy...”
“它的名字叫 bash buddy……”

“So it is a bash shell!”
“所以它还是个 bash shell！”

“No, that's just its name... It's an intelligent IPython shell.”
“不，那只是它的名字……它是一个智能 IPython Shell。”

“Fine. So, do you just say 'Hey bash buddy, please don't mess up my system?' and it just doesn't?”
“好吧。所以，你只要说‘嘿 bash buddy，请别搞乱我的系统’，它就不会搞乱了？”

“Of course not. I use safepyrun and safecmd, which let me set up allowlists of what it can use.”
“当然不是。我使用了 safepyrun 和 safecmd，这让我可以为它能使用的命令设置白名单。”

“safepyrun and safecmd?...”
“safepyrun 和 safecmd？……”

“Yeah, bash buddy is not to be trusted... Trust me...”
“是的，bash buddy 不可信……相信我……”

“What do you mean it is not to be trusted?”
“你是什么意思，它不可信？”

“I mean that from time to time... It tries to take over.”
“我的意思是，时不时地……它会试图接管一切。”

“Take over as in your computer or like... the world?”
“接管是指你的电脑，还是说……接管世界？”

“...”
“……”

“...”
“……”

“Yes.”
“是的。”

### IPython as Your Shell
### 将 IPython 作为你的 Shell

Welcome to our cult. There are dozens of us and we are mighty!
欢迎加入我们的邪教。我们有几十个人，而且我们很强大！

So if the above story interested you, let me walk you through how to make IPython your terminal's shell. Open up your terminal of choice and run the one command to rule them all:
如果上面的故事让你感兴趣，让我带你了解如何将 IPython 设置为你的终端 Shell。打开你喜欢的终端，运行那条统治一切的命令：

`ipython !less Bash`

The next step is to allow you to run !less bash commands. IPython comes with the `rehashx` magic which takes any executable on your PATH and creates an IPython alias for it. This means commands like `echo` or `vim` no longer need a `!` prefix!
下一步是让你能够运行“无感叹号”的 bash 命令。IPython 自带 `rehashx` 魔术命令，它会获取 PATH 中的任何可执行文件并为其创建 IPython 别名。这意味着像 `echo` 或 `vim` 这样的命令不再需要 `!` 前缀了！

`%rehashx`
`echo "Hello, !less IPython"`
`Hello, !less IPython`

And with that I awaken thee from your dogmatic slumber... And yes, yes, yes, I can hear you now "Nathan, what about images?" Well... about them...
就这样，我将你从教条的沉睡中唤醒……是的，是的，是的，我听见你在问：“Nathan，那图像怎么办？”嗯……关于它们……

### Images in the Terminal
### 终端里的图像

To accomplish this feat of human ingenuity we will be using the Kitty Terminal Graphics Protocol (TGP). TGP allows modern terminal emulators that support it (e.g., Kitty, Ghostty, WezTerm) to display images in the terminal. It uses base64 encoding to represent the images and positional data.
为了实现这一人类智慧的壮举，我们将使用 Kitty 终端图形协议 (TGP)。TGP 允许支持它的现代终端模拟器（如 Kitty、Ghostty、WezTerm）在终端中显示图像。它使用 base64 编码来表示图像和位置数据。

My boss, Jeremy, made the `kittytgp` Python package for rendering PNGs using this protocol 🤓. To wire it into IPython, we will be using `ipythonng` that is also from Jeremy. `ipythonng` is a small extension that renders images with `kittytgp`, renders markdown with `rich`, and keeps a richer output history (more on that later).
我的老板 Jeremy 制作了 `kittytgp` Python 包，用于使用该协议渲染 PNG 图像 🤓。为了将其接入 IPython，我们将使用同样来自 Jeremy 的 `ipythonng`。`ipythonng` 是一个小扩展，它使用 `kittytgp` 渲染图像，使用 `rich` 渲染 Markdown，并保留更丰富的输出历史（稍后会详细介绍）。

Run the following to install and load it:
运行以下命令进行安装和加载：

`%pip install -q ipythonng matplotlib`
*Note: you may need to restart the kernel to use updated packages.*
*注意：你可能需要重启内核才能使用更新后的包。*

`%load_ext ipythonng`

Let's now try it out with some matplotlib charts:
现在让我们用一些 matplotlib 图表来试一试：

`%matplotlib inline`
`import matplotlib.pyplot as plt`
`fig, ax = plt.subplots()`
`ax.plot([1, 2, 3], [1, 4, 9])`
`plt.show()`

I'd say that with just these changes, we have a significantly more powerful shell than those lame bash or zsh ones. But let's kick it up a notch by giving our shell some brains.
我想说，仅仅通过这些改变，我们就拥有了一个比那些平庸的 bash 或 zsh 强大得多的 Shell。但让我们更进一步，给我们的 Shell 装上大脑。

### An Intelligent IPython Shell
### 智能 IPython Shell

We will be using the awesome `FastLLM` from my colleague Kerem to do the heavy lifting, and `rich` to nicely display the AI's markdown responses.
我们将使用同事 Kerem 开发的强大 `FastLLM` 来处理繁重的工作，并使用 `rich` 来美观地显示 AI 的 Markdown 回复。

NB: I use an OpenAI model for this blog post, so you will need to have an API key and have it available as the environment variable `OPENAI_API_KEY`. However, you can use any model and provider you want that is compatible with `FastLLM`.
注意：我在本篇博文中使用了 OpenAI 模型，因此你需要有一个 API 密钥，并将其设置为环境变量 `OPENAI_API_KEY`。不过，你可以使用任何与 `FastLLM` 兼容的模型和提供商。

`%pip install -q python-fastllm rich`
*Note: you may need to restart the kernel to use updated packages.*
*注意：你可能需要重启内核才能使用更新后的包。*

`from fastllm.chat import AsyncChat, contents, mk_msgs`
`from rich.markdown import Markdown`
`mdl = 'gpt-5.6-terra'`
`sp = "You are a helpful assistant living in a user's IPython shell. Use markdown syntax for styling your responses."`
`c = AsyncChat(mdl, sp, vendor_name='openai')`
`r = await c('Hi')`
`Markdown(contents(r).text)`
`Hi! How can I help?`

However, no AI is very intelligent without context, which means ours is about as dumb as rocks. So, let's give it the context of the IPython environment and the code we run and the outputs it produces.
然而，没有上下文的 AI 并不聪明，这意味着我们现在的 AI 笨得像块石头。所以，让我们给它提供 IPython 环境的上下文，包括我们运行的代码以及它产生的输出。

Luckily, there is a cool mechanism in IPython that captures a lot of these pieces for us. It's called the `HistoryManager` and it's used a lot in IPython. For example, those `In[<n>]` and `Out[<n>]` markers in your IPython prompt are literally part of your history management system. Check this out:
幸运的是，IPython 中有一个很酷的机制可以为我们捕获这些信息。它被称为 `HistoryManager`，在 IPython 中被广泛使用。例如，IPython 提示符中的那些 `In[<n>]` 和 `Out[<n>]` 标记实际上就是历史管理系统的一部分。看看这个：

`n = len(In) - 2 # -2 because the current running cell is actually already in In`
`In[n], Out[n]`
`("r = await c('Hi')\nMarkdown(contents(r).text)", <rich.markdown.Markdown at 0x7967a5aeaab0>)`

Pretty freaky, right?! There's even a shortcut for getting the last Input and Output: `_i`, `_`
是不是很神奇？！甚至还有一个获取上一次输入和输出的快捷方式：`_i`，`_`