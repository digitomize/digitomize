import React, { useState, useEffect } from "react";
import Snowfall from "react-snowfall";
import "/src/components/css/Home.css";
import SectionOne from "../../components/Home/SectionOne";
import SectionTwo from "../../components/Home/SectionTwo";
import SectionThree from "../../components/Home/SectionThree";
import Footer from "../../components/globals/Footer";
import ScrollToTop from "../../components/globals/ScrollToTop";

import snowFlakesImages from "../../assets/snowflake.svg";

const SnowFlakes = ({ onClick, position }) => {
  const snowflakeStyle = {
    position: "absolute",
    width: "80px",
    height: "80px",
    backgroundImage: `url(${snowFlakesImages})`,
    backgroundSize: "cover",
  };

  if (position === "top-left") {
    snowflakeStyle.left = "100px";
    snowflakeStyle.top = "50px";
  } else if (position === "bottom-right") {
    snowflakeStyle.right = "100px";
    snowflakeStyle.bottom = "0";
  }

  return <div className="snowflakes" style={snowflakeStyle} onClick={onClick}></div>;
};

export default function Homepage() {
  const [isSnowfallActive, setSnowfallActive] = useState(false);

  const toggleSnowfall = () => {
    setSnowfallActive(!isSnowfallActive);
  };

  useEffect(() => {
    if (isSnowfallActive) {
      // Automatically disable snowfall after 5 seconds
      const timeoutId = setTimeout(() => {
        setSnowfallActive(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [isSnowfallActive]);

  return (
    <div>
      <div id="home" className="antialiased">
        {isSnowfallActive && <Snowfall snowflakeCount={150} />}
        <SnowFlakes onClick={toggleSnowfall} position="top-left" />
        <SnowFlakes onClick={toggleSnowfall} position="bottom-right" />
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <ScrollToTop toid={"home"} h={2} />
      </div>
      <Footer />
    </div>
  );
}
