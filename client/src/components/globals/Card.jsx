import { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import {
  geeksforgeeks,
  leetcode,
  codingninjas,
  codechef,
  codeforces,
  atcoder,
} from "../AllAssets";
import ShareModel from "../share_model";
import moment from 'moment-timezone';

const frontendUrl = import.meta.env.VITE_REACT_APP_FRONTEND_URL;
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
    const utcDateAndTime = moment.unix(startTimeUnix).utc();

    // Get the respective Date and Time Values.
    const utcStartMonth = utcDateAndTime.format('MM');
    const utcStartDate = utcDateAndTime.format('DD');
    const utcStartYear = utcDateAndTime.format('YYYY');
    const utcStartTime = utcDateAndTime.format('HH:mm:ss');
    const utcStartHour = utcStartTime.split(":")[0];
    const utcStartMin = utcStartTime.split(":")[1];
    const utcStartSec = utcStartTime.split(":")[2];
  
    // Form the URL to be directed to when clicked on time.
    const timeAndDateURL = new URL("https://timeanddate.com/worldclock/fixedtime.html");
    const params = {
      day:utcStartDate,
      month:utcStartMonth,
      year:utcStartYear,
      hour:utcStartHour,
      min:utcStartMin,
      sec:utcStartSec,
      p1:LOCATION_ID_UTC,
    };
  
    // Append the respective parameter's to timeanddate's URL.
    timeAndDateURL.search = new URLSearchParams(params).toString();
    return timeAndDateURL.href;
}

function Card({ contest }) {
  const { name, startTimeUnix, url, duration, host, vanity } = contest;

  // Get the timeAndDateURL
  const timeAndDateURL = generateTimeAndDateURL(startTimeUnix);

  // Get the current User's timezone
  const userTimezone = moment.tz.guess(true);

  // Convert the Unix timestamp to a datetime in the specified timezone
  const dateTimeInTimezone = moment.unix(startTimeUnix).tz(userTimezone);

  // Format the datetime as a string
  const startMonth = dateTimeInTimezone.format('MMMM');
  const startDate = dateTimeInTimezone.format('D');
  const startYear = dateTimeInTimezone.format('YYYY');
  const startTime = dateTimeInTimezone.format('hh:mm a');

  const [remaningTime, setRemainingTime] = useState("loading...");
  const [show, setShow] = useState(false);
  const close_model = () => setShow(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(updateTimer(startTimeUnix, duration));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [startTimeUnix]);

  const main_model = (
    <ShareModel
      close_model={close_model}
      contestLink={`${frontendUrl}/contests/${vanity}`}
      //theme={colorTheme}
      theme=""
    />
  );

  return (
    <div
      className="border-[#D1E5F4] border-2 hover:shadow-[8px_8px_0px_#D1E5F4] my-4 sm:w-96 min-h-[250px] p-6 rounded-xl bg-cardsColor flex flex-col hover:scale-[1.02] hover:bg-cardsHover m-1"
      key={vanity}
    >
      <div className="flex justify-between">
        <p
          id="startTime"
          className="text-card-text font-light leading-tight lowercase text-lg max-md:text-sm"
        >
          <Link to={timeAndDateURL} style={{textDecoration:"underline"}} className="my-auto" target="_blank" rel="noopener noreferrer">
            {`${startMonth} ${startDate}, ${startYear} ${startTime}`}
          </Link>
        </p>
        <img src={hostToSVGMap[host]} alt={host} width="13%" />
      </div>
      <Link to={`/contests/${vanity}`} className="my-auto">
        <h2 className="text-3xl pb-8">{name}</h2>
      </Link>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-card-text text-xs font-light leading-tight lowercase">
            Duration : {duration}min
          </p>
          <div className="text-card-text text-xs font-light leading-tight lowercase">
            {remaningTime}
          </div>
        </div>

        <div className="h-8 max-md:w-12 clip">
          <button onClick={() => setShow(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              viewBox="0 0 24 24"
              id="Share"
            >
              <path
                d="M18,14a4,4,0,0,0-3.08,1.48l-5.1-2.35a3.64,3.64,0,0,0,0-2.26l5.1-2.35A4,4,0,1,0,14,6a4.17,4.17,0,0,0,.07.71L8.79,9.14a4,4,0,1,0,0,5.72l5.28,2.43A4.17,4.17,0,0,0,14,18a4,4,0,1,0,4-4ZM18,4a2,2,0,1,1-2,2A2,2,0,0,1,18,4ZM6,14a2,2,0,1,1,2-2A2,2,0,0,1,6,14Zm12,6a2,2,0,1,1,2-2A2,2,0,0,1,18,20Z"
                fill="#ffffff"
                className="color000000 svgShape"
              ></path>
            </svg>
          </button>
          {show && main_model}
        </div>
        <Button url={url} />
      </div>
    </div>
  );
}

export default memo(Card);

function updateTimer(startTime, duration) {
  const currentTime = Math.floor(Date.now() / 1000);
  const timeDiff = startTime - currentTime;

  if (duration * 60 + startTime < currentTime) {
    return <p>the contest has ended</p>;
  } else if (startTime <= currentTime) {
    return <p>the contest has started!</p>;
  } else {
    const days = Math.floor(timeDiff / 86400);
    const hours = Math.floor((timeDiff % 86400) / 3600);
    const minutes = Math.floor((timeDiff % 3600) / 60);
    const seconds = timeDiff % 60;
    if (days > 0) {
      return (
        <p>
          starts in {days}d {hours}h {minutes}m
        </p>
      );
    }
    return (
      <p>
        starts in {hours}h {minutes}m {seconds}s
      </p>
    );
  }
}
