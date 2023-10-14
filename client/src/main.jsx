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
import UserDashboard, { loader as dashboardLoader } from './components/UserDashboard.jsx'
import Feedback from './components/Feedback.jsx'
import Hacktoberfest from './components/Hacktoberfest.jsx'


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
        path: "/feedback",
        element: <Feedback/>
      },
      {
        path:"/hacktoberfest",
        element: <Hacktoberfest/>
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
      {
        path : "user/dashboard",
        loader :  dashboardLoader,
        element : <UserDashboard />,
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
