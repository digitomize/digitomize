import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper } from "swiper/react";
import { Link } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import CardActions from "@mui/material/CardActions";
import "/src/components/css/Card.css"
import Marquee from "react-fast-marquee";


import {
  geeksforgeeks,
  leetcode,
  codingninjas,
  codechef,
  atcoder,
  codeforces,
} from "./AllAssets";

const platformsIcon = [
  leetcode,
  codingninjas,
  geeksforgeeks,
  codechef,
  codeforces,
  atcoder,
];

import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});


export default function ContestCards() {
  const platforms = [
    {
      name: "Leetcode",
      description:
        "Platform for honing coding skills through a variety of algorithmic challenges.",
      // icon: leetcode,
    },
    {
      name: "Atcoder",
      description:
        "Competitive programming platform that hosts contests and offers practice problems.",
      // icon: atcoder,
    },
    {
      name: "Codeforces",
      description:
        "Online competitive programming platform with a global community and regular contests.",
      // icon: codeforces,
    },
    {
      name: "Codechef",
      description:
        "Competitive programming platform featuring coding contests and challenges.",
      // icon: codechef,
    },
    {
      name: "Geeksforgeeks",
      description:
        "Platform providing a variety of coding resources, tutorials, and practice problems.",
      // icon: geeksforgeeks,
    },
    {
      name: "Codingninjas",
      description:
        "Educational platform offering coding courses, challenges, and programming competitions.",
      // icon: codingninjas,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
              <Marquee speed={100} className="flex flex-row ">
                  {platforms.map((item) => (
              <div> 
                  <div className="contestcard font-['Geist'] border border-contestborder py-10 px-2">
                    <div className="flex justify-center">
                        <span className="bg-contestlogo p-10 rounded-full"
                      ></span>
                    </div>
                    <div className="text-center mt-4 mb-5">
                      <h1 className="text-xl text-[#ffffff] mb-2 mt-0">{item.name}</h1>
                      <p className=" text-[#B7B6FF]">
                        {item.description}
                      </p>
                    </div>
                    <CardActions className="justify-center">
                      <Link to="/contests">
                        <button
                          className="contestbtn px-4 py-2"
                        >
                          check out
                        </button>
                      </Link>
                    </CardActions>
                  </div>
              </div>
            ))}
      </Marquee>
      </ThemeProvider>
  );
}
