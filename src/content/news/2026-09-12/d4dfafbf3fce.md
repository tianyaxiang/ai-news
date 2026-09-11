---
title: "Building Faultline: A Reusable Chaos-Injection and Linearizability-Checking Harness"
originalUrl: "https://dev.to/pratyush2802/building-faultline-a-reusable-chaos-injection-and-linearizability-checking-harness-4h6n"
date: "2026-09-11T23:34:03.722Z"
---

# Building Faultline: A Reusable Chaos-Injection and Linearizability-Checking Harness

Building Faultline: A Reusable Chaos-Injection and Linearizability-Checking Harness Faultline is an open-source Go harness that injects faults into distributed systems, records every concurrent operation clients actually observed, and checks whether that history is linearizable — modeled on the methodology behind Kyle Kingsbury's Jepsen.
构建 Faultline：一个可复用的混沌注入与线性一致性检查工具。Faultline 是一个开源的 Go 语言测试框架，用于向分布式系统注入故障，记录客户端实际观察到的所有并发操作，并检查该历史记录是否满足线性一致性——其设计理念参考了 Kyle Kingsbury 的 Jepsen 方法论。

Its reference target is a three-node etcd cluster; a second, architecturally distinct target (NATS JetStream's key-value store) proves the harness is actually reusable, not just an etcd-specific tool with extra steps. No consistency violation was found in either target under the tested conditions. That's reported here as legitimate evidence, not a disappointing result — a rigorous "no violations found across N campaigns, fully reproducible" outcome is real infrastructure-testing work.
其参考目标是一个三节点的 etcd 集群；第二个架构完全不同的目标（NATS JetStream 的键值存储）证明了该工具确实具有可复用性，而不仅仅是一个针对 etcd 的专用工具。在测试条件下，两个目标均未发现一致性违规。这被视为有效的证据，而非令人失望的结果——“在 N 次测试活动中未发现违规，且完全可复现”的严谨结论，才是真正的基础设施测试工作。

What makes this worth reading, though, is the six concrete bugs the harness caught in itself while being built — because a correctness tool that has never caught anything isn't credible.
然而，本文值得一读的原因在于该工具在构建过程中发现的六个自身 Bug——因为一个从未发现过问题的正确性验证工具是不可信的。

### Architecture
### 架构

(Flowchart omitted for brevity, representing the modular design of the harness including campaign, engine, chaos, workload, checker, and target integrations.)
（流程图略，展示了该工具包括测试活动、引擎、混沌注入、工作负载、检查器及目标集成在内的模块化设计。）

A four-method contract — Connect/Invoke/Close, Init/Apply — is the only thing a new target implements. The fault injector, workload generator, and checker are written once and never change when a target is added. Adding NATS required zero changes to any of them. Every applied fault is independently verified, never assumed: a partition's Verify pings across the intended break and asserts the ping fails; a claimed fault only counts as coverage once confirmed against the real container.
一个新的目标系统只需实现四个方法契约：Connect/Invoke/Close 和 Init/Apply。故障注入器、工作负载生成器和检查器只需编写一次，添加新目标时无需更改。添加 NATS 时，这些组件无需任何改动。每一个注入的故障都会被独立验证，绝不假设：分区故障的 Verify 操作会跨越预期的断点进行 ping 测试，并断言 ping 失败；只有在真实容器中确认后，该故障才会被计入覆盖范围。

The checker checker.Check is a Wing & Gong style search over sequential orderings of a recorded history, memoized on (remaining-operations, sequential-state), with a bounded search budget so an unresolvable history reports inconclusive rather than hanging forever.
检查器 `checker.Check` 采用 Wing & Gong 风格的搜索算法，对记录的历史操作序列进行搜索，并基于（剩余操作，顺序状态）进行记忆化处理。同时设置了搜索预算上限，确保无法解析的历史记录会报告“不确定”而非无限挂起。

Two things were hardened deliberately:
两项功能经过了刻意强化：

1. **Exact numeric equality via big.Rat**, recursively across JSON-shaped values — because any client whose wire protocol round-trips numbers through JSON (as ToyKV's HTTP client does) silently turns a Go int into a float64, and a naive equality check would flag every such operation as a false violation.
1. **通过 `big.Rat` 实现精确数值相等性检查**，递归应用于 JSON 格式的值——因为任何通过 JSON 进行网络协议传输的客户端（如 ToyKV 的 HTTP 客户端）都会静默地将 Go 的 `int` 转换为 `float64`，而简单的相等性检查会将此类操作误报为违规。

2. **Collision-safe state caching** — the memoization key is only a bucket hash; every cache hit is verified with full structural equality before being trusted.
2. **防碰撞的状态缓存**——记忆化键仅为桶哈希（bucket hash）；每次缓存命中后，在信任之前都会进行完整的结构相等性验证。

Before being trusted on any real target, the checker was validated against seven hand-built known-good/known-bad histories. A checker that hasn't been validated proves nothing.
在应用于任何真实目标之前，检查器已通过七个手动构建的“已知正确/已知错误”历史记录进行了验证。未经验证的检查器毫无意义。

### Six bugs the harness found in itself
### 该工具在自身构建中发现的六个 Bug

1. **ToyKV's CAS wire response used the wrong field.** The server wrote the CAS outcome to `wireResult.OK`; the client read `wireResult.Value`. Every real client saw `nil` for every CAS regardless of outcome — undetected because unit tests exercised the store directly, never through the HTTP path.
1. **ToyKV 的 CAS 网络响应使用了错误的字段。** 服务器将 CAS 结果写入 `wireResult.OK`，而客户端读取的是 `wireResult.Value`。无论结果如何，所有真实客户端看到的 CAS 结果都是 `nil`——由于单元测试直接调用存储层而非通过 HTTP 路径，导致该问题未被发现。

2. **containerIP only read Docker's legacy default-bridge field.** `.NetworkSettings.IPAddress` is empty for any container on a user-defined network — which every deployment here uses. The partition injector silently resolved an empty peer IP until the first live test.
2. **containerIP 仅读取了 Docker 的旧版默认网桥字段。** 对于用户自定义网络上的任何容器（此处所有部署均使用该网络），`.NetworkSettings.IPAddress` 均为空。分区注入器在首次实时测试前，静默地解析出了空的对端 IP。

3. **The fault injectors bailed on the first cleanup failure.** `Clear()` for partition/kill/netem faults returned immediately on the first error, abandoning cleanup for every other node. This isn't hypothetical — it stranded a live three-node etcd cluster in a partitioned, unrecoverable state for several days before diagnosis.
3. **故障注入器在首次清理失败时即退出。** 分区/终止/网络模拟故障的 `Clear()` 方法在遇到第一个错误时立即返回，放弃了对其他节点的清理。这不是假设——它曾导致一个运行中的三节点 etcd 集群陷入分区且无法恢复的状态，直到数天后才被诊断出来。

4. **Fixed to be best-effort:** attempt every node regardless of earlier failures.
4. **改为尽力而为模式：** 无论之前的操作是否失败，都会尝试清理每一个节点。

5. **Ping-based verification always "passed."** The container images didn't ship `iputils-ping`, so ping failed with "command not found" — indistinguishable, in code, from "partition is genuinely blocking traffic." Verify reported every partition as confirmed even after it had been cleared.
5. **基于 Ping 的验证总是“通过”。** 容器镜像中未包含 `iputils-ping`，导致 ping 命令返回“command not found”——在代码逻辑中，这与“分区确实阻断了流量”无法区分。结果导致 Verify 将每个分区都报告为已确认，即使在分区已被清除后也是如此。

6. **NATS JetStream KV defaults to non-linearizable reads.** `CreateKeyValue` unconditionally sets `AllowDirect: true`, letting any replica (not just the Raft leader) answer a read — a documented, deliberate latency/consistency tradeoff. Left on, an early batch produced 3 false violations with single-operation counterexamples impossible from an empty initial state: a stale replica read, not a real bug. Fixed by disabling it once, forcing every read through the leader.
6. **NATS JetStream KV 默认采用非线性一致性读取。** `CreateKeyValue` 无条件设置 `AllowDirect: true`，允许任何副本（而非仅 Raft Leader）响应读取请求——这是一个有据可查、刻意为之的延迟与一致性权衡。开启该选项后，早期批次产生了 3 个虚假违规，其单操作反例在初始状态为空的情况下是不可能发生的：这是陈旧副本读取，而非真正的 Bug。修复方法是将其禁用，强制所有读取通过 Leader 进行。

7. **Fixing #5 the obvious way created a new bug.** Doing that disable from every workload client's own `Connect` call created a thundering herd of concurrent reconfiguration attempts on a just-booted cluster — slow enough to time out `Connect` itself. Fixed by moving it into a one-time Bootstrap step.
7. **以显而易见的方式修复第 5 点引发了新 Bug。** 在每个工作负载客户端的 `Connect` 调用中执行禁用操作，导致刚启动的集群面临并发重配置请求的“惊群效应”，速度慢到足以使 `Connect` 本身超时。修复方法是将其移至一次性的 Bootstrap 步骤中。