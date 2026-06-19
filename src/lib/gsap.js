/* ============================================================
   Central GSAP setup. Import { gsap, ScrollTrigger, EASE } from here.
   Plugins are registered once, globally.
   ============================================================ */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* Performance config:
   - force3D: promote transforms to the GPU (smoother, no repaint jank)
   - nullTargetWarn off: quieter, marginally faster in dev
   - ignoreMobileResize: don't thrash ScrollTrigger.refresh() when the
     mobile URL bar shows/hides (a major source of scroll jank) */
gsap.config({ force3D: true, nullTargetWarn: false })
ScrollTrigger.config({ ignoreMobileResize: true })

/* Brand motion language — slow, weighted, never bouncy. */
export const EASE = 'power3.out'
export const EASE_LONG = 'power4.out'
export const DUR = 0.9
export const DUR_LONG = 1.2
export const STAGGER = 0.08

export const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger, useGSAP }
