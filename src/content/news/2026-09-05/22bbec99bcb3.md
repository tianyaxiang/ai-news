---
title: "The asteroid currently hitting frontend web development"
originalUrl: "https://nolanlawson.com/2026/08/23/the-asteroid-currently-hitting-frontend-web-development/"
date: "2026-09-04T23:12:53.382Z"
---

# The asteroid currently hitting frontend web development
# 正在撞击前端网页开发的“小行星”

A lot of the educators I admire in the frontend web space seem to be either bowing out or dialing back their efforts: Axel Rauschmayer, Salma Alam-Naylor, Josh W. Comeau, to name a few. Other well-known luminaries like Kent C. Dodds, Addy Osmani, Rachel Nabors, and Lydia Hallie have pivoted from talking about frontend development to talking about… well, take a wild guess.
在前端网页开发领域，许多我所敬佩的教育者似乎都在退出或减少他们的投入：比如 Axel Rauschmayer、Salma Alam-Naylor 和 Josh W. Comeau 等人。其他知名大咖如 Kent C. Dodds、Addy Osmani、Rachel Nabors 和 Lydia Hallie，也已经从讨论前端开发转向了讨论……嗯，你猜猜看是什么。

I never made a living from talking about web dev, but I do have this blog, and I’ve done conference talks and podcasts about stuff I’m excited about. Recently for example, my passion was explaining all the ins and outs of CSS performance: how shadow DOM works, how the browser’s style engine works, the traps of CSS-in-JS, etc.
我从未靠谈论网页开发为生，但我有这个博客，也曾就我感兴趣的话题做过会议演讲和播客。例如，最近我热衷于解释 CSS 性能的方方面面：Shadow DOM 是如何工作的、浏览器的样式引擎是如何运作的、CSS-in-JS 的陷阱等等。

Just for kicks, I decided to ask Claude Sonnet how it would handle a Chrome trace with high “Style Calculation” costs. This is one of my favorite brain-teasers, because it’s the kind of thing that I saw web devs – even experienced ones! – trip up on over and over again. Claude gave a perfectly admirable answer:
出于好奇，我决定问问 Claude Sonnet，它会如何处理一个“样式计算”（Style Calculation）成本过高的 Chrome 性能追踪记录。这是我最喜欢的脑筋急转弯之一，因为我看到过很多网页开发者——甚至是经验丰富的开发者——都在这个问题上反复栽跟头。Claude 给出了一个非常令人赞叹的回答：

***

### Prompt: Answer without searching the internet: you’re looking at a Chrome trace, and you see repeated spans of high Style cost but relatively low Layout cost. What kind of things do you look for in the webapp to optimize? What do you measure next?
### 提示词：在不搜索互联网的情况下回答：你正在查看一个 Chrome 性能追踪记录，发现“样式计算”成本很高，但“布局”（Layout）成本相对较低。在网页应用中，你会寻找哪些方面进行优化？接下来你会测量什么？

#### What “Style” cost actually represents
#### “样式”成本实际上代表什么
The Style (Recalculate Style) phase is where the browser matches CSS selectors against the DOM and computes the final computed style for each affected element. It’s expensive independent of whether anything actually moves or resizes (that’s Layout’s job). So if Style is high but Layout is low, you’re likely paying for selector matching / invalidation over many elements, not for expensive geometry.
“样式”（重新计算样式）阶段是浏览器将 CSS 选择器与 DOM 进行匹配，并为每个受影响的元素计算最终样式值的过程。无论是否有元素移动或调整大小（那是“布局”的工作），这个过程都很昂贵。因此，如果“样式”成本高而“布局”成本低，你很可能是在为大量元素的选择器匹配/失效付出代价，而不是因为复杂的几何计算。

#### What to look for in the webapp
#### 在网页应用中寻找什么
1. **Selector complexity and count**: Overly complex or deeply nested selectors, especially descendant combinators, force the engine to walk more of the DOM/ancestor chain per match attempt. Universal selectors or attribute selectors applied broadly. CSS-in-JS libraries that generate huge numbers of unique class names/rules.
1. **选择器的复杂度和数量**：过于复杂或嵌套过深的选择器（尤其是后代选择器）会迫使引擎在每次匹配尝试时遍历更多的 DOM/祖先链。被广泛使用的通用选择器或属性选择器。生成大量唯一类名/规则的 CSS-in-JS 库。

2. **Invalidation scope**: A class/attribute/style toggle high up in the DOM tree (e.g., toggling a class on `<body>` or a top-level container) can force style recalculation on large subtrees even if only a few elements’ final styles change. Check whether a single state change is invalidating far more elements than necessary.
2. **失效范围**：在 DOM 树高层切换类名/属性/样式（例如在 `<body>` 或顶级容器上切换类名）可能会强制对大型子树进行样式重新计算，即使只有少数元素的最终样式发生了变化。检查单次状态变更是否导致了不必要的过多元素失效。

3. **Frequency/amplification**: Something re-triggering style recalc many times per frame — e.g., reading a style/layout property in a loop right after a class change, or a JS animation using `.classList.toggle()` or inline style updates on many nodes per rAF tick instead of batching.
3. **频率/放大效应**：某些操作在每帧中多次触发样式重新计算——例如，在类名变更后立即在循环中读取样式/布局属性，或者 JS 动画在每个 rAF 周期内对多个节点使用 `.classList.toggle()` 或内联样式更新，而不是进行批量处理。

4. **Inherited/computed property propagation**: Changing an inherited property (like font-size or color on a common ancestor) forces recompute of all descendants’ computed styles. Custom properties (CSS variables) changed at a high-level scope recompute style for every element referencing it.
4. **继承/计算属性的传播**：更改继承属性（如公共祖先上的字体大小或颜色）会强制重新计算所有后代的计算样式。在高层作用域更改自定义属性（CSS 变量）会触发引用它的每个元素的样式重新计算。

5. **Shadow DOM / component boundaries**: If using a framework with lots of shadow roots or scoped styles, check whether style recalculation is being needlessly repeated per component instance due to non-shared stylesheets.
5. **Shadow DOM / 组件边界**：如果使用的框架包含大量 Shadow Root 或作用域样式，请检查是否由于样式表未共享，导致每个组件实例都在进行不必要的重复样式计算。

#### What to measure next
#### 接下来测量什么
* Enable “Selector Stats” in the Performance panel. Re-record the trace. This gives you the top slow selectors and match counts.
* 在性能面板中启用“Selector Stats”（选择器统计）。重新录制追踪记录。这会告诉你哪些选择器最慢以及匹配次数。
* Check the “Recalculate Style” event’s initiator/call stack to see what JS triggered it.
* 检查“Recalculate Style”事件的发起者/调用栈，查看是哪段 JS 触发了它。
* Count how many elements are affected per recalc. Compare that number to how many elements actually changed appearance — a big gap indicates over-broad invalidation.
* 计算每次重新计算影响了多少元素。将该数字与实际外观发生变化的元素数量进行比较——差距过大意味着失效范围过广。
* Check for forced synchronous style — look for “Forced reflow” purple warnings.
* 检查是否存在强制同步样式——寻找紫色的“Forced reflow”（强制重排）警告。

#### Typical fixes
#### 典型修复方案
* Scope class/state toggles to the smallest subtree possible.
* 将类名/状态切换的作用域限制在尽可能小的子树内。
* Simplify selectors, prefer single class selectors over descendant chains.
* 简化选择器，优先使用单个类选择器而非后代链。
* Move CSS custom property updates to the smallest scope needed.
* 将 CSS 自定义属性的更新移动到所需的最小作用域。
* Batch DOM/class changes so recalculation happens once.
* 批量处理 DOM/类名变更，确保重新计算只发生一次。
* Use `content-visibility: auto` or `contain: style layout` on independent subtrees.
* 在独立的子树上使用 `content-visibility: auto` 或 `contain: style layout`。

***

These days, given a slow-loading website, even as someone who’s written about browser performance for years and who literally worked on a browser performance team, I would probably just chuck a Chrome trace at Claude Code and have it suggest improvements.
如今，面对一个加载缓慢的网站，即使作为一个写了多年浏览器性能文章、甚至曾在浏览器性能团队工作过的人，我也可能会直接把 Chrome 性能追踪记录扔给 Claude Code，让它提出改进建议。