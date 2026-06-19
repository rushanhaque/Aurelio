/* ============================================================
   Gallery — "Selected Works". Editorial grid of real pieces on
   white. Each tile shows the piece at rest; on hover its second
   image crossfades in — a lamp lights, a candle catches — for a
   "comes alive" moment. Columns drift on scroll; each frame tilts
   ±5° in 3-D under the cursor.
   ============================================================ */
import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { navigate } from '../../lib/router'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import './Gallery.css'

/* Load every Selected-Works image; resolve each piece's rest + hover frame. */
const FILES = import.meta.glob('../../../assets/HomePage/Selected works/*.{png,PNG,jpg,jpeg,webp}', { eager: true, import: 'default' })
const pick = (base) => {
  const key = Object.keys(FILES).find((p) => p.slice(0, p.lastIndexOf('.')).endsWith(`/${base}`))
  return key ? FILES[key] : undefined
}

const PIECES = [
  { base: 'Lamp', name: 'Lumière', suffix: 'Lamp', meta: 'Lighting · Brass & opal glass', drift: -10 },
  { base: 'Candle1', name: 'Vesta', suffix: 'Candleholder', meta: 'Objets · Cast brass', drift: 7 },
  { base: 'Lantern1', name: 'Beacon', suffix: 'Lantern', meta: 'Lighting · Brass & glass', drift: 8 },
  { base: 'FlowerPot1', name: 'Flora', suffix: 'Planter', meta: 'Decor · Hammered copper', drift: -8 },
  { base: 'Lamptwo', name: 'Solène', suffix: 'Table Lamp', meta: 'Lighting · Patinated brass', drift: 11 },
  { base: 'Light1', name: 'Lumen', suffix: 'Wall Light', meta: 'Lighting · Hand-spun brass', drift: -6 },
  { base: 'Candle2', name: 'Ember', suffix: 'Candle Stand', meta: 'Objets · Blackened steel', drift: 9 },
  { base: 'Jewelry1', name: 'Aveline', suffix: 'Jewelry Stand', meta: 'Objets · Cast brass', drift: -6 },
  { base: 'FlowerPot2', name: 'Terra', suffix: 'Cachepot', meta: 'Decor · Spun brass', drift: -7 },
  { base: 'Console', name: 'Séverin', suffix: 'Console Table', meta: 'Furniture · Forged steel & oak', drift: 6 },
  { base: 'Tray1', name: 'Auréa', suffix: 'Serving Tray', meta: 'Objets · Handcrafted brass', drift: 7 },
  { base: 'Clock1', name: 'Tempus', suffix: 'Wall Clock', meta: 'Decor · Brushed brass & charcoal dial', drift: -8 },
].map((p) => {
  let offKey = p.base
  let onKey = `${p.base}Hover`

  if (p.base === 'Jewelry1') {
    offKey = 'JewelryStand1'
    onKey = 'JewelryStand2'
  } else if (p.base === 'Tray1') {
    offKey = 'Tray1'
    onKey = 'Tray2'
  } else if (p.base === 'Clock1') {
    offKey = 'WallClock1'
    onKey = 'WallClock2'
  }

  return {
    ...p,
    off: pick(offKey),
    on: pick(onKey),
  }
})

export default function Gallery() {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion) return

      // Curtain reveal — each figure wipes up into view on entry
      gsap.utils.toArray('.gal-fig', ref.current).forEach((fig) => {
        gsap.fromTo(
          fig,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: fig, start: 'top 90%', once: true },
            onComplete: () => gsap.set(fig, { clipPath: 'none' }),
          }
        )
      })
    },
    { scope: ref }
  )

  return (
    <section ref={ref} id="gallery" className="section gal">
      <div className="container">
        <SectionHeader
          kicker="Selected Works"
          index="06"
          total="10"
          title="Pieces with a past tense."
          titleClass="h2"
          lead="A handful of signatures from the atelier — each raised, forged or cast, and finished to be lived with rather than looked at. Hover to bring them to life."
        >
          <Reveal className="gal-head-action" delay={0.2}>
            <Button variant="ghost" arrow onClick={() => navigate('/collections')}>
              View the full catalogue
            </Button>
          </Reveal>
        </SectionHeader>

        <div className="gal-grid">
          {PIECES.map((p) => (
            <article key={p.base} className="gal-item">
              <div className="gal-fig">
                {p.off && (
                  <img className="gal-img gal-img--off" src={p.off} alt={`${p.name} ${p.suffix}`} loading="lazy" decoding="async" />
                )}
                {p.on && (
                  <img className="gal-img gal-img--on" src={p.on} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                )}
              </div>
              <figcaption className="gal-cap">
                <span className="gal-cap-name serif-italic">"{p.name}" {p.suffix}</span>
                <span className="gal-cap-meta caption">{p.meta}</span>
              </figcaption>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
