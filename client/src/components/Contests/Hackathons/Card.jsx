import { useState, useEffect, memo, useMemo } from "react";
import { Link } from "react-router-dom";
import {
    devfolio,
    devpost,
    unstop
} from "../../AllAssets";
import ShareModel from "../../share_model";
import moment from "moment-timezone";
import { CalendarPlus, Share2, MoveRight } from "lucide-react";

const frontendUrl = import.meta.env.VITE_REACT_APP_FRONTEND_URL;
const hostToSVGMap = {
  devfolio: devfolio,
  devpost: devpost,
  unstop: unstop,
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

const addToGoogleCalendar = ({ name, hackathonStartTimeUnix: startTimeUnix, duration, url, host }) => {
  // Adjust the start time and duration for IST (GMT+5:30)
  const startTimeIST = new Date((startTimeUnix + 60 * 60 - 3600) * 1000);
  const endTimeIST = new Date((startTimeUnix + duration * 60 + 60 * 60 - 3600) * 1000);

  const formattedStartTime = startTimeIST.toISOString().replace(/[-:]/g, "").replace(".000", "+05:30");
  const formattedEndTime = endTimeIST.toISOString().replace(/[-:]/g, "").replace(".000", "+05:30");

  const startHour = startTimeIST.getHours();
  const startMinute = startTimeIST.getMinutes();
  const ampm = startHour >= 12 ? "PM" : "AM";
  const formattedStartTimeString = `${startHour % 12 || 12}:${startMinute < 10 ? "0" : ""}${startMinute} ${ampm}`;

  const description = `<hr>🏆<b>Hackathon</b>🏆%0A👨🏻‍💻Name: ${name}%0A🕘Start at: ${formattedStartTimeString}%0A⏱️Duration: ${duration} minutes%0A🚀Host: ${host}%0A🔗Hackathon URL: <a href='${url}'>${url}</a>%0A<hr><i>Thank you for using <a href='https://digitomize.com'>digitomize</a></i>`;

  const googleCalendarUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?dates=${formattedStartTime}/${formattedEndTime}&text=${encodeURIComponent(name)}&details=${description}`;

  // Open the Google Calendar event creation page in a new tab
  window.open(googleCalendarUrl, "_blank");
};

function Card({ hackathon }) {
  const { host, name, vanity, url, registerationStartTimeUnix, registerationEndTimeUnix, hackathonStartTimeUnix: startTimeUnix, duration } = hackathon;

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

  const [remaningTime, setRemainingTime] = useState("loading...");
  const [show, setShow] = useState(false);
  const close_model = () => setShow(false);

  const hackathonDuration = useMemo(() => {
    const days = Math.floor(duration / 1440);
    if (days > 0) {
      const hours = Math.floor((duration % 1440) / 60);
      const minutes = Math.floor((duration % 1440) % 60);

      return `${days}d${(hours > 0) ? `:${hours}h:${minutes}m` : ""}`;
    }

    return `${duration}min`;
  },[duration]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(updateTimer(registerationStartTimeUnix, registerationEndTimeUnix));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [registerationStartTimeUnix, registerationEndTimeUnix]);

  const main_model = (
    <ShareModel
      close_model={close_model}
      contestLink={`${frontendUrl}/hackathons/${vanity}`}
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
          className="text-card-text font-light leading-tight text-lg max-md:text-sm"
        >
          <Link to={timeAndDateURL} className="my-auto underline lowercase" target="_blank" rel="noopener noreferrer">
            {`Runs from ${startMonth} ${startDate}, ${startYear}`}
          </Link>
        </p>
        <img src={hostToSVGMap[host]} alt={host} width="13%" />
      </div>
      <Link to={`/hackathons/${vanity}`} className="my-auto">
        <h2 className="text-3xl pb-8">{name}</h2>
      </Link>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-card-text text-xs font-light leading-tight lowercase">
            duration: {hackathonDuration}
          </p>
          <div className="text-card-text text-xs font-light leading-tight lowercase">
            {remaningTime}
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-6 ml-4">
          <button onClick={() => setShow(true)}>
            <Share2 style={{ color: "white" }} className="w-5 h-5" />
          </button>

          <button id="calendarButton" onClick={() => addToGoogleCalendar(hackathon)} aria-label="Google Calendar Integration">
            <CalendarPlus style={{ color: "white" }} className="w-5 h-5" />
          </button>

          {show && main_model}
          <a href={url + "?ref=digitomize&utm_source=digitomize"} target="_blank" rel="noreferrer">
            <MoveRight style={{ color: "white" }} className="md:w-10 md:h-10" />
          </a>

          {/* <Button url={url} /> */}
        </div>
      </div>
    </div>
  );
}

export default memo(Card);

function updateTimer(regStartTimeUnix, regEndTimeUnix) {
  const currentTime = Math.floor(Date.now() / 1000);
  let startsOrCloses = "start";
  let timeDiff = regStartTimeUnix - currentTime;
  if (currentTime > regStartTimeUnix) {
    startsOrCloses = "close";
    timeDiff = regEndTimeUnix - currentTime;
  }
  
  const days = Math.floor(timeDiff / 86400);
  const hours = Math.floor((timeDiff % 86400) / 3600);
  const minutes = Math.floor((timeDiff % 3600) / 60);

  return (
      <p>
          Application {startsOrCloses} in {days}d:{hours}h:{minutes}m
      </p>
  );

}
