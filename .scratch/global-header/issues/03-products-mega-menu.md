# 03: Products 文字优先 mega menu

**What to build:** 在桌面宽度，采购者点击 Products 文字进入产品总览；点击旁边的按钮才展开四个产品平台和 View All Products。菜单是一组文字链接，悬停不会打开，打开时也不改变地址。

**Blocked by:** 02: 每页粘性主导航

**Status:** ready-for-agent

- [ ] Products 文字进入 `/products`。相邻按钮展开面板且不改变 URL。面板恰好含 Wheels、EV Housings、Custom Aluminum、Safety Tires 和 View All Products，路径与路由登记一致。
- [ ] 仅点击、Enter 或 Space 可打开。悬停只改变视觉反馈。
- [ ] Tab 按逻辑顺序进入链接。Escape、再次激活按钮、点击外部都会关闭面板并更新 `aria-expanded`。Escape 把焦点还给 Products 按钮。
- [ ] 面板是导航链接的展开区，不使用菜单角色，也不要求方向键导航。它位于主导航行下方、内容容器内，四个产品平台都可见。
- [ ] 宽度降到 1024 CSS px 以下或发生路由变化时，面板和焦点陷阱被清掉。
