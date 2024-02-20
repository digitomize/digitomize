import React from "react";
import moment from "moment-timezone";
import { Link } from "react-router-dom";
import {
  geeksforgeeks,
  leetcode,
  codingninjas,
  codechef,
  codeforces,
  atcoder,
} from "../../components/AllAssets";
const hostToSVGMap = {
  leetcode: leetcode,
  codingninjas: codingninjas,
  codeforces: codeforces,
  geeksforgeeks: geeksforgeeks,
  codechef: codechef,
  atcoder: atcoder,
  // Add other hosts and their corresponding SVG variables here
};
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
  const timeAndDateURL = new URL(
    "https://timeanddate.com/worldclock/fixedtime.html",
  );
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
function ContestCard({ data }) {
  const { name, startTimeUnix, url, duration, host, vanity } = data;
  const timeAndDateURL = generateTimeAndDateURL(startTimeUnix);

  // Get the current User's timezone
  const userTimezone = moment.tz.guess(true);

  // Convert the Unix timestamp to a datetime in the specified timezone
  const dateTimeInTimezone = moment.tz(startTimeUnix * 1000, userTimezone);

  // Format the datetime as a string
  const startMonth = dateTimeInTimezone.format("MMMM");
  const startDate = dateTimeInTimezone.format("D");
  const startYear = dateTimeInTimezone.format("YYYY");
  const startTime = dateTimeInTimezone.format("h:mm A");
  return (
      <Link to={`/contests/${vanity}`}>
        <div className="flex flex-1 px-3 py-2 flex-row   space-x-2 border border-solid border-[#EBEBEB] bg-eerie-black-2 rounded-[2px] min-w-[200px]">
      
      <img
        src={hostToSVGMap[host]}
        alt={host}
        className="w-[45px] h-[45px] my-auto"
      />
   
    <div className="flex flex-col">
      <p
       
        className="my-auto text-[10px]"
       
      >
        {`${startMonth} ${startDate}, ${startYear} at ${startTime}`}
      </p>
      <div className="my-auto">
      <h2 className="text-[12px] text-left ">{name}</h2>
      </div>
    </div>
  </div>
      </Link>
  );
}

export default ContestCard;
