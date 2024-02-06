import React, { useState, useEffect } from "react";
import Snowfall from "react-snowfall";

import "@components/css/Home.css";
import SectionOne from "@components/Home/SectionOne";
import SectionTwo from "@components/Home/SectionTwo";
import SectionThree from "@components/Home/SectionThree";
import Footer from "@components/globals/Footer";

import { MetaData } from "@components/CustomComponents";

import ScrollToTop from "@components/globals/ScrollToTop";



export default function Homepage() {

  return (
    <>
      <MetaData path="home" />
      <div>
        <div id="home" className="antialiased">
          <Snowfall snowflakeCount={50} speed={[0.2, 0.5]} wind={[-0.2, 0]} style={{ position: "fixed", z: -1 }} />

          <SectionOne />
          <SectionTwo />
          <SectionThree />
          <ScrollToTop toid={"home"} h={2} />
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}
