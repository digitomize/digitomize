import React, { useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { extendTheme, CssVarsProvider } from "@mui/joy/styles";
import { Link } from "react-router-dom";
import Card from "@mui/joy/Card";
import programsData from "./programs.json";

const theme = extendTheme({
  palette: {
    mode: "dark",
  },
});

export default function Programs() {
    const {programs} = programsData;
    //console.log(programs);
    return (
      <>
        <CssVarsProvider defaultMode="dark">
          <div className="w-full p-2 flex flex-col gap-2">

            <h1 className="my-4 py-4 text-white max-md:text-4xl md:text-6xl flex flex-row mx-auto justify-center">
              <span className="block mt-1 md:mt-6">
                <span className="bg-digitomize-bg mx-2 px-1 rounded-lg">Programs</span>
              </span>
            </h1>
            <h2 className="text-custom-blue text-xl">Open Source Programs that Digitomize has been a part of!</h2>
            
            <div className="flex flex-row mt-4">
              <Marquee
                pauseOnHover={true}
                speed={100}
                direction="right"
              >
                {programs.map((program) => (
                  <Link to={program.link} key={program.name+"-link"}>
                    <Card key={program.name} className="flex justify-center mx-3 w-56 h-40 sm:mx-5 sm:w-96 sm:h-80">
                      <img src={program.icon} className="m-5 h-10 sm:!h-14 w-fit align-top self-center"></img>
                      <h2 className="m-1 !ml-0 text-lg sm:!text-2xl">{program.name}</h2>
                      <p className="text-slate-400 collapse sm:!visible">{program.description}</p>
                    </Card>
                  </Link>
                ))}
              </Marquee>
            </div>
          </div>
        </CssVarsProvider>
      </>
    );
}