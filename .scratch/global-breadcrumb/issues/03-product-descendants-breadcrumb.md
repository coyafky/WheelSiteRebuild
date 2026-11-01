# 03: 其他产品平台与固定轮毂子页 Breadcrumb

**What to build:** 采购者在其余三个产品平台和三个固定轮毂主题页上，都能从 Breadcrumb 返回真实的产品父级，不会看到并不存在的型号或筛选层级。

**Blocked by:** 02: Products 首条可见 Breadcrumb

**Status:** resolved

- [x] EV Housings、Custom Aluminum、Safety Tires 使用 Home → Products → 平台；Flow-Formed Wheels、Forged Wheels、Custom Wheels 使用 Home → Products → Wheels → 当前页。
- [x] 每一层使用站点地图规定的规范路径和公开标签；查询参数、页内锚点、ProductModel、未经批准的类别不增加 Breadcrumb 层级。
- [x] 对每个页面的预览与公开状态分别验证父级可达性；公开页面只链接已发布祖先，待审核页面不误报已公开。
- [x] 每个允许输出的 `BreadcrumbList` 与本页可见层级完全一致；长标签在窄屏和 200% 缩放下不被裁切。

## Comments

Claimed by Codex at 2026-11-01.

2026-11-01: 六个固定产品页的服务端渲染验收与公开门禁测试通过；相关 ESLint、`tsc --noEmit` 通过。浏览器核对 `/products/wheels/flow-formed?source=qa#details` 层级仍为四层，320 CSS px 与 200% 缩放均无横向溢出。页面仅为 noindex 预览，不产生公开 JSON-LD；可发布时共用第 02 张实现的同源渲染器。
