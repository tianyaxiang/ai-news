---
title: "AgentOps Is Not MLOps: What Breaks in Your Monitoring Stack When Agents Go to Production"
originalUrl: "https://towardsdatascience.com/agentops-is-not-mlops-what-breaks-in-your-monitoring-stack-when-agents-go-to-production/"
date: "2026-09-01T01:10:36.126Z"
---

# AgentOps Is Not MLOps: What Breaks in Your Monitoring Stack When Agents Go to Production
# AgentOps 不等于 MLOps：当智能体（Agents）投入生产时，你的监控栈会发生什么故障

For years, keeping a model healthy in production meant keeping it close to the model you shipped. You watch drift against a reference window. You track latency against an SLO. You check accuracy against a holdout. A number moves, you retrain. That stopped working once models started calling tools.
多年来，保持模型在生产环境中的健康状态，意味着要确保它与你发布时的模型保持一致。你会根据参考窗口观察偏移（drift），根据服务水平目标（SLO）跟踪延迟，并根据留存数据集（holdout）检查准确性。一旦某个指标波动，你就重新训练。但当模型开始调用工具时，这一套方法就不再奏效了。

The industry response was fast. Gartner expects more than 40 percent of agentic AI projects to be canceled by the end of 2027, citing escalating costs, unclear value, and inadequate risk controls. Every observability vendor now ships agent tracing.
行业的反应非常迅速。Gartner 预计，到 2027 年底，超过 40% 的智能体 AI 项目将被取消，理由是成本不断上升、价值不明确以及风险控制不足。现在，每一家可观测性供应商都提供了智能体追踪功能。

What went unexamined is how teams actually ran the migration. Most ran it as an addition: new spans on top of the old stack; nothing came off it. The inherited signals still fire, and several now report healthy on runs that failed.
然而，团队实际上是如何进行迁移的，这一点却未被审视。大多数团队将其作为一种“附加”操作：在旧的监控栈之上增加新的跨度（spans），而没有移除任何旧东西。继承下来的信号依然在触发，其中一些甚至在任务失败时仍报告“健康”。

I learned this from a multi-step review pipeline I run, which fans out to parallel model reviewers and writes their verdicts into an application datastore. The first bad verdict it shipped had a fully green trace: every span succeeded, latencies normal, output wrong.
我从我运行的一个多步骤审查流水线中发现了这一点。该流水线将任务分发给并行的模型审查员，并将他们的结论写入应用数据库。它发出的第一个错误结论，其追踪记录却是完全“绿色”的：每一个跨度都成功了，延迟正常，但输出结果却是错的。

### Migration by Addition: The Part Nobody Audits
### 附加式迁移：无人审计的部分

What got added is real progress. OpenTelemetry's GenAI semantic conventions now define agent spans: `create_agent`, `invoke_agent`, `execute_tool`, and `plan`. The spec still carries a Development status, worth knowing before you standardize on it.
增加的内容确实是进步。OpenTelemetry 的生成式 AI 语义约定现在定义了智能体跨度：`create_agent`、`invoke_agent`、`execute_tool` 和 `plan`。该规范目前仍处于开发阶段，在将其作为标准之前，这一点值得注意。

Langfuse, LangSmith, Arize Phoenix, W&B Weave, and AgentOps all emit some version of it, so you get a waterfall of the run: which tool fired, what it returned, what it cost.
Langfuse、LangSmith、Arize Phoenix、W&B Weave 和 AgentOps 都发布了该规范的某种版本，因此你可以获得运行过程的瀑布流：哪个工具被触发、返回了什么、成本是多少。

The part that never got re-examined is everything underneath. Drift monitors kept running. Retraining triggers kept their old thresholds untouched. And alerting never moved past a single boundary. Those components encode assumptions that hold for a stateless scoring service and stop holding for a system that runs a loop.
从未被重新审视的部分是底层的逻辑。偏移监控器继续运行，重训练触发器保持旧的阈值不变，警报系统也从未超越单一边界。这些组件所编码的假设适用于无状态的评分服务，但对于运行循环系统的智能体来说，这些假设已不再适用。

### Five Assumptions, Five Silent Failures
### 五个假设，五个隐性故障

Five assumptions carry most of the weight:
五个假设承担了大部分逻辑权重：

1. **Outputs are comparable across runs.** Same input, roughly the same output, so a difference means something.
1. **输出在不同运行间具有可比性。** 相同的输入，大致相同的输出，因此差异意味着有问题。
2. **Inference is stateless.** The request is the unit of work; nothing carries over.
2. **推理是无状态的。** 请求是工作单元；没有任何状态会延续。
3. **One request crosses one decision boundary.** There's a single place to set a threshold.
3. **一个请求跨越一个决策边界。** 只有一个地方可以设置阈值。
4. **Ground truth arrives.** A label eventually shows up to score against.
4. **真实标签（Ground truth）会到达。** 最终会出现一个标签用于评分。
5. **A human sits between the model and the consequence.** The model recommends; a person acts.
5. **人类处于模型和后果之间。** 模型提供建议，人类执行操作。

Each breaks differently once the model runs a loop, invisible to the signal watching for it. A monitoring stack fails by staying green.
一旦模型开始运行循环，每一个假设都会以不同的方式失效，而监控信号却无法察觉。监控栈的失败表现为它依然显示“绿色”。

### Comparable outputs: when the same input passes and fails in the same week
### 可比性输出：当相同的输入在同一周内时而成功时而失败

Run the same support ticket through your agent twice. Monday it refunds the customer and closes out; Thursday it loops on an order number the customer already gave.
将同一个支持工单通过你的智能体运行两次。周一它给客户退款并关闭工单；周四它却在客户已经提供的订单号上陷入循环。

Tau-bench measures this with pass^k: the odds that all k attempts at one task succeed. A single gpt-4o attempt cleared roughly 61 percent of retail tasks, but run the same task 8 times, and the odds of all 8 succeeding drop below 25 percent. Score your agent on one run per input, and your dashboard reports 2.4 times the reliability your users actually get.
Tau-bench 使用 pass^k 来衡量这一点：即一次任务中 k 次尝试全部成功的概率。单次 gpt-4o 尝试大约能完成 61% 的零售任务，但如果运行 8 次，8 次全部成功的概率会降至 25% 以下。如果你按每个输入运行一次来评估智能体，你的仪表盘报告的可靠性将是用户实际体验到的 2.4 倍。

### Stateless inference: when the path is the defect and the answer looks fine
### 无状态推理：当路径本身是缺陷，而答案看起来没问题时

A courier mishears the street name at the first stop. Every turn after that is perfect, and every one is wrong. Agent systems fail the same way. Anthropic's own multi-agent research system hit this pattern directly: "one step failing can cause agents to explore entirely different trajectories." Each step's output feeds the next, so an early error doesn't get corrected; it compounds.
快递员在第一站听错了街道名称。之后每一次转弯都非常完美，但每一次都走错了路。智能体系统以同样的方式失败。Anthropic 自己的多智能体研究系统直接遇到了这种模式：“一个步骤的失败可能导致智能体探索完全不同的轨迹。”每一步的输出都会反馈给下一步，因此早期的错误不会被纠正，反而会不断累积。

This isn't a rare edge case. The MAST taxonomy sorted over 1,600 traces into 14 failure modes, and the largest single category was system design: errors baked into how steps are wired together, not into any individual step's output. Retraining a model can't fix that, because the defect was never in the model. It was in the path.
这并非罕见的边缘情况。MAST 分类法将 1,600 多条追踪记录归纳为 14 种故障模式，其中最大的单一类别是系统设计：错误植根于步骤之间的连接方式，而不是任何单个步骤的输出。重新训练模型无法解决这个问题，因为缺陷从来不在模型里，而是在路径中。

### One decision boundary: when 85 percent per step is a coin flip at ten
### 单一决策边界：当每步 85% 的成功率在十步后变成抛硬币

A single threshold assumes a single place to put it. But a ten-step run only succeeds if every step succeeds, and probabilities multiply. Take a per-step success rate of 85 percent, healthy on any dashboard you've built: run ten steps, and 0.85^10 works out to roughly 20 percent. One clean run in five. Per-step monitoring never multiplies. It reports the 85; your users live the 20.
单一阈值假设只有一个设置点。但十步运行只有在每一步都成功时才算成功，而概率是相乘的。假设每步成功率为 85%（在任何仪表盘上看起来都很健康）：运行十步后，0.85^10 大约等于 20%。即五次运行中只有一次是完美的。分步监控从不进行乘法计算。它报告的是 85%，而你的用户体验到的是 20%。

### Ground truth arrives: when the label lands after the action does
### 真实标签的到达：当标签在动作执行后才出现时

Your agent files a ticket, updates a CRM record, and drafts a reply. A human reads the reply on Thursday; the CRM record sits unread. Traditional monitoring compares a model's output to a 'ground truth' label to check if it was right, but that label has to come from somewhere. When the output was a prediction, a human could label it fast. When the output is an action, the only real judge is a human checking the result days later, or never.
你的智能体提交了一个工单，更新了 CRM 记录，并起草了回复。人类在周四阅读了回复；而 CRM 记录却无人问津。传统的监控将模型的输出与“真实标签”进行比较以检查其是否正确，但标签必须有来源。当输出是预测时，人类可以快速标记；当输出是动作时，唯一的真正评判者是几天后检查结果的人类，或者根本没人检查。

So teams substitute a cheap automated verifier instead: a script that checks the output, not a person. MAST found "many existing verifiers perform only superficial checks", like confirming code compiles rather than confirming it's correct. One ChatDev-built chess program passed every one of those checks, shipped with runtime bugs anyway, and scored just 25 percent on the ProgramDev benchmark.
因此，团队用廉价的自动化验证器代替：一个检查输出的脚本，而不是人类。MAST 发现“许多现有的验证器只执行表面检查”，例如确认代码是否能编译，而不是确认其逻辑是否正确。一个由 ChatDev 构建的国际象棋程序通过了所有这些检查，但发布后仍带有运行时错误，在 ProgramDev 基准测试中仅得 25 分。

### A human in between: when the only witness to the action is the trace
### 人类居中：当动作的唯一见证者是追踪记录时

This assumption is the expensive one, because the agent doesn't just predict; it acts. Remove the human, and the trace (the log of what the agent did) becomes your only evidence that the action was correct.
这个假设代价最高，因为智能体不仅在预测，它还在执行动作。移除了人类，追踪记录（智能体所做之事的日志）就成了你证明动作正确的唯一证据。

But a trace can be faked, even by accident. A CrewAI issue documents agents writing out a fake-but-convincing sequence: 'I ran the tool, here's what it returned,' without the tool ever actually running. The model simply generated text that looked like a real tool call and result. Native tool calling (where the system, not the model, executes the action) avoids this.
但追踪记录是可以被伪造的，甚至是意外伪造的。一个 CrewAI 的问题记录显示，智能体写出了一段虚假但令人信服的序列：“我运行了工具，返回结果如下”，而实际上工具从未运行过。模型只是生成了看起来像真实工具调用和结果的文本。原生工具调用（由系统而非模型执行动作）可以避免这种情况。