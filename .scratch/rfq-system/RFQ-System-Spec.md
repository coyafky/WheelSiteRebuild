# RFQ System Specification

Status: **design specification draft; decisions confirmed with the owner on 2026-10-31; specification review pending**. This document does not claim implementation, testing, legal approval, or release. No formal business code is authorized by this file.

## 1. Purpose and authority

Build one Inquiry Engine for qualified B2B purchasing and non-purchasing contact. It serves the four approved **product platforms** and the product catalog plus OEM/ODM model, using the meanings of **product platform** and **inquiry** in the [Glossary](../../GLOSSARY.md). The [Sitemap](../../docs/02-架构/SITEMAP.md) owns public routes: `/request-quote` receives product and custom-development inquiries; `/contact` receives general contact. [ADR 0001](../../docs/adr/0001-main-site-product-scope.md) limits product scope to Wheels, EV Housings, Custom Aluminum, and Safety Tires. [ADR 0002](../../docs/adr/0002-english-routes-at-root.md) makes English root paths the only currently approved locale routes. [Design.md](../../Design.md) owns form visuals and accessibility targets. The existing [CMS architecture](../../docs/02-架构/CMS_ARCHITECTURE.md) uses Next.js and Payload for the public app/admin; adding inquiry and model collections is a **confirmed feature design that requires an architecture-document update before implementation**.

The five requested deliverables are this file, [Inquiry-Data-Model.md](Inquiry-Data-Model.md), [Inquiry-Field-Definition.md](Inquiry-Field-Definition.md), [Inquiry-Workflow.md](Inquiry-Workflow.md), and [RFQ-Acceptance-Criteria.md](RFQ-Acceptance-Criteria.md). Each owns its named concern; this file is the integration contract.

## 2. RAYONE reference: observed, inferred, and not adopted

Read-only observation of [RAYONE Product Inquiry](https://www.rayonewheels.com/products/inquiry) on 2026-10-31. No real inquiry was submitted.

| Class | Finding |
| --- | --- |
| Verified observation | RAYONE displays a selected product/category and says that product details are prefilled for an inquiry. Its form requires contact name, country/region, customer type, email, estimated quantity, requirements, and privacy acceptance; it allows unknown wheel specifications to remain blank. Company, phone, finish, vehicle, size, PCD/ET/CB/brake, and use case are optional. |
| Verified observation | A product CTA passes code, name, category, image, and route values in a hash-query URL. The page copies product code/name/category/image/source route into hidden fields before POST to its inquiry API. |
| Verified observation | The page includes a hidden Website honeypot, Turnstile-related elements, submit pending state, failure messaging that retains input, and a successful reference number path. Empty required fields were blocked by native browser validation; no successful end-to-end delivery was tested. |
| Verified observation | That Product Inquiry page did not expose a drawing-upload control. Other visible entry names include custom, dealer/OEM/ODM, fitment, and sourcing inquiries; their full workflows were not verified. |
| Inference | RAYONE appears to use several intent-specific entry points and shared product context. Its hidden fields show a convenient client transport, not a trustworthy product-data source. |
| Our decision | Use one engine with four inquiry types. Transport only stable IDs as hints, resolve them on the server, display the resolved context to the buyer, and never accept price, image, name, or model claims from the client as authoritative. |

RAYONE contact details, customer-type categories, technical values, anti-bot vendor, claims, and product assets are not copied into this project.

## 3. Inquiry taxonomy and public entry points

| Type | Meaning | Public entry | Product selection | Primary outcome |
| --- | --- | --- | --- | --- |
| `product` / Product Inquiry | Buyer seeks a quote or selection for a known approved platform or verified model. | `/request-quote`, commonly from a product page CTA | Required: one of four platforms or a verified model belonging to one. | Procurement qualification and quotation follow-up. |
| `custom_project` / Custom Project | Buyer brings drawings, sample information, or development requirements. | `/request-quote` | Optional platform; `unsure` is a valid buyer choice. | Engineering/commercial review. |
| `oem_odm` / OEM/ODM | Buyer seeks continuing manufacturing collaboration to its requirements. | `/request-quote` | Optional platform; `unsure` is valid. | Manufacturing partnership review. |
| `general` / General Inquiry | Non-procurement question or contact request. | `/contact`, using the same engine and record model | No product selector. If the topic is a quote, provide a visible route to `/request-quote`. | General response or redirection to RFQ. |

The three commercial types use **one single-page conditional form** at `/request-quote`: choose type, reveal relevant fields immediately, submit, then show a result state. General Inquiry is a `/contact` view of the same engine. No four parallel form implementations, vehicle-fitment database, model detail URL, OEM/ODM page, or new public inquiry route is introduced.

The only approved product platforms and their canonical paths are:

| Platform label | Path |
| --- | --- |
| Wheels | `/products/wheels` |
| EV Housings | `/products/ev-housings` |
| Custom Aluminum | `/products/custom-aluminum` |
| Safety Tires | `/products/safety-tires` |

## 4. Architecture and trust boundaries

```text
Product/page CTA → canonical /request-quote URL + type/platform/model/optional wheel-process hints
                                       ↓
Next.js page → server lookup of Payload ProductPlatforms / ProductModels
             → visible, editable selection → one conditional Inquiry Form
                                       ↓
Server submission boundary → normalize and validate → abuse controls
                           → resolve IDs again → persist Payload Inquiry
                           → reference number + attachment quarantine
                                       ↓
Outbox workers → scan attachments → internal notification → sales workflow
```

- The existing four Payload platform records are the trusted platform source. Add a `ProductModels` collection containing only reviewed model records with stable ID, platform relationship, display name/code, and publication state. This collection does **not** imply public model-detail URLs or invented models. If no model records are published, Product Inquiry still works at platform level.
- A product CTA may use query hints such as `?inquiryType=product&platformId=<stable-id>&modelId=<stable-id>` on the existing `/request-quote` path. Query keys are an interface proposal, not an already deployed URL. Approved Flow-Formed/Forged page CTAs may additionally suggest a `wheelProcessInterest` enum, while Custom Wheels suggests `custom_project` and Wheels; the form displays these as editable choices. The browser may show server-resolved name/code and an approved image if separately sourced, but the POST carries IDs and buyer input only. A buyer can change platform/model/process interest; changing platform clears an incompatible model and wheel-only interest. Invalid/unpublished/mismatched IDs trigger an explicit re-selection message and never silently submit an old name.
- The server re-reads the selected records at submission, checks publication state and platform/model relationship, and writes a server-generated context snapshot. Client-supplied price, image URL, displayed product name, model code, or source-route text cannot override that lookup. Buyer-typed model text is stored as **unverified buyer input**, not a ProductModels record.
- Next.js server-side handlers or Server Functions are exposed mutation boundaries and must validate requests regardless of browser validation. [Next.js Forms](https://nextjs.org/docs/app/guides/forms) and [Mutating Data](https://nextjs.org/docs/app/getting-started/mutating-data) describe POST-based form handling; the backend choice remains an implementation detail within the approved Next.js/Payload stack.
- Payload holds private `Inquiries`, `InquiryAttachments`, `ProductModels`, and a notification outbox/audit history as specified in [Inquiry-Data-Model.md](Inquiry-Data-Model.md). Public callers may invoke a restricted submission service only; they cannot read/list/update inquiries or directly fetch attachments. [Payload collection access control](https://payloadcms.com/docs/access-control/collections) applies to API paths. Payload's [Local API can override access control by default](https://payloadcms.com/docs/local-api/access-control), so server-side use must enforce the same authorization explicitly.

## 5. Field and UX contract

The authoritative field matrix, conditional rules, and validation details are in [Inquiry-Field-Definition.md](Inquiry-Field-Definition.md). Across all four types, the only shared required buyer inputs are **contact name, reply email, need description, and the approved privacy-processing acknowledgment**. A Product Inquiry additionally requires a valid platform or verified model selection. Company, phone, country/region, estimated quantity, target timing, destination, budget, unknown specifications, and files are optional. Optional technical fields cannot be used to reject a buyer merely because a parameter is unknown.

Wheels may show optional process interest plus structured size, PCD, ET, and center-bore fields based on existing source cues; these are buyer statements, not compatibility checks or proof of a model's manufacturing route. Wheels and Safety Tires may show optional vehicle/application free text. No automatic fitment result or fitment guarantee is generated. Other platforms use optional technical-requirements text and approved attachments until platform-specific fields are separately reviewed.

Use persistent labels, visible required markers, inline field errors, a form-level status, value preservation after invalid submission, busy/disabled submit state, keyboard access, and a success state only after durable inquiry persistence, as [Design.md](../../Design.md) requires. Keep the one-page form usable at 320, 375, 768, 1024, and 1440 CSS px and 200% zoom. Existing color, radius, spacing, and `control.minHeight` tokens are the **APPROVED BASELINE**; implementation and form acceptance remain unverified.

## 6. Attachments, privacy, abuse, and delivery

Optional file upload is in first-release scope for commercial inquiries, especially Custom Project and OEM/ODM. Initial approved limits are **5 files per inquiry, 25 MB per file, 50 MB total**, with a candidate allowlist of **PDF, PNG, JPG, STEP, DWG, DXF**. These limits must be tested against chosen storage and scanning infrastructure before release. Reject archives and other types. Verify extension, claimed MIME, actual signature/structure where feasible, size, and count server-side; if a type cannot be safely validated/scanned, disable it until supported. Rename files with generated storage keys, keep originals private, and quarantine pending scans. This follows [OWASP File Upload guidance](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html).

An inquiry body may be durably saved and receive a reference while its attachments remain `pending_scan`; the success page must state that file checks are pending. Sales can download only `clean` attachments. Failed/unsafe files are isolated and flagged for staff handling without erasing the saved inquiry. The complete workflow and failure behavior are in [Inquiry-Workflow.md](Inquiry-Workflow.md).

No real submission opens until a reviewed privacy notice states the actual processing purpose, recipient/controller, applicable retention and deletion process, and the approved acknowledgment text. Marketing opt-in is separate, optional, and unchecked by default. Retention days, applicable jurisdictions, actual notification recipients, outbound sender, file-scan service, storage service, and rate-limit thresholds are **TBD release gates**, not invented defaults. The legal basis and wording require review for target markets; data minimization and transparency are design constraints reflected in [GDPR Articles 5 and 13](https://eur-lex.europa.eu/eli/reg/2016/679/oj/?pid=14006577), without asserting that one jurisdiction governs all visitors.

Use layered anti-abuse controls: server-side validation, origin/CSRF protections, a hidden honeypot, rate limiting by appropriate request signals, and an accessible risk-based challenge if required by observed abuse. No vendor is selected by this spec. Do not expose threshold details in user errors. [OWASP input validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html), [CSRF guidance](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html), and [bot-management guidance](https://cheatsheetseries.owasp.org/cheatsheets/Bot_Management_and_Anti-Automation_Cheat_Sheet.html) support these boundaries.

## 7. Notifications and sales handoff

On durable save, return an opaque reference number and a localized success state. Internal notification is queued asynchronously to a **configured, verified sales recipient**, with retry and monitoring; mail failure cannot turn a persisted inquiry into a user-visible submission failure. The email contains a reference and secure admin link rather than private attachments. A customer acknowledgment email is disabled until sender domain, localized template, delivery service, and privacy review are verified. Do not promise a response SLA without a confirmed policy.

Sales follow-up is manually assigned and audited through `New → Triaged → Assigned → Contacted → Closed`. Attachment scan and abuse-review states are tracked separately, not confused with sales progress. Authorized staff can record assignment, contact, and closure; the public visitor cannot query records by reference alone. [Inquiry-Workflow.md](Inquiry-Workflow.md) owns transitions and retry cases.

## 8. Multilingual contract

The first public form is English at the approved root routes. The engine stores a locale code and privacy-notice version, renders localized labels, options, hints, validation errors, upload states, success/failure text, and future email templates from locale dictionaries, and preserves buyer-entered text in its original language. A future locale becomes public only after its page routes, privacy notice, form copy, and transactional messages are approved and the Sitemap/ADR are updated. Do not publish `/en`, `/zh`, or a language switcher just because the data model is locale-ready. Do not machine-translate buyer input as the authoritative record.

## 9. Release gates and non-goals

Before implementation or public release, update the CMS architecture for ProductModels/Inquiries/attachments, define roles and operational configuration, verify published privacy/legal copy and retention, choose and test private storage plus scanning, configure verified internal notification recipients, and validate the localized form and all [acceptance cases](RFQ-Acceptance-Criteria.md). The project [Runbook](../../docs/context/RUNBOOK.md) currently has no verified install, run, test, or deployment procedure; this design does not claim any such check passed.

This version does not create a vehicle fitment database, automatic compatibility decision, public model-detail page, live price/quote calculator, certification claim, CRM integration, SMS/WhatsApp channel, automatic sales assignment, or guaranteed reply time.
