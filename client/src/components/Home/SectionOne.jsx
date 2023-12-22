// import { Element } from "react-scroll";

import { Link } from "react-router-dom";
import gitbook from "./svgs/GitBookLight.svg";
import msme from "./svgs/MSME.svg";
import microsoft from "./svgs/microsoft4strp.svg";
import digitalOcean from "./svgs/digitalOcean.svg";
import "/src/components/css/globals.css";
import { Star } from "@mui/icons-material";
import React, { useState, useEffect, useRef } from "react";
import BIRDS from "vanta/dist/vanta.birds.min";
import * as THREE from "three";

export default function SectionOne() {

  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRDS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 600.0,
          minWidth: 600.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0x06090e,
          backgroundAlpha: 0.1,
          quantity: 3.00,
          birdSize: 1.40,
          wingSpan: 35.00,
          speedLimit: 3.00,
          separation: 100.00,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} className="bg-image-remove font-['Geist'] xl:pt-8 max-md:pt-4 items-center flex flex-col text-center phone:mt-16">
      <Link to="https://github.com/digitomize/digitomize" className="flex justify-center items-center border border-badge bg-badge text-badge-txt px-6 py-1 rounded-full text-xs">
        We're open source | Star Now! <Star fontSize="small" />
      </Link>
      <div className="w-10/12">
        <h1 className="mt-2 text-white max-md:text-4xl md:text-7xl">
          <span>One place for all your</span>
          <span className="block mt-1 md:mt-6">
            <span className="bg-digitomize-bg px-2 rounded-md">coding platforms</span>{" "}
            needs
          </span>{" "}
        </h1>
        <p className="text-description max-sm:text-sm sm:text-md md:text-xl mt-6">
          Elevate your coding and development journey with digitomize
        </p>
      </div>
      <div className="flex justify-center phone:mt-16 mt-8">
        <Link to="/signup" className="btn px-5 py-2 bg-button-primary border-button-primary-helper hover:bg-button-primary-hover text-lg text-white font-medium duration-75 rounded-2xl border">
          Register Now
        </Link>
      </div>
      <div className="mt-14">
        <span>
          <p className="text-lg text-powered">Supported By</p>
        </span>
        <span className="flex flex-row flex-wrap gap-4 items-center justify-center">
          <a href="https://m.do.co/c/db7dbc698e16">
            <img
              className="max-md:w-36 md:w-44"
              src={digitalOcean}
              draggable={false}
              alt="microsoft"
            />
          </a>
          <img
            className="max-md:w-32 md:w-40"
            src={microsoft}
            draggable={false}
            alt="microsoft"
          />
          <img
            className="max-md:w-32 md:w-40"
            src={gitbook}
            draggable={false}
            alt="gitbook"
          />
          <img
            className="w-15 sm:w-25 md:w-30"
            src={msme}
            draggable={false}
            alt="msme"
          />


        </span>
      </div>
    </div>
  );
}
