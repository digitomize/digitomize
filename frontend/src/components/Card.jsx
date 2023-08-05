import React from 'react';
import Button from './Button';
import '../css/Card.css'

function Card({ contest }) {
  const { name, startTimeUnix, url } = contest;

  return (
    <div className="card">
      <div className='top'>
            <p>5 Aug 2023</p>
            <p>Logo</p>
        </div>
      <h2>{name}</h2>
      <p>Start Time: {startTimeUnix}</p>
      <Button url={url} />
    </div>
  );
}

export default Card;
