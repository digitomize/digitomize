import "./css/NewHome.css";
import React from "react";
import { useState } from "react";
import "daisyui";
import Home from "./Home";
import NewNavbar from "./NewNavbar";
import Test from "./MobNav";

// import { useLocation } from "react-router-dom";
import { Element, Link } from "react-scroll";

export default function NewHome() {
  // const location = useLocation();
  return (
    <div>
      <div>
        <div className="mx-auto text-center px-6 md:px-8">
          <h1 className="inline-flex flex-col transition font-display md:text-[8rem] bg-gradient-to-r from-60% bg-clip-text text-transparent from-custom-blue">
            <span>Compete. Develop.</span>
            {/* <span>Showcase.</span> */}
          </h1>
          <h1 className="mt-2 inline-flex flex-col transition font-display md:text-[8rem] bg-gradient-to-r from-60% bg-clip-text text-transparent from-custom-blue">
            {/* <span>Compete. Develop.</span> */}
            <span>Showcase.</span>
          </h1>
        </div>

        <Link to="second">
          <div className="lower text-center">
            {/* <Test/> */}
            <div className="indicator">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </Link>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Element name="second">
          <div className="mx-auto text-center px-6 md:px-8">
            <h1 className="inline-flex flex-col transition font-display md:text-[8rem] bg-gradient-to-r from-60% bg-clip-text text-transparent from-blue-600">
              <span>Page2.</span>
              {/* <span>Showcase.</span> */}
            </h1>
            <h1 className="mt-2 inline-flex flex-col transition font-display md:text-[8rem] bg-gradient-to-r from-60% bg-clip-text text-transparent from-blue-600">
              {/* <span>Compete. Develop.</span> */}
              <span>Showcase.</span>
            </h1>
          </div>
          <div className="mockup-phone">
            <div className="camera"></div>
            <div className="display">
              <div className="artboard artboard-demo phone-1">
                {/* <Home/> */}
              </div>
            </div>
          </div>
        </Element>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}
