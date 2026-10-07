---
title: "A regra de backup 3-2-1-1-0. Tínhamos tudo, menos o zero"
originalUrl: "https://dev.to/rodolfocoding/a-regra-de-backup-3-2-1-1-0-tinhamos-tudo-menos-o-zero-dgn"
date: "2026-10-07T01:05:44.499Z"
---

### The 3-2-1-1-0 Backup Rule: We had everything, except the zero
### 3-2-1-1-0 备份规则：我们拥有了一切，唯独缺了“0”

Backup seems simple until the day you need it. In simple terms, backing up means creating a copy of your data so it can be recovered if the original is lost, corrupted, or deleted. But there is an important difference between having a backup and being able to recover your data from it.
备份看起来很简单，直到你需要它的那一天。简单来说，备份意味着创建数据的副本，以便在原始数据丢失、损坏或删除时能够恢复。但“拥有备份”与“能够从中恢复数据”之间存在着重要的区别。

Imagine that an automated process backs up your database every day. At the end, the system shows a big green sign: the process finished without errors. You might think: "everything is protected." But what does that green sign really mean? Only that the process managed to execute the planned steps. It does not, by itself, guarantee that the copy is intact, that the data is consistent, or that it is possible to recover it when you really need it.
想象一下，一个自动化流程每天都在备份你的数据库。最后，系统显示一个大大的绿色标志：流程无错误完成。你可能会想：“一切都受到保护了。”但这个绿色标志到底意味着什么？它仅仅意味着流程成功执行了预定步骤。它本身并不能保证副本是完整的、数据是一致的，或者在你真正需要时能够恢复它。

This is where the 3-2-1-1-0 rule comes in. It is a strategy to reduce the risk of losing data even when something goes wrong. The numbers represent how copies should be maintained and protected:
这就是 3-2-1-1-0 规则的用武之地。这是一种旨在降低数据丢失风险的策略，即使在出现问题时也能奏效。这些数字代表了副本应如何维护和保护：

*   3 copies of the data
*   2 different types of media or storage
*   1 copy kept off-site
*   1 isolated or immutable copy
*   0 errors during recovery testing

*   3 份数据副本
*   2 种不同类型的介质或存储
*   1 份异地存储的副本
*   1 份隔离或不可篡改的副本
*   0 恢复测试错误

The last number is the most interesting. The zero does not represent another copy or another place to store your backups. It represents a requirement: when the time comes to recover the data, the restore must work. Because a backup that has never been restored is, to some extent, a hypothesis.
最后一个数字最有趣。“0”并不代表另一个副本或另一个存储备份的地方。它代表一项要求：当需要恢复数据时，恢复操作必须成功。因为从未经过恢复测试的备份，在某种程度上只是一个假设。

### What fails when a number is missing
### 当缺少数字时会发生什么

The rule only works if each number covers a different failure. If two numbers break in the same way, you don't have five controls; you have repetition.
只有当每个数字涵盖不同的故障时，该规则才有效。如果两个数字以相同的方式失效，你拥有的不是五个控制点，而是重复。

*   **Without the 3:** Production and "backup" live in the same destination. A retention error, a broad policy, or a compromised identity deletes the original and the copies together. Three names in the same place are not three copies.
*   **Without the 2:** The copies use the same type of media or the same storage service. The failure repeats: corruption, quota, API, region. Two identical disks in the same account fail in the same way.
*   **Without the 1 (off-site):** The incident in the environment takes the backup with it. Compromised account, single IdP, unavailable region. The copy needs to be where that incident cannot reach.
*   **Without the 1 (isolated/immutable):** Whoever reached production also reaches the backup delete. Isolation cuts the easy path. Immutability prevents deletion even when the path appears. Ransomware that targets production usually targets the backup repository next. Without this lock, the way back disappears with the original.
*   **Without the 0:** The job is green, but the box won't open. The first four numbers answer where the copy is. The zero answers if it comes back. This is failure engineering, not a poster. It is still incomplete until the restore is exercised.

*   **没有 3：** 生产环境和“备份”位于同一目的地。保留策略错误、宽泛的权限策略或身份被盗用，会导致原始数据和副本同时被删除。在同一个地方放三个名字并不等于三份副本。
*   **没有 2：** 副本使用相同类型的介质或相同的存储服务。故障会重复发生：损坏、配额限制、API 故障、区域性故障。同一账户下的两块相同磁盘会以同样的方式失效。
*   **没有 1（异地）：** 环境中的事故会连带摧毁备份。账户被盗、单一身份提供商（IdP）、区域不可用。副本必须存放在事故无法波及的地方。
*   **没有 1（隔离/不可篡改）：** 能够触及生产环境的人也能触及备份删除操作。隔离切断了简单的路径，不可篡改性即使在路径暴露时也能防止删除。针对生产环境的勒索软件通常紧接着就会攻击备份存储库。没有这道锁，回退路径会随着原始数据一起消失。
*   **没有 0：** 任务显示绿色，但盒子打不开。前四个数字回答了副本在哪里，而“0”回答了它能否恢复。这是故障工程，而不是海报。在进行恢复演练之前，它仍然是不完整的。

### The green job lies by omission
### 绿色的任务状态是一种“疏忽性谎言”

A successful backup job answers a narrow question: did the writer manage to persist what was requested, in the configured destination, within the window? It does not answer if the incremental chain is intact. It does not answer if the database was captured in an applicable state (with flush, with consistent snapshot, with native backup), or just as a disk in the middle of a write. It does not answer if the KMS key for the restore still exists, if the identity that restores has permission in the vault, if the destination engine accepts that version, or if the recovery time fits what the business calls acceptable.
一个成功的备份任务只回答了一个狭窄的问题：写入器是否在配置的目的地、在窗口时间内成功持久化了请求的数据？它无法回答增量链是否完整，无法回答数据库是否以可用状态（通过刷新、一致性快照或原生备份）被捕获，还是仅仅作为写入过程中的磁盘被捕获。它无法回答用于恢复的 KMS 密钥是否仍然存在，执行恢复的身份在保险库中是否有权限，目标引擎是否接受该版本，或者恢复时间是否符合业务的可接受范围。

Integrity is the backup being complete and coherent. Availability is being able to access and apply it. Neither is the exit code of the job. That is why zero is not a quantity. It is not "one more vault." It is the acceptance criterion: restore on purpose, see the data return, measure how long it took, and only then call the design 3-2-1-1-0.
完整性是指备份是完整且连贯的。可用性是指能够访问并应用它。这两者都不是任务的退出代码。这就是为什么“0”不是数量，它不是“再加一个保险库”。它是验收标准：有目的地进行恢复，观察数据返回，测量耗时，然后才称之为 3-2-1-1-0 设计。

### What the recovery test needs to show
### 恢复测试需要展示什么

The zero does not ask for a laboratory. It asks for four answers, obtained on purpose, without panic:
“0”不需要实验室，它需要四个有目的、无恐慌的答案：

1.  Did the data return?
2.  Did it return consistent, in a state the application accepts?
3.  Did someone on the team manage to perform the restore without improvising permissions, keys, or destinations?
4.  Does the recovery time fit what the business can handle?

1. 数据是否恢复了？
2. 数据恢复后是否一致，且处于应用程序可接受的状态？
3. 团队成员是否能在无需临时拼凑权限、密钥或目的地的情况下完成恢复？
4. 恢复时间是否在业务可承受的范围内？

If any answer is "the job was green," the test hasn't happened yet. Dashboard measures the writer. Recovery measures the path back.
如果任何答案是“任务显示绿色”，那么测试还没有真正发生。仪表板衡量的是写入器，而恢复衡量的是回退路径。

Does the backup work when you need it? "Do we have a backup?" This seems to be the right question. But, in practice, it says little. The question that really matters is another: When was the last time someone restored this backup on purpose, in a real environment, and confirmed that the system returned to work?
备份在你需要时有效吗？“我们有备份吗？”这似乎是正确的问题。但实际上，它说明不了什么。真正重要的问题是：上一次有人有目的地在真实环境中恢复此备份，并确认系统恢复正常工作是什么时候？

A dashboard can show that the backup finished successfully. It can show that the copy exists, that the storage is healthy, and that the last job was completed without errors. But none of these indicators answer if you can recover the system when you really need it. If the only evidence that the backup works is a green dashboard, you know you have a copy. Maybe you already have the 3, the 2, and the two 1s. But you are still missing the zero. The zero is the proof that the way back works.
仪表板可以显示备份已成功完成。它可以显示副本存在、存储健康且最后一个任务无错误完成。但这些指标都无法回答你在真正需要时能否恢复系统。如果备份有效的唯一证据是一个绿色的仪表板，你知道你拥有副本。也许你已经有了 3、2 和两个 1，但你仍然缺少“0”。“0”是回退路径有效的证明。