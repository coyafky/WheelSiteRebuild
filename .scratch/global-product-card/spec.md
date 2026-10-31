# Global Product Platform Card Spec

Status: design specification, 2026-10-31; not implemented. Product scope and Wheels-first priority come from the [business definition](../../docs/00-product/PRODUCT_BRIEF.md); routes come from the [Sitemap](../../docs/02-架构/SITEMAP.md); visual values from [Design.md](../../Design.md).

## Data and presentation

One card represents one of the four fixed product platforms. Inputs are stable platform ID, approved name, concise buyer/application differentiator, approved or preview-labelled image, canonical platform URL and optional accurately scoped inquiry hint. Home and Products order cards as Wheels, EV Housings, Custom Aluminum, Safety Tires. Wheels may receive greater editorial prominence, while every other platform remains directly visible and equally reachable.

The platform title/link opens its platform page. If a separate Request a Quote action is present, its label and hit area are distinct; it opens `/request-quote` through the [Inquiry CTA](../global-inquiry-cta/spec.md). A whole-card link must not contain a nested interactive link. Do not display price, MOQ, stock, model count or compatibility without verified data.

## Visual and states

Use the approved product-card radius, neutral image stage and semantic color tokens. Hover lift is supplementary; keyboard focus is clear and card meaning survives without hover or image. Missing approved media uses a labelled preview placeholder internally; public output needs approved media or a content-complete text treatment. Long platform names and translated labels wrap without clipping.

## Acceptance

Check four distinct cards and URLs, Wheels first, readable differentiators, no unsupported values, correct image rights/alt, no nested link conflict, focus and hover behavior, 320 px layout and 200% zoom. Each card leads to a real published page before public display.
