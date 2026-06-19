import Seo from '../components/layout/Seo'
import Hero from '../components/sections/Hero'
import Categories from '../components/sections/Categories'
import Manifesto from '../components/sections/Manifesto'
import Atelier from '../components/sections/Atelier'
import Gallery from '../components/sections/Gallery'
import Timeline from '../components/sections/Timeline'
import Heritage from '../components/sections/Heritage'
import Marquee from '../components/sections/Marquee'
import Journal from '../components/sections/Journal'

export default function Home() {
  return (
    <>
      <Seo
        description="Aurelio by AF International — a metal & wood atelier in Moradabad, India. Handcrafted furniture, lighting, urns and objets in brass, copper and timber since 2008."
        path="/"
      />
      <Hero />
      <Categories />
      <Manifesto />
      <Atelier />
      <Gallery />
      <Timeline />
      <Heritage />
      <Marquee />
      <Journal />
    </>
  )
}
