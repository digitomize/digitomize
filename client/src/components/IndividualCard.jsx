import { useState, useEffect, memo } from 'react';
import { Link, useParams } from 'react-router-dom';

import './css/IndividualCard.css'

import geeksforgeeks from '../assets/geeksforgeeks.svg'
import leetcode from '../assets/leetcode.svg'
import codingninjas from "../assets/codingninjas.png";
import codechef from '../assets/codechef.svg'
import codeforces from '../assets/codeforces.svg'
import CopyToClipboard from './CopyToClipboard';

function IndividualCard() {
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const hostToSVGMap = {
    leetcode: leetcode,
    codingninjas: codingninjas,
    codeforces: codeforces,
    geeksforgeeks: geeksforgeeks,
    codechef: codechef,
    // Add other hosts and their corresponding SVG variables here
  };

  const params = useParams()
  const [contest, setContest] = useState(null)
  const vanity = params.vanity

  useEffect(() => {
    fetch(`${backendUrl}/contests?vanity=${vanity}`)
      .then(res => res.json())
      .then(data => setContest(data.results[0]))
      .catch(error => console.error('Error fetching contest:', error));
  }, [vanity]);
  const [remaningTime, setRemainingTime] = useState("0")
  if (contest === null) {
    return <div>Loading...</div>;
  }

  const { host, name, url, startTimeUnix, duration } = contest;
  const durationInMilliseconds = duration * 60 * 1000;
  const endTimeUnix = startTimeUnix + (durationInMilliseconds / 1000);
  const startDate = new Date(startTimeUnix * 1000);
  const endDate = new Date(endTimeUnix * 1000);
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
    } else {
      return "black";
    }
  }
  const colorTheme = getColorTheme();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  };
  const startTimeIST = startDate.toLocaleString('en-US', options)
  const endTimeIST = endDate.toLocaleString('en-US', options);

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  const durationFormatted = `${hours} h ${minutes} m`;

  const getMonthInWords = (date) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[date.getMonth()];
  };
  const monthName = getMonthInWords(startDate);

  setInterval(() => {
    setRemainingTime(updateTimer(startTimeUnix, duration))
  }, 1000)
  return (
    <>
      <div className="ic" key={vanity} style={{ backgroundColor: colorTheme }}>
        <div className="ic-child">
          <div className='date' style={{ color: 'black', fontWeight: 'bold', backgroundColor: colorTheme }}>{startDate.getDate()} {monthName}' {startDate.getFullYear()}</div>
          <div style={{ position: 'absolute', left: '350px', top: '530px' }}><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-scissors" viewBox="0 0 16 16">
            <path d="M3.5 3.5c-.614-.884-.074-1.962.858-2.5L8 7.226 11.642 1c.932.538 1.472 1.616.858 2.5L8.81 8.61l1.556 2.661a2.5 2.5 0 1 1-.794.637L8 9.73l-1.572 2.177a2.5 2.5 0 1 1-.794-.637L7.19 8.61 3.5 3.5zm2.5 10a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zm7 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
          </svg></div>
          <div style={{ position: 'absolute', left: '348px', top: '10px', transform: 'rotate(-180deg)' }}><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-scissors" viewBox="0 0 16 16">
            <path d="M3.5 3.5c-.614-.884-.074-1.962.858-2.5L8 7.226 11.642 1c.932.538 1.472 1.616.858 2.5L8.81 8.61l1.556 2.661a2.5 2.5 0 1 1-.794.637L8 9.73l-1.572 2.177a2.5 2.5 0 1 1-.794-.637L7.19 8.61 3.5 3.5zm2.5 10a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zm7 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
          </svg></div>
          <div className='ic-child-left'>
            <div className='ic-child-left-zeroth'></div>
            <div className='ic-child-left-first'><div className='ic-child-left-first-inner' style={{ backgroundColor: colorTheme }}><p style={{ fontSize: '20px', marginLeft: '30px', color: 'black', fontWeight: 'bold', paddingTop: '5px', display: 'inline-block' }}>{startTimeIST}</p></div></div>
            <div className='ic-child-left-second'><svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" fill="currentColor" class="bi bi-square-fill left-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" fill="currentColor" class="bi bi-square-fill left-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" fill="currentColor" class="bi bi-square-fill left-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" fill="currentColor" class="bi bi-square-fill left-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" fill="currentColor" class="bi bi-square-fill left-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" fill="currentColor" class="bi bi-square-fill left-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" fill="currentColor" class="bi bi-square-fill left-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg></div>
            <div className='ic-child-left-third'></div>
            <div className='ic-child-left-fourth'><p style={{ marginLeft: '125px', marginTop: '8px', fontSize: '20px', display: 'inline-block' }}>{durationFormatted}</p></div>
            <div className='ic-child-left-fifth'></div>
            <div className='ic-child-left-sixth'><svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" fill="currentColor" class="bi bi-square-fill left-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" fill="currentColor" class="bi bi-square-fill left-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" fill="currentColor" class="bi bi-square-fill left-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" fill="currentColor" class="bi bi-square-fill left-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" fill="currentColor" class="bi bi-square-fill left-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" fill="currentColor" class="bi bi-square-fill left-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" fill="currentColor" class="bi bi-square-fill left-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg></div>
            <div className='ic-child-left-seventh'><div className='ic-child-left-seventh-inner' style={{ backgroundColor: colorTheme }}><p style={{ fontSize: '20px', marginLeft: '30px', color: 'black', fontWeight: 'bold', paddingTop: '5px', display: 'inline-block' }}>{endTimeIST}</p></div></div>
            <div className='ic-child-left-eight'></div>
          </div>
          <div className='ic-child-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-square-fill first-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-square-fill center-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-square-fill center-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-square-fill center-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-square-fill center-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-square-fill center-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-square-fill center-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-square-fill center-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-square-fill center-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-square-fill center-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-square-fill center-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-square-fill center-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-square-fill center-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-square-fill center-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-square-fill center-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-square-fill center-filled-box" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" /></svg>
          </div>
          <div className='ic-child-right'>
            <div className='ic-child-right-first'><img src={hostToSVGMap[host]} alt={host} style={{ maxHeight: '100px', maxWidth: '100px', margin: 'auto' }} /><div className='siteName'>{host}</div></div>
            <div className='ic-child-right-second'><h2 className='contest-name' id="contest-title" style={{ margin: 'auto', width: '450px' }}>{name}</h2></div>
            <div className='ic-child-right-third'><svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block' }} width="20" height="20" fill="currentColor" class="bi bi-alarm" viewBox="0 0 16 16"><path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z" /><path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z" /></svg>{remaningTime}</div>
            <div className='ic-child-right-fourth'>
              <a href={url} target="_blank" rel="noopener noreferrer" className="btn-div" style={{ boxShadow: `8px 8px ${colorTheme}` }}>
                <button style={{ color: 'black', fontWeight: 'bold', fontSize: '20px', marginTop: '17px' }}>participate</button>
              </a>
              <CopyToClipboard msg="share" className='share-button-div share-button-container' gradient={"btn-div"} />
            </div>
          </div>
        </div>
      </div>
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
  } else {
    return "black";
  }
}
export default IndividualCard;


function updateTimer(startTime, duration) {
  const currentTime = Math.floor(Date.now() / 1000);
  const timeDiff = startTime - currentTime;
  if ((duration * 60 + startTime) < currentTime) {
    return <p style={{ display: 'inline-block', marginLeft: '10px' }}>the contest has ended</p>
  }
  else if (startTime <= currentTime) {
    return <p style={{ display: 'inline-block', marginLeft: '10px' }}>the contest has started!</p>
  } else {
    const days = Math.floor(timeDiff / 86400);
    const hours = Math.floor((timeDiff % 86400) / 3600);
    const minutes = Math.floor((timeDiff % 3600) / 60);
    const seconds = timeDiff % 60;
    if (days > 0) {
      return <p style={{ display: 'inline-block', marginLeft: '5px', fontSize: '20px' }}>Starts in {days}d {hours}h {minutes}m {seconds}s</p>
    }
    return <p style={{ display: 'inline-block', marginLeft: '5px', fontSize: '20px' }}>Starts in {hours}h {minutes}m {seconds}s</p>
  }
}