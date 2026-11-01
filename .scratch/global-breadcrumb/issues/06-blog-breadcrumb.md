# 06: Blog 分类与真实文章 Breadcrumb

**What to build:** Blog 开放后，读者能从文章返回其已发布分类和 Blog 总览；文章更换分类时，Breadcrumb 跟着实际分类变化，文章规范 URL 保持稳定。

**Blocked by:** 02: Products 首条可见 Breadcrumb；Blog 栏目与内容须满足站点地图的发布门槛

**Status:** ready-for-human

- [ ] Blog 总览和两个分类在开发预览中只显示真实固定层级；公开模式下，仅已开放且有正式内容的分类提供入口。
- [ ] 一篇已审定发布的文章使用 Home → Blog → 已发布分类 → Article；草稿、测试文章或缺失分类关系的文章不产生公开 Breadcrumb 或 `BreadcrumbList`。
- [ ] 分类调整会更新文章的可见祖先与结构化数据，但文章 canonical 仍是 `/blog/{slug}` 的实际 slug 路径，不把分类塞进 URL。
- [ ] 祖先链接可用、当前文章不是自链接；允许输出的 `BreadcrumbList` 与可见路径相同，并检查窄屏换行、200% 缩放和键盘焦点。

## Comments

Claimed by Codex at 2026-11-01. 用户选择用 Mock 文章验收开发预览；真实文章和 Blog 公开发布门槛仍未满足。

2026-11-01: 已加入 Blog 总览、两个固定分类的预览 Breadcrumb，以及分别属于技术说明和公司动态的两篇 Mock 文章。开发浏览器核对文章四层路径、320 CSS px、200% 缩放、键盘焦点和 `noindex`；分类切换测试核对祖先与 JSON-LD 输入同步变化、文章路径保持 `/blog/{slug}`。生产构建及 HTTP 验证确认固定 Blog 路径、Mock 文章和未知文章均为 404。全量集成测试有 64 项通过、1 项跳过，API 套件因本地未配置 `PAYLOAD_SECRET` 而失败，端到端套件未开始。

待人工完成：建立正式文章的数据与审定流程，提供至少一篇已审定文章，并在 Blog 栏目开放后验收真实文章及有内容分类的公开路由、canonical 和 `BreadcrumbList`。Mock 文章不得作为正式文章发布；本票上述公开验收项保持未勾选。
