import { useState, useEffect } from "react";
import formbricks from "@formbricks/js";

const handleClick = () => {
  formbricks.track("test-01");
};

import { MetaData } from "../../CustomComponents";
import {
  Skeleton,
} from "@mui/material";
import Hackathons from "./Hackathons";
import { Element } from "react-scroll";
const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

function HackathonsFilter() {
  const [hackathonsData, setHackathonsData] = useState([]);
  useEffect(() => {
    // Fetch data from the backend API
    const url = `${backendUrl}/hackathons`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setHackathonsData(data.results);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <MetaData path="hackathons" />
      <Element name="hackathons" className="container mx-auto contests-container z-[1]">
        {hackathonsData.length ? (
          <>
            <p className="mx-auto text-center mt-4 text-xl">
              Want hackathons from more platforms?{" "} Join our <a href="https://digitomize.com/discord" target="_blank" rel="noopener noreferrer" className="text-digitomize-bg">Discord</a> or <button className="text-digitomize-bg" onClick={handleClick}>
                click here
              </button> and let us know!
            </p>
            <p className="mx-auto text-center mt-4 text-sm underline"><i>Sorted on basis of Application close time</i></p>

            {hackathonsData.length == 0 ? (
            <>
              <h2 className="lg:text-3xl lg:my-16 md:text-2xl md:my-12 text-xl text-center my-10 mx-auto">No Hackathons Found</h2>
            </>
          ) : (
            <>
              <Hackathons hackathons={hackathonsData} />
            </>
          )}

          </>
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

export default HackathonsFilter;