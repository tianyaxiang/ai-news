---
title: "I built a Cricket World Cup 2027 predictor on a home NAS, and backtested it honestly"
originalUrl: "https://dev.to/architpandya/i-built-a-cricket-world-cup-2027-predictor-on-a-home-nas-and-backtested-it-honestly-38l0"
date: "2026-10-20T00:20:16.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

The ODI Cricket World Cup 2027 starts in South Africa, Zimbabwe and Namibia in October 2027. I wanted to know who is likely to win, and I wanted a project that goes all the way from raw data to a live, public model. So I built cricstat, a cricket statistics site with a World Cup 2027 predictor, and it runs on a Synology NAS in my home. This post covers the model, how I tested it, and the engineering around it, including the parts that didn't work out.

2027年板球世界杯（ODI）将于2027年10月在南非、津巴布韦和纳米比亚举行。我不仅想知道谁最有可能夺冠，还想做一个从原始数据到实时公开模型的完整项目。因此，我构建了cricstat，这是一个包含2027年世界杯预测功能的板球统计网站，它运行在我家中的群晖（Synology）NAS上。本文将介绍该模型、我的测试方法以及相关的工程实现，包括那些最终失败的部分。

The answer first As of 14 October 2026, after 50,000 simulated tournaments: Team cricstat Elo Chance of winning India 1615 23.3% South Africa 1527 19.6% New Zealand 1588 17.5% Australia 1538 10.7% Pakistan 1521 8.7% South Africa has only the fourth-highest rating but is second favourite, because it plays most of its matches at home. That's the model doing its job, not a fan's bias: every team gets the same rules and there are no hand adjustments.

首先公布答案：截至2026年10月14日，在经过50,000次模拟锦标赛后：印度队（Elo 1615，胜率23.3%）、南非队（Elo 1527，胜率19.6%）、新西兰队（Elo 1588，胜率17.5%）、澳大利亚队（Elo 1538，胜率10.7%）、巴基斯坦队（Elo 1521，胜率8.7%）。南非队的评分仅排第四，却是夺冠第二热门，这是因为它大部分比赛都在主场进行。这是模型在发挥作用，而非粉丝偏见：每支球队都遵循相同的规则，没有任何人为调整。

The data Everything comes from Cricsheet, which publishes ball-by-ball data for about 23,000 matches as open data (ODC-BY). There's no API: you download zip files of JSON. A daily job on the NAS fetches the last 7 days of matches, upserts them by match ID, checks the data and only then swaps in the new database. If a check fails, the old database stays live and I get an email. A few things I learned the hard way: Match IDs aren't always numbers. 25 of them look like wi_... (West Indies women's domestic games). Store IDs as text everywhere.

数据来源：所有数据均来自Cricsheet，它以开放数据（ODC-BY）形式发布了约23,000场比赛的逐球数据。这里没有API，你需要下载JSON格式的压缩包。NAS上的每日任务会抓取过去7天的比赛数据，按比赛ID进行更新插入，检查数据无误后才会替换旧数据库。如果检查失败，旧数据库将继续运行，我也会收到邮件提醒。我从惨痛教训中学到几点：比赛ID并不总是数字，其中25个看起来像“wi_...”（西印度群岛女子国内比赛）。因此，必须在所有地方将ID存储为文本。

Every player statistic has to be derived from the deliveries. Cricsheet gives you balls, not career averages, so I wrote a "golden figures" test set: known career numbers for real players that the build must reproduce. Some data is deliberately missing. Cricsheet withholds Afghanistan's men's matches in protest at how Afghan women's cricket has been treated. Afghanistan is in the 2027 World Cup, so the model uses a small reviewed list of 188 results from public sources for ratings only. The site explains this and links to Cricsheet's reasons.

每位球员的统计数据都必须从逐球记录中推导出来。Cricsheet提供的是球的数据，而非职业生涯平均值，所以我编写了一个“黄金数据”测试集：即构建模型必须能够复现的真实球员已知职业生涯数据。部分数据是故意缺失的：Cricsheet为了抗议阿富汗女子板球所受的待遇，扣留了阿富汗男子队的比赛数据。由于阿富汗队参加2027年世界杯，模型仅使用从公开来源获取的188场比赛结果列表进行评分。网站对此进行了说明，并链接到了Cricsheet的原因说明。

Player names, birth dates and photos come from Wikidata and Wikimedia Commons (CC0 and credited free licences). That gives about 4,800 player pages and 176 team pages that search engines can read. The model: Elo, then simulation The baseline is deliberately simple: an Elo rating for every men's ODI team, built from every match since 2002. After each match: expected_a = 1 / (1 + 10 ** (-(r_a - r_b + HOME * h) / 400)) # h = +1 home, -1 away, 0 neutral r_a += K * margin_multiplier * (result_a - expected_a) # win 1, tie 0.5, loss 0

球员姓名、出生日期和照片来自维基数据（Wikidata）和维基共享资源（Wikimedia Commons）（CC0和署名免费许可）。这提供了约4,800个球员页面和176个球队页面，可供搜索引擎抓取。模型：Elo评分加模拟。基准模型故意设计得很简单：为每支男子ODI球队建立Elo评分，基于2002年以来的每场比赛。每场比赛后：expected_a = 1 / (1 + 10 ** (-(r_a - r_b + HOME * h) / 400))（h为主场+1，客场-1，中立0），r_a += K * margin_multiplier * (result_a - expected_a)（胜1，平0.5，负0）。

The settings were chosen by grid search over 2,016 combinations, scored on log loss. Each backtest only used data from before the period it was tested on, so the model never saw the answers. The winners: K = 20, home advantage = 75 rating points, a margin-of-victory multiplier, and 5% regression toward the mean each 1 January. Then the tournament itself is played 50,000 times in its published format: Qualifier, groups, Super 7, semi-finals and final. Each run also includes: Rain: each host's measured no-result rate (for example, 7.6% for ODIs in South Africa). Uncertainty: a random shift to every team's rating, sized from how much ratings really move over a year.

参数设置是通过对2,016种组合进行网格搜索选出的，并以对数损失（log loss）进行评分。每次回测仅使用测试期之前的数据，因此模型从未“偷看”过答案。最终胜出的参数：K=20，主场优势=75分，引入胜分差乘数，以及每年1月1日向均值回归5%。随后，锦标赛以公布的赛制（预选赛、小组赛、超级7强赛、半决赛和决赛）进行50,000次模拟。每次模拟还包括：降雨（每个主办国的无结果比赛率，例如南非ODI为7.6%）和不确定性（根据评分一年内的实际波动幅度，对每支球队的评分进行随机偏移）。

A team rated 1615 today won't be exactly 1615 in a year, and pretending otherwise makes the odds too confident. The simulation is vectorised numpy and takes seconds, even on a 4-core Celeron. Is it any good? This is the part I cared about most. Before publishing, the model had to pass four automatic gates, all on matches it had never seen, plus a final sanity review by me where I wasn't allowed to change any number: 1. Beat simple baselines on every men's ODI since 2019 (900 matches), each predicted before it was played.

今天评分1615的球队一年后不可能正好还是1615，假装如此会使赔率过于自信。模拟过程使用numpy向量化，即使在4核赛扬处理器上只需几秒钟。它好用吗？这是我最关心的部分。在发布前，模型必须通过四个自动关卡，所有测试均基于其从未见过的比赛，外加我个人的最终合理性审查（期间不允许修改任何数字）：1. 在2019年以来的每场男子ODI比赛（900场）中击败简单基准模型，且每场预测均在比赛前完成。

Model Log loss Brier Coin flip 0.693 0.247 Win rate (last 24 months + home/away) 0.662 0.231 cricstat Elo 0.605 0.205 2. Be calibrated: when it says 70%, about 70% should happen. The calibration slope is 0.97 (1.0 is perfect). In the 0.7–0.8 bin, the average prediction was 75.0% and the favourites won 75.1% of 181 matches. 3. Do at least as well as the win-rate model on real World Cup matches, with ratings frozen the day before each tournament. On the 92 decided matches at the 2019 and 2023 World Cups it picked the winner 76% of the time; the win-rate model managed 62%.

模型对数损失与Brier分数对比：抛硬币（0.693/0.247）、胜率模型（0.662/0.231）、cricstat Elo（0.605/0.205）。2. 校准性：当模型预测70%时，实际发生率应接近70%。校准斜率为0.97（1.0为完美）。在0.7–0.8区间，平均预测值为75.0%，热门球队在181场比赛中胜率为75.1%。3. 在真实世界杯比赛中表现至少不逊于胜率模型，评分在每届锦标赛前一天冻结。在2019年和2023年世界杯的92场比赛中，它有76%的时间预测正确，而胜率模型仅为62%。

4. Replay check: fed the real results of 2019 and 2023, the simulator must produce the real semi-finalists. It does. And the result everyone asks about: before the 2019 World Cup, its top pick was England (36%), who won. Before 2023, it had India at 42% and Australia at 16%. Australia won. Two tournaments prove very little either way, so the site reports them but doesn't use them as a gate. What it gets wrong The methodology page has a full "limits" section, but the main ones are: It rates teams, not players. It knows nothing about squads, injuries, retirements, the toss or the pitch.

4. 重演检查：输入2019年和2023年的真实结果，模拟器必须得出真实的半决赛入围者。它做到了。至于大家最关心的结果：2019年世界杯前，它的首选是英格兰（36%），最终英格兰夺冠。2023年前，它预测印度42%，澳大利亚16%，最终澳大利亚夺冠。两届锦标赛证明不了太多，所以网站会报告这些结果，但不会将其作为准入关卡。它的不足之处：方法论页面有完整的“局限性”部分，主要包括：它评估的是球队而非球员。它对阵容、伤病、退役、掷硬币或球场情况一无所知。

A team that rests its stars for a series looks weaker than it is. It's weaker in 2026 so far: 56% accuracy on 78 matches, against 69% over the whole test period. Small samples swing, but I'm watching it. Net run rate isn't modelled, because Elo doesn't predict margins. Teams level on points are split by wins, then at random. It barely changes the title odds, and the page says so. That first limit is why the next step is a machine-learning challenger: gradient boosting on Elo difference, home advantage, form and squad strength built from the actual playing XIs.

一支在系列赛中轮休明星球员的球队看起来比实际更弱。2026年至今表现较弱：78场比赛准确率为56%，而整个测试期为69%。小样本会有波动，但我会持续关注。净胜分率（Net run rate）未建模，因为Elo无法预测分差。积分相同的球队先按胜场数排名，再随机排序。这几乎不影响夺冠赔率，页面也对此作了说明。第一个局限性正是下一步引入机器学习挑战者的原因：基于Elo差值、主场优势、状态以及由实际出场阵容构建的阵容强度进行梯度提升（gradient boosting）。

After that comes a deep-learning model trained on about 11.6 million deliveries. Whichever is best calibrated on the same backtests takes over the live forecast, and the comparison gets published either way. Running it on a NAS The whole thing runs at home on a Synology NAS: Celeron J3455, 16 GB RAM, no GPU. One gotcha: the CPU has no AVX, so some prebuilt Python wheels crash with "illegal instruction" even though they install fine. Every image is now smoke-tested on the NAS itself, not just in CI. The deploy pipeline: CI (

之后是基于约1160万次投球训练的深度学习模型。无论哪种模型在相同的回测中校准效果最好，都将接管实时预测，且对比结果无论如何都会发布。在NAS上运行：整个系统运行在家庭群晖NAS上：赛扬J3455，16GB内存，无GPU。一个陷阱：该CPU没有AVX指令集，因此一些预编译的Python包虽然安装正常，但运行时会报“非法指令”错误。现在每个镜像不仅在CI中测试，还会直接在NAS上进行冒烟测试。部署流水线：CI（