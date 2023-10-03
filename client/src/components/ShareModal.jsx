import React , {useRef} from 'react';
import './css/ShareModal.css';
import {ImCross} from 'react-icons/im'
import {LuLink} from 'react-icons/lu'
export const ShareModal = ({showModal , setShowModal , contestLink}) => {
  const handleContainerClick = (e) => {
    e.stopPropagation();
  };
  
  const closeModal = () => setShowModal(false);

  const handleCloseButton = () => (
    <button className="model-btn" onClick={closeModal}>
      Exit
    </button>
  );

  const inputRef = useRef(null);

  const handleCopyToClipboard = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand('copy');
      copyToClipboard();
    }
  };

  const handleWhatsAppClick = () => {
    const Message = `Check out this link: ${contestLink}`;
    const whatsappLink = `whatsapp://send?text=${encodeURIComponent(Message)}`;
    window.open(whatsappLink);
  };

  const handleLinkedinClick = () => {
    const linkedinLink = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      contestLink)}`;
    try{
      window.open(linkedinLink);
    }
    catch(e){
      console.log(e);
    }
  };

  const handleInstagramClick = () => {
    const Message = `Check out this link: ${contestLink}`;
    const instagramLink = `https://www.instagram.com/?url=${encodeURIComponent(Message)}`;
    try{
      window.open(instagramLink);
    }
    catch(e){
      console.log(e);
    }
  };

  const handleFacebookClick = () => {
    const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      contestLink
    )}`;
    try{
      window.open(facebookLink);
    }
    catch(e){
      console.log(e);
    }
  };
  const WhatsappsvgStyle = {
    fill: '#1BD741', 
    height: '3.5rem',
    borderRadius: '100%', 
    border: '1px solid green',
    transition: 'fill 0.2s, box-shadow 0.2s', 
  };

  WhatsappsvgStyle[':hover'] = {
    fill: 'grey', 
    cursor: 'pointer',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  };

  const InstagramsvgStyle = {
    fill: '#C536A4', 
    height: '3.5rem',
    borderRadius: '100%', 
    border: '1px solid pink', 
    transition: 'fill 0.2s, box-shadow 0.2s',
  };

  InstagramsvgStyle[':hover'] = {
    fill: 'blue',
    cursor: 'pointer', 
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', 
  };

  const LinkedinvgStyle = {
    fill: '#C536A4', 
    height: '3.5rem', 
    borderRadius: '100%', 
    border: '1px solid blue',
    transition: 'fill 0.2s, box-shadow 0.2s', 
  };

  LinkedinvgStyle[':hover'] = {
    fill: 'blue', 
    cursor: 'pointer', 
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', 
  };

  const FacebookvgStyle = {
    fill: '#C536A4', 
    height: '3.5rem', 
    borderRadius: '100%', 
    border: '1px solid blue', 
    transition: 'fill 0.2s, box-shadow 0.2s', 
  };

  FacebookvgStyle[':hover'] = {
    fill: 'blue', 
    cursor: 'pointer', 
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', 
  };

  return (
    <div className='modal-wrapper' onClick={closeModal}>
      <div className='modalContainer' onClick={handleContainerClick}>
        <div className='modalContent'>
        <div className="modalClose flex flex-row mt-[1rem] justify-around">
            <h1 className='text-[3rem] text-black '>Share Link Via</h1>
            <ImCross className='text-[1rem] text-right text-black' onClick={handleCloseButton}/>
        </div>
          
          <div className='line h-[1px] bg-black opacity-30'></div>
          <div className='icons-share flex flex-row flex-wrap justify-between mx-[4rem] mt-[4rem]'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 455.731 455.731" style={WhatsappsvgStyle} onClick={handleWhatsAppClick}>
              <g>
                <rect x="0" y="0" width="455.731" height="455.731" />
                <g>
                  <path style={{ fill: '#FFFFFF' }} d="M68.494,387.41l22.323-79.284c-14.355-24.387-21.913-52.134-21.913-80.638
                      c0-87.765,71.402-159.167,159.167-159.167s159.166,71.402,159.166,159.167c0,87.765-71.401,159.167-159.166,159.167
                      c-27.347,0-54.125-7-77.814-20.292L68.494,387.41z M154.437,337.406l4.872,2.975c20.654,12.609,44.432,19.274,68.762,19.274
                      c72.877,0,132.166-59.29,132.166-132.167S300.948,95.321,228.071,95.321S95.904,154.611,95.904,227.488
                      c0,25.393,7.217,50.052,20.869,71.311l3.281,5.109l-12.855,45.658L154.437,337.406z"/>
                  <path style={{ fill: '#FFFFFF' }} d="M183.359,153.407l-10.328-0.563c-3.244-0.177-6.426,0.907-8.878,3.037
                      c-5.007,4.348-13.013,12.754-15.472,23.708c-3.667,16.333,2,36.333,16.667,56.333c14.667,20,42,52,90.333,65.667
                      c15.575,4.404,27.827,1.435,37.280-4.612c7.487-4.789,12.648-12.476,14.508-21.166l1.649-7.702c0.524-2.448-0.719-4.932-2.993-5.980
                      l-34.905-16.089c-2.266-1.044-4.953-0.384-6.477,1.591l-13.703,17.764c-1.035,1.342-2.807,1.874-4.407,1.312
                      c-9.384-3.298-40.818-16.463-58.066-49.687c-0.748-1.441-0.562-3.19,0.499-4.419l13.096-15.15
                      c1.338-1.547,1.676-3.722,0.872-5.602l-15.046-35.201C187.187,154.774,185.392,153.518,183.359,153.407z"/>
                </g>
              </g>
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 455.73 455.73" style={InstagramsvgStyle} onClick={handleInstagramClick}>
                <path style={{ fill: '#C536A4' }} d="M227.86,182.55c-24.98,0-45.32,20.33-45.32,45.31c0,24.99,20.34,45.33,45.32,45.33
                  c24.99,0,45.32-20.34,45.32-45.33C273.18,202.88,252.85,182.55,227.86,182.55z M303.36,108.66H152.37c-24.1,0-43.71,19.61-43.71,43.71v150.99c0,24.1,19.61,43.71,43.71,43.71h150.99c24.1,0,43.71-19.61,43.71-43.71V152.37
                  C347.07,128.27,327.46,108.66,303.36,108.66z M227.86,306.35c-43.27,0-78.48-35.21-78.48-78.49c0-43.27,35.21-78.48,78.48-78.48
                  c43.28,0,78.49,35.21,78.49,78.48C306.35,271.14,271.14,306.35,227.86,306.35z M308.87,165.61c-10.24,0-18.57-8.33-18.57-18.57
                  s8.33-18.57,18.57-18.57s18.57,8.33,18.57,18.57S319.11,165.61,308.87,165.61z M227.86,182.55c-24.98,0-45.32,20.33-45.32,45.31
                  c0,24.99,20.34,45.33,45.32,45.33c24.99,0,45.32-20.34,45.32-45.33C273.18,202.88,252.85,182.55,227.86,182.55z M303.36,108.66
                  H152.37c-24.1,0-43.71,19.61-43.71,43.71v150.99c0,24.1,19.61,43.71,43.71,43.71h150.99c24.1,0,43.71-19.61,43.71-43.71V152.37
                  C347.07,128.27,327.46,108.66,303.36,108.66z M227.86,306.35c-43.27,0-78.48-35.21-78.48-78.49c0-43.27,35.21-78.48,78.48-78.48
                  c43.28,0,78.49,35.21,78.49,78.48C306.35,271.14,271.14,306.35,227.86,306.35z M308.87,165.61c-10.24,0-18.57-8.33-18.57-18.57
                  s8.33-18.57,18.57-18.57s18.57,8.33,18.57,18.57S319.11,165.61,308.87,165.61z"/>
              </svg>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 455.731 455.731" style={LinkedinvgStyle} onClick={handleLinkedinClick}>
              <rect x="0" y="0" fill="#0084B1" width="455.731" height="455.731" />
              <g>
                <path fill="#FFFFFF" d="M107.255,69.215c20.873,0.017,38.088,17.257,38.043,38.234c-0.05,21.965-18.278,38.52-38.3,38.043 c-20.308,0.411-38.155-16.551-38.151-38.188C68.847,86.319,86.129,69.199,107.255,69.215z" />
                <path fill="#FFFFFF" d="M129.431,386.471H84.71c-5.804,0-10.509-4.705-10.509-10.509V185.18 c0-5.804,4.705-10.509,10.509-10.509h44.721c5.804,0,10.509,4.705,10.509,10.509v190.783 C139.939,381.766,135.235,386.471,129.431,386.471z" />
                <path fill="#FFFFFF" d="M386.884,241.682c0-39.996-32.423-72.42-72.42-72.42h-11.47c-21.882,0-41.214,10.918-52.842,27.606 c-1.268,1.819-2.442,3.708-3.52,5.658c-0.373-0.056-0.594-0.085-0.599-0.075v-23.418c0-2.409-1.953-4.363-4.363-4.363h-55.795 c-2.409,0-4.363,1.953-4.363,4.363V382.11c0,2.409,1.952,4.362,4.361,4.363l57.011,0.014c2.41,0.001,4.364-1.953,4.364-4.363 V264.801c0-20.28,16.175-37.119,36.454-37.348c10.352-0.117,19.737,4.031,26.501,10.799c6.675,6.671,10.802,15.895,10.802,26.079 v117.808c0,2.409,1.953,4.362,4.361,4.363l57.152,0.014c2.41,0.001,4.364-1.953,4.364-4.363V241.682z" />
              </g>
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 455.73 455.73" style={FacebookvgStyle} onClick={handleFacebookClick}>
              <path fill="#3A559F" d="M0,0v455.73h242.704V279.691h-59.33v-71.864h59.33v-60.353c0-43.893,35.582-79.475,79.475-79.475 h62.025v64.622h-44.382c-13.947,0-25.254,11.307-25.254,25.254v49.953h68.521l-9.47,71.864h-59.051V455.73H455.73V0H0z" />
            </svg>

          </div>
          <div className='link-share-icon flex flex-row mb-[2rem] mt-[5rem] ml-[2rem]'>
            <span className='mssg-copied hidden'>Copied</span>
          <LuLink
              className='inline-block text-[2.5rem] text-black'
              // onClick={handleCopyToClipboard}
              onClick={() =>{
                navigator.clipboard.writeText(contestLink)
                setInterval(()=>{
                  document.querySelector('.mssg-copied').classList.add('share-active');
                },1500);
                document.querySelector('.mssg-copied').classList.remove('share-active');
              }
            }
            />
            <input className=" h-[2rem] w-[28rem] ml-[1rem] mr-[3rem] flex flex-wrap bg-white text-black" value={contestLink}></input>
            
          </div>
        </div>
      </div>
    </div>
  );
};
