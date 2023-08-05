import React from 'react';

function Button({ url }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <button>Join Contest</button>
    </a>
  );
}

export default Button;
