# Global Capability Evidence Block Spec

Status: design specification, 2026-10-31; claims and media remain subject to verification. [ADR 0004](../../docs/adr/0004-capabilities-by-product-line.md) fixes product-line capability organization; [Sitemap](../../docs/02-架构/SITEMAP.md) fixes capability routes.

## Content contract

Each block answers one procurement question with: a scoped capability statement, applicable product platform, process/test/facility evidence type, source reference, any relevant date/entity/applicability, optional approved media, and a link to the matching product, Engineering or Manufacturing page. A number or certificate additionally needs its unit, holder, product scope, validity and target-market applicability where relevant. A Wheel Engineering fact is not silently generalized to EV Housings or Safety Tires.

The public variant displays only verified claims and approved evidence. A missing proof either removes the claim or keeps the entire block preview-only with an explicit label; it never renders a blank certificate slot or unqualified superlative. The block distinguishes an actual test result from a diagram, simulation or process description. Static evidence blocks do not imitate clickable cards; only real links get hover/focus feedback.

## Data and layout

Content may be code-defined for fixed capability pages or referenced from a product platform record. The canonical source of a claim stays with the approved content/evidence record, not a copied card string. The layout pairs readable text with media where available, stacks at narrow widths and provides a text equivalent for process diagrams.

## Acceptance

For each public block, trace the claim to a source and product/entity scope, check media rights and alt, follow its real related link, and confirm absence of unsupported figures or badges. Inspect keyboard, 320 px width, 200% zoom and reduced-motion behavior in the implemented page.
