---
title: "bzip3"
originalUrl: "https://github.com/iczelia/bzip3"
date: "2026-09-07T23:35:15.097Z"
---

# bzip3

BZip3 is a better, faster, and stronger spiritual successor to BZip2. It features higher compression ratios and better performance thanks to an order-0 context mixing entropy coder, a fast Burrows-Wheeler transform code making use of suffix arrays, and an RLE with Lempel Ziv+Prediction pass based on LZ77-style string matching and PPM-style context modeling. Like its ancestor, BZip3 excels at compressing text or code.

BZip3 是 BZip2 的一个更好、更快、更强大的精神继任者。得益于 0 阶上下文混合熵编码器、利用后缀数组的快速 Burrows-Wheeler 变换代码，以及基于 LZ77 风格字符串匹配和 PPM 风格上下文建模的 RLE 与 Lempel Ziv+Prediction 通道，它具备更高的压缩比和更好的性能。与其前辈一样，BZip3 在压缩文本或代码方面表现出色。

### Installation
### 安装

If using a git clone (not needed for source packages), first...
如果使用 git clone（源码包不需要），请先执行...

```bash
$ ./bootstrap.sh
# All...
$ ./configure
$ make
$ sudo make install
```

Alternatively, you might be able to install bzip3 using your system's package manager: On macOS, you can use Homebrew to easily install:
或者，您也可以使用系统的包管理器安装 bzip3：在 macOS 上，可以使用 Homebrew 轻松安装：

```bash
$ brew install bzip3
```

### Perl source code benchmark
### Perl 源代码基准测试

First, I have downloaded every version of Perl5 ever released and decompressed them.
首先，我下载了 Perl5 发布过的所有版本并进行了解压。

```bash
% wget -r -l1 -nH --cut-dirs=2 --no-parent -A.tar.gz --no-directories https://www.cpan.org/src/5.0/
% for g in *.gz; do gunzip $g; done
% ls -la | wc -l
262
```

Then, I put all the resulting .tar files in a single .tar file and tried to compress it using various compressors:
然后，我将所有生成的 .tar 文件合并为一个 .tar 文件，并尝试使用各种压缩工具进行压缩：

*(Benchmark data omitted for brevity)*
*(为简洁起见，此处省略基准测试数据)*

The results follow:
结果如下：

| Method | Compressed size (bytes) |
| :--- | :--- |
| LZMA (xz) | 2'056'645'240 |
| bzip2 | 3'441'163'911 |
| bzip3 -b 256 | 1'001'957'587 |
| bzip3 -b 511 | 546'456'978 |
| Zstandard | 3'076'143'660 |

Finally, wall clock time decompression times (WD Blue HDD):
最后是解压耗时（WD Blue 机械硬盘）：

| Method | Decompression time |
| :--- | :--- |
| LZMA (xz) | 4min 40s |
| bzip2 | 9min 22s |
| bzip3 (parallel) | 4min 06s |
| Zstandard | 3min 51s |

Then, I used lrzip to perform long-range deduplication on the original .tar file:
随后，我使用 lrzip 对原始 .tar 文件执行了长距离去重：

*(Benchmark commands omitted)*
*(基准测试命令省略)*

Finally, I compressed the resulting none.tar.lrz file using bzip3:
最后，我使用 bzip3 压缩了生成的 none.tar.lrz 文件：

| Method | Compressed size (bytes) |
| :--- | :--- |
| lrzip + bzip3 | 60'672'608 |
| lrzip + lzma | 64'774'202 |
| lrzip + bzip2 | 75'685'065 |

For further benchmarks against Turbo-Range-Coder and BSC, check powturbo's benchmark of bzip3, bzip2, bsc and others.
如需查看针对 Turbo-Range-Coder 和 BSC 的更多基准测试，请查阅 powturbo 关于 bzip3、bzip2、bsc 等工具的基准测试。

### Disclaimers
### 免责声明

I TAKE NO RESPONSIBILITY FOR ANY LOSS OF DATA ARISING FROM THE USE OF THIS PROGRAM/LIBRARY, HOWSOEVER CAUSED. Every compression of a file implies an assumption that the compressed file can be decompressed to reproduce the original. Great efforts in design, coding and testing have been made to ensure that this program works correctly. However, the complexity of the algorithms, and, in particular, the presence of various special cases in the code which occur with very low but non-zero probability make it impossible to rule out the possibility of bugs remaining in the program. DO NOT COMPRESS ANY DATA WITH THIS PROGRAM UNLESS YOU ARE PREPARED TO ACCEPT THE POSSIBILITY, HOWEVER SMALL, THAT THE DATA WILL NOT BE RECOVERABLE.
对于因使用本程序/库而导致的任何数据丢失，无论何种原因，本人概不负责。文件的每一次压缩都隐含了一个假设，即压缩后的文件可以解压并还原为原始文件。我们在设计、编码和测试方面付出了巨大努力以确保程序正常工作。然而，算法的复杂性，特别是代码中存在各种以极低但非零概率发生的特殊情况，使得无法排除程序中仍存在 Bug 的可能性。除非您准备好接受数据可能无法恢复的可能性（无论概率多小），否则请勿使用本程序压缩任何数据。

That is not to say this program is inherently unreliable. Indeed, I very much hope the opposite is true. Bzip3/libbz3 has been carefully constructed and extensively tested. Bzip3's performance is heavily dependent on the compiler. x64 Linux clang13 builds usually can go as high as 17MiB/s compression and 23MiB/s decompression per thread. Windows and 32-bit builds might be considerably slower.
这并不是说本程序本质上不可靠。事实上，我非常希望事实恰恰相反。Bzip3/libbz3 经过了精心构建和广泛测试。Bzip3 的性能在很大程度上取决于编译器。x64 Linux clang13 构建版本通常可以达到每线程 17MiB/s 的压缩速度和 23MiB/s 的解压速度。Windows 和 32 位构建版本可能会慢得多。

Bzip3 has been tested on the following architectures: x86, x86_64, armv6, armv7, aarch64, ppc64le, mips, mips64, sparc, s390x.
Bzip3 已在以下架构上进行了测试：x86, x86_64, armv6, armv7, aarch64, ppc64le, mips, mips64, sparc, s390x。

### Corpus benchmarks
### 语料库基准测试

Check etc/BENCHMARKS.md for more results.
请查看 etc/BENCHMARKS.md 获取更多结果。

### Licensing
### 许可协议

A breakdown of components and their licenses follows:
组件及其许可协议明细如下：

*   (runtime) The codebase as a whole: Copyright 2022-2023, Kamila Szewczyk (k@iczelia.net); LGPL (LICENSE)
    (运行时) 整个代码库：版权所有 2022-2023, Kamila Szewczyk (k@iczelia.net)；LGPL (LICENSE)
*   (runtime) The Burrows-Wheeler transform (libsais) and LZP code: 2021-2022, Ilya Grebnov (ilya.grebnov@gmail.com); Apache 2.0 (3rdparty/libsais-LICENSE)
    (运行时) Burrows-Wheeler 变换 (libsais) 和 LZP 代码：2021-2022, Ilya Grebnov (ilya.grebnov@gmail.com)；Apache 2.0 (3rdparty/libsais-LICENSE)
*   (compile-time) build-aux: Copyright 2011, Daniel Richard G (skunk@iSKUNK.ORG), 2019, Marc Stevens (marc.stevens@cwi.nl), 2008, Steven G. Johnson (stevenj@alum.mit.edu); GPL-3+ with AutoConf exception
    (编译时) build-aux：版权所有 2011, Daniel Richard G (skunk@iSKUNK.ORG), 2019, Marc Stevens (marc.stevens@cwi.nl), 2008, Steven G. Johnson (stevenj@alum.mit.edu)；GPL-3+ 及 AutoConf 例外条款
*   (compile-time) build-aux/ax_check_compile_flag.m4: Copyright 2008, Guido U. Draheim (guidod@gmx.de), 2011, Maarten Bosmans (mkbosmans@gmail.com); FSFAP
    (编译时) build-aux/ax_check_compile_flag.m4：版权所有 2008, Guido U. Draheim (guidod@gmx.de), 2011, Maarten Bosmans (mkbosmans@gmail.com)；FSFAP
*   (compile-time) build-aux/git-version-gen: Copyright 2007-2012, Free Software Foundation, Inc; GPLv3
    (编译时) build-aux/git-version-gen：版权所有 2007-2012, Free Software Foundation, Inc；GPLv3
*   (runtime) bz3grep: Copyright 2003, Thomas Klausner; BSD-2-clause
    (运行时) bz3grep：版权所有 2003, Thomas Klausner；BSD-2-clause

bzip3 as a whole is licensed under LGPLv3 only. It is not dual-licensed under LGPLv3 and Apache 2.0.
bzip3 整体仅在 LGPLv3 下授权。它并非 LGPLv3 和 Apache 2.0 双重授权。

Thanks Ilya Grebnov for his libsais library used for BWT construction in BZip3 and the LZP encoder which I had used as a reference implementation to improve myself. Caleb Maclennan for configuring autotools as a packaging-friendly build system for BZip3. Ilya Muravyov for his public domain BWT post-coder, a derivative of which is used in this project.
感谢 Ilya Grebnov 提供的 libsais 库（用于 BZip3 中的 BWT 构建）以及 LZP 编码器（我将其作为参考实现来提升自己）。感谢 Caleb Maclennan 为 BZip3 配置了对打包友好的 autotools 构建系统。感谢 Ilya Muravyov 提供的公有领域 BWT 后编码器，本项目使用了其衍生版本。