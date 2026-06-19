/* ============================================================
   <SectionHeader> — the editorial spine that opens every section.
   The kicker is now a prominent section label that announces the
   section: its letters cascade up out of masks as you scroll in,
   then the index fades, the hairline draws, and the serif title
   reveals — a clear "you have arrived somewhere new" moment.

   Props:
     kicker     section label, e.g. "Collections"
     index      "01"   (series position)
     total      "08"   (series length) — optional
     title      string  -> revealed via SplitText
     titleClass "h2" (default) | "h1" | "display"
     lead       optional supporting sentence
     align      "left" (default) | "center"
     start      ScrollTrigger start (optional)
   ============================================================ */
import { useRef } from 'react'
import { gsap, useGSAP, EASE, EASE_LONG, prefersReducedMotion } from '../../lib/gsap'
import SplitText from './SplitText'
import BlurText from './BlurText'
import './SectionHeader.css'

export default function SectionHeader({
  kicker,
  index,
  total,
  title,
  titleClass = 'h2',
  lead,
  align = 'left',
  start = 'top 85%',
  blur = false,
  children,
}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const chars = gsap.utils.toArray('.sh-kicker-ch', ref.current)
      const mark = ref.current.querySelector('.sh-mark')
      const idx = ref.current.querySelector('.sh-index')
      const rule = ref.current.querySelector('.sh-rule')
      const leadEl = ref.current.querySelector('.sh-lead')

      if (prefersReducedMotion) {
        gsap.set(chars, { yPercent: 0 })
        gsap.set([idx, leadEl, mark].filter(Boolean), { opacity: 1, scale: 1, y: 0 })
        if (rule) gsap.set(rule, { scaleX: 1 })
        return
      }

      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start, once: true } })
      if (mark) tl.from(mark, { opacity: 0, scale: 0.3, duration: 0.55, ease: 'back.out(2.2)' }, 0)
      tl.from(chars, { yPercent: 115, duration: 0.72, ease: EASE_LONG, stagger: 0.028 }, 0.08)
      if (idx) tl.from(idx, { opacity: 0, y: 12, duration: 0.7, ease: EASE }, 0.28)
      if (rule) tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: EASE }, 0.2)
      if (leadEl) tl.from(leadEl, { opacity: 0, y: 18, duration: 0.8, ease: EASE }, 0.55)
    },
    { scope: ref }
  )

  const kickerChars = String(kicker || '').split('')

  return (
    <header ref={ref} className={`sh sh--${align}`}>
      <div className="sh-top">
        <div className="sh-label">
          <span className="sh-mark" aria-hidden="true">◆</span>
          {blur ? (
            <BlurText className="sh-kicker sh-kicker--blur" text={kicker} animateBy="words" direction="top" delay={90} stepDuration={0.32} />
          ) : (
          <span className="sh-kicker" aria-label={kicker}>
          {kickerChars.map((ch, i) => (
            <span className="sh-kicker-mask" key={i} aria-hidden="true">
              <span className="sh-kicker-ch">{ch === ' ' ? ' ' : ch}</span>
            </span>
          ))}
          </span>
          )}
        </div>
        {index && (
          <span className="sh-index" aria-hidden="true">
            <span className="sh-paren">(</span>
            <span className="sh-num">{index}</span>
            {total && (
              <>
                <span className="sh-slash">/</span>
                <span className="sh-total">{total}</span>
              </>
            )}
            <span className="sh-paren">)</span>
          </span>
        )}
      </div>

      <span className="sh-rule" aria-hidden="true" />

      <div className="sh-body">
        {title && (
          <SplitText as="h2" className={`sh-title ${titleClass}`} start={start} delay={0.3}>
            {title}
          </SplitText>
        )}
        {lead && <p className="sh-lead lead">{lead}</p>}
        {children}
      </div>
    </header>
  )
}
