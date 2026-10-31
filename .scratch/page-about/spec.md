# PageSpec — About

Status: Launch（首发目标；规划完成不等于页面实现、内容验收或发布）。Route: `/about`。路由与页面职责以 [Sitemap](../../docs/02-架构/SITEMAP.md) 为准。

共享契约：[Page Shell](../global-page-shell/spec.md)、[Content Model](../site-content-model/spec.md)、[Interaction Spec](../site-interactions/spec.md)、[SEO Spec](../site-seo/spec.md)；本页使用 [hero](../global-hero/spec.md)、[breadcrumb](../global-breadcrumb/spec.md)、[evidence-block](../global-evidence-block/spec.md)、[inquiry-cta](../global-inquiry-cta/spec.md)。

## Audience and outcome｜访客与结果

核查业务主体、集团关系和可信度的采购者。

## Ordered content contract｜内容区块

1. 业务主体：只使用核实后的对外名称、所在地和角色。
2. 集团与制造关系：解释真实的所有权、合作或资源关系，不混同不同主体。
3. 资质与市场：只展示持证主体、适用产品、有效期及可证实的市场信息。
4. 下一步：进入 Manufacturing 核查现场，或按意图进入 Contact/RFQ。

## Data and evidence｜数据与证据

固定代码页面；企业原生资料是候选来源，不直接构成对外批准。Logo、公司名、地址和集团关系均需核实。

## Interaction and navigation｜交互与导航

Manufacturing 为显著的站内入口；一般联系去 Contact，采购意图去 RFQ。无未经审核的外部社交链接。

## SEO contract｜搜索与分享

标题主题为已核实的业务主体与制造关系；Organization JSON-LD 只在主体、Logo/地址/联系方式等字段真实获批时输出。BreadcrumbList 可表达 Home → About。 规范 URL、索引门槛、分享图与结构化数据校验遵守全站 SEO Spec；最终标题和描述须依据已审定内容填写。

## Acceptance｜验收条件

- 主体与集团/基地关系不混写。
- 资质和市场主张有持有者、范围与证据。
- Manufacturing、Contact、RFQ 链接按目的分流。
- 首发标记仅代表计划范围；必须有本次实现、内容核实和页面验收的直接证据才能标为已完成。

