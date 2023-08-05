import { useState, memo } from 'react';
import Button from './Button';
import './css/Card.css'
import geeksforgeeks from '../assets/geeksforgeeks.svg'
import leetcode from '../assets/leetcode.svg'
import codechef from '../assets/codechef.svg'
import codeforces from '../assets/codeforces.svg'

const hostToSVGMap = {
  leetcode: leetcode,
  codeforces: codeforces,
  geeksforgeeks: geeksforgeeks,
  codechef:codechef,
  // Add other hosts and their corresponding SVG variables here
};


function Card({ contest }) {
  const { name, startTimeUnix, url, duration, host } = contest;
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
const [remaningTime, setRemainingTime] = useState(null)
setInterval(() => {
  setRemainingTime(updateTimer(startTimeUnix));
}, 1000);
console.log("rendering");
  return (
    <div className="card">
      <div className='top'>
            <p>{startTimeIST}</p>
            <img src={hostToSVGMap[host]} alt={host} style={{maxHeight:'50px', maxWidth:'50px'}}/>
        </div>
      <h2>{name}</h2>
      <p>Duration : {duration}min</p>
      <p>{remaningTime}</p>
      <Button url={url} />
    </div>
  );
}

export default memo(Card);


function updateTimer(startTime) {
  const currentTime = Math.floor(Date.now() / 1000);
  // const currentTime = getCurrentTimeIST();
  const timeDiff = startTime - currentTime;

  if (timeDiff <= 0) {
   return <p>0 seconds remaning</p>
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
   
