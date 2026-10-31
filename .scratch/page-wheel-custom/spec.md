# PageSpec — Custom Wheels

Status: Launch（首发目标；规划不等于页面实现、内容验收或发布）。Route: `/products/wheels/custom`。父级与状态以 [Sitemap](../../docs/02-架构/SITEMAP.md) 为准。

共享契约：[Page Shell](../global-page-shell/spec.md)、[Content Model](../site-content-model/spec.md)、[Interaction Spec](../site-interactions/spec.md)、[SEO Spec](../site-seo/spec.md)；使用 [hero](../global-hero/spec.md)、[breadcrumb](../global-breadcrumb/spec.md)、[evidence-block](../global-evidence-block/spec.md)、[inquiry-cta](../global-inquiry-cta/spec.md)。

## Audience and outcome｜访客与结果

带图纸、样件、品牌需求或目标规格的轮毂项目买方；判断定制合作的输入、评估阶段和可核查能力，并提交足以安排下一步的需求。

## Ordered content contract｜内容区块

1. Hero 与定位：说明 Custom Wheels 是轮毂项目合作入口，不是一种与旋压、锻造并列的成形工艺；可用工艺按项目评估。
2. 项目范围与输入：按图纸、样件或目标要求分别说明客户需提供的应用、尺寸、PCD、ET、CB、载荷、材料偏好、表面要求、目标市场、数量和验证要求；未知项可标记待讨论，不预先承诺可行性。
3. 合作阶段：需求澄清 → 工程与工艺评估 → 样品/验证 → 量产与交付讨论；说明每阶段的双方确认点，并链接 How We Work 的完整流程。
4. 工艺与证据选路：按实际适用范围指向 Flow-Formed Wheels、Forged Wheels、Wheel Engineering 与 Manufacturing；不宣称所有工艺都适用于每个项目。
5. 行动：询盘带入 wheels 和可编辑的 `custom_project` 类型；OEM/ODM 合作买方可在表单中改选对应类型，图纸或个人信息只通过安全表单提交。

## Data and evidence｜数据与证据

正文与 SEO 使用 [固定子页记录](../site-content-model/spec.md#fixed-page-content-and-legal-content)，可引用已批准的 Wheels 平台证据和媒体。项目流程线索见 [产品综合介绍](../../docs/99-原生资源/A科技_产品综合介绍.md)；具体开发、打样、交期、产能和交付承诺须核实。此页不得复制 [Custom Aluminum](../page-custom-aluminum/spec.md) 的业务范围。

## Interaction and navigation｜交互与导航

面包屑为 Home → Products → Wheels → Custom Wheels。相关工艺页只在已公开时链接。询盘预选 wheels 与 `custom_project`，两项均可查看和修改；文件和个人资料不出现在 URL，提交成功条件遵守 RFQ 工作流。

## SEO contract｜搜索与分享

唯一标题主题为 Custom Wheels 的 B2B 项目开发与输入要求，描述应区别于 Custom Aluminum 和轮毂总页。自引用 canonical 为本路由；可输出匹配可见路径的 BreadcrumbList。不将项目服务伪装为具体 Product/Offer；遵守全站 SEO Spec。

## Acceptance｜验收条件

- 能准确说明定制是跨工艺的合作方式；项目输入和阶段清楚，不出现未经核实的交期、MOQ、价格或适配承诺。
- 页面有独立于轮毂总页和 Custom Aluminum 的内容，父级、工艺证据、How We Work 与 RFQ 可达，表单预选可编辑。
- 标题、H1、描述、canonical、面包屑、媒体权利和窄屏/键盘可达性在实现后逐页验证；未达到内容门槛时不公开链接或索引。
