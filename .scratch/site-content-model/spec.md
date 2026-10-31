# Site Content Model & Data Schema Spec

Status: planning contract, 2026-10-31. No Payload schema, migration, validation, or publication is claimed. [CMS Architecture](../../docs/02-架构/CMS_ARCHITECTURE.md) owns the approved Next.js/Payload boundary; [Sitemap](../../docs/02-架构/SITEMAP.md) owns routes; the [business definition](../../docs/00-product/PRODUCT_BRIEF.md) owns audience and conversion goals. This spec defines the content each PageSpec may request.

## Ownership and invariants

| Content | Owner at first release | Invariant |
| --- | --- | --- |
| Four product platforms | Payload, four fixed records | Stable platform ID maps to one fixed Sitemap route; editors cannot create a fifth platform or change routes. |
| Blog articles and their media | Payload | Draft/preview/published states; categories are Technical Articles or Company News; public article slug is unique and stable. |
| Home, three fixed Wheels child pages, Engineering, How We Work, About, Manufacturing, Contact and legal page body | Code-defined fixed pages | Claims and media are still verified before release; code ownership does not imply permission to publish unverified content. |
| ProductModel and Inquiry records | RFQ feature contract | Follow [Inquiry Data Model](../rfq-system/Inquiry-Data-Model.md); no model detail route is implied. The CMS Architecture must be updated before implementing these collections. |
| SEO metadata | Payload for managed content; code configuration for fixed pages | Canonical URL is generated from the route registry, never typed freely by an editor. Rules live in [SEO Spec](../site-seo/spec.md). |

## ProductPlatform record

Common fields: stable `platformId` (one of `wheels`, `ev-housings`, `custom-aluminum`, `safety-tires`), publication state, public title, concise introduction, buyer/application context, hero media reference, ordered content sections, related verified evidence references, inquiry context ID, SEO title/description and optional approved social image. The route is derived from `platformId` and the Sitemap. Each image carries alt text, source/rights and approval state via MediaAsset. Empty optional claims are omitted, not filled with invented values.

| Field or field group | Shape | Publish rule |
| --- | --- | --- |
| `platformId` | Immutable enum of the four fixed IDs | Required; resolves to exactly one Sitemap path and inquiry platform record. |
| `publicationState` | Draft / Published / Withdrawn | Only Published content is returned to public routes and metadata. |
| `title`, `intro`, `buyerContext` | Reviewed localized text (English at launch) | Title and intro required; buyer context must describe a real application/need. |
| `heroMedia`, `sections[].media` | Optional MediaAsset references | Public references require approved rights and alt/decorative treatment. |
| `sections[]` | Ordered block with stable section ID, heading, body, kind and optional scoped evidence/related-route IDs | The PageSpec determines required block kinds; no empty proof block or unsupported claim is published. |
| `evidenceRefs[]` | References to source-backed claims with product/entity applicability | Required for every numerical, certification, facility, performance or market claim. |
| `inquiryContextId` | Server-resolved platform relationship | Must equal this fixed platform; client hints never supply authoritative names/prices. |
| `seoTitle`, `seoDescription`, `socialImage` | Reviewed metadata text; optional approved MediaAsset for sharing | Unique title/description required for publication; social image optional. Canonical is derived, not editable. |

Platform-specific section contracts:

| Platform | Required content shape before its public page can pass review |
| --- | --- |
| Wheels | Verified product/category distinctions, selection/specification guidance with units and applicability, standard versus custom inputs, three fixed child-page references, links to Wheel Engineering and Manufacturing. |
| EV Housings | Water-cooled motor housing, high-pressure die-cast motor housing and control/inverter housing descriptions only where supported; application, drawing/material/quantity inputs and applicable manufacturing proof. |
| Custom Aluminum | Project/application scope, drawing or sample input, engineering evaluation stages and applicable shared manufacturing/validation resources. |
| Safety Tires | Self-sealing principle, applicable scenarios, selection inputs, test/evidence section and a distinction between verified performance and unverified claims. |

Do not require a numeric specification merely to fill a layout. Numeric values, certifications, capacity, MOQ, lead time and market claims need a source, applicable product and approval before publication. ProductModel may be selected in the RFQ form only after its own verified published record exists; it does not generate a public product URL.

## BlogArticle and MediaAsset

`BlogArticle` fields: stable unique slug, category enum (`technical` or `company-news`), title, summary, body sections, publication status and date, optional verified author/publisher, optional associations to approved product platforms or capability pages, SEO title/description, and optional approved social image. Category changes do not change `/blog/{slug}`. The reserved slugs `technical` and `company-news` cannot be article slugs. A public article requires reviewed facts, wording and media rights; an empty category has no public list page. See [CMS Architecture](../../docs/02-架构/CMS_ARCHITECTURE.md) and [Sitemap publication rules](../../docs/02-架构/SITEMAP.md#url-与内容发布规则).

| BlogArticle field | Shape | Publish rule |
| --- | --- | --- |
| `slug`, `category` | Unique stable slug; `technical` or `company-news` enum | Slug required, excludes reserved category slugs; category change does not change URL. |
| `title`, `summary`, `bodySections[]` | Reviewed English text with semantic heading order and optional source references | Required, complete and fact-checked before Published. |
| `publicationState`, `publishedAt` | Draft / Published / Withdrawn and server-controlled publication time | Only Published records appear in lists, related links, metadata and XML sitemap. |
| `author`, `publisher`, `eventDate` | Optional reviewed attribution/date values | Company-event date is shown when the event is described; JSON-LD uses only verified values. |
| `relatedRouteIds[]` | Approved product, capability or About routes | Only public canonical routes may be linked; missing relations are omitted. |
| `seoTitle`, `seoDescription`, `socialImage` | Reviewed unique metadata and optional approved MediaAsset | Publication requires title/description; canonical derives from slug. |

`MediaAsset` fields: stable reference, file and type, intended page/section, descriptive alt text or decorative flag, source, rights/license or owner approval, claim/proof suitability, and publication state. A generated concept render or archive image can be marked preview-only; it cannot silently become evidence or a public asset. Remove unsupported media and its claim together when no verified substitute exists.

| MediaAsset field | Shape | Publish rule |
| --- | --- | --- |
| `file`, `mediaType`, `usage` | Stored file reference, detected type and intended page/section role | No broken or wrong-format public reference. |
| `altText` / `decorative` | Meaningful description or explicit decorative flag | Exactly one treatment; text inside imagery is not the sole carrier of information. |
| `source`, `rightsEvidence`, `approvedForPublic` | Provenance, license/owner permission and approval state | All three must support public use; archive or generated preview is not automatically approved. |
| `proofSuitability` | Documentary evidence / illustration / preview-only | Illustration cannot be cited as a test or facility proof. |

## Fixed-page content and legal content

Code-defined page content uses a typed route record: route ID, page status, heading, ordered sections, approved claim/evidence references, related-route IDs, SEO metadata and optional media references. The three fixed Wheels child records also need an immutable subtype ID (`flow-formed`, `forged`, `custom`), a distinction label (`process` or `project`), a unique buyer-task summary, applicable selection inputs and a scoped inquiry hint; all resolve to the Wheels platform ID. Home entry cards reuse these reviewed summaries. Page sections must preserve the [Sitemap](../../docs/02-架构/SITEMAP.md) responsibility and [Design.md](../../Design.md) layout baseline. The route record is not a second route authority; paths are taken from the Sitemap.

Legal page records additionally need reviewed text, responsible legal owner, version/effective date when approved, and publication state. The PageSpecs define structure only; no jurisdiction-specific legal wording is generated here. The privacy notice must be published and linked before real RFQ submissions open, per the [RFQ release gates](../rfq-system/RFQ-System-Spec.md#9-release-gates-and-non-goals).

## Inquiry and conversion data handoff

The [RFQ Spec](../rfq-system/RFQ-System-Spec.md) and [Inquiry Data Model](../rfq-system/Inquiry-Data-Model.md) own inquiry fields, persistence, privacy and sales state. To implement the [business conversion definitions](../../docs/00-product/PRODUCT_BRIEF.md#core-conversion-goals核心转化目标), the implementation plan must record a deduplicated saved commercial inquiry, an explicit human qualification decision with actor/time and reason, and first documented outreach (`Contacted`). A general `/contact` submission is excluded from commercial counts. The existing RFQ draft has sales states but no approved qualification-result field; define that field and its permissions before claiming qualified-inquiry reporting works.

## Acceptance for this specification

- Every PageSpec names one of these content owners and does not invent a second CMS collection for fixed pages.
- Draft, Planned, preview-only, unverified and unpublished content cannot appear on public routes or in metadata, JSON-LD, RSS or XML sitemap.
- Shared platform IDs, article slugs and related-route IDs resolve to the current Sitemap; missing evidence suppresses the claim or blocks page publication where the claim is essential.
- Field-level Payload schema, migrations and real publication validation remain implementation tasks; this document is their planning input.
