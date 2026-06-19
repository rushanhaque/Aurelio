import { useState } from 'react'
import Seo from '../components/layout/Seo'
import PageHero from '../components/layout/PageHero'
import LinkButton from '../components/layout/LinkButton'
import Reveal from '../components/ui/Reveal'
import { MATERIALS } from '../data/materials'
import './pages.css'

/* ------------------------------------------------------------------ */
/*  MaterialTile — shows the material image, crossfades to texture    */
/*  on hover. Both images are always rendered; hover simply swaps     */
/*  opacity so the transition is instant and silky.                   */
/* ------------------------------------------------------------------ */
function MaterialTile({ material }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="mat-tile"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="mat-tile-inner" style={{ aspectRatio: material.ratio.replace('/', ' / ') }}>
        {/* main material image */}
        <img
          className={`mat-tile-img mat-tile-img--main${hovered ? '' : ' is-visible'}`}
          src={material.image}
          alt={material.name}
          loading="lazy"
          decoding="async"
          onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
        />
        {/* texture overlay — revealed on hover */}
        <img
          className={`mat-tile-img mat-tile-img--texture${hovered ? ' is-visible' : ''}`}
          src={material.texture}
          alt={`${material.name} texture close-up`}
          loading="lazy"
          decoding="async"
          onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
        />
      </div>
    </div>
  )
}

export default function MaterialsPage() {
  return (
    <>
      <Seo
        title="Materials"
        description="The materials Aurelio works in — brass, copper, patinated steel, bronze, blown glass, timber, aluminium and porcelain — and why each is chosen."
        path="/materials"
      />
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Materials' }]}
        kicker="The Bench"
        title="Nine materials, one obsession."
        lead="We work a deliberately short list of materials — and know each one completely. Colour is coaxed from the metal itself, never painted on."
      />

      <section className="section">
        <div className="container">
          <Reveal as="div" className="mat-list" stagger>
            {MATERIALS.map((m) => (
              <div className="mat-row" key={m.slug}>
                <div className="mat-fig">
                  <MaterialTile material={m} />
                </div>
                <div className="mat-body">
                  <span className="mat-index">{m.index}</span>
                  <h2 className="mat-name">{m.name}</h2>
                  <div className="mat-trait">{m.trait}</div>
                  <p className="mat-blurb">{m.blurb}</p>
                  <p className="mat-note">{m.note}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="h2" style={{ marginBottom: '1.6rem' }}>
            Not sure which material is right?
          </h2>
          <LinkButton to="/contact" variant="solid" arrow>Get in touch</LinkButton>
        </div>
      </section>
    </>
  )
}
