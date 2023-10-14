import Filter from "./components/Filter";
import BgEllipse from "./components/BgEllipse";
import "./App.css";
import HeroSection from "./components/HeroSection";
import BottomContainer from "./components/BottomContainer";
import ReactGA from 'react-ga';
const TRACKING_ID = import.meta.env.VITE_REACT_APP_GA_ID;; // TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function App() {
  ReactGA.pageview('/');
  return (
    <div className="container">
      <BgEllipse />
        <HeroSection />
         {/* <------ Filter for Contest | STARTS------> */}
        <Filter/>
        <BottomContainer />
    </div>
  );
}

export default App;
