---
title: "C for Rust Programmers"
originalUrl: "https://bd103.dev/blog/2026-10-07-c-for-rust-programmers/"
date: "2026-10-07T14:30:05.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# C for Rust Programmers 2026-10-07 #rust#c

The very first systems programming language I ever learned was Rust. This is uncommon compared to many other programmers; you're more likely to find someone who learned C or C++ first before coming to Rust. As such, there are plenty of "Rust for C Programmers" articles on the internet, but little to no "C for Rust Programmers" articles out there. Well, I'm about to change that! I've been learning C and C++ recently, and holy cow those languages are quirky. This blog post is a collection of eyebrow-raising details I learned while teaching myself C. (No C++ today, I'm not ready to dig into that can of worms.) This is not a substitute for a proper C tutorial, you'll need to Google one of those yourself. Rather, it's a list of things to keep in mind when working in the language. With the premise set, let's draw the curtain and see what C has to offer!

我学习的第一门系统编程语言是 Rust。这在程序员中并不常见；你更有可能遇到先学 C 或 C++ 再转到 Rust 的人。因此，互联网上有大量的“面向 C 程序员的 Rust”文章，但几乎没有“面向 Rust 程序员的 C”文章。好吧，我打算改变这一点！我最近一直在学习 C 和 C++，天哪，这些语言真是古怪。这篇博文是我在自学 C 时学到的一些令人惊讶的细节集合。（今天不谈 C++，我还没准备好去碰那个马蜂窝。）这不是正规 C 教程的替代品，你需要自己去谷歌搜索。相反，这是一份在用该语言工作时需要牢记的事项清单。前提设定好了，让我们拉开帷幕，看看 C 语言能提供什么！

### Boolean Is Not* Built-In

The original version of C did not have a primitive type for booleans, programs instead used the integers 0 and 1. This was changed in C99, which added booleans in the optional <stdbool.h> header[1]:

### 布尔值并非*内置

C 语言的原始版本没有布尔值的原始类型，程序通常使用整数 0 和 1。这种情况在 C99 中发生了改变，它在可选的 `<stdbool.h>` 头文件中增加了布尔值[1]：

```c
#include <stdbool.h>
int main() {
    bool yes = true;
    bool no = false;
    return 0;
}
```

Even still, true and false are not literals or keywords like in other languages. Instead, they are definitions that expand to 1 and 0:

即便如此，`true` 和 `false` 也不像其他语言那样是字面量或关键字。相反，它们是展开为 1 和 0 的定义：

```c
#define true 1
#define false 0
```

This was changed again in C23[2], so now booleans are true language primitives, but if you're compiling for earlier versions you'll need to include <stdbool.h>.

这种情况在 C23[2] 中再次发生了改变，现在布尔值是真正的语言原语，但如果你要为早期版本编译，则需要包含 `<stdbool.h>`。

### Null-Terminated Strings

A Rust &str is 16 bytes: 8 bytes for the memory address and 8 bytes for the string length. This is because str is a dynamically sized type, and uses pointer metadata to track the length of the string.

### 以空字符结尾的字符串

Rust 的 `&str` 占用 16 个字节：8 个字节用于内存地址，8 个字节用于字符串长度。这是因为 `str` 是一种动态大小类型，并使用指针元数据来跟踪字符串的长度。

```rust
// While a normal reference uses only 8 bytes...
assert_eq!(std::mem::size_of::<&u8>(), 8);
// ...strings use 16 bytes.
assert_eq!(std::mem::size_of::<&str>(), 16);
```

This approach makes fetching the string length extremely efficient, but requires more memory per &str reference. C uses a different approach: it doesn't store the size of its strings separately, but instead terminates every single string with a null byte (\0). This is an intentional trade off that results in a few things:

这种方法使得获取字符串长度极其高效，但每个 `&str` 引用需要更多的内存。C 语言使用了一种不同的方法：它不单独存储字符串的大小，而是用一个空字节（`\0`）来终止每一个字符串。这是一个故意的权衡，导致了以下几点：

* C programs don't need to keep track of an extra size variable alongside the string[3]
* Every single string needs room at the end for a null byte
* This means empty strings "" still take up one byte of memory!
* Null bytes cannot easily be used in the middle of a string without messing up <string.h>'s functions
* Forgetting the null terminator can result in out-of-bound reads

* C 程序不需要在字符串之外额外跟踪一个大小变量[3]
* 每一个字符串都需要在末尾留出空间存放空字节
* 这意味着空字符串 `""` 仍然占用一个字节的内存！
* 空字节不能轻易地用在字符串中间，否则会搞乱 `<string.h>` 中的函数
* 忘记空终止符可能导致越界读取

In practice, this requires you to remember to allocate extra space for the null terminator and insert it at the end of strings. For example, here is a program that reverses a string in C:

在实践中，这要求你记住为终止符分配额外的空间，并将其插入到字符串的末尾。例如，这是一个在 C 中反转字符串的程序：

```c
1char* reverse(char* forward) {
2    // Calculate the string's length, excluding the null terminator.
3    unsigned long len = strlen(forward);
4    // Allocate enough room for the string and its null terminator.
5    char* reversed = malloc(len + 1);
6
7    for (int i = 0; i < len; i++) {
8        reversed[i] = forward[len - 1 - i];
9    }
10
11    // Add the null terminator at the end.
12    reversed[len] = '\0';
13
14    return reversed;
15}
```

Note lines 5 and 12, which take special measure to account for the null terminator. For reference, the corresponding Rust function[4] doesn't need to do so:

注意第 5 行和第 12 行，它们采取了特殊措施来处理空终止符。作为参考，相应的 Rust 函数[4]则不需要这样做：

```rust
fn reverse(forward: &[u8]) -> Box<[u8]> {
    let len = forward.len();
    let mut reversed = Box::<[u8]>::new_uninit_slice(len);
    for i in 0..len {
        reversed[i].write(forward[len - 1 - i]);
    }
    unsafe { reversed.assume_init() }
}
```

### Target-Dependent Integer Widths

C's integer types are not guaranteed to use an exact number of bits, instead the width varies depending on the target platform.

### 与目标相关的整数宽度

C 语言的整数类型不能保证使用确切的位数，其宽度取决于目标平台。

| Type | C Standard | 64-bit Unix | 64-bit Windows |
| :--- | :--- | :--- | :--- |
| char | at least 8 bits | 8 bits | 8 bits |
| short | at least 16 bits | 16 bits | 16 bits |
| int | at least 16 bits | 32 bits | 32 bits |
| long | at least 32 bits | 64 bits | 32 bits |
| long long | at least 64 bits | 64 bits | 64 bits |

Data sourced via cppreference.com

数据来源：cppreference.com

long being 64 bits on Unix and 32 bits on Windows particularly irks me. I recommend following the advice that a friend of mine gave me a few years ago: if you care about cross-platform compatibility, only use the fixed width integers provided by <stdint.h>:

`long` 在 Unix 上是 64 位，而在 Windows 上是 32 位，这让我特别恼火。我建议遵循几年前一位朋友给我的建议：如果你关心跨平台兼容性，请仅使用 `<stdint.h>` 提供的固定宽度整数：

| Rust | C |
| :--- | :--- |
| u8 | uint8_t |
| u16 | uint16_t |
| u32 | uint32_t |
| u64 | uint64_t |
| usize | size_t[5] |
| i8 | int8_t |
| i16 | int16_t |
| i32 | int32_t |
| i64 | int64_t |
| isize | ptrdiff_t[5] |

### Error Handling Sucks

I really love Rust's error handling. Result forces you to address errors, and sum types (enums) and match statements make doing so really easy! C's error handling story, in comparison, is straight up tragic. It seems to boil down to functions returning a "magic integer" like -1 or a null pointer to signal there was an error.

### 错误处理很糟糕

我真的很喜欢 Rust 的错误处理。`Result` 强制你处理错误，而和类型（枚举）和 `match` 语句使处理变得非常容易！相比之下，C 语言的错误处理简直是一场悲剧。它似乎归结为函数返回一个“魔法整数”（如 -1）或空指针来表示发生了错误。

You can get a little bit more information by reading errno, a thread-local integer that can be used to check for specific kinds of errors, but in terms of getting actual error messages and stack traces it is much harder. When writing C, one of the biggest things you'll notice is that the language will never force you to handle errors. It's up to you to remember that functions can fail.

你可以通过读取 `errno`（一个线程局部整数，可用于检查特定类型的错误）来获得更多信息，但在获取实际错误消息和堆栈跟踪方面要困难得多。在编写 C 语言时，你会注意到的最大事情之一是，该语言永远不会强迫你处理错误。你必须自己记住函数可能会失败。

For example, here's a snippet of code from Null-Terminated Strings:

例如，这是来自“以空字符结尾的字符串”的一段代码：

```c
// Allocate enough room for the string and its null terminator.
char* reversed = malloc(len + 1);
for (int i = 0; i < len; i++) {
    reversed[i] = forward[len - 1 - i];
}
```

To new programmers, it's not immediately obvious that malloc() can fail and return a null pointer. If your machine runs out of memory, reversed[i] will cause a segfault upon being accessed. In order to avoid unhelpful segfaults, the program should check for a null pointer and gracefully exit if one is found:

对于新程序员来说，`malloc()` 可能会失败并返回空指针并不是显而易见的。如果你的机器内存耗尽，访问 `reversed[i]` 将导致段错误。为了避免无用的段错误，程序应该检查空指针，如果发现空指针则优雅地退出：

```c
char* reversed = malloc(len + 1);
if (reversed == NULL) {
    perror("Error");
    exit(1);
}
```

Doing so provides a much better experience than a segfault, or worse, other unintentional behavior:

这样做比段错误或更糟糕的其他非预期行为提供了更好的体验：

```bash
$ ./main
Error: Cannot allocate memory
```

Of course, remembering to check every single allocated pointer isn't an amazing developer experience.

当然，记住检查每一个分配的指针并不是一种美妙的开发体验。