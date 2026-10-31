# PageSpec — Company News

Status: Planned（后续规划；本 Spec 完整规划页面，不代表路由已开放或内容已批准）。Route: `/blog/company-news`。页面与发布门槛以 [Sitemap](../../docs/02-架构/SITEMAP.md) 为准。

共享契约：[Page Shell](../global-page-shell/spec.md)、[Content Model](../site-content-model/spec.md)、[Interaction Spec](../site-interactions/spec.md)、[SEO Spec](../site-seo/spec.md)；本页使用 [hero](../global-hero/spec.md)、[breadcrumb](../global-breadcrumb/spec.md)。

## Audience and outcome｜访客与结果

核查有日期的公司事件、合作或业务动态的读者。

## Ordered content contract｜内容区块

1. 分类导语：说明这是公司动态而非技术证明。
2. 文章列表：每项显示已核实事件标题、事件/发布日期区分、摘要和可选批准媒体。
3. 相关页面：文章可链接经过核实的 About、Manufacturing 或相关产品页。

## Data and evidence｜数据与证据

Payload 中 category=company-news 且已发布的 BlogArticle；事件主体、日期、客户/合作方名称及图片授权逐项核实。

## Interaction and navigation｜交互与导航

列表按发布规则稳定排序；未审定事件和空分类不公开。文章入口保留返回本分类的路径。

## SEO contract｜搜索与分享

标题主题为 Company News；描述不得概括尚未核实的合作或市场覆盖。BreadcrumbList：Home → Blog → Company News；空分类无公开索引。 最终标题、描述与分享素材须依据已审定内容填写；遵守全站 SEO Spec。

## Acceptance｜验收条件

- 列表只含已审定 company-news 文章，日期与主体可核实。
- 未批准客户名称、标识和合作主张不公开。
- 空分类不出现于导航、公共路由或 XML sitemap。
- 完整的规划文档不改变 Planned 状态；必须另有内容、实现和发布证据才能启用。

