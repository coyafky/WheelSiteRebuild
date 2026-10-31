# 02: Hero 的一个主操作与可选次链接

**What to build:** Hero 至多呈现一个主操作和一个可选的次链接。主操作在键盘上可达、满足最小控件高度，并在询盘为目的时使用 Inquiry CTA 契约的目的地和标签。Hero 自身不编造产品上下文。

**Blocked by:** 01: Hero 内容契约与唯一 H1

**Status:** resolved

- [ ] 最多一个主操作；一个可选次链接；不渲染第二个填充红色动作。
- [ ] 作用域内每个动作都有描述目的地的可见标签，指向真实规范路径，不使用 `#` 占位或纯点击处理器。
- [ ] 询盘目的地由路由登记解析为 `/request-quote`，标签取自登记；不在 Hero 内另维护第二份 URL 清单。
- [ ] 主操作至少 44 CSS px 高，键盘可达且有可见焦点；触摸可用，不依赖悬停。
- [ ] 窄宽度下动作不被隐藏，与文字一起纵向堆叠。

## Comments

### Handoff — Alma 2026-11-01

- **做了什么**：Hero 支持至多一个主操作（填充红按钮）和一个可选次链接；目的地可选共享路由 id（经 `requireNavigationRoute` 解析、未发布即抛错）或页内 `#section` 锚点。
- **改了哪些文件**：`site/src/components/hero/hero.tsx`、`site/tests/int/hero.int.spec.ts`
- **证据**：测试覆盖「恰好一个 default 变体按钮」「`/request-quote` 与 `/how-we-work` 由登记解析」「未发布路由抛错」；实测按钮高度 44 px（320/375/768/1024/1440 均 44）。
- **阴性对照**：临时移除 `route.published` 守卫后，`refuses an action whose route is not published` 确实转红，证明该断言有效。
- **未做 / 有意留空**：Hero 不预填任何产品上下文；带上下文的询盘跳转属 RFQ 与 Inquiry CTA 的范围。
- **下一步依赖**：解除 04 的阻塞（与 03 共同）。
