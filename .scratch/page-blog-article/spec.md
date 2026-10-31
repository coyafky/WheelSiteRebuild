# PageSpec — Blog Article Detail

Status: Planned（后续规划；本 Spec 完整规划页面，不代表路由已开放或内容已批准）。Route: `/blog/{slug}`。页面与发布门槛以 [Sitemap](../../docs/02-架构/SITEMAP.md) 为准。

共享契约：[Page Shell](../global-page-shell/spec.md)、[Content Model](../site-content-model/spec.md)、[Interaction Spec](../site-interactions/spec.md)、[SEO Spec](../site-seo/spec.md)；本页使用 [hero](../global-hero/spec.md)、[breadcrumb](../global-breadcrumb/spec.md)、[inquiry-cta](../global-inquiry-cta/spec.md)。

## Audience and outcome｜访客与结果

阅读单篇技术说明或公司动态的读者；获得出处、关联内容和合理下一步。

## Ordered content contract｜内容区块

1. 文章头：标题、分类、发布日期、经核实的作者/发布主体与可选媒体。
2. 正文：有逻辑的标题层级、事实来源、图表文本等价说明和适用产品/时间范围。
3. 关联内容：相关产品、Engineering 或 About 页面；返回所属分类。
4. 后续阅读：仅在有已发布相邻文章时显示上一篇/下一篇；有明确采购意图时提供 RFQ 入口。

## Data and evidence｜数据与证据

Payload BlogArticle 记录；slug 在 Blog 内唯一且发布后稳定，technical/company-news 为保留词。更换 slug 要旧地址永久重定向。草稿和测试文章不公开。

## Interaction and navigation｜交互与导航

文章详情保留返回所属分类的链接；相关与相邻文章只指向已公开记录，分类变化不改 canonical slug。

## SEO contract｜搜索与分享

每篇文章以已审定标题与主题写唯一 metadata；canonical 为实际 /blog/slug。可在标题、日期、作者/发布者和图片可核实时输出 Article/BlogPosting 与 BreadcrumbList；草稿、测试和路由模式本身不入 sitemap。 最终标题、描述与分享素材须依据已审定内容填写；遵守全站 SEO Spec。

## Acceptance｜验收条件

- slug、分类、日期、作者/主体及正文可追溯。
- 返回、相关和相邻链接无草稿或死路由。
- metadata/JSON-LD 与可见内容一致，旧 slug 重定向经实施验证。
- 完整的规划文档不改变 Planned 状态；必须另有内容、实现和发布证据才能启用。

