---
title: "An Indic Voice Agent with CUGA"
originalUrl: "https://huggingface.co/blog/ibm-research/an-indic-voice-agent-with-cuga"
date: "2026-11-25T10:22:09.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# An Indic Voice Agent with CUGA

Most useful knowledge is written and digitized in English. Most of the people who need it speak, and think, in their own regional languages like Hindi, Tamil, Telugu, Gujarati, Marathi and many others. Many would rather talk than type. We built a small voice agent to close that gap, using CUGA as the agent harness. This post explains the use case and what we learned. You can try it yourself in CUGA Apps.

大多数有用的知识都是以英语编写和数字化的。然而，大多数需要这些知识的人使用印地语、泰米尔语、泰卢固语、古吉拉特语、马拉地语等区域语言进行交流和思考。许多人更愿意通过语音而非打字来获取信息。我们利用 CUGA 作为代理框架，构建了一个小型语音代理来弥合这一差距。本文介绍了该用例以及我们的经验教训。您可以在 CUGA Apps 中亲自尝试。

The use case: a Farm Assistant. A farmer asks a question aloud, in their own language: how do I tell good seed from bad? The agent: Listens and turns the speech into text. Searches a 154-page agricultural handbook, which is written in English. Answers in two to four spoken sentences, in the language the question was asked in, using only what the handbook says. Speaks the answer back and shows the source pages, so the answer can be checked. If someone asks about cricket or coding, it politely steers them back to farming instead of making something up.

用例：农业助手。农民用自己的语言大声提问：“我该如何区分种子的好坏？”代理程序会：倾听并将语音转换为文本；搜索一本用英语编写的 154 页农业手册；仅根据手册内容，用提问者使用的语言回答两到四句口语；将答案读出并显示来源页面，以便核实。如果有人询问板球或编程，它会礼貌地将其引导回农业话题，而不是胡编乱造。

Where CUGA fits. CUGA (ConfigUrable Generalist Agent) is IBM Research's open-source agent harness. It handles the model wiring, tool management, state and guardrails, so you write tools and a prompt instead of the agent loop. Here we use it as an embedded SDK inside a small web app, for three things: One agent, any model. Switch between watsonx and OpenAI with one setting. The knowledge engine. Parse a PDF, chunk it, embed it, and search it locally with agent.knowledge.search(). Conversation threads. Each question gets a fresh thread, so one person's language or context never leaks into another's.

CUGA 的定位。CUGA (ConfigUrable Generalist Agent) 是 IBM Research 的开源代理框架。它处理模型连接、工具管理、状态和护栏，因此您只需编写工具和提示词，而无需编写代理循环。在这里，我们将其作为嵌入式 SDK 用于小型 Web 应用程序中，主要实现三点：单一代理，适配任何模型（通过一个设置即可在 watsonx 和 OpenAI 之间切换）；知识引擎（解析 PDF、分块、嵌入并使用 agent.knowledge.search() 进行本地搜索）；对话线程（每个问题都有独立的线程，确保一个人的语言或上下文不会泄露给他人）。

The key design idea is simple: CUGA is a text-in, text-out brain. Voice is two thin layers around it. audio ──▶ speech-to-text ──▶ knowledge.search ──▶ CUGA (grounded answer) ──▶ text-to-speech ──▶ audio. Because the agent only ever sees text, you can build and test it with plain text first, then add the ears and the mouth. You can also swap speech providers without touching the agent. We support two: Sarvam AI's cloud speech APIs, called directly from the user's browser, and open-source models (SraVaani for speech-to-text, Svara for text-to-speech) running on your own server.

核心设计理念很简单：CUGA 是一个文本输入、文本输出的大脑。语音只是围绕它的一层薄薄的包装。音频 ──▶ 语音转文本 ──▶ 知识搜索 ──▶ CUGA（基于事实的回答） ──▶ 文本转语音 ──▶ 音频。由于代理程序只处理文本，您可以先用纯文本构建和测试，然后再添加“耳朵”和“嘴巴”。您还可以更换语音提供商而无需改动代理程序。我们支持两种方式：直接从用户浏览器调用的 Sarvam AI 云语音 API，以及在您自己的服务器上运行的开源模型（SraVaani 用于语音转文本，Svara 用于文本转语音）。

The hard part is not the voice. Adding speech is the easy part. The hard part is cross-lingual retrieval: a Hindi question has to find an English paragraph. Search works by turning text into vectors and finding the nearest ones. CUGA's default embedding model is English-only, so it turns Hindi into vectors that carry almost no meaning. With it, a Hindi or Tamil question still retrieves five passages, but they are the wrong ones. The model, correctly told to answer only from what it was given, quietly says "the handbook doesn't cover that". Every layer behaves correctly, so there is no error and no warning.

难点不在于语音。添加语音功能很容易，难点在于跨语言检索：印地语的问题必须找到对应的英语段落。搜索的工作原理是将文本转换为向量并寻找最接近的向量。CUGA 的默认嵌入模型仅支持英语，因此它将印地语转换为几乎没有意义的向量。在这种情况下，印地语或泰米尔语的问题虽然能检索到五个段落，但内容是错误的。模型被正确地要求仅根据提供的内容回答，因此它会平静地回答“手册中没有涵盖该内容”。每一层都运行正常，所以没有错误或警告。

The fix is to use a multilingual embedding model (we use intfloat/multilingual-e5-large), so the same meaning lands in the same place whatever the language. Conceptually simple, though wiring it into CUGA took a small workaround (shown in the tutorial). After that, one English document serves every language, and you do not need translated copies of anything. Our advice: before you tune a single prompt, ask your agent one question in a non-English language and check that it finds the right pages.

解决方法是使用多语言嵌入模型（我们使用 intfloat/multilingual-e5-large），这样无论何种语言，相同的含义都会落在相同的位置。这在概念上很简单，尽管将其接入 CUGA 需要一个小技巧（教程中有展示）。此后，一份英语文档即可服务于所有语言，您无需翻译任何副本。我们的建议是：在调整提示词之前，先用非英语提问，检查代理是否能找到正确的页面。

Making it sound right and keeping it safe. A few small decisions mattered more than we expected: Write for the ear. Markdown, bullet points, citation tags and bracketed translations such as "millet (बाजरा)" all sound wrong when read aloud. The prompt asks the model not to produce them, and a light formatter strips any that slip through before speech. Keep guardrails cheap. Simple input checks catch obvious off-topic questions. If one gets through, the model starts its reply with OFF_TOPIC, and the app swaps in a polite redirect. No second LLM call, so the voice path stays fast.

确保听感自然并保持安全性。一些小决定比我们预期的更重要：为听觉而写。Markdown、项目符号、引用标签和括号内的翻译（如“millet (बाजरा)”）在朗读时听起来都很奇怪。提示词要求模型不要生成这些内容，轻量级格式化程序会在语音转换前剔除漏网之鱼。保持护栏低成本。简单的输入检查可以拦截明显的离题问题。如果漏掉一个，模型会以 OFF_TOPIC 开头回复，应用程序会切换到礼貌的重定向。无需第二次调用大模型，因此语音路径保持快速。

Ground every answer. The model sees only the retrieved passages, is told not to use outside knowledge, and the page sources are shown to the user. Keep keys out of the server. With the Sarvam option, the browser talks to Sarvam directly. The server receives only text and never sees the user's key.

确保每个答案都有据可依。模型只能看到检索到的段落，被告知不得使用外部知识，并且向用户显示页面来源。将密钥保留在服务器之外。使用 Sarvam 选项时，浏览器直接与 Sarvam 通信。服务器仅接收文本，永远不会看到用户的密钥。

Try it. You do not need to set anything up to see it work. Open the voice agent in CUGA Apps on Hugging Face Spaces, ask a farming question in your language, and listen to the answer: CUGA Apps on Hugging Face → Want to build one yourself? Our step-by-step tutorial, Build an Indic Voice Agent with CUGA, starts from an empty folder and adds each layer in turn.

尝试一下。您无需进行任何设置即可体验。在 Hugging Face Spaces 的 CUGA Apps 中打开语音代理，用您的语言询问一个农业问题，然后听取回答：CUGA Apps on Hugging Face → 想自己构建一个吗？我们的分步教程《使用 CUGA 构建印度语音代理》从一个空文件夹开始，逐步添加每一层。

Beyond farming: Scaling for Bharat. Nothing here is specific to agriculture. Swap the handbook for scheme documents, health advisories, or legal guides, and you have a different assistant. Swap the speech provider and you change the deployment model, such as cloud for speed or on-premises for data sovereignty, without rewriting the agent. Voice-first, multilingual assistants are how digital services can reach people who were never served well by English-only text screens. Building them on an open, auditable harness, with answers tied to sources people can check, is how they earn trust.

超越农业：为印度（Bharat）扩展。这里的内容并不局限于农业。将手册换成政策文件、健康建议或法律指南，您就拥有了不同的助手。更换语音提供商即可改变部署模式，例如为了速度选择云端，或为了数据主权选择本地部署，而无需重写代理。语音优先的多语言助手是数字服务触达那些无法从纯英语文本界面获得良好服务的人群的方式。在开放、可审计的框架上构建它们，并将答案与用户可核实的来源挂钩，是它们赢得信任的关键。

This approach sits precisely at the intersection of what we are building with IBM Bharat Core. Bharat Core is an optimized AI stack built on top of IBM Sovereign Core, designed specifically for the Indian ecosystem to run Indic AI workloads securely on local infrastructure. When scaling a voice agent from a prototype to a secure enterprise application (like a vernacular KYC system or multilingual government...

这种方法恰好处于我们利用 IBM Bharat Core 构建的内容的交汇点。Bharat Core 是在 IBM Sovereign Core 之上构建的优化 AI 堆栈，专为印度生态系统设计，旨在在本地基础设施上安全地运行印度语言 AI 工作负载。当将语音代理从原型扩展到安全的企业级应用程序（如本地语言 KYC 系统或多语言政府系统）时……