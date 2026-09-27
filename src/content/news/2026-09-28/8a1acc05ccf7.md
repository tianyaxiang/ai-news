---
title: "Don't couple your Go code to GitHub"
originalUrl: "https://iain.rocks/blog/dont-couple-your-go-code-to-github"
date: "2026-09-27T23:55:15.883Z"
---

# Don't couple your Go code to GitHub
# 不要将你的 Go 代码与 GitHub 强耦合

One of the good features of Go is that you namespace your code with the location to fetch the code. This means if you host your Go code at `http://github.com/thetrueares/boneclone` then you have the line `import “github.com/thetrueares/boneclone”` and Go will fetch it using git. This makes it super easy to know where to go to report bugs for open source libraries and really easy to fetch and distribute go libraries without a centralised package management system. For many, it’s literally the location of the git hosting, but this has some downsides, and you should use your own custom domain, and I’ll explain why.

Go 语言的一个优秀特性是，你可以通过代码的获取路径来对其进行命名空间管理。这意味着如果你将 Go 代码托管在 `http://github.com/thetrueares/boneclone`，那么你只需使用 `import “github.com/thetrueares/boneclone”`，Go 就会通过 git 获取它。这使得开发者能够非常轻松地找到开源库的 Bug 反馈地址，也无需中心化的包管理系统即可轻松获取和分发 Go 库。对许多人来说，这直接等同于 git 托管地址，但这存在一些弊端。你应该使用自己的自定义域名，我将在下文解释原因。

### Problem
### 问题

The main problem with using your git hosting location is that your code is now coupled to a hosting provider. That is, if you move your git hosting to GitLab then you have to change your code! Otherwise, you’ll be fetching the old version. This can result in you being unable to change git hosting provider because the amount of overhead in switching. So you literally end up with your code coupled to GitHub. Which sounds completely nuts, but it’s something that is pretty much defacto in the Go community.

使用 git 托管地址作为命名空间的主要问题在于，你的代码现在与特定的托管服务商绑定了。也就是说，如果你将 git 托管迁移到 GitLab，你就必须修改代码！否则，你获取的将是旧版本。这可能导致你因为切换成本过高而无法更换 git 托管服务商。最终，你的代码实际上被强耦合到了 GitHub 上。这听起来很疯狂，但这在 Go 社区中几乎已成为事实标准。

I’ve seen this problem become such a huge issue for a company that were using GitLab, GitHub, and Azure Devops at the same time because changing the location of the code was such a large task for them and they didn’t “have time” that it was easier for them to operate on three platforms. And is why I built Boneclone to handle skeleton code replication across multiple git hosting platforms at the same time. So this problem literally cost the company money since they had to pay for three hosting services at the same time.

我曾见过一家公司因此陷入巨大的困境，他们同时使用 GitLab、GitHub 和 Azure DevOps，因为修改代码路径对他们来说是一项艰巨的任务，且他们“没有时间”处理，以至于维持三个平台运行反而更简单。这也是我开发 Boneclone 的原因，它旨在处理跨多个 git 托管平台的骨架代码复制。因此，这个问题确实让该公司付出了金钱代价，因为他们不得不同时为三个托管服务付费。

### Solution
### 解决方案

The solution is to use custom domains such as `go.iain.rocks`, `go.uber.org`, `go.mongodb.org`, etc. This allows you to just change where those domains point to. For example, `go.iain.rocks/boneclone` points to `github.com/thetrueares/boneclone` and if I move to GitLab nothing will change for the end users the install command is the same.

解决方案是使用自定义域名，例如 `go.iain.rocks`、`go.uber.org`、`go.mongodb.org` 等。这允许你随时更改这些域名的指向。例如，`go.iain.rocks/boneclone` 指向 `github.com/thetrueares/boneclone`，如果我迁移到 GitLab，终端用户无需做任何改变，安装命令保持不变。

In my opinion, every commercial software development team using Go should be using custom domains for namespacing their internal libraries and packages. As it’s an easy way to avoid any pointless coupling.

在我看来，每个使用 Go 的商业软件开发团队都应该使用自定义域名来管理其内部库和包的命名空间。这是一种避免无谓耦合的简单方法。

Here is a copy of my configs so you can set it up for your projects too.
以下是我的配置副本，你可以将其应用到你的项目中。

#### Nginx.conf
```nginx
server {
    server_name go.iain.rocks;
    root /var/www/go.iain.rocks;
    index index.html;

    location / {
        # Check if the query string does NOT contain 'go-get=1'.
        # The '~' is for a case-sensitive match.
        if ($args !~ go-get=1) {
            # This is a human visitor. Issue a permanent redirect to GitHub.
            # $request_uri will be the path, e.g., /boneclone
            return 301 https://github.com/that-guy-iain$request_uri;
        }
        # If it's the Go tool (with ?go-get=1), serve the HTML file as before.
        try_files $uri $uri/ =404;
    }

    # --- Your SSL configuration from Certbot should remain here ---
    listen 443 ssl;
    listen [::]:443 ssl;
    ssl_certificate /etc/letsencrypt/live/go.iain.rocks/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/go.iain.rocks/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

# The HTTP to HTTPS redirect block should also remain.
server {
    listen 80;
    listen [::]:80;
    server_name go.iain.rocks;
    return 301 https://$host$request_uri;
}
```

#### index.html
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="go-import" content="go.iain.rocks/boneclone git https://github.com/that-guy-iain/boneclone">
    <meta name="go-source" content="go.iain.rocks/boneclone https://github.com/that-guy-iain/boneclone https://github.com/that-guy-iain/boneclone/tree/master{/dir} https://github.com/that-guy-iain/boneclone/blob/master{/dir}/{file}#L{line}">
</head>
<body>
</body>
</html>
```