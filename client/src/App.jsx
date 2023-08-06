import React, { useState, useEffect } from "react";
import { Element, Link } from "react-scroll";
import Contests from "./components/Contests";
import BgEllipse from "./components/BgEllipse";
import "./App.css";
import ReactGA from 'react-ga';
const TRACKING_ID = "G-E2Z30GFGEB"; // OUR_TRACKING_ID

ReactGA.initialize(TRACKING_ID);

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const [contestsData, setContestsData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    fetch(backendUrl)
      .then((response) => response.json())
      .then((data) => setContestsData(data.results))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container">
      <div className="button-container" style={{ zIndex: 0 }}>
        <BgEllipse />
        {/* Scroll to Contests button */}
        <Link to="contests" smooth={true} duration={500}>
          <button className="button">Scroll to Contests</button>
        </Link>
      </div>

      {/* Add an Element with the name "contests" */}
      <Element
        name="contests"
        className="contests-container"
        style={{ zIndex: 1 }}
      >
        <Contests contests={contestsData} />
      </Element>
    </div>
  );
}

export default App;
