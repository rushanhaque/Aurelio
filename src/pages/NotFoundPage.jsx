import Seo from '../components/layout/Seo'
import LinkButton from '../components/layout/LinkButton'
import './pages.css'

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Not Found" description="The page you were looking for could not be found." />
      <section className="nf">
        <span className="nf-code">404</span>
        <h1 className="nf-title">This page has been melted down.</h1>
        <p className="nf-text">
          The page you were looking for isn’t here — moved, retired, or never cast at all.
        </p>
        <div className="nf-actions">
          <LinkButton to="/" variant="solid" arrow>Return home</LinkButton>
          <LinkButton to="/collections" variant="ghost">Browse the collections</LinkButton>
        </div>
      </section>
    </>
  )
}
