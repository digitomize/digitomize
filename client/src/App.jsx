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
        {/* <------ Filter for Contest | STARTS------> */}
        <Filter/>
        <BottomContainer />
    </div>
  );
}

export default App;
