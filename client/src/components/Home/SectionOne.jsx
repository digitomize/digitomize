import { Element } from "react-scroll";
import gitbookSvg from "./svgs/GitBook.svg";
import MSMESvg from "./svgs/MSME.svg";
import microsoftLogo from "./pngs/MS_Startups_Celebration_Badge_Dark.png";

export default function SectionOne() {
  return (
    <div className="hero h-screen xl:pt-8 max-md:pt-4 items-center flex flex-col text-center">
      <div className="max-md:hidden divider sticky my-0"></div>
      <div className="flex-row">
        <h1 className="pt-4 mt-0 sm:mt-2 inline-flex flex-col md:flex-row transition font-display max-md:text-6xl md:text-[7rem] bg-gradient-to-b from-60% bg-clip-text text-transparent from-custom-blue sm:me-4">
          <span>compete. </span>
        </h1>
        <h1 className="pt-4 mt-0 sm:mt-2 inline-flex flex-col md:flex-row transition font-display max-md:text-6xl md:text-[7rem] bg-gradient-to-b from-60% bg-clip-text text-transparent from-custom-blue">
          <span>develop.</span>
        </h1>
      </div>
      <h1 className="pt-4 mt-0 sm:mt-2 inline-flex flex-col transition font-display max-md:text-6xl md:text-[7rem] bg-gradient-to-b from-50% bg-clip-text text-transparent from-custom-blue">
        <span>showcase.</span>
      </h1>

      <div className="text-center phone:text-4xl max-phone:text-2xl my-4 lowercase py-4 text-tagColor max-md:flex flex-col font-myFont ">
        <span> Elevate Your Coding and Development Journey</span>{" "}
        <span> with </span> <span>Digitomize</span>
        {/* <Link to="second">
            <div className="lower text-center pt-8 animate-bounce my-16">
              <div className="indicator pt-4">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </Link> */}
      </div>

      <Element name="supporters">
        <section className="w-full flex justify-center">
          <div className="border-t md:w-3/4 border-jet bg-dark phone:mt-12">
            <p className="w-full text-center lowercase text-4xl font-normal tracking-wide pt-8">
              Supported by
            </p>
            <div className="mx-auto w-full max-w-screen-xl md:px-12 py-12">
              <div className="flex md:flex-row px-3">
                {/* map */}
                <div className="text-center flex md:flex-col items-center md:justify-center  md:text-center">
                  <div className="md:flex-shrink-0 flex justify-center">
                    <a
                      href="https://www.gitbook.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="flex items-center justify-center ">
                        <img
                          src={gitbookSvg}
                          className="max-phone:w-full w-3/4"
                          alt=""
                        />
                      </div>
                    </a>
                  </div>
                </div>
                <div className="text-center md:flex md:items-center md:justify-center  md:text-center">
                  <div className="md:flex-shrink-0 flex justify-center">
                    <a
                      href="https://www.microsoft.com/en-us/startups"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="flex items-center justify-center ">
                        <img
                          src={microsoftLogo}
                          className="w-3/4 max-w-md"
                          alt=""
                        />
                      </div>
                    </a>
                  </div>
                </div>
                <div className="text-center md:flex md:items-center md:justify-center  md:text-center">
                  <div className="md:flex-shrink-0 flex justify-center">
                    <a
                      href="https://msme.gov.in/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="flex items-center justify-center ">
                        <img src={MSMESvg} className=" w-2/4 max-w-md" alt="" />
                      </div>
                    </a>
                  </div>
                </div>
                {/* map end */}
              </div>
            </div>
          </div>
        </section>
      </Element>
    </div>
  );
}
