/* ============================================================
   Materials — six-panel dark showcase. Portrait placeholders
   on emerald-deep; serif-italic names, quality marks, and
   one-line body. Staggered scroll-reveal per card.
   ============================================================ */
import { useRef } from 'react'
import { gsap, useGSAP, EASE, prefersReducedMotion } from '../../lib/gsap'
import SectionHeader from '../ui/SectionHeader'
import Placeholder from '../ui/Placeholder'
import './Materials.css'

const MATERIALS = [
  {
    name: 'Brass',
    quality: 'C260 Cartridge Alloy',
    body: 'The house metal. Warm, ductile, and receptive to every finish — raw, polished, patinated or lacquered.',
    ratio: '2/3',
    index: '01',
  },
  {
    name: 'Copper',
    quality: 'C110 Electrolytic Purity',
    body: 'Living patina. Copper shifts from rose-gold to amber to verdigris — each piece ages into its own portrait.',
    ratio: '2/3',
    index: '02',
  },
  {
    name: 'Patinated Steel',
    quality: 'Cold-worked mild steel',
    body: 'Controlled rust as design language. Sealed to hold the moment of transformation, neither progressing nor retreating.',
    ratio: '2/3',
    index: '03',
  },
  {
    name: 'Wrought Iron',
    quality: 'Forge-welded carbon iron',
    body: 'The oldest vocabulary. Worked hot, shaped by hand and hammer, then oil-black — monumental and immediate.',
    ratio: '2/3',
    index: '04',
  },
  {
    name: 'Aluminium',
    quality: 'Aircraft-grade 6061-T6',
    body: 'Lightness with integrity. Spun-formed and anodised, it makes weight invisible — structural poetry.',
    ratio: '2/3',
    index: '05',
  },
  {
    name: 'Blown Glass',
    quality: 'Borosilicate & soda-lime',
    body: 'The only material we do not forge — we collaborate. Hand-blown by partner studios in Murano and Bohemia.',
    ratio: '2/3',
    index: '06',
  },
]

export default function Materials() {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion) return
      const cards = gsap.utils.toArray('.mat-card', ref.current)
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 36,
          duration: 0.95,
          ease: EASE,
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true,
          },
        })
      })
    },
    { scope: ref }
  )

  return (
    <section ref={ref} id="materials" className="section mat on-dark">
      <div className="sec-grain" aria-hidden="true" />
      <div className="container mat-container">
        <SectionHeader
          kicker="Materials"
          index="05"
          total="10"
          title="Eight languages of making."
          lead="Each material speaks differently. We listen to all of them."
        />

        <div className="mat-grid">
          {MATERIALS.map((m) => (
            <article key={m.index} className="mat-card">
              <div className="mat-fig">
                <Placeholder
                  ratio={m.ratio}
                  type="image"
                  index={m.index}
                  label={m.name}
                  tone="dark"
                />
              </div>
              <div className="mat-info">
                <span className="mat-index">{m.index}</span>
                <h3 className="mat-name serif-italic">{m.name}</h3>
                <span className="mat-quality">{m.quality}</span>
                <p className="mat-body">{m.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
