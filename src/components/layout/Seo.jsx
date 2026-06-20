/* ============================================================
   <Seo> — per-page document head management without a library.
   Sets <title>, meta description, canonical, OpenGraph/Twitter
   tags, an optional share image, and optional Product structured
   data (JSON-LD) on mount. A React-only stand-in for react-helmet.
   ============================================================ */
import { useEffect } from 'react'

const SITE = 'Aurelio — Metal & Wood Atelier by AF International'
const ORIGIN = 'https://aurelio.in' // ← set to the production domain

function setMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/* Inject (or clear) a tagged JSON-LD <script> so each route carries its own. */
function setJsonLd(id, data) {
  let el = document.head.querySelector(`script[data-seo="${id}"]`)
  if (!data) { if (el) el.remove(); return }
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.setAttribute('data-seo', id)
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export default function Seo({ title, description, path = '', image, product }) {
  const fullTitle = title ? `${title} — Aurelio` : SITE
  const imageUrl = image ? (/^https?:/.test(image) ? image : ORIGIN + image) : null

  useEffect(() => {
    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', product ? 'product' : 'website')
    setMeta('property', 'og:url', ORIGIN + path)
    setMeta('property', 'og:site_name', 'Aurelio')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    if (imageUrl) {
      setMeta('property', 'og:image', imageUrl)
      setMeta('name', 'twitter:image', imageUrl)
      setMeta('name', 'twitter:card', 'summary_large_image')
    }
    setLink('canonical', ORIGIN + path)

    // Per-piece Product structured data (price on request → no Offer node)
    setJsonLd('product', product ? {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${product.name}${product.suffix ? ' ' + product.suffix : ''}`,
      image: imageUrl || undefined,
      description,
      brand: { '@type': 'Brand', name: 'Aurelio' },
      manufacturer: { '@type': 'Organization', name: 'AF International' },
      material: product.material || undefined,
      category: product.collection || undefined,
    } : null)

    return () => setJsonLd('product', null)
  }, [fullTitle, description, path, imageUrl, product])

  return null
}
