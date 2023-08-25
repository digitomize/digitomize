import React from 'react'
import ReactDOM from 'react-dom/client'
import { UserAuthContextProvider } from "./context/UserAuthContext"

import App from './App'

import "./index.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserAuthContextProvider>
      <App />
    </UserAuthContextProvider>
  </React.StrictMode>
)
