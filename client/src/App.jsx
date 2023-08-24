import { Element } from "react-scroll";

import Filter from "./components/Filter";
import BgEllipse from "./components/BgEllipse";

import "./App.css";
import HeroSection from "./components/HeroSection";
import BottomContainer from "./components/BottomContainer";

function App() {
  return (
    <div className="container">
      <BgEllipse />
        <HeroSection />
        <Element name="newHead">
          <h2 style={{marginBottom:'5%'}}>Contests</h2>
        </Element>
        
        {/* <------ Filter for Contest | STARTS------> */}
        <Filter/>

        <BottomContainer />
    </div>
  );
}

export default App;
