# Site Interaction Specification

Status: planning contract, 2026-10-31; no interaction has been implemented or tested by this document. [Design.md](../../Design.md) owns tokens and accessibility targets, [Sitemap](../../docs/02-架构/SITEMAP.md) owns destinations, and [RFQ Workflow](../rfq-system/Inquiry-Workflow.md) owns submission and sales transitions.

## Shared behavior

1. Every visible navigation item and CTA is a real link or labelled control with one canonical destination. Header and Footer behavior stays in their [Header](../global-header/spec.md) and [Footer](../global-footer/spec.md) specs. A product card opens its platform page; an inquiry CTA opens `/request-quote` and carries only validated product/cooperation hints.
2. Product, capability, manufacturing and article pages expose relevant next steps in their content, not only in global navigation. Parent/child and related-page links follow the Sitemap. General contact remains `/contact` and does not masquerade as a purchasing inquiry.
3. Anchor directories (Wheel Engineering and Manufacturing) scroll to stable section IDs with headings that remain visible below the sticky Header. Browser back/forward and keyboard links work. Anchors do not create page routes or XML sitemap entries.
4. A PageSpec may use tabs, filters, carousels or comparison only after defining real content, keyboard/touch behavior, empty/error states and a reason they improve the buyer task. None is assumed in the first-release baseline. Long content can use ordinary headings and links.
5. Interactive state is never expressed by color, hover, motion or image alone. Focus, disabled, busy and validation states follow [Design.md](../../Design.md). At 320, 375, 768, 1024 and 1440 CSS px and 200% zoom, content and the next action remain reachable. Reduced-motion preference does not hide essential content.

## Page-specific interaction families

| Family | Required behavior | Owner |
| --- | --- | --- |
| Product discovery | Fixed four-platform order with Wheels first on Home and Products; a nested Home Wheels group links the three fixed child pages in flow-formed, forged, custom order, with process/project labels. Card link and optional inquiry CTA are distinct and clearly labelled. Product/category sections show only verified options and public destinations. | PageSpecs, Product Card Spec |
| Capability evidence | Evidence block names applicable product line and links its source-backed explanation or related product. Missing proof is omitted or labelled internal preview, never a public credential. | PageSpecs, Evidence Block Spec |
| Cooperation | How We Work exposes standard sourcing and custom development as parallel readable paths, with a relevant next action for each; it does not imply dealer authorization. | How We Work PageSpec |
| Blog | Only published categories/articles are linked. Article detail returns to its category, links relevant product/capability pages and shows previous/next only when published neighbors exist. | Blog PageSpecs |
| General contact | A general inquiry uses the RFQ engine's `general` type on `/contact`; a procurement visitor has a visible path to `/request-quote`. | Contact PageSpec, RFQ Spec |
| Procurement inquiry | Single conditional form selects `product`, `custom_project` or `oem_odm`; any prefilled platform/type is visible and editable. Validation preserves entries; success appears only after durable save and reference creation. | [RFQ Spec](../rfq-system/RFQ-System-Spec.md), [Workflow](../rfq-system/Inquiry-Workflow.md) |

## Failure, empty and unpublished states

- If a source record, media asset or evidence claim is absent, the public page omits that item and still offers a meaningful next action. A page whose essential contract cannot be met stays unpublished rather than rendering unsupported copy.
- A Wheels child page must have distinct reviewed content before it is publicly linked. If one child remains unpublished, Home and Wheels omit that child's clickable link without replacing it with a dead route; the other two and all four platforms retain their paths.
- Planned Blog categories with no reviewed published article are not public list pages; missing previous/next links are omitted. Preview routes are access controlled and carry `noindex` per [SEO Spec](../site-seo/spec.md).
- Invalid inquiry hints fall back to a visible chooser; no buyer requirement is silently rewritten. Submit failures retain input and never show a false success. Attachment and notification failures follow the RFQ Workflow.

## Acceptance

Each PageSpec records its own link and state checks. A future implementation verifies keyboard, touch, narrow viewports, zoom, reduced motion, error and empty states with current artifacts. This document does not claim those checks passed.
