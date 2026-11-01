---
title: "Molly (Signal fork) has not been updated since 3 months and is vulnerable"
originalUrl: "https://piefed.world/post/1503394"
date: "2026-10-31T10:23:41.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

Title: Molly (Signal fork) has not been updated since 3 months and is vulnerable

As of now, Molly lastest release was in 31 July (Version v8.19.2-4).
截至目前，Molly 的最新版本发布于 7 月 31 日（版本 v8.19.2-4）。

It contains vulnerabilities that had been simply fixed in mainline Signal.
它包含了一些在 Signal 主线版本中早已修复的漏洞。

Take for example the latest exploit disclosed in October, it has been fixed in Signal 8.27. 1. Meanwhile Molly remains vulnerable.
以 10 月披露的最新漏洞为例，该漏洞已在 Signal 8.27.1 中得到修复，而 Molly 仍然处于易受攻击的状态。

It’s currently recommended to use mainline Signal and delete Molly till they at least return to updating their app adequately, if they ever will.
目前建议使用 Signal 主线版本并删除 Molly，直到他们至少恢复正常的应用更新（如果他们还会这样做的话）。

Inicia la sessió per comentar
登录以发表评论

Why run Molly when Signal is right there? Is this about getting it via places other than the Play store?
既然有 Signal，为什么还要运行 Molly？这是为了通过 Play 商店以外的渠道获取它吗？

I’m running it specifically for the UnifiedPush support which gives me push notifications without Google Play Services.
我运行它主要是为了 UnifiedPush 支持，这让我在没有 Google Play 服务的情况下也能收到推送通知。

Signal works perfectly with MicroG for reference.
作为参考，Signal 与 MicroG 配合使用效果完美。

I have no Google Play Services on my GrapheneOS phone, or any Google account. Signal with MicroG works fast and accurate for all notifications.
我的 GrapheneOS 手机上没有 Google Play 服务，也没有任何 Google 账户。Signal 配合 MicroG 在所有通知上运行得既快速又准确。

I don’t use it but I think the biggest reason is it’s degoogled
我不用它，但我认为最大的原因是它去除了 Google 服务。

@stsquad @beep The main reason for me is that I could install and update the app using F-Droid and not have to do so manually or with yet-another package manager. Having push notifications working on a degoogled phone without draining my battery is a close second.
@stsquad @beep 对我来说，主要原因是我可以使用 F-Droid 安装和更新应用，而不必手动操作或使用另一个包管理器。在去 Google 化的手机上实现推送通知且不耗电是第二个重要原因。

That and unified push (although I didn’t get that to work yet) are my main selling point, yes. I seriously don’t understand how signal is only on the PlayStore
是的，这一点加上 UnifiedPush（尽管我还没能让它工作）是我的主要考量。我真的不明白为什么 Signal 只在 Play 商店上架。

Are you messing with me? It’s literally right below: https://signal.org/android/apk/
你在开玩笑吗？它就在下面：https://signal.org/android/apk/

doesn’t get updates tho
但它不会自动更新。

I’m aware of that. But I’m not going to manually download a file every time. And I especially can’t expect that from family members who don’t have the playstore and can’t use a phone very well. A child I manage the phone for does not even have a browser so yeah
我知道这一点。但我不想每次都手动下载文件。我尤其不能指望那些没有 Play 商店且不太会用手机的家庭成员这样做。我管理手机的一个孩子甚至连浏览器都没有，所以就是这样。

So use Obtainium? It’s no worse than f-droid or wherever you get Molly from
那就用 Obtainium 吧？它并不比 F-Droid 或你获取 Molly 的任何地方差。

Edit: The page just fetches https://updates.signal.org/android/latest.json, which contains a link to the APK you want to download, so you can feed that to any periodic update service you want
编辑：该页面只是获取 https://updates.signal.org/android/latest.json，其中包含你要下载的 APK 链接，所以你可以将其提供给任何你想要的定期更新服务。

As a Android developer who has an app in the Play store as well as in f-droid, I’ll be the first to say that the f-droid people make it an absolute pain to put things there. I’ve almost stopped pushing there because of how annoying it is. My app went 3 months without being updated there because of how they manage things. They are way way way way. Way too frustrating to deal with.
作为一名在 Play 商店和 F-Droid 上都有应用的 Android 开发者，我首先要说，F-Droid 的人让发布应用变得极其痛苦。因为太烦人了，我几乎停止了在那边推送更新。由于他们的管理方式，我的应用在那里有 3 个月没有更新。他们真的太让人沮丧了。

So yeah I’m not surprised. A lot of stuff is not there. I support the concept and it was my main goal to put it there, but they have radically changed my opinion about using it and anyone who refuses to use an app because it’s not there. Should try publish in there sometime
所以是的，我并不感到惊讶。很多东西都不在那里。我支持这个理念，把它放在那里也是我的主要目标，但他们彻底改变了我对使用它的看法，以及对那些因为应用不在那里就拒绝使用的人的看法。他们应该尝试去那里发布一次应用。

What about your own repo then? I would be totally fine with that if signal did that.
那建立你自己的仓库呢？如果 Signal 这样做，我完全可以接受。

Sure that is the work around that guardian did for signal. It’s just a passion because everyone needs to add that repo manually. Very free people are going to bother with that additional friction if they even know it’s there
当然，这就是 Guardian 为 Signal 做的变通方案。这只是出于热情，因为每个人都需要手动添加该仓库。很少有人会愿意为了这种额外的麻烦而折腾，前提是他们甚至知道它的存在。

I didn’t know but you can use obtanium and this
我不知道，但你可以使用 Obtainium 和这个。

Yeah, that’s what I did for a while until I discovered molly… Its annoying but probably the best option if molly becomes abandoned
是的，我在发现 Molly 之前就是这么做的……这很烦人，但如果 Molly 被废弃，这可能是最好的选择。

With Molly you can use one Signal account on two devices.
使用 Molly，你可以在两台设备上使用同一个 Signal 账户。

What does this mean? I use signal with the official client on like 5 devices just fine?
这是什么意思？我用官方客户端在 5 台设备上使用 Signal，完全没问题啊？

Signal supports two android devices in one account as standard
Signal 标准支持在一个账户下使用两台 Android 设备。

Yeah, since a month or so, and emphasis on 2 and not unlimited
是的，大约一个月前才开始支持，重点是 2 台，而不是无限台。

Really? That’s new to me… I’ll check it out
真的吗？我刚知道……我去看看。

I use molly because i have an android smartphone and tablet and running both with signal is not possible with signal. (Maybe the changed it? I have to check it)
我使用 Molly 是因为我有一部 Android 手机和平板电脑，而 Signal 无法同时在两者上运行。（也许他们改了？我得查查）

They did! (If you’re talking about pairing a tablet with your smart phone like how their desktop app pairs).
他们改了！（如果你是指像桌面端配对那样将平板电脑与智能手机配对的话）。

https://aboutsignal.com/news/signal-allows-android-phones-to-be-linked-as-secondary-devices/
https://aboutsignal.com/news/signal-allows-android-phones-to-be-linked-as-secondary-devices/

Perfect, will switch back to signal.
太好了，我会换回 Signal。

On an unrelated not my signal backup has corruptes sticker cache, so all old stickers are not showing correctly, does anyone know a way to force it to download it a new one?
顺便问个无关的问题，我的 Signal 备份贴纸缓存损坏了，导致所有旧贴纸都无法正确显示，有人知道强制它重新下载的方法吗？

Thanks, I’ve been using Molly on my tab for a while. Have now installed Signal
谢谢，我在平板上用 Molly 用了一段时间了。现在已经安装了 Signal。

Signal is distributed by the Guardian Project on Fdroid.
Signal 是由 Guardian Project 在 F-Droid 上分发的。

Yeah unofficially… that is very much a bandaid. It is really bad of Signal to not have a blobfree reproducible build on F-Droid and Flathub, or even just external repos (for F-Droid and flathub).
是的，非官方的……那只是权宜之计。Signal 没有在 F-Droid 和 Flathub 上提供无二进制包（blobfree）的可复现构建，甚至没有提供外部仓库（针对 F-Droid 和 Flathub），这真的很糟糕。

Instead they have a hidden self-updating APK (which is a very cursed concept) with blobs, and a damn Appimage on Linux.
相反，他们提供了一个带有二进制包的隐藏式自更新 APK（这是一个非常糟糕的概念），以及 Linux 上该死的 AppImage。

Yeah, is there any actual reason given by Signal for this?
是的，Signal 对此给出了任何实际理由吗？

It does some extra stuff signal doesn’t ( apparently).
Though there’s always a risk using a 3rd party client. And I guess it might be against the TOS of signal?
它做了一些 Signal 没有做的额外事情（显然）。虽然使用第三方客户端总是有风险的。而且我猜这可能违反了 Signal 的服务条款？

https://github.com/mollyim/mollyim-android#features
https://github.com/mollyim/mollyim-android#features

Why run Signal when Session is right there? Maybe you just like leaking metadata?
既然有 Session，为什么还要运行 Signal？也许你只是喜欢泄露元数据？

https://abcnews.com/blogs/headlines/2014/05/ex-nsa-chief-we-kill-people-based-on-metadata/
https://abcnews.com/blogs/headlines/2014/05/ex-nsa-chief-we-kill-people-based-on-metadata/

Session has removed perfect forward secrecy. I dont know if they still have broken autodeletion and still store all messages in a blockchain. Overall though, I would stay away from it.
Session 已经移除了前向安全性。我不知道他们是否仍然存在自动删除功能损坏的问题，以及是否仍然将所有消息存储在区块链中。总的来说，我会远离它。

I use Signal-FOSS by twinhelix. It exists since many years and upatches are fully automated.
我使用 twinhelix 的 Signal-FOSS。它已经存在很多年了，更新完全自动化。

They are very simple, deblob signal, remove firebase messages and maps and whatnot.
他们非常简单，去除了 Signal 的二进制包，移除了 Firebase 消息、地图等内容。

Twinhelix has also added some of the jw patches, which are nice to have.
Twinhelix 还添加了一些 jw 补丁，这些补丁很好用。

If you dont need those features, I highly recommend it. Signal shipping Google blobs and having no F-Droid repo is very bad and that shouldn’t be supported.
如果你不需要那些功能，我强烈推荐它。Signal 携带 Google 二进制包且没有 F-Droid 仓库是非常糟糕的，不应该被支持。

See the list of known 3rd party F-Droid repos
查看已知的第三方 F-Droid 仓库列表。

Note that UnifiedPush needs to be supported by the server. The server then sends the push message to a UnifiedPush distributor (like Conversations, ntfy or Sunup). That distributor wakes up the app, which sends you the notification.
请注意，UnifiedPush 需要服务器支持。服务器随后将推送消息发送给 UnifiedPush 分发器（如 Conversations、ntfy 或 Sunup）。该分发器会唤醒应用，进而向你发送通知。