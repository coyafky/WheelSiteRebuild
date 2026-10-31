# RFQ Acceptance Criteria

Status: **future acceptance plan, not executed tests**. This file defines observable, repeatable checks for [RFQ-System-Spec.md](RFQ-System-Spec.md), [Inquiry-Field-Definition.md](Inquiry-Field-Definition.md), [Inquiry-Data-Model.md](Inquiry-Data-Model.md), and [Inquiry-Workflow.md](Inquiry-Workflow.md). The project [Runbook](../../docs/context/RUNBOOK.md) has no verified install, test, or deployment procedure yet; a future implementation team must record its actual environment and commands before claiming any case passed.

## 1. Test fixture and evidence protocol

Use a non-public test environment with synthetic buyer identities and mail sink. Never submit test data to the RAYONE site or a live sales inbox. The fixture includes exactly four platform records with the approved IDs/routes; one Published synthetic Wheels model, one Draft/Withdrawn synthetic model, and one Published synthetic Safety Tires model; a published test privacy notice/version; an authorized sales user, unauthorized visitor, private upload store, scanner stub, and notification outbox/mailer stub. Fixture model names are **test data only**, not product claims or public catalog records.

For each case record: build/commit identifier, locale, route, viewport, input method, fixture state, request/response outcome, relevant saved record/event/outbox state, screenshot or log excerpt with PII redacted, and pass/fail. Reset the fixture between independent cases. A case is not passed by configuration alone; observe the stated result. Do not use a real customer's information or an unapproved production contact address.

## 2. Entry, taxonomy, and product context

| ID | Reproducible action | Pass condition |
| --- | --- | --- |
| RFQ-01 | Open `/request-quote` with no query and `/contact` separately. | Quote route shows one form engine with Product, Custom Project, OEM/ODM choices. Contact route shows General Inquiry using the same submission model, no product control, and a route to RFQ for purchase needs. No extra public inquiry route exists. |
| RFQ-02 | Choose each of the three commercial types, then return to a prior type. | One-page form changes fields immediately, retains shared name/email/description draft values, and excludes hidden irrelevant values from submitted payload. No multi-step wizard appears. |
| RFQ-03 | Open a product-page CTA with Published platform/model IDs. | Server resolves the model and platform, displays their reviewed labels visibly, allows buyer changes, and uses the canonical `/request-quote` path with ID hints only. |
| RFQ-04 | Change a preselected model's platform, then select another platform. | Incompatible model selection clears; the visible context and server payload agree. |
| RFQ-05 | Open with unknown, Draft, Withdrawn, or mismatched model ID, and separately alter the ID just before submit. | UI requests re-selection; submit rejects stale/mismatched ID with a field error while preserving other entries. No unverified name becomes a trusted snapshot. |
| RFQ-06 | Add client fields named price, productImage, modelName, or a forged sourceRoute to a valid POST. | Saved trusted product snapshot comes only from server ProductPlatform/ProductModel records; forged price/image/name is ignored or rejected and cannot appear as authoritative data. |
| RFQ-07 | Use Product Inquiry with platform only and no model; then Custom/OEM with `Not sure yet`; then General. | Product can submit platform-only, Custom/OEM can submit with explicit `unsure`, and General stores no product fields. No model-detail URL or fitment database is required. |
| RFQ-07a | Open Flow-Formed, Forged and Custom Wheels CTAs; edit the suggested choices, then switch away from Wheels. | Process pages suggest wheels plus an editable `flow_formed`/`forged` interest; Custom Wheels suggests wheels plus `custom_project` with no assumed process. Switching platform clears wheel-only interest; server rejects forged enum values. |

## 3. Field logic and validation

| ID | Reproducible action | Pass condition |
| --- | --- | --- |
| RFQ-08 | Submit each type with empty shared required fields. | Contact name, email, description, and approved privacy acknowledgment receive field errors; Product Inquiry also requires valid platform/model. Company, phone, region, quantity, timing, budget, specs, and files do not become required. |
| RFQ-09 | Enter valid non-Latin name and multilingual description; leave every technical parameter blank. | Submission succeeds when required data and gates are valid; text is preserved without forced translation or English-only name validation. |
| RFQ-10 | Enter overlong text, invalid email, control characters, and an invalid enum by bypassing browser validation. | Server rejects with stable field IDs and localized messages, does not truncate silently, and does not persist an Inquiry. Client also shows usable inline errors for ordinary invalid input. |
| RFQ-11 | Select Wheels, Safety Tires, EV Housings, and Custom Aluminum in turn. | Wheels shows optional process interest, size/PCD/ET/center bore and vehicle text; Safety Tires shows vehicle text but no wheel fields; other platforms show no vehicle/wheel fields. All retain optional technical-requirements text and commercial fields. |
| RFQ-12 | Enter vehicle/application text for Wheels or Safety Tires and submit. | Text is stored as buyer-supplied context; UI and response make no automatic compatible/not-compatible claim and no database match is attempted. |
| RFQ-13 | Fail validation after filling optional fields, then correct the error. | Field-level and form-level errors are associated with controls; previously valid values and eligible temporary files remain; focus moves to a useful error target; only one Inquiry is created after correction. |

## 4. Attachments and abuse protection

| ID | Reproducible action | Pass condition |
| --- | --- | --- |
| RFQ-14 | Upload 5 accepted fixture files below both size limits, then try a sixth, a file over 25 MB, and a batch over 50 MB. | First set enters private quarantine; each limit violation produces a file-specific error without erasing the form. No sixth/oversize file is bound to an Inquiry. |
| RFQ-15 | Rename an executable/archive to `.pdf`, alter browser MIME, use malformed CAD content, and use a genuine accepted fixture file. | Extension/MIME alone cannot bypass server inspection. Unsupported/malformed files are rejected or remain isolated; genuine supported files proceed to scan. Types the deployed scanner cannot validate are disabled. |
| RFQ-16 | Save a valid inquiry with a file whose scanner is deliberately delayed. | Inquiry reference appears after durable body save with “file checks pending” state; attachment is not downloadable by sales or public users while PendingScan. |
| RFQ-17 | Return Clean, Rejected, and scanner-error results from the stub on separate saved inquiries. | Only Clean file is staff-downloadable; Rejected/error files remain isolated with an operational attention state; saved inquiry/reference is not erased or falsely marked failed. |
| RFQ-18 | Submit using another form session's attachment ID and an expired temporary ID. | Server rejects attachment ownership/expiry; no cross-inquiry file disclosure occurs. Unbound files follow cleanup policy. |
| RFQ-19 | Fill honeypot, forge Origin/CSRF state, and exceed configured rate limit in separate tests. | Each request is blocked without a reference or saved Inquiry; errors do not reveal thresholds; legitimate keyboard users can use an accessible challenge if one is enabled. |

## 5. Persistence, notifications, sales, and privacy

| ID | Reproducible action | Pass condition |
| --- | --- | --- |
| RFQ-20 | Submit one valid minimal inquiry with approved notice and no attachment. | Exactly one Inquiry, New event, opaque unique reference, and internal outbox item persist; success appears only after commit. |
| RFQ-21 | Simulate database failure before commit; then simulate client timeout after commit and retry with the same idempotency key. | Before-commit failure shows no success/reference and retains input. After-commit retry returns the same reference and creates no duplicate Inquiry/outbox item. |
| RFQ-22 | Make mailer fail repeatedly after a successful save, then restore it. | Visitor success remains valid; outbox records retries and operational alert, then sends at most one logical internal notice. No drawing is attached to email. |
| RFQ-23 | Try customer acknowledgment email with sender/template gate disabled, then enabled using verified test settings. | No customer email is sent while gated; after enablement, it uses the correct locale template and its failure does not invalidate a saved inquiry. |
| RFQ-24 | Move an inquiry through New → Triaged → Assigned → Contacted → Closed using authorized roles; try the same as a public user. | Each authorized transition has actor/time event and manual assignee where required; public user cannot list/read/update it, even with the reference. Attachment/abuse states remain separate. |
| RFQ-25 | Call Payload REST/GraphQL/Local API paths under public and staff contexts. | Public inquiry/attachment read, list, update, and delete fail; the controlled submission service can create only after its own validation. Local API calls do not bypass the intended policy. |
| RFQ-26 | Submit without privacy acknowledgment, with stale notice version, and with optional marketing unchecked. | Invalid privacy state blocks real submission; accepted record stores current notice version/locale and server time. Marketing is false unless separately chosen and never a condition for RFQ. |
| RFQ-27 | Attempt public submission with privacy notice, retention rule, deletion process, scanner, recipient, or storage configuration absent. | Release gate prevents real public submission or deployment; no placeholder legal text, unverified address, or unscanned public attachment is exposed. |

## 6. Localization, design, SEO, and operational checks

| ID | Reproducible action | Pass condition |
| --- | --- | --- |
| RFQ-28 | Run English launch build; inspect routes, labels, errors, success, and email setting. Then introduce an incomplete future-locale fixture. | English uses root URLs without `/en`; no unapproved `/zh` route is published. Locale dictionaries cover every visible state; incomplete future locale is not offered publicly. Buyer wording remains original. |
| RFQ-29 | At 320, 375, 768, 1024, 1440 CSS px and 200% zoom, complete each inquiry type by keyboard only. | No horizontal scroll or clipped required control; labels persist, focus is visible, submit busy/error/success are announced, controls are operable, and primary targets meet the project's 44 × 44 CSS px preference. |
| RFQ-30 | Measure contrast of text, input borders, errors, focus, disabled, and busy states against actual surfaces. | Normal text is at least 4.5:1; large text and meaningful UI at least 3:1; required/error meaning does not rely on red alone. Current [Design.md](../../Design.md) tokens are used without a new unapproved value. |
| RFQ-31 | Inspect generated HTML, request payload, admin records, and network responses. | Forms link to actual `/request-quote` or `/contact` destinations; no model detail/fitment route, invented product/certification claim, RAYONE asset/contact value, public storage URL, or client-supplied price/image is presented as trusted fact. |

## 7. Release evidence checklist

Before marking public RFQ ready, attach direct evidence for: updated CMS architecture; verified four platform records and any published ProductModels; approved privacy notice and actual retention/deletion operation; private storage and scan support for all six allowed types; rate-limit/CSRF/abuse configuration; authorized staff access and backup/restore; verified recipient and optional sender/template; locale completeness; WCAG/responsive checks; and the test run above. “Configured” is not “tested,” and this document does not claim any item has passed. No response SLA, automatic fitment, or automatic price quote is part of acceptance.
