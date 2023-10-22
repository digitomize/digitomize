import React from 'react'
import ReactDOM from 'react-dom/client'
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import App from './App'

import "./index.css"
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import InstallPWAButton from './components/InstallPWAButton';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InstallPWAButton />
    <App />
  </React.StrictMode>
)

serviceWorkerRegistration.register();