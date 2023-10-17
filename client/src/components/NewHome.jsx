import "./css/NewHome.css";
import React from "react";
import "daisyui";
import Filter from "./Filter";
import HomePage1 from "./HomePage1";
import HomePage2 from "./HomePage2";

import { 
  Element
 } from "react-scroll";
 
import ScrollToTop from "./ScrollToTop";

export default function NewHome() {

  return (
    <div>
      <div id="home" >
        <HomePage1/>
        <HomePage2/>

        <Element style={{ textAlign: "center" }}>
          <div className="mx-auto text-center px-6 md:px-8">
            <h1 className="inline-flex flex-col transition font-display md:text-[8rem] bg-gradient-to-r from-60% bg-clip-text text-transparent from-blue-600">
              <span>Page2.</span>
         
            </h1>
            <h1 className="mt-2 inline-flex flex-col transition font-display md:text-[8rem] bg-gradient-to-r from-60% bg-clip-text text-transparent from-blue-600">
      
              <span>Showcase.</span>
            </h1>
          </div>
          <div className="mockup-phone">
            <div className="camera"></div>
            <div className="display">
              <div className="artboard artboard-demo phone-1 overflow-y-auto">
                <Filter />
              </div>
            </div>
          </div>
        </Element>
        <ScrollToTop toid={"home"} h={2} />
      </div>
    </div>
  );
}
