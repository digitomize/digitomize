import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
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
      icon: leetcode,
    },
    {
      name: "Atcoder",
      description:
        "Competitive programming platform that hosts contests and offers practice problems.",
      icon: atcoder,
    },
    {
      name: "Codeforces",
      description:
        "Online competitive programming platform with a global community and regular contests.",
      icon: codeforces,
    },
    {
      name: "Codechef",
      description:
        "Competitive programming platform featuring coding contests and challenges.",
      icon: codechef,
    },
    {
      name: "Geeksforgeeks",
      description:
        "Platform providing a variety of coding resources, tutorials, and practice problems.",
      icon: geeksforgeeks,
    },
    {
      name: "Codingninjas",
      description:
        "Educational platform offering coding courses, challenges, and programming competitions.",
      icon: codingninjas,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <div className="mt-12 md:hidden">
        <Marquee speed={100}>
          {platforms.map((item) => (
            <div key={item.name} className="flex justify-center">
              <span className="bg-cardsColor p-4 mx-4 rounded-xl">
                <img
                  className="w-20 h-20"
                  src={item.icon}
                  draggable={false}
                  alt="leetcode"
                />
              </span>
            </div>
          ))}
        </Marquee>
      </div>
      <div className="w-screen max-md:hidden">
        <Marquee speed={200} className="flex flex-row" pauseOnHover={true}>
          {platforms.map((item) => (
            <div key={item.name} className="rounded-lg border border-solid border-[#1584ff] bg-card-gradient font-['Geist'] py-10 px-4 w-4/5">
              <div className="flex justify-center">
                <span className="bg-contestlogo p-4 rounded-full">
                  <img
                    className="w-20 h-20"
                    src={item.icon}
                    draggable={false}
                    alt="leetcode"
                  />
                </span>
              </div>
              <div className="text-center mt-4 mb-5">
                <h1 className="text-xl text-[#ffffff] mb-2 mt-0">
                  {item.name}
                </h1>
                <p className=" text-[#B7B6FF]">{item.description}</p>
              </div>
              <CardActions className="justify-center">
                <Link to="/contests">
                  <button className=" text-white rounded-lg border-[0.5px] border-solid   border-button-primary-helper bg-button-primary transition duration-90 hover:bg-button-primary-hover px-4 py-2">check out</button>
                </Link>
              </CardActions>
            </div>
          ))}
        </Marquee>
      </div>
    </ThemeProvider>
  );
}
