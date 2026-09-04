---
title: "bikini / exploitarium"
originalUrl: "https://github.com/bikini/exploitarium"
date: "2026-09-04T23:09:58.838Z"
---

# bikini / exploitarium

**Statement**
This repo was incomplete when published. In regard to AI usage, my fuzzing workflow was automated by AI with a strict workflow. I used GPT-5.3 for ALL the fuzzing, as barely any "thought" is necessary when provided with an efficient workflow. Contrary to the growing narrative that I'm just some random child burning tokens, I DO actually have a degree in the subject and have published multiple papers on fuzzing methodology. I spent years researching and developing new tools and ideas for how to fuzz. You do NOT need a SOTA model to help you identify these issues, I promise! While being able to afford a better model is helpful, my data seems to show that it is only marginal when paired with decent human oversight and a good workflow. None of the actual PoCs themselves were vibe-coded; I did, in fact, hand-type them. I did use AI assistance for RustDesk, however, as I'm not as familiar with the language. The README files are very clearly entirely AI, however, as AI can format a pretty mean Markdown file. I reviewed them to make sure they were accurate.

**声明**
此仓库在发布时并不完整。关于 AI 的使用，我的模糊测试（fuzzing）工作流是通过 AI 在严格的流程下自动完成的。我使用 GPT-5.3 完成了所有的模糊测试，因为在拥有高效工作流的情况下，几乎不需要进行什么“思考”。与外界日益增长的传言相反，我并非只是个随意消耗算力的孩子，我确实拥有相关学科的学位，并发表过多篇关于模糊测试方法的论文。我花费了数年时间研究并开发新的工具和模糊测试思路。我向你保证，你并不需要最先进（SOTA）的模型来帮助你识别这些问题！虽然能够负担得起更好的模型确实有帮助，但我的数据表明，当配合良好的人工监督和高效的工作流时，模型性能的差异微乎其微。所有的概念验证（PoC）本身都不是靠“感觉”编写的；事实上，它们都是我亲手敲出来的。不过，我在 RustDesk 项目中确实使用了 AI 辅助，因为我对该语言不太熟悉。README 文件显然完全是由 AI 生成的，因为 AI 确实能排版出非常出色的 Markdown 文件。我已对它们进行了审核，以确保其准确性。

I'd also like to credit someone for the objdump finding. It turns out, someone beat me to the punch (they also have a better PoC too!). Please give them the credit they deserve: https://github.com/4D4J/objdump-Out-Of-Bounds-write

我还要向 objdump 漏洞的发现者致谢。事实证明，有人比我先发现了它（而且他们的 PoC 也做得更好！）。请给予他们应得的认可：https://github.com/4D4J/objdump-Out-Of-Bounds-write

**News/Contact**
I've also noticed a surprising amount of "security researchers" aren't able to adjust the PoC to work in their environment. I will broaden the PoCs for those select few... If you wish to collaborate/discuss with me, contact me on telegram @ashdfrkl Sharing this repo keeps me motivated to continue dropping my findings for you all.

**新闻/联系方式**
我还注意到，有相当多令人惊讶的“安全研究人员”无法调整 PoC 以使其在自己的环境中运行。我会为那少数几个人优化 PoC……如果你希望与我合作或讨论，请通过 Telegram 联系我：@ashdfrkl。分享这个仓库让我有动力继续为大家发布我的研究发现。

**Exploitarium**
A consolidated archive of my public proof-of-concept and vulnerability research writeups. Most folders contain one of my former standalone PoC repos, preserved with its original README and tracked files. New research entries are added directly here as self-contained folders.

**Exploitarium**
这是一个整合了我公开的概念验证（PoC）和漏洞研究报告的存档。大多数文件夹包含我之前独立的 PoC 仓库，并保留了其原始的 README 和跟踪文件。新的研究条目将直接作为独立的文件夹添加到此处。

*(Note: The table of contents and consolidation check details have been omitted for brevity, as they represent technical logs of the repository's migration.)*

*(注：为保持简洁，已省略目录表格及整合检查详情，这些内容主要为仓库迁移的技术日志。)*