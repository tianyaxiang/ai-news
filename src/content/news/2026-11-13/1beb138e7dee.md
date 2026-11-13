---
title: "Hijacking Samsung TV Smart Hub Ads"
originalUrl: "https://dvratil.cz/2026/11/hijacking-samsung-tv-smart-hub-ads/"
date: "2026-11-12T11:08:45.000Z"
excerpt: false
---

# Hijacking Samsung TV Smart Hub Ads

I have a Samsung smart TV from 2022. At some point, the Smart Hub started displaying ads. I think it’s absolutely disgusting that a device that I paid for and own, and that doesn’t use any additional Samsung “free” services is forcing ads on me, just to generate additional revenue for Samsung from an already-sold device. I was blocking the ads via my Pi-hole instance, until I was tinkering with my homelab and networking setup not that long ago and broke something. That caused the ads to start appearing again, which reminded me of their existence.

我有一台 2022 年产的三星智能电视。在某个时间点，Smart Hub 开始显示广告。我认为，对于一台我付费购买且拥有所有权、且未使用任何额外三星“免费”服务的设备，三星强行向我推送广告以从已售出的设备中获取额外收入，这种做法绝对令人反感。我曾通过我的 Pi-hole 实例屏蔽这些广告，直到不久前我在折腾家庭实验室和网络设置时弄坏了某些东西。这导致广告再次出现，也提醒了我它们的存在。

Around the same time, the eMudhra CA certificate fiasco took place, and the “compromised” private key was added to mitmproxy. mitmproxy is an open-source project for inspecting, replaying and modifying HTTP(S) network traffic. Normally, in order for it to be able to intercept TLS-encrypted traffic, the “victim” device must trust a custom certificate created by mitmproxy - this way mitmproxy can decrypt the traffic, inspect it, and then re-encrypt it using a real certificate before forwarding it to the intended destination. Unfortunately, some devices don’t allow adding custom SSL certificates to their truststore - like my Samsung TV.

大约在同一时间，发生了 eMudhra CA 证书风波，其“被泄露”的私钥被添加到了 mitmproxy 中。mitmproxy 是一个用于检查、重放和修改 HTTP(S) 网络流量的开源项目。通常情况下，为了能够拦截 TLS 加密流量，“受害者”设备必须信任由 mitmproxy 创建的自定义证书——这样 mitmproxy 才能解密流量、进行检查，并在转发到目标地址之前使用真实证书重新加密。不幸的是，有些设备不允许在其信任存储中添加自定义 SSL 证书，比如我的三星电视。

Intercepting TV traffic with mitmproxy
Mikrotik configuration (adapt to your router as needed)
# 192.168.0.7 is my raspberry-pi with mitmproxy 
# 192.168.0.9 is my Samsung TV 
/routing/table add name=tv-proxy fib 
/ip/route add dst-address=0.0.0.0/0 gateway=192.168.0.7 routing-table=tv-proxy 
/routing/rule add src-address=192.168.0.9/32 action=lookup-only-in-table table=tv-proxy 
/ip/firewall/filter add chain=forward action=accept src-address=192.168.0.9 connection-state=established,related 
add chain=forward action=accept dst-address=192.168.0.9 connection-state=established,related 

使用 mitmproxy 拦截电视流量
Mikrotik 配置（根据需要适配您的路由器）
# 192.168.0.7 是运行 mitmproxy 的树莓派
# 192.168.0.9 是我的三星电视
/routing/table add name=tv-proxy fib 
/ip/route add dst-address=0.0.0.0/0 gateway=192.168.0.7 routing-table=tv-proxy 
/routing/rule add src-address=192.168.0.9/32 action=lookup-only-in-table table=tv-proxy 
/ip/firewall/filter add chain=forward action=accept src-address=192.168.0.9 connection-state=established,related 
add chain=forward action=accept dst-address=192.168.0.9 connection-state=established,related 

Raspberry-Pi configuration
sudo iptables -I FORWARD 1 -s 192.168.0.9 -j ACCEPT 
sudo iptables -I FORWARD 1 -d 192.168.0.9 -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT 
sudo iptables -t nat -A PREROUTING -i eth0 -s 192.168.0.9 -p tcp --dport 80 -j REDIRECT --to-port 8080 
sudo iptables -t nat -A PREROUTING -i eth0 -s 192.168.0.9 -p tcp --dport 443 -j REDIRECT --to-port 8080 
sudo iptables -t nat -A POSTROUTING -s 192.168.0.9/32 -o eth0 -j MASQUERADE 
mitmproxy configuration
uvx --from mitmproxy mitmweb --web-port 8083 -p 8081 --emudhra --ssl-insecure --mode transparent --set stream_large_bodies=1m 

树莓派配置
sudo iptables -I FORWARD 1 -s 192.168.0.9 -j ACCEPT 
sudo iptables -I FORWARD 1 -d 192.168.0.9 -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT 
sudo iptables -t nat -A PREROUTING -i eth0 -s 192.168.0.9 -p tcp --dport 80 -j REDIRECT --to-port 8080 
sudo iptables -t nat -A PREROUTING -i eth0 -s 192.168.0.9 -p tcp --dport 443 -j REDIRECT --to-port 8080 
sudo iptables -t nat -A POSTROUTING -s 192.168.0.9/32 -o eth0 -j MASQUERADE 
mitmproxy 配置
uvx --from mitmproxy mitmweb --web-port 8083 -p 8081 --emudhra --ssl-insecure --mode transparent --set stream_large_bodies=1m 

With the eMudhra certificate being exposed, anyone can now create a custom SSL certificate for an arbitrary domain (let’s say a Samsung ad network domain), sign it with the compromised CA certificate, and all devices that have the eMudhra CA certificate in their truststores will trust the custom SSL certificate. This is why software vendors were racing (some more, some less) to revoke the certificate from their truststores, so that browsers, computers and smart phones wouldn’t be susceptible to this kind of attack. Luckily for me, Samsung did not yet release an update for my TV that would revoke the certificate. This allowed me to route all traffic from the TV through mitmproxy and get a list of all the domains and endpoints that my TV talks to, but also see the structure of the requests and response payloads.

随着 eMudhra 证书的泄露，任何人现在都可以为任意域名（比如三星的广告网络域名）创建自定义 SSL 证书，并使用该被泄露的 CA 证书进行签名。所有在其信任存储中包含 eMudhra CA 证书的设备都会信任这个自定义 SSL 证书。这就是为什么软件供应商竞相（程度不一）从其信任存储中撤销该证书，以防止浏览器、计算机和智能手机受到此类攻击。幸运的是，三星尚未为我的电视发布撤销该证书的更新。这使我能够将电视的所有流量通过 mitmproxy 进行路由，不仅获取了电视所连接的所有域名和端点列表，还看到了请求和响应负载的结构。

Turns out the flow is pretty simple: when something interesting happens on the TV, the TV sends a request to https://catalyst.adgrx.com/adopportunity with some details about the TV. When you return to the Smart Hub, the “home screen” of the TV, so to speak, the TV sends requests to https://tvx.adgrx.com/impressions/tile again with some details about the TV, and in response it receives either an empty JSON object ({}) or a JSON response describing an ad to display at the top of the Smart Hub.

事实证明，流程非常简单：当电视上发生某些有趣的事情时，电视会向 https://catalyst.adgrx.com/adopportunity 发送一个包含电视详细信息的请求。当你返回 Smart Hub（即电视的“主屏幕”）时，电视会再次向 https://tvx.adgrx.com/impressions/tile 发送包含电视详细信息的请求，并接收到一个空的 JSON 对象 ({}) 或描述要在 Smart Hub 顶部显示的广告的 JSON 响应。

So I wrote a simple server in Rust that handles the same /impressions/tile endpoint and always returns JSON with an ad, except instead of links to an actual ad image, it has a link to a random photo of my family. I also included a simple frontend where I can manage the images that should be served. Additionally, the server blackholes any other *.adgrx.com request and returns 204 No Content to prevent all the tracking from getting out of my home network.

因此，我用 Rust 写了一个简单的服务器来处理相同的 /impressions/tile 端点，并始终返回带有广告的 JSON，只不过链接指向的不是实际的广告图片，而是我家人的一张随机照片。我还包含了一个简单的前端，可以在其中管理要提供的图片。此外，该服务器会将任何其他 *.adgrx.com 请求“黑洞化”，并返回 204 No Content，以防止所有跟踪信息流出我的家庭网络。

I then generated a wildcard SSL certificate for *.adgrx.com, signed it with the compromised eMudhra CA certificate and added it to the app. Finally, I configured my router to resolve *.adgrx.com to the IP address of my NAS, where I am running the ad spoofer, and now when we launch the TV, it looks like this:

然后，我为 *.adgrx.com 生成了一个通配符 SSL 证书，用被泄露的 eMudhra CA 证书对其进行签名，并将其添加到应用程序中。最后，我配置了路由器，将 *.adgrx.com 解析为我运行广告欺骗程序的 NAS 的 IP 地址。现在，当我们启动电视时，它看起来是这样的：

The source code for the adspoofer is on my GitHub in case anyone wants to try it out. It works with my particular model of TV, but other Samsung TVs might use different endpoints or expect a different shape of the response. If you make it work with your TV, feel free to send a patch! Obviously, this will only work as long as my TV trusts the compromised eMudhra certificates, which is either until the certificate expires or until Samsung pushes out an update, revoking the certificate. The latter I can prevent by blocking updates to the TV (which carries its own set of risks), but about that another time.

adspoofer 的源代码在我的 GitHub 上，以防有人想尝试一下。它适用于我的特定电视型号，但其他三星电视可能会使用不同的端点或期望不同的响应格式。如果你让它在你的电视上运行成功，欢迎提交补丁！显然，这只有在我的电视信任被泄露的 eMudhra 证书时才有效，这种情况要么持续到证书过期，要么持续到三星推送更新撤销该证书。后者我可以通过阻止电视更新来预防（这本身也带有一定的风险），但那是另一回事了。