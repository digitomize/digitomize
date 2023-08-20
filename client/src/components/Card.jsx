import { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';

import Button from './Button';
import './css/Card.css'
import geeksforgeeks from '../assets/geeksforgeeks.svg'
import leetcode from '../assets/leetcode.svg'
import codechef from '../assets/codechef.svg'
import codeforces from '../assets/codeforces.svg'
import CopyToClipboard from './CopyToClipboard';

const hostToSVGMap = {
  leetcode: leetcode,
  codeforces: codeforces,
  geeksforgeeks: geeksforgeeks,
  codechef:codechef,
  // Add other hosts and their corresponding SVG variables here
};


function Card({ contest }) {
  const { name, startTimeUnix, url, duration, host, vanity } = contest;
  const startDate = new Date(startTimeUnix*1000)
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    timeZone: 'Asia/Kolkata' 
  };
  const startTimeIST = startDate.toLocaleString('en-US', options)
  const [remaningTime, setRemainingTime] = useState("0")
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(updateTimer(startTimeUnix,duration));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [startTimeUnix]);

  return (
    <div className="card" key={vanity}>
      <div className='top'>
          <p id='startTime'>{startTimeIST}</p>
          <img src={hostToSVGMap[host]} alt={host} width="13%"/>  
      </div>
      <Link to={`/contests/${vanity}`}>
      <h2>{name}</h2>
      </Link>
      <div className='lower_button'>
        <div className='inner_lower'>
          <p>Duration : {duration}min</p>
          <div>{remaningTime}</div>
        </div>
        <div className="clip">

        <CopyToClipboard vanity={vanity}/>
        </div>
          <Button  url={url}/>
        
      </div>
    </div>
  );
}

export default memo(Card);


function updateTimer(startTime,duration) {
  const currentTime = Math.floor(Date.now() / 1000);
  // const currentTime = getCurrentTimeIST();
  const timeDiff = startTime - currentTime;

  if ((duration + startTime) < currentTime) {
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

    // const startTime = timerElement.dataset.startTime;
    // const timerElementId = timerElement.id;
   
