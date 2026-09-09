---
title: "When One Process Becomes Too Much: Splitting a Pipeline into MCP Services"
originalUrl: "https://towardsdatascience.com/when-one-process-becomes-too-much-splitting-a-pipeline-into-mcp-services/"
date: "2026-09-09T23:28:49.362Z"
---

# When One Process Becomes Too Much: Splitting a Pipeline into MCP Services
# 当单个进程不堪重负：将流水线拆分为 MCP 服务

The usual way to build a multi-part pipeline is to put every part in the same process and call between them with function calls. It's the path of least resistance, and for a while it's genuinely fine until the parts stop being small enough to treat as implementation detail. Once each one is really a mini-application in its own right, with its own dependencies, its own failure modes, and its own release cadence, sharing a process with the others stops being convenient and starts being the thing that breaks first. That's the point we'd reached, and it's why we put a real boundary, an MCP server around each one instead.

构建多部分流水线的常规方法是将每个部分放在同一个进程中，并通过函数调用进行交互。这是阻力最小的路径，在一段时间内确实没问题，直到这些部分变得不再适合作为简单的实现细节。一旦每个部分都真正成为了一个独立的微型应用程序，拥有自己的依赖项、故障模式和发布节奏，共享同一个进程就不再是便利，反而成了最先崩溃的环节。这就是我们所处的阶段，也是为什么我们为每个部分设置了真正的边界——即 MCP 服务器。

### The usual approach and where it stops working
### 常规方法及其失效之处

Here's what we had before: one orchestrator class, each service instantiated inside it, everything sharing a process and a virtual environment:

这是我们之前的情况：一个编排器类，每个服务都在其中实例化，所有内容共享同一个进程和虚拟环境：

```python
# the old way: illustrative, not real code, but the shape is real
class Orchestrator:
    def __init__(self):
        self.extraction = ExtractionEngine() # its own heavy dependency tree
        self.risk = RiskEngine() # a different version of the same library
        self.fraud = FraudEngine() # imports something that conflicts with both

    def run(self, document):
        fields = self.extraction.extract(document) # unhandled exception here
        score = self.risk.score(fields) # this line never runs
        return score
```

Three separate failure modes hide in those seven lines, and none of them are exotic. An unhandled exception in extraction takes risk scoring down with it, because there's no boundary between them, just a call stack and the pipeline doesn't degrade, it stops. A dependency bump for the fraud engine can break the extraction engine's install, because pip doesn't know or care that these are conceptually separate services; it only knows they share one environment. And shipping a bug fix to any single service means redeploying the whole application, because there's only one application to deploy, one process to restart, one blast radius that includes everything.

在那七行代码中隐藏了三种独立的故障模式，而且它们都不罕见。提取过程中的未处理异常会导致风险评分随之崩溃，因为它们之间没有边界，只有调用栈，流水线不会降级，而是直接停止。欺诈引擎的依赖项升级可能会破坏提取引擎的安装，因为 pip 不知道也不关心它们在概念上是独立的服务；它只知道它们共享同一个环境。此外，为任何单个服务发布错误修复意味着必须重新部署整个应用程序，因为只有一个应用程序可供部署，一个进程可供重启，一个包含所有内容的爆炸半径。

The issues show up months after release, not in the demo, once each engine has grown enough real logic and enough real dependencies that "just import it" stops being free. The failure is usually a version pin that quietly forces a downgrade somewhere else, or a memory-heavy extraction run that starves the risk engine of resources it needs in the same process, or a one-line change to fraud detection that nobody thought to test against extraction because on paper they're unrelated. They share an address space, which is a much tighter coupling than anyone designing them separately intended.

这些问题通常在发布数月后才会显现，而不是在演示阶段。当每个引擎都积累了足够的实际逻辑和依赖项时，“直接导入”就不再是免费的了。故障通常表现为版本锁定悄悄强制其他地方降级，或者内存密集型的提取运行耗尽了风险引擎在同一进程中所需的资源，又或者对欺诈检测的一行代码修改，因为在纸面上它们不相关，没人想到要针对提取引擎进行测试。它们共享同一个地址空间，这比设计它们时预期的耦合要紧密得多。

### Why the boundary matters more than the protocol
### 为什么边界比协议更重要

The actual fix isn't MCP specifically, it's a real process boundary around each service so a crash in one doesn't touch the others, a dependency change in one doesn't ripple into another, and each can be deployed, scaled, and restarted on its own schedule. You could get that boundary with plain REST endpoints and hand-rolled clients, and plenty of systems do exactly that, successfully. What MCP adds on top is a single, consistent way for any orchestrator, any agent, any future consumer, to discover what a service can do and call it, without writing a bespoke integration per consumer per service.

真正的解决方案并非特指 MCP，而是为每个服务建立真正的进程边界，这样其中一个崩溃不会影响其他服务，一个服务的依赖项变更不会波及另一个，并且每个服务都可以按照自己的时间表进行部署、扩展和重启。你可以通过普通的 REST 端点和手写的客户端来实现这种边界，许多系统也确实成功地做到了这一点。MCP 在此之上增加的是一种单一、一致的方式，让任何编排器、任何代理或未来的消费者都能发现服务的功能并进行调用，而无需为每个消费者和每个服务编写定制的集成代码。

That distinction is worth holding onto, because it stops you reaching for MCP out of momentum rather than justification. If a service only ever has one caller and that's never going to change, a direct internal API is simpler and a protocol layer buys you nothing. The case for MCP here is specific: an orchestrator that needs a uniform way to reach a growing number of services, calling different ones under different conditions. That's a real reason to use it.

这种区别值得牢记，因为它能防止你仅仅出于惯性而非正当理由去使用 MCP。如果一个服务永远只有一个调用者，且这种情况永远不会改变，那么直接的内部 API 更简单，协议层对你毫无帮助。这里使用 MCP 的理由很明确：一个编排器需要一种统一的方式来访问不断增加的服务，并在不同条件下调用不同的服务。这才是使用它的真正理由。

### Two servers deliberately sharing nothing
### 两个刻意互不共享的服务器

Writing an MCP tool isn't the interesting part; decorate a function, type-hint the arguments, and FastMCP handles the schema. If that mechanic is new to you, it's the same three lines regardless of what the tool does. The interesting part, and the part that's easy to get wrong even once you know the syntax, is what you deliberately leave out of each server so the isolation is real instead of cosmetic.

编写 MCP 工具并不是最有趣的部分；装饰一个函数，为参数添加类型提示，FastMCP 就会处理模式。如果你对这种机制感到陌生，无论工具做什么，它都是那三行代码。有趣的部分，也是即使你知道语法也容易出错的部分，是你刻意从每个服务器中剔除的内容，从而确保隔离是真实的，而不是表面上的。

Here's the extraction service:
这是提取服务：

```python
# extraction_server.py
from fastmcp import FastMCP
mcp = FastMCP("extraction-tools")

class ExtractionFailedError(Exception): pass

@mcp.tool
def extract_fields(document: str) -> dict:
    """Extract structured fields from a raw document."""
    result = extraction_engine.run(document)
    if result.confidence < 0.6:
        raise ExtractionFailedError(
            f"Extraction confidence {result.confidence:.2f} below threshold"
        )
    return result.fields

if __name__ == "__main__":
    mcp.run(
        transport="http",
        host="0.0.0.0",
        port=8931,
    )
```

And risk scoring:
以及风险评分服务：

```python
# risk_server.py
from fastmcp import FastMCP
mcp = FastMCP("risk-tools")

@mcp.tool
def score_risk(fields: dict) -> dict:
    """Score extracted fields for risk."""
    return risk_engine.score(fields)

if __name__ == "__main__":
    mcp.run(
        transport="http",
        host="0.0.0.0",
        port=8932,
    )
```

Neither file imports the other, neither has the other's dependencies installed anywhere near it. They run as two separate processes, on two separate ports, and that's not an incidental deployment detail, it's the entire reason this exists. If the risk engine needs a library upgrade next quarter, that's a change to one process, tested and shipped on its own schedule, and extraction_server.py never finds out it happened. Streamable HTTP is the transport that makes sense for this deployment model; stdio ties the server's lifetime to the process that spawned it, which works well for local clients but not for independently deployed services.

这两个文件互不导入，也没有安装对方的任何依赖项。它们作为两个独立的进程在两个不同的端口上运行，这并非偶然的部署细节，而是它存在的全部原因。如果风险引擎在下个季度需要升级库，那只是对一个进程的更改，按照自己的时间表进行测试和发布，而 extraction_server.py 永远不会察觉到发生了什么。对于这种部署模型，流式 HTTP 是合理的传输方式；stdio 会将服务器的生命周期与生成它的进程绑定，这对于本地客户端很有效，但不适用于独立部署的服务。

What's easy to miss is that the boundary only holds if you actually respect it while writing the tools. It's tempting, once both servers exist, to have extraction_server.py import a shared utils.py that also happens to be imported by risk_server.py. It's convenient, but it quietly recreates the exact coupling you built two servers to avoid. If both need the same validation logic, that logic either gets duplicated...

容易被忽略的是，只有在编写工具时真正尊重边界，边界才能成立。一旦两个服务器都存在，很容易产生诱惑，让 extraction_server.py 导入一个共享的 utils.py，而该文件恰好也被 risk_server.py 导入。这很方便，但它悄悄地重建了你为了避免而构建两个服务器所要消除的耦合。如果两者都需要相同的验证逻辑，那么该逻辑要么被重复……