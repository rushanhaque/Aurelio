/* ============================================================
   <FlowingMenu> — React Bits flowing marquee menu (gsap).
   On hover, a marquee overlay rises from the nearest edge,
   scrolling the item's name + image chips on a loop.

   MOBILE: phones have no hover, so the marquee never fires and
   users would see a flat list with no imagery. Below the tablet
   breakpoint we swap in a stacked "stage" layout — each station
   becomes a tappable row that shows its name + process image by
   default, scroll-revealed with a staggered fade/slide + a gentle
   image zoom-in. Same content, same delight, no jank.
   ============================================================ */
import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

import './FlowingMenu.css'

/* Lightweight matchMedia hook — keeps the heavy GSAP marquee from
   ever mounting on phones (where it can't be triggered anyway). */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    onChange(mql)
    if (mql.addEventListener) mql.addEventListener('change', onChange)
    else mql.addListener(onChange)
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', onChange)
      else mql.removeListener(onChange)
    }
  }, [query])

  return matches
}

function FlowingMenu({
  items = [],
  speed = 15,
  textColor = '#fff',
  bgColor = '#120F17',
  marqueeBgColor = '#fff',
  marqueeTextColor = '#120F17',
  borderColor = '#fff',
}) {
  // Below the tablet breakpoint, render the touch-friendly stage list.
  const isCompact = useMediaQuery('(max-width: 900px)')

  if (isCompact) {
    return (
      <MobileStages
        items={items}
        textColor={textColor}
        bgColor={bgColor}
        accentColor={marqueeBgColor}
        borderColor={borderColor}
      />
    )
  }

  return (
    <div className="menu-wrap" style={{ backgroundColor: bgColor }}>
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
          />
        ))}
      </nav>
    </div>
  )
}

/* ------------------------------------------------------------------
   Mobile / touch layout: a clean vertical list of stations. Each row
   shows the process image + name by default and reveals on scroll
   with a staggered fade-up; the image gently zooms in as it lands.
   A sliding hairline underline animates on tap/active for feedback.
------------------------------------------------------------------ */
function MobileStages({ items, textColor, bgColor, accentColor, borderColor }) {
  const listRef = useRef(null)

  useEffect(() => {
    const root = listRef.current
    if (!root) return

    const rows = Array.from(root.querySelectorAll('.stage-row'))
    if (!rows.length) return

    // Honour the global reduced-motion preference: show everything.
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced || !('IntersectionObserver' in window)) {
      rows.forEach((row) => row.classList.add('is-in'))
      return
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.25, rootMargin: '0px 0px -8% 0px' }
    )

    rows.forEach((row) => io.observe(row))
    return () => io.disconnect()
  }, [items])

  return (
    <div
      className="stage-list"
      ref={listRef}
      style={{ backgroundColor: bgColor, '--stage-accent': accentColor, '--stage-line': borderColor }}
    >
      {items.map((item, idx) => (
        <a
          key={idx}
          className="stage-row"
          href={item.link}
          style={{ '--stage-i': idx, color: textColor }}
        >
          <span className="stage-num" aria-hidden="true">
            {String(idx + 1).padStart(2, '0')}
          </span>
          <span className="stage-media">
            <span
              className="stage-img"
              style={{ backgroundImage: `url(${item.image})` }}
            />
          </span>
          <span className="stage-label">
            <span className="stage-text">{item.text}</span>
            <span className="stage-underline" aria-hidden="true" />
          </span>
          <span className="stage-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path
                d="M5 12h13M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      ))}
    </div>
  )
}

function MenuItem({ link, text, image, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor }) {
  const itemRef = useRef(null)
  const marqueeRef = useRef(null)
  const marqueeInnerRef = useRef(null)
  const animationRef = useRef(null)
  const [repetitions, setRepetitions] = useState(4)

  const animationDefaults = { duration: 0.6, ease: 'expo' }

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0)
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height)
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom'
  }

  const distMetric = (x, y, x2, y2) => {
    const xDiff = x - x2
    const yDiff = y - y2
    return xDiff * xDiff + yDiff * yDiff
  }

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return

      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee__part')
      if (!marqueeContent) return

      const contentWidth = marqueeContent.offsetWidth
      const viewportWidth = window.innerWidth

      const needed = Math.ceil(viewportWidth / contentWidth) + 2
      setRepetitions(Math.max(4, needed))
    }

    calculateRepetitions()
    window.addEventListener('resize', calculateRepetitions)
    return () => window.removeEventListener('resize', calculateRepetitions)
  }, [text, image])

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return

      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee__part')
      if (!marqueeContent) return

      const contentWidth = marqueeContent.offsetWidth
      if (contentWidth === 0) return

      if (animationRef.current) {
        animationRef.current.kill()
      }

      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: speed,
        ease: 'none',
        repeat: -1,
      })
    }

    const timer = setTimeout(setupMarquee, 50)

    return () => {
      clearTimeout(timer)
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [text, image, repetitions, speed])

  const handleMouseEnter = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    const x = ev.clientX - rect.left
    const y = ev.clientY - rect.top
    const edge = findClosestEdge(x, y, rect.width, rect.height)

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0)
  }

  const handleMouseLeave = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    const x = ev.clientX - rect.left
    const y = ev.clientY - rect.top
    const edge = findClosestEdge(x, y, rect.width, rect.height)

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
  }

  return (
    <div className="menu__item" ref={itemRef} style={{ borderColor }}>
      <a
        className="menu__item-link"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ color: textColor }}
      >
        {text}
      </a>
      <div className="marquee" ref={marqueeRef} style={{ backgroundColor: marqueeBgColor }}>
        <div className="marquee__inner-wrap">
          <div className="marquee__inner" ref={marqueeInnerRef} aria-hidden="true">
            {[...Array(repetitions)].map((_, idx) => (
              <div className="marquee__part" key={idx} style={{ color: marqueeTextColor }}>
                <span>{text}</span>
                <div className="marquee__img" style={{ backgroundImage: `url(${image})` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlowingMenu
