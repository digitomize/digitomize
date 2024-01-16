// import { Element } from "react-scroll";

import { Link } from "react-router-dom";
import gitbook from "./svgs/GitBookLight.svg";
import msme from "./svgs/MSME.svg";
import microsoft from "./svgs/microsoft4strp.svg";
import digitalOcean from "./svgs/digitalOcean.svg";
import meltcd from "../../assets/meltcd.png";
import { Star } from "@mui/icons-material";


export default function SectionOne() {
  return (
    <div className="font-['Geist'] xl:pt-8 max-md:pt-4 items-center flex flex-col text-center phone:mt-16">
      <Link to="https://github.com/digitomize/digitomize" className="flex justify-center items-center border border-badge bg-badge text-badge-txt px-6 py-1 rounded-full text-xs">
        We're open source | Star Now! <Star fontSize="small" />
      </Link>
      <div className="w-10/12">
        <h1 className="mt-2 text-white max-md:text-4xl md:text-7xl">
          <span>One place for all your</span>
          <span className="block mt-1 md:mt-6 relative">
            <span className="bg-digitomize-bg px-2 relative">
              <span className="relative z-10">
                {/* <img src={santaHat} className="absolute -rotate-45 transform h-16 w-16 -left-2 top-[-10%]" alt="Santa Hat" /> */}
                coding platforms
              </span>
            </span>{" "}
            needs
          </span>
          {" "}
        </h1>
        <p className="text-description max-sm:text-sm sm:text-md md:text-xl mt-6">
          Elevate your coding and development journey with digitomize
        </p>
      </div>
      <div className="flex justify-center phone:mt-16 mt-8">
        <a href="/signup" className="btn px-5 py-2 bg-button-primary border-button-primary-helper hover:bg-button-primary-hover text-lg text-white font-medium duration-75 rounded-2xl border">
          Register Now
        </a>
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
          <img
            className="max-md:w-32 md:w-40"
            src={meltcd}
            draggable={false}
            alt="meltcd"
          />


        </span>
      </div>
    </div>
  );
}
