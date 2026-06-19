import './Marquee.css'

const ITEMS = [
  'Brass', 'Copper', 'Patinated Steel', 'Wrought Iron',
  'Seasoned Timber', 'Blown Glass', 'Hand-Forged',
  'Since 2008', 'Moradabad Atelier', 'Worldwide Export',
  'Bespoke Commissions', 'Heirloom Quality',
]

export default function Marquee() {
  return (
    <div className="mrq" aria-hidden="true">
      <div className="mrq-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="mrq-list">
            {ITEMS.map((item) => (
              <li key={item} className="mrq-item">
                <span className="mrq-dot">◆</span>
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
