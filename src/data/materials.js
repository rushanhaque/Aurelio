/* ============================================================
   Demo data — the materials Aurelio works in.
   ============================================================ */

/* ---- material images (Vite will hash-rename & optimise these) ---- */
import brassImg from '../../assets/Materials/brass.png'
import brassTex from '../../assets/Materials/brass-texture.png'
import copperImg from '../../assets/Materials/copper.png'
import copperTex from '../../assets/Materials/copper-texture.png'
import steelImg from '../../assets/Materials/steel.png'
import steelTex from '../../assets/Materials/steel-texture.png'
import bronzeImg from '../../assets/Materials/bronze.png'
import bronzeTex from '../../assets/Materials/bronze-texture.png'
import glassImg from '../../assets/Materials/glass.png'
import glassTex from '../../assets/Materials/glass-texture.png'
import woodImg from '../../assets/Materials/wood.png'
import woodTex from '../../assets/Materials/wood-texture.png'
import aluminiumImg from '../../assets/Materials/aluminium.png'
import aluminiumTex from '../../assets/Materials/aluminium-texture.png'
import porcelainImg from '../../assets/Materials/porcelain.png'
import porcelainTex from '../../assets/Materials/porcelain-texture.png'
import ceramicImg from '../../assets/Materials/ceramic.png'
import ceramicTex from '../../assets/Materials/ceramic-texture.png'

export const MATERIALS = [
  {
    slug: 'brass', name: 'Brass', index: '01', ratio: '16/15',
    trait: 'Warm · luminous · living',
    blurb: 'Our signature metal. Spun, cast and machined, brass moves from yellow to deep gold as it ages — a finish that improves with every year of handling.',
    note: 'Lacquered for stability or left living to patina.',
    image: brassImg, texture: brassTex,
  },
  {
    slug: 'copper', name: 'Copper', index: '02', ratio: '16/15',
    trait: 'Soft · conductive · alive',
    blurb: 'Raised and hammered by hand, copper takes a patina like no other metal — verdigris greens, fire-blues and rose-golds coaxed from the surface, never painted on.',
    note: 'Tinned for cookware; patinated for relief work.',
    image: copperImg, texture: copperTex,
  },
  {
    slug: 'patinated-steel', name: 'Patinated Steel', index: '03', ratio: '16/15',
    trait: 'Structural · honest · dark',
    blurb: 'Where strength is the point. Forged and blackened, our steel carries weight without bulk — the backbone of the furniture and the architectural commissions.',
    note: 'Hand-blackened and waxed to a living finish.',
    image: steelImg, texture: steelTex,
  },
  {
    slug: 'bronze', name: 'Bronze', index: '04', ratio: '16/15',
    trait: 'Dense · ancient · permanent',
    blurb: 'Sand-cast in the studio foundry. Bronze is the most permanent material we work — heavy, slow to make, and effectively forever.',
    note: 'Hand-polished or left to develop a natural patina.',
    image: bronzeImg, texture: bronzeTex,
  },
  {
    slug: 'blown-glass', name: 'Blown Glass', index: '05', ratio: '16/15',
    trait: 'Molten · breath · light',
    blurb: 'Mouth-blown by our glass partner in Murano, then married to metal in the atelier. Opal, clear and smoked — the diffuser that turns a fixture into light.',
    note: 'Each element is unique to the breath that made it.',
    image: glassImg, texture: glassTex,
  },
  {
    slug: 'wood', name: 'Wood', index: '06', ratio: '16/15',
    trait: 'Grained · warm · counterweight',
    blurb: 'The warm counterweight to metal. European oak and American walnut, single-board where we can, oiled to a finish that wears in rather than out.',
    note: 'Responsibly sourced; finished food-safe where needed.',
    image: woodImg, texture: woodTex,
  },
  {
    slug: 'aluminium', name: 'Aluminium', index: '07', ratio: '16/15',
    trait: 'Light · satin · modern',
    blurb: 'The lightest metal on the bench. Spun and brushed to a cool satin sheen, aluminium carries bold form without weight — chosen where a piece must feel effortless in the hand.',
    note: 'Anodised or hand-brushed to a soft satin finish.',
    image: aluminiumImg, texture: aluminiumTex,
  },
  {
    slug: 'porcelain', name: 'Porcelain', index: '08', ratio: '16/15',
    trait: 'Fired · pure · enduring',
    blurb: 'Our one departure from metal. Slip-cast and high-fired, porcelain brings a glove-smooth white to the table — set against brass and copper where warmth meets restraint.',
    note: 'Hand-glazed; kiln-fired in small batches.',
    image: porcelainImg, texture: porcelainTex,
  },
  {
    slug: 'ceramic', name: 'Ceramic', index: '09', ratio: '16/15',
    trait: 'Earthy · textured · handformed',
    blurb: 'Wheel-thrown and hand-built in small batches, our ceramic work pairs the rough honesty of raw clay with precisely applied glazes — each piece bearing the fingerprints of its maker.',
    note: 'Earthenware and stoneware; food-safe glazes available.',
    image: ceramicImg, texture: ceramicTex,
  },
]

export const getMaterial = (slug) => MATERIALS.find((m) => m.slug === slug)
