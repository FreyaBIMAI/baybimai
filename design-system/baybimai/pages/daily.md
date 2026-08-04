# Founder Daily page override

Use this override for `/daily` and `/en/daily`. The global BAYBIMAI system remains authoritative for navigation, type scale, focus states, and purple/gold brand cues.

## Purpose

- Make daily English practice feel smaller than avoidance: about six minutes, one lesson, one clear finish.
- Train language a founder needs to position, sell, raise, lead, and build relationships.
- Keep English visible first. Translation or an English takeaway is disclosed only when requested.

## Visual direction

- Treat the page as a quiet founder's morning reading desk, not a gamified course dashboard.
- Use warm ivory paper on pale lavender with restrained purple and antique-gold accents.
- Keep the reading column narrow, serif-led, and spacious; maintain the global geometric heading style.
- Show the 28-day route as four calm weekly cards. No confetti, trophies, gradient spectacle, or bouncing streaks.

## Interaction contract

- The next unfinished lesson is today's lesson. Missing a day never skips content.
- A completed lesson stays visible for the rest of the local day; the next lesson arrives on the next local date.
- Translation is collapsed by default.
- Speech synthesis reads English only and supports play, pause/resume, stop, and three speeds.
- The learner writes two imperfect English sentences and explicitly completes the lesson.
- Store completions and drafts in `localStorage`; require no account and make the device-local behavior explicit.
- Never permit future-lesson navigation from the route map.

## Accessibility and responsive behavior

- All controls are at least 44px tall with visible keyboard focus.
- Use semantic buttons, labels, a native select, progressbar values, and a polite live region.
- At 430px, use a single reading column, full-width controls, and stacked weekly route cards.
- Honor `prefers-reduced-motion` and never make animation necessary for comprehension.
