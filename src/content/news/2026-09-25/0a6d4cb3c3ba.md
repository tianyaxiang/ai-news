---
title: "What Broke When I Moved Client Projects to the Next.js App Router"
originalUrl: "https://dev.to/abubakarfarooq/what-broke-when-i-moved-client-projects-to-the-nextjs-app-router-4g3d"
date: "2026-09-25T00:15:09.699Z"
---

# What Broke When I Moved Client Projects to the Next.js App Router
# 当我将客户项目迁移到 Next.js App Router 时，哪些地方出了问题？

Moving client projects from the Pages Router to the Next.js App Router sounded like a routine upgrade — until it wasn't. Every migration I've done has surfaced the same handful of breakages. Here are the four that cost me real hours, and how I fix them now.
将客户项目从 Pages Router 迁移到 Next.js App Router 听起来像是一次例行升级——直到真正开始操作才发现并非如此。我所做的每一次迁移都遇到了同样几个棘手的问题。以下是四个让我耗费大量时间的问题，以及我现在的解决方法。

### 1. getServerSideProps doesn't exist anymore
### 1. getServerSideProps 不再存在

The first thing that breaks is data fetching. There is no getServerSideProps in the App Router — server components fetch directly:
首先出问题的是数据获取。App Router 中不再有 `getServerSideProps`——服务器组件（Server Components）可以直接获取数据：

```jsx
// app/dashboard/page.jsx
export default async function Dashboard() {
  const res = await fetch("https://api.example.com/stats", {
    cache: "no-store", // opt out of the default static caching
  });
  const stats = await res.json();
  return <StatsGrid stats={stats} />;
}
```

The gotcha: fetch results are cached by default in server components. During one migration, a client's admin dashboard kept showing yesterday's numbers until I added `cache: "no-store"`. Whenever you port an SSR page, double-check what caching behavior you actually want.
陷阱在于：在服务器组件中，`fetch` 的结果默认是缓存的。在一次迁移中，客户的管理后台一直显示昨天的旧数据，直到我添加了 `cache: "no-store"`。每当你迁移 SSR 页面时，请务必仔细检查你真正需要的缓存行为。

### 2. The "use client" boundary keeps moving
### 2. "use client" 的边界不断变动

Every component is a server component by default. The moment a server component imports a client-only dependency — a chart library, a drag-and-drop widget — the build fails. The fix is a "use client" directive, but push it as far down the tree as possible so the rest of the page still renders on the server:
默认情况下，每个组件都是服务器组件。一旦服务器组件导入了仅限客户端的依赖项（如图表库、拖拽组件），构建就会失败。解决方法是使用 `"use client"` 指令，但要将其尽可能地放在组件树的底层，以便页面其余部分仍能在服务器上渲染：

```jsx
// app/dashboard/ChartCard.jsx
"use client";
import { LineChart } from "some-chart-library";

export function ChartCard({ data }) {
  return <LineChart data={data} />;
}
```

On one project we slapped "use client" on an entire page and silently gave back the performance gains the migration was supposed to deliver. Keep the directive on leaf components.
在某个项目中，我们直接在整个页面上添加了 `"use client"`，结果悄无声息地抵消了迁移本应带来的性能提升。请务必将该指令保留在叶子组件上。

### 3. The router API changed shape
### 3. 路由 API 的结构发生了变化

`useRouter` from `next/router` is now `useRouter` from `next/navigation`, and `router.query` is gone. You read route params with `useParams()`, search params with `useSearchParams()`, and `<Head>` is replaced by the metadata API:
`next/router` 中的 `useRouter` 现在变成了 `next/navigation` 中的 `useRouter`，且 `router.query` 已被移除。你需要使用 `useParams()` 读取路由参数，使用 `useSearchParams()` 读取查询参数，而 `<Head>` 则被元数据（metadata）API 取代：

```jsx
// app/blog/[slug]/page.jsx
export const metadata = {
  title: "Blog post",
  description: "A migrated blog post",
};

export default async function Post({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return <article>{post.title}</article>;
}
```

Note that in recent Next.js versions `params` is a promise you have to await — another thing that broke a migration silently. I keep a checklist of router imports and search-replace them before the first build.
请注意，在最近的 Next.js 版本中，`params` 是一个必须等待（await）的 Promise——这是另一个在迁移中悄悄导致报错的问题。我通常会准备一份路由导入清单，并在首次构建前进行搜索替换。

### 4. Auth redirects need a rethink
### 4. 身份验证重定向需要重新思考

Pages Router auth helpers that relied on `req/res` don't map one-to-one onto the App Router. Session checks move into server components, and redirecting an unauthenticated user looks like this:
依赖 `req/res` 的 Pages Router 身份验证辅助函数无法直接对应到 App Router。会话检查现在移入服务器组件中，重定向未授权用户的写法如下：

```jsx
// app/admin/page.jsx
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  return <AdminPanel user={session.user} />;
}
```

### The takeaway
### 总结

The App Router migration is worth it — server components, streaming, and colocated data fetching genuinely simplify client projects. But treat it as a rewrite of your routing and data layer, not a find-and-replace. Migrate route by route, keep "use client" boundaries small, and verify caching behavior on every page you port.
迁移到 App Router 是值得的——服务器组件、流式传输（streaming）和同构数据获取确实简化了客户项目。但请将其视为对路由和数据层的重写，而不是简单的查找替换。请逐个路由进行迁移，保持 `"use client"` 的边界尽可能小，并验证你所迁移的每一个页面的缓存行为。

I build production Next.js apps and AI features for clients — more of my work is at theabubakar.dev.
我为客户构建生产级的 Next.js 应用和 AI 功能——更多作品请访问 theabubakar.dev。