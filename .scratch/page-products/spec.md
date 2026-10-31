# PageSpec — Products Overview

Status: Launch（首发目标；规划完成不等于页面实现、内容验收或发布）。Route: `/products`。路由与页面职责以 [Sitemap](../../docs/02-架构/SITEMAP.md) 为准。

共享契约：[Page Shell](../global-page-shell/spec.md)、[Content Model](../site-content-model/spec.md)、[Interaction Spec](../site-interactions/spec.md)、[SEO Spec](../site-seo/spec.md)；本页使用 [hero](../global-hero/spec.md)、[product-card](../global-product-card/spec.md)、[breadcrumb](../global-breadcrumb/spec.md)、[inquiry-cta](../global-inquiry-cta/spec.md)。

## Audience and outcome｜访客与结果

尚未确定平台的采购者；用可比较的需求描述帮助其进入正确平台。

## Ordered content contract｜内容区块

1. 导语：说明四平台的采购区别和如何选择，不承诺未核实的适配结果。
2. 平台总览：轮毂首位，其余三平台并列；每卡包含适用需求、提供内容和下一步。
3. 合作入口：标准选型与按图纸/样件开发分别指向适当平台或 How We Work。

## Data and evidence｜数据与证据

四张卡的名称、摘要、图片和路由来自固定 ProductPlatform 记录；无第五个平台或自动分类数据。

## Interaction and navigation｜交互与导航

每张卡有明确的平台链接；询盘动作与平台浏览动作分离。没有筛选、搜索或型号详情功能的默认承诺。

## SEO contract｜搜索与分享

独立标题主题为四平台产品总览；描述帮助采购者识别供给范围。BreadcrumbList 可表达 Home → Products；不输出虚构的 Product/Offer。 规范 URL、索引门槛、分享图与结构化数据校验遵守全站 SEO Spec；最终标题和描述须依据已审定内容填写。

## Acceptance｜验收条件

- 四张卡顺序、名称和目标 URL 与 Sitemap 一致。
- 不同平台的差异可从文字读出，图片缺失不影响选路。
- 标准采购和定制开发均有可见下一步。
- 首发标记仅代表计划范围；必须有本次实现、内容核实和页面验收的直接证据才能标为已完成。

