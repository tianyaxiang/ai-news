---
title: "Open models have real benefits. Do they outweigh the risks?"
originalUrl: "https://www.technologyreview.com/2026/10/13/1146366/open-models-have-real-benefits-do-they-outweigh-the-risks/"
date: "2026-10-13T10:00:00.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

### Open models have real benefits. Do they outweigh the risks?
### 开放模型确实有益。它们带来的风险是否更大？

MIT Technology Review Explains: Let our writers untangle the complex, messy world of science and technology to help you understand what’s coming next. You can read more from the series here. Late last month, Anthropic released a report arguing that the model GLM-5.3 poses a major cyberattack risk. The report’s core concern is that the powerful new model, released in August by the Chinese company Z.ai, is freely available for anyone to download and modify.

《麻省理工科技评论》解读：让我们的作者为您梳理复杂且混乱的科技世界，助您洞察未来趋势。您可以点击此处阅读该系列的更多文章。上个月底，Anthropic 发布了一份报告，称 GLM-5.3 模型构成了重大的网络攻击风险。该报告的核心担忧在于，这款由中国公司 Z.ai 于 8 月发布的强大新模型，任何人都可以免费下载并进行修改。

Anthropic’s assertion is only the latest move in a long-running debate about whether frontier AI models should be made open, like GLM-5.3, or should stay locked behind the doors of the frontier labs. These days, much of the debate about how to handle open models is playing out in public—and there’s a lot of money resting on its outcome. Nvidia CEO Jensen Huang, who has a lot to gain if people continue buying their own hardware to run open models, advocates enthusiastically for the United States to develop more of them, whereas Anthropic’s Dario Amodei, who runs a company that could be undermined by cheap, powerful models, advocates for a more cautious approach.

Anthropic 的这一主张，只是关于前沿人工智能模型究竟应该像 GLM-5.3 那样开源，还是应该锁在前沿实验室内部这一长期争论的最新进展。如今，关于如何处理开放模型的大部分争论都在公开进行，而其结果也牵动着巨大的经济利益。英伟达首席执行官黄仁勋（Jensen Huang）如果人们继续购买自己的硬件来运行开放模型，他将获益良多，因此他热情地主张美国开发更多的开放模型；而 Anthropic 的达里奥·阿莫代（Dario Amodei）经营的公司可能会受到廉价且强大的模型的冲击，因此他主张采取更谨慎的态度。

But beneath all these commercial incentives, there is real substance to disagreements about open models. “I think a lot of the way you come down on the openness debate is influenced by how you come down on the AI debate,” says David Gray Widder, an assistant professor at the University of Texas at Austin School of Information. Those who are concerned about AI safety warn that open models can easily be misused by bad actors, whereas those who focus more on AI’s practical potential urge that this power should not sit behind the closed doors of just a few big companies, and that open models could help spread it more widely.

但在所有这些商业动机之下，关于开放模型的争议确实存在实质性内容。德克萨斯大学奥斯汀分校信息学院助理教授大卫·格雷·威德（David Gray Widder）表示：“我认为，你在开放性问题上的立场，很大程度上受到你在人工智能问题上立场的影响。”那些关注人工智能安全的人警告说，开放模型很容易被恶意行为者滥用；而那些更关注人工智能实际潜力的人则敦促，这种力量不应仅仅掌握在少数几家大公司手中，开放模型有助于将其更广泛地传播。

There are a range of ways to handle open models between banning them entirely and releasing them willy-nilly. But any approach that a government or a society might take still involves trade-offs between safety and democratization. Deciding whether to support or limit the production of open models requires understanding those risks and benefits in depth. What are the benefits of open models? Let’s start with the basics. A closed model, like the models that power ChatGPT and Claude, can only be accessed through a website, app, or API. An open model, on the other hand, can be directly downloaded: The details about its internal structure, encoded in a long series of numbers known as the model weights, are publicly available.

在完全禁止和随意发布之间，处理开放模型的方法有很多种。但政府或社会采取的任何方法，都涉及安全与民主化之间的权衡。决定是支持还是限制开放模型的生产，需要深入了解其中的风险和收益。开放模型有什么好处？让我们从基础开始。像驱动 ChatGPT 和 Claude 那样的闭源模型，只能通过网站、应用程序或 API 访问。而开放模型则可以直接下载：其内部结构的详细信息（编码为一长串数字，即模型权重）是公开可用的。

Such models are sometimes called “open-weight models,” to distinguish them from models for which even more information, such as details about the training procedure, is available. Right now, closed models are more capable than open models—as of publication, the top eight models on the Artificial Analysis LLM leaderboard are all closed, though open models are only a handful of months behind in development. But there are several reasons why someone might opt to use an open model rather than a closed one. Because open models are downloadable, people can run them on their own computers or hard drives. They can even retrain them to behave differently, if they have the expertise and resources to do so.

这类模型有时被称为“开放权重模型”，以区别于那些提供更多信息（如训练过程细节）的模型。目前，闭源模型的能力强于开放模型——截至本文发布时，Artificial Analysis 大语言模型排行榜上的前八名均为闭源模型，尽管开放模型在开发进度上仅落后几个月。但人们选择使用开放模型而非闭源模型有几个原因。由于开放模型可以下载，人们可以在自己的电脑或硬盘上运行它们。如果具备相应的专业知识和资源，他们甚至可以对其进行重新训练，以实现不同的行为。

If you’re an academic researcher working to understand and improve AI systems, you almost certainly need to work with open models in your research. When working with closed models, researchers can’t do much more than send prompts and observe the responses. But researchers can observe the inner workings of open models, as well as the “chain of thought” that the models use to think through a problem before answering. They can also combine multiple open models to build new systems, compress them to make them more efficient, and fine-tune them for new applications.

如果您是一位致力于理解和改进人工智能系统的学术研究人员，那么在研究中几乎肯定需要使用开放模型。在使用闭源模型时，研究人员除了发送提示词并观察响应之外，几乎做不了什么。但研究人员可以观察开放模型的内部运作，以及模型在回答问题前用于思考的“思维链”。他们还可以组合多个开放模型来构建新系统，对其进行压缩以提高效率，并针对新应用进行微调。

Businesses, too, have reasons to prefer open models. Even if you depend on an external provider to run them for you, open models still typically cost less than closed models, according to a recent report from Mozilla. And if businesses want to use AI to process sensitive data or proprietary information, running a local model on their own hardware may be the best way to keep their operations secure. But perhaps the most important quality of open models is that they challenge the tight control the frontier labs have over how most of us use AI.

企业也有理由偏爱开放模型。根据 Mozilla 最近的一份报告，即使您依赖外部供应商来运行模型，开放模型的成本通常也低于闭源模型。如果企业希望利用人工智能处理敏感数据或专有信息，在自己的硬件上运行本地模型可能是确保业务安全的最优方案。但开放模型最重要的特质，或许在于它们挑战了前沿实验室对我们大多数人使用人工智能方式的严格控制。

“The clearest, biggest argument [for open models] is around preventing mass concentration of power—it is about making sure that this foundational technology is a public good,” says Elizabeth Seger, senior policy advisor at the Tony Blair Institute for Global Change. “I think we’re at this juncture where the question of who controls the infrastructure that allows AI to operate is as big of a question as who gets to control information on the internet.” Seger sees the future of AI playing out in different ways, depending on the role that open models have.

托尼·布莱尔全球变革研究所高级政策顾问伊丽莎白·塞格（Elizabeth Seger）表示：“（支持开放模型）最明确、最大的论点在于防止权力的过度集中——即确保这项基础技术成为一种公共产品。我认为我们正处于这样一个关头：谁控制了人工智能运行的基础设施，这个问题与谁控制了互联网上的信息一样重要。”塞格认为，人工智能的未来将根据开放模型所扮演的角色，以不同的方式展开。

In one possible future, frontier AI systems are controlled entirely by select people, companies, or governments, and as those systems grow more powerful, those groups have increasing control over what our world looks like. The world’s most sophisticated hacking models, for example, are currently all made in the United States, so it’s entirely up to US companies and the US government whether other countries can use them to shore up their own cyber defenses. If those companies remain in the lead, we could in principle wind up in a world in which the United States is capable of hacking any other country, but no one is capable of hacking it.

在一种可能的未来中，前沿人工智能系统完全由少数人、公司或政府控制，随着这些系统变得越来越强大，这些群体对我们世界面貌的控制力也越来越强。例如，世界上最先进的黑客模型目前全部产自美国，因此其他国家能否利用这些模型来加强自身的网络防御，完全取决于美国公司和美国政府。如果这些公司保持领先地位，原则上我们最终可能会进入这样一个世界：美国有能力入侵任何其他国家，而没有人有能力入侵美国。

Frontier open models could change that balance. “If every individual had a loyal-to-them AI system that was safe [and secure], I think that would be a much less concerning world than one in which they have to just rely on a government that says, ‘Yeah, we’ve got a super intelligent AI system, it’s got this plan, it’s inscrutable to all of you, just trust us,’” says Hamish Hobbs, director of AI policy at the AI policy at the Centre for Long-Term Resilience. But open models are not a geopolitical.

前沿开放模型可能会改变这种平衡。长期韧性中心（Centre for Long-Term Resilience）人工智能政策主任哈米什·霍布斯（Hamish Hobbs）表示：“如果每个人都拥有一个忠于自己且安全可靠的人工智能系统，我认为这个世界会比现在更让人放心。在现在这个世界里，人们只能依赖政府，而政府却说：‘是的，我们有一个超级智能的人工智能系统，它有这个计划，你们谁也看不懂，只要相信我们就行了。’”但开放模型并非地缘政治。