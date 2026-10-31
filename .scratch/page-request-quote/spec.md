# PageSpec — Request a Quote

Status: Launch（首发目标；规划完成不等于页面实现、内容验收或发布）。Route: `/request-quote`。路由与页面职责以 [Sitemap](../../docs/02-架构/SITEMAP.md) 为准。

共享契约：[Page Shell](../global-page-shell/spec.md)、[Content Model](../site-content-model/spec.md)、[Interaction Spec](../site-interactions/spec.md)、[SEO Spec](../site-seo/spec.md)；本页使用 [hero](../global-hero/spec.md)、[breadcrumb](../global-breadcrumb/spec.md)、[form-primitives](../global-form-primitives/spec.md)、[inquiry-cta](../global-inquiry-cta/spec.md)。

采购类型、字段、数据保存、状态与验收的权威草案分别见 [RFQ System Spec](../rfq-system/RFQ-System-Spec.md)、[Field Definition](../rfq-system/Inquiry-Field-Definition.md)、[Data Model](../rfq-system/Inquiry-Data-Model.md)、[Workflow](../rfq-system/Inquiry-Workflow.md) 和 [Acceptance Criteria](../rfq-system/RFQ-Acceptance-Criteria.md)。

## Audience and outcome｜访客与结果

已形成产品采购、定制项目或 OEM/ODM 合作意图的买方；提交可评估的需求。

## Ordered content contract｜内容区块

1. 表单说明：说明三类询盘的用途和有助评估的信息，不承诺报价时间。
2. 类型与上下文：product、custom_project、oem_odm 单页条件表单；显示可编辑的平台/型号来源。来自旋压或锻造轮毂页时可预选轮毂工艺意向，来自定制轮毂页时可预选定制项目类型；都允许买方修改。
3. 联系与需求：按 RFQ 字段矩阵收集必要联系、需求和适用补充字段。
4. 隐私与附件：明确私有上传限制、必需隐私确认和独立可选营销同意。
5. 提交结果：仅持久保存后显示编号；附件待检查状态与通知状态分开。

## Data and evidence｜数据与证据

页面结构由代码承载；字段、ProductModel、Inquiry、附件和事件由 RFQ 规格与 Payload 扩展定义。CMS Architecture 更新与真实隐私文本是实施/发布依赖。

## Interaction and navigation｜交互与导航

完全引用 RFQ Spec、Field Definition、Workflow 和 Acceptance Criteria；无客户端隐含价格/产品事实。来源参数失效时可重新选择，提交失败保留数据并支持幂等重试。

## SEO contract｜搜索与分享

标题主题为采购询盘与三类需求；描述与 Contact 区分。可在正式开放后索引；无 Product/Offer 或表单 JSON-LD，不能把私有请求内容放进 metadata。 规范 URL、索引门槛、分享图与结构化数据校验遵守全站 SEO Spec；最终标题和描述须依据已审定内容填写。

## Acceptance｜验收条件

- 三类需求和平台上下文可选择、可修改且服务端复核。
- 成功编号只在持久保存后出现；错误、重复、附件待扫描状态符合 RFQ 验收草案。
- 隐私、接收方、存储和扫描发布门槛满足前不开放真实提交。
- 首发标记仅代表计划范围；必须有本次实现、内容核实和页面验收的直接证据才能标为已完成。

