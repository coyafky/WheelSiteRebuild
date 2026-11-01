# Research Adoption — Global Components, Page Patterns and Content

**Status:** ready-for-agent

本 Spec 依据已确认的[研究吸收说明](../../docs/01-design/RAYONE_RESEARCH_ADOPTION.md)组织跨页面工作。它可用于拆分和领取实施 ticket；首批样板与后续条件能力分别验收。页面、路由、视觉令牌、数据和询盘字段仍以各自既有权威文档为准。

## Problem Statement

采购者需要从本站快速识别合适的产品或定制路径、核查适用的工程与制造证据，并提交可跟进的询盘。现有 Sitemap、设计系统和逐页 Spec 已定义范围，但外部拆解中的全局组件、页面模式和内容叙事尚未整理成同一条可实施、可验收的采购路径。若各页各自模仿参考站点，容易出现无效链接、重复文案、缺证据的主张和询盘上下文丢失。

## Solution

以已批准的四个产品平台和浅色工业风为基线，将参考报告的模式映射到本站现有全局组件、页面组件与逐页内容契约。先完成并验证轮毂采购路径：从 Home 或 Products 选路，经轮毂工艺或定制主题页查看对应的 Wheel Engineering／Manufacturing 证据，再进入带可见、可修改上下文的统一采购询盘。规格表、页内索引、搜索、Fitment Lookup、图库、轮播和 3D 均纳入规划；有真实数据、素材权利、明确买方用途与独立验收条件后分阶段启用。页面说明按买方问题、选型输入、证据和下一步编写，最终英文文案由各页面内容工作审定。

## User Stories

1. As a distributor buyer, I want to distinguish the four product platforms on Home and Products, so that I can enter the relevant supply path.
2. As a wheel buyer, I want to distinguish flow formed, forged and custom project paths, so that I can choose by manufacturing route or project need.
3. As a custom project buyer, I want to understand what application, drawing, sample and validation inputs are needed, so that I can prepare a useful inquiry.
4. As a procurement reviewer, I want each capability claim linked to its applicable product line and evidence, so that I can assess supplier suitability.
5. As a wheel buyer, I want a specification table with units, applicability and unknown values clearly marked, so that I do not mistake absent data for a guaranteed value.
6. As a reader of a long engineering page, I want stable section links and a visible heading after navigation, so that I can reach the relevant evidence quickly.
7. As a buyer using a narrow screen, I want product and inquiry destinations in the mobile navigation, so that I can complete the same procurement path as on desktop.
8. As a keyboard user, I want navigation, anchor links, media controls and form actions to be operable with visible focus, so that I can use the entire path without a pointer.
9. As a buyer arriving from a product page, I want the known platform and intent visible and editable in the inquiry, so that I can correct them before submission.
10. As an OEM/ODM buyer, I want project-specific input guidance, so that my requirement is not reduced to a generic product request.
11. As a buyer, I want submission errors to retain my entries and success to appear only after a saved inquiry, so that I know whether my request reached the team.
12. As a content editor, I want a page writing outline tied to the page's buyer task, so that related pages have distinct, useful content.
13. As a content reviewer, I want every public figure, certification, facility statement and media asset to have a verified source and scope, so that unsupported claims remain unpublished.
14. As a search visitor, I want results drawn only from published, maintainable product and content records, so that search does not lead to empty or draft pages.
15. As a wheel project buyer, I want Fitment Lookup to assist with collecting possible specifications while clearly requiring engineering confirmation, so that I do not interpret it as a fit guarantee.
16. As a buyer viewing a gallery or 3D model, I want media to represent an actual approved product and remain usable without motion or 3D support, so that visuals help rather than mislead my decision.
17. As a buyer viewing a carousel, I want manual control, keyboard access and a readable static alternative, so that no important content depends on autoplay.
18. As a buyer reading a technical article, I want a route back to relevant products, evidence and inquiry, so that educational content supports the next procurement step when that article is published.
19. As a search visitor, I want page titles and descriptions to reflect each page's distinct task and visible content, so that I can choose the right result.
20. As a site owner, I want the saved inquiry, qualified inquiry and first documented follow-up counted by their approved definitions, so that I can evaluate the path after release.
21. As a reviewer, I want unavailable destinations, unverified claims and incomplete media omitted from public pages, so that a planned component never appears complete by accident.

## Implementation Decisions

- The existing Sitemap owns page hierarchy, canonical destinations and publication state. The four product platforms remain the first-release scope, with Wheels first; this feature does not add public routes by itself.
- The existing Design System owns the light industrial palette, type, spacing, accessibility and media treatment. Reference-site dark surfaces, branding and assets do not replace those decisions.
- The shared page shell, Header, Footer, Hero, product card, evidence block, inquiry CTA and form primitives remain the primary reusable contracts. Page templates compose them according to each PageSpec; a shared component does not own a page's claims.
- The first implementation slice spans Home or Products, the three fixed Wheels child topics, Wheel Engineering, Manufacturing and the unified procurement inquiry. Each child topic retains its distinct process or project role.
- Specification tables show units, source and applicability where relevant; unknown, zero and not applicable are distinct. Anchor navigation uses stable section IDs and works under the sticky Header.
- Search, Fitment Lookup, gallery, carousel and 3D are planned capabilities with separate implementation tickets and release gates. Search indexes only published content; Fitment assists review and does not guarantee vehicle compatibility; gallery and 3D require approved, product-matched assets. A new public model or search route requires a Sitemap decision first.
- The content method for each page is buyer need, product or project choice, required inputs, scoped evidence and next action. Distinct page titles, visible H1s and metadata must agree with the approved content; related pages do not reuse generic marketing copy as their main explanation.
- The unified inquiry keeps product and intent hints visible and editable. Server-side records determine trusted product facts, and durable save determines submission success. General contact remains separate from procurement inquiry.
- Real inquiry submission remains closed until the reviewed privacy notice, storage, recipient and attachment controls in the existing RFQ release gates are satisfied.
- Reference report observations are design inputs, not proof of commercial performance. Published claims and media follow the existing verification and rights gates. The incomplete Fitment section of the supplied PDF is insufficient to specify its data contract.
- Implementation follows the project's ticket claim, worktree, handoff and independent acceptance workflow. This Spec does not mark any component, copy, form or route as implemented, accepted or released.

## Testing Decisions

- The primary high-level seam is one browser procurement journey from a public Wheels entry through relevant evidence to an inquiry with editable context and a confirmed saved result. Use an internal environment with synthetic data and mail sink for form submission; no live sales inbox is exercised by tests.
- Verify externally visible behavior: real canonical links, distinct page purpose, one visible H1, usable section anchors, source-scoped evidence, publication gates and no false inquiry success. Do not assert component internals, class names or the number of React components.
- Exercise the journey at the approved review widths of 320, 375, 768, 1024 and 1440 CSS px, plus 200% zoom; include keyboard navigation, visible focus, reduced motion, empty content and failed submit states where relevant.
- Planned search, Fitment, gallery, carousel and 3D receive their own behavioral acceptance tests only when the required data and assets exist. In their absence, test that no fake result, fit guarantee, unlicensed media or dead control is publicly exposed.
- Existing home model, route registry, Header and page shell integration tests provide prior art for narrower contracts. The existing frontend end-to-end test contains an old placeholder-home assertion and must be updated before it can serve as evidence for this journey. RFQ acceptance scenarios remain the source for persistence, privacy and sales-state checks.

## Out of Scope

- Copying RAYONE branding, source code, imagery, contact details, certifications, commercial figures, product SKUs or dealer authorization flow.
- Adding a fifth product platform, new model detail routes, an independent OEM solution route, a search route, or a public Blog without their existing content and Sitemap gates.
- Publishing final English copy, product specifications, evidence or media before source and rights review.
- Promising automatic vehicle fitment, a price, stock, lead time, MOQ or immediate quotation.
- Treating the report as conversion proof or this planning Spec as an implementation or release acceptance result.

## Further Notes

- Source: user-provided *RAYONE 网站拆解 · UI 组件*, 35-page PDF, received 2026-11-01. Its ninth Fitment section is truncated in the provided export.
- Authority map: [Sitemap](../../docs/02-架构/SITEMAP.md), [Design System](../../Design.md), [PageSpec index](../../docs/03-Page/README.md), [content model](../site-content-model/spec.md), [interaction spec](../site-interactions/spec.md), [SEO spec](../site-seo/spec.md) and [RFQ spec](../rfq-system/RFQ-System-Spec.md). The [research absorption explanation](../../docs/01-design/RAYONE_RESEARCH_ADOPTION.md) records observation, selection and rollout phase without duplicating these contracts.
- No new ADR is proposed: the confirmed approach preserves existing route, product scope, capability and visual decisions; the staged component plan is reversible as content and assets become available.
