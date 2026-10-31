# Inquiry Field Definition

Status: **approved feature choices expressed as a draft field contract; no form is implemented**. [RFQ-System-Spec.md](RFQ-System-Spec.md) owns taxonomy and trust boundaries; [Inquiry-Data-Model.md](Inquiry-Data-Model.md) owns persistence. This document defines UI visibility, required conditions, and client/server validation.

## 1. Form presentation rules

- `/request-quote` is a **single-page conditional form**. Its first control chooses Product Inquiry, Custom Project, or OEM/ODM. A valid entry hint may preselect a type, platform, and verified model, but the buyer sees and can change them. `/contact` displays General Inquiry using the same form engine and shared contact controls; its product-specific controls are absent.
- Required fields use persistent visible labels and a text marker such as “Required.” Unknown technical values, quantity, timing, country/region, company, phone, and files can be left empty. Do not render a field as required only through color or an asterisk without explanation.
- Changing inquiry type keeps shared contact/description values. Type-specific draft values may remain locally if the buyer switches back, but hidden irrelevant values are excluded from the submitted payload and discarded by the server. Changing platform clears a mismatched selected model and hides or discards inapplicable wheel/vehicle fields, including wheel process interest, from the submission.
- All labels, help text, errors, options, privacy text, and result states are localization keys. English is the only approved public locale under [ADR 0002](../../docs/adr/0002-english-routes-at-root.md); future locale publishing requires equivalent page and privacy copy approval. The original buyer-entered text is not machine-translated into the authoritative record.
- Field defaults never imply buyer knowledge: no prefilled quantity, fitment, budget, certification, or delivery time. Only server-resolved product context may be preselected, and it remains visibly editable.

## 2. Shared field matrix

Technical maximum lengths below are initial abuse/operability limits, not product or sales rules. Validate after Unicode-aware trim on both client and server. Reject overlong input with an inline error; never silently truncate buyer requirements. A blank optional field remains null/absent, not the string `0`, `unknown`, or a fabricated value.

| Field ID / UI label | Show for | Required | Data and validation | Saved as |
| --- | --- | --- | --- | --- |
| `inquiryType` / Inquiry type | `/request-quote` commercial view | Yes; one of three | Enum `product`, `custom_project`, `oem_odm`; may be preselected from a validated entry hint; buyer can change. `/contact` is fixed `general`. | `Inquiry.inquiryType` |
| `contactName` / Contact name | All four | Yes | Trimmed Unicode text, 1–120 characters; no arbitrary English-only name pattern. | `contactName` |
| `email` / Email | All four | Yes | Trimmed, max 254 characters, syntactically valid reply address; normalize safely on server. No promise that syntax proves delivery. | `email` |
| `company` / Company | All four | No | Trimmed text, max 160 characters. | `company` |
| `phone` / Phone | All four | No | Trimmed text, max 80 characters; accept international formatting, reject control characters. Do not require WhatsApp. | `phone` |
| `countryRegion` / Country or region | All four | No | Trimmed text, max 120 characters; not geolocated or guessed. | `countryRegion` |
| `description` / Tell us what you need | All four | Yes | Trimmed text, 1–5,000 characters. Prompt differs by type but one field persists. | `description` |
| `privacyAcknowledged` / Privacy-processing acknowledgment | All four | Yes for real submit | Unchecked by default. Must be explicitly true for the currently published, localized privacy notice/version. Final legal wording and processing basis require review. | `privacyAcknowledgedAt`, notice version and locale |
| `marketingOptIn` / Optional updates | All four only when approved marketing copy exists | No | Separate unchecked choice; never bundled with inquiry processing. If marketing process is not approved, omit the control and store false. | `marketingOptIn`, optional choice time |

The form must link to the actual published privacy notice when real submission opens. The current Sitemap marks `/privacy-policy` as a Launch target; publication of the reviewed notice and retention/deletion rule is still a release gate, not a reason to render a dead link. [Design.md](../../Design.md) requires inline errors, form-level status, and retained values after validation errors.

## 3. Commercial and product-context fields

| Field ID / UI label | Visibility | Required | Validation and trust rule |
| --- | --- | --- | --- |
| `platformId` / Product platform | Product, Custom Project, OEM/ODM | Product: yes, either directly or through a valid model. Custom/OEM: no; show explicit `Not sure yet` option. | Must resolve to one of the four approved published Payload platform records. Never accept a free client label as the platform. |
| `modelId` / Product model | Commercial types after a platform is selected or valid model hint resolves | No | Selector lists only Published `ProductModels` for the selected platform. Server checks ID, publication, and relationship again. A valid model implies its platform. No model-detail URL is required. |
| `buyerModelText` / Model or reference not listed | Commercial types, optional alternative/addition to model selection | No | Trimmed text, max 160 characters; stored explicitly as unverified buyer wording. Does not override `modelId`. Product Inquiry still needs a valid platform if no verified model is selected. |
| `technicalRequirements` / Additional technical requirements | Commercial types | No | Trimmed text, max 5,000 characters; no invented product specification or certification requirement. |
| `estimatedQuantity` / Estimated quantity | Commercial types | No | Buyer text, max 120 characters, allowing an amount plus cadence/unit such as a future estimate. Do not enforce MOQ or assume pieces/sets. |
| `desiredTimeline` / Desired timing | Commercial types | No | Buyer text, max 120 characters; no promised delivery date or SLA. |
| `destinationRegion` / Destination market or region | Commercial types | No | Buyer text, max 120 characters; no inferred shipping capability. |
| `budget` / Budget, if known | Commercial types | No | Buyer text, max 120 characters; user currency/context remains as entered. Never treat as a product price. |
| `attachments` / Drawings or requirement files | Commercial types | No | 0–5 files, ≤25 MB each and ≤50 MB total; PDF, PNG, JPG, STEP, DWG, DXF. Server verifies content and scan state; no upload control on General Inquiry. |

The `platformId` and `modelId` in a link/query are **hints**. Initial render must use server-resolved, published records. If a hint is invalid, stale, withdrawn, or mismatched, show a nonblocking selection error and let the buyer choose again. On submit, the server rejects stale IDs with a field-specific re-selection error while preserving other entries. Do not use incoming `productName`, `productImage`, `modelCode`, or `price` as trusted hidden fields. A product page CTA can carry the stable IDs on the existing `/request-quote` route; no new public route is created.

## 4. Platform-conditional fields

These fields are **optional buyer descriptions**. They help sales qualify a need; they do not validate fitment or assert an available specification. Do not infer a parameter from a model name or automatically fill a technical value without a reviewed source.

| Field ID / UI label | Show when | Required | Validation |
| --- | --- | --- | --- |
| `vehicleApplication` / Vehicle or application details | Selected platform is Wheels or Safety Tires, in any commercial type | No | Free text, max 500 characters. Prompt may ask for make, model, year, or use context without demanding all. No fitment lookup, compatible/not-compatible result, or database is implied. |
| `wheelProcessInterest` / Wheel process of interest | Selected platform is Wheels, in any commercial type | No | Visible editable choice: `flow_formed`, `forged`, or `unsure`; blank is also valid. An approved Flow-Formed/Forged page may preselect the matching choice. This is buyer interest, not a confirmed production method or model classification; Custom Wheels preselects `custom_project` inquiry type and leaves process blank unless the buyer chooses it. |
| `wheelSpecs.size` / Desired size | Selected platform is Wheels | No | Buyer text, max 80 characters. Unknown may be blank. |
| `wheelSpecs.pcd` / PCD | Selected platform is Wheels | No | Buyer text, max 80 characters. Unknown may be blank; no guessed bolt pattern. |
| `wheelSpecs.et` / ET / offset | Selected platform is Wheels | No | Buyer text, max 80 characters. Unknown may be blank. |
| `wheelSpecs.centerBore` / Center bore | Selected platform is Wheels | No | Buyer text, max 80 characters. Unknown may be blank. |

The four wheel specification fields and optional process-interest choice are grounded in existing wheel-source cues but are not yet product truth or mandatory qualification rules. EV Housings and Custom Aluminum do not receive invented specialized schema fields at launch; their buyer can describe requirements and attach drawings. Safety Tires has vehicle/application text but no automatic tire-fitment result.

## 5. Conditional display and submission matrix

| Context | Visible sections | Required beyond shared four | Excluded from payload |
| --- | --- | --- | --- |
| Product Inquiry, no platform selected | Shared; platform/model selection; procurement; technical; attachments | Valid platform or verified model | Vehicle/wheel fields until a qualifying platform is selected. |
| Product Inquiry, Wheels | Shared; platform/model; procurement; technical; optional vehicle and wheel fields; attachments | Valid Wheels platform/model | No other platform-specific fields. |
| Product Inquiry, Safety Tires | Shared; platform/model; procurement; technical; optional vehicle; attachments | Valid Safety Tires platform/model | Wheel spec fields. |
| Product Inquiry, EV Housings or Custom Aluminum | Shared; platform/model; procurement; technical; attachments | Valid selected platform/model | Vehicle and wheel spec fields. |
| Custom Project or OEM/ODM, platform unsure | Shared; optional platform/model; procurement; technical; attachments | None | Vehicle/wheel fields. Persist explicit `platformSelectionState=unsure` if chosen. |
| Custom Project or OEM/ODM, platform selected | Shared; optional model; procurement; technical; attachments; conditional wheel/vehicle fields as above | None | Fields for other platforms. |
| General Inquiry on `/contact` | Shared contact, description, privacy, optional approved marketing | None | All product, procurement, technical, vehicle, and attachment fields. |

Shared four means **contactName, email, description, privacy acknowledgment**. Company, phone, and country/region stay optional across all types.

## 6. Client and server validation behavior

1. Client validation gives immediate, localized field feedback and prevents obvious incomplete submissions. It is not a security boundary. Server validation repeats all rules, treats even hidden or prefilled fields as untrusted, and returns stable field IDs plus localized error keys; see [OWASP Input Validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html).
2. Normalize whitespace and email carefully, reject control characters and overlong input, and store original buyer meaning. Do not reject non-Latin names or multilingual requirements. Never silently truncate. Technical strings have length bounds but no invented fitment ranges, MOQ, or approval claims.
3. Show a form-level summary when validation fails, focus that summary or first invalid field, associate each message with its input, and preserve all valid entries and eligible temporary uploads. Do not clear the entire form because one optional field is invalid.
4. Submit button is disabled/busy while the request is pending, with a visible status. A timeout permits an idempotent retry. Success is shown only after the inquiry body is durably saved and reference generated; attachment checks may still be pending and are named separately.
5. The server rejects irrelevant hidden fields rather than persisting them. It never turns a client-supplied model name, image, price, or vehicle text into a trusted catalog or fitment fact.
