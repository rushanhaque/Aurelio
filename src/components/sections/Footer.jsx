/* ============================================================
   Footer — compact, clean, minimal. Four link columns + a small
   enquiry form, a large AURELIO reveal, and a fine legal bar.
   Internal links route via the client-side router.
   ============================================================ */
import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from '../../lib/router'
import Reveal from '../ui/Reveal'
import './Footer.css'

const COLUMNS = [
  {
    heading: 'Collections',
    links: [
      { label: 'Urns', to: '/collections/urns' },
      { label: 'Lighting', to: '/collections/lighting' },
      { label: 'Furniture', to: '/collections/furniture' },
      { label: 'Kitchenware', to: '/collections/kitchenware' },
      { label: 'Decor', to: '/collections/decor' },
      { label: 'Accessories', to: '/collections/accessories' },
      { label: 'Bespoke', to: '/contact' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'WhatsApp', href: 'https://wa.me/917817976738' },
      { label: 'Email', href: 'mailto:info@aurelio.in' },
      { label: 'Instagram', href: 'https://instagram.com/afinternational.in' },
    ],
  },
]

const ATELIER_LINKS = [
  { label: 'Materials', to: '/materials' },
  { label: 'Care Guides', to: '/care' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Request a Catalogue', action: 'catalogue' },
  { label: 'Terms and Conditions', to: '/terms' },
  { label: 'FAQ', to: '/faq' },
]

const CATALOGUE_TYPES = [
  'Urns', 'Lighting', 'Furniture', 'Kitchenware',
  'Decor', 'Accessories', 'Bespoke / Custom', 'Full Collection',
]

function CatalogueModal({ onClose }) {
  const [form, setForm] = useState({ email: '', type: '' })
  const [sent, setSent] = useState(false)
  const overlayRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.email.trim() || !form.type) return
    const subject = encodeURIComponent(`Catalogue Request — ${form.type}`)
    const body = encodeURIComponent(`Hello,\n\nI would like to request the ${form.type} catalogue.\n\nEmail: ${form.email}\n\nThank you.`)
    window.location.href = `mailto:saud@aurelio.in?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div className="cat-modal-overlay" ref={overlayRef} onClick={(e) => { if (e.target === overlayRef.current) onClose() }} role="dialog" aria-modal="true" aria-label="Request a catalogue">
      <div className="cat-modal">
        <button className="cat-modal-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 18 18" width="14" height="14" fill="none"><path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.5"/></svg>
        </button>
        {sent ? (
          <div className="cat-modal-thanks">
            <span className="cat-modal-kicker">Thank you</span>
            <p className="cat-modal-lead">Your catalogue request has been sent. We will dispatch it within two working days.</p>
            <button className="ft-send" onClick={onClose}>Close <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg></button>
          </div>
        ) : (
          <>
            <span className="cat-modal-kicker">Request a Catalogue</span>
            <p className="cat-modal-lead">Choose a collection and we will send you its full lookbook by email.</p>
            <form className="cat-modal-form" onSubmit={onSubmit}>
              <div className="cat-modal-field">
                <label className="cat-modal-label" htmlFor="cat-email">Your email</label>
                <input id="cat-email" className="ft-input" type="email" placeholder="you@example.com" value={form.email} onChange={upd('email')} required />
              </div>
              <div className="cat-modal-field">
                <label className="cat-modal-label" htmlFor="cat-type">Catalogue</label>
                <select id="cat-type" className="ft-input ft-select" value={form.type} onChange={upd('type')} required>
                  <option value="">Select a collection…</option>
                  {CATALOGUE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <button type="submit" className="ft-send cat-modal-submit">
                <span>Send request</span>
                <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

const VISIT = [
  { city: 'Moradabad Atelier', address: 'Katghar Pachpera, Moradabad 244001, Uttar Pradesh, India' },
  { city: 'Enquiries', address: 'saud@aurelio.in · +91 78179 76738' },
]

function FooterLink({ link, onCatalogue }) {
  if (link.action === 'catalogue') return <button className="ft-link ft-link-btn" onClick={onCatalogue}>{link.label}</button>
  if (link.to) return <Link className="ft-link" to={link.to}>{link.label}</Link>
  return <a className="ft-link" href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
}

/* A live read-out of the Moradabad bench — local IST time and whether the
   atelier is currently open (Mon–Sat, 10:00–18:00 IST). Works from any
   visitor timezone via a fixed +5:30 offset off UTC. */
function AtelierClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(id)
  }, [])
  const ist = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 5.5 * 3600000)
  const h = ist.getHours(), m = ist.getMinutes(), day = ist.getDay()
  const open = day >= 1 && day <= 6 && h >= 10 && h < 18
  const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
  return (
    <span className="ft-clock" title="Local time at the Moradabad atelier">
      <span className={`ft-clock-dot${open ? ' is-open' : ''}`} aria-hidden="true" />
      The atelier is {open ? 'open' : 'closed'} now · Moradabad {time} IST
    </span>
  )
}

export default function Footer() {
  const ref = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [catOpen, setCatOpen] = useState(false)
  const openCat = useCallback(() => setCatOpen(true), [])
  const closeCat = useCallback(() => setCatOpen(false), [])

  const upd = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (sent) setSent(false)
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.email.trim()) return
    try {
      await fetch('https://formspree.io/f/xojzgalw', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: 'Aurelio — footer enquiry',
        }),
      })
    } catch { /* swallow — confirmation shown regardless */ }
    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

  // AURELIO slide-up: the wordmark waits below its overflow-hidden mask and
  // rises when the footer is scrolled into view (.is-revealed runs the keyframe).
  // We require the footer to be OUT of view first, then come back into view —
  // otherwise it false-fires during initial load, when lazy sections/images
  // haven't grown yet and the footer is momentarily on screen.
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const word = root.querySelector('.ft-mark-word')
    const mark = root.querySelector('.ft-mark')
    if (!word || !mark) return
    let armed = false   // true once the footer has genuinely been below the fold
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) { armed = true; return }
        if (armed) {
          word.classList.add('is-revealed')
          io.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    io.observe(mark)
    return () => io.disconnect()
  }, [])

  return (
    <>
    {catOpen && <CatalogueModal onClose={closeCat} />}
    <footer ref={ref} id="site-footer" className="ft">
      <div className="sec-grain" aria-hidden="true" />
      <div className="container ft-container">
        {/* live atelier status — a quiet line that opens the footer */}
        <div className="ft-status"><AtelierClock /></div>

        <Reveal as="div" className="ft-main">
          <nav className="ft-cols" aria-label="Footer">
            {COLUMNS.map((col) => (
              <div className={`ft-col ft-col--${col.heading.toLowerCase()}`} key={col.heading}>
                <h2 className="ft-col-head">{col.heading}</h2>
                <ul className="ft-list">
                  {col.links.map((l) => (
                    <li key={l.label}><FooterLink link={l} onCatalogue={openCat} /></li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="ft-col">
              <h2 className="ft-col-head">Contact</h2>
              <ul className="ft-list ft-list--visit">
                {VISIT.map((v) => (
                  <li key={v.city}>
                    <span className="ft-visit-city">{v.city}</span>
                    <span className="ft-visit-addr">{v.address}</span>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* small enquiry form */}
          <form className="ft-form" onSubmit={onSubmit}>
            <h2 className="ft-col-head">Make an enquiry</h2>
            <input className="ft-input" type="text" placeholder="Name" value={form.name} onChange={upd('name')} aria-label="Your name" />
            <input className="ft-input" type="email" placeholder="Email" value={form.email} onChange={upd('email')} aria-label="Your email" required />
            <input className="ft-input" type="text" placeholder="Message" value={form.message} onChange={upd('message')} aria-label="Your message" />
            <button type="submit" className="ft-send">
              <span>{sent ? 'Thank you — we will be in touch' : 'Send enquiry'}</span>
              <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </form>
        </Reveal>

        {/* Big AURELIO wordmark reveal */}
        <div className="ft-mark" aria-hidden="true">
          <div className="ft-mark-wrap">
            <span className="ft-mark-word">AURELIO</span>
          </div>
        </div>

        {/* horizontal atelier nav — premium, evenly spaced */}
        <nav className="ft-atelier" aria-label="Atelier">
          {ATELIER_LINKS.map((l, i) => (
            <span className="ft-atelier-item" key={l.label}>
              {l.action === 'catalogue'
                ? <button className="ft-atelier-link ft-atelier-btn" onClick={openCat}>{l.label}</button>
                : <Link className="ft-atelier-link" to={l.to}>{l.label}</Link>}
              {i < ATELIER_LINKS.length - 1 && <span className="ft-atelier-sep" aria-hidden="true" />}
            </span>
          ))}
        </nav>

        <div className="ft-bottom">
          <a
            className="ft-dev"
            href="https://rushanhaque.online"
            target="_blank"
            rel="noreferrer"
          >
            Contact developer
          </a>
        </div>
      </div>
    </footer>
    </>
  )
}
