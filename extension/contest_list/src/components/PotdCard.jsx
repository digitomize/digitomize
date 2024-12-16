/*global chrome*/
import React from "react";
import geeksforgeeks from "../assets/geeksforgeeks.svg";
import leetcode from "../assets/leetcode.svg";
import codingninjas from "../assets/codingninjas.png";
import codechef from "../assets/codechef.svg";
import codeforces from "../assets/codeforces.svg";
import atcoder from "../assets/atcoder.svg";
import moment from "moment-timezone";
import { FaClock, FaLink, FaTimes } from "react-icons/fa";
import { IoMdOpen } from "react-icons/io";
import { IoOpenOutline } from "react-icons/io5";

const platforms = {
  geeksforgeeks: geeksforgeeks,
  leetcode: leetcode,
  codingninjas: codingninjas,
  codechef: codechef,
  codeforces: codeforces,
  atcoder: atcoder,
};

function PotdCard({ potd, platform }) {
  const platformLogo = platforms[platform];

  const dateString = potd.date;
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  return (
    <div className="flex flex-row gap-2 border rounded border-jet bg-dashboardDarkerColor mt-2 p-2 w-full">
      <div>
        {platformLogo && (
          <img src={platformLogo} alt={potd.problemName} className="w-8" />
        )}
      </div>
      <div className="flex flex-col text-sm w-11/12">
        <h2 className="font-bold text-gray-300">
          {potd?.problemName?.slice(0, 35) + "..."}
        </h2>
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row items-center gap-1">
            <FaClock />
            <p>Date: {formattedDate} </p>
          </div>

          {/* <p>Starts at: <a href={timeAndDateURL} target="_blank"> {startMonth.slice(0, 3)} {startDate}, {startYear} {startTime}</a></p> */}
          <a
            href={potd.problemUrl + "?ref=digitomize&utm_source=digitomize"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-125 text-custom-blue"
          >
            <IoOpenOutline />
          </a>
        </div>
      </div>
    </div>
  );
}

export default PotdCard;
