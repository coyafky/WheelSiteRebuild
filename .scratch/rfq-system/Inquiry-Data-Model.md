# Inquiry Data Model

Status: **design contract; not a deployed Payload schema**. The business boundary and trust model are in [RFQ-System-Spec.md](RFQ-System-Spec.md); field-level requirements are in [Inquiry-Field-Definition.md](Inquiry-Field-Definition.md). This model extends the currently documented [Next.js + Payload architecture](../../docs/02-架构/CMS_ARCHITECTURE.md) only after that architecture is updated for implementation.

## 1. Entity map

```text
ProductPlatform (existing; exactly four fixed records)
  1 ── 0..N ProductModel (new; reviewed model registry, no detail URL)
  1 ── 0..N Inquiry (optional selected platform)
ProductModel 1 ── 0..N Inquiry (optional selected model)
Inquiry 1 ── 0..5 InquiryAttachment
Inquiry 1 ── 0..N InquiryEvent
Inquiry 1 ── 0..N NotificationOutboxItem
SalesUser 1 ── 0..N Inquiry (optional assignee)
```

`ProductPlatform` is the existing fixed-content source for Wheels, EV Housings, Custom Aluminum, and Safety Tires. `ProductModel` is a new trusted selection record, not a public product-detail page. `Inquiry` is the single record type for Product Inquiry, Custom Project, OEM/ODM, and General Inquiry.

## 2. ProductModel collection

| Field | Type / rule | Authority |
| --- | --- | --- |
| `id` | Stable opaque ID; immutable once used in a public CTA or inquiry | Server/Payload |
| `platformId` | Required relationship to one of the four approved platform records | Server/Payload |
| `displayName` | Required reviewed label; localized values only where approved | Editor with evidence |
| `modelCode` | Optional reviewed code, unique within its platform when present | Editor with evidence |
| `publicationState` | Draft / Published / Withdrawn | Authorized editor |
| `evidenceRef` | Internal source or review note, required before Published | Authorized editor |
| `createdAt`, `updatedAt` | Audit timestamps | Server |

No model record is synthesized from the RAYONE site, brochure snippets, a URL string, or a visitor's text. The current Sitemap does not grant model-detail routes. A Published model may populate a visible RFQ selector and be referenced by stable ID; a Draft/Withdrawn model cannot be newly selected. An older inquiry retains its immutable server-created product snapshot even if the catalog record later changes.

## 3. Inquiry collection

| Group | Field | Type / rule | Trust / privacy note |
| --- | --- | --- | --- |
| Identity | `id` | Internal UUID or equivalent unique key | Server-generated; never used as public lookup credential. |
| Identity | `reference` | Unique opaque, non-sequential public confirmation code | Server-generated after durable save; uniqueness enforced. Does not grant record access. |
| Classification | `inquiryType` | `product`, `custom_project`, `oem_odm`, `general` | Validated enum. `/contact` accepts `general`; `/request-quote` accepts the three commercial types. |
| Classification | `locale` | Published form locale code | Server resolves from route/page, not a free client string. English only at current launch. |
| Classification | `sourceRoute` | Canonical route or approved product path, optional | Attribution only; sanitized and never a product authority. |
| Classification | `submittedAt`, `createdAt`, `updatedAt` | Server timestamps | Not client timestamps. |
| Contact | `contactName` | Required bounded text | Buyer input; private. |
| Contact | `email` | Required normalized, syntactically valid reply address | Buyer input; private. Syntax does not prove mailbox ownership. |
| Contact | `company`, `phone`, `countryRegion` | Optional bounded text | Buyer input; private; no invented defaults. |
| Product | `platformId` | Required for Product Inquiry; optional for Custom/OEM; absent for General | Server-resolved existing platform reference. A valid `modelId` implies its platform. |
| Product | `platformSelectionState` | `selected`, `unsure`, or `not_answered` | Records the buyer's explicit “unsure” choice for Custom/OEM without inventing a platform; General uses `not_answered`. |
| Product | `modelId` | Optional Published ProductModel reference | Server re-reads and checks platform relationship on every submit. |
| Product | `resolvedProductSnapshot` | Server-created platform/model ID, reviewed label/code, and canonical platform path at submit time | Immutable historical snapshot; excludes client-supplied price/image. Nullable for General and unsure Custom/OEM. |
| Product | `buyerModelText` | Optional bounded text for an unlisted model | Explicitly marked unverified buyer statement; not a ProductModel record. |
| Need | `description` | Required bounded free text | Original buyer wording preserved; no automated claim verification. |
| Need | `technicalRequirements`, `vehicleApplication` | Optional bounded text | Vehicle text only displayed for Wheels/Safety Tires; does not prove fitment. |
| Need | `wheelSpecs` | Optional object: `size`, `pcd`, `et`, `centerBore` | Buyer-supplied bounded strings; only valid for Wheels. No inferred compatibility result. |
| Need | `wheelProcessInterest` | Optional enum: `flow_formed`, `forged`, `unsure` | Buyer-visible, editable selection; only valid for Wheels commercial inquiries. Records interest, not a validated manufacturing method or product claim. Cleared when another platform is submitted. |
| Procurement | `estimatedQuantity`, `desiredTimeline`, `destinationRegion`, `budget` | Optional bounded buyer text | Unknown can be blank; no implied MOQ, price, currency, or delivery promise. |
| Privacy | `privacyAcknowledgedAt`, `privacyNoticeVersion`, `privacyNoticeLocale` | Required evidence for an accepted submission | Server timestamp plus published notice version/locale; notice content is not copied into each record. |
| Privacy | `marketingOptIn`, `marketingChoiceAt` | Boolean default false; server timestamp only if explicitly chosen | Separate from inquiry processing. No prechecked marketing consent. |
| Workflow | `salesStatus` | `New`, `Triaged`, `Assigned`, `Contacted`, `Closed` | Server initializes New; authorized staff transitions only. |
| Workflow | `assignedTo` | Optional authorized SalesUser reference | Manual assignment; not public. |
| Workflow | `abuseReviewState` | Clear / Review / Rejected | Separate from salesStatus; access-controlled. |
| Workflow | `attachmentState` | None / PendingScan / Clean / Attention | Derived from associated attachment states; does not determine whether body was saved. |
| Relations | `attachmentIds` | 0–5 private InquiryAttachment references | Only server-verified upload-session files may attach. |

Do not store product price, product image URL, certification claim, hidden RAYONE form values, or raw client model name as a trusted catalog field. Avoid raw IP storage in the Inquiry record by default; the anti-abuse layer may use short-lived request signals under the approved privacy policy. Do not log full descriptions, contact values, or file content in application logs.

## 4. InquiryAttachment collection and private storage

| Field | Rule |
| --- | --- |
| `id`, `inquiryId` | Opaque attachment ID and owner inquiry reference. A temporary upload session may precede final attachment binding. |
| `originalFilename` | Sanitized display-only buyer filename; never used as a storage path. |
| `storageKey` | Random generated key in private quarantine/approved storage. |
| `detectedType`, `byteSize`, `contentHash` | Server-detected metadata; never trust browser MIME alone. |
| `scanState` | PendingScan / Clean / Rejected / Deleted, with server timestamps. |
| `scanReasonCode` | Internal non-sensitive classification; no raw scanner output in customer messages. |
| `accessScope` | Only authorized sales/admin after Clean; no public read URL. |

Upload constraints: at most **5 files**, **25 MB each**, **50 MB total**; allowlist **PDF, PNG, JPG, STEP, DWG, DXF**. Verify the chosen scanner and storage can safely handle each before release; unsupported types must fail closed. The [OWASP upload guidance](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html) supports extension allowlists, content verification, random filenames, private storage, and scanning. A rejected file does not delete a durably saved inquiry body; it remains unavailable to sales download.

## 5. InquiryEvent, NotificationOutboxItem, and sales users

| Entity | Fields / rule | Access |
| --- | --- | --- |
| `InquiryEvent` | `id`, `inquiryId`, `eventType`, actor ID or system, prior/new status when applicable, timestamp, short reason. Append-only; do not duplicate full PII. | Sales/admin read; system writes; admin correction requires a new event. |
| `NotificationOutboxItem` | `id`, `inquiryId`, `kind` (internal notice or future customer receipt), template locale/version, configured recipient key, delivery status, attempt count, next retry time, sanitized last error. | System service and admin operations only. Idempotent dispatch keyed by inquiry+kind. |
| `SalesUser` | Existing/future Payload user with role/permission for inquiry access. No recipient address is hard-coded in this spec. | Staff permissions must be provisioned and reviewed before release. |

Internal email should contain the reference, inquiry type, and authenticated admin link, not raw attachments. A configured sales recipient and delivery service are release requirements. Customer receipts remain disabled until sender and localized templates are verified.

## 6. Validation, access control, and lifecycle invariants

1. A single server submission boundary validates request size, type, route/type pairing, field schemas, privacy acknowledgment/version, upload ownership, and anti-abuse result before persistence. Browser validation improves usability but cannot be the authority; see [OWASP input validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html).
2. Product IDs are re-resolved immediately before save. `modelId` must refer to a Published model and match `platformId`; the server sets the snapshot. Invalid/stale IDs return a field error requesting re-selection, preserving other user input. General Inquiry cannot persist product fields; hidden fields from a previous type are discarded server-side.
3. Enforce a unique idempotency key per submission attempt so retry after timeout returns the same saved reference rather than creating a duplicate. The key is scoped to the form session and stored only as long as the configured retry window requires.
4. Public users have no direct Payload collection read/list/update/delete rights for Inquiry or Attachment. The submission endpoint is a narrow create service; authenticated sales may read assigned/authorized records and update allowed workflow fields; administrators may manage roles, retention, and exceptional corrections. Do not assume a Payload Local API call enforces collection ACL automatically: [Payload documents its default override behavior](https://payloadcms.com/docs/local-api/access-control).
5. Attachment scanning and email delivery are asynchronous and cannot change a durably saved inquiry back to “not submitted.” Scan failure changes attachment availability; notification failure remains in outbox for retry. Both produce operational alerts without exposing private details publicly.
6. A reviewed retention schedule and deletion/correction process must cover Inquiry, Attachment, Event, and Outbox data. Configure deletion/anonymization and backup treatment only after privacy/legal review; **no retention duration is invented here**. Block real public submission until the approved policy and operational configuration exist. [GDPR data-minimization and storage-limitation principles](https://eur-lex.europa.eu/eli/reg/2016/679/oj/?pid=14006577) inform this design without deciding applicable jurisdiction.

## 7. Migration and admin boundary

Before coding, update [CMS_ARCHITECTURE.md](../../docs/02-架构/CMS_ARCHITECTURE.md) to acknowledge ProductModels, Inquiries, InquiryAttachments, outbox, and staff roles. Define Payload collections, migrations, private storage, access tests, backup/restore, and an admin UI that shows reference, type, product context, attachment state, sales status, assignment, and events. Real model records, recipient addresses, legal text, and certificates must be entered from verified sources, not generated by this specification.
