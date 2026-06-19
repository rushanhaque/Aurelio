import { useRef } from 'react'
import { gsap, useGSAP, EASE, prefersReducedMotion } from '../lib/gsap'
import Seo from '../components/layout/Seo'
import PageHero from '../components/layout/PageHero'
import { Link } from '../lib/router'
import Placeholder from '../components/ui/Placeholder'
import { COLLECTIONS, productsByCollection } from '../data/collections'
import './pages.css'

export default function CollectionsPage() {
  const ref = useRef(null)
  const previewRef = useRef(null)

  useGSAP(
    () => {
      const wrap = ref.current
      const list = wrap.querySelector('.coll-index')
      const rows = gsap.utils.toArray('.coll-row', wrap)
      const preview = previewRef.current
      const items = gsap.utils.toArray('.coll-pv-item', preview)

      // entrance — rows rise crisply, then enable the sibling-dim transition
      if (prefersReducedMotion) {
        list.classList.add('is-ready')
      } else {
        gsap.from(rows, {
          autoAlpha: 0,
          yPercent: 45,
          duration: 0.9,
          ease: EASE,
          stagger: 0.07,
          clearProps: 'opacity,visibility,transform',
          scrollTrigger: { trigger: wrap, start: 'top 80%', once: true },
          onComplete: () => list.classList.add('is-ready'),
        })
      }

      // cursor-following image reveal — fine pointers only
      const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      if (!fine || prefersReducedMotion) return

      gsap.set(preview, { xPercent: -50, yPercent: -50 })
      const xTo = gsap.quickTo(preview, 'x', { duration: 0.55, ease: 'power3' })
      const yTo = gsap.quickTo(preview, 'y', { duration: 0.55, ease: 'power3' })

      let shown = false
      const onMove = (e) => { xTo(e.clientX); yTo(e.clientY) }
      const leave = () => {
        shown = false
        gsap.to(preview, { autoAlpha: 0, scale: 0.94, duration: 0.5, ease: 'power2.out', overwrite: 'auto' })
      }

      const cleanups = []
      rows.forEach((row, i) => {
        const enter = (e) => {
          if (!shown) {
            shown = true
            gsap.set(preview, { x: e.clientX, y: e.clientY })
            gsap.fromTo(
              preview,
              { autoAlpha: 0, scale: 0.94 },
              { autoAlpha: 1, scale: 1, duration: 0.65, ease: 'power3.out', overwrite: 'auto' }
            )
          }
          items.forEach((it, idx) =>
            gsap.to(it, { opacity: idx === i ? 1 : 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
          )
        }
        row.addEventListener('mouseenter', enter)
        cleanups.push(() => row.removeEventListener('mouseenter', enter))
      })

      list.addEventListener('mousemove', onMove)
      list.addEventListener('mouseleave', leave)
      cleanups.push(() => {
        list.removeEventListener('mousemove', onMove)
        list.removeEventListener('mouseleave', leave)
      })

      return () => cleanups.forEach((fn) => fn())
    },
    { scope: ref }
  )

  return (
    <>
      <Seo
        title="Collections"
        description="Seven disciplines — lighting, furniture, kitchenware, decor, accessories, urns and bespoke — each drawn, forged and finished beneath one roof."
        path="/collections"
      />
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Collections' }]}
        kicker="The Catalogue"
        title="Seven worlds, shaped in metal."
        lead="From a single pendant to an entire interior — seven disciplines, each drawn, forged and finished beneath one roof. Hover a name to look inside."
      />

      <section ref={ref} className="section coll-index-section">
        <div className="container">
          <ul className="coll-index">
            {COLLECTIONS.map((c) => {
              const count = productsByCollection(c.slug).length
              return (
                <li className="coll-row" key={c.slug}>
                  <Link to={c.slug === 'bespoke' ? '/contact' : `/collections/${c.slug}`} className="coll-row-link" aria-label={`${c.name} — ${c.summary}`}>
                    <span className="coll-row-media" aria-hidden="true">
                      <Placeholder ratio="16/9" type="image" src={c.cover} alt={`${c.name} — Aurelio`} index={c.index} label={c.name} tone="auto" drift={false} />
                    </span>
                    <span className="coll-row-index">{c.index}</span>
                    <span className="coll-row-name">{c.name}</span>
                    <p className="coll-row-summary">{c.summary}</p>
                    <span className="coll-row-count">{count} {count === 1 ? 'piece' : 'pieces'}</span>
                    <span className="coll-row-arrow" aria-hidden="true">
                      <svg viewBox="0 0 34 12" width="34" height="12" fill="none">
                        <path d="M0 6h30M25 1l5 5-5 5" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* floating cursor-following image preview */}
        <div className="coll-pv" ref={previewRef} aria-hidden="true">
          {COLLECTIONS.map((c) => (
            <div className="coll-pv-item" key={c.slug}>
              <Placeholder ratio="4/5" type="image" src={c.cover} alt={`${c.name} — Aurelio`} index={c.index} label={c.name} tone="auto" drift={false} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
