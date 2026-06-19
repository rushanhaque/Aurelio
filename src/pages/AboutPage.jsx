/* ============================================================
   About — the real story. Aurelio is the atelier line of
   AF International, a wooden & metal furniture and décor maker
   founded in 2008 in Moradabad, India.
   ============================================================ */
import Seo from '../components/layout/Seo'
import PageHero from '../components/layout/PageHero'
import LinkButton from '../components/layout/LinkButton'
import Reveal from '../components/ui/Reveal'
import './pages.css'

const PILLARS = [
  {
    no: '01',
    name: 'Made by hand',
    text: 'Every piece is cast, forged, raised, turned and finished by hand on the bench in Moradabad. No two leave the workshop quite the same.',
  },
  {
    no: '02',
    name: 'Metal & wood',
    text: 'We work brass, copper and patinated steel alongside seasoned timber — the materials northern India has shaped for generations.',
  },
  {
    no: '03',
    name: 'Shipped worldwide',
    text: 'From a single object to a container of furniture, our work leaves the atelier for private homes and trade clients across the world.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        description="Aurelio is the atelier line of AF International — a wooden & metal furniture and décor maker founded in 2008 in Moradabad, India. Handcrafted, shipped worldwide."
        path="/about"
      />
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        kicker="About"
        title="Made by hand in Moradabad."
        lead="Aurelio is the atelier line of AF International — a family workshop founded in 2008, crafting furniture, lighting, urns and objets in metal and wood for homes and trade the world over."
      />

      <section className="section">
        <div className="container">
          <Reveal as="div" className="about-lead">
            <p className="about-lead-line serif-italic">A workshop, not a factory.</p>
            <p className="about-lead-text">
              AF International began in 2008 in Moradabad — India’s brass city — as a small family
              workshop. What started as a handful of makers has grown into an atelier shipping
              handcrafted metal and wooden pieces across the world, while holding to the rule it
              began with: every piece is made by hand, and made to be handed down.
            </p>
          </Reveal>

          <Reveal as="div" className="pillars" stagger>
            {PILLARS.map((p) => (
              <article className="pillar" key={p.no}>
                <span className="pillar-no">{p.no}</span>
                <h2 className="pillar-name">{p.name}</h2>
                <p className="pillar-text">{p.text}</p>
              </article>
            ))}
          </Reveal>

          <Reveal as="div" className="about-stats">
            <div className="about-stat"><span className="about-stat-fig">2008</span><span className="about-stat-label">Founded in Moradabad, India</span></div>
            <div className="about-stat"><span className="about-stat-fig">By hand</span><span className="about-stat-label">Forged, raised &amp; finished</span></div>
            <div className="about-stat"><span className="about-stat-fig">Worldwide</span><span className="about-stat-label">Export to homes &amp; trade</span></div>
          </Reveal>

          <div className="about-cta">
            <LinkButton to="/contact" variant="solid" arrow>Get in touch</LinkButton>
            <LinkButton to="/collections" variant="ghost">See the collections</LinkButton>
          </div>
        </div>
      </section>
    </>
  )
}
