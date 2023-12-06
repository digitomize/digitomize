import { Element } from "react-scroll";
import gitbookSvg from "../public/svg/GitBook.svg";
import MSMESvg from "../public/svg/MSME.svg";
import microsoftLogo from "../public/png/MS_Startups_Celebration_Badge_Dark.png";
import "./styles/Home.css"

export default function Home1() {
  return (
    <div className="homepagebg">
      <div className=" h-screen max-md:pt-4 items-center flex flex-col text-center">
        <div className="flex-row">
          <h1 className="pt-2 inline-flex flex-col md:flex-row transition font-display font-semibold max-md:text-6xl md:text-[5rem] bg-gradient-to-b from-60% bg-clip-text text-transparent from-custom-blue sm:me-4">
            <span>Compete. </span>
          </h1>
          <h1 className="pt-2 inline-flex flex-col md:flex-row transition font-display font-semibold max-md:text-6xl md:text-[5rem] bg-gradient-to-b from-60% bg-clip-text text-transparent from-custom-blue">
            <span>Develop.</span>
          </h1>
        </div>
        <h1 className="pt-2 inline-flex flex-col transition font-display font-semibold max-md:text-6xl md:text-[5rem] bg-gradient-to-b from-50% bg-clip-text text-transparent from-custom-blue">
          <span>Showcase.</span>
        </h1>

        <div className="text-center phone:text-xl max-phone:text-lg my-4 lowercase py-4 text-tagColor max-md:flex flex-col font-myFont ">
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
            <div className="md:w-3/4 bg-dark phone:mt-12">
              <p className="w-full text-center lowercase text-4xl font-normal tracking-wide pt-8">
                Supported by
              </p>
              <div className="mx-auto w-full max-w-screen-xl md:px-12 py-12">
                <div className="flex md:flex-row px-3">
                  {/* map */}
                  <div className="text-center flex md:flex-col items-center md:justify-center  md:text-center">
                    <div className="md:flex-shrink-0 flex justify-center">
                      <a href="https://www.gitbook.com/" target="_blank" rel="noreferrer">
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
                      <a href="https://msme.gov.in/" target="_blank" rel="noreferrer">
                        <div className="flex items-center justify-center ">
                          <img
                            src={MSMESvg}
                            className=" w-2/4 max-w-md"
                            alt=""
                          />
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
    </div>
  );
}
