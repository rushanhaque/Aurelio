/* ============================================================
   Navbar — the maison bar. A letterhead micro-line (est. line +
   appointment note) sits above a symmetric three-part bar: links
   left, the AURELIO mark dead-centre, links + a hairline ENQUIRE
   button right. Opaque white; turns transparent with white type
   over the Heritage film (nav--invert). Hides on scroll-down,
   returns on scroll-up; the letterhead retires once scrolled.
   Mobile: burger left, mark centred, full-screen emerald menu.
   ============================================================ */
import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '../../lib/gsap'
import { Link, useLocation } from '../../lib/router'
import { useEnquiry } from '../../lib/enquiry'
import './Navbar.css'

const LEFT = [
  { label: 'Collections', to: '/collections' },
  { label: 'Materials',   to: '/materials' },
]

const RIGHT = [
  { label: 'About',   to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const MENU = [
  { label: 'Home', to: '/' },
  ...LEFT,
  ...RIGHT,
]

function NavLink({ link, isActive, onClick }) {
  return (
    <Link
      to={link.to}
      className={`nav-link${isActive(link.to) ? ' nav-link--active' : ''}`}
      onClick={onClick}
    >
      {link.label}
    </Link>
  )
}

export default function Navbar() {
  const ref     = useRef(null)
  const menuRef = useRef(null)
  const [open, setOpen] = useState(false)
  const path = useLocation()
  const { saved, setOpen: setEnquiryOpen } = useEnquiry()

  const isActive = (to) =>
    to === '/' ? path === '/' : path === to || path.startsWith(to + '/')

  // Hide on scroll-down, return on scroll-up; retire the letterhead line
  // once the reader has left the top of the page.
  useGSAP(
    () => {
      const nav = ref.current
      ScrollTrigger.create({
        start: 'top -40',
        end: 99999,
        onUpdate: (self) => {
          nav.classList.toggle('nav--scrolled', self.scroll() > 60)
          if (self.direction === 1 && self.scroll() > 240) nav.classList.add('nav--hidden')
          else nav.classList.remove('nav--hidden')
        },
      })
    },
    { scope: ref }
  )

  // On route change: close the menu and reveal the bar
  useEffect(() => {
    setOpen(false)
    const nav = ref.current
    if (!nav) return
    nav.classList.remove('nav--hidden')
  }, [path])

  // Escape closes the full-screen menu while it is open.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Animate the full-screen menu
  useGSAP(
    () => {
      const items = menuRef.current.querySelectorAll('.navm-link')
      if (open) {
        gsap.set(menuRef.current, { display: 'flex' })
        gsap.fromTo(menuRef.current, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.0, ease: 'power4.inOut' })
        gsap.fromTo(items, { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.07, ease: 'power4.out', delay: 0.3 })
      } else {
        gsap.to(menuRef.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.7, ease: 'power4.inOut', onComplete: () => gsap.set(menuRef.current, { display: 'none' }) })
      }
    },
    { dependencies: [open], scope: menuRef }
  )

  const close = () => setOpen(false)

  return (
    <>
      <header ref={ref} className={`nav${path === '/' ? ' nav--home' : ''}`}>
        <div className="nav-inner container">
          {/* left cell: burger (mobile) + first link group (desktop) */}
          <div className="nav-cell nav-cell--left">
            <button
              className={`nav-burger ${open ? 'is-open' : ''}`}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span /><span />
            </button>
            <nav className="nav-links" aria-label="Primary">
              {LEFT.map((l) => <NavLink key={l.to} link={l} isActive={isActive} onClick={close} />)}
            </nav>
          </div>

          {/* centre cell: the mark */}
          <Link to="/" className="nav-logo" onClick={close} aria-label="Aurelio by AF International, home">
            <span className="nav-logo-name">AURELIO</span>
            <span className="nav-logo-rule" aria-hidden="true" />
            <span className="nav-logo-sub" aria-hidden="true">
              {'BY AF INTERNATIONAL'.split('').map((c, i) => (
                <span className="nav-logo-sub-ch" key={i}>{c === ' ' ? ' ' : c}</span>
              ))}
            </span>
          </Link>

          {/* right cell: second link group + enquiry-list trigger */}
          <div className="nav-cell nav-cell--right">
            <nav className="nav-links" aria-label="Secondary">
              {RIGHT.map((l) => <NavLink key={l.to} link={l} isActive={isActive} onClick={close} />)}
            </nav>
            <button
              className="nav-cart"
              onClick={() => setEnquiryOpen(true)}
              aria-label={`Open your cart${saved.length ? `, ${saved.length} saved` : ''}`}
            >
              <span className="nav-cart-label">Cart</span>
              {saved.length > 0 && <span className="nav-cart-count">{saved.length}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* full-screen menu — deep emerald, white serif */}
      <div ref={menuRef} className="navm" role="dialog" aria-modal="true">
        <div className="navm-inner container">
          <div className="navm-brand" aria-hidden="true">
            <span className="navm-brand-name">AURELIO</span>
            <span className="navm-brand-sub">By AF International — Est. MMVIII</span>
          </div>
          <nav className="navm-links">
            {MENU.map((l, i) => (
              <Link key={l.to} to={l.to} className="navm-link" onClick={close}>
                <span className="navm-index">{String(i + 1).padStart(2, '0')}</span>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="navm-foot">
            <span className="navm-foot-item">Atelier — Moradabad, India</span>
            <span className="navm-foot-dot" aria-hidden="true">◆</span>
            <a className="navm-foot-item navm-foot-link" href="mailto:mohdsaudsaud595@gmail.com">mohdsaudsaud595@gmail.com</a>
            <span className="navm-foot-dot" aria-hidden="true">◆</span>
            <a className="navm-foot-item navm-foot-link" href="https://wa.me/917817976738" target="_blank" rel="noreferrer">+91 78179 76738</a>
          </div>
        </div>
      </div>
    </>
  )
}
