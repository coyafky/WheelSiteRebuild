# 04: 首页改用共享 Hero

**What to build:** 首页现有的内联首屏改成使用共享 Hero 组件，保留四平台速览与现有入口，页面仍然只有一个 H1，视觉与 Design.md 令牌一致。

**Blocked by:** 02: Hero 的一个主操作与可选次链接；03: Hero 媒体槽、占位与文字可读性

**Status:** resolved

- [ ] 首页首屏由共享 Hero 渲染；页面内只有一个 H1，主操作与次链接符合 Hero 契约。
- [ ] 首页 H1 使用 `type.display`；其他既有区块的标题层级不因此降级或重复。
- [ ] 首屏在 320、375、768、1024、1440 CSS px 与 200% 缩放下没有横向溢出，动作不被裁切。
- [ ] 四个平台速览仍在首屏内，且不引入未发布目的页链接。
- [ ] 减少动效偏好时 H1、说明与动作立即可见，不被动画延迟。
- [ ] 既有测试仍然通过；新增测试覆盖首页的单一 H1 与动作目的地。

## Comments

### Handoff — Alma 2026-11-01

- **做了什么**：首页首屏改为使用共享 Hero（`embedded` 模式嵌入既有首屏容器），保留四平台速览、`#platforms` / `#work-paths` 锚点跳转与一个 H1。
- **改了哪些文件**：`site/src/components/home/home-view.tsx`、`site/src/components/hero/hero.tsx`、`site/tests/int/hero.int.spec.ts`
- **证据**：
  - 单测 13 passed（含「首页只有一个 H1 且 sizeToken=type.display」「主操作 #platforms、次链接 #work-paths」「Hero 内不重复询盘收尾」「不链接未发布目的地」）。
  - 真实浏览器（`http://localhost:3001/`，headless chromium-1248）实测：320/375/768 字号 40 px，1024/1440 字号 60 px，全部 `h1Count=1`、`overflowX=0`、主次动作高度 44 px；真实 200% 缩放（720 CSS px 视口）`overflowX=0`、H1 未被裁切。
  - 截图：`.scratch/global-hero/evidence/hero-{320,375,768,1024,1440}.png`。
  - `pnpm exec tsc --noEmit` 通过；`pnpm run lint` 通过；`pnpm run test:int` 45 passed / 1 skipped，唯一失败仍是缺 PostgreSQL 的 `tests/int/api.int.spec.ts`（与基线一致，环境缺口非代码缺陷）。
- **未做 / 有意留空**：首页仍是 `noindex, nofollow` 的内部预览；首屏概念图未作为产品证据；四平台与轮毂子页链接仍受各自发布门禁控制。
- **下一步依赖**：无。首页共享 Hero 已就位，后续 PageSpec 可直接复用同一组件。
