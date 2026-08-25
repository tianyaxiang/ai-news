---
title: "Run OpenBSD on DigitalOcean for $4/month"
originalUrl: "https://nil.wallyjones.com/run-openbsd-on-digitalocean-for-4month/"
date: "2026-08-25T21:57:35.585Z"
---

# Run OpenBSD on DigitalOcean for $4/month
# 在 DigitalOcean 上以每月 4 美元的价格运行 OpenBSD

August 23, 2026
2026 年 8 月 23 日

My homepage now runs on OpenBSD with httpd(8) and Let's Encrypt via acme-client(1). I previously hosted it on GitHub Pages and then eventually moved to Cloudflare Pages because both options were free and easy. Free and easy is cool, and I understand that writing software full-time leaves us wanting absolutely nothing to do with computers after we punch out, but lately I have been missing the do-it-yourself web that I grew up with.
我的主页现在运行在 OpenBSD 上，使用 httpd(8) 和通过 acme-client(1) 获取的 Let's Encrypt 证书。我之前将其托管在 GitHub Pages 上，后来又迁移到了 Cloudflare Pages，因为这两个选项既免费又简单。免费且简单固然很好，我也理解全职编写软件会让人们在下班后完全不想再碰电脑，但最近我开始怀念我成长过程中那种“自己动手”的互联网氛围。

Some of my favorite times growing up included installing and configuring UNIX-based operating systems and spending hours trying to understand how computers worked. I even met one of my closest friends online through a FreeBSD UNIX shell account forum more than 20 years ago. So, in that vein, I wanted to write something on how you can get up and running on OpenBSD with DigitalOcean for $4 a month. Well, really, it's $4.24 after tax but that's still pretty good!
我成长过程中最喜欢的时光之一，就是安装和配置基于 UNIX 的操作系统，并花上几个小时去钻研计算机的工作原理。甚至在 20 多年前，我就通过一个 FreeBSD UNIX shell 账户论坛在网上结识了我最亲密的朋友之一。因此，出于这种情怀，我想写一篇关于如何以每月 4 美元的价格在 DigitalOcean 上运行 OpenBSD 的指南。好吧，实际上含税后是 4.24 美元，但这依然非常划算！

### Download OpenBSD
### 下载 OpenBSD

There are a few different options when it comes to downloading OpenBSD, but the quickest method is to grab the miniroot image.
下载 OpenBSD 有几种不同的选择，但最快的方法是获取 miniroot 镜像。

```bash
curl -O -O https://cdn.openbsd.org/pub/OpenBSD/7.9/amd64/{miniroot79.img,SHA256}
```

Confirm that the checksum of the image is correct.
确认镜像的校验和是否正确。

```bash
sha256sum -c --ignore-missing SHA256 miniroot79.img
miniroot79.img: OK
```

### Sign Up for DigitalOcean and Upload miniroot79.img
### 注册 DigitalOcean 并上传 miniroot79.img

Once you are signed up and logged in to DigitalOcean, go to Backups & Snapshots under the STORAGE section in the left-hand navigation. Click Upload an Image. Select the miniroot79.img file we downloaded earlier. Select a datacenter that makes sense for you. Select Other for the distribution (Hey, DigitalOcean, why no BSD distribution?). Give the custom image a name, something clever like "OpenBSD miniroot79". Finally, click the Add Custom Image button.
注册并登录 DigitalOcean 后，进入左侧导航栏 STORAGE 部分下的 Backups & Snapshots。点击 Upload an Image。选择我们之前下载的 miniroot79.img 文件。选择一个对你来说合适的机房。在发行版（distribution）选项中选择 Other（嘿，DigitalOcean，为什么没有 BSD 发行版选项？）。给自定义镜像起个名字，比如“OpenBSD miniroot79”这样聪明的名字。最后，点击 Add Custom Image 按钮。

**Note on Custom Images**
**关于自定义镜像的说明**

DigitalOcean will charge you for hosting custom images. Make sure you come back to this page to delete the image after your server is up and running.
DigitalOcean 会对托管自定义镜像收取费用。请确保在服务器运行起来后回到此页面删除该镜像。

### Create a Droplet
### 创建 Droplet

Click Droplets under the COMPUTE section in the left-hand nav. We are going to create the basic droplet that includes 512MB memory, 1vCPU, 500GB transfer, and 10GB of disk space. Select a datacenter region that makes sense for you. Choose the miniroot79.img file we uploaded earlier under the Custom Images tab. Choose the Basic plan. Under the Authentication section add an SSH Key. DigitalOcean does not actually add this key but it is required to create the droplet. Follow the instructions on how to create and add an SSH key. The rest of the options are up to you. Just a heads up, though, I have noticed that it won't let you create the droplet with IPv6 enabled. Finally, give your droplet a name and click Create Droplet. Notice the total cost of $4.00/month... nice, dude.
点击左侧导航栏 COMPUTE 部分下的 Droplets。我们将创建一个基础 droplet，包含 512MB 内存、1vCPU、500GB 流量和 10GB 磁盘空间。选择一个对你合适的机房区域。在 Custom Images 选项卡下选择我们之前上传的 miniroot79.img 文件。选择 Basic 计划。在 Authentication 部分添加一个 SSH 密钥。DigitalOcean 实际上并不会添加这个密钥，但创建 droplet 时必须提供它。请按照说明创建并添加 SSH 密钥。其余选项由你决定。不过提醒一下，我发现如果启用了 IPv6，它将不允许你创建 droplet。最后，给你的 droplet 起个名字并点击 Create Droplet。注意看总费用是每月 4.00 美元……真不错，伙计。

### Install OpenBSD
### 安装 OpenBSD

Go to your newly created droplet and click the Web Console button at the top right. You will see a modal pop-up about updating the droplet console. Just click the Launch Recovery Console button. This opens a new browser window that drops you into a console of the booted up miniroot79.img. Look at the blue on white text. Beautiful. Type `i` and press return.
进入你刚创建的 droplet，点击右上角的 Web Console 按钮。你会看到一个关于更新 droplet 控制台的弹窗。只需点击 Launch Recovery Console 按钮。这会打开一个新的浏览器窗口，让你进入已启动的 miniroot79.img 控制台。看看那蓝底白字，真美。输入 `i` 并回车。

For most of these questions we can go with the default option. Please select whatever makes sense for you, but I will try to walk you through a very basic setup. Just make sure you give your server a cool hostname. Select the `vio0` network interface. Select `autoconf` for IPv4 and IPv6 addresses. Select `[done]` afterwards because we can configure other interfaces later. Make sure you create a secure password for the root account. We do want to start `sshd(8)` by default so we can SSH into the server after installation. We do not expect to run the X Window System. This is a basic server, dude. Type `no`. Don't change the default console to `com0`.
对于大多数问题，我们可以选择默认选项。请根据你的需求进行选择，但我会尝试引导你完成一个非常基础的设置。确保给你的服务器起一个酷炫的主机名。选择 `vio0` 网络接口。为 IPv4 和 IPv6 地址选择 `autoconf`。之后选择 `[done]`，因为我们稍后可以配置其他接口。确保为 root 账户创建一个安全的密码。我们确实希望默认启动 `sshd(8)`，以便安装后可以通过 SSH 连接到服务器。我们不需要运行 X Window 系统，这只是个基础服务器，伙计。输入 `no`。不要将默认控制台更改为 `com0`。

Create a non-root user for yourself. Make sure you create a secure password. Type in your username. Do not allow root SSH login. Select the time zone appropriate for you. Select disk `sd0` for the root disk. You can type `?` if you wish to see the size of the disks. If you want full disk encryption, select `p` to encrypt the disk with a passphrase.
创建一个非 root 用户。确保创建一个安全的密码。输入你的用户名。不要允许 root 用户 SSH 登录。选择适合你的时区。选择 `sd0` 作为根磁盘。如果你想查看磁盘大小，可以输入 `?`。如果你需要全盘加密，选择 `p` 并设置一个密码短语。

**Note on Full Disk Encryption**
**关于全盘加密的说明**

This will require you to log in to DigitalOcean and launch the web console on the droplet to type in the passphrase every time you reboot the server. As far as I know there is no `fdesetup authrestart` equivalent on OpenBSD so installing kernel patches that require a reboot involve a little more work. To me this isn't a big inconvenience. There may also be arguments around the security of typing into the web console.
这意味着每次重启服务器时，你都需要登录 DigitalOcean 并启动 droplet 的 Web 控制台来输入密码短语。据我所知，OpenBSD 上没有类似 `fdesetup authrestart` 的功能，因此安装需要重启的内核补丁会稍微麻烦一点。对我来说，这不算什么大麻烦。关于在 Web 控制台中输入密码的安全性，可能也存在一些争议。

Use the `(W)hole disk MBR`. Type in your secure passphrase for the full disk encryption. Use the `(A)uto layout`. No need to initialize `sd1`. Press return for `[done]`.
使用 `(W)hole disk MBR`。输入你用于全盘加密的安全密码短语。使用 `(A)uto layout`。无需初始化 `sd1`。按回车选择 `[done]`。

Install the sets! Use `http`. We probably don't need a proxy but it's up to you. Use `?` to see a list of mirrors. Find the number for the mirror closest to the datacenter you selected for the droplet. Press `q` to get out of the pager. Type in the number of the mirror and press return. You should see the mirror in the brackets. Press return. Use the default directory `pub/OpenBSD/7.9/amd64`.
安装系统组件（sets）！使用 `http`。我们可能不需要代理，但这取决于你。使用 `?` 查看镜像列表。找到离你为 droplet 选择的机房最近的镜像编号。按 `q` 退出分页器。输入镜像编号并回车。你应该能在括号中看到该镜像。按回车。使用默认目录 `pub/OpenBSD/7.9/amd64`。

Since this is going to be a bare-bones web server we can remove most of the sets. You can type in `-x*` to remove all of the X server sets. Let's also remove the game `-gam*` and compiler `-com*` sets too. This should leave us with `bsd`, `bsd.rd`, `base79.tgz`, and `man79.tgz`. Press return since we are done. You should see signatures verified for the sets as they download. After the sets install we can select `[done]`.
由于这是一个精简的 Web 服务器，我们可以移除大部分组件。你可以输入 `-x*` 来移除所有 X server 组件。我们也可以移除游戏 `-gam*` 和编译器 `-com*` 组件。这样应该只剩下 `bsd`、`bsd.rd`、`base79.tgz` 和 `man79.tgz`。完成后按回车。你应该能看到下载时组件的签名验证过程。组件安装完成后，我们可以选择 `[done]`。

OpenBSD is now installed! Press return to reboot. If you decided to use full disk encryption you will be prompted for the passphrase now. You should see the `boot>` prompt after successfully entering the passphrase. You can either press return to boot or wait for the system to boot automatically. From here you can either continue to use the Web Console or SSH into the server. I would recommend SSH since a terminal is a bit more comfy.
OpenBSD 现在安装完成了！按回车重启。如果你决定使用全盘加密，现在系统会提示你输入密码短语。成功输入密码短语后，你应该会看到 `boot>` 提示符。你可以按回车启动，或者等待系统自动启动。从这里开始，你可以继续使用 Web 控制台，或者通过 SSH 连接到服务器。我建议使用 SSH，因为终端用起来更舒服。