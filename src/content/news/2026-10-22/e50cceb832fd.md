---
title: "zls 0.17.0"
originalUrl: "https://zigtools.org/zls/releases/0.17.0/"
date: "2026-10-21T15:24:05.000Z"
excerpt: false
---

# zls 0.17.0

Feature improvements
Don’t follow aliases when renaming symbol (#3199)
Consider the following source file:
const S = struct { fn foo() void {} }; 
comptime { const foo = S.foo; foo(); } 
Renaming foo() will only rename foo() and const foo
Renaming fn foo is unchanged and will rename all four locations
References are also unchanged and will provide all four locations no matter where it has been requested

功能改进
重命名符号时不再跟随别名 (#3199)
考虑以下源文件：
const S = struct { fn foo() void {} }; 
comptime { const foo = S.foo; foo(); } 
重命名 foo() 将仅重命名 foo() 和 const foo
重命名 fn foo 则保持不变，并将重命名所有四个位置
引用也保持不变，无论在何处请求，都将提供所有四个位置

Build System Integration
During the Zig 0.17 development cycle, the separation of maker process and configurer process has broken critical build system integration features in ZLS. Most of them have since been restored using the build system protocol but various regressions remain that are anticipated to be resolved during the next release cycle.

构建系统集成
在 Zig 0.17 开发周期中，构建者进程与配置者进程的分离破坏了 ZLS 中关键的构建系统集成功能。其中大部分功能已通过构建系统协议恢复，但仍存在各种回归问题，预计将在下一个发布周期内解决。

On the positive side, the new protocol lays the foundation for future improvements in ZLS and related tooling. Especially editors could utilize it to integrate unit testing, fuzzing, code coverage reports or debugging capabilities that are fully aware of the Zig build system.
All known regressions are tracked in #3277 and listed below:

从积极的一面来看，新协议为 ZLS 及相关工具的未来改进奠定了基础。特别是编辑器可以利用它来集成完全感知 Zig 构建系统的单元测试、模糊测试、代码覆盖率报告或调试功能。
所有已知的回归问题都在 #3277 中进行了跟踪，并列出如下：

Package @imports in build.zig
Type resolution for package imports in build.zig files have regressed.
Upstream Zig Issue: ziglang/zig#36387

build.zig 中的包 @imports
build.zig 文件中包导入的类型解析出现了回归。
上游 Zig 问题：ziglang/zig#36387

Module @imports to exported modules without a compile step
Type resolution for modules that are only exported using b.addModule but aren’t tied to a compile step have regressed.
An build.zig file that would be affected:
const std = @import("std"); 
pub fn build(b: *std.Build) void { 
    _ = b.addModule("foo", .{ 
        .root_source_file = b.path("root.zig"), 
        .imports = &.{ .{ .name = "bar", .module = b.createModule(.{ .root_source_file = b.path("bar.zig") }) }, }, 
    }); 
} 
In the above example, @import("bar") will not be resolved.
Upstream Zig Issue: ziglang/zig#36388

指向未绑定编译步骤的导出模块的模块 @imports
仅使用 b.addModule 导出但未绑定到编译步骤的模块，其类型解析出现了回归。
受影响的 build.zig 文件示例：
const std = @import("std"); 
pub fn build(b: *std.Build) void { 
    _ = b.addModule("foo", .{ 
        .root_source_file = b.path("root.zig"), 
        .imports = &.{ .{ .name = "bar", .module = b.createModule(.{ .root_source_file = b.path("bar.zig") }) }, }, 
    }); 
} 
在上述示例中，@import("bar") 将无法解析。
上游 Zig 问题：ziglang/zig#36388

Build system protocol file watching doesn’t work on windows
File watching has regressed on windows due to a bug in the build system protocol. This does not affect the CLI when running zig build --watch.
ZLS does work around this issue by receiving file save events through the LSP protocol. File changes through external programs (e.g. version control) will not be detected.
Upstream Zig Issue: ziglang/zig#37236

构建系统协议文件监视在 Windows 上无法工作
由于构建系统协议中的一个错误，Windows 上的文件监视功能出现了回归。这不会影响运行 zig build --watch 时的 CLI。
ZLS 通过接收来自 LSP 协议的文件保存事件来规避此问题。通过外部程序（例如版本控制）进行的文件更改将无法被检测到。
上游 Zig 问题：ziglang/zig#37236

Contributors
Here is a list of everyone who has made at least one contribution to this release of ZLS:
Techatrix, FnControlOption, psznmxd, Bronch, Khang Nguyen Duy, Akhilesh Arora, James, Jassiel Ovando, fomgleb, l1yefeng

贡献者
以下是为本次 ZLS 版本做出至少一次贡献的所有人员名单：
Techatrix, FnControlOption, psznmxd, Bronch, Khang Nguyen Duy, Akhilesh Arora, James, Jassiel Ovando, fomgleb, l1yefeng

Sponsors
We’d like to take a second to thank all our awesome contributors and donators/backers/sponsors; if you have time or money to spare, consider partaking in either of these options - they help keep ZLS awesome for everyone! 
Full Changelog: 0.16.0…0.17.0

赞助商
我们要花点时间感谢所有出色的贡献者和捐赠者/支持者/赞助商；如果您有空闲的时间或资金，请考虑参与其中任何一种方式——它们有助于让 ZLS 保持出色，造福每一个人！
完整更新日志：0.16.0…0.17.0