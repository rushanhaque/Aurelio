/* ============================================================
   <LinkButton> — a routed <Link> wearing the house button styles.
   Reuses Button.css so it matches <Button> exactly, but navigates
   client-side via the router instead of submitting/handling onClick.
   ============================================================ */
import { Link } from '../../lib/router'
import '../ui/Button.css'

export default function LinkButton({ to, variant = 'solid', arrow = false, className = '', children, ...rest }) {
  return (
    <Link to={to} className={`btn btn--${variant} ${className}`} {...rest}>
      <span className="btn-label">
        {children}
        {arrow && (
          <svg className="btn-arrow" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
      </span>
    </Link>
  )
}
