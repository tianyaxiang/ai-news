---
title: "Blender 5.3 released with Gaussian Splat support"
originalUrl: "https://www.blender.org/download/releases/5-3/"
date: "2026-11-10T16:15:43.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

Welcome native 3D Gaussian Splats support to Blender 5.3!

欢迎 Blender 5.3 原生支持 3D 高斯泼溅（Gaussian Splats）！

Import them as point clouds, experiment with Geometry Nodes, preview them in Workbench, and render them natively with EEVEE or Cycles.

你可以将它们作为点云导入，利用几何节点进行实验，在 Workbench 中预览，并使用 EEVEE 或 Cycles 进行原生渲染。

3D Gaussian Splats are commonly used to reconstruct 3D scenes from photos or videos. They consist of many small, soft, transparent blobs that combine to represent complex geometry and shading.

3D 高斯泼溅常用于从照片或视频中重建 3D 场景。它们由许多微小、柔和且透明的斑点组成，这些斑点组合在一起，呈现出复杂的几何形状和阴影。

Blender can now import Gaussian Splats from PLY, SPZ, and glTF files, store them as point clouds, process them with Geometry Nodes, and render them in EEVEE, Cycles, and Workbench (solid mode).

Blender 现在可以从 PLY、SPZ 和 glTF 文件导入高斯泼溅，将其存储为点云，通过几何节点进行处理，并在 EEVEE、Cycles 和 Workbench（实体模式）中进行渲染。

Gaussian splats are represented as point clouds, using a new type to tell them apart and with special attributes:

高斯泼溅以点云形式表示，并使用一种新的类型来区分它们，同时具备特殊的属性：

By default, a 3D Gaussian Splat is rendered using an emissive shader. The radiance attribute provides access to the resolved radiance of the splat at the current shading point.

默认情况下，3D 高斯泼溅使用自发光着色器进行渲染。“辐射度”（radiance）属性提供了在当前着色点获取泼溅解析辐射度的方法。

There is rudimentary support for making the splat relightable by replacing the Emission node with a hard surface BSDF such as Diffuse BSDF.

目前已初步支持通过将“自发光”节点替换为硬表面 BSDF（如漫射 BSDF）来实现泼溅的重新打光。

Performance is still being optimized. Rendering may produce inaccuracies due to differences between the sRGB space used by most Gaussian Splat authoring tools and Blender’s linear color space, particularly in areas with low opacity and high radiance.

性能仍在优化中。由于大多数高斯泼溅创作工具使用的 sRGB 空间与 Blender 的线性色彩空间之间存在差异，渲染可能会产生不准确的情况，特别是在低不透明度和高辐射度的区域。

The Principled BSDF now supports Dispersion!

Principled BSDF 现在支持色散（Dispersion）！

Turn ordinary glass and diamonds into beautiful little rainbows by splitting white light into its colorful components.

通过将白光分解为其彩色成分，将普通的玻璃和钻石变成美丽的彩虹。

With Dispersion in the Transmission panel, the Principled BSDF can now reproduce the characteristic rainbow effect seen in glass and gemstones. This corresponds to OpenPBR v1.1.1.

通过“传输”面板中的色散功能，Principled BSDF 现在可以重现玻璃和宝石中特有的彩虹效果。这符合 OpenPBR v1.1.1 标准。

Roughness anisotropy is also now supported by the Glass BSDF and the transmission component of the Principled BSDF. It behaves just like anisotropy for specular reflections.

Glass BSDF 和 Principled BSDF 的传输组件现在也支持粗糙度各向异性。其表现与镜面反射的各向异性完全相同。

Blender 5.3 integrates DLSS 4.5 Ray Reconstruction as a new denoiser, delivering cleaner images faster by upscaling and reusing samples from previous frames.

Blender 5.3 集成了 DLSS 4.5 光线重建作为新的降噪器，通过放大和重用前几帧的采样，更快地提供更清晰的图像。

Think Cycles looks with EEVEE responsiveness.

想象一下拥有 Cycles 的视觉效果和 EEVEE 的响应速度。

NVIDIA DLSS brings near-final render quality to the viewport, making lighting and look development faster and more responsive while virtually eliminating flickering between frames during animation playback.

NVIDIA DLSS 为视口带来了接近最终渲染的质量，使灯光和外观开发更快、响应更灵敏，同时几乎消除了动画播放期间帧与帧之间的闪烁。

Find it in the Denoise panel under Render properties, Sampling.

可以在“渲染属性”下的“采样”面板中的“降噪”选项中找到它。

DLSS denoising requires NVIDIA driver version 620 or newer.

DLSS 降噪需要 NVIDIA 驱动程序版本 620 或更高。

Blender 5.3 brings native support for NVIDIA RTX Spark devices running Windows 11, including memory optimizations.

Blender 5.3 为运行 Windows 11 的 NVIDIA RTX Spark 设备提供了原生支持，包括内存优化。

Material Lighting nodes allow authoring how the Material reacts to Lights.

材质灯光节点允许创作材质如何对灯光做出反应。

This can, for example, be used for toon and stylized shading, but also for complex physical effects like iridescence.

例如，这可以用于卡通和风格化着色，也可以用于复杂的物理效果，如虹彩。

Per-light data, evaluation, and shadow information are now available in the Shader Editor, giving you more control over how materials respond to individual scene lights.

着色器编辑器中现在提供了逐灯光数据、评估和阴影信息，让你能更好地控制材质如何响应场景中的各个灯光。

Four new nodes and two that received a “Light” mode/space:

四个新节点，以及两个获得了“灯光”模式/空间的节点：

EEVEE can now render panoramic cameras, supporting all types of projections, from equirectangular and cubemap formats to various fisheye models and mirror ball.

EEVEE 现在可以渲染全景相机，支持所有类型的投影，从等距柱状投影和立方体贴图格式，到各种鱼眼模型和镜像球。

The current implementation has a few limitations: depth of field, raytracing, and volumetric temporal reprojection in the viewport are not yet supported.

目前的实现有一些限制：视口中的景深、光线追踪和体积时间重投影尚不支持。

Give back to Blender.

回馈 Blender。

Releases are possible thanks to donations by the community.

得益于社区的捐赠，新版本才得以发布。

You can now stack Effects on your scene just like you would modifiers or constraints.

你现在可以像使用修改器或约束一样，在场景上堆叠效果。

Applying compositing effects has never been easier.

应用合成效果从未如此简单。

Choose from built-in effects such as Bloom, Chromatic Aberration, Film Grain, and Vignette, as well as effects from online asset libraries or your own custom compositor node groups.

你可以选择内置效果，如辉光、色差、胶片颗粒和晕影，也可以选择来自在线资产库或你自己自定义的合成器节点组的效果。

Internally, each effect is its own node group, with its output passed on to the next effect.

在内部，每个效果都是一个独立的节点组，其输出会传递给下一个效果。

You can further customize effects at any time in the Compositor editor.

你可以在合成器编辑器中随时进一步自定义效果。

17 Geometry Nodes are now supported in the Compositor, bringing a range of new capabilities across bundles, math and logic, and utility operations.

合成器现在支持 17 个几何节点，在捆绑包、数学与逻辑以及实用操作方面带来了许多新功能。

This includes bundle support with Get Bundle Item, Store Bundle Item, Combine Bundle, Typed Bundle, and Separate Bundle.

这包括对捆绑包的支持，如获取捆绑项、存储捆绑项、组合捆绑包、类型化捆绑包和分离捆绑包。

Math and logic nodes such as Boolean Math, Compare, Float to Integer, Integer Math, Matrix SVD, Combine Transform, and Separate Transform. Plus utility nodes including Hash Value, Random Value, Is Viewport, Import Text, and Bone Info.

数学和逻辑节点，如布尔数学、比较、浮点转整数、整数数学、矩阵 SVD、组合变换和分离变换。此外还有实用节点，包括哈希值、随机值、是否为视口、导入文本和骨骼信息。

Playback is now up to 2x faster on GPU, particularly when playing back EXR sequences.

GPU 播放速度现在提升了高达 2 倍，特别是在播放 EXR 序列时。

The interactive compositor now supports playback caching. It can be enabled from the sidebar, Options panel.

交互式合成器现在支持播放缓存。可以在侧边栏的“选项”面板中启用。

Anisotropic Kuwahara is now up to 10x faster on Apple GPUs, 2x faster on NVIDIA GPUs, and 25-30% on CPU.

各向异性 Kuwahara 滤镜在 Apple GPU 上速度提升高达 10 倍，在 NVIDIA GPU 上提升 2 倍，在 CPU 上提升 25-30%。

Blender splash artwork source files are available for you to play with!

Blender 启动画面的源文件现已开放，供你尝试！

Until now, Blender’s preferences (such as asset libraries) were shared across all projects, and it was up to users to keep related files and resources organized.

在此之前，Blender 的偏好设置（如资产库）在所有项目中是共享的，用户需要自行整理相关文件和资源。

Blender now supports projects, giving you a way to group related files, share resources, and manage settings across an entire project, whether you’re working alone or as part of a team.

Blender 现在支持项目功能，无论你是独立工作还是团队协作，它都为你提供了一种跨整个项目对相关文件进行分组、共享资源和管理设置的方法。

Projects support custom variables that can be used throughout a project, such as a character’s name or a frequently used file path.

项目支持可在整个项目中使用的自定义变量，例如角色名称或常用的文件路径。

Per-project asset libraries and color management configurations are also supported. You can even set up a custom splash screen for your project, providing quick access to its files and other recent projects.

还支持按项目设置资产库和色彩管理配置。你甚至可以为你的项目设置自定义启动画面，以便快速访问其文件和其他最近的项目。

Add-ons and other extensions per-project will follow in future Blender versions.

按项目的插件和其他扩展功能将在未来的 Blender 版本中推出。

Projects are entirely optional, most of the time you’ll probably work without one.

项目功能完全是可选的，大多数时候你可能不需要它也能工作。

Asset libraries can now be shared as extensions! Just like add-ons or themes.

资产库现在可以作为扩展共享！就像插件或主题一样。

Browse hundreds of public domain assets available on the Extensions platform via the Get Extensions tab and install them directly from within Blender.

通过“获取扩展”选项卡浏览扩展平台上数百个公共领域资产，并直接在 Blender 内安装它们。

Create and share your own asset library extension. Optionally, access can be controlled via authentication tokens.

创建并分享你自己的资产库扩展。此外，还可以通过身份验证令牌控制访问权限。

Draw Mode now has its own selection tools: Tweak, Lasso, Box, and Circle. Select strokes and adjust them right where you draw.

绘图模式现在拥有自己的选择工具：微调、套索、框选和圆选。选择笔画并直接在你绘图的地方进行调整。

Move, rotate, scale

移动、旋转、缩放