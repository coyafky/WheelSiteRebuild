# PageSpec — Technical Articles

Status: Planned（后续规划；本 Spec 完整规划页面，不代表路由已开放或内容已批准）。Route: `/blog/technical`。页面与发布门槛以 [Sitemap](../../docs/02-架构/SITEMAP.md) 为准。

共享契约：[Page Shell](../global-page-shell/spec.md)、[Content Model](../site-content-model/spec.md)、[Interaction Spec](../site-interactions/spec.md)、[SEO Spec](../site-seo/spec.md)；本页使用 [hero](../global-hero/spec.md)、[breadcrumb](../global-breadcrumb/spec.md)、[inquiry-cta](../global-inquiry-cta/spec.md)。

## Audience and outcome｜访客与结果

寻找产品原理、工艺、验证和应用资料的读者；识别可继续核查的产品或能力。

## Ordered content contract｜内容区块

1. 分类导语：明确技术说明主题与证据边界。
2. 文章列表：每项提供已审定标题、摘要、发布日期、可选批准图片和相关产品/能力。
3. 继续阅读与转化：文章详情可达，相关产品与 Engineering 链接不误导到未发布页面。

## Data and evidence｜数据与证据

Payload 中 category=technical 且已发布的 BlogArticle；没有正式文章则该分类不公开。

## Interaction and navigation｜交互与导航

文章按明确的稳定规则排序（默认发布日期新到旧，同日用稳定 ID 决定），分页/加载更多只有内容量需要时才设计；无空列表公开页。

## SEO contract｜搜索与分享

标题主题为 Technical Articles；描述基于已发布技术主题。BreadcrumbList：Home → Blog → Technical Articles；分类空时无 public canonical 或 XML 条目。 最终标题、描述与分享素材须依据已审定内容填写；遵守全站 SEO Spec。

## Acceptance｜验收条件

- 列表只含 technical 类正式文章，日期与摘要和内容记录一致。
- 分类、文章、相关产品/能力的链接均指向公开页面。
- 空分类保持 Planned/不可公开，未产生索引项。
- 完整的规划文档不改变 Planned 状态；必须另有内容、实现和发布证据才能启用。

