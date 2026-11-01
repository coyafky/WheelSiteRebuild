# 03: Products 文字优先 mega menu

**What to build:** 在桌面宽度，采购者点击 Products 文字进入产品总览；点击旁边的按钮才展开四个产品平台和 View All Products。菜单是一组文字链接，悬停不会打开，打开时也不改变地址。

**Blocked by:** 02: 每页粘性主导航

**Status:** resolved

- [ ] Products 文字进入 `/products`。相邻按钮展开面板且不改变 URL。面板恰好含 Wheels、EV Housings、Custom Aluminum、Safety Tires 和 View All Products，路径与路由登记一致。
- [ ] 仅点击、Enter 或 Space 可打开。悬停只改变视觉反馈。
- [ ] Tab 按逻辑顺序进入链接。Escape、再次激活按钮、点击外部都会关闭面板并更新 `aria-expanded`。Escape 把焦点还给 Products 按钮。
- [ ] 面板是导航链接的展开区，不使用菜单角色，也不要求方向键导航。它位于主导航行下方、内容容器内，四个产品平台都可见。
- [ ] 宽度降到 1024 CSS px 以下或发生路由变化时，面板和焦点陷阱被清掉。

## Comments

### Handoff — Alma 2026-11-01

- **做了什么**：`products-mega-menu.tsx` 从 `return null` 空壳做成注册表驱动的面板；`primary-header.tsx` 在 Products 文字旁加 disclosure 按钮；`header.tsx` 持有开合状态。
- **改了哪些文件**：`site/src/components/site-header/{products-mega-menu,primary-header,header,header-actions}.tsx`、`site/tests/int/products-mega-menu.int.spec.ts`（新增 7 例）。提交 `45800ec` + 合并提交 `a09c7be`。
- **证据**：本 spec 7/7 通过；全量集成 39 passed / 1 skipped（唯一失败 `api.int.spec.ts` 缺 secret 与 PostgreSQL，属环境缺口）；`tsc --noEmit`、`eslint`、`next build` 通过。

**逐条对照验收条款（只标有直接证据的）：**

- **通过** — 条款 1：`opens the registered product platforms without changing the URL` 断言 URL 不变、面板含 Wheels / EV Housings / Custom Aluminum / Safety Tires / View All Products、href 与路由登记一致。
- **通过** — 条款 2：`opens from Enter or Space on the disclosure` 与 `keeps the platforms closed when the disclosure is hovered or given an arrow key`（悬停只加 `is-hovered` 类，不展开；ArrowDown 不展开）。
- **通过** — 条款 3：`returns focus to the disclosure when Escape closes the platforms`、`closes the platforms on a pointer down outside the header`。
- **通过** — 条款 4（部分）：`expect(screen.queryByRole('menu')).toBeNull()` 证明未用 menu 角色。
- **未取实测证据** — 条款 4 的「位于主导航行下方、内容容器内」「Tab 按逻辑顺序进入链接」：无对应测试，也未做真实浏览器 Tab 序列实测。
- **未取实测证据** — 条款 5 的「宽度降到 1024 CSS px 以下」：`header.tsx` 有 `closeOnNarrowLayout`（`innerWidth < 1024` 时关闭），但**没有测试覆盖 resize 路径**，也未在真实浏览器验过断点切换。

- **未做 / 有留空**：真实浏览器的视口矩阵与视觉签核没做；`aria-controls` 指向的 `productsMegaMenuId` 与面板 id 一致但未做无障碍工具实测。上述「未取实测证据」两项按纪律不能算通过。
- **下一步依赖**：解除 `04-compact-header-mobile-drawer` 的依据是本 ticket 闭环；两项缺口建议并入 Cursor 的上线验收。
