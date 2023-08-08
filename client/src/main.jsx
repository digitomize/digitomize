import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App.jsx'
// import Home from './components/Home.jsx'
import './index.css'
import IndividualCard from './components/IndividualCard.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/contests' element={<App />} />
        <Route path='/contests/:vanity' element={<IndividualCard />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
