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
import moment from "moment-timezone";
import { IoCalendarNumber } from "react-icons/io5";

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
};

const addToGoogleCalendar = ({ name, startTimeUnix, duration, url, host, vanity }) => {
  const startTime = new Date(startTimeUnix * 1000);
  const endTime = new Date((startTimeUnix + duration * 60) * 1000);

  const formattedStartTime = startTime.toISOString().replace(/[-:]/g, "");
  const formattedEndTime = endTime.toISOString().replace(/[-:]/g, "");

  // Encode contest details in the description
  const description = `<hr>🏆<b>Contest</b>🏆%0A👨🏻‍💻Name: ${name}%0A⏱️Duration: ${duration} minutes%0A🚀Host: ${host}%0A🔗Contest URL: <a href='${url}'>${url}</a>%0A<hr><i>Thank you for using <a href='https://digitomize.com'>digitomize</a></i>`;

  const googleCalendarUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?dates=${formattedStartTime}/${formattedEndTime}&text=${encodeURIComponent(name)}&details=${description}`;

  // Open the Google Calendar event creation page in a new tab
  window.open(googleCalendarUrl, "_blank");
};

function Card({ contest }) {
  const { name, startTimeUnix, url, duration, host, vanity } = contest;

  // Get the timeAndDateURL
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
          <Link to={timeAndDateURL} className="my-auto underline" target="_blank" rel="noopener noreferrer">
            {`${startMonth} ${startDate}, ${startYear} at ${startTime}`}
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

        <div className="flex items-center">
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

          <button id="calendarButton" onClick={() => addToGoogleCalendar(contest)} aria-label="Google Calendar Integration">
            <IoCalendarNumber style={{ color: "white" }} className="w-7 h-7 ml-4" />
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
