# 02: Products 首条可见 Breadcrumb

**What to build:** 在 Products 总览和一个已存在的产品平台页面上，采购者可以看清从首页进入当前页面的层级，并用真实父级链接返回；当前页只作为文字出现。

**Blocked by:** 01: 固定路由占位与发布门禁

**Status:** ready-for-agent

- [ ] Products 总览呈现 Home → Products；Wheels 平台呈现 Home → Products → Wheels。首页不出现 Breadcrumb。
- [ ] Breadcrumb 是有名称的导航地标，父级是键盘可操作的规范链接，当前项是带 `aria-current="page"` 的文字而非自链接；可见标签使用公开导航名称。
- [ ] 预览页面不把占位父级当成公开发布；公开模式只链接已发布且可达的祖先，关系不成立时页面保持发布门禁。
- [ ] 允许输出的 `BreadcrumbList` 由同一有序路由记录生成，名称、顺序和 URL 与可见 Breadcrumb 一致；在 320 CSS px 和 200% 缩放下可换行、焦点可见。
