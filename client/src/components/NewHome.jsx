import "./css/NewHome.css";
import HomePage1 from "./HomePage1";
import HomePage2 from "./HomePage2";
import HomePage3 from "./HomePage3";
import NewFooter from "./NewFooter";

import ScrollToTop from "./ScrollToTop";

export default function NewHome() {
  return (
    <div>
      <div id="home">
        <HomePage1 />
        <HomePage2 />
        <HomePage3 />
        <ScrollToTop toid={"home"} h={2} />
      </div>
      <NewFooter />
    </div>
  );
}
