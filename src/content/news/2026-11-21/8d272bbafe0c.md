---
title: "Garage Door Spam"
originalUrl: "https://blog.harrison.page/garage-door-spam/"
date: "2026-11-20T02:41:39.000Z"
excerpt: false
---

# Garage Door Spam

Garage Door Spam 16 Nov, 2026 In the beginning, my garage door opener worked fine. When the door opened or closed, I would get a notification. If I'm away from home and the door opens, something weird is going down. The "myQ" app generally worked although it was encrusted with ads: I continued using it because I trusted that notifications were meaningful...

车库门垃圾信息 2026年11月16日。起初，我的车库门开启器运行良好。当门打开或关闭时，我会收到通知。如果我不在家而门开了，那肯定有什么奇怪的事情发生了。“myQ”应用程序通常运行正常，尽管它充斥着广告：我继续使用它，因为我相信这些通知是有意义的……

...until recently (October 2026): This is un-fucking-acceptable. As in, absolutely fucking not. The manufacturer (Chamberlain) cut off third-party access to its APIs (via myQ) in late 2023. In response, I purchased a pair of ratgdo32 devices to opt out of the bullshit.

……直到最近（2026年10月）：这简直不可接受。我的意思是，绝对不行。制造商（Chamberlain）在2023年底切断了第三方对其API（通过myQ）的访问。作为回应，我购买了一对ratgdo32设备来摆脱这些废话。

ratgdo is a WiFi control board for your garage door opener that works over your local network using ESP Home or HomeKit The device is a ~$62 board from ratcloud llc running open-source firmware that wires to the opener's existing terminals and speaks LiftMaster's Security+ 2.0 protocol locally. These were easy enough to hook up. I won't reproduce the instructions here.

ratgdo是一个用于车库门开启器的WiFi控制板，它通过本地网络使用ESP Home或HomeKit工作。该设备是来自ratcloud llc的一块约62美元的电路板，运行开源固件，连接到开启器现有的终端，并在本地使用LiftMaster的Security+ 2.0协议进行通信。这些设备很容易连接。我不会在这里重复说明书。

The bundle included six black wires, an auxiliary harness I didn’t need. My router hands each board a fixed address at 192.168.0.192 and 192.168.0.245. Apple's HomeKit just worked and I'm able to control them with voice commands: “Hey Siri, open Door 1”

套装里包括六根黑线，还有一个我不需要的辅助线束。我的路由器为每块电路板分配了192.168.0.192和192.168.0.245的固定地址。Apple的HomeKit直接就能用，我可以通过语音命令控制它们：“嘿Siri，打开1号门”。

When I was growing up, my father wired a mercury switch onto our garage door that lit up a light in the hallway when we'd left the garage door open. This was a valuable signal that helped our family avoid accidentally leaving the door open overnight. Since the ratgdo32 has a JSON status endpoint, I was able to rebuild Dad's solution in software with Slack: The script runs at night checking for an open door: */10 21-23,0-5 * * * garage-watch

我小时候，父亲在我们的车库门上安装了一个水银开关，当我们忘记关车库门时，走廊里的灯就会亮起。这是一个有价值的信号，帮助我们家避免了不小心整晚敞开门。由于ratgdo32有一个JSON状态端点，我能够通过Slack用软件重建父亲的方案：脚本在夜间运行，检查门是否打开：*/10 21-23,0-5 * * * garage-watch。

The repo maintainer made my day when I submitted a tiny pull request: "Simple and useful. Happy to merge this. Thank you." Both boards are now reachable over my Tailscale network, so my monitoring software can load /healthcheck. This required a custom route: /Applications/Tailscale.app/Contents/MacOS/Tailscale set \ --advertise-routes=192.168.0.192/32,192.168.0.245/32

当我提交了一个微小的拉取请求时，仓库维护者让我非常开心：“简单且有用。很高兴合并这个。谢谢。”现在两块电路板都可以通过我的Tailscale网络访问，因此我的监控软件可以加载/healthcheck。这需要一条自定义路由：/Applications/Tailscale.app/Contents/MacOS/Tailscale set \ --advertise-routes=192.168.0.192/32,192.168.0.245/32。

After approving the route, my monitoring software can verify the hardware is working. Everything runs locally with no cloud, and notifications now say who opened the door which myQ never did. To anyone at Chamberlain responsible for myQ, I offer my sincerest Fuck You.

在批准该路由后，我的监控软件可以验证硬件是否正常工作。一切都在本地运行，没有云端参与，而且现在的通知会说明是谁打开了门，这是myQ从未做到的。对于Chamberlain公司负责myQ的任何人，我送上我最诚挚的“去你的”。