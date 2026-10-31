# PageSpec — Contact

Status: Launch（首发目标；规划完成不等于页面实现、内容验收或发布）。Route: `/contact`。路由与页面职责以 [Sitemap](../../docs/02-架构/SITEMAP.md) 为准。

共享契约：[Page Shell](../global-page-shell/spec.md)、[Content Model](../site-content-model/spec.md)、[Interaction Spec](../site-interactions/spec.md)、[SEO Spec](../site-seo/spec.md)；本页使用 [hero](../global-hero/spec.md)、[breadcrumb](../global-breadcrumb/spec.md)、[form-primitives](../global-form-primitives/spec.md)、[inquiry-cta](../global-inquiry-cta/spec.md)。

一般联系复用 [RFQ System Spec](../rfq-system/RFQ-System-Spec.md) 的 `general` 类型；字段和成功/失败状态分别由 [Field Definition](../rfq-system/Inquiry-Field-Definition.md) 与 [Workflow](../rfq-system/Inquiry-Workflow.md) 约定。

## Audience and outcome｜访客与结果

有一般问题或非采购联系需求的访客；把采购需求准确转入 RFQ。

## Ordered content contract｜内容区块

1. 用途说明：区分一般联系与采购询盘。
2. 一般联系表单：使用 RFQ engine 的 general 类型及其已审定的字段、隐私告知和成功/失败状态。
3. 联系方法：仅展示经核实且获准公开的邮箱、电话或地址。
4. 采购转向：可见 Request a Quote 入口，说明产品需求应到采购表单。

## Data and evidence｜数据与证据

固定页面正文与已核实联系资料；一般联系记录由 RFQ 询盘模型管理，不计入采购转化。隐私文案和接收人员是发布门槛。

## Interaction and navigation｜交互与导航

general 表单不显示产品/附件选择；失败保留输入，成功需持久保存并返回参考编号。采购 CTA 进入 /request-quote。

## SEO contract｜搜索与分享

标题主题为一般联系；描述不与采购报价页重复。可在内容核实时公开索引；无虚构地址、电话或 Organization 字段。 规范 URL、索引门槛、分享图与结构化数据校验遵守全站 SEO Spec；最终标题和描述须依据已审定内容填写。

## Acceptance｜验收条件

- 一般联系与采购询盘分流清晰。
- 表单使用 RFQ 的服务端校验、隐私和结果状态；无真实隐私告知前不开放提交。
- 所有公开联系方式有来源与发布批准。
- 首发标记仅代表计划范围；必须有本次实现、内容核实和页面验收的直接证据才能标为已完成。

