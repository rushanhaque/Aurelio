/* ============================================================
   <EnquiryDrawer> — the slide-in cart. Gathers saved pieces and
   lets the visitor fire one consolidated enquiry two ways: by
   email (mailto) or on WhatsApp (wa.me). Both open pre-written
   with the cart's contents; the visitor just hits send.
   ============================================================ */
import { useEffect, useRef } from 'react'
import { useEnquiry } from '../../lib/enquiry'
import { getProduct } from '../../data/collections'
import './EnquiryDrawer.css'

const ENQUIRY_EMAIL = 'saud@aurelio.in'
const ENQUIRY_PHONE = '917817976738'

export default function EnquiryDrawer() {
  const { saved, remove, clear, open, setOpen } = useEnquiry()
  const items = saved.map(getProduct).filter(Boolean)
  const count = items.length

  const closeRef = useRef(null)
  const lastFocusRef = useRef(null)

  // Escape closes the drawer while it is open.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  // On open, remember where focus was and move it into the drawer; on close,
  // return focus to the element that opened it (the Cart button).
  useEffect(() => {
    if (open) {
      lastFocusRef.current = document.activeElement
      const id = requestAnimationFrame(() => closeRef.current && closeRef.current.focus())
      return () => cancelAnimationFrame(id)
    }
    if (lastFocusRef.current && typeof lastFocusRef.current.focus === 'function') {
      lastFocusRef.current.focus()
      lastFocusRef.current = null
    }
  }, [open])

  // The automated message — a clean list of the cart's pieces.
  const intro = `Hello Aurelio, I would like to enquire about the following ${count === 1 ? 'piece' : 'pieces'}:`
  const list = items.map((p) => `• ${p.name} ${p.suffix} — ${p.material}`).join('\n')
  const body = `${intro}\n${list}\n\n`
  const subject = `Aurelio enquiry — ${count} ${count === 1 ? 'piece' : 'pieces'}`
  const mailHref = `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  const waHref = `https://wa.me/${ENQUIRY_PHONE}?text=${encodeURIComponent(body)}`

  return (
    <>
      <div
        className={`drawer-scrim${open ? ' is-open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`drawer${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        aria-hidden={!open}
      >
        <header className="drawer-head">
          <span className="drawer-title">Your Cart <span className="drawer-count">{count}</span></span>
          <button ref={closeRef} className="drawer-close" onClick={() => setOpen(false)} aria-label="Close cart">
            <svg viewBox="0 0 24 24" width="18" height="18"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
          </button>
        </header>

        {count === 0 ? (
          <div className="drawer-empty">
            <span className="drawer-empty-mark" aria-hidden="true">◆</span>
            <p>Your cart is empty.<br />Tick pieces with the checkbox and gather them here to enquire together.</p>
          </div>
        ) : (
          <>
            <ul className="drawer-list">
              {items.map((p) => (
                <li className="drawer-item" key={p.slug}>
                  <span className="drawer-thumb" style={{ background: p.bgColor || '#FFFFFF' }}>
                    {p.image && <img src={p.image} alt="" loading="lazy" />}
                  </span>
                  <span className="drawer-item-body">
                    <span className="drawer-item-name">{p.name} <em>{p.suffix}</em></span>
                    <span className="drawer-item-meta">{p.material}</span>
                  </span>
                  <button className="drawer-remove" onClick={() => remove(p.slug)} aria-label={`Remove ${p.name}`}>
                    <svg viewBox="0 0 24 24" width="15" height="15"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
                  </button>
                </li>
              ))}
            </ul>
            <div className="drawer-foot">
              <span className="drawer-foot-note">Send your selection to the studio:</span>
              <div className="drawer-actions">
                <a className="drawer-send drawer-send--mail" href={mailHref} onClick={() => setOpen(false)}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
                  Email
                </a>
                <a className="drawer-send drawer-send--wa" href={waHref} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.515 5.26l-.999 3.648 3.733-.979zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z" /></svg>
                  WhatsApp
                </a>
              </div>
              <button className="drawer-clear" onClick={clear}>Clear all</button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
