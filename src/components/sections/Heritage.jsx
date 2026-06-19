/* ============================================================
   Heritage — cinematic video-bg. Full-bleed atelier film beneath;
   graded scrim keeps type legible. Counter ceremony: brass bars
   draw left-to-right first, then numbers count up in cascade.
   ============================================================ */
import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap'
import { scrollToSection } from '../../lib/useSmoothScroll'
import Reveal from '../ui/Reveal'
import SectionHeader from '../ui/SectionHeader'
import Button from '../ui/Button'
import heritageBg from '../../../assets/HomePage/HeritageBG.mp4'
import './Heritage.css'

const STATS = [
  { value: 17,   suffix: '+', label: 'Years at the bench' },
  { value: 60,   suffix: '+', label: 'Hands in the workshop' },
  { value: 5000, suffix: '+', label: 'Pieces a year' },
  { value: 25,   suffix: '+', label: 'Countries shipped to' },
]

const formatInt = (n) => Math.round(n).toLocaleString('en-US')

export default function Heritage() {
  const ref      = useRef(null)
  const statsRef = useRef(null)

  useGSAP(
    () => {
      // Invert the transparent header to white text while this dark video
      // section sits beneath it (it reverts to emerald on hover, when the
      // bar itself turns white).
      const nav = document.querySelector('.nav')
      if (nav) {
        ScrollTrigger.create({
          trigger: ref.current,
          start: 'top top',
          end: 'bottom top',
          onToggle: (self) => nav.classList.toggle('nav--invert', self.isActive),
        })
      }
      const restoreNav = () => { if (nav) nav.classList.remove('nav--invert') }

      const nums  = gsap.utils.toArray('.her-stat-num',  statsRef.current)
      const lines = gsap.utils.toArray('.her-stat-line', statsRef.current)

      if (prefersReducedMotion) {
        nums.forEach((el, i) => {
          el.textContent = formatInt(STATS[i].value) + STATS[i].suffix
        })
        gsap.set(lines, { scaleX: 1 })
        return restoreNav
      }

      nums.forEach((el, i) => { el.textContent = formatInt(0) + STATS[i].suffix })
      gsap.set(lines, { scaleX: 0, transformOrigin: 'left center' })

      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          // Phase 1 — brass lines draw across
          gsap.to(lines, {
            scaleX: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: 0.1,
          })

          // Phase 2 — numbers count up (starts just after bars begin)
          nums.forEach((el, i) => {
            const { value, suffix } = STATS[i]
            const proxy = { val: 0 }
            gsap.to(proxy, {
              val: value,
              duration: 2.2,
              ease: 'power4.out',
              delay: 0.42 + i * 0.1,
              onUpdate:  () => { el.textContent = formatInt(proxy.val) + suffix },
              onComplete: () => { el.textContent = formatInt(value) + suffix },
            })
          })
        },
      })

      return restoreNav
    },
    { scope: ref }
  )

  return (
    <section ref={ref} id="heritage" className="her">

      <div className="her-media" aria-hidden="true">
        <video
          className="her-video"
          src={heritageBg}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="her-scrim" />
      </div>

      <div className="her-body">
        <div className="container">
          <SectionHeader
            kicker="Heritage"
            index="08"
            total="10"
            title="At the bench since 2008."
            titleClass="h2"
          />

          <Reveal as="div" className="her-prose" stagger>
            <p className="her-p body-muted">
              <span className="her-drop">A</span>urelio began in 2008 as a single
              workshop in Moradabad and a handful of hands. A decade and a half on,
              we remain a family atelier — larger, but unchanged in temperament.
            </p>
            <p className="her-p body-muted">
              We have never chased volume. We chase the line of a curve, the
              weight of a handle, the exact moment brass turns from yellow to
              gold. Patience is our only shortcut.
            </p>
          </Reveal>
        </div>

        <div className="container">
          <hr className="hairline her-rule" />
          <dl className="her-stats" ref={statsRef}>
            {STATS.map((s, i) => (
              <div className="her-stat" key={s.label}>
                {/* Brass bar — draws before counter starts */}
                <span className="her-stat-line" aria-hidden="true" />
                <span className="her-stat-tag caption" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <dd className="her-stat-num" aria-hidden="true">
                  {formatInt(prefersReducedMotion ? s.value : 0)}{s.suffix}
                </dd>
                <span className="her-stat-sr">
                  {formatInt(s.value)}{s.suffix}
                </span>
                <dt className="her-stat-label caption">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
