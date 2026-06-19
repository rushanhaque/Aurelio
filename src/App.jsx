import { lazy, Suspense } from 'react'
import { useRoute } from './lib/router'
import Layout from './components/layout/Layout'
import ErrorBoundary from './components/layout/ErrorBoundary'
import NotFoundPage from './pages/NotFoundPage'

const Home               = lazy(() => import('./pages/Home'))
const CollectionsPage    = lazy(() => import('./pages/CollectionsPage'))
const CollectionDetailPage = lazy(() => import('./pages/CollectionDetailPage'))
const ProductPage        = lazy(() => import('./pages/ProductPage'))
const MaterialsPage      = lazy(() => import('./pages/MaterialsPage'))
const AboutPage          = lazy(() => import('./pages/AboutPage'))
const ContactPage        = lazy(() => import('./pages/ContactPage'))
const CareGuidePage      = lazy(() => import('./pages/CareGuidePage'))
const LegalPage          = lazy(() => import('./pages/LegalPage'))

const ROUTES = [
  { path: '/',                   component: Home },
  { path: '/collections',        component: CollectionsPage },
  { path: '/collections/:slug',  component: CollectionDetailPage },
  { path: '/piece/:slug',        component: ProductPage },
  { path: '/materials',          component: MaterialsPage },
  { path: '/about',              component: AboutPage },
  { path: '/contact',            component: ContactPage },
  { path: '/care',               component: CareGuidePage },
  { path: '/visit',              component: ContactPage },
  { path: '/commission',         component: ContactPage },
  { path: '/faq',                component: LegalPage, props: { doc: 'faq' } },
  { path: '/terms',              component: LegalPage, props: { doc: 'terms' } },
]

export default function App() {
  const match = useRoute(ROUTES)
  const Page = match ? match.route.component : NotFoundPage
  const params = match ? match.params : {}
  const extra = (match && match.route.props) || {}

  // Route-level boundary keyed on the path: a render/chunk error on one page
  // shows NotFoundPage inside the shell, and the boundary resets on navigation.
  const routeKey = match ? match.route.path : '404'

  return (
    <Layout>
      <ErrorBoundary key={routeKey} fallback={<NotFoundPage />}>
        <Suspense fallback={null}>
          <Page params={params} {...extra} />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  )
}
