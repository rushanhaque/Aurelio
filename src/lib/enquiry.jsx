/* ============================================================
   Enquiry List — the maison "cart". A tiny global store of saved
   piece slugs, persisted to localStorage, plus the drawer's open
   state. Visitors gather pieces anywhere with a ◆ and send one
   consolidated enquiry. Dependency-free React context.
   ============================================================ */
import { createContext, useContext, useState, useCallback, useMemo } from 'react'

const Ctx = createContext(null)

export function EnquiryProvider({ children }) {
  const [saved, setSaved] = useState([])
  const [open, setOpen] = useState(false)

  const toggle  = useCallback((slug) => setSaved((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug])), [])
  const remove  = useCallback((slug) => setSaved((s) => s.filter((x) => x !== slug)), [])
  const clear   = useCallback(() => setSaved([]), [])
  const isSaved = useCallback((slug) => saved.includes(slug), [saved])

  // Memoise the context value so consumers only re-render when saved/open
  // actually change — not on every render of the provider's parent.
  const value = useMemo(
    () => ({ saved, toggle, remove, clear, isSaved, open, setOpen }),
    [saved, toggle, remove, clear, isSaved, open]
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

/* Safe no-op fallback if ever read outside the provider. */
export function useEnquiry() {
  return useContext(Ctx) || {
    saved: [], toggle() {}, remove() {}, clear() {}, isSaved: () => false, open: false, setOpen() {},
  }
}
