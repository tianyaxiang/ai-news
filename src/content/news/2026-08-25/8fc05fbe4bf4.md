---
title: "MS Paint and Photos inivisibly watermark even locally generated output with GUID"
originalUrl: "https://xusheng.dev/posts/reversing/mspaint_invisible_watermark/main/"
date: "2026-08-24T21:48:45.517Z"
---

# MS Paint and Photos invisibly watermark even locally generated output with GUID
# 微软画图与照片应用即便在本地生成图像时，也会通过 GUID 添加隐形水印

Microsoft Paint and Photos Embed Server-Issued GUIDs as Invisible Watermarks in Locally-Generated Images. Reverse engineering reveals how Paint and Photos embed a server-issued GUID into the pixels of locally generated AI images.
微软画图（Paint）和照片（Photos）应用会将服务器下发的 GUID 作为隐形水印嵌入到本地生成的图像中。逆向工程揭示了这些应用如何将服务器生成的 GUID 嵌入到本地 AI 生成图像的像素中。

### TL;DR
### 简要总结
* Microsoft Paint supports both local and cloud image generation.
* Paint and Photos also ship local AI models.
* The two apps send the prompt to a remote server for moderation.
* The server returns a GUID along with the moderated prompt.
* The GUID is embedded into the locally generated image as an invisible watermark.
* A separate visible-watermark setting does not control this invisible watermark.
* On Copilot+ PCs, image generation is local but prompt moderation remains remote.
* Microsoft discloses that Paint adds C2PA metadata to AI-generated images.
* AI-generated image saves limited to C2PA-preserving formats: PNG, JPEG, GIF, and .paint.

* 微软画图支持本地和云端图像生成。
* 画图和照片应用内置了本地 AI 模型。
* 这两款应用会将提示词（Prompt）发送至远程服务器进行审核。
* 服务器在返回审核后的提示词时，会附带一个 GUID。
* 该 GUID 会作为隐形水印嵌入到本地生成的图像中。
* 独立的“可见水印”设置无法控制此隐形水印。
* 在 Copilot+ PC 上，图像生成虽在本地完成，但提示词审核仍需远程进行。
* 微软披露，画图应用会向 AI 生成的图像添加 C2PA 元数据。
* AI 生成图像的保存格式仅限于支持 C2PA 的格式：PNG、JPEG、GIF 和 .paint。

### A curious look at Microsoft Paint
### 对微软画图的好奇心
This research started with my curiosity about Paint. I recently had some success looking into less-explored Windows features like UCPD, WHESCVC, and I have long known that Microsoft added a bunch of AI features into the Paint app. I do not know if anyone actually uses Paint + AI to generate images, but I wanted to see how exactly the image generation works.
这项研究始于我对“画图”应用的好奇。最近，我在研究 UCPD、WHESCVC 等较少被探索的 Windows 功能时取得了一些进展，且我早就知道微软在画图应用中加入了一系列 AI 功能。我不确定是否真的有人使用“画图+AI”来生成图像，但我很想弄清楚其图像生成的具体工作原理。

Before I started, I expected that it simply called a remote API to do the image generation. However, after I set up Binary Ninja MCP with Codex and started the analysis, I soon realized that Microsoft actually shipped local models in Windows as part of Copilot.
在开始之前，我以为它只是简单地调用远程 API 来生成图像。然而，在使用 Binary Ninja MCP 配合 Codex 进行分析后，我很快意识到微软实际上将本地模型作为 Copilot 的一部分集成在了 Windows 中。

### A visible watermark
### 可见水印
While walking through these files, I found a Watermarker.dll: This is not super surprising to me, because while I interacted with the Paint app, I already discovered that it has a setting to embed a visible watermark to the image that it produces. The visible watermark is just a small Copilot logo at the bottom right of the image, which is totally normal.
在浏览这些文件时，我发现了 `Watermarker.dll`。这并不让我感到意外，因为在与画图应用交互时，我已经发现它有一个设置，可以为生成的图像嵌入可见水印。这个可见水印只是图像右下角的一个小型 Copilot 标志，这非常正常。

Then, out of nowhere, I decided to ask AI to analyze the DLL and see if it could also be embedding an invisible watermark. This is part of my intuition as a reverse engineer, because the file is 1.67 MB in size, which is unusually large for such trivial functionality. Apparently, the recent Claude Code text-watermark announcement also played a role in prompting me to think about this possibility.
随后，我突发奇想，决定让 AI 分析这个 DLL，看看它是否还嵌入了隐形水印。这是我作为逆向工程师的直觉，因为该文件大小为 1.67 MB，对于如此简单的功能来说异常庞大。显然，最近 Claude Code 关于文本水印的公告也促使我考虑这种可能性。

### An invisible watermark
### 隐形水印
To begin with, the visible watermark is added by `AddPerceptibleWatermark`. Then there is also a different `WmkWriteWatermark` function: `Watermarker.dll!WmkWriteWatermark(output_pixels, payload, payload_length, width, height, stride, input_pixels, pixel_format);`
首先，可见水印是通过 `AddPerceptibleWatermark` 添加的。此外，还有一个不同的 `WmkWriteWatermark` 函数：`Watermarker.dll!WmkWriteWatermark(output_pixels, payload, payload_length, width, height, stride, input_pixels, pixel_format);`

Tracing the call tree, we can see `WmkWriteWatermark` is called after a local Stable Diffusion image generation. And if `WmkWriteWatermark` fails, Paint converts the entire generation into an error rather than returning the image without it.
追踪调用树，我们可以看到 `WmkWriteWatermark` 是在本地 Stable Diffusion 图像生成之后被调用的。如果 `WmkWriteWatermark` 失败，画图应用会将整个生成过程转为错误，而不是返回未加水印的图像。

It is funny to me that the code is using two different error codes when the payload is too short or too long. The function then ignores the length parameter and uses a hard-coded loop bound when it copies the payload. We do not yet know what the 16-byte payload is, but as we will see later, it is a GUID!
有趣的是，当载荷（payload）过短或过长时，代码使用了两个不同的错误代码。该函数随后忽略了长度参数，并在复制载荷时使用了硬编码的循环边界。我们目前还不知道这 16 字节的载荷是什么，但正如稍后将看到的，它是一个 GUID！