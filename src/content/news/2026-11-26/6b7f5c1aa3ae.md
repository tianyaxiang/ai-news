---
title: "Typed indexes in Zig"
originalUrl: "https://lvignoli.eu/posts/2026-11-16-typed-indexes-in-zig/"
date: "2026-11-25T22:48:44.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

### Typed indexes in Zig

Zig 中的类型化索引（Typed indexes）

The named integer or Newtype Index pattern prevents mixing up indexes on different arrays. The above examples were not particularly illuminating to me. Andrew’s example don’t show much of how to enforce the safety at call site: any caller could call backingInt (it used to be @intFromEnum) to recover a numerical index and pass it to the wrong array, or access array elements with a plain integer. And matklad’s one focus on building a tree data structure in a neat way, but that’s a totally different challenge that the introductory problem of mixing array indexes, so it was not a super convincing illustration for me.

命名整数或新类型（Newtype）索引模式可以防止混淆不同数组的索引。上述示例对我而言并没有特别的启发性。Andrew 的示例并没有展示如何在调用点强制执行安全性：任何调用者都可以调用 `backingInt`（过去是 `@intFromEnum`）来恢复数值索引并将其传递给错误的数组，或者使用普通整数访问数组元素。而 matklad 的示例侧重于以一种巧妙的方式构建树状数据结构，但这与混淆数组索引这一入门级问题完全不同，因此对我来说并不是一个非常有说服力的说明。

In practice, to make good use of the pattern, a getter helper is required as the conventional way of accessing elements of the array. It can be a method on the array type—or the index type.

在实践中，为了充分利用这种模式，需要一个 getter 辅助函数作为访问数组元素的常规方式。它可以是数组类型上的一个方法，也可以是索引类型上的一个方法。

### A struct of array example

结构体数组示例

In a struct of array data structure, it is particularly valuable to have one typed index per slice rather than relying on careful naming. Consider this spreadsheet example where it’s easy to mix up indexes:

在结构体数组（Struct of Array）数据结构中，为每个切片配备一个类型化索引非常有价值，而不是仅仅依赖仔细的命名。考虑这个电子表格示例，其中很容易混淆索引：

We can prevent such bug by enforcing compile time checking of field access with typed indexes.

我们可以通过使用类型化索引强制执行字段访问的编译时检查来防止此类错误。

### Generic recipe

通用方案

It’s clumsy to keep one index type and one accessor per field. We can use a bit of comptime to streamline the pattern, and make the recipe more generic to fit arbitrary structs. Here is a complete example.

为每个字段维护一个索引类型和一个访问器显得很笨拙。我们可以使用一点 `comptime` 来简化这种模式，并使方案更通用，以适应任意结构体。以下是一个完整的示例。

Let’s walk it step by step.

让我们一步步分析。

Our spreadsheet has now several fields: a title, and row and column properties. When iterating over them, we have two kinds of indexes: row indexes and column indexes. Adding typed indexes is attractive to prevent callers from mixing them up.

我们的电子表格现在有几个字段：标题，以及行和列属性。在遍历它们时，我们有两种索引：行索引和列索引。添加类型化索引很有吸引力，可以防止调用者混淆它们。

This enum gives us a way of referencing all the struct fields for which we will construct a typed indexed. If all fields were to be indexed, we would have used `std.meta.FieldEnum(Sheet)`, but our spreadsheet has a title.

这个枚举为我们提供了一种引用所有将要构建类型化索引的结构体字段的方法。如果所有字段都需要索引，我们会使用 `std.meta.FieldEnum(Sheet)`，但我们的电子表格包含一个标题字段。

This checks at compile time that each Field enum variant name is indeed a field inside Sheet. As we’ll see later, we will have to access Sheet’s fields by name, so it’s good to check the names of Field variants match the names of Sheet fields.

这会在编译时检查每个 Field 枚举变体名称是否确实是 Sheet 内部的字段。正如稍后将看到的，我们必须按名称访问 Sheet 的字段，因此检查 Field 变体名称是否与 Sheet 字段名称匹配是一个好习惯。

This defines the kind of type indexes we’ll construct: one for row data slices and one for columns data slices. Each indexed field of Sheet has one correct typed index kind. We match them with an exhaustive switch over Field.

这定义了我们将要构建的类型索引种类：一种用于行数据切片，另一种用于列数据切片。Sheet 的每个索引字段都有一个正确的类型化索引种类。我们通过对 Field 进行穷举 switch 来匹配它们。

We now have all we need to construct the two typed indexes of kinds `.row` and `.col`. A generic function returning a type at comptime is how to do it.

现在我们拥有了构建 `.row` 和 `.col` 这两种类型化索引所需的一切。在 `comptime` 返回类型的泛型函数就是实现这一目标的方法。

The typed index type for row is `Sheet.Index(.row)`, and for colum it is `Sheet.Index(.col)`. Note the title case of the Index function, matching Zig’s convention for types.

行的类型化索引类型是 `Sheet.Index(.row)`，列的则是 `Sheet.Index(.col)`。注意 Index 函数的首字母大写，这符合 Zig 对类型的命名惯例。

Remains to give a way of making use of these types.

剩下的就是提供一种使用这些类型的方法。

This part may look complex if you are not familiar with comptime-enabled generics in Zig, so let’s be precise. This defines a method on Sheet that requires f to be a Field instance known at compile time. This allow to infer at compile time both the type of i and the return type.

如果你不熟悉 Zig 中支持 `comptime` 的泛型，这部分看起来可能很复杂，所以我们精确一点。这在 Sheet 上定义了一个方法，要求 f 是一个在编译时已知的 Field 实例。这允许在编译时推断出 i 的类型和返回类型。

Index(kindOf(f)) is just a chain of function calls on a known value. So it is comptime known. And most importantly, the type of i is bound to the one of f at compile time.

`Index(kindOf(f))` 只是对已知值的一系列函数调用，因此它是 `comptime` 已知的。最重要的是，i 的类型在编译时绑定到了 f 的类型上。