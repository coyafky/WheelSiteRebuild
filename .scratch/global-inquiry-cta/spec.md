# Global Inquiry CTA Spec

Status: design specification, 2026-10-31; not implemented. The [Sitemap](../../docs/02-架构/SITEMAP.md) owns `/request-quote` and `/contact`; the [RFQ Spec](../rfq-system/RFQ-System-Spec.md) owns trusted inquiry context.

## Contract

A procurement CTA names the action and links to `/request-quote`; a non-procurement contact CTA links to `/contact`. The component receives a visible label, context source route, optional approved platform ID, optional inquiry type hint (`product`, `custom_project`, `oem_odm`) and optional verified model ID. Hints may preselect but never lock the buyer's choices. Generic Engineering, Manufacturing and Blog links do not guess a product or inquiry type.

Only stable IDs or non-sensitive source context may appear in a shareable URL. Drawings, personal contact details, free-text requirements, unverified product names/prices and private file references must not. The destination resolves hints server-side, displays the resolved context, and lets the buyer edit it. Invalid or stale hints lead to a visible chooser with a nonblocking error, as defined by the RFQ feature.

## Presentation and interaction

Use the approved primary/secondary button rules and one filled red action per section. Repeated CTAs may share a destination but should identify the product or next step in surrounding text. The Footer's PreFooterCTA appears once at page close; a page must not duplicate the same closing block. Buttons are keyboard reachable, have visible focus and work by touch without hover.

## Acceptance

Follow CTAs from Home, each product, How We Work, Engineering, Manufacturing, Contact and a published article. Verify correct route, editable trusted context, no sensitive URL data, clear action label, no duplicate close and usable focus/narrow-width behavior. No successful submission is implied by clicking a CTA.
