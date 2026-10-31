# Site SEO Specification

Status: planning contract, 2026-10-31. The [Sitemap](../../docs/02-架构/SITEMAP.md) owns routes and publication states. This document owns shared metadata and indexing rules; each PageSpec owns its page topic, unique description brief and eligible structured-data type. No deployed tags, crawler result or ranking is claimed.

## Canonical URLs and indexability

- A public page has one absolute, self-referential canonical URL derived from the approved route registry. Internal links, Open Graph URL and XML sitemap use the same URL. Do not create `/en`, trailing-slash variants, category-prefixed article details or canonical URLs from untrusted query parameters. [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) describes canonical signals; it does not guarantee Google's selection.
- Launch pages become indexable only after the real route, content and metadata pass publication checks. Planned pages remain unavailable to the public until their [Sitemap](../../docs/02-架构/SITEMAP.md#url-与内容发布规则) gate passes. Draft/preview content uses access control and `noindex`; `robots.txt` is not a substitute for `noindex`. [Google noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing), [robots.txt guidance](https://developers.google.com/search/docs/crawling-indexing/robots/intro).
- The generated XML sitemap contains only public, canonical, indexable page URLs and actually published article URLs. It excludes drafts, Planned routes not yet opened, `/blog/{slug}` as a pattern, query variants and `#` anchors. `robots.txt` points to the production XML sitemap. Submission of a sitemap helps discovery but does not guarantee crawling or indexing. [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview).

## Metadata contract

Every public page has one unique title, one concise description grounded in visible approved content, one H1, canonical, robots directive and document language `en`. The title pattern may append the approved brand name once it exists; a placeholder company name is not published. Product platform and Blog metadata come from approved Payload fields; fixed pages use reviewed code configuration. Metadata is removed or revised with the underlying claim when evidence changes.

Share previews use `og:title`, `og:description`, `og:url`, `og:type` and an optional `og:image` only when a licensed, relevant image with a stable absolute URL exists. An optional Twitter/X card uses the same approved source. These are project sharing choices, not Google structured-data requirements. No unverified image, logo, rating, price or certificate is inserted solely for a preview.

## Structured data boundaries

| Page family | Allowed when verified | Omit until verified |
| --- | --- | --- |
| Home/About | `Organization` with real business identity and approved fields | Guessed legal entity, group relationship, logo, address or contact details |
| Child pages | `BreadcrumbList` matching visible parent/child links | Fabricated breadcrumb levels or unavailable routes |
| Published Blog article | `Article` or `BlogPosting` with verified title, date, author/publisher and image where used | Draft content, invented author/date/image |
| Product platform | `Product` only for a real, stable, verified product/model represented on that page | Generic platform-as-product, invented `Offer`, price, availability, rating or reviews |
| Contact/RFQ/legal | No special JSON-LD required by this project baseline | Form, rating or organization data invented for rich results |

Structured data must match visible content. It does not guarantee a rich result. Sources: [Google Article](https://developers.google.com/search/docs/appearance/structured-data/article), [Breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb), [Product](https://developers.google.com/search/docs/appearance/structured-data/product), and [Schema.org Organization](https://schema.org/Organization).

## Page-topic matrix

| Route family | Title/description brief | Default public indexing |
| --- | --- | --- |
| Home | Four product platforms and B2B sourcing/development entry; no unsupported superlatives. | Index after release |
| Products and four platforms | Distinguish the platform, application and buyer next step; Wheels appears first in overview, without making other platforms invisible. | Index after release |
| Three fixed Wheels child pages | Flow-Formed and Forged focus on distinct verified processes and selection inputs; Custom Wheels focuses on project inputs and stages. Each needs substantial unique visible content, not a keyword-swapped Wheels summary. | Index individually after content review and release |
| Engineering and two detail pages | State which product line each design/manufacturing/validation claim belongs to. | Index after release |
| How We Work, About, Manufacturing | Cooperation stages or verified business/facility identity, with distinct page topics. | Index after release |
| Contact and Request a Quote | General contact versus purchasing inquiry; avoid duplicate descriptions. | Index after release |
| Blog overview/categories/articles | Category/topic and published article title/date; no empty category route. | Only after Blog/content gate |
| Privacy Policy and Terms of Use | Reviewed policy title and scope; no generated legal promise. | Only after reviewed publication |

No hreflang alternate is emitted while English is the only public language. Future locales require route and content approval in the Sitemap/ADR before alternate links are generated. Image filenames and alt text describe the actual approved asset and its role; decorative images have empty alt. Alt text is for accessibility and accurate content, not keyword stuffing.

## Verification checklist

For each future public URL, inspect rendered title, description, H1, canonical, robots, language, social tags, relevant JSON-LD, internal links and sitemap inclusion. Confirm all metadata claims and images against approved content. Test draft/Planned exclusion and old article slug redirects. Record actual crawler/test results before marking SEO implementation verified.
