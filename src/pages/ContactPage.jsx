/* ============================================================
   Contact — the atelier's correspondence page. Two location
   cards, a write-to-us form, and an embedded map of the
   Moradabad atelier.
   ============================================================ */
import { useState } from 'react'
import Seo from '../components/layout/Seo'
import PageHero from '../components/layout/PageHero'
import LinkButton from '../components/layout/LinkButton'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import { useEnquiry } from '../lib/enquiry'
import { getProduct } from '../data/collections'
import './pages.css'

const LOCATIONS = [
  {
    kind: 'Atelier & Foundry',
    name: 'The Moradabad Atelier',
    address: [
      'AF International',
      'Katghar Pachpera (near New Children Home Academy School)',
      'Moradabad 244001, Uttar Pradesh',
      'India',
    ],
    hours: 'Monday–Saturday · By appointment',
    tel: '+91 78179 76738',
    email: 'mohdsaudsaud595@gmail.com',
  },
  {
    kind: 'Commissions & Export',
    name: 'Enquiries Desk',
    address: [
      'Private commissions, trade accounts',
      'and worldwide export',
      'Handled from the Moradabad atelier',
    ],
    hours: 'Replies within two working days',
    tel: '+91 78179 76738',
    email: 'mohdsaudsaud595@gmail.com',
  },
]

const MAP_QUERY = 'Katghar Pachpera, Moradabad, Uttar Pradesh 244001, India'
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=14&output=embed`
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`

export default function ContactPage() {
  const { saved } = useEnquiry()
  // If the visitor arrived from the enquiry drawer, open with their saved
  // pieces already written into the message.
  const [form, setForm] = useState(() => {
    const pieces = saved.map(getProduct).filter(Boolean)
    const message = pieces.length
      ? `I would like to enquire about the following ${pieces.length === 1 ? 'piece' : 'pieces'}:\n`
        + pieces.map((p) => `• ${p.name} ${p.suffix} — ${p.material}`).join('\n') + '\n\n'
      : ''
    return { name: '', email: '', phone: '', message }
  })
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const upd = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (error) setError('')
  }

  const [sending, setSending] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) return setError('Please add your name.')
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return setError('Please add a valid email.')
    if (!form.message.trim()) return setError('Please add a short message.')
    setSending(true)
    try {
      const res = await fetch('https://formspree.io/f/xojzgalw', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          _subject: `Aurelio — new enquiry from ${form.name}`,
        }),
      })
      if (res.ok) { setSent(true) }
      else { setError('Something went wrong sending your message. Please email us directly.') }
    } catch {
      setError('Network error — please check your connection or email us directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <Seo
        title="Contact"
        description="Contact Aurelio by AF International — the Moradabad atelier, private commissions and worldwide export. By appointment."
        path="/contact"
      />
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        kicker="Contact"
        title="Get in touch."
        lead="Aurelio is made by AF International in Moradabad, India. Write, call, or arrange a visit — every piece begins with a conversation."
      />

      <section className="section">
        <div className="container">
          <Reveal as="div" className="contact-grid" stagger>
            {LOCATIONS.map((l) => (
              <article className="contact-card" key={l.name}>
                <span className="contact-kind">{l.kind}</span>
                <h2 className="contact-name">{l.name}</h2>
                <address className="contact-addr">
                  {l.address.map((line, i) => <span key={i}>{line}</span>)}
                </address>
                <dl className="contact-lines">
                  <div><dt>Email</dt><dd><a href={`mailto:${l.email}`}>{l.email}</a></dd></div>
                  <div><dt>Telephone</dt><dd><a href={`tel:${l.tel.replace(/\s/g, '')}`}>{l.tel}</a></dd></div>
                  <div><dt>Hours</dt><dd>{l.hours}</dd></div>
                </dl>
              </article>
            ))}
          </Reveal>

          {/* ---- write to us + map ---- */}
          <Reveal as="div" className="contact-write">
            <div className="contact-form-col">
              <span className="contact-kind">Write to us</span>
              <h2 className="contact-write-title">Start a conversation.</h2>

              {sent ? (
                <div className="contact-sent" role="status">
                  <span className="contact-sent-mark" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.5" /></svg>
                  </span>
                  <p className="contact-sent-line">Thank you, {form.name.split(' ')[0] || 'and welcome'}.</p>
                  <p className="contact-sent-sub">Your message is with the studio — we’ll reply within two working days.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={onSubmit} noValidate>
                  <div className="cf-row">
                    <div className="cf-field">
                      <label htmlFor="cf-name">Your name</label>
                      <input id="cf-name" className="cf-input" type="text" value={form.name} onChange={upd('name')} autoComplete="name" />
                    </div>
                    <div className="cf-field">
                      <label htmlFor="cf-email">Email</label>
                      <input id="cf-email" className="cf-input" type="email" value={form.email} onChange={upd('email')} autoComplete="email" />
                    </div>
                  </div>
                  <div className="cf-field">
                    <label htmlFor="cf-phone">Telephone <span className="cf-opt">(optional)</span></label>
                    <input id="cf-phone" className="cf-input" type="tel" value={form.phone} onChange={upd('phone')} autoComplete="tel" />
                  </div>
                  <div className="cf-field">
                    <label htmlFor="cf-message">Your message</label>
                    <textarea id="cf-message" className="cf-textarea" rows={4} value={form.message} onChange={upd('message')} placeholder="A few lines about the piece, the project, or the idea." />
                  </div>
                  {error && <p className="cf-error">{error}</p>}
                  <div className="cf-actions">
                    <Button type="submit" variant="solid" arrow disabled={sending}>{sending ? 'Sending…' : 'Send message'}</Button>
                    <a className="cf-or" href="mailto:mohdsaudsaud595@gmail.com">or email us directly</a>
                  </div>
                </form>
              )}
            </div>

            <div className="contact-map">
              <iframe
                className="contact-map-frame"
                title="Aurelio — AF International atelier, Moradabad"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a className="contact-map-link" href={MAP_LINK} target="_blank" rel="noreferrer">
                Open in Maps
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" /></svg>
              </a>
            </div>
          </Reveal>

          <Reveal as="div" className="contact-foot">
            <div className="contact-social">
              <span className="contact-social-label">Follow</span>
              <a href="https://instagram.com/afinternational.in" target="_blank" rel="noreferrer">Instagram — @afinternational.in</a>
            </div>
            <LinkButton to="/collections" variant="solid" arrow>See the collections</LinkButton>
          </Reveal>
        </div>
      </section>
    </>
  )
}
