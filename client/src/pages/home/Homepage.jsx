import React, { useState, useEffect } from "react";
import Snowfall from "react-snowfall";
import "/src/components/css/Home.css";
import SectionOne from "../../components/Home/SectionOne";
import SectionTwo from "../../components/Home/SectionTwo";
import SectionThree from "../../components/Home/SectionThree";
import Footer from "../../components/globals/Footer";
import ScrollToTop from "../../components/globals/ScrollToTop";

import snowFlakesImages from "../../assets/snowflake.svg";

const SnowFlakes = ({ x, y }) => {
  const treeStyle = {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    width: "100px",
    height: "100px",
    backgroundImage: `url(${snowFlakesImages})`,
    backgroundSize: "cover",
  };

  return <div className="snowflakes" style={treeStyle}></div>;
};

export default function Homepage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [treePositions, setTreePositions] = useState([
    { x: 100, y: 550 },
    { x: 1150, y: 200 },
    { x: 300, y: 100 },
    { x: 1290, y: 450 },
  ]);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });

    // Update tree positions based on mouse movement
    setTreePositions((prevPositions) =>
      prevPositions.map((pos) => ({
        x: pos.x + (e.clientX - mousePosition.x) * 0.02,
        y: pos.y + (e.clientY - mousePosition.y) * 0.02,
      }))
    );
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mousePosition]);

  return (
    <div>
      <div id="home" className="antialiased">
        <Snowfall snowflakeCount={150} />
        {treePositions.map((pos, index) => (
          <SnowFlakes key={index} x={pos.x} y={pos.y} />
        ))}
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <ScrollToTop toid={"home"} h={2} />
      </div>
      <Footer />
    </div>
  );
}
