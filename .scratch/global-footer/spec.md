# Global Footer Component Specification

Status: **draft specification based on feature decisions confirmed on 2026-10-31; specification review pending**. This is a design and acceptance contract, not an implemented, tested, final-brand-approved, or released component. The values and visual rules in [Design.md](../../Design.md) are the **APPROVED BASELINE**. No formal component code is part of this work.

## 1. Purpose and authority

The Footer closes the procurement journey with a clear inquiry path, keeps all four approved **product platforms** discoverable, links to relevant manufacturing capabilities, and provides verified company, contact, legal, and certification information when available. “Product platform,” “product-line capability,” “corporate endorsement,” and “inquiry” use the meanings in the [Glossary](../../GLOSSARY.md). The catalog plus OEM/ODM boundary follows [ADR 0001](../../docs/adr/0001-main-site-product-scope.md); only the approved capability pages in [ADR 0004](../../docs/adr/0004-capabilities-by-product-line.md) may appear. Route names, release gates, and the current English URL plan come from the [Sitemap](../../docs/02-架构/SITEMAP.md) and [ADR 0002](../../docs/adr/0002-english-routes-at-root.md). This file follows the project's [local specification convention](../../docs/agents/issue-tracker.md).

The brief's “automotive parts manufacturing group” is a positioning direction. An outward-facing group name, legal entity, group relationship, location, contact method, certificate, award, or social account needs its own verified source before publication. RAYONE's copy, contact data, logo, social accounts, certification names, and visual assets are not project content.

## 2. Reference analysis and evidence limits

Observed on the live [RAYONE site](https://www.rayonewheels.com/) on 2026-10-31. These describe the reference Footer, not our company's facts.

| Reference area | Verified on the page | Transferable design lesson / limit |
| --- | --- | --- |
| Pre-footer | A full-width inquiry/contact block offers quote and partnership actions, contact channels, and a separate sourcing form. | Give buyers a clear next step; this project uses its approved quote and contact routes, without inventing a hotline, messenger, or form in the Footer. |
| Navigation groups | Five groups: Product Center, Engineering, Company, Support, Contact. Product links cover wheel types and solutions; other groups link to capability, company, inquiry, and support content. | Group links by buyer task. Group names and destinations are specific to RAYONE and are not copied. |
| Contact | Footer displays telephone and email links, an OEM/ODM project link, and an address. Fixed auxiliary actions include email, messaging, call, and social controls. | Render only our own verified methods and real destinations. No fake social links or reference contact values. |
| Legal | Bottom row displays a copyright line and Privacy Policy, Terms of Use, and Warranty & Claims links. | Our legal routes are Privacy Policy (Launch target) and Terms of Use (Planned); links remain hidden until each page is reviewed and published. No warranty route is assumed. |
| Certifications | Bottom area displays certification text including IATF 16949, JWL, VIA, CE, and NHTSA. | This is only an observation of rendered text. It does not verify those credentials for RAYONE or this project; our strip has a strict evidence gate. |
| Responsive observation | At 390 × 844 CSS px, the long page retained Footer groups in the page DOM. | Exact mobile Footer disclosure behavior and tablet layout were not verified because of the reference page's cookie overlay; our behavior below is a project decision. |

**Inference, not verified behavior:** the reference separates product discovery, engineering proof, company trust, support, and contact into buyer-facing tasks, while certifications act as credibility cues. No conversion effect or certificate validity was measured.

## 3. Confirmed feature decisions and publication gates

| Class | Decision or current constraint |
| --- | --- |
| Confirmed | This specification defines complete locale data, equivalent-page routing, language switching, and publication gates. English remains the only public launch locale. A new language requires an updated Sitemap/ADR and its corresponding pages before release. |
| Confirmed | Footer content is configured in code. There are **no Footer CMS fields** in this phase; a future CMS migration needs a separate schema decision. This preserves the current [CMS architecture](../../docs/02-架构/CMS_ARCHITECTURE.md) scope. |
| Confirmed | FooterMain has four conceptual groups: Products, Engineering, Company, Contact. Product links are directly visible at every width. Other groups are also directly visible, with no mobile accordion. |
| Confirmed | PreFooterCTA is the single final inquiry close for a page. It is not added a second time if the page already uses the same closing block. |
| Confirmed | Certification and unpublished legal placeholders are visible **only in design preview**, explicitly labelled as pending verification. Public output omits those placeholders, certificate claims, logos, and unpublished legal links. |
| Confirmed | The Contact group renders only when at least one contact method is verified and approved for publication. Until then, the Company group still links to `/contact`; no empty Contact column is shown. |
| Project constraint | Blog and Terms of Use remain Planned. Privacy Policy is a Launch target required before real Contact/RFQ submission; each legal link appears only after its page is reviewed and published. |

## 4. Footer Sitemap

All URLs below are the current English canonical paths. The published Footer must use anchors to real routes, not empty `href`, hash placeholders, or RAYONE destinations. This Footer does not create pages.

| Region / order | Group or action | Destination | Gate |
| --- | --- | --- | --- |
| PreFooterCTA | Request a Quote | `/request-quote` | Launch destination; one filled primary action. |
| PreFooterCTA | Contact | `/contact` | Launch destination; secondary text link. |
| FooterMain / 1 | Products overview | `/products` | Launch destination. |
| FooterMain / 1 | Wheels | `/products/wheels` | Launch platform 1. |
| FooterMain / 1 | EV Housings | `/products/ev-housings` | Launch platform 2. |
| FooterMain / 1 | Custom Aluminum | `/products/custom-aluminum` | Launch platform 3. |
| FooterMain / 1 | Safety Tires | `/products/safety-tires` | Launch platform 4. |
| FooterMain / 2 | Engineering overview | `/capabilities` | Launch destination. |
| FooterMain / 2 | Wheel Engineering | `/capabilities/wheels` | Approved capability page. |
| FooterMain / 2 | Safety Tire Capabilities | `/capabilities/safety-tires` | Approved capability page. |
| FooterMain / 3 | How We Work | `/how-we-work` | Launch destination; both cooperation paths remain visible. |
| FooterMain / 3 | About | `/about` | Launch destination; group positioning and identity belong on the verified About page. |
| FooterMain / 3 | Manufacturing | `/about/manufacturing` | Launch destination; four product-line sections depend on verified evidence. |
| FooterMain / 3 | Contact | `/contact` | Launch destination; available even if direct contact details are not yet verified. |
| FooterMain / 3 | Blog | `/blog` | Only after the Blog section opens with reviewed, published content. |
| FooterMain / 4 | Verified contact methods | `tel:`, `mailto:`, or approved address/action URL as applicable | Render each method only after verification and publication approval. No default values. |
| CertificationStrip | Verified credentials | No route required; optional verified evidence link | Omitted on public pages until each claim passes its gate. |
| FooterBottomBar | Privacy Policy | `/privacy-policy` | Only after the page is reviewed and published. |
| FooterBottomBar | Terms of Use | `/terms-of-use` | Only after the page is reviewed and published. |
| FooterBottomBar | Copyright | No destination | Only after the legal entity text is verified and approved. |
| FooterBottomBar | Language switch | Equivalent published page in another locale | Hidden while English is the only published locale. |

Do not add EV Housings or Custom Aluminum capability subpages, vehicle fitment links, model-detail URLs, warranty pages, group product categories beyond the four platforms, or social links without an approved destination. The Footer represents OEM/ODM through How We Work and Request a Quote; it does not invent a separate OEM/ODM route.

## 5. Component composition and responsibilities

```text
SiteFooter
├─ PreFooterCTA (render once per page)
└─ FooterMain
   ├─ optional approved brand / positioning block
   ├─ FooterLinkGroup: Products
   ├─ FooterLinkGroup: Engineering
   ├─ FooterLinkGroup: Company
   ├─ FooterContact (conditional Contact group)
   ├─ CertificationStrip (conditional; preview placeholder only)
   └─ FooterBottomBar (conditional entries)
```

| Component | Owns | Does not own |
| --- | --- | --- |
| `PreFooterCTA` | One closing heading and optional short supporting text, primary `/request-quote` anchor, secondary `/contact` anchor, and a page-level `renderOnce` decision. | A second quote form, unsupported claims, invented partnership page, or repeated CTA block. |
| `FooterMain` | Dark Footer surface, shared page container, approved brand treatment, the ordered group layout, and conditional child composition. | Route creation, publication approval, or page canonical metadata. |
| `FooterLinkGroup` | Localized group heading and ordered list of canonical links. All four Products children remain visible at every width. | Arbitrary CMS URLs, empty links, or mobile-only alternate route lists. |
| `FooterContact` | Contact methods with verified public values and protocol-safe anchors; omit itself when no method qualifies. | Guessing a phone, email, address, chat handle, social profile, or service hours. |
| `CertificationStrip` | Approved credential labels and optional licensed marks, each scoped to its verified holder and product/business applicability. In preview only, show a neutral labelled placeholder. | Unverified logos, RAYONE credentials, generalized quality claims, or public placeholders. |
| `FooterBottomBar` | Conditional legal links, verified copyright line, and future language switcher. Omit entries lacking published data; omit the whole bar if empty in public mode. | Dead legal links, invented legal entity, or language links to missing pages. |

The approved logo, brand name, and final group-positioning sentence are unresolved. Internal preview may use a clearly labelled draft brand block. Public output must use approved outward-facing brand text/assets; a preview label is never public copy.

## 6. Props, code-configured data, and CMS boundary

The contract is framework-neutral. A future implementation may use types, but this specification is not formal component code. A single route registry shared with other site navigation maps stable route IDs to locale-specific paths and publication state. The Footer configuration selects route IDs rather than duplicating URL literals in multiple components.

| Input / record | Required fields and default | Validation |
| --- | --- | --- |
| `FooterConfig` | `locale`, `renderMode` (`preview` or `public`), `routeRegistry`, `publicationFlags`, `brand`, `preFooter`, `groups`, `contactMethods`, `certifications`, `legal`, `availableLocales` | One config per rendered locale; no public output may contain preview-only records. |
| `RouteRecord` | Stable `id`, `pathByLocale`, `publishedByLocale`, `labelKey` | English path equals the Sitemap. Future paths require approved locale route mapping. A link renders only when its destination is published in that locale. |
| `LinkGroup` | `id`, `headingKey`, ordered `routeIds` | Products includes overview plus exactly four approved platform IDs; Engineering includes overview plus exactly two approved child IDs; Company includes How We Work, About, Manufacturing, Contact and gated Blog as in section 4. |
| `PreFooterContent` | `headingKey`, optional `bodyKey`, `primaryRouteId=requestQuote`, `secondaryRouteId=contact`, `enabled` | Copy contains no unverified claim; `enabled` is false only when an equivalent page close is already supplied. |
| `BrandBlock` | Approved `name` or approved logo reference, optional approved positioning copy, approval/source metadata | Internal preview label allowed. No guessed legal entity or relationship. |
| `ContactMethod` | `kind`, localized `displayValue`, normalized destination if interactive, `evidenceRef`, `approvedForPublic`, optional `availableLocales` | `tel:` and `mailto:` are generated from validated values; address is text unless a real approved destination exists. No method publishes without evidence and approval. |
| `CertificationRecord` | `id`, `displayName`, `issuer`, `holder`, `scope`, `evidenceRef`, `approvedForPublic`, optional `validity`, `markAsset`, `markRights`, `evidenceUrl` | Each claim is verified for its specific holder/scope; any mark has usage rights. Expired, unsupported, or unapproved records are omitted. No empty decorative logo slots in public. |
| `LegalRecord` | `routeId`, `publishedByLocale`, `labelKey`; optional verified `legalEntityName` for copyright | Policy links require actual reviewed pages in that locale. The entity text is never inferred from a domain or RAYONE. |
| `LocaleRecord` | `localeCode`, `languageName`, `direction`, `published`, route-equivalence map | Only published locale/page pairs appear in the switcher. No automatic fallback to a different page. |

**CMS field inventory for this phase: none.** The current [CMS architecture](../../docs/02-架构/CMS_ARCHITECTURE.md) assigns Payload to platform content, Blog, and media; the owner selected code configuration for Footer. The fields above are code data and validation requirements, not a proposed Payload collection or Global. A later move to CMS requires a separately reviewed schema, migration, publication workflow, and update to the architecture document.

## 7. Interactions and visual states

- All Footer navigation and actions are normal anchors with meaningful visible labels. `FooterLinkGroup` has no accordion or hidden child state at any width. Hover is supplemental; touch and keyboard use the same links.
- `PreFooterCTA` has one filled primary action and one secondary text action. It is rendered once at the page close, not once inside a page section and again in the global Footer. No form submission happens in the Footer.
- Contact methods use their native destination where verified. Telephone and email labels must communicate the value or action; no click handler with an inert destination. External destinations, if later approved, use safe link attributes and an accessible label describing the destination.
- Certification records are display content, with an evidence link only when a real approved page or document exists. A certification logo is not a button unless it has a destination. Preview placeholders are labelled `Pending verification — preview only`, have no links, and are removed from public builds.
- The language switcher is absent with one public locale. When more than one locale is live, it offers only equivalent published pages for the current route, names each language in its own language, indicates the current locale in text and `aria-current`, and does not silently send users to a different page.
- Visual design uses the existing **APPROVED BASELINE** roles in [Design.md](../../Design.md): `color.surface.dark` for the inquiry/Footer close, `color.surface.base` for text and primary button text, `color.brand.primary` for the filled action, and existing container/gutter/spacing rules. Red can be a decorative accent; link meaning and state must remain clear without color alone. Check actual hover/focus colors on the dark surface for WCAG contrast rather than introducing a new token or using a low-contrast red text state.

## 8. Responsive layout

Use the Design System's **APPROVED BASELINE** breakpoints and review widths; do not introduce a new breakpoint or token for this feature.

| Width | Layout | Required behavior |
| --- | --- | --- |
| Desktop, `≥1024` CSS px | PreFooterCTA uses a text/action row within the shared container. FooterMain shows a brand block above the link grid; Products, Engineering, Company, and conditional Contact use up to four columns. CertificationStrip and BottomBar form full-width rows aligned to the same container. | Four products stay visible, no column collision at 1024 or 1440, no oversized empty Contact gap. |
| Tablet, `640–1023` CSS px | PreFooterCTA stacks heading and actions. Link groups form two columns; a missing Contact group lets the remaining groups reflow. Certification and bottom items wrap naturally. | 768 CSS px remains readable in both orientations; long translated labels wrap without clipping. |
| Mobile, `<640` CSS px | One column in reading order: PreFooterCTA, brand, Products, Engineering, Company, conditional Contact, conditional certification, conditional bottom. All link lists are expanded. Actions have full or ample width. | At 320 and 375 CSS px, all four products are visible without another tap; no horizontal page scroll or off-screen legal/language control. |

Allow content height to grow for translations. Avoid fixed-height Footer rows and text truncation. Use logical spacing properties so a future right-to-left locale can be tested without a parallel component tree. At 200% zoom, the same content and actions remain reachable.

## 9. Multilingual, SEO, accessibility, and performance

### Multilingual release contract

English uses root URLs without `/en`. No other locale or `/zh` is public under the current [ADR 0002](../../docs/adr/0002-english-routes-at-root.md). The architecture supports locale-specific labels, route equivalents, legal content, contact display formats, reading direction, and publication state. Before enabling a locale sitewide, update the Sitemap/ADR and publish equivalent versions of every core Footer-linked launch page: Home, Products overview and four platforms, Engineering overview and its two pages, How We Work, About, Manufacturing, Contact, and Request a Quote. Optional Blog and legal links are gated per locale. If the current page has no published equivalent, omit that switch option rather than redirecting to a different page or rendering a dead link. The page shell sets the document `lang` and `dir`; the Footer consumes that locale.

### SEO

Server-render or statically render real anchors in the published Footer. Use the Sitemap's lowercase, hyphenated canonical paths and no trailing slash except `/`. The page shell owns canonical and `hreflang` tags and emits alternates only for published equivalent pages. Footer links do not use search hashes or JavaScript-only navigation. Structured data for organization, address, or certifications must not be generated from unverified Footer draft data. Published pages must be reachable through actual navigation or body links as required by the Sitemap.

### Accessibility

Use one `contentinfo` landmark for the site Footer and labelled navigation groups with semantic lists. PreFooterCTA has a logical heading in the page outline. Keep visible focus, keyboard operation, meaningful link text, and touch targets at the project's preferred 44 × 44 CSS px for primary actions. Meet the [Design.md](../../Design.md) WCAG 2.2 AA target: normal text contrast at least 4.5:1; large text and meaningful UI at least 3:1. On the dark Footer, verify text, underline, border, hover, and focus states in situ. Certification mark images need concise alt text only when the visible name does not already convey the same information; decorative repeats use empty alt. Do not rely on color, a logo, hover, or motion to communicate essential information.

### Performance

Basic Footer navigation works without client-side JavaScript. Do not load third-party social widgets, map embeds, chat clients, or reference-site assets for this component. Reserve dimensions for any approved logo or certificate mark to prevent layout shift; optimize and lazy-load below-fold marks without hiding text labels. Keep the contact and language choices as native links. Conditional content is resolved before public render so preview placeholders and unpublished links do not flash into view.

## 10. Observable, repeatable acceptance criteria

These are **future implementation tests**, not tests claimed as run for this document. For each test, record route, render mode, locale, viewport, keyboard/touch input, fixture publication state, observed result, and pass/fail. Use clean page loads unless a transition is specified.

| ID | Setup and action | Pass condition |
| --- | --- | --- |
| F-01 | On each core page at 1440 CSS px, inspect the page close. | Exactly one PreFooterCTA appears; primary anchor goes to `/request-quote`, secondary to `/contact`. A page with an equivalent built-in close does not duplicate it. |
| F-02 | With English core routes published, inspect FooterMain at 1440, 1024, 768, 375, and 320 CSS px. | Products overview and the four platform links are present and visible at every width; labels and URLs match section 4; no extra platform or unsupported capability route appears. |
| F-03 | Inspect Engineering and Company groups with Blog disabled, then enabled using a reviewed/published Blog fixture. | Two approved capability child links appear; How We Work, About, Manufacturing and Contact appear; Blog is absent before its gate and points to `/blog` afterward. |
| F-04 | Render public mode with no verified contact method. Then provide one approved method fixture. | Contact group is absent without data, with no empty column; `/contact` remains in Company. With data, Contact group appears with a valid protocol or approved destination and the correct displayed value. |
| F-05 | Render preview mode with no certification/legal data, then public mode with the same fixture. | Preview shows clearly labelled, non-clickable pending placeholders. Public mode shows no credential name/mark, dead legal link, or preview text. |
| F-06 | Provide one approved credential fixture and one unverified/expired fixture. | Only the approved, applicable record appears in public; its holder/scope/mark rights and evidence are traceable. Unverified/expired records are absent. |
| F-07 | Provide reviewed and published Privacy Policy/Terms fixtures and a verified legal entity; repeat without each fixture. | BottomBar displays each legal link and copyright only when its own gate passes. It omits empty entries and is absent if no public entry remains. No Warranty & Claims link is invented. |
| F-08 | With English as the sole public locale, inspect FooterBottomBar. Then add a second fully published locale and visit equivalent routes. | No language switch appears in English-only mode. With two locales, switch links to the same published page in the target locale, current locale is identified, and no missing translation or silent home fallback is offered. |
| F-09 | With a partial future locale fixture, inspect public Footer and page metadata. | The locale is not enabled sitewide until core pages and routing decision are complete; per-page `lang`, `dir`, canonical, and alternate links describe only published equivalents. |
| F-10 | Inspect 320, 375, 768, 1024, 1440 CSS px and 200% zoom with long localized strings. | Groups reflow as specified, four products never hide behind a disclosure, text wraps, controls remain reachable, and the page has no horizontal scrolling caused by Footer. |
| F-11 | Keyboard-only and screen-reader pass over Footer links, contact methods, legal links, and language choices. | One Footer landmark and labelled groups are announced; focus is visible; links have meaningful names and valid destinations; preview placeholders have no tab stop. |
| F-12 | Measure contrast of all Footer text, controls, meaningful boundaries, and interactive states on actual surfaces. | Normal text is at least 4.5:1; large text and meaningful UI at least 3:1; red is not the only state cue. |
| F-13 | Inspect generated HTML/network for a public English page. | Core links are present as anchors without hydration; no RAYONE asset, fake social link, unverified contact, unapproved certification, third-party Footer widget, or preview-only text is delivered. Approved images reserve dimensions. |
| F-14 | Validate every rendered Footer URL against the route registry and published-page inventory. | No `#` placeholder, broken route, unpublished page, trailing-slash variant, or duplicate canonical destination is introduced by the Footer. |

Document verification in this task covers this specification's cited sources, route names, and internal consistency only. Implementation behavior, content verification, locale publication, visual sign-off, and public release require later direct evidence.
