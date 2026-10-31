# Global Hero Spec

Status: design specification, 2026-10-31; no Hero implementation or approved final copy is claimed. [Design.md](../../Design.md) owns type, color and layout tokens; each PageSpec owns the hero's message and evidence.

## Content contract

One hero per page receives an H1, a short page-specific explanation, an optional approved visual, and at most one primary action plus an optional secondary link. The H1 names the page's buyer task or content topic. Home may use `type.display`; other pages use `type.h1`. A product page names its platform, and a legal/article page does not reuse a promotional claim. Buttons use the [Inquiry CTA](../global-inquiry-cta/spec.md) when the destination is a procurement inquiry.

The visual may be a licensed product/process image or a labelled internal placeholder. The page remains understandable with the image absent. No unsupported product result, certification, market coverage or company identity appears in image text, alt text or overlay copy. When proof is unavailable, omit that claim rather than placing it in a decorative hero.

## Layout and states

Use the approved light, image-led baseline with readable text on a proven solid surface. Narrow widths stack text and media without hiding the action; avoid cropping away a feature used as evidence. Motion is optional, disabled for reduced-motion preference and never delays H1 or CTA availability. The primary action is reachable by keyboard and at least the approved minimum control height.

## Acceptance

For each hero variant, verify one H1, correct route and action label, source/rights for visible media, meaningful or decorative alt treatment, legible text at all review widths, keyboard focus, reduced motion and 200% zoom. A final page cannot pass because a preview-only concept image looks plausible.
