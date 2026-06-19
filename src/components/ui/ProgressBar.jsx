import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '../../lib/gsap'
import './ProgressBar.css'

export default function ProgressBar() {
  const fillRef = useRef(null)

  useGSAP(() => {
    gsap.to(fillRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.08,
      },
    })
  })

  return (
    <div className="pbar" aria-hidden="true">
      <div ref={fillRef} className="pbar-fill" />
    </div>
  )
}
