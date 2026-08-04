# News page override

## Direction

- Editorial, content-first, and black/white minimal.
- Preserve BAYBIMAI purple only for the BIM wordmark, key headline phrase,
  focus ring, section numbers, and reading progress.
- Default article reading surface is light paper; the user can switch to a
  saved dark reading mode.
- Index uses exaggerated editorial type and a single featured report.
- Article body stays within a readable measure and uses spacious vertical
  rhythm.

## Interaction

- Native browser speech synthesis ranks natural voices ahead of compact/robotic
  voices and supports saved voice selection, preview, start, pause/resume, stop,
  and 0.8×–1.5× speed.
- Reading controls and language links are at least 44px high.
- Reading progress and the last scroll position are saved locally.
- Font size and reading theme are stored as device-local preferences.
- Interactive code remains in a leaf client component; index and article
  content remain server-rendered.

## Accessibility

- Semantic `article`, `section`, `nav`, `aside`, heading order, and source list.
- Visible focus indicators, high contrast in both themes, and live speech
  status.
- Responsive at 375px, 768px, 1024px, and 1440px with no horizontal scroll.
