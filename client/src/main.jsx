import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import './index.css'
import IndividualCard from './components/IndividualCard.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Layout from './components/Layout.jsx'

const router = createBrowserRouter([
  {
    path : "/",
    element : <Layout />,
    children : [
      {
        path : "/",
        element : <App />
      },
      {
        path : "login",
        element : <Login />
      },
      {
        path : "signup",
        element : <Signup />
      },
      {
        path: "contests",
        element : <App />
      },
      {
        path : "/contests/:vanity",
        element : <IndividualCard />
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
