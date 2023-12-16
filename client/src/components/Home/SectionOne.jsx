// import { Element } from "react-scroll";

import gitbook from "./svgs/GitBook.svg";
import msme from "./svgs/MSME.svg";
import microsoft from "./svgs/microsoft.svg";
import "/src/components/css/globals.css";
import { Star } from "@mui/icons-material";

export default function SectionOne() {
  return (
    <div className="font-['Geist'] xl:pt-8 max-md:pt-4 items-center flex flex-col text-center phone:mt-16">
      <span className="flex justify-center items-center border border-badge bg-badge text-badge-txt px-6 py-1 rounded-full text-xs">
        We're open source | Star Now! <Star fontSize="small"/>
      </span>
      <div className="w-10/12">
        <h1 className="mt-2 text-white max-md:text-4xl md:text-7xl">
          <span>One place for all your</span>
          <span className="block mt-1 md:mt-6">
            <span className="bg-digitomize-bg px-2">coding platforms</span>{" "}
            needs
          </span>{" "}
        </h1>
        <p className="text-description max-sm:text-sm sm:text-md md:text-xl mt-6">
          Elevate your coding and development journey with digitomize
        </p>
      </div>
      <div className="flex justify-center phone:mt-16 mt-8">
        <button className="px-5 py-2 bg-button-primary border-button-primary-helper hover:bg-button-primary-hover text-lg text-white font-medium duration-75">
          <a href="/signup">Register Now</a>
        </button>
      </div>
      <div className="mt-14">
        <span>
          <p className="text-lg text-powered">Powered By</p>
        </span>
        <span className="flex flex-row flex-wrap space-x-3 mt-2 items-center justify-center">
          <img
            className="w-15 sm:w-25 md:w-30"
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
            className="w-30"
            src={microsoft}
            draggable={false}
            alt="microsoft"
          />
        </span>
      </div>
    </div>
  );
}
