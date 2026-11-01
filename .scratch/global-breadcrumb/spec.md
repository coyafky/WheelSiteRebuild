# Global Breadcrumb Spec

Status: design specification, 2026-10-31; fixed-route breadcrumbs and development Blog previews implemented, public Blog article acceptance pending [ticket 06](issues/06-blog-breadcrumb.md). Parent relationships come from [Sitemap](../../docs/02-架构/SITEMAP.md); structured-data rules from [SEO Spec](../site-seo/spec.md).

## Contract

Render a labelled navigation landmark with ordered ancestor links and the current page text. Use canonical, published routes from the route registry; do not invent parent pages for an anchor, query, ProductModel or draft article. Product pages follow Home → Products → Platform; capability details follow Home → Engineering → Detail; Manufacturing follows Home → About → Manufacturing; Blog articles follow Home → Blog → published category → Article. Top-level pages may use Home → Current; Home itself needs no breadcrumb.

The visible labels use public navigation names, including Engineering for `/capabilities`; internal route names are not exposed as labels. A Blog category change may change visible ancestry but not the article canonical URL. An unpublished ancestor/list route cannot be linked publicly; the page stays gated until a valid route relationship exists.

## Interaction and SEO

Ancestors are ordinary keyboard-operable links. The current item is text with `aria-current="page"` and is not a duplicate self-link. `BreadcrumbList` JSON-LD, when emitted, is generated from the same ordered route records and matches the visible path; no separate SEO breadcrumb list is maintained.

## Acceptance

Inspect one route from each family, including Blog category/article and Manufacturing. Check labels, order, canonical URLs, focus, wrapping at 320 px, 200% zoom and identical visible/JSON-LD ancestry. Do not claim rich-result eligibility from this spec alone.
