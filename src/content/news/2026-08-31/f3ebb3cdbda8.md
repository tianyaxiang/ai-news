---
title: "PWC 388 Dyck Words: I Refuse to Indulge in the Obvious Jokes"
originalUrl: "https://dev.to/boblied/pwc-388-dyck-words-i-refuse-to-indulge-in-the-obvious-jokes-56i2"
date: "2026-08-30T23:40:56.258Z"
---

# PWC 388 Dyck Words: I Refuse to Indulge in the Obvious Jokes
# PWC 388 Dyck Words：我拒绝沉溺于那些显而易见的笑话

As soon as I saw the title of this week's challenge, I had to run to Google. As a person with a German surname that is sometimes mispronounced for sophomoric humor, I did not want to fall into that trap. Sure enough, that name is pronounced "deek", so let's restrain ourselves, shall we? On the other hand, as a person with the emotional maturity of a fourteen-year-old, I am well aware of the Letterkenny Dycks. So, take a moment and I'll meet you back here. Now that we have that out of our system, let's begin.
当我看到本周挑战的标题时，我立刻去查了谷歌。作为一个拥有有时会被人为了低级趣味而读错的德国姓氏的人，我不想掉进那个陷阱。果然，那个名字读作“deek”，所以我们还是克制一下吧，好吗？另一方面，作为一个情感成熟度只有十四岁的人，我非常了解《Letterkenny》里的 Dyck 一家。所以，请花点时间（去查查），我们待会儿见。既然我们已经发泄完了，那就开始吧。

### Task 1: Dyck Words
### 任务 1：Dyck Words

A Dyck Word of order n is a string of length 2n consisting of n ‘U’ (Up) characters and n ‘D’ (Down) characters such that no initial prefix of the string contains more ‘D’s than ‘U’s. Write a script to return a list of all valid Dyck words of length 2n, sorted in lexicographical (alphabetical) order.
Dyck Word（阶数为 n）是一个长度为 2n 的字符串，由 n 个“U”（向上）字符和 n 个“D”（向下）字符组成，且该字符串的任何前缀中“D”的数量都不会超过“U”的数量。编写一个脚本，返回所有长度为 2n 的有效 Dyck Words 列表，并按字典序（字母顺序）排序。

*Example 1: Input: $n = 1 Output: ("UD")*
*Example 2: Input: $n = 2 Output: ("UDUD","UUDD")*
*Example 3: Input: $n = 3 Output: ("UDUDUD", "UDUUDD", "UUDDUD", "UUDUDD", "UUUDDD")*
*Example 4: Input: $n = 0 Output: ("")*
*Example 5: Input: $n = 4 Output: ("UDUDUDUD", "UDUDUUDD", "UDUUDDUD", "UDUUDUDD", "UDUUUDDD", "UUDDUDUD", "UUDDUUDD", "UUDUDDUD", "UUDUDUDD", "UUDUUDDD","UUUDDDUD", "UUUDDUDD", "UUUDUDDD", "UUUUDDDD")*
（示例 1-5 略）

### Discussion
### 讨论

This pattern can be visualized as walking along a grid, starting at (0,0), staying entirely inside the wedge between 0° and 45°, and ending back on the x axis. If you replace 'U' and 'D' with '(' and ')', it represents strings with balanced parentheses. Generating these strings is going to be some kind of recursive algorithm. While checking on the pronunciation of "Dyck", I stumbled on a CPAN module, Math::DyckWords, that implements these strings. Peeking at the source code, sure enough there's a recursive algorithm. Just like AI, I'm going to train myself by scanning a public web site, regurgitating something similar, taking credit for it, and skimming over the ethical implications.
这种模式可以想象成在网格上行走，从 (0,0) 出发，完全保持在 0° 到 45° 的夹角内，并最终回到 x 轴上。如果你将“U”和“D”替换为“(”和“)”，它就代表了括号平衡的字符串。生成这些字符串需要某种递归算法。在检查“Dyck”的发音时，我偶然发现了一个实现这些字符串的 CPAN 模块：Math::DyckWords。偷看了一下源代码，果然里面有一个递归算法。就像人工智能一样，我打算通过扫描公共网站来训练自己，复述类似的内容，将其据为己有，并对其中的伦理影响轻描淡写。

### Implementation
### 实现

Working top-down, I'm going to assume that there's a function that can return a list of appropriate strings. I'll handle the special case of 0, and turn the list into the sorted set that the problem specifies. Because of the way the recursion works, and because we've chosen to use the letters U and D, it turns out that the list comes back in reverse alphabetical order, so we can avoid sorting.
采用自顶向下的方法，我假设有一个函数可以返回适当的字符串列表。我将处理 0 的特殊情况，并将列表转换为问题指定的排序集合。由于递归的工作方式，以及我们选择使用字母 U 和 D，结果发现返回的列表是按字母逆序排列的，因此我们可以避免排序。

```perl
sub task($n) { 
    my $result = $n ? generateDyck($n) : [""]; 
    return [ reverse $result->@* ]; 
}
```

On to the meat of the problem. My recursive function will have a signature that reflects how deep into the string we've come.
接下来是问题的核心。我的递归函数将拥有一个能够反映我们深入字符串程度的签名。

```perl
sub generateDyck($n, $dyck=[], $word='U', $nU=1, $nD=0, $depth=1) { 
    [ . . . ] 
}
```

I'm making generous use of default values for parameters. The first call from task() is just generateDyck($n), so all the rest of the parameters will get their values from the signature. The list of words will accumulate in the $dyck array. The word we're currently working on is in $word. Our first character is always a 'U', and the counts reflect that. The $depth parameter is the depth of the recursion; it's not really necessary but helps in debugging. To build the string, we add a letter at a time, preferring 'U' first. The number of D's can never get ahead of the number of U's. Eventually we return the reference to the list of words; the return value is only really used at the top-level call.
我大量使用了参数的默认值。从 task() 的第一次调用只是 generateDyck($n)，因此所有其余参数都将从签名中获取其值。单词列表将累积在 $dyck 数组中。我们当前正在处理的单词在 $word 中。我们的第一个字符始终是“U”，计数也反映了这一点。$depth 参数是递归的深度；它不是必需的，但有助于调试。为了构建字符串，我们一次添加一个字母，优先选择“U”。D 的数量永远不能超过 U 的数量。最终我们返回单词列表的引用；返回值实际上仅在顶层调用中使用。

```perl
# We have space to add both a U and a D
if ( $nU < $n && $nD < $n && $nU > $nD ) {
    # U goes before D
    generateDyck( $n, $dyck, $word . 'U', $nU + 1, $nD , $depth++ );
    generateDyck( $n, $dyck, $word . 'D', $nU, $nD + 1 , $depth++ );
}

# We have space, but a U must be next
if ( ( $nU < $n && $nD < $n && $nU == $nD ) || ( $nU < $n && $nD == $n ) ) {
    generateDyck( $n, $dyck, $word . 'U', $nU + 1, $nD , $depth++ );
}

if ( $nU == $n ) {
    # We have all the Us, must add enough D to balance.
    if ( $nD < $n ) {
        my $need = $n - $nD;
        generateDyck( $n, $dyck, $word . ('D' x $need), $nU, $nD + $need , $depth++ );
    } else # $nD == $n
    {
        # We have n of each, so save a complete word.
        push @$dyck, $word;
    }
}
return $dyck;
```