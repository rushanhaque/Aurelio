/* ============================================================
   <ClickSpark> — React Bits click-spark burst.
   Adapted for site-wide use: the canvas is a fixed, viewport-
   sized overlay (cheap to clear each frame), and clicks anywhere
   inside the wrapped children emit a spark at the cursor.
   ============================================================ */
import { useRef, useEffect, useCallback } from 'react'

const ClickSpark = ({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  children,
}) => {
  const canvasRef = useRef(null)
  const sparksRef = useRef([])
  const ctxRef = useRef(null)
  const rafRef = useRef(null)

  // Size the fixed, viewport-covering canvas to the window.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  const easeFunc = useCallback(
    (t) => {
      switch (easing) {
        case 'linear':
          return t
        case 'ease-in':
          return t * t
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        default:
          return t * (2 - t)
      }
    },
    [easing]
  )

  // Cache the 2d context once. The draw loop is NOT started here — it only
  // runs on demand (see handleClick) so an idle site does zero per-frame work.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    ctxRef.current = canvas.getContext('2d')
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  const draw = useCallback(
    (timestamp) => {
      const canvas = canvasRef.current
      const ctx = ctxRef.current
      if (!canvas || !ctx) { rafRef.current = null; return }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime
        if (elapsed >= duration) return false

        const progress = elapsed / duration
        const eased = easeFunc(progress)

        const distance = eased * sparkRadius * extraScale
        const lineLength = sparkSize * (1 - eased)

        const x1 = spark.x + distance * Math.cos(spark.angle)
        const y1 = spark.y + distance * Math.sin(spark.angle)
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle)
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle)

        ctx.strokeStyle = sparkColor
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()

        return true
      })

      // Keep animating only while sparks remain; otherwise stop the loop
      // entirely (a final clearRect leaves the canvas blank).
      if (sparksRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(draw)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        rafRef.current = null
      }
    },
    [sparkColor, sparkSize, sparkRadius, duration, easeFunc, extraScale]
  )

  const handleClick = (e) => {
    // canvas is fixed at the viewport origin, so client coords map 1:1
    const x = e.clientX
    const y = e.clientY
    const now = performance.now()
    const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now,
    }))
    sparksRef.current.push(...newSparks)
    // Start the draw loop only if it isn't already running.
    if (rafRef.current == null) rafRef.current = requestAnimationFrame(draw)
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }} onClick={handleClick}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'block',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />
      {children}
    </div>
  )
}

export default ClickSpark
