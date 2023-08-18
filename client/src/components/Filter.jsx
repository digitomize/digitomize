import { useState, useEffect } from 'react'
import { Chip, Box, FormControl, InputLabel, OutlinedInput, Select, MenuItem, Checkbox, ListItemText } from "@mui/material";
import Contests from './Contests';
import { Element } from "react-scroll";
import "./css/Filter.css"

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight:'none',
      width: 250,
      backgroundColor: '#252525',
      color: 'white',
      borderTopLeftRadius: '1px', // Add this line
      borderTopRightRadius: '1px', // Add this line
      borderBottomLeftRadius: '10px', // Add this line
      borderBottomRightRadius: '10px', // Add this line
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
    console.log(selectedPlatforms);
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
    {/* //checkmarks */}
      <div className={`filter-div ${isFixed ? 'fixed' : ''}`}>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }} className={`filter platform-container${isFixed ? 'fixed' : ''}`}>
          <InputLabel varianat="filled" id="platform-select-label">Platform</InputLabel>
          <Select
          
            labelId="platform-select-label"
            id="platform-select"
            multiple
            value={selectedPlatforms}
            onChange={(e) => setSelectedPlatforms(e.target.value)}
            input={<OutlinedInput placeholder="Please enter text" />}
            renderValue={(selected) => (
              selected.join(' ')
            )}
            MenuProps={MenuProps}
          >
            {/* All the platforms list is fetched here */}
            {platforms.map((platform) => (
              <MenuItem key={platform} value={platform}>
                <Checkbox checked={selectedPlatforms.indexOf(platform)>-1} />
                <ListItemText primary={platform}/>
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

export default Filter;
