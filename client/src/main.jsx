import React from 'react'
import ReactDOM from 'react-dom/client'
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import App from './App'

import "./index.css"
import "tw-elements-react/dist/css/tw-elements-react.min.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <App />
  </React.StrictMode>
)

serviceWorkerRegistration.register();