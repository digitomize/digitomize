import { Element } from "react-scroll";
import { Link } from "react-router-dom";
import ContestCards from "../ContestCards";

export default function SectionThree() {
  return (
    <Element name="third">
      <div className="hero min-h-screen flex flex-row w-10/12 mx-auto">
        <div className="left phone:w-2/5 flex justify-center">
          <div className="max-phone:hidden max-w-[40vw]">
            <ContestCards />
          </div>
        </div>
        <div className="right phone:w-3/5 flex flex-col z-10">
          <div className="phone:text-right max-phone:text-center">
            <h1 className="sm:text-8xl max-smtext-5xl my-0 font-medium">
              upcoming{" "}
              <span className="text-custom-blue font-bold">contest</span> list
            </h1>
          </div>
          <div className="description">
            <p className="py-6 font-['Source Code Pro'] text-xl phone:text-right max-phone:text-center">
              Filter contests based on various criteria and view contest details
              such as remaining time, duration, and more.
            </p>
          </div>
          <div className="button phone:ml-auto phone:mr-[20%] max-phone:mx-auto">
            <Link to="/contests">
              <button
                data-theme="mytheme"
                className="btn btn-outline text-custom-blue lowercase hover:bg-custom-blue hover:border-custom-blue hover:animate-none hover:scale-110"
              >
                explore contests
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Element>
  );
}
