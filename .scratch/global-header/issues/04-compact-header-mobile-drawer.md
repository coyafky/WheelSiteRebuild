# 04: 窄屏 Header 与移动抽屉

**What to build:** 宽度低于 1024 CSS px 时，采购者仍能看到品牌、询盘和菜单。打开抽屉后，四个产品平台直接可见；Engineering 总览可见，两条产品线能力默认收起。键盘和触摸都能完成打开、展开和关闭。

**Blocked by:** 02: 每页粘性主导航

**Status:** ready-for-agent

- [ ] 在 320、375 和 768 CSS px，紧凑 Header 显示品牌、可见的 Quote 和有名字的菜单按钮。Quote 的可访问名称是 Request a Quote，并进入 `/request-quote`。页面不因 Header 横向滚动，主要控件至少 44 × 44 CSS px。320 CSS px 时先限制品牌宽度，再保留操作目标。
- [ ] 新打开的抽屉立即显示 Products 总览和四个产品平台。Engineering 总览、How We Work、About、Contact 按桌面顺序可见。两条产品线能力初始隐藏。Blog 遵循与桌面相同的发布门禁。
- [ ] 触摸、Enter 和 Space 都能切换 Engineering 子组；`aria-expanded` 与可见性一致。Engineering 总览仍进入 `/capabilities`。再次打开抽屉时子组恢复为收起。
- [ ] 抽屉打开时焦点留在内部，背景不可交互，页面滚动锁定。关闭按钮、Escape 和背景点击把焦点还给菜单按钮并恢复滚动。跟随链接则把焦点交给目标页。
- [ ] 跨过 1024 CSS px 或更换路由时，抽屉状态被清掉。矮视口可以滚动抽屉。减少动效时内容立即可用。控件和地标有可访问名称。
