# Design System — International B2B Automotive Parts Site

This is the single entry point for visual and interaction rules. It specifies a new site; it does not describe an implemented UI. Page scope and route names are owned by the [Sitemap](docs/02-架构/SITEMAP.md), and approved business boundaries by [ADR 0001](docs/adr/0001-main-site-product-scope.md) and [ADR 0004](docs/adr/0004-capabilities-by-product-line.md). This file owns the design rules only.

**Visual reference:** The project owner selected a local RAYONE home-page design analysis dated 2026-10-29 as the direction to emulate. It is an observation of one site, not an official brand manual. Adopt its light, image-led layout language; use this project's own scope, copy, approved assets and accessibility checks. Source screenshots, logo, code and commercial claims are not project assets.

**Status key:** **APPROVED** = recorded project decision; **APPROVED BASELINE** = owner-approved first-release design rule that may be refined with documented review; **PROPOSED** = rule still awaiting a decision; **TBD** = no decision or verified asset. Approval of the design baseline is not approval of a finished UI, final brand assets, claims or public release. Coding Agents must identify remaining PROPOSED/TBD items in handoff. Business requirements and audience priority are owned by the [Business & Product Definition](docs/00-product/PRODUCT_BRIEF.md); routes remain owned by the [Sitemap](docs/02-架构/SITEMAP.md).

## Design Principles

1. **Show the product first (APPROVED goal).** A visitor should identify the relevant product platform and reach an inquiry path without decoding promotional language. Verify that each product entry names the platform and has a clear next action.
2. **Make manufacturing claims inspectable (APPROVED goal; APPROVED BASELINE expression).** Pair capability statements with relevant, verified process, facility or test evidence. Omit unsupported figures, certifications and superlatives.
3. **Let product imagery carry the industrial character (APPROVED reference direction and baseline).** Use spacious white/light-gray sections, close product imagery and restrained red accents. Place the dark surface mainly at the final inquiry/footer close.
4. **Support procurement decisions (APPROVED goal).** Prefer scannable specifications, application context, evidence and a visible inquiry route over long narrative sections.

## Brand Identity

| Item | Direction | Status |
| --- | --- | --- |
| Audience | Global English B2B buyers; distributor/wholesale and brand/OEM/ODM buyers are co-primary | APPROVED; see [Business & Product Definition](docs/00-product/PRODUCT_BRIEF.md) |
| Business and objective | Product catalog plus OEM/ODM; product presentation, manufacturing credibility and qualified inquiries | APPROVED; see [Business & Product Definition](docs/00-product/PRODUCT_BRIEF.md) |
| Visual direction | Industrial Performance; red / black / white; medium red intensity | APPROVED |
| Site scope | Four product platforms, with Wheels first on Home and Products; product-line capability organization | APPROVED; see linked ADRs and Business & Product Definition |
| Visual reference direction | Light industrial presentation, large product imagery, generous white space, rounded cards and pill actions, restrained red | APPROVED as direction by owner request |
| Visual expression | White/light-gray base, tightly set dark headings, thin separators, product imagery before long copy | APPROVED BASELINE |
| Logo, wordmark, tagline, brand typeface, icon library | Supply approved assets or obtain owner decision before final brand sign-off | TBD |

Do not infer a company name, product specification, certification, production capacity, market coverage or performance claim from this visual direction. Outward-facing claims require source verification for the specific product and page.

## Color System

The following palette is the **APPROVED BASELINE** for the first release. Values are design tokens, not evidence that final brand assets or a finished UI have been approved. Use role tokens in components; avoid one-off hex values.

| Role / token | Value | Use |
| --- | --- | --- |
| `color.brand.accent` | `#ED1C24` | Red rule, arrow, large emphasis; not white-text button fill |
| `color.brand.primary` | `#C9151C` | Primary button fill; white text passes 4.5:1 |
| `color.brand.primaryHover` | `#A61018` | Hover/pressed primary action |
| `color.ink.strong` | `#101113` | Headings and body text on light surfaces |
| `color.ink.muted` | `#666A70` | Secondary text on light surfaces |
| `color.surface.page` | `#F5F5F7` | Main page field and product-image stage |
| `color.surface.base` | `#FFFFFF` | Cards, header, text on red/dark |
| `color.surface.dark` | `#0B0B0C` | Inquiry close and footer |
| `color.border.decorative` | `#E0E0E0` | Nonessential separators/card edges only |
| `color.border.control` | `#7D8993` | Input/control boundaries that must remain visible |
| `color.state.error` | `#A61018` | Error text/icon with an explicit message |

**Rules (APPROVED BASELINE):** Use `ink.strong`/`ink.muted` on white or `surface.page`; use white on `brand.primary`, `brand.primaryHover` and `surface.dark`. The reference accent `#ED1C24` with white yields about 4.38:1, so reserve it for non-text accents or large text with verified contrast; use `brand.primary` for white-text controls. Recheck every new color pair, image overlay and state. Red never conveys status by color alone. Put text beside an image or on a proven solid surface, not over an untested photograph.

## Typography System

**APPROVED BASELINE:** Use a system sans stack (`system-ui`, then available sans-serif fallback). The reference declares SF Pro Display and Inter but does not prove a hosted font; final brand font remains **TBD**. Use weight 650–700 for headings, 600 for controls and labels, 400 for body copy. Keep body text left aligned and line length near 45–75 characters where practical.

| Token | Wide viewport | Narrow viewport | Use |
| --- | --- | --- | --- |
| `type.display` | 60/64 px, 650 | 40/44 px, 650 | Home hero only |
| `type.h1` | 48/54 px, 650 | 34/40 px, 650 | One page title |
| `type.h2` | 40/44 px, 650 | 30/36 px, 650 | Main sections |
| `type.h3` | 21/28 px, 650 | 21/28 px, 650 | Cards and subsections |
| `type.body` | 17/26 px, 400 | 16/24 px, 400 | Main reading text |
| `type.small` | 14/21 px, 400 | 14/21 px, 400 | Metadata; never critical instructions alone |
| `type.label` | 14/20 px, 600 | 14/20 px, 600 | Form labels and controls |

Use semantic heading levels in document order. Do not substitute text embedded in images for searchable, selectable copy.

## Spacing & Layout

**APPROVED BASELINE:** Base spacing unit is 4 px. Allowed component `space` tokens are `1=4`, `2=8`, `3=12`, `4=16`, `5=20`, `6=24`, `8=32`, `10=40`, `12=48`, `16=64` px. Use the section tokens below for larger vertical rhythm; exceptions require a documented component reason.

| Layout token | Value / rule |
| --- | --- |
| `layout.contentMax` | 1500 px, centered |
| `layout.gutter` | 20 px below 640 px; 32 px from 640–1023 px; 40 px at 1024 px and above |
| `layout.grid` | 4 columns below 640 px, 8 columns from 640–1023 px, 12 columns at 1024 px and above |
| `layout.gridGap` | 20 px below 640 px; 24 px at 640 px and above |
| `layout.sectionGap` | 76 px below 640 px; 96 px from 640–1023 px; 136 px at 1024 px and above |
| `layout.readingMax` | 720 px for long text blocks |

Keep content aligned to the same container across the header, page body and footer. Use a clear hierarchy of hero, evidence/content sections and next action. Avoid horizontal page scrolling at the narrowest supported width.

## Design Tokens

**APPROVED BASELINE:** The color, type and layout tables above are the token source of truth. Additional shared tokens: `radius.button=9999px`, `radius.field=8px`, `radius.infoCard=20px`, `radius.productCard=26px`, `border.width=1px`, `control.minHeight=44px`, `motion.fast=180ms`, `motion.standard=480ms`, `motion.reveal=760ms`, `motion.ease=cubic-bezier(.22,1,.36,1)`. Use reveal motion only when it does not delay content access, and disable it under reduced-motion preference. Name implementation tokens by semantic role and retain one definition per value. Token naming does not prescribe a stack.

## Component Design Rules

The visual values and component shapes in this section are the **APPROVED BASELINE**. Behavior and accessibility checks are first-release design requirements; a check counts as passed only after verifying the implemented artifact.

| Component | Required design behavior | Verify |
| --- | --- | --- |
| Header/navigation | White header, approved logo or labeled draft placeholder, dark links, red underline for the active destination and one inquiry action. On narrow screens use an explicit menu control. | No invented mark; destinations follow the Sitemap; keyboard can open, traverse and close the menu; focus returns to trigger. |
| Buttons/links | Pill-shaped primary red action; secondary action uses dark outline or text style. At most one filled red action per content section. Primary hover deepens red; outlined inquiry hover becomes `brand.primary` with white text; text-link hover uses `brand.primary`. | All default, hover, focus, disabled and busy states are distinguishable; labels describe the destination/action; no layout shift. |
| Product cards | 26 px radius, thin decorative edge, large image stage above title, short differentiator and a link to its approved platform page. On hover, shift up 3 px, change edge to `brand.accent` and link text to `brand.primary`. | Image or labeled placeholder has usable alt/fallback; content stays readable without image; focus target is clear. |
| Information cards | 20 px radius, white surface and thin decorative edge. Add red hover feedback only when the whole card has an actual action. | Static cards do not suggest clickability; card remains legible and complete without hover. |
| Capability/evidence blocks | Pair a specific capability with matching process/test/facility proof and product context. | Each claim has an identified source before publication. |
| Specification tables | Put units in headers or values; group related attributes; distinguish unknown from zero or “not applicable.” | Narrow screens preserve every label/value association and allow intentional table scrolling if needed. |
| Inquiry forms | Use persistent labels, mark required fields, show inline errors beside fields and a form-level status after submission. Preserve entered data after validation errors. | Keyboard and screen-reader flow works; success is shown only after confirmed submission. |
| Status/badges | Use text labels for states; red may reinforce emphasis but cannot be the only signal. | Meaning survives grayscale and screen-reader output. |

Catalog filters, comparison tools, downloads and live chat are **TBD** capabilities; their presence is not implied by these component rules.

## Page Design Patterns

Use the [Sitemap](docs/02-架构/SITEMAP.md) for approved page scope, routes and navigation. The Home Wheels subgroup and its three fixed child topics are confirmed planning decisions; the remaining composition details are **PROPOSED** and must not create extra routes.

| Page type | Content order | Primary next action |
| --- | --- | --- |
| Home | Light image-led hero → four platform entry points with Wheels first → nested three-entry Wheels group (two process topics, one custom project path) → verified manufacturing evidence → dark inquiry close | Product platform, Wheels child page or inquiry |
| Product overview | Brief selection guidance → large image-led platform cards → OEM/ODM entry | Relevant platform |
| Product platform | Product/application overview → selection/specification information → relevant evidence → inquiry | Inquiry with product context |
| Fixed Wheels child topic | Distinct process or project framing → selection/project inputs → scoped evidence → related Wheels paths → inquiry | Editable Wheels-context inquiry |
| Capability overview/detail | Scope and process → evidence with product association → related product | Related product or inquiry |
| Inquiry | What information helps qualification → concise form → submission state | Submit inquiry |
| About/contact | Verified company context or contact purpose → appropriate contact/inquiry route | Contact or inquiry |

Blog and policy pages remain governed by their planned/launch status in the Sitemap; this document does not promote them into release scope. Do not create unsupported product detail pages, claims or proof sections to fill a pattern.

## Interaction Guidelines

**APPROVED BASELINE:** Use a visible focus state for all interactive elements. Hover is supplementary; the same action works by keyboard and touch. Interactive hover feedback stays in the red palette: primary actions deepen red, outline actions fill red with white text, text links turn red, and actionable cards add a red edge. Button/color feedback uses `motion.fast`; product-card hover adds a 3 px lift and subtle shadow. Static evidence cards have no hover lift. Any reveal uses `motion.reveal` without hiding essential content and stops under `prefers-reduced-motion`. Never animate a value so that users could mistake it for a measured product result. Forms show validation after interaction or submission, identify the affected field in text, and keep the user's input. Inquiry calls to action must lead to the actual inquiry path defined in the Sitemap; product context may be carried into that path only when it is accurate and visible to the user.

## Responsive Design

**APPROVED BASELINE:** Review at representative widths of 320, 375, 768, 1024 and 1440 CSS px. Breakpoints are 640 and 1024 CSS px; layout responds to available width rather than device names. At narrow widths, collapse navigation, stack product/evidence cards, use a single-column form, make primary controls at least 44 px high and keep the inquiry action reachable. At wide widths, keep text within `layout.readingMax` and preserve generous product-image space. Zoom to 200% and verify content and actions remain available without clipping.

## Accessibility

**APPROVED BASELINE acceptance target:** [WCAG 2.2 Level AA](https://www.w3.org/TR/WCAG22/). Check normal text contrast at least 4.5:1, large text and meaningful non-text UI contrast at least 3:1, visible keyboard focus, programmatic labels and errors, logical heading order, meaningful alt text and keyboard operability. Mark the document language accurately for the English pages in the approved Sitemap; further languages are TBD. Design targets should normally be at least 44 × 44 CSS px for primary controls; this is a project preference above the [WCAG 2.2 AA 24 × 24 CSS px minimum with exceptions](https://www.w3.org/TR/WCAG22/#target-size-minimum). Provide a text equivalent for diagrams and process visuals. Decorative images get empty alt text. Do not rely on color, hover, motion or image text to convey required information.

## Image & Asset Guidelines

**APPROVED BASELINE:** Product imagery is the visual focal point: use large, clean product shots on light or neutral stages, with accurate scale and visible material detail. Use original, licensed or explicitly approved images of products, processes and tests; record source/rights and descriptive alt text. Local archive images and generated concept renders may be used in labeled internal previews; neither is documentary proof. Check archive brand marks and rights before publication. Use labeled placeholders when no verified asset exists. Cropping must preserve a feature needed for a claim. Reference-site screenshots, logo, code, product photographs and unverified certification marks are not assets for this site. Approved logo, product photography, diagrams and usage rights are **TBD**.

## Implementation Constraints for Coding Agents

1. Read this file first for design work; read the [Sitemap](docs/02-架构/SITEMAP.md) for page and route scope. Preserve the APPROVED business direction and report PROPOSED/TBD choices explicitly in handoff.
2. Implement shared roles through tokens before styling repeated components. Use the approved first-release token values; record any necessary deviation with its reason and affected components.
3. Keep content claims, numerical specifications and imagery traceable to approved sources. Use a labeled draft placeholder when source material is absent; do not publish a placeholder as fact.
4. Build components from their documented states and accessibility requirements. Verify behavior with keyboard, narrow viewport and contrast checks.
5. Follow the confirmed Next.js and Payload responsibilities in the [CMS architecture](docs/02-架构/CMS_ARCHITECTURE.md). Font hosting, analytics, production form delivery services and deployment choices remain **TBD**; this document does not authorize them.
6. Do not treat page patterns as approval to add routes or features. Route and release changes require updating the Sitemap's authority first.

## Design QA & Governance

For each new page or component, check: (1) correct Sitemap scope and inquiry path; (2) token use and no unexplained one-off values; (3) typography/spacing and layouts at the five review widths; (4) default, hover, focus, error, disabled and busy states where applicable; (5) keyboard, screen reader semantics, contrast and 200% zoom; (6) proof and rights for every externally visible claim and image. Record exceptions beside the affected design decision and obtain owner approval before treating them as final. A check counts as passed only with direct evidence from the current artifact, not from a prior plan.

## Concise Design Decision List

| Decision | Status | Owner action |
| --- | --- | --- |
| Industrial Performance direction, red/black/white palette family, medium red intensity and procurement audience | APPROVED | Preserve in design work. |
| Four product platforms, Wheels-first presentation and product-line capability organization | APPROVED | Follow the Business & Product Definition, linked ADRs and Sitemap. |
| RAYONE analysis as a light, image-led visual reference | APPROVED direction | Apply the layout language to this project's products and routes; source assets are excluded. |
| Exact reference-led palette, system sans typography, spacious layout, pill buttons and rounded product cards | APPROVED BASELINE | Use for first-release design; review actual artifacts before final brand sign-off. |
| WCAG 2.2 AA as design acceptance target and 44 × 44 px primary-control preference | APPROVED BASELINE | Verify against implemented artifacts. |
| Logo, final brand font, licensed imagery, published claims, production inquiry vendors and deployment | TBD | Supply assets/evidence and resolve release-relevant choices. |

**Status review (2026-10-31):** The owner approved the exact visual tokens, typography, spacious layout, pill/rounded component direction, WCAG 2.2 AA target and 44 × 44 px primary-control preference as the first-release baseline. The RAYONE analysis remains a visual reference only. Brand assets, outward-facing claims, implemented UI checks and release approval remain separate; no UI, build or release verification is claimed here.
