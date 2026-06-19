/* ============================================================
   <SaveButton> — adds/removes a piece from the cart. Variants:
     'pill'     labelled ◆ pill (product page)
     'icon'     bare floating ◆ (legacy card overlay)
     'checkbox' a tick-box + label (product cards)
   Stops propagation so ticking from a card never navigates.
   ============================================================ */
import { useEnquiry } from '../../lib/enquiry'
import './SaveButton.css'

export default function SaveButton({ slug, variant = 'pill', label = 'Add to cart' }) {
  const { isSaved, toggle } = useEnquiry()
  const saved = isSaved(slug)
  const onClick = (e) => { e.preventDefault(); e.stopPropagation(); toggle(slug) }

  if (variant === 'checkbox') {
    return (
      <button
        type="button"
        className={`save-btn save-btn--checkbox${saved ? ' is-saved' : ''}`}
        onClick={onClick}
        aria-pressed={saved}
        aria-label={saved ? 'In your cart — tap to remove' : label}
      >
        <span className="save-btn-box" aria-hidden="true">
          <svg className="save-btn-check" viewBox="0 0 24 24" width="12" height="12">
            <path d="M5 12.5l4.5 4.5L19 7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="save-btn-label">{saved ? 'In cart' : label}</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      className={`save-btn save-btn--${variant}${saved ? ' is-saved' : ''}`}
      onClick={onClick}
      aria-pressed={saved}
      aria-label={saved ? 'Added to your cart — tap to remove' : label}
    >
      <span className="save-btn-mark" aria-hidden="true">◆</span>
      {variant === 'pill' && <span className="save-btn-label">{saved ? 'Added to cart' : label}</span>}
    </button>
  )
}
