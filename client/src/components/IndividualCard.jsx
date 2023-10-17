import { useState, useEffect, memo } from 'react';
import { useParams } from 'react-router-dom';

import './css/IndividualCard.css'

// importing all the assets ...
import {
  geeksforgeeks,
  leetcode,
  codingninjas,
  codechef,
  codeforces,
  atcoder,
} from "./AllAssets";


import CopyToClipboard from './CopyToClipboard';

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

function IndividualCard() {
  const hostToSVGMap = {
    leetcode: leetcode,
    codingninjas: codingninjas,
    codeforces: codeforces,
    geeksforgeeks: geeksforgeeks,
    codechef: codechef,
    atcoder: atcoder,
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
  const [remaningTime, setRemainingTime] = useState("loading...")
  if (contest === null) {
    return <div>Loading...</div>;
  }

  const { host, name, url, startTimeUnix, duration } = contest;
  const startDate = new Date(startTimeUnix * 1000)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Asia/Kolkata'
  };
  const startTimeIST = startDate.toLocaleString('en-US', options)

  setInterval(() => {
    setRemainingTime(updateTimer(startTimeUnix, duration))
  }, 1000)
  return (
    <>
      <div className="ic" key={vanity}>
        <div className="ic-child">
          <div className='ic-top'>
            <p id='startTime'>{startTimeIST}</p>
            <img src={hostToSVGMap[host]} alt={host} style={{ maxHeight: '50px', maxWidth: '50px' }} />
          </div>

          <h2 id="contest-title">{name}</h2>

          <div className='ic-lower-button'>
            <div className='ic-inner-lower'>
              <p>Duration : {duration}min</p>
              <div>{remaningTime}</div>
            </div>

            <div className="flex flex-col-reverse">
              <div className="btn-div">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <button  >Participate
                  </button>
                </a>
              </div>
              <CopyToClipboard msg="share" vanity={vanity} gradient={"btn-div"}/>
            </div>
          </div>
        </div>
      </div>
      <div className='containerBottom'>
        <br />
      </div>
    </>
  );
}

export default IndividualCard


function updateTimer(startTime, duration) {
  const currentTime = Math.floor(Date.now() / 1000);
  const timeDiff = startTime - currentTime;
  if ((duration * 60 + startTime) < currentTime) {
    return <p>the contest has ended</p>
  }
  else if (startTime <= currentTime) {
    return <p>the contest has started!</p>
  } else {
    const days = Math.floor(timeDiff / 86400);
    const hours = Math.floor((timeDiff % 86400) / 3600);
    const minutes = Math.floor((timeDiff % 3600) / 60);
    const seconds = timeDiff % 60;
    if (days > 0) {
      return <p>Time Left : {days}d {hours}h {minutes}m {seconds}s</p>
    }
    return <p>Time Left : {hours}h {minutes}m {seconds}s</p>
  }
}