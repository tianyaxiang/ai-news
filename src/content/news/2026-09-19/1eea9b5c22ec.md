---
title: "Jemalloc 5.4.0"
originalUrl: "https://github.com/jemalloc/jemalloc/releases/tag/5.4.0"
date: "2026-09-18T23:23:39.928Z"
---

# Jemalloc 5.4.0

This release contains over 160 commits, focusing on the technical debts cleaning including refactorings, bug fixes, test coverage improvement, and option cleanups. The release also includes portability improvements per upstream issues report.
此版本包含超过 160 次提交，重点在于清理技术债务，包括重构、错误修复、测试覆盖率提升以及选项清理。该版本还根据上游问题报告包含了可移植性改进。

### New features:
### 新功能：

* Add `EXTENT_ALLOC_FLAG_PINNED` so custom extent-allocation hooks can mark non-reclaimable mappings, such as HugeTLB pages, for preferential reuse outside the decay and purge pipeline.
* 添加 `EXTENT_ALLOC_FLAG_PINNED`，以便自定义的范围分配钩子（extent-allocation hooks）能够标记不可回收的映射（如 HugeTLB 页面），从而在衰减（decay）和清除（purge）流水线之外优先重用这些内存。

* Add the `mallctl` interfaces `stats.pinned`, `stats.arenas.<i>.pinned`, `stats.arenas.<i>.extents.<j>.npinned`, `stats.arenas.<i>.extents.<j>.pinned_bytes`, and `stats.arenas.<i>.mutexes.extents_pinned.{counter}` to report pinned-memory usage and mutex statistics.
* 添加 `mallctl` 接口 `stats.pinned`、`stats.arenas.<i>.pinned`、`stats.arenas.<i>.extents.<j>.npinned`、`stats.arenas.<i>.extents.<j>.pinned_bytes` 以及 `stats.arenas.<i>.mutexes.extents_pinned.{counter}`，用于报告固定内存（pinned-memory）的使用情况和互斥锁统计信息。

* Allow resuming per-CPU arena selection via `thread.arena`.
* 允许通过 `thread.arena` 恢复按 CPU 的 arena 选择功能。

* Better align the contents of human-readable and JSON malloc statistics.
* 更好地对齐人类可读格式与 JSON 格式的 malloc 统计信息内容。

* Replace the runtime `experimental_infallible_new` option with the compile-time `--enable-cxx-infallible-new` option, enabling compiler-level optimizations and optimization in move constructors, and fix the `new(std::nothrow)` contract.
* 将运行时的 `experimental_infallible_new` 选项替换为编译时的 `--enable-cxx-infallible-new` 选项，从而启用编译器级别的优化以及移动构造函数中的优化，并修复了 `new(std::nothrow)` 的契约。

### Incompatible changes:
### 不兼容的变更：

* Adapt tcache fill and retention targets per bin to demand observed between GC events, replacing the fixed refill/flush policy.
* 根据 GC 事件之间观察到的需求，调整每个 bin 的 tcache 填充和保留目标，取代了原有的固定填充/刷新策略。

* Remove seven legacy non-experimental controls: `lg_tcache_nslots_mul`, `tcache_nslots_small_min`, `tcache_nslots_small_max`, `tcache_nslots_large`, `tcache_gc_delay_bytes`, `lg_tcache_flush_small_div`, and `lg_tcache_flush_large_div`. Corresponding `malloc_conf` settings are silently ignored, matching `opt.*` mallctls return `ENOENT`, and `tcache_ncached_max` remains supported.
* 移除了七个传统的非实验性控制选项：`lg_tcache_nslots_mul`、`tcache_nslots_small_min`、`tcache_nslots_small_max`、`tcache_nslots_large`、`tcache_gc_delay_bytes`、`lg_tcache_flush_small_div` 和 `lg_tcache_flush_large_div`。相应的 `malloc_conf` 设置将被静默忽略，匹配的 `opt.*` mallctl 将返回 `ENOENT`，而 `tcache_ncached_max` 仍保持支持。

### Bug fixes:
### 错误修复：

* Preserve `errno` across `free`, `free_sized`, and `free_aligned_sized`, and across `process_madvise`-based page purging.
* 在 `free`、`free_sized`、`free_aligned_sized` 以及基于 `process_madvise` 的页面清除过程中保留 `errno`。

* Fix numeric overflow checks in size classes.
* 修复了大小类（size classes）中的数值溢出检查。

* Accept `NULL` in `free_sized()` and `free_aligned_sized()` (C23 correctness).
* 在 `free_sized()` 和 `free_aligned_sized()` 中接受 `NULL`（符合 C23 标准）。

* Fix TSD lifecycle edge cases by 1) initializing thread-cache bins before marking the cache enabled, preventing reentrant bootstrap allocations from using uninitialized state, and 2) avoiding TSD recreation for late deallocations after thread teardown on generic-TSD platforms.
* 修复了 TSD 生命周期边缘情况：1) 在标记缓存启用前初始化线程缓存 bin，防止重入引导分配使用未初始化的状态；2) 在通用 TSD 平台上，避免在线程销毁后的延迟释放中重新创建 TSD。

* Use `O_CLOEXEC` when opening the THP sysfs file in `init_thp_state`.
* 在 `init_thp_state` 中打开 THP sysfs 文件时使用 `O_CLOEXEC`。

* Fix duplicate `opt.stats_print` and `opt.stats_print_opts` fields in `malloc_stats_print` output.
* 修复了 `malloc_stats_print` 输出中重复的 `opt.stats_print` 和 `opt.stats_print_opts` 字段。

* Fix a potential deadlock during `arena_reset`.
* 修复了 `arena_reset` 期间潜在的死锁问题。

* Fix a prof-sampling / guard-page interaction bug in the SAN.
* 修复了 SAN 中 prof-sampling（性能采样）与 guard-page（保护页）交互的错误。

### Optimizations and refactors:
### 优化与重构：

* Modularize jemalloc's front end by extracting arena management, initialization, fork orchestration, and allocation dispatch from `jemalloc.c`; untangle tcache/arena ownership; and consolidate the internal header graph to eliminate circular dependencies.
* 通过从 `jemalloc.c` 中提取 arena 管理、初始化、fork 编排和分配调度，实现 jemalloc 前端的模块化；解耦 tcache/arena 的所有权；并整合内部头文件图以消除循环依赖。

* Simplify `ctl` dispatch by refactoring arena helpers, internalizing an implementation-only control, replacing control-flow macros with typed helpers, and organizing `ctl.c` by subsystem.
* 通过重构 arena 辅助函数、内部化仅供实现的控制项、用类型化辅助函数替换控制流宏，以及按子系统组织 `ctl.c`，简化了 `ctl` 调度。

* Cap the base-block growth heuristic to avoid virtual-memory exhaustion under rare racy conditions.
* 限制基础块（base-block）增长启发式算法，以避免在罕见的竞争条件下耗尽虚拟内存。

* Move background-thread lifecycle and state operations into the background-thread module, clarifying ownership independently of PAC/HPA callers.
* 将后台线程的生命周期和状态操作移至后台线程模块，独立于 PAC/HPA 调用者明确所有权。

* Simplify the page-allocation boundary by replacing PAI vtable dispatch with direct PAC/HPA calls, removing the obsolete `pai_t`/`pai.h` abstraction, and moving deferred-work and decay orchestration out of the arena.
* 通过用直接的 PAC/HPA 调用替换 PAI 虚函数表调度，简化了页面分配边界；移除了过时的 `pai_t`/`pai.h` 抽象，并将延迟工作和衰减编排移出 arena。

* Refactor statistics collection and rendering into separate gather/emission stages and descriptor-driven tables.
* 将统计信息的收集和渲染重构为独立的收集/发布阶段以及描述符驱动的表。

* Introduce an OS abstraction layer and move platform-dependent file/process I/O, time, synchronization, CPU, virtual-memory, atfork, error-handling, profiling, thread-yield, and configuration-access operations out of allocator core code.
* 引入操作系统抽象层，并将与平台相关的文件/进程 I/O、时间、同步、CPU、虚拟内存、atfork、错误处理、性能分析、线程让出和配置访问操作移出分配器核心代码。

### Portability improvements:
### 可移植性改进：

* Replace the `std::__throw_bad_alloc` call with standard C++.
* 将 `std::__throw_bad_alloc` 调用替换为标准 C++ 实现。

* Make `arena_s` use a flexible array member (`bin_t all_bins[]`) for C99 or newer.
* 使 `arena_s` 在 C99 或更新版本中使用灵活数组数组成员 (`bin_t all_bins[]`)。

* Fix `rdtscp` detection with `--with-lg-vaddr`.
* 修复了使用 `--with-lg-vaddr` 时的 `rdtscp` 检测。

* Fix `malloc_getcpu` on macOS to read the current CPU number correctly.
* 修复了 macOS 上 `malloc_getcpu` 读取当前 CPU 编号不正确的问题。

* Use `CLOCK_MONOTONIC` for background-thread sleep to prevent clock-rollback stalls, and detect monotonic-condvar support at configure time.
* 后台线程休眠使用 `CLOCK_MONOTONIC` 以防止时钟回滚导致的停滞，并在配置时检测对 monotonic-condvar 的支持。

* Fix compilation warnings on macOS.
* 修复了 macOS 上的编译警告。

* Fix thread-exit TSD cleanup on MinGW builds.
* 修复了 MinGW 构建中线程退出时的 TSD 清理问题。

* Fix GCC 16 build warnings by removing `-Wpedantic` violations in macro and function syntax and explicitly NUL-terminating profiling thread-name copies to resolve `-Wstringop-truncation`.
* 通过移除宏和函数语法中违反 `-Wpedantic` 的部分，并显式对性能分析线程名称副本进行 NUL 终止以解决 `-Wstringop-truncation`，修复了 GCC 16 的构建警告。

* Parse PID-namespace symlinks without glibc-dependent `strtok`/`atol`, and return identifiers as `uint64_t`.
* 解析 PID 命名空间符号链接时不再依赖 glibc 的 `strtok`/`atol`，并将标识符作为 `uint64_t` 返回。