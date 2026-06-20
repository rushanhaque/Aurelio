/* ============================================================
   <Placeholder> — a refined stand-in for client imagery/video.
   Architectural registration ticks, index, fine label, grain,
   and a slow inner "ken-burns" drift so even empty frames feel
   alive and expensive. Replace with <img>/<video> later.

   Props:
     ratio   "4/5" | "16/9" | "1/1" | "3/4" | "21/9" ...
     label   short descriptor of the intended media
     type    "image" | "video"
     index   "01" style marker (optional)
     tone    "auto" (default) | "dark"  -> dark uses emerald fill
     drift   boolean (default true) parallax-ish inner motion
   ============================================================ */
import { useRef, useState, useEffect } from 'react'
import { gsap, useGSAP, EASE } from '../../lib/gsap'
import './Placeholder.css'

export default function Placeholder({
  ratio = '4/5',
  label = 'Imagery',
  type = 'image',
  index,
  tone = 'auto',
  caption,
  className = '',
  drift = true,
  fill = false,
  priority = false,
  src,
  alt = '',
  fit = 'cover',
  style,
}) {
  const ref = useRef(null)
  const imgRef = useRef(null)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  // Blur-up: each photo fades in from a soft blur once it decodes. Cached
  // images report complete on mount; if one is broken (naturalWidth 0) we drop
  // it so the browser never paints its broken-image icon — the clean frame
  // shows instead.
  useEffect(() => {
    setImgError(false)
    const el = imgRef.current
    if (el && el.complete) {
      if (el.naturalWidth === 0) setImgError(true)
      setImgLoaded(true)
    }
  }, [src])

  useGSAP(
    () => {
      if (!drift || fill || src) return
      const fillEl = ref.current.querySelector('.ph-fill')
      gsap.fromTo(
        fillEl,
        { yPercent: -6, scale: 1.08 },
        {
          yPercent: 6,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
      // entrance: unveil from a clip
      gsap.fromTo(
        ref.current,
        { clipPath: 'inset(8% 8% 8% 8%)', opacity: 0.0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.2,
          ease: EASE,
          scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
        }
      )
    },
    { scope: ref }
  )

  return (
    <figure
      ref={ref}
      className={`ph ph--${tone} ${fill ? 'ph--fill' : ''} ${src && !imgError ? 'ph--photo' : ''} ${src && !imgError && fit === 'contain' ? 'ph--contain' : ''} grain ${className}`}
      style={{
        ...style,
        ...(fill ? {} : { aspectRatio: ratio.replace('/', ' / ') }),
      }}
      data-type={type}
    >
      {src && !imgError && (
        <img
          ref={imgRef}
          className={`ph-img${imgLoaded ? ' is-loaded' : ''}`}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchpriority={priority ? 'high' : undefined}
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
        />
      )}
      <div className="ph-fill" aria-hidden="true" />
      <span className="ph-tick ph-tick--tl" aria-hidden="true" />
      <span className="ph-tick ph-tick--tr" aria-hidden="true" />
      <span className="ph-tick ph-tick--bl" aria-hidden="true" />
      <span className="ph-tick ph-tick--br" aria-hidden="true" />

      {index && <span className="ph-index">{index}</span>}

      <div className="ph-center">
        {type === 'video' && (
          <span className="ph-play" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </span>
        )}
        <span className="ph-label">{label}</span>
        {caption && <span className="ph-caption">{caption}</span>}
      </div>

      <span className="ph-mark">AURELIO</span>
    </figure>
  )
}
