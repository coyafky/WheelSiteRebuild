# Global Page Shell Spec

Status: design specification, 2026-10-31; not implemented or tested. Routes and publication status come from [Sitemap](../../docs/02-架构/SITEMAP.md); tokens and accessibility targets from [Design.md](../../Design.md).

## Contract

The shell composes one [Header](../global-header/spec.md), one main landmark, and one [Footer](../global-footer/spec.md). It supplies a keyboard-visible skip link to the main landmark, document language, canonical metadata from the [SEO Spec](../site-seo/spec.md), and a single H1 supplied by the PageSpec. It does not choose a page's claims, images or route. A page may include its own [Breadcrumb](../global-breadcrumb/spec.md) and one closing inquiry block without duplicating the Footer's PreFooterCTA.

Use the approved `layout.contentMax`, gutters, grid, section gaps and type tokens. The same container alignment applies to Header, main sections and Footer. The shell exposes a route status: public only when content and page acceptance pass; preview is access controlled and `noindex`; Planned pages do not become public from a route record alone.

## Responsive and interaction states

- Header overlay state and Footer publication gates are delegated to their own specs; the shell must not create a second navigation registry.
- Moving between routes closes stale navigation overlays, announces or focuses the new main content appropriately, and keeps the browser's back/forward history meaningful.
- At 320, 375, 768, 1024 and 1440 CSS px and 200% zoom, no required content or action is clipped. Reduced motion cannot delay essential content.
- A missing approved brand asset uses a labelled internal preview placeholder; public output requires reviewed brand treatment. Empty legal or contact slots do not render dead links.

## Acceptance

Inspect one product, one capability, one form and one Planned preview page. Each has one Header/main/Footer landmark sequence, one H1, a working skip link, correct language and metadata, no duplicate closing CTA, and the correct public/preview gate. Check keyboard order, focus after navigation, narrow widths and zoom in the implemented artifact.
