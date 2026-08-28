---
title: "bilawalsidhu / gods-eye-view"
originalUrl: "https://github.com/bilawalsidhu/gods-eye-view"
date: "2026-08-28T05:32:54.992Z"
---

# bilawalsidhu / gods-eye-view

🌐 **God's Eye View**
A spy-satellite simulator in your browser — then you realize the sources are public and the data is real. Photorealistic 3D globe. Live aircraft, ships, satellites, earthquakes, traffic, and public cameras, with clearly labeled modeled views where a live feed is unavailable. Hands-free voice control powered by a realtime AI agent. No place left behind.
🌐 **上帝之眼 (God's Eye View)**
这是一个运行在浏览器中的间谍卫星模拟器——当你深入了解后会发现，其数据源全部公开，且数据真实有效。它拥有逼真的 3D 地球模型，实时显示飞机、船舶、卫星、地震、交通和公共摄像头信息；在无法获取实时流的地方，则会显示标注清晰的建模视图。它还支持由实时 AI 代理驱动的免提语音控制。不遗漏任何角落。

▶️ From the project behind the viral God's Eye View series (formerly WorldView) — 5M+ on YouTube
▶️ 该项目源自病毒式传播的“上帝之眼”系列视频（前身为 WorldView），在 YouTube 上拥有超过 500 万次观看。

Quick Start · First Five Minutes · Talk to It · What's Live · Under the Hood · Keys · Costs
快速入门 · 前五分钟体验 · 语音交互 · 实时内容 · 技术内幕 · 密钥 · 成本

🌍 **Why This Exists**
You asked, so it's happening. God's Eye View is open source. Track the world live. Talk to it. Break it. Extend it. Most open-source intelligence is a pile of browser tabs. The signals are abundant, but the interface is the bottleneck. God's Eye View turns those signals into a place: the world is already broadcasting — flight transponders, ship beacons, orbital elements, seismographs, public cameras — and this makes it visible on a photorealistic 3D Earth in real time.
🌍 **为何存在**
应广大用户要求，它诞生了。God's Eye View 是开源的。你可以实时追踪全球动态，与它对话，对其进行测试或扩展。大多数开源情报（OSINT）往往是一堆杂乱的浏览器标签页。信号虽多，但界面才是瓶颈。God's Eye View 将这些信号转化为一个统一的场景：世界本身就在不断广播——飞行应答机、船舶信标、轨道参数、地震仪、公共摄像头——而该项目将这一切实时呈现在逼真的 3D 地球上。

No classified clearance required; it's public signal all the way down, and the interface runs in your browser, under your control. Half the magic is that it looks like a forbidden cockpit. The other half is that every line of code is inspectable. The live layers are grounded in public feeds: the airliner crossing your screen is reporting telemetry, the camera is installed at a published location, and the ISS position is propagated from current orbital elements.
无需任何机密权限；所有数据均来自公开信号，且界面完全在你的浏览器中运行，由你掌控。其魅力的一半在于它看起来像是一个“禁区”驾驶舱，另一半则在于每一行代码都可供审查。实时图层基于公开数据源：屏幕上飞过的客机正在报告遥测数据，摄像头安装在公开位置，国际空间站（ISS）的位置则是根据当前轨道参数推算出来的。

The client deliberately renders flights one polling interval behind real time so it can interpolate smoothly. Some experiences are modeled rather than live: keyless traffic is labeled as a simulation, camera poses are estimated until calibrated, and launch ascent playback is marked RECONSTRUCTED ESTIMATE. Each layer keeps its source and freshness state visible, including partial, delayed, simulated, and unavailable states.
客户端特意将航班渲染延迟一个轮询周期，以实现平滑的插值效果。部分体验采用建模而非实时数据：无密钥的交通信息被标记为模拟，摄像头姿态在校准前为预估值，火箭发射上升过程的回放被标记为“重构预估”。每个图层都会显示其来源和时效性状态，包括部分数据、延迟数据、模拟数据和不可用状态。

🎛️ **What This Thing Does**
▶️ The full walkthrough of everything below, on YouTube
🎛️ **功能概览**
▶️ 以下所有功能的完整演示，请见 YouTube。

🛩️ Cockpit view: Ride inside a tracked flight — the camera holds the terrain under you all the way down.
🛩️ 驾驶舱视角：进入被追踪的航班内部——摄像机会全程锁定你下方的地形。

📡 Contacts: A 250 km roster of everything near your target — step through live aircraft and drop into any cockpit.
📡 目标接触：显示目标周围 250 公里范围内的所有物体——你可以切换查看实时飞机，并进入任何一个驾驶舱。

🎯 Click-to-track anything: Camera locks on, draws a fading trail, surfaces full metadata — and a tracked fire or vessel hands you off to the nearest live camera in one click.
🎯 点击追踪：摄像机锁定目标，绘制渐隐轨迹，并显示完整元数据——点击即可将追踪中的火情或船只切换至最近的实时摄像头。

🖊️ Voice whiteboard: Speak annotations onto the world — real boundary polygons, marks, and routes.
🖊️ 语音白板：通过语音在地图上添加标注——包括真实的边界多边形、标记和路线。

🛫 3D hangar: Real per-class aircraft models — 787, ATR-72, Citation, Bell 206, MQ-9 — and a tracked contact swaps from glyph to 3D model as you close in.
🛫 3D 机库：真实的各类型飞机模型（如 787、ATR-72、Citation、Bell 206、MQ-9 等）——当你靠近时，追踪目标会自动从图标切换为 3D 模型。

🎨 Reskin reality: GLSL sensor looks over the normal globe — CRT, NVG, FLIR/thermal, Noir, Snow.
🎨 现实重绘：通过 GLSL 传感器滤镜查看地球——支持 CRT、夜视仪（NVG）、热成像（FLIR）、黑白（Noir）和雪景模式。

🟩 Detection overlay: Screen-space bounding boxes and IDs on everything in view.
🟩 检测覆盖层：为视野内的所有物体添加屏幕空间边界框和 ID。

🎖️ Military HUD: Tactical heads-up display with intelligence-style telemetry.
🎖️ 军事 HUD：带有情报风格遥测数据的战术平视显示器。

🌐 Global Context: Stage the full situational picture with one switch — and get your exact view back when you leave.
🌐 全球态势：一键切换至全局态势图，离开时可恢复至你之前的精确视角。

🎥 Scene director: Capture cinematic camera tours for clips and demos.
🎥 场景导演：捕捉电影级的摄像机巡航画面，用于剪辑和演示。

🔗 Share Links: Camera, style, layers, and even one tracked target serialize into a URL — a live target is a handoff, not a bookmark.
🔗 分享链接：摄像机视角、风格、图层甚至追踪目标都可以序列化为 URL——实时目标是一个动态的交接点，而非静态书签。

🏠 Reset Globe: One control — or one sentence — back to the full Earth.
🏠 重置地球：一个按钮或一句话，即可回到完整的地球视图。

⚡ **Quick Start**
Requires Node.js 24.14.x or 26.x (enforced by package.json). Copy .env.example → .env and set GOOGLE_MAPS_API_KEY. Install and run:
⚡ **快速入门**
需要 Node.js 24.14.x 或 26.x 版本（由 package.json 强制要求）。将 `.env.example` 复制为 `.env` 并设置 `GOOGLE_MAPS_API_KEY`。安装并运行：

```bash
npm install
npm run dev -- --host localhost --port 4173
```
Open http://localhost:4173.
打开 http://localhost:4173。

Tip: Not a coder? Have an AI do this whole page for you. A one-click installer is in the works — until then, install a coding agent (Claude Code, Codex, Cursor, or Antigravity) and paste this:
提示：不是程序员？让 AI 帮你完成整个配置。一键安装程序正在开发中——在此之前，请安装一个编程代理（如 Claude Code、Codex、Cursor 或 Antigravity）并粘贴以下指令：

"Clone https://github.com/bilawalsidhu/gods-eye-view and set it up on my machine. Install everything it needs, walk me through getting the required Google Maps API key step by step (plus any optional free keys I want), put the keys in .env, and help me set a billing alert and a usage quota on the Google key so I can't overspend. Then start the dev server and open it in my browser. I'm not a developer — explain what you're doing as you go, and ask me before any step that could cost money."
“克隆 https://github.com/bilawalsidhu/gods-eye-view 并将其配置在我的机器上。安装所有必要的依赖，一步步引导我获取所需的 Google Maps API 密钥（以及我想要的任何可选免费密钥），将密钥填入 .env 文件，并帮我设置 Google 密钥的账单提醒和使用限额，以防超支。然后启动开发服务器并在我的浏览器中打开。我不是开发者——请在操作过程中解释你的步骤，并在任何可能产生费用的步骤前询问我。”