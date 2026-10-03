---
title: "Supabase is acquiring Turso"
originalUrl: "https://supabase.com/blog/supabase-is-acquiring-turso"
date: "2026-10-03T00:33:54.365Z"
---

# Supabase is acquiring Turso
# Supabase 收购 Turso

AI is enabling builders to create an immense amount of software. Today, agents are spinning up millions of databases to power the prototypes, explorations, dashboards, and apps they're building. This new pattern, at this massive scale, requires an evolution in database infrastructure. Turso is joining Supabase to build this evolution. For existing users, nothing changes. Supabase will continue building around Postgres, while Turso will continue its work on SQLite. And together, we’re creating something new that will bring the Supabase experience to every agent.

人工智能正在赋能开发者创造海量的软件。如今，AI 智能体（Agents）正在创建数以百万计的数据库，以支持它们所构建的原型、探索性项目、仪表盘和应用程序。这种大规模的新模式要求数据库基础设施必须进行演进。Turso 正加入 Supabase 以共同推动这一演进。对于现有用户，一切保持不变。Supabase 将继续围绕 Postgres 进行构建，而 Turso 将继续其在 SQLite 领域的工作。我们将携手创造全新的事物，将 Supabase 的体验带给每一个智能体。

### Databases for agents
### 面向智能体的数据库

Supabase is already launching over one million databases per week. As agents build more software, we believe database demand will outpace the world’s current capacity to support them. So we need infrastructure that can scale to meet this growth and is suited to how we build with agents. Agents should be able to create a database as easily as creating a file, with just as little concern about cost. For smaller workloads, that shouldn’t require provisioning a dedicated machine every time. Databases should be cheap to create, available on demand, and have a clear path to production when needed. SQLite is well suited to these small, on-demand workloads. Postgres is what you want as your application scales. We want builders to have the same developer experience from prototyping to production.

Supabase 每周已经启动超过一百万个数据库。随着智能体构建更多的软件，我们相信数据库的需求将超过目前全球的承载能力。因此，我们需要能够扩展以满足这种增长的基础设施，并适应我们使用智能体进行构建的方式。智能体应该能够像创建文件一样轻松地创建数据库，且无需过多担心成本。对于较小的工作负载，不应该每次都需要配置一台专用机器。数据库的创建成本应该低廉，能够按需获取，并在需要时拥有通往生产环境的清晰路径。SQLite 非常适合这些小型、按需的工作负载，而 Postgres 则是应用程序扩展时的首选。我们希望开发者从原型设计到生产环境都能拥有始终如一的开发体验。

### Turso
### 关于 Turso

Turso has built an architecture for exactly this pattern. They rebuilt SQLite in Rust and created a cloud platform where a single server can manage millions of databases, loading them when needed and suspending them when they’re not. This architecture makes it possible to provision a database for each agent on demand, whether on Turso Cloud or in customers’ own clouds, as Superhuman, Sauna.ai, CTO.new, and Mastra do. We share a vision for how infrastructure needs to evolve to support agentic AI. Turso will continue operating, with a clear path into the broader Supabase ecosystem as workloads grow.

Turso 正是为这种模式构建了架构。他们使用 Rust 重构了 SQLite，并创建了一个云平台，使得单台服务器能够管理数百万个数据库，在需要时加载它们，在闲置时挂起它们。这种架构使得为每个智能体按需配置数据库成为可能，无论是在 Turso Cloud 还是在客户自己的云环境中（如 Superhuman、Sauna.ai、CTO.new 和 Mastra 所做的那样）。我们对于基础设施如何演进以支持智能体 AI 拥有共同的愿景。Turso 将继续运营，并随着工作负载的增长，拥有进入更广泛 Supabase 生态系统的清晰路径。

### Open source
### 开源

Turso and Supabase have a lot in common: a commitment to open source, a focus on developer experience, and an appetite to tackle hard infrastructure problems. We’re excited to welcome Glauber Costa and Pekka Enberg to Supabase with the rest of the Turso team. Glauber will lead this agentic infrastructure effort. Our mission is to store the world’s data, and agents are going to create a lot more of it. This gets us closer to that goal.

Turso 和 Supabase 有许多共同点：对开源的承诺、对开发者体验的关注，以及解决复杂基础设施问题的渴望。我们很高兴欢迎 Glauber Costa、Pekka Enberg 以及 Turso 团队的其他成员加入 Supabase。Glauber 将领导这项智能体基础设施工作。我们的使命是存储世界上的数据，而智能体将创造更多的数据。这次收购让我们离这一目标更近了一步。