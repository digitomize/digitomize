import React from "react";
import Marquee from "react-fast-marquee";
import { extendTheme, CssVarsProvider } from "@mui/joy/styles";
import { Link } from "react-router-dom";
import Card from "@mui/joy/Card";
import {kwoc, swoc, tublian, iwoc, gssoc} from "./assets/assets";
import { motion } from "framer-motion";

const theme = extendTheme({
  palette: {
    mode: "dark",
  },
});

export default function Programs() {

  // more programs can be added to this object in the future 
  const programs = [
  {
    name: "Kharagpur Winter of Code",
    description: "Kharagpur Winter of Code is a 5-week long online program for students who are new to open source software development.",
    link: "https://kwoc.kossiitkgp.org/",
    icon: kwoc,
  },
  {
    name: "Social Winter of Code",
    description: "Social Winter of Code is an open-source program by the Social which aims to bring students into the world of open source development.",
    link: "https://www.socialwinterofcode.com/",
    icon: swoc,
  },
  {
    name: "Tublian",
    description: "Part of Tublian's Open Source Internship. A unique opportunity for emerging software developers to gain real-world experience.",
    link: "https://www.tublian.com/",
    icon: tublian,
  },
  {
    name: "Innogeeks Winter of Code",
    description: "Innogeeks Winter of Code (IWOC) is a one-month initiative by Innogeeks which aims to empower the spirit of Open Source Contribution.",
    link: "https://iwoc.codes/",
    icon: iwoc,
  },
  {
    name: "GirlScript Summer of Code",
    description: "GirlScript Summer of Code is a 3-month long OpenSource program which aims to change lives by imparting tech education.",
    link: "https://gssoc.girlscript.tech/",
    icon: gssoc,
  },
];
    return (
      <>
        <CssVarsProvider defaultMode="dark">
          <div className="w-full p-2 flex flex-col gap-2">
          <motion.h1
          initial={{ opacity: 0, x: -150 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            delay: 0.5,
          }}
          className="my-4 py-4 text-white max-md:text-4xl md:text-6xl flex flex-row mx-auto justify-center"
        >
              <span className="block mt-1 md:mt-6">
                <span className="bg-digitomize-bg mx-2 px-1 rounded-lg">Programs</span>
              </span>
            </motion.h1>
            <motion.h2
        initial={{ opacity: 0, y: 150 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 100,
          delay: 0.7,
        }}
        className="text-custom-blue text-xl"
      >Open Source Programs that Digitomize has been a part of!</motion.h2>
            
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