import { useState, useEffect } from "react";
import { Element, Link } from "react-scroll";
import Contests from "./components/Contests";
import BgEllipse from "./components/BgEllipse";
// import Container from '@mui/material/Container';
import { Typography, Container, Chip, Box, FormControl, InputLabel, OutlinedInput, Select,MenuItem } from "@mui/material";
import "./App.css";
import { pink } from "@mui/material/colors";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const platforms = [
  "leetcode",
  "geeksforgeeks",
  "codechef",
  "codeforces"
  // Add more platforms as needed
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      backgroundColor: '#252525',
      color:'white',
      borderRadius: '10px',
    },
  },
};
function App() {
  const [contestsData, setContestsData] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    const selectedPlatformsParam = selectedPlatforms.join(",");
    const url = selectedPlatformsParam
      ? `${backendUrl}?host=${selectedPlatformsParam}`
      : backendUrl;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setContestsData(data.results))
      .catch((error) => console.error("Error fetching data:", error));
  }, [selectedPlatforms]);

  return (
    // <Container maxWidth="xl">
      <div className="container">
        <BgEllipse />
        <div className="button-container">
          <Typography variant="h1" align="center">
          Your Ultimate Contest List
          </Typography>
          {/* <h1 variant="h1">Your Ultimate Contest List</h1> */}
          <p>
            Crack the Code, Claim the Crown - Your Gateway to Coding Supremacy!
          </p>
          {/* Scroll to Contests button */}
          <Link to="newHead" smooth={true} duration={500}>
            <button className="button">
              go to contests
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="23"
                viewBox="0 0 60 23"
                fill="none"
              >
                <path d="M59.0419 13.0791C59.6379 12.5037 59.6545 11.5541 59.0791 10.9581L49.7021 1.24619C49.1267 0.650216 48.177 0.633556 47.5811 1.20898C46.9851 1.7844 46.9684 2.734 47.5439 3.32997L55.879 11.9628L47.2462 20.2979C46.6502 20.8733 46.6336 21.8229 47.209 22.4189C47.7844 23.0149 48.734 23.0315 49.33 22.4561L59.0419 13.0791ZM0.973688 12.4998L57.9737 13.4998L58.0263 10.5002L1.02631 9.50023L0.973688 12.4998Z" />
              </svg>
            </button>
          </Link>
      </div>
      
      <Element name="newHead">
        <h2>Contests</h2>
        </Element>
      {/* <------ Filter for Contest | STARTS------> */}
      <div className="filter-div">
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }} className="filter">
        <InputLabel variant="filled" id="platform-select-label">platform</InputLabel>
          <Select
          labelId="platform-select-label"
          id="platform-select"
          multiple
          value={selectedPlatforms}
          onChange={(e) => setSelectedPlatforms(e.target.value)}
          input={<OutlinedInput placeholder="Please enter text" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {platforms.map((platform) => (
            <MenuItem key={platform} value={platform}>
              {platform}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
        </div>
      {/* <------ Filter for Contest | ENDS ------> */}

        {/* Add an Element with the name "contests" */}
        <Element name="contests" className="contests-container">
          <Contests contests={contestsData} />
        </Element>
        <div className="container containerBottom">
          <div id="footer">
            <h2>Loved our project ❤️ ?</h2>
            <h2>Hey, it’s open-source!</h2>
            <h2>Consider contributing on <a href="https://github.com/pranshugupta54/digitomize" target="_blank" rel="noopener noreferrer" style={{color:'#4DA9FF'}}>GitHub</a></h2>
          </div>
        </div>
      </div>
    // </Container>
  );
}

export default App;
