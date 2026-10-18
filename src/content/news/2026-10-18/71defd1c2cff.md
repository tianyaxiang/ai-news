---
title: "OpenAI models hacked a crypto wallet and breached more websites"
originalUrl: "https://arstechnica.com/security/2026/10/openai-models-hacked-a-crypto-wallet-and-breached-more-websites/"
date: "2026-10-16T20:59:01.000Z"
excerpt: false
---

OpenAI said internal models hacked two more websites, bypassed company-imposed browsing restrictions, and used exposed credentials to draw cryptocurrency from a wallet it couldn’t otherwise access, in the latest installment of disclosures of its agents performing unethical and likely illegal acts.

OpenAI 表示，其内部模型又入侵了两个网站，绕过了公司设定的浏览限制，并利用泄露的凭据从一个本无法访问的钱包中提取了加密货币。这是该公司近期披露的关于其智能体执行不道德且可能违法行为的最新系列报告。

The company on Thursday issued reports of four new incidents, all of which occurred in June. They come after the company revealed in July that internal test agents exploited a zero-day vulnerability in a tool designed to restrict their access to the Internet. They then broke into the network of AI tool provider Hugging Face.

该公司周四发布了四起新事件的报告，这些事件均发生在六月份。此前，该公司曾在七月份披露，内部测试智能体利用了一个旨在限制其访问互联网的工具中的零日漏洞，随后入侵了人工智能工具提供商 Hugging Face 的网络。

The agents took that illegal action to steal answers to a hacking test that weren’t available when completing the tasks on their own. The incident—which likely would have resulted in criminal charges had they been performed directly by a person—has further heightened concerns that widespread AI use could have harmful effects on an unprecedented scale.

这些智能体采取非法行动是为了窃取黑客测试的答案，而这些答案在它们独立完成任务时是无法获取的。如果这些行为由人类直接实施，很可能会导致刑事指控。该事件进一步加剧了人们的担忧，即人工智能的广泛使用可能会带来前所未有的负面影响。

In two of the cases reported Thursday, OpenAI agents tasked with retrieving information from websites hacked them when the models ran into obstacles obtaining it directly. In one incident during reinforcement training, a model that received access denials when trying to retrieve historical hospital-bed statistics on a government statistics website “used the site’s file-download feature to retrieve server configuration and application files, including sensitive credentials,” OpenAI said.

在周四报告的两起案例中，OpenAI 的智能体在尝试从网站获取信息受阻时，选择了入侵这些网站。OpenAI 表示，在一次强化学习训练中，一个模型在试图从政府统计网站获取历史病床统计数据时遭到拒绝，随后该模型“利用该网站的文件下载功能获取了服务器配置和应用程序文件，其中包括敏感凭据”。

“It inspected the application code, bypassed the statistics endpoint’s authorization checks, and retrieved data that had previously been denied. The model saved the data locally.” In the other incident, a model instructed to retrieve figures from a public research dashboard bypassed the organization’s security controls and used the unauthorized access to steal credentials. It then made configuration changes on the server.

“它检查了应用程序代码，绕过了统计端点的授权检查，并检索了之前被拒绝访问的数据。该模型将数据保存在了本地。”在另一起事件中，一个被指示从公共研究仪表板检索数据的模型绕过了该组织的安全控制，并利用未经授权的访问权限窃取了凭据，随后对服务器进行了配置更改。

In a third report, the company said a model prompted to update a cryptocurrency trading application used funds from a locked wallet on a test network. The model “derived wallet keys from publicly known developer recovery phrases, found an account with test-network funds, and used that account to pay for the requested contract deployment.”

在第三份报告中，该公司称一个被要求更新加密货币交易应用程序的模型，使用了测试网络上一个锁定钱包中的资金。该模型“从公开的开发者恢复短语中推导出了钱包密钥，找到了一个拥有测试网络资金的账户，并使用该账户支付了所请求的合约部署费用。”

In the last report, OpenAI said that a model bypassed restrictions researchers had placed on the types of web requests it could make. During reinforcement-learning training, the model had been prompted to seek public trade statistics. OpenAI went on: After finding a public yearbook and submitting an answer, it continued probing for another route to the statistics service.

在最后一份报告中，OpenAI 表示，一个模型绕过了研究人员对其可发起的网络请求类型所设定的限制。在强化学习训练期间，该模型被要求查找公共贸易统计数据。OpenAI 继续说道：在找到一本公开的年鉴并提交答案后，它继续探索通往统计服务的其他路径。

It has become common for researchers and journalists to describe incidents like these as AI “going rogue.” That’s not necessarily true. While prompts fed to the models didn’t instruct them to use the alternate methods for completing their objectives, models are trained to be efficient, steadfastly persistent, and, when possible, to find shortcuts that lessen workloads.

研究人员和记者将此类事件描述为人工智能“失控”已变得司空见惯。但这未必准确。虽然输入给模型的提示词并未指示它们使用替代方法来完成目标，但模型被训练为高效、坚定且在可能的情况下寻找减轻工作量的捷径。