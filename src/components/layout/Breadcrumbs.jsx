/* ============================================================
   <Breadcrumbs> — a fine routed trail. Last item is the current
   page (not a link). Pass an array of { label, to? }.
   ============================================================ */
import { Link } from '../../lib/router'

export default function Breadcrumbs({ items = [], className = '' }) {
  return (
    <nav className={`crumbs ${className}`} aria-label="Breadcrumb">
      {items.map((it, i) => {
        const last = i === items.length - 1
        return (
          <span className="crumbs-item" key={i}>
            {it.to && !last ? (
              <Link to={it.to} className="crumbs-link">{it.label}</Link>
            ) : (
              <span className="crumbs-current" aria-current="page">{it.label}</span>
            )}
            {!last && <span className="crumbs-sep" aria-hidden="true">/</span>}
          </span>
        )
      })}
    </nav>
  )
}
