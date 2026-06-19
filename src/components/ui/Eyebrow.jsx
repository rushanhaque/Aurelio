/* ============================================================
   <Eyebrow> — small-caps section label, optionally numbered,
   with a short brass rule. The recurring editorial signature.
   ============================================================ */
import './Eyebrow.css'

export default function Eyebrow({ children, index, className = '', rule = true }) {
  return (
    <span className={`eyebrow eyebrow-wrap ${className}`}>
      {rule && <span className="eyebrow-rule" aria-hidden="true" />}
      {index && <span className="eyebrow-index">{index}</span>}
      <span className="eyebrow-text">{children}</span>
    </span>
  )
}
