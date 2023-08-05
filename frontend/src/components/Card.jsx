import React from 'react';
import Button from './Button';

function Card({ contest }) {
  const { name, startTimeUnix, url } = contest;

  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Start Time: {startTimeUnix}</p>
      <Button url={url} />
    </div>
  );
}

export default Card;
