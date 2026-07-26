# BAYBIMAI Design System

> Global source of truth for the BAYBIMAI landing page. Page-specific files in
> `pages/` override this file.

Generated with UI/UX Pro Max on 2026-07-25 and refined to honor the chosen
BAYBIMAI brand direction.

## Direction

- Product: BIM course sales, enterprise training, and BIM audit services.
- Style: premium dark technology with exaggerated minimalism.
- Variance: 3/10 — centered and restrained.
- Motion: 3/10 — micro-interactions only; decorative BIM terms remain static.
- Density: 2/10 — spacious sections and readable text measures.
- Conversion: one clear lead action in the hero; course purchase remains
  secondary and contextual inside the featured offer.

## Color tokens

| Role | Value | Usage |
| --- | --- | --- |
| Background | `#08060C` | Near-black aubergine base |
| Soft background | `#0D0912` | Section separation |
| Surface | `#120D18` | Cards and form shell |
| Elevated surface | `#181020` | Featured content |
| BIM purple | `#8B5CF6` | Brand identity and technical highlights |
| Light purple | `#B69AF4` | Accessible text accent and focus |
| Champagne gold | `#B99A60` | Fine borders and premium signals |
| Light gold | `#E4CEA0` | CTA text and active emphasis |
| Foreground | `#F6F2F8` | Primary text |
| Muted foreground | `#B8AFBF` | Body copy |
| Quiet foreground | `#8E8497` | Metadata |
| Border | `rgba(239,231,242,.07)` | Hairline separation |

Gold must never become a large flat fill. It is a controlled accent used in
gradient borders, slim rules, labels, and CTA text. Purple remains the primary
technology color, especially for the BIM wordmark.

## Typography

- Display: Space Grotesk, with Inter and system sans fallbacks.
- Body: Inter, PingFang SC, Microsoft YaHei, and system sans fallbacks.
- Hero: oversized, tight tracking, 0.96 line-height.
- Body copy: at least 16px with 1.75–1.85 line-height.
- Labels: 10–12px uppercase/compact text with generous tracking.

## Spacing

Use a 4/8px rhythm. Preferred section values:

- Compact: 8–16px
- Component: 24–32px
- Section: 64–96px
- Hero: 96–128px

Content gutters are fluid: 20px on small screens and up to 80px on desktop.

## Components

### Buttons

- Minimum height: 48px.
- Dark interior with a one-pixel champagne-gold-to-purple gradient border.
- No bright gold fill inversion on hover.
- Hover uses brightness and shadow only; active feedback cannot shift layout.
- Visible three-pixel focus ring and clear disabled/loading state.

### Cards

- 16–22px radii, translucent near-black surfaces, subtle top-edge highlight.
- Featured card uses a low-opacity gold-to-purple border.
- No dramatic scale or translation on hover.
- Body copy must retain at least 4.5:1 contrast.

### Forms

- Always show visible labels above fields.
- Input text stays at 16px or larger to avoid mobile zoom.
- Error text appears adjacent to the form.
- Loading disables the button and changes its label.

## Accessibility and responsive rules

- Touch targets are at least 44×44px.
- Keyboard focus is always visible.
- Respect `prefers-reduced-motion`.
- Verify at 375px, 768px, 1024px, and 1440px.
- Avoid horizontal scrolling and fixed-width containers.
- Do not use color as the only state indicator.
- Keep the floating technical terms decorative and hidden from assistive tech.
- Preserve language choice in the URL (`/` for Chinese, `/en` for English) and
  translate every form, feedback, checkout, and success state.

## Avoid

- Bright yellow gold blocks.
- Highly saturated purple glow everywhere.
- Hard zero-radius cards and controls.
- Continuous decorative animation.
- Low-contrast gray-on-purple text.
- Jargon-heavy copy or multiple competing primary CTAs.
