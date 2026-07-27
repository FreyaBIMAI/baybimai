# Careers page override

The `/careers` and `/en/careers` routes inherit the global BAYBIMAI design
system with the following page-specific rules.

## Direction

- Pattern: editorial company directory plus an interview-preparation guide.
- Default information density: medium; reveal source links in native details
  controls so the primary comparison stays readable.
- Company scale is comparative data, not promotional copy. Never imply that
  BAYBIMAI represents or is endorsed by a listed employer.
- Use company icons as recognition anchors, but keep the company name as the
  primary accessible identifier.

## Visual system

- Hero and preparation resources use the global near-black aubergine surface.
- Ranking cards use warm off-white surfaces with near-black type, creating a
  clear mode change from introduction to comparison.
- Purple indicates BIM/digital-career emphasis. Champagne gold is restricted
  to labels, fine rules, and focus states.
- Avoid large logo walls. Each company is a full-width comparison card with
  revenue, public market-cap status, Bay Area signal, role keywords, HR focus,
  official jobs link, and expandable evidence links.

## Interaction and accessibility

- Ranking defaults to latest reported annual revenue and can switch to public
  market capitalization without a page reload.
- `aria-pressed` communicates the active sort. The valuation view must not
  assign ranks to private, employee-owned, or trust-owned companies.
- Sort controls, language links, details summaries, and career links must be at
  least 44px high with visible keyboard focus.
- Company cards collapse to one column below 720px; metrics become stacked below
  440px.
- Motion is limited to color and shadow transitions and must respect
  `prefers-reduced-motion`.

## Data language

- “Revenue” means latest reported global group revenue, never Bay Area office
  output.
- Cross-currency values may use approximate USD solely for sorting; display the
  original reporting currency on the card.
- “Valuation” means a dated public-company market-cap snapshot. Do not show
  unverified private-company valuation estimates.
