---
title: "How I Fixed Relative Docking & Physics Drift in UE5 (Aether Framework Deep Dive)"
originalUrl: "https://dev.to/kadmium/how-i-fixed-relative-docking-physics-drift-in-ue5-aether-framework-deep-dive-427"
date: "2026-09-26T00:08:31.834Z"
---

# How I Fixed Relative Docking & Physics Drift in UE5 (Aether Framework Deep Dive)
# 如何在 UE5 中修复相对对接与物理漂移（Aether 框架深度解析）

Hey DEV! 👋 Last week I shared an update on my open-world space sim Sirius (on reddit KadmiumTech), built on my custom Aether Framework in Unreal Engine 5. Aether leverages UE5's Network Prediction Plugin (NPP) and Large World Coordinates (LWC) to handle deterministic 6DOF space physics. One of the trickiest mechanics in space games is Relative Docking—landing a small, agile fighter onto a massive, fast-moving capital carrier without physics jitter or netcode desync. Here is a deep dive into four specific physics bugs I encountered and how I solved them in C++! This is still work in progress and needs some adjustmends but the core works.

嘿，开发者们！👋 上周我在 Reddit (KadmiumTech) 上分享了我的开放世界太空模拟游戏《Sirius》的更新，该游戏基于我在虚幻引擎 5 中开发的自定义 Aether 框架。Aether 利用了 UE5 的网络预测插件 (NPP) 和大世界坐标 (LWC) 来处理确定性的 6 自由度太空物理。太空游戏中棘手的机制之一是“相对对接”——即在不产生物理抖动或网络同步错误的情况下，将一架小型敏捷战斗机降落在巨大的、高速移动的母舰上。以下是我遇到的四个特定物理 Bug 的深度解析，以及我是如何用 C++ 解决它们的！目前项目仍在进行中，还需要一些调整，但核心功能已经跑通了。

---

### 1. Jittery Rotation on Moving Carriers
### 1. 移动母舰上的旋转抖动

**The Problem:** Whenever a ship entered a relative movement zone, rotational smoothing was completely bypassed. Every micro-rotation of the carrier hit the player's ship as a harsh, frame-by-frame stutter. Additionally, the camera aim director was running post-physics, creating a phase shift between camera, mesh, and physics state.

**问题：** 每当飞船进入相对运动区域时，旋转平滑处理就会完全失效。母舰的每一次微小旋转都会以生硬的逐帧卡顿形式作用于玩家飞船。此外，摄像机瞄准控制器（Aim Director）是在物理计算之后运行的，导致摄像机、网格体和物理状态之间产生了相位偏移。

**The Solution:** I synchronized the Aim Director updates directly with netcode prediction ticks and re-enabled rotational smoothing for relative zones in `AetherMovementComponent.cpp`. Rotation offsets are now smoothly interpolated toward Identity using `FQuat::Slerp`.

**解决方案：** 我将瞄准控制器的更新直接与网络预测 Tick 同步，并在 `AetherMovementComponent.cpp` 中为相对区域重新启用了旋转平滑。现在，旋转偏移量通过 `FQuat::Slerp` 平滑地插值回单位四元数（Identity）。

```cpp
// AetherMovementComponent.cpp - FinalizeSmoothingFrame()
if (Sync->bIsRelative && Sync->ZoneID > 0) {
    if (UAetherGravitySubsystem* Subsystem = GetGravitySubsystem()) {
        FTransform ParentTransform;
        if (Subsystem->GetZoneTransform(Sync->ZoneID, ParentTransform)) {
            TargetLocation = ParentTransform.TransformPosition(TargetLocation);
            TargetRotation = ParentTransform.TransformRotation(TargetRotation);
        }
    }
    // Smoothly interpolate translation and rotation offsets back to identity
    SmoothingTranslationOffset = FMath::VInterpTo(SmoothingTranslationOffset, FVector::ZeroVector, DeltaTime, 15.0f);
    SmoothingRotationOffset = FQuat::Slerp(SmoothingRotationOffset, FQuat::Identity, FMath::Clamp(DeltaTime * 15.0f, 0.0f, 1.0f));
    
    VisualComponent->SetWorldLocationAndRotation(
        TargetLocation + SmoothingTranslationOffset, 
        (SmoothingRotationOffset * TargetRotation).GetNormalized()
    );
    return;
}
```

---

### 2. Violently Oscillating / "Sticky" Landing Gear
### 2. 剧烈震荡或“粘滞”的起落架

**The Problem:** Landing gear suspension forces were calculated using raw spring velocity multiplied by friction and mass—missing delta-time scaling and impulse limits. Pressing into the ground created an unscaled force that catapulted the ship into space in an violent feedback loop.

**问题：** 起落架的悬挂力计算使用的是原始弹簧速度乘以摩擦力和质量，缺少了 Delta-time 缩放和冲量限制。压向地面时会产生未缩放的力，导致飞船在剧烈的反馈循环中被弹射到太空中。

**The Solution:** In `AetherLandingGearSim.cpp`, damping forces are now properly scaled by mass, frequency, and time step, with impulses clamped against maximum allowed Gs. I also isolated the "Sticky" (magnetic) landing gear behavior to apply a controlled, downward force vector.

**解决方案：** 在 `AetherLandingGearSim.cpp` 中，阻尼力现在根据质量、频率和时间步长进行了正确缩放，并将冲量限制在最大允许 G 值范围内。我还将“粘滞”（磁性）起落架行为独立出来，以施加受控的向下力向量。

```cpp
// AetherLandingGearSim.cpp - Step()
const float ActiveStiffness = ScaledStiffness * ProgressiveMultiplier;
const float ActiveDamping = (AxisVelocity < 0.0f) ? (ScaledDamping * 0.2f) : ScaledDamping;

// Calculate spring force and clamp max impulses to prevent violent bounce-backs
float SpringForce = (Compression * ActiveStiffness) - (AxisVelocity * ActiveDamping);
SpringForce = FMath::Clamp(SpringForce, 0.0f, (MassPerGear * 980.0f) * Gear.MaxSuspensionGs);
FVector CurrentGearForce = GearUpDir * SpringForce;

// Separate magnetic ground attraction force
if (Gear.GearMode == EAetherLandingGearMode::Sticky && Compression > 0.001f) {
    const float AdhesionForce = MassPerGear * 980.0f * 1.5f;
    CurrentGearForce -= GearUpDir * AdhesionForce;
}
```

---

### 3. Rolling 90° Caused Unwanted Sideways Drift
### 3. 侧滚 90° 导致不必要的侧向漂移

**The Problem:** The aerodynamic lift vector calculation contained a matrix transformation flaw that simplified to applying lift straight up against world gravity, regardless of ship orientation. Rolling 90° put the wings vertical, but lift kept pushing world-up, producing unintended lateral drift.

**问题：** 空气动力升力向量的计算包含一个矩阵变换缺陷，它被简化为直接对抗世界重力的向上升力，而忽略了飞船的朝向。侧滚 90° 后机翼变为垂直，但升力依然向上推动，导致了非预期的侧向漂移。

**The Solution:** Lift must always evaluate relative to the ship’s local Up axis (`Sync->Rotation.GetAxisZ()`). In `AetherAeroSim.cpp`, the lift force vector is now computed directly along the local roof vector and scaled by atmospheric density.

**解决方案：** 升力必须始终相对于飞船的局部向上轴（`Sync->Rotation.GetAxisZ()`）进行计算。在 `AetherAeroSim.cpp` 中，升力向量现在直接沿着局部顶部向量计算，并根据大气密度进行缩放。

```cpp
// AetherAeroSim.cpp - Step()
if (EnvDensity > 0.001f) {
    const FQuat InvShipRot = Sync->Rotation.Inverse();
    const FVector BodyVel = InvShipRot.RotateVector(Sync->LinearVelocity);
    const float ForwardSpeed = FMath::Max(0.0f, BodyVel.X);
    const float InvMaxLiftSpeed = 1.0f / FMath::Max(1.0f, Aux->MaxSpeed * Aux->OptimalLiftSpeedRatio);
    const float LiftAlpha = FMath::Clamp(ForwardSpeed * InvMaxLiftSpeed, 0.0f, 1.0f);

    // FIX: Get local ship up direction instead of world up!
    const FVector ShipUpDir = Sync->Rotation.GetAxisZ();
    const float GravityMag = LocalGravity.IsNearlyZero() ? 980.0f : LocalGravity.Size();

    // Apply aerodynamic lift aligned with local ship orientation
    Sync->LinearVelocity += ShipUpDir * (LiftAlpha * GravityMag * EnvDensity * DeltaSeconds);
}
```

---

### 4. Loss of Inherited Speed When Exiting Moving Carriers
### 4. 离开移动母舰时丢失继承速度

**The Problem:** When exiting a carrier, zone transition logic calculated inherited world velocity correctly (e.g., combining 2,000 cm/s ship speed + 55,000 cm/s carrier speed). However, on the exact same frame, the velocity was clamped against the ship's standalone engine MaxSpeed (e.g., 5,000 cm/s), causing the ship to instantly lose over 90% of its momentum.

**问题：** 当离开母舰时，区域转换逻辑正确计算了继承的世界速度（例如：2,000 cm/s 的飞船速度 + 55,000 cm/s 的母舰速度）。然而，在同一帧中，速度被飞船自身的引擎最大速度（例如 5,000 cm/s）强制限制，导致飞船瞬间丢失了超过 90% 的动量。

**The Solution:** I removed the hard top-speed clamp during world-zone handshakes in `FAetherSpaceUtils::ProcessZoneHandshake`. Instead, excess momentum bleeds off dynamically over time (Dynamic Bleed) inside `AetherAeroSim.cpp`.

**解决方案：** 我在 `FAetherSpaceUtils::ProcessZoneHandshake` 的世界区域握手过程中移除了硬性的最高速度限制。取而代之的是，在 `AetherAeroSim.cpp` 中通过“动态衰减”（Dynamic Bleed）让多余的动量随时间推移逐渐消散。

```cpp
// AetherAeroSim.cpp - Step()
const float SpeedSq = Sync->LinearVelocity.SizeSquared();
const float MaxSpeedSq = FMath::Square(EffectiveMaxSpeed);

// Exponentially bleed off excess inherited velocity instead of hard-clamping
if (SpeedSq > MaxSpeedSq) {
    const float CurrentSpeed = FMath::Sqrt(SpeedSq);
    const float ExcessSpeed = CurrentSpeed - EffectiveMaxSpeed;
    const float DynamicBleed = Aux->DynamicBleedBase + (ExcessSpeed * Aux->DynamicBleedFactor);
    const float NewSpeed = EffectiveMaxSpeed + (ExcessSpeed * FMath::Exp(-DynamicBleed * DeltaSeconds));
    Sync->LinearVelocity = Sync->LinearVelocity.GetSafeNormal() * NewSpeed;
}
```