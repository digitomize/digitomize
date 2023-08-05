import React, { useState, useEffect } from 'react';
import { Element, Link } from 'react-scroll';
import Contests from './components/Contests';
import BgEllipse from './components/BgEllipse';
import './styles.css';

function App() {
  const [contestsData, setContestsData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API (assuming it's running on localhost:4001)
    fetch('http://localhost:4001/api/contests')
      .then((response) => response.json())
      .then((data) => setContestsData(data.results))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="container">
      <div className="button-container">
        <BgEllipse/>
        {/* Scroll to Contests button */}
        <Link to="contests" smooth={true} duration={500}>
          <button className="button">Scroll to Contests</button>
        </Link>
      </div>

      {/* Add an Element with the name "contests" */}
      <Element name="contests" className="contests-container">
        <Contests contests={contestsData} />
      </Element>
    </div>
  );
}

export default App;
