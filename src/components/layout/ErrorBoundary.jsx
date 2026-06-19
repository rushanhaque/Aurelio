/* ============================================================
   <ErrorBoundary> — catches any render/runtime error so one broken
   branch never white-screens the whole site. Two modes:
   · with a `fallback` prop  → renders it (route-level: keeps the shell)
   · without one             → renders the built-in full-page notice
   It also auto-recovers from the most common production failure: a
   lazy-chunk fetch that 404s after a redeploy (stale index referencing
   old hashed filenames) — a one-time hard reload pulls fresh chunks.
   Class component because error boundaries have no hook equivalent.
   ============================================================ */
import { Component } from 'react'

const isChunkError = (error) =>
  /Loading chunk|dynamically imported module|Failed to fetch|importing a module script failed/i.test(
    (error && error.message) || ''
  )

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // A chunk that failed to load after a deploy is fixed by one hard reload.
    // The sessionStorage guard prevents an infinite reload loop if it is truly gone.
    if (isChunkError(error) && typeof sessionStorage !== 'undefined') {
      if (!sessionStorage.getItem('chunk-reloaded')) {
        sessionStorage.setItem('chunk-reloaded', '1')
        window.location.reload()
        return
      }
    }
    if (typeof console !== 'undefined') console.error('Render error:', error, info)
  }

  handleReload = () => {
    if (typeof window !== 'undefined') window.location.reload()
  }

  render() {
    if (!this.state.hasError) return this.props.children
    // Route-level: render the provided fallback inside the existing shell.
    if (this.props.fallback !== undefined) return this.props.fallback
    // Top-level: full-page recovery notice.
    return (
      <div role="alert" className="errbound">
        <div className="errbound-inner">
          <p className="errbound-kicker">Aurelio</p>
          <h1 className="errbound-title">Something went quiet.</h1>
          <p className="errbound-lead">
            An unexpected error interrupted the page. Reloading usually sets it right.
          </p>
          <button type="button" className="errbound-btn" onClick={this.handleReload}>
            Reload the page
          </button>
        </div>
      </div>
    )
  }
}
