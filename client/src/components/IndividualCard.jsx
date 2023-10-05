import { useState, useEffect, memo } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Typewriter from "typewriter-effect";
import { Alert } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";

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
    // Add other hosts and their corresponding SVG variables here
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

              // .typeString("Welcomes You")
              // .start();
              // .stop();
            }}
          />
        </p>
        {/* Loading... */}
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
        {/* <div style={{ width: "75%" }}>
          <Link to="/contests">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="23"
              viewBox="0 0 60 23"
              fill="none"
            >
              <path d="M59.0419 13.0791C59.6379 12.5037 59.6545 11.5541 59.0791 10.9581L49.7021 1.24619C49.1267 0.650216 48.177 0.633556 47.5811 1.20898C46.9851 1.7844 46.9684 2.734 47.5439 3.32997L55.879 11.9628L47.2462 20.2979C46.6502 20.8733 46.6336 21.8229 47.209 22.4189C47.7844 23.0149 48.734 23.0315 49.33 22.4561L59.0419 13.0791ZM0.973688 12.4998L57.9737 13.4998L58.0263 10.5002L1.02631 9.50023L0.973688 12.4998Z" />
            </svg>
            Go to all contests
          </Link>
        </div> */}

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
                      {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="55"
                      height="20"
                      viewBox="0 0 45 23"
                      fill="none">
                      <path d="M44.5402 13.0967C45.1372 12.5204 45.1556 11.5708 44.5812 10.9758L35.2213 1.27994C34.6469 0.684948 33.6973 0.669852 33.1002 1.24622C32.5032 1.82258 32.4848 2.77215 33.0591 3.36714L41.3791 11.9857L32.7306 20.3345C32.1336 20.9109 32.1152 21.8605 32.6896 22.4554C33.264 23.0504 34.2136 23.0655 34.8106 22.4892L44.5402 13.0967ZM0.720964 12.8395L43.4711 13.5191L43.5292 10.5197L0.779036 9.84009L0.720964 12.8395Z" fill="white" />
                    </svg> */}
                    </button>
                  </a>
                </div>
                <CopyToClipboard
                  msg="share"
                  vanity={vanity}
                  gradient={"btn-div"}
                />
              </div>
              {/* <Button  url={url}/> */}
            </div>
          </div>
        </div>
        {/* <div className="containerBottom">
          <br />
        </div> */}
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
  // const currentTime = getCurrentTimeIST();
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
