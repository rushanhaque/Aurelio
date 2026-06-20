import { useRef } from 'react'
import Seo from '../components/layout/Seo'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import LinkButton from '../components/layout/LinkButton'
import { Link } from '../lib/router'
import Placeholder from '../components/ui/Placeholder'
import SectionHeader from '../components/ui/SectionHeader'
import SaveButton from '../components/ui/SaveButton'
import NotFoundPage from './NotFoundPage'
import { getProduct, getCollection, productsByCollection } from '../data/collections'
import './pages.css'

export default function ProductPage({ params }) {
  const mediaRef = useRef(null)
  const product = getProduct(params.slug)
  if (!product) return <NotFoundPage />

  const collection = getCollection(product.collection)
  if (!collection) return <NotFoundPage />
  const related = productsByCollection(product.collection)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3)

  // Hover zoom — the image scales up and pans toward the cursor, so moving the
  // pointer over the photo "previews" any detail like a loupe.
  const onZoom = (e) => {
    const el = mediaRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--zx', `${((e.clientX - r.left) / r.width) * 100}%`)
    el.style.setProperty('--zy', `${((e.clientY - r.top) / r.height) * 100}%`)
  }

  return (
    <>
      <Seo title={`${product.name} ${product.suffix}`} description={product.story} path={`/piece/${product.slug}`} image={product.image} product={product} />

      <section className="section pd">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Collections', to: '/collections' },
              { label: collection.name, to: `/collections/${collection.slug}` },
              { label: `${product.name} ${product.suffix}` },
            ]}
          />

          <div className="pd-layout">
            <div className="pd-media" ref={mediaRef} onMouseMove={onZoom}>
              <Placeholder
                fill
                priority
                type="image"
                index={product.index}
                label={`${product.name} — ${product.suffix}`}
                tone="auto"
                src={product.image || undefined}
                fit={['urns', 'furniture', 'lighting', 'decor', 'kitchenware', 'accessories'].includes(product.collection) ? 'contain' : 'cover'}
                style={{ background: product.bgColor || '#FFFFFF' }}
              />
            </div>

            <div className="pd-info">
              <Link to={`/collections/${collection.slug}`} className="pd-eyebrow eyebrow">{collection.name}</Link>
              <h1 className="pd-name">{product.name} <em>{product.suffix}</em></h1>
              <p className="pd-story">{product.story}</p>

              <dl className="pd-spec">
                <dt>Material</dt><dd>{product.material}</dd>
                <dt>Finish</dt><dd>{product.finish}</dd>
              </dl>

              <ul className="pd-details">
                {product.details.map((d, i) => <li key={i}>{d}</li>)}
              </ul>

              <div className="pd-actions">
                <LinkButton to="/contact" variant="solid" arrow>Enquire about this piece</LinkButton>
                <SaveButton slug={product.slug} />
                <LinkButton to={`/collections/${collection.slug}`} variant="ghost">Back to {collection.name}</LinkButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section pd-related">
          <div className="container">
            <SectionHeader kicker={`More from ${collection.name}`} title="You may also like." titleClass="h2" />
            <div className="prod-grid">
              {related.map((p) => (
                <Link key={p.slug} to={`/piece/${p.slug}`} className="prod-card" aria-label={`${p.name} ${p.suffix}`}>
                  <div className="prod-card-fig">
                    <Placeholder
                      ratio={p.ratio}
                      type="image"
                      index={p.index}
                      label={`${p.name} — ${p.suffix}`}
                      tone="auto"
                      src={p.image || undefined}
                      fit={['urns', 'furniture', 'lighting', 'decor', 'kitchenware', 'accessories'].includes(p.collection) ? 'contain' : 'cover'}
                      style={{ background: p.bgColor || '#FFFFFF' }}
                    />
                  </div>
                  <div className="prod-card-body">
                    <div className="prod-card-top">
                      <span className="prod-card-name">“{p.name}” {p.suffix}</span>
                      <SaveButton slug={p.slug} variant="checkbox" />
                    </div>
                    <div className="prod-card-meta">{p.material}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
