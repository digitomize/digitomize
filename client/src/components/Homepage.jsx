import "./css/Home.css";
import SectionOne from "./Home/SectionOne";
import SectionTwo from "./Home/SectionTwo";
import SectionThree from "./Home/SectionThree";
import Footer from "./Footer";

import ScrollToTop from "./ScrollToTop";

export default function Homepage() {
  return (
    <div>
      <div id="home">
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <ScrollToTop toid={"home"} h={2} />
      </div>
      <Footer />
    </div>
  );
}
