import { useState, useEffect, memo } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Typewriter from "typewriter-effect";
import { Alert } from "@mui/material";
import {Home as HomeIcon, Whatshot as WhatshotIcon, Grain as GrainIcon} from "@mui/icons-material";

import "./css/IndividualCard.css";

import geeksforgeeks from "../assets/geeksforgeeks.svg";
import leetcode from "../assets/leetcode.svg";
import codingninjas from "../assets/codingninjas.png";
import codechef from "../assets/codechef.svg";
import codeforces from "../assets/codeforces.svg";
import Navbar from "./Navbar";
import CopyToClipboard from "./CopyToClipboard";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

function IndividualCard() {
  const hostToSVGMap = {
    leetcode: leetcode,
    codingninjas: codingninjas,
    codeforces: codeforces,
    geeksforgeeks: geeksforgeeks,
    codechef: codechef,
  };

  const params = useParams();
  const [contest, setContest] = useState(null);
  const [msg, setMsg] = useState("");
  const vanity = params.vanity;

  useEffect(() => {
    fetch(`${backendUrl}?vanity=${vanity}`)
      .then((res) => res.json())
      .then((data) => setContest(data.results[0]))
      .catch((error) => console.error("Error fetching contest:", error));
    
      fetch(`${backendUrl}/random-message`)
      .then((res) => res.json())
      .then((data) => setMsg(data.message))
      .catch((error) => console.error("Error fetching contest:", error));
  }, [vanity]);


  const [remaningTime, setRemainingTime] = useState("0");
  if (contest === null) {
    return (
      <div>
        <p>
          <Typewriter
            options={{ loop: false, delay: 100, autoStart: true }}
            onInit={(typewriter) => {
              typewriter
                .start()
                .typeString(`Loading ...`)
                .pauseFor(1000)
                .deleteChars(3)
                .pauseFor(1000)
                .typeString("...")
                .pauseFor(1000)
                .deleteChars(3)
                .pauseFor(1000)
                .typeString("...")
                .pauseFor(1000)
                .deleteAll()
                .changeDelay(1)
                .typeString(
                  `Looks like there's an error fetching the page, please contact admin.`
                );
            }}
          />
        </p>
      </div>
    );
  }

  const { host, name, url, startTimeUnix, duration } = contest;
  const startDate = new Date(startTimeUnix * 1000);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "Asia/Kolkata",
  };
  const startTimeIST = startDate.toLocaleString("en-US", options);

  setInterval(() => {
    setRemainingTime(updateTimer(startTimeUnix, duration));
  }, 1000);

  const contentDescription = `${name} | ${startTimeIST} (IST)`;
  const contentTitle = `${host} | Digitomize`;
  return (
    <>
      <Helmet>
        <title>{name} | Digitomize</title>
        <meta property="og:title" content={contentTitle} />
        <meta property="og:description" content={contentDescription} />
        <meta name="description" content={contentDescription} />
      </Helmet>
      <div className="individualContestOuter">

<div className="feedback">
          <Alert
            severity="info"
            sx={{
              backgroundColor: "#1e1e1e",
              color: "rgba(255, 255, 255, 0.75)",
            }}
          >
            {msg}
          </Alert>
        </div>

        <div className="card_Navigation">
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


        <div className="ic" key={vanity}>
          <div className="ic-child">
            <div className="ic-top">
              <p id="startTime" style={{ maxWidth: "75%" }}>
                {startTimeIST}
              </p>
              <img
                src={hostToSVGMap[host]}
                alt={host}
                style={{ maxHeight: "50px", maxWidth: "50px" }}
              />
            </div>

            <h2 id="contest-title">{name}</h2>

            <div className="ic-lower-button">
              <div className="ic-inner-lower">
                <p>Duration : {duration}min</p>
                {remaningTime != 0 ? (
                  <div>{remaningTime}</div>
                ) : (
                  <p>loading...</p>
                )}
              </div>

              <div className="outerbtn">
                <div className="btn-div">
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <button>
                      Participate
                    </button>
                  </a>
                </div>
                <CopyToClipboard
                  msg="share"
                  vanity={vanity}
                  gradient={"btn-div"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="feedback" style={{ paddingBottom: "3%" }}>
        <Alert severity="info">
          We value your input! Share feedback or report issues at{" "}
          <a href="/feedback" style={{ color: "rgb(21, 132, 255)" }}>
            /feedback
          </a>
          .
        </Alert>
      </div>
    </>
  );
}

export default IndividualCard;

function updateTimer(startTime, duration) {
  const currentTime = Math.floor(Date.now() / 1000);
  const timeDiff = startTime - currentTime;
  if (duration + startTime < currentTime) {
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
          Time Left : {days}d {hours}h {minutes}m {seconds}s
        </p>
      );
    }
    return (
      <p>
        Time Left : {hours}h {minutes}m {seconds}s
      </p>
    );
  }
}
