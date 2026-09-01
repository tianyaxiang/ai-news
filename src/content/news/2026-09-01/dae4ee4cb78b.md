---
title: "Think twice before installing this device promising free movies"
originalUrl: "https://arstechnica.com/security/2026/08/how-some-media-streaming-devices-open-home-networks-to-a-world-of-harm/"
date: "2026-09-01T00:49:58.894Z"
---

# Think twice before installing this device promising free movies
# 在安装这些承诺提供免费电影的设备前，请三思

As online services get better at blocking malicious traffic, the attackers and scammers behind them have been forced to find new ways to reach their targets. The alternative of choice is now what are known as residential proxy networks. These systems funnel millions of home Internet connections into a unified network, and the proxy operators allow attackers to route their malicious traffic through these connections for a fee. The online services see only IP addresses with good reputations and geolocations that don’t stand out.

随着在线服务在拦截恶意流量方面做得越来越好，其背后的攻击者和诈骗者被迫寻找新的方式来接触目标。目前，他们的首选替代方案被称为“住宅代理网络”（residential proxy networks）。这些系统将数以百万计的家庭互联网连接汇集成一个统一的网络，代理运营商则允许攻击者付费通过这些连接路由其恶意流量。在线服务看到的仅仅是声誉良好且地理位置并不突出的 IP 地址。

More often than not, the home users have no idea that their connections are being used to facilitate crime and occasionally even nation-state attacks. Users who do know often don’t care much. In exchange for leasing out part of their unlimited bandwidth to others, many get free movie and TV show streaming. Several less tech-savvy people I know who own such digital media players have told me, after I explain how the media players piggyback off their connections, that the bonanza of content is worth it. They find the tangible benefits outweigh the abstract harm they pose.

通常情况下，家庭用户根本不知道自己的网络连接正被用于协助犯罪，甚至有时被用于国家级攻击。即便知情的用户也往往不在意。为了换取将部分无限带宽出租给他人，许多人获得了免费的电影和电视节目流媒体服务。我认识的几位不太懂技术的朋友拥有此类数字媒体播放器，在向他们解释这些播放器是如何“借用”他们的网络连接后，他们告诉我，这些海量的内容资源是值得的。他们认为，切实的利益超过了他们所造成的抽象危害。

### Infecting already compromised devices
### 感染已受损的设备

Research published Monday brings the threat into much clearer view. Security firm Plume cataloged a vast ecosystem of malware that preys squarely on users of SuperBox, just one of many media players offering pirated content. These malicious apps can be surreptitiously installed by remote attackers even when the devices are positioned behind a router. While Monday’s deep-dive analysis focused exclusively on SuperBox, Plume warned that dozens of similar streaming devices pose precisely the same threat.

周一发布的一项研究让这一威胁变得更加清晰。安全公司 Plume 编录了一个庞大的恶意软件生态系统，该系统专门针对 SuperBox 的用户——这只是众多提供盗版内容的媒体播放器之一。即使设备位于路由器后方，远程攻击者也可以秘密安装这些恶意应用程序。虽然周一的深度分析仅集中在 SuperBox 上，但 Plume 警告称，数十种类似的流媒体设备也存在完全相同的威胁。

“Our researchers found that these residential proxy networks are not simply monetization tools,” Plume researchers wrote. “They are actively being used as a target for additional malware delivery, enabling cybercriminals to infect already-compromised devices with entirely new malware families while remaining largely invisible to the device owner.”

“我们的研究人员发现，这些住宅代理网络不仅仅是变现工具，”Plume 的研究人员写道。“它们正被积极用作投放额外恶意软件的目标，使网络犯罪分子能够在设备所有者几乎无法察觉的情况下，用全新的恶意软件家族感染这些已经受损的设备。”

The Android-based SuperBox is configured with almost all the OS-based security protections turned off. Apps that come pre-installed, or those that are available through the SuperBox app store, then run as root, meaning they have unfettered administrative system rights on the device. Paying proxynet customers can also gain root by issuing a handful of Linux commands. With that, either the app or the paying customer can install their own apps and surveil and join the local network the device is connected to, where they have the same system rights as any other connected device.

基于 Android 的 SuperBox 在配置时几乎关闭了所有基于操作系统的安全保护。预装的应用程序或通过 SuperBox 应用商店下载的应用程序均以 root 权限运行，这意味着它们在设备上拥有不受限制的系统管理权限。付费的代理网络客户也可以通过输入几条 Linux 命令来获得 root 权限。有了这些权限，应用程序或付费客户就可以安装自己的应用，监视并加入设备所连接的本地网络，在那里他们拥有与任何其他联网设备相同的系统权限。

The SuperBox neuters default Android defenses, including signature verification, the “unknown sources” restriction, the permission-review dialog, and Play Protect scanning. As a result, the box’s ADB (Android Debug Bridge) is exposed to the Internet. Worse, the su binary—the code that provides the command-line interface allowing users with low-level system rights to temporarily gain administrator-level access—is set to grant root without any authentication. The combination of the ADB being exposed to the Internet and the lack of authentication for root access means that both apps and users of the proxy service can execute virtually any command they want on the device.

SuperBox 废除了 Android 的默认防御机制，包括签名验证、“未知来源”限制、权限审查对话框以及 Play Protect 扫描。结果，该盒子的 ADB（Android 调试桥）直接暴露在互联网上。更糟糕的是，su 二进制文件（提供命令行界面，允许低权限用户临时获得管理员级访问权限的代码）被设置为无需任何身份验证即可授予 root 权限。ADB 暴露在互联网上与 root 访问缺乏身份验证相结合，意味着应用程序和代理服务的用户几乎可以在设备上执行他们想要的任何命令。

More often than not, users position their SuperBox behind their home router, where they may think their device is safe from Internet-connected remote attackers. In fact, that sense of security is completely false. The binary that provides proxy functions inside many SuperBox apps opens an outgoing connection to a proxy server and keeps it open as a communication channel indefinitely. Routers are unable to block the communications because the connections they rely on are outbound and encrypted between the SuperBox and the proxy server. Even users who are savvy enough to monitor traffic on their network never see anything that looks like an inbound connection to the ADB port.

通常，用户会将 SuperBox 放置在家庭路由器后方，他们可能认为这样设备就能免受互联网远程攻击者的侵害。事实上，这种安全感完全是虚假的。许多 SuperBox 应用程序中提供代理功能的二进制文件会打开一个通往代理服务器的传出连接，并将其作为通信通道无限期保持开启。路由器无法拦截这些通信，因为它们所依赖的连接是出站的，且在 SuperBox 和代理服务器之间进行了加密。即使是那些有能力监控网络流量的精明用户，也永远看不到任何看起来像是针对 ADB 端口的入站连接。

“The open ADB port plays the central role,” Plume researcher Gergely Eberhardt wrote in an email. “Combined with root access, a single pm install command can silently install any APK. This bypasses every one of Android’s default protections at once: signature verification, the “unknown sources” restriction, the permission-review dialog, and Play Protect scanning.”

“开放的 ADB 端口起到了核心作用，”Plume 研究员 Gergely Eberhardt 在一封电子邮件中写道。“结合 root 权限，一条简单的 `pm install` 命令就可以静默安装任何 APK。这会同时绕过 Android 的所有默认保护措施：签名验证、“未知来源”限制、权限审查对话框以及 Play Protect 扫描。”

### Intruder at the gates
### 门外的入侵者

The open ADB, along with the default presence of apps that have built-in proxy functionality, creates a dangerous mix that makes SuperBox a potent threat. “This combination results in further infections involving additional residential proxies or IoT botnets, and the attackers are often the very customers of the primary proxy network,” Plume wrote. “The device owners get multiple bots they never asked for and are not aware of, all competing for the same hardware, and an IP address whose reputation now reflects whatever those bots utilize it for.”

开放的 ADB，加上默认存在的内置代理功能的应用程序，构成了一种危险的组合，使 SuperBox 成为一个巨大的威胁。“这种组合导致了涉及额外住宅代理或物联网僵尸网络的进一步感染，而攻击者往往正是主要代理网络的客户，”Plume 写道。“设备所有者会得到多个他们从未要求且并不知情的僵尸程序，它们都在争夺同一硬件资源，而该 IP 地址的声誉现在反映了这些僵尸程序利用它所做的任何事情。”

Some of the proxy networking services that make use of SuperBox take measures to prevent their customers from accessing the local networks of SuperBox users. The recently disrupted Popanet, for instance, blocks local IP address ranges from outside the local network. Even then, Popanet users can access local IPs by specifying the special wildcard address 0.0.0.0, which Android then routes to the SuperBox IP 127.0.0.1. From that vantage point, proxy users can access the rest of the local network. Monday’s post also reported that even the Popanet network was facilitating live exploit attempts.

一些利用 SuperBox 的代理网络服务确实采取了措施，防止其客户访问 SuperBox 用户的本地网络。例如，最近被取缔的 Popanet 会阻止来自本地网络外部的本地 IP 地址范围。即便如此，Popanet 用户仍可以通过指定特殊的通配符地址 0.0.0.0 来访问本地 IP，Android 会将其路由到 SuperBox 的 IP 127.0.0.1。从这个角度来看，代理用户可以访问本地网络的其余部分。周一的文章还报道称，即使是 Popanet 网络也在协助进行实时漏洞利用尝试。