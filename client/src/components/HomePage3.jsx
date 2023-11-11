import { Element } from "react-scroll";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home2() {

  return (
    <Element name="third">
      <div className="hero min-h-screen">
        <div className="text-center">

          <h1 className="sm:text-8xl max-smtext-5xl my-0 font-medium max-sm:min-h-[100px] sm:min-h-[300px]">
            upcoming <span className="text-custom-blue font-bold">contest</span>{" "}
            list
          </h1>
          <a href="/contests">
            <button
              data-theme="mytheme"
              className="btn btn-outline text-custom-blue lowercase hover:bg-custom-blue hover:border-custom-blue mt-12 hover:animate-none hover:scale-110"
            >
              explore
            </button>
          </a>
        </div>
      </div>
    </Element>
  );
}
