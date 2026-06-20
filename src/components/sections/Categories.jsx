/* ============================================================
   Categories — the seven worlds of Aurelio, presented as full-bleed
   cinematic panels. One panel is always open; hovering or focusing
   another glides it wide while the rest slip to slender columns,
   their names standing vertically until called. Immersive, filmic,
   and unmistakably bespoke. Stacks to full cards on touch.
   Section keeps id="collections" so the primary nav resolves here.
   ============================================================ */
import { useRef, useState } from 'react'
import { gsap, useGSAP, EASE, prefersReducedMotion } from '../../lib/gsap'
import { navigate } from '../../lib/router'
import SectionHeader from '../ui/SectionHeader'
import Placeholder from '../ui/Placeholder'
import { COLLECTIONS } from '../../data/collections'
import './Categories.css'

/* The panels read the live catalogue, so ordering and cover art stay in
   sync with the rest of the site (Urns first … Bespoke last). */
const CATS = COLLECTIONS

export default function Categories() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      if (prefersReducedMotion) return

      const mm = gsap.matchMedia()

      /* Desktop / tablet — the row glides up as one cinematic strip. */
      mm.add('(min-width: 901px)', () => {
        gsap.from(ref.current.querySelectorAll('.cat-panel'), {
          yPercent: 9,
          opacity: 0,
          duration: 1.05,
          ease: EASE,
          stagger: 0.085,
          scrollTrigger: { trigger: ref.current.querySelector('.cat-panels'), start: 'top 80%', once: true },
        })
      })

      /* Phone / small tablet — each stacked card reveals on its own as it
         enters the viewport: a gentle slide-up + fade with a slow image
         zoom-settle. Transform + opacity only, so it stays at 60fps. */
      mm.add('(max-width: 900px)', () => {
        ref.current.querySelectorAll('.cat-panel').forEach((panel) => {
          const media = panel.querySelector('.ph-img, .ph-fill')
          const content = panel.querySelector('.cat-panel-content')
          const tl = gsap.timeline({
            scrollTrigger: { trigger: panel, start: 'top 88%', once: true },
          })
          tl.from(panel, { yPercent: 6, opacity: 0, duration: 0.9, ease: EASE })
          if (media) tl.from(media, { scale: 1.12, duration: 1.2, ease: EASE }, 0)
          if (content) tl.from(content, { y: 18, opacity: 0, duration: 0.8, ease: EASE }, 0.18)
        })
      })
    },
    { scope: ref }
  )

  const open = (c) => navigate(c.slug === 'bespoke' ? '/contact' : `/collections/${c.slug}`)
  const onKey = (e, c) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(c) }
  }

  return (
    <section ref={ref} id="collections" className="cat">
      <div className="container">
        <SectionHeader
          kicker="Collections"
          index="01"
          total="08"
          title="Seven worlds, shaped in metal."
          lead="From a single pendant to an entire interior — seven disciplines, each drawn, forged and finished beneath one roof."
        />
      </div>

      <div
        className="cat-panels"
        onMouseLeave={() => setActive(0)}
      >
        {CATS.map((c, i) => (
          <article
            key={c.slug}
            className={`cat-panel ${i === active ? 'is-active' : ''}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => open(c)}
            onKeyDown={(e) => onKey(e, c)}
            tabIndex={0}
            role="button"
            aria-label={`${c.name} — ${c.summary}`}
          >
            <Placeholder fill tone="dark" type="image" src={c.cover} alt={`${c.name} — Aurelio`} label={c.name} drift={false} />
            <span className="cat-panel-scrim" aria-hidden="true" />

            <span className="cat-panel-index" aria-hidden="true">{c.index}</span>

            <span className="cat-panel-vlabel" aria-hidden="true">{c.name}</span>

            <div className="cat-panel-content">
              <h3 className="cat-panel-name">{c.name}</h3>
              <p className="cat-panel-desc">{c.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
