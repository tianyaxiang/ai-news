---
title: "Claude Session URL appended to commit messages and PR descriptions by default"
originalUrl: "https://github.com/anthropics/claude-code/issues/66504"
date: "2026-08-30T23:36:19.588Z"
---

### Claude Session URL appended to commit messages and PR descriptions by default
### 默认在提交信息和 PR 描述中附加 Claude 会话链接

**Problem Statement**
Every commit message and PR description created by Claude Code automatically includes a session URL at the bottom (e.g. https://claude.ai/code/session_...). There is no opt-in prompt, no warning, and no mention of it during onboarding. Users only discover it after it's already polluting their git history.

**问题陈述**
由 Claude Code 创建的每一条提交信息（commit message）和 PR 描述都会在底部自动包含一个会话 URL（例如 https://claude.ai/code/session_...）。系统既没有提供加入选项（opt-in），也没有任何警告，更未在引导过程中提及。用户往往是在该链接已经“污染”了 Git 历史记录后才发现这一行为。

**Proposed Solution**
Make the session URL attribution opt-in — don't include it unless the user explicitly enables it. A one-time prompt during onboarding ("Would you like to include a link back to this Claude session in commit messages?") would be the ideal UX.

**建议解决方案**
将会话 URL 的归属信息改为“加入式”（opt-in）——除非用户明确启用，否则不应包含该链接。在引导过程中设置一次性提示（例如：“您是否希望在提交信息中包含指向此 Claude 会话的链接？”）将是理想的用户体验。

**Alternative Solutions**
Keep it opt-out but make the setting discoverable — show it during first commit with a "Don't add this again" option. Remove it entirely and rely only on the existing `Co-Authored-By: Claude` trailer for attribution.

**替代方案**
保持“退出式”（opt-out）但提高设置的可见性——在首次提交时显示该选项，并提供“不再添加”的选项。或者完全移除该功能，仅依赖现有的 `Co-Authored-By: Claude` 尾注来进行归属说明。

**Use Case Example**
A developer uses Claude Code to build a feature, commits the work, and opens a PR. Their teammates and open source contributors see https://claude.ai/code/session_... at the bottom of every commit and PR description. It looks unprofessional, clutters history, and the developer had no idea it was being added.

**用例示例**
一名开发者使用 Claude Code 构建功能、提交代码并开启了一个 PR。他们的团队成员和开源贡献者会在每一条提交和 PR 描述的底部看到 https://claude.ai/code/session_...。这看起来很不专业，且干扰了历史记录，而开发者本人此前完全不知道这些内容被自动添加了。

**Additional Context**
The `attribution.commit: ""` setting in `.claude/settings.json` can suppress it, but it's completely undiscovered. A commit-msg git hook can also strip it, but it doesn't always fire reliably in remote/cloud environments.

**补充背景**
虽然可以通过 `.claude/settings.json` 中的 `attribution.commit: ""` 设置来禁用该功能，但该设置极其隐蔽，用户很难发现。此外，虽然可以使用 `commit-msg` 的 Git Hook 来剔除这些链接，但在远程或云端环境中，该 Hook 并不总是能可靠地触发。