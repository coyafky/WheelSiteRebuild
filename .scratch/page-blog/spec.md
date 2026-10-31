# PageSpec — Blog Overview

Status: Planned（后续规划；本 Spec 完整规划页面，不代表路由已开放或内容已批准）。Route: `/blog`。页面与发布门槛以 [Sitemap](../../docs/02-架构/SITEMAP.md) 为准。

共享契约：[Page Shell](../global-page-shell/spec.md)、[Content Model](../site-content-model/spec.md)、[Interaction Spec](../site-interactions/spec.md)、[SEO Spec](../site-seo/spec.md)；本页使用 [hero](../global-hero/spec.md)、[breadcrumb](../global-breadcrumb/spec.md)、[inquiry-cta](../global-inquiry-cta/spec.md)。

## Audience and outcome｜访客与结果

寻找技术说明或公司动态的访客；按内容类型进入有正式文章的列表。

## Ordered content contract｜内容区块

1. 栏目说明：解释 Technical Articles 与 Company News 的区别，不混用技术论证与公司事件。
2. 分类入口：只显示已有已审定发布文章的分类与真实文章数量/摘要；无内容分类不公开入口。
3. 精选/最新文章：只引用已发布文章的标题、摘要、日期和批准图片。
4. 相关下一步：文章导向产品或能力页面，有明确采购意图时可进入 RFQ。

## Data and evidence｜数据与证据

Payload BlogArticle 集合与媒体；至少一篇文章已审定并发布后管理员才开放 Blog。文章的关联页面必须是已公开路由。

## Interaction and navigation｜交互与导航

分类卡进入已开放的分类页，文章卡进入 /blog/{slug}；空分类不提供死链接。打开/关闭栏目遵守 CMS 发布门槛。

## SEO contract｜搜索与分享

标题主题为技术说明与公司动态共同入口；描述只概括实际已发布内容。Blog 未开放时无公共索引或 XML 条目；开放后自规范 URL。 最终标题、描述与分享素材须依据已审定内容填写；遵守全站 SEO Spec。

## Acceptance｜验收条件

- 没有正式文章时 /blog、导航和 sitemap 均不公开。
- 开放后仅显示非空分类和已发布文章。
- 每篇文章入口与相关页面链接真实可达。
- 完整的规划文档不改变 Planned 状态；必须另有内容、实现和发布证据才能启用。

