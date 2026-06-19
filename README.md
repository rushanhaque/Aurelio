# AURELIO — Atelier of Fine Metalware

A premium, single-page landing site for **Aurelio**, a luxury metal-handicraft house.
Built with **React + Vite**, animated with **GSAP / ScrollTrigger**, and made buttery
with **Lenis** smooth-scroll. Design language: warm ivory + deep emerald with a whisper
of brass — quiet, architectural, "old-money" luxury.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Adding your own media

Every image/video is a refined `<Placeholder />` card for now. To drop in real media,
open the relevant section in `src/components/sections/` and replace a `<Placeholder … />`
with an `<img>` / `<video>` of the same aspect ratio. The placeholder’s `ratio`,
`label`, and `caption` props tell you what each frame expects.

## Architecture

```
src/
  index.css                  Global design system — colors, type scale, spacing, motion.
  lib/
    gsap.js                  Central GSAP + ScrollTrigger registration & motion constants.
    useSmoothScroll.js       Lenis inertia scroll, synced to GSAP's ticker.
  components/
    ui/                      Reusable primitives (the house style):
      Reveal.jsx             Fade + rise on scroll (single or staggered).
      SplitText.jsx          Word-mask reveal for headings.
      Eyebrow.jsx            Small-caps section label with brass rule.
      Placeholder.jsx        Premium media stand-in (replace with real media).
      Button.jsx             Magnetic CTA — solid / outline / ghost.
    sections/                One file per page section (+ co-located .css):
      Navbar, Hero, Manifesto, Collections, Materials, Atelier,
      Gallery, Heritage, Journal, Contact, Footer
```

## Design tokens

All color/type/spacing lives as CSS custom properties in `src/index.css`. Sections never
hard-code values — they consume tokens, which keeps the whole page coherent and makes
re-theming a one-file change.

- **Palette:** `--ivory`, `--paper`, `--emerald`, `--emerald-deep`, `--brass`
- **Type:** Cormorant Garamond (`--serif`) for display, Manrope (`--sans`) for UI/body
- **Motion:** `--ease-out`, `EASE` / `EASE_LONG` / `DUR` in `lib/gsap.js`

## Accessibility & performance

- Respects `prefers-reduced-motion` — smooth-scroll and heavy mechanics degrade gracefully.
- Semantic landmarks, `aria-label`s on icon controls, keyboard-focusable nav.
- Fonts preconnected; single GSAP bundle; no runtime image weight (placeholders are CSS).

---

© 2026 Aurelio Metalware — Handcrafted since 1972.
