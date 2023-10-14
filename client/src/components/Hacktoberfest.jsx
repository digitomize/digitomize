import React, { useEffect } from 'react';
import HacktoberfestCss from '../components/css/Hacktoberfest.css';
import hacktoberImg from '../assets/hacktoberImg.jpeg';
export default function Hacktoberfest() {
  return (
    <div className='hacktoberfest-container'>
      <div className="hacktoberfest-info">
        <h1   className="heading">JOIN <a  href="https://hacktoberfest.com/" className='hacktoberFestWebsite'><span className='hacktoberFestWebsite'>HACKTOBERFEST </span></a> WITH <span id='digitomize'>DIGITOMIZE!</span></h1>
        <div className='para'>
          Ready for open-source excitement? Join Hacktoberfest 2023 at Digitomize. Whether you're a seasoned pro or just starting out, contribute, learn, and connect with developers globally. Fix bugs, add features, improve documentation, or create tutorials.
        </div>  
        <div className='para'>
        At Digitomize, we're on a mission to create innovative solutions, and we invite you to contribute to our project. There are various ways you can make an impact, whether it's fixing bugs, adding new features, enhancing documentation, or creating helpful tutorials. Your contributions will play a vital role in shaping the future of our project.
        </div>
        <div className='para'>
          Earn a prestigious Hacktoberfest badge by contributing.Join us, unleash your creativity, and let's build something remarkable together! Fork our GitHub repository at <a href="https://github.com/digitomize/digitomize" target="_blank" rel="noopener noreferrer">https://lnkd.in/dPmTFHXK</a> and get started!
          Join us at <a href="https://www.digitomize.com" target="_blank" rel="noopener noreferrer">www.digitomize.com</a>
        </div>
        <div className='links'>
         <div className='social-links'> <a href="https://discord.com/invite/bsbBytBqBc" target="_blank" rel="noopener noreferrer">
            <button className="btn-discord" id='discord'>Discord</button> 
          </a></div>
          <div className='social-links'> <a href="https://www.linkedin.com/feed/update/urn:li:activity:7116430604845428736" target="_blank" rel="noopener noreferrer">
            <button className="btn-linkedin" id='linkedin'>LinkedIn</button>
          </a></div>
        </div>
      </div>
      <div className="hacktoberfest-image">
        <img src={hacktoberImg} alt="Hacktoberfest Image" />
      </div>
    </div>
  );
}
