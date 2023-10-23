import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './css/CopyToClipboard.css';
import { getColorTheme } from './IndividualCard';

const frontendUrl = import.meta.env.VITE_REACT_APP_FRONTEND_URL;
const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
function CopyToClipboard({ msg, gradient, vanity : propVanity }) {
  const [message, setMessage] = useState("share");
  const [contest, setContest] = useState(null);
  const { vanity: routeVanity } = useParams(); 
  const vanity = routeVanity || propVanity;
  
  useEffect(() => {
    
    fetch(`${backendUrl}/contests?vanity=${vanity}`)
      .then(res => res.json())
      .then(data => setContest(data.results[0]))
      .catch(error => console.error('Error fetching contest:', error));
  }, [vanity]);
  
  if (contest === null) {
    return <div>
    </div>;
  }
  const { host } = contest; 
  const colorTheme = getColorTheme(host);
  
  const copyToClipboard = () => {
    const params = useParams();
    const vanity = params.vanity;
    const contestLink = `${frontendUrl}/contests/${vanity}`;
    if (document.queryCommandSupported('copy')) {
      const textArea = document.createElement('textarea');
      textArea.value = contestLink;
      document.body.appendChild(textArea);
      textArea.select();

      try {
        document.execCommand('copy');
        setMessage("Link Copied")
      } catch (error) {
        console.error('Unable to copy to clipboard:', error);
      } finally {
        document.body.removeChild(textArea);
      }
    } else {
      alert('Copying to clipboard is not supported in this browser.');
    }
  };
  setTimeout(() => {
    message === "Link Copied" ? setMessage("share") : null
  }, 1300)
  return (
    <div className={`${gradient} share-button-container`} style={{ boxShadow: `8px 8px ${colorTheme}` }}>
      <button className="share-button" onClick={copyToClipboard} >
        <p>{msg}</p>
        <span className="tooltip">{message}</span>
      </button>
    </div>
  )
}

export default CopyToClipboard