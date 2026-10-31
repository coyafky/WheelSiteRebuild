# PageSpec — Home

Status: Launch（首发目标；规划完成不等于页面实现、内容验收或发布）。Route: `/`。路由与页面职责以 [Sitemap](../../docs/02-架构/SITEMAP.md) 为准。

共享契约：[Page Shell](../global-page-shell/spec.md)、[Content Model](../site-content-model/spec.md)、[Interaction Spec](../site-interactions/spec.md)、[SEO Spec](../site-seo/spec.md)；本页使用 [hero](../global-hero/spec.md)、[product-card](../global-product-card/spec.md)、[evidence-block](../global-evidence-block/spec.md)、[inquiry-cta](../global-inquiry-cta/spec.md)。

## Audience and outcome｜访客与结果

首次进入的全球 B2B 采购者；让访客迅速识别四个平台、核查能力并进入标准采购或定制开发。

## Ordered content contract｜内容区块

1. Hero：说明站点提供的四大平台与两类合作入口；不使用未经核实的公司或产能主张。
2. 产品发现：四个平台直接可达，轮毂首位；其他三平台仍完整可见。轮毂平台卡与三个子入口是父子层级，不能把三个子入口算作第五至第七个平台。
3. 轮毂发现区：在轮毂平台内容下方以三张同组入口卡呈现 Flow-Formed Wheels、Forged Wheels、Custom Wheels，顺序固定。前两张标识为工艺选路，第三张标识为项目定制入口；短说明分别回答“适合什么采购任务、需要哪些输入、下一步去哪”，不预设性能优劣或车型适配。保留指向 Wheels 总览和 Wheel Engineering 的明确链接。桌面可并排，窄屏顺序纵向排列，图片缺失仍能以文字选路。
4. 能力与制造摘要：只呈现已核实的产品线证据，分别链接 Engineering 与 Manufacturing。
5. 合作选择与收尾：标准采购、定制开发各有明确下一步；页面末端只有一次询盘收尾。

## Data and evidence｜数据与证据

固定页面正文由代码承载；平台名称、摘要和批准媒体复用四条 Payload ProductPlatform 记录。三个轮毂入口使用固定路由记录的短标题、差异说明、类别标签与批准媒体；与子页同源，避免首页另维护一套事实。当前 [三张生成概念图](../../preview-assets/README.md)仅用于内部 HTML 预览，不能作为真实产品或工艺证据直接发布。证据与图片须带来源、适用产品和权利状态。

## Interaction and navigation｜交互与导航

四张平台卡进入对应平台；轮毂子入口分别进入三个已公开子页，未公开的目标不显示为可点击链接或让访客进入空页。证据摘要进入对应能力或制造页；合作入口进入 How We Work 或带可编辑上下文的 RFQ。无产品数据时不渲染假卡片；入口卡不用嵌套链接。

## SEO contract｜搜索与分享

独立标题主题为四平台 B2B 采购与开发入口；描述可概述可见的轮毂细分路径，但不堆砌类别词。可在主体和 Logo 已核实时输出 Organization；不把四个平台或三个轮毂主题伪装成 Product 实例。规范 URL、索引门槛、分享图与结构化数据校验遵守全站 SEO Spec；最终标题和描述须依据已审定内容填写。

## Acceptance｜验收条件

- 四个平台均有真实入口且轮毂排首位；不存在集团其他产品线入口。
- 三个轮毂子入口在同一父级视觉组内，顺序、标签、链接与 Sitemap 一致；可从文字辨别两种工艺与一种项目路径，三个目标均已公开才显示相应链接。
- 能力主张可追溯到对应产品线，未核实主张和概念图不公开。
- 两类合作路径及询盘入口可由键盘和窄屏访问。
- 首发标记仅代表计划范围；必须有本次实现、内容核实和页面验收的直接证据才能标为已完成。

