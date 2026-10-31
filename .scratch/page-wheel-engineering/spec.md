# PageSpec — Wheel Engineering

Status: Launch（首发目标；规划完成不等于页面实现、内容验收或发布）。Route: `/capabilities/wheels`。路由与页面职责以 [Sitemap](../../docs/02-架构/SITEMAP.md) 为准。

共享契约：[Page Shell](../global-page-shell/spec.md)、[Content Model](../site-content-model/spec.md)、[Interaction Spec](../site-interactions/spec.md)、[SEO Spec](../site-seo/spec.md)；本页使用 [hero](../global-hero/spec.md)、[breadcrumb](../global-breadcrumb/spec.md)、[evidence-block](../global-evidence-block/spec.md)、[inquiry-cta](../global-inquiry-cta/spec.md)。

## Audience and outcome｜访客与结果

核查轮毂开发、制造与验证的采购者；沿项目阶段理解证据。

## Ordered content contract｜内容区块

1. #overview：需求、设计、工艺、生产和验证流程及客户输入。
2. #design-engineering：车型/用途、尺寸、PCD、ET、CB、载荷、目标市场，以及 3D、有限元和铸造模拟的用途。
3. #manufacturing-process：适用项目的铸造、旋压或锻造，热处理、CNC、表面处理和过程检查。
4. #quality-validation：尺寸/外观、动平衡、冲击、弯曲与径向疲劳等验证目的、证据和适用范围。

## Data and evidence｜数据与证据

固定代码页面；四个锚点和内容边界以 Sitemap 为准。仿真图不是量产结果；工艺是否现有、认证持证主体、测试参数和产能均需核实。

## Interaction and navigation｜交互与导航

页内目录锚点可键盘直达且不被粘性 Header 遮挡；与 Wheels、Manufacturing 和 RFQ 双向关联。

## SEO contract｜搜索与分享

标题主题为轮毂工程流程与可核实验证；描述避免把模拟等同实测。BreadcrumbList：Home → Engineering → Wheel Engineering；锚点不进入 XML sitemap。 规范 URL、索引门槛、分享图与结构化数据校验遵守全站 SEO Spec；最终标题和描述须依据已审定内容填写。

## Acceptance｜验收条件

- 四个稳定锚点和区块按输入→工程→制造→验证顺序出现。
- 模拟、工艺和测试主张各自有证据边界。
- 产品、制造和询盘链接真实可达。
- 首发标记仅代表计划范围；必须有本次实现、内容核实和页面验收的直接证据才能标为已完成。

