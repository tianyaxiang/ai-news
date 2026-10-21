---
title: "NVIDIA Cosmos3-H-Dreams: Bringing Clinical Surgery to Life Through Generative Simulation"
originalUrl: "https://huggingface.co/blog/nvidia/cosmos3-h-dreams"
date: "2026-10-20T18:17:47.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# NVIDIA Cosmos3-H-Dreams: Bringing Clinical Surgery to Life Through Generative Simulation

Back to Articles NVIDIA Cosmos3-H-Dreams: Bringing Clinical Surgery to Life Through Generative Simulation Enterprise + Article Published October 20, 2026 Upvote 2 Lukas Zbinden lzbinden Follow nvidia Javier Gamazo javirk1 Follow nvidia Nigel Nelson nigeln Follow nvidia Mostafa Toloui mtoloui Follow nvidia Sean Huver shuver Follow nvidia Picture moving the Cadiere grasper, grasping the gallbladder, and lifting it, all within a generated surgical scene that responds in real time. Today, we take the next step and introduce Cosmos3-H-Dreams, bringing interactive generative simulation to the visual and procedural complexity of clinical surgery with our most convincing in-body imagery to date.

想象一下移动 Cadiere 抓钳，抓取胆囊并将其提起，所有这些操作都在一个实时响应的生成式手术场景中完成。今天，我们迈出了下一步，推出了 Cosmos3-H-Dreams，将交互式生成模拟引入到临床手术的视觉和程序复杂性中，并呈现了我们迄今为止最令人信服的体内影像。

Our first Cosmos-H-Dreams release, built on Cosmos-Predict2.5, brought interactive generative simulation to dVRK tabletop suturing, a foundational proving ground for surgical robotics. As world foundation model (WFM), Cosmos-H-Dreams demonstrated an alternative to numerical simulation: rather than explicitly modeling scene geometry, tissue deformation, and physical interactions, it learned visual dynamics directly from synchronized video and robot kinematics, yielding interactive tabletop task simulation with high realism.

我们首个基于 Cosmos-Predict2.5 构建的 Cosmos-H-Dreams 版本，将交互式生成模拟带入了 dVRK 桌面缝合领域，这是手术机器人技术的一个基础验证平台。作为世界基础模型 (WFM)，Cosmos-H-Dreams 展示了数值模拟的替代方案：它无需显式建模场景几何、组织变形和物理交互，而是直接从同步视频和机器人运动学中学习视觉动力学，从而实现了具有高度真实感的交互式桌面任务模拟。

Today, Cosmos3-H-Dreams advances this capability by learning from video and robot kinematics recording during clinical procedures on the CMR Surgical Versius platform. To our knowledge, this is the first real-time generative surgical simulator trained on clinical cholecystectomy recordings to support live kinematic control. Powered by Cosmos 3 and accelerated with FlashDreams, NVIDIA’s accelerated streaming-inference library, Cosmos3-H-Dreams runs interactively on a single NVIDIA RTX PRO 6000 GPU.

今天，Cosmos3-H-Dreams 通过学习在 CMR Surgical Versius 平台上进行的临床手术过程中记录的视频和机器人运动学数据，提升了这一能力。据我们所知，这是首个在临床胆囊切除术记录上训练并支持实时运动学控制的实时生成式手术模拟器。在 Cosmos 3 的驱动下，并利用 NVIDIA 的加速流推理库 FlashDreams 进行加速，Cosmos3-H-Dreams 可以在单块 NVIDIA RTX PRO 6000 GPU 上实现交互式运行。

### 1. From Tabletop Tasks to Clinical Scenes
### 1. 从桌面任务到临床场景

In a controlled tabletop environment like that of Cosmos-H-Dreams, instruments operate against a relatively simple background. Inside the human body, however, small instrument movements can affect an entire scene: tissue stretches under traction, reflections shift, structures become occluded, and smoke changes visibility. Given an initial image and supplied tool actions, a generative simulator must capture these responses while preserving the anatomy and instruments as it generates each new block of video.

在像 Cosmos-H-Dreams 这样的受控桌面环境中，器械是在相对简单的背景下操作的。然而，在人体内部，微小的器械移动可能会影响整个场景：组织在牵引下伸展、反射发生偏移、结构被遮挡，以及烟雾改变了可见度。给定初始图像和提供的工具动作，生成式模拟器必须在生成每个新的视频块时捕捉这些响应，同时保持解剖结构和器械的完整性。

Small errors can accumulate over time, gradually changing instrument geometry or anatomical structure, making temporal consistency essential. Visual realism is therefore a starting point for validation, not proof of biomechanical accuracy. The generated scene must also follow the controls: translation, rotation, and gripper commands should produce coherent anatomical consequences. A plausible-looking rollout that ignores those commands cannot serve as an interactive environment.

微小的误差会随时间累积，逐渐改变器械几何形状或解剖结构，因此时间一致性至关重要。因此，视觉真实感只是验证的起点，而非生物力学准确性的证明。生成的场景还必须遵循控制指令：平移、旋转和抓取命令应产生连贯的解剖学后果。一个看起来合理但忽略了这些命令的推演过程，无法作为交互式环境使用。

Maintaining this fidelity and responsiveness in a live control loop requires low latency generation. Cosmos3-H-Dreams addresses this setting through a model specialized for clinical cholecystectomy and distilled for real-time generation, bringing action-conditioned interaction into scenes with complex anatomy, tissue motion, and occlusion.

在实时控制循环中保持这种保真度和响应能力需要低延迟生成。Cosmos3-H-Dreams 通过一个专门针对临床胆囊切除术并为实时生成而蒸馏的模型来解决这一问题，将动作条件下的交互引入到具有复杂解剖结构、组织运动和遮挡的场景中。

### 2. What is New in Cosmos3-H-Dreams?
### 2. Cosmos3-H-Dreams 有哪些新功能？

2.1 A Cosmos 3 Foundation and Richer Surgical Controls
2.1 Cosmos 3 基础与更丰富的手术控制

Cosmos3-H-Dreams builds on Cosmos3-H-Embodied-Nano, a 16-billion-parameter model pretrained on Open-H-Embodiment, and specializes a bidirectional teacher on curated cholecystectomy video and kinematics. Sample selection targets two visible, engaged instruments, a left Cadiere grasper and a right monopolar hook, and limits camera commands to emphasize instrument-driven interaction. The model uses 28 action dimensions: pose and gripper information for both arms, plus energy controls, thumbstick axes and thumbstick buttons. Training uses 832 x 480 video with actions aligned at 10 Hz; that sampling rate is distinct from runtime generation throughput.

Cosmos3-H-Dreams 基于 Cosmos3-H-Embodied-Nano 构建，这是一个在 Open-H-Embodiment 上预训练的 160 亿参数模型，并在精选的胆囊切除术视频和运动学数据上专门训练了一个双向教师模型。样本选择针对两个可见且处于工作状态的器械（左侧 Cadiere 抓钳和右侧单极钩），并限制了摄像机指令以强调器械驱动的交互。该模型使用 28 个动作维度：双臂的姿态和抓取信息，以及能量控制、摇杆轴和摇杆按钮。训练使用 832 x 480 的视频，动作对齐频率为 10 Hz；该采样率与运行时生成吞吐量不同。

2.2 From Teacher to Four-Step and Two-Step Students
2.2 从教师模型到四步和两步学生模型

Cosmos3-H-Dreams combines a teacher-to-student training pipeline designed for long autoregressive rollouts with accelerated streaming inference through FlashDreams. We first adapt the bidirectional teacher on 24 future frames, then extend the horizon to 72 frames, 2.4 and 7.2 seconds at 10 Hz. This gives the teacher longer sequences over which to learn surgical dynamics. Next, distillation turns the bidirectional teacher into a causal student that can generate video in short blocks as new actions arrive.

Cosmos3-H-Dreams 将专为长自回归推演设计的“教师到学生”训练流水线与通过 FlashDreams 实现的加速流推理相结合。我们首先在 24 帧未来帧上调整双向教师模型，然后将视野扩展到 72 帧（在 10 Hz 下分别为 2.4 秒和 7.2 秒）。这使教师模型能够学习更长序列的手术动力学。接下来，通过蒸馏将双向教师模型转化为因果学生模型，该模型可以在新动作到达时以短块形式生成视频。

Causal teacher forcing prepares the student for sequential generation using recorded context. Self-Forcing then trains it on its own generated context, guided by the teacher and a learned critic. This helps address the accumulation of errors during interactive rollouts. The first released student uses four denoising steps per generated block. We then train that student further with a two-step schedule to produce the second release checkpoint. The two-step model is separately trained, not simply the four-step model run with fewer sampling steps. Fewer denoising steps results in faster inference time at the expense of lower visual quality. Both checkpoints let developers explore the balance between visual quality and inference cost.

因果教师强制（Causal teacher forcing）使学生模型能够利用记录的上下文进行序列生成。随后，Self-Forcing 在教师模型和学习到的评论家（critic）指导下，利用其自身生成的上下文对其进行训练。这有助于解决交互式推演过程中的误差累积问题。首个发布的学生模型在每个生成的块中使用四个去噪步骤。随后，我们通过两步调度进一步训练该学生模型，以产生第二个发布检查点。两步模型是单独训练的，而不仅仅是减少采样步骤的四步模型。较少的去噪步骤会带来更快的推理时间，但代价是视觉质量降低。这两个检查点都让开发者能够探索视觉质量与推理成本之间的平衡。

2.3 Streaming through FlashDreams
2.3 通过 FlashDreams 进行流式传输

FlashDreams supplies the accelerated streaming runtime. Long rollouts also require managing the model’s attention history. The Cosmos3-H-Dreams integration uses an adapted FadeMem module that consolidates the growing key/value cache during long rollouts. This complements Self-Forcing: distillation addresses how the model learns from its generated history, while cache consolidation addresses how that history is stored during streaming generation.

FlashDreams 提供了加速的流式运行时。长推演过程还需要管理模型的注意力历史。Cosmos3-H-Dreams 集成使用了改进的 FadeMem 模块，该模块在长推演过程中整合了不断增长的键/值缓存。这与 Self-Forcing 相辅相成：蒸馏解决了模型如何从其生成的历史中学习的问题，而缓存整合则解决了在流式生成过程中如何存储这些历史的问题。

### 3. Exploring Unseen Trajectories
### 3. 探索未见过的轨迹

During a clinical procedure there may be complications or some room for the surgeon to perform “novel” movements. Therefore, a simulator must be able to generalize beyond the training data, and produce coherent frames with unseen movements. The demonstrations below show Cosmos3-H-Dreams generating different cholecystectomy

在临床手术过程中，可能会出现并发症，或者外科医生有空间进行“新颖”的动作。因此，模拟器必须能够泛化到训练数据之外，并生成带有未见动作的连贯帧。下面的演示展示了 Cosmos3-H-Dreams 生成不同的胆囊切除术。