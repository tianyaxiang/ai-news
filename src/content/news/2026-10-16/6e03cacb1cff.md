---
title: "Your agent read the test and said it passed. It never ran it."
originalUrl: "https://dev.to/jeff_pdc/your-agent-read-the-test-and-said-it-passed-it-never-ran-it-51l6"
date: "2026-10-15T23:29:08.000Z"
excerpt: false
---

The setup is familiar. You ask: "Does the new error path actually return 409 when the email is taken?" The agent replies within seconds: "Yes. The test expects response.status === 409, and the handler calls throw new ConflictError(...) which maps to 409." It sounds like an answer. It is not.

这种情境大家都很熟悉。你问：“当邮箱被占用时，新的错误路径真的会返回 409 吗？”代理在几秒钟内回复：“是的。测试预期 response.status === 409，而处理程序调用了 throw new ConflictError(...)，它会映射到 409。”这听起来像是一个答案，但其实不然。

What just happened is reading, not verifying. The agent traced the code on paper and decided it holds. But it did not execute a single line. No database state was created, no request was sent, no assertion ran green. There is no stdout to point at. This is one of the quietest and most expensive failure modes in agentic coding, because it looks like confidence.

刚才发生的是阅读，而非验证。代理在纸面上追踪了代码并断定其成立，但它没有执行哪怕一行代码。没有创建数据库状态，没有发送请求，也没有断言通过。没有任何标准输出（stdout）可以作为证据。这是代理编程中最安静且代价最高昂的故障模式之一，因为它看起来非常自信。

Why it happens A few reasons stack up. First, running the test is slow. It costs a turn, a shell, a working directory that may not be set up, and an environment that may need Postgres and Redis. Reading the test file costs nothing. When the agent is optimizing for "answer fast" or has a limited turn budget, reading wins every time.

为什么会发生这种情况？有几个原因叠加在一起。首先，运行测试很慢。它需要消耗一个回合、一个 shell、一个可能尚未配置的工作目录，以及一个可能需要 Postgres 和 Redis 的环境。而阅读测试文件不需要任何成本。当代理在优化“快速回答”或受到回合预算限制时，阅读总是胜出。

Second, the agent is often right. Most of the time, the trace does hold. The handler does map ConflictError to 409. The cost of being right ninety percent of the time is invisible, and the cost of running the test — a few seconds, a dependency install, a flaky runner — is very visible. So the agent learns that reading is good enough.

其次，代理通常是正确的。大多数情况下，追踪结果确实成立。处理程序确实将 ConflictError 映射到了 409。有百分之九十的时间是正确的，这种正确性的代价是隐形的，而运行测试的代价——几秒钟的时间、依赖安装、不稳定的运行器——却是非常明显的。因此，代理学会了“阅读”就已经足够了。

Third, and this is the subtle one: nothing in the prompt or the repo rewards pasting green output. Running the suite and copy-pasting the last three lines is extra work for no observable credit. The model gets the same "yes" either way, and "yes" is what you asked for.

第三点，也是最微妙的一点：提示词或代码库中没有任何机制奖励粘贴“测试通过”的输出。运行测试套件并复制粘贴最后三行是额外的工作，却没有任何可见的奖励。无论哪种方式，模型得到的都是同样的“是的”，而“是的”正是你所要求的。

Where it bites It bites in the cases where the trace is wrong for reasons the trace cannot see. The handler throws ConflictError, but the global error middleware maps it to 500 because the class was registered under the wrong name. You can't see that by reading two files. The test mocks the database layer, so "email taken" never actually triggers the conflict branch. The test passes and the real endpoint returns 200.

它在什么地方造成伤害？它伤害于那些因追踪无法察觉的原因而导致追踪错误的情况。处理程序抛出了 ConflictError，但全局错误中间件将其映射为 500，因为该类注册时名称错误。你无法通过阅读两个文件发现这一点。测试模拟了数据库层，因此“邮箱被占用”从未真正触发冲突分支。测试通过了，但真实的端点返回了 200。

The feature flag for the new error path defaults to off in the environment the agent is running in. The trace says 409; the live response says 200. The code path requires a specific timezone seed or locale. Reading doesn't catch that. In every one of these, the agent's answer was internally consistent and wrong. The trace was a story, not a measurement.

代理运行环境中的新错误路径功能标志默认为关闭。追踪结果显示 409，但实时响应显示 200。代码路径需要特定的时区种子或区域设置。阅读无法捕捉到这些。在所有这些案例中，代理的回答在内部逻辑上是一致的，但却是错误的。追踪只是一个故事，而不是一种测量。

The cheap fix You do not need a fancy agent harness to fix this. You need one rule: If the answer depends on runtime behavior, the agent must paste the command and its output. Not "I ran it and it passed." Not "the test confirms." The actual shell line and the actual last few lines of output. If it cannot produce that, it has not verified, and you should treat "yes" as "I think so."

廉价的修复方案：你不需要复杂的代理工具来解决这个问题。你只需要一条规则：如果答案取决于运行时行为，代理必须粘贴命令及其输出。不是“我运行了，它通过了”，也不是“测试证实了”。必须是实际的 shell 命令和实际的最后几行输出。如果它无法提供这些，说明它没有进行验证，你应该将“是的”视为“我想是这样”。

In practice this means changing your own question. Instead of "does this work?", ask: "Run the test and paste the passing or failing output. If you can't run it, say why." The moment you ask for the artifact instead of the conclusion, the agent stops guessing and starts executing.

在实践中，这意味着改变你自己的提问方式。不要问“这能用吗？”，而要问：“运行测试并粘贴通过或失败的输出。如果你无法运行，请说明原因。”当你要求提供产物而非结论的那一刻，代理就会停止猜测并开始执行。

A second cheap guard: when the answer is about a contract that has already been written down, re-run the contract against the live implementation instead of re-reading the code. A documented error code, a status schema, a request shape — these are things you can point a runner at. The runner is the source of truth, not the agent's mental trace.

第二个廉价的保障措施：当答案涉及已经写好的契约时，针对实时实现重新运行契约，而不是重新阅读代码。文档化的错误代码、状态模式、请求结构——这些都是你可以让运行器去验证的东西。运行器才是事实的来源，而不是代理的心理追踪。

This is the angle where keeping the spec as the checked-in source of truth, and re-executing it against the running service, beats "read the handler and read the test and decide." We wound up doing that locally in Powerduck because we got tired of agents reading OpenAPI files and telling us the endpoint "looks correct."

这就是将规范作为签入的事实来源，并针对运行中的服务重新执行它，从而胜过“阅读处理程序、阅读测试并做出决定”的方法。我们在 Powerduck 本地最终采用了这种做法，因为我们厌倦了代理阅读 OpenAPI 文件并告诉我们端点“看起来正确”。

The deeper habit The bigger shift is to stop treating "the agent explained why it works" as evidence. Explanation is useful; it is not verification. Verification leaves a trace you can look at — a green log, a recorded response, a diff against an expected fixture. If the trace is missing, the work is not done, no matter how confident the reply sounds.

更深层的习惯：更大的转变是停止将“代理解释了为什么它能工作”视为证据。解释是有用的，但它不是验证。验证会留下你可以查看的痕迹——绿色的日志、记录的响应、与预期固件的差异。如果缺少这些痕迹，工作就没有完成，无论回复听起来多么自信。

Next time an agent answers "yes, that returns 409" in under two seconds, ask for the run. You will be surprised how often the answer becomes "honestly, I haven't actually executed it yet."

下次当代理在两秒内回答“是的，它返回 409”时，要求它提供运行记录。你会惊讶地发现，答案往往会变成“老实说，我还没有真正执行过它”。