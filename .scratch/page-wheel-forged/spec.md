# PageSpec — Forged Wheels

Status: Launch（首发目标；规划不等于页面实现、内容验收或发布）。Route: `/products/wheels/forged`。父级与状态以 [Sitemap](../../docs/02-架构/SITEMAP.md) 为准。

共享契约：[Page Shell](../global-page-shell/spec.md)、[Content Model](../site-content-model/spec.md)、[Interaction Spec](../site-interactions/spec.md)、[SEO Spec](../site-seo/spec.md)；使用 [hero](../global-hero/spec.md)、[breadcrumb](../global-breadcrumb/spec.md)、[evidence-block](../global-evidence-block/spec.md)、[inquiry-cta](../global-inquiry-cta/spec.md)。

## Audience and outcome｜访客与结果

寻求锻造轮毂的分销／批发采购者和品牌／OEM 项目买方；理解可讨论的材料、成形与验证范围，并准备可供人工评估的需求。

## Ordered content contract｜内容区块

1. Hero 与定位：说明锻造轮毂是工艺主题，不等同所有定制轮毂；材料、尺寸和产线适用范围只用已审定资料。
2. 采购任务与路线：按买方需求说明锻造铝合金或其他已核实材料选项、可能的项目约束和需要评估的取舍；不承诺统一减重百分比或绝对性能优势。
3. 规格与询盘输入：尺寸、PCD、ET、CB、载荷、应用、目标市场、数量、表面处理及材料偏好等字段，标明单位与待确认项。
4. 成形、加工与验证证据：按适用产品串联锻压、CNC、表面处理和检测，链接 Wheel Engineering 与 Manufacturing；设备、检测、证书都需核对主体与产品范围。
5. 相关选择与行动：链接 Wheels 总览、Flow-Formed Wheels、Custom Wheels；询盘带入 wheels 和可编辑的 `forged` 工艺意向，需要开发合作时可转定制页。

## Data and evidence｜数据与证据

正文与 SEO 使用 [固定子页记录](../site-content-model/spec.md#fixed-page-content-and-legal-content)，可复用已批准的 Wheels 平台媒体与证据。锻造线索见 [轮毂手册](../../docs/99-原生资源/A轮毂_产品手册核心介绍.md)与[产品综合介绍](../../docs/99-原生资源/A科技_产品综合介绍.md)；原始资料中的设备吨位、减重、材料性能和产品图片均须逐项核实后才能对外表达。

## Interaction and navigation｜交互与导航

面包屑为 Home → Products → Wheels → Forged Wheels。相关页链接只指向已公开目标。询盘仅预选可编辑的产品平台与工艺意向，不自动推断材料、数量、车型或 OEM/ODM 合作类型。

## SEO contract｜搜索与分享

唯一标题主题为 Forged Wheels 的 B2B 选型与可核实工艺范围；描述基于本页真实内容，与 Wheels 总页、Flow-Formed Wheels 明确区分。自引用 canonical 为本路由；可输出与可见路径一致的 BreadcrumbList。没有稳定已核实的具体产品时不输出 Product/Offer；遵守全站 SEO Spec。

## Acceptance｜验收条件

- 材料、设备、性能与认证表述各有适用范围和核实依据；不把项目可能性写成通用保证。
- 页面有独立的采购判断、输入字段和证据路径；父级、相关页与 RFQ 链接可达，预选提示可编辑。
- 标题、H1、描述、canonical、面包屑、媒体权利和窄屏/键盘可达性在实现后逐页验证；未达到内容门槛时不公开链接或索引。
