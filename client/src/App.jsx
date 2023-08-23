import { Element, Link } from "react-scroll";
import { auth } from "../firebase";

import { Typography } from "@mui/material";
import Typewriter from "typewriter-effect";

import Filter from "./components/Filter";
import BgEllipse from "./components/BgEllipse";

import "./App.css";
import { useEffect } from "react";

function App() {
 
  return (
    <div className="container">
      <BgEllipse />
      <div className=" button-container scroll-smooth">
        <Typography variant="h1" align="center">
          Your Ultimate Contest List
        </Typography>

        <p>
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
        <Link to="newHead" smooth={true} duration={500}>
          <button className="btn">
            go to contests
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="23"
              viewBox="0 0 60 23"
              fill="none"
            >
              <path d="M59.0419 13.0791C59.6379 12.5037 59.6545 11.5541 59.0791 10.9581L49.7021 1.24619C49.1267 0.650216 48.177 0.633556 47.5811 1.20898C46.9851 1.7844 46.9684 2.734 47.5439 3.32997L55.879 11.9628L47.2462 20.2979C46.6502 20.8733 46.6336 21.8229 47.209 22.4189C47.7844 23.0149 48.734 23.0315 49.33 22.4561L59.0419 13.0791ZM0.973688 12.4998L57.9737 13.4998L58.0263 10.5002L1.02631 9.50023L0.973688 12.4998Z" />
            </svg>
          </button>
        </Link>
      </div>

      <Element name="newHead">
        <p style={{ marginBottom: '3%', fontSize: '3.5rem' }}>Contests</p>
      </Element>

      {/* <------ Filter for Contest | STARTS------> */}
      <Filter />

      <div className="containerBottom scroll-smooth">
        <div id="footer">
          <h2>Hey👋</h2>
          <h2>Loved ❤️ our project  ?</h2>
          <h2>It’s open-source!</h2>
          <h2>Consider contributing on <a href="https://github.com/pranshugupta54/digitomize" target="_blank" rel="noopener noreferrer" style={{ color: '#4DA9FF' }}>GitHub</a></h2>
        </div>
      </div>
    </div>
  );
}

export default App;
