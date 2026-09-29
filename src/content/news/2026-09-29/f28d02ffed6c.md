---
title: "Hijacking the PS5's RTMP Stream"
originalUrl: "https://yashgarg.dev/posts/hijacking-ps5-rtmp-stream/"
date: "2026-09-29T01:11:39.164Z"
---

# Hijacking the PS5's RTMP Stream
# 劫持 PS5 的 RTMP 推流

**Contents**
1. The Problem
2. Remote Play
3. How PS5 Streaming Works
4. Finding the Right Hostname
5. DNS Trick
6. Receiving the Stream
7. Watching It

**目录**
1. 问题所在
2. 远程游玩 (Remote Play)
3. PS5 推流原理
4. 寻找正确的主机名
5. DNS 欺骗技巧
6. 接收推流
7. 观看直播

Sony has progressively locked down what you can do with the PS5’s hardware. Streaming is a good example: the console gives you a nice, convenient “Broadcast” button, but the moment you want to do anything outside the handful of services Sony supports, it gets annoying very fast. Third-party Bluetooth devices are the same story! Sony locks the wireless stack to their own peripherals, so your headphones or controllers from other brands simply won’t pair :/

索尼一直在逐步限制 PS5 硬件的使用权限。推流就是一个很好的例子：主机提供了一个方便的“广播”按钮，但一旦你想在索尼支持的少数服务之外做任何事情，就会变得非常麻烦。第三方蓝牙设备也是如此！索尼将无线协议栈锁定在自家的外设上，导致其他品牌的耳机或手柄根本无法配对 :/

### #The Problem
I often stream games with friends on Discord who watch me play, but the PS5 doesn’t support screen sharing to Discord. The obvious fix is a capture card — plug the HDMI output into a capture card, feed it into OBS on your Mac, stream from there. But decent ones aren’t cheap, and I didn’t want to spend upwards of $100 just for this.

### #问题所在
我经常在 Discord 上向朋友直播游戏，但 PS5 不支持向 Discord 共享屏幕。最直接的解决方法是使用采集卡——将 HDMI 输出接入采集卡，再输入到 Mac 上的 OBS 中进行推流。但质量尚可的采集卡并不便宜，我不想为了这个功能花费超过 100 美元。

### #Remote Play
Remote Play somewhat worked for me. I could connect the PS5 to my MacBook, share the Mac’s screen to Discord and play from there. The problem is that you need to connect everything to the Remote Play device: controller, earphones, etc. I also occasionally ran into input lag, and the stream quality is entirely controlled by the PS5. You can’t really configure anything. I didn’t want to change my physical setup every time I wanted to stream.

### #远程游玩 (Remote Play)
“远程游玩”对我来说勉强可行。我可以将 PS5 连接到 MacBook，将 Mac 屏幕共享到 Discord 并进行游戏。问题在于你需要将所有设备（手柄、耳机等）都连接到运行远程游玩的设备上。此外，我偶尔会遇到输入延迟，且流媒体质量完全由 PS5 控制，你几乎无法进行任何配置。我不想每次想直播时都去折腾物理连接。

### #How PS5 Streaming Works
The PS5 supports streaming to YouTube and Twitch by default if you’re signed into those accounts. The protocol used for this is RTMP, or Real-Time Messaging Protocol, which is commonly used for live audio/video streaming. So when you start a broadcast, the PS5 roughly does this: What if we could make our own device act as Twitch and receive that RTMP stream instead? That’s the idea. The PS5 doesn’t hardcode Twitch’s IP, it looks it up via DNS every time. If we control what DNS returns, we control where the stream goes.

### #PS5 推流原理
如果你登录了 YouTube 和 Twitch 账号，PS5 默认支持向这些平台推流。其使用的协议是 RTMP（实时消息传输协议），这是直播音视频常用的协议。因此，当你开始广播时，PS5 大致会执行以下操作：如果我们能让自己的设备伪装成 Twitch 并接收该 RTMP 流呢？这就是核心思路。PS5 并没有硬编码 Twitch 的 IP 地址，而是每次都通过 DNS 进行查询。如果我们能控制 DNS 的返回结果，就能控制推流的去向。

### #Finding the Right Hostname
The obvious first attempt was to spoof ingest.twitch.tv directly. That’s the hostname the PS5 resolves when you hit broadcast, so pointing it at the Mac should work, right? Not quite. ingest.twitch.tv:443 is actually a discovery endpoint, not the RTMP server itself. PS5 makes an HTTPS call to it asking “which regional ingest server should I use?” and Twitch responds with something like ap-southeast-1.prod.fi.contribute.live-video.net. Then the PS5 pushes the actual stream there. Spoofing that hostname ran into a different problem: the actual Twitch ingest uses RTMPS (RTMP over TLS on port 443), and PS5 validates the certificate against trusted CAs. A self-signed cert doesn’t work, and there’s no way to install custom CAs on a PS5.

### #寻找正确的主机名
最直接的尝试是直接欺骗 `ingest.twitch.tv`。这是 PS5 在你点击广播时解析的主机名，所以将其指向 Mac 应该可行，对吧？并非如此。`ingest.twitch.tv:443` 实际上是一个发现端点，而不是 RTMP 服务器本身。PS5 会向其发起 HTTPS 调用，询问“我应该使用哪个区域的接入服务器？”，Twitch 会返回类似 `ap-southeast-1.prod.fi.contribute.live-video.net` 的地址。然后 PS5 会将实际的流推送到那里。欺骗该主机名遇到了另一个问题：真正的 Twitch 接入点使用 RTMPS（基于 TLS 的 RTMP，端口 443），而 PS5 会根据受信任的 CA 验证证书。自签名证书无法通过验证，且 PS5 无法安装自定义 CA。

I then tried YouTube as a workaround. Its RTMP ingest uses plain RTMP on port 1935, so there was no TLS certificate to deal with. The PS5 happily sent the stream to my Mac, so I knew the basic approach worked. The problem was that PS5 periodically checks YouTube’s API to make sure the stream is actually live. Since YouTube never received the stream, that check failed and it stopped broadcasting after about 60 seconds. That meant I needed to find a Twitch endpoint that used plain RTMP. The answer came from watching DNS logs while broadcasting:

随后我尝试用 YouTube 作为替代方案。它的 RTMP 接入点使用 1935 端口的普通 RTMP，因此无需处理 TLS 证书。PS5 顺利地将流发送到了我的 Mac，所以我知道这个基本思路是可行的。问题在于 PS5 会定期检查 YouTube 的 API 以确保直播确实在线。由于 YouTube 没有收到流，检查失败，广播在大约 60 秒后停止。这意味着我需要找到一个使用普通 RTMP 的 Twitch 端点。答案来自于在广播时观察 DNS 日志：

```bash
sudo tail -f /tmp/dnsmasq.log
# Sep 22 23:20:28 dnsmasq: query[A] ingest.global-contribute.live-video.net from 192.168.8.171
# Sep 22 23:20:28 dnsmasq: reply aps30.contribute.live-video.net is 35.55.13.0
```

The PS5 was resolving `ingest.global-contribute.live-video.net`, which chains down to `aps30.contribute.live-video.net`. That’s the real RTMP server. Spoofing `contribute.live-video.net` covers all subdomains and redirects the actual stream to the Mac without any certificate issues.

PS5 解析的是 `ingest.global-contribute.live-video.net`，它会进一步指向 `aps30.contribute.live-video.net`。这才是真正的 RTMP 服务器。欺骗 `contribute.live-video.net` 可以覆盖所有子域名，并将实际的流重定向到 Mac，且不会出现任何证书问题。

### #DNS Trick
The setup has two main parts: `dnsmasq` and `nginx-rtmp`. I built a small macOS menu bar app that bundles both and manages them. I run `dnsmasq` on my Mac and configure it to resolve Twitch’s ingest domains to my Mac’s LAN address:

### #DNS 欺骗技巧
该设置主要包含两部分：`dnsmasq` 和 `nginx-rtmp`。我编写了一个小型 macOS 菜单栏应用，将两者打包并进行管理。我在 Mac 上运行 `dnsmasq`，并将其配置为将 Twitch 的接入域名解析为我 Mac 的局域网地址：

```text
server=1.1.1.1
server=8.8.8.8
# Redirect Twitch ingest traffic to the Mac
address=/contribute.live-video.net/192.168.8.175
address=/ingest.global-contribute.live-video.net/192.168.8.175
... (other addresses)
```

192.168.8.175 is my Mac’s IP. When the PS5 asks DNS for one of these Twitch endpoints, `dnsmasq` returns my Mac’s IP instead. The PS5 connects to my Mac thinking it’s Twitch. The last piece is pointing the PS5 at this DNS server. I have a GL.iNet router running OpenWRT, so I configured it to hand my Mac’s IP as the DNS server specifically for the PS5’s DHCP lease.

192.168.8.175 是我 Mac 的 IP。当 PS5 向 DNS 查询这些 Twitch 端点时，`dnsmasq` 会返回我 Mac 的 IP。PS5 会误以为连接的是 Twitch。最后一步是将 PS5 指向这个 DNS 服务器。我有一台运行 OpenWRT 的 GL.iNet 路由器，我将其配置为专门为 PS5 的 DHCP 租约分配我 Mac 的 IP 作为 DNS 服务器。

```bash
# SSH into the router and run:
uci add_list dhcp.lan.dhcp_option="tag:PS5,6,192.168.8.175"
uci commit dhcp
/etc/init.d/dnsmasq restart
```

The `tag:PS5` part works because the PS5’s static lease already has that tag set in `/etc/config/dhcp`. Option 6 is the DHCP option for DNS server. The PS5 picks this up on its next DHCP renewal, no manual DNS configuration is required on the console!

`tag:PS5` 部分之所以有效，是因为 PS5 的静态租约已经在 `/etc/config/dhcp` 中设置了该标签。选项 6 是 DHCP 的 DNS 服务器选项。PS5 在下一次 DHCP 续租时会自动获取此设置，无需在主机上手动配置 DNS！

### #Receiving the Stream
For that, I’m using `nginx-rtmp`:

### #接收推流
为此，我使用了 `nginx-rtmp`：

```nginx
rtmp {
    server {
        listen 1935;
        application ps5 {
            live on;
            record off;
            # Notify our app when a stream starts
            on_publish http://127.0.0.1:9988/on_publish;
        }
    }
}
```

The `on_publish` callback is how the menu bar app detects when the PS5 starts broadcasting. nginx fires a POST to localhost:9988 with the stream name, and the app...

`on_publish` 回调是菜单栏应用检测 PS5 何时开始广播的方式。nginx 会向 `localhost:9988` 发送一个包含流名称的 POST 请求，然后应用会……