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
import { IoCalendarNumberOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";

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

function Card({ contest }) {
  const { name, startTimeUnix, url, duration, host, vanity } = contest;
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

  const gapi = window.gapi;
  const google = window.google;

  const CLIENT_ID = import.meta.env.VITE_REACT_APP_CLIENT_ID;
  const API_KEY = import.meta.env.VITE_REACT_APP_CALENDAR_API;
  const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
  const SCOPES = "https://www.googleapis.com/auth/calendar";

  const accessToken = localStorage.getItem("access_token");
  const expiresIn = localStorage.getItem("expires_in");

  let gapiInited = false, gisInited = false, tokenClient;

  useEffect(() => {
    //const expiryTime = new Date().getTime() + expiresIn * 1000;
    const initializeGoogleAPIs = async () => {
      gapiLoaded();
      gisLoaded();
    };
    initializeGoogleAPIs();
  }, []);


  function gapiLoaded() {
    gapi.load("client", initializeGapiClient);
  }

  async function initializeGapiClient() {
    try {
      await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      });

      gapiInited = true;

      if (accessToken && expiresIn) {
        gapi.client.setToken({
          access_token: accessToken,
          expires_in: expiresIn,
        });
      }
    } catch (error) {
      console.error('Error initializing Google API client:', error);
    }
  }

  function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: "", // defined later
    });

    gisInited = true;
  }

  function handleAuthClick() {
    if (!tokenClient) {
      // If tokenClient is not initialized, call gisLoaded to initialize it
      // Do not remove this check condition
      gisLoaded();
    }

    tokenClient.callback = async (resp) => {
      try {
        if (resp.error) {
          throw new Error(`Authentication error: ${resp.error}`);
        }

        const { access_token, expires_in } = gapi.client.getToken();
        if (!access_token || !expires_in) {
          throw new Error('Invalid access token or expiration time');
        }

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("expires_in", expires_in);

        addEventToGoogleCalendar();
      } catch (error) {
        console.error('Authentication error:', error);
        toast.error('Authentication error, please try again!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    };

    if (!(accessToken && expiresIn)) {
      try {
        tokenClient.requestAccessToken({ prompt: "consent" });
      } catch (error) {
        console.error('Error requesting access token:', error);
      }
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      try {
        tokenClient.requestAccessToken({ prompt: "" });
      } catch (error) {
        console.error('Error requesting access token:', error);
      }
    }
  }


  async function addEventToGoogleCalendar() {
    // const startTime = new Date(startTimeUnix * 1000).toISOString();
    // const endTime = new Date((startTimeUnix + duration * 60) * 1000).toISOString();

    // console.log(startTime);
    // console.log(endTime);

    const startTimeUTC = new Date(startTimeUnix * 1000);
    const startTimeIST = new Date(startTimeUTC.getTime() + (5 * 60 + 30) * 60000).toISOString();

    const endTimeUTC = new Date((startTimeUnix + duration * 60) * 1000);
    const endTimeIST = new Date(endTimeUTC.getTime() + (5 * 60 + 30) * 60000).toISOString();


    console.log(startTimeIST);
    console.log(endTimeIST);

    const event = {
      summary: name,
      start: {
        dateTime: startTimeIST,
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: endTimeIST,
        timeZone: "Asia/Kolkata",
      },
      description: `Contest details: ${url}`,
      "reminders": {
        "useDefault": false,
        "overrides": [
          {
            "method": "popup",
            "minutes": 10
          }
        ]
      },
    };

    try {
      const response = await gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });

      console.log("Event added to Google Calendar:", response);
      toast.success('Event added to Google Calendar!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error adding event to Google Calendar:", error);
      toast.error('Error adding event to Google Calendar, try again!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

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
          {startTimeIST}
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

          <button id="authorize_button" onClick={handleAuthClick} aria-label="Authorize Google Calendar Integration">
            <IoCalendarNumberOutline className="w-7 h-7 ml-4" />
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
