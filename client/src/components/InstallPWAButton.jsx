import React, { useEffect, useState } from 'react';
import './css/InstallPWAButton.css';

function InstallPWAButton() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [postponedPrompt, setPostponedPrompt] = useState(null);

  useEffect(() => {
    const hasUserDismissedPrompt = sessionStorage.getItem('user-dismissed-prompt');
    const remindedLater = sessionStorage.getItem('remind-me-later');

    if (hasUserDismissedPrompt || remindedLater) {
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

  const onRemindLaterClick = () => {
    setShowInstallPrompt(false);
    sessionStorage.setItem('remind-me-later', 'true');
  };

  if (!showInstallPrompt) {
    return null;
  } else {
    return (
      <div className="install-prompt">
        <p>Install our app for a better experience!</p>
        <div className='installPromptButtonsDiv'>
          <button onClick={onInstallClick}>Install</button>
          <button onClick={onRemindLaterClick}>Remind me later</button>
        </div>
      </div>
    );
  }
}

export default InstallPWAButton;
