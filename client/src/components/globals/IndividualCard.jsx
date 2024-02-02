import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useParams } from "react-router-dom";
import {
  Home as HomeIcon,
  Whatshot as WhatshotIcon,
  Grain as GrainIcon,
  Celebration,
  Notifications,
  Event,
  Code,
} from "@mui/icons-material";
import { Helmet } from "react-helmet";
import "@components/css/IndividualCard.css";
import { Alert, AlertTitle } from "@mui/material";
import geeksforgeeks from "@assets/geeksforgeeks.svg";
import leetcode from "@assets/leetcode.svg";
import codingninjas from "@assets/codingninjas.png";
import codechef from "@assets/codechef.svg";
import codeforces from "@assets/codeforces.svg";
import atcoder from "@assets/atcoder.svg";
import CopyToClipboard from "../CopyToClipboard";
import { useUserAuth } from "@context/UserAuthContext";
import moment from "moment-timezone";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const addToGoogleCalendar = ({ name, startTimeUnix, duration, url, host, vanity }) => {
  // Adjust the start time and duration for IST (GMT+5:30)
  const startTimeIST = new Date((startTimeUnix +  60 * 60 - 3600) * 1000);
  const endTimeIST = new Date((startTimeUnix + duration * 60 + 60 * 60 - 3600) * 1000);

  const formattedStartTime = startTimeIST.toISOString().replace(/[-:]/g, "").replace(".000", "+05:30");
  const formattedEndTime = endTimeIST.toISOString().replace(/[-:]/g, "").replace(".000", "+05:30");

  const startHour = startTimeIST.getHours();
  const startMinute = startTimeIST.getMinutes();
  const ampm = startHour >= 12 ? "PM" : "AM";
  const formattedStartTimeString = `${startHour % 12 || 12}:${startMinute < 10 ? "0" : ""}${startMinute} ${ampm}`;

  const description = `<hr>🏆<b>Contest</b>🏆%0A👨🏻‍💻Name: ${name}%0A🕘Start at: ${formattedStartTimeString}%0A⏱️Duration: ${duration} minutes%0A🚀Host: ${host}%0A🔗Contest URL: <a href='${url}'>${url}</a>%0A<hr><i>Thank you for using <a href='https://digitomize.com'>digitomize</a></i>`;

  const googleCalendarUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?dates=${formattedStartTime}/${formattedEndTime}&text=${encodeURIComponent(name)}&details=${description}`;

  // Open the Google Calendar event creation page in a new tab
  window.open(googleCalendarUrl, "_blank");
};

function IndividualCard() {
  const { user } = useUserAuth();
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const hostToSVGMap = {
    leetcode: leetcode,
    codingninjas: codingninjas,
    codeforces: codeforces,
    geeksforgeeks: geeksforgeeks,
    codechef: codechef,
    atcoder: atcoder,
    // Add other hosts and their corresponding SVG variables here
  };
  const [alertOpen, setAlertOpen] = useState(true);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const params = useParams();
  const [contest, setContest] = useState(null);
  const vanity = params.vanity;

  useEffect(() => {
    fetch(`${backendUrl}/contests?vanity=${vanity}`);
    fetch(`${backendUrl}/contests?vanity=${vanity}`)
      .then((res) => res.json())
      .then((data) => setContest(data.results[0]))
      .catch((error) => console.error("Error fetching contest:", error));
  }, [vanity]);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [remaningTime, setRemainingTime] = useState("Loading...");
  if (contest === null) {
    return <div className="min-h-[40vh]">Loading...</div>;
  }
  if (contest?.host === undefined) {
    return (
      <div className="min-h-[40vh] text-center">
        <h1>
          404 <br /> Contest not found
        </h1>
        <Link to="/contests">Go back to contests</Link>
      </div>
    );
  }

  const { host, name, url, startTimeUnix, duration } = contest;
  // console.log(contest.length);
  const durationInMilliseconds = duration * 60 * 1000;
  const endTimeUnix = startTimeUnix + durationInMilliseconds / 1000;

  // Get the current User's timezone
  const userTimezone = moment.tz.guess(true);

  // Convert the Unix timestamp to a datetime in the specified timezone for startTimeUnix
  const startDateTimeInTimezone = moment.tz(startTimeUnix * 1000, userTimezone);

  // Format the datetime as a string for startTime
  const startMonth = startDateTimeInTimezone.format("MMM");
  const startDate = startDateTimeInTimezone.format("D");
  const startYear = startDateTimeInTimezone.format("YYYY");
  const startTime = startDateTimeInTimezone.format("h:mm A");

  // Convert the Unix timestamp to a datetime in the specified timezone for endTimeUnix
  const endDateTimeInTimezone = moment.tz(endTimeUnix * 1000, userTimezone);

  // Format the datetime as a string for endTime
  const endTime = endDateTimeInTimezone.format("h:mm A");

  const getColorTheme = () => {
    if (host === "leetcode") {
      return "#FFCC00";
    } else if (host === "geeksforgeeks") {
      return "#2E8D46";
    } else if (host === "codingninjas") {
      return "	#F28C28";
    } else if (host === "codeforces") {
      return "#318CE7";
    } else if (host === "codechef") {
      return "#b87333";
    } else if (host === "atcoder") {
      return "white";
    } else {
      return "black";
    }
  };
  const colorTheme = getColorTheme();

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  const durationFormatted = `${hours} h ${minutes} m`;

  setInterval(() => {
    setRemainingTime(updateTimer(startTimeUnix, duration));
  }, 1000);

  const contentDescription = `${name} | ${startTime} (IST)`.toLowerCase();
  const contentTitle = `${host} | Digitomize`.toLowerCase();
  const pageTitle = `${name} | Digitomize`.toLowerCase();
  if (contest)
    return (
      <>
        <Helmet>
          <title>{pageTitle}</title>

          {/* Page Description */}
          <meta name="description" content={contentDescription} />

          {/* Robots Meta Tag */}
          <meta name="robots" content="index, follow" />

          {/* Open Graph Tags (Facebook) */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={url} />
          <meta property="og:title" content={contentTitle} />
          <meta property="og:description" content={contentDescription} />
          <meta property="og:image" content={hostToSVGMap[host]} />
          <meta property="og:url" content={url} />

          {/* Twitter Meta Tags */}
          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content={contentDescription} />
          <meta name="twitter:image" content={hostToSVGMap[host]} />

          {/* Canonical URL */}
          <link rel="canonical" href={url} />
        </Helmet>
        {true && (
          <div className="mx-auto w-fit mt-4">
            <Alert
              severity="error"
              className="w-fit"
              icon={<Notifications className="animate-ping" />}
            >
              <a href="https://whatsapp.com/channel/0029VaJyadwLNSa71cZCQt1A" target="_blank" rel="noreferrer">
                <AlertTitle>DON'T miss out contests - get all contest notifications on
                  <strong> Whatsapp!!</strong>
                  <span className="normal-case">
                    {" "}
                    Follow <strong> now</strong>👨🏻‍💻
                  </span>
                </AlertTitle>
              </a>
            </Alert>
            {/* <div className="w-full flex md:flex-row-reverse -right-8 -top-4 md:relative max-md:justify-center max-md:mt-4">
          <img src={ microsoftLogo} alt="" className="w-40"/>
          </div> */}
            {/* <Alert severity="error" className="w-fit" icon={<PanTool className="animate-ping"/>}>
            <Link to="/signup?utm_source=contests">
              <AlertTitle>
                <strong>One-Stop Ratings!</strong> -
                <span> Join in<OpenInNew fontSize="small" />
                </span>
              </AlertTitle>
              stop checking ratings <strong>one by one</strong>; see them all at <strong>once</strong>!
            </Link>
          </Alert> */}
          </div>
        )}
        {isMobile ? (
          <div className="py-8 ">
            <div className="card_Navigation mx-4">
              <div className="card_nav_path">
                <Link to="/">
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Home
                </Link>
              </div>
              <h3>&gt;</h3>
              <div className="card_nav_path">
                <Link to="/contests">
                  <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Contests
                </Link>
              </div>
              <h3>&gt;</h3>
              <div className="card_nav_path">
                <h3>
                  <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  {name}
                </h3>
              </div>
            </div>
            <div
              className="ic-mv"
              key={vanity}
              style={{ backgroundColor: colorTheme }}
            >
              <div className="ic-mv-child">
                <div
                  className="mv-date"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    backgroundColor: colorTheme,
                  }}
                >
                  {startDate} {startMonth}' {startYear}
                </div>
                <div className="ic-mv-child-first">
                  <img
                    src={hostToSVGMap[host]}
                    alt={host}
                    style={{
                      maxHeight: "6.25rem",
                      maxWidth: "6.25rem",
                      margin: "auto",
                      marginBottom: "0px",
                    }}
                  />
                  <div className="mv-siteName">{host}</div>
                </div>
                <div className="ic-mv-child-second">
                  <h2
                    className="mv-contest-name"
                    id="contest-title"
                    style={{ margin: "auto", width: "28.125rem" }}
                  >
                    {name}
                  </h2>
                </div>
                <div className="ic-mv-child-third">
                  <div className="ic-mv-child-third-first">
                    <div
                      className="mv-start-time-div"
                      style={{
                        backgroundColor: colorTheme,
                        fontSize: "3.8vw",
                        color: "black",
                        fontWeight: "bold",
                        padding: "1.5vw",
                        display: "inline-block",
                      }}
                    >
                      {startTime}
                    </div>
                  </div>
                  <div className="ic-mv-child-third-second">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      fill="currentColor"
                      className="bi bi-square-fill"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />{" "}
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      fill="currentColor"
                      className="bi bi-square-fill"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />{" "}
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      fill="currentColor"
                      className="bi bi-square-fill"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />{" "}
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      fill="currentColor"
                      className="bi bi-square-fill"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />{" "}
                    </svg>
                  </div>
                  <div className="ic-mv-child-third-third">
                    <div className="ic-mv-child-third-third-first">
                      <div className="ic-mv-child-third-third-first-sub"></div>
                    </div>
                    <div
                      className="ic-mv-child-third-third-second"
                      style={{ fontSize: "3.8vw" }}
                    >
                      {durationFormatted}
                    </div>
                    <div className="ic-mv-child-third-third-third">
                      <div className="ic-mv-child-third-third-third-sub"></div>
                    </div>
                  </div>
                  <div className="ic-mv-child-third-fourth">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      fill="currentColor"
                      className="bi bi-square-fill"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />{" "}
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      fill="currentColor"
                      className="bi bi-square-fill"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />{" "}
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      fill="currentColor"
                      className="bi bi-square-fill"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />{" "}
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      fill="currentColor"
                      className="bi bi-square-fill"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />{" "}
                    </svg>
                  </div>
                  <div className="ic-mv-child-third-fifth">
                    <div
                      className="mv-end-time-div"
                      style={{
                        backgroundColor: colorTheme,
                        fontSize: "3.8vw",
                        color: "black",
                        fontWeight: "bold",
                        padding: "1.5vw",
                        display: "inline-block",
                      }}
                    >
                      {endTime}
                    </div>
                  </div>
                </div>
                <div className="ic-mv-child-fourth">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ display: "inline-block" }}
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-alarm"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z" />
                    <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z" />
                  </svg>
                  {remaningTime}
                </div>
                <div className="ic-mv-child-fifth">

                  <div
                    className="mv-btn-div"
                    style={{ boxShadow: `8px 8px ${colorTheme}` }}
                  >
                    <button
                      onClick={() => addToGoogleCalendar(contest)}
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "20px",
                        marginTop: "17px",
                      }}
                    >
                      Add to Calendar <Event />
                    </button>
                  </div>

                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mv-btn-div"
                    style={{ boxShadow: `0.5rem 0.5rem ${colorTheme}` }}
                  >
                    <button
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "1.25rem",
                        marginTop: "1.063rem",
                      }}
                    >
                      Participate <Code />
                    </button>
                  </a>
                  <CopyToClipboard
                    msg="Share"
                    className="mv-btn-div share-button-div share-button-container mv-btn-share-div"
                    gradient={"mv-btn-div"}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="card_Navigation flex justify-center mt-8 text-2xl">
              <div className="card_nav_path">
                <Link to="/">
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Home
                </Link>
              </div>
              <h3>&gt;</h3>
              <div className="card_nav_path">
                <Link to="/contests">
                  <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Contests
                </Link>
              </div>
              <h3>&gt;</h3>
              <div className="card_nav_path">
                <h3>
                  <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  {name}
                </h3>
              </div>
            </div>
            <div
              className="ic py-8"
              key={vanity}
              style={{ backgroundColor: colorTheme }}
            >
              <div className="ic-child">
                <div
                  className="date"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    backgroundColor: colorTheme,
                  }}
                >
                  {startDate} {startMonth}' {startYear}
                </div>
                <div
                  style={{ position: "absolute", left: "350px", top: "530px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    className="bi bi-scissors"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 3.5c-.614-.884-.074-1.962.858-2.5L8 7.226 11.642 1c.932.538 1.472 1.616.858 2.5L8.81 8.61l1.556 2.661a2.5 2.5 0 1 1-.794.637L8 9.73l-1.572 2.177a2.5 2.5 0 1 1-.794-.637L7.19 8.61 3.5 3.5zm2.5 10a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zm7 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
                  </svg>
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "348px",
                    top: "10px",
                    transform: "rotate(-180deg)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    className="bi bi-scissors"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 3.5c-.614-.884-.074-1.962.858-2.5L8 7.226 11.642 1c.932.538 1.472 1.616.858 2.5L8.81 8.61l1.556 2.661a2.5 2.5 0 1 1-.794.637L8 9.73l-1.572 2.177a2.5 2.5 0 1 1-.794-.637L7.19 8.61 3.5 3.5zm2.5 10a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zm7 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
                  </svg>
                </div>
                <div className="ic-child-left">
                  <div className="ic-child-left-zeroth"></div>
                  <div className="ic-child-left-first">
                    <div
                      className="ic-child-left-first-inner"
                      style={{ backgroundColor: colorTheme }}
                    >
                      <p
                        style={{
                          fontSize: "20px",
                          marginLeft: "30px",
                          color: "black",
                          fontWeight: "bold",
                          paddingTop: "5px",
                          display: "inline-block",
                        }}
                      >
                        {startTime}
                      </p>
                    </div>
                  </div>
                  <div className="ic-child-left-second">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="5"
                      height="5"
                      fill="currentColor"
                      className="bi bi-square-fill left-filled-box"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="5"
                      height="5"
                      fill="currentColor"
                      className="bi bi-square-fill left-filled-box"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="5"
                      height="5"
                      fill="currentColor"
                      className="bi bi-square-fill left-filled-box"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="5"
                      height="5"
                      fill="currentColor"
                      className="bi bi-square-fill left-filled-box"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="5"
                      height="5"
                      fill="currentColor"
                      className="bi bi-square-fill left-filled-box"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="5"
                      height="5"
                      fill="currentColor"
                      className="bi bi-square-fill left-filled-box"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="5"
                      height="5"
                      fill="currentColor"
                      className="bi bi-square-fill left-filled-box"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                    </svg>
                  </div>
                  <div className="ic-child-left-third"></div>
                  <div className="ic-child-left-fourth">
                    <p
                      style={{
                        marginLeft: "125px",
                        marginTop: "8px",
                        fontSize: "20px",
                        display: "inline-block",
                      }}
                    >
                      {durationFormatted}
                    </p>
                  </div>
                  <div className="ic-child-left-fifth"></div>
                  <div className="ic-child-left-sixth">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="5"
                      height="5"
                      fill="currentColor"
                      className="bi bi-square-fill left-filled-box"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="5"
                      height="5"
                      fill="currentColor"
                      className="bi bi-square-fill left-filled-box"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="5"
                      height="5"
                      fill="currentColor"
                      className="bi bi-square-fill left-filled-box"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="5"
                      height="5"
                      fill="currentColor"
                      className="bi bi-square-fill left-filled-box"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="5"
                      height="5"
                      fill="currentColor"
                      className="bi bi-square-fill left-filled-box"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="5"
                      height="5"
                      fill="currentColor"
                      className="bi bi-square-fill left-filled-box"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="5"
                      height="5"
                      fill="currentColor"
                      className="bi bi-square-fill left-filled-box"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                    </svg>
                  </div>
                  <div className="ic-child-left-seventh">
                    <div
                      className="ic-child-left-seventh-inner"
                      style={{ backgroundColor: colorTheme }}
                    >
                      <p
                        style={{
                          fontSize: "20px",
                          marginLeft: "30px",
                          color: "black",
                          fontWeight: "bold",
                          paddingTop: "5px",
                          display: "inline-block",
                        }}
                      >
                        {endTime}
                      </p>
                    </div>
                  </div>
                  <div className="ic-child-left-eight"></div>
                </div>
                <div className="ic-child-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    className="bi bi-square-fill first-filled-box"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    className="bi bi-square-fill center-filled-box"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    className="bi bi-square-fill center-filled-box"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    className="bi bi-square-fill center-filled-box"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    className="bi bi-square-fill center-filled-box"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    className="bi bi-square-fill center-filled-box"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    className="bi bi-square-fill center-filled-box"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    className="bi bi-square-fill center-filled-box"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    className="bi bi-square-fill center-filled-box"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    className="bi bi-square-fill center-filled-box"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    className="bi bi-square-fill center-filled-box"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    className="bi bi-square-fill center-filled-box"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    className="bi bi-square-fill center-filled-box"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    className="bi bi-square-fill center-filled-box"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    className="bi bi-square-fill center-filled-box"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    className="bi bi-square-fill center-filled-box"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                  </svg>
                </div>
                <div className="ic-child-right">
                  <div className="ic-child-right-first">
                    <img
                      src={hostToSVGMap[host]}
                      alt={host}
                      style={{
                        maxHeight: "100px",
                        maxWidth: "100px",
                        margin: "auto",
                      }}
                    />
                    <div className="siteName">{host}</div>
                  </div>
                  <div className="ic-child-right-second">
                    <h2
                      className="contest-name"
                      id="contest-title"
                      style={{ margin: "auto", width: "450px" }}
                    >
                      {name}
                    </h2>
                  </div>
                  <div className="ic-child-right-third">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ display: "inline-block" }}
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-alarm"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z" />
                      <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z" />
                    </svg>
                    {remaningTime}
                  </div>
                  <div className="ic-child-right-fourth">
                    <div
                      className="btn-div"
                      style={{ boxShadow: `8px 8px ${colorTheme}` }}
                    >
                      <button
                        onClick={() => addToGoogleCalendar(contest)}
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "20px",
                          marginTop: "17px",
                        }}
                      >
                        Add to Calendar <Event />
                      </button>
                    </div>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-div"
                      style={{ boxShadow: `8px 8px ${colorTheme}` }}
                    >
                      <button
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "20px",
                          marginTop: "17px",
                        }}
                      >
                        Participate <Code/>
                      </button>
                    </a>
                    <CopyToClipboard
                      msg="Share"
                      className="share-button-container share-button-div-phone"
                      gradient={"btn-div"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
}

export const getColorTheme = (host) => {
  if (host === "leetcode") {
    return "#FFCC00";
  } else if (host === "geeksforgeeks") {
    return "#2E8D46";
  } else if (host === "codingninjas") {
    return "#F28C28";
  } else if (host === "codeforces") {
    return "#318CE7";
  } else if (host === "codechef") {
    return "#b87333";
  } else if (host === "atcoder") {
    return "white";
  } else {
    return "black";
  }
};
export default IndividualCard;

function updateTimer(startTime, duration) {
  const currentTime = Math.floor(Date.now() / 1000);
  const timeDiff = startTime - currentTime;
  if (duration * 60 + startTime < currentTime) {
    return (
      <p style={{ display: "inline-block", marginLeft: "10px" }}>
        the contest has ended
      </p>
    );
  } else if (startTime <= currentTime) {
    return (
      <p style={{ display: "inline-block", marginLeft: "10px" }}>
        the contest has started!
      </p>
    );
  } else {
    const days = Math.floor(timeDiff / 86400);
    const hours = Math.floor((timeDiff % 86400) / 3600);
    const minutes = Math.floor((timeDiff % 3600) / 60);
    const seconds = timeDiff % 60;
    if (days > 0) {
      return (
        <p
          style={{
            display: "inline-block",
            marginLeft: "5px",
            fontSize: "20px",
          }}
        >
          Starts in {days}d {hours}h {minutes}m {seconds}s
        </p>
      );
    }
    return (
      <p
        style={{ display: "inline-block", marginLeft: "5px", fontSize: "20px" }}
      >
        Starts in {hours}h {minutes}m {seconds}s
      </p>
    );
  }
}
