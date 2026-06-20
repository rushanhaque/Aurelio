/* ============================================================
   Contact / Commission CTA — the emotional close above the foot.
   Deep emerald ground, a towering serif invitation, an elegant
   hairline-underline email capture with a circular submit, two
   quiet CTAs, and a refined studio-details rail. Restrained,
   architectural, expensive. Sits directly above the footer.
   ============================================================ */
import { useState } from 'react'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { scrollToSection } from '../../lib/useSmoothScroll'
import './Contact.css'

const STUDIO = [
  { label: 'Atelier', value: 'Moradabad, India' },
  { label: 'Correspondence', value: 'info@aurelio.in', href: 'mailto:info@aurelio.in' },
  { label: 'WhatsApp', value: '+91 78179 76738', href: 'https://wa.me/917817976738' },
]

export default function Contact() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    // No backend — a quiet, immediate acknowledgement.
    setSent(true)
    setEmail('')
  }

  return (
    <section id="contact" className="section on-dark cta">
      <div className="cta-bg" aria-hidden="true" />
      <div className="sec-grain" aria-hidden="true" />
      <div className="container cta-inner">
        <div className="cta-head">
          <SectionHeader
            kicker="Commissions"
            index="08"
            total="08"
            title="Begin a commission."
            titleClass="display"
            lead="Every Aurelio piece begins as a conversation. Tell us what you have in mind — a single object, or an entire interior."
          />
        </div>

        <div className="cta-action">
          <Reveal as="div" className="cta-capture">
            <form className="cta-form" onSubmit={onSubmit} noValidate>
              <div className="cta-field">
                <label className="cta-field-label caption" htmlFor="cta-email">
                  Your email
                </label>
                <div className="cta-field-row">
                  <input
                    id="cta-email"
                    className="cta-input"
                    type="email"
                    name="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (sent) setSent(false)
                    }}
                    aria-label="Your email address"
                  />
                  <button
                    type="submit"
                    className="cta-submit"
                    aria-label="Submit your email to begin a commission"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </button>
                </div>
                <span className="cta-underline" aria-hidden="true" />
              </div>

              <p
                className={`cta-confirm caption${sent ? ' is-shown' : ''}`}
                role="status"
                aria-live="polite"
              >
                {sent ? 'Thank you — we will be in touch.' : ''}
              </p>
            </form>
          </Reveal>

          <Reveal as="div" className="cta-buttons" stagger>
            <Button variant="solid" onClick={() => scrollToSection('#contact')}>
              Book an atelier visit
            </Button>
            <Button variant="ghost" arrow onClick={() => scrollToSection('#collections')}>
              Request the catalogue
            </Button>
          </Reveal>
        </div>

        <Reveal as="div" className="cta-studio" stagger>
          {STUDIO.map((item) => (
            <div className="cta-studio-item" key={item.label}>
              <span className="cta-studio-label caption">{item.label}</span>
              {item.href ? (
                <a className="cta-studio-value" href={item.href}>
                  {item.value}
                </a>
              ) : (
                <span className="cta-studio-value">{item.value}</span>
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
