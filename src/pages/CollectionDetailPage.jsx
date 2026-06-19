import { useEffect } from 'react'
import Seo from '../components/layout/Seo'
import PageHero from '../components/layout/PageHero'
import LinkButton from '../components/layout/LinkButton'
import { Link, navigate } from '../lib/router'
import Placeholder from '../components/ui/Placeholder'
import Reveal from '../components/ui/Reveal'
import SaveButton from '../components/ui/SaveButton'
import NotFoundPage from './NotFoundPage'
import { getCollection, productsByCollection } from '../data/collections'
import './pages.css'

export default function CollectionDetailPage({ params }) {
  // Bespoke is a conversation, not a catalogue — send it to the enquire page.
  useEffect(() => {
    if (params.slug === 'bespoke') navigate('/contact', { replace: true })
  }, [params.slug])
  if (params.slug === 'bespoke') return null

  const collection = getCollection(params.slug)
  if (!collection) return <NotFoundPage />

  const products = productsByCollection(collection.slug)
  const isContainCollection = ['urns', 'furniture', 'lighting', 'decor', 'kitchenware', 'accessories'].includes(collection.slug)

  return (
    <>
      <Seo
        title={collection.name}
        description={collection.summary}
        path={`/collections/${collection.slug}`}
      />
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Collections', to: '/collections' },
          { label: collection.name },
        ]}
        kicker={`Collection ${collection.index}`}
        title={collection.tagline}
        lead={collection.description}
      />

      <section className="section">
        <div className="container">
          <div className="collbar">
            <span className="collbar-count">{products.length} {products.length === 1 ? 'piece' : 'pieces'}</span>
            <LinkButton to="/contact" variant="ghost" arrow>Commission something bespoke</LinkButton>
          </div>

          {products.length === 0 ? (
            <div className="coll-empty">
              <p className="coll-empty-line">This collection is being re-photographed.</p>
              <p className="coll-empty-sub">New pieces are added as they leave the bench — in the meantime, the studio will gladly show you what is in the workshop.</p>
              <LinkButton to="/contact" variant="solid" arrow>Enquire with the studio</LinkButton>
            </div>
          ) : (
            <Reveal as="div" className="prod-grid" stagger>
              {products.map((p) => (
                <Link key={p.slug} to={`/piece/${p.slug}`} className="prod-card" aria-label={`${p.name} ${p.suffix}`}>
                  <div className="prod-card-fig">
                    <Placeholder
                      ratio={p.ratio || '4/5'}
                      type="image"
                      index={p.index}
                      label={`${p.name}${p.suffix ? ' — ' + p.suffix : ''}`}
                      tone="auto"
                      src={p.image || undefined}
                      alt={`${p.name} ${p.suffix}`}
                      fit={isContainCollection ? 'contain' : 'cover'}
                      style={isContainCollection && p.bgColor ? { background: p.bgColor } : undefined}
                    />
                  </div>
                  <div className="prod-card-body">
                    <div className="prod-card-top">
                      <span className="prod-card-name">"{p.name}" {p.suffix}</span>
                      <SaveButton slug={p.slug} variant="checkbox" />
                    </div>
                    <div className="prod-card-meta">{p.material}</div>
                  </div>
                </Link>
              ))}
            </Reveal>
          )}
        </div>
      </section>
    </>
  )
}
