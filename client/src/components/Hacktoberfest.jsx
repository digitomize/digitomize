import React, { useEffect } from 'react';
import HacktoberfestCss from '../components/css/Hacktoberfest.css';
import hacktoberImg from '../assets/hacktoberImg.jpeg';
export default function Hacktoberfest() {
  return (
    <div className='hacktoberfest-container'>
      <div className="hacktoberfest-info">
        <div className='headline'>
      <a href="https://hacktoberfest.com/" className='hacktoberFestWebsite'><span className='hacktoberFestWebsite'>  <h1 className="heading octoberfest">HACKTOBERFEST </h1></span></a><span className='X'>   <h1 className="heading">X </h1></span> <span id='digitomize'>  <h1 className="heading">DIGITOMIZE!</h1></span>
        </div>
        <div className='segment para'></div>
        <div className='para'>
          <span className='head1'>Ready for <span className='opensource'>open-source</span> EXCITEMENT ?</span>
          <div className='segment para'></div>
          <div className='para head3'>Participate in HacktoberFest 2023 with DIGITOMIZE. Whether you're a seasoned pro or just starting out, contribute, learn, and connect with developers.
          </div> </div>
        <div className='para'>
          {/* <div className='para'>
            <ul><li>Fix<span className='head2'>  bugs</span>, add<span className='head2'> features</span>, improve<span className='head2'>   documentation</span>, or create <span className='head2'>  tutorials</span>.</li></ul>
          </div> */}
          <div className='para'>
            <ul><li>At <span className='head2'>Digitomize</span>, we're on a mission to create innovative solutions, and we invite you to <span className='head2'><a href='https://github.com/digitomize/digitomize/blob/main/CONTRIBUTING.md' className='hacktoberFestWebsite' target='_blank'>contribute</a></span> to our project.</li></ul></div>
          <div className='para'>  <ul><li>There are various ways you can make an impact, whether it's <span className='head2'>fixing bugs</span>, adding <span className='head2'>new features</span>, enhancing <span className='head2'>documentation</span>, or creating helpful tutorials.</li> </ul> </div>
          <div className='para'>
            <ul><li>
              Your <span className='head2'>contributions</span> will play a vital role in shaping the future of our project. We're excited to see what you come up with!
            </li> </ul>
          </div>
          <div className='segment para'></div>
        </div>
        <div className='para'>
          Earn a prestigious Hacktoberfest badge by contributing. Join us, unleash your creativity, and let's build something remarkable together!
        </div>

        <div className='links'>
          <div className='dclinkedin'>
            <div className='social-links'> <a href="https://discord.gg/bsbBytBqBc" target="_blank" rel="noopener noreferrer">
              <button className="btn-discord" id='discord'>Discord</button>
            </a></div>
            <div className='repo-github'>
            <a href="https://github.com/digitomize/digitomize" target="_blank" rel="noopener noreferrer"><button className='btn-github'>Github</button></a>
            </div>
            <div className='social-links'> <a href="https://www.linkedin.com/feed/update/urn:li:activity:7116430604845428736" target="_blank" rel="noopener noreferrer">
              <button className="btn-linkedin" id='linkedin'>LinkedIn</button>
            </a></div>
          </div>
        </div>
      </div>
      <div className="hacktoberfest-image">
        <img src={hacktoberImg} alt="Hacktoberfest Image" />
      </div>
    </div>
  );
}
