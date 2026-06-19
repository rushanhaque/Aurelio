import Seo from '../components/layout/Seo'
import PageHero from '../components/layout/PageHero'
import './pages.css'

const DOCS = {
  faq: {
    title: 'Frequently Asked Questions',
    updated: 'Last updated — June 2026',
    lead: 'Common questions about Aurelio and our processes. This is demo copy for a portfolio build.',
    sections: [
      { h: 'Do you ship internationally?', body: ['Yes, we arrange shipping worldwide. Quotations are provided based on the specific piece and your location.'] },
      { h: 'Can I customize a piece?', body: ['Absolutely. Many of our pieces can be tailored in size, finish, and material. Please get in touch to discuss bespoke requirements.'] },
      { h: 'How do I care for my piece?', body: ['Each material requires different care. We provide detailed care instructions with every delivery. Generally, living finishes will naturally patinate over time.'] },
      { h: 'What are your lead times?', body: ['Lead times vary depending on the complexity of the commission and our current atelier schedule. We will provide an estimated lead time along with your quotation.'] },
    ],
  },
  terms: {
    title: 'Terms and Conditions',
    updated: 'Last updated — June 2026',
    lead: 'The terms on which Aurelio accepts commissions and sells its work. This is demo copy for a portfolio build.',
    sections: [
      { h: 'Commissions & orders', body: ['Each piece is made to order. A commission is confirmed once a deposit is received and the design is signed off in writing. Because the work is bespoke, designs cannot be substantially altered once production has begun.'] },
      { h: 'Pricing', body: ['Prices shown are indicative and exclude shipping, installation and any applicable duties or taxes. A firm quotation is provided before any commission is confirmed.'] },
      { h: 'Lead times & delivery', body: ['Lead times are estimates given in good faith and begin once a design is signed off. Hand-made work occasionally takes longer than expected; we will always keep you informed.'] },
      { h: 'Care & warranty', body: ['Every piece carries a lifetime structural guarantee against faults in our workmanship. Living finishes are intended to age and patinate, which is not considered a fault. Care guidance is supplied with each piece.'] },
      { h: 'Intellectual property', body: ['All designs, drawings and images remain the intellectual property of Aurelio and may not be reproduced without written permission.'] },
    ],
  },
}

export default function LegalPage({ doc = 'terms' }) {
  const d = DOCS[doc] || DOCS.terms
  return (
    <>
      <Seo title={d.title} description={d.lead} path={`/${doc}`} />
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: d.title }]}
        kicker="Legal"
        title={d.title}
        lead={d.lead}
      />
      <section className="section">
        <div className="container">
          <p className="legal-updated">{d.updated}</p>
          <div className="legal-prose">
            {d.sections.map((s, i) => (
              <div key={i}>
                <h2>{s.h}</h2>
                {s.body.map((p, j) => <p key={j}>{p}</p>)}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
