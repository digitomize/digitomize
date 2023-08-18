import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import './index.css'
import IndividualCard from './components/IndividualCard.jsx'
import Login, {loader as loginLoader, action as loginAction} from './components/Login.jsx'
import Signup, { action as signupAction } from './components/Signup.jsx'
import Layout from './components/Layout.jsx'
import ErrorPage from './components/error-page'

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
        action : signupAction
      },
      {
        path: "contests",
        element : <App />
      },
      {
        path : "/contests/:vanity",
        element : <IndividualCard />
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
