import { Link } from "react-scroll";

import Typewriter from "typewriter-effect";

import Filter from "../components/Filter";
import ScrollToTop from "./ScrollToTop";

function Home() {

  return (
    <div className="container flex flex-col mx-auto scroll-smooth">
      <div className="button-container scroll-smooth h-[85vh] flex flex-col justify-center items-center z-[1] max-md:h-[80vh] max-md:mb-12 max-md:mt-8">

        <h1 className="font-['Outfit'] text-center mt-0 md:text-8xl font-extrabold tracking-wide lowercase text-white max-md:text-7xl">Your Ultimate Contest List</h1>
        <p className="text-center text-2xl font-light mb-8">
          <Typewriter
            options={{ loop: true, delay: 100 }}
            onInit={(typewriter) => {
              typewriter
                .typeString(`#include "contests/upcoming"`)
                .pauseFor(10000)
           
                .start();
            }}
          />
        </p>

        {/* Scroll to Contests button */}
        <Link to="allContests">
          <button className="btn md:min-w-96 h-24 bg-black border-2 hover:border-[#D1E5F4] border-[#D1E5F4] shadow-[7px_7px_0px_#D1E5F4] text-white rounded-xl cursor-pointer md:text-4xl font-medium flex flex-col items-center justify-center mt-8 max-md:w-80 max-md:text-2xl lowercase scroll-smooth flex-nowrap hover:scale-110">
            <span className="pt-2">contests </span>
            <svg className="animate-bounce" fill="#ffffff" height="151px" width="151px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" viewBox="-13.2 -13.2 356.40 356.40" xml: space="preserve" stroke="#ffffff" stroke-width="0.0033" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"></path> </g></svg>
          </button>
        </Link>
      </div>
      {/* <------ Filter for Contest | STARTS------> */}
      <Filter />
      <div className="divider"></div>
      <ScrollToTop toid={"allContests"} h={1} />
    </div>
  );
}

export default Home;
