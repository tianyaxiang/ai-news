---
title: "The Application Shell: GtkApplicationWindow vs AdwApplicationWindow"
originalUrl: "https://dev.to/fromthearchitect/the-application-shell-gtkapplicationwindow-vs-adwapplicationwindow-494c"
date: "2026-09-07T23:40:12.323Z"
---

# The Application Shell: GtkApplicationWindow vs AdwApplicationWindow
# 应用外壳：GtkApplicationWindow 与 AdwApplicationWindow

This is the first proper entry in A Field Guide to GTK Widgets — a series about which widget to reach for, when, and what bites you when you do. We start where every app starts: the window. Each post stands on its own, and the complete, runnable code for this one lives in the companion repo.
这是《GTK 组件实战指南》系列的第一篇正式文章。该系列旨在探讨何时选择哪种组件，以及在选择时会遇到哪些坑。我们从每个应用的原点开始：窗口。每篇文章都是独立的，本篇完整的可运行代码可以在配套仓库中找到。

Two windows, and the one you should reach for: You sit down to write a GNOME app. The very first widget you need is the window, and the toolkit immediately hands you a choice it doesn't explain: GtkApplicationWindow, from GTK itself, or AdwApplicationWindow, from Libadwaita. The reference describes both accurately and tells you nothing about which one you want. Here's the short answer, so the rest of this post is the why: in 2026, for anything you intend to ship as a GNOME app, reach for AdwApplicationWindow. The reason isn't cosmetics — it's structural, and it changes how you build everything above it. The difference comes down to one thing: where the titlebar lives.
两个窗口，以及你应该选择哪一个：当你坐下来编写一个 GNOME 应用时，你需要的第一个组件就是窗口。工具包立刻抛给你一个没有解释的选择：来自 GTK 本身的 `GtkApplicationWindow`，或者来自 Libadwaita 的 `AdwApplicationWindow`。参考文档准确地描述了两者，但没有告诉你该选哪一个。简短的回答如下（本文后续部分将解释原因）：在 2026 年，对于任何你打算作为 GNOME 应用发布的产品，请选择 `AdwApplicationWindow`。原因不在于外观，而在于结构，它改变了你构建其上所有内容的方式。区别归结为一点：标题栏位于何处。

GtkApplicationWindow: the honest baseline. GtkApplicationWindow is the plain GTK window, and there's nothing wrong with it. It has a content area and a dedicated titlebar slot, and you fill the slot with a header bar.
GtkApplicationWindow：诚实的基准。`GtkApplicationWindow` 是标准的 GTK 窗口，它本身没有任何问题。它拥有一个内容区域和一个专门的标题栏插槽，你可以用一个标题栏（Header Bar）来填充这个插槽。

```rust
let header = gtk::HeaderBar::new();
let window = gtk::ApplicationWindow::builder()
    .application(app)
    .title("Application Shell")
    .default_width(420)
    .build();
window.set_titlebar(Some(&header));
window.set_child(Some(&content));
window.present();
```

Two slots, two setters: `set_titlebar` for the bar across the top, `set_child` for everything underneath. If you don't call `set_titlebar` at all, GTK gives you a default one so the window is still draggable and closable. This works, it ships, and for a tool that doesn't care about looking GNOME-native it's entirely fine. The limitation is baked into that titlebar slot. It's a special region the window manages separately from its content — which means your header bar can never be anything other than a strip pinned to the very top, the full width of the window, for the whole life of the app. The moment you want a layout where the header is part of a collapsible sidebar, or where two panes each carry their own bar, the slot is in your way. That's not a rare want in modern GNOME; it's the standard adaptive pattern. So the slot that makes GtkApplicationWindow simple is the same slot that makes it a dead end.
两个插槽，两个设置器：`set_titlebar` 用于顶部的栏，`set_child` 用于下方的所有内容。如果你完全不调用 `set_titlebar`，GTK 会提供一个默认的标题栏，这样窗口仍然可以拖动和关闭。这完全可行，也可以发布，对于一个不在乎是否具有 GNOME 原生外观的工具来说，这完全没问题。但其局限性在于那个标题栏插槽。这是一个窗口与内容分开管理的特殊区域——这意味着在应用的整个生命周期中，你的标题栏只能是固定在最顶部、宽度与窗口一致的条状物。一旦你想要一种布局，让标题栏成为可折叠侧边栏的一部分，或者让两个窗格各自拥有自己的标题栏，这个插槽就会成为阻碍。这在现代 GNOME 中并非罕见需求，而是标准的自适应模式。因此，让 `GtkApplicationWindow` 变得简单的插槽，同时也让它成为了死胡同。

AdwApplicationWindow: no titlebar slot at all. AdwApplicationWindow removes the slot. That sounds like a downgrade and is actually the whole point. There is no separate titlebar region — the window has a single content child that fills it edge to edge, and the header bar becomes an ordinary widget you place inside that content, like any other.
AdwApplicationWindow：完全没有标题栏插槽。`AdwApplicationWindow` 移除了这个插槽。这听起来像是降级，但实际上这正是其核心所在。没有独立的标题栏区域——窗口只有一个填充边缘的内容子组件，而标题栏变成了一个普通的组件，你可以像放置其他组件一样将其放置在该内容中。

```rust
let window = adw::ApplicationWindow::builder()
    .application(app)
    .title("Application Shell")
    .content(&content) // one child, no titlebar slot
    .build();
```

Notice the method is `content`, not `child` plus `titlebar`. That single change is what unlocks adaptive layouts. Because the header bar is now just a widget in the tree, you can put it wherever the layout needs it: at the top of the window, yes, but equally at the top of one pane in a split view, or inside a page that slides away on a phone. The window stops dictating where chrome can live. Libadwaita's rounded corners, its dialogs that draw as sheets attached to the window, and the adaptive split views the whole platform is built around all assume this shape — content all the way out, chrome composed inside it. This is the part I'd most want a newcomer to internalise, because it inverts the mental model you arrive with. The window is not a frame with a title bar and a body. It's an empty box you fill with one widget, and you assemble the chrome inside it. Once that clicks, the rest of Libadwaita stops looking like a pile of special cases and starts looking like a kit.
注意这里的方法是 `content`，而不是 `child` 加 `titlebar`。这一微小的改变解锁了自适应布局。因为标题栏现在只是组件树中的一个普通组件，你可以把它放在布局需要的任何地方：可以是窗口顶部，也可以是分屏视图中某个窗格的顶部，或者手机上滑出页面内部。窗口不再强制规定界面元素（chrome）的位置。Libadwaita 的圆角、作为附加在窗口上的表单绘制的对话框，以及整个平台所围绕的自适应分屏视图，都基于这种结构——内容延伸至边缘，界面元素组合在内容内部。这是我最希望新手内化的部分，因为它颠覆了你原有的思维模型。窗口不再是一个带有标题栏和主体的框架，而是一个你可以用一个组件填充的空盒子，你在盒子内部组装界面元素。一旦理解了这一点，Libadwaita 的其余部分就不再看起来是一堆特殊情况，而是一个完整的工具包。

If the window is just an empty box, you need two more pieces to fill it: the header bar, and something to manage the relationship between it and your content.
如果窗口只是一个空盒子，你需要另外两个部分来填充它：标题栏，以及一个管理它与内容之间关系的东西。

AdwHeaderBar: the bar itself. The header bar goes inside the content, and you almost always want the Libadwaita one.
AdwHeaderBar：标题栏本身。标题栏位于内容内部，你几乎总是需要使用 Libadwaita 的版本。

```rust
let header = adw::HeaderBar::new();
```

AdwHeaderBar and GtkHeaderBar look nearly identical and share most of their API, so it's fair to ask why bother. AdwHeaderBar is built to live inside the content rather than in a titlebar slot, it knows how to integrate with the adaptive containers (a split view can tell each pane's header bar to show or hide its window controls so you never get two close buttons), and it carries the platform's responsive behaviour for free. GtkHeaderBar predates all of that and assumes it's being set as a titlebar. By default a header bar shows the window's title in the centre and the window controls — close, and minimise/maximise where the desktop uses them — at the ends. That's why the example sets `.title(...)` on the window: the header bar reads it. When you want a title and subtitle, or a custom widget in the centre, you set a title widget (AdwWindowTitle is the usual one) explicitly — a detail for a later post. For now, an empty AdwHeaderBar already gives you a draggable, closable, titled bar. The rule of thumb: in a GNOME app, reach for AdwHeaderBar. The only time you'd drop to GtkHeaderBar is if you're deliberately not building on Libadwaita — and if that's true, you wouldn't be using AdwApplicationWindow either.
`AdwHeaderBar` 和 `GtkHeaderBar` 看起来几乎一模一样，并且共享大部分 API，所以问“为什么要费心切换”是很合理的。`AdwHeaderBar` 是为了存在于内容内部而非标题栏插槽中而构建的，它知道如何与自适应容器集成（分屏视图可以告诉每个窗格的标题栏显示或隐藏其窗口控件，这样你就永远不会看到两个关闭按钮），并且它免费提供了平台的响应式行为。`GtkHeaderBar` 的出现早于这一切，它假设自己被设置为标题栏。默认情况下，标题栏会在中心显示窗口标题，并在两端显示窗口控件（关闭，以及桌面环境所使用的最小化/最大化按钮）。这就是为什么示例要在窗口上设置 `.title(...)`：标题栏会读取它。当你想要标题和副标题，或者在中心放置自定义组件时，你需要显式设置一个标题组件（通常是 `AdwWindowTitle`）——这是后续文章的细节。目前，一个空的 `AdwHeaderBar` 已经为你提供了一个可拖动、可关闭、带标题的栏。经验法则：在 GNOME 应用中，请选择 `AdwHeaderBar`。你唯一会退回到 `GtkHeaderBar` 的情况是，你刻意不基于 Libadwaita 构建——如果真是这样，你也不会使用 `AdwApplicationWindow` 了。

AdwToolbarView: the chrome manager. You could pack the header bar and your content into a GtkBox and call it done. It would even look right — at first. But you'd be hand-rolling something Libadwaita does properly, and AdwToolbarView is the widget for it.
AdwToolbarView：界面元素管理器。你可以将标题栏和内容打包进一个 `GtkBox` 中并大功告成。起初，它看起来确实没问题。但你是在手动实现 Libadwaita 已经妥善处理的功能，而 `AdwToolbarView` 正是为此而生的组件。

```rust
let toolbar_view = adw::ToolbarView::new();
toolbar_view.add_top_bar(&header);
toolbar_view.set_content(Some(&content));
```

AdwToolbarView manages the bars around your content — any number across the top, any number across the bottom — and the content between them. The reason to use it over a plain box is everything it does that a box doesn't. It styles the bars to match the platform, and m...
`AdwToolbarView` 管理内容周围的栏——顶部任意数量，底部任意数量——以及它们之间的内容。使用它而不是普通盒子（Box）的原因在于它能做盒子做不到的一切。它会调整栏的样式以匹配平台，并且……