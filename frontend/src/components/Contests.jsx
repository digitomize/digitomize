import React from 'react';
import Card from './Card';

function Contests({ contests }) {
  return (
    <div style={{display:'flex', flexWrap:'wrap', gap:'1%', justifyContent:'space-evenly'}}>
      {contests.map((contest) => (
        <Card key={contest.vanity} contest={contest} />
      ))}
    </div>
  );
}

export default Contests;
