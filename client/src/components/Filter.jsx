import React, { useState, useEffect } from 'react'
import { Chip, Box, FormControl, InputLabel, OutlinedInput, Select, MenuItem } from "@mui/material";
import Contests from './Contests';
import { Element, Link } from "react-scroll";
import "./css/Filter.css"

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      backgroundColor: '#252525',
      color: 'white',
      borderRadius: '10px',
    },
  },
};

const platforms = [
  "leetcode",
  "geeksforgeeks",
  "codechef",
  "codeforces"
  // Add more platforms as needed
];
function Filter() {
  const [contestsData, setContestsData] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 908) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    <>
      <div className={`filter-div ${isFixed ? 'fixed' : ''}`}>
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
      <Element name="contests" className="contests-container">
        <Contests contests={contestsData} />
      </Element>

    </>
  )
}

export default Filter
