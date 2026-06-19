/* ============================================================
   <Reveal> — the house reveal. Fade + weighted rise on scroll.
   - Default: animates the element itself.
   - stagger prop: animates direct children in sequence.
   Use this for paragraphs, rows, cards, dividers — anything
   that should arrive as you scroll. Headings use <SplitText>.
   ============================================================ */
import { useRef } from 'react'
import { gsap, useGSAP, EASE, DUR } from '../../lib/gsap'

export default function Reveal({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
  y = 38,
  stagger = false,
  start = 'top bottom',
  ...rest
}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const el = ref.current
      const targets = stagger ? el.children : el
      gsap.set(targets, { opacity: 0, y })
      const alreadyVisible = el.getBoundingClientRect().top < window.innerHeight
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: DUR,
        ease: EASE,
        delay,
        stagger: stagger ? 0.09 : 0,
        ...(alreadyVisible
          ? {}
          : { scrollTrigger: { trigger: el, start, once: true } }),
      })
    },
    { scope: ref }
  )

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
