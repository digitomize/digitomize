import { useState, useEffect } from "react";
import {
  Chip,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

import leetcode from "../assets/leetcode.svg";
import codechef from "../assets/codechef.svg";
import codeforces from "../assets/codeforces.svg";
import geeksforgeeks from "../assets/geeksforgeeks.svg";
import codingninjas from "../assets/codingninjas.png";
import Contests from "./Contests";
import { Element } from "react-scroll";
import "./css/Filter.css";
import ScrollToTop from "./ScrollToTop";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: "none",
      width: 250,
      backgroundColor: "#252525",
      color: "white",
      borderTopLeftRadius: "1px", 
      borderTopRightRadius: "1px", 
      borderBottomLeftRadius: "10px", 
      borderBottomRightRadius: "10px", 
    },
  },
};

const platformsIcon = [
  leetcode,
  codingninjas,
  geeksforgeeks,
  codechef,
  codeforces,
];
const platforms = [
  "leetcode",
  "codingninjas",
  "geeksforgeeks",
  "codechef",
  "codeforces",
];
function Filter() {
  const [contestsData, setContestsData] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [open, setOpen] = useState(false);

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

  const handleDelete = (value) => {
    let newSelectedParams = selectedPlatforms.filter(
      (platform) => platform != value
    );
    setSelectedPlatforms(newSelectedParams);
  };
  const handleChange = (e) => {
    setSelectedPlatforms(e.target.value);
    setOpen(!open);
  };
  return (
    <>
      <Element name="newHead">
        <h2 style={{ marginBottom: "5%" }}>Contests</h2>
      </Element>
      <div className={`filter-div`}>
        <FormControl
          variant="filled"
          sx={{ m: 1, minWidth: 300 }}
          className={`filter platform-container`} // to make it fixed while scroll add class "fixed" on condition "isFixed"

        >
          <InputLabel
            variant="filled"
            id="platform-select-label"
            shrink={selectedPlatforms.length == 0 ? false : true}
          >
            {selectedPlatforms.length == 0 ? "Platform" : ""}
          </InputLabel>
          <Select
            labelId="platform-select-label"
            id="platform-select"
            open={open}
            multiple
            value={selectedPlatforms}
            onClick={!open ? () => setOpen(true) : () => setOpen(false)}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected?.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    onDelete={() => handleDelete(value)}
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
             {/* All the platforms list is fetched here */}
            {platforms.map((platform, idx) => (
              <MenuItem key={platform} value={platform}>
                <ListItemIcon>
                  <img
                    src={platformsIcon[idx]}
                    alt="a"
                    style={{ width: "20px", height: "20px", marginRight: "5%" }}
                  />
                </ListItemIcon>
                <ListItemText primary={platform} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Element name="contests" className="contests-container">
        <Contests contests={contestsData} />
      </Element>
      <ScrollToTop/>
    </>
  );
}

export default Filter;
