/* ============================================================
   PageIntro — an elegant emerald veil that reveals the brand
   on first load, then sweeps upward to expose the hero.
   Fires once per session (sessionStorage guard). The animation
   is intentionally slow and weighted — this is the moment the
   brand introduces itself.
   ============================================================ */
import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import './PageIntro.css'

/* The loading screen — plays on every full page load. */
export default function PageIntro() {
  return <PageIntroInner />
}

function PageIntroInner() {
  const ref   = useRef(null)
  const [gone, setGone] = useState(false)

  useGSAP(
    () => {
      const el      = ref.current
      const mark    = el.querySelector('.pi-mark-inner')
      const rule    = el.querySelector('.pi-rule')
      const tagline = el.querySelector('.pi-tag')
      const count   = el.querySelector('.pi-count')

      // Tightened ~3s -> ~1.9s so the page arrives quickly while the
      // brand still introduces itself.
      const tl = gsap.timeline({ delay: 0.04 })
      // 0 — a fine percentage counts 0 → 100 across the reveal
      const c = { v: 0 }
      tl.to(c, {
        v: 100,
        duration: 1.25,
        ease: 'power1.inOut',
        onUpdate: () => { if (count) count.textContent = String(Math.round(c.v)).padStart(2, '0') },
      }, 0)
      // 1 — wordmark rises out of its mask
      tl.set(mark, { yPercent: 108 })
        .set(rule, { scaleX: 0 })
        .to(mark, { yPercent: 0, duration: 0.8, ease: 'power4.out' })
      // 2 — a fine brass rule draws beneath the mark
        .to(rule, { scaleX: 1, duration: 0.7, ease: 'power3.out' }, '-=0.42')
      // 3 — tagline fades in
        .fromTo(tagline, { opacity: 0 }, { opacity: 0.52, duration: 0.45, ease: 'power2.out' }, '-=0.3')
      // 3 — brief hold, then the veil sweeps cleanly upward
        .to(el, {
          yPercent: -100,
          duration: 0.85,
          ease: 'power4.inOut',
          delay: 0.4,
          onComplete: () => setGone(true),
        })
    },
    { scope: ref, dependencies: [] }
  )

  if (gone) return null

  return (
    <div ref={ref} className="pi">
      <div className="pi-mark-wrap">
        <span className="pi-mark-inner">AURELIO</span>
      </div>
      <span className="pi-rule" aria-hidden="true" />
      <span className="pi-tag caption">By AF International — Est. 2008</span>
      <span className="pi-count" aria-hidden="true">00</span>
    </div>
  )
}
