# 代码模块与分支归属

本文件回答三个问题：**代码分成哪些模块**、**每个模块由哪条分支引入**、**当前还有哪些没上远程**。分工规则见 [roles.md](roles.md)，状态演进见 [NOW.md](../context/NOW.md)。

数据采集于 2026-11-01，全部由 `git` 命令读出，不含推测。分支清单以 `git for-each-ref refs/heads` 为准。

## 一、代码分层

应用根目录 `site/`。`main` 上是骨架，具体模块由各 feature 分支引入。

| 层 | 路径 | 职责 | 在 `main` 上 |
| --- | --- | --- | --- |
| 页面路由 | `site/src/app/(frontend)/` | App Router 页面与布局 | 只有 `layout.tsx`、`page.tsx` |
| 后台路由 | `site/src/app/(payload)/` | Payload 管理后台与 API | ✅ 完整 |
| 组件 | `site/src/components/` | 见下节分层 | 只有 `home`、`ui` |
| 导航登记 | `site/src/navigation/` | 路由登记 127 行、预览路由 39、面包屑链 49、文章链 31，共 4 文件 246 行 | ❌ 整个目录不存在 |
| 内容模型 | `site/src/content/` | `home-model.ts` 首页平台模型 + `mock-blog-articles.ts` 模拟文章 | 只有 `home-model.ts` |
| 数据集合 | `site/src/collections/` | `Users`、`Media`、`ProductPlatforms` | ✅ 三个都在 |
| 数据读取 | `site/src/lib/` | `get-home-platforms.ts`、`utils.ts` | ✅ |
| 样式 | `site/src/app/globals.css` | Tailwind 4 主题令牌 | ✅ 68 行 |
| 测试 | `site/tests/` | `int/` 集成、`e2e/` Playwright | ✅ 骨架 |

### 组件分层

`feat/global-hero` 与 `feat/global-breadcrumb` **各 22 个组件文件、各 6 个子目录，但内容不同** —— 两条分支各带一半新模块，互不含对方：

| 子目录 | 文件数 | 内容 | hero 分支 | breadcrumb 分支 |
| --- | --- | --- | --- | --- |
| `hero/` | 1 | `hero.tsx` 共享 Hero，255 行，单一 H1 契约 | ✅ | ❌ 没有此目录 |
| `home/` | 1 | `home-view.tsx`，首页装配（hero 251 行 / breadcrumb 268 行） | ✅ | ✅ |
| `site-chrome/` | 1 | `site-chrome.tsx`，Header + Footer + children 外壳，13 行 | ✅ | ✅ |
| `site-footer/` | 8 | 品牌、联系、链接组、认证条、语言切换、页脚 CTA、底栏、总装 | ✅ | ✅ |
| `site-header/` | 6 | 主导航、动作区、移动端抽屉、产品 mega menu、样式 | ✅ | ✅ |
| `site-breadcrumb/` | 1 | `site-breadcrumb.tsx`，76 行 | ❌ 没有此目录 | ✅ |
| `ui/` | 5 | shadcn/Radix 基础件：button、card、input、label、textarea | ✅ | ✅ |

**这是本次盘点最重要的一条结论**：要合成完整站点，`feat/global-hero` 与 `feat/global-breadcrumb` **必须互合**，而两者都改过 `home-view.tsx`（251 vs 268 行）—— 合并时这里是真实的冲突点，不是快进合并。

## 二、模块归属：哪条分支带来了什么

六条本地分支都从 `main`（`30d2b32`）切出。**`main` 之外的每个模块只能靠分支合入才能上线** —— 当前 `main` 只有骨架。

| 模块 | 引入分支 | 该分支代码增删 | 说明 |
| --- | --- | --- | --- |
| `site-chrome/` | `feat/global-header-footer` | 24 files, +1398 −38 | 页面外壳，把 Header 与 Footer 串进 `layout.tsx` |
| `site-header/`（6 文件） | `feat/global-header-footer` | 同上 | 主导航、抽屉、mega menu 一次建齐 |
| `site-footer/`（8 文件） | `feat/global-header-footer` | 同上 | 八个页脚部件一次建齐 |
| `site-footer/footer-link-groups.tsx` 改造 | `feat/footer-02-link-groups` | 21 files, +914 −5 | 链接组指向已批准的产品、能力与公司页 |
| `route-registry.ts` | 共享底座 `f8db2d4` | +119 | 全站导航与发布开关的唯一来源；被六条分支全部包含 |
| `hero/` | `feat/global-hero` | 26 files, +1972 −68 | 共享 Hero，含 13 项单测 |
| `(frontend)/[...slug]/page.tsx` | `feat/global-breadcrumb` | 32 files, +2079 −38 | 22 条路由的预览占位页 |
| `site-breadcrumb/` | `feat/global-breadcrumb` | 同上 | 面包屑，76 行 |
| `navigation/preview-route-registry.ts` | `feat/global-breadcrumb` | 同上 | 22 条路由的预览解析，39 行 |
| `navigation/breadcrumb-trail.ts` | `feat/global-breadcrumb` | 同上 | 面包屑层级推导，49 行 |
| `navigation/blog-article-trail.ts` | `feat/global-breadcrumb` | 同上 | 文章页层级，31 行 |
| `content/mock-blog-articles.ts` | `feat/global-breadcrumb` | 同上 | 模拟文章数据，23 行 |
| `site-header/products-mega-menu.tsx` | 共享底座 `b10560c` | — | 初版随 header-02 落地；**真正的 mega menu 实现还没提交**，见第六节 |
| `(frontend)/layout.tsx` | `feat/global-header-footer` | +1 处 | 引入 `SiteChrome` |

### 分支拓扑（实测的包含关系）

`git merge-base --is-ancestor` 逐对验证的结果：

```
main (30d2b32)
 └─ 5e209d9  ← 六条分支的共同底座（当前是 feat/header-03 的 HEAD）
     ├─ 60bdb15  feat/global-header-footer  ← 已推远程
     │   ├─ f09bffb  feat/global-hero
     │   └─ 8496ace  feat/breadcrumb-01-preview-route-placeholders
     │       └─ ef6fc5b  feat/global-breadcrumb
     └─ b87468b  feat/footer-02-link-groups
```

- `5e209d9` 被**全部六条分支**包含 → 是所有分支的事实底座。它的提交信息是 `Merge branch 'feat/header-02-sticky-primary-header' into feat/global-header-footer`，但实际成了 header-03 分支的 HEAD。
- `60bdb15` 被 header-footer、global-hero、breadcrumb-01、global-breadcrumb 包含，**但不被 footer-02 包含** —— footer-02 从 `5e209d9` 直接切出，`b87468b` 是它唯一的独有提交。
- `feat/global-breadcrumb` 领先 `main` 24 个提交，是当前最完整的分支。
- `feat/global-hero` 与 `feat/footer-02-link-groups` **互不含对方**，两条是平行的。
- **`feat/global-hero` 与 `feat/global-breadcrumb` 也互不含对方** —— hero 有 `components/hero/`，breadcrumb 有 `components/site-breadcrumb/`，两者都改过 `home-view.tsx`。这两条是「各自最完整但都缺对方的核心模块」，合并必然冲突。

## 三、远程同步状态

**七条分支全部在远程。** 盘点开始时远程只有 `main` 与 `feat/global-header-footer`，其余五条从未推送；本次已全部推上。

| 分支 | 本地 HEAD | 远程 | 领先 main | 状态 |
| --- | --- | --- | --- | --- |
| `main` | `30d2b32` | `30d2b32` | 0 | ✅ 同步 |
| `feat/global-header-footer` | `60bdb15` | `60bdb15` | 13 | ✅ 同步 |
| `feat/header-03-products-mega-menu` | `5e209d9` | `5e209d9` | 11 | ✅ 已推送（但落后集成分支两提交，见第五节） |
| `feat/footer-02-link-groups` | `b87468b` | `b87468b` | 12 | ✅ 已推送 |
| `feat/global-hero` | 见 `origin/feat/global-hero` | 同步 | — | ✅ 已推送（含本次文档提交） |
| `feat/breadcrumb-01-preview-route-placeholders` | `8496ace` | `8496ace` | 16 | ✅ 已推送 |
| `feat/global-breadcrumb` | `ef6fc5b` | `ef6fc5b` | 24 | ✅ 已推送 |

`git push --dry-run` 与真实推送均实测通过，凭证与连通性正常。仓库地址：`https://github.com/coyafky/WheelSiteRebuild.git`。

`feat/global-hero` 的哈希随每次文档修订而变（本文件本身就在这条分支上），故不写死值，取 `git rev-parse origin/feat/global-hero` 为准。

⚠️ **推送不等于合入。** 七条分支各自独立，`main` 仍是骨架；完整站点需要人工作合并决策（见第六节第 5 条）。

## 四、Agent 归属证据

**提交作者全部是 `coyaFky <2233606771@qq.com>`（唯一作者）** —— 无法从 `git log` 的 author 字段区分 agent。归属只能从 ticket 与提交信息读。

| 证据来源 | 能证明什么 |
| --- | --- |
| `.scratch/global-hero/issues/0{1..4}.md` 的 `### Handoff — Alma` | Hero 四个 ticket 由 **Alma** 实现 |
| `.scratch/global-hero/issues/03-hero-media-slot.md` 的 `### Code review response — Alma` | 记录了 `Cursor` 提的 3 条 Spec 意见，Alma 逐条运行时核对 |
| `.scratch/global-breadcrumb/issues/0{1..6}.md` 的 `Claimed by Codex at 2026-11-01` | Breadcrumb 六个 ticket 由 **Codex** 认领 |
| 9 个提交带 `Co-authored-by: Cursor <cursoragent@cursor.com>` | Cursor 参与了这些提交（含 `main` 的 `30d2b32`） |
| `NOW.md` 中「对 Cursor 提出的 6 条意见逐条运行时验证」 | Cursor 的验收意见已进入记录 |

### 未能归属的部分（如实标注）

- **`feat/global-header-footer`、`feat/footer-02-link-groups`、`feat/header-03-products-mega-menu` 的 ticket 里没有任何 `## Comments`，也没有 Handoff 或 Claimed by。** 这三个模块是谁写的，仓库里没有证据。
- 9 个 Cursor 署名提交中，`main` 的基线提交 `30d2b32` 也带该署名 —— 说明这是工具默认附加，**不能单独作为「Cursor 实现了这段代码」的证明**。
- 结论：**Hero = Alma（有 handoff）｜ Breadcrumb = Codex（有 claim）｜ Header/Footer/Mega-menu = 未记录**。

## 五、未提交的在途工作

盘点时 `.worktrees/` 下 5 个工作树里，**只有 `header-03` 有未提交改动**，其余四个工作区干净。

`.worktrees/header-03` 的三处修改 + 一个新测试文件（共 +122 −14），是对已有 mega menu 的**重构与测试补齐**：

| 文件 | 改动 |
| --- | --- |
| `site/src/components/site-header/products-mega-menu.tsx` | 30 行 → 44 行：导出 `productsMegaMenuId`、`open` 改为可选、加焦点可见样式、平台与总览变量语义调换 |
| `site/src/components/site-header/primary-header.tsx` | +52，挂载入口与交互 |
| `site/src/components/site-header/header.tsx` | +39，容器配合 |
| `site/tests/int/products-mega-menu.int.spec.ts` | 新增测试（此前无 mega menu 单测） |

**注意这条分支的 HEAD 是旧的**：`feat/header-03-products-mega-menu` 的 HEAD `5e209d9` 比已推送的 `60bdb15` 落后两个提交（`496979c`、`60bdb15`），**没合过 global-header-footer 的后续进展**。而 `60bdb15` 上的 mega menu 已经是可用的 30 行实现（`5e209d9` 上只有 `return null` 的空壳）—— 所以这条分支**即使推送了，内容也落后于集成分支**。

正确做法：先提交工作树的改动，再把 `60bdb15` 合进来，跑通检查后才算完成。

## 六、待决的仓库结构问题

盘点时发现的、需要仓库层面而不是代码层面处理的事：

1. **`.alma-snapshots/`（21 MB）未被忽略** —— `git check-ignore` 判定 `TRACKABLE`。它是 Alma 的版本快照目录，一旦误提交会把 21 MB 塞进历史。同类：`.pnpm-store/`（含 5 个 `v11/projects/*` 二进制索引）。
2. **`docs/agents/roles.md` 未被跟踪** —— 而 `AGENTS.md`、`PROJECT_INDEX.md`、`NOW.md` 三处都已加了指向它的链接。**已提交的文档指向一个不在仓库里的文件。**
3. **`.scratch/rayone-research-adoption/spec.md`、`docs/01-design/RAYONE_RESEARCH_ADOPTION.md` 未被跟踪** —— 同样已被 `NOW.md` 与 `PROJECT_INDEX.md` 引用。
4. **ticket 状态与实际实现不一致**：`feat/footer-02-link-groups` 已提交「给页脚加链接组」，但 `.scratch/global-footer/issues/02-footer-link-groups.md` 的 `Status:` 仍是 `ready-for-agent`；`feat/header-03-products-mega-menu` 的 mega menu 已实现，ticket `03` 同样是 `ready-for-agent`。按 `roles.md` 的流程，完成应改 `resolved` 并写 handoff。
5. **`feat/global-hero` 与 `feat/global-breadcrumb` 无法自动合并** —— 两条各 22 个组件但内容互补（hero vs breadcrumb），且都改过 `home-view.tsx`（251 / 268 行）。任何「合并所有分支」的动作必须先定谁作主干、再人工解 `home-view.tsx` 与 `route-registry.ts` 的冲突。
6. **`route-registry.ts` 是全分支冲突热点** —— 六条分支里五条都改了它（+119 或 +127 行）。`roles.md` 已把它列为已知冲突点，但实际冲突范围比记录的更大。
7. **`main` 上没有 `route-registry.ts`** —— 它在 `5e209d9` 才出现。任何从 `main` 新切的分支都拿不到这份共享登记表。
8. **`site/AGENTS.md` 由 `next dev` 自动重写** —— 已在 `roles.md` 标注，不要手改。
9. **`.worktrees/` 有 5 个活动工作树**，其中 `.worktrees/header-03` 有未提交改动（3 个 modified + 1 个未跟踪测试文件）。
