/* ============================================================
   <Crest> — the house diamond monogram, drawn line-by-line as it
   scrolls into view (stroke-dashoffset, no plugin needed). Purely
   decorative; reusable at section openings and in the footer.
   ============================================================ */
import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'

export default function Crest({ className = '', size = 64 }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const shapes = ref.current.querySelectorAll('path, line, polyline')
      if (prefersReducedMotion) {
        gsap.set(shapes, { strokeDashoffset: 0 })
        return
      }
      shapes.forEach((s, i) => {
        const len = s.getTotalLength ? s.getTotalLength() : 200
        gsap.set(s, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(s, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.out',
          delay: i * 0.12,
          scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true },
        })
      })
    },
    { scope: ref }
  )

  return (
    <svg
      ref={ref}
      className={`crest ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      {/* outer diamond */}
      <path d="M32 3 L61 32 L32 61 L3 32 Z" />
      {/* inner diamond */}
      <path d="M32 17 L47 32 L32 47 L17 32 Z" />
      {/* the monogram bar — a fine vertical stroke through the centre */}
      <line x1="32" y1="22" x2="32" y2="42" />
      {/* centre node */}
      <path d="M29 32 L32 29 L35 32 L32 35 Z" fill="currentColor" stroke="none" />
    </svg>
  )
}
