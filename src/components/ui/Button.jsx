/* ============================================================
   <Button> — the house CTA. Three variants, an optional arrow
   that slides on hover. No magnetism, no bounce — just weight.

   variant: "solid" (emerald) | "outline" | "ghost"
   ============================================================ */
import './Button.css'

export default function Button({
  children,
  variant = 'solid',
  arrow = false,
  as = 'button',
  className = '',
  onClick,
  href,
  ...rest
}) {
  const Tag = href ? 'a' : as
  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`btn btn--${variant} ${className}`}
      {...rest}
    >
      <span className="btn-label">
        {children}
        {arrow && (
          <svg className="btn-arrow" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
      </span>
    </Tag>
  )
}
