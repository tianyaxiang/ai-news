---
title: "Jev-Leftpad"
originalUrl: "https://github.com/f/jev-leftpad"
date: "2026-09-22T00:11:50.911Z"
---

# Jev-Leftpad

jev-leftpad
Jev-Leftpad 是一个使用 Jev 来填充数值左侧空格的库。这可以用 `padStart()` 一行代码实现吗？是的。它需要调用模型吗？不需要。但无论如何：

```bash
npm install jev-leftpad
```

```javascript
import leftPad from 'jev-leftpad';
const result = await leftPad('jev', 8);
console.log(JSON.stringify(result)); // "     jev" (大概是这样)
```

在使用前请先设置 `TYPESAFE_API_KEY`。jev-leftpad 通过 TypeSafe 的原生 `@typesafe-ai/sdk` 使用 `jev-latest` 模型。它要求 Node.js 20 或更高版本。

### API
`await leftPad(value, targetLength)`
`targetLength` 必须是一个非负的安全整数。Jev 会获得一个包含多个选项的 Choice，这些选项的准则被命名为 `space_0`、`space_1`、`space_2`，以此类推，直接写到 `space_10`。对于上面的例子，它应该选择 `space_5`。JavaScript 读取该数字，创建五个空格，并将数值放在它们后面。这意味着该包可以添加 0 到 10 个空格。如果需要超过 10 个空格，Jev 就没有正确的选项。这对于本项目来说感觉很“合适”。

每次调用都会发起一次 TypeSafe API 请求，且禁用了重试机制。请求可能会失败，Jev 可能会选错选项，而且它比 `padStart()` 的成本更高。请不要在生产环境中使用它。或者任何重要的地方。

### 开发
```bash
npm install
npm test
```
测试用例模拟了 Jev。它们不需要 API 密钥，也不会消耗任何 TypeSafe 点数。

### 许可证
MIT