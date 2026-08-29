---
title: "WebSockets in React Server Components: Client Islands"
originalUrl: "https://dev.to/nainikmehta/websockets-in-react-server-components-client-islands-4934"
date: "2026-08-29T03:18:24.058Z"
---

# WebSockets in React Server Components: Client Islands

**Why you shouldn’t copy server state into a global store for realtime**
为什么你不应该为了实时功能将服务器状态复制到全局存储中

Hot take: when React Server Components (RSC) are your default, the worst thing you can do for realtime features is turn an entire page into a client bundle. Copying server state into a global client store via a page-level "use client" wrapper hands away server-rendered HTML, streaming, and tiny JS budgets — and raises Interaction to Next Paint (INP).
观点：当 React Server Components (RSC) 成为你的默认选择时，处理实时功能最糟糕的做法就是将整个页面变成客户端包。通过页面级的 "use client" 包装器将服务器状态复制到全局客户端存储中，会让你失去服务器端渲染的 HTML、流式传输和极小的 JS 体积优势，并增加“交互到下一次绘制”（INP）的延迟。

The alternative is simple: ship pages as Server Components and isolate WebSockets in minimal client islands that push updates into a cache (TanStack Query, SWR, or a custom store). That keeps most of the UI zero-JS, reduces re-renders, and preserves the streaming benefits RSC gives you.
替代方案很简单：将页面作为服务器组件发布，并将 WebSockets 隔离在极简的客户端孤岛（Client Islands）中，由它们将更新推送到缓存（如 TanStack Query、SWR 或自定义存储）中。这能保持大部分 UI 为零 JS，减少重新渲染，并保留 RSC 带来的流式传输优势。

**The pattern at a glance**
模式概览

Before: Page is wrapped with "use client". WebSocket runs at the top level, writes to a global store. Result: large client bundle, broad re-renders, worse INP.
之前：页面被 "use client" 包装。WebSocket 在顶层运行，写入全局存储。结果：客户端包体积大、重新渲染范围广、INP 表现差。

After: Page is a Server Component that fetches and renders HTML on the server. Add a tiny client island for the WebSocket subscription (5–20 lines). That island writes into your client cache (e.g., TanStack Query) using invalidateQueries or setQueryData. Local components rehydrate only what changed.
之后：页面是一个在服务器上获取并渲染 HTML 的服务器组件。添加一个用于 WebSocket 订阅的微型客户端孤岛（5-20 行代码）。该孤岛使用 `invalidateQueries` 或 `setQueryData` 将数据写入客户端缓存（如 TanStack Query）。本地组件仅对发生变化的部分进行水合（rehydrate）。

**Minimal client island example**
极简客户端孤岛示例

Here's the 5-line island pattern everyone builds toward. It opens a WebSocket and updates TanStack Query — no UI, no global singleton.
这是每个人都在追求的 5 行代码孤岛模式。它打开一个 WebSocket 并更新 TanStack Query——没有 UI，没有全局单例。

```tsx
// app/components/RealtimeSubscriber.client.tsx
'use client'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

export default function RealtimeSubscriber({ url }: { url: string }) {
  const queryClient = useQueryClient()
  useEffect(() => {
    const ws = new WebSocket(url)
    ws.onmessage = (evt) => {
      queryClient.invalidateQueries(['feed'])
    }
    return () => ws.close()
  }, [url, queryClient])
  return null // no UI — subscription only
}
```

Drop this component into a Server Component page wherever the subscription is needed. The Server Component renders the initial HTML (and can prefetch the feed into the query cache on the server), and the island keeps the realtime pipe open after hydration.
将此组件放入需要订阅的服务器组件页面中。服务器组件渲染初始 HTML（并可以在服务器上将 feed 预取到查询缓存中），而该孤岛在水合后保持实时管道开启。

**Why this improves INP and overall performance**
为什么这能改善 INP 和整体性能

*   **Ship far less JS:** a page-level "use client" pulls every import into the client bundle. Small islands limit what actually ships.
    **减少 JS 发送量：** 页面级的 "use client" 会将所有导入项拉入客户端包。小型孤岛限制了实际发送的代码量。
*   **Fewer unnecessary re-renders:** update only the components that read the cached query rather than forcing a full client tree to re-render on every websocket message.
    **减少不必要的重新渲染：** 仅更新读取缓存查询的组件，而不是在每次 WebSocket 消息时强制整个客户端树重新渲染。
*   **Faster first interactions:** the main thread is less occupied during hydration because there’s less client JS to execute and hydrate, improving INP.
    **更快的首次交互：** 水合期间主线程占用更少，因为需要执行和水合的客户端 JS 更少，从而改善了 INP。
*   **Keep server benefits:** server-rendered HTML and streaming still work because the tree remains server-first.
    **保留服务器优势：** 由于树结构仍然以服务器为先，服务器端渲染的 HTML 和流式传输依然有效。

**Practical cache strategies (real trade-offs)**
实用的缓存策略（权衡取舍）

*   **Pros:** Much smaller shipped JS and more predictable rendering behavior. Fewer global-state edge cases — local queries own their data. Measurable INP wins in audits.
    **优点：** 发送的 JS 体积更小，渲染行为更可预测。更少的全局状态边缘情况——本地查询拥有自己的数据。在审计中可测量的 INP 提升。
*   **Cons:** You need a solid cache strategy (TanStack Query or SWR). That means thinking about staleTime, invalidation, and optimistic updates. Debugging is different: state is distributed between server renders and client caches. Passing large datasets across the RSC boundary serializes payloads — don’t send multi-megabyte objects into islands.
    **缺点：** 你需要一个稳健的缓存策略（TanStack Query 或 SWR）。这意味着需要考虑 `staleTime`、失效策略和乐观更新。调试方式不同：状态分布在服务器渲染和客户端缓存之间。跨 RSC 边界传递大数据集会序列化负载——不要向孤岛发送数兆字节的对象。

**Best practices**
最佳实践

*   Prefetch initial data on the server and hydrate the client cache using TanStack Query’s `dehydrate` + `HydrationBoundary` so client components mount with instant data.
    在服务器上预取初始数据，并使用 TanStack Query 的 `dehydrate` + `HydrationBoundary` 水合客户端缓存，以便客户端组件挂载时立即获得数据。
*   Use `setQueryData` for surgical updates when the WebSocket sends only small deltas; fall back to `invalidateQueries` for convergence when you can’t easily merge.
    当 WebSocket 仅发送小增量时，使用 `setQueryData` 进行精确更新；当难以合并时，回退到 `invalidateQueries` 以确保数据收敛。
*   Set sensible `staleTime` and use hierarchical query keys so invalidation is surgical (e.g., `['orders', orderId]` vs `['orders']`).
    设置合理的 `staleTime` 并使用分层查询键，以便失效操作更加精确（例如 `['orders', orderId]` 而非 `['orders']`）。

**Implementation steps**
实施步骤

1.  Convert the page and large UI to Server Components.
    将页面和大型 UI 转换为服务器组件。
2.  Keep anything that needs effects or browser APIs as client leaves.
    将任何需要副作用或浏览器 API 的部分保留为客户端叶子节点。
3.  Prefetch critical queries on the server (`QueryClient.prefetchQuery` + `dehydrate`) so the client mounts without a loading state.
    在服务器上预取关键查询（`QueryClient.prefetchQuery` + `dehydrate`），以便客户端挂载时无需加载状态。
4.  Add a tiny `RealtimeSubscriber.client.tsx` island to open the socket and update the cache.
    添加一个微型的 `RealtimeSubscriber.client.tsx` 孤岛来打开 socket 并更新缓存。
5.  In local components, consume the query with `useQuery` and render the hydrated data.
    在本地组件中，使用 `useQuery` 消费查询并渲染水合后的数据。
6.  Monitor bundle size, hydration time, and INP with Lighthouse/WebPageTest.
    使用 Lighthouse/WebPageTest 监控包体积、水合时间和 INP。

**Which realtime features to isolate first**
哪些实时功能应优先隔离

Good candidates for a 5-line client island:
适合 5 行代码客户端孤岛的场景：
*   Notifications and toast events (通知和提示事件)
*   Presence (online/offline indicators) (在线状态指示器)
*   Small activity feeds or counters (小型活动流或计数器)
*   Live ticks that send small deltas (metrics, counts) (发送小增量的实时刻度，如指标、计数)

Avoid sending entire datasets through the socket into the client when you can patch small diffs and let the client request larger pages when needed.
当你可以修补小差异并让客户端在需要时请求更大的页面时，避免通过 socket 将整个数据集发送到客户端。

**Final notes**
结语

React Server Components with WebSockets is not an either/or choice — it's a composition pattern. Use RSC for rendering, and small client islands for the connective tissue that keeps an app realtime. The result: smaller bundles, fewer global-state headaches, and snappier first interactions.
React Server Components 与 WebSockets 并非二选一，而是一种组合模式。使用 RSC 进行渲染，使用小型客户端孤岛作为保持应用实时的连接组织。结果是：更小的包体积、更少的全局状态困扰，以及更灵敏的首次交互。