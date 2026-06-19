import Seo from '../components/layout/Seo'
import PageHero from '../components/layout/PageHero'
import Reveal from '../components/ui/Reveal'
import './pages.css'

const GUIDES = [
  {
    name: 'Brass',
    index: '01',
    steps: [
      'Dust regularly with a soft, dry cloth to prevent build-up.',
      'For lacquered brass, wipe with a damp cloth and dry immediately — avoid abrasives.',
      'For unlacquered (living) brass, a paste of lemon juice and salt removes tarnish; rinse thoroughly and dry.',
      'Apply a thin coat of Renaissance wax once or twice a year to slow patination.',
      'Keep away from bleach, ammonia, and acidic cleaners — they strip the finish permanently.',
    ],
    note: 'Living brass will deepen and shift over time. This is not a flaw — it is the material ageing honestly.',
  },
  {
    name: 'Copper',
    index: '02',
    steps: [
      'Wipe down after each use with a dry or barely damp soft cloth.',
      'For cookware, wash by hand in warm soapy water; avoid dishwashers.',
      'Remove green verdigris with a paste of flour, salt, and white vinegar — apply, leave 10 minutes, rinse.',
      'For decorative patinated pieces, do not clean — the patina is intentional and irreplaceable.',
      'Oil lightly with food-safe mineral oil annually to slow oxidation.',
    ],
    note: 'Copper is reactive. Salt, vinegar, and acidic foods will mark untreated surfaces — desirable on some pieces, unwanted on others.',
  },
  {
    name: 'Patinated Steel',
    index: '03',
    steps: [
      'Dust with a dry cloth; avoid water on blackened steel where possible.',
      'If cleaning is necessary, wipe quickly with a barely damp cloth and dry at once.',
      'Re-apply a thin coat of paste wax (beeswax or carnauba) every six months to maintain the finish.',
      'If rust spots appear, remove with 0000 steel wool, clean the area, and re-wax immediately.',
      'Do not use water-based cleaners or degreasers — they remove the wax seal.',
    ],
    note: 'Blackened steel is protected by wax, not by a permanent coating. Handle with care and maintain the wax layer.',
  },
  {
    name: 'Bronze',
    index: '04',
    steps: [
      'Dust with a soft brush or microfibre cloth — avoid anything abrasive.',
      'Wash occasionally with mild soap and lukewarm water; rinse and dry thoroughly.',
      'Apply a coat of microcrystalline wax (e.g. Renaissance Wax) once a year.',
      'Do not use metal polishes unless you intend to remove the patina entirely.',
      'Avoid prolonged contact with moisture — bronze is stable but not waterproof.',
    ],
    note: 'Bronze patina is one of the most beautiful things the material does. Preserve rather than polish.',
  },
  {
    name: 'Blown Glass',
    index: '05',
    steps: [
      'Clean with a damp lint-free cloth or soft glass cloth; dry immediately.',
      'For shades and diffusers, remove from the fitting before cleaning.',
      'Do not immerse in water or place in a dishwasher — the thermal shock can crack mouth-blown glass.',
      'Use a soft-bristle brush to reach inside narrow necks or fluted edges.',
      'Store wrapped in acid-free tissue if not in use.',
    ],
    note: 'Mouth-blown glass has natural variation — slight bubbles, uneven walls, a seam line. These are signatures, not defects.',
  },
  {
    name: 'Wood',
    index: '06',
    steps: [
      'Wipe with a dry or slightly damp cloth; dry immediately after.',
      'Re-oil with food-safe tung oil or Danish oil once or twice a year — more frequently for tabletops.',
      'Keep away from direct sunlight and heating vents — both dry the grain and cause cracking.',
      'Use coasters and trivets; avoid placing hot or wet vessels directly on the surface.',
      'Sand lightly along the grain with 220-grit paper to remove surface marks, then re-oil.',
    ],
    note: 'Wood moves with humidity. Small seasonal gaps or checks are normal and close again as conditions change.',
  },
  {
    name: 'Aluminium',
    index: '07',
    steps: [
      'Wipe with a damp cloth and mild detergent; dry immediately to prevent water spots.',
      'For brushed finishes, always wipe along the grain — cross-grain wiping leaves visible scratches.',
      'Remove oxidation with a specialist aluminium cleaner; do not use steel wool.',
      'For anodised pieces, avoid alkaline cleaners — they attack the anodised layer.',
      'Apply a thin coat of car wax annually to protect against dulling.',
    ],
    note: 'Anodised aluminium is hard and resistant but can be scratched by sharp metals. Keep separate from steel tools.',
  },
  {
    name: 'Porcelain',
    index: '08',
    steps: [
      'Wash by hand with mild dish soap and warm water; avoid abrasive sponges.',
      'Porcelain is dishwasher-safe unless it has metallic lustre or hand-applied decoration.',
      'Do not subject to sudden temperature changes — going from cold water to a hot oven can crack the body.',
      'Remove stains with a paste of bicarbonate of soda and water; leave for five minutes then rinse.',
      'Handle at the base, not at thin rims or handles — these are the most vulnerable points.',
    ],
    note: 'High-fired porcelain is extremely hard but brittle. A fall on a hard floor will almost always chip or break it.',
  },
  {
    name: 'Ceramic',
    index: '09',
    steps: [
      'Hand-wash with mild soap and warm water; avoid the dishwasher for hand-built or relief-decorated pieces.',
      'Dry thoroughly before storing — residual moisture inside porous bodies can cause cracking in cold conditions.',
      'Use felt pads on the base to protect surfaces the piece rests on.',
      'Do not use in a microwave unless the glaze is certified microwave-safe.',
      'Chip repairs can be carried out with food-safe ceramic adhesive; send major damage back to the atelier.',
    ],
    note: 'Earthenware ceramics are slightly porous. Unglazed bases will absorb water if left standing in a pool — dry the base after each use.',
  },
]

export default function CareGuidePage() {
  return (
    <>
      <Seo
        title="Care Guides"
        description="How to clean, maintain and preserve every material we work in — from living brass to hand-built ceramic."
        path="/care"
      />
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Care Guides' }]}
        kicker="After the Atelier"
        title="How to keep it."
        lead="Every material we work has its own logic. These guides tell you what it needs — and what to leave alone."
      />

      <section className="section">
        <div className="container">
          <div className="care-grid">
            {GUIDES.map((g) => (
              <Reveal key={g.name} as="article" className="care-card">
                <header className="care-card-head">
                  <span className="care-card-index caption">{g.index}</span>
                  <h2 className="care-card-name h3">{g.name}</h2>
                </header>
                <ol className="care-steps">
                  {g.steps.map((s, i) => (
                    <li key={i} className="care-step">
                      <span className="care-step-num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="care-step-text">{s}</span>
                    </li>
                  ))}
                </ol>
                <p className="care-note">{g.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
