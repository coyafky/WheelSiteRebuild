# PageSpec — Flow-Formed Wheels

Status: Launch（首发目标；规划不等于页面实现、内容验收或发布）。Route: `/products/wheels/flow-formed`。父级与状态以 [Sitemap](../../docs/02-架构/SITEMAP.md) 为准。

共享契约：[Page Shell](../global-page-shell/spec.md)、[Content Model](../site-content-model/spec.md)、[Interaction Spec](../site-interactions/spec.md)、[SEO Spec](../site-seo/spec.md)；使用 [hero](../global-hero/spec.md)、[breadcrumb](../global-breadcrumb/spec.md)、[evidence-block](../global-evidence-block/spec.md)、[inquiry-cta](../global-inquiry-cta/spec.md)。

## Audience and outcome｜访客与结果

考虑旋压轮毂的分销／批发采购者和项目买方；判断该工艺主题与自身需求是否相关、需要提供什么规格，以及从何处核查制造与验证证据。页面不进行自动适配或性能保证。

## Ordered content contract｜内容区块

1. Hero 与定位：以已核实的英文工艺名称和适用范围说明旋压轮毂；解释它是轮毂成形路线之一，避免把全部轮毂或所有定制项目归入此类。
2. 采购任务与适用条件：回答访客为何会考虑该路线，列出有来源支持的应用、采购形式和选择时需要进一步确认的限制；不与锻造页做未经验证的绝对性能比较。
3. 规格与询盘输入：列出尺寸、PCD、ET、CB、载荷、目标市场、数量、表面处理等适用字段，说明单位和未知值处理；不填虚构型号或数值。
4. 工艺与证据：用已核实的工序和媒体解释旋压成形及后续加工、检测，链接 [Wheel Engineering](../../docs/02-架构/SITEMAP.md#wheel-engineering-页内结构) 的相关段落和 Manufacturing。概念图、设备图、产品图分别标明真实用途。
5. 相关选择与行动：链接 Wheels 总览、Forged Wheels、Custom Wheels；采购询盘带入 wheels 和可编辑的 `flow_formed` 工艺意向，另提供需要项目开发者到定制页的路径。

## Data and evidence｜数据与证据

正文与 SEO 使用 [固定子页记录](../site-content-model/spec.md#fixed-page-content-and-legal-content)，可复用已批准的 Wheels 平台媒体与证据。旋压工艺的原始线索见 [轮毂手册](../../docs/99-原生资源/A轮毂_产品手册核心介绍.md)与[产品综合介绍](../../docs/99-原生资源/A科技_产品综合介绍.md)；对外工艺、适用型号、图片权利和性能主张须核实。页面发布所需的独立内容不能只换总页标题。

## Interaction and navigation｜交互与导航

面包屑为 Home → Products → Wheels → Flow-Formed Wheels。普通链接替代默认筛选器；相关页链接只指向已公开目标。询盘提示只预选产品平台和工艺意向，可查看、修改，服务端不信任 URL 中的任意值；具体字段与验证遵守 RFQ 草案。

## SEO contract｜搜索与分享

唯一标题主题为 Flow-Formed Wheels 的 B2B 选型与工艺说明，描述覆盖真实可见的输入和证据；不得与 Wheels 总页或 Forged Wheels 仅换关键词。自引用 canonical 为本路由；可输出与可见面包屑一致的 BreadcrumbList。没有稳定且已核实的具体产品时不输出 Product/Offer。索引与媒体规则遵守全站 SEO Spec。

## Acceptance｜验收条件

- 工艺与适用范围有来源；与锻造及项目定制的关系准确，不出现未经核实的重量、强度、认证或适配结论。
- 页面有独立的采购判断、输入字段和证据路径；父级、相关页与 RFQ 链接可达，预选提示可编辑。
- 标题、H1、描述、canonical、面包屑、媒体权利和窄屏/键盘可达性在实现后逐页验证；未达到内容门槛时不公开链接或索引。
