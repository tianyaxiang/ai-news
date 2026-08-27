---
title: "FBI Disrupts Chinese Proxy Tools Used in Mass Hacking of US Agencies and Infrastructure"
originalUrl: "https://www.wired.com/story/fbi-disrupts-chinese-proxy-tools-used-in-mass-hacking-of-us-agencies-and-infrastructure/"
date: "2026-08-27T00:58:11.823Z"
---

# FBI Disrupts Chinese Proxy Tools Used in Mass Hacking of US Agencies and Infrastructure
# FBI 捣毁用于大规模入侵美国机构及基础设施的中国代理工具

For years, China's military and intelligence agencies, which carry out hacking campaigns against targets around the globe, have grown increasingly reliant on a vast web of proxy devices that enable and obfuscate their targeting. Now the FBI has named and disrupted one key network of those proxies—and in doing so, revealed just how extensively the hackers who used it reached into American government institutions and US critical infrastructure.

多年来，中国的军事和情报机构在全球范围内开展黑客攻击活动，并日益依赖一个庞大的代理设备网络来实施攻击并掩盖其行踪。如今，美国联邦调查局（FBI）点名并捣毁了其中一个关键的代理网络，此举揭示了使用该网络的黑客对美国政府机构和关键基础设施的渗透程度之深。

On Wednesday, the Department of Justice announced the takedown of two tools, known as QTRouter and QScan, used by a Chinese state-sponsored hacking group the DOJ identified as QTFY, which is allegedly part of a Chinese government contractor called Nanjing Xinjiuwei Network Technology Company. According to prosecutors and an FBI affidavit used to seize domains that those tools relied on, the company gave its customers access to botnets of hacked internet-of-things (IoT) devices and co-opted commercial proxy services. The company's customers—allegedly including the Ministry of State Security and the People's Liberation Army—then used those proxy services as relay points to carry out hacking campaigns stretching back as early as 2018, according to the US government.

周三，美国司法部宣布捣毁了名为 QTRouter 和 QScan 的两款工具。这些工具由一个被司法部认定为“QTFY”的中国国家支持的黑客组织使用，该组织据称隶属于一家名为“南京信久威网络科技有限公司”的中国政府承包商。根据检察官和 FBI 用于查封这些工具所依赖域名的宣誓书，该公司为其客户提供被黑客入侵的物联网（IoT）设备僵尸网络，并征用商业代理服务。据美国政府称，该公司的客户——据称包括国家安全部和中国人民解放军——随后利用这些代理服务作为中转点，开展了可追溯至 2018 年的黑客攻击活动。

The DOJ says the hackers breached a staggering list of US victim agencies, including NASA, the US Senate, the Federal Reserve, the Department of Energy, the Department of Health and Human Services, the National Institutes of Health, and the DOJ itself.

司法部表示，黑客入侵了一长串令人震惊的美国受害机构名单，包括美国国家航空航天局（NASA）、美国参议院、美联储、能源部、卫生与公众服务部、国立卫生研究院以及司法部本身。

Nanjing Xinjiuwei Network Technology Company could not be immediately reached for comment.

记者未能立即联系到南京信久威网络科技有限公司置评。

The FBI's affidavit goes on to list types of US infrastructure and industries targeted via the proxy networks, too, including power companies, telecommunications providers, hospitals, financial institutions, and defense contractors—though it does not confirm which of the targeted entities were successfully breached or to what degree.

FBI 的宣誓书还列出了通过这些代理网络作为目标的美国基础设施和行业类型，包括电力公司、电信运营商、医院、金融机构和国防承包商——尽管宣誓书并未确认哪些目标实体被成功入侵，也未说明入侵程度。

“The scale is really giant,” says Damon Rouse, a threat intelligence researcher at Lumen Technology's Black Lotus Labs, which worked with the FBI and DOJ on the takedown operation. In a blog post about the operation, Black Lotus Labs describes the Nanjing-based company as a kind of “quartermaster” for China's hacking operations, one of several private contractors that increasingly provide key tools and infrastructure to China's state-sponsored hackers.

“其规模确实非常巨大，”Lumen Technology 旗下 Black Lotus Labs 的威胁情报研究员 Damon Rouse 说道。该实验室在此次捣毁行动中与 FBI 和司法部进行了合作。在一篇关于此次行动的博文中，Black Lotus Labs 将这家南京公司描述为中国黑客行动的“军需官”，它是越来越多为中国国家支持的黑客提供关键工具和基础设施的私营承包商之一。

“This is a very long-lasting campaign,” Rouse says, “and this company and these people involved in it have very close ties to the highest levels of the People's Liberation Army.”

“这是一场持续已久的行动，”Rouse 说，“这家公司及其相关人员与中国人民解放军的高层有着非常密切的联系。”

QScan, according to Lumen and the FBI, was designed to scan for vulnerabilities in IoT devices that could be hacked and added to botnets of infected devices that served as proxies. The company's QTRouter service allegedly managed customers’ access to that botnet network, as well as a network of commercial proxies known as virtual private servers that could simply be rented and used in hacking campaigns.

据 Lumen 和 FBI 称，QScan 旨在扫描物联网设备中的漏洞，以便将其黑入并添加到作为代理的受感染设备僵尸网络中。据称，该公司的 QTRouter 服务负责管理客户对该僵尸网络的访问，以及一个被称为虚拟专用服务器（VPS）的商业代理网络，这些服务器可以轻松租用并用于黑客攻击活动。

Over the past year, Rouse notes, the group had transitioned to hijacking virtual private network (VPN) services typically used by Chinese citizens to route around China's Great Firewall censorship system. Proxying Chinese hacking operations through those VPNs, Rouse says, created a layer of obfuscation that mixed malicious traffic with the benign traffic of Chinese users seeking to access the open internet. “It made it difficult for us to see the bad, state-sponsored traffic because there was so much typical user VPN traffic in the nodes they were co-opting,” Rouse says.

Rouse 指出，在过去一年中，该组织已转向劫持中国公民通常用于绕过“防火长城”审查系统的虚拟专用网络（VPN）服务。Rouse 表示，通过这些 VPN 代理中国的黑客行动，制造了一层混淆，将恶意流量与中国用户访问开放互联网的正常流量混合在一起。“这让我们很难识别出那些恶意的、国家支持的流量，因为在他们征用的节点中，有太多典型的用户 VPN 流量了，”Rouse 说。

The FBI and Justice Department say they've now disrupted the group's proxy infrastructure by seizing key domains hardcoded into QScan and QTRouter. Lumen, which serves as an internet backbone provider, says it also “null-routed” certain domains, rendering them inoperable—including the more recent system of co-opting censorship-bypassing VPNs.

FBI 和司法部表示，他们现在已经通过查封 QScan 和 QTRouter 中硬编码的关键域名，捣毁了该组织的代理基础设施。作为互联网骨干网提供商的 Lumen 表示，它还对某些域名进行了“空路由”（null-routed），使其无法运行——其中包括最近征用绕过审查的 VPN 的系统。

“State-sponsored malicious hackers preying on America’s critical infrastructure will be stopped and prosecuted,” US attorney general Todd Blanche wrote in a statement, though the DOJ's announcement didn't appear to include charges against any individuals. “We are here to ensure security for the American people and will use every tool we have to keep that promise.”

“那些觊觎美国关键基础设施的国家支持的恶意黑客将被阻止并受到起诉，”美国司法部长托德·布兰奇（Todd Blanche）在一份声明中写道，尽管司法部的公告似乎并未包含针对任何个人的指控。“我们在此是为了确保美国人民的安全，并将利用我们拥有的一切工具来履行这一承诺。”

Exactly what the QTFY hackers or the group's clients within the Chinese government sought to accomplish with its US infrastructure hacking is far from clear. Rouse says that the hacking campaigns don't appear to overlap with China's Volt Typhoon hacking campaign, which has sought to gain the capability to disrupt US power, water, and other military and civilian infrastructure. Instead, he says, the years-long hacking operations appeared—at least within Lumen's visibility—to be focused on more traditional espionage. “It was pretty much as broad as you can get, mapping back to what Chinese cyber operations are tasked with in terms of information collection,” Rouse says.

QTFY 黑客或该组织在中国政府内部的客户通过入侵美国基础设施究竟想要达到什么目的，目前尚不清楚。Rouse 表示，这些黑客攻击活动似乎与中国的“伏特台风”（Volt Typhoon）黑客行动没有重叠，后者旨在获得破坏美国电力、水利及其他军民基础设施的能力。相反，他说，这些长达数年的黑客行动——至少在 Lumen 的视野范围内——似乎更侧重于传统的间谍活动。“这几乎涵盖了你能想到的所有范围，这与中国网络行动在信息收集方面的任务是一致的，”Rouse 说。

The disruption of the QTFY proxy network will create a setback for those hacking campaigns and some embarrassment and customer relations problems for the Nanjing Xinjiuwei Network Technology Company, Rouse says. But given the hackers’ flexibility in shifting their methods over the years to find new ways to relay and disguise malicious traffic, he has no doubt that they will adapt and return.

Rouse 表示，捣毁 QTFY 代理网络将对这些黑客攻击活动造成挫折，并给南京信久威网络科技有限公司带来一些尴尬和客户关系问题。但考虑到黑客多年来在改变方法以寻找新的方式来中转和伪装恶意流量方面的灵活性，他毫不怀疑他们会适应并卷土重来。

“I think this will have a direct effect on the company and its perception in China. This is an egg-on-the-face moment for them,” Rouse says. “I think we can also safely assume they'll pivot and stand up new infrastructure.”

“我认为这将对该公司及其在中国国内的形象产生直接影响。这对他们来说是一个丢脸的时刻，”Rouse 说。“我认为我们也可以肯定地推测，他们会进行调整并建立新的基础设施。”