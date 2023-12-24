import React, { useState, useEffect } from "react";
import Snowfall from "react-snowfall";
import "/src/components/css/Home.css";
import SectionOne from "../../components/Home/SectionOne";
import SectionTwo from "../../components/Home/SectionTwo";
import SectionThree from "../../components/Home/SectionThree";
import Footer from "../../components/globals/Footer";

import { MetaData } from "../../components/CustomComponents";

import ScrollToTop from "../../components/globals/ScrollToTop";

import SnowFlakes from "../../components/Home/components/SnowFlakes";


export default function Homepage() {
  const [isSnowfallActive, setSnowfallActive] = useState(true);

  // useEffect(() => {
  //   if (isSnowfallActive) {
  //     // Automatically disable snowfall after 5 seconds
  //     const timeoutId = setTimeout(() => {
  //       setSnowfallActive(false);
  //     }, 5000);

  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [isSnowfallActive]);

  return (
    <>
      <MetaData path="home" />
      <div>
        <div id="home" className="antialiased">
          {isSnowfallActive && <Snowfall snowflakeCount={70} speed={[0, 0.7]} wind={[0, 0.5]} />}
          <SnowFlakes onClick={() => setSnowfallActive(!isSnowfallActive)} position="top-left" />
          <SnowFlakes onClick={() => setSnowfallActive(!isSnowfallActive)} position="bottom-right" />
          <SectionOne />
          <SectionTwo />
          <SectionThree />
          <ScrollToTop toid={"home"} h={2} />
        </div>
        {/* <Footer /> */}
      </div>
    </>
    // <div id="home" className="antialiased">
    //   {isSnowfallActive && <Snowfall snowflakeCount={70} speed={[0, 0.7]} wind={[-0.5, 0.5]} />}
    //   <SnowFlakes onClick={toggleSnowfall} position="top-left" />
    //   <SnowFlakes onClick={toggleSnowfall} position="bottom-right" />
    //   <SectionOne />
    //   <SectionTwo />
    //   <SectionThree />
    //   <ScrollToTop toid={"home"} h={2} />
    // </div>
  );
}
