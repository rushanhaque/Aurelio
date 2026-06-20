/* ============================================================
   Timeline — "The path a piece travels." The six commission
   stations are now a FlowingMenu: a clean white list that, on
   hover, sweeps an emerald marquee of the stage name + a process
   image up from the nearest edge.
   ============================================================ */
import SectionHeader from '../ui/SectionHeader'
import FlowingMenu from '../ui/FlowingMenu'
import './Timeline.css'

import imgEnquiry from '../../../assets/HomePage/PathAPieceTravels/Enquiry.png'
import imgDesign from '../../../assets/HomePage/PathAPieceTravels/Design.png'
import imgSample from '../../../assets/HomePage/PathAPieceTravels/Sample.png'
import imgForge from '../../../assets/HomePage/PathAPieceTravels/Forge.png'
import imgFinish from '../../../assets/HomePage/PathAPieceTravels/Finish.png'
import imgDelivery from '../../../assets/HomePage/PathAPieceTravels/Delivery.png'

const STAGES = [
  { link: '#commission', text: 'Enquiry',  image: imgEnquiry },
  { link: '#commission', text: 'Design',   image: imgDesign },
  { link: '#commission', text: 'Sample',   image: imgSample },
  { link: '#commission', text: 'Forge',    image: imgForge },
  { link: '#commission', text: 'Finish',   image: imgFinish },
  { link: '#commission', text: 'Delivery', image: imgDelivery },
]

export default function Timeline() {
  return (
    <section id="commission" className="section tl">
      <div className="container tl-container">
        <SectionHeader
          kicker="Commission"
          index="06"
          total="10"
          title="The path a piece travels."
          lead="Every commission passes through the same six stations — no shortcuts, no exceptions. Follow the thread, station to station."
        />

        <div className="tl-flow">
          <FlowingMenu
            items={STAGES}
            speed={14}
            bgColor="#FFFFFF"
            textColor="#0E3B2C"
            marqueeBgColor="#0E3B2C"
            marqueeTextColor="#FFFFFF"
            borderColor="rgba(14, 59, 44, 0.16)"
          />
        </div>
      </div>
    </section>
  )
}
