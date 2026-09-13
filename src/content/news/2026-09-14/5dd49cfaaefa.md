---
title: "From Git to Fossil (2025)"
originalUrl: "https://lucio.albenga.es/web-en/posts/2025/from-git-to-fossil.html"
date: "2026-09-13T23:19:17.376Z"
---

# From Git to Fossil (2025)
# 从 Git 到 Fossil (2025)

From Git to Fossil People at Git has started to work on a proposal to make the Rust programming language mandatory. I don't like Rust and, above all, I don't like its community of little extremist characters who are trying to make everyone swallow their crap by rewriting projects that have been working for decades, doing social media brigading, and other nice little gems worthy of any tiny group with totalitarian delusions. That's why when I see that a project aims to "force" the use of or the switch from C to Rust, to the extent of my possibilities, I flee from it as if I were pursued by the Balrog of the Lord of the Rings with his whip.

Git 的相关人员已经开始着手一项提案，旨在将 Rust 编程语言设为强制要求。我不喜欢 Rust，最重要的是，我不喜欢它那个充满极端主义色彩的社区。他们试图通过重写那些已经运行了几十年的项目来强迫所有人接受他们的那一套，并在社交媒体上进行围攻，这些行为简直是任何带有极权妄想的小团体的典型特征。因此，每当我看到一个项目旨在“强制”使用或从 C 语言切换到 Rust 时，只要我能做到，我就会像被《指环王》中挥舞鞭子的炎魔追赶一样逃之夭夭。

I'm old enough to have used (or tested) many version control systems: RCS (Revision Control System), CVS (Concurrent Version System), SVN (Subversion), HG (Mercurial), BZR (Bazaar), and the aforementioned Git, which means I have no problem in switching again, so I started to think about a Git substitute for my personal projects. The options were to go back to one of the already known or look at something else, and I remembered Fossil. I started looking over the source code and reading the official documentation to learn its features, its dependencies, how to install and configure it, etc., and I noticed it had many things I like: It's made in C (although it uses some js and tcl for its web functionality) and is a small and efficient program that consumes few hardware resources.

我年纪够大，使用（或测试）过许多版本控制系统：RCS、CVS、SVN、HG、BZR 以及前面提到的 Git。这意味着我再次切换系统没有任何心理负担，所以我开始考虑为我的个人项目寻找一个 Git 的替代品。选择要么是回到以前熟悉的系统，要么看看别的，于是我想到了 Fossil。我开始查看其源代码并阅读官方文档以了解其功能、依赖项、安装和配置方法等。我发现它有很多我喜欢的地方：它是用 C 语言编写的（尽管其 Web 功能使用了一些 JS 和 Tcl），是一个占用硬件资源极少的小巧高效的程序。

It's simpler to use and it feels more natural (at least for someone who knows other systems such as Subversion) because it does not contain overkill functionalities such as the staging area, which may be useful in large and complex projects such as the Linux kernel, but for me they have no practical use. It allows you to self-host a server on your own quickly and easily because it is already prepared for it. In fact it has a web server and a web interface with version control views, wiki, tickets, etc. On the other hand, with Git you have to use an external software such as GitLab, Gitea or Forgejo, and each one of them is at least one extra software dependency.

它使用起来更简单，感觉更自然（至少对于熟悉 Subversion 等其他系统的人来说），因为它不包含像“暂存区”（staging area）这样过度设计的功能。这些功能对于 Linux 内核这样庞大而复杂的项目可能很有用，但对我来说毫无实际用途。它允许你快速轻松地自托管服务器，因为它本身就已经为此做好了准备。事实上，它内置了一个 Web 服务器和 Web 界面，提供版本控制视图、Wiki、工单系统等。相比之下，使用 Git 时，你必须使用 GitLab、Gitea 或 Forgejo 等外部软件，而每一个都是额外的软件依赖。

Commit messages don't use email addresses, they use user names so if you have a public repository you don't have to be worried about spam and you don't need a specific email address for this use only. It's interoperable with Git in the sense that if there is a need to change a repository back to Git you can do it and it also supports two-way synchronization between a Fossil repository and a Git one (this is the functionality used by Fossil and Sqlite projects to manage their GitHub mirrors). Taking all this into account, I decided to install Fossil and switch my projects from Git. Below you'll see how to do it.

提交信息不使用电子邮件地址，而是使用用户名，因此如果你拥有一个公共仓库，就不必担心垃圾邮件，也不需要为此专门准备一个电子邮件地址。它与 Git 具有互操作性，如果需要将仓库改回 Git，你可以随时操作；它还支持 Fossil 仓库与 Git 仓库之间的双向同步（Fossil 和 Sqlite 项目正是利用此功能来管理它们的 GitHub 镜像）。考虑到所有这些因素，我决定安装 Fossil 并将我的项目从 Git 迁移过来。下面你将看到具体的操作方法。

### Installing Fossil / 安装 Fossil

The first step is to install Fossil and it's quite likely that the package manager of your operating system already has it available:
第一步是安装 Fossil，你的操作系统包管理器很可能已经提供了它：

```bash
sudo apt install fossil # Devuan GNU+Linux
pkg install fossil # FreeBSD
```

Once your package manager ends the installation you can check its availability with the following command:
当包管理器完成安装后，你可以通过以下命令检查其是否可用：

```bash
fossil version
```

The command above should return something like the following:
上述命令应该返回类似以下内容：

```text
This is fossil version 2.21 [3c53b6364e] 2023-02-26 19:24:24 UTC
```

### Importing Git repositories / 导入 Git 仓库

Fossil's documentation has the following example to export a Git repository and import it as a Fossil repository:
Fossil 的文档提供了以下示例，用于导出 Git 仓库并将其导入为 Fossil 仓库：

```bash
cd repository
git fast-export --all | fossil import --git repository.fossil
```

I did it differently because I wanted to adjust some things to have the imported repositories "right". As I have several repositories I created two different folders, one, git-exported, to store the exported repositories and another one, fossils, to store the new Fossil repositories:
我的做法略有不同，因为我想调整一些设置，以确保导入的仓库“正确”。由于我有多个仓库，我创建了两个不同的文件夹：一个名为 `git-exported` 用于存储导出的仓库，另一个名为 `fossils` 用于存储新的 Fossil 仓库：

```bash
mkdir ~/git-exported
mkdir ~/fossils
```

Once you have exported all your Git repositories you should go inside the ~/fossils folder and import them one by one with the command:
导出所有 Git 仓库后，你应该进入 `~/fossils` 文件夹，并使用以下命令逐个导入它们：

```bash
fossil import --git \
  --rename-master trunk \
  --attribute "your@mail.com your_username" \
  repository.fossil ~/git-exported/repository.export
```

The --rename-master trunk option renames your Git master branch as trunk in your new Fossil repository. Fossil, like other version control systems such as Subversion, uses trunk as the name of the master branch. If you are among the unfortunate ones who have their master branch named as "main" this option is not for you and you should check Fossil's documentation if you want to rename it.
`--rename-master trunk` 选项会将你 Git 中的 `master` 分支重命名为新 Fossil 仓库中的 `trunk`。Fossil 和 Subversion 等其他版本控制系统一样，使用 `trunk` 作为主分支名称。如果你不幸将主分支命名为 `main`，则此选项不适用，如果需要重命名，请查阅 Fossil 文档。

The --attribute "your@mail.com your_username" option changes the email address "your@mail.com" from Git commits to "your_username" in the imported Fossil commits. In Fossil the default username is the same as the one you're currently using in you operating system. Obviously the given email address should exist in one or more commit messages. If you want to change more than one email address you can do it using several --attribute options:
`--attribute "your@mail.com your_username"` 选项会将 Git 提交中的电子邮件地址 "your@mail.com" 更改为导入的 Fossil 提交中的 "your_username"。在 Fossil 中，默认用户名与你当前操作系统使用的用户名相同。显然，所提供的电子邮件地址必须存在于一条或多条提交信息中。如果你想更改多个电子邮件地址，可以使用多个 `--attribute` 选项：

```bash
fossil import --git \
  --rename-master trunk \
  --attribute "your@mail.com your_username" \
  --attribute "rms@gnu.org rms" \
  --attribute "linus@kernel.org torvalds" \
  repository.fossil ~/git-exported/repository.export
```

The output of the import command looks like the following:
导入命令的输出如下所示：

```text
Rebuilding repository meta-data... 100.0% complete...
Vacuuming... ok
project-id: e64b112b40eb3db188060ddb8deeaa96a6ad3b71
server-id: bfbcd4bf8f0f64eaa2d832ddc3b4af00639624a6
admin-user: your_user (password is "XAxPVZcNQ6")
```

If you look closely, the output gives you the repository administrator's user and password. Keep it because you'll need it to do certain things on your repository.
仔细观察，输出中提供了仓库管理员的用户名和密码。请妥善保存，因为你在对仓库执行某些操作时会用到它。

### Setting Up a Fossil Server / 设置 Fossil 服务器

Fossil has an embedded web server so you can take advantage of it to create a self-hosted server quickly and easily. The following method is enough for a system with few users, in a private network that cannot be accessed from the outside. There are different ways to set up a Fossil server and some are better than others.
Fossil 内置了一个 Web 服务器，因此你可以利用它快速轻松地创建自托管服务器。对于用户较少且无法从外部访问的私有网络系统，以下方法已足够。设置 Fossil 服务器有多种方式，有些方式比其他方式更好。