---
title: "A Better SQL in 11 Lines of Code"
originalUrl: "https://prela-lang.org/tutorial/"
date: "2026-09-01T00:57:33.142Z"
---

# A Better SQL in 11 Lines of Code
# 用 11 行代码实现更好的 SQL

Prela is a new query language being developed at UCLA RePL. The language is quite different from SQL, but its key ideas are very simple. In this short tutorial, we will build a toy version of Prela in Python to understand its core principles.
Prela 是 UCLA RePL 正在开发的一种新型查询语言。它与 SQL 有很大不同，但其核心理念非常简单。在本篇简短的教程中，我们将用 Python 构建一个 Prela 的玩具版本，以理解其核心原理。

By the end of this tutorial, you will know how the following query works:
`movie.where(company.s(country).eq("[us]") & keyword.eq("character-name-in-title")) .select(title & cast.s(person).s(alias).s(text))`
在本教程结束时，你将了解以下查询是如何工作的：
`movie.where(company.s(country).eq("[us]") & keyword.eq("character-name-in-title")) .select(title & cast.s(person).s(alias).s(text))`

You can probably already guess what it's doing: the query finds every movie produced by an American company and has a character name in its title, and outputs the title along with the alias for each cast member. Note that the equivalent query in SQL spans over 20 lines.
你可能已经猜到了它的作用：该查询查找所有由美国公司制作且标题中包含角色名称的电影，并输出电影标题以及每位演员的别名。请注意，在 SQL 中实现同样的查询需要超过 20 行代码。

The first special thing about Prela is that there are only binary relations, i.e., tables with two columns. That may sound very limiting at first, but it's easy to "binarize" a wide table with multiple columns. Suppose we have a table of movies:
Prela 的第一个独特之处在于它只有二元关系，即只有两列的表。起初这听起来可能非常受限，但将多列的宽表“二元化”其实很容易。假设我们有一个电影表：

ID | title | year
---|---|---
646 | The Godfather | 1972
478 | Seven Samurai | 1954
583 | Casablanca | 1942

We can decompose the 3-column table into 3 binary relations, each mapping the row number to the column value:
我们可以将这个 3 列的表分解为 3 个二元关系，每个关系都将行号映射到列值：

```python
movie = Rel([(646, 0), (478, 1), (583, 2)])
title = Rel([(0, "The Godfather"), (1, "Seven Samurai"), (2, "Casablanca")])
year = Rel([(0, 1972), (1, 1954), (2, 1942)])
```

The motivation for focusing on binary relations is that they generalize functions. Functions are powerful because they compose, making them the building blocks of programs. A function maps every input to a unique output, whereas a binary relation can map an input to multiple different outputs. In a sense, a binary relation can be viewed as a nondeterministic function, and we can compose them just like how we compose functions.
专注于二元关系的动机在于它们推广了函数的概念。函数之所以强大是因为它们可以组合，从而成为程序的构建块。函数将每个输入映射到一个唯一的输出，而二元关系可以将一个输入映射到多个不同的输出。从某种意义上说，二元关系可以被视为一种非确定性函数，我们可以像组合函数一样组合它们。

That is all very abstract, so let's go back to our examples. To keep things simple, we will focus on relations mapping every input to exactly one output, i.e., they all happen to be functions. "Calling" a relation then boils down to turning that relation into a dictionary and looking up the value:
这些概念非常抽象，让我们回到示例中。为了简化，我们将专注于将每个输入映射到唯一输出的关系，即它们恰好都是函数。此时，“调用”一个关系就简化为将该关系转换为字典并查找值：

```python
print(dict(movie)[646], dict(title)[0], dict(year)[0])
```

We're now ready to introduce the first and most important operator in Prela, the relation composition. Function composition works by applying one function first, then applying the other one to the output. The composition of two relations r and s is itself a relation, first mapping x with r to get some y, then map y with s for the final "output".
现在我们准备介绍 Prela 中第一个也是最重要的运算符：关系组合。函数组合的工作方式是先应用一个函数，然后将另一个函数应用于其输出。两个关系 r 和 s 的组合本身也是一个关系，即先用 r 将 x 映射得到 y，再用 s 将 y 映射得到最终的“输出”。

This can be implemented by turning s into a dictionary d, iterating the (x, y) pairs in r, and finally outputting (x, d[y]) if y is found in d:
这可以通过将 s 转换为字典 d，遍历 r 中的 (x, y) 对，并在 d 中找到 y 时输出 (x, d[y]) 来实现：

```python
def select(r, s):
    d = dict(s)
    return [ (x, d[y]) for x, y in r if y in d ]
```

Using our example, the query below composes movie with title to get a relation mapping each movie ID to its title:
使用我们的示例，下面的查询将 movie 与 title 组合，得到一个将每个电影 ID 映射到其标题的关系：

```python
print(movie.select(title))
```

The power of composition really shows when we chain together multiple .select calls. Suppose we add a foreign key column mapping each movie to its production company, and another table for movie companies. Decomposing the same way gives us four more relations. Then, we can find the country of a movie's production company by a chain of .select calls, where we abbreviate with .s:
当我们链式调用多个 `.select` 时，组合的威力就显现出来了。假设我们添加一个外键列，将每部电影映射到其制作公司，并为电影公司添加另一个表。以同样的方式分解，我们又得到了四个关系。然后，我们可以通过一连串的 `.select` 调用找到电影制作公司的国家，并使用 `.s` 进行缩写：

```python
print(movie.s(company).s(id2row).s(country))
```

Because joining via a foreign key almost always requires "resolving" an ID to a row, Prela automatically inserts that step so one can write the following, which reads just like "a movie's company's country"!
由于通过外键进行连接几乎总是需要将 ID“解析”为行，Prela 会自动插入该步骤，因此可以写成如下形式，读起来就像是“电影的公司的国家”！

```python
print(movie.s(company).s(country))
```

So far every query has returned a single column of values. To select multiple attributes, we introduce the & operator. Where .select matches the second column of r against the first column of s, & joins r and s on the first column of both, then pairs up their second columns:
到目前为止，每个查询都返回了单列值。为了选择多个属性，我们引入了 `&` 运算符。`.select` 将 r 的第二列与 s 的第一列匹配，而 `&` 则在 r 和 s 的第一列上进行连接，然后将它们的第二列配对：

```python
def and_(r, s):
    d = dict(s)
    return [ (x, (y, d[x])) for x, y in r if x in d ]
```

Note that the result is still a binary relation, & simply nests the values into a tuple. That means we can keep composing it like any other relation, which is how a query returns more than one column:
请注意，结果仍然是一个二元关系，`&` 只是将值嵌套到一个元组中。这意味着我们可以像处理其他关系一样继续组合它，这就是查询如何返回多列的方法：

```python
print(movie.select(title & year))
```

Next, we need a way to say which rows we want. The predicate .eq(v) filters a relation, keeping only the pairs whose second column equals v:
接下来，我们需要一种方法来指定我们想要的行。谓词 `.eq(v)` 过滤一个关系，只保留第二列等于 v 的对：

```python
def eq(r, v):
    return [ (x, y) for x, y in r if y == v ]
```

Finally, the restriction operator .where takes a predicate like the one above and filters another relation with it.
最后，限制运算符 `.where` 接收像上面那样的谓词，并用它来过滤另一个关系。

```python
def where(r, s):
    d = dict(s)
    return [ (x, y) for x, y in r if y in d ]
```

Handing our predicate to .where turns it into a filter on movies:
将我们的谓词交给 `.where`，它就变成了对电影的过滤器：

```python
print(movie.where(company.s(country).eq("[us]")))
```

This reads right off the code: "movies where the company's country is [us]". The query is getting long, so let's refactor it:
这直接从代码中读出：“公司国家为 [us] 的电影”。查询变得越来越长，所以让我们重构它：

```python
american = company.s(country).eq("[us]")
print(movie.where(american))
```