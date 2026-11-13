---
title: "Gemini 4 Hydrogen"
originalUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/"
date: "2026-11-12T18:01:48.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# Gemini 4 Hydrogen

Hydrogen brings cutting-edge intelligence to everyone.

Hydrogen 为每个人带来了尖端智能。

SVP, Google DeepMind and Chief AI Architect, Google

Google DeepMind 高级副总裁兼 Google 首席 AI 架构师

Your browser does not support the audio element.

您的浏览器不支持音频元素。

Today, we’re introducing Gemini 4 Hydrogen, bringing cutting-edge intelligence to everyone — with speed and efficiency for everyday coding and agentic workflows.

今天，我们推出了 Gemini 4 Hydrogen，旨在为每个人提供尖端智能，并为日常编码和代理工作流带来速度与效率。

While our frontier models, Gemini 4 Carbon and Gemini 4 Argon, excel at deep, long-horizon reasoning on your hardest problems, Hydrogen is built for rapid execution across diverse agentic workflows. With Hydrogen, we’re also bringing Gemini 4 to everyone — for all tiers of Google AI Studio, the Gemini API, Gemini for business, the Gemini app, Google Search, and paid Google AI Pro and Ultra subscribers in Google Antigravity.

虽然我们的前沿模型 Gemini 4 Carbon 和 Gemini 4 Argon 擅长针对最棘手的问题进行深度、长周期的推理，但 Hydrogen 专为在各种代理工作流中实现快速执行而构建。随着 Hydrogen 的推出，我们也将 Gemini 4 带给了所有人——包括 Google AI Studio 的所有层级、Gemini API、企业版 Gemini、Gemini 应用、Google 搜索，以及 Google Antigravity 中付费的 Google AI Pro 和 Ultra 订阅用户。

Hydrogen surpasses Argon on the Artificial Analysis Intelligence Index at its default high thinking level (51 vs. 50, and reaching 54 at its highest xhigh thinking setting), while often completing tasks faster than models in its class. Gemini 4 Hydrogen is priced flat across its entire 1 million-token context window at $1.50 per million input tokens and $7.50 per million output tokens.

在默认的“高”思维水平下，Hydrogen 在人工智能分析指数（Artificial Analysis Intelligence Index）上超过了 Argon（51 分对 50 分，在最高的 xhigh 思维设置下可达到 54 分），同时完成任务的速度通常快于同类模型。Gemini 4 Hydrogen 在其整个 100 万 token 的上下文窗口内定价统一，输入 token 每百万收费 1.50 美元，输出 token 每百万收费 7.50 美元。

In real-world software development, while teams rely on frontier models like Carbon and Argon for deep architectural judgment when designing systems or untangling subtle bugs, they still need a fast, disciplined execution model for writing code, running tests, and verifying changes. Hydrogen is built to stand on its own as a model for everyday work — or to pair with Carbon and Argon as the high-efficiency execution engine in multi-model workflows.

在现实的软件开发中，虽然团队在设计系统或梳理细微 Bug 时依赖 Carbon 和 Argon 等前沿模型进行深度的架构判断，但他们仍然需要一个快速、规范的执行模型来编写代码、运行测试和验证更改。Hydrogen 既可以作为日常工作的独立模型，也可以与 Carbon 和 Argon 配合，作为多模型工作流中的高效执行引擎。

To help make this multi-model collaboration automatic, we’re introducing Orchestrator in Google Antigravity. Rather than using a single model from start to finish, Orchestrator dynamically switches between models like Carbon and Hydrogen within the same session. On Terminal-Bench 4.0, Orchestrator reached near-Carbon task success rates while, on average, consuming 24% less quota and completing 19% faster. For workflows that require parallel agents, Carbon can act as the coordinator while Hydrogen can power worker and verifier agents to build and test changes simultaneously across isolated workspaces — helping teams ship complex projects faster without driving up token costs.

为了帮助实现这种多模型协作的自动化，我们在 Google Antigravity 中引入了 Orchestrator。Orchestrator 不会从头到尾只使用单一模型，而是在同一会话中动态切换 Carbon 和 Hydrogen 等模型。在 Terminal-Bench 4.0 测试中，Orchestrator 的任务成功率接近 Carbon，同时平均减少了 24% 的配额消耗，完成速度提升了 19%。对于需要并行代理的工作流，Carbon 可以担任协调者，而 Hydrogen 则可以驱动工作代理和验证代理，在隔离的工作区中同时构建和测试更改，从而帮助团队在不增加 token 成本的情况下更快地交付复杂项目。

Beyond multi-model workflows, Hydrogen is a major standalone upgrade for teams migrating from Gemini 3.8 Flash. It delivers significant leaps in both speed and intelligence — finishing tasks 2.5 times faster at its high default setting while more than tripling Terminal-Bench 4.1 scores (57% vs. 18.2%), cutting fabricated claims by more than 5x, and adapting cleanly when a tool call fails or a search returns empty. It also matches or outperforms competing models in its class across core developer and enterprise workflows:

除了多模型工作流之外，对于从 Gemini 3.8 Flash 迁移的团队来说，Hydrogen 是一次重大的独立升级。它在速度和智能方面都有显著飞跃——在默认的高设置下，完成任务的速度快了 2.5 倍，Terminal-Bench 4.1 的得分提升至原来的三倍以上（57% 对 18.2%），虚假声明减少了 5 倍以上，并且在工具调用失败或搜索结果为空时能进行清晰的适配。它在核心开发者和企业工作流中也与同类竞争模型持平或表现更优：

Using Hydrogen for on-the-fly 3D coding, Geminisland lets anyone add to a shared voxel island from a single prompt to generate custom structures live on the map that players can walk around and explore in first person. Try the live app.

通过使用 Hydrogen 进行即时 3D 编码，Geminisland 让任何人只需一个提示词，就能在共享的体素岛屿上添加内容，实时生成地图上的自定义结构，玩家可以在其中以第一人称视角漫步和探索。尝试使用该实时应用。

Paired with our new Gemini front end design skill in Google Antigravity, Hydrogen built an e-commerce storefront in one shot complete with a WebGL2 topographic shader, pinned four-stage scrollytelling, a thermal split-slider, a 3D wireframe spec card, and a live finish configurator. Try the live app and the Gemini front end design skill.

结合我们在 Google Antigravity 中新的 Gemini 前端设计技能，Hydrogen 一次性构建了一个电子商务店面，其中包括 WebGL2 地形着色器、固定式四阶段滚动叙事、热感分割滑块、3D 线框规格卡片以及实时成品配置器。尝试使用该实时应用和 Gemini 前端设计技能。

In Google Antigravity, Hydrogen turned Google Sheets into an animated pixel canvas by shrinking thousands of cells combining Python, native =LET(...) formulas, and conditional formatting to paint and animate full-motion scenes directly inside a live spreadsheet.

在 Google Antigravity 中，Hydrogen 通过缩小数千个单元格，结合 Python、原生 =LET(...) 公式和条件格式，将 Google 表格变成了动画像素画布，直接在实时电子表格中绘制并制作全动态场景。

Starting from a YouTube keynote video and a design template in Google Antigravity, Hydrogen generated a multi-slide presentation directly in Google Slides, then ran an autonomous audit-and-fix loop to catch overlapping text and clean up every slide layout.

从 YouTube 主题演讲视频和 Google Antigravity 中的设计模板开始，Hydrogen 直接在 Google Slides 中生成了多页演示文稿，然后运行了一个自动审计和修复循环，以捕获重叠文本并清理每一页幻灯片的布局。

With Gemini in Google Sheets, Hydrogen can help teams rapidly turn financial data into interactive models that dynamically adjust based on various forecasting scenarios, generating outputs over 30% faster than previous models in Sheets canvas.

借助 Google 表格中的 Gemini，Hydrogen 可以帮助团队快速将财务数据转化为交互式模型，这些模型可根据各种预测场景进行动态调整，在表格画布中的输出速度比以前的模型快 30% 以上。

We built Gemini 4 Hydrogen for real-world usability. Hydrogen’s four thinking levels — low, medium, high (default), and a new xhigh tier — offer a wide range of options across quality, latency, and cost, scaling in a smooth, predictable progression so you only wait and pay for the reasoning depth a task requires. Across thinking levels, Hydrogen matches or outperforms some of the competing models in its class while often finishing tasks faster and using fewer output tokens.

我们构建 Gemini 4 Hydrogen 是为了实现现实世界的可用性。Hydrogen 的四个思维水平——低、中、高（默认）以及一个新的 xhigh 层级——在质量、延迟和成本方面提供了广泛的选择，并以平滑、可预测的方式扩展，因此您只需为任务所需的推理深度等待和付费。在各个思维水平上，Hydrogen 都与同类竞争模型持平或表现更优，同时通常能更快地完成任务并使用更少的输出 token。

For consumers, Gemini 4 Hydrogen makes it easier to get things done, staying on track and following instructions more closely across multi-turn conversations.

对于消费者而言，Gemini 4 Hydrogen 使完成任务变得更加容易，在多轮对话中保持专注并更紧密地遵循指令。

In the Gemini app, Hydrogen makes your everyday assistant even more helpful — it’s better at following your guidance, calling the right tools, and getting you to a reliable output with less back-and-forth.

在 Gemini 应用中，Hydrogen 让您的日常助手更加得力——它能更好地遵循您的指导，调用正确的工具，并以更少的往复交互为您提供可靠的输出。

Moving fast from idea to working prototype, Hydrogen built an interactive 3D globe and Web Audio music engine driven by real-time lightning strikes and mapped every bolt around the world into visual ripples and live ambient music.

从创意到工作原型，Hydrogen 快速构建了一个交互式 3D 地球仪和 Web Audio 音乐引擎，该引擎由实时闪电驱动，并将全球的每一道闪电映射为视觉涟漪和实时环境音乐。

When tasked to create a WebGL2 water and glass visualizer, Hydrogen built it from pure math and SDF textures — simulating real-time light refraction, reflection, dispersion, and absorption.

当被要求创建 WebGL2 水和玻璃可视化工具时，Hydrogen 完全通过数学和 SDF 纹理构建了它——模拟了实时的光折射、反射、色散和吸收。

Using a custom skill for video assembly and adhering to a creative brief, Gemini 4 Hydrogen created an archival sizzle reel about the element ‘Hydrogen’, sourcing public-domain footage and cutting it into one continuous edit with clean narration.

使用自定义的视频剪辑技能并遵循创意简报，Gemini 4 Hydrogen 制作了一部关于“氢”元素的档案宣传片，搜集了公共领域的素材，并将其剪辑成一段带有清晰旁白的连续视频。

Hydrogen is significantly upgrading Search, delivering more helpful, intuitive responses for all users globally.

Hydrogen 正在显著升级搜索功能，为全球所有用户提供更有帮助、更直观的响应。

Gemini 4 Hydrogen brings improvements from our latest Gemini 4 safety and security stack to our broadest audience yet, combining built-in training with real-time surface safeguards to help mitigate both misalignment.

Gemini 4 Hydrogen 将我们最新的 Gemini 4 安全与保障堆栈的改进带给了我们迄今为止最广泛的用户群体，结合了内置训练与实时表面防护，以帮助减轻失调问题。