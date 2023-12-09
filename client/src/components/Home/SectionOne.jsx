// import { Element } from "react-scroll";

import gitbook from "./svgs/GitBook.svg";
import msme from "./svgs/MSME.svg";
import microsoft from "./svgs/microsoft.svg";
import "/src/components/css/globals.css"


export default function SectionOne() {
  return (
    <div className="font-['Geist'] xl:pt-8 max-md:pt-4 items-center flex flex-col text-center mt-20">
      <span className="flex justify-center border border-badge bg-badge text-badge-txt px-6 py-1 rounded-full">Contribute to Digitomize</span>
      <div className="-mt-5">
        <h1 className="text-white text-7xl"><span>One place for all your</span><span className="block mt-6"><span className="bg-digitomize-bg px-2">coding platforms</span> needs</span> </h1>
        <p className="text-paragraph text-xl mt-6">Elevate your coding and development journey with digitomize</p>
      </div>
      <div className="flex justify-center mt-16"><button className="px-5 py-2 bg-button-primary border-button-primary-helper text-lg text-white font-medium"><a href="/signup">Register Now</a></button></div>
      <div className="mt-14">
        <span><p className="text-lg text-powered">Powered By</p></span>
        <span className="flex flex-row space-x-3 mt-2 items-center">
          <img className="w-30" src={gitbook} draggable={false} alt="gitbook" />
          <img className="w-30" src={msme} draggable={false} alt="msme" />
          <img className="w-30" src={microsoft} draggable={false} alt="microsoft" />
        </span>
      </div>
    </div>
  );
}
