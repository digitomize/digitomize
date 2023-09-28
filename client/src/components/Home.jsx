import { Element, Link } from "react-scroll";

import { Typography } from "@mui/material";
import Typewriter from "typewriter-effect";

import Filter from "../components/Filter";
import BgEllipse from "../components/BgEllipse";

// import "./css/Home.css"

function Home() {

  return (
    <div className="container flex flex-col mx-auto scroll-smooth">
      {/* <BgEllipse /> */}
      <div className="button-container scroll-smooth h-[85vh] flex flex-col justify-center items-center z-[1] max-md:h-[80vh] max-md:mb-12 max-md:mt-8">
        {/* <Typography variant="h1" align="center"> */}
          <h1 className="font-['Outfit'] text-center mt-0 md:text-8xl font-extrabold tracking-wide lowercase text-white max-md:text-7xl">Your Ultimate Contest List</h1>
        {/* </Typography> */}

        <p className="text-center text-2xl font-light mb-8">
          <Typewriter
            options={{ loop: true, delay: 100 }}
            onInit={(typewriter) => {
              typewriter
                .typeString(`#include "contests/upcoming"`)
                .pauseFor(10000)
                // .typeString("Welcomes You")
                .start();
            }}
          />
        </p>

        {/* Scroll to Contests button */}
        <Link to="allContests">
          <button className="btn md:min-w-96 h-24 bg-black border-2 hover:border-[#D1E5F4] border-[#D1E5F4] shadow-[7px_7px_0px_#D1E5F4] text-white rounded-xl cursor-pointer md:text-4xl font-medium flex flex-col items-center justify-center mt-8 max-md:w-80 max-md:text-2xl lowercase scroll-smooth flex-nowrap hover:scale-110">
            <span className="pt-2">contests </span>
            <svg className="animate-bounce" fill="#ffffff" height="151px" width="151px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-13.2 -13.2 356.40 356.40" xml:space="preserve" stroke="#ffffff" stroke-width="0.0033" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"></path> </g></svg>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="20"
              viewBox="0 0 60 23"
              fill="none"
             className=" fill-white rotate-90">
              <path d="M59.0419 13.0791C59.6379 12.5037 59.6545 11.5541 59.0791 10.9581L49.7021 1.24619C49.1267 0.650216 48.177 0.633556 47.5811 1.20898C46.9851 1.7844 46.9684 2.734 47.5439 3.32997L55.879 11.9628L47.2462 20.2979C46.6502 20.8733 46.6336 21.8229 47.209 22.4189C47.7844 23.0149 48.734 23.0315 49.33 22.4561L59.0419 13.0791ZM0.973688 12.4998L57.9737 13.4998L58.0263 10.5002L1.02631 9.50023L0.973688 12.4998Z" />
            </svg> */}
          </button>
        </Link>
      </div>

      {/* <Element name="allContests">
        <p style={{ marginBottom: '3%', fontSize: '3.5rem' }} className="text-white z-10 relative">Contests</p>
      </Element> */}

      {/* <------ Filter for Contest | STARTS------> */}
      <Filter />

      {/* <div className="scroll-smooth max-md:mb-28 bg-gradient-bg bg-gradient-to-r from-purple-800 via-red-500 to-yellow-300 bg-bottom bg-[length:100%_5px] bg-no-repeat">
        <div id="footer" className="max-w-6xl mt-4 pb-4 md:text-6xl text-card-text font-bold text-4xl">
          <h2>Hey👋</h2>
          <h2>Loved ❤️ our project  ?</h2>
          <h2>It’s open-source!</h2>
          <h2>Consider contributing on <a href="https://github.com/pranshugupta54/digitomize" target="_blank" rel="noopener noreferrer" style={{ color: '#4DA9FF' }}>GitHub</a></h2>
        </div>
      </div> */}
      <div className="divider"></div>
    </div>
  );
}

export default Home;
