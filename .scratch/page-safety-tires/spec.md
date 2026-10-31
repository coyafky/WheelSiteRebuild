# PageSpec — Safety Tires

Status: Launch（首发目标；规划完成不等于页面实现、内容验收或发布）。Route: `/products/safety-tires`。路由与页面职责以 [Sitemap](../../docs/02-架构/SITEMAP.md) 为准。

共享契约：[Page Shell](../global-page-shell/spec.md)、[Content Model](../site-content-model/spec.md)、[Interaction Spec](../site-interactions/spec.md)、[SEO Spec](../site-seo/spec.md)；本页使用 [hero](../global-hero/spec.md)、[breadcrumb](../global-breadcrumb/spec.md)、[evidence-block](../global-evidence-block/spec.md)、[inquiry-cta](../global-inquiry-cta/spec.md)。

## Audience and outcome｜访客与结果

评估自密封安全轮胎的采购者；理解原理、选型和验证证据。

## Ordered content contract｜内容区块

1. 产品原理：说明自密封机制与适用条件，区分概念图和实测结果。
2. 应用与选型：列出经核实的场景、尺寸/型号输入和目标市场问题。
3. 性能证据：测试方法、样品条件、结果范围和适用主体逐项核对。
4. 能力与询盘：连接 Safety Tire Capabilities、Manufacturing、How We Work 和 RFQ。

## Data and evidence｜数据与证据

Payload Safety Tires 平台记录与批准媒体；原始项目资料中的测试数字、市场规模和客户名称不能未经复核直接公开。

## Interaction and navigation｜交互与导航

证据卡只链接真实能力说明；RFQ 预选 safety-tires 但不预断车型适配或性能结论。

## SEO contract｜搜索与分享

标题主题为 Safety Tires 的原理与选型；描述避免未经核实的防扎保证。BreadcrumbList：Home → Products → Safety Tires；无稳定单品时不输出 Product/Offer。 规范 URL、索引门槛、分享图与结构化数据校验遵守全站 SEO Spec；最终标题和描述须依据已审定内容填写。

## Acceptance｜验收条件

- 原理、场景、选型和测试证据分得清楚。
- 每条性能主张有条件、来源和适用型号/产品线。
- 能力页和询盘路径可达，表单不自动判断适配。
- 首发标记仅代表计划范围；必须有本次实现、内容核实和页面验收的直接证据才能标为已完成。

