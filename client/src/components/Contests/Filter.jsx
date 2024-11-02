import { useState, useEffect } from "react";
import formbricks from "@formbricks/js/website";
import { motion } from "framer-motion"; 

const handleClick = () => {
  formbricks.track("test-01");
};

if (typeof window !== "undefined") {
  formbricks.init({
    environmentId: import.meta.env.VITE_REACT_APP_FORMBRICKS_ENV_ID,
    apiHost: "https://app.formbricks.com",
  });
}

import { MetaData } from "../CustomComponents";
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
    const selectedPlatformsParam = selectedPlatforms.join(",");
    const url = selectedPlatformsParam
      ? `${backendUrl}/contests?host=${selectedPlatformsParam}`
      : `${backendUrl}/contests`;
      
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let maxDuration = data.results?.reduce((max, current) => {
          return current && current.duration > max ? current.duration : max;
        }, data.results[0]?.duration);
        setMaxValue(maxDuration);
        setContestsData(data.results);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [selectedPlatforms]);

  const handleDelete = (value) => {
    const newSelectedParams = selectedPlatforms.filter(
      (platform) => platform !== value,
    );
    setSelectedPlatforms(newSelectedParams);
  };

  const handleChange = (e) => {
    setSelectedPlatforms(e.target.value);
    setOpen(!open);
  };

  return (
    <>
      <MetaData path="contests" />
      <Element className="phone:mt-8 flex lg:flex-row max-lg:flex-col justify-between mx-auto lg:bg-cardsColor py-3 px-2 w-[90%] rounded-xl items-center">
        <motion.div
          className={"filter-div w-fit self-center bg-cardsColor relative rounded-xl"}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <FormControl
            variant="filled"
            sx={{ m: 1, minWidth: 300 }}
            className={"filter bg-filter rounded-lg platform-container max-sm:justify-center"}
          >
            <InputLabel
              variant="filled"
              id="platform-select-label"
              shrink={selectedPlatforms.length === 0 ? false : true}
            >
              {selectedPlatforms.length === 0 ? "Platform" : ""}
            </InputLabel>
            <Select
              labelId="platform-select-label"
              id="platform-select"
              open={open}
              multiple
              value={selectedPlatforms}
              onClick={() => setOpen(!open)}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected?.map((value) => (
                    <motion.div
                      key={value}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Chip
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
                    </motion.div>
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {platforms.map((platform, idx) => (
                <MenuItem key={platform} value={platform}>
                  <ListItemIcon>
                    <img
                      src={platformsIcon[idx]}
                      alt={platform}
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <CustomSlider setRange={setRange} maxValue={maxValue} />
        </motion.div>
      </Element>

      <Element name="contests" className="container mx-auto contests-container z-[1]">
        {contestsData.length ? (
          <>
            <p className="mx-auto text-center mt-4 text-xl">
              Have a favorite contest platform we're missing? {" "}
              Join our <a href="https://digitomize.com/discord" target="_blank" rel="noopener noreferrer" className="text-digitomize-bg">Discord</a> or 
              <button className="text-digitomize-bg" onClick={handleClick}> click here</button> and let us know!
            </p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Contests contests={contestsData} range={range} />
            </motion.div>
          </>
        ) : (
          <motion.div
            className="m-auto flex sm:flex-row flex-col items-center w-4/5 my-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {[...Array(3)].map((_, i) => (
              <Skeleton
                key={i}
                variant="text"
                sx={{ fontSize: "3rem", bgcolor: "grey.600", minHeight: "250px" }}
                className="mx-4 sm:w-80 w-full"
              />
            ))}
          </motion.div>
        )}
      </Element>
    </>
  );
}

export default Filter;
