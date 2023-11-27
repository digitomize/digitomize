import { Link } from "react-scroll";
import gitbookSvg from '../public/svg/GitBook.svg'
import microsoftLogo from '../public/png/MS_Startups_Celebration_Badge_Dark.png'

export default function Home1() {
  return (
    <>
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
          <Link to="second">
            <div className="lower text-center pt-8 animate-bounce my-16">
              <div className="indicator pt-4">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <section className="w-full flex justify-center">

      <div className="border-t w-3/4 border-jet bg-dark pt-8">
        <p className="w-full text-center uppercase text-4xl font-normal tracking-wide">We are trusted by</p>
        <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20 py-20">
          <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-6 ">
            {/* map */}
            <div className="text-center md:flex md:flex-col md:items-center md:justify-center  md:text-center">
              <div className="md:flex-shrink-0 flex justify-center">
                <div className="flex items-center justify-center ">
                  <img src={gitbookSvg} className="w-3/4" alt="" />
                </div>
              </div>
              <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                <p className="mt-3 text-small tracking-wide text-muted-foreground">community partner</p>
              </div>
            </div>
            <div className="text-center md:flex md:items-center md:justify-center  md:text-center">
              <div className="md:flex-shrink-0 flex justify-center">
                <div className="flex items-center justify-center ">
                  <img src={microsoftLogo} className=" w-3/4 max-w-md" alt="" />

                </div>
              </div>
            </div>
            {/* map end */}
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
