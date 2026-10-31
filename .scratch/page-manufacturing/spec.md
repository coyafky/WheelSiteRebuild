# PageSpec — Manufacturing

Status: Launch（首发目标；规划完成不等于页面实现、内容验收或发布）。Route: `/about/manufacturing`。路由与页面职责以 [Sitemap](../../docs/02-架构/SITEMAP.md) 为准。

共享契约：[Page Shell](../global-page-shell/spec.md)、[Content Model](../site-content-model/spec.md)、[Interaction Spec](../site-interactions/spec.md)、[SEO Spec](../site-seo/spec.md)；本页使用 [hero](../global-hero/spec.md)、[breadcrumb](../global-breadcrumb/spec.md)、[evidence-block](../global-evidence-block/spec.md)、[inquiry-cta](../global-inquiry-cta/spec.md)。

## Audience and outcome｜访客与结果

核查四条产品线由谁、在哪里、如何制造的采购者。

## Ordered content contract｜内容区块

1. 总览：说明四条产品线与共用资源，不预设四座独立自有工厂。
2. Wheels：材料/模具、铸造或旋压、热处理、CNC、涂装和检测的适用现场。
3. EV Housings：铸造、水道/焊接、精加工、尺寸与密封检测，以及共用基地/资源的真实关系。
4. Custom Aluminum：按项目调用材料、模具、试制、机加工和验证资源；不写成独立工厂。
5. Safety Tires：自密封涂层、加工、检测环节及各环节主体。
6. 证据与下一步：现场图、生产主体、基地、工序/检测证明并回链对应产品及能力页。

## Data and evidence｜数据与证据

固定代码页面；每个区块需生产主体、基地关系、真实现场图、关键工序、检测或交付证据。缺少可核实字段时省略，不把四条线写成四座工厂。

## Interaction and navigation｜交互与导航

四区块可用稳定页内目录；回链四个产品平台和已有两条能力页。RFQ 不从制造区块猜测访客合作类型。

## SEO contract｜搜索与分享

标题主题为四条产品线的制造现场与主体关系；描述不承诺自有工厂数量。BreadcrumbList：Home → About → Manufacturing；锚点不进入 XML sitemap。 规范 URL、索引门槛、分享图与结构化数据校验遵守全站 SEO Spec；最终标题和描述须依据已审定内容填写。

## Acceptance｜验收条件

- 四条产品线各有适用范围和真实主体；共享资源关系明确。
- 地址、照片地点、产能和认证主体经过核实后才公开。
- 目录、产品/能力互链和询盘入口可达。
- 首发标记仅代表计划范围；必须有本次实现、内容核实和页面验收的直接证据才能标为已完成。

