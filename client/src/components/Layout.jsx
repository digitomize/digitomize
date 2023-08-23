import { useEffect, useState } from 'react'
import Navbar from "./Navbar"
import { auth } from "../../firebase"

import { Analytics } from '@vercel/analytics/react';
import { Outlet } from "react-router-dom"

export default function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        setIsAuthenticated(true)
        setUsername(user.displayName)
      } else {
        setIsAuthenticated(false);
        setUsername(""); // Clear the username
      }
    })
  }, []) // No need for the username dependency

  return (
    <>
      <Navbar username={username} />
      <Outlet />
      <Analytics />
    </>
  )
}
