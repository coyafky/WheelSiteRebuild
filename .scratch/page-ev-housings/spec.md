# PageSpec — EV Housings

Status: Launch（首发目标；规划完成不等于页面实现、内容验收或发布）。Route: `/products/ev-housings`。路由与页面职责以 [Sitemap](../../docs/02-架构/SITEMAP.md) 为准。

共享契约：[Page Shell](../global-page-shell/spec.md)、[Content Model](../site-content-model/spec.md)、[Interaction Spec](../site-interactions/spec.md)、[SEO Spec](../site-seo/spec.md)；本页使用 [hero](../global-hero/spec.md)、[breadcrumb](../global-breadcrumb/spec.md)、[evidence-block](../global-evidence-block/spec.md)、[inquiry-cta](../global-inquiry-cta/spec.md)。

## Audience and outcome｜访客与结果

新能源电机与电控壳体采购/开发买方；判断部件范围和工程输入。

## Ordered content contract｜内容区块

1. 平台范围：水冷电机壳、高压压铸电机壳、电控箱/逆变器壳体按已核实资料展示。
2. 应用与输入：说明图纸、材料、目标数量、用途和验证要求怎样影响评估。
3. 制造与质量：呈现该产品线适用的工序和证据，不借用轮毂专属证明。
4. 合作与询盘：连接 How We Work、Manufacturing 和 RFQ。

## Data and evidence｜数据与证据

Payload EV Housings 平台记录与批准媒体；制造主体、基地关系、密封/尺寸测试和市场主张须逐项核实。

## Interaction and navigation｜交互与导航

部件分组可用普通标题/目录；没有足够正式数据时不生成子页面或筛选器。RFQ 可预选平台，合作类型由访客确认。

## SEO contract｜搜索与分享

标题主题为 EV Housings 的部件与开发输入；描述与可见应用一致。BreadcrumbList：Home → Products → EV Housings；不输出无单品依据的 Product/Offer。 规范 URL、索引门槛、分享图与结构化数据校验遵守全站 SEO Spec；最终标题和描述须依据已审定内容填写。

## Acceptance｜验收条件

- 三个部件方向只按已核实内容出现。
- 输入资料、制造证据和下一步均明确，且证据适用于壳体。
- 未创建 Sitemap 外的子路由或未经核实的性能主张。
- 首发标记仅代表计划范围；必须有本次实现、内容核实和页面验收的直接证据才能标为已完成。

