---
title: "My C23 Conventions"
originalUrl: "https://abner.page/post/c23-conventions-1/"
date: "2026-10-15T15:32:15.000Z"
excerpt: false
---

# My C23 Conventions

This is one of a three-part mini series about how I’m using modern C as of late 2026. Before C23, I was taken in by How I Program C for years and years, and would even feel guilty for choosing C99 instead of -ansi -pedantic. But holy crap man I’m done being a doomsday prepper! These days I maintain a large-enough project with enough users where I could stand less foot-shooting. (I’ve also got bills to pay.) So here’s three modern C conventions which started to rise naturally from adding -std=c23 to my zig build:

这是关于我如何在 2026 年末使用现代 C 语言的三部分系列文章之一。在 C23 之前，我多年来一直受《How I Program C》的影响，甚至因为选择 C99 而不是 -ansi -pedantic 而感到内疚。但天哪，我受够了这种末日生存狂的生活！如今，我维护着一个拥有足够多用户的大型项目，我希望能减少一些“搬起石头砸自己脚”的情况。（毕竟我还要养家糊口。）因此，以下是随着我在 Zig 构建中添加 -std=c23 后自然产生的三个现代 C 语言约定：

### 1. Unused? Maybe? (Yes)
Our first one is centered around [[nodiscard]]. If I draw an app window or panel I require the caller to interrogate the rect of the thing that was just rendered:
[[nodiscard]] rect_t draw_screen(/* ... */) { rect_t screen_r = { }; // Draw stuff // ... return screen_r; }
It’s a business logic bug if my caller doesn’t capture the rectangle for later processing. Therefore [[nodiscard]] has been such a godsend for fixing bugs… Except there’s a choice few instances where I will draw something with no genuine use for the resulting rect:
enum screen_opt popup_options = /* ... */ ; draw_screen(popup_options, /* ... */); // ERROR: damn you [[nodiscard]]
Clang will error out here. I could capture the var and never use it but…
rect_t rect = draw_screen(/* ... */); // ERROR: unused variable (I have `-Werror` enabled)
Pre-C23 I could solve this through an UNUSED() macro:
#ifndef UNUSED #define UNUSED(x) (void)(x) #endif rect_t rect = draw_screen(/* ... */); UNUSED(rect); // Silences the compiler, but now I'm sad.
But now with C23 I’ve deleted the macro in favor of [[maybe_unused]]:
[[maybe_unused]] rect_t rect = draw_screen(...); // OK
Phew I feel better. I’ve also noticed this is happening all over the place: lots of different routines returning different types that are marked with [[nodiscard]]. So for those few exceptions why not just go for:
[[maybe_unused]] auto _ = foo(); // A new pattern emerges

### 1. 未使用？也许吧？（是的）
第一个约定围绕 [[nodiscard]] 展开。如果我绘制一个应用程序窗口或面板，我要求调用者必须检查刚刚渲染出的矩形区域：
[[nodiscard]] rect_t draw_screen(/* ... */) { rect_t screen_r = { }; // 绘制内容 // ... return screen_r; }
如果调用者没有捕获该矩形以供后续处理，那就是业务逻辑错误。因此，[[nodiscard]] 在修复 Bug 方面简直是天赐之物……除了极少数情况下，我绘制某些东西时并不真正需要返回的矩形：
enum screen_opt popup_options = /* ... */ ; draw_screen(popup_options, /* ... */); // 错误：该死的 [[nodiscard]]
Clang 会在这里报错。我可以捕获变量但不使用它，但……
rect_t rect = draw_screen(/* ... */); // 错误：未使用变量（我启用了 `-Werror`）
在 C23 之前，我可以通过 UNUSED() 宏来解决这个问题：
#ifndef UNUSED #define UNUSED(x) (void)(x) #endif rect_t rect = draw_screen(/* ... */); UNUSED(rect); // 编译器闭嘴了，但我很不爽。
但现在有了 C23，我删除了这个宏，改用 [[maybe_unused]]：
[[maybe_unused]] rect_t rect = draw_screen(...); // 没问题
呼，感觉好多了。我还注意到这种情况随处可见：许多不同的例程返回了被标记为 [[nodiscard]] 的不同类型。所以对于那少数例外，为什么不直接用：
[[maybe_unused]] auto _ = foo(); // 一种新模式出现了

Bonus: For any macro fans out there a fellow indie dev (Zardium) offered an additional improvement. From our chat server:
Zardium: #define _ [[maybe_unused]] auto CONCAT_MACRO(zz,COUNTER)
Abner: ahh, unique varname. nice one
Zardium: you could take the auto out if you don’t want it to look so weird. then it acts exactly like the _ in other languages, where it can be redefined
Abner: Yep totally. Although here I was celebrating my removal of a macro… XD

额外提示：对于任何宏爱好者，一位独立开发者（Zardium）提供了一个额外的改进。来自我们的聊天服务器：
Zardium: #define _ [[maybe_unused]] auto CONCAT_MACRO(zz,COUNTER)
Abner: 啊，唯一的变量名。不错。
Zardium: 如果你不想让它看起来太奇怪，可以去掉 auto。这样它就和其它语言中的 _ 完全一样，可以被重新定义。
Abner: 是的，完全正确。虽然我刚才还在庆祝我终于删掉了一个宏……XD

### 2. More Perfect Unions
I’ve been cheated and lied to: designated initializers DO NOT clear my struct to zero and I can’t even trust {0} anymore. (Talk about a betrayal.) The problem is I’ll often have data types like this contrived timestamp:
typedef struct { Type type; char buf[MAX]; union { time_t time; float dt; date_t date; }; } stamp_t;
And if I partially initialize one:
stamp_t stamp = { .type = STAMP_TYPE_BLA_BLA };
While it does mean we successfully zeroed out buf (thanks to empty initialization), those union members are just a different beast. It also doesn’t matter if we go with stamp_t stamp = {0} instead. My dear reader: I’ve made the costly mistake of assuming date would clear to zero! As I Spongebob-panicked in public Lobsters member accelbread offered a sage revelation:
accelbread: It used to be that GCC would fully zero the union anyways, and clang would only zero the time_t, though around a year ago they swapped behaviors iirc. Either way, standard only requires the time_t be zeroed and not whole union. GCC has a flag to always zero whole union. Also C23 initialization always inits whole union
Wait WHAT? clang and GCC SWAPPED what now? I won’t investigate further. Everything about this is dangerous af unless we hug C23 tightly and never let go:
stamp_t stamp = { }; // Fully clears to zero (C23) stamp.type = STAMP_TYPE_BLA_BLA;
Accelbread went on to say two more things: “Note the C23 zero init whole thing is nothing in the brackets, not 0 in brackets; { 0 } does same thing as before C23” “Also if you control union layout, putting largest member first is safest” Yessir.

### 2. 更完美的联合体
我被欺骗了：指定初始化器并不会将我的结构体清零，我甚至不能再相信 {0} 了。（这简直是背叛。）问题在于，我经常会有像下面这种人为构造的时间戳数据类型：
typedef struct { Type type; char buf[MAX]; union { time_t time; float dt; date_t date; }; } stamp_t;
如果我部分初始化它：
stamp_t stamp = { .type = STAMP_TYPE_BLA_BLA };
虽然这意味着我们成功地将 buf 清零了（多亏了空初始化），但那些联合体成员完全是另一回事。即使我们改用 stamp_t stamp = {0} 也无济于事。亲爱的读者：我犯了一个代价高昂的错误，以为 date 会被清零！就在我像海绵宝宝一样在公共场合惊慌失措时，Lobsters 成员 accelbread 提供了一个明智的启示：
accelbread: 过去 GCC 总是会完全清零联合体，而 clang 只会清零 time_t，不过我记得大约一年前它们交换了行为。无论如何，标准只要求 time_t 被清零，而不是整个联合体。GCC 有一个标志可以总是清零整个联合体。此外，C23 初始化总是会初始化整个联合体。
等等，什么？clang 和 GCC 交换了什么？我不想再深究了。除非我们紧紧拥抱 C23 永不放手，否则这一切都极其危险：
stamp_t stamp = { }; // 完全清零（C23） stamp.type = STAMP_TYPE_BLA_BLA;
Accelbread 还说了两点：“注意 C23 的全零初始化是在括号里什么都不写，而不是在括号里写 0；{ 0 } 的作用和 C23 之前一样。”“另外，如果你能控制联合体布局，把最大的成员放在最前面是最安全的。”遵命。

### 3. Enums In C Were Magic (And I Don’t Like It)
If I want to customize some dialog box I’ll use bit flags:
enum { OPT_AUTOSCROLL = (1 << 0), OPT_NOCURSOR = (1 << 1), OPT_CENTERED = (1 << 2), OPT_NOCLOSE = (1 << 3), // ... };
[[nodiscard]] bool draw_warning(const char* msg, int opt);
Even if we disagree with this approach lots of relevant libraries or projects do it:
_ = draw_warning("you done messed up A-A-RON", OPT_CENTERED | OPT_NOCLOSE);
Of course, erroneous bit shifting will land anyone into trouble and yield comical numbers. Thankfully C enums are a plain int underneath so the compiler will warn us if we defined a bad constant inside the enum that won’t fit. :) I’m kidding. Sigh. Well, I’m growing fearful of sage revelations but this one comes from Modern C by Jens Gustedt:
Jens: If enumeration constants do not fit into signed int, if possible, the enumeration type is adjusted such that it can store all enumeration constants.
Noooooo!
Jens: The property that an an enumeration type is adjusted such that it fits all its constants could have surprising effects sobs
Jens: So, it is preferable to specify the underlying integer type explicitly
THERE IS HOPE?
enum options : int { OPT_AUTOSCROLL = (1 << 0), OPT_NOCURSOR = (1 << 1), OPT_CENTERED = (1 << 2), OPT_NOCLOSE = (1 << 3), // ... };
It compiles! We shoot. We score. We stick with C23.

### 3. C 语言中的枚举曾经是“魔法”（我不喜欢）
如果我想自定义某个对话框，我会使用位标志：
enum { OPT_AUTOSCROLL = (1 << 0), OPT_NOCURSOR = (1 << 1), OPT_CENTERED = (1 << 2), OPT_NOCLOSE = (1 << 3), // ... };
[[nodiscard]] bool draw_warning(const char* msg, int opt);
即使我们不同意这种方法，许多相关的库或项目都在这样做：
_ = draw_warning("you done messed up A-A-RON", OPT_CENTERED | OPT_NOCLOSE);
当然，错误的位移操作会让任何人陷入麻烦并产生滑稽的数字。谢天谢地，C 语言的枚举底层只是一个普通的 int，所以如果我们定义了一个不适合枚举的错误常量，编译器会警告我们。:) 我开玩笑的。唉。好吧，我开始害怕那些“明智的启示”了，但这一条来自 Jens Gustedt 的《Modern C》：
Jens：如果枚举常量不适合有符号 int，如果可能的话，枚举类型会被调整，以便它可以存储所有的枚举常量。
不——！
Jens：枚举类型被调整以适应其所有常量的特性可能会产生令人惊讶的影响（呜呜）。
Jens：因此，最好显式指定底层整数类型。
还有希望吗？
enum options : int { OPT_AUTOSCROLL = (1 << 0), OPT_NOCURSOR = (1 << 1), OPT_CENTERED = (1 << 2), OPT_NOCLOSE = (1 << 3), // ... };
编译通过了！我们射门。我们得分。我们坚持使用 C23。

Epilogue
In part two of our mini series I’ll discuss three more conventions that I’ve fleshed out thanks to modern C: starting with safer macro usage (forgive me Zig folks.) P.S. If you want to shape this discussion maybe join the Handmade Cities server! -Abner

结语
在本系列文章的第二部分，我将讨论得益于现代 C 语言而完善的另外三个约定：首先是更安全的宏用法（Zig 的朋友们请原谅我）。附：如果你想参与讨论，也许可以加入 Handmade Cities 服务器！-Abner