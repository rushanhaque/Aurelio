/* ============================================================
   Reviews — "What they remember." A rating band, an editorial
   press pull-quote, and an auto-rotating client testimonial
   showcase (each paired with a generated engraved-monogram
   plate, cross-fading every couple of seconds).
   ============================================================ */
import { useRef, useState } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import SectionHeader from '../ui/SectionHeader'
import SplitText from '../ui/SplitText'
import Reveal from '../ui/Reveal'
import './Journal.css'

const DIAMOND = '◆'
const DURATION = 4.5 // seconds per review — a relaxed, readable cadence

const REVIEWS = [
  {
    quote: "We weren't looking for a statement piece, but the lanterns have ended up being exactly that. Almost everyone who visits asks about them.",
    name: 'Sarah & James Whitfield', monogram: 'SW', kind: 'Private Residence', piece: 'Soleil Pendants', location: 'London, UK', rating: 5,
  },
  {
    quote: "We've used Aurelio across several hotel projects now. The pieces always arrive beautifully made, and guests regularly ask where they're from.",
    name: 'Maison Reverie Group', monogram: 'MR', kind: 'Hospitality', piece: 'Halo Sconces', location: 'Paris & Lisbon', rating: 5,
  },
  {
    quote: "The whole process felt incredibly personal. The cutlery is elegant without being overdesigned, and it's become something we're genuinely proud to use every day.",
    name: 'Château Bergerac', monogram: 'CB', kind: 'Bespoke Commission', piece: 'Mirror Service', location: 'Bordeaux, France', rating: 5,
  },
  {
    quote: "The staircase was one of those areas we'd never quite got right. Aurelio's balustrade changed that completely. It ties the whole house together.",
    name: 'Helena Asquith', monogram: 'HA', kind: 'Country House', piece: 'Amaranth Balustrade', location: 'The Cotswolds', rating: 5,
  },
  {
    quote: "We knew the installation would be impressive, but we didn't expect the reaction it would get. People stop and look up the moment they walk into the atrium.",
    name: 'The Reverie Atrium', monogram: 'RA', kind: 'Architectural Installation', piece: 'Lumen Installation', location: 'Lisbon, Portugal', rating: 5,
  },
]

/* A generated "image": an engraved presentation plate carrying the
   client's monogram, the piece commissioned, and their rating. */
function ReviewPlate({ review, index }) {
  return (
    <div className="rev-plate" aria-hidden="true">
      <span className="rev-plate-tick rev-plate-tick--tl" />
      <span className="rev-plate-tick rev-plate-tick--tr" />
      <span className="rev-plate-tick rev-plate-tick--bl" />
      <span className="rev-plate-tick rev-plate-tick--br" />
      <span className="rev-plate-no">{String(index + 1).padStart(2, '0')}</span>
      <span className="rev-plate-kind">{review.kind}</span>
      <span className="rev-plate-mono">{review.monogram}</span>
      <span className="rev-plate-rule" />
      <span className="rev-plate-piece">{review.piece}</span>
      <span className="rev-plate-stars">
        {Array.from({ length: review.rating }).map((_, i) => (
          <span key={i} className="rev-plate-diamond">{DIAMOND}</span>
        ))}
      </span>
    </div>
  )
}

export default function Journal() {
  const ref = useRef(null)
  const timer = useRef(null)
  const [active, setActive] = useState(0)

  // Drive the progress bar; when it completes, advance to the next review.
  // (The crossfade itself is pure CSS, keyed off the `is-on` class.)
  useGSAP(
    () => {
      if (prefersReducedMotion) return
      gsap.set(gsap.utils.toArray('.rev-bar-fill', ref.current), { scaleX: 0 })
      const fill = ref.current.querySelector('.rev-bar.is-on .rev-bar-fill')
      if (fill) {
        timer.current = gsap.fromTo(
          fill,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: DURATION,
            ease: 'none',
            onComplete: () => setActive((a) => (a + 1) % REVIEWS.length),
          }
        )
      }
    },
    { dependencies: [active], scope: ref }
  )

  return (
    <section ref={ref} id="journal" className="section jrn">
      <div className="container">
        <SectionHeader kicker="Reviews" index="07" total="08" title="What they remember." titleClass="h2" />

        {/* SCORE BAND */}
        <Reveal as="div" className="jrn-score">
          <span className="jrn-score-rating" aria-label="Rated 4.9 out of 5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="jrn-diamond" aria-hidden="true">{DIAMOND}</span>
            ))}
          </span>
          <span className="jrn-score-num">4.9</span>
          <span className="jrn-score-divider" aria-hidden="true" />
          <span className="jrn-score-note">
            847 bespoke commissions&ensp;·&ensp;Trusted by collectors, designers, and hoteliers worldwide
          </span>
        </Reveal>

        {/* EDITORIAL PRESS PULL-QUOTE */}
        <figure className="jrn-feature">
          <SplitText as="blockquote" className="jrn-pull serif-italic" stagger={0.06}>
            Aurelio makes the kind of metalware you inherit, not the kind you replace.
          </SplitText>
          <Reveal as="figcaption" className="jrn-feature-cite caption" delay={0.15}>
            <span className="jrn-cite-rule" aria-hidden="true" />
            Architectural Digest
          </Reveal>
        </figure>

        {/* AUTO-ROTATING CLIENT TESTIMONIAL SHOWCASE */}
        <div className="rev">
          <div className="rev-plate-col">
            <div className="rev-plates">
              {REVIEWS.map((rev, i) => (
                <div className={`rev-plate-wrap${i === active ? ' is-on' : ''}`} key={i} aria-hidden={i !== active}>
                  <ReviewPlate review={rev} index={i} />
                </div>
              ))}
            </div>
          </div>

          <div className="rev-body">
            <div className="rev-quotes">
              {REVIEWS.map((rev, i) => (
                <figure className={`rev-quote-wrap${i === active ? ' is-on' : ''}`} key={i} aria-hidden={i !== active}>
                  <span className="rev-mark" aria-hidden="true">&ldquo;</span>
                  <blockquote className="rev-quote">{rev.quote}</blockquote>
                  <figcaption className="rev-cite">
                    <span className="rev-stars" aria-label={`${rev.rating} out of 5`}>
                      {Array.from({ length: rev.rating }).map((_, j) => (
                        <span key={j} className="jrn-diamond" aria-hidden="true">{DIAMOND}</span>
                      ))}
                    </span>
                    <span className="rev-name">{rev.name}</span>
                    <span className="rev-meta">{rev.kind} · {rev.location}</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="rev-bars">
              {REVIEWS.map((rev, i) => (
                <button
                  key={i}
                  type="button"
                  className={`rev-bar${i === active ? ' is-on' : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={`Show review ${i + 1} of ${REVIEWS.length} — ${rev.name}`}
                  aria-current={i === active}
                >
                  <span className="rev-bar-fill" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
