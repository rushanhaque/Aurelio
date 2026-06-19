import { useRef, useEffect } from 'react'
import { gsap } from '../../lib/gsap'
import './Cursor.css'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -200, y: -200 })

    const pos     = { x: -200, y: -200 }
    const ringPos = { x: -200, y: -200 }

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      gsap.set(dot, { x: pos.x, y: pos.y })
    }

    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.12
      ringPos.y += (pos.y - ringPos.y) * 0.12
      gsap.set(ring, { x: ringPos.x, y: ringPos.y })
    }

    gsap.ticker.add(tick)

    const onOver = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        gsap.to(ring, { scale: 1.9, opacity: 1, duration: 0.45, ease: 'power3.out' })
        gsap.to(dot,  { scale: 0, opacity: 0, duration: 0.3, ease: 'power3.out' })
      }
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        gsap.to(ring, { scale: 1, opacity: 0.55, duration: 0.55, ease: 'power3.out' })
        gsap.to(dot,  { scale: 1, opacity: 1,    duration: 0.3,  ease: 'power3.out' })
      }
    }

    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerover', onOver)
    document.addEventListener('pointerout',  onOut)
    document.documentElement.classList.add('has-cursor')

    return () => {
      gsap.ticker.remove(tick)
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout',  onOut)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cur-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cur-ring" aria-hidden="true" />
    </>
  )
}
