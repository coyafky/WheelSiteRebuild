# 06: Blog 分类与真实文章 Breadcrumb

**What to build:** Blog 开放后，读者能从文章返回其已发布分类和 Blog 总览；文章更换分类时，Breadcrumb 跟着实际分类变化，文章规范 URL 保持稳定。

**Blocked by:** 02: Products 首条可见 Breadcrumb；Blog 栏目与内容须满足站点地图的发布门槛

**Status:** ready-for-agent

- [ ] Blog 总览和两个分类在开发预览中只显示真实固定层级；公开模式下，仅已开放且有正式内容的分类提供入口。
- [ ] 一篇已审定发布的文章使用 Home → Blog → 已发布分类 → Article；草稿、测试文章或缺失分类关系的文章不产生公开 Breadcrumb 或 `BreadcrumbList`。
- [ ] 分类调整会更新文章的可见祖先与结构化数据，但文章 canonical 仍是 `/blog/{slug}` 的实际 slug 路径，不把分类塞进 URL。
- [ ] 祖先链接可用、当前文章不是自链接；允许输出的 `BreadcrumbList` 与可见路径相同，并检查窄屏换行、200% 缩放和键盘焦点。
