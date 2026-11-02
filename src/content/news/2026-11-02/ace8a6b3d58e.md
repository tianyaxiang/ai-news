---
title: "Memdoor: A team of 5 Qwen3.8-27B models beats Fable 5 on LiveCodeBench Hard"
originalUrl: "https://github.com/guregodevo/memdoor/tree/main/examples/workflows/team-solve"
date: "2026-10-31T22:46:12.000Z"
excerpt: false
---

# Memdoor: A team of 5 Qwen3.8-27B models beats Fable 5 on LiveCodeBench Hard

Five small models on one programming problem: a planner, two ideators, a solver, a manager and a repair worker, each from a fresh context, talking only through files on disk; a script that runs the samples decides success. The method of GVS5H (Lee, 2026) as a Memdoor workflow: eight YAML files, no code, no model named.

针对同一个编程问题使用五个小型模型：一个规划者、两个构思者、一个求解者、一个管理者和一个修复工，每个模型都处于全新的上下文中，仅通过磁盘上的文件进行交流；一个运行样本的脚本决定是否成功。GVS5H (Lee, 2026) 的方法作为 Memdoor 工作流：八个 YAML 文件，没有代码，没有指定模型。

The authors' harness on the same model, Qwen3.8-27B, with their prompts, loop and 128K reply cap. The first ten problems of their LiveCodeBench Hard list, five passes each, graded on every hidden test with their corrected grader:

作者在同一个模型 Qwen3.8-27B 上使用了他们的提示词、循环和 128K 的回复上限。针对其 LiveCodeBench Hard 列表中的前十个问题，每个问题进行五次尝试，并使用他们修正后的评分器对每个隐藏测试进行评分：

The authors' columns: the regraded result files in their repository, the numbers in their paper. Ours: bench/results/parity-5pass/, all 50 runs, each with every request and reply, the program, the grader's output and the cost. A median of 40 minutes and $0.39 a run; $35.79 for the 50.

作者的列：他们仓库中的重新评分结果文件，以及他们论文中的数字。我们的：bench/results/parity-5pass/，全部 50 次运行，包含每次请求和回复、程序、评分器输出以及成本。中位时间为 40 分钟，单次运行成本 0.39 美元；50 次运行总计 35.79 美元。

What this does and does not show:

这展示了什么以及没有展示什么：

Parity check (every request byte for byte against their code), hosts, the changes it took, the first run's findings: NOTES.md. The result on one page: memdoor.ai/docs/team-solve.

一致性检查（针对他们的代码逐字节核对每个请求）、主机、所做的更改、首次运行的发现：NOTES.md。单页结果：memdoor.ai/docs/team-solve。

Your problem: task.md and paired tests/N.in / tests/N.out. Program: solution.py, stdin in, compared to the samples with diff. Needs Python 3 and bash. /workflow in memdoor tui draws the run live.

你的问题：task.md 和配对的 tests/N.in / tests/N.out。程序：solution.py，标准输入，通过 diff 与样本进行比较。需要 Python 3 和 bash。memdoor tui 中的 /workflow 可以实时绘制运行过程。

The steps name no model; the /model pin answers, a local one included (how to connect one). A role is its prompt in steps/.

这些步骤没有指定模型；/model pin 用于回答，包括本地模型（如何连接一个）。一个角色就是其在 steps/ 中的提示词。

Every agent prompt: "fresh context, read the files, do not rely on chat"; the paper credits that ledger discipline for the gain. One YAML file per step in steps/, in the format of mario, the engine underneath. requires: is the DAG.

每个代理的提示词：“全新的上下文，读取文件，不要依赖聊天记录”；论文将收益归功于这种账本式的纪律。steps/ 中每个步骤对应一个 YAML 文件，采用底层引擎 mario 的格式。requires: 即为 DAG（有向无环图）。