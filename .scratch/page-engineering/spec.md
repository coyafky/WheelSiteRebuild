# PageSpec — Engineering Overview

Status: Launch（首发目标；规划完成不等于页面实现、内容验收或发布）。Route: `/capabilities`。路由与页面职责以 [Sitemap](../../docs/02-架构/SITEMAP.md) 为准。

共享契约：[Page Shell](../global-page-shell/spec.md)、[Content Model](../site-content-model/spec.md)、[Interaction Spec](../site-interactions/spec.md)、[SEO Spec](../site-seo/spec.md)；本页使用 [hero](../global-hero/spec.md)、[breadcrumb](../global-breadcrumb/spec.md)、[evidence-block](../global-evidence-block/spec.md)、[inquiry-cta](../global-inquiry-cta/spec.md)。

## Audience and outcome｜访客与结果

核查供应商工程、制造与质量能力的采购者；按产品线找到适用证据。

## Ordered content contract｜内容区块

1. 总览：解释从设计、制造、验证到出口交付的证据链及其适用范围。
2. 轮毂能力：摘要并直达 Wheel Engineering。
3. 安全轮胎能力：摘要并直达 Safety Tire Capabilities。
4. 其他平台证据：EV Housings 和 Custom Aluminum 只展示已有可核实摘要并回链产品页，不生成空能力子页。

## Data and evidence｜数据与证据

固定代码页面；每个证据项带来源、产品线和主体范围。数字、认证和产能需发布核实。

## Interaction and navigation｜交互与导航

两条能力子页直接可达；证据摘要可回到相关产品/制造页。页面标签公开为 Engineering，内部路径仍是 /capabilities。

## SEO contract｜搜索与分享

标题主题为按产品线组织的 Engineering 能力；描述不把轮毂专属能力概括为全站通用。BreadcrumbList 可表达 Home → Engineering。 规范 URL、索引门槛、分享图与结构化数据校验遵守全站 SEO Spec；最终标题和描述须依据已审定内容填写。

## Acceptance｜验收条件

- 轮毂和安全轮胎两条子页可直达；其他平台没有空路由。
- 每个证据项明确产品适用范围与来源。
- Engineering 标签、路径和站内链接一致。
- 首发标记仅代表计划范围；必须有本次实现、内容核实和页面验收的直接证据才能标为已完成。

