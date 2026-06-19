/* ============================================================
   Demo catalogue — seven collections.
   Product imagery is sourced category-wise from
   assets/Collections/<Category>/ via a Vite glob, so dropping
   new images into a folder adds pieces automatically.
   Pure data; pages read it through the selectors at the foot.
   (No prices, dimensions or lead times are carried.)
   ============================================================ */

import lightingCover from '../../assets/HomePage/Collections/Lightings.jpeg'
import furnitureCover from '../../assets/HomePage/Collections/Furniture.jpeg'
import kitchenwareCover from '../../assets/HomePage/Collections/Kitchenware.jpeg'
import decorCover from '../../assets/HomePage/Collections/Decor.jpeg'
import accessoriesCover from '../../assets/HomePage/Collections/Accessories.jpeg'
import urnsCover from '../../assets/HomePage/Collections/Urns.jpeg'
import bespokeCover from '../../assets/HomePage/Collections/Bespoke.jpeg'

export const COLLECTIONS = [
  {
    slug: 'urns',
    name: 'Urns',
    index: '01',
    cover: urnsCover,
    tagline: 'Vessels that keep.',
    summary: 'Raised and cast urns for the mantel, the hall and the garden.',
    description:
      'The oldest form we make. Raised in copper or cast in bronze and weighted to stand for a century, our urns are vessels built to hold meaning as readily as anything else — for the mantel, the entrance hall, or the garden.',
  },
  {
    slug: 'lighting',
    name: 'Lighting',
    index: '02',
    cover: lightingCover,
    tagline: 'Light, raised in metal.',
    summary: 'Pendants, sconces and chandeliers in spun brass and blown glass.',
    description:
      'Light is our first material. Each fixture is spun, raised or cast by hand, then wired and balanced so it hangs as quietly as it glows — objects that hold a room long after the bulb is dimmed.',
  },
  {
    slug: 'furniture',
    name: 'Furniture',
    index: '03',
    cover: furnitureCover,
    tagline: 'Structure with a pulse.',
    summary: 'Consoles, tables and seating raised on hand-forged metal frames.',
    description:
      'Furniture that earns its weight. Forged frames, honest joinery and surfaces that wear in rather than out — pieces drawn to outlast the rooms they are made for.',
  },
  {
    slug: 'kitchenware',
    name: 'Kitchenware',
    index: '04',
    cover: kitchenwareCover,
    tagline: 'For the daily ritual.',
    summary: 'Cookware, flatware and serveware, cast and polished by hand.',
    description:
      'The objects you reach for every day deserve the most care. Cast, hammered and hand-polished, our kitchenware is made to be used hard and handed down.',
  },
  {
    slug: 'decor',
    name: 'Decor',
    index: '05',
    cover: decorCover,
    tagline: 'Quiet sculpture.',
    summary: 'Vessels, mirrors and sculptural objects for the considered home.',
    description:
      'Decorative work where the material does the talking — patinated reliefs, cast vessels and mirrors framed in blackened steel. Sculpture you live alongside.',
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    index: '06',
    cover: accessoriesCover,
    tagline: 'The smaller heirlooms.',
    summary: 'Hardware, fittings and the smaller heirlooms of daily life.',
    description:
      'The details a house is judged by. Levers, latches and desk objects machined and finished to the same standard as a chandelier — because they are touched far more often.',
  },
  {
    slug: 'bespoke',
    name: 'Bespoke',
    index: '07',
    cover: bespokeCover,
    tagline: 'Drawn entirely to your brief.',
    summary: 'Commissions drawn, forged and finished entirely to your brief.',
    description:
      'Our truest work. A single object or an entire interior, developed with you from sketch to installation. Most of what we are proudest of began as a conversation.',
  },
]

/* ============================================================
   PRODUCT IMAGERY — bulk-loaded per category from
   assets/Collections/<Folder>/ (Vite resolves each to a URL).
   Patterns must be string literals, hence one glob per folder.
   ============================================================ */
const FOLDER_IMAGES = {
  urns:        import.meta.glob('../../assets/Collections/Urns/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',        { eager: true, import: 'default' }),
  lighting:    import.meta.glob('../../assets/Collections/Lighting/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',    { eager: true, import: 'default' }),
  furniture:   import.meta.glob('../../assets/Collections/Furniture/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',   { eager: true, import: 'default' }),
  kitchenware: import.meta.glob('../../assets/Collections/Kitchenware/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, import: 'default' }),
  decor:       import.meta.glob('../../assets/Collections/Decor/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',       { eager: true, import: 'default' }),
  accessories: import.meta.glob('../../assets/Collections/Accessories/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, import: 'default' }),
}

/* Sorted, de-junked image URLs for a category (drops raw screenshots and duplicate assets). */
function imagesFor(cat, max) {
  return Object.entries(FOLDER_IMAGES[cat] || {})
    .filter(([path]) => !/screenshot/i.test(path))
    // Exclude exact duplicate images
    .filter(([path]) => !/_202606102016\b/i.test(path))
    .filter(([path]) => !/_202606102021\b/i.test(path))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map(([, url]) => url)
    .slice(0, max)
}

const slugify = (s) =>
  s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

/* Per-category piece vocabulary used to dress each image as a product. */
const RECIPE = {
  urns: {
    type: 'Lidded urn', suffix: 'Urn',
    names: ['Cypress', 'Reliquary', 'Sentinel', 'Vesta', 'Cinera', 'Requiem', 'Vigil', 'Memoria', 'Ossian', 'Eterna', 'Cairn', 'Solace', 'Aurora', 'Seraph', 'Verdant', 'Pellucid'],
    materials: ['Hand-raised copper', 'Cast bronze', 'Patinated brass', 'Blackened steel & brass'],
    finishes: ['Verdigris patina', 'Hand-polished', 'Antiqued', 'Brushed satin'],
    details: ['Raised and finished by hand', 'Threaded lid, sealed interior', 'Felt-lined base', 'Hand engraving to order'],
    line: 'A vessel built to hold meaning as much as anything else.',
  },
  lighting: {
    type: 'Lamp', suffix: 'Lamp',
    names: ['Soleil', 'Halo', 'Atlas', 'Lumen', 'Aurora', 'Eclipse', 'Vesper', 'Lantern', 'Orbit', 'Ember', 'Comet', 'Beacon', 'Nimbus', 'Corona', 'Meridian', 'Helios'],
    materials: ['Ceramic & brass', 'Hand-spun brass', 'Blown glass & brass', 'Patinated steel'],
    finishes: ['Polished brass', 'Aged brass', 'Brushed satin', 'Blackened'],
    details: ['Wired and balanced by hand', 'Dimmable fitting', 'Made to order', 'Fine cloth flex'],
    line: 'It holds a room long after the bulb is dimmed.',
  },
  kitchenware: {
    type: 'Serveware', suffix: 'Service',
    names: ['Prana', 'Trishul', 'Kashi', 'Varanasi', 'Arbor', 'Folia', 'Calla', 'Imperial', 'Royal', 'Gilded', 'Lotus', 'Rudraksha', 'Ganga', 'Tulsi', 'Amrit', 'Surya'],
    materials: ['Hammered copper', 'Mirror-polished brass', 'Tinned copper', 'Silver-plated brass'],
    finishes: ['Mirror-polished', 'Hammered', 'Hand-burnished', 'Antiqued'],
    details: ['Forged, not stamped', 'Food-safe finish', 'Care guide included', 'Re-finishing for life'],
    line: 'Made to be used hard and handed down.',
  },
  decor: {
    type: 'Decorative vessel', suffix: 'Vessel',
    names: ['Teardrop', 'Laguna', 'Sienna', 'Rosa', 'Nero', 'Pebble', 'Calla', 'Flora', 'Dune', 'Onyx', 'Amber', 'Cascade', 'Lure', 'Coral', 'Marl', 'Vesta'],
    materials: ['Cast bronze', 'Patinated copper', 'Blackened steel', 'Marble & brass'],
    finishes: ['Verdigris patina', 'Brushed', 'Blackened', 'Honed'],
    details: ['One of a kind', 'Hand-finished surface', 'Felt-protected base', 'Develops a living patina'],
    line: 'Sculpture you live alongside.',
  },
  accessories: {
    type: 'Decorative globe', suffix: 'Globe',
    names: [
      'Meridian', 'Atlas', 'Cartographer', 'Equator', 'Armillary', 'Orbis', 'Voyager', 'Magellan',
      'Terra', 'Antipode', 'Zenith', 'Polaris', 'Mercator', 'Aether', 'Latitude', 'Compass',
      'Sextant', 'Horizon', 'Astrolabe', 'Chronometer', 'Octant', 'Quadrant', 'Alidade', 'Gnomon',
      'Transit', 'Azimuth', 'Declination', 'Ecliptic', 'Solstice', 'Equinox', 'Nadir', 'Apex',
      'Vertex', 'Aphelion', 'Perihelion', 'Orbit', 'Trajectory', 'Beacon', 'Lighthouse', 'Pilot',
      'Navigator', 'Explorer', 'Pathfinder', 'Wayfinder', 'Pioneer', 'Discoverer', 'Helmsman', 'Steersman',
      'Mariner', 'Seafarer', 'Traveler', 'Wanderer', 'Pilgrim', 'Nomad', 'Odyssey', 'Journey',
      'Expedition', 'Voyage', 'Passage', 'Crossing', 'Flight', 'Ascent', 'Descent', 'Elevation',
      'Altitude', 'Longitude', 'Bearing', 'Coordinates', 'Degrees', 'Deviation', 'Fiducial', 'Gimbal',
      'Heliocentric', 'Isoline', 'Loxodromic', 'Nautical', 'Orientation', 'Parallax', 'Projection', 'Rhumb',
      'Spheroid', 'Scale', 'Triangulation', 'Vector', 'Andromeda', 'Aquila', 'Auriga', 'Bootes', 'Cancer',
      'Canis', 'Carina', 'Cassiopeia', 'Centaurus', 'Cepheus', 'Cetus', 'Cygnus', 'Delphinus', 'Draco',
      'Eridanus', 'Gemini', 'Hercules', 'Hydra', 'Leo', 'Lyra', 'Monoceros', 'Ophiuchus', 'Orion',
      'Pegasus', 'Perseus', 'Phoenix', 'Pisces', 'Puppis', 'Sagittarius', 'Scorpius', 'Taurus', 'Ursa',
      'Vela', 'Virgo', 'Nova', 'Mundus', 'Cosmos', 'Sphaera', 'Globus', 'Aura', 'Ventus', 'Zephyrus',
      'Austri', 'Eurus', 'Aquilo', 'Sol', 'Luna', 'Stella', 'Astrum', 'Vesper', 'Aurora', 'Crepusculum',
      'Lux', 'Umbra', 'Tenebrae', 'Ignis', 'Aqua', 'Aer', 'Geographia', 'Charta', 'Iter', 'Via',
      'Pons', 'Portus', 'Oceanus', 'Mare', 'Sinus', 'Fretum', 'Insula', 'Peninsula', 'Continentis',
      'Mons', 'Vallis', 'Campus', 'Silva', 'Desertum', 'Aeterna', 'Primum', 'Secundum', 'Tertium',
      'Imperium', 'Regnum', 'Civitas', 'Urbs', 'Domus', 'Locus', 'Spatium', 'Tempus', 'Evum',
      'Saeculum', 'Endeavour', 'Resolution', 'Discovery', 'Adventure', 'Beagle', 'Fram', 'Gjoa',
      'Victoria', 'Trinidad', 'Concepcion', 'San-Antonio', 'Santiago', 'Santa-Maria', 'Pinta', 'Nina',
      'Golden-Hind', 'Erebus', 'Terror', 'Vostok', 'Mirny', 'Nadezhda', 'Neva', 'Argo', 'Odysseus',
      'Aeneas', 'Jason', 'Prometheus', 'Daedalus', 'Icarus', 'Hermes', 'Iris', 'Solitaire', 'Sovereign',
      'Monarch', 'Imperial', 'Regent', 'Dynasty', 'Legacy', 'Heritage', 'Chronos', 'Aion', 'Kairos',
      'Infinity', 'Eternity', 'Limitless', 'Boundless', 'Boundary', 'Frontier', 'Outpost', 'Haven',
      'Sanctuary', 'Sentinel', 'Guardian', 'Vigilant', 'Warden', 'Keeper', 'Steward', 'Curator',
      'Archivist', 'Gale', 'Breeze', 'Mist', 'Nebula', 'Galaxy', 'Universe', 'Constellation', 'Eclipse',
      'Comet', 'Meteor', 'Asteroid', 'Quasar', 'Pulsar', 'Zenithal', 'Nadirial', 'Azimuthal', 'Equatorial',
      'Mercatorial', 'Sextantal', 'Octantal', 'Gnomonic', 'Astrolabic', 'Chronomitric', 'Aphelian',
      'Perihelian', 'Solsticial', 'Equinoctial', 'Ecliptical'
    ],
    materials: ['Brass & enamel', 'Patinated bronze', 'Lacquered metal', 'Brass & stone'],
    finishes: ['Hand-polished', 'Antiqued', 'Lacquered', 'Patinated'],
    details: ['Hand-assembled', 'Weighted base', 'Develops a hand patina', 'Gift-boxed'],
    line: 'The kind of object a desk is judged by.',
  },
}

/* The per-category caps are set high to load all available images in the folder. */
const CAP = { urns: 500, lighting: 500, furniture: 500, kitchenware: 500, decor: 500, accessories: 500 }

function toRoman(num) {
  const lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }
  let roman = ''
  for (let key in lookup) {
    while (num >= lookup[key]) {
      roman += key
      num -= lookup[key]
    }
  }
  return roman
}

function buildProducts(cat) {
  const r = RECIPE[cat]
  if (!r) return []
  return imagesFor(cat, CAP[cat]).map((image, i) => {
    const cycle = Math.floor(i / r.names.length)
    const nameIndex = i % r.names.length
    let name = r.names[nameIndex]
    if (cycle > 0) {
      name = `${name} ${toRoman(cycle + 1)}`
    }
    const material = r.materials[i % r.materials.length]
    const finish = r.finishes[i % r.finishes.length]
    return {
      slug: slugify(`${name}-${r.suffix}-${i + 1}`),
      name,
      suffix: r.suffix,
      collection: cat,
      material,
      finish,
      ratio: '4/5',
      index: String(i + 1).padStart(2, '0'),
      image,
      bgColor: '#ffffff',
      story: `${name} — a ${r.type.toLowerCase()} made and finished by hand in ${material.toLowerCase()}. ${r.line}`,
      details: r.details,
    }
  })
}

export const PRODUCTS = [
  ...buildProducts('urns'),
  ...buildProducts('lighting'),
  ...buildProducts('kitchenware'),
  ...buildProducts('decor'),
  ...buildProducts('accessories'),
  // Furniture currently has no imagery; Bespoke routes to the enquire page.
]

/* ---- selectors ---- */
export const getCollection = (slug) => COLLECTIONS.find((c) => c.slug === slug)
export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug)
export const productsByCollection = (slug) => PRODUCTS.filter((p) => p.collection === slug)
