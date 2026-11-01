# 代码模块与分支归属

本文件回答三个问题：**代码分成哪些模块**、**每个模块由哪条分支引入**、**当前还有哪些没上远程**。分工规则见 [roles.md](roles.md)，状态演进见 [NOW.md](../context/NOW.md)。

数据采集于 2026-11-01，全部由 `git` 命令读出，不含推测。分支清单以 `git for-each-ref refs/heads` 为准。

## 一、代码分层

应用根目录 `site/`。下表「`main` 上」一列记录的是**盘点时**（`30d2b32`）的状态；`main` 已于本轮快进到 `71534f0`，现在含共享 Header / Footer / 路由登记表，详见第三节。

| 层 | 路径 | 职责 | 在 `main` 上 |
| --- | --- | --- | --- |
| 页面路由 | `site/src/app/(frontend)/` | App Router 页面与布局 | 只有 `layout.tsx`、`page.tsx` |
| 后台路由 | `site/src/app/(payload)/` | Payload 管理后台与 API | ✅ 完整 |
| 组件 | `site/src/components/` | 见下节分层 | 盘点时只有 `home`、`ui`；现已含 `site-chrome`、`site-header`、`site-footer` |
| 导航登记 | `site/src/navigation/` | `route-registry.ts` 119 行（`main` 已有）；预览路由 39、面包屑链 49、文章链 31 仍只在 breadcrumb 分支 | ✅ `route-registry.ts` 已入 `main` |
| 内容模型 | `site/src/content/` | `home-model.ts` 首页平台模型 + `mock-blog-articles.ts` 模拟文章 | 只有 `home-model.ts` |
| 数据集合 | `site/src/collections/` | `Users`、`Media`、`ProductPlatforms` | ✅ 三个都在 |
| 数据读取 | `site/src/lib/` | `get-home-platforms.ts`、`utils.ts` | ✅ |
| 样式 | `site/src/app/globals.css` | Tailwind 4 主题令牌 | ✅ 68 行 |
| 测试 | `site/tests/` | `int/` 集成、`e2e/` Playwright | ✅ 骨架 |

### 组件分层

以下是 `feat/global-hero` 与 `feat/global-breadcrumb` 两条分支的对比。**各 22 个组件文件、各 6 个子目录，但内容不同** —— 两条分支各带一半新模块，互不含对方：

| 子目录 | 文件数 | 内容 | hero 分支 | breadcrumb 分支 |
| --- | --- | --- | --- | --- |
| `hero/` | 1 | `hero.tsx` 共享 Hero，255 行，单一 H1 契约 | ✅ | ❌ 没有此目录 |
| `home/` | 1 | `home-view.tsx`，首页装配（hero 251 行 / breadcrumb 268 行） | ✅ | ✅ |
| `site-chrome/` | 1 | `site-chrome.tsx`，Header + Footer + children 外壳，13 行 | ✅ | ✅ |
| `site-footer/` | 8 | 品牌、联系、链接组、认证条、语言切换、页脚 CTA、底栏、总装 | ✅ | ✅ |
| `site-header/` | 6 | 主导航、动作区、移动端抽屉、产品 mega menu、样式 | ✅ | ✅ |
| `site-breadcrumb/` | 1 | `site-breadcrumb.tsx`，76 行 | ❌ 没有此目录 | ✅ |
| `ui/` | 5 | shadcn/Radix 基础件：button、card、input、label、textarea | ✅ | ✅ |

**这是唯一仍待决的一条**：要合成完整站点，`feat/global-hero` 与 `feat/global-breadcrumb` **必须互合**，而两者都改过 `home-view.tsx`（251 vs 268 行）—— 合并时这里是真实的冲突点，不是快进合并。处置状态见第六节第 5 条。

## 二、模块归属：哪条分支带来了什么

六条本地分支都从当时的 `main`（`30d2b32`）切出。下表记录**盘点时**各模块由哪条分支引入；`main` 快进后，Header / Footer / 路由登记表已在 `main` 上。

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

**七条分支全部在远程，且 `main` 已不再是骨架。**

| 分支 | HEAD | 相对 `main` | 状态 |
| --- | --- | --- | --- |
| `main` | `71534f0` | 基准 | ✅ 已快进到集成分支，含 `route-registry.ts` 与全部共享组件 |
| `feat/global-header-footer` | `71534f0` | 落后 0 / 领先 0 | ✅ 与 `main` 同一提交 |
| `feat/header-03-products-mega-menu` | `45aef08` | 落后 1 / 领先 3 | ✅ 已推送，含 mega menu 与 ticket 记录 |
| `feat/footer-02-link-groups` | `a8c79dd` | 落后 3 / 领先 2 | ✅ 已推送，含链接组与 ticket handoff |
| `feat/global-hero` | 见 `origin/feat/global-hero` | 落后 1 / 领先 8 | ✅ 已推送（本文件在这条分支上，哈希随修订而变） |
| `feat/breadcrumb-01-preview-route-placeholders` | `8496ace` | 落后 1 / 领先 3 | ✅ 已推送 |
| `feat/global-breadcrumb` | `ef6fc5b` | 落后 1 / 领先 11 | ✅ 已推送 |

`git ls-remote` 与本地逐分支比对一致。仓库地址：`https://github.com/coyafky/WheelSiteRebuild.git`。

⚠️ **「落后」列是正常的。** `main` 刚刚快进了集成分支的修复，其余分支还没把这条修复合进来。下次动某条分支时先把 `main` 合进去即可，`roles.md` 的流程本来就要求推送前先合并集成分支。

⚠️ **推送与快进不等于全站可发布。** `main` 现在有共享 Header / Footer / Hero 骨架与路由登记表，但页面内容仍是占位，首页带 `noindex, nofollow`。完整站点还需要第 5 条的合并决策。

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

## 五、在途工作（已于本轮清零）

盘点时 `.worktrees/` 下 5 个工作树里只有 `header-03` 有未提交改动（+122 −14）。**这批改动已提交并合并，现在五个工作区全部干净。**

当时的改动内容：

| 文件 | 改动 |
| --- | --- |
| `site/src/components/site-header/products-mega-menu.tsx` | 从 `return null` 空壳做成注册表驱动的面板 |
| `site/src/components/site-header/primary-header.tsx` | disclosure 按钮与键盘交互 |
| `site/src/components/site-header/header.tsx` | 开合状态与关闭时机 |
| `site/tests/int/products-mega-menu.int.spec.ts` | 新增 7 例（此前该组件零测试） |

**当时判断对了一半**：正确指出这条分支 HEAD 落后集成分支两个提交（`5e209d9` 上 mega menu 只是空壳），但低估了合并代价 —— 实际合并时三个文件全部冲突，且暴露出四个真实缺陷（详见第六节第 9 条）。

后续分支 HEAD 见第三节。

## 六、盘点问题的处置结果

初版把这九条列成「待决」。2026-11-01 09:30–09:50 逐条实际处理完毕，下表是**处置结果**，不是待办。

| # | 问题 | 处置 |
| --- | --- | --- |
| 1 | `.alma-snapshots/`（21 MB）与 `.pnpm-store/` 未被忽略 | ✅ 已加进 `.gitignore`，`git check-ignore` 现判 `IGNORED` |
| 2 | `docs/agents/roles.md` 未被跟踪，但三处文档已链接它 | ✅ 已提交 |
| 3 | RAYONE 吸收说明与总 Spec 未被跟踪 | ✅ 已提交 |
| 4 | ticket 状态停在 `ready-for-agent` 而实现已完成 | ✅ footer ticket 02 与 header ticket 03 均改 `resolved` 并补 Handoff |
| 5 | `feat/global-hero` 与 `feat/global-breadcrumb` 无法自动合并 | ⏳ **仍待决** —— 这是合并策略选择，不是缺陷 |
| 6 | `route-registry.ts` 是全分支冲突热点 | ✅ 已从源头收敛：`main` 现在有它，新分支不再各自造 |
| 7 | `main` 上没有 `route-registry.ts` | ✅ `main` 已快进到 `71534f0`，登记表在 `main` 上 |
| 8 | `site/AGENTS.md` 由 `next dev` 自动重写 | ✅ 核实：文件自己写明「提交它反而让工作树保持干净」，且已入库、工作区无差异 |
| 9 | `.worktrees/header-03` 有未提交改动 | ✅ 已提交并合并集成分支，见下 |

### 第 9 条的详情：mega menu 从空壳到可用

`.worktrees/header-03` 那批未提交改动提交后（`45800ec`），跑测试发现 **7 个用例里 1 个是红的** —— 「路由变化时关闭」失败，因为 `header.tsx` 只监听 Escape 与 pointerdown，没监听路径变化。这是真实缺陷，不是测试写错。

合并集成分支时三个文件全部冲突，过程中又挖出三个真实缺陷：

1. **`Request a QuoteQuote`** —— `header-actions.tsx` 同时渲染桌面 span 与移动 span，`textContent` 会把两份拼起来。实测确认。现有 13 个 header 用例全用 `getByRole('link', { name: 'Request a Quote' })`，而 `aria-label` 恰好掩盖了可见文本问题，所以一直没暴露。**这条缺陷在集成分支 `60bdb15` 上也存在**，已单独在集成分支修复（`71534f0`）并补了带阴性对照的测试。
2. disclosure 按钮没有 Enter/Space 处理，键盘打不开。
3. 主导航用 `hidden lg:flex`，jsdom 不识别断点导致整条导航不可读。

### 第 6、7 条的连带效果

`main` 快进后，`route-registry.ts`、`site-chrome/`、`site-header/`、`site-footer/` 全部进入 `main`。**从此新切的分支都能直接拿到共享登记表**，这正是第 6 条「全分支冲突热点」的根因。

### 唯一仍待决的一条

第 5 条不是缺陷而是选择：`feat/global-hero` 与 `feat/global-breadcrumb` 各 22 个组件但内容互补，且都改过 `home-view.tsx`。要合成完整站点必须人工决定谁作主干、再解 `home-view.tsx` 与 `route-registry.ts` 的冲突。**这一步需要项目负责人拍板，不是自动化能定的。**

### 本轮验证方式

每项处置都有机器可读证据，不靠「看了一遍觉得对」：

- 各分支 `npx vitest run --config ./vitest.config.mts`、`tsc --noEmit`、`eslint` 实跑
- 重复文本缺陷做了**阴性对照**：回退实现后测试精确报 `expected 'Request a QuoteQuote' to be 'Request a Quote'`，恢复后转绿
- `main` 与集成分支已推送，`git ls-remote` 与本地逐分支比对一致
- 唯一未跑通的是 `api.int.spec.ts`，缺 Payload secret 与 PostgreSQL —— **这是 `roles.md` 已记录的环境缺口，不是代码缺陷**
