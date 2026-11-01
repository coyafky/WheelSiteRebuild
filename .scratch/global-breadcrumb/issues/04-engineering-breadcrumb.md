# 04: Engineering 产品线能力 Breadcrumb

**What to build:** 采购者在 Engineering 总览和两条产品线能力页上，可以沿清晰的父级路径回到总览；页面不把页内能力区块当成独立页面。

**Blocked by:** 02: Products 首条可见 Breadcrumb

**Status:** resolved

- [x] Engineering 总览使用 Home → Engineering；Wheel Engineering 和 Safety Tire Capabilities 使用 Home → Engineering → 当前页。
- [x] `/capabilities` 的可见标签是 Engineering；父级链接使用规范路径，当前项是文字与 `aria-current="page"`，不产生重复自链接。
- [x] 页内锚点不增加层级；公开模式下未发布的父级或当前页不能借 Breadcrumb 绕开发布门禁。
- [x] 允许输出的 `BreadcrumbList` 与可见层级一致；键盘焦点、320 CSS px 换行和 200% 缩放经过检查。

## Comments

Claimed by Codex at 2026-11-01.

2026-11-01: 三个 Engineering 页面服务端渲染及公开门禁测试通过；相关 ESLint、`tsc --noEmit` 通过。浏览器核对 `/capabilities/safety-tires#validation` 的三层顺序、320 CSS px 与 200% 缩放均无横向溢出；键盘聚焦 Engineering 链接可见实线轮廓。当前页面是 noindex 预览，JSON-LD 由第 02 张的共享渲染器在满足公开条件时生成。
