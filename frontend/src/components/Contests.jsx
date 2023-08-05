import React from 'react';
import Card from './Card';

function Contests({ contests }) {
  return (
    <div>
      {contests.map((contest) => (
        <Card key={contest.vanity} contest={contest} />
      ))}
    </div>
  );
}

export default Contests;
