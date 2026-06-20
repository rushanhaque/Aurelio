/* ============================================================
   Hero — a single centered statement on pure white. Monumental
   serif, one emerald accent, architectural corner marks, vast
   air. Everything non-essential has been cut.
   ============================================================ */
import { useRef } from 'react'
import { gsap, useGSAP, EASE, EASE_LONG, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap'
import { Link } from '../../lib/router'
import { scrollToSection } from '../../lib/useSmoothScroll'
import Button from '../ui/Button'
import { cldVideo } from '../../lib/cloudinary'
import './Hero.css'

// Home background video — served from Cloudinary (cloud: dmova2hvu).
const HERO_VIDEO_ID = '1781154008622964_wvancy'
const heroVideoSrc = cldVideo(HERO_VIDEO_ID)

export default function Hero() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref)
      // phones get a lighter, wrap-friendly entrance (the title wraps to
      // several lines here, so the single tall mask-reveal is swapped for a
      // soft staggered rise; scroll-scrub parallax + infinite breathing are
      // dropped to keep things at 60fps).
      const isPhone = typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches

      // the bar inverts (transparent, white type) while the film hero owns the screen
      const nav = document.querySelector('.nav')
      let stNav
      if (nav) {
        nav.classList.add('nav--invert')
        stNav = ScrollTrigger.create({
          trigger: ref.current,
          start: 'top top',
          end: 'bottom top',
          onToggle: (self) => nav.classList.toggle('nav--invert', self.isActive),
        })
      }
      const restore = () => { if (nav) nav.classList.remove('nav--invert'); if (stNav) stNav.kill() }

      if (prefersReducedMotion) {
        gsap.set(q('.hero-line-inner'), { yPercent: 0, y: 0, opacity: 1 })
        gsap.set(q('.hero-eyebrow, .hero-ctas'), { opacity: 1, y: 0 })
        gsap.set(q('.hero-eyebrow-rule'), { scaleX: 1 })
        return restore
      }

      const tl = gsap.timeline({ defaults: { ease: EASE } })

      if (isPhone) {
        // wrap-safe reveal: fade + gentle rise instead of a tall y-mask
        tl.set(q('.hero-line-inner'), { yPercent: 0, y: 26, opacity: 0 })
          .set(q('.hero-eyebrow, .hero-ctas'), { opacity: 0, y: 18 })
          .set(q('.hero-eyebrow-rule'), { scaleX: 0 })

          .to(q('.hero-eyebrow-rule'), { scaleX: 1, duration: 0.8, ease: EASE_LONG }, 0.3)
          .to(q('.hero-eyebrow'), { opacity: 1, y: 0, duration: 0.7 }, 0.4)
          .to(q('.hero-line-inner'), { y: 0, opacity: 1, duration: 1, ease: EASE_LONG }, 0.55)
          .to(q('.hero-ctas'), { opacity: 1, y: 0, duration: 0.8 }, 1.05)

        return restore
      }

      tl.set(q('.hero-line-inner'), { yPercent: 118 })
        .set(q('.hero-eyebrow, .hero-ctas'), { opacity: 0, y: 22 })
        .set(q('.hero-eyebrow-rule'), { scaleX: 0 })

        // 1 — eyebrow rules extend, label fades up
        .to(q('.hero-eyebrow-rule'), { scaleX: 1, duration: 0.9, ease: EASE_LONG }, 0.35)
        .to(q('.hero-eyebrow'), { opacity: 1, y: 0, duration: 0.8 }, 0.5)
        // 3 — the statement rises out of its mask
        .to(q('.hero-line-inner'), { yPercent: 0, duration: 1.2, ease: EASE_LONG }, 0.6)
        // 4 — the CTAs settle in
        .to(q('.hero-ctas'), { opacity: 1, y: 0, duration: 0.9 }, 1.2)

      // gentle parallax + fade as the hero leaves
      gsap.to(q('.hero-inner'), {
        yPercent: 7,
        opacity: 0.85,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      })

      // barely-there breathing on the title, after entrance
      gsap.to(q('.hero-title'), {
        y: -5,
        duration: 9,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2.6,
      })

      return restore
    },
    { scope: ref }
  )

  return (
    <section ref={ref} id="top" className="hero">
      <video className="hero-video" src={heroVideoSrc} autoPlay muted loop playsInline preload="auto" />
      <span className="hero-scrim" aria-hidden="true" />
      <div className="hero-inner">
        <span className="hero-eyebrow">
          <span className="hero-eyebrow-rule" aria-hidden="true" />
          <span className="hero-eyebrow-text">Atelier of Metal &amp; Wood — Est.&nbsp;2008</span>
          <span className="hero-eyebrow-rule" aria-hidden="true" />
        </span>

        <h1 className="hero-title" aria-label="Metal, wrought into permanence.">
          <span className="hero-line">
            <span className="hero-line-inner" aria-hidden="true">
              <span className="hero-w hero-w--1">METAL,</span>
              <span className="hero-w hero-w--2">wrought&nbsp;into</span>
              <span className="hero-w hero-w--3">permanence.</span>
            </span>
          </span>
        </h1>

      </div>

      <div className="hero-ctas">
        <Button variant="ghost" arrow as={Link} to="/collections">
          Explore the Collections
        </Button>
      </div>
    </section>
  )
}
