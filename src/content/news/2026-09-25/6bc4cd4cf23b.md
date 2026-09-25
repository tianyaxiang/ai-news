---
title: "Two-tier encryption in the UK"
originalUrl: "https://macanorak.com/two-tier-encryption-in-the-uk/"
date: "2026-09-24T23:56:24.577Z"
---

# Two-tier encryption in the UK
# 英国的双层加密现状

Here's something odd. Alice and Bill both live in the UK. Both have identical iPhones. Both use iCloud. Both pay Apple for the same services. Alice has Advanced Data Protection switched on, protecting the majority of her iCloud data. Bill doesn’t, and can’t switch it on. Alice enabled it before Apple withdrew the feature for new UK users in February 2025. Bill missed the window.
这真是一件怪事。爱丽丝（Alice）和比尔（Bill）都住在英国，都用着一模一样的 iPhone，都使用 iCloud，也都向苹果支付同样的费用。爱丽丝开启了“高级数据保护”（Advanced Data Protection），保护了她大部分的 iCloud 数据；而比尔没有开启，也无法开启。爱丽丝是在苹果于 2025 年 2 月对英国新用户下架该功能之前启用的，而比尔错过了这个窗口期。

To understand how this happened, we need to go back over a decade to the aftermath of the Snowden/NSA revelations surrounding PRISM. In January 2014, Tim Cook was interviewed by David Muir for ABC News. Cook said, “We have a gag order on us right now,” but clarified, “there is no back door. The government doesn't have access to our servers. They would have to cart us out in a box for that… we feel that strongly about it."
要理解这一切是如何发生的，我们需要回溯到十多年前，即斯诺登/美国国家安全局（NSA）关于“棱镜计划”（PRISM）泄密事件之后。2014 年 1 月，蒂姆·库克（Tim Cook）接受了美国广播公司（ABC）新闻频道大卫·缪尔（David Muir）的采访。库克当时表示：“我们现在受到禁言令的限制。”但他明确指出：“我们没有后门。政府无法访问我们的服务器。除非把我们装进棺材抬出去，否则他们休想得逞……我们对此立场坚定。”

Nearly two years later, on the 2nd of December 2015, Syed Rizwan Farook and Tashfeen Malik carried out the San Bernardino terrorist attack, killing 14 people and wounding 22. The FBI obtained the iPhone 5C that had been used by Farook. They had a warrant to search the iPhone, but they didn't know the passcode. The FBI obtained a court order to compel Apple to help them into the device. They wanted Apple to create a version of iOS that would remove or circumvent the iPhone's security protections (in particular the limits on passcode attempts).
近两年后的 2015 年 12 月 2 日，赛义德·里兹万·法鲁克（Syed Rizwan Farook）和塔什芬·马利克（Tashfeen Malik）发动了圣贝纳迪诺恐怖袭击，造成 14 人死亡，22 人受伤。联邦调查局（FBI）获得了法鲁克使用的 iPhone 5C。他们持有搜查该手机的搜查令，但不知道密码。FBI 随后获得法院命令，强制要求苹果协助解锁该设备。他们希望苹果开发一个版本的 iOS 系统，以移除或绕过 iPhone 的安全保护措施（特别是对密码尝试次数的限制）。

Apple demurred. In an open letter by Tim Cook, he said that the government was asking for something the company simply didn't have, and something it considered "too dangerous to create." In another interview with ABC's David Muir, Cook gave an impassioned and at times angry defence of Apple's position, describing the requested software as the "equivalent of cancer." He argued that such a tool would function as a “master key” capable of unlocking hundreds of millions of devices, and that once built, there would be no way to guarantee it was only used against that one phone.
苹果拒绝了。蒂姆·库克在一封公开信中表示，政府所要求的是公司根本不具备的东西，也是公司认为“制造出来太危险”的东西。在另一次接受 ABC 大卫·缪尔的采访中，库克充满激情甚至略带愤怒地捍卫了苹果的立场，称所要求的软件“等同于癌症”。他认为，这样的工具就像一把“万能钥匙”，能够解锁数以亿计的设备，一旦制造出来，就无法保证它只会用于那一部手机。

In a separate interview for CBS’ 60 minutes, Cook reiterated the underlying principle: "If you put a back door in, then that back door is for everybody. For good guys and bad guys.” James Comey, then Director of the FBI, told 60 Minutes that whilst he was committed to protecting the privacy of Americans, “the notion that we would market devices that would allow someone to place themselves beyond the law troubles me a lot.” The FBI eventually obtained access using a third party (widely reported to be Cellebrite [1]) and withdrew its legal action against Apple.
在接受哥伦比亚广播公司（CBS）《60 分钟》节目的另一次采访中，库克重申了其核心原则：“如果你安装了一个后门，那么这个后门就是对所有人开放的，无论是好人还是坏人。”时任 FBI 局长的詹姆斯·科米（James Comey）则告诉《60 分钟》，虽然他致力于保护美国人的隐私，但“我们销售的设备能让某些人凌驾于法律之上，这一想法让我非常不安。”最终，FBI 通过第三方（据广泛报道是 Cellebrite [1]）获得了访问权限，并撤销了对苹果的法律诉讼。

Skip forward almost a decade, and on the 7th of February 2025, The Washington Post exclusively revealed that the UK government had ordered Apple to provide access to data protected by its strongest level of iCloud encryption. The UK has powers to make such requests under the Investigatory Powers Act 2016 — the centrepiece of the UK’s modern surveillance law. [2]
时间快进近十年，2025 年 2 月 7 日，《华盛顿邮报》独家披露，英国政府已下令苹果公司提供对其最高级别 iCloud 加密数据的访问权限。根据 2016 年《调查权力法案》（Investigatory Powers Act 2016）——这是英国现代监控法律的核心——英国拥有提出此类要求的权力。[2]

One of the mechanisms available under that legislation is called a Technical Capability Notice (a sanitised, bureaucratic euphemism if ever there was one). A Technical Capability Notice (TCN) is a legal instruction that requires a communications / technology provider to maintain or develop the capability to comply with certain requirements (the notice itself doesn’t authorise access to anyone’s data — it just ensures the capability exists for when a specific warrant or authorisation does).
该法案下的一种机制被称为“技术能力通知”（Technical Capability Notice，这绝对是一个经过粉饰的官僚主义委婉语）。“技术能力通知”（TCN）是一项法律指令，要求通信/技术提供商维护或开发符合特定要求的能力（通知本身并不授权访问任何人的数据，它只是确保在获得特定搜查令或授权时，具备相应的技术能力）。

Before issuing a TCN, the government is obliged to consider things such as technical feasibility, cost, likely benefits and the number of users affected. A TCN requires approval from a Judicial Comissioner, and the recipient of a TCN is generally gagged from revealing its existence or contents without the UK Secretary of State's permission (the Home Office says it will generally neither confirm nor deny whether a particular TCN exists).
在发布 TCN 之前，政府有义务考虑技术可行性、成本、预期收益以及受影响的用户数量等因素。TCN 需要获得司法专员的批准，且接收方通常被禁止在未经英国国务大臣许可的情况下披露其存在或内容（英国内政部表示，通常既不会确认也不会否认特定 TCN 的存在）。

The Post reported that UK security officials had issued such a TCN, in secret, in January 2025, requesting that Apple create a way to access encrypted iCloud data belonging not just to UK users, but to Apple users worldwide. The chutzpah of it all was astonishing. Apple's position (privately, since they were prohibited from commenting publicly on the reported TCN) showed fidelity to its previous stance: deliberately weakening end-to-end encryption, for whatever purpose or for whomever the intended beneficiary, would make every user less secure.
《华盛顿邮报》报道称，英国安全官员已于 2025 年 1 月秘密发布了这样一份 TCN，要求苹果公司开发一种方法，以访问不仅属于英国用户，而且属于全球苹果用户的加密 iCloud 数据。这种厚颜无耻的行为令人震惊。苹果的立场（私下里，因为他们被禁止公开评论该报道中的 TCN）显示了对其先前立场的一贯坚持：无论出于何种目的或为了谁的利益，故意削弱端到端加密都会使每一位用户变得更加不安全。

So the dispute became the UK government saying it needed access, Apple saying it couldn't decrypt the data, and the UK effectively replying: then change the system so that you can. It's important to get into the technicalities here. All iCloud data is encrypted. But there's a difference between encrypted and end-to-end encrypted (E2EE) data. iCloud already protects sensitive categories of data (like Passwords, Health data, Messages in iCloud, etc) with end-to-end encryption by default.
因此，这场争端演变成了：英国政府声称需要访问权限，苹果表示无法解密数据，而英国实际上回应道：那就修改系统，直到你能解密为止。这里有必要深入了解一下技术细节。所有 iCloud 数据都是加密的，但“加密”与“端到端加密”（E2EE）之间存在区别。iCloud 默认已对敏感类别的数据（如密码、健康数据、iCloud 中的信息等）进行了端到端加密保护。

For everything else, Apple retains the ability to decrypt the data when necessary, and can be ordered to hand this data over by law enforcement. With Advanced Data Protection (ADP), several more categories of iCloud data become end-to-end encrypted (iCloud Backup, Photos, Notes, and others). Apple itself doesn't possess the keys needed to decrypt that protected data. It's not something Apple can unlock just because a government asks for the contents.
对于其他所有数据，苹果在必要时保留了解密数据的能力，并可能被执法部门要求移交这些数据。通过“高级数据保护”（ADP），更多类别的 iCloud 数据（如 iCloud 备份、照片、备忘录等）将实现端到端加密。苹果公司本身并不持有解密这些受保护数据所需的密钥。这并不是苹果仅凭政府要求就能解锁的东西。

There was a heartening backlash to what the UK government had asked Apple to do. The Investigatory Powers Tribunal (IPT) became involved (the independent UK body that hears complaints about unlawful surveillance or human rights breaches by public authorities). Privacy International and other groups argued that the government shouldn't be able to secretly compel technology companies to weaken encryption without adequate public scrutiny. Apple itself effectively confirmed the underlying confrontation with the UK government, without directly acknowledging the existence of the reported TCN: on the 21st of February it announced that Advanced Data Protection would no longer be available to new UK users.
英国政府对苹果提出的要求引发了令人欣慰的强烈抵制。调查权力法庭（IPT，英国负责审理有关公共机构非法监控或侵犯人权投诉的独立机构）介入了此事。“隐私国际”（Privacy International）等组织认为，政府不应在没有充分公众监督的情况下，秘密强迫科技公司削弱加密技术。苹果公司本身实际上证实了与英国政府之间的潜在对抗，尽管没有直接承认所报道的 TCN 的存在：2 月 21 日，苹果宣布“高级数据保护”功能将不再向英国新用户提供。