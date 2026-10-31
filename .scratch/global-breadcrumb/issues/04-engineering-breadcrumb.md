# 04: Engineering 产品线能力 Breadcrumb

**What to build:** 采购者在 Engineering 总览和两条产品线能力页上，可以沿清晰的父级路径回到总览；页面不把页内能力区块当成独立页面。

**Blocked by:** 02: Products 首条可见 Breadcrumb

**Status:** ready-for-agent

- [ ] Engineering 总览使用 Home → Engineering；Wheel Engineering 和 Safety Tire Capabilities 使用 Home → Engineering → 当前页。
- [ ] `/capabilities` 的可见标签是 Engineering；父级链接使用规范路径，当前项是文字与 `aria-current="page"`，不产生重复自链接。
- [ ] 页内锚点不增加层级；公开模式下未发布的父级或当前页不能借 Breadcrumb 绕开发布门禁。
- [ ] 允许输出的 `BreadcrumbList` 与可见层级一致；键盘焦点、320 CSS px 换行和 200% 缩放经过检查。
