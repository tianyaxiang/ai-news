---
title: "One of Google’s Android partners turned 1.3 million set-top boxes into a botnet"
originalUrl: "https://www.theverge.com/1024807/google-botnet-android-tv-shut-down"
date: "2026-11-02T20:37:49.000Z"
excerpt: false
---

# One of Google’s Android partners turned 1.3 million set-top boxes into a botnet

谷歌的一家安卓合作伙伴将 130 万台机顶盒变成了僵尸网络。

Google says one of its Android manufacturing partners secretly built a backdoor in 1.3 million devices and turned them into a botnet. The company says it has now dismantled the backdoor and “cut ties” with the manufacturer, the Shenzhen, China-based Videostrong Technology Co., which has been banned from building or selling certified Android devices or supplying software for them.

谷歌表示，其一家安卓制造合作伙伴在 130 万台设备中秘密植入了后门，并将它们变成了僵尸网络。该公司称目前已拆除该后门并与该制造商“断绝关系”。这家位于中国深圳的 Videostrong Technology Co. 已被禁止制造或销售经过认证的安卓设备，也不得为其提供软件。

The infected devices were used without owners’ knowledge for “malicious activity,” like ad fraud, data exfiltration, and routing unauthorized network traffic. Google claims the “backdoor and botnet were intentionally developed, deployed, and operated for financial gain,” saying:

受感染的设备在用户不知情的情况下被用于“恶意活动”，例如广告欺诈、数据窃取以及路由未经授权的网络流量。谷歌声称，该“后门和僵尸网络是为经济利益而蓄意开发、部署和运营的”，并表示：

Videostrong monetized the backdoor by selling access to criminal affiliates and loading those affiliates’ malware modules onto infected devices. These secondary modules were conducting ad-fraud; silently enrolling infected devices into residential proxy networks; and loading additional malware onto XCPE-compromised devices. We also took action to disrupt the command and control (C2) domains that operate these affiliate模块. Because these affiliates each have diversified distribution channels for their modules beyond XCPE, we assess that taking down their C2 domains will sever access to at least 10 million additional compromised devices.

Videostrong 通过向犯罪关联方出售访问权限并将这些关联方的恶意软件模块加载到受感染设备上来实现后门变现。这些二级模块执行了广告欺诈；将受感染设备静默注册到住宅代理网络中；并将额外的恶意软件加载到受 XCPE 感染的设备上。我们还采取行动破坏了运营这些关联模块的命令与控制（C2）域名。由于这些关联方除了 XCPE 之外还有多元化的模块分发渠道，我们评估认为，关闭其 C2 域名将切断对至少 1000 万台额外受感染设备的访问。

It wasn’t just one device that was impacted, either — the malware was found “built directly into many different device models and brands over multiple years.” Most of those were Android TV set-top boxes, but the botnet also infected other “Android-based IoT devices, including telehealth devices, karaoke machines, and digital signage devices.”

受影响的不仅仅是一台设备——该恶意软件被发现“在多年间直接内置于许多不同的设备型号和品牌中”。其中大多数是安卓电视机顶盒，但该僵尸网络还感染了其他“基于安卓的物联网设备，包括远程医疗设备、卡拉 OK 机和数字标牌设备”。

Google says Videostrong used “obfuscation techniques” to load the malware onto users’ devices after they booted up the hardware for the first time. Google also says it made changes to its review process for device manufacturers after this incident.

谷歌表示，Videostrong 使用了“混淆技术”，在用户首次启动硬件后将恶意软件加载到设备上。谷歌还表示，在此次事件后，它已对其设备制造商的审查流程进行了调整。