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
  Skeleton,
} from "@mui/material";
import {
  geeksforgeeks,
  leetcode,
  codingninjas,
  codechef,
  atcoder,
  codeforces,
} from "../AllAssets";
import Contests from "../Contests";
import { Element } from "react-scroll";
import CustomSlider from "../CustomSlider";
const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
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
  atcoder,
];
const platforms = [
  "leetcode",
  "codingninjas",
  "geeksforgeeks",
  "codechef",
  "codeforces",
  "atcoder",
];
function Filter() {
  const [contestsData, setContestsData] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState([0, 0]);
  const [maxValue, setMaxValue] = useState(Number);
  useEffect(() => {
    // Fetch data from the backend API
    const selectedPlatformsParam = selectedPlatforms.join(",");
    const url = selectedPlatformsParam
      ? `${backendUrl}/contests?host=${selectedPlatformsParam}`
      : `${backendUrl}/contests`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let maxDuration = data.results?.reduce((max, current) => {
          if (current && current.duration > max) {
            return current.duration;
          } else {
            return max;
          }
        }, data.results[0]?.duration);
        setMaxValue(maxDuration);
        setContestsData(data.results);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [selectedPlatforms]);

  const handleDelete = (value) => {
    let newSelectedParams = selectedPlatforms.filter(
      (platform) => platform != value,
    );
    setSelectedPlatforms(newSelectedParams);
  };
  const handleChange = (e) => {
    setSelectedPlatforms(e.target.value);
    setOpen(!open);
  };
  return (
    <>
      <Element
        name="allContests"
        className="flex md:flex-row flex-col justify-between mt-12"
      >
      </Element>
      <Element className=" flex lg:flex-row max-lg:flex-col justify-between mx-auto lg:bg-cardsColor py-3 px-2 w-[90%] rounded-xl items-center">
        {/* //checkmarks */}
        <div
          className={"filter-div w-fit self-center bg-cardsColor relative rounded-xl"}
        >
          <FormControl
            variant="filled"
            sx={{ m: 1, minWidth: 300 }}
            className={"filter bg-filter rounded-lg platform-container max-sm:justify-center"} // to make it fixed while scroll add class "fixed" on condition "isFixed"
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
              input={<OutlinedInput id="select-multiple-chip" label="" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected?.map((value) => (
                    <Chip
                    key={value}
                    label={
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={platformsIcon[platforms.indexOf(value)]}
                          alt={value}
                          style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "5%",
                          }}
                        />
                        {value}
                      </span>
                    }
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
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "5%",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={platform} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <CustomSlider setRange={setRange} maxValue={maxValue} />
      </Element>
      <Element name="contests" className="container mx-auto contests-container z-[1]">
        {contestsData.length ? (
          <Contests contests={contestsData} range={range} />
        ) : (
          <div className="m-auto flex sm:flex-row flex-col items-center w-4/5 my-12 ">
            <Skeleton
              variant="text"
              sx={{ fontSize: "3rem", bgcolor: "grey.600", minHeight: "250px" }}
              className="mx-4 sm:w-80 w-full"
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "3rem", bgcolor: "grey.600", minHeight: "250px" }}
              className="mx-4 sm:w-80 w-full"
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "3rem", bgcolor: "grey.600", minHeight: "250px" }}
              className="mx-4 sm:w-80 w-full"
            />
          </div>
        )}
      </Element>
    </>
  );
}

export default Filter;
