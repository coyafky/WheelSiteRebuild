# PageSpec — Wheels

Status: Launch（首发目标；规划完成不等于页面实现、内容验收或发布）。Route: `/products/wheels`。路由与页面职责以 [Sitemap](../../docs/02-架构/SITEMAP.md) 为准。

共享契约：[Page Shell](../global-page-shell/spec.md)、[Content Model](../site-content-model/spec.md)、[Interaction Spec](../site-interactions/spec.md)、[SEO Spec](../site-seo/spec.md)；本页使用 [hero](../global-hero/spec.md)、[breadcrumb](../global-breadcrumb/spec.md)、[evidence-block](../global-evidence-block/spec.md)、[inquiry-cta](../global-inquiry-cta/spec.md)。

## Audience and outcome｜访客与结果

标准轮毂采购和轮毂项目定制买方；判断应进入旋压、锻造或定制项目路径，以及所需规格输入和验证路径。

## Ordered content contract｜内容区块

1. 产品与应用：说明轮毂平台范围，只列经核实的应用与类别。
2. 三条入口：Flow-Formed Wheels 与 Forged Wheels 是工艺主题，Custom Wheels 是可跨工艺的项目路径；三者各有差异说明、适用采购问题及独立目标页，不能写成三种互斥的成形方法。
3. 通用选型信息：尺寸、PCD、ET、CB、载荷、表面处理等字段说明单位与适用范围，未知值不补零；具体工艺页补充各自所需输入。
4. 标准与定制路径：分别说明选型输入、图纸/样件与项目评估所需信息。
5. 证据与下一步：链接 Wheel Engineering 四段证据和 Manufacturing，再进入 RFQ。

## Data and evidence｜数据与证据

Payload Wheels 平台记录承载总页正文、媒体和 SEO；三个固定轮毂子页的独立正文与 SEO 由固定路由记录承载，引用已批准的 Wheels 平台内容和媒体，不新增第五个平台或自动类别集合。型号数据只有在 ProductModel 已验证发布后用于可选 RFQ 上下文。轮毂规格/性能与认证逐项核实。

## Interaction and navigation｜交互与导航

三个子入口只链接已公开的独立子页；其他页内类别目录只指向有正式内容的区块。子页与总页之间保留返回路径，证据链接可直达 Wheel Engineering 的稳定锚点。RFQ 预选 wheels，可被访客修改。

## SEO contract｜搜索与分享

标题主题为 Wheels 与可核实的选型范围；描述不写虚构价格/适配保证。BreadcrumbList：Home → Products → Wheels；未有稳定单品时不输出 Product/Offer。 规范 URL、索引门槛、分享图与结构化数据校验遵守全站 SEO Spec；最终标题和描述须依据已审定内容填写。

## Acceptance｜验收条件

- 选型字段有单位、适用性和未知值处理；类别仅在证据充足时显示。
- 三个子页入口与首页、Sitemap 一致；定制轮毂明确为跨工艺项目路径。
- 工程、制造和询盘链接均可达，预选上下文可编辑。
- 公开图片、认证和性能叙述有对应来源与产品范围。
- 首发标记仅代表计划范围；必须有本次实现、内容核实和页面验收的直接证据才能标为已完成。

