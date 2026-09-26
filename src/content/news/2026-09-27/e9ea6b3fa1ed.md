---
title: "Cross-Platform Save Systems: Cloud Sync Done Right"
originalUrl: "https://dev.to/oceanviewgames/cross-platform-save-systems-cloud-sync-done-right-2kmc"
date: "2026-09-26T23:49:43.781Z"
---

# Cross-Platform Save Systems: Cloud Sync Done Right
# 跨平台存档系统：云同步的正确实现方式

Few systems in game development are as universally needed - and as consistently underestimated - as save data management. When your game lives on a single platform and a single device, saving is straightforward. The moment you add a second platform or a second device, you inherit an entirely new class of engineering problems: conflict resolution, offline play, schema evolution, and platform-specific API compliance.
在游戏开发中，很少有系统像存档数据管理这样被普遍需要，却又总是被低估。当你的游戏仅运行在单一平台和单一设备上时，存档非常简单。但一旦你增加了第二个平台或设备，你就会面临一整套全新的工程难题：冲突解决、离线游玩、架构演进以及平台特定 API 的合规性。

We have built save systems for games across the complexity spectrum. Our work on Domi Online, a persistent MMORPG with a server-authoritative backend, demanded a fundamentally different architecture than a mobile puzzle game. David's time working on RuneScape Mobile at Jagex also reinforced the wider lesson behind this article: long-lived games make persistence and backwards compatibility architectural concerns, not implementation details.
我们曾为各种复杂程度的游戏构建过存档系统。我们在《Domi Online》（一款具有服务器权威后端的持久化 MMORPG）上的工作，与开发一款移动端益智游戏所需的架构有着本质区别。David 在 Jagex 参与《RuneScape Mobile》开发的经历也印证了本文背后的核心经验：对于长线运营的游戏而言，持久化和向后兼容性是架构层面的考量，而非简单的实现细节。

This post is a technical guide for Unity developers building cross-platform cloud save systems. We will cover architecture decisions, platform-specific APIs, conflict resolution strategies, offline-first design, and schema migration for live games.
本文是为构建跨平台云存档系统的 Unity 开发者准备的技术指南。我们将涵盖架构决策、平台特定 API、冲突解决策略、离线优先设计以及在线游戏的架构迁移。

### Why Cloud Save Is Harder Than It Looks
### 为什么云存档比看起来更难

At first glance, cloud save seems simple: serialise the game state, upload it to a server, download it on another device. In practice, every step introduces complexity:
乍看之下，云存档似乎很简单：序列化游戏状态，上传到服务器，然后在另一台设备上下载。但在实践中，每一步都引入了复杂性：

*   **What happens when the player is offline?** Mobile players lose connectivity constantly. Your game must remain fully playable.
*   **当玩家离线时会发生什么？** 移动端玩家经常会断网，你的游戏必须保持完全可玩。
*   **What happens when two devices have divergent saves?** The player progresses on their phone, then opens the game on their tablet before the phone syncs. Which save wins?
*   **当两台设备的存档产生分歧时会发生什么？** 玩家在手机上推进了进度，然后在手机同步前又在平板上打开了游戏。哪个存档应该生效？
*   **What happens when you update the game?** The save schema changes, but the player's cloud data is still in the old format.
*   **当你更新游戏时会发生什么？** 存档架构发生了变化，但玩家的云端数据仍是旧格式。
*   **What happens when the platform API fails?** Google Play Games Services, Game Center, and Steam Cloud each have their own failure modes, rate limits, and quirks.
*   **当平台 API 失败时会发生什么？** Google Play 游戏服务、Game Center 和 Steam Cloud 各自都有不同的故障模式、速率限制和特性。

A robust cloud save system must handle all of these cases gracefully, without data loss and without confusing the player.
一个健壮的云存档系统必须优雅地处理所有这些情况，既不能丢失数据，也不能让玩家感到困惑。

### Architecture: The Three Layers
### 架构：三个层级

We recommend structuring your cloud save system as three distinct layers. This separation makes each layer independently testable and replaceable.
我们建议将云存档系统构建为三个独立的层级。这种分离使得每一层都可以独立测试和替换。

#### Layer 1: The Save Data Model
#### 第一层：存档数据模型

Your save data should be a plain C# class (or set of classes) with no dependencies on Unity types, MonoBehaviour, or any platform SDK. This makes it serialisable, testable, and portable.
你的存档数据应该是一个纯粹的 C# 类（或一组类），不依赖于 Unity 类型、MonoBehaviour 或任何平台 SDK。这使其具备可序列化、可测试和可移植性。

```csharp
[System.Serializable]
public class PlayerSaveData {
    public int schemaVersion;
    public long lastModifiedUtc;
    public string deviceId;
    public PlayerProgress progress;
    public InventoryData inventory;
    public SettingsData settings;
}
```

**Key principles:**
**核心原则：**

*   **Include a schema version** - you will need this for migration (covered below).
*   **包含架构版本号** - 你在进行迁移时会用到它（下文会提到）。
*   **Include a timestamp** - lastModifiedUtc is essential for conflict resolution. Use UTC epoch milliseconds to avoid timezone issues.
*   **包含时间戳** - `lastModifiedUtc` 对于冲突解决至关重要。请使用 UTC 毫秒时间戳以避免时区问题。
*   **Include a device identifier** - useful for debugging and for conflict resolution UI.
*   **包含设备标识符** - 有助于调试和冲突解决的 UI 显示。
*   **Separate volatile and stable data** - settings change rarely; progress changes constantly. Splitting them reduces sync frequency and payload size.
*   **分离易变数据与稳定数据** - 设置很少改变，而进度则不断变化。将它们分开可以减少同步频率和数据包大小。

#### Layer 2: The Local Persistence Layer
#### 第二层：本地持久化层

This layer handles reading from and writing to the device's local storage. It operates independently of any cloud service and is the foundation of your offline-first design.
该层负责读写设备的本地存储。它独立于任何云服务运行，是你“离线优先”设计的基础。

**Responsibilities:**
**职责：**

*   **Serialisation** - convert the save model to bytes. We recommend JSON for debug-friendliness during development and binary (MessagePack or a custom binary format) for production.
*   **序列化** - 将存档模型转换为字节。我们建议开发阶段使用 JSON 以方便调试，生产环境使用二进制（如 MessagePack 或自定义二进制格式）。
*   **Encryption** - if your save data contains anything the player could benefit from tampering with (currency, progression, unlocks), encrypt it locally. AES-256 with a device-derived key is a reasonable baseline.
*   **加密** - 如果存档数据包含玩家可能通过篡改获利的内容（货币、进度、解锁项），请在本地加密。使用基于设备生成的密钥进行 AES-256 加密是一个合理的基准。
*   **Atomic writes** - never write directly to the save file. Write to a temporary file, then rename it. This prevents corruption if the app is killed mid-write.
*   **原子写入** - 永远不要直接写入存档文件。应先写入临时文件，然后再重命名。这可以防止应用在写入过程中被杀掉导致文件损坏。
*   **Backup copies** - maintain the previous save as a rollback option.
*   **备份副本** - 保留上一个存档作为回滚选项。

#### Layer 3: The Cloud Sync Layer
#### 第三层：云同步层

This layer manages communication with the cloud backend. It should be completely decoupled from the local persistence layer via an interface.
该层管理与云后端的通信。它应该通过接口与本地持久化层完全解耦。

```csharp
public interface ICloudSaveProvider {
    Task<CloudSaveResult> UploadAsync(byte[] data, SaveMetadata metadata);
    Task<CloudSaveDownload> DownloadAsync();
    Task<bool> DeleteAsync();
    bool IsAuthenticated { get; }
}
```

This interface can then have concrete implementations for each platform: `GameCenterSaveProvider`, `GooglePlaySaveProvider`, `SteamCloudSaveProvider`, etc.
该接口可以为每个平台提供具体的实现：`GameCenterSaveProvider`、`GooglePlaySaveProvider`、`SteamCloudSaveProvider` 等。

### Platform Comparison
### 平台对比

| Platform | Apple Game Center | Google Play Games | Steam Cloud |
| :--- | :--- | :--- | :--- |
| **API** | GKSavedGame (GameKit) | Saved Games API (v2) | ISteamRemoteStorage |
| **Storage limit** | No hard limit (recommend <MB) | 3 MB per slot | Configurable (100MB-1GB) |
| **Conflict handling** | Detects conflicts, provides array | Callback with local/server versions | Last-write-wins by default |
| **Quirks** | Tied to Apple ID | Requires Play Games sign-in | File-based, not structured |

*(注：平台 API、配额和行为会随时间变化。请在实施前查阅最新的平台文档。)*