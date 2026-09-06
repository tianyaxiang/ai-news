---
title: "My Grandmother Ran Ajo. I Built the Version Where the Pot Can't Walk Away"
originalUrl: "https://dev.to/dannwaneri/my-grandmother-ran-ajo-i-built-the-version-where-the-pot-cant-walk-away-5gkn"
date: "2026-09-06T22:59:40.251Z"
---

# My Grandmother Ran Ajo. I Built the Version Where the Pot Can't Walk Away
# 我祖母曾经营“Ajo”互助会，我构建了一个资金无法被卷走的版本

DEV Weekend Challenge: Generosity Edition Submission 💜 This is a submission for Weekend Challenge: Generosity Edition.
DEV 周末挑战：慷慨主题参赛作品 💜 这是我为“周末挑战：慷慨主题”提交的作品。

### What I Built
### 我构建了什么

My late grandmother was a trader. She ran ajo for years, the way a lot of Nigerian market women did, and used her payout round to restock her shop. More stock meant more sales meant more saved for the next round. It worked, until the round it didn't: she told me about a time the person holding the pot borrowed against it to solve a family problem and couldn't pay it back in time. He didn't vanish maliciously. He just couldn't make the group whole again, and the circle absorbed the loss. That's the actual failure mode. Not fraud, most of the time. Just one person holding money that isn't theirs, under pressure, with no enforcement above their own word.
我已故的祖母曾是一名商人。她像许多尼日利亚市场女性一样，经营“Ajo”（互助储蓄会）多年，并利用她轮到的那笔钱来补充店铺库存。库存越多意味着销售额越高，为下一轮存下的钱也就越多。这种模式一直很有效，直到有一次出了问题：她曾告诉我，有一次负责保管资金的人为了解决家庭问题挪用了公款，结果没能及时还上。他并非恶意卷款潜逃，只是无法补齐资金缺口，最终整个互助圈只能承担损失。这才是真正的失败模式。大多数时候并非欺诈，而是一个人在压力之下保管着不属于自己的钱，且除了个人信誉外没有任何强制约束。

DEV framed this challenge around ethical and accountable giving, and equity and inclusion. Ajo isn't charity. Nobody donates and walks away. Every member eventually gets their own money back, plus one round early. But it's the original financial-inclusion tool for people the banks never served: market traders, mostly women, building credit and liquidity together because nobody else the banks would serve. My grandmother didn't have a bank account for this. She had her circle. Ajo Chain is my answer to that specific story.
DEV 将本次挑战的主题定为道德、负责任的捐赠以及公平与包容。Ajo 并非慈善，没有人会捐钱后就一走了之。每位成员最终都能拿回自己的钱，甚至还能提前一轮获得资金。但对于银行从未覆盖的人群——主要是市场女性商贩——来说，这是最初的金融普惠工具。她们通过这种方式共同建立信用和流动性，因为没有其他人愿意为她们提供服务。我祖母当时没有银行账户，她只有她的互助圈。Ajo Chain 就是我对那个故事的回应。

Before I wrote a line of code, I set one rule: if you deleted a technology, would something actually break, or would the project just look less polished? Everything that failed that test got cut. One whole technology did, and I'll get to why.
在写下一行代码之前，我设定了一个原则：如果删掉某项技术，系统会真正崩溃，还是仅仅看起来没那么精致？所有没通过这项测试的技术都被砍掉了。有一项技术被彻底移除，稍后我会解释原因。

Ajo (also called esusu) is a rotating savings circle. Five people, one fixed amount each round, one payout that rotates to a different person every round. Ajo Chain doesn't digitize the spreadsheet. It replaces the one person everyone has to trust with a Solana program that can't disappear. Escrow, rotation order, and default tracking all live on-chain. Contributions only release to the next member in the fixed order, and only once all five have paid. A missed deadline gets flagged permanently. It's visible forever, not something a moderator can quietly erase later.
Ajo（也称为 esusu）是一种轮转储蓄圈。五个人，每轮固定金额，每轮支付给不同的人。Ajo Chain 并不是简单的电子表格数字化，它用一个无法消失的 Solana 程序取代了那个每个人都必须信任的“保管人”。托管、轮转顺序和违约追踪全部在链上完成。只有在五个人全部支付后，资金才会按固定顺序发放给下一位成员。错过的截止日期会被永久标记，这是永久可见的，而不是管理员事后可以悄悄抹去的。

The part I didn't expect going in: the smart contract can tell you a contribution didn't arrive. It can't tell you why. So I added one narrow Gemini agent whose only job is reading the on-chain evidence around a disputed default and drafting a plain-language note for a human moderator, distinguishing "the transfer failed on-chain" from "this member shows no attempt to pay." It never finalizes anything. It drafts, a human decides.
我最初没预料到的是：智能合约能告诉你贡献没到账，但无法告诉你原因。所以我添加了一个专门的 Gemini 代理，它的唯一工作就是读取关于违约争议的链上证据，并为人类管理员起草一份通俗易懂的说明，区分“链上转账失败”和“该成员没有任何支付尝试”。它从不做出最终决定，它只负责起草，由人类来裁决。

### How I Built It
### 我是如何构建的

Solana is the enforcement layer. This is the only part I'd call load-bearing without qualification. Each group gets an escrow PDA and a fixed rotation order set once at creation. Four instructions: `create_group`, `contribute`, `mark_default`, `release_payout`. `release_payout` won't move a lamport until all five members have contributed, and it pays out to exactly one address: whoever is next in the array, checked directly in the handler, not just in an account constraint I could talk myself into trusting.
Solana 是执行层。这是我唯一会毫无保留地称之为“承重结构”的部分。每个小组都有一个托管 PDA 和在创建时设定好的固定轮转顺序。包含四个指令：`create_group`（创建小组）、`contribute`（贡献）、`mark_default`（标记违约）、`release_payout`（发放支付）。在五名成员全部贡献之前，`release_payout` 不会移动任何 lamport，并且它只会支付给一个地址：数组中的下一位成员。这是在处理程序中直接检查的，而不是仅仅依赖于我可能自欺欺人去信任的账户约束。

Both checks run before the transfer, not after. There's no recipient field a caller controls; the address is read out of the group's own on-chain state. Delete this layer and you're back to trusting one person with the pot. That's the whole reason the project exists.
这两项检查都在转账前运行，而不是转账后。调用者无法控制接收方字段；地址是从小组自身的链上状态中读取的。删掉这一层，你就又回到了必须信任某个保管人的老路。而这正是该项目存在的全部意义。

Gemini is the fairness layer, and I'm going to undersell it on purpose. It reads the group's on-chain round state plus the disputed member's recent transaction history, then drafts a short note: did the evidence show an attempt that failed, or no attempt at all? That's my grandmother's story again, the same question a human circle asked about the same kind of person, just with transaction signatures instead of memory and reputation.
Gemini 是公平层，我特意要淡化它的作用。它读取小组的链上轮次状态以及违约成员近期的交易历史，然后起草一份简短说明：证据显示是尝试失败，还是根本没有尝试？这又回到了我祖母的故事，这是人类互助圈对同类人提出的相同问题，只不过现在用的是交易签名，而不是记忆和声誉。