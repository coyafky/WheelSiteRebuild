# PageSpecs 与 Specification Design 索引

本目录是查找入口；每份权威 Spec 按本项目 [local issue/spec tracker](../agents/issue-tracker.md) 约定存放在 `.scratch/<feature>/spec.md`。页面范围、路径和 Launch/Planned 状态始终以 [Sitemap](../02-架构/SITEMAP.md) 为准。以下是规划契约，不表示页面、CMS schema、交互、SEO 标签、验收或发布已完成。

## 跨页面规范

| 类别 | 权威文档 | 职责 |
| --- | --- | --- |
| Global Component Spec | [组件索引](../04-componets/README.md) | Header/Footer 既有草案与七个新增共享组件契约；RFQ 是单独的询盘系统草案 |
| Content Model / Data Schema | [Site Content Model Spec](../../.scratch/site-content-model/spec.md) | Payload、固定页面、媒体与 RFQ 数据的归属和字段形状 |
| Interaction Specification | [Site Interaction Spec](../../.scratch/site-interactions/spec.md) | 全站链接、锚点、页面状态、空状态和表单交互边界 |
| SEO Specification | [Site SEO Spec](../../.scratch/site-seo/spec.md) | canonical、metadata、JSON-LD、索引、XML sitemap 与发布门槛 |

逐页 Spec 使用同一结构：访客与结果、内容区块、数据与证据、交互与导航、SEO、验收条件。共享规则只链接上表的权威来源，不在各页复制。最终英文文案、具体参数、图片和法律主张仍需来源核实。

## Launch｜首发目标（18）

| 路由 | PageSpec |
| --- | --- |
| `/` | [Home](../../.scratch/page-home/spec.md) |
| `/products` | [Products Overview](../../.scratch/page-products/spec.md) |
| `/products/wheels` | [Wheels](../../.scratch/page-wheels/spec.md) |
| `/products/wheels/flow-formed` | [Flow-Formed Wheels](../../.scratch/page-wheel-flow-formed/spec.md) |
| `/products/wheels/forged` | [Forged Wheels](../../.scratch/page-wheel-forged/spec.md) |
| `/products/wheels/custom` | [Custom Wheels](../../.scratch/page-wheel-custom/spec.md) |
| `/products/ev-housings` | [EV Housings](../../.scratch/page-ev-housings/spec.md) |
| `/products/custom-aluminum` | [Custom Aluminum](../../.scratch/page-custom-aluminum/spec.md) |
| `/products/safety-tires` | [Safety Tires](../../.scratch/page-safety-tires/spec.md) |
| `/capabilities` | [Engineering Overview](../../.scratch/page-engineering/spec.md) |
| `/capabilities/wheels` | [Wheel Engineering](../../.scratch/page-wheel-engineering/spec.md) |
| `/capabilities/safety-tires` | [Safety Tire Capabilities](../../.scratch/page-safety-tire-capabilities/spec.md) |
| `/how-we-work` | [How We Work](../../.scratch/page-how-we-work/spec.md) |
| `/about` | [About](../../.scratch/page-about/spec.md) |
| `/about/manufacturing` | [Manufacturing](../../.scratch/page-manufacturing/spec.md) |
| `/contact` | [Contact](../../.scratch/page-contact/spec.md) |
| `/request-quote` | [Request a Quote](../../.scratch/page-request-quote/spec.md) |
| `/privacy-policy` | [Privacy Policy](../../.scratch/page-privacy-policy/spec.md) — 真实 Contact/RFQ 提交的首发依赖，文案审定前不公开 |

## Planned｜后续规划（5）

| 路由或模式 | PageSpec | 启用条件 |
| --- | --- | --- |
| `/blog` | [Blog Overview](../../.scratch/page-blog/spec.md) | 至少一篇已审定发布文章，管理员开放栏目 |
| `/blog/technical` | [Technical Articles](../../.scratch/page-blog-technical/spec.md) | 该分类有正式文章且 Blog 已开放 |
| `/blog/company-news` | [Company News](../../.scratch/page-blog-company-news/spec.md) | 该分类有正式文章且 Blog 已开放 |
| `/blog/{slug}` | [Blog Article Detail](../../.scratch/page-blog-article/spec.md) | 对应文章审定发布；模式本身不是 XML sitemap URL |
| `/terms-of-use` | [Terms of Use](../../.scratch/page-terms-of-use/spec.md) | 法律/业务文案审定并发布 |

## 状态与接续

所有 PageSpec 是需求与验收计划。Header、Footer 和 RFQ 的现有草案仍标记为规格审查待完成；新组件、内容模型、交互与 SEO 契约也需实施前审阅。站点运行、构建、测试和发布的已核实方法见 [Runbook](../context/RUNBOOK.md)，不能从这些 Spec 推断任何验收结果。
