/* ============================================================
   Atelier — the cinematic "how it's made" showpiece.
   Deep-emerald, on-dark. On desktop the section pins and a
   horizontal track of five craft stages glides left under the
   scroll, a brass numeral leading each. Below 900px (or with
   reduced motion) the same track stacks into a clean vertical
   sequence, each stage revealed in turn. Restraint over flash.
   ============================================================ */
import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger, EASE, prefersReducedMotion } from '../../lib/gsap'
import SectionHeader from '../ui/SectionHeader'
import Placeholder from '../ui/Placeholder'
import BlurText from '../ui/BlurText'
import './Atelier.css'

// Stage media assets
import imgStage1 from '../../../assets/HomePage/WhereWeExcel/designanddrafting.png'
import imgStage2 from '../../../assets/HomePage/WhereWeExcel/castingandforging.png'
import imgStage3 from '../../../assets/HomePage/WhereWeExcel/handraising.png'
import imgStage4 from '../../../assets/HomePage/WhereWeExcel/patinaandfinishing.png'
import imgStage5 from '../../../assets/HomePage/WhereWeExcel/assemblyinspection.png'

const STAGES = [
  {
    n: '01',
    title: 'Design & Drafting',
    body: 'Every commission begins on paper — proportion, weight and line resolved before a single sheet of metal is cut.',
    image: imgStage1,
  },
  {
    n: '02',
    title: 'Casting & Forging',
    body: 'Molten brass and bronze are poured and forged, the raw body of each piece taking shape in fire.',
    image: imgStage2,
  },
  {
    n: '03',
    title: 'Hand-Raising',
    body: 'Our smiths raise, hammer and spin the metal by hand — thousands of strikes giving the form its tension and grace.',
    image: imgStage3,
  },
  {
    n: '04',
    title: 'Patina & Finishing',
    body: 'Surfaces are chased, brushed and patinated; colour is coaxed from the metal itself, never painted on.',
    image: imgStage4,
  },
  {
    n: '05',
    title: 'Assembly & Inspection',
    body: 'Each piece is assembled, wired and inspected against one standard — it must outlive us.',
    image: imgStage5,
  },
]

export default function Atelier() {
  const ref = useRef(null)
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)

  useGSAP(
    () => {
      const track = trackRef.current
      const pin = pinRef.current
      if (!track || !pin) return

      // The pinned horizontal mechanic only runs on roomy viewports
      // with motion allowed; otherwise the CSS leaves the track stacked.
      if (prefersReducedMotion || window.innerWidth <= 900) return

      // Exact horizontal distance: full track width minus one viewport.
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
      })

      ScrollTrigger.create({
        trigger: pin,
        start: 'top top',
        // pin spacer height === horizontal scroll distance => 1:1 weighty feel
        end: () => '+=' + distance(),
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: tween,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`
          }
        },
      })

      // (Per-panel text reveal is handled by <BlurText> on each stage line.)
    },
    { scope: ref }
  )

  return (
    <section ref={ref} id="atelier" className="atl">
      <div ref={pinRef} className="atl-pin">
        <div className="container atl-headwrap">
          <SectionHeader
            kicker="The Atelier"
            index="04"
            total="08"
            title="Where we excel."
            titleClass="h2"
          />
        </div>

        <div className="atl-viewport">
          <ol ref={trackRef} className="atl-track" aria-label="Our craft, in five stages">
            {STAGES.map((s) => (
              <li className="atl-panel" key={s.n}>
                <div className="atl-panel-inner">
                  <div className="atl-panel-copy">
                    <div className="atl-num-block" aria-hidden="true">
                      <BlurText className="atl-num" text={s.n} animateBy="words" direction="top" delay={0} stepDuration={0.34} />
                      <span className="atl-num-rule" />
                    </div>
                    <BlurText className="h2 atl-stage-title" text={s.title} animateBy="words" direction="top" delay={80} stepDuration={0.32} />
                    <BlurText className="atl-stage-body" text={s.body} animateBy="words" direction="top" delay={16} stepDuration={0.3} />
                    <span className="atl-stage-mark caption">
                      Stage {s.n}
                      <span className="atl-stage-mark-seq" aria-hidden="true">
                        <span className="atl-stage-mark-slash">/</span> 05
                      </span>
                    </span>
                  </div>
                  <div className="atl-panel-media">
                    <Placeholder
                      ratio="3/4"
                      tone="dark"
                      type="image"
                      index={s.n}
                      label={s.title}
                      src={s.image}
                      alt={s.title}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="atl-progress" aria-hidden="true">
          <span ref={progressRef} className="atl-progress-fill" />
        </div>
      </div>
    </section>
  )
}
