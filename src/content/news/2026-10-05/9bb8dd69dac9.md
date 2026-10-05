---
title: "How well do player projections predict team wins? I froze MLB 2026 first, then checked"
originalUrl: "https://dev.to/yasumorishima/how-well-do-player-projections-predict-team-wins-i-froze-mlb-2026-first-then-checked-3ih1"
date: "2026-10-05T00:07:35.584Z"
---

# How well do player projections predict team wins? I froze MLB 2026 first, then checked
# 球员预测对球队胜场数的预测效果如何？我先锁定了 2026 年 MLB 数据，然后进行了验证

Every spring there are plenty of "how many games will each team win" projections. Most of them build a forecast for each player and add the players up by team. I had long wondered how well that actually works. So I built one of my own and checked it against the 2026 MLB season. I froze the projections in a repository before looking at the results, so nothing could be adjusted afterwards. I have no experience inside the game; this is just an analysis of public data.
每年春天，都会出现大量的“每支球队将赢得多少场比赛”的预测。其中大多数是通过为每位球员建立预测模型，然后将球员数据按球队汇总得出的。我一直很好奇这种方法到底有多有效。因此，我构建了自己的模型，并用 2026 年的 MLB 赛季数据进行了验证。在查看结果之前，我将预测结果锁定在代码库中，以确保事后无法进行任何调整。我没有职业棒球从业经验；这仅仅是对公开数据的分析。

### Data and method
### 数据与方法

*   **Player stats:** batting and pitching from the MLB Stats API, 2015-2026, every player
*   **球员数据：** 来自 MLB Stats API 的 2015-2026 年所有球员的打击和投球数据
*   **Rosters:** each team's 40-man roster on opening day (including the 60-day injured list), from the same API (only what is known before the season)
*   **球员名单：** 来自同一 API 的开幕日每支球队的 40 人名单（包括 60 天伤病名单，仅限赛季前已知信息）
*   **The answer:** final standings (wins, runs scored, runs allowed) from the same API
*   **结果：** 来自同一 API 的最终排名（胜场数、得分、失分）

The player forecasts are based on Marcel, a deliberately simple method by Tom Tango: weight the last three seasons (newer ones more), pull the result toward league average, and adjust a little for age. It is often used as the baseline other systems are compared with. The real Marcel projects each component (home runs, walks, strikeouts, ...) separately; mine is a simplified version that applies its weights, regression, playing time and age factor to wOBA and FIP directly.
球员预测基于 Tom Tango 开发的 Marcel 模型，这是一种刻意简化的方法：对过去三个赛季进行加权（越新的赛季权重越高），将结果向联盟平均水平拉近，并根据年龄进行微调。它常被用作衡量其他系统的基准。真正的 Marcel 模型会分别预测每个组成部分（本垒打、保送、三振等）；而我使用的是简化版本，直接将权重、回归、出场时间和年龄因素应用于 wOBA（加权出垒率）和 FIP（投手独立防御率）。

*   **Batters:** wOBA relative to league average, three seasons weighted 5:4:3, regressed with 1,200 PA of league average
*   **打者：** 相对于联盟平均水平的 wOBA，三个赛季权重为 5:4:3，并以 1,200 个打席（PA）的联盟平均水平进行回归处理
*   **Pitchers:** FIP relative to league average, weighted 3:2:1, regressed with 134 innings of league average
*   **投手：** 相对于联盟平均水平的 FIP，权重为 3:2:1，并以 134 局的联盟平均水平进行回归处理
*   **Playing time:** half of last season plus a tenth of the season before, plus 200 PA for batters and 60 innings (starters) or 25 (relievers) for pitchers
*   **出场时间：** 上赛季的一半加上前一个赛季的十分之一，外加打者的 200 个打席，或投手的 60 局（先发）/ 25 局（后援）
*   **Team:** add up the opening-day 40-man roster into runs scored and allowed, then turn them into wins with the Pythagorean formula
*   **球队：** 将开幕日 40 人名单的预测得分和失分相加，然后通过毕达哥拉斯胜率公式（Pythagorean formula）转化为胜场数

For one batter it looks like this in Python (simplified; the real code also adjusts for age and makes league runs scored and allowed match):
对于一名打者，其 Python 代码逻辑如下（已简化；实际代码还会根据年龄进行调整，并使联盟总得分和总失分匹配）：

```python
# h: the player's last three seasons, one row per season
# rel = that season's wOBA minus that season's league wOBA
w = h.season.map({y - 1: 5, y - 2: 4, y - 3: 3})
rel = (w * h.pa * h.rel).sum() / ((w * h.pa).sum() + 1200) # pull toward league average
pa = 0.5 * pa_last + 0.1 * pa_before + 200 # playing time
runs_above_avg = pa * rel / woba_scale # runs above an average hitter
```

A team's runs scored are league-average runs plus the sum of its players' runs above average; runs allowed are built the same way from the pitchers. Plate appearances and innings are scaled so each team gets 162 games' worth.
一支球队的得分等于联盟平均得分加上其球员高于平均水平的得分之和；失分则以同样方式从投手数据中得出。打席和局数经过缩放，确保每支球队都有 162 场比赛的基准。

To have something to beat, I used three floors that take no work at all:
为了设定一个对比基准，我使用了三个无需任何计算的“底线”：
1.  **Every team .500:** 81 wins each（每队 81 胜）
2.  **Last season's record:** the same winning percentage as last year（与上赛季胜率相同）
3.  **Last season's Pythagenpat:** last year's winning percentage implied by its runs scored and allowed（基于上赛季得分和失分推算的毕达哥拉斯胜率）

If adding up player forecasts is worth the effort, it should at least beat these three. The yardstick is the mean absolute error of wins over the 30 teams.
如果汇总球员预测是有价值的，它至少应该优于这三个基准。衡量标准是 30 支球队胜场数的平均绝对误差（MAE）。

### Over nine past seasons, it beat last season's Pythagenpat in seven
### 在过去九个赛季中，它有七次优于上赛季的毕达哥拉斯胜率

Before 2026 I ran the same thing on the nine seasons 2016-2025 (leaving out the 60-game 2020), projecting each season only from the seasons before it and taking the mean error over its 30 teams. The average over the nine seasons was 8.27 wins, against 10.60 for .500, 9.67 for last season's record and 9.34 for last season's Pythagenpat. It beat the toughest floor, Pythagenpat, in 7 of 9 seasons (not in 2019 or 2025).
在 2026 年之前，我对 2016-2025 年的九个赛季（剔除了 60 场比赛的 2020 年）进行了同样的测试，仅根据之前赛季的数据预测每个赛季，并计算 30 支球队的平均误差。这九个赛季的平均误差为 8.27 胜，而“五成胜率”基准为 10.60 胜，“上赛季记录”为 9.67 胜，“上赛季毕达哥拉斯胜率”为 9.34 胜。它在 9 个赛季中有 7 个赛季击败了最强的基准——毕达哥拉斯胜率（2019 年和 2025 年除外）。

These nine seasons, though, are the ones I was looking at while making design choices, so they may flatter the method. Against Pythagenpat, the 95% bootstrap interval (resampling seasons) only just cleared zero, with an upper end of -0.01 to -0.05 depending on the random seed.
然而，这九个赛季是我在进行模型设计时参考的数据，因此结果可能存在偏差。针对毕达哥拉斯胜率，95% 的自助法置信区间（重采样赛季）仅勉强跨过零点，上限根据随机种子不同在 -0.01 到 -0.05 之间。

### In 2026 it was slightly better than the floors, but not distinguishably
### 2026 年的表现略好于基准，但差异并不显著

For 2026 I wrote the projections to a file and merged them into the repository, together with the scoring rules, before fetching the standings. I froze them after the season had ended, but the projections only use information from before opening day; the point is that the method cannot be adjusted to fit the result. At scoring time I checked that the frozen files had not changed by a byte.
对于 2026 年，我在获取最终排名之前，将预测结果写入文件并合并到代码库中，同时包含了评分规则。我在赛季结束后锁定了这些文件，但预测仅使用了开幕日之前的信息；关键在于该方法无法为了迎合结果而进行调整。在评分时，我确认了锁定的文件没有发生任何字节的变动。

The mean error was 7.92 wins, a little below all three floors. But the 95% intervals from resampling the 30 teams cross zero for every floor (against Pythagenpat: -0.80 wins, -2.82 to +1.36). By the rule set in advance, that is "indistinguishable".
平均误差为 7.92 胜，略低于所有三个基准。但通过对 30 支球队进行重采样得出的 95% 置信区间在所有基准上都跨越了零点（对比毕达哥拉斯胜率：-0.80 胜，区间为 -2.82 至 +1.36）。按照预先设定的规则，这属于“无法区分”。

A version that stretches the projections away from .500 by a factor of 1.25 (fitted on the past seasons) did slightly worse in 2026, at 8.16. The big misses were MIL, TB, SF and ATH.
一个将预测结果向远离五成胜率方向拉伸 1.25 倍的版本（基于过去赛季拟合）在 2026 年的表现稍差，误差为 8.16 胜。预测偏差最大的球队是密尔沃基酿酒人（MIL）、坦帕湾光芒（TB）、旧金山巨人（SF）和奥克兰运动家（ATH）。

*Projected wins across, actual wins up; the closer to the dashed line, the better. MIL was projected for 84 and won 103, TB 80 and 98, SF 83 and 65, ATH 80 and 64.*
*横轴为预测胜场，纵轴为实际胜场；越靠近虚线越好。MIL 预测 84 胜实际 103 胜，TB 预测 80 胜实际 98 胜，SF 预测 83 胜实际 65 胜，ATH 预测 80 胜实际 64 胜。*

The correlation of projected and actual wins was 0.48 (0.63 over the nine past seasons). The projections spread half as wide as the results.
预测胜场与实际胜场的相关系数为 0.48（过去九个赛季为 0.63）。预测结果的分布范围仅为实际结果的一半。

The 30 projected and actual win totals on one line: the projections sit between 67 and 93 wins, while the actual records ran from 58 to 103. Marcel pulls every player toward league average, so the teams built from them are pulled toward .500 too. Even with the actual runs, about 4 wins of error remain.
将 30 支球队的预测和实际胜场总数放在一条线上：预测值集中在 67 到 93 胜之间，而实际记录范围从 58 到 103 胜。Marcel 模型将每位球员向联盟平均水平拉近，因此由他们组成的球队也被拉向五成胜率。即使使用实际得分，仍有约 4 场胜场的误差存在。

A miss splits into two parts: the runs scored and allowed were projected wrong, or the team won more or fewer games than its runs suggest. The second part comes from things like close games, and no player forecast can remove it. So I asked how well the Pythagorean formula does if the actual runs scored and allowed were known. With the actual runs, the average miss is still 3.94 wins. The gap between the projected wins and the wins implied by the actual runs, which is the runs projection being off, averages 8.06 (runs scored were off by a standard deviation of 56, runs allowed by 68). What the miss is made of differs by team.
误差分为两部分：得分和失分预测错误，或者球队胜场数与得分/失分所暗示的胜场数不符。第二部分源于比分接近的比赛等因素，任何球员预测模型都无法消除它。因此，我测试了如果已知实际得分和失分，毕达哥拉斯公式的表现如何。即便使用实际得分，平均误差仍有 3.94 胜。预测胜场与实际得分所暗示胜场之间的差距（即得分预测偏差）平均为 8.06 胜（得分的标准差为 56，失分为 68）。误差的构成因球队而异。

For the four big misses, I split the miss into those two parts. Blue is the runs projection (projected wins minus wi...
对于四个偏差最大的球队，我将误差拆分为上述两部分。蓝色代表得分预测（预测胜场减去...）