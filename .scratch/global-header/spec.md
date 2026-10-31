# Global Header Component Specification

Status: **draft specification based on feature decisions confirmed on 2026-10-31; specification review pending**. This document specifies behavior and acceptance; it does not claim component implementation, testing, final brand-asset approval, or release. The design tokens referenced below are the **APPROVED BASELINE** in [Design.md](../../Design.md). Brand assets and contact details remain **TBD**.

## 1. Purpose, authority, and boundaries

The Header helps a B2B buyer reach one of four product platforms, inspect manufacturing capabilities, or begin an inquiry. It serves the approved product catalog plus OEM/ODM business model. The term **product platform** follows the [Glossary](../../GLOSSARY.md); it is not a vehicle fitment category or a list of every group business. Scope follows [ADR 0001](../../docs/adr/0001-main-site-product-scope.md), capability organization follows [ADR 0004](../../docs/adr/0004-capabilities-by-product-line.md), and routes and navigation order follow the [Sitemap](../../docs/02-架构/SITEMAP.md). This file is the feature specification under the [local issue tracker convention](../../docs/agents/issue-tracker.md).

Do not add RAYONE branding or assets, product models, sub-brands, product claims, phone numbers, email addresses, vehicle fitment search, or unpublished routes. Header copy is limited to approved page labels and the feature decisions below. Public release still requires an approved logo or other approved brand treatment.

## 2. Evidence register

### 2.1 Verified reference-site observations

Observed on the live [RAYONE site](https://www.rayonewheels.com/) on 2026-10-31; these are external-site facts, not this project's requirements or assets.

| Area | Observed fact | Verification limit |
| --- | --- | --- |
| Desktop utility strip | Shows Partnership Inquiry, Contact Us, Technical Support, a national service hotline, and 中文 / EN controls. | The displayed hotline and language support do not establish our own contact details or locale routes. |
| Desktop primary row | Shows Home, Product Center, Engineering, News, About RAYONE, Partnership, Request a Quote, and WHEEL SEARCH. | Labels and route structure belong to RAYONE. |
| Product Center | Clicking Product Center exposed an in-page mega menu and changed the URL hash to `#product-center`. The menu grouped wheel types, five sub-brands, image-backed tiles, and shortcut links. | The exact hover behavior and full focus sequence were not verified. |
| Search | WHEEL SEARCH opened a dialog labelled Product & Content Search, with model, size, process, and OEM/ODM suggestions. | This does not establish an available search index or fitment database for our site. |
| Inquiry | The reference CTA led to a `#product-inquiry` target with context query parameters. | Our approved inquiry route is `/request-quote`. |
| Mobile at 390 × 844 CSS px | The utility strip and full navigation collapsed to a compact logo/home link and an explicitly labelled menu button. | Drawer contents and mobile submenu transitions were not verified. |

### 2.2 Inferences from the reference

- The reference appears to prioritize catalog browsing and quote conversion; that is an interpretation of visible entry points, not a verified conversion result.
- Its product menu appears intended for explicit activation because it was hidden initially and became visible after a click. No claim is made that hover cannot also open it.
- Its hash-based inquiry flow likely suits its own page architecture. It is not a route model for this project.

### 2.3 Verified project facts and confirmed feature decisions

| Class | Fact or decision | Source |
| --- | --- | --- |
| Project fact | Four platforms are Wheels, EV Housings, Custom Aluminum, and Safety Tires; their URLs are fixed in the Sitemap. | [Sitemap](../../docs/02-架构/SITEMAP.md), [Glossary](../../GLOSSARY.md) |
| Project fact | Top navigation order is Products, Engineering, How We Work, About, Contact. Blog is inserted between How We Work and About only after the section opens. The independent CTA is Request a Quote. | [Sitemap](../../docs/02-架构/SITEMAP.md) |
| Project fact | Current public page plan is English at root URLs; no `/en` or live `/zh` route is approved. | [ADR 0002](../../docs/adr/0002-english-routes-at-root.md) |
| Project fact | The Header uses a white surface, dark links, a red underline for the active destination, one inquiry action, and an explicit narrow-screen menu control. Token values are the approved first-release baseline. | [Design.md](../../Design.md) |
| Confirmed decision | Launch renders one PrimaryHeader row. UtilityBar is an optional region of the unified Header and has no visible launch content until its entries are verified. | Owner confirmation in this feature discussion, 2026-10-31 |
| Confirmed decision | Products has a real `/products` link and a separate disclosure button. The mega menu is text-first: four platform links plus View All Products. It opens only by click, Enter, or Space, not hover. | Owner confirmation, 2026-10-31 |
| Confirmed decision | The mobile Header keeps a visible Quote action. The PrimaryHeader is sticky; an enabled UtilityBar scrolls away. | Owner confirmation, 2026-10-31 |
| Confirmed decision | In the mobile drawer, Products and its four child links are visible initially. Engineering has an overview link and a separate, initially closed disclosure for Wheel Engineering and Safety Tire Capabilities. | Owner confirmation, 2026-10-31; public labels follow the current Sitemap |

## 3. Navigation contract

The Header must use actual anchors with these canonical paths. Labels shown are the English launch labels; `Quote` is the compact mobile visual label for the same Request a Quote destination.

| Region / order | Label | URL | Behavior / gate |
| --- | --- | --- | --- |
| Brand | Approved logo or labelled internal placeholder | `/` | Home link; public release requires approved brand treatment. |
| 1 | Products | `/products` | Direct link; adjacent button discloses ProductsMegaMenu. |
| 1.1 | Wheels | `/products/wheels` | Product platform link. |
| 1.2 | EV Housings | `/products/ev-housings` | Product platform link. |
| 1.3 | Custom Aluminum | `/products/custom-aluminum` | Product platform link. |
| 1.4 | Safety Tires | `/products/safety-tires` | Product platform link. |
| 1.5, desktop menu | View All Products | `/products` | Secondary overview link; no separate route. |
| 2 | Engineering | `/capabilities` | Direct link; internal route retains `/capabilities`. |
| 2.1, mobile drawer only | Wheel Engineering | `/capabilities/wheels` | Revealed by mobile Engineering disclosure. |
| 2.2, mobile drawer only | Safety Tire Capabilities | `/capabilities/safety-tires` | Revealed by mobile Engineering disclosure. |
| 3 | How We Work | `/how-we-work` | Direct link for standard sourcing and custom development paths. |
| 4, conditional | Blog | `/blog` | Render only after the approved Blog section is opened with published content. |
| 5 | About | `/about` | Direct link; Manufacturing is also available in the Company footer group and About page. |
| 6 | Contact | `/contact` | Direct link for general contact. |
| Primary action | Request a Quote / Quote | `/request-quote` | Independent inquiry link. Header itself adds no invented product context. |

Do not add capability child links for EV Housings or Custom Aluminum. Their capabilities currently live on their product pages and the Engineering overview. Do not introduce an OEM/ODM route, model-detail route, search route, or fitment route through the Header. The existing Engineering, How We Work and inquiry links support the mixed catalog and OEM/ODM journey.

## 4. Component tree and responsibilities

```text
Header
├─ UtilityBar (optional; no launch output)
└─ PrimaryHeader (sticky)
   ├─ Brand home link
   ├─ Desktop primary navigation
   │  ├─ Products link + disclosure button
   │  └─ Engineering / How We Work / gated Blog / About / Contact links
   ├─ HeaderActions (quote link; compact menu button)
   ├─ ProductsMegaMenu (desktop disclosure panel)
   └─ MobileNavigationDrawer (compact-layout modal drawer)
```

| Component | Responsibility | It must not own |
| --- | --- | --- |
| `Header` | Compose regions, accept route and publication data, manage one active overlay, and close overlays on route or layout changes. | Product content, page canonical tags, or brand approval. |
| `UtilityBar` | Render only verified utility actions or links supplied by configuration; when enabled, sit within the unified Header above the sticky primary row and scroll away. Render nothing for an empty configuration. | Hard-coded phone, email, unsupported language switch, second inquiry CTA. |
| `PrimaryHeader` | Render brand, ordered desktop navigation, active destination treatment, and the compact row. Stay sticky without obscuring anchor targets. | Product models or a second navigation source. |
| `ProductsMegaMenu` | Show one heading, the four platform links, and View All Products. Open from the separate Products disclosure button; lay out text links without image dependency. | RAYONE categories, brands, images, or unsupported product detail URLs. |
| `HeaderActions` | Render the one primary inquiry destination and the compact menu control. Use full `Request a Quote` on desktop and visible `Quote` on compact layouts, with accessible name `Request a Quote`. | Search or fitment control without a verified index and separate specification. |
| `MobileNavigationDrawer` | Render the ordered navigation, Products children initially visible, an initially closed Engineering child group, quote link, close control, modal focus behavior, and internal scrolling. | A different URL tree from desktop. |

## 5. Props and data contract

This is a framework-neutral contract. Route data is sourced from the Sitemap; a future implementation may map it to its own type system. All destinations are real `href` values, not `#` placeholders or click-only route handlers.

| Input | Shape / default | Validation and use |
| --- | --- | --- |
| `brand` | `{ href: '/', asset?: approved asset reference, alt?: approved brand name, previewLabel?: string }` | `asset` is TBD. A clearly labelled placeholder is permitted for internal preview; it cannot be mistaken for an approved mark. |
| `currentPath` | Canonical path string | Normalize against the approved route map; mark only an exact link `aria-current="page"`. A parent section may receive active visual styling for a descendant route. |
| `locale` | `'en'` at launch | Text labels come from locale data. Do not render a language selector until an alternate route and copy are actually published. Document `lang` is set by the page shell. |
| `navItems` | Ordered route records: Products, Engineering, How We Work, optional Blog, About, Contact | Must match section 3. Blog appears only when `blogEnabled` is true under the content publication gate. |
| `productPlatforms` | Exactly four `{ id, label, href }` records | Use the four section 3 product routes in order. No product counts, specifications, images, or unsupported subcategories are required. |
| `capabilityLinks` | Exactly two `{ id, label, href }` records | Used in the mobile drawer only; routes are `/capabilities/wheels` and `/capabilities/safety-tires`. |
| `quoteAction` | `{ href: '/request-quote', desktopLabel: 'Request a Quote', compactLabel: 'Quote', accessibleName: 'Request a Quote' }` | One primary action destination. Generic Header use does not prefill a product. |
| `utilityItems` | Empty array at launch; future entries `{ id, label, href or action, verifiedSource, availableLocales }` | Render only when each item has a verified destination/action and approved outward-facing content. Empty array means no UtilityBar row. |
| `blogEnabled` | `false` until content publication gate is met | Must reflect the site's actual publication state, not a visual toggle or mere existence of drafts. |

Configuration has one route source shared by desktop and mobile renderers. Do not independently hard-code two route lists. Invalid or missing optional utility items are omitted; invalid core route data is a build/configuration error rather than silently linking to a placeholder.

## 6. Layout and responsive behavior

The following uses the **APPROVED BASELINE** [Design.md](../../Design.md) tokens without changing them: `color.surface.base`, `color.ink.strong`, `color.ink.muted`, `color.brand.accent`, `color.brand.primary`, `color.brand.primaryHover`, `layout.contentMax`, the documented gutters, `control.minHeight`, and breakpoints at 640 and 1024 CSS px.

- At widths **below 1024 CSS px**, render the compact PrimaryHeader: brand link, visible Quote link, and labelled menu button. Hide desktop nav and ProductsMegaMenu. The mobile drawer supplies all navigation. At 320 CSS px, constrain brand width before shrinking action targets; preserve at least 44 × 44 CSS px for primary controls and avoid horizontal page scroll.
- At widths **1024 CSS px and above**, render the desktop row with the approved navigation order, Products split control, and one Request a Quote button. The ProductsMegaMenu opens below the primary row and uses a readable two-column grouping of the four platform links plus the overview link; it may reflow within the shared content container without hiding a platform.
- The PrimaryHeader sticks to the viewport top. If UtilityBar is enabled later, it is a separate optional region within the same Header root and scrolls out before the primary row sticks. The open mega panel is visually below the primary row and above page content. The mobile drawer and its backdrop cover page content and have a close button within the drawer.
- Use white Header surfaces, dark text, a red active underline plus another non-color cue (`aria-current` for the exact page), and a single filled red inquiry action. Do not put essential text over an unverified image. Use existing semantic tokens, not one-off colors or newly approved values.
- Check 320, 375, 768, 1024, and 1440 CSS px, plus 200% zoom. The layout changes based on available width, and the menu/drawer content must remain scrollable when viewport height is short.

## 7. Interaction states and transitions

| State | Entry | Exit | Focus and route effect |
| --- | --- | --- | --- |
| `closed` | Initial state; after close or route change | Products disclosure on desktop; menu control on compact layout | Normal tab sequence; no hidden panel links in tab order. |
| `productsOpen` | Desktop Products disclosure click, Enter, or Space | Same button, Escape, outside pointer, route navigation, or resize below 1024 | `aria-expanded=true`; focus may move into links by Tab. Escape returns focus to Products disclosure. Opening does not mutate the URL. |
| `mobileDrawerOpen` | Compact menu button click, Enter, or Space | Close button, Escape, backdrop activation, route navigation, or resize to desktop | Background is inert and scrolling is locked; focus enters drawer and is contained until close. Escape/close/backdrop returns focus to the menu button; navigation moves focus to the destination page flow. |

Only one overlay can be open. Hover changes visual feedback but never opens ProductsMegaMenu. A click on the Products text link follows `/products`; the adjacent button changes only disclosure state. On mobile, Products overview remains a direct link and its four children are visible as soon as the drawer opens. Engineering overview remains a direct link to `/capabilities` and its separate disclosure toggles the two capability links; it starts collapsed on each new drawer opening. The disclosure button's `aria-expanded` must match visibility. Overlay state resets after navigation and when the responsive mode changes.

The drawer has a local `capabilitiesExpanded` state: `false` on every open, `true` after its disclosure is activated, and `false` after a second activation or drawer close. This state does not change the URL. Product children have no extra disclosure state in the drawer.

Use a navigation landmark and native anchors/buttons. The product panel is a disclosure of navigation links, not an application menu: do not apply `role="menu"` or require arrow-key navigation. Provide explicit accessible names for the menu, close, and disclosure buttons. Keep visible focus and distinguish hover, focus, active, and open states. The drawer has a programmatic name, modal semantics, a logical heading or label, a focus trap, and focus restoration. Honor reduced-motion preference; animation cannot delay content access. No link or state can depend on hover alone.

## 8. Multilingual and SEO rules

- English is the only launch locale. Use English labels and `lang="en"` on English documents. Locale-aware label and utility data may be prepared, but no Chinese control, `/en`, `/zh`, `hreflang`, or alternate URL is rendered until that locale's route and content are approved and published.
- Every Header destination is a crawlable canonical anchor from section 3. Use lowercase hyphenated paths without a trailing slash except `/`. Do not use RAYONE hash targets for site navigation. The page shell, not Header, owns the canonical link element and alternate-language metadata.
- The four product links are present in the rendered DOM when the menu/drawer is available, subject to normal disclosure visibility. `/products` also links to all four platform pages as required by the Sitemap. Hiding a panel visually must not turn its links into fake or JavaScript-only destinations.
- Blog is absent from navigation until its publication gate is satisfied. Legal pages are linked by the Footer only after their own publication gate; draft articles and unimplemented product detail pages do not appear as Header links.

## 9. Observable acceptance criteria

These are **future implementation acceptance tests**, not tests claimed as run in this specification task. Each test begins from a clean page load unless stated otherwise. Record viewport, URL, input method, actual result, and pass/fail.

| ID | Setup and action | Pass condition |
| --- | --- | --- |
| H-01 | At 1440 and 1024 CSS px, inspect the Header and follow each top-level link. | Order is Products, Engineering, How We Work, gated Blog, About, Contact; Logo goes to `/`; quote goes to `/request-quote`; every route is canonical and local. |
| H-02 | At 1440 CSS px, click Products text, then return and click its adjacent disclosure. | Text navigates to `/products`; disclosure opens the panel without changing URL; panel has exactly the four platform links and View All Products, all with section 3 URLs. |
| H-03 | With desktop panel open, use Tab through its links, then press Escape. Repeat using outside pointer and the disclosure button. | Links are keyboard reachable in logical order; each close path hides panel, updates `aria-expanded`, and Escape restores focus to the disclosure. Hover alone does not open the panel. |
| H-04 | At 320, 375, and 768 CSS px, inspect compact Header; activate Quote and the menu button. | Quote is visible and reaches `/request-quote`; menu button is labelled and opens drawer; no horizontal page scroll or action overlap; primary controls are at least 44 × 44 CSS px. |
| H-05 | Open mobile drawer from a fresh load. | Products overview and all four platform links are visible immediately. Engineering overview and How We Work are visible; the two Engineering child links are hidden initially. Other top-level links match desktop ordering and Blog gate. |
| H-06 | In drawer, activate Engineering disclosure by touch, Enter, and Space on separate fresh loads; activate it again. | The two approved capability child links show/hide, the overview link still navigates to `/capabilities`, and `aria-expanded` matches the child group's state. |
| H-07 | Open drawer, then close using close button, Escape, and backdrop on separate loads. Try tabbing while open. | Focus stays inside while open; background is inert; each non-navigation close restores focus to the menu button; body scrolling resumes. |
| H-08 | Open a panel/drawer, then cross the 1024 CSS px layout boundary and navigate to another route. | Stale overlay and focus-trap state are cleared; the active link/section reflects the destination; no hidden overlay blocks interaction. |
| H-09 | Load every approved product and capability route. | Exact current link has `aria-current="page"` where rendered; parent section has visible active treatment without falsely marking multiple links as current. Red underline is not the sole state signal. |
| H-10 | Test 200% zoom, a short viewport, keyboard-only flow, screen-reader names, and reduced motion. | No clipped action or unreachable link; drawer/panel scrolls as needed; controls and landmarks are named; focus is visible; essential content is immediately available when motion is reduced. |
| H-11 | Measure Header text and meaningful UI boundary contrast against actual surfaces. | Normal text reaches at least 4.5:1, large text and meaningful non-text UI at least 3:1; the accent token is not used as white-text button fill. |
| H-12 | With no approved utility data, no published Blog, and only English content, inspect desktop/mobile DOM and UI. | No UtilityBar row, unverified phone/email or language control, Blog link, search/fitment control, RAYONE asset, or placeholder `href` is exposed. The approved Contact route remains present. |
| H-13 | Enable Blog only after a published-content fixture; inspect both layouts and link paths. | Blog appears between How We Work and About and points to `/blog`; disabling the gate removes it without changing other navigation. |

Acceptance requires evidence from the future implementation. This specification itself has only been checked against its cited project documents and the recorded live reference observation. Visual brand sign-off, content verification, implementation tests, and release remain separate steps.
