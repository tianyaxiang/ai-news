---
title: "I don't like passkeys"
originalUrl: "https://hawksley.dev/blog/i-dont-like-passkeys"
date: "2026-09-18T23:22:50.732Z"
---

# I don't like passkeys
# 我不喜欢通行密钥 (Passkeys)

For the past few years, the tech industry has kept pushing passkeys as the ultimate solution to logging in. Many Big Tech companies “helpfully” inform you every time you sign in how much easier and effortless passkeys are. The only way to make them stop is either to concede and set up a passkey or dig into the settings to find the off-switch. Google goes as far as to name the setting “Skip password when possible,” and Microsoft advertises that you should make your account passwordless.

过去几年里，科技行业一直在推崇通行密钥（Passkeys），将其视为登录问题的终极解决方案。许多大型科技公司在您每次登录时都会“热心”地提醒您，通行密钥是多么简单且省力。要让它们停止这种提醒，您要么妥协并设置一个通行密钥，要么深入设置菜单找到关闭选项。谷歌甚至将该设置命名为“尽可能跳过密码”，而微软则大力宣传您应该让账户实现“无密码化”。

Passkeys are a fantastic technology. Since they are bound to the site they are created for, they cannot be phished by a hacker’s fake login screen. If a site suffers a data breach, passkeys are asymmetric and cannot be recovered from the server-side details.

通行密钥是一项出色的技术。由于它们与创建它们的网站绑定，黑客无法通过伪造的登录页面进行钓鱼攻击。如果网站发生数据泄露，由于通行密钥是非对称的，黑客也无法从服务器端的数据中恢复出您的密钥。

This leads to passkeys being the perfect fit for a corporate environment, but a poor fit for personal security. To an individual, the greatest risks are instead permanent account lockout, automated account bans, and device loss. By using passkeys, you gain better security against man-in-the-middle attacks but face the higher probability scenario of losing access to your accounts.

这使得通行密钥非常适合企业环境，但对于个人安全而言却并不理想。对个人用户来说，最大的风险反而是永久性的账户锁定、自动化的账户封禁以及设备丢失。使用通行密钥，您确实增强了抵御中间人攻击的能力，但却面临着丢失账户访问权限这一更高概率的风险。

Phishing through the standard login flow is eliminated by passkeys, but it creates a false sense of security. An account’s security is still dictated by the weakest recovery method: SMS, email links, security questions, and so on. If these recovery methods aren’t enabled, then the risk of permanent lockout remains for the user.

通行密钥消除了通过标准登录流程进行的钓鱼攻击，但这产生了一种虚假的安全感。账户的安全性仍然取决于最薄弱的恢复方式：短信、电子邮件链接、安全问题等。如果未启用这些恢复方式，用户依然面临永久锁定的风险。

### Hardware keys
### 硬件密钥

By design, you cannot create a backup of passkeys on a hardware key: passkeys can only be added or deleted but never moved. Instead, you need to purchase 2-3 hardware keys and enroll every key for every site. This can quickly get expensive and doesn’t scale well as the number of accounts starts to grow.

从设计上讲，您无法在硬件密钥上备份通行密钥：通行密钥只能添加或删除，永远无法移动。因此，您需要购买 2-3 个硬件密钥，并为每个网站注册每一个密钥。随着账户数量的增加，这很快会变得昂贵，且扩展性不佳。

Hardware keys support discoverable credentials, where websites can query for your username instead of you typing it in. These are becoming increasingly popular amongst website developers, yet have limits of 25-100 accounts per hardware key, and top of the line keys can have up to 300. Once you exceed the limit, you must either delete some accounts or you have to buy another set of hardware keys.

硬件密钥支持“可发现凭据”（discoverable credentials），即网站可以查询您的用户名，而无需您手动输入。这在网站开发者中越来越受欢迎，但每个硬件密钥有 25 到 100 个账户的限制，顶级的密钥最多也只能存储 300 个。一旦超过限制，您要么必须删除一些账户，要么必须购买另一套硬件密钥。

### Synced passkeys
### 同步通行密钥

Both Apple and Google want your identity anchored to their operating systems. The “happy path” on their devices is to use their synced passkey management tied to your Apple or Google account. If their automated systems decide one day to ban your account, you irreversibly lose access to all your passkeys used across all third-party accounts too.

苹果和谷歌都希望将您的身份绑定在他们的操作系统上。在他们的设备上，“理想路径”是使用与您的 Apple 或 Google 账户绑定的同步通行密钥管理功能。如果他们的自动化系统某天决定封禁您的账户，您也将不可逆转地失去对所有第三方账户通行密钥的访问权限。

The FIDO alliance has been working to improve interoperability and make it easier to export passkeys, but the experience is still fragmented and inconsistent across providers. This is set to improve over the coming years, but currently it is too immature to rely on. Compare with a password, which is just a string you can easily export by hand if necessary.

FIDO 联盟一直致力于提高互操作性并简化通行密钥的导出，但目前的体验在不同提供商之间仍然碎片化且不一致。这种情况在未来几年会有所改善，但目前它还不够成熟，无法完全依赖。相比之下，密码只是一串字符，必要时您可以轻松手动导出。

### Third-party synced passkeys
### 第三方同步通行密钥

When storing passkeys in a password manager like Bitwarden or KeePassXC, you end up fighting the platform. Although operating systems have recently introduced APIs (like Android’s Credential Manager) for third-party tools to hook into, the experience remains fragmented and lacks the decades of UX polish towards password autofill. Autofill outside the browser and inside native applications remains especially inconsistent. In the future, I believe third-party passkeys will be the way forward, but we are not there yet.

当您将通行密钥存储在 Bitwarden 或 KeePassXC 等密码管理器中时，您最终会发现自己在与平台“作斗争”。尽管操作系统最近引入了 API（如 Android 的凭据管理器）供第三方工具接入，但体验仍然碎片化，缺乏密码自动填充功能那几十年的用户体验打磨。在浏览器之外和原生应用内部的自动填充功能尤其不稳定。我相信未来第三方通行密钥将是发展方向，但目前我们还没到那个阶段。

### When passkeys don’t work
### 当通行密钥失效时

Logging into accounts on devices you own is the ideal scenario for passkeys. When you have to handle a colleague’s computer, it gets much more inconvenient. You could plug in a hardware key, but you don’t always have access to the ports. You could sign in and use a synced passkey, but that involves trusting the computer to not leak all of your other passkeys. The last option is to use “Hybrid Transport,” where you scan a QR code and connect via Bluetooth simultaneously to the computer. Whilst this option is secure and works in theory, reality is plagued with edge-cases where connections fail or Bluetooth is straight-up unsupported.

在您自己的设备上登录账户是通行密钥的理想使用场景。当您需要操作同事的电脑时，情况就会变得非常不便。您可以插入硬件密钥，但您并不总能使用接口。您可以登录并使用同步通行密钥，但这涉及信任该电脑不会泄露您所有的其他通行密钥。最后一个选择是使用“混合传输”（Hybrid Transport），即扫描二维码并通过蓝牙同时连接到电脑。虽然这个选项在理论上是安全且可行的，但在现实中，它常因连接失败或蓝牙直接不支持等边缘情况而受阻。

### Passkeys aren’t ready yet
### 通行密钥尚未准备好

I believe enterprise users have good reason to use passkeys, but the ecosystem isn’t mature enough yet for individuals.

我认为企业用户有充分的理由使用通行密钥，但对于个人用户而言，生态系统还不够成熟。

Whilst TOTP codes have known phishing vulnerabilities, the recovery and lockout risks of passkeys pose a greater day-to-day risk to most people than an AiTM proxy. A combination of randomly generated passwords stored inside a third-party password manager, paired with an independent TOTP app, gives control to the user without giving up the flexibility of plain text. For users who previously reused passwords across all their sites, passkeys are a huge step-up. For everybody else, it is currently a step back.

虽然 TOTP（基于时间的一次性密码）验证码存在已知的钓鱼漏洞，但对于大多数人来说，通行密钥带来的恢复和锁定风险，比 AiTM（中间人攻击）代理带来的风险在日常生活中更大。将存储在第三方密码管理器中的随机生成密码与独立的 TOTP 应用结合使用，既能让用户掌握控制权，又不会失去纯文本密码的灵活性。对于之前在所有网站重复使用密码的用户来说，通行密钥是一个巨大的进步。但对于其他人来说，这目前是一种倒退。