# PageSpec — Custom Aluminum

Status: Launch（首发目标；规划完成不等于页面实现、内容验收或发布）。Route: `/products/custom-aluminum`。路由与页面职责以 [Sitemap](../../docs/02-架构/SITEMAP.md) 为准。

共享契约：[Page Shell](../global-page-shell/spec.md)、[Content Model](../site-content-model/spec.md)、[Interaction Spec](../site-interactions/spec.md)、[SEO Spec](../site-seo/spec.md)；本页使用 [hero](../global-hero/spec.md)、[breadcrumb](../global-breadcrumb/spec.md)、[evidence-block](../global-evidence-block/spec.md)、[inquiry-cta](../global-inquiry-cta/spec.md)。

## Audience and outcome｜访客与结果

带图纸、样件或应用需求的定制铝制品采购者；理解评估与交付过程。

## Ordered content contract｜内容区块

1. 适用范围：说明可讨论的铝制件应用，不把定制业务写成固定型号目录。
2. 客户输入：图纸/样件、材料、用途、目标数量与验证需求。
3. 工程评估与阶段：需求澄清、工艺/模具、试制、验证和量产的责任点。
4. 制造证据与询盘：只展示适用的共用资源，连接 Manufacturing、How We Work 和 RFQ。

## Data and evidence｜数据与证据

Payload Custom Aluminum 平台记录；实际工艺资源和生产主体从核实资料引用。无固定单品或独立工厂的默认数据。

## Interaction and navigation｜交互与导航

按合作阶段阅读；定制询盘可预选 custom_project 与平台，仍可修改。图纸文件只能经私有表单上传，不放 URL。

## SEO contract｜搜索与分享

标题主题为按图纸/样件开发的铝制品能力；描述不承诺未确认的工艺、交期或 MOQ。BreadcrumbList：Home → Products → Custom Aluminum。 规范 URL、索引门槛、分享图与结构化数据校验遵守全站 SEO Spec；最终标题和描述须依据已审定内容填写。

## Acceptance｜验收条件

- 输入、评估、试制/验证和询盘路径形成完整链条。
- 共用产线与主体关系如未核实则不作公开主张。
- 没有虚构型号、价格、交期或专属工厂。
- 首发标记仅代表计划范围；必须有本次实现、内容核实和页面验收的直接证据才能标为已完成。

