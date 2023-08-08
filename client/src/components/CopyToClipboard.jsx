import React from 'react'
import './css/CopyToClipboard.css'

function CopyToClipboard({ vanity }) {
    const copyToClipboard = () => {
        const contestLink = `http://localhost:5173/contests/${vanity}`;
      
        if (document.queryCommandSupported('copy')) {
          const textArea = document.createElement('textarea');
          textArea.value = contestLink;
          document.body.appendChild(textArea);
          textArea.select();
      
          try {
            document.execCommand('copy');
            alert('Contest link copied to clipboard!');
          } catch (error) {
            console.error('Unable to copy to clipboard:', error);
          } finally {
            document.body.removeChild(textArea);
          }
        } else {
          alert('Copying to clipboard is not supported in this browser.');
        }
      };
  return (
    <div className="share-button-container">
        <button className="share-button" onClick={copyToClipboard}>
        <svg xmlns="http://www.w3.org/2000/svg" width='25' viewBox="0 0 24 24" id="Share"><path d="M18,14a4,4,0,0,0-3.08,1.48l-5.1-2.35a3.64,3.64,0,0,0,0-2.26l5.1-2.35A4,4,0,1,0,14,6a4.17,4.17,0,0,0,.07.71L8.79,9.14a4,4,0,1,0,0,5.72l5.28,2.43A4.17,4.17,0,0,0,14,18a4,4,0,1,0,4-4ZM18,4a2,2,0,1,1-2,2A2,2,0,0,1,18,4ZM6,14a2,2,0,1,1,2-2A2,2,0,0,1,6,14Zm12,6a2,2,0,1,1,2-2A2,2,0,0,1,18,20Z" fill="#ffffff" className="color000000 svgShape"></path></svg>
          <span className="tooltip">Copy</span>
        </button>
      </div>
  )
}

export default CopyToClipboard