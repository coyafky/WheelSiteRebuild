# 03: 其他产品平台与固定轮毂子页 Breadcrumb

**What to build:** 采购者在其余三个产品平台和三个固定轮毂主题页上，都能从 Breadcrumb 返回真实的产品父级，不会看到并不存在的型号或筛选层级。

**Blocked by:** 02: Products 首条可见 Breadcrumb

**Status:** ready-for-agent

- [ ] EV Housings、Custom Aluminum、Safety Tires 使用 Home → Products → 平台；Flow-Formed Wheels、Forged Wheels、Custom Wheels 使用 Home → Products → Wheels → 当前页。
- [ ] 每一层使用站点地图规定的规范路径和公开标签；查询参数、页内锚点、ProductModel、未经批准的类别不增加 Breadcrumb 层级。
- [ ] 对每个页面的预览与公开状态分别验证父级可达性；公开页面只链接已发布祖先，待审核页面不误报已公开。
- [ ] 每个允许输出的 `BreadcrumbList` 与本页可见层级完全一致；长标签在窄屏和 200% 缩放下不被裁切。
