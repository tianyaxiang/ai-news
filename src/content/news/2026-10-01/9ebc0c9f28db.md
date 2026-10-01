---
title: "The Cuckoo's Egg"
originalUrl: "https://en.wikipedia.org/wiki/The_Cuckoo%27s_Egg_(book)"
date: "2026-10-01T00:52:22.308Z"
---

# The Cuckoo's Egg / 《杜鹃的蛋》

*The Cuckoo's Egg: Tracking a Spy Through the Maze of Computer Espionage* is a 1989 book written by Clifford Stoll. It is his first-person account of the hunt for Markus Hess, a computer hacker who broke into a computer at Lawrence Berkeley National Laboratory (LBNL). Stoll's use of the term extended the metaphor cuckoo's egg from brood parasitism in birds to malware.

《杜鹃的蛋：追踪计算机间谍迷宫中的间谍》（*The Cuckoo's Egg: Tracking a Spy Through the Maze of Computer Espionage*）是克利福德·斯托尔（Clifford Stoll）于1989年撰写的一本书。这是他以第一人称视角记录的对马库斯·赫斯（Markus Hess）的追捕过程，赫斯是一名入侵了劳伦斯伯克利国家实验室（LBNL）计算机的黑客。斯托尔对这一术语的使用，将生物学中鸟类的“巢寄生”（杜鹃产卵）隐喻延伸到了恶意软件领域。

### Summary / 摘要

Author Clifford Stoll, an astronomer by training, managed computers at Lawrence Berkeley National Laboratory (LBNL) in California. One day in 1986 his supervisor asked him to resolve an accounting error of 75 cents in the computer usage accounts. Stoll traced the error to an unauthorized user who had apparently used nine seconds of computer time and not paid for it. Stoll eventually realized that the unauthorized user was a hacker who had acquired superuser access to the LBNL system by exploiting a vulnerability in the movemail function of the original GNU Emacs.

作者克利福德·斯托尔是一位受过专业训练的天文学家，当时在加州的劳伦斯伯克利国家实验室（LBNL）负责管理计算机。1986年的一天，他的主管要求他解决计算机使用账户中75美分的会计差错。斯托尔将这一错误追溯到一名未经授权的用户，该用户显然使用了9秒的计算机时间却未付费。斯托尔最终意识到，这名未经授权的用户是一名黑客，他通过利用原始GNU Emacs中“movemail”功能的漏洞，获得了LBNL系统的超级用户权限。

Early on, and over the course of a long weekend, Stoll rounded up fifty terminals, as well as teleprinters, mostly by "borrowing" them from the desks of co-workers away for the weekend. He physically attached them to the fifty incoming phone lines at LBNL. When the hacker dialed in that weekend, Stoll located the phone line used, which was coming from the Tymnet routing service. With the help of Tymnet, he eventually tracked the intrusion to a call center at MITRE, a defense contractor in McLean, Virginia.

在早期的一个长周末里，斯托尔收集了50台终端和电传打字机，大部分是从周末不在岗的同事桌上“借”来的。他将这些设备物理连接到LBNL的50条入站电话线上。当黑客在那个周末拨入时，斯托尔定位到了所使用的电话线，该线路来自Tymnet路由服务。在Tymnet的帮助下，他最终将入侵源追踪到了位于弗吉尼亚州麦克莱恩的国防承包商MITRE的一个呼叫中心。

Over the next ten months, Stoll spent enormous amounts of time and effort tracing the hacker's origin. He saw that the hacker was using a 1200 baud connection and realized that the intrusion was coming through a telephone modem connection. Stoll's colleagues, Paul Murray and Lloyd Bellknap, assisted with the phone lines. After returning his "borrowed" terminals, Stoll left a teleprinter attached to the intrusion line in order to see and record everything the hacker did. He watched as the hacker sought — and sometimes gained — unauthorized access to military bases around the United States, looking for files that contained words such as "nuclear" or "SDI" (Strategic Defense Initiative).

在接下来的十个月里，斯托尔投入了大量的时间和精力追踪黑客的来源。他发现黑客使用的是1200波特的连接，并意识到入侵是通过电话调制解调器连接进行的。斯托尔的同事保罗·默里（Paul Murray）和劳埃德·贝尔克纳普（Lloyd Bellknap）协助处理了电话线路。在归还了“借来”的终端后，斯托尔在入侵线路上留下了一台电传打字机，以便观察并记录黑客的所有操作。他目睹了黑客试图——有时甚至成功——未经授权访问美国各地的军事基地，寻找包含“核”或“SDI”（战略防御计划）等词汇的文件。

The hacker also copied password files (in order to make dictionary attacks) and set up Trojan horses to find passwords. Stoll was amazed that on many of these high-security sites the hacker could easily guess passwords, since many system administrators had never bothered to change the passwords from their factory defaults. Even on military bases, the hacker was sometimes able to log in as "guest" with no password. This was one of the first—if not the first—documented cases of a computer break-in, and Stoll seems to have been the first to keep a daily logbook of the hacker's activities.

黑客还复制了密码文件（用于进行字典攻击），并设置了特洛伊木马以获取密码。斯托尔感到震惊的是，在许多高安全性站点上，黑客竟然能轻易猜出密码，因为许多系统管理员从未更改过出厂默认密码。即使在军事基地，黑客有时也能以“访客”身份无需密码直接登录。这是计算机入侵最早的记录案例之一（如果不是最早的话），而斯托尔似乎是第一个坚持记录黑客活动日志的人。

Over the course of his investigation, Stoll contacted various agents at the Federal Bureau of Investigation (FBI), the Central Intelligence Agency (CIA), the National Security Agency (NSA), and the United States Air Force Office of Special Investigations (OSI). At the very beginning there was confusion as to jurisdiction and a general reluctance to share information; the FBI in particular was uninterested as no large sum of money was involved and no classified information host was accessed.

在调查过程中，斯托尔联系了联邦调查局（FBI）、中央情报局（CIA）、国家安全局（NSA）和美国空军特别调查办公室（OSI）的各路特工。起初，各方在管辖权上存在困惑，且普遍不愿共享信息；FBI尤其不感兴趣，因为案件不涉及巨额资金，也没有访问到机密信息主机。

Studying his log book, Stoll saw that the hacker was familiar with VAX/VMS, as well as AT&T Unix. He also noted that the hacker tended to be active around the middle of the day, Pacific time. Eventually Stoll hypothesized that, since modem bills are cheaper at night and most people have school or a day job and would only have a lot of free time for hacking at night, the hacker was in a time zone some distance to the east, likely beyond the US East Coast. With the help of Tymnet and agents from various agencies, Stoll found that the intrusion was coming from West Germany via satellite. The West German post office, the Deutsche Bundespost, had authority over the phone system there, and traced the calls to a university in Bremen.

通过研究日志，斯托尔发现黑客熟悉VAX/VMS以及AT&T Unix系统。他还注意到黑客倾向于在太平洋时间的中午时段活跃。最终，斯托尔推测，由于夜间调制解调器费用较低，且大多数人白天有学业或工作，只有晚上才有大量空闲时间进行黑客活动，因此黑客应该位于东部较远的时区，很可能在美国东海岸之外。在Tymnet和各机构特工的帮助下，斯托尔发现入侵是通过卫星从西德发起的。西德邮政局（Deutsche Bundespost）负责当地电话系统，并将通话追踪到了不来梅的一所大学。

In order to entice the hacker to reveal himself, Stoll set up an elaborate hoax—known today as a honeypot—by inventing a fictitious department at LBNL that had supposedly been newly formed by an "SDI" contract, also fictitious. When he realized the hacker was particularly interested in the faux SDI entity, he filled the "SDInet" account (operated by an imaginary secretary named "Barbara Sherwin") with large files full of impressive-sounding bureaucratese. The ploy worked, and the Deutsche Bundespost finally located the hacker at his home in Hanover.

为了诱使黑客暴露身份，斯托尔精心策划了一个骗局——即今天所说的“蜜罐”（honeypot）——他在LBNL虚构了一个部门，声称该部门是由一份同样虚构的“SDI”合同新成立的。当他意识到黑客对这个虚假的SDI实体特别感兴趣时，他在“SDInet”账户（由一位名叫“芭芭拉·谢尔文”的虚构秘书管理）中填充了大量充斥着官僚术语的文件。这一计策奏效了，西德邮政局最终在汉诺威的家中定位到了这名黑客。

The hacker's name was Markus Hess, and he had been engaged for some years in selling the results of his hacking to the Soviet Union's civilian intelligence agency, the KGB. There was ancillary proof of this when a Hungarian agent contacted the fictitious SDInet at LBNL by mail, based on information he could only have obtained through Hess. Apparently this was the KGB's method of double-checking to see if Hess was just making up the information he was selling. Stoll later flew to West Germany to testify at the trial of Hess.

黑客名叫马库斯·赫斯，多年来他一直致力于将黑客攻击的成果出售给苏联的民用情报机构——克格勃（KGB）。对此的辅助证据是，一名匈牙利特工通过邮件联系了LBNL的虚构SDInet，其依据的信息只能是从赫斯那里获得的。显然，这是克格勃核实赫斯所售信息真实性的手段。斯托尔后来飞往西德，在赫斯的审判中出庭作证。

### References in popular culture / 大众文化中的引用

The book was chronicled in an episode of WGBH's NOVA entitled "The KGB, the Computer, and Me", which aired on PBS stations on October 3, 1990. Stoll and several of his co-workers participated in re-enactments of the events described. Another documentary, *Spycatcher*, was made by Yorkshire Television. The number sequence mentioned in Chapter 48 has become a popular math puzzle, known as the Cuckoo's Egg, the Morris Number Sequence, or the look-and-say sequence.

这本书被WGBH的《NOVA》节目记录在一集名为《克格勃、计算机与我》（*The KGB, the Computer, and Me*）的纪录片中，该片于1990年10月3日在PBS电视台播出。斯托尔和他的几位同事参与了事件的重演。另一部纪录片《间谍捕手》（*Spycatcher*）则由约克郡电视台制作。书中第48章提到的数字序列已成为一个流行的数学谜题，被称为“杜鹃的蛋”、“莫里斯数字序列”或“外观数列”（look-and-say sequence）。