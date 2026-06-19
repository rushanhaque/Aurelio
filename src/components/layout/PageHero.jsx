/* ============================================================
   <PageHero> — the standard header for an interior page.
   Deep-emerald ground, breadcrumbs, kicker, big serif title via
   SplitText, optional lead + meta row. Keeps sub-pages cohesive
   with the home spine without repeating markup.
   ============================================================ */
import Breadcrumbs from './Breadcrumbs'
import SplitText from '../ui/SplitText'
import Reveal from '../ui/Reveal'

export default function PageHero({
  crumbs,
  kicker,
  title,
  lead,
  meta,
  align = 'left',
}) {
  return (
    <header className={`pagehero on-dark pagehero--${align}`}>
      <div className="sec-grain" aria-hidden="true" />
      <div className="container pagehero-inner">
        {crumbs && <Breadcrumbs items={crumbs} className="pagehero-crumbs" />}
        {kicker && <span className="pagehero-kicker eyebrow">{kicker}</span>}
        <SplitText as="h1" className="pagehero-title display">{title}</SplitText>
        {lead && (
          <Reveal as="p" className="pagehero-lead lead" delay={0.15}>{lead}</Reveal>
        )}
        {meta && (
          <Reveal as="div" className="pagehero-meta" delay={0.25}>{meta}</Reveal>
        )}
      </div>
    </header>
  )
}
