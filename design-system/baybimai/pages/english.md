# English page override

The English route inherits every visual token and component rule from
`../MASTER.md`.

## Localization rules

- The English page lives at `/en`; Chinese remains the default `/`.
- Use a real link for language switching so browser history, sharing, and search
  engines preserve the selected language.
- Translate the full conversion journey: landing copy, forms, loading and error
  states, Stripe Checkout locale, cancellation URL, and payment success page.
- Keep the language control at least 44px tall/wide with a visible focus state.
- Prefer natural English marketing copy over literal word-for-word translation.
- Keep product names, pricing, and service scope equivalent across languages.
- Publish canonical and `hreflang` metadata for both routes.
