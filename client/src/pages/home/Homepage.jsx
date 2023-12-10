import "/src/components/css/Home.css"
import SectionOne from "../../components/Home/SectionOne"
import SectionTwo from "../../components/Home/SectionTwo"
import SectionThree from "../../components/Home/SectionThree"

import ScrollToTop from "../../components/globals/ScrollToTop"

export default function Homepage() {
  return (
    <div>
      <div id='home'>
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <ScrollToTop toid={"home"} h={2} />
      </div>
    </div>
  )
}
