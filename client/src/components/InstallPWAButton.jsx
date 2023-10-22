import React, { useEffect, useState } from 'react';
import './css/InstallPWAButton.css';

function InstallPWAButton() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [postponedPrompt, setPostponedPrompt] = useState(null);
  // const [userDismissed, setUserDismissed] = useState(false);

  useEffect(() => {
    const hasUserDismissedPrompt = sessionStorage.getItem('user-dismissed-prompt');

    if (hasUserDismissedPrompt) {
      return;
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setPostponedPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);


  const onInstallClick = () => {
    if (postponedPrompt) {
      setShowInstallPrompt(false);
      postponedPrompt.prompt();

      postponedPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'dismissed') {
          sessionStorage.setItem('user-dismissed-prompt', 'true');
        }
        setPostponedPrompt(null);
      });
    }
  };


  if (!showInstallPrompt) {
    return null;
  } else {
    return (
      <div className="install-prompt">
        <p>Install our app for a better experience!</p>
        <div className='installPromptButtonsDiv'>
          <button onClick={onInstallClick}>Install</button>
          <button onClick={() => setShowInstallPrompt(false)}>Remind me later</button>
        </div>
      </div>
    );
  }


}

export default InstallPWAButton;
