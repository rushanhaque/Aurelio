/* ============================================================
   useSmoothScroll — Lenis inertia scroll wired into GSAP's ticker
   so ScrollTrigger stays perfectly in sync. Mount once (in App).
   Honors prefers-reduced-motion by skipping smoothing entirely.
   ============================================================ */
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      // lerp gives a snappier, more responsive glide than a fixed
      // duration easing — the scroll tracks the wheel closely so the
      // site feels fast while staying smooth.
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // expose for components that may want to scrollTo (nav links)
    window.__lenis = lenis

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])
}

/* Helper for anchor navigation that respects Lenis. */
export function scrollToSection(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: 0, duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
