# Agent 职责分工

本项目同时使用三个 agent：**Codex**、**Alma**、**Cursor**。仓库在 [`coyafky/WheelSiteRebuild`](https://github.com/coyafky/WheelSiteRebuild)。

规则层级：读写纪律以 [`AGENTS.md`](../../AGENTS.md) 为准；本文件只补充**分工**。Issue 与 ticket 格式见 [issue-tracker.md](issue-tracker.md)，状态字符串见 [triage-labels.md](triage-labels.md)。

## 核心原则：按 ticket 领取，不按技术层切

分工**不按「前端 / 后端」切**。一个 ticket 是 vertical slice（垂直切片），从页面到数据完整穿透；**谁领到就是一个人的活**。领到的人自己写组件、自己写数据读取、自己写 TDD 测试、自己提交。

按层切会造成三个问题：界面等人、数据等人、改一个字段要两个 agent 来回；而 vertical slice 领走即闭环，没有等待，也没有归属争议。

```
spec  →  tickets  →  【领取制：一 ticket 一人，端到端】  →  上线验收
Codex     Codex            Codex / Alma（自选）              Cursor
```

## 角色定位

| Agent | 定位 | 承担 |
| --- | --- | --- |
| **Codex** | 规划者 + 实现者 | 仓库探索、写 spec、拆 tickets、**领取并实现 ticket** |
| **Alma** | 实现者 + 前端专家 | **领取并实现 ticket**；因持有 `Design.md`、Preview 侧栏与浏览器截图能力，**涉及视觉与交互的 ticket 优先由 Alma 领** |
| **Cursor** | 验收者（不实现） | 上线验收：真实浏览器、视口矩阵、交互实测、UI 合理性 |

**唯一的技术倾向**（不是硬边界）：视觉、布局、交互状态、响应式相关的 ticket 优先给 Alma；Payload schema、迁移、部署配置相关的 ticket 优先给 Codex。这只是「谁更顺手」，不是「谁能碰」—— 领到就该做完。

**Cursor 不领实现 ticket。** 它不参与写码，所以在验收时没有「自己写的代码自己判卷」的偏差。

## 领取流程

1. **找 frontier**：按编号找最早的 `Status: ready-for-agent` 且 blocker 全部 `resolved` 的 ticket（见 [issue-tracker.md](issue-tracker.md) 的 Frontier 规则）。
2. **先 claim 再动手**：把 ticket 的 `**Status:**` 改成 `claimed`，并在文件底部 `## Comments` 写一行 `Claimed by <agent> at <date>`。**没 claim 就动手 = 会撞车。**
3. **在独立 worktree / branch 上做**：`git worktree add .worktrees/<ticket-slug> -b feat/<ticket-slug> <integration-branch>`。禁止直接在自己的主工作区改集成分支。
4. **TDD**：调用 `tdd` 技能，先写会失败的测试，再实现到绿。测试和实现是同一个人写的 —— 这是 TDD 的定义，不外包。
5. **合并回集成分支**：完成前先把集成分支的 tip 合进自己的 branch，解决冲突后跑通全部检查，再合并回集成分支并推送。
6. **勾选验收条款 + 写 handoff**，把 `**Status:**` 改成 `resolved`。

## Handoff 文档

每个 ticket 完成后，在 ticket 文件底部的 `## Comments` 下追加一段 handoff。这是**下一个 agent 唯一的交接凭证**——不靠对话，不靠记忆。

格式：

```markdown
## Comments

### Handoff — <agent> <date>

- **做了什么**：<一句话，对应 ticket 的 What to build>
- **改了哪些文件**：<路径列表；让下一个 agent 知道去哪看，而不是重新探索>
- **证据**：<测试命令 + 结果、截图路径、手工验证步骤>
- **未做 / 有意留空**：<明确写出 PROPOSED / TBD 项，不要沉默>
- **下一步依赖**：<哪些 ticket 因此解除了阻塞>
```

**不重复已有内容**：spec、ADR、commit diff 用路径或 commit hash 引用，不要复述正文。

## Git 管理

远端：`origin` = `https://github.com/coyafky/WheelSiteRebuild.git`

| 分支 | 用途 |
| --- | --- |
| `main` | 基线；只有可发布状态才合入 |
| `feat/<feature>` | 集成分支；一个 feature（如 `global-header-footer`）一条 |
| `feat/<ticket-slug>` | ticket 分支；一个 ticket 一条，从集成分支切出 |

规则：

- **一人一 ticket 一 branch 一 worktree**，避免并发时互相覆盖。
- 合并方向永远单向：`ticket branch → 集成分支 → main`。不横向合 ticket 分支。
- 每次向远端推送前先 `git fetch` 并确认集成分支没有新提交；有就先合进来。
- **不 force push 集成分支和 main**。
- 提交信息写**做了什么**（命令式，如 `Give every page one sourcing inquiry close`），不写「update」「fix」。
- `.worktrees/` 已在 `.gitignore`；`.next/`、`node_modules/`、`test-results/` 不提交。

## 并发与资源

三个 agent 可能同时工作，以下会被抢：

- `.next/`、`site/tsconfig.tsbuildinfo` —— **`npm run build` 类命令必须串行**，一次只跑一个。
- 端口 3000 / 3001 —— 用 `reuseExistingServer`，或各自指定 `PORT`。
- PostgreSQL 5433 —— 共享开发库；改动 schema 前先在 `## Comments` 说一声。

每个 agent 在自己的 worktree 里跑测试与构建，不要在多处同时 `build`。

## 已知冲突点

- **`site/src/navigation/route-registry.ts`**：14 条路由标 `published: true`，但除 `/` 外页面尚未实现。领第一个页面 ticket 的人先决定：先建占位路由，还是让 `published` 跟着真实页面走。否则链接可达性验收会大面积报红，而这不是页面缺陷。
- **`site/tests/e2e/frontend.e2e.spec.ts`**：断言首页标题为 `WheelSite build in progress`，但首页早已换成实现预览 —— 这是过期测试，由 Cursor 首次验收时修正。
- **`site/tests/int/api.int.spec.ts`**：需要 PostgreSQL，无库时失败。这是环境缺口不是代码缺陷；验收时须区分「环境未就绪」与「功能不通过」。
- **`site/AGENTS.md`**：由 `next dev` 自动重写，**不要手工改也不要在 diff 里纠结**。

## 「完成」的定义

按项目既有纪律：只有取得**本次任务的直接证据**才能标记完成。测试通过 ≠ 验收通过 ≠ 发布授权。Cursor 的验收结论写回 ticket 时，逐条对照 `- [ ]` 条款写「通过 / 不通过 + 证据位置」，不写笼统总结。
