import React, { useState, useEffect } from 'react';
import Contests from './components/Contests';

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
    <div>
      <h1>Contests List</h1>
      <Contests contests={contestsData} />
    </div>
  );
}

export default App;
