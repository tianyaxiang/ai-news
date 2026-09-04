---
title: "Show HN: Open-Source eInk Bike Computer"
originalUrl: "https://opentrailpaper.com"
date: "2026-09-04T23:05:53.315Z"
---

# Show HN: Open-Source eInk Bike Computer
# Show HN：开源电子墨水屏自行车码表

LilyGO T5S3 4.7" E-Paper PRO↗ ESP32-S3 · 16 MB flash · 8 MB PSRAM · 960×540 e-paper · BLE 5
LilyGO T5S3 4.7 英寸电子墨水屏 PRO 版，搭载 ESP32-S3 芯片，配备 16MB 闪存、8MB PSRAM、960×540 分辨率电子墨水屏，并支持蓝牙 5.0。

### Supported Strengths
### 优势
A 4.7" e-paper panel that is readable in direct sunlight.
4.7 英寸电子墨水屏，在阳光直射下依然清晰可见。

An SD card slot for offline maps, routes, ride files and logs.
配备 SD 卡槽，可用于存储离线地图、路线、骑行文件和日志。

GPS, capacitive touch, a front light, battery and USB-C on one board.
单板集成了 GPS、电容触摸屏、前灯、电池接口和 USB-C 接口。

Bluetooth 5 for heart-rate, power and cadence sensors.
支持蓝牙 5.0，可连接心率、功率和踏频传感器。

Firmware can be installed from a desktop Chromium browser over USB.
固件可以通过桌面端 Chromium 内核浏览器通过 USB 直接安装。

### Tradeoffs
### 不足与权衡
No pressure sensor. There’s no barometric altimeter, so climbing is derived from elevation baked into the map tiles rather than measured — total ascent is an estimate.
没有压力传感器。由于缺乏气压高度计，爬升数据是根据地图瓦片中预设的海拔信息推算出来的，而非实时测量，因此总爬升高度仅为估算值。

Basic GPS. The receiver works, but a modern multi-band module would lock on faster and hold a fix better under tree cover or between buildings.
GPS 性能基础。接收器可以正常工作，但现代的多频段模块在树荫下或建筑物之间能更快锁定卫星并保持更稳定的定位。

No magnetometer. Without a compass the map can only orient from your direction of travel, so it can’t point the right way while you’re stopped.
没有磁力计。由于没有指南针，地图只能根据你的行进方向进行定向，因此当你停下时，它无法指示正确的朝向。

Measured baseline: about eight hours. A 1,500 mAh build ran for roughly 7.4 usable hours with the front light off. Power work is ongoing, so newer builds may differ.
实测续航：约 8 小时。在关闭前灯的情况下，1500 mAh 的电池版本大约可使用 7.4 小时。功耗优化工作仍在进行中，后续版本的续航可能会有所不同。

Weak hardware buttons. Most interaction goes through the touch panel, which is fiddly with winter gloves or in the rain.
硬件按键手感一般。大部分交互依赖触摸屏，在佩戴冬季手套或雨天使用时操作较为不便。

No waterproofing. The board ships bare with no seal or IP rating, so it needs a case or a bag of its own before you ride it in the wet.
不防水。该开发板出厂时为裸板，没有密封或 IP 防护等级，因此在雨天骑行前，必须为其配备外壳或保护袋。

Got a better board in mind? Suggestions and pull requests welcome.
有更好的开发板推荐吗？欢迎提出建议或提交 Pull Request。

### Help wanted
### 寻求帮助
A better target board would include a barometric altimeter, multi-band GPS, magnetometer, larger battery, usable hardware buttons and a weatherproof case. If you know of one, open an issue. Board ports are also welcome in the source repository.
理想的开发板应包含气压高度计、多频段 GPS、磁力计、更大容量的电池、好用的硬件按键以及防风雨外壳。如果你知道有符合条件的板子，请提交 Issue。同时也欢迎在源代码仓库中贡献其他开发板的移植版本。