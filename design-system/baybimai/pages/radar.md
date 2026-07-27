# Global BIM Radar page override

The `/radar` and `/en/radar` routes inherit BAYBIMAI typography, brand purple,
navigation, and bilingual URL behavior, with the following page-specific rules.

## Direction

- Pattern: editorial research atlas plus filterable event directory.
- Purpose: turn events, standards, regional programs, papers, and career paths
  into an actionable professional map rather than a conventional news feed.
- Density: medium-high, with clear section boundaries and short evidence-led
  summaries.
- Tone: precise, international, and useful. Dates and claims link to official
  organizers, public agencies, standards bodies, or paper authors.

## Visual system

- Main field: warm ivory and pale lavender with dark aubergine type.
- BIM purple signals active navigation, filters, technical labels, and radar
  geometry.
- Champagne gold is limited to watch states, fine details, and the primary
  openBIM Awards link.
- The regional-program section and jury checklist switch to deep aubergine to
  create a deliberate chapter break.
- The hero radar is code-native CSS geometry. The page-specific social card is
  a quiet editorial illustration and never appears as a decorative hero image.

## Information and interaction

- Event filters are real buttons with `aria-pressed`; one event may belong to a
  geographic category and the competition category.
- “Date confirmed” and “Watch” are written states, never color-only signals.
- Exact dates are shown only when published by the organizer. Seasonal or
  rolling programs retain explicit TBD/watch language.
- External links open official sources in a new tab and retain descriptive
  visible labels.
- Research items are marked as preprints and include a practical limitation or
  reading signal.
- People are presented as learnable paths, not as an influence ranking or
  endorsement.
- People cards use official portraits only. Every portrait has a fixed 1:1 crop,
  localized alt text, and an 80px circular frame (72px on narrow phones).
- A shared grayscale, soft-sepia, purple-shift filter unifies portraits from
  different source eras. Hover never reveals full color, so no person receives
  stronger visual emphasis.
- Portrait dimensions are reserved before loading and below-the-fold files load
  lazily to avoid layout shift and unnecessary transfer.

## Responsive and accessibility

- All buttons and links have at least a 44px interaction height and visible
  keyboard focus.
- The five-item section rail becomes a two-column grid on small screens instead
  of horizontal scrolling.
- Event and profile grids collapse to one column; paper cards collapse from
  four to two to one.
- The CSS radar has no continuous motion and is hidden from assistive
  technologies.
- Body text remains at least 16px where it carries explanatory content, with
  1.65–1.8 line height.
- Respect `prefers-reduced-motion`; no required information depends on hover.
