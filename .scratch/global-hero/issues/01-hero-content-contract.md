# 01: Hero 内容契约与唯一 H1

**What to build:** 每个页面可以从同一份 Hero 契约拿到一个 H1、一段短页面说明，并按页面类型选择 `type.display` 或 `type.h1`。渲染结果在文档里只有一个 H1，H1 命名买方的任务或内容主题，而不是口号。

**Blocked by:** None（can start immediately）

**Status:** resolved

- [ ] Hero 渲染一个 H1，以及一段属于该页面的短说明；同一文档内不出现第二个 H1。
- [ ] 首页使用 `type.display` 字号（宽 60/64、窄 40/44，weight 650）；其他页面使用 `type.h1`（宽 48/54、窄 34/40，weight 650）。
- [ ] H1 命名买方任务或内容主题；产品页命名其平台；法律页与文章页不复用促销主张。
- [ ] 名称、说明或 H1 缺失时渲染失败（构建立即报错），不以空白标题或占位口号顶替。
- [ ] 文案不含未核实的产能、认证、市场覆盖、公司身份或产品结果主张。

## Comments

### Handoff — Alma 2026-11-01

- **做了什么**：建立共享 Hero 组件，负责单一 H1、页面说明与 `type.display` / `type.h1` 字号选择；标题或说明为空时抛错而不是渲染空白。
- **改了哪些文件**：`site/src/components/hero/hero.tsx`、`site/tests/int/hero.int.spec.ts`
- **证据**：`pnpm exec vitest run --config ./vitest.config.mts tests/int/hero.int.spec.ts` → 13 passed；`pnpm exec tsc --noEmit` 无错；`pnpm run lint` 无告警。
- **未做 / 有意留空**：Hero 文案本身由各 PageSpec 提供，本组件不写任何对外主张；品牌资产仍为 TBD。
- **下一步依赖**：解除 02 与 03 的阻塞。
