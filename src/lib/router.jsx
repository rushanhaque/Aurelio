/* ============================================================
   A tiny, dependency-free client-side router (History API).
   Avoids adding react-router so the project stays install-free.

   Exports:
     navigate(to, { replace })   imperative navigation
     useLocation()               current pathname (re-renders on change)
     <Link to="/path">           anchor that routes without a reload
     useRoute(routes)            match the current path → { route, params }
   ============================================================ */
import { useEffect, useState } from 'react'

const EVT = 'aurelio:navigate'

export function navigate(to, { replace = false } = {}) {
  const current = window.location.pathname + window.location.search
  if (to === current) return
  if (replace) window.history.replaceState({}, '', to)
  else window.history.pushState({}, '', to)
  window.dispatchEvent(new Event(EVT))
}

export function useLocation() {
  const [path, setPath] = useState(() => window.location.pathname)
  useEffect(() => {
    const onChange = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onChange)
    window.addEventListener(EVT, onChange)
    return () => {
      window.removeEventListener('popstate', onChange)
      window.removeEventListener(EVT, onChange)
    }
  }, [])
  return path
}

export function Link({ to, className = '', children, onClick, ...rest }) {
  const handle = (e) => {
    // respect new-tab / modifier clicks
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    if (onClick) onClick(e)
    navigate(to)
  }
  return (
    <a href={to} className={className} onClick={handle} {...rest}>
      {children}
    </a>
  )
}

/* /collections/:slug  vs  /collections/lighting  → { slug: 'lighting' } */
function matchPath(pattern, path) {
  if (pattern === '/') return path === '/' ? {} : null
  const pp = pattern.split('/').filter(Boolean)
  const ap = path.split('/').filter(Boolean)
  if (pp.length !== ap.length) return null
  const params = {}
  for (let i = 0; i < pp.length; i++) {
    if (pp[i].startsWith(':')) params[pp[i].slice(1)] = decodeURIComponent(ap[i])
    else if (pp[i] !== ap[i]) return null
  }
  return params
}

export function useRoute(routes) {
  const path = useLocation()
  for (const route of routes) {
    const params = matchPath(route.path, path)
    if (params) return { route, params }
  }
  return null
}
