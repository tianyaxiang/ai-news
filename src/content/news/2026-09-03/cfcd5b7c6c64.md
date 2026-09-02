---
title: "Static Allocation, Constant Work"
originalUrl: "https://matklad.github.io/2026/09/02/static-allocation-constant-work.html"
date: "2026-09-02T23:32:21.139Z"
---

# Static Allocation, Constant Work
# 静态分配，恒定工作

In reply to this email: Memory Safety’s Hardest Problem named something I’d hit but couldn’t articulate. Your case is a pointer into one union variant surviving a write of a different variant, so live typed pointers end up reading bytes that belong to something else now. Last year I wrote a limit-order matching engine and shipped a use-after-free: a cancelled order was released back to the pool while it was still linked into its price level, so the next allocation handed that memory to a new order and the stale link kept resolving. I’d filed it under “I was careless with lifetimes.” After your post I’m not sure that’s what it was. A recycling pool looks like a tagged union where the tag is “which generation of object currently lives in this slot,” and nothing in the type system tracks it. Is that a fair reading, or does the pool case stay genuinely easier because generational indices actually solve it and the union case has no equivalent?

针对这封邮件的回复：《内存安全最棘手的问题》一文点出了我曾遇到却无法清晰表达的问题。你提到的情况是指：一个指向联合体（union）某个变体的指针，在联合体被写入另一个变体后依然存活，导致存活的类型化指针最终读取了属于其他数据的字节。去年我编写了一个限价订单撮合引擎，并发布了一个“释放后使用”（use-after-free）的漏洞：一个已取消的订单在仍链接于价格层级时被释放回了内存池，因此下一次分配将该内存交给了一个新订单，而旧的链接依然在解析。我当时将其归咎于“我对生命周期管理不够小心”。但在读了你的文章后，我不确定是否真是如此。一个回收池看起来就像一个带标签的联合体，其中标签代表“当前占据此槽位的是哪一代对象”，而类型系统中没有任何机制来追踪它。这种理解准确吗？还是说内存池的情况确实更容易处理，因为代际索引（generational indices）能解决它，而联合体的情况则没有等效方案？

Yes, object pools are an interesting case to think about, as they clarify the relation between memory safety and more general correctness. First, consider the case where no object pool is used, and we malloc and free order objects. In this case, the logical error of use-after-free turns into physical type confusion, and can easily lead to arbitrary code execution and the like. If you have two objects of different types sharing the same memory location, a user-controlled integer in one object might be a function pointer in the other: an exploitable goto primitive.

是的，对象池是一个值得深思的案例，因为它阐明了内存安全与更广泛的正确性之间的关系。首先，考虑不使用对象池、直接进行 malloc 和 free 订单对象的情况。在这种情况下，逻辑上的“释放后使用”错误会转化为物理上的类型混淆，并极易导致任意代码执行等后果。如果两个不同类型的对象共享同一块内存位置，其中一个对象中用户可控的整数可能会变成另一个对象中的函数指针：这便是一个可被利用的跳转原语（goto primitive）。

Now, what happens if we introduce an object pool which stores a list of “dead” objects of type T? Logical use-after-free is still possible, but its physical effect is now different — we still get aliasing of memory, but there’s no type confusion. You can’t necessarily fiddle with an integer and change a function pointer, unless you additionally hit the hard case, where the object in question stores an inline enum. Assuming that doesn’t happen, you get a perfectly defined, deterministic behavior, even if you are not happy about the result.

那么，如果我们引入一个存储“已死亡”T 类型对象列表的对象池，会发生什么呢？逻辑上的“释放后使用”依然可能发生，但其物理影响不同了——我们仍然会遇到内存别名问题，但不会出现类型混淆。你无法轻易通过篡改整数来改变函数指针，除非你碰到了更棘手的情况，即该对象存储了一个内联枚举（inline enum）。假设这种情况没有发生，你将得到一个定义明确、确定性的行为，即使你对结果并不满意。

This suggests an interesting solution for hardening code, which I’ve learned from Fil. If your allocation function is typed (it takes a T comptime parameter or runtime type witness, rather than a runtime type-erased size and alignment), you can write an allocator that uses type-segregated pools internally. This will be somewhat less memory efficient, as the allocator won’t be able to re-use freed memory of objects of type U for objects of type T, but the memory overhead will probably be small (rare object types do not matter, popular object types will have a lot of intra-type re-use), you might actually gain in memory locality, and solve most of type confusions. Again, inline enums break this, but, curiously, if you always heap allocate enum variants, then this works again. Fil-C can’t use this, because C allocator’s interface is untyped, but someone else could :P

这为加固代码提供了一个有趣的方案，我是从 Fil 那里学到的。如果你的分配函数是类型化的（它接收一个 T 编译时参数或运行时类型见证，而不是运行时类型擦除后的尺寸和对齐方式），你可以编写一个在内部使用类型隔离池的分配器。这在内存效率上会稍差一些，因为分配器无法将 U 类型对象释放的内存重用于 T 类型对象，但内存开销通常很小（罕见对象类型无关紧要，常用对象类型会有大量的同类型重用），你甚至可能获得更好的内存局部性，并解决大部分类型混淆问题。同样，内联枚举会破坏这一点，但有趣的是，如果你总是将枚举变体分配在堆上，那么这个方案又可行了。Fil-C 无法使用此方法，因为 C 语言分配器的接口是无类型的，但其他人可以做到 :P

But this is academic. How do we avoid the bugs? Generational indexes are a popular remedy, but I have never used them, so I don’t have any non-common knowledge insights about this pattern. Instead, I will share another pair of tricks from TigerStyle. I have only a vague understanding of what an order matching engine is, but I suspect these tricks might help there.

但这属于学术探讨。我们该如何避免这些 Bug？代际索引是一种流行的补救措施，但我从未使用过，因此对于这种模式我没有超出常识的见解。相反，我将分享来自 TigerStyle 的另外两个技巧。我对订单撮合引擎的了解仅限于皮毛，但我怀疑这些技巧在那里也能派上用场。

### Static Allocation
### 静态分配

The first one is: No dynamic memory allocation after initialization.
https://www.youtube.com/watch?v=GRJtYwneG2Q&t=1823s
This is the pool idea, taken to its logical conclusion. We specify the maximum number of orders we are willing to work with at startup, and never go beyond that. So, you might start the program as `order-engine --orders-max=1_000_000` and then one of the first lines in its main function would be: `const orders: []Order = try gpa.alloc(Order, cli_args.orders_max);`

第一个技巧是：初始化后禁止动态内存分配。
这是内存池理念的逻辑终点。我们在启动时指定愿意处理的最大订单数量，且绝不超出该限制。因此，你可能会这样启动程序：`order-engine --orders-max=1_000_000`，然后在 main 函数的第一行代码中写道：`const orders: []Order = try gpa.alloc(Order, cli_args.orders_max);`

If, at runtime, more than orders_max requests come in, the surplus requests are rejected. Someone might object: “But what if I actually have some spare memory for one more order? Wouldn’t it be a good idea to at least try to handle it?” My rejoinder would be “Well, what if you don’t?”. Systems operating at capacity without strict limits fail catastrophically. Attempting to allocate just one more Order could cause kernel’s OOM killer to terminate the entire order matching engine, losing the other million orders, or, better yet, to kill the supervisor process so that you can’t even restart.

如果在运行时收到的请求超过了 orders_max，多余的请求将被拒绝。有人可能会反驳：“但如果我确实还有多余的内存来处理一个订单呢？尝试处理它难道不是个好主意吗？”我的回答是：“那么，如果你没有呢？”在没有严格限制的情况下满负荷运行的系统会发生灾难性的故障。仅仅尝试分配多一个订单，就可能导致内核的 OOM Killer 终止整个订单撮合引擎，丢失另外一百万个订单；或者更糟，杀掉监控进程，导致你甚至无法重启。

Static allocation gives you peace of mind. The system might fail to start if you don’t have enough memory, but, if it did start, you can be rest assured that it would handle overload gracefully, continuing to render the service while you are provisioning a beefier machine.

静态分配让你高枕无忧。如果内存不足，系统可能无法启动；但一旦启动，你就可以确信它能优雅地处理过载，并在你配置更强大的机器时继续提供服务。

### Constant Work
### 恒定工作

What would you do with the slice of orders? One approach is to `@memset(orders, undefined)` and hand the slice over to a pool which tracks spare objects with a bit set:
`const OrderPool = struct { orders: []Order, free: DynamicBitSet, fn acquire(pool: *OrderPool) ?*Order { ... } fn release(pool: *OrderPool, order: *Order) { ... } };`
or with a free list:
`const OrderPool = struct { orders: []union { order: Order, next_free: ?u32, }, first_free: ?u32, };`

你会如何处理这个订单切片（slice）？一种方法是 `@memset(orders, undefined)`，然后将切片交给一个通过位图（bit set）追踪空闲对象的池：
`const OrderPool = struct { orders: []Order, free: DynamicBitSet, fn acquire(pool: *OrderPool) ?*Order { ... } fn release(pool: *OrderPool, order: *Order) { ... } };`
或者使用空闲链表（free list）：
`const OrderPool = struct { orders: []union { order: Order, next_free: ?u32, }, first_free: ?u32, };`

But there’s an alternative approach. Instead of thinking about a limit on the number of orders, you could instead design the system to always have a fixed amount of orders, by introducing a no-op, neutral order:
`const Order = { id: u128, price: u32, count: u32, tag: enum { bid, ask, reserved }, pub const reserved: Order = .{ .id = 0, .price = 0, .count = 0, .tag = .reserved, }; };`
Your initialization then becomes `@memset(orders, .reserved)`. One benefit here is cognitive, you no longer think in terms of creating and destroying orders. Instead, the orders merely circulate in the system according to the law of the conservation of the number of orders. It becomes harder to lose track of an order if you must always pay attention not only to where the order goes, but also to where it came from. You explicitly write state transition functions.

但还有另一种方法。与其考虑订单数量的限制，不如通过引入一个无操作（no-op）的“中性订单”来设计系统，使其始终拥有固定数量的订单：
`const Order = { id: u128, price: u32, count: u32, tag: enum { bid, ask, reserved }, pub const reserved: Order = .{ .id = 0, .price = 0, .count = 0, .tag = .reserved, }; };`
此时你的初始化代码就变成了 `@memset(orders, .reserved)`。这样做的一个好处是认知上的：你不再需要考虑订单的创建和销毁。相反，订单只是根据“订单数量守恒定律”在系统中循环。如果你不仅要关注订单去向，还要关注其来源，那么丢失订单就会变得更难。你需要显式地编写状态转换函数。