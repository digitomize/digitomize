import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import './index.css'
import IndividualCard from './components/IndividualCard.jsx'
import Login, { loader as loginLoader, action as loginAction } from './components/Login.jsx'
import Signup, { loader as signupLoader, action as signupAction } from './components/Signup.jsx'
import Layout from './components/Layout.jsx'
import ErrorPage from './components/error-page'
import UserDashboard, { loader as dashboardLoader } from './user/dashboard/UserDashboard.jsx'
import UserProfile from './user/Profile/UserProfile.jsx' 
import UserLayout from './user/UserLayout.jsx'

import UserDashPersonal from './user/dashboard/UserDashPersonal.jsx'
import UserDashRatings from './user/dashboard/UserDashRatings.jsx'
import UserDashGithub from './user/dashboard/UserDashGithub.jsx'
import { userDashboardDetails } from '../api.js'

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
        element : <Login />,
        loader : loginLoader,
        action : loginAction
      },
      {
        path : "signup",
        element : <Signup />,
        loader : signupLoader,
        action : signupAction,
      },
      {
        path: "contests",
        element : <App />
      },
      {
        path : "contests/:vanity",
        element : <IndividualCard />
      },
      
    ],
    errorElement : <ErrorPage />
  },
  {
    path : "user",
    element : <UserLayout />,
    children : [
      {
        path : "dashboard",
        loader :  dashboardLoader,
        element : <UserDashboard />,
        children : [
          {
            path: "personal",
            element :<UserDashPersonal />,
          },
          {
            path : "ratings",
            element : <UserDashRatings />,
          },
          {
            path : "github",
            element : <UserDashGithub />
          }
        ]
      },
      {
        path : "profile/:username",
        element : <UserProfile />,
      }
    ],
    errorElement : <ErrorPage />
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
