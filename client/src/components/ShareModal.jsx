import React, { useEffect } from 'react';
import './css/ShareModal.css';

export const ShareModal = ({ showModal, closeModal, handleCloseButton, copyToClipboard }) => {
  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  // useEffect(() => {
  //   if (showModal) {
  //     document.querySelector('.modalContainer').classList.remove('blur-background');
  //   }
  // }, [showModal]);

  return (
    <div className='modal-wrapper' onClick={closeModal}>
      <div className='modalContainer' onClick={handleContainerClick}>
        <div className='modalContent'>
          <span className='shareTitle'>Share Link Via</span>
          <br></br>
          <span className="modalClose" onClick={handleCloseButton}>
            {handleCloseButton()}
            <div className='link-share-icon'>
              <button onClick={copyToClipboard}></button>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};
