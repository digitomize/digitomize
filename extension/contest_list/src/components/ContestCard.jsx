import React from 'react';
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


const LOCATION_ID_UTC = 1440;
const generateTimeAndDateURL = (startTimeUnix) => {

    // Convert the Unix timestamp to a datetime in the UTC timezone
    const utcDateAndTime = moment.tz(startTimeUnix * 1000, "UTC");

    // Get the respective Date and Time Values.
    const utcStartMonth = utcDateAndTime.format("MM");
    const utcStartDate = utcDateAndTime.format("DD");
    const utcStartYear = utcDateAndTime.format("YYYY");
    const utcStartTime = utcDateAndTime.format("HH:mm:ss");
    const utcStartHour = utcStartTime.split(":")[0];
    const utcStartMin = utcStartTime.split(":")[1];
    const utcStartSec = utcStartTime.split(":")[2];

    // Form the URL to be directed to when clicked on time.
    const timeAndDateURL = new URL("https://timeanddate.com/worldclock/fixedtime.html");
    const params = {
        day: utcStartDate,
        month: utcStartMonth,
        year: utcStartYear,
        hour: utcStartHour,
        min: utcStartMin,
        sec: utcStartSec,
        p1: LOCATION_ID_UTC,
    };

    // Append the respective parameter's to timeanddate's URL.
    timeAndDateURL.search = new URLSearchParams(params).toString();
    return timeAndDateURL.href;
};

const platforms = {
    "geeksforgeeks": geeksforgeeks,
    "leetcode": leetcode,
    "codingninjas": codingninjas,
    "codechef": codechef,
    "codeforces": codeforces,
    "atcoder": atcoder,
};

function ContestCard({ contest }) {
    const platformLogo = platforms[contest.host];
    // console.log(platformLogo, contest.host, platforms, contest.host in platforms, contest.host === "GeeksforGeeks")

    const timeAndDateURL = generateTimeAndDateURL(contest.startTimeUnix);

    // Get the current User's timezone
    const userTimezone = moment.tz.guess(true);

    // Convert the Unix timestamp to a datetime in the specified timezone
    const dateTimeInTimezone = moment.tz(contest.startTimeUnix * 1000, userTimezone);

    // Format the datetime as a string
    const startMonth = dateTimeInTimezone.format("MMMM");
    const startDate = dateTimeInTimezone.format("D");
    const startYear = dateTimeInTimezone.format("YYYY");
    const startTime = dateTimeInTimezone.format("h:mm A");

    return (
        <div className="flex flex-row gap-2 border rounded border-jet bg-dashboardDarkerColor mt-2 p-2 w-full">
            <div>
                {platformLogo && <img src={platformLogo} alt={contest.name} className="w-8" />}
            </div>
            <div className="flex flex-col text-sm w-11/12">
                <h2 className="font-bold text-gray-300">{contest.name.slice(0, 35) + "..."}</h2>
                <div className="flex flex-row items-center gap-1">

                    <FaClock /><p>Duration: {Math.floor(contest.duration / 60)}hr {contest.duration % 60 ? `${contest.duration % 60}min` : ''}</p>
                </div>
                <div className="flex flex-row justify-between items-center w-full">

                    <p>Starts at: <a href={timeAndDateURL} target="_blank"> {startMonth.slice(0, 3)} {startDate}, {startYear} {startTime}</a></p>
                    <IoOpenOutline />
                </div>

            </div>
        </div>
    )
}

export default ContestCard;
